import type { Lang } from '@/i18n/ui';

/** Format a wall-clock time in a given IANA time zone, e.g. "14:05". */
export function formatClock(date: Date, timeZone: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
  }).format(date);
}

/** Human readable duration between two years, e.g. 2018 → 2023 = "5 yrs". */
export function yearsBetween(start: number, end: number | null, now = new Date()): number {
  return (end ?? now.getFullYear()) - start;
}
