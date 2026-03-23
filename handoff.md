# Coinvale Handoff

Projekt:
- Single-file browser game failis `index.html`
- Mangu nimi: `Coinvale`

Olulised kokkulepped:
- Arutame muudatused enne labi.
- Koodi muudame alles siis, kui kasutaja utleb selgelt midagi stiilis `tee ara`, `muuda koodis`, `implementeeri`.
- Seda faili hoiame luhikese hetkeseisu ja jargmise sammu jaoks.

Praegune seis:
- Mang sisaldab ressursse, hooneid, workereid, expeditioneid, random evente, traderit, save/migration loogikat ja branch-pohist tech tree'd.
- `Town Hall` on keskne population-building ja vana `House` susteem on eemaldatud.
- Mangu algus on nuud aktiivsem:
  - start = `4` elanikku
  - `Forager` ja `Farm` on veidi tugevamad
- Random eventid toimuvad nuud veel veidi harvemini.
- Ressursikastid naitavad nuud eraldi `Income`, `Upkeep` ja `Net` ridu.
- `Knowledge` kasvab nuud alguses natuke ka elanike arvust.
- `Tech Tree` on nuud kompaktsema node-vaatega ja naitab ka tulevasi node'e.
- Build / upgrade / expedition costid naitavad puuduvaid ressursse punaselt.
- `Knowledge` economy algab varem, sest `Scribe Hall` avaneb varem.
- Expeditione on laiendatud ning failed expedition voib vallandada `counter-raid`i.
- Kylakaitses on nuud eraldi `Guard` roll.

Peamised failid:
- [index.html](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/index.html)
- [README.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/README.md)
- [github-upload.md](/abs/path/c:/Users/tanel/OneDrive/Documents/The%20Game/github-upload.md)
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
- balance pass uutele expeditionitele, `Guard` kaitsevaartustele ja uue varase algtempo tunnetusele
- otsustada, millal ja kuidas viia `index.html` samm-sammult reference-failide peale
- kui projekt laheb GitHubi, valida teadlikult ka `LICENSE`

Kui alustad uut vestlust, void kasutada seda prompti:

```text
Projekt on single-file browser game "Coinvale" failis index.html.

Palun loe esmalt handoff.md ja jatkame sealt.

Oluline kokkulepe:
- Arutame muudatused enne labi.
- Koodi muuda alles siis, kui utlen selgelt "tee ara".

Praegune jargmine teema:
- [kirjuta siia jargmine konkreetne teema]
```

Markus:
- Selles keskkonnas ei olnud saadaval `node`, `deno` ega `bun`, seega osa muudatusi ei saanud runtime'is automaatselt kontrollida.
