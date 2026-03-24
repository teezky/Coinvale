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
- `Knowledge` tuleb varakult:
  - iga elanik annab `+0.01/s`
  - `Scribe Hall` on nuud toodud kulla taha, et `Scholar` ei jaaks poolikuks unlockiks
  - `Scholar` on saadaval alles siis, kui `Gold` economy on reaalselt avatud
  - `Knowledge` base cap algab nuud `120` pealt
- Hoonemudel on nuud unikaalhoonete peale keeratud:
  - igat hoonet saab olla korraga `1`
  - `Town Hall` liigub kuni `Level 30`
  - muud hooned liiguvad kuni `Level 50`
  - workeritega hooned annavad tootmist ja worker-cap'i leveli kaudu
- Workerite jagamine kaib nuud slideritega.
- scene-paneelis saab mangija nuud oma kulale nime anda ja see jaab save'i alles
- reseti voi taiesti uue mangu alguses kusitakse kula nimi popupiga kohe ette
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
  - research cost skaleerub branchi sugavuse ja samas harus juba uuritud node'ide arvu jargi
- Expeditionid skaleeruvad nuud rohkem lao suurusega ning failed expedition voib vallandada `counter-raid`i.
- Mangu lisati uued majanduskihid:
  - `Wine`
  - `Ore`
  - `Metal`
  - `Happiness` mojub hetkel ainult population growthile ja avaneb sisuliselt alles `Wine` economy järel
- `Granary` ja `Chicken Coop` on runtime'ist maha voetud
- `Warehouse` on nuud selgem milestone-hoone tugevama storage-kasvuga
- `Warehouse` toodi varasemaks (`TH 2`), et storage ei jaaks varase `Town Hall` pushi vastu tootlema
- osa hooneid ja tech node'e nouavad nuud kindlat `Town Hall` levelit
- varajast food / gold upkeepi on kergelt pehmendatud, et kasv ja esimesed specialist-rollid ei jaaks liiga kergelt kinni
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
  - `Food` scaling
  - `Warehouse` / storage scaling
  - `Town Hall` ja teiste hoonete upgrade-costid
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
