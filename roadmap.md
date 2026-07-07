# Coinvale Roadmap

Current design direction:
- The main gameplay spine is `Ikariam + Melvor Idle`
- `Farthest Frontier` adds logic and believability, but not harsh survival punishment
- The target is a readable idle loop built around:
  - growth
  - luxury economy
  - tech progression
  - village identity

Current next topic:
- DONE (0.0.33): the balance pass ran (analytic sweep + 36h bot simulation); findings and
  proposals live in `balance-report.md`
- DONE (0.0.34): gold economy fix bundle applied - the TH15 hard wall is gone
- DONE (0.0.35): repeatable Mastery nodes added as the Knowledge long-tail sink
- DONE (0.0.45): objective chain added (20 goals, reference/objectives.js, Objective card
  above the Chronicle) - the game now always shows "what next"
- next design discussion: worker capacity vs population growth (76% of late population idles)
- smaller open items: early-game pacing (TH2 at ~38 min), Stone early sink,
  `Fortified Storeyards` effect, missing-cost highlight

Near-term priorities:
1. `Food` scaling after the removal of `Granary` / `Chicken Coop`
2. browser-side validation of the `Scribe Hall -> Gold Mining` gating
3. review whether the fixed tech-tree cost model still needs branch-by-branch tuning
4. `Town Hall` and building upgrade-cost tuning
5. pace testing for the `Wine`, `Ore`, and `Metal` economy layers
6. expedition reward tuning and `Guard` defense value tuning
7. worker-cap growth and role-based capacity tuning
8. evaluate whether trader barters and gold events stay relevant across different game phases

Important balance topics:
- `Fortified Storeyards` is researchable but has no implemented effect
  (discovered in the 0.0.29 audit) - implement the raid-loss reduction or rework the node
- `Food` must remain important, but early game must not become too punishing
- starter workers must not become useless too early
- `Warehouse` should feel like a milestone, but storage must not make early game too open
- `Gold` should matter in midgame without locking research too early
- `Happiness` should help keep growth manageable, not become another noisy micromanagement number
- all resources should remain visible in the row, but locked layers should do nothing before unlock

Plot town view (approved direction, mockups in repo):
- designated plots per building on an empty terrain map (`mockup-plots-v2.html`)
- final background generated from `assets/source/backgrounds/terrain-art-prompt.md`
- runtime implementation reuses existing build/upgrade handlers through plot popovers

Likely next gameplay topics:
- `Town Hall 1-30` progression tuning
- `Level 1-50` building scaling and worker-cap balance
- stronger building art or separate art assets on top of the current sprites
- stronger `Wine` economy chain:
  - `Vineyard`
  - `Winery`
  - `Tavern`
- stronger `Metal` economy chain:
  - `Ore Pit`
  - `Smelter`
  - possible later `Tools` or `Weapons`
- final role definition for starter jobs
- more chain events and staged expedition milestones

UX topics:
- the documented red highlight for missing costs (`.costItem.missing`) is suppressed by the
  glass chip styling (discovered in the 0.0.32 audit) - decide whether to restore it
- review whether worker sliders remain readable at larger populations
- evaluate whether tech tree branch spacing needs one more polish pass
- compact resource tooltips further if more resources are added later
- decide whether the village name should later include a crest or banner

Architecture topics:
- DONE (0.0.28): runtime split into readable modules (`js/data|engine|sprites|ui|main.js`), dead code removed
- DONE (0.0.29): generic production/upkeep engine driven by `reference/*.js`;
  tech bonuses live as `effects` on the nodes; UI reads the same engine helpers
- DONE (0.0.30): lazy per-tab rendering with change-detected DOM writes and fully
  delegated events (~4.8x faster render pass, zero steady-state DOM writes)
- DONE (0.0.31): building state simplified to `{built, level}` with save version 9 migration
- next: consolidate the three style layers in `styles.css` into a single theme
- keep documentation and references aligned with the runtime at all times

Possible future logs:
- `decisions.md` for major design decisions
- `balance-notes.md` for economy and pacing notes
