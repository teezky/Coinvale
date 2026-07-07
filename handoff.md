# Coinvale Handoff

Project:
- Browser game with a modular runtime: `index.html` is a thin entry point that loads `styles.css`, `reference/*.js`, and `js/*.js`
- No build system: the game still opens directly from `index.html`
- Game name: `Coinvale`

Working agreements:
- Discuss changes before implementing them.
- Only edit code after the user gives a clear go-ahead such as `tee ära`, `implement`, or `update the code`.
- Keep all related markdown files and `reference/*.js` files in sync during the same pass.

Current state:
- The game is moving toward an `Ikariam + Melvor Idle` direction with a light `Farthest Frontier` logic layer.
- The opening is more active:
  - start with `4` villagers
  - random events are about `20%` less frequent
- Resource cards show `Net` and fill/empty timing in normal view, and detailed income/upkeep breakdowns in tooltips.
- All resources are visible from the start:
  - locked resources are dimmed
  - locked resources explain their unlock path in tooltips
  - `Knowledge` is shown last in the row
- `Knowledge` now comes online earlier:
  - every villager adds a small passive research flow
  - `Scribe Hall` is positioned behind gold so `Scholar` is not a half-usable unlock
  - `Scholar` only becomes available once the `Gold` economy is online
  - `Knowledge` base cap now starts at `120`
  - `Knowledge` costs rise more clearly deeper in the tree
  - `Knowledge` cap also scales more aggressively with `Town Hall` and `Scribe Hall`
- The building model now uses unique buildings:
  - each building type can only exist once
  - `Town Hall` goes to `Level 30`
  - other buildings go to `Level 50`
  - worker buildings scale through level-based output and worker capacity
- Worker assignment now uses sliders.
- The scene panel supports village naming, and the name stays in the save.
- The village name is centered above the settlement scene.
- A new or reset game now asks for the village name through an in-game modal as the first step.
- The live runtime shell in `index.html` now uses the newer `glass fantasy` direction:
  - fixed background image behind the UI
  - warmer translucent panels
  - runtime layout visually aligned more closely with the approved mockup direction
- `Town Hall` is the core progression spine:
  - max level target = `30`
  - population/growth uses a `Level^1.5` style curve
  - upgrades are gated by other building levels
- The `Growth` pause button was removed so growth no longer interferes with the main loop.
- Building cards:
  - `Current Effect` shows the real current-level state
  - `Next Step` shows the next level's main base effect and worker capacity
- `Tech Tree` now uses:
  - a wider node layout
  - visible future nodes
  - both horizontal and vertical prerequisite logic
  - branches for `Growth`, `Craft`, `Stone`, `Civic`, `Military`, and `Trade`
  - fixed and predictable node costs based on node depth and tier
- Expeditions scale with storage size, and failed expeditions can trigger a `counter-raid`.
- New economy layers were added:
  - `Wine`
  - `Ore`
  - `Metal`
  - `Happiness` currently affects only population growth and effectively unlocks once the `Wine` economy is online
- `Granary` and `Chicken Coop` have been removed from runtime logic.
- `Warehouse` is now a clearer milestone building with a stronger storage curve.
- `Warehouse` was moved earlier (`TH 2`) so early `Town Hall` upgrades do not hit storage deadlocks.
- `Ore Pit` was moved to `TH 10` on the build gate side so `Town Hall 11+` progression does not deadlock.
- Some buildings and tech nodes now require a specific `Town Hall` level.
- Early food and gold upkeep were softened slightly so growth and the first specialist roles do not stall too easily.
- Recent economy passes:
  - reduced `Farm`, `Lumber Mill`, and `Quarry` output
  - made core building upgrades more expensive
  - made `Town Hall` feel more like a costly milestone
  - increased villager / guard / soldier `Food` pressure
  - reduced expedition resource rewards
  - slowed `Knowledge` gain so research does not run away
- Follow-up tuning:
  - reduced `Farmer`, `Woodcutter`, and `Quarry Miner` output further
  - reduced `Workshop` village efficiency and the global building-level multiplier
  - increased building `Wood` upkeep so it is now a real cost
  - fixed tooltip persistence across renders
  - made the resource row slightly roomier
- Random events can now also give or remove `Gold`.
- Random events no longer interrupt gameplay with modal choices.
- Random event outcomes now auto-resolve into the `Chronicle`.
- Positive random event rewards scale from storage capacity.
- Negative random event losses scale from current stored amounts.
- Random event definitions now live in `reference/randomEvents.js`.
- Trader now offers broader barter and can sometimes trade `Knowledge`.
- Trader offer definitions now live in `reference/traderOffers.js`.
- Trader offers now have explicit merchant-type and fairness metadata.
- `index.html` still owns the trader runtime flow, but no longer needs to hardcode the offer table itself.
- Expedition definitions now live in `reference/expeditions.js`.
- `index.html` still owns expedition runtime resolution, but no longer needs to hardcode the expedition definition table itself.
- Building definitions now live in `reference/buildings.js` as an active runtime source.
- `index.html` now reconstructs the runtime building map from the reference layer instead of hardcoding the full `D` object inline.
- Worker definitions now live in `reference/workers.js` as an active runtime source.
- `index.html` now reconstructs the runtime worker map from the reference layer instead of hardcoding the full `J` object inline.
- Progression and gating definitions now live in `reference/progression.js`.
- `index.html` still owns runtime calculations, but no longer needs to hardcode most `Town Hall` gate tables, building progression groups, or gold gate values directly in-place.
- Tech tree definitions now live in `reference/techTree.js` as an active runtime source.
- `index.html` now reconstructs the runtime tech node map and branch metadata from the reference layer instead of hardcoding the full `T` object and `TECH_BRANCHES` array inline.
- Core runtime formula curves now live in `reference/formulas.js` as an active runtime source.
- `index.html` now resolves `Town Hall` cap math, storage scaling, worker capacity curves, and research cost formulas from the reference layer instead of keeping those coefficient clusters inline.
- `Town Hall` cost, storage scaling, and building soft caps were rebalanced together:
  - the hall cost curve is softer
  - base storage is stronger
  - `Warehouse` scales harder
  - `TH30` can now realistically support `Lv50` buildings
- The runtime was rewritten into readable, documented modules (Patch `0.0.28`):
  - `js/data.js` builds runtime definition maps from the reference layer
  - `js/engine.js` owns state, saves, economy math, tick, expeditions, events, trader
  - `js/sprites.js` owns the SVG art
  - `js/ui.js` owns rendering, tooltips, sliders, modals, and the tech tree layout
  - `js/main.js` owns bootstrap, button wiring, and the main loop
  - `styles.css` is a consolidated single-layer stylesheet since Patch `0.0.32`
  - single-letter names were replaced (`D` -> `BUILDINGS`, `J` -> `WORKERS`, `T` -> `TECH_NODES`, `X` -> `EXPEDITIONS`, `st` -> `gameState`)
  - dead legacy code was removed (seasons, legacy choice events, unused helpers and sprites)
  - cottages now use their own sprite instead of the Town Hall fallback
  - save key, save format, and balance math were intentionally left unchanged
- The economy now runs on a generic production/upkeep engine (Patch `0.0.29`):
  - every income/upkeep line is a contribution derived from `reference/*.js`
  - building base outputs live in `reference/buildings.js`, worker outputs/upkeep in `reference/workers.js`
  - tech bonuses are `effects` arrays on the nodes in `reference/techTree.js`
  - tooltips, cards, and upgrade previews read the same engine helpers as the real math
  - parity with the previous engine was verified with a 60-state fuzz harness
- The rendering layer is now lazy and delegated (Patch `0.0.30`):
  - only the active tab's panel renders each tick; `setHtmlIfChanged` skips unchanged DOM writes
  - the resource row updates persistent tiles in place instead of rebuilding markup
  - all buttons, sliders, tooltips, and modal choices use one-time delegated listeners (`setupUiDelegation`)
  - measured ~4.8x faster render pass; steady state performs zero DOM writes
- Building state uses the plain unique-building shape (Patch `0.0.31`):
  - each building is `{ built, level }` in the save (save version 9, automatic migration)
  - helpers: `isBuilt`, `buildingLevel` (1 when unbuilt, for neutral math), `builtLevel` (0 when unbuilt, for requirements)

Main files:
- `index.html` - thin entry point (markup + script tags)
- `styles.css` - stylesheet (three historical layers, consolidation pending)
- `js/data.js`, `js/engine.js`, `js/sprites.js`, `js/ui.js`, `js/main.js` - runtime modules
- `instructions.md`, `implemented.md`, `roadmap.md`, `patch-notes.md` - process and state docs
- `buildings.md`, `workers.md`, `tech-tree.md`, `formulas.md` - system docs
- `reference/*.js` - structured reference data (active runtime sources)

Next focus:
- plot town view direction chosen (see `mockup-plots-v2.html` + `terrain-art-prompt.md`);
  awaiting composition approval, then runtime implementation
- balance pass findings are applied: gold fix bundle (`0.0.34`) and repeatable Mastery
  nodes (`0.0.35`); both validated with fresh 24h bot simulations
- next design discussion: worker capacity vs population growth (76% of late population idles)
- smaller open items: early-game pacing, Stone early sink, `Fortified Storeyards` effect,
  missing-cost highlight
- content candidates: browser-side balance pass, `Fortified Storeyards` effect decision,
  new tech nodes / buildings / expeditions (now data-only work in `reference/*.js`),
  restoring the red missing-cost highlight (small UI decision)
- run another browser-side balance pass
- verify the slower economy feels better after the latest storage / hall rebalance
- verify `Knowledge` cap and research cost scaling still meet cleanly
- decide when to replace or layer over the current sprites with separate building art
- start routing runtime and mockup image usage through `reference/assets.js`

Repository structure note:
- image assets now live under `assets/`
- source/original art belongs in `assets/source/`
- game-ready image copies belong in `assets/images/`
- current main background copy:
  - `assets/images/backgrounds/village-valley-main.png`

Suggested prompt for a fresh conversation:

```text
The project is the browser game "Coinvale". index.html is a thin entry point;
the runtime lives in js/*.js and the data layer in reference/*.js.

Please read handoff.md first and continue from there.

Important agreement:
- Discuss changes before implementing them.
- Do not edit code until I clearly say "tee ära".
- If you change anything, keep the related markdown and reference files in sync.
```

Open balance question:
- `Fortified Storeyards` is researchable but has no implemented effect;
  decide whether to implement the promised raid-loss reduction or rework the node

Note:
- Patches `0.0.28`-`0.0.32` were verified with real in-browser testing
  (Playwright/Chromium), including a 60-state economy parity fuzz harness and
  interaction tests for slider drags, tab cycling, and delegated clicks.
