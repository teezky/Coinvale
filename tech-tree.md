# Coinvale Tech Tree

Purpose:
- human-readable overview of the tech tree logic
- not the canonical data source
- structured reference lives in `reference/techTree.js`

Branches:

`Food & Growth`
- food, village stability, health, and growth support
- now starts with `Field Rotation`

`Craft & Timber`
- wood flow, craft, `Workshop`, and production support

`Stone & Storage`
- quarry, masonry, storage, and logistics
- unlocks `Warehouse` and the storage-cap support layer

`Knowledge & Civic`
- `Knowledge` first, then `Wine`, and only after that meaningful `Happiness`

`Military & Expeditions`
- expedition success, defense, guards, and counter-raid mitigation

`Trade & Metals`
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
- compact node view
- node names shown directly under each node
- detailed information in tooltips
- future nodes remain visible across the whole branch
- both horizontal and vertical progression use prerequisites
- the tree now uses more width than before

Knowledge logic:
- `Knowledge` no longer comes only from `Scribe Hall` and `Scholars`
- population also gives a small passive research flow in early game

Important gating rules:
- `Gold Mining` arrives early enough that `Lv5-6` building upgrades should not deadlock on gold
- `Scribe Hall` does not unlock before `Gold Mining`, so scholar gold upkeep is not introduced as a half-finished system
- some later nodes require both prerequisites and a certain `Town Hall` level
- `Happiness` is not really player-driven before the `Viticulture -> Vintage Press -> Tavern Culture` chain
- research cost is fixed and predictable
  - the same node does not become more expensive just because you researched something else first in the same branch
  - deeper nodes are still meaningfully more expensive than earlier ones
  - `Knowledge` cap growth was tuned to support that

Note:
- exact node-by-node reference lives in `reference/techTree.js`
