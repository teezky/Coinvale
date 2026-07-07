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
    runtime: {
      populationCap: {
        base: 30,
        levelScale: 6,
        power: 1.5,
      },
      battlefieldScale: {
        min: 6,
        base: 12,
        perLevel: 1,
      },
      upgradeScale: {
        base: 1,
        factor: 1.22,
        power: 1.42,
      },
    },
  },
  production: {
    buildingLevelMultiplier: "1 + (level - 1) * 0.07",
    workshopVillageEfficiencyPerLevel: 0.012,
    workshopAffects: "food, wood, stone",
    townHallKnowledge: "0.017 * sqrt(townHallLevel)",
    taxLedgersGold: "0.016 * townHallLevel (with Tax Ledgers)",
    runtime: {
      buildingLevelMultiplier: {
        base: 1,
        perLevel: 0.07,
      },
      workshopVillageEfficiencyPerLevel: 0.012,
      workshopAffectedResources: ["food", "wood", "stone"],
      townHallKnowledgePerSqrtLevel: 0.017,
    },
  },
  buildingUpgrade: {
    scale: "buildingUpgradeWeight(building) * (1 + 0.9 * level^1.34)",
    weights: {
      core: 1.0,
      support: 1.18,
      advanced: 1.32,
    },
    runtime: {
      scale: {
        base: 1,
        factor: 0.9,
        power: 1.34,
      },
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
    runtime: {
      core: {
        factor: 0.55,
        power: 0.72,
      },
      specialist: {
        factor: 0.4,
        power: 0.7,
      },
      processing: {
        factor: 0.28,
        power: 0.68,
      },
    },
  },
  storage: {
    warehouseBonus: "floor(260 + 135 * level^1.24)",
    townHallStoragePerLevel: 26,
    improvedWarehousingMultiplier: 1.12,
    normalCap: "(baseResourceCap + warehouseBonus + townHallLevel * 26) * storageMult",
    knowledgeCap: "baseKnowledgeCap + townHallLevel * 14 + (scribeHallBuilt ? (54 + scribeHallLevel * 18) : 0)",
    goldCap: "baseGoldCap + (goldMineBuilt ? (40 + goldMineLevel * 18) : 0) + townHallLevel * 6",
    runtime: {
      warehouseBonus: {
        base: 260,
        levelScale: 135,
        power: 1.24,
      },
      townHallStoragePerLevel: 26,
      improvedWarehousingMultiplier: 1.12,
      knowledgeCap: {
        townHallPerLevel: 14,
        scribeHallBase: 54,
        scribeHallPerLevel: 18,
      },
      goldCap: {
        goldMineBase: 40,
        goldMinePerLevel: 18,
        townHallPerLevel: 6,
      },
    },
  },
  upkeep: {
    populationFoodRate: "0.19 (pop <= 6), 0.25 (pop <= 12), 0.31 (pop > 12)",
    buildingWoodUpkeep: "upkeepBase * (6 + (level - 1) * 0.75) * masonryModifier",
    runtime: {
      populationFoodRateTiers: [
        { maxPopulation: 6, rate: 0.19 },
        { maxPopulation: 12, rate: 0.25 },
        { rate: 0.31 },
      ],
      buildingWoodUpkeep: {
        base: 6,
        perLevel: 0.75,
      },
    },
  },
  research: {
    fixedCostRule: "base + depth * 10 + max(0, depth - 1) * depth * 3",
    baseRule: "max(8, round((sum(node.cost values) - node.cost.gold) / 8))",
    goldRule: "explicit node gold or branch-depth gold for trade/military/civic nodes",
    runtime: {
      knowledgeBaseMin: 8,
      knowledgeDepthStep: 10,
      knowledgeDepthQuadratic: 3,
      knowledgeFloor: 10,
      costDivisor: 8,
      branchGoldBase: 14,
      branchGoldDepthStep: 10,
      branchGoldBranches: ["trade", "military", "civic"],
      branchGoldDepthStart: 2,
      explicitGoldTechExclusions: ["goldMining"],
    },
  },
};

if (typeof module !== "undefined") {
  module.exports = window.CoinvaleReference.formulas;
}
