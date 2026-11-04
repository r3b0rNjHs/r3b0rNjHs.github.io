---
title: The cheapest habit that makes coding agents useful
description: Architecture decision records are a 2011 idea that became more valuable with AI. Why agents need the "why" of your code, and how to write ADRs that help.
date: 2026-11-05
draft: true
tags: [Architecture, Claude Code, Workflow]
---

If you look at the repositories I've worked on this year, you'll find the same folder in almost all of them: `docs/adr`. Nine records in the Roblox game, eight in the bank statement API, five in this portfolio. It's the habit I'd recommend first to any team that starts working with coding agents, and it costs almost nothing.

## What an ADR is

An architecture decision record is a short document that captures one decision: what you decided, why, and what it costs you. The idea comes from Michael Nygard, who proposed it in a blog post in November 2011. His format is still the one most people use.

- **Title**, with a number. "ADR 3. Server owns all game state."
- **Status**. Proposed, accepted, replaced by another one.
- **Context**. The situation and the forces at play.
- **Decision**. What we're doing, in one or two sentences.
- **Consequences**. What gets easier, what gets harder, what we're accepting.

They live in the repository, next to the code they describe, as plain Markdown files. That detail turned out to matter a lot.

## Why agents need them

A coding agent can read your entire codebase in seconds. What it can't read is the reasoning behind it. Code tells you what the system does. It almost never tells you why it does it that way, or which alternatives somebody already tried and dropped.

Without that, an agent does what a smart new hire would do. It sees something that looks odd and "fixes" it. It sees a pattern and assumes it's an accident. It suggests the obvious solution that you rejected six months ago for a good reason nobody wrote down.

With ADRs in the repo, the reasoning is right there. In the game, our first ADR split the code into a reusable core and a game layer. The second made the server the owner of all state, to prevent cheating. If an agent proposes letting the client update a player's coins directly, because it's simpler, the answer is one line: read ADR 2. No debate, and no explaining the same thing again in every session.

I also reference the ADR folder from the project's `CLAUDE.md`, the file Claude Code reads first. That way the agent knows where the decisions are before it starts touching anything.

## Writing ADRs that actually help

After a year of writing them with and for agents, a few things make the difference.

**Keep them short.** One page at most. If it needs more, it's probably two decisions.

**Write the consequences honestly.** The bad ones too. "This makes local development slower" is exactly the kind of sentence that stops someone from undoing the decision without thinking.

**One decision per record.** It's tempting to write "the architecture document". Don't. Small records are easier to find, to link and to replace.

**Replace, don't edit.** When a decision changes, write a new ADR that supersedes the old one and mark the old one as replaced. The history of why you changed your mind is useful too.

**Write them when you decide, not later.** Later never comes. The best moment is the same pull request that introduces the change, and an agent can draft the first version for you from the discussion.

## Beyond agents

Everything I just said was true before AI. ADRs help new people join a team, help you remember why you did something a year ago and make architecture reviews faster. Agents just made the cost of not having them visible very quickly, because an agent asks "why" a hundred times a day without saying it.

It's the cheapest habit I know with this kind of return. A folder, a template and five minutes per decision.

## Sources

- [Michael Nygard: Documenting Architecture Decisions (2011)](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [Martin Fowler: Architecture Decision Record](https://martinfowler.com/bliki/ArchitectureDecisionRecord.html)
