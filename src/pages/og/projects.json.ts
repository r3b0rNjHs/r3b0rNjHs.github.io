import type { APIRoute } from 'astro';
import { projects } from '@/data/projects';
import { locales } from '@/i18n/ui';

/**
 * Data for scripts/generate-cards.mjs. Project data imports images, so plain Node can't read it;
 * the build publishes what the cards need instead. Projects with their own key art or screenshots
 * share that image, so only the ones without a gallery get a generated card.
 */
export const GET: APIRoute = () =>
  Response.json(
    projects
      .filter((p) => p.gallery.length === 0)
      .flatMap((p) =>
        locales.map((lang) => ({
          slug: p.slug,
          lang,
          title: p.title,
          kind: p.kind[lang],
          tagline: p.tagline[lang],
          hue: p.hue,
        })),
      ),
  );
