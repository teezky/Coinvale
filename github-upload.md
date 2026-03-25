# GitHub Upload Guide

This project is ready to be uploaded to GitHub in a documented form.

## Recommended repository contents

Keep these in the repo:
- `index.html`
- all `*.md` documentation files
- the `reference/` folder
- `.gitignore`
- `README.md`

## Suggested repository names

Examples:
- `coinvale`
- `coinvale-prototype`
- `coinvale-idle-game`

## Uploading to GitHub with git

If `git` is installed on your machine, run this in the project folder:

```powershell
git init
git add .
git commit -m "Initial Coinvale prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

## If the GitHub repository still needs to be created

1. Open GitHub.
2. Click `New repository`.
3. Enter the repository name.
4. Do not add an initial `README`, `.gitignore`, or `license`, because this project already includes them.
5. Create the repository.
6. Use the `git` commands above.

## What to verify before pushing

- whether `README.md` describes the current state
- whether `handoff.md` is short and current
- whether `implemented.md`, `roadmap.md`, and `removed.md` are aligned
- whether `buildings.md`, `workers.md`, and `tech-tree.md` are updated
- whether `reference/*.js` matches the actual system state

## If you want to upload through the web UI without git

You can also do it this way:
1. Create a new GitHub repository.
2. Choose `uploading an existing file`.
3. Drag the whole project into the repo page.
4. Create the first commit through GitHub’s web UI.

Keep in mind:
- future updates are much easier if `git` is installed locally

## Recommendation for later

If you keep the project on GitHub more actively later, it is worth adding:
- `LICENSE`
- a screenshots folder
- releases or a changelog

`LICENSE` should be chosen deliberately, because it is a legal decision.
