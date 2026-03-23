# Coinvale

`Coinvale` on single-file browser game prototüüp, mille põhiloogika elab failis `index.html`.

Projekt ühendab:
- idle / resource management loopi
- hooned ja workerid
- expeditionid ja random eventid
- branch-põhise `Tech Tree`
- inimesele loetava dokumentatsiooni
- struktureeritud referentsifailid tuleviku tarbeks

## Projekti seis

Praegu on mängus olemas:
- ressursid `Food`, `Wood`, `Stone`, `Gold`, `Knowledge`
- `Town Hall`-põhine population progression
- hoonete individuaalsed levelid
- workerid, sh `Scholar`, `Soldier`, `Guard`
- expeditionid koos riskide ja `counter-raid` loogikaga
- random eventid ja trader
- save / migration / offline progress
- kompaktne node-põhine `Tech Tree`

## Käivitamine

See projekt ei vaja build-süsteemi.

Avamiseks:
1. ava fail `index.html` brauseris
2. mäng käivitub otse samast failist

## Failistruktuur

Põhifailid:
- `index.html` - mängu runtime ja kogu põhiloogika
- `handoff.md` - lühike hetkeseis ja järgmine teema
- `implemented.md` - mis on päriselt mängus olemas
- `roadmap.md` - järgmised teemad ja balansifookus
- `removed.md` - eemaldatud või mahavõetud lahendused
- `instructions.md` - projekti tööreeglid

Süsteemidokid:
- `buildings.md`
- `workers.md`
- `tech-tree.md`

Struktureeritud referents:
- `reference/buildings.js`
- `reference/workers.js`
- `reference/techTree.js`

## Dokumentatsiooni loogika

Projekt kasutab kahte kihti:

1. inimesele loetav dokumentatsioon `*.md`
2. struktureeritud referents `reference/*.js`

Oluline põhimõte:
- kui süsteem muutub, tuleb nii dokumentatsioon kui referents koos ajakohastada

## Töövoog

Selles projektis kehtib kokkulepe:
- muudatused arutatakse enne läbi
- koodi muudetakse alles siis, kui on selge kinnitus stiilis `tee ära`
- pärast muudatusi tuleb seotud markdown- ja reference-failid uuendada

Täpsed reeglid on kirjas failis `instructions.md`.

## Järgmised teemad

Hetkel on põhirõhk:
- expeditionide balanss
- `Guard` kaitseväärtused
- varase mängu tempo
- tulevikus võimalik samm-sammuline liikumine `reference`-põhisema arhitektuuri poole

## GitHubi jaoks

Kui tahad selle projekti GitHubi üles panna, vaata ka faili `github-upload.md`.
