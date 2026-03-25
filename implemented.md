# Coinvale Implemented

Project:
- Single-file browser game in `index.html`
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

Buildings:
- `Town Hall` is always present and is the center of settlement progression
- all buildings are unique:
  - only `1` of each type may exist
  - `Town Hall` max level = `30`
  - other buildings max level = `50`
- worker buildings scale through:
  - building level
  - assigned worker count
  - tech and workshop bonuses
- worker assignment uses sliders
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

UI and UX:
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

Trader:
- trader now offers broader barter instead of only a tiny fixed set of trades
- once the `Knowledge` economy is running, trader can sometimes offer direct `Knowledge` deals

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
- building wood upkeep grows more clearly with level
- building gold upkeep and gold-cost gating were shifted later and softened
- `Warehouse` storage was increased so `Town Hall` upgrades no longer outrun the storage ceiling
