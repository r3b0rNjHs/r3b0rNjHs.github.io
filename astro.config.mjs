// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://r3b0rnjhs.github.io',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } },
    }),
  ],
  markdown: {
    // Dual themes: colours are emitted as CSS variables and switched with the site theme.
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark-dimmed' }, defaultColor: false },
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
