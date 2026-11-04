---
title: Why I still write tests first when an agent writes the code
description: TDD looked like a casualty of AI coding. In my experience it's the opposite. Tests are how you tell an agent what you want, and how you know it did it.
date: 2026-11-10
tags: [TDD, Claude Code, Engineering]
---

This portfolio has a unit test that fails if any text on the site contains an em dash. It sounds like a joke, but I wrote it for a real reason. I wanted the copy to read like me, and I don't write em dashes. Language models use them constantly. Telling an agent "please don't use em dashes" works for a while and then quietly stops working. A test that turns CI red doesn't stop working.

That small test sums up how I use TDD now that an agent writes most of my code.

## A test is less ambiguous than a sentence

I learned TDD at my first job, in 2018. When coding agents got good, I heard more than once that TDD had run its course: if the agent writes the code, why write tests first?

Because when I describe a feature in plain language, I get the agent's reading of what I said. Often it's exactly what I meant. Sometimes it's a reasonable reading of an ambiguous sentence, and I only find out later.

A failing test is far less ambiguous than a sentence. Given this input, I expect this output, and right now it doesn't work. When I hand an agent a red test and ask it to make it pass, most of the discussion about what "done" means is already settled.

Kent Beck, who developed and popularised TDD, wrote about this in 2025. He separates vibe coding, where you stop caring about the code and accept whatever comes out, from augmented coding, where you still care about the code, its complexity, the tests and their coverage. That's the way I want to work, and tests are what make it possible.

## How I work with an agent

My loop is close to classic TDD, with the agent doing most of the typing.

1. **The failing test comes first.** I write it, or I ask the agent to write it and read it carefully before going on. This is the step I never skip, because it's where I decide what the behaviour should be.
2. **The agent makes it pass.** I don't care much how at this stage.
3. **I read the diff.** With a green test, I spend most of my review on the design, and on whether the test actually covers enough. A passing test only proves what it checks.
4. **We refactor with the tests as a safety net.** This is where agents are very good. They restructure code quickly, and the tests tell both of us if something broke.

## The trap to watch for

An agent wants to finish the task. When a test is hard to pass, the easiest route is sometimes to change the test: a weaker assertion, a skipped case, an expected value updated to match the wrong output.

So I read test changes separately from code changes. When a diff touches a test, I look at those lines first. If the expected value changed, it has to be because the requirement changed, not because the code didn't work.

## Tests for things that aren't code

The idea goes further than unit tests for functions. Most of the tests in this portfolio check things I care about that aren't logic at all:

- every piece of text exists in both English and Spanish;
- no phone number ever ends up in the published data;
- every internal link, image and anchor in the built site resolves;
- the main pages pass an automated accessibility scan with no serious violations;
- and the em dash one.

None of these are hard to write. Each one turns something I would otherwise have to remember into something a machine checks on every push. That helps me, and it helps the agent even more, because the agent doesn't remember anything between sessions.

## The cheapest instructions I can give

When I start a session today, I don't write long instructions about what I want. I write, or ask for, the test that will fail until the feature exists. Then the agent works until it passes, and I review what it did. The test stays in the repository afterwards, so the next session starts with the same rule already in place.

## Sources

- [Kent Beck: Augmented Coding: Beyond the Vibes](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes)
