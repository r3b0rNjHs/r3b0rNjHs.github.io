# 0005. Articles as a Markdown content collection

- **Status:** Accepted
- **Date:** 2026-11-03

## Context

The site gained a writing section. Long-form text is painful to maintain as typed `{ en, es }` objects (see [0002](0002-typed-bilingual-content.md)), and articles need headings, links and code blocks.

## Decision

- Articles are Markdown files in an Astro content collection, validated by a Zod schema (`src/content.config.ts`).
- Each translation lives in `src/content/writing/<lang>/<slug>.md`. Both languages share the slug, so the language switch maps one article to the other with no lookup table.
- Pages, the home page teaser, the command palette and one RSS feed per language all read from `getArticles()` in `src/data/writing.ts`. Drafts never reach the build.
- Code blocks use Shiki with light and dark themes, emitted as CSS variables and switched with the site theme.
- A unit test checks that every article exists in both languages and keeps the house style: no em dashes, no en dashes in prose and none of a short list of stock phrases.

## Consequences

- Writing an article means adding two Markdown files. No component changes.
- The copy-style test is a smoke alarm, not an editor. Articles still need a human read before publishing.
