---
title: How two of us shipped a Roblox game with Claude Code
description: The repo setup that let a two-person studio build Pet Defense with an AI agent in the loop every day, and keep the codebase in good shape.
date: 2026-11-03
tags: [Claude Code, Game dev, Workflow]
---

Between January and August 2026 we built [Pet Defense](https://www.roblox.com/games/127844763631870/PET-DEFENSE), a pet rescue game for Roblox. There were two of us. The game has biomes, eggs, four evolution stages, raids, expeditions, a roguelike mode, a season pass and an AFK area that runs as a separate place. By the end the repo had around 280 Luau files and 138k lines of code.

People sometimes assume the AI wrote the game. It didn't, at least not in the way that sentence suggests. What actually made the difference was the work we put into the repository so that Claude Code could behave like a reasonable teammate: knowing the rules, following the same routine every session and not being able to ship something dangerous by accident.

This is that setup.

## The repo explains itself

The first thing Claude reads is `CLAUDE.md`. Ours describes the architecture, the naming conventions and where things live. That file gets you surprisingly far, but it has a problem: it grows. Once it covers the server, the client, the GUI and the configs, most of it is noise for any given task.

So we split the rules by folder. Claude Code supports rule files scoped to paths, and we have one for server code, one for GUI code and one for config files. The server rules only load when the change touches `src/server`. They are short and opinionated:

```md
- All state changes MUST happen on the server (anti-cheat). Never trust client data.
- Validate all inputs from client remotes: type check, range check, ownership check.
- Config-driven: game content lives in src/shared/Game/*Config.luau, logic lives in services.
```

Next to the rules there is a `templates` folder with the tasks we repeat all the time: add a pet, add a zone, add a feature, rebalance the economy. The pet template includes the stat ranges for each rarity and the id format (`{biome}_{name}`). Adding a new species went from "let me look at how the last one was done" to filling in five fields.

## Every session starts and ends the same way

We wrote two custom commands, `/project:start` and `/project:done`.

Start reads `TODO.md`, checks the git status and suggests the highest priority item. Our TODO has a small convention: whatever Claude is working on is tagged `@claude`, and the tag comes off when the task is done. With two people and an agent sharing one list, it's the easiest way to see who is on what.

Done is the checklist nobody likes running by hand. It updates the TODO, runs StyLua and Selene on the changed files and fixes whatever they report, checks the debug flag, saves anything worth remembering for the next session and shows the final git status. The last step matters. The agent prepares everything, but one of us decides what gets committed.

## Hooks for the things you can't forget

Our debug panel is great in Studio and embarrassing in production. It's controlled by a single flag in `DebugConfig.luau`. Instead of trusting anyone's memory, there is a hook that runs before every `git push` and blocks it if the flag is still on:

```json
"PreToolUse": [{
  "matcher": "Bash(git push*)",
  "hooks": [{
    "type": "command",
    "command": "grep -q 'ENABLED = false' src/shared/Game/DebugConfig.luau || (echo 'BLOCKED: DebugConfig.ENABLED is not false' && exit 1)"
  }]
}]
```

There is also a session start hook that prints the git status and the top of the TODO, so the context is there before anyone types a word.

## An architecture that is hard to break

An agent follows the patterns it sees, good or bad. So we spent time early on making the good patterns obvious.

The code is split into `Core` and `Game`. Core has the pieces we want to reuse in the next game (data, currency, inventory, progression, shop, networking). Game has everything specific to Pet Defense. The server owns all state. Content lives in config files, so a new biome or shop item is data, not code. Modules are strictly typed, with more than 90 shared types.

Every one of those decisions is written down as an ADR. We ended up with nine. When a proposal goes against one of them, pointing at the ADR is usually enough. Without them, the same discussion would come back again and again.

## Reviews and the boring parts

Every pull request gets a review from Claude through a GitHub Action before one of us looks at it. It catches the obvious stuff, which leaves the human review for the questions that matter.

When something merges into main, a workflow calls our own agent platform and generates drafts for social media from the changes. We still edit them, but starting from a draft that knows what shipped is much faster than starting from nothing.

The balancing work happened outside the game, in small Python simulators for power and XP curves, next to a few scripts for Roblox Open Cloud and a pipeline that generates the pet thumbnails.

## What I would keep

If I started another game tomorrow I would do three things on day one. Write the decisions down, even the small ones. Turn every "don't forget to" into a check that runs on its own. And keep a person in charge of the commit.

The pre-launch campaigns reached 32,000 players, which for a team of two felt a bit unreal. Most of that is down to the game, but I'm fairly sure we wouldn't have shipped it in eight months without this setup.
