---
title: Shipping a Windows app to players who just want it to work
description: Packaging, updates and testing behind Aion 2 Companion, a desktop app for players who don't care how it works and shouldn't have to.
date: 2026-11-03
tags: [Desktop, Python, CI/CD]
---

Aion 2 Companion is a Windows app for Aion 2 players. It tracks pet souls on a map, shows what the Black Cloud Merchant is selling, warns you before field bosses spawn and has a live DPS meter. It works by reading the traffic the game already sends to your PC, the same way DPS meters do, and it never touches the game.

It's an unofficial fan project, and it started from other people's work. The pet overlay it grew out of was made by mytzuo, the DPS meter is a port of A2Tools, and the packet decoding builds on an open source pet tracker. All of it is credited in the app and the repo, and the whole thing is GPL.

Writing the features was the fun part. Getting it onto the PCs of people who have never heard of Python, and keeping it working through updates, took a lot more thought.

## No Python, no admin, no console

The people using this app want to farm pets, not install a runtime. So the app ships with the official embedded Python for Windows inside its own folder. Nothing gets installed system wide and the installer runs for the current user only, without admin rights.

There is one small piece of C in the project. Starting the app through `pythonw.exe` worked, but Windows showed it as Python in the taskbar and Task Manager, with the Python icon. A tiny launcher written in C loads the Python DLL inside its own process, so Windows sees "Aion 2 Companion" with its own icon. It's about sixty lines and it's built on Linux with mingw-w64.

The interface is HTML, CSS and Preact running in WebView2, which every recent Windows already has. There is no build step for the UI. Python publishes topics and each page listens to the ones it needs.

## Builds you can reproduce

The repository only holds code. The embedded Python and every library are downloaded at build time and checked against a fixed SHA-256. If a download doesn't match, the build stops. The same script runs on Windows, Linux or macOS and produces a portable ZIP with a manifest of hashes for every file.

Releasing a new version means changing the number in `version.py` and merging into main. CI notices that the version has no release yet, builds everything and publishes it.

## Updates that can't break anything

When a new version is out, an update button appears in the title bar. One click downloads the installer, checks its SHA-256, installs it and reopens the app. Progress lives in a separate data folder that updates and even uninstalls leave alone.

That last part is easy to promise and easy to break, so CI tests it on a real Windows machine before anything is published. It installs an old 3.1 version, installs the new one silently on top, opens the app from the Start menu shortcut, runs a self test, checks that saved progress is still there after the update, and uninstalls while keeping that progress. If any of those steps fails, nothing gets published.

## Every screen, tested and photographed

The UI tests open every page in Chromium with Playwright, using a fixture with made up characters, and click through it. With a flag, the same run saves a screenshot of each page. Those are the screenshots in the public README and on this site. They are never out of date because they come from the same code that ships.

## Reading data you don't control

The game's protocol isn't documented and it changes. The decoding is deliberately conservative. Fields the app doesn't understand are kept as they are, without guessing what they mean, and messages that don't match what's expected are rejected instead of half parsed. Each change to the decoder is checked against real captures before it ships.

When the numbers in the app and the game disagree, the troubleshooting guide says it plainly: re-enter the world, the game is always right. It's a small line, but it sets the right expectation and saves a lot of support messages.

## What I'd keep for any desktop app

Ship your own runtime. Pin every download to a hash. Make releasing a one line change. And test the upgrade path, not only a clean install, because that's where real users actually are.
