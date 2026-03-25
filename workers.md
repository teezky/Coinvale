# Coinvale Workers

Purpose:
- human-readable overview of the worker system
- not the canonical data source
- structured reference lives in `reference/workers.js`

Core rules:
- starter jobs carry the opening game
- later the focus shifts into the worker capacity of unique buildings
- worker assignment uses sliders
- some roles are `free`, others are `slot`-based

Starter roles:

`Forager`
- role: starter `Food`
- available: from the start

`Wood Gatherer`
- role: starter `Wood`
- available: from the start

`Stone Collector`
- role: starter `Stone`
- available: from the start

Building-linked production roles:

`Farmer`
- requires: `Farm`
- produces `Food`

`Woodcutter`
- requires: `Lumber Mill`
- produces `Wood`

`Quarry Miner`
- requires: `Quarry`
- produces `Stone`

`Gold Miner`
- requires: `Gold Mine` + `Gold Mining`
- produces `Gold`

`Scholar`
- requires: `Scribe Hall` + a functioning `Gold` economy
- produces `Knowledge`
- upkeep: uses `Gold`

`Vinekeeper`
- requires: `Vineyard`
- supports the `Wine` economy

`Ore Miner`
- requires: `Ore Pit`
- produces `Ore`

`Smelter`
- requires: `Smelter`
- produces `Metal`
- upkeep: uses `Ore`

`Vintner`
- requires: `Winery`
- improves `Wine` throughput

`Innkeeper`
- requires: `Tavern`
- uses `Wine`
- supports `Happiness`, and through that supports growth

Population and military:

`Villager`
- passive effect: each villager adds a small passive `Knowledge` flow

`Guard`
- requires: `Barracks`
- helps stop or soften `counter-raids`

`Soldier`
- requires: `Barracks`
- required for expeditions

Note:
- exact unlocks, outputs, upkeep, and slot types live in `reference/workers.js`
