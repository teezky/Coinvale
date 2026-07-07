/*
 * Coinvale - runtime data layer
 *
 * Builds the runtime definition maps from the structured reference files
 * (reference/*.js) and exposes the shared balance/formula constants.
 *
 * Load order: reference/*.js -> data.js -> engine.js -> sprites.js -> ui.js -> main.js
 * All top-level declarations share the global lexical scope across these
 * classic (non-module) scripts, so later files can use everything here.
 */

// --- Core constants ---------------------------------------------------------

const SAVE_KEY = 'cg_save_v4';
const SAVE_VERSION = 9;
const OFFLINE_CAP_SECONDS = 14400;

const PATCH_NOTES_URL = 'patch-notes.md';
// Fallback when fetch() is unavailable (file://): the generated mirror in
// reference/patchNotes.js. The tiny string below only appears if that file
// failed to load too.
const PATCH_NOTES_FALLBACK_VERSION = '0.0.0';
const PATCH_NOTES_FALLBACK =
  (window.CoinvaleReference && window.CoinvaleReference.patchNotesMarkdown) ||
  'Patch notes are unavailable in this build.';

// --- Reference layer wiring --------------------------------------------------

const REFERENCE = window.CoinvaleReference || {};

// Progression / gating reference (reference/progression.js)
const PROGRESSION_REF = REFERENCE.progression || {};
const PROGRESSION_LIMITS = PROGRESSION_REF.limits || {};
const MAX_TOWN_HALL_LEVEL = PROGRESSION_LIMITS.townHallMaxLevel || 30;
const MAX_BUILDING_LEVEL = PROGRESSION_LIMITS.buildingMaxLevel || 50;
const BUILDING_GROUPS = PROGRESSION_REF.buildingGroups || {};
const TOWN_HALL_BUILD_REQS = PROGRESSION_REF.townHallBuildReqs || {};
const TECH_BUILD_UNLOCKS = PROGRESSION_REF.techBuildUnlocks || {};
const TECH_TOWN_HALL_REQS = PROGRESSION_REF.techTownHallReqs || {};
const TOWN_HALL_REQ_TIERS = Array.isArray(PROGRESSION_REF.townHallReqTiers) ? PROGRESSION_REF.townHallReqTiers : [];
const SOFT_CAPS = PROGRESSION_REF.softCaps || {};
const BUILDING_UPGRADE_WEIGHTS = PROGRESSION_REF.buildingUpgradeWeights || {};
const GOLD_GATES = PROGRESSION_REF.goldGates || {};

// Formula curves (reference/formulas.js)
const FORMULAS_REF = REFERENCE.formulas || {};
const TOWN_HALL_FORMULAS = (FORMULAS_REF.townHall && FORMULAS_REF.townHall.runtime) || {};
const PRODUCTION_FORMULAS = (FORMULAS_REF.production && FORMULAS_REF.production.runtime) || {};
const BUILDING_UPGRADE_FORMULAS = (FORMULAS_REF.buildingUpgrade && FORMULAS_REF.buildingUpgrade.runtime) || {};
const WORKER_CAPACITY_FORMULAS = (FORMULAS_REF.workerCapacity && FORMULAS_REF.workerCapacity.runtime) || {};
const STORAGE_FORMULAS = (FORMULAS_REF.storage && FORMULAS_REF.storage.runtime) || {};
const RESEARCH_FORMULAS = (FORMULAS_REF.research && FORMULAS_REF.research.runtime) || {};

// Objective chain (reference/objectives.js) - ordered; shown one at a time
const OBJECTIVES = Array.isArray(REFERENCE.objectives) ? REFERENCE.objectives : [];

// building key -> tech key that unlocks it (inverted from TECH_BUILD_UNLOCKS)
const BUILDING_TECH_REQS = Object.fromEntries(
  Object.entries(TECH_BUILD_UNLOCKS).flatMap(([tech, buildings]) =>
    (buildings || []).map(building => [building, tech])
  )
);

const buildingKeysForGroup = group =>
  Array.isArray(BUILDING_GROUPS[group]) ? BUILDING_GROUPS[group] : [];

const buildingProgressionGroup = key =>
  Object.keys(BUILDING_GROUPS).find(group => buildingKeysForGroup(group).includes(key)) || 'support';

// --- Resources ---------------------------------------------------------------

const RESOURCES = {
  food:      { name: 'Food',      color: '#89c46d', baseCap: 250 },
  wood:      { name: 'Wood',      color: '#c58d5e', baseCap: 250 },
  stone:     { name: 'Stone',     color: '#b7c0cb', baseCap: 250 },
  gold:      { name: 'Gold',      color: '#e0c56a', baseCap: 90 },
  knowledge: { name: 'Knowledge', color: '#84abd8', baseCap: 120 },
  ore:       { name: 'Ore',       color: '#7f7a75', baseCap: 180 },
  metal:     { name: 'Metal',     color: '#9da7b3', baseCap: 120 },
  wine:      { name: 'Wine',      color: '#a34b63', baseCap: 90 }
};

const RESOURCE_ORDER = ['food', 'wood', 'stone', 'gold', 'ore', 'metal', 'wine', 'knowledge'];

// --- Building definitions (reference/buildings.js) ----------------------------

const BUILDING_REF = REFERENCE.buildings || {};
const WORKER_REF = REFERENCE.workers || {};

function buildingVisibleDef(key, def) {
  const cfg = def.visibility || { type: 'always' };
  if (cfg.type === 'always') return true;
  if (cfg.type === 'resourceCurrentAtLeastOrBuilt') {
    return (gameState.resources[cfg.resource]?.current || 0) >= (cfg.amount || 0) || isBuilt(key);
  }
  if (cfg.type === 'buildingBuiltOrBuilt') return isBuilt(cfg.building) || isBuilt(key);
  if (cfg.type === 'techOrBuilt') return !!gameState.tech[cfg.tech] || isBuilt(key);
  return true;
}

function workerVisibleDef(key, def) {
  const cfg = def.visibility || { type: 'always' };
  if (cfg.type === 'always') return true;
  if (cfg.type === 'building') return isBuilt(cfg.building);
  if (cfg.type === 'buildingAndTech') return isBuilt(cfg.building) && !!gameState.tech[cfg.tech];
  if (cfg.type === 'tech') return !!gameState.tech[cfg.tech];
  return true;
}

const BUILDINGS = Object.fromEntries(Object.entries(BUILDING_REF).map(([key, def]) => [key, {
  name: def.name,
  description: def.description,
  cost: def.cost || {},
  output: def.output || {},
  slots: def.slots || 0,
  upkeepBase: def.upkeepBase || 0,
  isVisible: () => buildingVisibleDef(key, def),
  info: def.info || (Array.isArray(def.notes) ? def.notes.join(', ') : def.description)
}]));

// --- Worker definitions (reference/workers.js) ---------------------------------

const WORKERS = Object.fromEntries(
  Object.entries(WORKER_REF)
    .filter(([, def]) => def.slotType !== 'passive_per_population')
    .map(([key, def]) => [key, {
      name: def.name,
      description: def.description || def.name,
      output: def.output || {},
      upkeep: def.upkeep || {},
      building: def.building || null,
      isVisible: () => workerVisibleDef(key, def),
      slotType: def.slotType || 'free'
    }])
);

// Roles that contribute passively per population member (e.g. Villager knowledge trickle).
const PASSIVE_POPULATION_WORKERS = Object.entries(WORKER_REF)
  .filter(([, def]) => def.slotType === 'passive_per_population')
  .map(([key, def]) => ({ key, name: def.name, output: def.output || {} }));

// --- Tech tree definitions (reference/techTree.js) ------------------------------

const TECH_TREE_REF = REFERENCE.techTree || {};
const TECH_BRANCHES_REF = Array.isArray(REFERENCE.techBranches) ? REFERENCE.techBranches : [];

const TECH_NODES = Object.fromEntries(Object.entries(TECH_TREE_REF).map(([key, def]) => [key, {
  name: def.name,
  description: def.description || def.name,
  cost: def.cost || {},
  requires: def.requires || [],
  branch: def.branch,
  townHallGate: def.townHallLevel || 0,
  effects: Array.isArray(def.effects) ? def.effects : [],
  // Repeatable nodes can be researched many times; their per-level effects
  // stack multiplicatively and their knowledge cost grows with each level.
  repeatable: def.repeatable || null
}]));

const TECH_BRANCHES = TECH_BRANCHES_REF.map(branch => ({
  id: branch.id,
  title: branch.title,
  hint: branch.hint
}));

// Tech node numeric effects now live directly on the nodes in
// reference/techTree.js (see the `effects` arrays) and are resolved by the
// production/upkeep engine in engine.js.

// --- Expedition definitions (reference/expeditions.js) ---------------------------

const EXPEDITION_DEFS = Array.isArray(REFERENCE.expeditions) ? REFERENCE.expeditions : [];

function expeditionRequirementMet(req) {
  if (!req) return true;
  if (req.type === 'tech') return !!gameState.tech[req.key];
  if (req.type === 'building') return isBuilt(req.key);
  if (req.type === 'territory') return !!gameState.territories[req.key];
  return true;
}

function expeditionVisibleDef(def) {
  if (def.requiresBuilding && !isBuilt(def.requiresBuilding)) return false;
  if (def.requiresTech && !gameState.tech[def.requiresTech]) return false;
  if (def.requiresTerritory && !gameState.territories[def.requiresTerritory]) return false;
  if (def.requiresAny && !def.requiresAny.some(expeditionRequirementMet)) return false;
  if (def.requiresAll && !def.requiresAll.every(expeditionRequirementMet)) return false;
  return true;
}

const EXPEDITIONS = Object.fromEntries(EXPEDITION_DEFS.map(def => [def.id, {
  name: def.name,
  description: def.description,
  soldiers: def.soldiers,
  duration: def.duration,
  unique: !!def.unique,
  isVisible: () => expeditionVisibleDef(def),
  reward: def.reward,
  risk: def.risk,
  successBase: def.successBase,
  cost: def.cost || {}
}]));

// --- Trader and random event definitions ---------------------------------------

const TRADER_OFFERS = Array.isArray(REFERENCE.traderOffers) ? REFERENCE.traderOffers : [];
const RANDOM_EVENT_DEFS = Array.isArray(REFERENCE.randomEvents) ? REFERENCE.randomEvents : [];

// --- Shared formula curve constants (with safe fallbacks) -----------------------

const townHallPopulationCurve = TOWN_HALL_FORMULAS.populationCap || { base: 30, levelScale: 6, power: 1.5 };
const townHallBattlefieldCurve = TOWN_HALL_FORMULAS.battlefieldScale || { min: 6, base: 12, perLevel: 1 };
const townHallUpgradeCurve = TOWN_HALL_FORMULAS.upgradeScale || { base: 1, factor: 1.22, power: 1.42 };
const buildingLevelCurve = PRODUCTION_FORMULAS.buildingLevelMultiplier || { base: 1, perLevel: 0.07 };
const workshopVillageEfficiencyPerLevel = PRODUCTION_FORMULAS.workshopVillageEfficiencyPerLevel ?? 0.012;
const workshopAffectedResources = PRODUCTION_FORMULAS.workshopAffectedResources || ['food', 'wood', 'stone'];
const townHallKnowledgePerSqrtLevel = PRODUCTION_FORMULAS.townHallKnowledgePerSqrtLevel ?? 0.017;
const UPKEEP_FORMULAS = (FORMULAS_REF.upkeep && FORMULAS_REF.upkeep.runtime) || {};
const populationFoodRateTiers = UPKEEP_FORMULAS.populationFoodRateTiers || [
  { maxPopulation: 6, rate: 0.19 },
  { maxPopulation: 12, rate: 0.25 },
  { rate: 0.31 }
];
const buildingWoodUpkeepCurve = UPKEEP_FORMULAS.buildingWoodUpkeep || { base: 6, perLevel: 0.75 };
const buildingUpgradeCurve = BUILDING_UPGRADE_FORMULAS.scale || { base: 1, factor: 0.9, power: 1.34 };
const capacityCurve = WORKER_CAPACITY_FORMULAS || {
  core: { factor: 0.55, power: 0.72 },
  specialist: { factor: 0.4, power: 0.7 },
  processing: { factor: 0.28, power: 0.68 }
};
const warehouseFormula = STORAGE_FORMULAS.warehouseBonus || { base: 260, levelScale: 135, power: 1.24 };
const townHallStoragePerLevel = STORAGE_FORMULAS.townHallStoragePerLevel ?? 26;
const improvedWarehousingMultiplier = STORAGE_FORMULAS.improvedWarehousingMultiplier ?? 1.12;
const knowledgeCapFormula = STORAGE_FORMULAS.knowledgeCap || { townHallPerLevel: 14, scribeHallBase: 54, scribeHallPerLevel: 18 };
const goldCapFormula = STORAGE_FORMULAS.goldCap || { goldMineBase: 26, goldMinePerLevel: 9, townHallPerLevel: 2 };
const researchFormula = RESEARCH_FORMULAS || {
  knowledgeBaseMin: 8,
  knowledgeDepthStep: 10,
  knowledgeDepthQuadratic: 3,
  knowledgeFloor: 10,
  costDivisor: 8,
  branchGoldBase: 14,
  branchGoldDepthStep: 10,
  branchGoldBranches: ['trade', 'military', 'civic'],
  branchGoldDepthStart: 2,
  explicitGoldTechExclusions: ['goldMining']
};
