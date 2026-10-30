import { describe, expect, it } from 'vitest';

import { normalizePhone } from './phone';
import {
  buildRevealUrl,
  buildShareMessage,
  buildSmsHref,
  buildWhatsAppHref,
  decodeReveal,
  encodeReveal
} from './share';

describe('reveal payload', () => {
  it('round-trips Polish characters and emoji', () => {
    const encoded = encodeReveal('Zażółć Gęślą', 'Jaźń 🎄', {
      name: 'Wigilia 2026',
      budget: 'do 150 zł',
      date: '2026-12-24'
    });
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(decodeReveal(encoded)).toEqual({
      v: 1,
      g: 'Zażółć Gęślą',
      r: 'Jaźń 🎄',
      e: 'Wigilia 2026',
      b: 'do 150 zł',
      d: '2026-12-24'
    });
  });

  it('omits empty event fields', () => {
    expect(decodeReveal(encodeReveal('Ala', 'Ola', { name: '', budget: '', date: '' }))).toEqual({
      v: 1,
      g: 'Ala',
      r: 'Ola',
      e: undefined,
      b: undefined,
      d: undefined
    });
  });

  it('accepts a leading hash', () => {
    expect(decodeReveal(`#${encodeReveal('Ala', 'Ola', { name: '', budget: '', date: '' })}`)?.r).toBe('Ola');
  });

  it.each(['', '###', 'not-base64!', btoa('{"v":2,"g":"a","r":"b"}'), btoa('{"v":1,"g":"a"}')])(
    'returns null for invalid payload %s',
    (input) => {
      expect(decodeReveal(input)).toBeNull();
    }
  );
});

describe('share links', () => {
  const url = buildRevealUrl('https://kto-dla-kogo.vercel.app', 'abc');

  it('puts the payload in the hash', () => {
    expect(url).toBe('https://kto-dla-kogo.vercel.app/wynik#abc');
  });

  it('builds a message with and without event name', () => {
    expect(buildShareMessage('Ala', 'Wigilia', url)).toContain('„Wigilia”');
    expect(buildShareMessage('Ala', '', url)).toContain('Losowanie gotowe');
  });

  it('builds sms and whatsapp hrefs with encoded body', () => {
    expect(buildSmsHref('+48600100200', 'a b&c')).toBe('sms:+48600100200?&body=a%20b%26c');
    expect(buildWhatsAppHref('+48600100200', 'a b')).toBe('https://wa.me/48600100200?text=a%20b');
  });
});

describe('normalizePhone', () => {
  it.each([
    ['600 100 200', '+48600100200'],
    ['600-100-200', '+48600100200'],
    ['+48 600 100 200', '+48600100200'],
    ['0048600100200', '+48600100200'],
    ['+44 20 7946 0958', '+442079460958']
  ])('%s -> %s', (input, expected) => {
    expect(normalizePhone(input)).toBe(expected);
  });

  it.each(['', '123', 'abc600100200', '+1234567890123456'])('rejects %s', (input) => {
    expect(normalizePhone(input)).toBeNull();
  });
});
