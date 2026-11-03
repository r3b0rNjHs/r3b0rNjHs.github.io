import type { Lang } from '@/i18n/ui';

/** File name of the generated CV PDF for a language, e.g. "jorge-hernandez-cv-en.pdf". */
export const cvFileName = (lang: Lang): string => `jorge-hernandez-cv-${lang}.pdf`;

/** Public URL of the generated CV PDF. PDFs are written next to the CV page at build time. */
export const cvPdfPath = (lang: Lang): string => `/cv/${cvFileName(lang)}`;
