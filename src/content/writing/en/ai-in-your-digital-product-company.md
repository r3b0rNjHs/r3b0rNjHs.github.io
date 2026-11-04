---
title: Where AI is taking us, and how to use it in a digital product company
description: What a two-person studio handed to AI this year, what it took to make it work, and a checklist for product companies that want results instead of demos.
date: 2026-11-09
tags: [AI, Product, Strategy]
---

This year I co-founded a small game studio. Two people built and launched a Roblox game, Pet Defense, whose pre-launch campaigns reached 32,000 players. A team that size can't hire for support, community, QA or marketing, so we handed as much of that as we could to AI. Some of it worked very well. Some of it needed far more structure than I expected.

That experience shapes how I answer when a product company asks me where to start with AI. Here's the map, with the parts that made each piece work.

## What we handed to AI

**Writing code, under rules.** Claude Code worked on the game every day, but never without structure. The repository has rules that load per folder, so server code always follows the anti-cheat rules. There are custom commands to start and finish a session the same way every time, a hook that blocks any push while debug mode is on, and an AI review on every pull request before one of us looks at it. Without that, an agent in a 138,000-line codebase would have been fast and dangerous.

**Answering players.** A Discord assistant answers questions using knowledge generated from the game's own config files, so it's always in step with what's actually live and can't spoil unreleased content. Two model tiers keep it cheap: a small, fast model for the common questions and Claude Sonnet for the hard ones. Every call is logged with tokens, cost and latency.

**Moderation, without AI.** Scam links and the usual toxic patterns are caught with regular expressions, at zero API cost. It's worth saying because the best AI decision is sometimes not to use it.

**Triage and fixes.** Support tickets are classified and turned into GitHub issues. Claude investigates each issue and posts its findings as a comment without touching the code. If we agree, adding one label makes an agent create a branch, write the fix and open a pull request, which a person reviews like any other.

**Content drafts.** Every merge to main generates draft social posts about what changed. A person edits them before anything goes out.

## What made it work

Looking back, the pieces that worked had three things in common. They were attached to work we already did many times a week. Each one had a way to check the output: a test suite, a human review, a label someone had to add. And each had one clear owner, which in a team of two isn't hard, but in a bigger company is the first thing to go missing.

That matches what the bigger studies show. McKinsey's State of AI report from November 2025 found 88% of organisations use AI in at least one function, but only 39% report any effect on enterprise-level profits, and for most of those it's under 5%. A widely quoted MIT report from mid 2025 claimed 95% of generative AI pilots showed no measurable return. Its method was thin and the headline went much further than the data, but its diagnosis rings true to me: the problem was rarely the model and usually the way it was put to work. Google's DORA research describes AI as an amplifier of whatever a team already is, and that's exactly what I saw. Our clear architecture made agents useful. A messy one would have made them a liability.

## A checklist before you start

If I were helping a product company choose its first serious AI project, I'd look for one that meets all five of these.

1. **A workflow with volume.** Something people already do many times a week. A new idea needs adoption on top of AI, and that's two problems at once.
2. **An output you can check.** A test, a total that must match, an approval step. If you can't tell whether it's right, you can't improve it.
3. **One owner.** A person who answers for it in six months, not a committee.
4. **A cost per task.** Log tokens, cost and latency from the first day. It's what lets you choose models on evidence. In one of my projects, measuring showed the most expensive model gave no improvement at nearly twice the cost, so we didn't use it.
5. **A person before anything expensive.** Drafts, suggestions and pull requests are good first targets, because someone decides before a customer sees anything.

## Where this is going

I'm wary of predictions, so I'll stick to what I've already seen happen.

Agents are taking on longer chains of work. Our ticket pipeline goes from a player's message to a reviewed pull request with only two human decisions in between. A year ago I wouldn't have trusted that. McKinsey's data says 62% of organisations are at least experimenting with agents and 23% are scaling them somewhere.

The connections are being standardised. Protocols like MCP mean an integration you build for one assistant works with others, which makes it much cheaper to give agents access to your own tools.

And the bottleneck is moving. In our studio, writing the code was rarely what held us back. Deciding what the game needed, and testing those decisions with real players, was. I expect more product companies to find the same: when building gets cheap, the advantage goes to the teams that know what's worth building.

## Sources

- [McKinsey: The state of AI in 2025: Agents, innovation, and transformation](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)
- [Fortune: MIT report finds 95% of generative AI pilots at companies are failing](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/)
- [Google Cloud: Announcing the 2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
