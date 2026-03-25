# Coinvale Buildings

Purpose:
- human-readable overview of the buildings
- not the canonical data source
- structured reference lives in `reference/buildings.js`

Core rules:
- all buildings are unique
- each building type can only exist once
- `Town Hall` goes to `Level 30`
- other buildings go to `Level 50`
- worker-cap on worker buildings comes from building level
- worker assignment uses sliders

Categories:

`Town Hall`
- role: population core, growth spine, overall settlement progression
- special rule: starts in the game already built
- progression: gated by the level of other buildings

`Farm`
- role: main `Food` estate
- provides: base food + `Farmer` capacity

`Lumber Mill`
- role: main `Wood` production
- provides: base wood + `Woodcutter` capacity

`Quarry`
- role: main `Stone` extraction
- provides: base stone + `Quarry Miner` capacity

`Workshop`
- role: economy efficiency and baseline building-output support
- special rule: utility building without worker slots

`Scribe Hall`
- role: center of the `Knowledge` economy
- provides: base knowledge + `Scholar` capacity
- unlock: `Gold Mining` + `Town Hall Lv4`, so it is not a half-usable building before gold exists

`Barracks`
- role: home of the `Guard` and `Soldier` roles
- use: expeditions and village defense

`Warehouse`
- role: global storage support
- special rule: utility building without worker slots
- town hall gate: `TH 2`
- note: uses a stronger milestone storage curve instead of the old weaker linear feel
- note: brought earlier into progression so `Town Hall` upgrades do not get blocked by storage

`Gold Mine`
- role: `Gold` production
- provides: base gold + `Gold Miner` capacity
- town hall gate: `TH 5`

`Vineyard`
- role: early luxury economy layer
- provides: base wine + `Vinekeeper` capacity
- town hall gate: `TH 10`

`Winery`
- role: improved `Wine` throughput and luxury support
- provides: `Vintner` capacity
- town hall gate: `TH 12`

`Ore Pit`
- role: `Ore` extraction
- provides: `Ore Miner` capacity
- town hall gate: `TH 10`

`Smelter`
- role: `Metal` production
- provides: `Smelter` capacity
- upkeep: consumes `Ore`
- town hall gate: `TH 14`

`Tavern`
- role: `Happiness` support
- provides: `Innkeeper` capacity
- uses `Wine` and supports population growth
- town hall gate: `TH 15`

Note:
- exact unlocks, costs, slots, upkeep, and notes live in `reference/buildings.js`
