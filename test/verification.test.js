import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createMockCadesplugin, makeCollection, makeCert, makeSigner } from './mocks/cadesplugin.js';

const mockState = { current: createMockCadesplugin() };

vi.mock('../cadesplugin-wrapper.js', () => ({
  get cadesplugin() {
    return mockState.current.cadesplugin;
  },
}));

const {
  verifyDetachedSignature,
  verifyAttachedSignature,
  verifyTimestampedSignature,
  getSignersInfo,
  verifySignature,
} = await import('../src/verification.js');

beforeEach(() => {
  mockState.current = createMockCadesplugin();
});

describe('verifyDetachedSignature', () => {
  it('returns true when VerifyCades succeeds', async () => {
    const isValid = await verifyDetachedSignature('ZGF0YQ==', 'c2ln');
    expect(isValid).toBe(true);
    expect(mockState.current.signedDataObj.VerifyCades).toHaveBeenCalledWith(
      'c2ln',
      mockState.current.cadesplugin.CADESCOM_CADES_BES,
      true,
    );
  });

  it('returns false when VerifyCades rejects', async () => {
    mockState.current.signedDataObj.VerifyCades.mockRejectedValueOnce(new Error('invalid signature'));
    const isValid = await verifyDetachedSignature('ZGF0YQ==', 'c2ln');
    expect(isValid).toBe(false);
  });
});

describe('verifyAttachedSignature', () => {
  it('returns the decoded content on success', async () => {
    mockState.current.signedDataObj.Content = 'original content';
    const result = await verifyAttachedSignature('c2ln');
    expect(result).toEqual({ isValid: true, content: 'original content' });
  });

  it('returns isValid: false on failure', async () => {
    mockState.current.signedDataObj.VerifyCades.mockRejectedValueOnce(new Error('bad sig'));
    const result = await verifyAttachedSignature('c2ln');
    expect(result).toEqual({ isValid: false });
  });
});

describe('verifyTimestampedSignature', () => {
  it('reports signing time info for a detached CAdES-T signature', async () => {
    const signer = makeSigner({ SigningTime: '2024-05-01T10:00:00' });
    mockState.current.signedDataObj.Signers = makeCollection([signer]);

    const result = await verifyTimestampedSignature('ZGF0YQ==', 'c2ln', true);

    expect(result.isValid).toBe(true);
    expect(result.timestampInfo).toEqual({ signingTime: '2024-05-01T10:00:00', signersCount: 1 });
  });

  it('extracts content for an attached signature', async () => {
    mockState.current.signedDataObj.Content = 'attached content';
    mockState.current.signedDataObj.Signers = makeCollection([]);

    const result = await verifyTimestampedSignature(null, 'c2ln', false);

    expect(result.isValid).toBe(true);
    expect(result.content).toBe('attached content');
  });

  it('returns isValid: false when verification fails', async () => {
    mockState.current.signedDataObj.VerifyCades.mockRejectedValueOnce(new Error('expired'));
    const result = await verifyTimestampedSignature('ZGF0YQ==', 'c2ln', true);
    expect(result).toEqual({ isValid: false });
  });
});

describe('getSignersInfo', () => {
  it('returns details for every signer in the signature', async () => {
    const cert = makeCert({ SubjectName: 'CN=Ivan', Thumbprint: 'T1' });
    const signer = makeSigner({ Certificate: cert, SigningTime: '2024-01-01T00:00:00' });
    mockState.current.signedDataObj.Signers = makeCollection([signer]);

    const info = await getSignersInfo('c2ln', true, 'ZGF0YQ==');

    expect(info).toHaveLength(1);
    expect(info[0]).toMatchObject({
      subjectName: 'CN=Ivan',
      thumbprint: 'T1',
      signingTime: '2024-01-01T00:00:00',
    });
  });

  it('returns an empty array when verification fails', async () => {
    mockState.current.signedDataObj.VerifyCades.mockRejectedValueOnce(new Error('bad'));
    const info = await getSignersInfo('c2ln');
    expect(info).toEqual([]);
  });
});

describe('verifySignature (dispatcher)', () => {
  it('delegates to verifyTimestampedSignature when hasTimestamp is true', async () => {
    mockState.current.signedDataObj.Signers = makeCollection([]);
    const result = await verifySignature('c2ln', { hasTimestamp: true, isDetached: false });
    expect(result.isValid).toBe(true);
  });

  it('delegates to verifyDetachedSignature and wraps the boolean result', async () => {
    const result = await verifySignature('c2ln', { isDetached: true, data: 'ZGF0YQ==' });
    expect(result).toEqual({ isValid: true });
  });

  it('delegates to verifyAttachedSignature when isDetached is false', async () => {
    mockState.current.signedDataObj.Content = 'content';
    const result = await verifySignature('c2ln', { isDetached: false });
    expect(result).toEqual({ isValid: true, content: 'content' });
  });
});
