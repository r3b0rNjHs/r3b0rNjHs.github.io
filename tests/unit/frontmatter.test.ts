import { describe, expect, it } from 'vitest';
import { readFrontmatter } from '@/lib/frontmatter';
import { articleCardPath, projectCardPath } from '@/lib/cards';

describe('readFrontmatter', () => {
  it('reads strings, quoted values and lists', () => {
    const md = `---\ntitle: A cheap bot that doesn't make things up\ndescription: "Quoted: with a colon"\ndate: 2026-11-03\ntags: [AI agents, LLMs]\n---\n\nBody`;
    expect(readFrontmatter(md)).toEqual({
      title: "A cheap bot that doesn't make things up",
      description: 'Quoted: with a colon',
      date: '2026-11-03',
      tags: ['AI agents', 'LLMs'],
    });
  });

  it('returns an empty object without frontmatter', () => {
    expect(readFrontmatter('# Just a heading')).toEqual({});
  });
});

describe('card paths', () => {
  it('builds article and project card paths per language', () => {
    expect(articleCardPath('es', 'my-post')).toBe('/og/writing/es/my-post.png');
    expect(projectCardPath('en', 'pet-defense')).toBe('/og/work/en/pet-defense.png');
  });
});
