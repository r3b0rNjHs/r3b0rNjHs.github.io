---
title: What full stack means, and why you're one without being one
description: Nobody masters every layer anymore, and that was never the point. A more useful definition of full stack, and why AI makes it more relevant.
date: 2026-11-05
draft: true
tags: [Engineering, Full stack, Career]
---

I put "full stack" on my CV recently and hesitated before doing it. It's true, but the word has been stretched so far that it can mean almost anything. For some recruiters it means React and Node. For others it means someone who can also do the design, the database and the Kubernetes cluster, ideally for a junior salary.

So I want to explain what I mean when I use it, and why I think most good engineers are full stack in a way that has nothing to do with knowing everything.

## Where the word comes from

The term is usually traced back to Carlos Bueno, an engineer at Facebook, who wrote a well known piece around 2010 about "the full stack". The idea was simple. Facebook wanted engineers who could work at any level of the system, from the user interface to the servers, and who understood how a change in one layer affected the others.

At the time, the stack was something you could picture. A browser, a web server, an application, a database, a machine. Knowing all of it well was hard, but possible.

## The stack kept growing

Today the stack I work with on a normal project includes the frontend framework, an API, one or two databases, a queue, containers, infrastructure as code, CI pipelines, observability, a cloud provider with two hundred services and, more and more often, a language model with its own costs, latencies and failure modes.

Nobody is an expert in all of that. I've designed and run platforms on AWS and Kubernetes, built React frontends and Node.js backends, worked as an SRE and led teams as a CTO. I'm deep in architecture, backend and infrastructure. I'm competent on the frontend, and I'm not the person you want choosing your typography. If full stack means "expert in every layer", I'm not one. Nobody is.

## A more useful definition

The definition that has worked for me is this: a full stack engineer can follow a problem through every layer of the system and own the result.

When something breaks, they don't stop at the edge of their own code. They can open the browser's network tab, read the API logs, look at the query plan, check the deploy and find where it actually broke. They might not fix every layer themselves in the best possible way, but they know enough to ask the right question to the right person, or to make a sensible fix and flag it.

That's very close to the old idea of T-shaped people, which goes back to at least 1991 and was popularised later by Tim Brown at IDEO. Depth in one or two areas, and enough breadth to work with everyone else. Full stack is the T-shape applied to a software system.

## Why you're one without being one

This is where the title of this post comes from. Most experienced engineers I know would say "I'm not really full stack, I'm a backend person". And then you watch them debug a production incident and they move through CSS, SQL, DNS and a Terraform plan without blinking.

They're full stack. They just measure it against the wrong standard. They compare themselves to the specialist in each layer, and of course they lose that comparison in every layer except their own. But the value was never in beating the specialist. It's in being the person who sees the whole path a request takes and notices where it goes wrong.

If you can do that, you're full stack, even if you'd never write it on your CV.

## AI makes this more important

Coding agents change the equation in an interesting way. They make it much easier to work in a layer you don't know well. I can ask an agent to write a CSS animation or a Rust function and get something decent in minutes.

What they don't give you is the judgement to know whether it's right. An agent widens your reach. Your understanding of the system decides whether that reach is useful or dangerous. The engineers who get the most out of AI are the ones who already understand how the layers fit together, because they can tell when the agent's answer works in isolation but breaks something two layers away.

So I think full stack is becoming more valuable. Less as a list of frameworks you know, and more as understanding the whole system well enough to direct the work, whether a person or an agent writes the code.

## How I'd describe it in an interview

If someone asks me whether I'm full stack, I don't list technologies. I say something like: I'm strongest in architecture, backend and infrastructure, I'm comfortable building and shipping frontends, and I can follow any problem from the browser to the database to the cloud and fix it or find who should. That answer is honest, and in my experience it's what people are really asking.

## Sources

- [T-shaped skills, Wikipedia](https://en.wikipedia.org/wiki/T-shaped_skills)
- [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/)
