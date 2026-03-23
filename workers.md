# Coinvale Workers

Eesmärk:
- inimesele loetav ulevaade workeritest
- mitte kanoniline dataallikas
- struktureeritud referents elab failis `reference/workers.js`

Pohimotted:
- alguses kannavad mangu starter-jobid
- hiljem liigub fookus hoonete-slotidesse, kaitsele ja spetsialistidele

Workerid:

`Forager`
- roll: starter `Food`
- saadaval: algusest
- marge: outputi tosteti veidi, et early game oleks aktiivsem

`Wood Gatherer`
- roll: starter `Wood`
- saadaval: algusest

`Stone Collector`
- roll: starter `Stone`
- saadaval: algusest

`Farmer`
- roll: toodab `Food` farmide kaudu
- nouab: `Farm`

`Woodcutter`
- roll: toodab `Wood` lumber milli kaudu
- nouab: `Lumber Mill`

`Miner`
- roll: toodab `Stone` ja hiljem `Gold`
- nouab: `Quarry` voi `Gold Mine`

`Scholar`
- roll: toodab `Knowledge`
- nouab: `Scribe Hall`
- upkeep: kasutab `Gold`

`Villagers`
- roll: annavad lisaks koik koos vaikese passiivse `Knowledge` voo
- efekt: iga elanik annab alguses umbes `+0.01/s`

`Guard`
- roll: kulakaitse
- nouab: `Barracks`
- kasutus: aitab peatada voi pehmendada `counter-raid`e

`Soldier`
- roll: expeditionid ja military pressure
- nouab: `Barracks`
- kasutus: vajalik retkedele minekuks

Marge:
- konkreetne unlock / output / upkeep / sloti-voi-vaba-rolli info elab failis `reference/workers.js`
