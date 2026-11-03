---
title: A cheap support bot that doesn't make things up
description: What I learned building the Discord assistant for Pet Defense, from tool calls that small models skip to generating the bot's knowledge from the game's own config.
date: 2026-11-03
tags: [AI agents, LLMs, Architecture]
---

A game with players needs someone answering questions on Discord. When the studio is two people, that someone is usually whoever is awake. So I built an assistant for the Pet Defense community, plus a few other agents around it for moderation, support tickets and social posts. They all run on a small platform I wrote in TypeScript.

It has been in production for a while. These are the decisions that held up.

## Two models, and the cheap one does most of the work

Most messages in a game community are the same questions asked in different ways. How do I get this pet, how do I unlock that biome, what does this game pass include. Paying for a top model to answer those is a waste.

The platform has two tiers. A cheap model answers the common questions and Claude Sonnet takes the harder ones. Every call is stored in SQLite with the model, tokens, estimated cost and latency, and a small dashboard shows all of it. Without that log I'd be guessing.

The cheap tier started as Gemini Flash. It now runs on Llama 4 Scout through Groq, which is fast and has a free daily quota.

## Small models and tools don't always get along

The original design gave the bot a search tool over the knowledge base. With the cheap model it worked most of the time. The problem was the rest of the time. Sometimes it skipped the tool and answered from memory, which in a game with invented creatures means inventing answers.

The fix was less clever than the original idea. The cheap tier has no tools at all. The knowledge it needs goes straight into the system prompt. The game's player guide and FAQ are small enough for that, and an answer that's always grounded is worth more than an elegant architecture that fails every now and then.

## The knowledge comes from the game, not from a doc

A support bot is only as good as what it knows, and docs go out of date the moment someone ships an update. So the bot doesn't read a doc. It reads the game.

A sync step parses the Luau config files of Pet Defense (pets, biomes, shop items, game passes and currencies) and generates the guide and the FAQ from them. A manifest lists which fields are safe for players, and unreleased biomes and their pets are left out automatically, so the bot can't spoil anything. When the game changes, the next sync updates what the bot knows. Nobody has to remember to edit a doc.

## Not everything needs a model

Moderation runs on regular expressions. Scam links and the usual toxic patterns are caught before any model sees the message, at zero API cost. A model would be slower, more expensive and not much better at this.

## Tickets that turn into pull requests

Support tickets come through Ticket Tool, a bot the community already used. Mine listens for new ticket channels, reads the form and lets AI decide what kind of problem it is. Bugs become GitHub issues automatically.

From there, a two-step investigation with Claude reads the relevant code and posts its findings as a comment on the issue. It doesn't touch anything. If we agree with the diagnosis, adding a `claude-fix` label tells an agent to create a branch, write the fix and open a pull request. That pull request gets reviewed by Claude and then by one of us, like any other.

## Built to be reused

The core doesn't know it's talking to Discord. Incoming messages go through an adapter that turns them into a common format, and the orchestrator only sees that. Each project has its own folder with its config, prompts, knowledge and sync rules, and one bot instance routes messages by server. Pet Defense was the first project. It won't be the last.

## What I'd tell myself at the start

Measure cost per call from day one. Don't give tools to a model that can't use them reliably. Generate knowledge from the source of truth instead of copying it. And use a regular expression when a regular expression is enough.
