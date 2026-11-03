import rss from '@astrojs/rss';
import { getArticles } from '@/data/writing';
import { localePath, ui, type Lang } from '@/i18n/ui';

/** RSS feed for one language. Each locale gets its own feed so readers only get articles they can read. */
export async function articleFeed(lang: Lang, site: URL | undefined): Promise<Response> {
  const articles = await getArticles(lang);
  return rss({
    title: `Jorge Hernández · ${ui[lang]['writing.kicker']}`,
    description: ui[lang]['writing.lede'],
    site: site ?? 'https://r3b0rnjhs.github.io',
    trailingSlash: true,
    customData: `<language>${lang === 'es' ? 'es-ES' : 'en-GB'}</language>`,
    items: articles.map((a) => ({
      title: a.title,
      description: a.description,
      pubDate: a.date,
      link: localePath(lang, `/writing/${a.slug}/`),
      categories: a.tags,
    })),
  });
}
