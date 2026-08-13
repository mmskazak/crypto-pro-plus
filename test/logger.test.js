import { describe, it, expect, afterEach, vi } from 'vitest';
import { logger, setLogger } from '../src/logger.js';

afterEach(() => {
  setLogger();
});

describe('logger', () => {
  it('delegates to console by default', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    logger.error('boom', { code: 1 });
    expect(spy).toHaveBeenCalledWith('boom', { code: 1 });
    spy.mockRestore();
  });
});

describe('setLogger', () => {
  it('replaces all methods with a custom logger', () => {
    const custom = { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() };
    setLogger(custom);

    logger.warn('careful');

    expect(custom.warn).toHaveBeenCalledWith('careful');
  });

  it('fills in missing methods of a partial custom logger with the console defaults', () => {
    const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    const custom = { error: vi.fn() };
    setLogger(custom);

    logger.error('bad');
    logger.debug('verbose');

    expect(custom.error).toHaveBeenCalledWith('bad');
    expect(consoleSpy).toHaveBeenCalledWith('verbose');
    consoleSpy.mockRestore();
  });

  it('silences all output when called with null', () => {
    const spies = ['debug', 'info', 'warn', 'error'].map((method) => vi.spyOn(console, method).mockImplementation(() => {}));
    setLogger(null);

    logger.debug('a');
    logger.info('b');
    logger.warn('c');
    logger.error('d');

    spies.forEach((spy) => {
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  it('restores console delegation when called with no arguments', () => {
    setLogger(null);
    setLogger();

    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    logger.info('back to normal');
    expect(spy).toHaveBeenCalledWith('back to normal');
    spy.mockRestore();
  });
});
