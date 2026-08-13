// test/mocks/cadesplugin.js
// Фабрика мока cadesplugin — эмулирует COM-объекты CryptoPro CAdES plugin,
// с которыми работает src/*.js, чтобы можно было тестировать без реального плагина.
import { vi } from 'vitest';

export const CONST = {
  CADESCOM_BASE64_TO_BINARY: 'CADESCOM_BASE64_TO_BINARY',
  CADESCOM_CADES_BES: 'CADESCOM_CADES_BES',
  CADESCOM_CADES_T: 'CADESCOM_CADES_T',
  CADESCOM_CURRENT_USER_STORE: 'CADESCOM_CURRENT_USER_STORE',
  CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED: 'CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED',
  CAPICOM_CERTIFICATE_FIND_SHA1_HASH: 'CAPICOM_CERTIFICATE_FIND_SHA1_HASH',
  CADESCOM_HASH_ALGORITHM_SHA1: 'SHA1',
  CADESCOM_HASH_ALGORITHM_SHA_256: 'SHA_256',
  CADESCOM_HASH_ALGORITHM_SHA_384: 'SHA_384',
  CADESCOM_HASH_ALGORITHM_SHA_512: 'SHA_512',
  CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256: 'GOST_2012_256',
  CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512: 'GOST_2012_512',
  CADESCOM_HASH_ALGORITHM_CP_GOST_3411: 'GOST_94',
};

export function makeCollection(items) {
  return {
    Count: items.length,
    Item: vi.fn(async (i) => items[i - 1]),
    Find: vi.fn(async (findType, value) => makeCollection(items.filter((c) => c.Thumbprint === value))),
    Select: vi.fn(async () => makeCollection(items.length ? [items[0]] : [])),
  };
}

export function makeCert(overrides = {}) {
  return {
    SubjectName: 'CN=Test User',
    IssuerName: 'CN=Test CA',
    SerialNumber: '01',
    ValidFromDate: '2020-01-01T00:00:00',
    ValidToDate: '2099-01-01T00:00:00',
    Thumbprint: 'THUMBPRINT-1',
    ...overrides,
  };
}

export function makeSigner(overrides = {}) {
  return {
    Certificate: makeCert(),
    SigningTime: '2024-01-01T00:00:00',
    CounterSigners: makeCollection([]),
    CounterSign: vi.fn(async () => 'mock-counter-signature'),
    ...overrides,
  };
}

export function createMockCadesplugin({ certificates = [] } = {}) {
  const store = {
    Open: vi.fn(async () => {}),
    Close: vi.fn(async () => {}),
    Certificates: makeCollection(certificates),
  };

  const signerObj = {
    propset_Certificate: vi.fn(async () => {}),
    propset_CheckCertificate: vi.fn(async () => {}),
    propset_TSAAddress: vi.fn(async () => {}),
  };

  const signedDataObj = {
    propset_ContentEncoding: vi.fn(async () => {}),
    propset_Content: vi.fn(async () => {}),
    SignCades: vi.fn(async () => 'mock-signature'),
    SignHash: vi.fn(async () => 'mock-hash-signature'),
    VerifyCades: vi.fn(async () => {}),
    CoSignCades: vi.fn(async () => 'mock-cosignature'),
    Content: 'decoded-content',
    Signers: makeCollection([]),
  };

  const hashObj = {
    propset_Algorithm: vi.fn(async () => {}),
    propset_DataEncoding: vi.fn(async () => {}),
    Hash: vi.fn(async () => {}),
    SetHashValue: vi.fn(async () => {}),
    Value: 'mock-hash-value',
  };

  const aboutObj = {
    Version: '2.0.0.0',
  };

  const objects = {
    'CAdESCOM.Store': store,
    'CAdESCOM.CPSigner': signerObj,
    'CAdESCOM.CadesSignedData': signedDataObj,
    'CAdESCOM.HashedData': hashObj,
    'CAdESCOM.About': aboutObj,
  };

  const cadesplugin = {
    ...CONST,
    CreateObjectAsync: vi.fn(async (progId) => {
      if (!(progId in objects)) {
        throw new Error(`Unknown ProgID in mock: ${progId}`);
      }
      return objects[progId];
    }),
  };

  return { cadesplugin, store, signerObj, signedDataObj, hashObj, aboutObj };
}
