# Coinvale Buildings

Eesmärk:
- inimesele loetav ulevaade hoonetest
- mitte kanoniline dataallikas
- struktureeritud referents elab failis `reference/buildings.js`

Pohimotted:
- koik hooned on nuud unikaalsed
- igat hoonet saab korraga olla `1`
- `Town Hall` liigub kuni `Level 30`
- muud hooned liiguvad kuni `Level 50`
- workeritega hoonete worker-cap tuleb hoone levelist
- workerite jagamine kaib slideritega

Kategooriad:

`Town Hall`
- roll: population core, growth telg, kogu village progression
- eripara: algab mangus olemasolevana
- progression: gating teiste hoonete levelite kaudu

`Farm`
- roll: peamine `Food` estate
- annab: base food + `Farmer` capacity

`Lumber Mill`
- roll: peamine `Wood` tootmine
- annab: base wood + `Woodcutter` capacity

`Quarry`
- roll: peamine `Stone` tootmine
- annab: base stone + `Quarry Miner` capacity

`Workshop`
- roll: economy efficiency ja buildingute baastoodangu tugi
- eripara: workerita utility-hoone

`Scribe Hall`
- roll: `Knowledge` economy kese
- annab: base knowledge + `Scholar` capacity
- unlock: `Gold Mining` + `Town Hall Lv4`, et hoone ei oleks enne kullamajandust poolik

`Barracks`
- roll: `Guard` ja `Soldier` rollide kodu
- kasutus: expeditionid ja village defense

`Warehouse`
- roll: global storage multiplier
- eripara: workerita utility-hoone
- town hall gate: `TH 2`
- markus: kasutab nuud tugevamat milestone-storage skaalat, mitte vana vaikest lineaarset kasvu
- markus: toodud varasemaks, et `Town Hall` upgrade ei jaaks lao mahu taha kinni

`Gold Mine`
- roll: `Gold` economy tootmine
- annab: base gold + `Gold Miner` capacity
- town hall gate: `TH 5`

`Vineyard`
- roll: varajane luksusmajanduse kiht
- annab: base wine + `Vinekeeper` capacity
- town hall gate: `TH 10`

`Winery`
- roll: parem `Wine` throughput ja luxury support
- annab: `Vintner` capacity
- town hall gate: `TH 12`

`Ore Pit`
- roll: `Ore` extraction
- annab: `Ore Miner` capacity
- town hall gate: `TH 12`

`Smelter`
- roll: `Metal` tootmine
- annab: `Smelter` capacity
- kasutab upkeep'ina `Ore`
- town hall gate: `TH 14`

`Tavern`
- roll: `Happiness` support
- annab: `Innkeeper` capacity
- kasutab `Wine`i ja toetab population growthi
- town hall gate: `TH 15`

Marge:
- konkreetne unlock / cost / slots / upkeep / notes referents elab failis `reference/buildings.js`
