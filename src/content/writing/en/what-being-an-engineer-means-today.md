---
title: What it means to be a software engineer in 2026
description: Writing code got cheap. Knowing that it's right didn't. What I think the job is now, from building with agents every day.
date: 2026-11-05
tags: [Engineering, AI, Career]
---

Earlier this year I ran an evaluation for an API I'm building that reads bank statements with a language model. I compared three Claude models on the same documents. The cheapest one returned clean, well structured JSON for every statement, and it looked perfect. Yet on two of the six statements where the strongest model got everything right, the cheap one's transactions simply didn't add up.

Nothing in the output looked wrong. The dates were valid, the amounts were plausible and the format was exactly what I'd asked for. The only reason I noticed was a few lines of plain arithmetic that check the opening balance plus every transaction equals the closing balance.

That changed how I describe my job. Writing code, or getting a model to write it, is cheap now. Knowing that the result is right is the expensive part, and that's where I think an engineer earns their salary in 2026.

## The numbers point the same way

I'm not the only one who feels this. In the 2025 Stack Overflow survey, 84% of developers said they use or plan to use AI tools, and about half of professionals use them every day. In the same survey, more of them distrust the accuracy of those tools (46%) than trust it (33%). The most common complaint, picked by two thirds of respondents, is answers that are almost right, but not quite.

Our sense of speed isn't a good guide either. In 2025 METR ran a randomised study with 16 experienced open source developers. With AI allowed they took 19% longer on their tasks, and afterwards they believed they had been 20% faster. METR has since marked those results as out of date and thinks developers are probably faster with today's tools, which matches my experience. What stayed with me is how far apart the feeling of going fast and actually going fast can be. You need something other than the feeling to measure it.

## What the job is now

The way I'd put it, the job moved from producing code to answering for what the code does. It was always both. Typing just used to take up so much of the day that it hid the second half.

In my work, that second half has four parts.

**Deciding what to build.** An agent solves the problem you describe, quickly and confidently. Describe the wrong problem and you get a polished answer to the wrong question. Building got cheaper, so almost all the cost of building the wrong thing now sits in the decision.

**Making it checkable.** For the statement API that's reconciliation. For other systems it's tests, evals or a person who approves the change. My rule is that anything an AI produces needs a check that doesn't depend on the AI.

**Designing so that changes are safe.** In Pet Defense, the Roblox game I built with one other person, the server owns all game state and the content lives in config files. We decided that to prevent cheating. It also kept agent changes contained, because a mistake in one feature couldn't quietly corrupt a player's data from the client. Google's 2025 DORA report saw the same thing across many teams: loosely coupled systems with fast feedback get real gains from AI, and tightly coupled ones with slow processes see little or none.

**Keeping it running.** A year as an SRE taught me that shipping is where the work starts. Agents make shipping faster, so the share of the job that's about operating, observing and paying for what you shipped keeps growing.

## If you're starting out

Learn to program properly. You won't type most of the code, but you'll be the one who says whether it's right, and you can't do that for something you don't understand. Learn how a request travels through a system, how a database stores data and how to write a test that fails for the right reason.

Use agents from the first day, with one rule: before you accept a change, explain it to yourself. If you can't, keep digging until you can.

## So what do I do

When someone asks me what I do these days, my honest answer is that I decide what should exist, I make sure there's a way to know it works and I answer for it when it doesn't. A lot of the code in between is written with an agent.

## Sources

- [Stack Overflow Developer Survey 2025, AI section](https://survey.stackoverflow.co/2025/ai)
- [METR: Measuring the impact of early-2025 AI on experienced open-source developer productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), and [METR's February 2026 update](https://metr.org/blog/2026-02-24-uplift-update/)
- [Google Cloud: Announcing the 2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
