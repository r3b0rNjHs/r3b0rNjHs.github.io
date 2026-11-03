import { describe, expect, it } from 'vitest';
import { getLangFromUrl, localeFile, localePath, stripLang, ui, useTranslations } from '@/i18n/ui';

describe('locale routing', () => {
  it('detects the language from the URL', () => {
    expect(getLangFromUrl(new URL('https://x.dev/'))).toBe('en');
    expect(getLangFromUrl(new URL('https://x.dev/es/work/pet-defense'))).toBe('es');
    expect(getLangFromUrl(new URL('https://x.dev/essays'))).toBe('en');
  });

  it('builds unprefixed paths for the default language', () => {
    expect(localePath('en')).toBe('/');
    expect(localePath('en', '/work/a')).toBe('/work/a/');
    expect(localePath('en', 'work/a')).toBe('/work/a/');
  });

  it('prefixes non-default languages', () => {
    expect(localePath('es')).toBe('/es/');
    expect(localePath('es', '/#work')).toBe('/es/#work');
    expect(localePath('es', '/work/a')).toBe('/es/work/a/');
  });

  it('keeps hashes and query strings after the trailing slash', () => {
    expect(localePath('en', '/#contact')).toBe('/#contact');
    expect(localePath('es', '/work/a?ref=cv')).toBe('/es/work/a/?ref=cv');
  });

  it('strips the language prefix', () => {
    expect(stripLang('/es')).toBe('/');
    expect(stripLang('/es/')).toBe('/');
    expect(stripLang('/es/work/a/')).toBe('/work/a/');
    expect(stripLang('/essays')).toBe('/essays');
  });

  it('round-trips between languages', () => {
    for (const path of ['/', '/work/pet-defense/']) {
      expect(stripLang(localePath('es', path))).toBe(path);
    }
  });
});

describe('localeFile', () => {
  it('prefixes files for non-default languages without adding a slash', () => {
    expect(localeFile('en', '/rss.xml')).toBe('/rss.xml');
    expect(localeFile('es', 'rss.xml')).toBe('/es/rss.xml');
  });
});

describe('dictionaries', () => {
  it('have exactly the same keys in every language', () => {
    expect(Object.keys(ui.es).sort()).toEqual(Object.keys(ui.en).sort());
  });

  it('translate keys', () => {
    expect(useTranslations('es')('nav.work')).toBe('Proyectos');
    expect(useTranslations('en')('nav.work')).toBe('Work');
  });
});
