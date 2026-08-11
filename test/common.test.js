import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createMockCadesplugin } from './mocks/cadesplugin.js';

const mockState = { current: createMockCadesplugin() };

vi.mock('../cadesplugin-wrapper.js', () => ({
  get cadesplugin() {
    return mockState.current.cadesplugin;
  },
}));

const { openCertificateStore, pluginVersion } = await import('../src/common.js');

beforeEach(() => {
  mockState.current = createMockCadesplugin();
});

describe('openCertificateStore', () => {
  it('opens the current-user store with maximum allowed access and returns store + certificates', async () => {
    const { store, certs } = await openCertificateStore();

    expect(mockState.current.store.Open).toHaveBeenCalledWith(
      mockState.current.cadesplugin.CADESCOM_CURRENT_USER_STORE,
      'My',
      mockState.current.cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED,
    );
    expect(store).toBe(mockState.current.store);
    expect(certs).toBe(mockState.current.store.Certificates);
  });
});

describe('pluginVersion', () => {
  it('returns the plugin version reported by CAdESCOM.About', async () => {
    mockState.current.aboutObj.Version = '5.0.11813.0';
    const version = await pluginVersion();
    expect(version).toBe('5.0.11813.0');
  });

  it('returns null and swallows the error when the plugin is unavailable', async () => {
    mockState.current.cadesplugin.CreateObjectAsync.mockRejectedValueOnce(new Error('plugin not installed'));
    const version = await pluginVersion();
    expect(version).toBeNull();
  });
});
