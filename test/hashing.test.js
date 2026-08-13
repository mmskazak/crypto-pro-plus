import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createMockCadesplugin } from './mocks/cadesplugin.js';

const mockState = { current: createMockCadesplugin() };

vi.mock('../cadesplugin-wrapper.js', () => ({
  get cadesplugin() {
    return mockState.current.cadesplugin;
  },
}));

const {
  createHash,
  createSHA1Hash,
  createSHA256Hash,
  createSHA384Hash,
  createSHA512Hash,
  createGost2012_256Hash,
  createGost2012_512Hash,
  createGost94Hash,
} = await import('../src/hashing.js');

beforeEach(() => {
  mockState.current = createMockCadesplugin();
});

describe('createHash', () => {
  it('sets the algorithm, feeds the data and returns the resulting hash value', async () => {
    mockState.current.hashObj.Value = 'HASHVALUE==';
    const value = await createHash('ZGF0YQ==', 'SHA_256');

    expect(mockState.current.hashObj.propset_Algorithm).toHaveBeenCalledWith('SHA_256');
    expect(mockState.current.hashObj.Hash).toHaveBeenCalledWith('ZGF0YQ==');
    expect(value).toBe('HASHVALUE==');
  });
});

describe('hash algorithm aliases', () => {
  const cases = [
    ['createSHA1Hash', createSHA1Hash, 'SHA1'],
    ['createSHA256Hash', createSHA256Hash, 'SHA_256'],
    ['createSHA384Hash', createSHA384Hash, 'SHA_384'],
    ['createSHA512Hash', createSHA512Hash, 'SHA_512'],
    ['createGost2012_256Hash', createGost2012_256Hash, 'GOST_2012_256'],
    ['createGost2012_512Hash', createGost2012_512Hash, 'GOST_2012_512'],
    ['createGost94Hash', createGost94Hash, 'GOST_94'],
  ];

  it.each(cases)('%s uses the correct algorithm constant', async (_name, fn, expectedAlgorithm) => {
    await fn('ZGF0YQ==');
    expect(mockState.current.hashObj.propset_Algorithm).toHaveBeenCalledWith(expectedAlgorithm);
  });
});
