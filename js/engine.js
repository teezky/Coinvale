/*
 * Coinvale - game engine
 *
 * Owns the game state, the save/migration pipeline, all economy math,
 * the simulation tick, expeditions, random events, and the trader flow.
 * UI-facing string builders and rendering live in ui.js.
 */

// --- Fresh state -------------------------------------------------------------

function defaultBuildings() {
  return Object.fromEntries(Object.keys(BUILDINGS).map(key => [key,
    key === 'townHall' ? { built: true, level: 1 } : { built: false, level: 0 }
  ]));
}

function defaultJobs() {
  return Object.fromEntries(Object.keys(WORKERS).map(key => [key, key === 'foragers' ? 2 : 0]));
}

function freshState() {
  return {
    saveVersion: SAVE_VERSION,
    day: 1,
    elapsed: 0,
    acc: 0,
    autosave: true,
    lastSavedAt: null,
    lastViewedAt: Date.now(),
    skipOffline: false,
    villageName: 'Coinvale',
    needsVillageName: true,
    resources: {
      food: { current: 60, cap: 250 },
      wood: { current: 48, cap: 250 },
      stone: { current: 20, cap: 250 },
      gold: { current: 0, cap: 90 },
      ore: { current: 0, cap: 180 },
      metal: { current: 0, cap: 120 },
      wine: { current: 0, cap: 90 },
      knowledge: { current: 0, cap: 120 }
    },
    buildings: defaultBuildings(),
    population: 4,
    growth: 0,
    happinessEventOffset: 0,
    starve: 0,
    jobs: defaultJobs(),
    tech: Object.fromEntries(Object.keys(TECH_NODES).map(key => [key, false])),
    techLevels: {},
    territories: { watchtower: false, banditCamp: false, ruinedShrine: false, oldMineClaim: false },
    expedition: null,
    event: null,
    eventQueue: [],
    trader: null,
    traderCd: 180,
    eventCd: 102,
    objectiveIndex: 0,
    log: []
  };
}

// --- Save / load / migration ---------------------------------------------------

function deepMerge(target, source) {
  for (const key in source) {
    if (
      source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) &&
      target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])
    ) {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Converts every historical building shape into the current { built, level }
// form: pre-v7 saves used { c, l } counts, v7-v8 used { levels: [...] } arrays,
// and the removed 'house' building maps onto the Town Hall.
function normalizeBuildings(buildings) {
  if (buildings.house && !buildings.townHall) {
    const old = buildings.house;
    const oldLevels = Array.isArray(old.levels)
      ? old.levels
      : Array.from({ length: Math.max(0, old.c || 0) }, () => Math.max(1, old.l || 1));
    buildings.townHall = { built: true, level: Math.max(1, Math.max(...oldLevels, 1)) };
  }
  delete buildings.house;
  for (const key of Object.keys(BUILDINGS)) {
    const current = buildings[key];
    let built = false;
    let level = 0;
    if (current && typeof current === 'object') {
      if (typeof current.built === 'boolean') {
        built = current.built;
        level = Math.round(Number.isFinite(current.level) ? current.level : 1);
      } else if (Array.isArray(current.levels)) {
        built = current.levels.length > 0;
        level = built ? Math.min(...current.levels) : 0;
      } else {
        built = Math.max(0, current.c || 0) > 0;
        level = built ? Math.max(1, current.l || 1) : 0;
      }
    }
    buildings[key] = { built, level: built ? Math.max(1, level) : 0 };
  }
  if (!buildings.townHall.built) buildings.townHall = { built: true, level: 1 };
  return buildings;
}

function migrateSave(save) {
  save.saveVersion = save.saveVersion || 1;
  if (save.saveVersion < 7) {
    normalizeBuildings(save.buildings || {});
    save.eventQueue = Array.isArray(save.eventQueue) ? save.eventQueue : [];
    save.log = Array.isArray(save.log) ? save.log : [];
    save.tech = { ...Object.fromEntries(Object.keys(TECH_NODES).map(key => [key, false])), ...(save.tech || {}) };
    save.saveVersion = 7;
  }
  if (save.saveVersion < 8) {
    save.jobs = { ...freshState().jobs, ...(save.jobs || {}) };
    save.territories = { ...freshState().territories, ...(save.territories || {}) };
    save.saveVersion = 8;
  }
  if (save.saveVersion < 9) {
    // v9: building state moved from { levels: [...] } arrays to { built, level }
    normalizeBuildings(save.buildings || (save.buildings = {}));
    save.saveVersion = 9;
  }
  save.growth = Number.isFinite(save.growth) ? save.growth : 0;
  save.population = Number.isFinite(save.population) ? save.population : freshState().population;
  if (typeof save.needsVillageName !== 'boolean') save.needsVillageName = false;
  return save;
}

function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const merged = deepMerge(freshState(), migrateSave(JSON.parse(raw)));
    normalizeBuildings(merged.buildings);
    return merged;
  } catch {
    return null;
  }
}

function persistSave() {
  gameState.saveVersion = SAVE_VERSION;
  gameState.lastSavedAt = Date.now();
  gameState.lastViewedAt = Date.now();
  localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
}

// --- Live state ----------------------------------------------------------------

let gameState = loadSave() || freshState();
let buildingState = gameState.buildings;
let renderDirty = true;

// Clamps every building's { built, level } state into legal bounds and
// repairs malformed entries.
function syncBuildingViews() {
  for (const key of Object.keys(BUILDINGS)) {
    const entry = buildingState[key];
    if (!entry || typeof entry !== 'object' || typeof entry.built !== 'boolean') {
      buildingState[key] = key === 'townHall' ? { built: true, level: 1 } : { built: false, level: 0 };
      continue;
    }
    if (entry.built) {
      entry.level = Math.max(1, Math.min(maxLevelFor(key), Math.round(Number.isFinite(entry.level) ? entry.level : 1)));
    } else {
      entry.level = 0;
    }
  }
  if (!buildingState.townHall.built) buildingState.townHall = { built: true, level: 1 };
  return buildingState;
}

function syncJobState() {
  if (!gameState.jobs || typeof gameState.jobs !== 'object') gameState.jobs = {};
  for (const key of Object.keys(WORKERS)) {
    const fallback = defaultJobs()[key] || 0;
    gameState.jobs[key] = Number.isFinite(gameState.jobs[key])
      ? Math.max(0, Math.floor(gameState.jobs[key]))
      : fallback;
  }
  return gameState.jobs;
}

// --- Building helpers ------------------------------------------------------------

const maxLevelFor = key => key === 'townHall' ? MAX_TOWN_HALL_LEVEL : MAX_BUILDING_LEVEL;
const upgradeCapFor = key => key === 'townHall' ? MAX_TOWN_HALL_LEVEL : buildingHallCap(key);

const isBuilt = key => !!buildingState[key]?.built;
// Level of a built building; 1 for unbuilt ones so multiplier math stays neutral.
const buildingLevel = key => isBuilt(key) ? buildingState[key].level : 1;
// Level that counts toward requirements; 0 for unbuilt buildings.
const builtLevel = key => isBuilt(key) ? buildingState[key].level : 0;

const townHallPopulationCap = level => Math.floor(
  (townHallPopulationCurve.base ?? 30) +
  (townHallPopulationCurve.levelScale ?? 6) * Math.pow(Math.max(1, level), townHallPopulationCurve.power ?? 1.5)
);
const battlefieldScale = level => Math.max(
  townHallBattlefieldCurve.min ?? 6,
  (townHallBattlefieldCurve.base ?? 12) + (townHallBattlefieldCurve.perLevel ?? 1) * level
);
const populationCap = () => townHallPopulationCap(buildingLevel('townHall'));

const assignedVillagers = () => Object.values(gameState.jobs).reduce((sum, n) => sum + n, 0);
const freeVillagers = () => Math.max(0, gameState.population - assignedVillagers());

// --- Worker helpers ---------------------------------------------------------------

const workerOrder = Object.keys(WORKERS);
const workerReleaseOrder = [...workerOrder].reverse();

// worker key -> building key that hosts the role
const workerBuildingMap = Object.fromEntries(
  Object.entries(WORKER_REF)
    .filter(([, def]) => !!def.building)
    .map(([key, def]) => [key, def.building])
);

// TODO(pass 2): move these tier lists into reference/progression.js.
const capacityTierFor = building =>
  ['farm', 'lumberMill', 'quarry', 'goldMine'].includes(building) ? 'core'
    : ['scribeHall', 'vineyard', 'oreMine'].includes(building) ? 'specialist'
    : ['winery', 'smelter', 'tavern'].includes(building) ? 'processing'
    : 'specialist';

const workerCapacityFor = (building, level) => {
  const tier = capacityTierFor(building);
  const cfg = capacityCurve[tier] || capacityCurve.specialist;
  const growth = 1 + (cfg.factor ?? 0.4) * Math.pow(Math.max(0, level - 1), cfg.power ?? 0.7);
  return Math.max(BUILDINGS[building].slots, Math.floor(BUILDINGS[building].slots * growth));
};

const workerSlots = workerKey => {
  const building = workerBuildingMap[workerKey];
  if (!building || !isBuilt(building)) return 0;
  return workerCapacityFor(building, buildingLevel(building));
};

// --- Cost and upgrade math ----------------------------------------------------------

const scaleCost = (costObj, multiplier) => Object.fromEntries(
  Object.entries(costObj).map(([key, value]) => [key, Math.max(1, Math.floor(value * multiplier))])
);

const buildingUpgradeClass = key => buildingProgressionGroup(key);
const buildingUpgradeWeight = key => BUILDING_UPGRADE_WEIGHTS[buildingUpgradeClass(key)] || 1.1;

// Town-Hall-driven soft cap for a building's max upgrade level.
const buildingHallCap = key => {
  const th = buildingLevel('townHall');
  const group = buildingUpgradeClass(key);
  const cfg = SOFT_CAPS[group] || SOFT_CAPS.support || { thMultiplier: 1, base: 2, lateStart: 10, lateMultiplier: 0.9 };
  const late = Math.max(0, th - (cfg.lateStart || 10));
  return Math.min(
    MAX_BUILDING_LEVEL,
    Math.floor(th * (cfg.thMultiplier ?? 1)) + (cfg.base ?? 2) + Math.floor(late * (cfg.lateMultiplier ?? 0.9))
  );
};

const buildingUpgradeScale = (key, level) =>
  buildingUpgradeWeight(key) * (
    (buildingUpgradeCurve.base ?? 1) +
    (buildingUpgradeCurve.factor ?? 0.9) * Math.pow(Math.max(1, level), buildingUpgradeCurve.power ?? 1.34)
  );

const townHallUpgradeScale = level =>
  (townHallUpgradeCurve.base ?? 1) +
  (townHallUpgradeCurve.factor ?? 1.22) * Math.pow(Math.max(1, level), townHallUpgradeCurve.power ?? 1.42);

const upgradeMultiplier = key => key === 'townHall'
  ? townHallUpgradeScale(Math.max(1, buildingLevel(key) + 1))
  : buildingUpgradeScale(key, Math.max(1, buildingLevel(key) + 1));

// Production multiplier from a building's level.
const levelMult = level =>
  (buildingLevelCurve.base ?? 1) + Math.max(0, level - 1) * (buildingLevelCurve.perLevel ?? 0.07);

// --- Tech state helpers ----------------------------------------------------------------

const hasTech = key => !!gameState.tech[key];

// Current level of a repeatable tech node (0 = not researched yet).
const techLevel = key => Math.max(0, Math.floor(gameState.techLevels?.[key] || 0));

// --- Tech effect resolution --------------------------------------------------------------
// Tech nodes declare numeric effects in reference/techTree.js. These helpers
// aggregate the effects of all researched nodes so production, upkeep, cost,
// and storage math never hardcodes per-node bonuses.

function activeTechEffects(type) {
  const out = [];
  for (const [techKey, node] of Object.entries(TECH_NODES)) {
    const repeatLevel = node.repeatable ? techLevel(techKey) : 0;
    const active = node.repeatable ? repeatLevel > 0 : gameState.tech[techKey];
    if (!active) continue;
    for (const effect of node.effects) {
      if (effect.type !== type) continue;
      if (effect.requiresTech && !gameState.tech[effect.requiresTech]) continue;
      // Per-level effects of repeatable nodes stack multiplicatively.
      const value = (node.repeatable && effect.perLevel)
        ? Math.pow(effect.value, repeatLevel)
        : effect.value;
      out.push({ ...effect, value, tech: techKey });
    }
  }
  return out;
}

const techEffectProduct = (type, matches) =>
  activeTechEffects(type)
    .filter(matches || (() => true))
    .reduce((product, effect) => product * effect.value, 1);

const productionMultFor = resource => techEffectProduct('production_mult', e => e.resource === resource);
const workerOutputMult = workerKey => techEffectProduct('worker_output_mult', e => e.worker === workerKey);
const workerUpkeepMult = workerKey => techEffectProduct('worker_upkeep_mult', e => e.worker === workerKey);
const populationFoodUpkeepMult = () => techEffectProduct('population_food_upkeep_mult');
const buildingWoodUpkeepMult = () => techEffectProduct('building_wood_upkeep_mult');
const buildCostMultFor = resource => techEffectProduct('build_cost_mult', e => e.resource === resource);
const storageMult = () => techEffectProduct('storage_mult');

const expeditionSuccessBonus = () =>
  (hasTech('militaryDrills') ? 0.12 : 0) + (hasTech('watchfires') ? 0.08 : 0);
const expeditionLossReduction = () => hasTech('fieldMedicine') ? 1 : 0;
const expeditionDurationMult = () => hasTech('logistics') ? 0.88 : 1;
const expeditionProvisionMult = () =>
  (hasTech('pavedYards') ? 0.88 : 1) * (hasTech('logistics') ? 0.9 : 1);

const traderPayoutMult = () => hasTech('marketCharters') ? 1.12 : 1;

const guardPower = () =>
  gameState.jobs.guards * 0.14 +
  (hasTech('fortifiedPatrols') ? 0.08 : 0) +
  (hasTech('watchfires') ? 0.05 : 0);

const traderWindow = () => {
  let min = 180, max = 320;
  if (hasTech('tradeCaravans')) { min = 150; max = 260; }
  if (hasTech('marketCharters')) { min -= 20; max -= 30; }
  return { min, max };
};

// --- Gold gating -------------------------------------------------------------------------

const goldUpkeepGate = key => (GOLD_GATES.upkeepStartsAt || {})[key] || 0;

const goldBuildingUpkeep = (key, level) =>
  ((GOLD_GATES.upkeepPerLevel || {})[key] ?? (GOLD_GATES.upkeepPerLevel || {}).default ?? 0.012) * level;

const upgradeGoldCost = key => {
  const level = Math.min(maxLevelFor(key), buildingLevel(key) + 1);
  const rule = (GOLD_GATES.upgradeCostRules || {})[key];
  if (!rule || level < rule.startLevel) return 0;
  return (rule.base || 0) + (rule.useLevelOffset ? Math.max(0, level - rule.startLevel) : level) * (rule.perLevel || 0);
};

const discountedBaseCost = key => Object.fromEntries(
  Object.entries(BUILDINGS[key].cost).map(([resKey, value]) => [
    resKey,
    Math.ceil(value * buildCostMultFor(resKey))
  ])
);

const buildCost = key => scaleCost(discountedBaseCost(key), 1);

const upgradeCost = key => {
  const out = scaleCost(discountedBaseCost(key), upgradeMultiplier(key));
  const gold = upgradeGoldCost(key);
  if (gold) out.gold = (out.gold || 0) + gold;
  return out;
};

// --- Settlement tier ----------------------------------------------------------------------

const settlementTier = () => {
  const score = Object.keys(buildingState).reduce(
    (sum, key) => sum + (isBuilt(key) ? buildingLevel(key) : 0),
    0
  ) + (gameState.territories.watchtower ? 2 : 0) + (gameState.territories.banditCamp ? 2 : 0);
  return score >= 18 ? 'Township' : score >= 11 ? 'Village' : score >= 6 ? 'Hamlet' : 'Homestead';
};

// --- Formatting helpers ---------------------------------------------------------------------

const fmt = n => Number(n).toFixed(Math.abs(n) >= 10 ? 1 : 2).replace(/\.00$/, '');

const formatDuration = seconds => {
  if (!isFinite(seconds) || seconds < 0) return 'unknown';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 60);
  const parts = [];
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  if (!h && !m) parts.push(`${s}s`);
  return parts.join(' ');
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const bundleLabel = bundle =>
  Object.entries(bundle).map(([key, value]) => `${value} ${RESOURCES[key].name}`).join(', ');

const fillEmptyEta = (key, rate, current, max) => {
  if (rate > 0) return max - current <= 0 ? 'Storage full' : `Full in ${formatDuration(Math.ceil((max - current) / rate))}`;
  if (rate < 0) return current <= 0 ? 'Empty' : `Empty in ${formatDuration(Math.ceil(current / Math.abs(rate)))}`;
  return 'Stable';
};

const missingCost = costObj => Object.entries(costObj)
  .filter(([key, value]) => (gameState.resources[key]?.current || 0) < value)
  .map(([key, value]) => `${Math.max(0, Math.ceil(value - (gameState.resources[key]?.current || 0)))} ${RESOURCES[key].name}`)
  .join(', ');

// --- Resource transactions --------------------------------------------------------------------

const canAfford = costObj =>
  Object.entries(costObj).every(([key, value]) => (gameState.resources[key]?.current || 0) >= value);

const spendResources = costObj => {
  if (!canAfford(costObj)) return false;
  for (const [key, value] of Object.entries(costObj)) gameState.resources[key].current -= value;
  return true;
};

const gainResources = bundle => {
  for (const [key, value] of Object.entries(bundle)) {
    if (gameState.resources[key]) {
      gameState.resources[key].current = Math.max(0, Math.min(resourceCap(key), gameState.resources[key].current + value));
    }
  }
};

// --- Territory bonuses and storage caps ----------------------------------------------------------

const territoryBonuses = () => ({
  food: 1 + (gameState.territories.banditCamp ? 0.06 : 0),
  wood: 1 + (gameState.territories.watchtower ? 0.08 : 0) + (gameState.territories.banditCamp ? 0.08 : 0),
  stone: 1 + (gameState.territories.watchtower ? 0.06 : 0),
  gold: 1 + ((gameState.territories.banditCamp && gameState.tech.goldMining) ? 0.1 : 0) + (gameState.territories.oldMineClaim ? 0.12 : 0),
  knowledge: 1 + (gameState.territories.ruinedShrine ? 0.12 : 0)
});

const warehouseBonus = level => Math.floor(
  (warehouseFormula.base ?? 260) +
  (warehouseFormula.levelScale ?? 135) * Math.pow(Math.max(1, level), warehouseFormula.power ?? 1.24)
);

const resourceCap = key => {
  if (key === 'knowledge') {
    return Math.floor(
      RESOURCES.knowledge.baseCap +
      buildingLevel('townHall') * (knowledgeCapFormula.townHallPerLevel ?? 14) +
      (isBuilt('scribeHall')
        ? (knowledgeCapFormula.scribeHallBase ?? 54) + buildingLevel('scribeHall') * (knowledgeCapFormula.scribeHallPerLevel ?? 18)
        : 0)
    );
  }
  if (key === 'gold') {
    return Math.floor(
      RESOURCES.gold.baseCap +
      (isBuilt('goldMine')
        ? (goldCapFormula.goldMineBase ?? 26) + buildingLevel('goldMine') * (goldCapFormula.goldMinePerLevel ?? 9)
        : 0) +
      buildingLevel('townHall') * (goldCapFormula.townHallPerLevel ?? 2)
    );
  }
  let cap = RESOURCES[key].baseCap;
  const warehouse = isBuilt('warehouse') ? warehouseBonus(buildingLevel('warehouse')) : 0;
  cap += warehouse + Math.round(buildingLevel('townHall') * townHallStoragePerLevel);
  return Math.floor(cap * storageMult());
};

// --- Unlock helpers --------------------------------------------------------------------------------

const happinessActive = () =>
  gameState.tech.viticulture || isBuilt('vineyard') || isBuilt('winery') || isBuilt('tavern');

function resourceUnlocked(key) {
  if (key === 'gold') return gameState.tech.goldMining || isBuilt('goldMine') || gameState.resources.gold.current > 0;
  if (key === 'ore') return gameState.tech.oreExtraction || isBuilt('oreMine') || gameState.resources.ore.current > 0;
  if (key === 'metal') return gameState.tech.smithing || isBuilt('smelter') || gameState.resources.metal.current > 0;
  if (key === 'wine') {
    return gameState.tech.viticulture || isBuilt('vineyard') || isBuilt('winery') ||
      isBuilt('tavern') || gameState.resources.wine.current > 0;
  }
  return true;
}

function resourceUnlockText(key) {
  if (key === 'gold') return 'Unlock with Gold Mining';
  if (key === 'ore') return 'Unlock with Ore Extraction';
  if (key === 'metal') return 'Unlock with Smithing';
  if (key === 'wine') return 'Unlock with Viticulture';
  return 'Already available';
}

// --- Town Hall requirements and tech gating ---------------------------------------------------------

const townHallBuildReq = key => TOWN_HALL_BUILD_REQS[key] || 0;

const townHallTechReq = key => Math.max(
  TECH_TOWN_HALL_REQS[key] || TECH_NODES[key]?.townHallGate || 0,
  ...((TECH_BUILD_UNLOCKS[key] || []).map(townHallBuildReq)),
  0
);

const buildingTechReq = key => BUILDING_TECH_REQS[key] || null;

function resolveTownHallReqLevel(rule, next) {
  if (rule.type === 'next') return next;
  if (rule.type === 'nextMinus') return next - (rule.amount || 0);
  return next;
}

function clampTownHallReqLevel(level, rule) {
  let out = level;
  if (Number.isFinite(rule.min)) out = Math.max(rule.min, out);
  if (Number.isFinite(rule.max)) out = Math.min(rule.max, out);
  return out;
}

function townHallReq(next) {
  if (next <= 1) return [];
  const tier = TOWN_HALL_REQ_TIERS.find(entry => entry.maxLevel == null || next <= entry.maxLevel);
  if (!tier || !Array.isArray(tier.requirements)) return [];
  return tier.requirements.map(rule => ({
    k: rule.key,
    l: clampTownHallReqLevel(resolveTownHallReqLevel(rule, next), rule)
  }));
}

const townHallReqText = next => townHallReq(next).map(req => `${BUILDINGS[req.k].name} Lv${req.l}`);
const townHallReqMet = next => townHallReq(next).every(req => builtLevel(req.k) >= req.l);

// --- Tech tree math -----------------------------------------------------------------------------------

const techLeadsTo = key => Object.entries(TECH_NODES)
  .filter(([, def]) => def.requires.includes(key))
  .map(([, def]) => def.name);

function techDepth(key, memo = {}) {
  if (memo[key] != null) return memo[key];
  const def = TECH_NODES[key];
  memo[key] = !def.requires.length ? 0 : 1 + Math.max(...def.requires.map(req => techDepth(req, memo)));
  return memo[key];
}

function researchCost(key) {
  const def = TECH_NODES[key];
  // Repeatable nodes use a simple growing knowledge cost instead of the
  // depth-based formula: base + perLevel * currentLevel.
  if (def.repeatable) {
    const cfg = def.repeatable.cost || {};
    return { knowledge: (cfg.base ?? 40) + (cfg.perLevel ?? 10) * techLevel(key) };
  }
  const base = Math.max(
    researchFormula.knowledgeBaseMin ?? 8,
    Math.round((Object.values(def.cost).reduce((a, b) => a + b, 0) - (def.cost.gold || 0)) / (researchFormula.costDivisor ?? 8))
  );
  const depth = techDepth(key);
  const knowledge = Math.max(
    base + depth * (researchFormula.knowledgeDepthStep ?? 10) + Math.max(0, depth - 1) * depth * (researchFormula.knowledgeDepthQuadratic ?? 3),
    researchFormula.knowledgeFloor ?? 10
  );
  const cost = { knowledge };
  const goldExclusions = researchFormula.explicitGoldTechExclusions || [];
  if (def.cost.gold && !goldExclusions.includes(key)) {
    cost.gold = Math.max(def.cost.gold, (researchFormula.branchGoldBase ?? 14) + depth * (researchFormula.branchGoldDepthStep ?? 10));
  } else if (
    (researchFormula.branchGoldBranches || []).includes(def.branch) &&
    depth >= (researchFormula.branchGoldDepthStart ?? 2) &&
    !goldExclusions.includes(key)
  ) {
    cost.gold = (researchFormula.branchGoldBase ?? 14) + depth * (researchFormula.branchGoldDepthStep ?? 10);
  }
  return cost;
}

// --- Production and upkeep engine ------------------------------------------------------------------------
// Single source of truth: every income and upkeep line is a "contribution"
// ({ resource, label, amount }) derived from the reference layer. The rate
// totals and the tooltip breakdowns are both computed from the same lists,
// so balance numbers can never drift between the math and the UI again.

// Per-worker output at a given host-building level (before resource-level multipliers).
const workerOutputAt = (workerKey, resource, buildingLevel) => {
  const def = WORKERS[workerKey];
  const rate = def.output[resource] || 0;
  const buildingMultiplier = def.building ? levelMult(buildingLevel) : 1;
  return rate * buildingMultiplier * workerOutputMult(workerKey);
};

// Per-building base output at a given level (before resource-level multipliers).
const buildingOutputAt = (buildingKey, resource, level) =>
  (BUILDINGS[buildingKey].output[resource] || 0) * levelMult(level);

// Wood upkeep of one building at a given level.
const buildingWoodUpkeepAt = (buildingKey, level) =>
  BUILDINGS[buildingKey].upkeepBase *
  ((buildingWoodUpkeepCurve.base ?? 6) + (level - 1) * (buildingWoodUpkeepCurve.perLevel ?? 0.75)) *
  buildingWoodUpkeepMult();

// All positive income lines, before workshop/tech/territory resource multipliers.
function productionContributions() {
  const contributions = [];
  const add = (resource, label, amount) => {
    if (amount > 0) contributions.push({ resource, label, amount });
  };

  // Building base production
  for (const [key, def] of Object.entries(BUILDINGS)) {
    if (!isBuilt(key)) continue;
    for (const resource of Object.keys(def.output)) {
      add(resource, `${def.name} base`, buildingOutputAt(key, resource, buildingLevel(key)));
    }
  }

  // Assigned workers
  for (const key of workerOrder) {
    const def = WORKERS[key];
    const count = gameState.jobs[key];
    if (!count) continue;
    const hostLevel = def.building && isBuilt(def.building) ? buildingLevel(def.building) : 1;
    for (const resource of Object.keys(def.output)) {
      add(resource, `${def.name}s`, count * workerOutputAt(key, resource, hostLevel));
    }
  }

  // Passive per-population roles (Villager knowledge trickle)
  for (const passive of PASSIVE_POPULATION_WORKERS) {
    for (const [resource, rate] of Object.entries(passive.output)) {
      add(resource, `${passive.name}s`, gameState.population * rate);
    }
  }

  // Town Hall learning
  add('knowledge', 'Town Hall learning',
    townHallKnowledgePerSqrtLevel * Math.sqrt(Math.max(1, buildingLevel('townHall'))));

  // Tech effects that pay per Town Hall level (Tax Ledgers)
  for (const effect of activeTechEffects('production_per_town_hall_level')) {
    add(effect.resource, TECH_NODES[effect.tech].name, effect.value * Math.max(1, buildingLevel('townHall')));
  }

  return contributions;
}

// Resource-level multiplier applied on top of the raw contributions:
// workshop efficiency (food/wood/stone), researched production multipliers,
// and territory bonuses.
function resourceProductionMult(resource) {
  const workshopBase = 1 + (isBuilt('workshop') ? buildingLevel('workshop') * workshopVillageEfficiencyPerLevel : 0);
  const workshop = workshopAffectedResources.includes(resource) ? workshopBase : 1;
  const territory = territoryBonuses()[resource] ?? 1;
  return workshop * productionMultFor(resource) * territory;
}

function productionRates() {
  const totals = Object.fromEntries(RESOURCE_ORDER.map(key => [key, 0]));
  for (const contribution of productionContributions()) {
    totals[contribution.resource] += contribution.amount;
  }
  for (const resource of RESOURCE_ORDER) {
    totals[resource] *= resourceProductionMult(resource);
  }
  return totals;
}

const populationFoodRate = () => {
  for (const tier of populationFoodRateTiers) {
    if (tier.maxPopulation == null || gameState.population <= tier.maxPopulation) return tier.rate;
  }
  return populationFoodRateTiers[populationFoodRateTiers.length - 1].rate;
};

// All upkeep lines (amounts are positive; they are subtracted from income).
function upkeepContributions() {
  const contributions = [];
  const add = (resource, label, amount) => {
    if (amount > 0) contributions.push({ resource, label, amount });
  };

  // Population food
  add('food', 'Population', gameState.population * populationFoodRate() * populationFoodUpkeepMult());

  // Worker upkeep
  for (const key of workerOrder) {
    const def = WORKERS[key];
    const count = gameState.jobs[key];
    if (!count) continue;
    for (const [resource, rate] of Object.entries(def.upkeep)) {
      add(resource, `${def.name}s`, count * rate * workerUpkeepMult(key));
    }
  }

  // Building upkeep (wood always, gold once the level gate opens)
  for (const [key, def] of Object.entries(BUILDINGS)) {
    if (!isBuilt(key)) continue;
    add('wood', def.name, buildingWoodUpkeepAt(key, buildingLevel(key)));
    if (goldUpkeepGate(key) && buildingLevel(key) >= goldUpkeepGate(key)) {
      add('gold', def.name, goldBuildingUpkeep(key, buildingLevel(key)));
    }
  }

  return contributions;
}

function upkeepRates() {
  const totals = Object.fromEntries(RESOURCE_ORDER.map(key => [key, 0]));
  for (const contribution of upkeepContributions()) {
    totals[contribution.resource] += contribution.amount;
  }
  return totals;
}

function netRates() {
  const gains = productionRates();
  const costs = upkeepRates();
  return Object.fromEntries(RESOURCE_ORDER.map(key => [key, gains[key] - costs[key]]));
}

// --- Chronicle log ---------------------------------------------------------------------------------------

function log(type, text) {
  gameState.log.unshift({ day: gameState.day, type, text });
  gameState.log = gameState.log.slice(0, 50);
}

// --- State clamping ----------------------------------------------------------------------------------------

function clampAll() {
  syncBuildingViews();
  syncJobState();
  gameState.objectiveIndex = Math.max(0, Math.min(OBJECTIVES.length, Math.floor(gameState.objectiveIndex || 0)));
  for (const key of Object.keys(gameState.resources)) {
    gameState.resources[key].cap = resourceCap(key);
    const current = Number.isFinite(gameState.resources[key].current) ? gameState.resources[key].current : 0;
    gameState.resources[key].current = Math.max(0, Math.min(gameState.resources[key].cap, current));
  }
  if (!gameState.tech.goldMining) gameState.resources.gold.current = 0;
  if (!gameState.tech.oreExtraction) gameState.resources.ore.current = 0;
  if (!gameState.tech.smithing) gameState.resources.metal.current = 0;
  if (!gameState.tech.viticulture) gameState.resources.wine.current = 0;
  gameState.population = Math.max(1, Math.min(populationCap(), Number.isFinite(gameState.population) ? gameState.population : freshState().population));
  gameState.growth = Number.isFinite(gameState.growth) ? Math.max(0, Math.min(100, gameState.growth)) : 0;
  gameState.happinessEventOffset = Number.isFinite(gameState.happinessEventOffset)
    ? Math.max(-30, Math.min(30, Math.round(gameState.happinessEventOffset)))
    : 0;
  if (!gameState.techLevels || typeof gameState.techLevels !== 'object') gameState.techLevels = {};
  for (const [key, node] of Object.entries(TECH_NODES)) {
    if (!node.repeatable) continue;
    const raw = gameState.techLevels[key];
    gameState.techLevels[key] = Number.isFinite(raw)
      ? Math.max(0, Math.min(node.repeatable.maxLevel ?? 100, Math.floor(raw)))
      : 0;
  }
  for (const key of Object.keys(workerBuildingMap)) {
    gameState.jobs[key] = Math.min(gameState.jobs[key], workerSlots(key));
  }
  let overflow = assignedVillagers() - gameState.population;
  if (overflow > 0) {
    for (const key of workerReleaseOrder) {
      while (overflow > 0 && gameState.jobs[key] > 0) {
        gameState.jobs[key]--;
        overflow--;
      }
    }
  }
}

// --- Happiness, growth, starvation ---------------------------------------------------------------------------

function happiness() {
  if (!happinessActive()) return 100;
  let mood = 60;
  const foodRatio = resourceCap('food') ? gameState.resources.food.current / resourceCap('food') : 0;
  if (foodRatio > 0.65) mood += 16;
  else if (foodRatio < 0.2) mood -= 18;
  if (gameState.resources.food.current <= 0) mood -= 28;
  const wineSupport = Math.min(
    20,
    Math.floor((gameState.resources.wine.current / Math.max(1, resourceCap('wine'))) * 20) +
      (isBuilt('tavern') ? 6 : 0) +
      gameState.jobs.innkeepers * 2
  );
  mood += wineSupport;
  if (hasTech('villageCustoms')) mood += 6;
  if (hasTech('festivals')) mood += 8;
  mood += gameState.happinessEventOffset || 0;
  return Math.max(10, Math.min(140, mood));
}

function growPopulation() {
  if (gameState.population >= populationCap()) { gameState.growth = 0; return; }
  const hall = buildingLevel('townHall');
  const mood = happinessActive() ? happiness() / 100 : 1;
  let gain = (0.82 + 0.08 * Math.pow(Math.max(1, hall), 1.28)) * mood * (hasTech('herbalRemedies') ? 1.06 : 1);
  if (gameState.population <= 6) gain *= 1.15;
  else if (gameState.population <= 10) gain *= 1.04;
  if (gameState.resources.food.current <= 0) gain *= 0.18;
  if (happinessActive() && isBuilt('tavern') && gameState.resources.wine.current > 0) gain *= 1.06;
  gameState.growth = Math.min(100, gameState.growth + gain);
  if (gameState.growth >= 100) {
    gameState.population++;
    gameState.growth = Math.max(0, gameState.growth - 100);
    log('good', 'A new Villager has joined your settlement.');
  }
}

function starvationTick() {
  if (gameState.resources.food.current > 0) { gameState.starve = 0; return; }
  gameState.starve++;
  if (gameState.starve % 40) return;
  for (const key of workerOrder) {
    if (gameState.jobs[key] > 0) {
      gameState.jobs[key]--;
      log('bad', `${WORKERS[key].name} left their role due to starvation pressure.`);
      return;
    }
  }
  if (gameState.population > 1) {
    gameState.population--;
    log('bad', 'Starvation has claimed one member of your settlement.');
  }
}

// --- Expeditions -----------------------------------------------------------------------------------------------

const expeditionChance = key => {
  const baseChance = Number.isFinite(EXPEDITIONS[key]?.successBase) ? EXPEDITIONS[key].successBase : 0.7;
  return Math.max(0.05, Math.min(
    0.98,
    baseChance + expeditionSuccessBonus() +
      (gameState.territories.banditCamp ? 0.04 : 0) +
      Math.max(0, gameState.jobs.soldiers - EXPEDITIONS[key].soldiers) * 0.03
  ));
};

const expeditionCost = key => scaleCost(EXPEDITIONS[key]?.cost || {}, expeditionProvisionMult());

function expeditionReport(title, text) {
  eventBox(title, text, [{ label: 'Continue', sub: 'Return to the village', action: () => {} }]);
}

function raidLosses() {
  const food = Math.min(gameState.resources.food.current, Math.ceil(gameState.resources.food.current * (0.08 + Math.random() * 0.08)));
  const wood = Math.min(gameState.resources.wood.current, Math.ceil(gameState.resources.wood.current * (0.06 + Math.random() * 0.08)));
  const stone = Math.min(gameState.resources.stone.current, Math.ceil(gameState.resources.stone.current * (0.04 + Math.random() * 0.06)));
  const out = {};
  if (food > 0) out.food = food;
  if (wood > 0) out.wood = wood;
  if (stone > 0) out.stone = stone;
  if (gameState.tech.goldMining && gameState.resources.gold.current > 0 && Math.random() < 0.45) {
    out.gold = Math.min(gameState.resources.gold.current, Math.ceil(gameState.resources.gold.current * (0.06 + Math.random() * 0.06)));
  }
  return out;
}

function loseBundle(bundle) {
  for (const [key, value] of Object.entries(bundle)) {
    if (gameState.resources[key]) {
      gameState.resources[key].current = Math.max(0, gameState.resources[key].current - value);
    }
  }
}

function resolveCounterRaid(sourceKey) {
  const raidChance = Math.max(0.08, Math.min(0.72, 0.4 - guardPower()));
  if (Math.random() > raidChance) {
    if (gameState.jobs.guards > 0) log('good', `Village Guards held the line after the failed ${EXPEDITIONS[sourceKey].name}.`);
    return 'Counter-raid chance was kept in check.';
  }
  const defense = Math.min(0.88, 0.24 + guardPower() + buildingLevel('townHall') * 0.03);
  const blocked = Math.random() < defense;
  if (blocked) {
    const guardLoss = Math.random() < 0.38 && gameState.jobs.guards > 0 ? 1 : 0;
    if (guardLoss) gameState.jobs.guards = Math.max(0, gameState.jobs.guards - 1);
    log('good', guardLoss
      ? 'The Guards repelled a counter-raid, but one watchman was lost.'
      : 'The Guards repelled a counter-raid before it reached the stores.');
    return guardLoss ? 'Counter-raid repelled, but 1 Guard was lost.' : 'Counter-raid repelled by the village watch.';
  }
  const losses = raidLosses();
  loseBundle(losses);
  log('bad', `A counter-raid struck after the failed ${EXPEDITIONS[sourceKey].name}. Stores lost: ${bundleLabel(losses)}.`);
  return `Counter-raid broke through.\nLost: ${bundleLabel(losses)}.`;
}

// TODO(pass 2): move these per-expedition reward tables into reference/expeditions.js.
function resolveExpedition(key) {
  if (Math.random() <= expeditionChance(key)) {
    if (key === 'scoutingRun') {
      const reward = {
        food: scaledCap('food', 0.06, 14, 90),
        wood: scaledCap('wood', 0.04, 8, 70),
        stone: scaledCap('stone', 0.025, 0, 45)
      };
      gainResources(reward);
      log('good', `Scouting Run succeeded. Your people brought back ${bundleLabel(reward)}.`);
      expeditionReport('Expedition Report', `Scouting Run returned safely.\n\nRewards gained: ${bundleLabel(reward)}.`);
    }
    if (key === 'watchtower') {
      const reward = {
        food: scaledCap('food', 0.04, 12, 90),
        wood: scaledCap('wood', 0.04, 12, 70),
        stone: scaledCap('stone', 0.04, 10, 60)
      };
      gameState.territories.watchtower = true;
      gainResources(reward);
      log('good', 'The Abandoned Watchtower is now yours.');
      expeditionReport('Expedition Report', `The Abandoned Watchtower has been secured.\n\nRewards gained: ${bundleLabel(reward)}.\nNew territory bonus: +8% Wood, +6% Stone.`);
    }
    if (key === 'ruinedShrine') {
      const reward = {
        knowledge: scaledCap('knowledge', 0.14, 8, 28),
        food: scaledCap('food', 0.03, 8, 52),
        stone: scaledCap('stone', 0.03, 6, 45)
      };
      if (Math.random() < 0.35 && gameState.tech.goldMining) reward.gold = scaledCap('gold', 0.1, 4, 14);
      gainResources(reward);
      gameState.territories.ruinedShrine = true;
      log('good', `The Ruined Shrine yielded old records and offerings: ${bundleLabel(reward)}.`);
      expeditionReport('Expedition Report', `The Ruined Shrine was searched successfully.\n\nRewards gained: ${bundleLabel(reward)}.\nNew territory bonus: +12% Knowledge.`);
    }
    if (key === 'riverConvoy') {
      const reward = {
        wood: scaledCap('wood', 0.09, 18, 110),
        stone: scaledCap('stone', 0.08, 16, 95),
        food: scaledCap('food', 0.06, 14, 90)
      };
      if (gameState.tech.goldMining || Math.random() < 0.4) reward.gold = scaledCap('gold', 0.1, 5, 18);
      gainResources(reward);
      log('good', `The River Convoy made it through with cargo worth ${bundleLabel(reward)}.`);
      expeditionReport('Expedition Report', `The River Convoy arrived with fresh supplies.\n\nRewards gained: ${bundleLabel(reward)}.`);
    }
    if (key === 'banditCamp') {
      const reward = {
        food: scaledCap('food', 0.1, 18, 130),
        wood: scaledCap('wood', 0.1, 18, 130),
        stone: scaledCap('stone', 0.09, 16, 110)
      };
      if (gameState.tech.goldMining) reward.gold = scaledCap('gold', 0.14, 10, 28);
      gainResources(reward);
      gameState.territories.banditCamp = true;
      log('good', `Bandit Camp conquered. Spoils secured: ${bundleLabel(reward)}.`);
      expeditionReport('Expedition Report', `The Bandit Camp fell after a hard fight.\n\nRewards gained: ${bundleLabel(reward)}.\nNew territory bonus: +6% Food, +8% Wood${gameState.tech.goldMining ? ', +10% Gold' : ''}.`);
    }
    if (key === 'oldMineClaim') {
      const reward = {
        gold: scaledCap('gold', 0.16, 12, 34),
        stone: scaledCap('stone', 0.1, 18, 130),
        wood: scaledCap('wood', 0.08, 14, 100)
      };
      if (gameState.tech.oreExtraction) reward.ore = scaledCap('ore', 0.14, 12, 70);
      gainResources(reward);
      gameState.territories.oldMineClaim = true;
      log('good', `The old mine has been reclaimed. First spoils: ${bundleLabel(reward)}.`);
      expeditionReport('Expedition Report', `The old mine shaft is now under your banner.\n\nRewards gained: ${bundleLabel(reward)}.\nNew territory bonus: +12% Gold.`);
    }
    return;
  }
  const rawLoss = key === 'banditCamp' || key === 'oldMineClaim' ? randomInt(2, 4) : randomInt(1, 2);
  const loss = Math.max(0, rawLoss - expeditionLossReduction());
  gameState.jobs.soldiers = Math.max(0, gameState.jobs.soldiers - loss);
  const raidNote = resolveCounterRaid(key);
  log('bad', `${EXPEDITIONS[key].name} failed. ${loss} soldier${loss === 1 ? '' : 's'} were lost.`);
  expeditionReport('Expedition Report', `${EXPEDITIONS[key].name} failed.\n\nLosses: ${loss} soldier${loss === 1 ? '' : 's'}.\nSoldiers remaining: ${gameState.jobs.soldiers}.\n${raidNote}`);
}

// --- Event plumbing ----------------------------------------------------------------------------------------------

function nextQueuedEvent() {
  if (!gameState.event && gameState.eventQueue.length) {
    gameState.event = gameState.eventQueue.shift();
    renderDirty = true;
  }
}

function eventBox(title, text, choices) {
  if (gameState.event) return;
  gameState.event = { id: `${Date.now()}-${Math.random()}`, title, text, choices };
  renderModal();
}

function clearDeferredEvents() {
  gameState.event = null;
  gameState.eventQueue = [];
  gameState.trader = null;
}

// --- Scaling helpers for events / trader ----------------------------------------------------------------------------

const clampInt = (n, min, max) => Math.max(min, Math.min(max, Math.floor(n)));
const scaledCap = (key, ratio, min, max) => clampInt(resourceCap(key) * ratio, min, max);
const scaledCurrent = (key, ratio, min, max) => clampInt(gameState.resources[key].current * ratio, min, max);

const weightedPick = pool => {
  const total = pool.reduce((sum, entry) => sum + Math.max(0, entry.weight || 0), 0);
  if (total <= 0) return null;
  let roll = Math.random() * total;
  for (const entry of pool) {
    roll -= Math.max(0, entry.weight || 0);
    if (roll <= 0) return entry;
  }
  return pool[pool.length - 1] || null;
};

const changeHappiness = delta => {
  gameState.happinessEventOffset = Math.max(-30, Math.min(30, (gameState.happinessEventOffset || 0) + delta));
  return delta;
};

// --- Trader ----------------------------------------------------------------------------------------------------------

const traderFairnessLabel = fairness =>
  ({ costly: 'Costly', fair: 'Fair', favorable: 'Favorable', exceptional: 'Exceptional' }[fairness] || 'Trade');

const traderTypeLabel = type =>
  ({ caravan: 'Caravan Merchant', royalClerk: 'Royal Clerk', blackMarket: 'Black Market Broker' }[type] || 'Traveling Trader');

const traderKnowledgeTradeUnlocked = () => hasTech('recordKeeping') || isBuilt('scribeHall');

function traderOfferAllowed(def) {
  if (def.requiresUnlocked && def.requiresUnlocked.some(key => !resourceUnlocked(key))) return false;
  if (def.requiresKnowledgeTrade && !traderKnowledgeTradeUnlocked()) return false;
  if (def.requiresBuilding && !isBuilt(def.requiresBuilding)) return false;
  if (def.minTownHall && buildingLevel('townHall') < def.minTownHall) return false;
  if (def.requiresHappiness && !happinessActive()) return false;
  return true;
}

function traderBundle(items, multiplier = 1) {
  const out = {};
  for (const item of (items || [])) {
    const amount = item.mode === 'current'
      ? scaledCurrent(item.resource, item.ratio, item.min || 1, item.max || 9999)
      : scaledCap(item.resource, item.ratio, item.min || 1, item.max || 9999);
    out[item.resource] = Math.max(1, Math.floor(amount * multiplier));
  }
  return out;
}

function openTraderOffer() {
  const payout = traderPayoutMult();
  const pool = TRADER_OFFERS.filter(traderOfferAllowed).map(def => ({
    ...def,
    give: traderBundle(def.give, payout),
    take: traderBundle(def.take)
  }));
  if (!pool.length) return;
  const offer = weightedPick(pool);
  if (!offer) return;
  gameState.trader = offer;
  const title = `${traderTypeLabel(offer.merchantType)} • ${traderFairnessLabel(offer.fairness)}`;
  const details = `${offer.text}\n${offer.logContext ? `\n${offer.logContext}` : ''}\n\nYou Pay: ${bundleLabel(offer.take)}\nYou Get: ${bundleLabel(offer.give)}`;
  eventBox(title, details, [
    {
      label: `Trade ${bundleLabel(offer.take)} -> ${bundleLabel(offer.give)}`,
      sub: canAfford(offer.take) ? `${traderFairnessLabel(offer.fairness)} offer` : `Missing: ${missingCost(offer.take)}`,
      action: () => {
        if (!canAfford(offer.take)) {
          log('bad', `You cannot afford this trader offer. Missing: ${missingCost(offer.take)}.`);
          gameState.trader = null;
          return;
        }
        if (!spendResources(offer.take)) {
          log('bad', 'The trade failed because your stores changed before the deal closed.');
          gameState.trader = null;
          return;
        }
        gainResources(offer.give);
        const context = offer.logContext ? ` ${offer.logContext}` : '';
        gameState.trader = null;
        log('good', `Trade completed: paid ${bundleLabel(offer.take)} and received ${bundleLabel(offer.give)}.${context}`);
      }
    },
    {
      label: 'Decline',
      sub: 'No change',
      action: () => {
        gameState.trader = null;
        log('info', `${traderTypeLabel(offer.merchantType)} departs without a deal.`);
      }
    }
  ]);
}

// --- Random events ------------------------------------------------------------------------------------------------------

function randomEventAllowed(def) {
  if (def.requiresUnlocked && def.requiresUnlocked.some(key => !resourceUnlocked(key))) return false;
  if (def.requiresCurrentPositive && (!gameState.resources[def.requiresCurrentPositive] || gameState.resources[def.requiresCurrentPositive].current <= 0)) return false;
  if (def.requiresHappiness && !happinessActive()) return false;
  if (def.requiresPopulationRoom && gameState.population >= populationCap()) return false;
  if (def.requiresGrowthPositive && gameState.growth <= 0) return false;
  return true;
}

function randomEventAmount(def) {
  if (def.effectType === 'growth') return clampInt(gameState.growth * (def.ratio || 0), def.min || 1, def.max || 9999);
  if (def.effectType === 'happiness') return Math.abs(def.delta || 0);
  if (def.amountMode === 'current') return scaledCurrent(def.resource, def.ratio, def.min || 1, def.max || 9999);
  return scaledCap(def.resource, def.ratio, def.min || 1, def.max || 9999);
}

function applyRandomEventDef(def) {
  const amount = randomEventAmount(def);
  if (def.effectType === 'gain_resource') {
    gainResources({ [def.resource]: amount });
    return def.text.replace('{amount}', amount);
  }
  if (def.effectType === 'lose_resource') {
    gameState.resources[def.resource].current = Math.max(0, gameState.resources[def.resource].current - amount);
    return def.text.replace('{amount}', amount);
  }
  if (def.effectType === 'happiness') {
    changeHappiness(def.delta || 0);
    return def.text.replace('{amount}', amount);
  }
  if (def.effectType === 'population') {
    gameState.population = Math.min(populationCap(), gameState.population + (def.delta || 0));
    return def.text;
  }
  if (def.effectType === 'growth') {
    gameState.growth = Math.max(0, gameState.growth - amount);
    return def.text.replace('{amount}', amount);
  }
  return def.text || 'A strange day passed through the village.';
}

const AUTO_EVENTS = RANDOM_EVENT_DEFS.map(def => ({
  ...def,
  condition: () => randomEventAllowed(def),
  apply: () => applyRandomEventDef(def)
}));

function triggerRandomEvent() {
  const pool = AUTO_EVENTS.filter(event => {
    try { return event.condition(); } catch { return false; }
  });
  const event = weightedPick(pool);
  if (!event) return;
  const text = event.apply();
  clampAll();
  log(event.type || 'info', text);
  renderDirty = true;
}

// --- Objective chain -------------------------------------------------------------------------------------------------------

const researchedTechCount = () => Object.values(gameState.tech).filter(Boolean).length;

// Progress of one declarative goal as {cur, target} (see reference/objectives.js).
function objectiveGoalProgress(goal) {
  switch (goal.type) {
    case 'buildingLevel': return { cur: builtLevel(goal.building), target: goal.level };
    case 'jobs': return { cur: gameState.jobs[goal.job] || 0, target: goal.count };
    case 'tech': return { cur: gameState.tech[goal.tech] ? 1 : 0, target: 1 };
    case 'techCount': return { cur: researchedTechCount(), target: goal.count };
    case 'population': return { cur: gameState.population, target: goal.count };
    case 'territories': return { cur: Object.values(gameState.territories).filter(Boolean).length, target: goal.count };
    case 'happiness': return { cur: happinessActive() ? Math.round(happiness()) : 0, target: goal.pct };
    default: return { cur: 0, target: 1 };
  }
}

const objectiveGoalsMet = objective =>
  objective.goals.every(goal => {
    const { cur, target } = objectiveGoalProgress(goal);
    return cur >= target;
  });

// Completes every satisfied objective in order (old saves fast-forward at load,
// collecting each reward once). Rewards are clamped by storage caps.
function checkObjectives() {
  while (gameState.objectiveIndex < OBJECTIVES.length) {
    const objective = OBJECTIVES[gameState.objectiveIndex];
    if (!objectiveGoalsMet(objective)) break;
    const parts = [];
    for (const [key, value] of Object.entries(objective.reward || {})) {
      if (!gameState.resources[key]) continue;
      gameState.resources[key].current = Math.min(resourceCap(key), gameState.resources[key].current + value);
      parts.push(`+${value} ${RESOURCES[key].name}`);
    }
    log('good', `Objective complete: ${objective.name}${parts.length ? ` (${parts.join(', ')})` : ''}`);
    gameState.objectiveIndex++;
    renderDirty = true;
  }
}

// --- Simulation tick -----------------------------------------------------------------------------------------------------

function tick(opts = {}) {
  const sim = !!opts.sim;
  renderDirty = true;
  gameState.elapsed++;
  if (gameState.elapsed % 60 === 0) gameState.day++;

  const rates = netRates();
  for (const key of Object.keys(gameState.resources)) {
    if (key === 'gold' && !gameState.tech.goldMining && gameState.resources.gold.current <= 0 && !isBuilt('goldMine')) continue;
    const delta = Number.isFinite(rates[key]) ? rates[key] : 0;
    const current = Number.isFinite(gameState.resources[key].current) ? gameState.resources[key].current : 0;
    gameState.resources[key].current = Math.max(0, Math.min(resourceCap(key), current + delta));
  }

  growPopulation();
  starvationTick();

  if (gameState.expedition) {
    gameState.expedition.r--;
    if (gameState.expedition.r <= 0) {
      const key = gameState.expedition.k;
      gameState.expedition = null;
      resolveExpedition(key);
    }
  }

  gameState.eventCd--;
  if (gameState.eventCd <= 0) {
    gameState.eventCd = randomInt(108, 180);
    if (!sim) triggerRandomEvent();
  }

  gameState.traderCd--;
  if (gameState.traderCd <= 0) {
    const window = traderWindow();
    gameState.traderCd = randomInt(window.min, window.max);
    if (!sim) openTraderOffer();
  }

  checkObjectives();
  clampAll();
}

// --- Offline progress -------------------------------------------------------------------------------------------------------

function applyOfflineProgress() {
  if (gameState.skipOffline) {
    gameState.skipOffline = false;
    gameState.lastViewedAt = Date.now();
    return;
  }
  const now = Date.now();
  const seconds = Math.min(Math.max(0, Math.floor((now - (gameState.lastViewedAt || now)) / 1000)), OFFLINE_CAP_SECONDS);
  if (seconds < 5) { gameState.lastViewedAt = now; return; }
  clearDeferredEvents();
  for (let i = 0; i < seconds; i++) tick({ sim: true });
  log('info', `Offline progress applied for ${formatDuration(seconds)}. Random events were skipped while away.`);
  gameState.lastViewedAt = now;
}

// --- Initial sync ---------------------------------------------------------------------------------------------------------

syncBuildingViews();
syncJobState();
