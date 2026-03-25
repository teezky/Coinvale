# Coinvale Patch Notes

This file tracks meaningful project updates in a patch-note style.

Rules:
- every substantial update should add a new entry
- each entry should use clear categories when relevant:
  - `Added`
  - `Changed`
  - `Rebalanced`
  - `Fixed`
  - `Removed`
  - `Docs`
  - `Planned`
- if a release note describes a planned update, it must be labeled clearly as planned
- if a category has no relevant items for that entry, it can be omitted

Template:

```md
## Unreleased - Update Name

Status:
- implemented | planned | mixed

Summary:
- short high-level outcome

Added:
- new systems, files, or content

Changed:
- behavior changes, logic changes, UX changes

Rebalanced:
- economy, pacing, formulas, upgrade curves

Fixed:
- bugs, deadlocks, regressions, broken gating

Removed:
- old systems, abandoned approaches, and intentionally dropped features

Docs:
- documentation and reference file updates

Planned:
- items intentionally discussed but not yet implemented
```

---

## Unreleased - Documentation & Formula Pass

Status:
- implemented

Summary:
- added a dedicated formulas document and a structured formulas reference
- aligned `Town Hall`, storage, and building soft-cap logic
- cleaned the markdown documentation layer into English

Added:
- added [formulas.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/formulas.md)
- added [reference/formulas.js](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/reference/formulas.js)

Changed:
- updated the markdown documentation layer to use English consistently

Rebalanced:
- `Town Hall` cost curve
- `Warehouse` storage growth
- `Town Hall`-driven soft building caps

Fixed:
- `TH1 -> TH2` storage deadlock
- later `Town Hall` storage outrunning issues
- mismatch between `TH30` progression and the intended `Lv50` building ceiling

Removed:
- separate `House` building as the old population structure
- old multi-building copy logic
- separate `Production Breakdown` card
- sidebar `Village Summary`
- top `Village Snapshot`
- `Settlement Focus`
- separate top `Net Production` block
- older linear `Knowledge / Expansion` research list
- old `+ / -` worker assignment UI
- `Clay` as a planned resource
- old `Workshop` concept as a vague all-village output buff

Docs:
- `README.md`
- `handoff.md`
- `implemented.md`
- `roadmap.md`
- `buildings.md`
- `workers.md`
- `tech-tree.md`
- `instructions.md`

Notes:
- runtime source of truth remains `index.html`
- the formulas layer now exists in both human-readable and structured reference form

---

## Unreleased - Planned Tech Tree, Progression & UX Update

Status:
- planned

Summary:
- restructure the tech tree around clearer branch identity, repeatable nodes, and cleaner unlock logic
- tighten progression by syncing tech unlocks with `Town Hall`
- improve UX around readability, visuals, and unique-building interactions

Planned:

Tech Tree structure:
- rename branches into clearer, more coherent categories
- shift node composition toward this target mix:
  - `40%` unlock
  - `30%` system change
  - `30%` bonus
- add repeatable multi-level nodes for long-term progression
- reduce oversized percentage bonuses and replace them with smaller, more frequent bonuses such as `+1%`
- consider a vertical tree layout so more nodes can fit on screen at once

Tech Tree visuals:
- add icons or small visuals to tech nodes to improve readability
- create a dedicated asset reference file for node visuals instead of hardcoding image paths

Tech Tree unlock logic:
- if a tech node unlocks a building with a `Town Hall` requirement, the node should carry the same `Town Hall` requirement
- avoid any unlock state where research says a building is available but the building is still not actually buildable

Repeatable node direction:
- add long-tail repeatable nodes with scalable cost and high max level, such as:
  - core output boosters
  - branch-specific `+1%` production nodes
  - long-term evergreen progression nodes up to roughly `50-100` levels where appropriate

Resource and progression direction:
- continue evaluating a clearer chain structure:
  - `raw -> processed -> advanced -> combat -> upgrades`
- make `Stone` and `Food` more important in upgrades instead of leaning too heavily on `Wood`

Expeditions:
- keep expedition rewards tied to storage / warehouse size so expeditions remain relevant over the whole game
- consider a rule such as a percentage of storage capacity
- make expeditions take a bit longer to increase strategic weight

Offline progress:
- evaluate a clearer offline model based on:
  - elapsed time
  - action interval
  - rewards per completed action
- if used, it must still respect:
  - storage caps
  - upkeep
  - bounded event/trader logic

Buildings and UI:
- improve visual progression for `Town Hall` and nearby settlement art over time

Town Hall / Warehouse scaling:
- continue refining the relationship between `Town Hall` cost and storage capacity
- base `Town Hall` pressure on the warehouse level that the current `Town Hall` can support, not just the currently built warehouse level
- increase the role of `Stone` and `Food` in `Town Hall` upgrade costs

Worker balance:
- reduce how long early workers such as `Forager` remain dominant
- keep the shift toward building-based workers stronger and clearer over time

Visual/icon polish:
- add tech node icons or glyphs for better tree readability

Priority fixes inside this planned update:
1. `Town Hall` and `Warehouse` scaling
2. tech unlock synchronization
3. worker progression balance
4. standardized smaller bonus percentages in the tech tree
5. multi-level node system

## Unreleased - Tech Tree and UI Sync

### Changed
- renamed tech tree branches to `Sustenance`, `Craftsmanship`, `Masonry`, `Scholarship`, `Warfare`, and `Commerce`
- tech nodes now inherit matching `Town Hall` requirements when they unlock gated buildings
- the wine resource icon now uses a grape cluster for better readability

### Added
- branch-themed glyph icons inside tech node orbs for faster scanning

### Fixed
- unique building cards now hide the `Build` button after the building already exists
- building cards no longer show an empty upkeep section when no upkeep is active
- worker cards no longer show `Upkeep: None`
