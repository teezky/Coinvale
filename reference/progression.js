window.CoinvaleReference = window.CoinvaleReference || {};

window.CoinvaleReference.progression = {
  limits: {
    townHallMaxLevel: 30,
    buildingMaxLevel: 50,
  },
  buildingGroups: {
    core: ["farm", "lumberMill", "quarry"],
    support: ["workshop", "warehouse", "barracks", "scribeHall", "goldMine"],
    advanced: ["vineyard", "winery", "oreMine", "smelter", "tavern"],
  },
  townHallBuildReqs: {
    scribeHall: 4,
    warehouse: 2,
    barracks: 4,
    goldMine: 5,
    vineyard: 10,
    winery: 12,
    oreMine: 10,
    smelter: 14,
    tavern: 15,
  },
  techBuildUnlocks: {
    craftsmanship: ["workshop"],
    storehousePlanning: ["warehouse"],
    goldMining: ["scribeHall", "goldMine"],
    viticulture: ["vineyard"],
    vintagePress: ["winery"],
    tavernCulture: ["tavern"],
    oreExtraction: ["oreMine"],
    smithing: ["smelter"],
  },
  techTownHallReqs: {
    goldMining: 4,
    viticulture: 10,
    oreExtraction: 10,
    smithing: 12,
  },
  townHallReqTiers: [
    {
      maxLevel: 3,
      requirements: [
        { key: "farm", type: "next" },
        { key: "lumberMill", type: "nextMinus", amount: 1, min: 1 },
        { key: "quarry", type: "nextMinus", amount: 1, min: 1 },
      ],
    },
    {
      maxLevel: 6,
      requirements: [
        { key: "farm", type: "nextMinus", amount: 1 },
        { key: "lumberMill", type: "nextMinus", amount: 2 },
        { key: "quarry", type: "nextMinus", amount: 2 },
        { key: "workshop", type: "nextMinus", amount: 4, min: 1 },
      ],
    },
    {
      maxLevel: 10,
      requirements: [
        { key: "farm", type: "nextMinus", amount: 2 },
        { key: "lumberMill", type: "nextMinus", amount: 3 },
        { key: "quarry", type: "nextMinus", amount: 3 },
        { key: "warehouse", type: "nextMinus", amount: 5, min: 1 },
        { key: "barracks", type: "nextMinus", amount: 6, min: 1 },
        { key: "scribeHall", type: "nextMinus", amount: 6, min: 1 },
      ],
    },
    {
      maxLevel: 15,
      requirements: [
        { key: "farm", type: "nextMinus", amount: 4 },
        { key: "lumberMill", type: "nextMinus", amount: 5 },
        { key: "quarry", type: "nextMinus", amount: 5 },
        { key: "warehouse", type: "nextMinus", amount: 8, min: 3 },
        { key: "goldMine", type: "nextMinus", amount: 9, min: 1 },
        { key: "vineyard", type: "nextMinus", amount: 10, min: 1 },
        { key: "oreMine", type: "nextMinus", amount: 10, min: 1 },
      ],
    },
    {
      maxLevel: null,
      requirements: [
        { key: "farm", type: "nextMinus", amount: 3, max: 18 },
        { key: "lumberMill", type: "nextMinus", amount: 4, max: 17 },
        { key: "quarry", type: "nextMinus", amount: 4, max: 17 },
        { key: "warehouse", type: "nextMinus", amount: 6, max: 14 },
        { key: "barracks", type: "nextMinus", amount: 8, max: 12 },
        { key: "goldMine", type: "nextMinus", amount: 10, max: 10 },
        { key: "vineyard", type: "nextMinus", amount: 10, max: 10 },
        { key: "oreMine", type: "nextMinus", amount: 10, max: 10 },
        { key: "smelter", type: "nextMinus", amount: 12, min: 1 },
        { key: "tavern", type: "nextMinus", amount: 12, min: 1 },
      ],
    },
  ],
  softCaps: {
    core: { thMultiplier: 1.2, base: 2, lateStart: 10, lateMultiplier: 0.6 },
    support: { thMultiplier: 1, base: 2, lateStart: 10, lateMultiplier: 0.9 },
    advanced: { thMultiplier: 0.9, base: 1, lateStart: 10, lateMultiplier: 1.1 },
  },
  buildingUpgradeWeights: {
    core: 1,
    support: 1.18,
    advanced: 1.32,
  },
  // 0.0.48 gold rework: the old per-level gold "administration" upkeep is retired.
  // Gold now flows from taxes paid by free villagers. Assigned workers are an
  // opportunity cost because they produce goods instead of paying taxes.
  goldGates: {
    upkeepStartsAt: {},
    upkeepPerLevel: {},
  },
};

if (typeof module !== "undefined") {
  module.exports = { progression: window.CoinvaleReference.progression };
}
