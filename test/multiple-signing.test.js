import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createMockCadesplugin, makeCert } from './mocks/cadesplugin.js';

const mockState = { current: createMockCadesplugin() };

vi.mock('../cadesplugin-wrapper.js', () => ({
  get cadesplugin() {
    return mockState.current.cadesplugin;
  },
}));

const {
  coSignBase64,
  coSignBase64WithTimestamp,
  createCollectiveSignature,
  createWorkflowSignature,
} = await import('../src/multiple-signing.js');

function withCertificates(certs) {
  mockState.current = createMockCadesplugin({ certificates: certs });
}

beforeEach(() => {
  mockState.current = createMockCadesplugin();
});

describe('coSignBase64', () => {
  it('throws when the certificate is not found', async () => {
    withCertificates([]);
    await expect(coSignBase64('ZGF0YQ==', 'existing-sig', 'missing')).rejects.toThrow(
      'Сертификат с указанным отпечатком не найден',
    );
  });

  it('verifies the existing signature and adds a co-signature', async () => {
    withCertificates([makeCert({ Thumbprint: 'T2' })]);
    mockState.current.signedDataObj.CoSignCades.mockResolvedValueOnce('signature-with-2-signers');

    const result = await coSignBase64('ZGF0YQ==', 'existing-sig', 'T2', true);

    expect(mockState.current.signedDataObj.VerifyCades).toHaveBeenCalledWith(
      'existing-sig',
      mockState.current.cadesplugin.CADESCOM_CADES_BES,
      true,
    );
    expect(result).toBe('signature-with-2-signers');
  });
});

describe('coSignBase64WithTimestamp', () => {
  it('sets the TSA address and adds a timestamped co-signature', async () => {
    withCertificates([makeCert({ Thumbprint: 'T2' })]);
    await coSignBase64WithTimestamp('ZGF0YQ==', 'existing-sig', 'T2', 'http://tsp.example', true);

    expect(mockState.current.signerObj.propset_TSAAddress).toHaveBeenCalledWith('http://tsp.example');
    expect(mockState.current.signedDataObj.CoSignCades).toHaveBeenCalledWith(
      mockState.current.signerObj,
      mockState.current.cadesplugin.CADESCOM_CADES_T,
    );
  });
});

describe('createCollectiveSignature', () => {
  it('throws when no thumbprints are provided', async () => {
    await expect(createCollectiveSignature('ZGF0YQ==', [])).rejects.toThrow(
      'Необходимо указать хотя бы одного подписчика',
    );
  });

  it('signs with the first certificate then co-signs for each remaining thumbprint', async () => {
    withCertificates([
      makeCert({ Thumbprint: 'T1' }),
      makeCert({ Thumbprint: 'T2' }),
      makeCert({ Thumbprint: 'T3' }),
    ]);
    mockState.current.signedDataObj.SignCades.mockResolvedValueOnce('sig-1');
    mockState.current.signedDataObj.CoSignCades.mockResolvedValueOnce('sig-2').mockResolvedValueOnce('sig-3');

    const result = await createCollectiveSignature('ZGF0YQ==', ['T1', 'T2', 'T3']);

    expect(mockState.current.signedDataObj.CoSignCades).toHaveBeenCalledTimes(2);
    expect(result).toBe('sig-3');
  });
});

describe('createWorkflowSignature', () => {
  it('throws when no signers are provided', async () => {
    await expect(createWorkflowSignature('ZGF0YQ==', [])).rejects.toThrow(
      'Необходимо указать хотя бы одного подписчика',
    );
  });

  it('chains signatures sequentially, each signer signing the previous result', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' }), makeCert({ Thumbprint: 'T2' })]);
    mockState.current.signedDataObj.SignCades
      .mockResolvedValueOnce('step-1-signature')
      .mockResolvedValueOnce('step-2-signature');

    const result = await createWorkflowSignature('ZGF0YQ==', [{ thumbprint: 'T1' }, { thumbprint: 'T2' }]);

    expect(result.signature).toBe('step-2-signature');
    expect(result.history).toHaveLength(2);
    expect(result.history[0]).toMatchObject({ step: 1, signer: 'T1', hasTSA: false });
    expect(result.history[1]).toMatchObject({ step: 2, signer: 'T2', hasTSA: false });
  });

  it('marks steps with a TSP URL as having a timestamp', async () => {
    withCertificates([makeCert({ Thumbprint: 'T1' })]);
    const result = await createWorkflowSignature('ZGF0YQ==', [{ thumbprint: 'T1', tspUrl: 'http://tsp.example' }]);
    expect(result.history[0].hasTSA).toBe(true);
  });
});
