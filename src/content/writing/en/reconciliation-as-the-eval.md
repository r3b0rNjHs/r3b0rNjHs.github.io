---
title: The best eval for bank statement extraction is whether it balances
description: How I picked a model for an API that turns bank statement PDFs into JSON, and why reconciliation turned out to be a better metric than counting transactions.
date: 2026-11-03
tags: [LLMs, Evals, Product]
---

I've been building an API that takes a bank statement PDF and returns the transactions as JSON. It's focused on Spanish and Latin American banks, which means dates like `03/11`, amounts like `1.234,56` and month names in Spanish. A language model reads the document. Everything after that is normal code.

The interesting part wasn't the extraction. It was deciding which model to use and knowing whether it was doing a good job.

## Counting transactions is the wrong metric

My first instinct was to compare how many transactions each model found. That tells you very little. A model can return the right number of rows with one amount wrong, and that statement is useless to anyone doing accounting.

Bank statements have a property that most documents don't. They are supposed to add up. The opening balance plus every transaction should equal the closing balance, and the running balance should move correctly from one row to the next. If the extraction balances, the chance that it's wrong is tiny. The numbers don't close by accident.

So that became the metric: on real statements, how often does the result balance?

It's also the core of the product. The model returns structured data, then a reconciliation step checks the maths with plain arithmetic and reports the result next to the data. Nobody has to trust the model blindly.

## Testing on real documents

I put together a test set from public documents: official sample statements from banks, real statements published on government transparency portals and a few scanned ones to test the image path.

The first lesson came from the labels. A lot of those files weren't statements at all. Some were product sheets, certificates or a single page with a summary. For those, "zero transactions" is the correct answer, and my first classification mixed them up with real misses. Before blaming the model, check what you're measuring.

The second rule I set for myself: synthetic statements are fine for training, never for evaluating. A model that's good at statements I generated tells me nothing about statements a bank generated.

## Haiku, Sonnet and Opus

I ran the same prompt with three Claude models and measured real cost per statement from token usage.

Opus matched Sonnet on every sample document and cost about 1.8 times more. Haiku was roughly three times cheaper than Sonnet and often correct, but on the harder statements it fell behind. Of six documents that Sonnet balanced, Haiku balanced four. The other two had transactions that didn't add up.

Sonnet is the default. If volume grows, the obvious next step is to start with Haiku and only escalate to Sonnet when reconciliation fails. The same check that protects quality also works as a cost router.

## Small things that cost money

Two problems showed up only when running real documents.

The structured output mode rejected my schema as too complex. I switched to forcing a single tool call with the schema as its input. The guarantee is the same and the validation is more permissive.

Very long or scanned statements sometimes hit the output token limit and returned half a JSON. That's slow and expensive, and the result is unusable. Now, if the response stops because of the token limit, the request fails, the retry layer tries again and the customer isn't charged. Credits are only spent when an extraction succeeds.

## What I took from it

Find the check that tells you the answer is right without a human looking at it. In finance it's reconciliation. In other domains it might be a schema, a total or a round trip. Once you have it, choosing a model, routing between models and deciding when to retry all become much easier questions.
