# Coinvale asset plan — image inventory, proportion spec, generation prompts

Last updated: Patch 0.0.40 (2026-07-07) — **STYLE MASTER v2**

This is the single source of truth for game art: what exists, what is needed,
what size everything must be, and the exact prompt to generate each image with.

**v2 direction (0.0.40):** the pads-terrain (`village-terrain-final-v2.png`)
is now the STYLE MASTER. All building art is (re)generated to match it: a
steeper aerial camera, semi-realistic painterly rendering, and NO grass
diorama patch under the building (the terrain's baked-in dirt pads are the
ground now). The 13 v1-style building images remain in the game as
placeholders until their v2 replacements land.

---

## 1. Proportion & canvas spec (rules every building image must obey)

- Canvas: **1024 x 1024, RGBA, fully transparent background** (PNG source,
  converted to `.webp` quality 85 for the game).
- The building fills **~90% of the canvas width**; its base sits at **92-96%
  of canvas height** (i.e. ~40-80 transparent px below the base).
- View: **steep three-quarter aerial view, ~55-65 degrees from above** —
  rooftops clearly visible, front facade partially visible. This matches the
  terrain's camera. (v1 art was too low/frontal — that was the mismatch.)
- Light: **soft warm afternoon light from the upper left**, shadows to the
  lower right, baked in.
- Ground: **NO grass patch, NO oval diorama base.** The building stands
  directly on bare packed ochre earth — at most its own footprint of trampled
  dirt and a couple of small props (barrel, crate) tight against the walls.
  The terrain provides the pad; the cutout must blend onto it.
- Style reference: ALWAYS attach `assets/source/backgrounds/village-terrain-final-v2.png`
  (and, for upgrades, the building's previous stage) when generating.

### Size tiers (recalibrated to the v2 terrain's pad sizes)

Map design width = 1600 px. The tier sets the visible footprint width as % of
map width; the mockup's `METRICS` table calibrates per-image alpha bounds.

| Tier | % of map width | ~px @1600 | Buildings |
|---|---|---|---|
| landmark | 14% | 224 | Town Hall |
| large | 11% | 176 | Farm, Lumber Mill, Quarry, Gold Mine, Warehouse, Barracks, Vineyard |
| medium | 9.7% | 155 | Scribe Hall, Ore Pit, Smelter, Winery, Tavern |
| small | 8.5% | 136 | Workshop |

### Naming convention & folders

```
assets/source/...                     original 1024x1024 PNGs (kept for re-export)
assets/images/buildings/{key}-lv{NN}.webp    building tiles
assets/images/backgrounds/village-terrain.webp   the painted map background (DONE, v2)
assets/images/portraits/{workerKey}.webp     worker portraits (512x512)
assets/images/icons/{resource}.webp          resource icons (256x256, optional)
```

Building `key` = lowercase runtime id: townhall, farm, lumbermill, quarry,
goldmine, orepit, smelter, warehouse, scribehall, workshop, barracks,
vineyard, winery, tavern.

---

## 2. Master style prompt v2 (shared prefix for ALL building images)

Use this as the first paragraph of every building prompt, replacing
`[BUILDING DESCRIPTION]` with the per-image text from section 4. Attach the
terrain image as a style reference every time.

> A single medieval fantasy [BUILDING DESCRIPTION], seen from a steep
> three-quarter aerial view about 60 degrees from above — rooftops clearly
> visible, front facade partially visible — exactly matching the camera and
> rendering style of the attached village terrain image. Highly detailed
> semi-realistic painterly game art, crisp textures, warm muted palette:
> weathered timber, rough sandstone, terracotta and slate roof tiles. Soft
> warm afternoon light from the upper left, shadows falling to the lower
> right. The building stands directly on flat packed ochre earth with only
> its own small footprint of trampled dirt — NO grass patch, NO oval base,
> no surrounding lawn or diorama. Fully transparent background, PNG cutout,
> no sky, no backdrop, no people, no animals, no text, no watermark. Square
> 1:1 canvas; the building fills about 90% of the image width and its base
> sits close to the bottom edge.

Consistency tips: generate all stages of one building in one session; feed
the terrain image + the previous stage as references; if the tool draws a
grass base anyway, add "the ground around the building is dry packed dirt,
same ochre tone as the reference terrain" to the prompt.

---

## 3. Inventory

| File | Status |
|---|---|
| backgrounds/village-terrain.webp | **DONE — style master v2** (source: village-terrain-final-v2.png, 1672x941) |
| backgrounds/village-terrain-final.webp | superseded v1 terrain (kept for reference) |
| backgrounds/village-terrain-placeholder.png | superseded procedural placeholder |
| buildings/*-lv01.webp (13 pieces) | v1 style — in game as PLACEHOLDERS, to be regenerated (P1) |
| buildings/tavern-lv01.webp | missing entirely (P1) |

---

## 4. Needed images

### Priority 1 — the 14 base buildings in v2 style (14 images)

All use the master prefix (section 2) + the subject text below. Replace the
files in `assets/images/buildings/` 1:1 (same names); the game and mockup
pick them up automatically once `METRICS` is refreshed.

| File | Subject text (goes into [BUILDING DESCRIPTION]) |
|---|---|
| townhall-lv01.webp | "grand village TOWN HALL: a stately two-story timber-and-stone hall with a tall clock tower, terracotta roofs, a small flag, a notice board by the entrance" |
| farm-lv01.webp | "FARMHOUSE with an attached timber barn, a tiny fenced vegetable patch and a haystack tight against its walls" |
| lumbermill-lv01.webp | "LUMBER MILL: an open-sided saw shed with a large circular saw bench, stacked logs and cut planks around it" |
| quarry-lv01.webp | "STONE QUARRY: a shallow terraced excavation into pale rock with a wooden crane hoist, cut stone blocks and rubble piles" |
| goldmine-lv01.webp | "GOLD MINE: a reinforced timber mine entrance built into a rocky mound, ore cart on short rails, faint gold glints in the rock" |
| orepit-lv01.webp | "ORE PIT: an open excavation with a wooden crane, ladders, dark ore heaps and a sorting table" |
| smelter-lv01.webp | "SMELTER: a squat stone furnace building with a tall brick chimney, glowing furnace mouth, slag heap and tool racks" |
| warehouse-lv01.webp | "WAREHOUSE: a long timber storage hall with wide loading doors, crates, sacks and barrels stacked by the entrance" |
| scribehall-lv01.webp | "SCRIBE HALL: a small scholarly hall with a slender bell tower, arched windows, a writing desk visible through an open door" |
| workshop-lv01.webp | "WORKSHOP: a modest craftsman's cottage with an open lean-to workbench, hanging tools and a grindstone" |
| barracks-lv01.webp | "BARRACKS: a sturdy fortified hall with a low stone wall section, a small watchtower, a training dummy and weapon rack" |
| vineyard-lv01.webp | "VINEYARD ESTATE: a small stone vintner's shed with a wooden pergola and two short rows of grape vines within its footprint" |
| winery-lv01.webp | "WINERY: a stone cellar building with an arched barrel-cellar entrance, a wooden wine press and stacked barrels" |
| tavern-lv01.webp | "cozy two-story village TAVERN: whitewashed upper floor with dark timber framing over a fieldstone ground floor, a hanging sign with a beer mug, outdoor tables and wine barrels" |

### Priority 2 — Town Hall visual stages (6 images)

Art switches at Lv5/10/15/20/25/30. Same v2 master prefix; feed the previous
stage + terrain as references so it reads as the SAME building growing.

- **townhall-lv05.webp** — "...stage 2 of 7: the hall extended with a second
  wing, a taller clock tower with a bronze bell, a tiled porch, a flagpole"
- **townhall-lv10.webp** — "...stage 3 of 7: a stately stone town hall with
  two symmetric wings, a copper-spired clock tower, arched windows, a small
  paved forecourt with a fountain"
- **townhall-lv15.webp** — "...stage 4 of 7: a grand civic hall of dressed
  sandstone, three floors, gilded weathervane, stone balustrades, twin
  staircases, heraldic banners"
- **townhall-lv20.webp** — "...stage 5 of 7: a palatial town hall with a
  domed central tower, ornate carvings, a stained-glass rose window, walled
  forecourt with lanterns"
- **townhall-lv25.webp** — "...stage 6 of 7: a magnificent city hall, white
  stone and gold trim, twin flanking towers plus the great clock tower, a
  marble plaza with a statue"
- **townhall-lv30.webp** — "...stage 7 of 7, final form: a citadel-like grand
  hall crowned with a golden dome and spires, sweeping staircases, banners,
  glowing windows — clearly the same building at its peak"

### Priority 3 — upgrade stages for the other 13 buildings (26 images)

`-lv02` (shown from building Lv10) and `-lv03` (Lv20). Recipe on top of the
master prefix + the building's lv01 as reference:

- **lv02** = "the same building, visibly expanded: an added wing or floor,
  stone reinforcements, better roof, more props tight against the walls,
  a small banner — clearly wealthier, same layout and silhouette."
- **lv03** = "the same building at its grandest: refined masonry, decorative
  trims and metal fittings, an extra tower/chimney/annex — the peak version
  of the same silhouette."

Per-building flavor cues (unchanged from v1 plan):

| Building | Stage 2 / Stage 3 cue |
|---|---|
| Farm | more field rows, second barn / windmill |
| Lumber Mill | log flume, twin saw sheds / water-driven gang saw |
| Quarry | deeper terraces, more cranes / stone ramps and pulley towers |
| Gold Mine | rail carts, sorting shed / glowing lanterns, double entrance |
| Ore Pit | second crane, conveyor / spoil heaps, headframe |
| Smelter | twin furnaces / tall brick chimney, glowing slag channel |
| Warehouse | second storey / loading crane, big crate yard |
| Scribe Hall | library annex / observatory dome |
| Workshop | forge addition / gear hoist, tiled roof |
| Barracks | palisade to stone wall / watchtower, training yard |
| Vineyard | more pergola rows / press hut |
| Winery | barrel cellar entrance / bottling annex |
| Tavern | beer garden / third floor with balconies, festive lanterns |

### Priority 4 — worker portraits (16 images)

512x512 bust portraits. Camera mismatch is not an issue for portraits; keep
the same palette and painterly feel. Master portrait prefix:

> Painted bust portrait of a medieval fantasy villager, warm painterly style
> matching detailed city-builder game art, soft light from the upper left,
> muted dark parchment circular vignette background, square 1:1 canvas, no
> text, no watermark.

| File | Subject line to append |
|---|---|
| portraits/foragers.webp | "a cheerful FORAGER with a wicker basket of berries and mushrooms, simple linen hood" |
| portraits/woodGatherers.webp | "a WOOD GATHERER carrying a bundle of branches on the shoulder, rough wool tunic" |
| portraits/stoneCollectors.webp | "a STONE COLLECTOR with a canvas sling of field stones, dusty gloves" |
| portraits/farmers.webp | "a sun-tanned FARMER with a straw hat and a sheaf of wheat" |
| portraits/woodcutters.webp | "a burly WOODCUTTER with a long axe over the shoulder, plaid shirt" |
| portraits/quarryMiners.webp | "a QUARRY MINER with a pickaxe and a chalk-dusted leather apron" |
| portraits/goldMiners.webp | "a GOLD MINER with a lantern helmet and a small nugget pouch, gold glint" |
| portraits/scholars.webp | "a SCHOLAR with round spectacles, quill behind the ear, holding a scroll" |
| portraits/villagers.webp | "a friendly VILLAGER in simple clothes with a woven shawl" |
| portraits/vinekeepers.webp | "a VINEKEEPER with pruning shears and a grape cluster, sun hat" |
| portraits/oreMiners.webp | "an ORE MINER with a heavy hammer and iron-stained apron" |
| portraits/smelters.webp | "a SMELTER worker with soot-marked face, heavy gloves, furnace glow from below" |
| portraits/vintners.webp | "a VINTNER holding a wine glass up to the light, barrel in the background" |
| portraits/innkeepers.webp | "a jovial INNKEEPER with an apron and two foaming mugs" |
| portraits/guards.webp | "a village GUARD with a simple kettle helmet and a spear" |
| portraits/soldiers.webp | "a SOLDIER in chainmail with a shield bearing a coin-and-valley emblem" |

### Priority 5 — optional polish (11 images)

- **Resource icons** (256x256, transparent cutout; replaces emoji):
  food (wheat sheaf + bread), wood (stacked logs), stone (cut blocks),
  gold (coin stack), knowledge (open book + quill), wine (wine jug),
  ore (raw ore chunk), population (two villager silhouettes).
  Prompt: "a single game resource icon of [SUBJECT], painted style matching
  the reference, centered, transparent background, chunky readable
  silhouette at small size, no text."
- **Cottages** (3 variants, small-tier canvas rules, v2 master prefix):
  `cottage-a/b/c.webp` — "a tiny medieval peasant COTTAGE, thatched roof,
  timber-framed, one chimney, a tiny vegetable patch tight against the wall"
  (vary: stone walls / clay walls / attached goat pen).

---

## 5. Totals

| Batch | Count |
|---|---|
| P1: 14 base buildings in v2 style | 14 |
| P2: Town Hall stages | 6 |
| P3: other buildings' stages | 26 |
| P4: worker portraits | 16 |
| P5: optional (icons + cottages) | 11 |
| **Total** | **73** (62 without optional) |

Recommended order: P1 in one long session with the terrain always attached
as style reference (start with Town Hall — it anchors the look), then P2,
then P3 building-by-building, P4/P5 whenever.

## 6. Post-generation pipeline (what happens after you generate an image)

1. Drop the 1024x1024 PNG into `assets/source/buildings/` (or portraits/
   backgrounds accordingly), named exactly as listed.
2. Check the canvas contract: transparent corners, base at 92-96%, content
   ~90% width, NO grass patch. (The converter measures and reports this.)
3. Convert to `.webp` quality 85 into `assets/images/...`:
   `Image.open(src).convert('RGBA').save(dst,'WEBP',quality=85,method=6)`.
4. Refresh the image's `frac`/`pad` numbers in `METRICS` (mockup now,
   town-view runtime later).
