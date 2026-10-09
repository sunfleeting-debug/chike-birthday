<div align="center">
  <img src=".github/assets/icon.png" width="108" alt="chike-birthday" />
  <h1>Happy 20th, 尺K</h1>
  <p><b>A small website built out of photos, as a birthday gift</b><br /><sub>Made for a close friend</sub></p>
  <p>
    <a href="https://sunfleeting-debug.github.io/chike-birthday/"><img src="https://img.shields.io/badge/live-chike--birthday-993556" alt="Live site"></a>
    <img src="https://img.shields.io/badge/Vite-5-646CFF" alt="Vite">
    <img src="https://img.shields.io/badge/React-18-61DAFB" alt="React 18">
    <img src="https://img.shields.io/badge/TailwindCSS-3-38B2AC" alt="TailwindCSS">
    <img src="https://img.shields.io/badge/Framer%20Motion-motion-E64CE5" alt="Framer Motion">
    <img src="https://img.shields.io/badge/shape-static%20site-2C2C2A" alt="Static site">
  </p>
  <p>
    <a href="README.md">简体中文</a> ·
    <b>English</b>
  </p>
</div>

**Live → <https://sunfleeting-debug.github.io/chike-birthday/>**

- Full-screen vertical paging, with a photo trail that follows the cursor
- Four screens: Cover → About → Moments → Birthday
- "Moments" opens a gallery of all **21 photos**, grouped as *riverside / heights / us*
- "Birthday" has a cake you can light — blow it out and confetti falls, a wish appears

Stack: Vite + React 18 + TailwindCSS + Framer Motion (**a purely static site, no backend**).

## 📸 Screenshots

<div align="center">
<table>
  <tr>
    <td width="50%" align="center"><img src=".github/assets/screenshots/01-cover.png" alt="Cover"><br><sub>Cover</sub></td>
    <td width="50%" align="center"><img src=".github/assets/screenshots/03-moments.png" alt="Moments"><br><sub>Moments — 21 photos</sub></td>
  </tr>
  <tr>
    <td width="50%" align="center"><img src=".github/assets/screenshots/04-birthday.png" alt="Birthday"><br><sub>Birthday — the cake you can light</sub></td>
    <td width="50%" align="center"><img src=".github/assets/screenshots/05-mobile.png" alt="Mobile"><br><sub>Mobile</sub></td>
  </tr>
</table>
</div>

---

## 1. Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Build and preview the output:

```bash
npm run build
npm run preview      # http://localhost:4173
```

---

## 2. Want to change the content?

| What you want to change | Where |
| --- | --- |
| All copy (letter, about, group captions) | `src/data/content.js` |
| Photo order, grouping, per-photo captions | `PHOTOS` in `src/data/content.js` |
| Replace photos | overwrite `public/photos/full/*.jpg` and `public/photos/thumb/*.jpg` |
| Name / birthday / date sent | `PROFILE` at the top of `src/data/content.js` |
| Colours | `colors` in `tailwind.config.js` |
| Per-screen layout | `src/components/screens/*.jsx` |

To re-encode the photos in bulk (EXIF orientation fix + resize to 1600px), run (needs Pillow):

```bash
python scripts/process_photos.py
```

---

## 3. Publish / update

### One command to republish after editing

```bash
npm run deploy
```

`scripts/deploy.sh` reads the repo name from the git remote, builds with `/<repo>/` as the base, then pushes `dist/` to the `gh-pages` branch. Live in about a minute.

### How the live site is deployed today

| Item | Value |
| --- | --- |
| Repository | https://github.com/sunfleeting-debug/chike-birthday (public) |
| Live URL | https://sunfleeting-debug.github.io/chike-birthday/ |
| Pages source | `gh-pages` branch / root |
| Method | local `npm run deploy`, which builds and pushes the branch |

> **Why not GitHub Actions?**
> Pushing files under `.github/workflows/` requires a Personal Access Token with the `workflow` scope.
> The current token lacks it, so the push fails with
> `refusing to allow a Personal Access Token to create or update workflow`.
> The workflow is already written at `ci/deploy.yml.template`; to enable it:
>
> ```bash
> gh auth refresh -s workflow
> mkdir -p .github/workflows && mv ci/deploy.yml.template .github/workflows/deploy.yml
> git add . && git commit -m "ci: enable GitHub Actions deploy" && git push
> ```
>
> Then set **Settings → Pages → Source** to **GitHub Actions**. After that every `git push`
> publishes automatically and you no longer need `npm run deploy`.

---

## 4. (Optional) Use your own domain

To get something like `chikehappy.com`, two steps:

**1. Buy the domain** — Aliyun / Tencent Cloud / Cloudflare / Namecheap all work; a `.com` runs about ¥50–80/year.

**2. Point DNS at GitHub** — add four A records at your registrar:

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   sunfleeting-debug.github.io
```

Then fill the domain into **Settings → Pages → Custom domain** and tick **Enforce HTTPS**.
The certificate is issued automatically, usually within 10 minutes.

> ⚠️ With a custom domain the site lives at the root, so `BASE="/${REPO}/"`
> in `scripts/deploy.sh` must become `BASE="/"`.

---

## 5. Repository layout

```
chike-birthday/
├─ ci/deploy.yml.template          GitHub Actions workflow (not yet enabled)
├─ public/
│  ├─ photos/full/                 full-size images for the page (long edge 1600px, 21 photos)
│  ├─ photos/thumb/                thumbnails (long edge 640px)
│  └─ favicon.svg                  candle icon
├─ scripts/
│  ├─ deploy.sh                    one-command publish to gh-pages
│  ├─ process_photos.py            batch orientation fix + compression
│  └─ verify*.py                   Playwright screenshot verification (local / live)
└─ src/
   ├─ App.jsx                      paging shell (wheel paging on desktop, normal scroll on mobile)
   ├─ data/content.js              all copy and the photo index
   ├─ components/
   │  ├─ Cake.jsx                  interactive birthday cake
   │  ├─ ImageTrail.jsx            cursor photo trail
   │  ├─ LetterSwap.jsx            button letter-flip
   │  ├─ Navbar.jsx / Footer.jsx
   │  └─ screens/                  the four screens
   └─ pages/GalleryPage.jsx        full gallery page
```

---

## 📄 License

This repository **does not currently ship an open-source license** — it is a private gift project; please do not republish the photos or copy.

Happy birthday, 尺K. 🎂
