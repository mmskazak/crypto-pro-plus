import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createMockCadesplugin, makeCert } from './mocks/cadesplugin.js';

const mockState = { current: createMockCadesplugin() };

vi.mock('../cadesplugin-wrapper.js', () => ({
  get cadesplugin() {
    return mockState.current.cadesplugin;
  },
}));

const {
  signBase64Detached,
  signBase64DetachedWithTimestamp,
  signBase64Attached,
  signBase64AttachedWithTimestamp,
  signWithCertificateSelection,
  signWithValidation,
} = await import('../src/signing.js');

function withCertificates(certs) {
  mockState.current = createMockCadesplugin({ certificates: certs });
}

beforeEach(() => {
  mockState.current = createMockCadesplugin();
});

describe('signBase64Detached', () => {
  it('throws when the certificate is not found', async () => {
    withCertificates([]);
    await expect(signBase64Detached('ZGF0YQ==', 'missing')).rejects.toThrow(
      'Сертификат с указанным отпечатком не найден',
    );
  });

  it('signs with CAdES-BES in detached mode', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' })]);
    const signature = await signBase64Detached('ZGF0YQ==', 'T1');

    expect(signature).toBe('mock-signature');
    expect(mockState.current.signerObj.propset_Certificate).toHaveBeenCalled();
    expect(mockState.current.signedDataObj.SignCades).toHaveBeenCalledWith(
      mockState.current.signerObj,
      mockState.current.cadesplugin.CADESCOM_CADES_BES,
      true,
    );
  });
});

describe('signBase64DetachedWithTimestamp', () => {
  it('configures the TSA address and signs with CAdES-T', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' })]);
    await signBase64DetachedWithTimestamp('ZGF0YQ==', 'T1', 'http://tsp.example');

    expect(mockState.current.signerObj.propset_TSAAddress).toHaveBeenCalledWith('http://tsp.example');
    expect(mockState.current.signedDataObj.SignCades).toHaveBeenCalledWith(
      mockState.current.signerObj,
      mockState.current.cadesplugin.CADESCOM_CADES_T,
      true,
    );
  });
});

describe('signBase64Attached / signBase64AttachedWithTimestamp', () => {
  it('signs in attached mode (detached flag = false)', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' })]);
    await signBase64Attached('ZGF0YQ==', 'T1');
    expect(mockState.current.signedDataObj.SignCades).toHaveBeenCalledWith(
      mockState.current.signerObj,
      mockState.current.cadesplugin.CADESCOM_CADES_BES,
      false,
    );
  });

  it('signs in attached mode with a timestamp', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' })]);
    await signBase64AttachedWithTimestamp('ZGF0YQ==', 'T1', 'http://tsp.example');
    expect(mockState.current.signedDataObj.SignCades).toHaveBeenCalledWith(
      mockState.current.signerObj,
      mockState.current.cadesplugin.CADESCOM_CADES_T,
      false,
    );
  });
});

describe('signWithCertificateSelection', () => {
  it('throws when the user cancels the certificate dialog', async () => {
    withCertificates([]);
    await expect(signWithCertificateSelection('ZGF0YQ==')).rejects.toThrow('Подписание отменено пользователем');
  });

  it('signs with the certificate picked from the dialog', async () => {
    withCertificates([makeCert({ Thumbprint: 'PICKED' })]);
    const result = await signWithCertificateSelection('ZGF0YQ==');

    expect(result.signature).toBe('mock-signature');
    expect(result.certificateInfo.thumbprint).toBe('PICKED');
  });

  it('rejects when the selected certificate fails validation', async () => {
    const expired = makeCert({ Thumbprint: 'EXPIRED', ValidToDate: '2000-01-01T00:00:00' });
    withCertificates([expired]);

    await expect(signWithCertificateSelection('ZGF0YQ==')).rejects.toThrow(
      'Выбранный сертификат не может быть использован для подписания',
    );
  });
});

describe('signWithValidation', () => {
  it('rejects signing when the certificate is invalid', async () => {
    withCertificates([]);
    await expect(signWithValidation('ZGF0YQ==', 'missing')).rejects.toThrow(
      'Сертификат не может быть использован',
    );
  });

  it('signs and returns the validation details for a valid certificate', async () => {
    withCertificates([makeCert({ Thumbprint: 'OK' })]);
    const result = await signWithValidation('ZGF0YQ==', 'OK');

    expect(result.signature).toBe('mock-signature');
    expect(result.validation.isValid).toBe(true);
  });
});
