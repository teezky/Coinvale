# Coinvale Tech Tree

Eesmärk:
- inimesele loetav ulevaade tech tree loogikast
- mitte kanoniline dataallikas
- struktureeritud referents elab failis `reference/techTree.js`

Branchid:

`Food & Growth`
- valdkond: toit, growth, varajane stability
- milestone: `Food Preservation`

`Wood & Craft`
- valdkond: wood flow, workshop synergy, build cost handling
- milestone: `Craftsmanship`

`Stone & Infrastructure`
- valdkond: stone, masonry, logistics
- milestone: `Stonecutting`

`Military & Expeditions`
- valdkond: expedition success, duration, losses, defense support
- milestone: military reliability

`Trade & Gold`
- valdkond: `Gold`, traderid, hilisem economy
- milestone: `Gold Mining`

Olulised progressioni punktid:
- `Food Preservation`
  - avab varase tree progressi
  - seob endaga `Granary` ja varasema `Scribe Hall`i
- `Craftsmanship`
  - avab `Workshop`i
- `Storehouse Planning`
  - avab `Warehouse`i
- `Gold Mining`
  - avab gold economy

Praegune UI suund:
- kompaktne node-vaade
- node all on nimi
- detailne info on tooltipis
- kogu branchi tulevased node'id on samuti nahtavad
- vahemaid ja node suurusi tihendati, et rohkem tree'd korraga ara mahuks

Knowledge loogika:
- `Knowledge` ei tule ainult `Scribe Hall`ist ja `Scholar`itest
- alguses annab ka elanike arv vaike passiivse research-voo

Marge:
- konkreetne node-by-node struktureeritud referents elab failis `reference/techTree.js`
