---
page_type: sample
authors:
  - Fairydewstz
description: A Lightning Storm example of developing Minecraft scripts using TypeScript and a build process.
date: 12/10/2024
languages:
  - typescript
products:
  - minecraft
---



# Minecraft TypeScript Project (Lightning Storm)

### Usage:

- Use the trident to aim at an entity and right-click/long-press to summon a lightning storm attack;
- Use the trident to aim at a block and right-click/long-press to summon a ranged lightning storm.

For detailed guidance on project deployment, please see the [main tutorial article link](https://learn.microsoft.com/minecraft/creator/documents/scriptinggettingstarted).



## Prerequisites

### Install Node.js tools, if you haven't already

We're going to use the package manager [npm](https://www.npmjs.com/package/npm) to get more tools to make the process of building our project easier.

Visit [https://nodejs.org/](https://nodejs.org).

Download the version with "LTS" next to the number and install it. (LTS stands for Long Term Support, if you're curious.) In the Node.js Windows installer, accept the installation defaults. You do not need to install any additional tools for Native compilation.

### Install Visual Studio Code, if you haven't already

Visit the [Visual Studio Code website](https://code.visualstudio.com) and install Visual Studio Code.

## Manifest

- [just.config.ts](https://github.com/microsoft/minecraft-scripting-samples/blob/main/ts-starter-complete-cotta/just.config.ts): This file contains build instructions for the project.
- [scripts](https://github.com/microsoft/minecraft-scripting-samples/blob/main/ts-starter-complete-cotta/scripts): This contains all of your TypeScript files, that will be compiled and built into your projects.
- [behavior_packs](https://github.com/microsoft/minecraft-scripting-samples/blob/main/ts-starter-complete-cotta/behavior_packs): This contains resources and JSON files that define your behavior pack.
