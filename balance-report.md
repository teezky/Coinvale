# Coinvale Balance Report - 2026-07-05

Method:
- analytic sweep: every cost curve checked against every storage cap across `TH 1-30`
- bot simulation: a deterministic greedy player (optimal decisions every 20s, random events
  and trader disabled, no expeditions) played 36 hours of game time on the current balance,
  plus 24 hours on a candidate fix bundle
- 1 game day = 60 ticks = 1 minute of active play

## Findings

### F1 (critical): the gold economy hard-walls all progression at TH15

- Building gold upkeep (12 buildings x `0.012-0.045/level` once their gates open) grows with
  every building level, while gold income has effectively one source (Gold Mine base + at most
  ~8 Gold Miners + Tax Ledgers).
- At `TH15` the simulated village earns `3.13 Gold/s` and pays `3.36 Gold/s`: net negative,
  gold stock pinned at zero.
- `TH16` requires `Tavern Lv4` and `Smelter Lv4`; those upgrades cost 64 and 93 gold.
  With gold pinned at zero they are unreachable **forever**. The bot stayed at `TH15`
  for 30 straight hours.
- `Market Charters` (136 gold) also stays unresearched for the same reason (40/41 techs).

### F2 (critical): Tavern and Smelter can never reach their soft caps

Independent of F1: the gold component of the Tavern/Smelter *base cost* (10 / 8) is
multiplied by the full upgrade curve (~x214 at Lv48). Even at `TH30` with a maxed
Gold Mine (gold cap 626), Tavern crosses the cap at `Lv18` (662 gold) and Smelter at
`Lv21`. The "TH30 supports Lv50" goal fails for these two buildings. All other
buildings' gold costs peak at 154 - fine.

### F3: the tech tree is exhausted in ~3.5h of optimal play

All researchable techs were done by day 212. After that, Knowledge is a dead resource
(capped 83%+ of the time even before the wall). Passive population Knowledge dominates
late game (378 pop x 0.006 = 2.27/s versus ~0.5/s from Scholars), so Scholar count
barely matters. The `Update list` idea of a repeatable multi-level node (~Lv100,
+1%/level, scaling cost) is the natural Knowledge sink and should be the first
content addition.

### F4: three quarters of the population has nothing to do

Worker capacity grows far slower than population. At `TH15` the village holds 378 people
but ~90 job slots: 286 villagers end up as Foragers (76% of the population). The roadmap
worry was "starter workers must not become useless too early" - the real problem is the
opposite: foraging is the only employment for most of the village all game long.

### F5: pacing shape is inverted (slow -> fast -> wall)

`TH2` lands at day 38 (38 min of active play - a slow opener), `TH5` at 83, `TH10` at 157,
then `TH11-15` takes only 50 minutes, then the wall. With the fix bundle, `TH30` lands at
day 420 (~7h optimal play). A human plays slower, but the shape (crawl, sprint, stop)
carries over.

### F6: Stone overflows early

Stone sat at cap 50% of the first hour (base cap 250, little early use). Matches the
old `Update list` note that Stone/Food should matter more as upgrade resources.

### F7 (from earlier audits, still open)

- `Fortified Storeyards` is researchable but has no implemented effect.
- The red "missing cost" highlight is suppressed by the glass chip styling.

## Validated fix bundle (APPLIED in Patch 0.0.34)

| Change | Current | Proposed |
|---|---|---|
| Building gold upkeep per level | 0.012 / 0.025 / 0.045 / 0.015 | halved: 0.006 / 0.012 / 0.022 / 0.008 |
| Gold cap: per TH level | 2 | 6 |
| Gold cap: Gold Mine base / per level | 26 / 9 | 40 / 18 |
| Tavern / Smelter base-cost gold | 10 / 8 | 2 / 2 |

Result: the TH15 wall disappears, gold net stays positive all the way, `TH30` + full tech
tree reached in ~7h of optimal play, Tavern/Smelter clear their gold-cap ceiling well past
the progression-relevant levels.

## Proposals

1. DONE (0.0.34): gold fix bundle applied.
2. DONE (0.0.35): repeatable Mastery nodes added (six branch-ending nodes, +1%/level,
   cost 40 + 10/level, max 100).
3. Rework worker capacity vs population growth (F4): larger capacity curves, or slower
   late population growth, or a designed role for surplus population.
4. Early-game pacing (F5): consider ~10-15% cheaper TH2-TH4 requirements or slightly
   higher starter output so the first upgrade lands under ~25 min.
5. Give Stone an early sink (F6) or trim its early cap.
6. Decide `Fortified Storeyards` (implement raid-loss reduction via the effects system,
   or redesign) and the missing-cost highlight (F7).

Charts: TH progression and gold net over time (current vs fix bundle) are in the
session deliverable `balance-charts.html`.
