# Coinvale Implemented

Projekt:
- Single-file browser game failis `index.html`
- Mangu nimi: `Coinvale`

Praegu mangus olemas:
- start = `4` elanikku
- random eventid on umbes `20%` harvemad
- `Happiness` on mangus sees ja mojub population growthile
- `Happiness` on nuud sisuliselt lukus kuni `Wine` economy (`Viticulture`) on avatud

Ressursid:
- `Food`
- `Wood`
- `Stone`
- `Gold`
- `Ore`
- `Metal`
- `Wine`
- `Knowledge`
- koik ressursid kuvatakse nuud ressursireas algusest peale
- lukus ressursid on tuhmid, ei tooda ega tarbi midagi enne oma unlocki
- igal ressursil on nuud vaike ikoon
- `Knowledge` kuvatakse reas viimasena, et jaada eraldi progression-valuutana tajutavaks
- `Knowledge` base cap algab nuud `120` pealt, et varane research economy ei jaaks liiga kitsaks
- `Knowledge` cap kasvab nuud tugevamalt koos `Town Hall`i ja `Scribe Hall`iga, et hilisemate fikseeritud research costide jaoks saaks varu koguda

Economy ja progression:
- `Knowledge` saab varakult alguse:
  - iga villager annab `+0.01/s`
- `Scribe Hall` avaneb nuud alles parast `Gold Mining`ut ja `Town Hall Lv4` juures
- `Scholar` muutub saadavaks alles siis, kui `Gold` economy on unlockitud
- `Gold Mining` ise ei noua uurimiseks kulda
- kullaga seotud hilisemad techid tahavad nuud rohkem `Gold`i kui varem
- expedition resource-rewardid skaleeruvad lao suuruse jargi
- core economy sai uue aeglustuspassi:
  - `Farm`, `Lumber Mill` ja `Quarry` toodavad nuud veidi vahem
  - nende upgrade-cost curve on nuud jarsem
  - `Town Hall` upgrade-cost curve on veelgi pidulikum ja kallim
  - populationi ja military `Food` upkeep surub nuud economy't rohkem
  - expeditionite resource-rewardid on nuud tagasihoidlikumad
- jargmises passis tombasime economy't veel rohkem tagasi:
  - `Farmer`, `Woodcutter` ja `Quarry Miner` tootlus langes uuesti
  - hoonete level-multiplier ja `Workshop` village-efficiency langesid
  - buildingute `Wood` upkeep kasvas jarsemaks ja muutus lopuks päris kuluks
- `Tech Tree` research cost on nuud fikseeritud ja ette nahtav
  - see soltub node'i enda sygavusest ja tierist
  - see ei muutu jooksvalt selle jargi, mitu node'i samas harus juba uuritud on
- iga jargmine sygavam node maksab nuud tuntavalt rohkem kui eelmine, aga `Knowledge` cap growthi toodi sellele jarele
- `Scholar` gold upkeep on nuud veidi pehmem (`0.05/s`)
- `Guard` ja `Soldier` `Food` upkeep on nuud uuesti tuntavam (`0.18/s` ja `0.24/s`)
- `Guard` ja `Soldier` `Food` upkeep sai veel kord tugevamaks (`0.20/s` ja `0.26/s`)
- `Warehouse` tuleb nuud varem (`Town Hall Lv2`), et storage ei blokiks varaseid `Town Hall` upgrade'e
- `Warehouse` storage-kasv on nuud pehmem kui viimases liiga heldes versioonis, et ladu ei vabastaks economy't liiga kiiresti
- `Ore Pit` tuleb nuud `Town Hall Lv10` juures, et `Town Hall` progression ei satuks ore-gatinguga ummikusse

Hooned:
- `Town Hall` on alati olemas ja on kogu village progressioni kese
- koik hooned on nuud unikaalsed:
  - igat hoonet saab olla korraga ainult `1`
  - `Town Hall` max level = `30`
  - muud hooned max level = `50`
- workeritega hoonete tootmine kasvab:
  - hoone leveliga
  - workerite arvuga
  - tech- ja workshop-bonustega
- workerite jagamine kaib slideriga
- build-kaardil:
  - enne ehitamist on `Build Cost`
  - peale ehitamist jaab alles ainult `Upgrade Cost`
  - `Current Effect` naitab nuud current-level outputit ja worker-cap'i
  - `Next Step` naitab jargmise leveli peamist outputit ja capacity't

Praegu sees olevad hooned:
- `Town Hall`
- `Farm`
- `Lumber Mill`
- `Quarry`
- `Workshop`
- `Scribe Hall`
- `Barracks`
- `Warehouse`
- `Gold Mine`
- `Vineyard`
- `Winery`
- `Ore Pit`
- `Smelter`
- `Tavern`

Workerid:
- starter-rollid:
  - `Forager`
  - `Wood Gatherer`
  - `Stone Collector`
- hoonepoohised rollid:
  - `Farmer`
  - `Woodcutter`
  - `Quarry Miner`
  - `Gold Miner`
  - `Scholar`
  - `Vinekeeper`
  - `Ore Miner`
  - `Smelter`
  - `Vintner`
  - `Innkeeper`
- kaitse ja military:
  - `Guard`
  - `Soldier`

UI ja UX:
- ressursikastid naitavad tavaolekus:
  - `Net`
  - ladustumise / tyhjenemise aega
- tooltipid naitavad detailset income/upkeep breakdowni
- puuduvad ressursid on build, upgrade ja research costides punased
- `Tech Tree` on kompaktne node-vaade kogu branchi ulatuses
- event modal on tech tree kohal, mitte selle all
- town scene naitab iga ehitatud hoonet eraldi sprite'ina ja level-badge'iga
- town scene alal saab nuud oma kulale nime anda ning see salvestub save'i sisse
- kula nimi on scene-paneelis nuud keskelt joondatud
- reseti voi paris uue mangu alguses tuleb kula nime popup ette mangusisese modalina kohe esimese sammuna
- kui `Happiness` ei ole veel aktiivne, naitab UI nuud selgemalt, et see avaneb veini economy kaudu
- ressursirea tooltipid ei kao nuud iga tikiga ara, vaid jaavad mouseoveri all nahtavaks
- ressursikastid on nuud veidi laiemad, et pikemad nimed nagu `Knowledge` mahuksid puhtamalt ara

Tech tree:
- branchid:
  - `Food & Growth`
  - `Craft & Timber`
  - `Stone & Storage`
  - `Knowledge & Civic`
  - `Military & Expeditions`
  - `Trade & Metals`
- nii horisontaalne kui vertikaalne unlock on prerequisite-pohine
- tulevased node'id on kogu aeg nahtavad
- tree sisu on korrastatud ette valmistama:
  - `Wine`
  - `Ore`
  - `Metal`
  - `Happiness`
- eemaldatud on vanad `Granary` / `Chicken Coop`i hoidnud node'id
- lisatud on varased `Field Rotation` ja cost-reduction node'id nagu `Measured Masonry` ja `Planning Office`

Expeditionid ja kaitse:
- expeditionidel on provisions-cost
- expeditionid annavad storage-scaled rewarde
- failed expedition voib vallandada `counter-raid`i
- `Guard` aitab raid'i ara hoida voi kahju vahendada
- random eventid voivad nuud anda voi votta ka `Gold`i

Trader:
- trader ei paku enam ainult lihtsat kolme vahetust
- barter voib nuud vahetada eri ressursse laiemalt ristisuunas
- kui `Knowledge` economy on kaivitatud, voib trader pakkuda ka otseseid `Knowledge` tehinguid

Town Hall:
- max leveli disainisiht = `30`
- population/growth telg kasutab `Level^1.5` laadi kasvu
- upgrade'id on gated teiste hoonete levelitega

Praegused valemisuunad runtime'is:
- tavahoonete upgrade cost kasutab nuud eraldi jarsema kasvuga skaalat
- `Town Hall` upgrade cost kasutab tavahoonetest kallimat eraldi skaalat
- `Town Hall` population cap liigub `30 + 6 * Level^1.5` suunas
- `Warehouse` kasutab nuud tugevamat `floor(180 + 95 * level^1.2)` storage-kasvu
- osa hooneid ja tech node'e on seotud kindla `Town Hall` leveli noudega

Viimane balance-pass:
- season-susteem eemaldati praktilisest gameplayst
- `Town Hall` piirab nuud pehmelt teiste hoonete upgrade-tempot
- `Farm`, `Lumber Mill`, `Quarry`, `Gold Mine`, `Knowledge` ja veiniahel toodavad nuud vaiksemalt
- `Workshop` annab nuud vaiksema village-efficiency iga leveliga
- resource-output tech node'id annavad nuud vaiksemaid boonuseid
- building wood upkeep kasvab nuud leveliga tuntavamalt
- building gold upkeep ja gold-cost gating nihutati hilisemaks ning tehti pehmemaks
- `Warehouse` storage-koverat tosteti, et `Town Hall` upgrade'id ei jaaks lao mahust ette
