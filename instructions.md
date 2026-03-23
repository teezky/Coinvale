# Coinvale Instructions

Selle projekti arendamise tootkorraldus:

Pohireeglid:
- Enne suuremaid muudatusi kogume muudatuste nimekirja kokku.
- Koodi muudetakse alles siis, kui kasutaja utleb selgelt midagi stiilis `tee ara`, `uuenda`, `muuda koodis`, `implementeeri`.
- Kui jutt kaib ainult ideedest, ulevaatest voi planeerimisest, siis koodi ei muudeta.
- Koik dokumentatsiooni- ja referentsifailid tuleb hoida vajalike muudatustega jooksvalt kursis.

Markdown failide hoidmine:
- `handoff.md` peab jaama luhikeseks hetkeseisu failiks.
- `implemented.md` peab kajastama reaalselt mangus toimivaid lahendusi.
- `roadmap.md` peab kajastama eesootavaid teemasid, balansimuresid ja jargmisi samme.
- `removed.md` peab kajastama eemaldatud, mahavoetud voi asendatud lahendusi.
- `buildings.md`, `workers.md` ja `tech-tree.md` peavad olema inimesele loetavad susteemidokid.
- Kui tehakse oluline muudatus, tuleb seotud markdown failid samas passis uuendada.
- Mitte uhtegi neist failidest ei tohi jatta vananenud seisu, kui muudatus puudutab nende sisu.

Reference failid:
- struktureeritud referents elab kaustas `reference/`
- seal hoitakse susteemide kirjeldusi `JS` failidena
- praegu on need referents ja dokumentatsiooni abi, mitte mangu runtime source of truth
- kui kunagi minnakse samm-sammult modulaarsema arhitektuuri peale, siis voib `index.html` hakata neid kasutama
- Kui susteemi kohta muutub midagi olulist, tuleb ka seotud `reference/*.js` fail samas passis uuendada.

Toovoog enne muudatusi:
1. Loe labi `handoff.md`.
2. Vajadusel kontrolli `implemented.md`, `roadmap.md`, `removed.md` ja susteemidoke.
3. Kogu kokku muudatuste nimekiri, mida plaanitakse teha.
4. Oota kasutaja selget kinnitust enne, kui koodi muudad.

Toovoog parast muudatusi:
1. Uuenda `implemented.md`, kui midagi laks reaalselt mangu sisse.
2. Uuenda `roadmap.md`, kui prioriteedid voi jargmised teemad muutusid.
3. Uuenda `removed.md`, kui moni vana lahendus eemaldati voi asendati.
4. Uuenda `buildings.md`, `workers.md` voi `tech-tree.md`, kui susteemikaitlus muutus.
5. Uuenda seotud `reference/*.js` faili, kui susteemi referents muutus.
6. Uuenda `handoff.md`, et jargmisel vestlusel oleks seis lihtsalt loetav.
7. Kontrolli alati lopus, et koik seotud failid oleksid omavahel kooskolas ega kirjeldaks eri seisu.

Lisapohimotted:
- Hoia logi arusaadav, mitte lihtsalt pikk.
- Erista alati:
  - mis on juba tehtud
  - mis on plaanis
  - mis on eemaldatud
- Erista alati ka:
  - inimesele loetav dokumentatsioon
  - struktureeritud referents
- Kui mingi otsus muudab projekti suunda, tasub see markdownides selgelt kirja panna.

Eesmärk:
- Projektist peab olema igal hetkel lihtne aru saada:
  - mis on olnud
  - mis on praegu
  - mis tuleb jargmisena
