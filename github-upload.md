# GitHub Upload Guide

See projekt on valmis GitHubi jaoks dokumenteeritud kujul.

## Soovitatud repo sisu

Hoia repos sees:
- `index.html`
- koik `*.md` dokumentatsioonifailid
- kaust `reference/`
- `.gitignore`
- `README.md`

## Soovitatud repo nimi

Naiteks:
- `coinvale`
- `coinvale-prototype`
- `coinvale-idle-game`

## GitHubi üleslaadimine

Kui sul on `git` oma arvutis olemas, siis tee projekti kaustas:

```powershell
git init
git add .
git commit -m "Initial Coinvale prototype"
git branch -M main
git remote add origin https://github.com/SINU_KASUTAJA/REPO_NIMI.git
git push -u origin main
```

## Kui GitHub repo on vaja alles luua

1. Ava GitHub.
2. Vajuta `New repository`.
3. Pane repo nimi.
4. Ara lisa esialgu `README`, `.gitignore` ega `license`, sest need on siin projektis juba olemas.
5. Loo repo.
6. Kasuta uleval toodud `git` käske.

## Mida enne pushi kontrollida

- kas `README.md` kirjeldab praegust seisu
- kas `handoff.md` on luhike ja ajakohane
- kas `implemented.md`, `roadmap.md`, `removed.md` on kooskõlas
- kas `buildings.md`, `workers.md`, `tech-tree.md` on uuendatud
- kas `reference/*.js` vastab tegelikule systeemiseisule

## Kui tahad lihtsalt veebist uploadida ilma gitita

Void teha ka nii:
1. Loo GitHubis uus repo.
2. Vali `uploading an existing file`.
3. Lohista kogu projekti sisu repo aknasse.
4. Tee esimene commit GitHubi veebis.

Selle puhul arvesta:
- hilisemad muudatused on mugavamad, kui `git` on arvutisse paigaldatud

## Soovitus tulevikuks

Kui hakkad projekti aktiivsemalt GitHubis hoidma, tasub hiljem lisada:
- `LICENSE`
- screenshots kaust
- releases voi changelog

`LICENSE` tuleks valida teadlikult, sest see on juriidiline otsus.
