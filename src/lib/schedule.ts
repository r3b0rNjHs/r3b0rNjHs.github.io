/**
 * Publishing rules for articles, shared by the site and the build scripts.
 * No imports, so Node can run this file directly with its built-in TypeScript support.
 */

/**
 * An article is live when it isn't a draft and its date has arrived. Future-dated articles stay out
 * of the build until then; the daily scheduled deploy publishes them on the morning of their date.
 * `PREVIEW_DRAFTS=1` includes everything, for reviewing upcoming articles locally.
 */
export function isPublished(meta: { date: Date | string; draft?: boolean | string }, now: Date = new Date(), preview = false): boolean {
  if (preview) return true;
  if (meta.draft === true || meta.draft === 'true') return false;
  const date = meta.date instanceof Date ? meta.date : new Date(meta.date);
  return !Number.isNaN(date.getTime()) && date.getTime() <= now.getTime();
}
