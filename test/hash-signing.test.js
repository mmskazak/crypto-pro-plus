import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createMockCadesplugin, makeCert } from './mocks/cadesplugin.js';

const mockState = { current: createMockCadesplugin() };

vi.mock('../cadesplugin-wrapper.js', () => ({
  get cadesplugin() {
    return mockState.current.cadesplugin;
  },
}));

const {
  signHashDetached,
  signHashDetachedWithTimestamp,
  signSHA256HashDetached,
  signGost2012_256HashDetached,
} = await import('../src/hash-signing.js');

function withCertificates(certs) {
  mockState.current = createMockCadesplugin({ certificates: certs });
}

beforeEach(() => {
  mockState.current = createMockCadesplugin();
});

describe('signHashDetached', () => {
  it('throws when the certificate is not found', async () => {
    withCertificates([]);
    await expect(signHashDetached('SEFTSA==', 'missing', 'SHA_256')).rejects.toThrow(
      'Сертификат с указанным отпечатком не найден',
    );
  });

  it('sets the hash value and signs it with CAdES-BES', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' })]);
    const signature = await signHashDetached('SEFTSA==', 'T1', 'SHA_256');

    expect(mockState.current.hashObj.propset_Algorithm).toHaveBeenCalledWith('SHA_256');
    expect(mockState.current.hashObj.SetHashValue).toHaveBeenCalledWith('SEFTSA==');
    expect(mockState.current.signedDataObj.SignHash).toHaveBeenCalledWith(
      mockState.current.hashObj,
      mockState.current.signerObj,
      mockState.current.cadesplugin.CADESCOM_CADES_BES,
    );
    expect(signature).toBe('mock-hash-signature');
  });
});

describe('signHashDetachedWithTimestamp', () => {
  it('sets the TSA address and signs with CAdES-T', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' })]);
    await signHashDetachedWithTimestamp('SEFTSA==', 'T1', 'SHA_256', 'http://tsp.example');

    expect(mockState.current.signerObj.propset_TSAAddress).toHaveBeenCalledWith('http://tsp.example');
    expect(mockState.current.signedDataObj.SignHash).toHaveBeenCalledWith(
      mockState.current.hashObj,
      mockState.current.signerObj,
      mockState.current.cadesplugin.CADESCOM_CADES_T,
    );
  });
});

describe('algorithm aliases', () => {
  it('signSHA256HashDetached forwards the SHA-256 algorithm constant', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' })]);
    await signSHA256HashDetached('SEFTSA==', 'T1');
    expect(mockState.current.hashObj.propset_Algorithm).toHaveBeenCalledWith('SHA_256');
  });

  it('signGost2012_256HashDetached forwards the GOST 2012-256 algorithm constant', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' })]);
    await signGost2012_256HashDetached('SEFTSA==', 'T1');
    expect(mockState.current.hashObj.propset_Algorithm).toHaveBeenCalledWith('GOST_2012_256');
  });
});
