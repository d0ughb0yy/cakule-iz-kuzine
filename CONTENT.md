# Launch checklist — what to replace before going live

Everything below is a placeholder or an assumption in the prototype. Work top to bottom; the site is built to run without a CMS, so each item is a small edit in a JSON or TypeScript file.

Legend: **required** = do not launch without it · **recommended** = affects trust or legal safety · **optional** = nice to have.

---

## 1. Identity

| # | Item | Where | Current placeholder | Status |
| --- | --- | --- | --- | --- |
| 1.1 | Brand / site name | `src/config.ts` → `site.name` | `Čakula iz Kužine` | **required** |
| 1.2 | Chef's name | `src/data/site/hr.json` → `intro.signature`; `src/data/site/en.json` → `intro.signature` | `Chef [Ime]` / `Chef [Name]` | **required** |
| 1.3 | Instagram (leave empty to hide) | `src/config.ts` → `instagramUrl` | empty | optional |
| 1.4 | Favicon | `public/favicon.svg` | Palette 3 monogram | optional |

The brand name is used in the header, footer, page titles, 404, and structured data. Change it in `src/config.ts` only — the templates read from there.

## 2. Booking

| # | Item | Where | Current placeholder | Status |
| --- | --- | --- | --- | --- |
| 2.1 | Take a Chef profile URL | `src/config.ts` → `bookingUrl` | `https://www.takeachef.com/` | **required** |
| 2.2 | Confirm the profile accepts bookings for up to 6 guests | Take a Chef dashboard | — | **required** |
| 2.3 | Confirm service area matches the site | Take a Chef dashboard | Istria, Croatia | **required** |

Every CTA on both pages — header, hero, menu cards, gallery CTA band, footer — reads `bookingUrl`. There is no contact form or on-site booking engine by design. If the profile URL is wrong, every button is wrong.

## 3. Copy

| # | Item | Where | Notes | Status |
| --- | --- | --- | --- | --- |
| 3.1 | Croatian copy review | `src/data/site/hr.json` | Written as a first draft; have the chef read it aloud and adjust to their voice. | **required** |
| 3.2 | English copy review | `src/data/site/en.json` | Mirrors the Croatian structure key for key. If you add or remove a menu/item in one file, do the same in the other. | **required** |
| 3.3 | Service area wording | `src/config.ts` → `serviceArea`; both site JSON files (`hero.eyebrow`, `faq`, `footer`) | Currently Istria / Istra. Decide whether nearby areas (Kvarner, Trieste, Ljubljana) should be mentioned. | recommended |
| 3.4 | Menu names and dishes | `hr.json` / `en.json` → `menus.items` | Three sample menus: S tržnice / Jadran / Vrt. These should be dishes the chef actually cooks in season. | **required** |
| 3.5 | "Included" list | `hr.json` / `en.json` → `included.items` | Confirm each claim is true (travel, shopping, service, cleanup, discretion). | **required** |
| 3.6 | FAQ answers | `hr.json` / `en.json` → `faq.items` | Travel radius, kitchen requirements, lead time, deposit, cancellation. Current answers are plausible defaults, not confirmed policy. | **required** |
| 3.7 | Page titles and meta descriptions | `hr.json` / `en.json` → `meta`, `galleryPage.metaTitle`, `galleryPage.metaDescription` | Include the location and "private chef" for search. | recommended |
| 3.8 | 404 page copy | `src/pages/404.astro` | Bilingual by design. | optional |

## 4. Prices

| # | Item | Where | Current placeholder | Status |
| --- | --- | --- | --- | --- |
| 4.1 | Indicative "from" price | `hr.json` / `en.json` → each `menus.items[].price` | `od 75 € po osobi` / `from €75 per person` | **required** |
| 4.2 | Price disclaimer | `hr.json` / `en.json` → `menus.priceNote` | "Prices are indicative and depend on the menu and location…" | **required** |
| 4.3 | Confirm the copy does not promise a fixed price | Both JSON files | The wording says "from" on purpose; Take a Chef issues the real quote. | recommended |

There are no other prices on the site. Do not add per-course pricing unless the chef wants to commit to it.

## 5. Reviews

| # | Item | Where | Current placeholder | Status |
| --- | --- | --- | --- | --- |
| 5.1 | Replace the two sample quotes | `hr.json` / `en.json` → `testimonials.items` | "Sarah, London" and "Ana & Marko, Rovinj" | **required** |
| 5.2 | Get permission to publish names and locations | — | Use first name + city, or initials, if guests prefer | **required** |
| 5.3 | If there are no real reviews yet, remove the section | `src/components/HomePage.astro` → the `<section>` containing `quote-grid`; also `testimonials` in both JSON files | — | alternative |

Publishing invented reviews is a legal and trust risk. Either use real, permitted quotes or delete the section before launch.

## 6. Photography

| # | Item | Where | Current placeholder | Status |
| --- | --- | --- | --- | --- |
| 6.1 | Replace all Unsplash photos with real work | `src/data/images.json` | 18 hotlinked Unsplash images | **required** |
| 6.2 | Add local files | `public/images/` (create it) | — | **required** |
| 6.3 | Set real dimensions | `src/data/images.json` → `width`, `height` | Unsplash dimensions | **required** |
| 6.4 | Rewrite alt text in both languages | `src/data/images.json` → `alt.hr`, `alt.en` | Descriptive, but describes stock photos | **required** |
| 6.5 | Update gallery captions | `src/data/gallery.json` | Generic dish descriptions | recommended |
| 6.6 | Keep the hero and intro free of identifiable strangers | `images.json` → `hero`, `intro` | Intro is a hands-only photo on purpose | recommended |

How to swap an image (four steps) is in `README.md` → "Replacing an Unsplash image with a real photo". Keep the aspect ratio close to the slot it fills: hero and intro are 4:5, menu cards 4:3, gallery images vary.

**Photo quality bar:** natural light, real tables, real hands, no heavy filters. The design leans on whitespace and typography; overly styled stock imagery undercuts it.

## 7. Domain and deployment

| # | Item | Where | Current placeholder | Status |
| --- | --- | --- | --- | --- |
| 7.1 | Production URL | `astro.config.mjs` → `site`; `src/config.ts` → `url` | `https://cakule-iz-kuzine.netlify.app` | **required** |
| 7.2 | Connect the custom domain in Netlify | Netlify dashboard | — | **required** |
| 7.3 | Rebuild after changing the URL | `npm run build` | — | **required** |
| 7.4 | Check canonical + hreflang after deploy | View source on all four pages | They derive from `site.url` | recommended |
| 7.5 | Submit the sitemap or request indexing | Google Search Console | No sitemap is generated; submit the four URLs manually or add `@astrojs/sitemap` | optional |
| 7.6 | Add an OG image if social previews matter | `src/layouts/BaseLayout.astro` → `ogImage` | Uses the hero Unsplash image | optional |

Netlify settings: build command `npm run build`, publish directory `dist`, Node 22 from `.nvmrc` (or `NODE_VERSION=22` as a fallback). No functions, forms, redirects, or `netlify.toml` are required.

## 8. Legal and trust (Croatia / EU)

| # | Item | Where | Status |
| --- | --- | --- | --- |
| 8.1 | Privacy notice if analytics, embedded maps, or a contact form are ever added | New page or footer link | optional |
| 8.2 | Business/sole-trader details (name, address, VAT ID) if required for Croatian e-commerce/consumer law | Footer | recommended — confirm with an accountant |
| 8.3 | Cookie banner only if non-essential cookies are introduced | — | not needed today: the site sets no cookies and loads no analytics |
| 8.4 | Photo credits | `hr.json` / `en.json` → `footer.photoCredit` | Remove the "Temporary photography: Unsplash" line once real photos are in |

The current build loads no third-party scripts, fonts from Google, or analytics. Fonts are bundled from `@fontsource`, so there is no third-party request beyond the Unsplash images — and those disappear when real local photos replace them.

## 9. Final pre-launch pass

- [ ] `npm install && npm run build` succeeds from a clean checkout.
- [ ] All four pages return 200: `/`, `/galerija/`, `/en/`, `/en/gallery/`.
- [ ] No "Dalmacija", "Dalmatia", "Split", or stock-photo credit remains.
- [ ] Every CTA opens the real Take a Chef profile in a new tab.
- [ ] Language switch keeps you on the equivalent page (home ↔ home, gallery ↔ gallery).
- [ ] Gallery: all photos load while scrolling; lightbox opens, arrows stay still between portrait and landscape photos, outside click and `Esc` close it.
- [ ] Mobile: menu opens and closes; hero and menu cards are readable at 390px.
- [ ] Prices say "from" and the disclaimer is visible.
- [ ] Reviews are real and permitted, or the section is removed.
- [ ] Footer year, service area, and Instagram link are correct.
- [ ] Check the site with `prefers-reduced-motion` enabled — animations should disappear, not break.
