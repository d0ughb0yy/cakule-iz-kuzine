# Čakula iz Kužine — design and build specification

**Date:** 27 October 2026
**Status:** Prototype complete; copy and photography pending
**Stack:** Astro 7.4.2, static output, hand-written CSS, no UI framework, no CMS

---

## 1. Purpose

A two-page portfolio for a private chef working in **Istria, Croatia**. It exists to make a stranger trust the chef enough to open the Take a Chef profile and send an enquiry. It is not a booking system, brochure site, or blog.

**Positioning:** *Local ingredients in season, turned into fine dining.* Small dinners — up to six guests — cooked in the guest's home or villa. The chef travels to the client.

**What the site must communicate, in order:**

1. This is a real, skilled chef, not a catering agency.
2. The food is seasonal, local, and visually distinctive.
3. The format is simple and low-risk: one price, everything handled, kitchen left clean.
4. Booking happens on a trusted platform (Take a Chef), not in a contact form.

**Non-goals:** online payments, availability calendar, blog, newsletter, multi-chef roster, CMS, customer accounts.

## 2. Audience

- **Primary:** English-speaking visitors renting villas in Istria, planning a special dinner (birthday, anniversary, family gathering).
- **Secondary:** Croatian locals and regional guests who want the same evening in their own home.
- Couples and groups of 2–6; someone who cares about food but does not want restaurant formality.

The bilingual split is not an afterthought: Croatian is the default at `/`, English is a first-class mirror at `/en/`. Both must read as native copy, not translations.

## 3. Information architecture

| Page | Croatian | English | Job |
| --- | --- | --- | --- |
| Home | `/` | `/en/` | Explain the chef, the format, the menus, and route to booking |
| Gallery | `/galerija/` | `/en/gallery/` | Prove the food with photographs; second route to booking |
| 404 | `/404.html` | — | Bilingual recovery page |

Home section order is deliberate:

1. **Hero** — promise, location, capacity, primary CTA.
2. **Approach** — who the chef is, how they shop and cook; signature and a link to the process.
3. **How it works** — three steps, removing uncertainty.
4. **Included** — the "one price, no surprises" objection handled directly.
5. **Menus** — three directions, indicative "from" price only.
6. **Gallery teaser** — visual proof and a path to the gallery.
7. **Testimonials** — social proof (placeholder until real quotes exist).
8. **FAQ** — travel, kitchen, allergies, duration, booking, cleanup.
9. **CTA band** — final booking prompt.

There is no separate About, Contact, or Pricing page. Everything a first-time visitor needs is on the home page; the gallery exists for depth.

## 4. Content model

No CMS. Copy lives in typed JSON, read through `src/lib/content.ts`.

| File | Responsibility |
| --- | --- |
| `src/config.ts` | Brand, booking URL, canonical site URL, service area, year, Instagram, active palette |
| `src/data/site/hr.json` | All Croatian copy |
| `src/data/site/en.json` | All English copy, same keys |
| `src/data/images.json` | Image registry: `src`, `full`, `width`, `height`, bilingual `alt` |
| `src/data/gallery.json` | Gallery order (image keys) and bilingual captions |

`getContent(lang)` returns the whole copy tree. `getGallery(lang)` joins gallery order to the image registry and fails loudly if an image key is unknown. Image keys are stable; swapping a photo never touches gallery order.

The two language files must stay structurally identical. If a section is added to one, it is added to the other.

## 5. Visual system

### 5.1 Concept

**Seasonal editorial.** The page should feel like a well-printed food magazine: generous whitespace, a serif display face, a restrained green palette, and photography that is allowed to breathe. Fine dining is signalled by restraint — not gold, not script fonts, not dark-luxury clichés.

Three rules carried through every section:

- One idea per band; alternate light and dark backgrounds to pace the scroll.
- Type does the decorating; borders are hairlines, corners are 2px, shadows are rare.
- Photography is rectangular and uncropped by decorative masks; the only ornament is an offset hairline frame.

### 5.2 Typography

| Role | Face | Settings |
| --- | --- | --- |
| Display / headings | **Fraunces Variable** | 400, optical sizing on, tight tracking (−0.018em to −0.032em), italic for emphasised words |
| Body / UI | **Inter Variable** | 400–600, 1.0625rem base, 1.65 line-height |
| Small caps / labels | Inter | 0.66–0.75rem, 0.11–0.18em tracking, uppercase |

Both fonts are bundled locally via `@fontsource-variable` — no Google Fonts request.

Fluid scale:

- `h1`: `clamp(3rem, 6.4vw, 5.4rem)`, line-height 0.98, max 13ch
- `h2`: `clamp(2.15rem, 4.4vw, 3.5rem)`, max 20ch
- `h3`: `clamp(1.3rem, 2vw, 1.6rem)`
- `.lead`: `clamp(1.02rem, 1.4vw, 1.12rem)`, max 56ch

Italic accents inside headlines (`<em>`) use the brand colour. Headlines use `--brand-deep` rather than pure black, which keeps them warm against ivory.

### 5.3 Layout

- Content width: `min(100% - 2 × gutter, 1180px)`
- Gutter: `clamp(1.25rem, 4vw, 3rem)`
- Section rhythm: `clamp(4.5rem, 9vw, 8.5rem)` block padding
- Header: 78px desktop, 66px below 860px; sticky with blur and a hairline border
- Grid patterns: 2-column editorial splits (hero, intro, how, included, FAQ), 3-up menu cards, 4-up gallery teaser, 3-column masonry gallery
- Breakpoints: 1000 / 960 / 920 / 860 (nav collapse) / 760 / 680 / 540

The dark bands (`how`, final CTA) use `--brand-deep` with a radial accent glow. The footer is a further step darker. This creates a light–dark–light rhythm without introducing new colours.

### 5.4 Colour system

Colours are **semantic**, not literal. Components never reference a palette hex; they reference a role. This is what makes the four approved palettes swappable.

| Token | Role |
| --- | --- |
| `--brand` | Primary buttons, links, eyebrow labels, key accents |
| `--brand-hover` | Hover states for links, buttons, and markers |
| `--brand-deep` | Headings and dark section backgrounds (derived: 82% brand + near-black) |
| `--brand-tint` | Faint brand wash for ghost-button hover (derived) |
| `--accent` | Chartreuse/gold highlight: eyebrows on dark, selection, quote mark, badge |
| `--support` | Image placeholders, ghost-button borders, hairlines |
| `--support-soft` | "Included" band background (18% support + ivory) |
| `--secondary` | Secondary brand colour, available for supporting graphics |
| `--focus` | 3px focus outline |
| `--muted` | Captions, meta, price notes, secondary labels |
| `--ivory` | Page background `#FAF7F0` |
| `--paper` | Cards and raised surfaces `#FFFFFF` |
| `--ink` | Body text `#22261F` |
| `--ink-soft` | Secondary body text `#4F584C` |
| `--on-brand` | Text on dark/brand surfaces `#FBF8EF` |
| `--line`, `--line-soft` | Hairline borders `#DFE4DF`, `#EBEEE8` |

Shared neutrals are identical across palettes; only the five palette roles change. Derived tokens use `color-mix()`, supported in all current evergreen browsers.

**Contrast guardrails:** `--support` is a background colour, never body text on ivory (1.1–2.0:1). `--accent` pairs with dark ink or `--brand-deep` (9.0–11.2:1). `--brand-deep` pushes headings well past AA.

### 5.5 The four palettes

All four sets come from the brief. Each is mapped to the same semantic jobs so switching changes the mood, not the hierarchy.

#### Palette 1 — burnt orange, amber, pale blue, teal (warm, trattoria)

| Role | Hex | Where it lands |
| --- | --- | --- |
| Brand | `#CC5703` | Buttons, links, eyebrows |
| Brand hover | `#A84602` | Hover states |
| Accent | `#FCA70A` | Dark-band eyebrows, selection, quote mark |
| Support | `#C3D3E3` | Image placeholders, ghost borders, included band |
| Secondary | `#008B94` | Supporting graphics |
| Muted | `#6C787B` | Captions and meta |
| Focus | `#008B94` | Focus ring |

#### Palette 2 — deep red, rose, pale blue, sky teal (romantic, evening)

| Role | Hex | Where it lands |
| --- | --- | --- |
| Brand | `#AC3539` | Buttons, links, eyebrows |
| Brand hover | `#8C2A2E` | Hover states |
| Accent | `#E8A5AD` | Dark-band eyebrows, selection, quote mark |
| Support | `#D0ECF7` | Image placeholders, ghost borders, included band |
| Secondary | `#2F8FA6` | Supporting graphics |
| Muted | `#6D7A7E` | Captions and meta |
| Focus | `#2F8FA6` | Focus ring |

#### Palette 3 — deep green, olive, chartreuse, blue-grey, teal (active)

Chosen and approved for launch: it reads as Istria — olive groves, garden herbs, Adriatic light — without becoming a literal "green website".

| Role | Hex | Where it lands |
| --- | --- | --- |
| Brand | `#225F02` | Buttons, links, eyebrows |
| Brand hover | `#457A05` | Hover states (darkened from the supplied olive `#528D06` for AA contrast) |
| Accent | `#CFCE5D` | Dark-band eyebrows, selection, quote mark, badge |
| Support | `#9CB5C1` | Image placeholders, ghost borders, included band |
| Secondary | `#4B9CA2` | Supporting graphics |
| Muted | `#5C726C` | Captions and meta |
| Focus | `#4B9CA2` | Focus ring |

#### Palette 4 — dusty rose, warm gold, light grey, blue-grey, strong blue

The brief's five colours are remapped so the strong blue becomes the brand: the dusty rose and warm gold are too light to carry small text or button labels. They remain visible as accent and secondary.

| Role | Hex | Where it lands |
| --- | --- | --- |
| Brand | `#1B78AF` | Buttons, links, eyebrows |
| Brand hover | `#145F8B` | Hover states |
| Accent | `#EBC678` | Dark-band eyebrows, selection, quote mark |
| Support | `#B4C6D0` | Image placeholders, ghost borders, included band |
| Secondary | `#B46A65` | Supporting graphics |
| Muted | `#6D7B82` | Captions and meta |
| Focus | `#1B78AF` | Focus ring |

#### Contrast audit (vs ivory `#FAF7F0`, and on-brand text vs button fill)

| Palette | Brand / ivory | Button label | Hover / ivory | Hover label | Muted / ivory | Accent on deep |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 3.98 ✗ | 4.01 ✗ | 5.54 ✓ | 5.58 ✓ | 4.26 ✗ | 9.30 ✓ |
| 2 | 5.91 ✓ | 5.95 ✓ | 7.90 ✓ | 7.96 ✓ | 4.14 ✗ | 9.08 ✓ |
| 3 | 7.25 ✓ | 7.31 ✓ | 4.86 ✓ | 4.90 ✓ | 4.81 ✓ | 11.02 ✓ |
| 4 | 4.51 ✓ | 4.54 ✓ | 6.46 ✓ | 6.51 ✓ | 4.08 ✗ | 11.23 ✓ |

✓ = meets WCAG AA 4.5:1 for normal text. Body text (`--ink`, 14.4:1) and secondary body (`--ink-soft`, 6.9:1) pass in every palette.

**If you switch away from Palette 3:** Palette 1 needs `--brand` changed to `#B34C02` (4.97:1) or its buttons/links will fail AA. Palettes 1, 2, and 4 also need `--muted` darkened by roughly 10–15% for small captions. These are one-line edits in `src/styles/palettes.css`; check with a contrast tool before launch.

#### Switching palettes

1. Open `src/config.ts`.
2. Change `palette: '3'` to `'1'`, `'2'`, `'3'`, or `'4'`.
3. Rebuild. `BaseLayout.astro` writes `data-palette` onto `<html>`; `palettes.css` does the rest.

To preview without a rebuild, set the attribute in DevTools: `document.documentElement.dataset.palette = '2'`.

The favicon is drawn in Palette 3 colours. If a switch becomes permanent, update `public/favicon.svg` to match. `theme-color` in `BaseLayout.astro` is also fixed at the ivory background — it only needs changing if the page background changes.

### 5.6 Imagery

- Placeholder photography is **hotlinked from Unsplash** with `auto=format&fit=crop` and explicit crop sizes. Nothing is downloaded or committed.
- Every image has `width` and `height`, so the browser reserves space and the layout does not shift.
- Hero is `fetchpriority="high"`; the first two gallery images are eager; everything else is lazy with `decoding="async"`.
- Cropping: hero and intro 4:5, menu cards 4:3, gallery images keep varied ratios (masonry), lightbox uses `contain` so nothing is cropped.
- Image treatment: 2px radius, no filters, no duotone. The offset hairline frame behind the hero and the chartreuse square behind the intro photo are the only graphic devices.
- The intro image is deliberately hands-only (chopping herbs) so a stock face is never mistaken for the chef.

When real photos arrive, they should be local, roughly 1600px on the long edge, WebP or quality-80 JPEG. See `CONTENT.md` §6.

## 6. Components

| Component | Responsibility |
| --- | --- |
| `BaseLayout.astro` | `<head>`, fonts, SEO, hreflang, OG/Twitter, JSON-LD, header/footer, reveal observer |
| `Header.astro` | Brand, nav, language switch, booking CTA, mobile menu behaviour |
| `Footer.astro` | Brand, page links, booking link, service area, credits, copyright |
| `HomePage.astro` | All nine home sections; shared by HR and EN pages |
| `GalleryPage.astro` | Gallery hero, grid, closing CTA; shared by HR and EN |
| `GalleryGrid.astro` | Masonry grid, dialog lightbox, keyboard/pointer behaviour, animations |
| `CtaBand.astro` | Reusable dark booking band |
| `Icon.astro` | Inline SVG set: arrow, check, close, chevrons |
| Pages | Thin wrappers that pick language, content, and metadata |

Both languages share the same page components. There is no duplicated markup between HR and EN — only JSON differs.

## 7. Motion

Motion is decorative and short. Nothing moves content the visitor is reading.

| Moment | Behaviour |
| --- | --- |
| Scroll reveal | 700ms opacity + 14px rise, `cubic-bezier(0.2, 0.6, 0.2, 1)`, 90ms stagger on lists. IntersectionObserver at 12% visibility, −8% bottom margin; fires once |
| Lightbox open | Backdrop fades 250ms; dialog fades 220ms; frame rises 10px and scales 0.995 → 1 over 300ms |
| Lightbox close | `is-open` removed, 240ms reverse, then `dialog.close()` |
| Photo change | Preload + `decode()`, fade out 150ms with −10px slide, swap, fade in 180ms from +10px; caption/counter crossfade together |
| Image hover | Gallery/teaser scale 1.03–1.04 over 700–800ms; menu cards lift 4px |
| Link/button hover | 200–250ms colour/border/transform transitions |

Rapid arrow presses are guarded by a token counter: only the latest requested image is rendered, so overlapping animations cannot leave the wrong photo or caption on screen.

**Reduced motion:** `prefers-reduced-motion: reduce` collapses every animation and transition to 0.01ms. The lightbox script also checks `matchMedia` and switches images instantly, closes without a timer, and skips the direction slide. Scroll reveals appear immediately.

## 8. Lightbox specification

The gallery is the one place where interaction complexity is justified.

- **Fixed frame:** the figure is `min(1080px, 100%)`; the photo sits in a fixed-height stage (`clamp(20rem, 70vh, 48rem)`; `clamp(15rem, 56vh, 30rem)` under 540px). Portraits, squares, and landscapes all letterbox inside the same stage.
- **Stable controls:** caption bar, counter, and prev/next buttons are positioned by the frame, not the photo. Verified: arrow coordinates are identical across tall (560×700), square (700×700), and wide (1050×700) images.
- **Close paths:** close button, `Esc`, clicking the dark area outside the figure, and clicking the backdrop. Clicks on the image, caption, or arrows do not close. Clicking the letterbox inside the stage intentionally stays open.
- **Keyboard:** `←`/`→` change photos, `Esc` closes. Buttons are real `<button>` elements with labels.
- **Dialog semantics:** native `<dialog>` + `showModal()` gives focus trapping and focus restoration for free. Page scroll is locked while open and restored on close.
- **Caption:** `aria-live="polite"`, so screen readers hear the new caption without the whole dialog being re-announced.
- **No deep-linking:** the lightbox does not change the URL. That keeps the static build simple and avoids history complexity.

## 9. Accessibility

- Skip link to `#main`, visible on focus.
- One `<h1>` per page; headings descend in order.
- Landmarks: `header`, `nav`, `main`, `footer`; the mobile menu button uses `aria-expanded` + `aria-controls`.
- 3px `:focus-visible` outline using `--focus`; accent outline on dark bands.
- Mobile menu: opens on click, closes on link click, `Esc`, outside click, and resize above 860px; focus moves into the panel on open and back to the toggle on `Esc`.
- Alt text is written per language and describes the dish/scene, not the file.
- Images have intrinsic dimensions; `loading`/`decoding` are set per position.
- Motion respects reduced-motion.
- Language switch links to the *equivalent* page, with `hreflang` and `lang` attributes; the current language is marked, not linked.
- Contrast: see §5.5. The active palette passes AA for brand, hover, buttons, muted text, body, and accent-on-dark.
- The site sets no cookies, loads no analytics, and makes no third-party requests except the Unsplash images.

## 10. SEO and metadata

- Per-page `<title>` and meta description from JSON.
- Canonical URL derived from `site.url` + pathname.
- `hreflang`: `hr`, `en`, `x-default` on every page.
- Open Graph + Twitter card with title, description, image, locale and alternate locale.
- JSON-LD `ProfessionalService`: name, description, URL, image, `areaServed` (Istria, Croatia), price range, `sameAs` booking profile.
- `robots.txt` allows everything; `404.html` is generated for Netlify.
- No sitemap is generated. If search visibility matters, submit the four URLs manually or add `@astrojs/sitemap`.

## 11. Netlify constraints

- `output: 'static'`; the build writes plain HTML, CSS, JS, and fonts to `dist/`.
- Build command: `npm run build`; publish directory: `dist`.
- Node: `>=22.23.4` declared in `package.json` → `engines`. Netlify's build image honours this; otherwise set `NODE_VERSION=22`.
- `trailingSlash: 'always'` + `build.format: 'directory'` → `/galerija/index.html`, `/en/gallery/index.html`. Netlify serves the trailing-slash URLs directly.
- No Netlify Functions, Forms, redirects, edge handlers, or `netlify.toml`. The project deploys as a pure static site.
- After attaching a custom domain, update **both** `astro.config.mjs` → `site` and `src/config.ts` → `url`, then redeploy so canonical/hreflang/OG URLs are correct.

## 12. Performance notes

- No client framework; Astro ships zero component JavaScript.
- Three small inline scripts: reveal observer, mobile menu, lightbox.
- Fonts are self-hosted and variable — two families, no render-blocking third party.
- CSS is one global stylesheet plus palette tokens; no utility framework.
- The only heavy assets are photographs. Hotlinked Unsplash images are resized by URL parameters; local photos must be compressed before launch.
- Lazy loading starts after the first two gallery images, which keeps the top of the gallery fast without leaving holes during a normal scroll.

## 13. File map

```
src/
  components/   Header, Footer, HomePage, GalleryPage, GalleryGrid, CtaBand, Icon
  data/         site/hr.json, site/en.json, images.json, gallery.json
  layouts/      BaseLayout.astro
  lib/          content.ts (typed content + image joins)
  pages/        index, galerija, en/index, en/gallery, 404
  styles/       palettes.css, global.css
public/         favicon.svg, robots.txt, future local images
docs/           design specification + development guide
CONTENT.md      launch checklist of every placeholder
docs/development.md   local run, Netlify deploy, editing, palette switching
```

## 14. Verification record (27 Oct 2026)

Production build: **5 pages** (`/`, `/en/`, `/galerija/`, `/en/gallery/`, `/404.html`), no build warnings.

Headless Chromium checks against the built `dist/`:

- **Console/network:** 0 console errors, 0 page errors, 0 failed requests across HR/EN desktop and mobile.
- **Images:** 10/10 home images and 16/16 gallery images loaded after scrolling; no broken URLs.
- **Reveal:** 23/23 `[data-reveal]` elements visible after a full scroll; all computed opacities 1.
- **Signature row:** chef name and "what the evening looks like" link bottom edges within 3px.
- **Lightbox frame:** figure 1080px wide, stage 700px tall, identical for portrait, square, and landscape photos; prev/next button coordinates identical across all three.
- **Lightbox open:** dialog opacity sampled at 0.36 after 50ms → 1.0 after 500ms (fade confirmed).
- **Photo change:** `is-out` + −10px shift → swap → `is-in` from +10px with caption crossfade; caption updates correctly.
- **Close paths:** outside click triggers the closing class and closes; clicking the image keeps it open; `Esc` closes.
- **Mobile (390×844):** menu opens with `aria-expanded="true"`, panel visible at opacity 1, links 58px tall, `Esc` closes; mobile lightbox outside click closes.
- **Reduced motion:** lightbox opens instantly (opacity 1 within 120ms) and closes instantly.
- **EN pages:** `lang="en"`, Istria copy present, no Dalmatia references, canonical + `hr`/`en`/`x-default` hreflang and JSON-LD on all four pages.

## 15. Known limitations and deliberate decisions

- **Placeholders remain:** brand name, chef name, Take a Chef URL, prices, reviews, photos, domain, Instagram. See `CONTENT.md`.
- **Unsplash hotlinks** are temporary. They are not optimised for the site's exact breakpoints and will be replaced by local photos.
- **No CMS:** editing JSON is the intended workflow; the copy is structured for it.
- **No sitemap or analytics:** intentionally omitted to keep the build and privacy surface minimal.
- **Palette 3 is the only fully AA-audited palette.** Switching to 1, 2, or 4 requires the small contrast edits noted in §5.5.
- **Lightbox is not deep-linkable** and does not preload the whole gallery; it preloads the next image on demand.
- **Reviews are placeholders.** They must be replaced with real, permitted quotes or removed before launch.
- **The site is not a git repository.** No commits were made; version control is the owner's choice.
