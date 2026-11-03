import { describe, expect, it } from 'vitest';
import { locales, ui } from '@/i18n/ui';
import { experience, principles, profile } from '@/data/profile';
import { projects } from '@/data/projects';

/** Recursively collect every bilingual `{ en, es }` value in an object graph. */
function bilingualValues(value: unknown, path = 'root', out: Array<{ path: string; value: Record<string, unknown> }> = []) {
  if (Array.isArray(value)) value.forEach((v, i) => bilingualValues(v, `${path}[${i}]`, out));
  else if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    if ('en' in record && 'es' in record) out.push({ path, value: record });
    else for (const [k, v] of Object.entries(record)) bilingualValues(v, `${path}.${k}`, out);
  }
  return out;
}

describe('projects', () => {
  it('have unique, URL-safe slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it('only link to absolute https URLs', () => {
    for (const link of projects.flatMap((p) => p.links)) expect(link.href).toMatch(/^https:\/\//);
  });

  it('use a valid hue', () => {
    for (const p of projects) {
      expect(p.hue).toBeGreaterThanOrEqual(0);
      expect(p.hue).toBeLessThanOrEqual(360);
    }
  });
});

describe('bilingual content', () => {
  const sources = { projects, experience, principles, bio: profile.bio };

  it.each(Object.entries(sources))('%s is fully translated', (_, source) => {
    const values = bilingualValues(source);
    expect(values.length).toBeGreaterThan(0);
    for (const { path, value } of values) {
      for (const lang of locales) {
        const text = value[lang];
        const filled = Array.isArray(text) ? text.length > 0 && text.every((t) => String(t).trim()) : String(text ?? '').trim();
        expect(filled, `${path}.${lang} is empty`).toBeTruthy();
      }
    }
  });
});

describe('privacy', () => {
  it('never publishes a phone number', () => {
    const everything = JSON.stringify({ profile, experience, projects });
    expect(everything).not.toMatch(/tel:/i);
    // International-format numbers such as "+34 600 000 000".
    expect(everything).not.toMatch(/\+\d{1,3}[\s.-]?\d{3}[\s.-]?\d{3}[\s.-]?\d{3}/);
  });
});

describe('copy style', () => {
  it('uses no em dashes in user-facing text', () => {
    const everything = JSON.stringify({ ui, profile, experience, principles, projects });
    const offenders = everything.match(/[^"]{0,40}\u2014[^"]{0,40}/g) ?? [];
    expect(offenders).toEqual([]);
  });
});
