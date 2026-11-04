---
title: Why I still write tests first when an agent writes the code
description: TDD looked like a casualty of AI coding. In my experience it's the opposite. Tests are how you tell an agent what you want, and how you know it did it.
date: 2026-11-05
draft: true
tags: [TDD, Claude Code, Engineering]
---

I learned TDD at my first job, in 2018, and I've used it ever since. When coding agents got good, a common take was that TDD had run its course. If the agent writes the code, why spend time writing tests first?

I write more tests now than I did before. Here's why.

## Tests are the clearest prompt you can write

When I ask an agent for a feature in plain language, I get its interpretation of what I said. Sometimes that's exactly what I meant. Often it's a reasonable reading of an ambiguous sentence.

A failing test has no ambiguity. It says: given this input, I expect this output, and it doesn't work yet. When I give an agent a red test and ask it to make it pass, the conversation about what "done" means is already over. The test is the spec.

Kent Beck, who created TDD, wrote about this in 2025. He separates "vibe coding", where you stop caring about the code and just accept what comes out, from what he calls augmented coding, where you still care about the code, its complexity, the tests and their coverage. I'm firmly in the second camp, and tests are what make it possible.

## Feelings are a bad metric

In 2025, METR ran a study with experienced open source developers. With AI tools, they were 19% slower on their tasks, and afterwards they believed they had been 20% faster. Whatever you think of that particular study, it shows how unreliable our sense of progress is when an agent produces a lot of code very quickly.

A test suite doesn't care how productive you feel. It's green or it isn't.

Google's DORA research found something related at the team level: teams with fast feedback loops are the ones who get the most out of AI. A fast, trustworthy test suite is the most basic feedback loop there is.

## How I work with an agent

My loop is close to classic TDD, with the agent doing most of the typing.

1. **I write the failing test**, or I ask the agent to write it and I read it carefully before going on. This is the step I never skip, because it's where I decide what the behaviour should be.
2. **The agent makes it pass.** I don't care much how at this stage.
3. **I read the diff.** Not the whole codebase, just what changed. With a green test, I'm reviewing the design, not checking whether it works.
4. **We refactor with the tests as a safety net.** This is where agents are genuinely great. They can restructure code fast, and the tests tell both of us if something broke.

## The trap to watch for

Agents want to finish the task. If a test is hard to pass, sometimes the easiest route is to change the test. A weakened assertion, a skipped case, an expected value quietly updated to match the wrong output.

So I treat test changes differently from code changes. When a diff touches tests, I read those lines first and on their own. If the agent changed what a test expects, it has to be because the requirement changed, not because the code didn't work.

## Tests beyond code

The idea goes further than unit tests. In the bank statement API I built, the most important "test" runs in production on every single request: it checks that the opening balance plus all the transactions equals the closing balance. In this portfolio, there are tests that check every piece of text exists in both languages, that every internal link works and that every page passes an accessibility scan. One even fails the build if I write an em dash.

They all do the same job. They turn something I care about into something a machine can check, so I don't have to remember it, and neither does the agent.

## So, still worth it?

More than ever. When typing code is cheap, the expensive part is knowing that the code is right. Tests written first are the cheapest way I know to get there, and they happen to be the best instructions you can give an agent.

## Sources

- [Kent Beck: Augmented Coding: Beyond the Vibes](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes)
- [METR: Measuring the impact of early-2025 AI on experienced open-source developer productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- [Google: How are developers using AI? Inside our 2025 DORA report](https://blog.google/technology/developers/dora-report-2025/)
