# Coinvale Buildings

Eesmärk:
- inimesele loetav ulevaade hoonetest
- mitte kanoniline dataallikas
- struktureeritud referents elab failis `reference/buildings.js`

Pohimotted:
- `Town Hall` on keskne progression-hoone ja population cap tuleb sealt
- tootmishooned on `Farm`, `Lumber Mill`, `Quarry`, `Gold Mine`
- utility-hooned on enamasti unikaalsed ja nende progression kaib upgrade'ide kaudu

Hooned:

`Town Hall`
- roll: settlementi kese, population cap, growth support, tier progression
- eripara: algab mangus juba olemasolevana
- progression: upgrade on gated teiste hoonete levelitega

`Farm`
- roll: peamine varajane ja keskmine `Food` tootmine
- annab: base output + `Farmer` slotid
- marge: baastoodangut tosteti veidi, et start oleks sujuvam

`Lumber Mill`
- roll: peamine `Wood` tootmine
- annab: base output + `Woodcutter` slotid

`Quarry`
- roll: peamine `Stone` tootmine
- annab: base output + `Miner` slotid

`Granary`
- roll: `Food` storage ja hard-season safety
- eripara: unikaalne utility-hoone

`Chicken Coop`
- roll: passiivne lisatoit
- kasutus: secondary `Food` support

`Workshop`
- roll: buildingute baastoodangu boonus
- eripara: ei buffi enam kogu kulatootmist umbmaaraselt

`Scribe Hall`
- roll: `Knowledge` economy algus
- annab: base `Knowledge` + `Scholar` slotid
- eripara: toodud varasemasse progressioni

`Barracks`
- roll: avab `Soldier` ja `Guard` rollid
- seos: vajalik expeditioni- ja kaitsesusteemide jaoks

`Warehouse`
- roll: lai storage boost
- eripara: unikaalne utility-hoone

`Gold Mine`
- roll: `Gold` economy tootmishoone
- annab: base `Gold` + `Miner` slotid

Marge:
- konkreetne unlock / cost / slot / upkeep / info referents elab failis `reference/buildings.js`
