/**
 * Paths of the generated social cards, shared by the pages' meta tags and scripts/generate-cards.mjs.
 * No imports, so Node can run this file directly with its built-in TypeScript support.
 */

/** Card for an article, e.g. "/og/writing/es/my-post.png". */
export const articleCardPath = (lang: string, slug: string): string => `/og/writing/${lang}/${slug}.png`;

/** Card for a project case study, e.g. "/og/work/en/pet-defense.png". */
export const projectCardPath = (lang: string, slug: string): string => `/og/work/${lang}/${slug}.png`;

/** Where the build publishes the data the project cards are drawn from. */
export const PROJECT_CARDS_DATA = '/og/projects.json';
