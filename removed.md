# Coinvale Removed Or Dropped

Eemaldatud voi maha voetud lahendused:
- `House` eemaldati eraldi ehitisena.
- `Town Hall` votis ule vana population-building rolli.
- vana multi-building loogika eemaldati:
  - enam ei ehitata mitut sama hoonet
  - uus suund on `1 hoone tyyp / levelid / worker slider`
- Eraldi `Production Breakdown` kaart eemaldati.
- Sidebari `Village Summary` eemaldati tervikuna.
- Top `Village Snapshot` eemaldati.
- `Settlement Focus` eemaldati.
- Eraldi top `Net Production` plokk eemaldati.
- Vana lineaarsem `Knowledge` / `Expansion` research-list asendati branch-pohise prerequisite-tree'ga.
- vana `+ / -` workerite jagamise UI asendati slideritega.
- `Clay` eemaldati planeeritud ressursina.

Muudatused, mis loobusid varasemast lahendusest:
- Hoonete upgrade ei ole enam kogu tuubi uhine level:
  - praegune suund on unikaalhooned kuni `Lv20`
- `Workshop` ei anna enam umbmaarast `all village output` buffi:
  - boonus rakendub nuud buildingute baastoodangule

Miks see fail olemas on:
- hoida alles meeles, millest on juba loobutud
- valja filtreerida ideed, mis ei peaks kogemata tagasi tulema
- lihtsustada otsuste ajaloo lugemist
