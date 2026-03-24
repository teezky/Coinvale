# Coinvale Handoff

Projekt:
- Single-file browser game failis `index.html`
- Mangu nimi: `Coinvale`

Olulised kokkulepped:
- Arutame muudatused enne labi.
- Koodi muudame alles siis, kui kasutaja utleb selgelt midagi stiilis `tee ara`, `muuda koodis`, `implementeeri`.
- Koik seotud markdown- ja `reference/*.js` failid tuleb hoida sama passi jooksul ajakohased.

Praegune seis:
- Mang liigub nuud selgelt `Ikariam + Melvor Idle` suunas, kerge `Farthest Frontier` loogikakihiga.
- Algus on aktiivsem:
  - start = `4` elanikku
  - random eventid on umbes `20%` harvemad
  - `Forager` ja `Farm` on tugevamad kui varem
- Ressursikastid kuvavad tavaolekus `Net` ja ladustumise aja ning tooltipis detailset income/upkeep breakdowni.
- koik ressursid on nuud reas algusest peale nahtavad:
  - lukus ressursid on tuhmid
  - neil on tooltipis unlock-juhis
  - `Knowledge` on reas viimane
- `Knowledge` tuleb varakult:
  - iga elanik annab vaikese passiivse research-voo
  - `Scribe Hall` on nuud toodud kulla taha, et `Scholar` ei jaaks poolikuks unlockiks
  - `Scholar` on saadaval alles siis, kui `Gold` economy on reaalselt avatud
  - `Knowledge` base cap algab nuud `120` pealt
  - `Knowledge` cost kasvab nuud puus edasi liikudes tugevamalt
  - samal ajal kasvab `Knowledge` cap nuud agressiivsemalt `Town Hall`i ja `Scribe Hall`iga kaasa
- Hoonemudel on nuud unikaalhoonete peale keeratud:
  - igat hoonet saab olla korraga `1`
  - `Town Hall` liigub kuni `Level 30`
  - muud hooned liiguvad kuni `Level 50`
  - workeritega hooned annavad tootmist ja worker-cap'i leveli kaudu
- Workerite jagamine kaib nuud slideritega.
- scene-paneelis saab mangija nuud oma kulale nime anda ja see jaab save'i alles
- kula nimi on scene-paneelis nuud keskel Town Halli kohal, mitte vasakus servas
- reseti voi taiesti uue mangu alguses kusitakse kula nimi mangusisese modaliga kohe ette
- `Town Hall` on kogu progressioni kese:
  - max leveli siht = `30`
  - population/growth loogika kasutab `Level^1.5` kasvu
  - upgrade'id on gated teiste hoonete levelitega
- `Growth` pause nupp eemaldati, et population growth ei saaks kogemata kogu loopi segada.
- Building kaartidel:
  - `Current Effect` naitab nuud tegelikku current-level seisu
  - `Next Step` naitab selgemalt jargmise leveli base effecti ja worker-cap'i
- `Tech Tree` on nuud:
  - taiema laiuse node-vaade
  - tulevased node'id on nahtavad
  - nii horisontaalne kui vertikaalne progression nouab prerequisite'e
  - branchid on `Growth`, `Craft`, `Stone`, `Civic`, `Military`, `Trade`
  - research cost on fikseeritud ja ette nahtav node'i enda sygavuse ja tieri jargi
- Expeditionid skaleeruvad nuud rohkem lao suurusega ning failed expedition voib vallandada `counter-raid`i.
- Mangu lisati uued majanduskihid:
  - `Wine`
  - `Ore`
  - `Metal`
  - `Happiness` mojub hetkel ainult population growthile ja avaneb sisuliselt alles `Wine` economy järel
- `Granary` ja `Chicken Coop` on runtime'ist maha voetud
- `Warehouse` on nuud selgem milestone-hoone tugevama storage-kasvuga
- viimane balance-pass tommas `Warehouse`i hilisemat kasvu veidi tagasi, et storage ei vabastaks economy't liiga vara
- `Warehouse` toodi varasemaks (`TH 2`), et storage ei jaaks varase `Town Hall` pushi vastu tootlema
- `Ore Pit` toodi build-gate'i poolest `TH 10` peale, et `Town Hall 11+` progression ei jaaks deadlocki
- osa hooneid ja tech node'e nouavad nuud kindlat `Town Hall` levelit
- varajast food / gold upkeepi on kergelt pehmendatud, et kasv ja esimesed specialist-rollid ei jaaks liiga kergelt kinni
- viimane economy-pass:
  - tombas `Farm`, `Lumber Mill`i ja `Quarry` tootmist alla
  - tegi core building upgrade'id kallimaks
  - tegi `Town Hall`i veelgi kallimaks milestone-hooneks
  - tostis villagers / guards / soldiers `Food` survet
  - tombas expeditionite resource-rewarde tagasi
  - aeglustas `Knowledge` gaini, et research ei jookseks liiga lihtsalt yle
- sellele jargnenud tuning-pass:
  - tombas `Farmer`, `Woodcutter`i ja `Quarry Miner`i tootlust veel alla
  - vahendas `Workshop`i village-efficiency ja kogu building-level multiplierit
  - tostis buildingute `Wood` upkeepi, et see ei oleks enam naljanumber
  - parandas tooltipi püsivuse renderite vahel
  - tegi ressursirea kastid veidi ruumikamaks
- random eventid voivad nuud anda voi votta ka `Gold`i
- trader pakub nuud laiemat barterit ning voib vahel vahetada ka `Knowledge`it

Peamised failid:
- [index.html](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/index.html)
- [instructions.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/instructions.md)
- [implemented.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/implemented.md)
- [roadmap.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/roadmap.md)
- [removed.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/removed.md)
- [buildings.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/buildings.md)
- [workers.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/workers.md)
- [tech-tree.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/tech-tree.md)
- [reference/buildings.js](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/reference/buildings.js)
- [reference/workers.js](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/reference/workers.js)
- [reference/techTree.js](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/reference/techTree.js)

Praegune jargmine teema:
- teha uus balance-pass:
  - kontrollida brauseris, kas uus aeglasem economy tempo tundub nyyd parem
  - vaadata, kas `Knowledge` cap ja research cost kasv jooksevad kokku ilma ummikuteta
- kontrollida brauseris, kas uus `Town Hall` / build / tech gating tunneb end UX-i moistes loogiliselt
- otsustada, millal lisada eraldi building art failid praeguste sprite'ide asemele voi peale
- hinnata, kas ja millal hakata runtime'i samm-sammult `reference/*.js` andmete peale tooma

Kui alustad uut vestlust, void kasutada seda prompti:

```text
Projekt on single-file browser game "Coinvale" failis index.html.

Palun loe esmalt handoff.md ja jatkame sealt.

Oluline kokkulepe:
- Arutame muudatused enne labi.
- Koodi muuda alles siis, kui utlen selgelt "tee ara".
- Kui midagi muudad, hoia seotud markdownid ja reference-failid sama passiga kursis.
```

Markus:
- Selles keskkonnas ei olnud saadaval brauseri runtime kontrolli, seega muudatused vaadati ule loogika- ja sisutasemel, mitte live-testiga.
