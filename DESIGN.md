---
name: Čakule iz Kužine
description: A restrained, seasonal editorial site for a private chef in Istria — Barlow Condensed display over Barlow body, three-colour palette, type-does-the-decorating.
colors:
  ground: "#eff2e9"
  ink: "#1b2418"
  ink-soft: "#4c5747"
  accent: "#2c5f16"
  accent-deep: "#1e4210"
  accent-soft: "#dfe6cf"
  chartreuse: "#c9d94e"
  field: "#1e2a18"
  on-field: "#eff2e9"
  on-field-soft: "#c9d1bf"
  line: "#cbd1c1"
  muted: "#4c5747"
typography:
  display:
    fontFamily: "Barlow Condensed, Barlow, Helvetica Neue, Arial, sans-serif"
    fontWeight: 700
    fontSize: "clamp(5rem, 14vw, 13rem)"
    lineHeight: 0.82
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Barlow Condensed, Barlow, Helvetica Neue, Arial, sans-serif"
    fontWeight: 700
    fontSize: "clamp(2.25rem, 4.4vw, 4rem)"
    lineHeight: 1
    letterSpacing: "-0.02em"
  page-title:
    fontFamily: "Barlow Condensed, Barlow, Helvetica Neue, Arial, sans-serif"
    fontWeight: 700
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Barlow Condensed, Barlow, Helvetica Neue, Arial, sans-serif"
    fontWeight: 700
    fontSize: "clamp(1.5rem, 2.3vw, 2.25rem)"
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Barlow, Helvetica Neue, Arial, sans-serif"
    fontWeight: 400
    fontSize: "clamp(1.125rem, 1.35vw, 1.375rem)"
  body:
    fontFamily: "Barlow, Helvetica Neue, Arial, sans-serif"
    fontWeight: 400
    fontSize: "1.0625rem"
    lineHeight: 1.6
  menu-item:
    fontFamily: "Barlow, Helvetica Neue, Arial, sans-serif"
    fontWeight: 400
    fontSize: "clamp(1.05rem, 1.3vw, 1.18rem)"
    lineHeight: 1.5
  link:
    fontFamily: "Barlow, Helvetica Neue, Arial, sans-serif"
    fontWeight: 400
    fontSize: "0.95rem"
  label:
    fontFamily: "Barlow, Helvetica Neue, Arial, sans-serif"
    fontWeight: 600
    fontSize: "0.875rem"
  micro:
    fontFamily: "Barlow, Helvetica Neue, Arial, sans-serif"
    fontWeight: 400
    fontSize: "0.75rem"
    letterSpacing: "0.12em"
spacing:
  gutter: "clamp(1.25rem, 3.5vw, 3rem)"
  section-y: "clamp(4rem, 7vw, 7rem)"
components: {}
---

# Design System: Čakule iz Kužine

## Overview

**Creative North Star: "The Istrian Table."**

A private chef in Istria rents a stranger's kitchen and turns a season into a dinner. The site behaves the same way: it shows up, stays out of the way, and lets the food and the hospitality carry the evening. There is no decorative noise — no patterns, no gradients, no script fonts, no dark-luxury clichés. Restraint is the brand.

The design is intentionally **seasonal editorial**: a well-printed food magazine from the Mediterranean. Generous whitespace, a condensed display face that sets a confident table, a quiet three-colour palette rooted in olive groves and garden herbs, and rectangular photography allowed to breathe. Type does the decorating; anatomy is hairline and sharp.

**Key Characteristics:**
- One grounded `ground`, one `ink`, one `accent` — plus a single inverted `field` for emphasis. Three jobs, four surfaces.
- Typography carries hierarchy. Bounds, hairlines, and whitespace do the composition; there are no boxes bullying the eye.
- Rectangular, uncropped-by-mask photography; the decoration budget is nearly empty — selection color, the focus halo, the CTA-band button hover, and the footer booking link are the only chartreuse appearances.
- Immobile furniture: nothing the visitor is reading moves. Motion is short, decorative, and disabled under reduced-motion.

## Colors

The palette is Palette 3 — **deep green, olive, chartreuse on a bone ground.** It reads as Istria without becoming a "green website." Colors are semantic roles, never literal hexes, so the layout survives switching palettes.

### Primary
- **Deep Green (Accent)** (`#2c5f16`): the one interactive color — primary buttons, the caret in form fields. Rare by design.
- **Deep Green Deep** (`#1e4210`): hover/down state for accent, the invalid-field underline, dark band backgrounds.

### Secondary
- **Chartreuse** (`#c9d94e`): the single "surprise" note — text selection, the outer focus-ring halo, the CTA-band button hover, and the footer booking link.
- **Accent Soft** (`#dfe6cf`): the tinted band behind the menus and (again) the contact panel.

### Neutral
- **Bone (Ground)** (`#eff2e9`): page background and the raised form panel.
- **Ink** (`#1b2418`): body text.
- **Ink Soft** (`#4c5747`): secondary text, captions, labels.
- **Field** (`#1e2a18`): the inverted band for statement / CTA / footer; text on it is `on-field`.
- **On Field** (`#eff2e9`) / **On Field Soft** (`#c9d1bf`): text on dark.
- **Line** (`#cbd1c1`): hairline table and form lines only — never a section divider.

### Named Rules
**The Three-Job Rule.** The page uses only `ground`, `ink`, and `accent` as jobs, plus one inverted `field`. A new visual idea must earn one of these four surfaces — it is not an excuse to add a color.

**The Hairline Rule.** Borders are 1px hairlines. The only thickness that varies is the 2px invalid-underline, because it must survive native validation messaging. `--line` is for tables and form underlines, never section borders.

## Typography

**Display Font:** Barlow Condensed (weight 700, tight tracking to `-0.03em`)
**Body Font:** Barlow (weight 400–650)
**Label Font:** Barlow (weight 600)

Both are bundled locally via `@fontsource` — no font from Google, no third-party request. This is the deliberate, shipped type system. (The original build spec's Fraunces/Inter pairing is **superseded by decision**; see the spec §5.2 note. Barlow Condensed over Barlow is the system of record.)

**Character:** A confident-but-quiet editorial voice. The condensed display packs typographic strength into a small footprint, letting the chef's name and section titles set a table without shouting. Body Barlow stays soft, neutral, and highly readable — the guest speaks, the headline sets the room.

### Hierarchy
- **Display** (Barlow Condensed, 700, `clamp(5rem, 14vw, 13rem)`, line-height 0.82, `-0.03em`): the chef's two-line name over the hero photo. `--monument`.
- **Headline** (Barlow Condensed, 700, `clamp(2.25rem, 4.4vw, 4rem)`, line-height ~1): section titles and the statement quote. `--display`.
- **Page Title** (Barlow Condensed, 700, `clamp(2.5rem, 6vw, 5rem)`, line-height 0.95): the gallery page and 404 `h1`s.
- **Title** (Barlow Condensed, 700, `clamp(1.5rem, 2.3vw, 2.25rem)`): `h3`, step and menu titles; menu tabs inherit this. `--heading`.
- **Lead** (Barlow, 400, `clamp(1.125rem, 1.35vw, 1.375rem)`): section intros. `--lead`.
- **Body** (Barlow, 400, `1.0625rem`, line-height 1.6): paragraphs, `text-wrap: pretty`. `--body`.
- **Menu Item** (Barlow, 400, `clamp(1.05rem, 1.3vw, 1.18rem)`, line-height 1.5): dish names inside menu panels.
- **Link** (Barlow, 400, `0.95rem`): header navigation links.
- **Label / Small** (Barlow, 600, `0.875rem`): course labels, menu tab descriptions, language switch. `--small`.
- **Micro** (Barlow, 400, `0.75rem`, `0.12em` tracking, uppercase): the `or` / `ili` separator between dish options.

**Breakpoint variants.** Media queries adjust documented roles rather than introducing new sizes: menu tabs compress to `1.25rem` ≤960px, the hero name steps to `clamp(3rem, 17vw, 6rem)` ≤680px and `clamp(2.9rem, 19vw, 6rem)` ≤399px, and the statement quote drops to `1.5rem` ≤680px. These live in `src/styles/global.css` and are intentional exceptions to the ramp above.

Fluid scale hits every viewport; the hero name (`--monument`) climbs aggressively (`clamp(5rem, 14vw, 13rem)`) but is capped on narrow phones so it holds over the full-bleed photo.

### Named Rules
**The Type-Does-The-Decorating Rule.** Hierarchy is carried by weight, scale, and tracking, not by borders or backgrounds. If a section needs a rule to separate itself, the over-step is in the type scale, not a new line.

## Layout

- **Content width:** `min(var(--max), 100% − 2×gutter)`; `--max` is `1440px`, gutter `clamp(1.25rem, 3.5vw, 3rem)`.
- **Section rhythm:** `--section-y` is `clamp(4rem, 7vw, 7rem)` block padding, shared by every band including the contact panel.
- **Grid language:** editorial two-column splits. The hero is a full-split name over a photograph; `intro`, `included`, `faq`, and `contact` use a text-column / figure-or-surface split. Dark bands (`statement`, `cta`, `footer`) are set on the single inverted `field`.

Responsive behavior:
- **≤960px** sections stack to single column; figures cap at roughly `44rem`. The hero moves to a single-column page-hero.
- **≤680px** the hero photo runs full-bleed edge-to-edge and carries the first screen; a neutral scrim keeps the name legible over it. The header becomes a wrapping two-row brand-over-nav; gallery-teaser stacks to one column; menu tabs stack with 2px underlines.
- **≤399px** the hero photo height is reduced and the display type capped so the name stays readable.

## Elevation & Depth

The system is **flat by default**. Depth is conveyed by alternating tonal bands (`ground` ↔ `field`) and by typographic scale, not by shadows. This is asserted, not accidental: a light–dark–light band rhythm paces the scroll without introducing color.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. There is no ambient shadow vocabulary; an element that needs lift earns it through tone, never a drop-shadow costume.

## Shapes

Corner language is **square**. Buttons, inputs, panels, frames, and images are all radius `0`. Borders are hairlines; the only curved geometry is the lightbox nav's circular buttons.

### Named Rules
**The Square-Voice Rule.** Sharp corners and hairlines project hand-made restraint. Rounded-card layouts are an anti-reference for this system.

## Components

### Buttons
- **Shape:** square (radius 0), inline-flex, min-height 48px (touch target), padding `0.8rem 1.4rem`.
- **Primary (`btn`):** `background: var(--accent)`, `color: var(--on-field)`, weight 600, arrow icon inline. Hover/down darkens to `--accent-deep` over 180ms.
- **CtaBand variant (`btn--light`):** on the inverted field the button flips — bone background (`--on-field`) with dark `--field` text; hover turns the fill chartreuse with ink text. The one place the button inverts.
- **No ghost/secondary buttons:** the site uses one button voice plus text links (`link-arrow`, an arrow inline). This restraint is deliberate.

### Inputs / Fields (Contact panel)
- **Style:** label above; input is borderless except a 1px `--line` bottom hairline, transparent background, `caret-color: var(--accent)` — so the caret is the one note of color while typing.
- **Hover:** underline warms to `--ink-soft`.
- **Error:** native validation drives it; once truly edited, `:user-invalid` swaps to a 2px `--accent-deep` underline so the flag survives the native bubble. `:focus-visible` uses the global two-tone ring — a 3px ink ring inside an 8px chartreuse halo (`outline-offset: 3px`); on dark bands the ring flips to `--on-field`.
- **Labels:** Barlow small (600) in `--ink-soft`. Fields have correct `autocomplete` and `required`. Name/surname share a two-column row at every width; ≤680px only the row gap tightens.
- **Delivery:** `mailto:` compose, no backend — nothing is stored.

### Navigation (Header)
- **Desktop:** wordmark (`brand`) left; the three anchor links (menus, contact, gallery) and the HR/EN language pair right, one 72px row. Plain text anchors with an `--ink`→`--accent` hover; the active language is marked (`aria-current`), not linked.
- **Mobile (≤680px):** collapses to a disclosure menu. Row one holds the brand left and the **language pair stays outside the panel** (wayfinding, not navigation) beside a 44px menu toggle (`menu`/`close` icon swap, `aria-expanded` + `aria-controls`). Row two is the stacked link panel: full-width rows at ~58px tap height, spacing only — no hairlines between items.
- **Behavior:** closes on link click, `Esc` (focus returns to the toggle), outside click, and resize above the breakpoint; focus moves to the first link on open. Opens with a 300ms height collapse (`grid-template-rows 0fr ↔ 1fr`) plus a 240ms fade — never a snap. Without JavaScript the toggle hides and the panel stays visible stacked — the header never becomes a dead button.

### Menu Explorer
- **Tabs** are text buttons (Barlow Condensed 700) with name + small description; active depth comes from underline and weight. They are an **`aria-pressed` toggle group, deliberately not a WAI-APG tabs widget** — three tabs, click to switch, no roving tabindex or arrow-key semantics; without JavaScript all panels stay visible. Record any future change to real tabs semantics as a decision, not a drift.
- **Panels:** each menu is a fixed-height sheet; inactive panels are `hidden`. Course name + one/two dish options; two options sit side by side with an uppercase `or` separator in hairline borders. No menu photography.

### Lightbox
- Native `<dialog>` (`showModal`), square photo stage with `object-fit: contain`, prev/next/shape controls, `aria-live` caption, keyboard (`←`/`→`/`Esc`), outside-click close, swipe on touch, and a token counter so rapid arrow presses cannot render the wrong photo. Focus returns to the trigger on close.

### Intro Byline
- A small square portrait (`4.5rem`, radius 0, `object-fit: cover`) beside the chef's name and one humanizing line, sitting between the intro paragraphs and the section link. The image is decorative (`alt=""`) — the name beside it is the content. It reads as an author byline, not a card: no border, no background, whitespace only.

### Contact Panel
- Accent-soft band (like menus) containing a `ground`-colored panel with the form — same syntax as the menu panel. Heading, lead, and a "reply within 24h" note left; form right.

## Do's and Don'ts

### Do:
- Do use one accent per surface and let it stay rare — the green button and the occasional chartreuse note (selection, focus halo, one hover, one footer link) are the entire drama budget.
- Do use Barlow Condensed for display/headings and Barlow for body and UI. Do keep `--monument` fluid and capped on narrow phones.
- Do use hairline (1px) borders and square corners; let whitespace and type carry the section change.
- Do alternate light (`ground`) and dark (`field`) bands to pace the scroll, reusing the same two surfaces.
- Do keep every image rectangular with intrinsic `width`/`height` (no layout shift) and local `alt` per language.

### Don't:
- Don't add a second accent, a script display face, gold, or dark-luxury styling — restraint is the brand.
- Don't use shadows for depth or rounded cards as the page skeleton; tone bands and type scale do that work.
- Don't put an image inside a decorative mask (circle, shape) — photography is rectangular and uncropped.
- Don't use `--line` as a section divider; it exists for tables and form underlines only.
- Don't use a stock face anywhere. The intro byline (`chef-portrait` in `images.json`) ships a hands-only placeholder until the chef's real portrait replaces it — one entry swap, no markup change (`CONTENT.md` §6.6).