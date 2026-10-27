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
- Reviews, prices, the chef's name, and the Take a Chef URL in the prototype are placeholders. See `CONTENT.md`.
