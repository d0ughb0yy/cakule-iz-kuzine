# Development guide

Technical notes for maintaining and deploying the site. For the business description, see `README.md`, and for the pre-launch checklist, see `CONTENT.md`.

## Stack

- Astro static output, no client framework, no adapter, no CMS.
- Hand-written CSS with semantic palette tokens (`src/styles/palettes.css`).
- Fonts bundled locally via `@fontsource-variable` (Fraunces display + Inter body).
- Copy lives in plain JSON files; templates read from `src/config.ts`.

## Run it locally

Requires **Node.js 24.x** (`.nvmrc` and `package.json` `engines` both pin it).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build into dist/
npm run preview   # preview the production build
```

## What to edit

| File | What lives there |
| --- | --- |
| `src/config.ts` | Brand name, Take a Chef URL, site URL, service area, Instagram, active palette |
| `src/data/site/hr.json` | All Croatian copy: hero, menus, reviews, FAQ, footer |
| `src/data/site/en.json` | All English copy |
| `src/data/images.json` | Every image URL, dimensions, and bilingual alt text |
| `src/data/gallery.json` | Gallery order and bilingual captions |
| `src/styles/palettes.css` | All four palettes; switch with `site.palette` |
| `src/styles/global.css` | Layout, type, components, motion |

`CONTENT.md` lists every placeholder that must be replaced before launch. `docs/superpowers/specs/2026-10-27-private-chef-site-design.md` holds the full design rationale and palette documentation.

### Editing the menus

Menus live in `src/data/site/hr.json` and `en.json` under `menus.items`. Each menu has a `name`, a `description`, and `courses`. Each course has a `name` and an `options` array:

- **One option** renders as a set tasting course.
- **Two options** render side by side with the `menus.or` separator.

The homepage picks `choiceNote` or `tastingNote` automatically: a menu with at least one two-option course gets the choice note, otherwise it gets the tasting note. The surrounding `menus` object also supplies the bilingual labels `or`, `prev`, `next`, `tabsLabel`, and `of` (the last is only used in the screen-reader status). Add or remove menus freely — the tabs, arrows, and dots follow the array length. Keep `hr.json` and `en.json` structurally identical.

There are no menu images. The old `menu-market`, `menu-adriatic`, and `menu-garden` entries in `src/data/images.json` are unused.

#### Menu slideshow behaviour

`src/components/HomePage.astro` renders one `.menu-sheet` per menu inside `.menu-slides`. Navigation is handled by one inline script:

- Tabs (`.menu-tab`) and clickable dots (`.menu-dot`) jump to a menu.
- Prev/next arrows wrap around.
- Arrow keys, `Home`, and `End` move between tabs; `aria-selected` and roving `tabindex` follow.
- Horizontal swipe on the `.menu-stage` moves to the next or previous menu.
- An `aria-live` region announces the active menu and its position.

#### Fixed menu height

All `.menu-sheet` panels occupy the **same CSS grid cell** (`grid-area: 1 / 1`). Inactive panels stay in layout with `visibility: hidden` and `pointer-events: none`; the active panel gets `.is-active`. The tallest menu therefore sets the stage height, and the arrows and dots never move when switching menus.

Do not switch inactive panels to `hidden`, `display: none`, or remove them from the DOM — that collapses the grid to the active panel and the controls jump. The sheet is a flex column with `margin-top: auto` on `.menu-sheet__foot`, so the booking link stays pinned to the bottom of shorter menus.

#### Menu typography

- Menu title and dish names: **Fraunces**, weight 400.
- Dish names: `clamp(1.05rem, 1.3vw, 1.18rem)`, line-height 1.5.
- Descriptions and body copy: **Inter**.
- Course labels and the choice/tasting note: 0.72rem, uppercase, 0.12em tracking; labels use `--ink-soft` for contrast.

Fraunces was kept at 400; heavier weights read as bold because of the face's stroke contrast.

### Replacing an Unsplash image with a real photo

1. Put the optimized photo in `public/images/`, e.g. `public/images/plated-fish.jpg`.
2. In `src/data/images.json`, change that entry's `src` (and `full`, if it is a gallery image) to `/images/plated-fish.jpg`.
3. Set `width` and `height` to the real pixel dimensions. These prevent layout shift; use the image's true aspect ratio.
4. Update both `alt.hr` and `alt.en`.

Gallery entries reference image keys, so you only edit `images.json` — not the gallery order.

### Switching palettes

Change one line in `src/config.ts`:

```ts
palette: '3', // '1' | '2' | '3' | '4'
```

The four sets in `src/styles/palettes.css` are mapped to the same semantic roles, so every component follows automatically. The favicon is hardcoded to Palette 3; update `public/favicon.svg` if you switch permanently. See the design doc for each palette's role mapping and contrast notes.

## Deploy to Vercel

The site is a plain static build — no server runtime, functions, or server-side rendering. No `vercel.json` is required.

1. Push the repository to GitHub.
2. In Vercel: **Add New → Project → Import** the Git repository.
3. Framework preset: Astro (or "Other"). Build command: `npm run build`
4. Output directory: `dist`
5. Node version: `engines` in `package.json` pins `24.x`, which matches Vercel's current default. If the project was created with a different Node version, set it under Settings → General → Node.js Version.
6. Deploy. Every branch and pull request gets a preview deployment.
7. The production URL is `https://cakule-iz-kuzine.vercel.app`, which is already the value in `astro.config.mjs` (`site:`) and `src/config.ts` (`url:`).

After connecting a custom domain, update the URL in `astro.config.mjs` (`site:`) and `src/config.ts` (`url`), then redeploy.

**Bandwidth note:** the prototype hotlinks Unsplash, so image traffic is served by Unsplash. When you switch to local photos, compress them first (roughly 1600px on the long edge, WebP or quality-80 JPEG) because the current setup does not run them through an image pipeline.

## Structure

```
src/
  components/        Header, Footer, HomePage, GalleryPage, GalleryGrid, CtaBand, Icon
  data/              Bilingual copy, image registry, gallery order
  layouts/           BaseLayout (head, fonts, SEO, motion setup)
  lib/content.ts     Typed access to copy and images
  pages/             HR home + gallery, EN home + gallery, 404
  styles/            Palette tokens and global CSS
public/              Favicon, robots.txt, future local images
docs/                Development guide and design spec
```

## Notes

- Booking is intentionally external. There is no form, database, or CMS to maintain.
- The gallery lightbox is keyboard accessible (`Esc`, arrow keys) and closes on outside click.
- Scroll reveals and lightbox transitions are disabled automatically under `prefers-reduced-motion`.
## Recent navbar changes (updated docs for agents)

- Desktop language switcher (`.lang--desktop`) now uses pill styling (`border-radius: 999px`, `background: var(--line-soft)`, `border: 1px solid var(--line)`) identical to mobile (`.lang--mobile`), with active `.is-active` filled highlight (`var(--brand)`).
- Mobile language links (`.lang--mobile`) stay as pill (`flex: 1`, `text-align: center`) with `.is-active` filled.
- `Header.astro`: `.lang--mobile` restored beside `.nav-toggle` (side-by-side); `.nav-toggle` uses `display: flex` with centered icon (no `inset: 0` on SVG); `line-height: 1` on `.nav-toggle`.
- Book button (`.header__cta`) changed to "Take A Chef Profile" (same URL `site.bookingUrl`).
- Mobile dropdown gap (`.header__panel`) kept at original `gap: 2.75rem`; `.nav-link` padding reduced (`0.65rem 0`) for cleaner mobile view.
- `.header__inner` uses `justify-content: space-between` (logo left, actions right); `.header__mobile-actions` uses `display: flex; align-items: center;`.
- `.header__cta` (`btn--sm`) slightly reduced (`font-size: 0.62rem`, `min-height: 2.5rem`).
- Lightbox backdrop (`.lightbox`) uses neutral grey (`rgba(30, 30, 30, 0.9)`) instead of green.
- Leftover report docs (`UNSLOP_*`, `IMPLEMENTATION_*`) removed from workspace root.
- `.nav-link` mobile padding: `0.92rem`; button: `font-size: 0.92rem` (slight shrink).
- `.header__panel` gap: `2.75rem` (original restored); `.header__actions` mobile `margin-top`: `1.4rem` (restored for mobile dropdown spacing).

- Reviews, photos, and the chef's name in the prototype are placeholders. See `CONTENT.md`; pricing is quoted by Take a Chef and is not shown on the site.
