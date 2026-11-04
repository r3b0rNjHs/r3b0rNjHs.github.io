---
title: Where AI is taking us, and how to use it in a digital product company
description: Almost every company uses AI and few see results. What separates the two, and a practical map of where it pays off in a product team today.
date: 2026-11-05
draft: true
tags: [AI, Product, Strategy]
---

There are two numbers I keep coming back to when people ask me about AI in their company.

The first is from McKinsey's State of AI report, published in November 2025: 88% of organisations now use AI in at least one business function, ten points more than the year before. The second is from the same report: only 39% can point to any effect on their profits, and for most of them it's under 5%.

Almost everyone is using it. Very few are getting much out of it. So the interesting question is what the companies in that small group are doing differently.

## The pilot trap

An MIT report from mid 2025 put it more bluntly. It said around 95% of the generative AI pilots it looked at produced no measurable return. The sample was small and the number got quoted far beyond what it can support, but the explanation the authors gave rings true to me. The problem usually wasn't the model. It was how companies tried to use it.

I've seen the pattern. Someone gets access to a chatbot, builds a demo that impresses everyone in a meeting, and then nothing changes. The demo isn't connected to a real workflow, nobody owns it, and there's no way to tell whether its answers are right. Six months later it's a slide in a deck.

Google's DORA research found something similar in software teams. AI amplifies what's already there. Teams with clear architecture and fast feedback get faster. Teams with messy systems get messier. AI doesn't fix how you work. It makes how you work more visible.

## Where it pays off in a product company

These are the places where I've seen AI earn its keep in small product teams, most of them in projects I built myself.

**Inside engineering.** Coding agents are the most obvious win, but only with structure around them. In the Roblox game I built with one other person, Claude Code worked every day under project rules, custom commands, hooks that block dangerous pushes and AI reviews on every pull request. Without those guardrails it would have been fast chaos.

**Support and community.** A Discord assistant that answers players with knowledge generated from the game's own config files. Two model tiers keep it cheap: a small model for the common questions, a stronger one for the hard ones. Regular expressions handle moderation for free. A two-person studio can't staff support, and this covered most of it.

**Operations.** Support tickets triaged by AI into GitHub issues, investigated by an agent that comments its findings and, when we agree, opens a pull request with the fix. A person still reviews every change.

**Product features with a check.** An API that reads bank statements with an LLM and verifies every result with plain arithmetic. This is the part I'd stress the most. AI features work when you have a cheap, reliable way to know whether the output is right.

**Content.** Drafts for social posts generated from what actually shipped that week. Someone still edits them, but nobody starts from a blank page.

## A checklist before you start

If I had to help a product company pick its first serious AI project, I'd look for something that meets all of these.

1. **A real workflow with volume.** Something people already do many times a week, not a new idea that needs adoption on top of AI.
2. **An output you can check.** A test, a total that has to match, a human approval step. If you can't measure whether it's right, you can't improve it.
3. **An owner.** One person who's responsible for it working in six months, not a committee.
4. **A cost per task.** Log tokens, cost and latency from day one. It's the only way to choose models sensibly and to know when the cheap one is good enough.
5. **A human in the loop where mistakes are expensive.** Drafts, suggestions and pull requests are a great place to start, because a person decides before anything reaches a customer.

## Where it's taking us

I don't know where this ends, and I'm suspicious of anyone who says they do. But a few things already seem clear to me.

Agents will take on longer chains of work. The same McKinsey report says 62% of organisations are at least experimenting with them, and 23% are scaling them somewhere. Open standards like MCP make it easier to connect them to your own tools and data.

Small teams will keep doing what used to need big ones. I've lived that with a game built by two people. It changes what a startup needs to hire for and what a bigger company should expect from each team.

And the bottleneck moves. When building gets cheap, the scarce things become judgement, taste, knowing your customer and knowing which problems are worth solving. That's good news for product companies that already care about those things, and bad news for those hoping AI will do the thinking for them.

## Sources

- [McKinsey: The state of AI in 2025: Agents, innovation, and transformation](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)
- [Fortune: MIT report finds 95% of generative AI pilots at companies are failing](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/)
- [Google: How are developers using AI? Inside our 2025 DORA report](https://blog.google/technology/developers/dora-report-2025/)
