# Coinvale Handoff

Project:
- Single-file browser game in `index.html`
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
- Trader now offers broader barter and can sometimes trade `Knowledge`.
- `Town Hall` cost, storage scaling, and building soft caps were rebalanced together:
  - the hall cost curve is softer
  - base storage is stronger
  - `Warehouse` scales harder
  - `TH30` can now realistically support `Lv50` buildings

Main files:
- [index.html](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/index.html)
- [instructions.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/instructions.md)
- [implemented.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/implemented.md)
- [roadmap.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/roadmap.md)
- [removed.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/removed.md)
- [buildings.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/buildings.md)
- [workers.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/workers.md)
- [tech-tree.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/tech-tree.md)
- [formulas.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/formulas.md)
- [reference/buildings.js](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/reference/buildings.js)
- [reference/formulas.js](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/reference/formulas.js)
- [reference/workers.js](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/reference/workers.js)
- [reference/techTree.js](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/reference/techTree.js)

Next focus:
- run another browser-side balance pass
- verify the slower economy feels better after the latest storage / hall rebalance
- verify `Knowledge` cap and research cost scaling still meet cleanly
- decide when to replace or layer over the current sprites with separate building art
- evaluate whether and when runtime should start consuming more data from `reference/*.js`

Suggested prompt for a fresh conversation:

```text
The project is the single-file browser game "Coinvale" in index.html.

Please read handoff.md first and continue from there.

Important agreement:
- Discuss changes before implementing them.
- Do not edit code until I clearly say "tee ära".
- If you change anything, keep the related markdown and reference files in sync.
```

Note:
- In this environment there was no live browser runtime available, so changes were checked through logic and file review rather than full in-browser playtesting.
