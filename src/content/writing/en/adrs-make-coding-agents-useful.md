---
title: The cheapest habit that makes coding agents useful
description: Architecture decision records are a 2011 idea that became more valuable with AI. Why agents need the "why" of your code, and how I write ADRs that help.
date: 2026-11-11
tags: [Architecture, Claude Code, Workflow]
---

Most of the repositories I worked on this year have a folder of architecture decision records. Nine in the Roblox game, eight in the bank statement API I'm building (in `docs/decisions`), seven in a backend exercise and five in this portfolio. If a team asked me for one habit to adopt before working with coding agents, it would be this one.

## What an ADR is

An architecture decision record is a short document about one decision: what you decided, why, and what it costs you. The lightweight format most teams use comes from Michael Nygard, who described it in a blog post in November 2011. His sections are:

- **Title**, with a number. "ADR 2. Server-authoritative game state."
- **Context**. The situation and the forces at play.
- **Decision**. What we're doing.
- **Status**. Proposed, accepted, or superseded by a later one.
- **Consequences**. What gets easier, what gets harder, what we're accepting.

They live in the repository, next to the code they describe, as plain Markdown. That detail turned out to matter more than I expected.

## Why agents need them

A coding agent can read a whole codebase in seconds. What it can't read is the reasoning behind it. Code tells you what the system does. It rarely tells you why it does it that way, or which alternatives were already tried and dropped.

Without that, an agent behaves like a smart new hire on their first day. Something looks odd, so it tidies it up. A constraint looks accidental, so it removes it. It suggests the obvious solution that was rejected months ago for a reason nobody wrote down.

In the game, ADR 2 makes the server the owner of all game state, so a modified client can't give itself coins or items. It's the kind of rule that looks like overhead when you only see the code, because letting the client update a value directly is always simpler. With the record in the repository, the reasoning is one file away, and I don't have to explain it again at the start of every session.

The project's `CLAUDE.md`, the file Claude Code reads first, points to the ADR folder, and some of the per-folder rules for server code mention specific records by number. So the agent finds the decisions before it changes anything, not after.

## How I write them

A few things make the difference, after a year of writing them for people and agents.

**Short is relative.** Nygard aimed for a page or two. Mine are often longer, the longest one in the game is about 1,200 words, because a hard decision has a lot of context. What I keep strict is that each record covers one decision.

**Write the consequences honestly.** The bad ones too. "This makes local testing slower" is exactly the sentence that stops someone, or something, from undoing the decision without thinking.

**Supersede instead of rewriting.** When a decision changes, write a new record and mark the old one as superseded, so the history of why you changed your mind survives. I'll admit I don't always do it. When we moved player data to ProfileStore, I marked ADR 5 as superseded and added the update as a section inside the same file instead of writing ADR 10. It works, because the reasoning is still there, but it's harder to find than a new record would be.

**Write them in the same pull request as the change.** Later never comes. An agent can draft the first version from the discussion, and I edit it, because the reasoning has to be mine.

## Beyond agents

None of this is new. ADRs helped people join teams and helped teams remember their reasons long before AI. Agents just made the cost of not having them visible very quickly, because an agent effectively asks "why is it like this" every time it opens a file, without saying so.

A folder, a template and the discipline to write one each time a decision is hard to reverse. I don't know a cheaper habit with this kind of return.

## Sources

- [Michael Nygard: Documenting Architecture Decisions (2011)](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [Martin Fowler: Architecture Decision Record](https://martinfowler.com/bliki/ArchitectureDecisionRecord.html)
