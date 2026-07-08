/*
 * Coinvale - UI layer
 *
 * DOM references, tooltips, sliders, modals, patch-notes UI,
 * card/string builders, the tech tree layout, and the main render pass.
 */

// --- DOM references ------------------------------------------------------------

const byId = id => document.getElementById(id);

const els = {
  resources: byId('resources'),
  pop: byId('pop'),
  popStat: byId('popStat'),
  popSub: byId('popSub'),
  territoriesTop: byId('territoriesTop'),
  territoriesStat: byId('territoriesStat'),
  happinessTop: byId('happinessTop'),
  growBarTop: byId('growBarTop'),
  saveStatus: byId('saveStatus'),
  toolsBtn: byId('toolsBtn'),
  toolsMenu: byId('toolsMenu'),
  patchBadge: byId('patchBadge'),
  patchNotesBtn: byId('patchNotesBtn'),
  patchModal: byId('patchModal'),
  patchModalTitle: byId('patchModalTitle'),
  patchMeta: byId('patchMeta'),
  patchBody: byId('patchBody'),
  patchCloseBtn: byId('patchCloseBtn'),
  objective: byId('objective'),
  villageName: byId('villageName'),
  renameVillageBtn: byId('renameVillageBtn'),
  sceneTitle: byId('sceneTitle'),
  sceneDesc: byId('sceneDesc'),
  scene: byId('scene'),
  log: byId('log'),
  buildGrid: byId('buildGrid'),
  workGrid: byId('workGrid'),
  expGrid: byId('expGrid'),
  techGrid: byId('techGrid'),
  modal: byId('modal'),
  modalTitle: byId('modalTitle'),
  modalText: byId('modalText'),
  modalChoices: byId('modalChoices'),
  nameModal: byId('nameModal'),
  nameModalTitle: byId('nameModalTitle'),
  nameModalText: byId('nameModalText'),
  nameInput: byId('nameInput'),
  nameModalHelp: byId('nameModalHelp'),
  nameCancelBtn: byId('nameCancelBtn'),
  nameConfirmBtn: byId('nameConfirmBtn'),
  tooltip: byId('tooltip')
};

// building key -> worker key shown on its card
const BUILDING_JOB_MAP = {
  farm: 'farmers',
  lumberMill: 'woodcutters',
  quarry: 'quarryMiners',
  goldMine: 'goldMiners',
  scribeHall: 'scholars',
  vineyard: 'vinekeepers',
  oreMine: 'oreMiners',
  smelter: 'smelters',
  winery: 'vintners',
  tavern: 'innkeepers'
};

// --- Small markup helpers --------------------------------------------------------

const tipAttr = text => ` data-tip="${String(text).replace(/"/g, '&quot;')}" `;

const costMarkup = costObj => `<div class='costRowInline'>${
  Object.entries(costObj).map(([key, value]) =>
    `<span class='costItem ${(gameState.resources[key]?.current || 0) < value ? 'missing' : ''}'>${value} ${RESOURCES[key].name}</span>`
  ).join('')
}</div>`;

// --- Tooltips ----------------------------------------------------------------------

const tooltipState = { x: 0, y: 0, text: '', visible: false };
let activeJobSlider = null;

function showTooltip(text, x, y) {
  els.tooltip.innerHTML = text;
  els.tooltip.style.left = `${x + 14}px`;
  els.tooltip.style.top = `${y + 14}px`;
  els.tooltip.classList.add('show');
  tooltipState.x = x;
  tooltipState.y = y;
  tooltipState.text = text;
  tooltipState.visible = true;
}

function hideTooltip() {
  els.tooltip.classList.remove('show');
  tooltipState.visible = false;
}

// Re-anchors the tooltip after a re-render so it does not flicker away every tick.
function refreshTooltip() {
  if (activeJobSlider) { hideTooltip(); return; }
  const target = document.elementFromPoint(tooltipState.x, tooltipState.y)?.closest?.('[data-tip]');
  if (target && target.dataset.tip) {
    showTooltip(target.dataset.tip, tooltipState.x, tooltipState.y);
    return;
  }
  hideTooltip();
}

// Tooltip hover handling is a single delegated document-level listener,
// installed once in setupUiDelegation(); re-renders no longer rebind anything.

// --- Patch notes UI --------------------------------------------------------------------

const patchState = {
  version: PATCH_NOTES_FALLBACK_VERSION,
  stamp: 'fallback',
  source: 'Built-in',
  content: PATCH_NOTES_FALLBACK,
  total: 1,
  recentCount: 1,
  recentContent: PATCH_NOTES_FALLBACK
};

function parsePatchNotes(md) {
  const text = String(md || '').replace(/\r\n/g, '\n').trim();
  const matches = [...text.matchAll(/^##\s+Patch\s+([^\s]+)\s*-\s*(.+)$/gm)];
  if (!matches.length) {
    return {
      version: PATCH_NOTES_FALLBACK_VERSION,
      stamp: 'fallback',
      content: text || PATCH_NOTES_FALLBACK,
      total: 1,
      recentCount: 1,
      recentContent: text || PATCH_NOTES_FALLBACK
    };
  }
  const last = matches[matches.length - 1];
  const recentCount = Math.min(10, matches.length);
  const recentStart = matches[matches.length - recentCount].index || 0;
  const recentContent = text.slice(recentStart).trim();
  return { version: last[1], stamp: last[2].trim(), content: text || PATCH_NOTES_FALLBACK, total: matches.length, recentCount, recentContent };
}

Object.assign(patchState, parsePatchNotes(PATCH_NOTES_FALLBACK));

function syncPatchUi() {
  els.patchBadge.textContent = `Patch ${patchState.version}`;
  els.patchModalTitle.textContent = `Patch Notes - ${patchState.version}`;
  els.patchMeta.textContent = `Current patch ${patchState.version} | Showing last ${patchState.recentCount}${patchState.total > patchState.recentCount ? ` of ${patchState.total}` : ''} | Source: ${patchState.source}`;
  els.patchBody.textContent = patchState.recentContent || patchState.content;
}

async function loadPatchNotes() {
  syncPatchUi();
  try {
    const res = await fetch(PATCH_NOTES_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const parsed = parsePatchNotes(await res.text());
    patchState.version = parsed.version;
    patchState.stamp = parsed.stamp;
    patchState.source = 'patch-notes.md';
    patchState.content = parsed.content;
    patchState.total = parsed.total;
    patchState.recentCount = parsed.recentCount;
    patchState.recentContent = parsed.recentContent;
  } catch {
    patchState.source = 'reference/patchNotes.js mirror';
  }
  syncPatchUi();
}

function openPatchModal() { syncPatchUi(); els.patchModal.classList.add('active'); renderModal(); }
function closePatchModal() { els.patchModal.classList.remove('active'); renderModal(); }

// --- Card text builders ------------------------------------------------------------------
// All production numbers shown on cards come from the same engine helpers
// (buildingOutputAt / workerOutputAt) that drive the real economy math.

// The building's headline production rows at a given level:
// its own base output if it has one, otherwise its worker role's output.
function buildingProductionRows(key, level) {
  const def = BUILDINGS[key];
  const rows = [];
  for (const resource of Object.keys(def.output)) {
    rows.push(`Base output ${fmt(buildingOutputAt(key, resource, level))} ${RESOURCES[resource].name}/s`);
  }
  const workerKey = BUILDING_JOB_MAP[key];
  if (!rows.length && workerKey) {
    const worker = WORKERS[workerKey];
    for (const resource of Object.keys(worker.output)) {
      rows.push(`${worker.name} output ${fmt(workerOutputAt(workerKey, resource, level))} ${RESOURCES[resource].name}/s`);
    }
  }
  return rows;
}

function baseEffectRows(key, level = 1) {
  if (key === 'townHall') {
    return [`Population cap ${townHallPopulationCap(level)}`, `Battlefield scale ${battlefieldScale(level)}`];
  }
  const rows = buildingProductionRows(key, level);
  if (key === 'workshop') {
    rows.push(`Village efficiency +${Math.round(workshopVillageEfficiencyPerLevel * level * 100)}%`, `Upgrade support improves with level`);
  }
  if (key === 'warehouse') {
    rows.push(`Global storage bonus ${warehouseBonus(level)}`, `Supports larger stockpiles across the village`);
  }
  if (key === 'barracks') rows.push(`Village defense and training support Lv${level}`);
  if (key === 'tavern') rows.push(`Happiness support Lv${level}`);
  const workerKey = BUILDING_JOB_MAP[key];
  if (workerKey) rows.push(`${WORKERS[workerKey].name} capacity ${workerCapacityFor(key, level)}`);
  return rows;
}

// --- Income / upkeep breakdown rows for tooltips ---------------------------------------------
// Rendered directly from the engine's contribution lists, so the tooltip rows
// always agree with the real economy math.

function incomeBreakdownRows(contributions, key) {
  return contributions
    .filter(c => c.resource === key)
    .map(c => `${c.label}: +${fmt(c.amount)} ${RESOURCES[key].name}/s`);
}

function upkeepBreakdownRows(contributions, key) {
  return contributions
    .filter(c => c.resource === key)
    .map(c => `${c.label}: -${fmt(c.amount)} ${RESOURCES[key].name}/s`);
}

function workerUpkeepLabel(key) {
  const upkeep = WORKER_REF[key]?.upkeep || {};
  const entries = Object.entries(upkeep);
  if (!entries.length) return ``;
  return entries.map(([resKey, value]) => `${fmt(value)} ${RESOURCES[resKey]?.name || resKey}/s each`).join(', ');
}

function buildingUpkeepRowsAt(key, level) {
  const rows = [];
  const wood = buildingWoodUpkeepAt(key, level);
  if (wood > 0) rows.push(`${fmt(wood)} Wood/s`);
  if (goldUpkeepGate(key) && level >= goldUpkeepGate(key)) {
    rows.push(`${fmt(goldBuildingUpkeep(key, level))} Gold/s`);
  }
  return rows;
}

function buildingUpkeepRows(key) {
  return isBuilt(key) ? buildingUpkeepRowsAt(key, buildingLevel(key)) : [];
}

// Merges a current-level effect line with its next-level counterpart into one
// line where each changed number gets an inline "-> new" marker, e.g.
// "Base output 0.42 -> 0.45 Food/s". Identical lines pass through unchanged.
function mergeEffectDelta(cur, next, cls = 'deltaNext') {
  if (!next || cur === next) return cur;
  const numRe = /-?\d+(?:\.\d+)?%?/g;
  const nextNums = next.match(numRe) || [];
  if ((cur.match(numRe) || []).length !== nextNums.length) return cur;
  let i = 0;
  return cur.replace(numRe, token => {
    const upgraded = nextNums[i++];
    return upgraded === token ? token : `${token} <span class='${cls}'>&#8594; ${upgraded}</span>`;
  });
}

// --- Resource row ------------------------------------------------------------------------------
// The tile structure is built once (and rebuilt only when a resource's
// locked/unlocked state flips); per-tick values update existing nodes in place.

let resourceRowSignature = '';

function resourceTileMarkup(key, unlocked) {
  // Slim chip row (mockup-plots style): icon, amount/cap, net. ETA and the full
  // income/upkeep breakdown live in the tooltip. Locked: dimmed name + padlock.
  const classes = `resourceTile${key === 'knowledge' ? ' knowledgeResource' : ''}${unlocked ? '' : ' lockedResource'}`;
  if (!unlocked) {
    return `<div class='${classes}' data-resource='${key}' data-tip=''><span class='resIcon'>${resourceIcon(key)}</span><span class='small resName'>${RESOURCES[key].name}</span><span class='lockGlyph' aria-hidden='true'>&#128274;</span></div>`;
  }
  return `<div class='${classes}' data-resource='${key}' data-tip=''><span class='resIcon'>${resourceIcon(key)}</span><b class='resourceAmount'></b><span class='small resourceNet'></span></div>`;
}

function renderResources() {
  const gains = productionRates();
  const costs = upkeepRates();
  const incomeContributions = productionContributions();
  const upkeepContributionList = upkeepContributions();

  const signature = RESOURCE_ORDER.map(key => resourceUnlocked(key) ? '1' : '0').join('');
  if (signature !== resourceRowSignature) {
    resourceRowSignature = signature;
    els.resources.innerHTML = RESOURCE_ORDER.map(key => resourceTileMarkup(key, resourceUnlocked(key))).join('');
  }

  for (const key of RESOURCE_ORDER) {
    const tile = els.resources.querySelector(`[data-resource='${key}']`);
    if (!tile) continue;
    const unlocked = resourceUnlocked(key);
    const cap = resourceCap(key);
    const netValue = unlocked ? gains[key] - costs[key] : 0;
    const statusText = unlocked
      ? fillEmptyEta(key, netValue, gameState.resources[key].current, cap)
      : resourceUnlockText(key);
    const incomeRows = unlocked ? incomeBreakdownRows(incomeContributions, key) : [];
    const upkeepRows = unlocked ? upkeepBreakdownRows(upkeepContributionList, key) : [];
    const info = unlocked
      ? `${RESOURCES[key].name}: ${statusText}${incomeRows.length ? `\n\nIncome Breakdown:\n${incomeRows.join('\n')}` : ''}${upkeepRows.length ? `\n\nUpkeep Breakdown:\n${upkeepRows.join('\n')}` : ''}`
      : `${RESOURCES[key].name}: locked.\n${resourceUnlockText(key)}\n\nThis resource stays at zero until its economy is unlocked.`;
    tile.dataset.tip = info;
    if (!unlocked) continue; // locked chip is static; the tooltip carries the unlock hint
    tile.querySelector('.resourceAmount').textContent = `${Math.floor(gameState.resources[key].current)}/${Math.floor(cap)}`;
    tile.classList.toggle('capped', cap > 0 && gameState.resources[key].current / cap >= 0.95);
    const netEl = tile.querySelector('.resourceNet');
    netEl.textContent = `${netValue >= 0 ? '+' : ''}${fmt(netValue)}/s`;
    netEl.classList.toggle('good', netValue >= 0);
    netEl.classList.toggle('bad', netValue < 0);
  }
}

// --- Scene builders -------------------------------------------------------------------------------

function sceneBuilding(key, size = 'scene', label, level = 1) {
  const name = label || (BUILDINGS[key] && BUILDINGS[key].name) || 'Cottage';
  return `<div class='sceneBuilding'>${level > 1 ? `<div class='sceneLevel'>Lv${level}</div>` : ''}${sprite(key, size)}<div class='sceneLabel'>${name}</div></div>`;
}

function cottageBuilding() {
  return sceneBuilding('cottage', 'scene', 'Cottage');
}

// --- Tech tree rendering ----------------------------------------------------------------------------

function techIcon(key, def) {
  const icons = {
    fieldRotation: '🌾', betterAgriculture: '🌿', seedSelection: '🌱', irrigation: '💧',
    villageRations: '🍲', communalKitchens: '🥖', herbalRemedies: '🪴', cropRotation: '🌻',
    reinforcedAxes: '🪓', craftsmanship: '⚒', sawPits: '🪚', timberSeasoning: '🪵',
    stonecutting: '⛏', quarrySupports: '🧱', masonry: '🏛', storehousePlanning: '🏚',
    measuredMasonry: '📏', improvedWarehousing: '📦', pavedYards: '🪨',
    recordKeeping: '📜', scriptoriums: '📚', planningOffice: '🕮',
    viticulture: '🍇', villageCustoms: '🏵', festivals: '🎭', vintagePress: '🍷', tavernCulture: '🍺',
    militaryDrills: '🛡', watchfires: '🔥', fieldMedicine: '🩹', logistics: '🐎', fortifiedPatrols: '⚔', fortifiedStoreyards: '🏰',
    goldMining: '🪙', coinMinting: '🪙', tradeCaravans: '🐪', taxLedgers: '📜', deepShafts: '🕳', oreExtraction: '⛰', smithing: '⚒', marketCharters: '📜',
    harvestMastery: '🌽', timberMastery: '🌲', masonsMastery: '🗿', cellarMastery: '🍾', drillMastery: '🏹', coinMastery: '💰'
  };
  return icons[key] || ({ growth: '🌿', craft: '⚒', stone: '🧱', civic: '📜', military: '🛡', trade: '🪙' }[def.branch] || '✦');
}

function techNode(key, def, placement = { col: 1, row: 1 }) {
  const cost = researchCost(key);
  const reqOk = def.requires.every(req => gameState.tech[req]);
  const missingReq = def.requires.filter(req => !gameState.tech[req]);
  const thReq = townHallTechReq(key);
  const thOk = buildingLevel('townHall') >= thReq;
  const missingRes = missingCost(cost);
  const glyph = techIcon(key, def);

  // Repeatable (Mastery) nodes: level badge, growing cost, never "done" until maxed.
  if (def.repeatable) {
    const level = techLevel(key);
    const maxLevel = def.repeatable.maxLevel ?? 100;
    const maxed = level >= maxLevel;
    const ready = reqOk && thOk && !maxed && !missingRes;
    const status = maxed ? 'Mastered'
      : ready ? 'Available'
      : !reqOk ? 'Locked'
      : !thOk ? `TH ${thReq} needed`
      : 'Need resources';
    const bonusParts = def.effects.filter(e => e.perLevel).map(e => {
      const factor = Math.pow(e.value, level);
      return e.value >= 1
        ? `+${((factor - 1) * 100).toFixed(0)}%`
        : `-${((1 - factor) * 100).toFixed(1)}%`;
    });
    const tipText = `${def.name}\n${def.description}\n\nStatus: ${status}\n${level > 0 && bonusParts.length ? `Current bonus: ${bonusParts.join(', ')}\n` : ''}${maxed ? '' : `Next level cost: ${bundleLabel(cost)}\n`}${def.requires.length ? `Requires: ${def.requires.map(req => TECH_NODES[req].name).join(', ')}\n` : ''}${missingReq.length ? `Missing research: ${missingReq.map(req => TECH_NODES[req].name).join(', ')}\n` : ''}${reqOk && thOk && !maxed && missingRes ? `Missing resources: ${missingRes}` : ''}`.trim();
    return `<div class='techNode' style='grid-column:${placement.col};grid-row:${placement.row};'${tipAttr(tipText)}><button class='techOrb ${maxed ? 'done' : ready ? 'ready' : 'locked'}' data-tech='${key}' ${(maxed || !reqOk || !thOk || !canAfford(cost)) ? 'disabled' : ''} aria-label='${def.name}'><span class='techGlyph' aria-hidden='true'>${glyph}</span></button><div class='techLabel'>${def.name}</div><div class='techStatus'>Lv ${level}/${maxLevel}</div></div>`;
  }

  const ready = reqOk && thOk && !missingRes && !gameState.tech[key];
  const status = gameState.tech[key] ? 'Researched'
    : ready ? 'Available'
    : !reqOk ? 'Locked'
    : !thOk ? `TH ${thReq} needed`
    : 'Need resources';
  const unlocks = techLeadsTo(key);
  const tipText = `${def.name}\n${def.description}\n\nStatus: ${status}\nCost: ${bundleLabel(cost)}\n${def.requires.length ? `Requires: ${def.requires.map(req => TECH_NODES[req].name).join(', ')}\n` : ''}${thReq ? `Town Hall: Lv${thReq}\n` : ''}${unlocks.length ? `Leads to: ${unlocks.join(', ')}\n` : ''}${missingReq.length ? `Missing research: ${missingReq.map(req => TECH_NODES[req].name).join(', ')}\n` : ''}${reqOk && !thOk ? `Missing Town Hall: Lv${thReq}\n` : ''}${reqOk && thOk && missingRes ? `Missing resources: ${missingRes}` : ''}`.trim();
  return `<div class='techNode' style='grid-column:${placement.col};grid-row:${placement.row};'${tipAttr(tipText)}><button class='techOrb ${gameState.tech[key] ? 'done' : ready ? 'ready' : 'locked'}' data-tech='${key}' ${(gameState.tech[key] || !reqOk || !thOk || !canAfford(cost)) ? 'disabled' : ''} aria-label='${def.name}'><span class='techGlyph' aria-hidden='true'>${glyph}</span></button><div class='techLabel'>${def.name}</div></div>`;
}

// Computes a lane/depth grid layout for one tech branch, plus the SVG link paths
// between prerequisite nodes.
function buildBranchLayout(branchId) {
  const visible = Object.entries(TECH_NODES).filter(([, def]) => def.branch === branchId);
  if (!visible.length) return { nodes: [], links: [], lanes: 1, rows: 1 };
  const visibleSet = new Set(visible.map(([key]) => key));
  const localMemo = {};
  const byDepth = {};
  const laneByKey = {};
  const occupiedByDepth = {};
  const nodes = [];
  let rootLane = 0, maxDepth = 0, maxLane = 0;

  // Depth inside this branch only (cross-branch prerequisites do not add depth).
  const branchDepth = key => {
    if (localMemo[key] != null) return localMemo[key];
    const def = TECH_NODES[key];
    const parents = def.requires.filter(req => visibleSet.has(req));
    localMemo[key] = parents.length ? 1 + Math.max(...parents.map(branchDepth)) : 0;
    return localMemo[key];
  };

  visible.forEach(([key, def]) => {
    const depth = branchDepth(key);
    maxDepth = Math.max(maxDepth, depth);
    (byDepth[depth] || (byDepth[depth] = [])).push([key, def]);
  });

  for (let depth = 0; depth <= maxDepth; depth++) {
    const row = (byDepth[depth] || []).map(([key, def]) => {
      const parents = def.requires.filter(req => TECH_NODES[req] && TECH_NODES[req].branch === branchId && laneByKey[req] != null);
      const targetLane = parents.length
        ? parents.reduce((sum, req) => sum + laneByKey[req], 0) / parents.length
        : Number.POSITIVE_INFINITY;
      return { key, def, targetLane };
    }).sort((a, b) => {
      const aFinite = Number.isFinite(a.targetLane), bFinite = Number.isFinite(b.targetLane);
      if (aFinite && bFinite) return a.targetLane - b.targetLane || a.def.name.localeCompare(b.def.name);
      if (aFinite && !bFinite) return -1;
      if (!aFinite && bFinite) return 1;
      return a.def.name.localeCompare(b.def.name);
    });

    const used = occupiedByDepth[depth] || (occupiedByDepth[depth] = new Set());
    row.forEach(({ key, def }) => {
      const reqInBranch = def.requires.filter(req => TECH_NODES[req] && TECH_NODES[req].branch === branchId && laneByKey[req] != null);
      let lane = reqInBranch.length
        ? Math.round(reqInBranch.reduce((sum, req) => sum + laneByKey[req], 0) / reqInBranch.length)
        : rootLane++;
      while (used.has(lane)) lane++;
      used.add(lane);
      laneByKey[key] = lane;
      maxLane = Math.max(maxLane, lane);
      nodes.push({ key, def, depth, lane, col: lane + 1, row: depth + 1 });
    });
  }

  const lanes = maxLane + 1;
  const rows = maxDepth + 1;
  const nodeMap = Object.fromEntries(nodes.map(node => [node.key, node]));
  const links = [];
  nodes.forEach(child => {
    child.def.requires.forEach(parentKey => {
      const parent = nodeMap[parentKey];
      if (!parent) return;
      const x1 = (parent.lane + 0.5) / lanes * 100, y1 = (parent.depth + 0.5) / rows * 100;
      const x2 = (child.lane + 0.5) / lanes * 100, y2 = (child.depth + 0.5) / rows * 100;
      const mid = (y1 + y2) / 2;
      const dPath = Math.abs(x1 - x2) < 0.25
        ? `M ${x1.toFixed(3)} ${y1.toFixed(3)} L ${x2.toFixed(3)} ${y2.toFixed(3)}`
        : `M ${x1.toFixed(3)} ${y1.toFixed(3)} L ${x1.toFixed(3)} ${mid.toFixed(3)} L ${x2.toFixed(3)} ${mid.toFixed(3)} L ${x2.toFixed(3)} ${y2.toFixed(3)}`;
      links.push({ d: dPath, active: !!(gameState.tech[parentKey] && gameState.tech[child.key]) });
    });
  });

  nodes.sort((a, b) => a.depth - b.depth || a.lane - b.lane || a.def.name.localeCompare(b.def.name));
  return { nodes, links, lanes: Math.max(1, lanes), rows: Math.max(1, rows) };
}

function renderTechTree() {
  return `<div class='techTree'>${TECH_BRANCHES.map(branch => {
    const done = Object.entries(TECH_NODES).filter(([key, def]) => def.branch === branch.id && !def.repeatable && gameState.tech[key]).length;
    const total = Object.values(TECH_NODES).filter(def => def.branch === branch.id && !def.repeatable).length;
    const layout = buildBranchLayout(branch.id);
    if (!layout.nodes.length) return '';
    return `<section class='techBranch'><div class='techHeader'><div><h3 class='techTitle'>${branch.title}</h3><div class='small techBranchHint'>${branch.hint}</div></div><div class='pill techCountPill'>${done}/${total}</div></div><div class='techNodes' style='--tech-lanes:${layout.lanes};--tech-rows:${layout.rows};'><svg class='techLinks' viewBox='0 0 100 100' preserveAspectRatio='none' aria-hidden='true'>${layout.links.map(link => `<path class='techLinkPath ${link.active ? 'active' : ''}' d='${link.d}'></path>`).join('')}</svg>${layout.nodes.map(node => techNode(node.key, node.def, { col: node.col, row: node.row })).join('')}</div></section>`;
  }).join('')}</div>`;
}

// --- Job sliders -----------------------------------------------------------------------------------

function paintSlider(el) {
  const min = Number(el.min || 0);
  const max = Math.max(min, Number(el.max || 0));
  const value = Math.max(min, Math.min(max, Number(el.value || 0)));
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  el.style.background = `linear-gradient(90deg,#d8b06e 0%,#d8b06e ${pct}%,#241b14 ${pct}%,#241b14 100%)`;
}

function applyJobTarget(key, target) {
  const current = gameState.jobs[key];
  const pool = Math.max(0, freeVillagers() + current);
  const capLimit = WORKERS[key].slotType === 'slot' ? Math.min(workerSlots(key), pool) : pool;
  const assigned = Math.max(0, Math.min(target, capLimit));
  gameState.jobs[key] = assigned;
  return { assigned, max: Math.max(0, capLimit) };
}

function syncSliderFromInput(el) {
  const key = el.dataset.slider;
  const label = el.closest('.sliderWrap')?.querySelector('[data-slider-value]');
  const target = Math.max(0, Number(el.value || 0));
  const result = applyJobTarget(key, target);
  el.max = result.max;
  el.value = result.assigned;
  if (label) label.textContent = `${result.assigned} / ${result.max}`;
  paintSlider(el);
  renderDirty = true;
}

function releaseJobSlider(key) {
  if (activeJobSlider !== key) return;
  activeJobSlider = null;
  renderDirty = true;
  render();
}

// --- Main render pass ---------------------------------------------------------------------------------
// The UI renders in independent pieces: cheap top-bar numbers update in
// place every tick, structural blocks are only written when their markup
// actually changed (setHtmlIfChanged), and only the ACTIVE tab's panel is
// rebuilt at all. All button/slider/tooltip events are delegated, so nothing
// is rebound after a re-render.

let activeTab = 'build';

function setHtmlIfChanged(el, html) {
  if (el.__lastHtml === html) return false;
  el.__lastHtml = html;
  el.innerHTML = html;
  return true;
}

function updateTopStats() {
  const mood = happiness();
  const happyUnlocked = happinessActive();
  els.pop.textContent = `${gameState.population} / ${populationCap()}`;
  els.popSub.textContent = `· ${freeVillagers()} free`;
  const territoryCount = Object.values(gameState.territories).filter(Boolean).length;
  els.territoriesTop.textContent = territoryCount;
  els.territoriesStat.style.display = territoryCount > 0 ? '' : 'none';
  els.happinessTop.textContent = happyUnlocked ? `${Math.round(mood)}%` : 'Wine First';
  const safeGrowth = Number.isFinite(gameState.growth) ? gameState.growth : 0;
  const rawGrowth = gameState.population >= populationCap() ? 100 : Math.max(0, Math.min(100, safeGrowth));
  const growthLabel = rawGrowth < 10 ? rawGrowth.toFixed(1) : `${Math.floor(rawGrowth)}`;
  // only the tooltip-unique bit: the precise next-villager progress (free count is on the chip)
  els.popStat.dataset.tip = `Next villager: ${gameState.population >= populationCap() ? 'population cap reached' : `${growthLabel}%`}`;
  els.growBarTop.style.width = `${rawGrowth}%`;
  els.saveStatus.textContent = `Autosave ${gameState.autosave ? 'on' : 'off'}${gameState.lastSavedAt ? ` · saved ${new Date(gameState.lastSavedAt).toLocaleTimeString()}` : ''}`;
  els.villageName.textContent = (gameState.villageName || 'Coinvale').trim() || 'Coinvale';
}

function renderScene() {
  const tier = settlementTier();
  els.sceneTitle.textContent = tier === 'Homestead' ? 'The First Hall'
    : tier === 'Hamlet' ? 'A Growing Hamlet'
    : tier === 'Village' ? 'A Defended Village'
    : 'A Rising Township';
  els.sceneDesc.textContent = tier === 'Homestead' ? 'A timber hall anchors the village while a few cottages cluster around it.'
    : tier === 'Hamlet' ? 'Fields spread outward and cottages gather around the Town Hall.'
    : tier === 'Village' ? 'Your central hall rules over a sturdier and better organized settlement.'
    : 'Trade, authority, and expansion define the future of your settlement.';

  const decoCount = Math.min(8, Math.max(2, Math.floor(gameState.population / 4) + buildingLevel('townHall') - 1));
  const cottages = Array.from({ length: decoCount }, () => cottageBuilding());
  const topDeco = cottages.slice(0, 2), leftDeco = cottages.slice(2, 4), rightDeco = cottages.slice(4, 6), bottomDeco = cottages.slice(6);
  const builtScene = key => isBuilt(key) ? sceneBuilding(key, 'scene', null, buildingLevel(key)) : '';
  const farmScene = builtScene('farm');
  const lumberScene = builtScene('lumberMill');
  const quarryScene = builtScene('quarry');
  const bottomScene = ['workshop', 'scribeHall', 'barracks', 'warehouse', 'goldMine', 'vineyard', 'winery', 'oreMine', 'smelter', 'tavern']
    .map(builtScene).join('');
  setHtmlIfChanged(els.scene, `<div class='sceneTop'>${topDeco.join('')}${farmScene}</div><div class='sceneLeft'>${leftDeco.join('')}${lumberScene}</div><div class='sceneCenter'>${sceneBuilding('townHall', 'hall', null, buildingLevel('townHall'))}</div><div class='sceneRight'>${quarryScene}${rightDeco.join('')}</div><div class='sceneBottom'>${bottomScene}${bottomDeco.join('')}</div>`);
}

// --- Objective card ----------------------------------------------------------------------------

function objectiveGoalLabel(goal) {
  switch (goal.type) {
    case 'buildingLevel': return goal.level > 1 ? `${BUILDINGS[goal.building].name} Lv${goal.level}` : `Build ${BUILDINGS[goal.building].name}`;
    case 'jobs': return `${WORKERS[goal.job]?.name || goal.job} x${goal.count}`;
    case 'tech': return `Research ${TECH_NODES[goal.tech]?.name || goal.tech}`;
    case 'techCount': return `Technologies researched: ${goal.count}`;
    case 'population': return `Population ${goal.count}`;
    case 'territories': return `Territories ${goal.count}`;
    case 'happiness': return `Happiness ${goal.pct}%`;
    default: return '...';
  }
}

function renderObjective() {
  const idx = gameState.objectiveIndex;
  if (idx >= OBJECTIVES.length) {
    setHtmlIfChanged(els.objective,
      `<div class='objDone'>&#127942; All objectives complete!</div><div class='small muted'>The Mastery nodes in the Tech Tree carry the village onward.</div>`);
    return;
  }
  const objective = OBJECTIVES[idx];
  const goalRows = objective.goals.map(goal => {
    const { cur, target } = objectiveGoalProgress(goal);
    const done = cur >= target;
    return `<div class='objGoal ${done ? 'done' : ''}'><span class='logGlyph'>${done ? '&#10003;' : '&#9675;'}</span>${objectiveGoalLabel(goal)}<span class='objCount'>${Math.min(cur, target)}/${target}</span></div>`;
  }).join('');
  const fractions = objective.goals.map(goal => {
    const { cur, target } = objectiveGoalProgress(goal);
    return target ? Math.min(1, cur / target) : 0;
  });
  const overall = fractions.reduce((sum, f) => sum + f, 0) / (fractions.length || 1) * 100;
  const rewardChips = Object.entries(objective.reward || {})
    .map(([key, value]) => `<span class='pill objReward'>+${value} ${RESOURCES[key].name}</span>`).join('');
  setHtmlIfChanged(els.objective,
    `<div><div class='objName'>${objective.name}</div>` +
    `<div class='small muted'>${objective.description}</div>` +
    `<div class='objGoals'>${goalRows}</div>` +
    `<div class='bar'><div class='fill' style='width:${overall.toFixed(0)}%;background:linear-gradient(90deg,#d8b06e,#eec27a)'></div></div>` +
    `<div class='objRewards'><span class='small muted'>Reward:</span>${rewardChips}</div>` +
    `<div class='small muted objStep'>${idx + 1} / ${OBJECTIVES.length}</div></div>`);
}

function renderChronicle() {
  // Compact flat list, newest first, fixed depth - no expand control.
  // Entry type is colour-coded by the frame: green = good, red = bad, amber = info.
  const glyphs = { good: '&#10003;', bad: '&#9888;', info: '&#8226;' };
  const parts = gameState.log.slice(0, 10).map(entry =>
    `<div class='log ${entry.type}'><span class='logGlyph'>${glyphs[entry.type] || glyphs.info}</span>${entry.text}</div>`);
  setHtmlIfChanged(els.log, parts.join(''));
}

function renderBuildPanel() {
  const html = Object.entries(BUILDINGS).filter(([, def]) => def.isVisible()).map(([key, def]) => {
    const buildCostObj = buildCost(key);
    const upgradeCostObj = upgradeCost(key);
    const built = isBuilt(key);
    const techReq = buildingTechReq(key);
    const techLocked = !!(techReq && !gameState.tech[techReq]);
    const thReq = townHallBuildReq(key);
    const thLocked = buildingLevel('townHall') < thReq;
    const level = built ? buildingLevel(key) : 0;
    const maxLevel = maxLevelFor(key);
    const upgradeCap = upgradeCapFor(key);
    const jobKey = BUILDING_JOB_MAP[key];
    const slotLine = jobKey ? `${gameState.jobs[jobKey]}/${workerSlots(jobKey)} workers` : '';
    // Post-upgrade values are shown inline as green "-> next" markers instead of
    // a separate Next Step section (and the old card tooltip is gone entirely).
    const nextLevel = built ? Math.min(maxLevelFor(key), upgradeCapFor(key), level + 1) : 0;
    const showNext = built && nextLevel > level;
    const curEffectRows = baseEffectRows(key, built ? level : 1);
    const nextEffectRows = showNext ? baseEffectRows(key, nextLevel) : [];
    const effects = curEffectRows.map((row, i) =>
      `<div class='small muted'>${mergeEffectDelta(row, nextEffectRows[i])}</div>`).join('');
    const upkeepList = buildingUpkeepRows(key);
    const nextUpkeepList = showNext ? buildingUpkeepRowsAt(key, nextLevel) : [];
    const upkeepRows = upkeepList.map((row, i) =>
      `<div class='small muted'>${mergeEffectDelta(row, nextUpkeepList[i], 'deltaUpkeep')}</div>`).join('');
    let townReqMissing = [];
    if (key === 'townHall' && level < maxLevel && !townHallReqMet(level + 1)) {
      townReqMissing = townHallReq(level + 1)
        .filter(req => builtLevel(req.k) < req.l)
        .map(req => `${BUILDINGS[req.k].name} Lv${req.l}`);
    }
    const hallCapLocked = key !== 'townHall' && level >= upgradeCap && upgradeCap < maxLevel;
    const lockedReason = techLocked ? `Requires ${TECH_NODES[techReq]?.name || 'the matching Tech Tree unlock'}.`
      : thLocked ? `Requires Town Hall Lv${thReq}.`
      : townReqMissing.length ? `Requires ${townReqMissing.join(', ')}.`
      : hallCapLocked ? `Town Hall currently caps ${def.name} at Lv${upgradeCap}.`
      : '';
    const canBuild = canAfford(buildCostObj) && !techLocked && !thLocked && !built && key !== 'townHall';
    const canUpgrade = built && level < maxLevel && level < upgradeCap && canAfford(upgradeCostObj) &&
      !(key === 'townHall' && !townHallReqMet(level + 1));
    // A built building is never labelled "Locked" - gate info lives on the
    // upgrade button / reason line instead (the old badge read as a bug).
    const status = built ? `Level ${level} / ${key === 'townHall' ? maxLevel : upgradeCap}`
      : (techLocked || thLocked) ? 'Locked'
      : 'Available';
    return `<div class='tile buildCard ${(techLocked || thLocked) ? 'lockedCard' : ''}'><div class='buildHead'>${sprite(key, key === 'townHall' ? 'hall' : 'thumb')}<div class='buildMeta' style='flex:1 1 auto'><div class='row' style='justify-content:space-between;align-items:flex-start'><div><strong>${def.name}</strong><div class='small'>${def.description}</div></div><div class='badgeRow'><div class='pill statusPill'>${status}</div></div></div><div class='buildSummary'>${built ? '' : `<div class='small'>Not yet built</div>`}${slotLine ? `<div class='small'>${slotLine}</div>` : ''}</div><div class='buildSections'><div class='buildSection'><div class='buildSectionTitle'>Effect${showNext ? ` <span class='deltaHint'>(&#8594; after upgrade)</span>` : ''}</div><div class='effectList'>${effects}</div></div>${upkeepList.length ? `<div class='buildSection'><div class='buildSectionTitle'>Upkeep</div><div class='effectList'>${upkeepRows}</div></div>` : ''}</div><div class='costRow'>${key !== 'townHall' && !built ? `<div><div class='costLabel'>Build Cost</div>${costMarkup(buildCostObj)}</div>` : ''}${built && level < maxLevel && level < upgradeCap ? `<div><div class='costLabel'>Upgrade Cost</div>${costMarkup(upgradeCostObj)}</div>` : ''}</div>${lockedReason ? `<div class='small bad'>${lockedReason}</div>` : ''}</div></div><div class='actions'>${key !== 'townHall' && !built ? `<button class='btn ${canBuild ? 'primary' : 'ghost'}' data-build='${key}' ${canBuild ? '' : 'disabled'}>Build</button>` : ''}<button class='btn ${canUpgrade ? 'primary' : 'ghost'}' data-up='${key}' ${canUpgrade ? '' : 'disabled'}>${key === 'townHall' ? 'Upgrade Hall' : 'Upgrade'}</button></div></div>`;
  }).join('');
  setHtmlIfChanged(els.buildGrid, html);
}

function renderWorkPanel() {
  const happyUnlocked = happinessActive();
  const html = [
    `<div class='worker'><div class='workerLead'>${workerSprite('foragers')}<div><strong>Unassigned Villagers</strong><div class='small'>Free population waiting for work.</div></div></div><div><div>${freeVillagers()}</div><div class='small'>out of ${gameState.population} total</div></div><div class='row'><span class='pill'>Population Cap: ${populationCap()}</span><span class='pill'>Happiness: ${happyUnlocked ? `${Math.round(happiness())}%` : 'Unlock with Wine'}</span></div></div>`,
    ...workerOrder.filter(key => WORKERS[key] && (WORKERS[key].isVisible() || gameState.jobs[key] > 0)).map(key => {
      const def = WORKERS[key];
      const slotCount = def.slotType === 'slot' ? workerSlots(key) : gameState.population;
      const outputText = Object.entries(def.output)
        .map(([resKey, value]) => `+${fmt(value)} ${RESOURCES[resKey].name}/s`)
        .join(', ') || 'No direct production';
      const maxAssign = def.slotType === 'slot'
        ? Math.min(slotCount, gameState.jobs[key] + freeVillagers())
        : gameState.jobs[key] + freeVillagers();
      const buildingLabel = workerBuildingMap[key]
        ? `${BUILDINGS[workerBuildingMap[key]].name} capacity ${slotCount}`
        : `Free assignment`;
      const upkeepLabel = workerUpkeepLabel(key);
      return `<div class='worker'><div class='workerLead'>${workerSprite(key)}<div><strong>${def.name}</strong><div class='small'>${def.description}</div></div></div><div><div>${gameState.jobs[key]}</div><div class='small'>Output: ${outputText}</div>${upkeepLabel ? `<div class='small'>Upkeep: ${upkeepLabel}</div>` : ''}</div><div class='sliderWrap'><div class='sliderRow'><input class='jobSlider' type='range' min='0' max='${Math.max(0, maxAssign)}' value='${gameState.jobs[key]}' data-slider='${key}' /><span data-slider-value>${gameState.jobs[key]} / ${Math.max(0, maxAssign)}</span></div><div class='small'>${buildingLabel}</div></div></div>`;
    })
  ].join('');
  if (setHtmlIfChanged(els.workGrid, html)) {
    els.workGrid.querySelectorAll('[data-slider]').forEach(paintSlider);
  }
}

function renderExpPanel() {
  const html = Object.entries(EXPEDITIONS).filter(([, def]) => def.isVisible()).map(([key, def]) => {
    const active = gameState.expedition && gameState.expedition.k === key;
    const conquered = def.unique && gameState.territories[key];
    const duration = Math.max(1, Math.round(def.duration * expeditionDurationMult()));
    const progress = active ? (duration - gameState.expedition.r) / duration * 100 : 0;
    const provisions = expeditionCost(key);
    const provisionsMissing = missingCost(provisions);
    return `<div class='tile ${conquered ? 'bad' : ''}'><div class='row' style='justify-content:space-between'><div><strong>${def.name}</strong><div class='small'>${def.description}</div></div><div class='pill'>${def.soldiers} Soldiers</div></div><div class='small'>Duration: ${duration}s</div><div class='small'>Success chance: ${Math.round(expeditionChance(key) * 100)}%</div><div class='small'>Provisions:</div>${costMarkup(provisions)}<div class='small'>Rewards: ${def.reward}</div><div class='small'>Risk: ${def.risk} &middot; failed runs can draw a counter-raid unless Guards hold</div>${provisionsMissing && !active && !conquered ? `<div class='small bad'>Missing supplies: ${provisionsMissing}</div>` : ''}${active ? `<div class='bar'><div class='fill' style='width:${progress}%;background:var(--y)'></div></div><div class='small'>Expedition underway... ${gameState.expedition.r}s remaining</div>` : conquered ? `<div class='small good'>Already conquered.</div>` : ''}<div class='actions'><button class='btn' data-exp='${key}' ${(active || conquered || gameState.expedition || gameState.jobs.soldiers < def.soldiers || !canAfford(provisions)) ? 'disabled' : ''}>${active ? 'In Progress' : conquered ? 'Conquered' : 'Send Troops'}</button></div></div>`;
  }).join('');
  setHtmlIfChanged(els.expGrid, html);
}

function renderTechPanel() {
  setHtmlIfChanged(els.techGrid, `<div class='techWrap'>${renderTechTree()}</div>`);
}

function renderActivePanel() {
  if (activeTab === 'build') renderBuildPanel();
  else if (activeTab === 'work') { if (!activeJobSlider) renderWorkPanel(); }
  else if (activeTab === 'exp') renderExpPanel();
  else if (activeTab === 'tech') renderTechPanel();
}

function render() {
  renderDirty = false;
  clampAll();
  updateTopStats();
  renderResources();
  renderScene();
  renderObjective();
  renderChronicle();
  renderActivePanel();
  if (tooltipState.visible) refreshTooltip();
}

// --- User actions (invoked through delegated listeners) ---------------------------------------------------

function handleBuildAction(key) {
  const thReq = townHallBuildReq(key);
  if (isBuilt(key) >= 1) { log('bad', `${BUILDINGS[key].name} already stands in the town.`); return; }
  if (buildingLevel('townHall') < thReq) {
    log('bad', `${BUILDINGS[key].name} requires Town Hall Lv${thReq}.`);
    render();
    return;
  }
  const costObj = buildCost(key);
  if (!spendResources(costObj)) {
    log('bad', `Not enough resources to build ${BUILDINGS[key].name}.`);
    render();
    return;
  }
  buildingState[key].built = true;
  buildingState[key].level = 1;
  syncBuildingViews();
  log('good', `${BUILDINGS[key].name} built.`);
  render();
}

function handleUpgradeAction(key) {
  const costObj = upgradeCost(key);
  const maxLevel = maxLevelFor(key);
  const upgradeCap = upgradeCapFor(key);
  if (!isBuilt(key)) { log('bad', `You need ${BUILDINGS[key].name} before upgrading it.`); render(); return; }
  if (key !== 'townHall' && buildingLevel(key) >= upgradeCap) {
    log('bad', `${BUILDINGS[key].name} needs a stronger Town Hall before it can go past Lv${upgradeCap}.`);
    render();
    return;
  }
  if (buildingLevel(key) >= maxLevel) {
    log('info', `${BUILDINGS[key].name} is already at its current maximum level.`);
    render();
    return;
  }
  if (key === 'townHall' && !townHallReqMet(buildingLevel(key) + 1)) {
    log('bad', `Town Hall requires stronger village buildings first: ${townHallReqText(buildingLevel(key) + 1).join(', ')}.`);
    render();
    return;
  }
  if (!spendResources(costObj)) {
    log('bad', `Not enough resources to upgrade ${BUILDINGS[key].name}.`);
    render();
    return;
  }
  buildingState[key].level = Math.min(maxLevel, buildingLevel(key) + 1);
  syncBuildingViews();
  log('good', `${BUILDINGS[key].name} upgraded to Level ${buildingLevel(key)}.`);
  render();
}

function handleExpeditionAction(key) {
  const provisions = expeditionCost(key);
  const duration = Math.max(1, Math.round(EXPEDITIONS[key].duration * expeditionDurationMult()));
  if (gameState.expedition) { log('bad', 'An expedition is already underway.'); renderDirty = true; render(); return; }
  if (EXPEDITIONS[key].unique && gameState.territories[key]) {
    log('info', `${EXPEDITIONS[key].name} has already been conquered.`);
    renderDirty = true; render(); return;
  }
  if (gameState.jobs.soldiers < EXPEDITIONS[key].soldiers) {
    log('bad', `You need at least ${EXPEDITIONS[key].soldiers} Soldiers for ${EXPEDITIONS[key].name}.`);
    renderDirty = true; render(); return;
  }
  if (!spendResources(provisions)) {
    log('bad', `You are missing expedition provisions: ${missingCost(provisions)}.`);
    renderDirty = true; render(); return;
  }
  gameState.expedition = { k: key, r: duration };
  log('info', `${EXPEDITIONS[key].name} has begun. Provisions spent: ${bundleLabel(provisions)}.`);
  renderDirty = true;
  render();
}

function handleResearchAction(key) {
  const def = TECH_NODES[key];
  const costObj = researchCost(key);
  const thReq = townHallTechReq(key);
  if (!def.requires.every(req => gameState.tech[req])) {
    log('bad', `Research prerequisites for ${def.name} are not complete.`);
    renderDirty = true; render(); return;
  }
  if (buildingLevel('townHall') < thReq) {
    log('bad', `${def.name} requires Town Hall Lv${thReq}.`);
    renderDirty = true; render(); return;
  }
  // Repeatable (Mastery) nodes: buy the next level instead of a one-time unlock.
  if (def.repeatable) {
    const maxLevel = def.repeatable.maxLevel ?? 100;
    if (techLevel(key) >= maxLevel) {
      log('info', `${def.name} is already fully mastered.`);
      renderDirty = true; render(); return;
    }
    if (!spendResources(costObj)) {
      log('bad', `Not enough resources to advance ${def.name}.`);
      renderDirty = true; render(); return;
    }
    gameState.techLevels[key] = techLevel(key) + 1;
    log('good', `${def.name} advanced to Level ${techLevel(key)}.`);
    renderDirty = true;
    render();
    return;
  }
  if (!spendResources(costObj)) {
    log('bad', `Not enough resources to research ${def.name}.`);
    renderDirty = true; render(); return;
  }
  gameState.tech[key] = true;
  const unlockMessages = {
    fieldRotation: 'Field Rotation researched. Farms now scale better in the early game.',
    craftsmanship: 'Workshop unlocked.',
    storehousePlanning: 'Warehouse unlocked.',
    goldMining: 'Gold Mining researched. Gold Mines can now add mined gold to village taxes.',
    viticulture: 'Viticulture researched. Vineyards can now be built.',
    vintagePress: 'Vintage Press researched. Wineries are now available.',
    tavernCulture: 'Tavern Culture researched. Taverns can now improve growth through happiness.',
    oreExtraction: 'Ore Extraction researched. Ore Pits are now available.',
    smithing: 'Smithing researched. Smelters can now refine Metal.',
    planningOffice: 'Planning Office researched. Building Wood costs ease slightly.',
    measuredMasonry: 'Measured Masonry researched. Stone-heavy upgrades are a little cheaper.'
  };
  log('good', unlockMessages[key] || `${def.name} researched.`);
  renderDirty = true;
  render();
}

// --- Delegated event wiring (installed once at boot) --------------------------------------------------------

function setupUiDelegation() {
  // Tooltips: one document-level listener follows the cursor; re-rendered
  // content keeps working because the tip text lives in data-tip attributes.
  document.addEventListener('mousemove', e => {
    if (activeJobSlider) { hideTooltip(); return; }
    const el = e.target?.closest?.('[data-tip]');
    if (el && el.dataset.tip) showTooltip(el.dataset.tip, e.clientX, e.clientY);
    else if (tooltipState.visible) hideTooltip();
  });

  els.buildGrid.addEventListener('click', e => {
    const buildBtn = e.target.closest('[data-build]');
    if (buildBtn) { handleBuildAction(buildBtn.dataset.build); return; }
    const upBtn = e.target.closest('[data-up]');
    if (upBtn) handleUpgradeAction(upBtn.dataset.up);
  });
  els.expGrid.addEventListener('click', e => {
    const btn = e.target.closest('[data-exp]');
    if (btn) handleExpeditionAction(btn.dataset.exp);
  });
  els.techGrid.addEventListener('click', e => {
    const btn = e.target.closest('[data-tech]');
    if (btn) handleResearchAction(btn.dataset.tech);
  });
  els.modalChoices.addEventListener('click', e => {
    const btn = e.target.closest('[data-c]');
    if (!btn || !gameState.event) return;
    const choice = gameState.event.choices[+btn.dataset.c];
    gameState.event = null;
    if (choice) choice.action();
    nextQueuedEvent();
    render();
    renderModal();
  });

  // Job sliders
  els.workGrid.addEventListener('pointerdown', e => {
    const slider = e.target.closest?.('.jobSlider[data-slider]');
    if (!slider) return;
    activeJobSlider = slider.dataset.slider;
    hideTooltip();
  });
  const releaseFromEvent = e => {
    const slider = e.target.closest?.('.jobSlider[data-slider]');
    if (slider) releaseJobSlider(slider.dataset.slider);
  };
  els.workGrid.addEventListener('pointerup', releaseFromEvent);
  els.workGrid.addEventListener('pointercancel', releaseFromEvent);
  els.workGrid.addEventListener('focusout', releaseFromEvent);
  els.workGrid.addEventListener('input', e => {
    const slider = e.target.closest?.('.jobSlider[data-slider]');
    if (slider) syncSliderFromInput(slider);
  });
  els.workGrid.addEventListener('change', e => {
    const slider = e.target.closest?.('.jobSlider[data-slider]');
    if (slider) { syncSliderFromInput(slider); releaseJobSlider(slider.dataset.slider); }
  });
}

// --- Event modal ------------------------------------------------------------------------------------------

function renderModal() {
  if (els.nameModal.classList.contains('active') || els.patchModal.classList.contains('active')) {
    els.modal.classList.remove('active');
    els.modal.dataset.eventId = '';
    return;
  }
  if (!gameState.event) {
    nextQueuedEvent();
    if (!gameState.event) {
      els.modal.classList.remove('active');
      els.modal.dataset.eventId = '';
      return;
    }
  }
  if (els.modal.dataset.eventId === gameState.event.id) {
    els.modal.classList.add('active');
    return;
  }
  els.modal.dataset.eventId = gameState.event.id;
  els.modalTitle.textContent = gameState.event.title;
  els.modalText.textContent = gameState.event.text;
  els.modalChoices.innerHTML = gameState.event.choices.map((choice, i) =>
    `<button class='cbtn' data-c='${i}'>${choice.label}<div class='small'>${choice.sub || ''}</div></button>`
  ).join('');
  // Choice clicks are handled by the delegated listener from setupUiDelegation().
  els.modal.classList.add('active');
}

// --- Village naming modal ----------------------------------------------------------------------------------

function openNameModal(mode = 'rename') {
  const current = (gameState.villageName || 'Coinvale').trim() || 'Coinvale';
  els.nameModal.dataset.mode = mode;
  els.nameModalTitle.textContent = mode === 'new' ? 'Name Your Village' : 'Rename Your Village';
  els.nameModalText.textContent = mode === 'new'
    ? 'Choose a name for the settlement before the first season begins.'
    : 'Choose a new name for your settlement.';
  els.nameModalHelp.textContent = mode === 'new'
    ? 'This name is saved with your village.'
    : 'Leave the current name in place if you do not want to change it.';
  els.nameInput.value = current;
  els.nameCancelBtn.textContent = mode === 'new' ? 'Keep Coinvale' : 'Keep Current';
  els.nameModal.classList.add('active');
  setTimeout(() => { els.nameInput.focus(); els.nameInput.select(); }, 0);
}

function closeNameModal() {
  els.nameModal.classList.remove('active');
}

function submitVillageName() {
  const mode = els.nameModal.dataset.mode || 'rename';
  const current = (gameState.villageName || 'Coinvale').trim() || 'Coinvale';
  const clean = (els.nameInput.value || '').trim().replace(/\s+/g, ' ').slice(0, 32) || current;
  if (mode !== 'new' && clean === current) {
    log('info', `The village remains ${clean}.`);
    closeNameModal();
    renderDirty = true;
    render();
    return;
  }
  gameState.villageName = clean;
  gameState.needsVillageName = false;
  // New village keeping the default name: the boot entry already chronicles the
  // founding, so skip the extra "rises under the name" line (it duplicated Day 1).
  if (mode !== 'new' || clean !== current) log('good', mode === 'new'
    ? `A new village rises under the name ${clean}.`
    : `Your village is now known as ${clean}.`);
  closeNameModal();
  renderDirty = true;
  render();
}
