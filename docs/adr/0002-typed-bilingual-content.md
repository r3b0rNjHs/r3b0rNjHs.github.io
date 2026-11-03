# 0002 — Typed bilingual content as the single source of truth

- **Status:** Accepted
- **Date:** 2026-11-03

## Context

The site is published in English (default) and Spanish. Duplicating pages per language invites drift: one language gets a fix, the other does not.

## Decision

- Routes are thin: `/` and `/es/` render the **same** view components with a `lang` prop.
- All copy is typed data. UI strings live in `src/i18n/ui.ts` (keys type-checked), and long-form content lives in `src/data/*` as `{ en, es }` pairs.
- English pages have no prefix. Spanish pages are prefixed with `/es/`. `localePath()` builds every internal link.
- Unit tests assert key parity between dictionaries and that no `{ en, es }` value is empty.

## Consequences

- Adding a language means adding one key per value. The type system and tests point at every gap.
- Writers edit data files, not markup.
- Some copy (for example long case studies) would be more pleasant in Markdown. If it grows, migrate to content collections with the same `{ en, es }` contract.
