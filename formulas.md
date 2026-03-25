# Formulas

This file collects the main `Coinvale` runtime formulas and balance rules.

Important:
- the exact source of truth is always [index.html](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/index.html)
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
  + (GoldMineBuilt ? (26 + GoldMineLevel * 9) : 0)
  + TownHallLevel * 2
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

## Tech Output Multipliers

Current smaller output-node bonuses:

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

Population food rate:

```js
<= 6 pop   => 0.19
<= 12 pop  => 0.25
> 12 pop   => 0.31
```

Military:

```js
guard    = 0.20 Food/s
soldier  = 0.26 Food/s
scholar  = 0.05 Gold/s
smelter  = 0.18 Ore/s
innkeeper= 0.08 Wine/s
```

Building wood upkeep:

```js
woodUpkeep(building, level) =
  building.up * (6 + (level - 1) * 0.75) * masonryModifier
```

where:

```js
masonryModifier = masonry ? 0.9 : 1
```

## Gold Gating

Gold building upkeep starts later:

```js
Town Hall                     => from Lv10
Workshop/Warehouse/Barracks/
Scribe Hall/Gold Mine/Winery  => from Lv7
Farm/Lumber Mill/Quarry/
Vineyard/Ore Pit              => from Lv10
Smelter/Tavern                => from Lv4
```

Gold upkeep formula:

```js
Town Hall        = 0.015 * level
Smelter/Tavern   = 0.045 * level
Support buildings= 0.025 * level
Core/field chain = 0.012 * level
```

Gold upgrade cost starts at:

```js
Town Hall        => Lv10+
Smelter/Tavern   => Lv4+
Support buildings=> Lv7+
Core buildings   => Lv10+
```

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
