# Formulas

This file collects the main `Coinvale` runtime formulas and balance rules.

Important:
- the runtime source of truth is the reference layer (`reference/formulas.js`,
  `reference/buildings.js`, `reference/workers.js`, `reference/techTree.js`)
  consumed by the production/upkeep engine in `js/engine.js`
- this file is a human-readable summary, not a build source

## Level Caps

- `Town Hall` max level: `30`
- other buildings max level: `50`

## Town Hall

Population cap:

```js
hallCap(level) = floor(30 + 6 * level^1.5)
```

Battlefield scale:

```js
battlefieldScale(level) = max(6, 12 + level)
```

## Building Level Multipliers

General production multiplier by building level:

```js
mult(level) = 1 + (level - 1) * 0.07
```

This multiplier affects base output and most worker output.

## Building Upgrade Curves

Regular buildings:

```js
buildingUpgradeScale(building, level) =
  buildingUpgradeWeight(building) * (1 + 0.9 * level^1.34)
```

`Town Hall`:

```js
townHallUpgradeScale(level) = 1 + 1.22 * level^1.42
```

`upgradeMultiplier(k)` uses:
- `townHallUpgradeScale` for `Town Hall`
- `buildingUpgradeScale` for other buildings

## Building Upgrade Weight Classes

`core`
- `Farm`
- `Lumber Mill`
- `Quarry`

```js
weight = 1.00
```

`support`
- `Workshop`
- `Warehouse`
- `Barracks`
- `Scribe Hall`
- `Gold Mine`

```js
weight = 1.18
```

`advanced`
- `Vineyard`
- `Winery`
- `Ore Pit`
- `Smelter`
- `Tavern`

```js
weight = 1.32
```

## Town Hall Soft Caps For Buildings

Core buildings:

```js
cap = min(50, floor(TownHallLevel * 1.2) + 2 + floor(max(0, TownHallLevel - 10) * 0.6))
```

Support buildings:

```js
cap = min(50, TownHallLevel + 2 + floor(max(0, TownHallLevel - 10) * 0.9))
```

Advanced buildings:

```js
cap = min(50, floor(TownHallLevel * 0.9) + 1 + floor(max(0, TownHallLevel - 10) * 1.1))
```

This is a soft progression gate:
- old saves may already sit above the cap
- new upgrades may not go past it

## Worker Capacity

Worker capacity does not use one shared curve for every building.

`core`

```js
growth = 1 + 0.55 * (level - 1)^0.72
```

`specialist`

```js
growth = 1 + 0.40 * (level - 1)^0.70
```

`processing`

```js
growth = 1 + 0.28 * (level - 1)^0.68
```

Final capacity:

```js
workerCapacityFor(building, level) =
  max(baseSlots, floor(baseSlots * growth))
```

## Warehouse / Storage

Warehouse storage bonus:

```js
warehouseBonus(level) = floor(260 + 135 * level^1.24)
```

Storage multiplier:

```js
storageMult() = improvedWarehousing ? 1.12 : 1
```

Resource cap:

```js
normalCap =
  (baseResourceCap + warehouseBonus + TownHallLevel * 26) * storageMult
```

Exceptions:

`Knowledge`

```js
knowledgeCap =
  baseKnowledgeCap
  + TownHallLevel * 14
  + (ScribeHallBuilt ? (54 + ScribeHallLevel * 18) : 0)
```

`Gold`

```js
goldCap =
  baseGoldCap
  + (GoldMineBuilt ? (40 + GoldMineLevel * 18) : 0)
  + TownHallLevel * 6
```

## Research Cost

Node cost is fixed and visible in advance.
It does not change based on how many nodes you researched earlier in the same branch.

```js
base =
  max(8, round((sum(node.cost values) - node.cost.gold) / 8))

depth = techDepth(node)

knowledgeCost =
  max(base + depth * 10 + max(0, depth - 1) * depth * 3, 10)
```

Gold cost for research:

```js
if node has explicit gold cost and node != goldMining:
  gold = max(node.cost.gold, 14 + depth * 10)

else if branch in [trade, military, civic] and depth >= 2 and node != goldMining:
  gold = 14 + depth * 10
```

## Repeatable Mastery Nodes

```js
masteryCost(level) = 40 + 10 * level       // knowledge only
masteryMaxLevel    = 100
masteryEffect      = effectValue ^ level   // e.g. 1.01^level production
```

## Tech Output Multipliers

Since Patch `0.0.29` these live as machine-readable `effects` arrays directly
on the nodes in `reference/techTree.js`; the values below are the same data in
summary form:

```js
fieldRotation    = 1.02
betterAgriculture= 1.03
seedSelection    = 1.02
irrigation       = 1.02
cropRotation     = 1.02
reinforcedAxes   = 1.03
sawPits          = 1.02
timberSeasoning  = 1.01
stonecutting     = 1.03
quarrySupports   = 1.02
coinMinting      = 1.04
deepShafts       = 1.03
recordKeeping    = 1.06
scriptoriums     = 1.08
```

## Workshop

Village-wide efficiency:

```js
workshopBase = 1 + WorkshopLevel * 0.012
```

This is intentionally smaller than in earlier versions.

## Production

Current base outputs before tech and territory bonuses:

`Food`

```js
farmBase    = 0.42 * mult(FarmLevel)
forager     = 0.37
farmer      = 0.52 * mult(FarmLevel)
```

`Wood`

```js
lumberBase  = 0.22 * mult(LumberMillLevel)
woodGatherer= 0.24
woodcutter  = 0.40 * mult(LumberMillLevel)
```

`Stone`

```js
quarryBase  = 0.18 * mult(QuarryLevel)
stoneCollector = 0.16
quarryMiner = 0.36 * mult(QuarryLevel)
```

`Gold`

```js
goldMineBase = 0.13 * mult(GoldMineLevel)
goldMiner    = 0.18 * mult(GoldMineLevel)
taxLedgers   = 0.016 * TownHallLevel
```

`Knowledge`

```js
villagers    = population * 0.006
townHallLearn= 0.017 * sqrt(TownHallLevel)
scribeBase   = 0.06 * mult(ScribeHallLevel)
scholar      = 0.14 * mult(ScribeHallLevel) * knowledgeBonus
```

`Wine`

```js
vineyardBase = 0.14 * mult(VineyardLevel)
vinekeeper   = 0.16 * mult(VineyardLevel)
vintner      = 0.10 * mult(WineryLevel)
vintagePress = x1.10
```

`Ore`

```js
oreMiner = 0.22 * mult(OrePitLevel)
oreExtraction = x1.08
```

`Metal`

```js
smelter = 0.14 * mult(SmelterLevel)
smithing = x1.08
```

## Upkeep

Population food upkeep is active again, but shortages are non-lethal. Empty
stores pause growth instead of killing villagers or removing workers.

```js
<= 6 pop   => 0.19 Food/s
<= 12 pop  => 0.25 Food/s
> 12 pop   => 0.31 Food/s
```

Explicit role inputs:

```js
guard    = 0.20 Food/s
soldier  = 0.26 Food/s
scholar  = 0.05 Gold/s
smelter  = 0.18 Ore/s
innkeeper= 0.08 Wine/s
```

Building wood upkeep is inactive by default. All current buildings have
`upkeepBase = 0`, so buildings do not passively drain Wood while the player is
away.

```js
woodUpkeep(building, level) =
  building.up * (6 + (level - 1) * 0.75) * masonryModifier   // current up = 0
```

where:

```js
masonryModifier = 1
```

## Taxes & Idle Safety

The money economy starts when the Town Hall reaches Lv3. From then on:

```js
taxes = freeVillagers * 0.01 Gold/s
assignedWorkerGoldCost = 0
```

Assigned workers are an opportunity cost: they produce goods instead of paying
taxes. There is no standard worker wage and no wage-strike spiral.

Offline progress:

```js
offlineGrowth = activeGrowth * 0.25
offlineReserve = max(1, resourceCap * 0.05)
```

While away, negative rates preserve a small reserve instead of draining a
stockpile fully to zero. Random events are still skipped while offline.

The old per-level gold "administration" upkeep, the 0.0.48 wage-strike layer,
and starvation death/role-loss pressure are retired.

## Expedition Modifiers

```js
expeditionSuccessBonus =
  militaryDrills ? 0.12 : 0
  + watchfires ? 0.08 : 0

expeditionDurationMult =
  logistics ? 0.88 : 1

expeditionProvisionMult =
  (pavedYards ? 0.88 : 1) * (logistics ? 0.9 : 1)
```

## Seasons

In the current runtime:

```js
seasonKey() = 'steady'
season() = { f:1, w:1, g:1, u:1 }
```

In practice, seasons no longer provide meaningful gameplay modifiers.
