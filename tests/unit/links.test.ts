import { describe, expect, it } from 'vitest';
import { candidateFiles, extractAbsoluteLinks, extractIds, extractLinks } from '@/lib/links';

describe('extractLinks', () => {
  const html = `
    <a href="/es/work/pet-defense/">x</a>
    <a href="#contact">y</a>
    <a href="../writing/post/#intro">z</a>
    <a href="https://github.com/x">ext</a>
    <a href="mailto:a@b.c">mail</a>
    <img src="/_astro/a.webp" srcset="/_astro/a-480.webp 480w, /_astro/a-800.webp 800w">
    <a href="/search/?q=a&amp;b=1">q</a>`;

  it('resolves same-site links against the page path and skips external schemes', () => {
    const links = extractLinks(html, '/es/work/');
    expect(links.map((l) => `${l.path}#${l.hash}`)).toEqual([
      '/es/work/pet-defense/#',
      '/es/work/#contact',
      '/es/writing/post/#intro',
      '/_astro/a.webp#',
      '/search/#',
      '/_astro/a-480.webp#',
      '/_astro/a-800.webp#',
    ]);
  });
});

describe('extractAbsoluteLinks', () => {
  it('returns absolute http(s) hrefs and skips relative and mail links', () => {
    const html = `
      <a href="https://github.com/r3b0rNjHs">gh</a>
      <link rel="canonical" href="https://r3b0rnjhs.github.io/">
      <a href="/writing/">internal</a>
      <a href="mailto:a@b.c">mail</a>
      <a href="https://example.com/?a=1&amp;b=2">q</a>`;
    expect(extractAbsoluteLinks(html).map(String)).toEqual([
      'https://github.com/r3b0rNjHs',
      'https://r3b0rnjhs.github.io/',
      'https://example.com/?a=1&b=2',
    ]);
  });
});

describe('extractIds', () => {
  it('collects element ids', () => {
    expect(extractIds('<section id="about"></section><h2 id="work-title">')).toEqual(new Set(['about', 'work-title']));
  });
});

describe('candidateFiles', () => {
  it('maps directory paths to their index.html', () => {
    expect(candidateFiles('/es/')).toEqual(['/es/index.html']);
  });

  it('tries the exact file before html and directory fallbacks', () => {
    expect(candidateFiles('/og.png')).toEqual(['/og.png', '/og.png.html', '/og.png/index.html']);
  });
});
