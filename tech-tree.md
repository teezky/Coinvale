# Coinvale Tech Tree

Eesmärk:
- inimesele loetav ulevaade tech tree loogikast
- mitte kanoniline dataallikas
- struktureeritud referents elab failis `reference/techTree.js`

Branchid:

`Food & Growth`
- toit, village stability, health ja growth support
- algab nuud `Field Rotation` node'iga

`Craft & Timber`
- wood flow, craft, `Workshop` ja tootmise tugevdamine

`Stone & Storage`
- quarry, masonry, storage ja logistics
- avab `Warehouse`i ning storage-cap boonuslogika

`Knowledge & Civic`
- `Knowledge` enne, siis `Wine`, alles seejarel `Happiness`

`Military & Expeditions`
- expedition success, defense, guards, counter-raid mitigation

`Trade & Metals`
- `Gold`, `Ore`, `Metal`, trade efficiency ja hilisem majanduskiht

Olulised node-milestone'id:
- `Field Rotation`
  - avab varase farmi tugevnemise
- `Craftsmanship`
  - avab `Workshop`i
- `Storehouse Planning`
  - avab `Warehouse`i
- `Planning Office`
  - vahendab buildingute `Wood` ja `Stone` kulusid
- `Measured Masonry`
  - vahendab buildingute `Stone` kulusid
- `Viticulture`
  - avab `Vineyard`i
  - sellest alates muutub `Happiness` sisuliselt aktiivseks kihiks
- `Vintage Press`
  - avab `Winery`
- `Tavern Culture`
  - avab `Tavern`
- `Gold Mining`
  - avab `Gold Mine`
- `Ore Extraction`
  - avab `Ore Pit`
- `Smithing`
  - avab `Smelter`

Praegune UI suund:
- kompaktne node-vaade
- node all on nimi
- detailne info on tooltipis
- kogu branchi tulevased node'id on nahtavad
- nii horisontaalne kui vertikaalne progression nouavad prerequisite'e
- tree kasutab nuud suuremat laiust kui varem

Knowledge loogika:
- `Knowledge` ei tule ainult `Scribe Hall`ist ja `Scholar`itest
- alguses annab ka elanike arv vaikese passiivse research-voo

Olulised gating-pohimotted:
- `Gold Mining` tuleb piisavalt vara, et `Lv5-6` building upgrade'id ei jaaks kulla taha kinni
- `Scribe Hall` ei avane enne `Gold Mining`ut, et `Scholar`i kullaupkeep ei jaaks poolikuks susteemiks
- osa hilisemaid node'e nouab lisaks prerequisite'idele ka kindlat `Town Hall` levelit
- `Happiness` ei ole sisuliselt mangija juhitav enne `Viticulture -> Vintage Press -> Tavern Culture` ahelat
- research cost skaleerub nuud branchi sugavuse ja samas harus juba uuritud node'ide arvu jargi

Marge:
- konkreetne node-by-node struktureeritud referents elab failis `reference/techTree.js`
