# Coinvale

`Coinvale` on single-file browser game prototuup, mille pohiline runtime elab failis `index.html`.

Projekt uhendab:
- idle / resource management loopi
- unikaalsed upgrade'itavad hooned
- worker-sliderid
- expeditionid, random eventid ja village defense'i
- branch-pohise node-vaatega `Tech Tree`
- inimesele loetava dokumentatsiooni
- struktureeritud referentsifailid tuleviku jaoks

## Projekti seis

Praegu on mangus olemas:
- ressursid `Food`, `Wood`, `Stone`, `Gold`, `Knowledge`, `Ore`, `Metal`, `Wine`
- `Town Hall`-pohine population progression
- uks hoone igast tuubist, max leveli sihiga `20`
- workerid, sh `Scholar`, `Guard`, `Soldier`, `Vinekeeper`, `Ore Miner`, `Smelter`, `Vintner`, `Innkeeper`
- expeditionid koos storage-scaled rewardide ja `counter-raid` loogikaga
- random eventid ja trader
- save / migration / offline progress
- kompaktne taislaiuses node-pohine `Tech Tree`
- `Happiness`, mis mojub villager growthile

## Kaivitamine

See projekt ei vaja build-susteemi.

Avamiseks:
1. ava fail `index.html` brauseris
2. mang kaivitub otse samast failist

## Failistruktuur

Pohifailid:
- `index.html` - mangu runtime ja pohiline loogika
- `formulas.md` - peamised balansivalemid ja progressionireeglid
- `handoff.md` - luhike hetkeseis ja jargmine teema
- `implemented.md` - mis on pariselt mangus olemas
- `roadmap.md` - jargmised teemad ja balansifookus
- `removed.md` - eemaldatud voi mahavoetud lahendused
- `instructions.md` - projekti tooreeglid

Susteemidokid:
- `buildings.md`
- `workers.md`
- `tech-tree.md`

Struktureeritud referents:
- `reference/buildings.js`
- `reference/formulas.js`
- `reference/workers.js`
- `reference/techTree.js`

## Dokumentatsiooni loogika

Projekt kasutab kahte kihti:

1. inimesele loetav dokumentatsioon `*.md`
2. struktureeritud referents `reference/*.js`

Oluline pohimote:
- kui susteem muutub, tuleb nii dokumentatsioon kui referents koos ajakohastada

## Toovoog

Selles projektis kehtib kokkulepe:
- muudatused arutatakse enne labi
- koodi muudetakse alles siis, kui on selge kinnitus stiilis `tee ara`
- parast muudatusi tuleb seotud markdown- ja reference-failid uuendada

Tapsemad reeglid on kirjas failis `instructions.md`.

## Jargmised teemad

Hetkel on pohirohk:
- economy balance-pass
- `Food`, `Warehouse` ja upgrade-costide tuning
- `Wine` ja `Metal` economy tempo
- voimalik hilisem liikumine `reference`-pohisema arhitektuuri poole

## GitHubi jaoks

Kui tahad selle projekti GitHubi ules panna, vaata ka faili `github-upload.md`.
