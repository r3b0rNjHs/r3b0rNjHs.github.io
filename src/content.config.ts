import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Articles live in `src/content/writing/<lang>/<slug>.md`. Both translations of an article share
 * the same file name, which is also its URL slug, so the language switch maps one to the other.
 */
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string().min(10),
    description: z.string().min(40).max(200),
    date: z.coerce.date(),
    tags: z.array(z.string()).min(1),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
