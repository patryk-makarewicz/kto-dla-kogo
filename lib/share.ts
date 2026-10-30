import type { EventInfo } from '@/model/event.model';

export interface RevealPayload {
  v: 1;
  /** giver name */
  g: string;
  /** receiver name */
  r: string;
  /** event name */
  e?: string;
  /** budget */
  b?: string;
  /** hand-over date (YYYY-MM-DD) */
  d?: string;
}

const toBase64Url = (text: string) => {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const fromBase64Url = (encoded: string) => {
  const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '='));
  return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
};

export const encodeReveal = (giver: string, receiver: string, event: EventInfo): string => {
  const payload: RevealPayload = { v: 1, g: giver, r: receiver };
  if (event.name) payload.e = event.name;
  if (event.budget) payload.b = event.budget;
  if (event.date) payload.d = event.date;
  return toBase64Url(JSON.stringify(payload));
};

export const decodeReveal = (encoded: string): RevealPayload | null => {
  try {
    const data = JSON.parse(fromBase64Url(encoded.replace(/^#/, '')));
    if (data?.v !== 1 || typeof data.g !== 'string' || typeof data.r !== 'string' || !data.g || !data.r) {
      return null;
    }
    const optional = (value: unknown) => (typeof value === 'string' && value ? value : undefined);
    return { v: 1, g: data.g, r: data.r, e: optional(data.e), b: optional(data.b), d: optional(data.d) };
  } catch {
    return null;
  }
};

/** Hash keeps the payload out of server logs and analytics. */
export const buildRevealUrl = (origin: string, encoded: string) => `${origin}/wynik#${encoded}`;

export const buildShareMessage = (giver: string, eventName: string, url: string) => {
  const occasion = eventName ? ` „${eventName}”` : '';
  return `Cześć ${giver}! 🎁 Losowanie${occasion} gotowe. Zobacz, komu robisz prezent (tylko Ty to zobaczysz): ${url}`;
};

/** `?&body=` works on both iOS and Android. */
export const buildSmsHref = (phone: string, message: string) => `sms:${phone}?&body=${encodeURIComponent(message)}`;

export const buildWhatsAppHref = (phone: string, message: string) =>
  `https://wa.me/${phone.replace(/^\+/, '')}?text=${encodeURIComponent(message)}`;
