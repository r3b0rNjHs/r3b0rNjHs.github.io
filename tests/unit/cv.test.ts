import { describe, expect, it } from 'vitest';
import { cvFileName, cvPdfPath } from '@/lib/cv';

describe('cv paths', () => {
  it('names one PDF per language', () => {
    expect(cvFileName('en')).toBe('jorge-hernandez-cv-en.pdf');
    expect(cvFileName('es')).toBe('jorge-hernandez-cv-es.pdf');
  });

  it('serves PDFs from /cv/', () => {
    expect(cvPdfPath('es')).toBe('/cv/jorge-hernandez-cv-es.pdf');
  });
});
