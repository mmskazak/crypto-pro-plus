import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createMockCadesplugin, makeCollection, makeCert, makeSigner } from './mocks/cadesplugin.js';

const mockState = { current: createMockCadesplugin() };

vi.mock('../cadesplugin-wrapper.js', () => ({
  get cadesplugin() {
    return mockState.current.cadesplugin;
  },
}));

const {
  counterSign,
  counterSignBySigner,
  counterSignAll,
  getCounterSignersInfo,
} = await import('../src/countersigning.js');

function withCertificates(certs) {
  mockState.current = createMockCadesplugin({ certificates: certs });
}

beforeEach(() => {
  mockState.current = createMockCadesplugin();
});

describe('counterSign', () => {
  it('throws when the certificate is not found', async () => {
    withCertificates([]);
    await expect(counterSign('existing-sig', 'missing')).rejects.toThrow(
      'Сертификат с указанным отпечатком не найден',
    );
  });

  it('throws when the signature has no signers', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' })]);
    mockState.current.signedDataObj.Signers = makeCollection([]);

    await expect(counterSign('existing-sig', 'T1')).rejects.toThrow(
      'В подписи не найдено подписчиков для контрподписи',
    );
  });

  it('counter-signs the first signer with CAdES-BES when no TSP is given', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' })]);
    const targetSigner = makeSigner();
    targetSigner.CounterSign.mockResolvedValueOnce('countersigned');
    mockState.current.signedDataObj.Signers = makeCollection([targetSigner]);

    const result = await counterSign('existing-sig', 'T1');

    expect(targetSigner.CounterSign).toHaveBeenCalledWith(
      mockState.current.signerObj,
      mockState.current.cadesplugin.CADESCOM_CADES_BES,
    );
    expect(result).toBe('countersigned');
  });

  it('uses CAdES-T and sets the TSA address when a TSP URL is given', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' })]);
    const targetSigner = makeSigner();
    mockState.current.signedDataObj.Signers = makeCollection([targetSigner]);

    await counterSign('existing-sig', 'T1', 'http://tsp.example');

    expect(mockState.current.signerObj.propset_TSAAddress).toHaveBeenCalledWith('http://tsp.example');
    expect(targetSigner.CounterSign).toHaveBeenCalledWith(
      mockState.current.signerObj,
      mockState.current.cadesplugin.CADESCOM_CADES_T,
    );
  });
});

describe('counterSignBySigner', () => {
  it('rejects an out-of-range signer index', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' })]);
    mockState.current.signedDataObj.Signers = makeCollection([makeSigner()]);

    await expect(counterSignBySigner('existing-sig', 'T1', 5)).rejects.toThrow('Неверный индекс подписчика');
  });

  it('counter-signs the signer at the given index', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' })]);
    const signer1 = makeSigner();
    const signer2 = makeSigner();
    signer2.CounterSign.mockResolvedValueOnce('countersigned-2');
    mockState.current.signedDataObj.Signers = makeCollection([signer1, signer2]);

    const result = await counterSignBySigner('existing-sig', 'T1', 2);

    expect(signer1.CounterSign).not.toHaveBeenCalled();
    expect(signer2.CounterSign).toHaveBeenCalled();
    expect(result).toBe('countersigned-2');
  });
});

describe('counterSignAll', () => {
  it('throws when there are no signers to counter-sign', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' })]);
    mockState.current.signedDataObj.Signers = makeCollection([]);

    await expect(counterSignAll('existing-sig', 'T1')).rejects.toThrow(
      'В подписи не найдено подписчиков для контрподписи',
    );
  });

  it('counter-signs every signer and returns the result of the last one', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' })]);
    const signer1 = makeSigner();
    signer1.CounterSign.mockResolvedValueOnce('after-signer-1');
    const signer2 = makeSigner();
    signer2.CounterSign.mockResolvedValueOnce('after-signer-2');
    mockState.current.signedDataObj.Signers = makeCollection([signer1, signer2]);

    const result = await counterSignAll('existing-sig', 'T1');

    expect(signer1.CounterSign).toHaveBeenCalled();
    expect(signer2.CounterSign).toHaveBeenCalled();
    expect(result).toBe('after-signer-2');
  });
});

describe('getCounterSignersInfo', () => {
  it('returns an empty array when no signer has counter-signatures', async () => {
    const signer = makeSigner({ CounterSigners: makeCollection([]) });
    mockState.current.signedDataObj.Signers = makeCollection([signer]);

    const info = await getCounterSignersInfo('sig');
    expect(info).toEqual([]);
  });

  it('collects counter-signature details for signers that have them', async () => {
    const counterCert = makeCert({ SubjectName: 'CN=Counter', Thumbprint: 'CT1' });
    const counterSigner = makeSigner({ Certificate: counterCert, SigningTime: '2024-02-01T00:00:00' });
    const mainCert = makeCert({ SubjectName: 'CN=Main', Thumbprint: 'MT1' });
    const signer = makeSigner({
      Certificate: mainCert,
      CounterSigners: makeCollection([counterSigner]),
    });
    mockState.current.signedDataObj.Signers = makeCollection([signer]);

    const info = await getCounterSignersInfo('sig');

    expect(info).toHaveLength(1);
    expect(info[0]).toMatchObject({ signerIndex: 1, signerName: 'CN=Main', signerThumbprint: 'MT1' });
    expect(info[0].counterSignatures).toEqual([
      {
        counterSignerName: 'CN=Counter',
        counterSignerThumbprint: 'CT1',
        counterSigningTime: '2024-02-01T00:00:00',
      },
    ]);
  });

  it('returns an empty array when signature verification fails', async () => {
    mockState.current.signedDataObj.VerifyCades.mockRejectedValueOnce(new Error('bad signature'));
    const info = await getCounterSignersInfo('sig');
    expect(info).toEqual([]);
  });
});
