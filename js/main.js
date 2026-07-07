/*
 * Coinvale - bootstrap and global event wiring
 *
 * Binds the header/tab/save controls, handles offline progress on load,
 * and runs the fixed-timestep main loop.
 */

// --- Tabs -----------------------------------------------------------------------

document.querySelectorAll('.tab').forEach((button, index) => {
  if (index === 0) button.classList.add('active');
  button.onclick = () => {
    document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    button.classList.add('active');
    byId('panel-' + button.dataset.tab).classList.add('active');
    // Panels render lazily: refresh the newly shown one right away.
    activeTab = button.dataset.tab;
    renderActivePanel();
    if (tooltipState.visible) refreshTooltip();
  };
});

// --- Patch notes ------------------------------------------------------------------

els.patchNotesBtn.onclick = () => { openPatchModal(); renderDirty = true; render(); };
els.patchCloseBtn.onclick = () => { closePatchModal(); renderDirty = true; render(); };
els.patchModal.onclick = e => {
  if (e.target !== els.patchModal) return;
  closePatchModal();
  renderDirty = true;
  render();
};
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape' || !els.patchModal.classList.contains('active')) return;
  closePatchModal();
  renderDirty = true;
  render();
});

// --- Village naming -----------------------------------------------------------------

els.renameVillageBtn.onclick = () => openNameModal('rename');
els.nameConfirmBtn.onclick = submitVillageName;
els.nameCancelBtn.onclick = () => {
  if ((els.nameModal.dataset.mode || 'rename') === 'new') { submitVillageName(); return; }
  closeNameModal();
  renderDirty = true;
  render();
};
els.nameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); submitVillageName(); }
  if (e.key === 'Escape' && (els.nameModal.dataset.mode || 'rename') !== 'new') {
    closeNameModal();
    renderDirty = true;
    render();
  }
});

// --- Header tools menu / chronicle expand ----------------------------------------------

els.toolsBtn.onclick = e => { e.stopPropagation(); els.toolsMenu.classList.toggle('open'); };
document.addEventListener('click', e => {
  if (!e.target.closest('.menuWrap')) els.toolsMenu.classList.remove('open');
});
// --- Save / export / import / reset ---------------------------------------------------

byId('saveBtn').onclick = () => {
  persistSave();
  log('info', 'The realm has been saved.');
  renderDirty = true;
  render();
};

byId('exportBtn').onclick = () => {
  const payload = { ...gameState, event: null, trader: null };
  const data = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  navigator.clipboard.writeText(data)
    .then(() => { log('info', 'Save copied to clipboard.'); renderDirty = true; render(); })
    .catch(() => prompt('Copy your save:', data));
};

byId('importBtn').onclick = () => {
  const data = prompt('Paste your exported save:');
  if (!data) return;
  try {
    gameState = deepMerge(freshState(), migrateSave(JSON.parse(decodeURIComponent(escape(atob(data))))));
    normalizeBuildings(gameState.buildings);
    buildingState = gameState.buildings;
    syncBuildingViews();
    gameState.skipOffline = true;
    gameState.lastViewedAt = Date.now();
    gameState.event = null;
    gameState.eventQueue = [];
    gameState.trader = null;
    log('info', 'Save imported successfully.');
    persistSave();
    renderDirty = true;
    render();
  } catch {
    alert('Invalid save data.');
  }
};

byId('resetBtn').onclick = () => {
  if (!confirm('This will permanently erase your current village. Continue?')) return;
  localStorage.removeItem(SAVE_KEY);
  gameState = freshState();
  buildingState = gameState.buildings;
  syncBuildingViews();
  openNameModal('new');
  log('info', 'The old village has been abandoned. A new beginning awaits with deeper stores and two active foragers.');
  renderDirty = true;
  render();
};

// --- Visibility / unload -----------------------------------------------------------------

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    gameState.lastViewedAt = Date.now();
    if (gameState.autosave) persistSave();
    return;
  }
  applyOfflineProgress();
  renderDirty = true;
  render();
  renderModal();
});

window.addEventListener('beforeunload', () => {
  gameState.lastViewedAt = Date.now();
  if (gameState.autosave) persistSave();
});

// --- Main loop ------------------------------------------------------------------------------

function startMainLoop() {
  let last = performance.now();
  function frame(now) {
    const delta = Math.min(0.25, (now - last) / 1000);
    last = now;
    gameState.acc += delta;
    while (gameState.acc >= 1) {
      gameState.acc -= 1;
      tick();
    }
    if (renderDirty || gameState.event) render();
    renderModal();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// --- Boot -----------------------------------------------------------------------------------

setupUiDelegation();
if (gameState.needsVillageName) openNameModal('new');
if (!gameState.log.length) {
  log('info', 'A new village begins with a timber hall, four villagers, deeper food stores, and two active foragers.');
}
applyOfflineProgress();
checkObjectives(); // old saves fast-forward through already-met objectives
render();
renderModal();
loadPatchNotes();
setInterval(() => { if (gameState.autosave) persistSave(); }, 10000);
startMainLoop();
