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

---

## Patch 0.0.16 - 2026-03-25 18:42

Status:
- implemented

Summary:
- refined tech tree icons to better match medieval visual language

Changed:
- replaced modern-looking tech node symbols with medieval-themed alternatives across branches
- `Field Logistics` icon changed from a modern truck to a horse-based symbol
- trade/civic fallback and several branch icons were retuned toward parchment, coin, forge, and caravan motifs

Fixed:
- removed immersion-breaking modern iconography in the tech tree

Docs:
- `patch-notes.md`

---

## Patch 0.0.17 - 2026-04-02 20:55

Status:
- implemented

Summary:
- added a dedicated asset folder structure and centralized image reference file for future background and art usage

Added:
- `assets/source/backgrounds/` for original background art
- `assets/images/backgrounds/` for game-ready background copies
- placeholder folders for future building and UI image assets
- `reference/assets.js` as the central asset reference map

Changed:
- moved the background image out of the project root into the new asset structure
- standardized the current background runtime path as `assets/images/backgrounds/village-valley-main.png`
- updated all mockup files to use the new background asset path

Docs:
- `README.md`
- `handoff.md`
- `patch-notes.md`
- `reference/assets.js`

---

## Patch 0.0.18 - 2026-06-08 20:25

Status:
- implemented

Summary:
- moved the live runtime shell in `index.html` toward the approved glass-fantasy mockup direction

Changed:
- applied a fixed painted background layer behind the runtime UI
- rethemed the live shell toward the `mockup-glass-v4-current-layout` direction
- updated top bars, resource cards, chronicle shell, scene panel, tabs, and runtime cards to use the new glass-panel treatment
- kept the existing runtime structure and logic intact while shifting the visual layer toward the new art direction

Fixed:
- removed the earlier feeling that the game shell was visually detached from the new background-driven mockup direction

Docs:
- `patch-notes.md`
- `handoff.md`
- `implemented.md`

---

## Patch 0.0.19 - 2026-06-08 21:05

Status:
- implemented

Summary:
- replaced random event choice popups with automatic Chronicle events that scale with the village economy

Changed:
- random events now resolve automatically instead of interrupting play with modal choices
- event gains now scale from resource capacity
- event losses now scale from current stored amounts
- Chronicle now receives the event outcome directly as the main player-facing feedback
- trader and expedition modal flows were left intact

Added:
- a weighted pool of 20 automatic random events across food, wood, stone, gold, knowledge, ore, metal, wine, happiness, and population growth
- a small persistent happiness event offset so mood events can have real impact

Fixed:
- late-game random events no longer become meaningless tiny flat rewards like `+12 Wood`
- random events no longer break the gameplay flow with repetitive click-through popups

Docs:
- `index.html`
- `patch-notes.md`
- `implemented.md`
- `handoff.md`

---

## Patch 0.0.20 - 2026-06-08 22:10

Status:
- implemented

Summary:
- moved trader offer definitions out of `index.html` into a dedicated reference file

Changed:
- `index.html` now loads trader offer data from `reference/traderOffers.js`
- trader offers now carry explicit metadata such as merchant type and fairness
- trader modal titles now reflect the offer source and deal tone
- trader log entries can include short context about why a deal felt fair or costly

Added:
- `reference/traderOffers.js`
- merchant type labels for:
  - `Caravan Merchant`
  - `Royal Clerk`
  - `Black Market Broker`
- fairness labels for:
  - `Costly`
  - `Fair`
  - `Favorable`

Fixed:
- reduced hardcoded trader content inside the runtime file
- made trader content easier to rebalance without editing core UI flow

Docs:
- `index.html`
- `reference/traderOffers.js`
- `patch-notes.md`
- `implemented.md`
- `handoff.md`

---

## Patch 0.0.21 - 2026-06-08 22:35

Status:
- implemented

Summary:
- moved random event definitions out of `index.html` into a dedicated reference file

Changed:
- `index.html` now loads random event data from `reference/randomEvents.js`
- event application logic remains in runtime, but the event table itself no longer lives inline in the main file
- random event conditions and effect metadata are now expressed in a more table-driven form

Added:
- `reference/randomEvents.js`
- runtime helpers that translate random event definitions into live event behavior

Fixed:
- reduced another large content block from the main runtime file
- made random event balance changes easier to manage without editing core loop code

Docs:
- `index.html`
- `reference/randomEvents.js`
- `patch-notes.md`
- `implemented.md`
- `handoff.md`

---

## Patch 0.0.22 - 2026-06-08 22:55

Status:
- implemented

Summary:
- moved expedition definitions out of `index.html` into a dedicated reference file

Changed:
- `index.html` now loads expedition data from `reference/expeditions.js`
- expedition runtime now derives visibility, duration, provision cost, and base success chance from reference data
- the existing expedition flow and UI continue to use the same `X[k]` runtime shape, but that shape is now built from external definitions

Added:
- `reference/expeditions.js`
- expedition requirement helpers for tech, building, territory, and grouped conditions

Fixed:
- reduced another expandable content table from the main runtime file
- made future expedition additions and balancing safer to manage outside the main HTML file

Docs:
- `index.html`
- `reference/expeditions.js`
- `patch-notes.md`
- `implemented.md`
- `handoff.md`

---

## Patch 0.0.23 - 2026-06-08 23:22

Status:
- implemented

Summary:
- moved progression and gating tables out of `index.html` into a dedicated reference file

Changed:
- `index.html` now loads progression metadata from `reference/progression.js`
- building upgrade groups, soft-cap rules, and gold-gate values now derive from reference data
- `Town Hall` build requirements, `Town Hall` tech requirements, and building-to-tech unlock links now derive from reference data
- `Town Hall` upgrade requirement tiers now reconstruct from reference rules instead of a long hardcoded branch chain

Added:
- `reference/progression.js`
- runtime helpers for progression groups, `Town Hall` requirement tier resolution, and building tech gating

Fixed:
- reduced another cluster of hardcoded progression rules in the main runtime file
- made future progression and gating balance passes safer to manage outside the main HTML file

Docs:
- `index.html`
- `reference/progression.js`
- `patch-notes.md`
- `implemented.md`
- `handoff.md`

---

## Patch 0.0.24 - 2026-06-08 23:38

Status:
- implemented

Summary:
- switched building runtime data over to `reference/buildings.js`

Changed:
- `index.html` now loads building definitions from `reference/buildings.js`
- the runtime `D` map is now reconstructed from reference data instead of being hardcoded inline
- new save-state building maps now derive from the loaded building definitions
- save repair now backfills missing building entries from the building reference layer

Added:
- runtime visibility mapping for building definitions loaded from the reference layer
- explicit `info` and `visibility` metadata inside `reference/buildings.js`

Fixed:
- removed another large hardcoded system-definition block from `index.html`
- made future building additions safer, because the base save shape now follows the building reference source

Docs:
- `index.html`
- `reference/buildings.js`
- `patch-notes.md`
- `implemented.md`
- `handoff.md`

---

## Patch 0.0.25 - 2026-06-08 23:55

Status:
- implemented

Summary:
- switched worker runtime data over to `reference/workers.js`

Changed:
- `index.html` now loads worker definitions from `reference/workers.js`
- the runtime `J` map is now reconstructed from reference data instead of being hardcoded inline
- worker building links, worker visibility, and worker upkeep labels now derive from the worker reference layer
- base job state now derives from runtime worker definitions instead of a fixed handwritten job object

Added:
- runtime visibility metadata for worker definitions loaded from the reference layer
- save repair for missing or malformed job entries based on the active worker definitions

Fixed:
- removed another large hardcoded system-definition block from `index.html`
- made future worker additions safer, because initial job state and UI ordering now follow the worker reference source

Docs:
- `index.html`
- `reference/workers.js`
- `patch-notes.md`
- `implemented.md`
- `handoff.md`

---

## Patch 0.0.26 - 2026-06-09 00:12

Status:
- implemented

Summary:
- switched tech tree runtime data over to `reference/techTree.js`

Changed:
- `index.html` now loads tech branch metadata from `reference/techTree.js`
- the runtime `T` map is now reconstructed from reference data instead of being hardcoded inline
- tech branch titles and hints now derive from the same shared reference layer as the nodes

Added:
- runtime tech-tree mapping from full reference definitions into the compact node structure used by the current UI
- `Town Hall` gate support and prerequisite metadata directly inside the active tech-tree reference source

Fixed:
- removed another large handwritten system-definition block from `index.html`
- made future tech-node additions and balance passes safer because branch content and node metadata now live outside the main HTML file

Docs:
- `index.html`
- `reference/techTree.js`
- `patch-notes.md`
- `implemented.md`
- `handoff.md`

---

## Patch 0.0.27 - 2026-06-09 00:31

Status:
- implemented

Summary:
- switched core runtime formula curves over to `reference/formulas.js`

Changed:
- `index.html` now loads formula metadata from `reference/formulas.js`
- `Town Hall` population cap, battlefield scale, and upgrade scaling now resolve from the shared formula reference layer
- worker slot growth, building level multiplier, warehouse scaling, storage cap formulas, and tech research cost rules now derive from shared formula data

Added:
- machine-readable runtime formula metadata alongside the descriptive formula strings in `reference/formulas.js`
- a small runtime mapping layer so UI and balance helpers can consume shared formulas without hardcoding the coefficients inline

Fixed:
- removed another cluster of handwritten balance coefficients from `index.html`
- reduced the risk of UI text and real balance math drifting apart during future formula tuning

Docs:
- `index.html`
- `reference/formulas.js`
- `patch-notes.md`
- `implemented.md`
- `handoff.md`

---

## Patch 0.0.28 - 2026-07-05 08:55

Status:
- implemented

Summary:
- rewrote the runtime into readable, documented modules and removed dead legacy code
- no gameplay, balance, or save-format changes

Added:
- `js/data.js` - runtime definition maps built from the reference layer plus shared formula constants
- `js/engine.js` - game state, save/migration, economy math, tick, expeditions, events, trader
- `js/sprites.js` - building/worker/resource SVG art
- `js/ui.js` - DOM rendering, tooltips, sliders, modals, tech tree layout
- `js/main.js` - bootstrap, button wiring, main loop
- `styles.css` - all three historical style layers moved out of `index.html` unchanged
- a dedicated cottage sprite for the settlement scene

Changed:
- `index.html` is now a thin entry point: markup, stylesheet link, and ordered script tags
- the entire runtime was reformatted from compressed one-line style into readable code
- single-letter runtime names were replaced with descriptive ones
  (`D` -> `BUILDINGS`, `J` -> `WORKERS`, `T` -> `TECH_NODES`, `X` -> `EXPEDITIONS`, `R` -> `RESOURCES`, `st` -> `gameState`)
- save key, save format, and all balance math are intentionally unchanged

Fixed:
- cottages in the settlement scene now render with their own cottage sprite
  instead of silently falling back to the Town Hall sprite
- building card info text now prefers the building's own `info` field
  (an operator-precedence bug previously always showed the joined `notes` list instead)

Removed:
- `legacyRandomEventChoice` and its superseded choice-popup event pool
- seasons machinery (`seasonKey`, `season`, `YEAR`, `SEASON`) that no longer had any gameplay effect
- unused helpers: `buildLimit`, `resourceVisible`, `detailRows`, `breakRows`, `techVisible`, `sumMult`, `sumLevels`, `levelCounts`, `buildMultiplier`
- unused summary text builders: `nextObjectiveText`, `bottleneckText`, `hallFocusText`
- unused sprites: `granary`, `chickenCoop`, and the duplicate `miners` worker icon

Docs:
- `README.md`
- `handoff.md`
- `implemented.md`
- `roadmap.md`
- `patch-notes.md`

Notes:
- verified in a real browser (Playwright/Chromium): boot without console errors, economy tick, build/upgrade flow, tab switching, tech tree rendering and research, worker sliders, expeditions tab, save/reload, legacy v6 save migration, offline progress, patch modal, tooltips
- fresh-game UI values (storage caps, Town Hall upgrade cost, population cap) verified identical to the previous build

---

## Patch 0.0.29 - 2026-07-05 17:50

Status:
- implemented

Summary:
- replaced the hardcoded per-resource economy math with a generic production/upkeep engine driven entirely by the reference layer
- game balance is unchanged: a 60-state fuzz test verified bit-level parity with the previous engine across production, upkeep, storage caps, build/upgrade costs, and research costs

Added:
- `reference/buildings.js`: base production `output` fields (Farm, Lumber Mill, Quarry, Scribe Hall, Gold Mine, Vineyard)
- `reference/techTree.js`: machine-readable `effects` arrays on 25 nodes
  (production multipliers, worker output/upkeep multipliers, population food upkeep, building wood upkeep, build cost discounts, storage bonus, Town-Hall-scaled gold trickle)
- `reference/formulas.js`: upkeep formulas (population food rate tiers, building wood upkeep curve), Town Hall knowledge passive, and the workshop's affected-resource list
- engine: `productionContributions()` / `upkeepContributions()` as the single source of every income and upkeep line, plus shared helpers `buildingOutputAt`, `workerOutputAt`, `buildingWoodUpkeepAt`

Changed:
- `productionRates()` and `upkeepRates()` now sum the shared contribution lists; no production or upkeep coefficient lives inline in the runtime anymore
- tech bonuses resolve from node `effects` instead of hardcoded ternary chains
- resource tooltips, building cards, and upgrade previews all read from the same engine helpers, so displayed numbers can no longer drift from the real math
- gold income tooltips now list the Tax Ledgers trickle, which was previously invisible
- worker upkeep tooltip rows use the role name (`Innkeepers`) instead of the older `Tavern service` label
- the population food upkeep row now shows the true value including all researched reductions

Fixed:
- Winery, Ore Pit, and Smelter cards no longer label their worker's output as building `Base output`; they now honestly show `Vintner/Ore Miner/Smelter output`
- tech description drift corrected against the actual math:
  - `Masonry` text said `-15%` wood upkeep, the code applies `-10%`
  - `Planning Office` text said Wood and Stone cost `-2%`, the code discounts only Wood
  - `Herbal Remedies` text said `+8%` growth, the code applies `+6%` (plus a small food upkeep reduction)

Docs:
- `formulas.md`
- `tech-tree.md`
- `handoff.md`
- `implemented.md`
- `roadmap.md`
- `patch-notes.md`

Notes:
- discovered during the audit: `Fortified Storeyards` is researchable but has no implemented effect (the promised raid-loss reduction never existed in the runtime); logged in `roadmap.md` as an open balance decision
- expedition/trader/happiness/growth tech bonuses still resolve through dedicated helpers; migrating those into node `effects` is a natural later step
- verified with a 60-state randomized parity harness (Playwright, two builds side by side) plus the full browser smoke test

---

## Patch 0.0.30 - 2026-07-05 18:06

Status:
- implemented

Summary:
- rebuilt the rendering architecture: lazy per-tab panels, change-detected DOM writes, and fully delegated events
- measured ~4.8x faster render pass, with zero DOM writes in a steady state (previously the entire UI was rebuilt from strings every second)

Changed:
- only the ACTIVE tab's panel is rendered each tick; hidden panels are not even built as strings
- structural blocks (scene, chronicle, panels) go through `setHtmlIfChanged`, so unchanged markup causes no DOM write at all
- the resource row keeps persistent tiles: per-tick values (amount, status, net, bar width, tooltip text) update existing nodes in place instead of rebuilding the row
- top-bar stats keep updating via `textContent` as before
- switching tabs immediately renders the newly shown panel

Changed (events):
- all interaction handlers are now delegated and bound exactly once at boot (`setupUiDelegation`):
  build/upgrade buttons, expedition buttons, tech nodes, event-modal choices, worker sliders, and tooltips
- tooltips use a single document-level listener reading `data-tip`, replacing per-element handler rebinding on every render
- user actions moved into named functions (`handleBuildAction`, `handleUpgradeAction`, `handleExpeditionAction`, `handleResearchAction`)

Fixed:
- tooltip and slider drag survive re-renders by architecture now, not by re-binding workarounds; the slider drag guard was verified to hold across simulation ticks

Docs:
- `handoff.md`
- `implemented.md`
- `roadmap.md`
- `patch-notes.md`

Notes:
- benchmark (mid-game state, Buildings tab active, 150 renders): 4.78 ms -> 1.00 ms per render; steady-state renders perform 0 innerHTML writes
- verified in-browser: full smoke suite, real mouse slider drag across ticks, tab cycling, delegated modal choices, delegated build/research clicks, tooltip persistence
- game logic, balance, and save format are unchanged

---

## Patch 0.0.31 - 2026-07-05 18:15

Status:
- implemented

Summary:
- simplified the building state model from multi-building `levels` arrays to a plain `{ built, level }` shape
- save format bumped to version 9 with automatic migration; balance verified unchanged via the 60-state parity harness

Changed:
- building save state is now `{ built: boolean, level: number }` per building (the `levels` arrays were a leftover from the removed multi-building era)
- engine helpers renamed to match the unique-building model:
  `countOf` -> `isBuilt`, `lowestLevel` -> `buildingLevel`, `highestLevel` -> `builtLevel`
- `syncBuildingViews` now clamps the simple shape and no longer maintains the derived `c`/`l` view fields
- settlement tier scoring and the scene composer read the new shape directly

Added:
- save migration step v8 -> v9; `normalizeBuildings` now converts every historical shape ({ c, l } counts, `levels` arrays, and the removed `house` building) into `{ built, level }`

Fixed:
- nothing player-visible; this pass removes internal complexity only

Docs:
- `handoff.md`
- `implemented.md`
- `roadmap.md`
- `patch-notes.md`

Notes:
- verified: 60-state economy parity fuzz (0 diffs vs the previous build), v6 legacy save migration (house + count shapes), v8 levels-array migration, v9 save roundtrip, full browser smoke suite
- exports made before this patch import cleanly; the migration runs on import as well

---

## Patch 0.0.32 - 2026-07-05 18:52

Status:
- implemented

Summary:
- consolidated the three stacked style layers (base theme -> glass-fantasy overrides -> compact layout) into a single cascade-ordered stylesheet
- rendering is pixel-identical to the layered version

Changed:
- `styles.css` now contains one layer: every selector's dead (overridden) declarations were removed and each surviving declaration keeps its original cascade position
- file size 25.2 KB -> 21.1 KB; no more cross-layer "which override wins" puzzles

Notes:
- verification: full computed-style diff (every element x 4 tabs x 5 viewport widths, zero differences) plus a deterministic screenshot comparison (zero differing pixels)
- the remaining `!important` flags are load-bearing in the cross-selector cascade (verified empirically: dropping them shifts layout); they should be retired together with the next intentional visual redesign
- discovered during the audit: the documented red highlight for missing build/upgrade costs (`.costItem.missing`) is suppressed by the glass-layer chip styling, so missing costs currently render like normal chips; logged in `roadmap.md` as a small UI decision
- the consolidation tooling (cascade resolver + computed-style parity harness) makes future CSS changes safely verifiable

Docs:
- `README.md`
- `handoff.md`
- `roadmap.md`
- `implemented.md`
- `patch-notes.md`

---

## Patch 0.0.33 - 2026-07-06 17:16

Status:
- mixed

Summary:
- ran the long-planned balance pass: analytic cost-vs-cap sweep over TH 1-30 plus a 36h
  deterministic bot simulation; documented findings and a validated fix bundle
- no balance values were changed yet - proposals await a decision

Added:
- `balance-report.md` with full findings, method, and proposals

Docs:
- `balance-report.md`
- `roadmap.md`
- `handoff.md`
- `patch-notes.md`

Planned:
- gold economy fix bundle (upkeep halved, stronger gold cap growth, Tavern/Smelter base-gold 10/8 -> 2) - validated in simulation: removes the TH15 hard wall
- repeatable Knowledge sink node as the first content addition
- worker capacity vs population rework
- early-game pacing and Stone early-sink tuning

Notes:
- critical finding: building gold upkeep overtakes gold income around TH15, pinning gold at
  zero and hard-blocking TH16 (which requires gold-costing Tavern/Smelter upgrades) forever
- second critical finding: Tavern/Smelter gold costs cross the gold cap at Lv18/Lv21 even at TH30
- the full tech tree is exhausted in ~3.5h of optimal play; 76% of late-game population idles as Foragers

---

## Patch 0.0.34 - 2026-07-06 17:26

Status:
- implemented

Summary:
- applied the gold economy fix bundle from the 0.0.33 balance report: the TH15 hard wall is gone

Rebalanced:
- building gold upkeep per level halved across the board
  (Town Hall 0.015 -> 0.008, Smelter/Tavern 0.045 -> 0.022, support 0.025 -> 0.012, core/field 0.012 -> 0.006)
- gold cap growth strengthened: per Town Hall level 2 -> 6, Gold Mine base 26 -> 40, per Gold Mine level 9 -> 18
- Tavern and Smelter base-cost gold component 10 / 8 -> 2, so their gold upgrade costs no longer explode past the gold cap

Fixed:
- the TH15 progression hard wall (gold upkeep used to overtake gold income, pinning gold at zero and blocking the Tavern/Smelter upgrades that TH16 requires)
- Tavern/Smelter gold-cap ceiling at Lv18/Lv21

Docs:
- `formulas.md`
- `reference/progression.js`, `reference/formulas.js`, `reference/buildings.js`
- `patch-notes.md`

Notes:
- validated with a fresh 24h bot simulation on the real files: gold net stays positive all the way, TH30 reached in ~5.7h of optimal play

---

## Patch 0.0.35 - 2026-07-06 17:26

Status:
- implemented

Summary:
- first content addition: six repeatable Mastery tech nodes, giving Knowledge a permanent long-tail purpose

Added:
- repeatable tech node mechanism: nodes with a `repeatable` config can be researched many times; levels live in the new `techLevels` save field, per-level effects stack multiplicatively, and the knowledge cost grows per level (base 40 + 10/level, max level 100)
- six Mastery nodes, one at the end of each branch:
  - Harvest Mastery (Sustenance): Food production +1%/level
  - Timber Mastery (Craftsmanship): Wood production +1%/level
  - Mason's Mastery (Masonry): Stone production +1%/level
  - Cellar Mastery (Scholarship): Wine production +1%/level
  - Drill Mastery (Warfare): Guard/Soldier food upkeep -0.5%/level
  - Coin Mastery (Commerce): Gold production +1%/level
- tech tree UI: Mastery nodes show a level badge (Lv X/100), a growing next-level cost, and the current cumulative bonus in the tooltip

Changed:
- branch progress counters count only one-time nodes; Masteries are tracked by their own level badge

Docs:
- `tech-tree.md`
- `formulas.md`
- `implemented.md`
- `roadmap.md`
- `handoff.md`
- `balance-report.md`
- `reference/techTree.js`
- `patch-notes.md`

Notes:
- validated in a 24h bot simulation: Knowledge stays in active use for ~15h of optimal play (previously the tree was exhausted in 3.5h and Knowledge sat capped); all six Masteries max out only after ~14h of optimal play, which at human idle pacing is a weeks-long progression tail
- old saves work unchanged: `techLevels` defaults to empty and is clamped on load

---

## Patch 0.0.36 - 2026-07-06 17:38

Status:
- implemented

Summary:
- the in-game Patch Notes now always show the real, current patch history, including when the game is opened directly from disk (file://)

Added:
- `reference/patchNotes.js`: a generated mirror of `patch-notes.md` that loads as a normal script, so browsers that block local fetch still get the full history

Changed:
- patch notes source order: live `patch-notes.md` fetch when available, otherwise the reference mirror
- `instructions.md`: whenever `patch-notes.md` changes, the mirror is regenerated in the same pass

Removed:
- the stale built-in fallback snapshot (frozen at 0.0.16) that used to appear when opening the game from disk

Fixed:
- the Patch Notes modal and the header patch badge no longer show months-old content on file:// (the badge used to claim 0.0.16 while the game was far newer)

Docs:
- `instructions.md`
- `README.md`
- `patch-notes.md`

---

## Patch 0.0.37 - 2026-07-07 08:31

Status:
- mixed

Summary:
- UI audit + first mockups of the Ikariam-style plot town view; new empty-terrain background direction

Added:
- `mockup-plots-v1.html` (plot view on the old painted background) and `mockup-plots-v2.html`
  (plot view on a purpose-built EMPTY village terrain: central green with a well, ring road,
  radiating roads to zones, river with a wooden bridge, forest bands, field patches, vine terraces, misc props)
- `assets/source/backgrounds/village-terrain-placeholder.svg` + rendered
  `assets/images/backgrounds/village-terrain-placeholder.png` (procedural placeholder terrain)
- `assets/source/backgrounds/terrain-art-prompt.md`: ready-to-use AI image prompt with plot
  anchor coordinates for generating the final painted terrain in the building-art style

Planned:
- runtime plot town view (designated plots, click-to-build/upgrade popovers reusing the
  existing action handlers), pending mockup approval
- UI simplification round from the audit (save-infra behind a menu, locked resources compact,
  duplicate status labels, critical low-resource highlighting, offline summary modal)
- missing building art: Winery, Ore Pit, Smelter (webp cuts from existing sources) and Tavern (new)

Docs:
- `roadmap.md`
- `handoff.md`
- `patch-notes.md`

---

## Patch 0.0.38 - 2026-07-07 17:02

Status:
- mixed

Summary:
- building proportion system, three new building art conversions, and the complete asset plan (image list + generation prompts)

Added:
- `assets/images/buildings/orepit-lv01.webp`, `smelter-lv01.webp`, `winery-lv01.webp` — converted from
  the existing 1024x1024 source PNGs (same webp q85 pipeline as the other 10); 13 of 14 base buildings
  now have game-ready art (only Tavern remains)
- `assets/asset-plan.md` — the full art inventory and plan: canvas contract (1024x1024 RGBA cutout,
  base line at 92-96%, content >=90% width), size-tier table, naming convention, master style prompt,
  and per-image prompts for all 61 needed images (Tavern + final terrain, 6 Town Hall stages,
  26 upgrade stages for the other buildings, 16 worker portraits, optional icons/cottages)

Changed:
- `mockup-plots-v2.html` (v2.1) — proportion system in place of ad-hoc pixel widths:
  - four size tiers as % of map width (landmark 12.5% / large 9.7% / medium 8.6% / small 7.7%),
    so proportions hold at every screen size
  - per-image `METRICS` (measured alpha-bbox `frac` + bottom-margin `pad`): rendered size is
    calibrated so the VISIBLE building matches its tier exactly, and each building's base sits
    precisely on its (x,y) ground anchor (`translate(-50%,-100%)` + per-image `--dy` shift)
  - Ore Pit, Smelter and Winery now show their real art on the map (were "art pending" markers);
    only Tavern remains a locked marker

Docs:
- `patch-notes.md`, `reference/patchNotes.js` (regenerated mirror)

Planned:
- generate P1 assets from the plan (Tavern + final painted terrain), then Town Hall stages
- implement the runtime plot town view once the mockup direction is confirmed

---

## Patch 0.0.39 - 2026-07-07 17:11

Status:
- mixed

Summary:
- final AI-painted village terrain adopted as the town view background

Added:
- `assets/images/backgrounds/village-terrain.webp` (451 KB, q85) — the final painted empty
  village terrain generated from the asset-plan A2 prompt (1672x941 source kept as
  `assets/source/backgrounds/village-terrain-final.png`)
- composition verified against all 15 plot anchors with the buildings composited on top:
  farm on the field edge, quarry/gold mine/ore pit on the rocky east bank across the bridge,
  winery inside the vine terraces, smelter at the southern work yard, town hall on the
  central green beside the well

Changed:
- `mockup-plots-v2.html` — background switched from the procedural placeholder to the final
  painted terrain (placeholder kept on disk for reference)

Docs:
- `assets/asset-plan.md` — A2 marked done; inventory updated
- `patch-notes.md`, `reference/patchNotes.js` (regenerated mirror)

Planned:
- generate Tavern art (asset-plan A1) — the last missing base building
- implement the runtime plot town view (mockup direction now complete: terrain + proportions + art)

---

## Patch 0.0.40 - 2026-07-07 17:31

Status:
- mixed

Summary:
- art direction pivot: the pads-terrain becomes the style master; all building art will be regenerated to match it

Added:
- `assets/images/backgrounds/village-terrain.webp` replaced with the new pads-terrain
  (cleared building plots baked into the painting; source kept as
  `assets/source/backgrounds/village-terrain-final-v2.png`)

Changed:
- `mockup-plots-v2.html` (v2.2):
  - all 15 plot anchors recalibrated onto the terrain's painted pads
  - size tiers recalibrated to the pad sizes (landmark 14% / large 11% / medium 9.7% / small 8.5%)
  - village name pill moved top-left (its old top-center spot is now the Town Hall pad)
- composite testing showed the v1 building tiles clash with this terrain (lower/frontal camera,
  green diorama patches on dry pads, prop-scale mismatch) -> decision: the terrain is the style
  master and the buildings adapt, not vice versa

Docs:
- `assets/asset-plan.md` rewritten as STYLE MASTER v2: steep ~60deg aerial camera, semi-realistic
  painterly rendering, NO grass diorama under buildings (terrain pads are the ground), terrain image
  always attached as style reference; P1 is now regenerating all 14 base buildings (73 images total);
  per-building subject prompts added for every base building
- `patch-notes.md`, `reference/patchNotes.js` (regenerated mirror)

Planned:
- generate P1 (14 base buildings, v2 style, Town Hall first) and swap them in 1:1
- v1 building tiles stay in game as placeholders until replaced

---

## Patch 0.0.41 - 2026-07-07 17:37

Status:
- mixed

Summary:
- plot markers now sit exactly on the terrain's painted building pads

Changed:
- `mockup-plots-v2.html` (v2.3):
  - all 14 plot anchors re-measured against a 5% grid overlay of the terrain and moved to the
    exact painted pad centers (one spare pad at ~66.5,37.5 left free for a future building)
  - empty/locked plot markers are now tier-sized ellipses (width = the building's size tier,
    aspect 2.1:1) CENTERED on the pad, so the dashed outline hugs the painted plot precisely;
    built buildings stay bottom-anchored on the same coordinates
  - building assignments follow the terrain's zones: Lumber Mill at the forest-edge pad,
    Farm beside the fields, Quarry/Gold Mine on the gravel pads across the bridge, Ore Pit on
    the rocky shelf below the bridge, Workshop+Smelter in the southern work yard,
    Winery on the vine-terrace pad, Vineyard amid the terraces, Tavern on the ring-road pad

Docs:
- `patch-notes.md`, `reference/patchNotes.js` (regenerated mirror)

---

## Patch 0.0.42 - 2026-07-07 18:16

Status:
- implemented

Summary:
- UI declutter pass: fewer top-strip tiles, compact resource tiles, compact day-grouped Chronicle

Removed:
- `Local Time` top tile (duplicated the OS clock)
- `Free` and `Next Villager` top tiles - free count and the villager progress bar now live
  inside the Population tile (exact % in its tooltip)
- the duplicated Day 1 chronicle entry (naming a new village with the default name no longer
  logs a second founding line)
- `Built - LvX` line on building cards (the Level badge already says it)

Changed:
- `Territories` tile hidden until the first territory is claimed
- `Autosave: On` + `Last save:` merged into one status pill (`Autosave on · saved 18:16:04`)
- Save/Export/Import/Reset moved out of the Chronicle card into a gear dropdown in the header
- resource tiles: one combined info line (`-28.9/s · empty in 14s`) instead of separate
  status/net rows; locked resources collapse to slim dimmed chips with just the unlock hint;
  full income/upkeep breakdown stays in the tooltip
- Chronicle: entries grouped under one day header, one line each with a type glyph
  (check/warning/dot), newest 8 visible + `Show more (N)` toggle
- built buildings never show a `Locked` status pill anymore (it read as a bug);
  gate info stays on the reason line under the costs

Fixed:
- favicon 404 on every load - inline SVG coin icon added (the game now has a tab icon)

Docs:
- `patch-notes.md`, `reference/patchNotes.js` (regenerated mirror)
- smoke test updated for the tools dropdown (24/24 passing)

---

## Patch 0.0.43 - 2026-07-07 21:15

Status:
- implemented

Summary:
- day counter removed from the UI; the two top rows collapsed into slim bars; colour-coded Chronicle

Removed:
- the day counter no longer appears anywhere in the UI (top tile and Chronicle day headers gone);
  the internal counter keeps ticking silently for future use (seasons, event pacing)
- the "Single-file medieval village idle prototype" subtitle

Changed:
- header and stats merged into ONE slim top bar: title + patch pill + Patch Notes + autosave +
  gear menu on the left, population / territories / happiness as compact chips on the right
  (villager progress is a 3px sliver under the population chip)
- resource row rebuilt in the mockup-plots style: slim pill chips - icon, amount/cap, net per
  second - instead of large tiles; fill ETA and the full income/upkeep breakdown moved fully
  into the tooltip; locked resources are dimmed chips with a padlock
- Chronicle entries are colour-framed by type: green = positive, red = negative, amber = neutral
  (glyphs kept); flat list, newest first, 8 visible + Show more

Docs:
- `patch-notes.md`, `reference/patchNotes.js` (regenerated mirror); smoke test 24/24

---

## Patch 0.0.44 - 2026-07-07 21:24

Status:
- implemented

Summary:
- resource chips decluttered further; Chronicle expand button removed

Removed:
- the storage cap number from resource chips (the exact cap + fill ETA stay in the tooltip) -
  the chip now carries only what you act on: amount and net per second
- the Chronicle `Show more` button - the log simply shows the newest 10 entries

Changed:
- resource chips warn about full storage instead of always printing the cap: the amount turns
  amber once a resource is >=95% full
- resource chips got more breathing room (padding, gap, slightly larger amount)

Docs:
- `patch-notes.md`, `reference/patchNotes.js` (regenerated mirror); smoke test 24/24

---

## Patch 0.0.45 - 2026-07-07 23:14

Status:
- implemented

Summary:
- objective chain: the game now always shows a clear "what next" with a reward

Added:
- `reference/objectives.js` - an ordered chain of 20 objectives from "Build a Farm" to
  "Town Hall Lv20", declared as data (goal conditions + resource rewards); rewards are
  sized to ~10-20% of the next step's cost, so they push pacing without breaking balance
- Objective card in the left rail above the Chronicle: current goal, per-goal progress
  with live counts (e.g. "Happiness 75% - 42/75"), overall progress bar, reward pills,
  and chain position (n / 20); finishing the chain shows a completion state that points
  to the Mastery nodes
- engine: `checkObjectives()` runs each tick (and during offline simulation) - objectives
  complete automatically, the reward lands in stores (clamped by caps) and a green
  chronicle entry records it
- new save field `objectiveIndex`; OLD SAVES fast-forward through already-met objectives
  at load and collect those rewards once - nobody replays finished content

Docs:
- `patch-notes.md`, `reference/patchNotes.js` (regenerated mirror), `roadmap.md`
- smoke test extended with objective checks (26/26 passing)

---

## Patch 0.0.46 - 2026-07-07 23:23

Status:
- implemented

Summary:
- building cards show post-upgrade values inline; card tooltip and Next Step section removed

Removed:
- the hover tooltip on building cards (it repeated the card's own text)
- the `Next Step` section - its information now lives inline in the effect rows

Changed:
- effect and upkeep rows show the post-upgrade value next to the current one:
  `Base output 0.45 -> 0.48 Food/s`, `Farmer capacity 6 -> 7` (green) and
  `0.27 -> 0.30 Wood/s` upkeep (amber); the section header notes "(-> after upgrade)"
- arrows disappear automatically at max level / Town Hall cap
- dead helpers `compactUpgradeLine` / `upgradeDetails` removed (superseded by the
  generic `mergeEffectDelta` line merger)

Docs:
- `patch-notes.md`, `reference/patchNotes.js` (regenerated mirror); smoke test 26/26

---

## Patch 0.0.47 - 2026-07-07 23:28

Status:
- implemented

Summary:
- tooltip audit: every tooltip that duplicated visible card text removed

Removed (pure duplication - all the info is already visible on the element):
- objective card tooltip (name + description are the card)
- worker job card tooltips (name, description, count, output, upkeep, capacity all on the card)
- "Unassigned Villagers" card tooltip
- expedition tile tooltips - the one tooltip-only fact (counter-raid risk after a failed run)
  moved onto the card as a visible suffix of the Risk line
- population chip tooltip trimmed to its unique fact (precise next-villager %);
  the free-villager count was already on the chip
- repeatable tech node tooltips no longer repeat the "Lv x/y" badge shown under the node

Kept (tooltip carries info that exists nowhere else):
- resource chips: cap, fill/empty ETA, full income & upkeep breakdown; locked chips: unlock hint
- tech nodes: cost, prerequisites, leads-to, missing resources
- territories / happiness chips: one-line explainers for icon-only chips

Docs:
- `patch-notes.md`, `reference/patchNotes.js` (regenerated mirror); smoke test 26/26


---

## Patch 0.0.48 - 2026-07-08 00:12

Status:
- implemented

Summary:
- gold economy rework: taxes from free villagers, wages for workers, fuel-only wood upkeep

Added:
- taxes: every unassigned villager pays 0.01 Gold/s once the Town Hall reaches Lv3
  (the money economy "formalises with a proper town"); idle population finally has a
  designed role (the old F4 finding)
- wages: every building-job worker draws 0.005 Gold/s (reference/workers.js upkeep);
  Forager / Wood Gatherer / Stone Collector are family labour (no wage); Scholar keeps
  its special 0.05 Gold/s; Guards/Soldiers pay the wage on top of their food upkeep
- wage strike: with an empty treasury and wages exceeding income, wage earners drop to
  50% output until gold flows again - self-correcting, chronicled, and shown on the
  gold chip (red frame + tooltip warning)
- reference/formulas.js `taxation` block (rates + TH gate + strike multiplier)

Changed:
- building wood upkeep now applies ONLY to fuel buildings (Town Hall hearth, Smelter,
  Winery, Tavern); all other buildings' upkeepBase is 0 - their cost is the wage bill
- the old per-level gold "administration" upkeep (goldGates) is retired
- gold is no longer locked behind Gold Mining research: the chip unlocks at TH Lv3
  ("Taxes begin at Town Hall Lv3"); Gold Mining now just unlocks the Gold Mine
- Gold Mining tech description updated

Validated (36h bot simulation, greedy player):
- TH2 day 20 (baseline 38 - the early opener actually got FASTER thanks to zero
  early upkeep + objective rewards), TH30 day 345 (~5.75h optimal), full tech tree by ~6h
- no walls, no death spirals; a short self-healing strike window right after wages
  activate (greedy over-assignment), gone by day ~65
- endgame: 373 free villagers earn +21 Gold/s - big villages are now rich villages

Docs:
- formulas.md (Taxes & Wages section replaces Gold Gating), workers.md, patch-notes.md,
  reference/patchNotes.js (regenerated mirror); smoke test 26/26


---

## Patch 0.0.49 - 2026-07-08 08:56

Status:
- implemented

Summary:
- removed passive punishment from idle/offline play

Changed:
- population no longer consumes Food passively; Food is now a growth gate and
  progression resource rather than a death timer
- empty Food pauses population growth instead of killing villagers or forcing
  workers out of their roles
- offline growth runs at 25% of active growth speed, so returning later can grow
  the settlement without matching active-play speed
- negative offline rates keep a small reserve (`max(1, 5% of cap)`) instead of
  draining stockpiles all the way to zero while the player is away
- free villagers still pay taxes from Town Hall Lv3, but assigned workers no
  longer draw a standard wage; assigning a worker is now an opportunity cost
  because they stop paying taxes while producing goods
- Gold is no longer clamped to zero before Gold Mining, so Town Hall Lv3 taxes
  work as documented

Removed:
- starvation deaths
- starvation role-loss pressure
- the 0.0.48 wage-strike system
- standard `0.005 Gold/s` wages on regular production workers
- passive building Wood upkeep across all current buildings

Rebalanced:
- `Village Rations` now gives Food production +3% instead of reducing removed
  population upkeep
- `Herbal Remedies` keeps its +6% growth support and no longer references food
  upkeep
- `Masonry` now reduces building Wood costs by 5% instead of reducing removed
  building upkeep

Docs:
- formulas.md, workers.md, tech-tree.md, implemented.md, roadmap.md, handoff.md,
  reference/buildings.js, reference/workers.js, reference/formulas.js,
  reference/progression.js, reference/techTree.js, reference/patchNotes.js


---

## Patch 0.0.50 - 2026-07-08 09:05

Status:
- implemented

Summary:
- restored population Food upkeep as non-lethal growth pressure

Changed:
- population consumes Food again using the old tiered rates:
  - 0.19 Food/s up to 6 population
  - 0.25 Food/s up to 12 population
  - 0.31 Food/s after that
- Food shortages still do not kill villagers or remove workers; empty Food only
  pauses population growth
- offline play keeps the 0.0.49 safety behavior: slower growth and a small
  reserve instead of total stockpile drain
- `Village Rations` and `Herbal Remedies` once again reduce population Food
  upkeep because that mechanic is active again

Kept:
- no standard worker wages
- no wage strikes
- no passive building Wood upkeep
- no starvation deaths or starvation role loss

Docs:
- formulas.md, implemented.md, roadmap.md, handoff.md, tech-tree.md,
  reference/formulas.js, reference/techTree.js, reference/patchNotes.js


---

## Patch 0.0.51 - 2026-07-08 09:27

Status:
- implemented

Summary:
- restored visible storage caps on resource chips and separated Knowledge from standard resources

Changed:
- resource chips now show `current/cap` again, e.g. `200/1000`, while keeping ETA and breakdown detail in the tooltip
- Knowledge now sits at the far right of the resource row when there is horizontal room
- Knowledge uses a subtle blue-tinted chip treatment to mark it as a special research resource

Fixed:
- removed the retired `starve` save-state field through save migration v10

Docs:
- reference/patchNotes.js


---

## Patch 0.0.52 - 2026-07-08 09:46

Status:
- implemented

Summary:
- fixed live-site asset caching so the patch badge updates reliably after deploys

Changed:
- runtime, reference, and stylesheet asset URLs now include a `v=0.0.52` cache-busting query
- the live patch-notes fetch now requests `patch-notes.md?v=0.0.52`

Fixed:
- browsers that had cached older script files could keep showing an old patch badge such as `0.0.47`

Docs:
- reference/patchNotes.js
