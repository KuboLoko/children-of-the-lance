# Archive — original `feature/children-of-the-lance` branch from the kuboloko.pt repo

These 5 patches are the full history of the "Children of the Lance" work as it
was **first** committed, by mistake, on a local branch of the **kuboloko.pt**
repository (`github.com/KuboLoko/kubo-loko`). That branch was never pushed.

The work was later reimplemented as this standalone repo
(`github.com/KuboLoko/children-of-the-lance`), which is a rewrite — different
file layout, its own Vite app, i18n moved to `src/i18n/content.ts`. The 3
character JPEGs are byte-identical between the two (just renamed).

Once this archive was saved, the `feature/children-of-the-lance` branch was
deleted from the kuboloko.pt repo (`git branch -D`, 2026-09-08). `main` there
never contained any of this code.

## Contents

| Patch | Commit | Adds |
|---|---|---|
| 0001 | `ee8f805` chore(cotl): add Lord Soth artwork asset | `public/projetos/children-of-the-lance/antagonist-Lorde-Soth.jpeg` |
| 0002 | `69b7ab0` feat(cotl): add data, scoped styles and shared components | `src/children-of-the-lance/**` — 6 components, `data/characters.ts`, `data/site.ts`, `lib/head.ts`, `styles/cotl.css` |
| 0003 | `82b463a` feat(cotl): add routed pages | 7 route files under `src/routes/projetos/children-of-the-lance/` + `src/routeTree.gen.ts` |
| 0004 | `13e0322` content(cotl): finalise written copy | edits to the data + route files |
| 0005 | `cdca7a8` feat(cotl): wire in Palin and Usha portraits | `palin-majere.jpeg`, `Usha-DiThon.jpeg` + character-data edits |

Base commit these apply onto: `36f1631` (kuboloko.pt `main` at the time).

## To restore into a git repo (if ever needed)

```
git checkout -b recovered-cotl 36f1631      # or any base; routeTree.gen.ts hunk
git am --exclude=src/routeTree.gen.ts *.patch
```

`src/routeTree.gen.ts` is a generated file — regenerate it from the router
plugin rather than applying patch 0003's hunk for it.
