# Coinvale

`Coinvale` is a single-file browser game prototype whose main runtime lives in `index.html`.

The project combines:
- an idle / resource-management loop
- unique upgradeable buildings
- worker sliders
- expeditions, random events, and village defense
- a branch-based node-view `Tech Tree`
- human-readable documentation
- structured reference files for future architecture work

## Current project state

The game currently includes:
- resources: `Food`, `Wood`, `Stone`, `Gold`, `Knowledge`, `Ore`, `Metal`, `Wine`
- `Town Hall`-based population progression
- one building of each type, with `Town Hall` going to `30` and other buildings to `50`
- workers including `Scholar`, `Guard`, `Soldier`, `Vinekeeper`, `Ore Miner`, `Smelter`, `Vintner`, and `Innkeeper`
- expeditions with storage-scaled rewards and `counter-raid` logic
- random events and a trader
- save / migration / offline progress
- a compact wide `Tech Tree`
- `Happiness`, which affects villager growth

## Running the game

This project does not need a build system.

To run it:
1. open `index.html` in a browser
2. the game runs directly from that file

## File structure

Main files:
- `index.html` - runtime and main game logic
- `formulas.md` - main balance formulas and progression rules
- `handoff.md` - short current-state handoff file
- `implemented.md` - what is actually implemented in the game
- `roadmap.md` - upcoming topics and balance focus
- `removed.md` - removed or dropped solutions
- `instructions.md` - project workflow rules

System docs:
- `buildings.md`
- `workers.md`
- `tech-tree.md`

Structured reference:
- `reference/buildings.js`
- `reference/formulas.js`
- `reference/workers.js`
- `reference/techTree.js`

## Documentation model

The project uses two layers:

1. human-readable documentation in `*.md`
2. structured reference in `reference/*.js`

Core rule:
- when a system changes, both documentation and reference should be updated together

## Workflow

Working agreement for this project:
- discuss changes before implementing them
- edit code only after a clear instruction such as `tee ära`
- after a change, update the related markdown and reference files

More detailed rules live in `instructions.md`.

## Current focus

The main focus right now is:
- economy balance passes
- `Food`, `Warehouse`, and upgrade-cost tuning
- pacing for the `Wine` and `Metal` economy
- possible later movement toward a more reference-driven architecture

## GitHub

If you want to upload this project to GitHub, also check `github-upload.md`.
