---
title: What it means to be a software engineer in 2026
description: Almost every developer uses AI now, and most of them don't trust it. What's left of the job when typing code stops being the hard part.
date: 2026-11-05
draft: true
tags: [Engineering, AI, Career]
---

When I started at Lean Mind in 2018, being a good engineer looked fairly concrete. You knew your language well, you wrote clean code, you tested it and you could explain your design to someone else. Typing the code was a big part of the job, so being fast and accurate at it mattered.

Eight years later most of the code I ship goes through an agent first. And I'm not unusual. In the 2025 Stack Overflow survey, 84% of developers said they use or plan to use AI tools, and about half of professional developers use them every day. Google's DORA report for the same year puts AI use at work around 90%.

So the question is fair: if a model can write the code, what exactly is an engineer for?

## Everyone uses it, almost nobody trusts it

The same surveys that show the adoption show something less comfortable. In the Stack Overflow data, more developers distrust the accuracy of AI tools (46%) than trust it (33%), and only 3% trust it highly. The most common frustration, picked by 66% of respondents, is answers that are almost right, but not quite.

That "almost right" is the whole story. Code that's obviously broken is cheap, because it fails at once. Code that looks right and is subtly wrong is expensive, because it fails later, in production, in front of someone.

There's also a gap between how fast we feel and how fast we are. In July 2025, METR ran a randomised trial with 16 experienced open source developers working on their own repositories. With AI tools allowed, they took 19% longer to finish their tasks. Before starting, they expected to be about 24% faster, and even after finishing they believed they had been about 20% faster. It's a small study with clear limits, and the tools have improved since, but the perception gap is the part that stuck with me. If we can't feel the difference, we need something other than our feelings to measure it.

## What the job is now

The way I see it, the job moved from producing code to being responsible for what the code does. Those were always the same job, but typing used to take so much of the day that it hid the rest. Now the rest is most of the day.

In practice that means a few things.

**Framing the problem.** An agent will happily solve the problem you describe. If you describe the wrong one, you get a fast, well written answer to the wrong question. Knowing what to build, what to leave out and what "done" means is more valuable than ever, because the cost of building the wrong thing dropped and so we build more of it.

**Verifying.** Tests, evals, reconciliation, a human review. When I built an API that reads bank statements with an LLM, the most important piece of code wasn't the extraction. It was the boring arithmetic that checks the numbers add up, because that's what lets anyone trust the result. Every system that uses AI needs its own version of that check.

**Designing the system.** DORA's main conclusion in 2025 was that AI amplifies what a team already is. Teams with loosely coupled architectures and fast feedback loops get the most out of it. Teams with tangled systems and slow processes see little benefit, or more instability. The architecture is no longer a nice to have for later. It's what decides whether AI helps or hurts.

**Reading more than you write.** I read far more code today than I did as a junior, and most of it I didn't type. Being able to read a diff quickly and spot what's wrong in it is now a core skill, not a senior extra.

**Running it.** Shipping is easier than ever. Keeping something alive, observable and cheap to operate isn't. Everything I learned as an SRE matters more now, not less.

## What I tell people starting out

People ask me whether it still makes sense to learn to program. I think it makes more sense than ever, but the reason changed. You learn it so you can tell when the model is wrong, and so you can design things that are easy to check.

So learn the fundamentals properly. Data structures, how a request travels through a system, how a database actually stores things, how to write a test that fails for the right reason. Use the agents from day one, but make yourself explain every change they make before you accept it. If you can't explain it, you don't own it yet.

## Same title, different job

We still call it software engineering, and I think the name fits better now than it did before. Engineering was never about laying bricks. It's about deciding what to build, making sure it holds and taking responsibility when it doesn't. AI took a lot of the bricklaying off our hands. The rest is still ours.

## Sources

- [Stack Overflow Developer Survey 2025, AI section](https://survey.stackoverflow.co/2025/ai)
- [METR: Measuring the impact of early-2025 AI on experienced open-source developer productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- [Google: How are developers using AI? Inside our 2025 DORA report](https://blog.google/technology/developers/dora-report-2025/)
