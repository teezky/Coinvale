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
- `patch-notes.md` - patch-note style history of updates and planned release batches
- `handoff.md` - short current-state handoff file
- `implemented.md` - what is actually implemented in the game
- `roadmap.md` - upcoming topics and balance focus
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

Core rules:
- when a system changes, both documentation and reference should be updated together
- substantial updates should also be reflected in `patch-notes.md`

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

If you want to upload this project to GitHub:

### Recommended repository contents

Keep these in the repo:
- `index.html`
- all `*.md` documentation files
- the `reference/` folder
- `.gitignore`
- `README.md`

### Suggested repository names

Examples:
- `coinvale`
- `coinvale-prototype`
- `coinvale-idle-game`

### Uploading with git

If `git` is installed on your machine, run this in the project folder:

```powershell
git init
git add .
git commit -m "Initial Coinvale prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

### If the GitHub repository still needs to be created

1. Open GitHub.
2. Click `New repository`.
3. Enter the repository name.
4. Do not add an initial `README`, `.gitignore`, or `license`, because this project already includes them.
5. Create the repository.
6. Use the `git` commands above.

### What to verify before pushing

- whether `README.md` describes the current state
- whether `handoff.md` is short and current
- whether `implemented.md`, `roadmap.md`, and `patch-notes.md` are aligned
- whether `buildings.md`, `workers.md`, and `tech-tree.md` are updated
- whether `reference/*.js` matches the actual system state

### Uploading through the web UI without git

You can also do it this way:
1. Create a new GitHub repository.
2. Choose `uploading an existing file`.
3. Drag the whole project into the repo page.
4. Create the first commit through GitHub’s web UI.

Keep in mind:
- future updates are much easier if `git` is installed locally

### Recommendation for later

If you keep the project on GitHub more actively later, it is worth adding:
- `LICENSE`
- a screenshots folder
- releases or a changelog

`LICENSE` should be chosen deliberately, because it is a legal decision.
