# Coinvale Patch Notes

This file tracks meaningful project updates in chronological order.

Rules:
- every substantial update gets its own patch entry
- each entry starts with:
  - patch number
  - date
  - time
  - status
- use clear sections when relevant:
  - `Added`
  - `Changed`
  - `Rebalanced`
  - `Fixed`
  - `Removed`
  - `Docs`
  - `Planned`
- if an older update predates this format and the exact timestamp is unknown, mark it clearly as `historical entry`

Template:

```md
## Patch 0.0.0 - 2026-03-25 17:57

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
- old systems, abandoned approaches, intentionally dropped features

Docs:
- documentation and reference file updates

Planned:
- items intentionally discussed but not yet implemented
```

---

## Patch 0.0.1 - historical entry

Status:
- implemented

Summary:
- established a formal documentation and formulas layer
- aligned `Town Hall`, storage, and building-cap formulas

Added:
- `formulas.md`
- `reference/formulas.js`

Changed:
- markdown documentation was standardized in English

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
- formulas now exist in both human-readable and structured reference form

---

## Patch 0.0.2 - historical entry

Status:
- mixed

Summary:
- defined the next major tech tree, progression, and UX direction
- kept these items as planned rather than fully implemented in one batch

Planned:
- rename branches into clearer categories
- shift node composition toward `40% unlock / 30% system change / 30% bonus`
- add repeatable multi-level nodes for long-tail progression
- reduce oversized percentage bonuses and replace them with smaller, more frequent bonuses such as `+1%`
- evaluate a clearer resource chain:
  - `raw -> processed -> advanced -> combat -> upgrades`
- keep expedition rewards tied to storage / warehouse size
- consider slightly longer expedition durations
- evaluate a clearer offline progress model that still respects storage caps and upkeep
- continue refining `Town Hall` / `Warehouse` scaling
- increase the role of `Stone` and `Food` in `Town Hall` upgrades
- reduce how long early workers such as `Forager` remain dominant
- improve visual progression for `Town Hall` and nearby settlement art over time

Priority:
1. `Town Hall` and `Warehouse` scaling
2. tech unlock synchronization
3. worker progression balance
4. standardized smaller bonus percentages in the tech tree
5. multi-level node system

---

## Patch 0.0.3 - historical entry

Status:
- implemented

Summary:
- synchronized the tech tree with gated building logic
- improved node readability and removed noisy empty upkeep rows

Added:
- branch-themed glyph icons inside tech node orbs

Changed:
- renamed tech tree branches to:
  - `Sustenance`
  - `Craftsmanship`
  - `Masonry`
  - `Scholarship`
  - `Warfare`
  - `Commerce`
- tech nodes now inherit matching `Town Hall` requirements when they unlock gated buildings
- the wine resource icon now uses a grape cluster
- the tech tree now uses a vertical branch flow instead of the old horizontal branch layout

Fixed:
- unique building cards now hide the `Build` button after the building already exists
- building cards no longer show an empty upkeep section when no upkeep is active
- worker cards no longer show `Upkeep: None`

Docs:
- `tech-tree.md`
- `implemented.md`
- `reference/techTree.js`

---

## Patch 0.0.4 - 2026-03-25 17:57

Status:
- implemented

Summary:
- expanded the runtime UI to full-width and tightened spacing for a more compact, development-friendly layout
- switched patch notes to a chronological numbered format with timestamps

Changed:
- the main app container now uses the full browser width instead of a centered `1480px` cap
- major layout blocks use smaller gaps and tighter padding
- side/main columns are slightly rebalanced to free more room for central content
- header, stats, resource cards, worker rows, scene, tech panels, and building cards are all slightly more compact
- large screens now use the available width more aggressively for resource rows and main layout density

Docs:
- converted `patch-notes.md` into a chronological patch log with:
  - patch numbers
  - dates
  - times
  - status blocks
  - consistent categories

Notes:
- older entries were preserved as historical entries because exact timestamps were not recorded when they were first made

---

## Patch 0.0.5 - 2026-03-25 18:03

Status:
- implemented

Summary:
- rebuilt tech tree branch rendering so prerequisite relationships are visually connected with proper lines

Changed:
- each branch now uses a computed node grid with explicit depth and lane placement
- prerequisite relationships are drawn as curved `parent -> child` link paths instead of decorative-only branch rails
- completed prerequisite links are highlighted to make researched progression paths easier to read
- tech branch cards keep vertical flow while now showing clearer internal graph structure

Docs:
- `tech-tree.md`
- `patch-notes.md`

---

## Patch 0.0.6 - 2026-03-25 18:07

Status:
- implemented

Summary:
- stabilized tech tree rendering and responsive sizing after visual regressions from the previous graph pass

Changed:
- tech branches now render in a single full-width stack to keep node graphs readable without cramped branch cards
- branch tech grids now use adaptive lane sizing (`minmax(0,1fr)`) to prevent horizontal overflow
- branch cards now hide internal horizontal overflow and keep links inside card bounds
- node label, status, glyph, and orb sizes were tuned down slightly for tighter visual fit
- added responsive breakpoints for top layout, stats, resources, workers, and scene sizing across desktop/tablet/mobile

Fixed:
- removed horizontal scrollbars appearing inside tech branch areas
- improved prerequisite line routing by ordering nodes using parent-lane targets before final lane placement
- reduced awkward connection-line crossings caused by purely alphabetical same-depth ordering

Docs:
- `tech-tree.md`
- `patch-notes.md`

---

## Patch 0.0.7 - 2026-03-25 18:09

Status:
- implemented

Summary:
- refined tech tree composition to remove stretched branch visuals and improve connection readability

Changed:
- switched tech branch list to a responsive multi-column layout on larger screens, falling back to one column on narrower widths
- tech node grids now render at compact fixed lane widths and are centered inside each branch card
- reduced connector line thickness and opacity for cleaner visual hierarchy

Fixed:
- removed the oversized empty horizontal space that made branch connectors look stretched
- reduced awkwardly long curve spans by tightening lane geometry inside branch cards
- changed branch depth calculation to use in-branch prerequisites only, preventing inflated vertical spacing from cross-branch dependencies

Docs:
- `tech-tree.md`
- `patch-notes.md`

---

## Patch 0.0.8 - 2026-03-25 18:12

Status:
- implemented

Summary:
- adjusted the tech overview to show branches side-by-side on wide screens and moved the game shell back from full-width to a centered wide layout

Changed:
- game container now uses a centered wide width (`~80vw`) instead of edge-to-edge full-width
- tech overview now targets six side-by-side branches on large screens, then scales down to 3/2/1 columns for smaller widths
- tech node lanes now fit inside each branch card using adaptive lane columns
- node labels and orb sizes were tightened to keep branch content inside card bounds

Fixed:
- reduced branch overflow pressure caused by fixed lane widths in narrow branch cards
- improved branch readability by keeping node geometry compact in side-by-side mode

Docs:
- `README.md`
- `tech-tree.md`
- `patch-notes.md`

---

## Patch 0.0.9 - 2026-03-25 18:14

Status:
- implemented

Summary:
- tuned tech branch counters for cleaner readability and moved the main game shell from `80vw` to `90vw`

Changed:
- game container width updated from `80vw` to `90vw` on large screens
- tech branch progress counters now render as compact single-line `done/total` values
- added a dedicated `techCountPill` style to prevent counter wrapping

Fixed:
- branch counter values no longer split into two lines in narrow header conditions

Docs:
- `README.md`
- `patch-notes.md`

---

## Patch 0.0.10 - 2026-03-25 18:17

Status:
- implemented

Summary:
- switched tech tree connectors from curved paths to straight segmented paths for a clearer WoW-like skill-tree look

Changed:
- prerequisite links now render as straight connectors
- multi-lane links use elbow routing (`vertical -> horizontal -> vertical`)
- same-lane links use direct straight lines

Fixed:
- reduced the "snake-like" visual feel caused by long curved splines in dense branches
- improved line readability in side-by-side branch layout

Docs:
- `tech-tree.md`
- `patch-notes.md`

---

## Patch 0.0.11 - 2026-03-25 18:23

Status:
- implemented

Summary:
- added visible patch versioning in the game header and a readable in-game Patch Notes modal

Added:
- `Patch Notes` button in the top header
- dedicated patch notes modal with scrollable content

Changed:
- game title now shows the current patch badge (`Patch x.x.x`) next to `Coinvale`
- patch notes modal content now loads from `patch-notes.md` when available
- fallback patch content is shown automatically if direct file loading is blocked by browser mode

Fixed:
- prevented gameplay event modal overlap while Patch Notes or village naming modal is open

Docs:
- `patch-notes.md`

---

## Patch 0.0.12 - 2026-03-25 18:30

Status:
- implemented

Summary:
- converted the main panel tab bar from long vertical strips to a compact horizontal layout and added tab icons

Added:
- small inline SVG icons for:
  - `Buildings`
  - `Workers`
  - `Expeditions`
  - `Tech`

Changed:
- tab navigation now renders as a horizontal 4-column row on desktop
- tablet layout switches to a 2-column tab grid
- mobile layout switches to a single-column stack for readability
- tab buttons now center icon + label and use tighter spacing

Fixed:
- removed the overly long “strip-like” visual feel in the tab area

Docs:
- `patch-notes.md`

---

## Patch 0.0.13 - 2026-03-25 18:33

Status:
- implemented

Summary:
- polished tech node visuals and improved patch notes history visibility for frequent updates

Changed:
- removed the white marker dot from inside tech nodes so only the icon/glyph remains visible
- Patch Notes modal now shows the latest 10 patch entries by default (newest first)
- Patch Notes meta line now indicates how many recent patches are being shown

Fixed:
- reduced visual noise inside node orbs where the marker dot competed with the icon
- improved patch history readability for players in high-frequency patch cycles

Docs:
- `patch-notes.md`

---

## Patch 0.0.14 - 2026-03-25 18:36

Status:
- implemented

Summary:
- tech node visuals were cleaned by removing text status from below each node

Changed:
- removed status text under tech nodes (`Locked`, `Need resources`, `Available`, `Researched`) from the node card area
- node state is now communicated visually by color only:
  - learned: green
  - learnable: yellow
  - locked: red

Fixed:
- reduced clutter in dense tech branches where status text competed with node labels

Docs:
- `patch-notes.md`

---

## Patch 0.0.15 - 2026-03-25 18:38

Status:
- implemented

Summary:
- aligned in-game Patch Notes rendering with patch-notes file content as a true 1:1 slice for the latest history window

Changed:
- last 10 patch entries are now rendered as one exact contiguous block from `patch-notes.md`
- preserved the same chronological order as the source file inside that recent-history view
- removed synthetic re-joining that could alter separators or ordering

Fixed:
- resolved mismatch where in-game notes could appear less detailed or differently ordered than the markdown source

Docs:
- `patch-notes.md`
