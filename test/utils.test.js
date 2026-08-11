import { describe, it, expect } from 'vitest';
import { toBase64Unicode } from '../src/utils.js';

describe('toBase64Unicode', () => {
  it('encodes ASCII strings the same way as btoa', () => {
    expect(toBase64Unicode('hello')).toBe(btoa('hello'));
  });

  it('correctly encodes multibyte UTF-8 strings (Cyrillic)', () => {
    const result = toBase64Unicode('Привет');
    const decodedBytes = Uint8Array.from(atob(result), (c) => c.charCodeAt(0));
    expect(new TextDecoder().decode(decodedBytes)).toBe('Привет');
  });

  it('returns an empty string for empty input', () => {
    expect(toBase64Unicode('')).toBe('');
  });
});
