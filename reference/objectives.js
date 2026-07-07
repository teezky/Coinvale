/*
 * Coinvale reference data - objective chain
 *
 * An ordered chain of goals shown one at a time in the Objective card.
 * Each objective completes automatically once ALL of its goals are met;
 * the reward is added to stores (clamped by caps) and the chain advances.
 *
 * Goal types understood by the engine (js/engine.js: objectiveGoalProgress):
 *   { type: "buildingLevel", building, level }  built level of a building
 *   { type: "jobs",          job, count }       workers assigned to a job
 *   { type: "tech",          tech }             a specific tech researched
 *   { type: "techCount",     count }            number of researched techs
 *   { type: "population",    count }            total population
 *   { type: "territories",   count }            territories conquered
 *   { type: "happiness",     pct }              happiness percentage (needs Wine)
 *
 * Rewards deliberately cover ~10-20% of the NEXT step's cost - a push, not a
 * balance break. New save field: gameState.objectiveIndex (old saves fast-forward
 * through already-satisfied objectives at load, collecting rewards once).
 */

window.CoinvaleReference = window.CoinvaleReference || {};

window.CoinvaleReference.objectives = [
  {
    key: "buildFarm",
    name: "Build a Farm",
    description: "Raise your first food estate beside the hall.",
    goals: [{ type: "buildingLevel", building: "farm", level: 1 }],
    reward: { wood: 20 }
  },
  {
    key: "twoFarmers",
    name: "Put Villagers to Work",
    description: "Assign 2 Farmers to the fields.",
    goals: [{ type: "jobs", job: "farmers", count: 2 }],
    reward: { food: 25 }
  },
  {
    key: "buildLumberMill",
    name: "Build a Lumber Mill",
    description: "Steady timber keeps every project moving.",
    goals: [{ type: "buildingLevel", building: "lumberMill", level: 1 }],
    reward: { stone: 20 }
  },
  {
    key: "townHall2",
    name: "Expand the Town Hall",
    description: "Reach Town Hall Lv2 to grow the village.",
    goals: [{ type: "buildingLevel", building: "townHall", level: 2 }],
    reward: { wood: 30, food: 20 }
  },
  {
    key: "firstTech",
    name: "Begin Research",
    description: "Research your first technology.",
    goals: [{ type: "techCount", count: 1 }],
    reward: { knowledge: 15 }
  },
  {
    key: "scribeAndQuarry",
    name: "Scholars and Stone",
    description: "Build the Scribe Hall and the Quarry.",
    goals: [
      { type: "buildingLevel", building: "scribeHall", level: 1 },
      { type: "buildingLevel", building: "quarry", level: 1 }
    ],
    reward: { wood: 35 }
  },
  {
    key: "population12",
    name: "A Growing Hamlet",
    description: "Grow the population to 12 villagers.",
    goals: [{ type: "population", count: 12 }],
    reward: { food: 40 }
  },
  {
    key: "townHall4",
    name: "A Proper Seat",
    description: "Reach Town Hall Lv4.",
    goals: [{ type: "buildingLevel", building: "townHall", level: 4 }],
    reward: { stone: 50 }
  },
  {
    key: "buildWarehouse",
    name: "Room to Store",
    description: "Build the Warehouse to lift every storage cap.",
    goals: [{ type: "buildingLevel", building: "warehouse", level: 1 }],
    reward: { wood: 60, stone: 40 }
  },
  {
    key: "townHall6Tech5",
    name: "Knowledge Takes Root",
    description: "Reach Town Hall Lv6 with 5 technologies researched.",
    goals: [
      { type: "buildingLevel", building: "townHall", level: 6 },
      { type: "techCount", count: 5 }
    ],
    reward: { food: 80, wood: 50 }
  },
  {
    key: "goldEconomy",
    name: "The First Coin",
    description: "Research Gold Mining and build the Gold Mine.",
    goals: [
      { type: "tech", tech: "goldMining" },
      { type: "buildingLevel", building: "goldMine", level: 1 }
    ],
    reward: { gold: 20 }
  },
  {
    key: "firstTerritory",
    name: "Beyond the Fields",
    description: "Win an expedition and claim your first territory.",
    goals: [{ type: "territories", count: 1 }],
    reward: { food: 100, wood: 60 }
  },
  {
    key: "townHall10",
    name: "A Defended Village",
    description: "Reach Town Hall Lv10.",
    goals: [{ type: "buildingLevel", building: "townHall", level: 10 }],
    reward: { stone: 120, gold: 40 }
  },
  {
    key: "wineEconomy",
    name: "The Vine Arrives",
    description: "Build the Vineyard and the Winery.",
    goals: [
      { type: "buildingLevel", building: "vineyard", level: 1 },
      { type: "buildingLevel", building: "winery", level: 1 }
    ],
    reward: { wine: 15 }
  },
  {
    key: "happy75",
    name: "Content Hearts",
    description: "Raise village happiness to 75%.",
    goals: [{ type: "happiness", pct: 75 }],
    reward: { gold: 60 }
  },
  {
    key: "metalEconomy",
    name: "Ore and Fire",
    description: "Build the Ore Pit and the Smelter.",
    goals: [
      { type: "buildingLevel", building: "oreMine", level: 1 },
      { type: "buildingLevel", building: "smelter", level: 1 }
    ],
    reward: { metal: 12 }
  },
  {
    key: "townHall15",
    name: "A Rising Township",
    description: "Reach Town Hall Lv15.",
    goals: [{ type: "buildingLevel", building: "townHall", level: 15 }],
    reward: { wood: 200, stone: 200, gold: 80 }
  },
  {
    key: "threeTerritories",
    name: "The Wider Vale",
    description: "Hold 3 conquered territories.",
    goals: [{ type: "territories", count: 3 }],
    reward: { knowledge: 150 }
  },
  {
    key: "tech40",
    name: "A Learned Village",
    description: "Research 40 technologies.",
    goals: [{ type: "techCount", count: 40 }],
    reward: { gold: 100, wine: 50 }
  },
  {
    key: "townHall20",
    name: "Coinvale Ascendant",
    description: "Reach Town Hall Lv20 - the chain's crowning goal.",
    goals: [{ type: "buildingLevel", building: "townHall", level: 20 }],
    reward: { food: 400, wood: 400, stone: 400, gold: 150 }
  }
];
