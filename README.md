# Children of the Lance

A fan-made showcase website for **Children of the Lance**, an unofficial fan
continuation of the Dragonlance Chronicles. Non-commercial. No backend.

Content is available in **Portuguese (PT-PT, default)**, **English** and
**Spanish** via a language switcher in the navbar.

> Children of the Lance is an unofficial fan-made work. It is not affiliated
> with, endorsed by, or connected to Wizards of the Coast. Dragonlance and all
> related properties are trademarks of Wizards of the Coast.

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [React Router](https://reactrouter.com/) for page navigation
- Plain CSS (one global stylesheet), no UI framework
- Deployed as a static site on [Vercel](https://vercel.com/)

## Run locally

You need [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

Other commands:

```bash
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
npm run lint      # eslint
```

## Project structure

```
public/
  images/
    characters/   <- character portraits (palin-majere.jpeg, usha-dithon.jpeg, lord-soth.jpeg)
    logo/         <- put dragonlance-logo.png here
    art/          <- any other artwork
  favicon.svg
src/
  main.tsx            <- app entry
  router.tsx          <- the list of routes
  components/         <- Navbar, Footer, Layout, CharacterCard, Logo, ArtCredit, LanguageSwitcher
  pages/              <- one file per page (Home, Historia, Personagens, Conflito, Ler, Creditos, NotFound)
  data/
    site.ts           <- logo path, nav links, disclaimer, reading-link placeholder
    characters.ts     <- who exists, their image + artist credit (no prose)
  i18n/
    content.ts         <- ALL translatable text: PT / EN / ES (page prose + character roles + bios)
    LocaleContext.tsx  <- language state, remembered in localStorage
  lib/
    useDocumentMeta.ts <- sets <title> and meta description per page
  styles/
    global.css         <- the whole theme (edit the CSS variables at the top to retheme)
```

## Editing content

- **Story text, character bios, button labels** — `src/i18n/content.ts`. Every
  string has a `pt`, `en` and `es` version. Keep the three in sync; TypeScript
  will complain if a key is missing.
- **Who appears on the Characters page, portraits, artist credits** —
  `src/data/characters.ts`.
- **Nav links, the disclaimer, the logo path, the reading link** —
  `src/data/site.ts`. To make the "Read the Story" button live, set
  `COTL_READ_URL` to your AO3 / Wattpad link.
- **Colours and fonts** — the CSS variables at the top of `src/styles/global.css`.

## Images

Drop files into `public/images/...` and reference them from `characters.ts` or
`site.ts` by their path under `public`, e.g. `/images/characters/gryff.jpeg`.
Any official Dragonlance artwork must have an `artist` set so the credit shows
next to the image and on the Credits page.

## Deploy to Vercel

1. Push this repo to GitHub (see below).
2. On [vercel.com/new](https://vercel.com/new), import the repository.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`,
   output directory `dist`. No environment variables.
4. Deploy. `vercel.json` already handles the single-page-app routing so deep
   links like `/personagens` work on refresh.

## Push to GitHub (first time)

```bash
git remote add origin https://github.com/KuboLoko/children-of-the-lance.git
git branch -M main
git push -u origin main
```
