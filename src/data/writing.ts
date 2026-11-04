import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@/i18n/ui';
import { parseEntryId, readingMinutes } from '@/lib/writing';
import { isPublished } from '@/lib/schedule';

/** `PREVIEW_DRAFTS=1 npm run build` renders drafts and future articles, for reviewing them before they go live. */
const preview = process.env.PREVIEW_DRAFTS === '1';

export interface Article {
  slug: string;
  lang: Lang;
  title: string;
  description: string;
  date: Date;
  tags: string[];
  minutes: number;
  entry: CollectionEntry<'writing'>;
}

/** Published articles for a language, newest first. Drafts and future-dated articles stay out of the build. */
export async function getArticles(lang: Lang): Promise<Article[]> {
  const entries = await getCollection('writing', (e) => isPublished(e.data, new Date(), preview) && parseEntryId(e.id).lang === lang);
  return entries
    .map((entry) => ({
      ...parseEntryId(entry.id),
      title: entry.data.title,
      description: entry.data.description,
      date: entry.data.date,
      tags: entry.data.tags,
      minutes: readingMinutes(entry.body ?? ''),
      entry,
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime() || a.slug.localeCompare(b.slug));
}
