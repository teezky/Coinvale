# Coinvale Roadmap

Praegune disainisuund:
- Mangu pohitelg on `Ikariam + Melvor Idle`
- `Farthest Frontier` annab juurde loogikat ja usutavust, aga mitte karmi survival-karistust
- Eesmargiks on loetav idle-flow:
  - kasv
  - luksusmajandus
  - tech-progression
  - village identity

Praegune jargmine teema:
- teha tugev balance-pass praegusele economy'le enne jargmist suurt sisulaiendust
- kontrollida peale viimast aeglustuspassi, kas:
  - core ressursid ei jookse enam liiga vara lakke
  - `Town Hall` ja core-hoonete levelid ei touse liiga kiiresti
  - `Knowledge` cost kasv ja cap growth jaavad omavahel kokku

Lahiaja prioriteedid:
1. `Food` scaling parast `Granary` / `Chicken Coop` eemaldust
2. kontrollida brauseris, kas uus `Scribe Hall -> Gold Mining` gating tundub hea
3. hinnata, kas uus fikseeritud tech-tree cost mudel vajab veel peenhaalestust branchide kaupa
4. `Town Hall` ja building upgrade-costide tuning
5. `Wine`, `Ore`, `Metal` economy kihtide tempotest
6. expedition rewardide ja `Guard` kaitsevaartuste tuning
7. worker-cap growthi ja role-based capacity tuning
8. hinnata, kas uued traderi barterid ja gold-eventid jaavad piisavalt relevantseks eri mangufaasides

Olulised tasakaaluteemad:
- `Food` peab jaama oluliseks, aga early game ei tohi olla liiga karistav
- starter-workerid ei tohi muutuda liiga vara taitsa mõttetuks
- `Warehouse` peab tunduma oluline milestone, aga storage ei tohi teha early game'i liiga vabaks
- `Gold` peab olema midgame'is oluline, aga ei tohi lukustada researchi liiga vara kinni
- `Happiness` peab hoidma growthi juhitavana, mitte muutuma veel üheks liigseks mikronumbriks
- koik ressursid peavad reas ette nahtavad olema, aga lukus kihid ei tohi enne unlocki midagi teha

Jargmised toenalolised gameplay-teemad:
- `Town Hall 1-30` progressioni peenhaalestus
- buildingute `Level 1-50` scalingu ja worker-cap kasvu balanss
- building art / tugevamad pildilised hoonevariandid praeguste sprite'ide asemele voi peale
- `Wine` economy parem chain:
  - `Vineyard`
  - `Winery`
  - `Tavern`
- `Metal` economy parem chain:
  - `Ore Pit`
  - `Smelter`
  - hiljem voimalikud `Tools` voi `Weapons`
- starter-jobide lopliku rolli otsustamine
- rohkem chain-evente ja stage'itud expedition milestone'e

UX teemad:
- vaadata ule, kas worker sliderite lugemine on piisavalt selge suurema populationi juures
- hinnata, kas tech tree branch spacing vajab veel uht polish-passi
- vajadusel teha ressursi tooltipid veel kompaktsemaks, kui uusi ressursse lisandub juurde
- otsustada, kas kula nime juures on hiljem vaja ka visuaalset crest'i voi bannerit

Arhitektuuri teemad:
- otsustada, millal ja kuidas tuua runtime samm-sammult `reference/*.js` peale
- hoida dokumentatsioon ja referents alati sama seisuga kui `index.html`

Voimalikud lisalogid tulevikus:
- `decisions.md` suurte disainiotsuste jaoks
- `balance-notes.md` economy ja pacingu markmete jaoks
