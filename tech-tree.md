# Coinvale Tech Tree

Purpose:
- human-readable overview of the tech tree logic
- not the canonical data source
- structured reference lives in `reference/techTree.js`

Branches:

`Sustenance`
- food, village stability, health, and growth support
- now starts with `Field Rotation`

`Craftsmanship`
- wood flow, craft, `Workshop`, and production support

`Masonry`
- quarry, masonry, storage, and logistics
- unlocks `Warehouse` and the storage-cap support layer

`Scholarship`
- `Knowledge` first, then `Wine`, and only after that meaningful `Happiness`

`Warfare`
- expedition success, defense, guards, and counter-raid mitigation

`Commerce`
- `Gold`, `Ore`, `Metal`, trade efficiency, and the later economic layer

Key node milestones:
- `Field Rotation`
  - unlocks the first real farm improvement
- `Craftsmanship`
  - unlocks `Workshop`
- `Storehouse Planning`
  - unlocks `Warehouse`
  - helps solve early storage deadlocks in `Town Hall` progression
- `Planning Office`
  - reduces building `Wood` and `Stone` costs
- `Measured Masonry`
  - reduces building `Stone` costs
- `Viticulture`
  - unlocks `Vineyard`
  - from this point `Happiness` becomes meaningfully active
- `Vintage Press`
  - unlocks `Winery`
- `Tavern Culture`
  - unlocks `Tavern`
- `Gold Mining`
  - unlocks `Gold Mine`
- `Ore Extraction`
  - unlocks `Ore Pit`
- `Smithing`
  - unlocks `Smelter`

Current UI direction:
- compact vertical branch view
- on wide screens, all branches can sit side-by-side in one overview row
- branch-appropriate glyph icons directly inside each node orb
- node names shown directly under each node
- detailed information in tooltips
- future nodes remain visible across the whole branch
- branch flow now reads top-to-bottom instead of left-to-right
- prerequisite links are rendered as explicit branch-internal connection lines
- connectors use straight WoW-style segments instead of curved splines
- completed prerequisite links are highlighted, so researched paths are easier to scan
- branch cards avoid internal horizontal scrolling in normal desktop and tablet layouts
- responsive sizing keeps node spacing compact without overgrowing card widths
- branch depth spacing is computed from in-branch prerequisites to avoid oversized vertical gaps
- prerequisites still define both branch depth and side-branch visibility

Knowledge logic:
- `Knowledge` no longer comes only from `Scribe Hall` and `Scholars`
- population also gives a small passive research flow in early game

Important gating rules:
- `Gold Mining` arrives early enough that `Lv5-6` building upgrades should not deadlock on gold
- `Scribe Hall` does not unlock before `Gold Mining`, so scholar gold upkeep is not introduced as a half-finished system
- some later nodes require both prerequisites and a certain `Town Hall` level
- if a node unlocks a building with a `Town Hall` requirement, the node now inherits that same minimum `Town Hall` level
- `Happiness` is not really player-driven before the `Viticulture -> Vintage Press -> Tavern Culture` chain
- research cost is fixed and predictable
  - the same node does not become more expensive just because you researched something else first in the same branch
  - deeper nodes are still meaningfully more expensive than earlier ones
  - `Knowledge` cap growth was tuned to support that

Mastery nodes (Patch 0.0.35):
- each branch ends in a repeatable `Mastery` node (max level `100`)
- per-level effects stack multiplicatively: +1% Food / Wood / Stone / Wine / Gold production,
  or -0.5% Guard/Soldier food upkeep (Warfare)
- knowledge cost grows per level: `40 + 10 * currentLevel`
- levels are stored in the `techLevels` save field; branch counters track only one-time nodes
- purpose: a permanent Knowledge sink and long-tail progression goal after the tree is complete

Effects model:
- since Patch `0.0.29`, numeric node bonuses are machine-readable `effects` arrays in `reference/techTree.js`
- the runtime production/upkeep engine aggregates them; no node bonus is hardcoded in `js/engine.js`
- current effect types: `production_mult`, `worker_output_mult`, `worker_upkeep_mult`,
  `population_food_upkeep_mult`, `build_cost_mult`, `storage_mult`,
  `production_per_town_hall_level`
- expedition, trader, happiness, growth, and guard-power bonuses still resolve through dedicated helpers
- known gap: `Fortified Storeyards` currently has no implemented effect (see `roadmap.md`)

Note:
- exact node-by-node reference lives in `reference/techTree.js`
