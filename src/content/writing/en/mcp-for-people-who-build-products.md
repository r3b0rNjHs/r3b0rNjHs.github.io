---
title: MCP, explained for people who build products
description: What the Model Context Protocol is, why every major AI company adopted it in a year, and how to start using it without opening a security hole.
date: 2026-11-05
draft: true
tags: [MCP, AI agents, Product]
---

A big part of my work at Trenddi was getting MCP integrations into the way the engineering team worked. Since then, I get asked the same question by people on the product side: what is MCP, really, and should we care?

The short answer is yes. Here's the slightly longer one.

## The problem it solves

A language model on its own only knows what was in its training data and what you put in the prompt. To be useful inside a company it needs to reach things: the ticket tracker, the database, the docs, the deploy pipeline, the CRM.

Before MCP, every AI product connected to every tool in its own way. If you wanted your internal docs available in three different assistants, you built three different integrations. If a new assistant came out, you started again.

## What MCP is

The Model Context Protocol is an open standard for connecting AI applications to tools and data. Anthropic published it in November 2024.

There are two sides. An **MCP server** exposes something: a set of tools the model can call (search tickets, run a query, create a draft), resources it can read (files, records) and reusable prompts. An **MCP client** is the AI application that connects to those servers, like a chat assistant, an IDE or a coding agent.

You write the server once. Any client that speaks MCP can use it.

## Why it took over so fast

What surprised me was how quickly the rest of the industry adopted it. In March 2025, OpenAI announced MCP support, starting with its Agents SDK and then its desktop app and API. Google, Microsoft and others followed. In December 2025, Anthropic donated MCP to the new Agentic AI Foundation under the Linux Foundation, co-founded with OpenAI and Block, so no single company controls it anymore.

For a product team, that matters more than any technical detail. It means an integration you build today isn't tied to one vendor's assistant. If you change models or tools next year, your MCP servers come with you.

## Where it's useful in a product company

The best first uses I've seen are boring in a good way.

**Internal knowledge.** A read-only server over your docs, ADRs and runbooks, so people can ask questions and get answers that cite the actual source.

**Engineering workflows.** Letting a coding agent read tickets, logs or the CI status, so it works with the same context a developer would.

**Support.** Giving an assistant safe, scoped access to order status or account data, instead of pasting screenshots into a chat.

**Your own product.** If your customers use AI assistants, an MCP server can become a new way for them to use your product from wherever they already work.

## What to be careful with

MCP makes it very easy to give a model access to things. That's the point, and it's also the risk.

**Start read-only.** Reading data is much easier to make safe than changing it. Add write tools later, one at a time.

**Put people in front of writes.** For anything that changes data, sends a message or spends money, require a human approval step. Drafts and suggestions first, actions later.

**Scope the access.** A server should see what the task needs and nothing more. Treat it like any other service account.

**Log every call.** Which tool, with what input, for which user. You'll need it to debug, and you'll need it the first time something goes wrong.

**Check what the model actually does with tools.** In one of my own projects, a small, cheap model sometimes skipped the tool and answered from memory. I ended up giving that model no tools at all and putting the knowledge straight into its prompt. Tools are only as reliable as the model calling them, so test with the model you'll really use.

## Should you care?

If your company builds or uses AI features, yes. MCP turns integrations into something you build once and reuse, and the whole industry has agreed on it. That's rare, and it's worth taking advantage of.

## Sources

- [Anthropic: Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
- [TechCrunch: OpenAI adopts rival Anthropic's standard for connecting AI models to data](https://techcrunch.com/2025/03/26/openai-adopts-rival-anthropics-standard-for-connecting-ai-models-to-data/)
- [Anthropic: Donating the Model Context Protocol and establishing the Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
