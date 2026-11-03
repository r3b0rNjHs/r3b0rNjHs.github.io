import type { Lang } from '@/i18n/ui';

/** Estimated reading time in whole minutes (never less than 1), at an average adult reading speed. */
export function readingMinutes(text: string, wordsPerMinute = 220): number {
  const words = text
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

/** Long, locale-aware publication date, e.g. "3 November 2026" / "3 de noviembre de 2026". */
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** Split a collection entry id ("en/my-post") into its language and slug. */
export function parseEntryId(id: string): { lang: Lang; slug: string } {
  const [lang, ...rest] = id.split('/');
  if ((lang !== 'en' && lang !== 'es') || rest.length === 0) throw new Error(`Unexpected article id "${id}"`);
  return { lang, slug: rest.join('/').replace(/\.md$/, '') };
}
