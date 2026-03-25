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
- run a strong balance pass on the current economy before the next major content expansion
- verify after the latest slowdown pass that:
  - core resources do not cap out too early
  - `Town Hall` and core building levels do not rise too quickly
  - `Knowledge` cost growth and cap growth still meet properly

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
- `Food` must remain important, but early game must not become too punishing
- starter workers must not become useless too early
- `Warehouse` should feel like a milestone, but storage must not make early game too open
- `Gold` should matter in midgame without locking research too early
- `Happiness` should help keep growth manageable, not become another noisy micromanagement number
- all resources should remain visible in the row, but locked layers should do nothing before unlock

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
- review whether worker sliders remain readable at larger populations
- evaluate whether tech tree branch spacing needs one more polish pass
- compact resource tooltips further if more resources are added later
- decide whether the village name should later include a crest or banner

Architecture topics:
- decide when and how runtime should gradually move onto `reference/*.js`
- keep documentation and references aligned with `index.html` at all times

Possible future logs:
- `decisions.md` for major design decisions
- `balance-notes.md` for economy and pacing notes
