/** Parses `YYYY-MM-DD` as a local date (no UTC shift). */
export const parseIsoDate = (date: string): Date | undefined => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return undefined;
  const parsed = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

/** Serializes a local date to `YYYY-MM-DD`. */
export const toIsoDate = (date: Date) =>
  [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');

/** Formats a `YYYY-MM-DD` date in Polish. */
export const formatDate = (date: string) => {
  const parsed = parseIsoDate(date);
  if (!parsed) return date;
  return new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }).format(parsed);
};
