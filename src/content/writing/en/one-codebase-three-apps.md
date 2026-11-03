---
title: From a Claude artifact to a desktop app and a PWA with one codebase
description: How Naruto Online Companion went from a personal script to an app on Windows, Android, iPhone and Mac, without maintaining three versions of it.
date: 2026-11-03
tags: [Product, Tauri, PWA]
---

Naruto Online Companion started as something for me. I wanted to know which teams I could build with the ninjas I had, and the game's community knowledge was spread across a wiki, a stats site and several shared documents. So I wrote a small Python script that downloaded the public data into SQLite and a command line tool to query it.

Today it's an app that recommends teams for every game mode, tells you what to get next and what's worth upgrading, and has hand reviewed sheets for all 426 ninjas. It runs on Windows as a desktop app and on Android, iPhone and Mac as an installable PWA. There is still only one codebase.

## The data comes first

The pipeline is plain Python with no dependencies. The scraper for the stats site goes at one request per second, so a full refresh takes about ten minutes, and that's fine. A few pages need a real browser, and for those I use Playwright. Everything ends up in a SQLite database that the rest of the project reads.

Some of the best sources are documents written by the community, and their authors don't want them copied outside their Discord. The app reads them into a local cache that's never committed or published. Respecting that was a requirement, not a detail.

## It started as a Claude artifact

The first interface was a Claude artifact. It was the fastest way to have a page with my roster, my teams and my attempts per mode, and it could store data between sessions using the artifact's own storage.

When I decided to turn it into a real app, I didn't rewrite it. The page loads in the same way everywhere and checks where it's running. If the Claude storage is available, it syncs through it. If not, it uses the browser's local storage. Changes made locally always win until they're saved, so nothing gets lost when the connection comes and goes.

The desktop app injects a small `window.NOC_APP` object when it's built. The page reads it to show the version, hide the parts that only make sense inside Claude and enable the update features. A CSS class hides the Claude only panels. That's all the platform specific code there is.

## Three channels, one release process

The code lives in a private repository. Two public ones receive what users need: one for the Windows installers and one that serves the PWA from GitHub Pages. CI publishes to both, along with the README and the screenshots, so I never copy files by hand.

The Windows app is built with Tauri 2. It installs per user, without admin rights, and updates itself through signed releases.

## Data updates without reinstalling

Most changes are data, not code: a new ninja, a new meta, a different reward this week. Making people reinstall for that would be silly, so content ships separately as a signed package.

The app checks the signature when it downloads a package and again every time it reads it from disk. Content that isn't ours never reaches the page. It also refuses any package older than the one it already has, even if the signature is valid. Otherwise, uploading an old package by mistake would roll every app back at once. The packages are signed with the same key as the installers, and the test suite checks that the public keys in the app and in the updater config match.

## Tests that know the game

The tests aren't only about code. They check the team data against the game's rules and my own: no repeated characters across the three ranked teams, every team says where it comes from, and only a couple of untested ideas are allowed per mode. AI suggested combinations are always labelled as untested. They also check the JavaScript syntax of every generated file and that the public README only links to the releases page.

## What I'd do again

Start with the data. Let the first version be whatever is fastest to build, and keep it when you grow instead of rewriting it. And separate the things that change every week from the things that change every month, because they deserve different release processes.

It's an unofficial fan project, not affiliated with the game's publishers.
