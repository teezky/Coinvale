# Coinvale Implemented

Project:
- Browser game with a modular runtime: `index.html` (entry point) + `styles.css` + `js/*.js` + `reference/*.js`
- No build system; the game opens directly from `index.html`
- Game name: `Coinvale`

Currently in the game:
- start = `4` villagers
- random events are about `20%` less frequent
- `Happiness` exists in the game and affects population growth
- `Happiness` is effectively locked until the `Wine` economy (`Viticulture`) is online

Resources:
- `Food`
- `Wood`
- `Stone`
- `Gold`
- `Ore`
- `Metal`
- `Wine`
- `Knowledge`
- all resources are shown in the row from the start
- locked resources are dimmed and stay inactive before unlock
- each resource has a small icon
- `Knowledge` is shown last as a distinct progression currency
- `Knowledge` base cap starts at `120`
- `Knowledge` cap scales more strongly with `Town Hall` and `Scribe Hall`

Economy and progression:
- each villager contributes a small passive research flow
- `Scribe Hall` unlocks only after `Gold Mining` and `Town Hall Lv4`
- `Scholar` becomes available only after the `Gold` economy is unlocked
- `Gold Mining` itself does not require gold to research
- later gold-related techs require more `Gold` than before
- expedition resource rewards scale with storage size
- core economy has been slowed down:
  - `Farm`, `Lumber Mill`, and `Quarry` produce less than before
  - their upgrade cost curve is steeper
  - `Town Hall` has a stronger milestone-style cost curve
  - population and military `Food` upkeep put more pressure on the economy
  - expedition resource rewards are more conservative
- follow-up tuning slowed the economy further:
  - `Farmer`, `Woodcutter`, and `Quarry Miner` output was reduced again
  - the building level multiplier and `Workshop` village efficiency were reduced
  - building `Wood` upkeep rises more clearly and became a real cost
- `Tech Tree` research cost is fixed and predictable
  - it depends on node depth and tier
  - it does not change dynamically based on how many nodes were researched earlier in the same branch
- deeper nodes now cost clearly more than earlier ones, while `Knowledge` cap growth was raised to support that
- `Scholar` gold upkeep is softer (`0.05/s`)
- `Guard` and `Soldier` `Food` upkeep is more noticeable (`0.20/s` and `0.26/s`)
- `Warehouse` is available earlier (`Town Hall Lv2`) so early `Town Hall` upgrades do not hit storage deadlocks
- `Ore Pit` is available at `Town Hall Lv10`, avoiding the earlier ore-related progression deadlock
- `Town Hall` cost, storage growth, and soft building caps are aligned:
  - `TH1 -> TH2` no longer deadlocks on storage
  - later `Town Hall` levels no longer outrun storage
  - `TH30` now supports `Lv50` buildings through the soft-cap model
- progression and gating definitions now live in `reference/progression.js` instead of being spread only across hardcoded runtime branches

Buildings:
- `Town Hall` is always present and is the center of settlement progression
- building runtime definitions now load from `reference/buildings.js`
- all buildings are unique:
  - only `1` of each type may exist
  - `Town Hall` max level = `30`
  - other buildings max level = `50`
- worker buildings scale through:
  - building level
  - assigned worker count
  - tech and workshop bonuses
- worker assignment uses sliders
- base save building state now derives from the building reference source, so future building additions are safer
- on building cards:
  - before construction there is `Build Cost`
  - after construction only `Upgrade Cost` remains
  - `Current Effect` shows real current-level output and capacity
  - `Next Step` shows the next level's main output and capacity

Current buildings:
- `Town Hall`
- `Farm`
- `Lumber Mill`
- `Quarry`
- `Workshop`
- `Scribe Hall`
- `Barracks`
- `Warehouse`
- `Gold Mine`
- `Vineyard`
- `Winery`
- `Ore Pit`
- `Smelter`
- `Tavern`

Workers:
- worker runtime definitions now load from `reference/workers.js`
- starter roles:
  - `Forager`
  - `Wood Gatherer`
  - `Stone Collector`
- building roles:
  - `Farmer`
  - `Woodcutter`
  - `Quarry Miner`
  - `Gold Miner`
  - `Scholar`
  - `Vinekeeper`
  - `Ore Miner`
  - `Smelter`
  - `Vintner`
  - `Innkeeper`
- defense and military:
  - `Guard`
  - `Soldier`
- base save job state now derives from the worker reference source, so future worker additions are safer

UI and UX:
- the live runtime now uses a fixed painted background behind the UI shell
- the main shell uses warmer translucent `glass fantasy` panels instead of the older flatter theme
- the runtime top bars, resource row, chronicle panel, scene shell, and main cards have been visually moved toward the approved mockup style
- resource cards show `Net` and time to fill or empty
- tooltips show detailed income / upkeep breakdowns
- missing resources in build, upgrade, and research costs are highlighted in red
- `Tech Tree` uses a compact full-branch node view
- the event modal appears above the tech tree
- the town scene shows each built building with its own sprite and level badge
- the scene panel supports player-defined village naming, stored in the save
- the village name is centered in the scene panel
- on reset or a true new game, village naming appears first as an in-game modal
- when `Happiness` is not yet active, the UI clearly states that it unlocks through the wine economy
- resource tooltips stay visible during mouseover instead of disappearing every tick
- resource cards are slightly wider so labels like `Knowledge` fit better

Tech tree:
- branches:
  - `Sustenance`
  - `Craftsmanship`
  - `Masonry`
  - `Scholarship`
  - `Warfare`
  - `Commerce`
- node orbs now show branch-appropriate glyph icons for quicker scanning
- research nodes that unlock gated buildings now inherit the matching `Town Hall` requirement
- both horizontal and vertical progression use prerequisites
- future nodes are always visible
- the tree is already structured to support:
  - `Wine`
  - `Ore`
  - `Metal`
  - `Happiness`
- old `Granary` / `Chicken Coop` nodes were removed
- early nodes like `Field Rotation` and cost-reduction nodes such as `Measured Masonry` and `Planning Office` were added

Building and worker UI:
- unique building cards hide the `Build` button after construction
- building cards hide the `Upkeep` section when a building has no active upkeep
- worker cards hide the upkeep row when a role has no upkeep

Resource visuals:
- the `Wine` icon now uses a grape cluster for better small-scale readability

Expeditions and defense:
- expeditions use provisions
- expeditions give storage-scaled rewards
- a failed expedition can trigger a `counter-raid`
- `Guard` helps stop raids or reduce raid damage
- random events can now give or remove `Gold`
- expedition definitions now live in `reference/expeditions.js` instead of being hardcoded only inside `index.html`

Progression and gating:
- `Town Hall` build requirements now resolve from shared progression reference data
- `Town Hall` tech requirements now resolve from shared progression reference data
- building upgrade groups and `Town Hall` soft-cap formulas now resolve from shared progression reference data
- late gold upkeep gates and building gold-upgrade thresholds now resolve from shared progression reference data
- tech node definitions and tech branch metadata now live in `reference/techTree.js`
- `index.html` now reconstructs the runtime tech map from the tech-tree reference layer instead of hardcoding the full `T` object inline
- core runtime formula curves now live in `reference/formulas.js`
- `index.html` now resolves `Town Hall` caps, storage scaling, worker slot growth, and research cost formulas from the shared formula reference layer instead of hardcoding those coefficients inline

Trader:
- trader now offers broader barter instead of only a tiny fixed set of trades
- once the `Knowledge` economy is running, trader can sometimes offer direct `Knowledge` deals
- trader offer definitions now live in `reference/traderOffers.js` instead of being hardcoded only inside `index.html`
- trader offers now include explicit metadata such as merchant type and fairness
- trader modal titles now surface the merchant archetype and deal quality
- trader logs can include short context about why a deal was fair or costly

Random events:
- random events no longer open choice popups during normal play
- random events now resolve automatically into the `Chronicle`
- positive random resource events scale from storage capacity
- negative random resource events scale from current stored amounts
- the random event pool now covers food, wood, stone, gold, knowledge, ore, metal, wine, happiness, and villager growth
- random event definitions now live in `reference/randomEvents.js` instead of being hardcoded only inside `index.html`

Town Hall:
- max level target = `30`
- population / growth progression follows a `30 + 6 * Level^1.5` style curve
- upgrades are gated by other building levels
- soft caps now allow the rest of the settlement to realistically reach `Lv50` by `TH30`

Latest balance pass:
- seasons were removed from practical gameplay
- `Town Hall` now softly limits the pace of other building upgrades
- `Farm`, `Lumber Mill`, `Quarry`, `Gold Mine`, `Knowledge`, and the wine chain all produce more slowly than before
- `Workshop` gives a smaller village efficiency bonus per level
- resource-output tech nodes now use smaller bonuses
- starvation deaths, standard worker wages, and passive building Wood upkeep
  have been removed from active and offline play
- population Food upkeep is active, but shortages pause growth instead of
  killing villagers or removing workers
- free villagers pay taxes from Town Hall Lv3; assigned workers produce goods
  instead of paying taxes
- offline growth runs slower and negative offline rates keep a small stockpile
  reserve instead of draining resources completely
- `Warehouse` storage was increased so `Town Hall` upgrades no longer outrun the storage ceiling

Runtime architecture (Patch 0.0.28):
- `index.html` is a thin entry point: markup, stylesheet link, ordered script tags
- `js/data.js` builds the runtime definition maps from the reference layer
- `js/engine.js` owns game state, save/migration, economy math, the tick, expeditions, random events, and the trader
- `js/sprites.js` owns the inline SVG art, including the new dedicated cottage sprite
- `js/ui.js` owns rendering, tooltips, sliders, modals, and the tech tree layout
- `js/main.js` owns bootstrap, button wiring, and the fixed-timestep main loop
- the code uses readable, descriptive naming throughout (`gameState`, `BUILDINGS`, `WORKERS`, `TECH_NODES`, `EXPEDITIONS`)
- dead legacy code was removed: seasons, legacy choice-popup events, unused helpers and sprites
- save key, save format, and balance math are unchanged from the pre-refactor build

Production engine (Patch 0.0.29):
- all economy math runs through a generic contribution engine in `js/engine.js`
- building base outputs come from `reference/buildings.js` (`output` fields)
- worker outputs and upkeep come from `reference/workers.js`
- tech bonuses come from `effects` arrays on nodes in `reference/techTree.js`
- idle safety, taxation, and remaining explicit upkeep/conversion formulas come from `reference/formulas.js`
- resource tooltips, building cards, and upgrade previews read the same engine helpers as the tick math
- balance parity with the previous hardcoded engine was verified with a 60-state fuzz harness

Rendering architecture (Patch 0.0.30):
- only the active tab's panel renders each tick; hidden panels are skipped entirely
- structural blocks pass through `setHtmlIfChanged`, so unchanged markup causes no DOM write
- the resource row keeps persistent tiles whose values update in place every tick
- all interaction events (buttons, tech nodes, sliders, tooltips, modal choices) are delegated and bound once at boot
- measured ~4.8x faster render pass versus the previous full-rebuild model

Building state model (Patch 0.0.31):
- each building is stored as `{ built, level }` (save version 9; older saves migrate automatically, including pre-v7 `house`/count shapes and v7-v8 `levels` arrays)
- engine helpers: `isBuilt`, `buildingLevel`, `builtLevel`
- verified against the previous build with the 60-state economy parity harness

Stylesheet (Patch 0.0.32):
- `styles.css` is a single consolidated layer produced by resolving the cascade of the three historical style layers
- rendering verified pixel-identical (computed-style diff over every element across 4 tabs and 5 viewports, plus screenshot comparison)
- remaining `!important` flags are load-bearing and documented for removal during the next visual redesign

Gold economy rebalance (Patch 0.0.34):
- building gold upkeep halved; gold cap grows with Town Hall (x6/level) and Gold Mine (40 + 18/level)
- Tavern/Smelter base-cost gold reduced to 2 so late upgrades stay under the gold cap
- removes the former TH15 hard wall documented in `balance-report.md`

Mastery nodes (Patch 0.0.35):
- six repeatable branch-ending tech nodes with per-level stacking effects and growing knowledge cost
- levels persist in the `techLevels` save field; UI shows a level badge and cumulative bonus
- gives Knowledge a permanent purpose after the one-time tree is exhausted
