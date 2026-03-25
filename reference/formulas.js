window.CoinvaleReference = window.CoinvaleReference || {};

window.CoinvaleReference.formulas = {
  limits: {
    townHallMaxLevel: 30,
    buildingMaxLevel: 50,
  },
  townHall: {
    populationCap: "floor(30 + 6 * level^1.5)",
    battlefieldScale: "max(6, 12 + level)",
    upgradeScale: "1 + 1.22 * level^1.42",
  },
  production: {
    buildingLevelMultiplier: "1 + (level - 1) * 0.07",
    workshopVillageEfficiencyPerLevel: 0.012,
  },
  buildingUpgrade: {
    scale: "buildingUpgradeWeight(building) * (1 + 0.9 * level^1.34)",
    weights: {
      core: 1.0,
      support: 1.18,
      advanced: 1.32,
    },
  },
  townHallSoftCaps: {
    core: "min(50, floor(th * 1.2) + 2 + floor(max(0, th - 10) * 0.6))",
    support: "min(50, th + 2 + floor(max(0, th - 10) * 0.9))",
    advanced: "min(50, floor(th * 0.9) + 1 + floor(max(0, th - 10) * 1.1))",
  },
  workerCapacity: {
    core: "max(baseSlots, floor(baseSlots * (1 + 0.55 * (level - 1)^0.72)))",
    specialist: "max(baseSlots, floor(baseSlots * (1 + 0.40 * (level - 1)^0.70)))",
    processing: "max(baseSlots, floor(baseSlots * (1 + 0.28 * (level - 1)^0.68)))",
  },
  storage: {
    warehouseBonus: "floor(260 + 135 * level^1.24)",
    townHallStoragePerLevel: 26,
    improvedWarehousingMultiplier: 1.12,
    normalCap: "(baseResourceCap + warehouseBonus + townHallLevel * 26) * storageMult",
    knowledgeCap: "baseKnowledgeCap + townHallLevel * 14 + (scribeHallBuilt ? (54 + scribeHallLevel * 18) : 0)",
    goldCap: "baseGoldCap + (goldMineBuilt ? (26 + goldMineLevel * 9) : 0) + townHallLevel * 2",
  },
  research: {
    fixedCostRule: "base + depth * 10 + max(0, depth - 1) * depth * 3",
    baseRule: "max(8, round((sum(node.cost values) - node.cost.gold) / 8))",
    goldRule: "explicit node gold or branch-depth gold for trade/military/civic nodes",
  },
};
