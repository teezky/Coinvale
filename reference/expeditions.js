window.CoinvaleReference = window.CoinvaleReference || {};

window.CoinvaleReference.expeditions = [
  {
    id: "scoutingRun",
    name: "Scouting Run",
    description: "A cautious trip through nearby woodland.",
    soldiers: 1,
    duration: 30,
    unique: false,
    reward: "Food, Wood and Stone scaled from storage",
    risk: "low",
    successBase: 0.70,
    cost: { food: 8 }
  },
  {
    id: "watchtower",
    name: "Abandoned Watchtower",
    description: "Securing it boosts Wood and Stone.",
    soldiers: 2,
    duration: 52,
    unique: true,
    reward: "Storage-scaled supplies and a territory bonus",
    risk: "medium",
    successBase: 0.62,
    requiresBuilding: "barracks",
    cost: { food: 16, stone: 8 }
  },
  {
    id: "ruinedShrine",
    name: "Ruined Shrine",
    description: "Recover old tablets and quiet relics from a forgotten shrine.",
    soldiers: 2,
    duration: 48,
    unique: true,
    reward: "Knowledge, Food and Stone scaled from storage",
    risk: "medium",
    successBase: 0.64,
    requiresAny: [
      { type: "tech", key: "recordKeeping" },
      { type: "building", key: "scribeHall" }
    ],
    cost: { food: 14, wood: 6, stone: 8 }
  },
  {
    id: "riverConvoy",
    name: "River Convoy",
    description: "Escort a supply barge through rough shallows.",
    soldiers: 3,
    duration: 62,
    unique: false,
    reward: "Storage-scaled Wood, Stone and possible Gold",
    risk: "medium",
    successBase: 0.58,
    requiresBuilding: "barracks",
    cost: { food: 22, wood: 10, stone: 10 }
  },
  {
    id: "banditCamp",
    name: "Bandit Camp",
    description: "Higher loot and higher risk.",
    soldiers: 4,
    duration: 78,
    unique: true,
    reward: "Large storage-scaled supplies and spoils",
    risk: "high",
    successBase: 0.48,
    requiresTerritory: "watchtower",
    cost: { food: 26, stone: 14, wood: 10 }
  },
  {
    id: "oldMineClaim",
    name: "Old Mine Claim",
    description: "Push deep into a collapsed shaft and try to secure it.",
    soldiers: 5,
    duration: 95,
    unique: true,
    reward: "Gold route territory bonus and storage-scaled ore spoils",
    risk: "high",
    successBase: 0.43,
    requiresAll: [
      { type: "tech", key: "goldMining" },
      { type: "territory", key: "banditCamp" }
    ],
    cost: { food: 34, wood: 18, stone: 18 }
  }
];

if (typeof module !== "undefined") {
  module.exports = { expeditions: window.CoinvaleReference.expeditions };
}
