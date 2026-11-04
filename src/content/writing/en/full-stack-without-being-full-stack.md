---
title: What full stack means, and why you're one without being one
description: Nobody masters every layer, and that was never the point. What the label should mean, what it adds to "senior", and why AI makes it matter more.
date: 2026-11-05
draft: true
tags: [Engineering, Full stack, Career]
---

When I added "full stack" to my CV this month, I hesitated. It's true, but the word means very different things to different people. For many recruiters it means React plus Node. For some companies it means one person who does design, backend, database and the Kubernetes cluster, ideally on a junior salary.

So here's what I mean by it, using the most full stack thing I shipped this year.

## One app, every layer

Aion 2 Companion is a Windows app for players of an online game. To ship it I wrote the Python code that decodes the game's network traffic in real time, the Preact interface that runs inside WebView2, a sixty-line C launcher so Windows shows the app with its own name and icon, the installer, a self-updater that checks a SHA-256 hash, and a CI pipeline that installs an old version on a real Windows machine, upgrades it and checks that the player's progress survived.

I'm not an expert in most of those layers. I'm deep in architecture, backend and infrastructure. On the frontend I'm competent, not brilliant. I had never written a Windows launcher before. And yet the app works, because I could follow every problem from the network capture to the pixel on the screen and decide what to do about it.

That's my definition: **a full stack engineer can follow a problem through every layer of a system, and is willing to ship the fix in a layer that isn't their specialty.**

## What the label adds to "senior"

The fair objection is that "can follow a problem through the whole system" is just what a good senior engineer does. Half of it is. Plenty of senior engineers can diagnose an issue in another layer and then hand it over.

The part the label adds is the second half: shipping there. Writing the CSS, the SQL migration or the Terraform change yourself, at a decent level, and owning it afterwards. In a small team that's often the difference between something going out this week or next month.

I'll also admit that this isn't how the market uses the word. Most job ads mean "frontend and backend in JavaScript". When I use it, I mean the broader version, and I try to say so.

## A bit of history

The term is usually traced to Carlos Bueno, then at Facebook, who wrote in 2010 about a "full-stack programmer": a generalist who understands each layer well enough to see how a change in one affects the others. The idea is close to the older "T-shaped" profile, which goes back at least to the late 1970s and that Tim Brown at IDEO later made popular. Depth in one or two areas, and enough breadth to work across the rest.

What changed since 2010 is the size of the stack. Today it also includes containers, infrastructure as code, CI, observability, a cloud provider with hundreds of services and, more and more, a language model with its own costs and failure modes. Being an expert in all of it isn't realistic. Being able to work in all of it still is.

## Why AI makes it matter more

I built this website with a coding agent, and part of it is a WebGL scene written in GLSL shaders, a layer I had never worked in. The agent got it looking right in an afternoon. Then I ran Lighthouse on a mobile profile and the performance score was 54. On devices without a real GPU, the scene was blocking the browser for about four and a half seconds.

The agent didn't notice that, and neither did my eyes on a fast laptop. Measuring did. The fix touched three layers: a small GPU check before loading the 3D library at all, a static SVG version of the scene generated at build time, and moving the headline animation to pure CSS so it no longer waited for JavaScript. The score went to 97.

That's the pattern I see now. Agents widen your reach into layers you don't know well. Whether that reach is useful depends on understanding how the layers connect, so you can tell when something that works on its own breaks the system around it.

## How I answer in an interview

If someone asks me whether I'm full stack, I don't list frameworks. I say I'm strongest in architecture, backend and infrastructure, I'm comfortable shipping frontend work, and I can follow any problem from the browser to the database to the cloud and either fix it or know exactly who should. Then I tell them about the launcher.

## Sources

- [T-shaped skills, Wikipedia](https://en.wikipedia.org/wiki/T-shaped_skills)
