---
title: MCP, explained for people who build products
description: What the Model Context Protocol is, why it spread so fast, where I'd use it first in a product company, and what to lock down before you do.
date: 2026-11-05
draft: true
tags: [MCP, AI agents, Product]
---

At Trenddi part of my job was bringing MCP integrations into the way the engineering team worked. Since then, people on the product side keep asking me the same thing: what is MCP, really, and should we care?

My answer is yes, with a few conditions. Here's why, and what the conditions are.

## The problem it solves

A language model on its own only knows what was in its training data and what you put in the prompt. To be useful inside a company it has to reach things: the ticket tracker, the database, the docs, the CI status.

Until recently there was no shared way to do that. Each AI product connected to each tool in its own way. If you wanted your internal docs in three assistants, you built three integrations, and when a new assistant came along you started again.

## What MCP is

The Model Context Protocol is an open standard for connecting AI applications to tools and data. Anthropic published it in November 2024.

There are two sides. An **MCP server** exposes something: tools the model can call (search tickets, run a query, create a draft), resources it can read (files, records) and reusable prompts. An **MCP client** is the AI application that connects to those servers, like a chat assistant, an IDE or a coding agent.

You write the server once, and any client that speaks MCP can use it.

## Why it spread so fast

In March 2025 OpenAI announced MCP support, starting with its Agents SDK. Most of the main AI vendors and developer tools support it now. In December 2025 Anthropic donated the protocol to the Agentic AI Foundation, under the Linux Foundation, so it no longer belongs to one company.

For a product team that matters more than any technical detail. An integration you build today isn't tied to one vendor. If you change models or assistants next year, your servers come with you.

## Where I'd start

These are the first uses I'd recommend to a product company, roughly in order of how easy they are to make safe.

**Internal knowledge.** A read-only server over your docs, decision records and runbooks, so people get answers that point to the real source.

**Engineering context.** Letting a coding agent read tickets, logs and CI results, so it works with the same information a developer would look up.

**Support.** Scoped, read-only access to things like order status, instead of people pasting screenshots into a chat.

**Your own product.** If your customers already work inside AI assistants, an MCP server can be a new way for them to use your product from there. This one needs the most care, because now the users are outside your company.

## What to lock down

MCP makes it very easy to give a model access to things. That's the point, and it's also the risk. These are the rules I'd set before the first server goes live.

**Treat tool output as untrusted.** If a tool returns text written by someone else, like a ticket, an email or a web page, that text can contain instructions aimed at the model. This is prompt injection, and an agent that reads a malicious ticket and then has write access is the case to worry about.

**Only install servers you trust.** A server's tool descriptions go straight into the model's context. A malicious or careless one can steer the model as easily as a malicious ticket can. Review third-party servers like any other dependency, and pin their versions.

**Act as the user, not as an admin.** Where the server talks to a real system, use each person's own credentials, for example through OAuth, so the agent can never see more than the person asking.

**Start read-only, and put a person in front of writes.** Reading is much easier to make safe than changing. When you add tools that change data, send messages or spend money, require an approval step.

**Log every call.** Which tool, which input, for which user. You'll need it to debug, and you'll need it the first time something goes wrong.

## Test with the model you'll really use

This one isn't specific to MCP, but it's the lesson that cost me the most time. In the Discord assistant for our game, the cheap tier was supposed to call tools to look things up. Plain function calling through the Vercel AI SDK, not MCP, but the problem is the same. Gemini Flash often skipped the tool and answered from memory. Llama 4 Scout called it, but with malformed arguments. In the end the cheap tier got no tools at all. I put the knowledge it needed straight into its prompt, and only the stronger model uses tools.

A tool is only as reliable as the model calling it. Before building a server, check that the model you'll pay for can use it properly.

## When it's too much

If one application needs to talk to one internal API, a normal function call in your own code is simpler and easier to secure. MCP pays off when several clients need the same capability, or when you want people to bring their own assistant. Below that, it's one more moving part.

## Sources

- [Anthropic: Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
- [TechCrunch: OpenAI adopts rival Anthropic's standard for connecting AI models to data](https://techcrunch.com/2025/03/26/openai-adopts-rival-anthropics-standard-for-connecting-ai-models-to-data/)
- [Anthropic: Donating the Model Context Protocol and establishing the Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
