import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createMockCadesplugin, makeCert } from './mocks/cadesplugin.js';

const mockState = { current: createMockCadesplugin() };

vi.mock('../cadesplugin-wrapper.js', () => ({
  get cadesplugin() {
    return mockState.current.cadesplugin;
  },
}));

const {
  countCertificates,
  getCertificateByThumbprint,
  getCertificateInfo,
  getCertificates,
  selectCertificateFromDialog,
  getValidCertificates,
  validateCertificateForSigning,
} = await import('../src/certificates.js');

function withCertificates(certs) {
  mockState.current = createMockCadesplugin({ certificates: certs });
}

beforeEach(() => {
  mockState.current = createMockCadesplugin();
});

describe('countCertificates', () => {
  it('returns the number of certificates in the store and closes it', async () => {
    withCertificates([makeCert(), makeCert({ Thumbprint: 'T2' })]);
    const count = await countCertificates();
    expect(count).toBe(2);
    expect(mockState.current.store.Close).toHaveBeenCalled();
  });

  it('propagates the error when the store cannot be opened', async () => {
    mockState.current.store.Open.mockRejectedValueOnce(new Error('no CryptoPro CSP'));
    await expect(countCertificates()).rejects.toThrow('no CryptoPro CSP');
  });
});

describe('getCertificateByThumbprint', () => {
  it('returns the matching certificate', async () => {
    const cert = makeCert({ Thumbprint: 'ABC123' });
    withCertificates([cert]);
    const found = await getCertificateByThumbprint('ABC123');
    expect(found).toBe(cert);
    expect(mockState.current.store.Close).toHaveBeenCalled();
  });

  it('returns null when no certificate matches', async () => {
    withCertificates([makeCert({ Thumbprint: 'OTHER' })]);
    const found = await getCertificateByThumbprint('ABC123');
    expect(found).toBeNull();
  });
});

describe('getCertificateInfo', () => {
  it('extracts subject, issuer, validity dates and thumbprint', async () => {
    const cert = makeCert({ SubjectName: 'CN=Ivan', Thumbprint: 'XYZ' });
    const info = await getCertificateInfo(cert);
    expect(info).toEqual({
      subjectName: 'CN=Ivan',
      issuerName: cert.IssuerName,
      validFromDate: cert.ValidFromDate,
      validToDate: cert.ValidToDate,
      thumbprint: 'XYZ',
    });
  });
});

describe('getCertificates', () => {
  it('lists all certificates in the store', async () => {
    const cert1 = makeCert({ Thumbprint: 'T1' });
    const cert2 = makeCert({ Thumbprint: 'T2' });
    withCertificates([cert1, cert2]);

    const result = await getCertificates();

    expect(result).toHaveLength(2);
    expect(result.map((c) => c.thumbprint)).toEqual(['T1', 'T2']);
    expect(mockState.current.store.Close).toHaveBeenCalled();
  });

  it('returns an empty array for an empty store', async () => {
    withCertificates([]);
    const result = await getCertificates();
    expect(result).toEqual([]);
  });
});

describe('selectCertificateFromDialog', () => {
  it('returns certificate info for the certificate the user picked', async () => {
    const cert = makeCert({ Thumbprint: 'PICKED' });
    withCertificates([cert]);

    const result = await selectCertificateFromDialog();

    expect(result.thumbprint).toBe('PICKED');
    expect(result.cert).toBe(cert);
  });

  it('returns null when the user cancels the dialog', async () => {
    withCertificates([]);
    const result = await selectCertificateFromDialog();
    expect(result).toBeNull();
  });

  it('wraps dialog errors in a descriptive error', async () => {
    mockState.current.store.Certificates.Select.mockRejectedValueOnce(new Error('dialog blocked'));
    await expect(selectCertificateFromDialog()).rejects.toThrow('Не удалось показать диалог выбора сертификата');
  });
});

describe('getValidCertificates', () => {
  it('filters out expired certificates and reports days to expiry', async () => {
    const valid = makeCert({ Thumbprint: 'VALID', ValidToDate: '2099-01-01T00:00:00' });
    const expired = makeCert({ Thumbprint: 'EXPIRED', ValidToDate: '2000-01-01T00:00:00' });
    withCertificates([valid, expired]);

    const result = await getValidCertificates();

    expect(result).toHaveLength(1);
    expect(result[0].thumbprint).toBe('VALID');
    expect(result[0].isValid).toBe(true);
    expect(result[0].daysToExpiry).toBeGreaterThan(0);
  });
});

describe('validateCertificateForSigning', () => {
  it('rejects an unknown thumbprint', async () => {
    withCertificates([]);
    const result = await validateCertificateForSigning('missing');
    expect(result).toEqual({
      isValid: false,
      reason: 'Сертификат с указанным отпечатком не найден',
    });
  });

  it('rejects a certificate that is not yet valid', async () => {
    const future = makeCert({ Thumbprint: 'FUTURE', ValidFromDate: '2099-01-01T00:00:00' });
    withCertificates([future]);
    const result = await validateCertificateForSigning('FUTURE');
    expect(result.isValid).toBe(false);
    expect(result.reason).toMatch(/еще не вступил в силу/);
  });

  it('rejects an expired certificate', async () => {
    const expired = makeCert({ Thumbprint: 'EXPIRED', ValidToDate: '2000-01-01T00:00:00' });
    withCertificates([expired]);
    const result = await validateCertificateForSigning('EXPIRED');
    expect(result.isValid).toBe(false);
    expect(result.reason).toMatch(/истек/);
  });

  it('warns when a valid certificate expires within 7 days', async () => {
    const soon = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
    const expiringSoon = makeCert({ Thumbprint: 'SOON', ValidToDate: soon });
    withCertificates([expiringSoon]);

    const result = await validateCertificateForSigning('SOON');

    expect(result.isValid).toBe(true);
    expect(result.details.warnings).toHaveLength(1);
  });

  it('accepts a certificate that is comfortably within its validity period', async () => {
    const ok = makeCert({ Thumbprint: 'OK' });
    withCertificates([ok]);
    const result = await validateCertificateForSigning('OK');
    expect(result.isValid).toBe(true);
    expect(result.details.warnings).toEqual([]);
  });
});
