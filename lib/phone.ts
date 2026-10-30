const DEFAULT_COUNTRY_CODE = '48';

/**
 * Normalizes a user-typed phone number to E.164-like form (`+48600100200`).
 * Nine-digit numbers without a prefix are treated as Polish.
 * Returns `null` when the input can't be a valid phone number.
 */
export const normalizePhone = (input: string): string | null => {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (/[^\d\s+()-]/.test(trimmed)) return null;

  let digits = trimmed.replace(/\D/g, '');
  const hasPlus = trimmed.startsWith('+');

  if (!hasPlus && digits.startsWith('00')) digits = digits.slice(2);
  else if (!hasPlus && digits.length === 9) digits = DEFAULT_COUNTRY_CODE + digits;

  if (digits.length < 10 || digits.length > 15) return null;

  return `+${digits}`;
};
