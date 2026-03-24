# Coinvale Workers

Eesmärk:
- inimesele loetav ulevaade workeritest
- mitte kanoniline dataallikas
- struktureeritud referents elab failis `reference/workers.js`

Pohimotted:
- alguses kannavad mangi starter-jobid
- hiljem liigub fookus unikaalhoonete worker-cap'i sisse
- workerite jagamine kaib slideritega
- osad rollid on `free`, osad on `slot`-pohised

Starter-rollid:

`Forager`
- roll: starter `Food`
- saadaval: algusest

`Wood Gatherer`
- roll: starter `Wood`
- saadaval: algusest

`Stone Collector`
- roll: starter `Stone`
- saadaval: algusest

Hoonetega seotud tootmisrollid:

`Farmer`
- nouab: `Farm`
- tootab `Food`

`Woodcutter`
- nouab: `Lumber Mill`
- tootab `Wood`

`Quarry Miner`
- nouab: `Quarry`
- tootab `Stone`

`Gold Miner`
- nouab: `Gold Mine` + `Gold Mining`
- tootab `Gold`

`Scholar`
- nouab: `Scribe Hall` + toimiv `Gold` economy
- tootab `Knowledge`
- upkeep: kasutab `Gold`

`Vinekeeper`
- nouab: `Vineyard`
- toetab `Wine` economy't

`Ore Miner`
- nouab: `Ore Pit`
- tootab `Ore`

`Smelter`
- nouab: `Smelter`
- tootab `Metal`
- upkeep: kasutab `Ore`

`Vintner`
- nouab: `Winery`
- parandab `Wine` throughput'i

`Innkeeper`
- nouab: `Tavern`
- kasutab `Wine`i
- toetab `Happiness`it ja sealt kaudu growthi

Population ja military:

`Villager`
- passiivne efekt: iga elanik annab umbes `+0.01/s` `Knowledge`it

`Guard`
- nouab: `Barracks`
- aitab peatada voi pehmendada `counter-raid`e

`Soldier`
- nouab: `Barracks`
- vajalik expeditionitele

Marge:
- konkreetne unlock / output / upkeep / slotType info elab failis `reference/workers.js`
