# West India Company — Brand & Build Guideline

**Version:** 2.0
**Status of this file:** authoritative. Where this file gives a number, use that number. Where it does not, follow §12 Hard Rules and make the quietest defensible choice.

---

## 0. How to read this file

This document is written to be executed, not admired. It is ordered by what you need first.

| If you are… | Read |
|---|---|
| Setting up the file | §1, §5, §11 |
| Writing markup | §6, §7, §8 |
| Writing copy | §3, §4 |
| Choosing or placing images | §9 |
| About to ship | §10, §12, §14 |

**Do not invent brand facts.** Everything you need is in §1. If something is genuinely missing, use a visible `TODO:` comment in the HTML rather than inventing a plausible-sounding fact. Inventing artisan names, certifications, review counts, or press mentions is a hard failure — see §13.

---

## 1. Brand facts

These are inputs, not suggestions.

| Field | Value |
|---|---|
| Brand name | West India Company |
| Tagline (as supplied) | "East and west, our company is the best" — **flagged, see §15** |
| Category | Clothing |
| Method | Handmade. Handloom-woven and hand-finished. No powerloom, no machine mass-production. |
| Audience gender | **Unisex.** One catalogue. No "Men" / "Women" split in navigation. |
| Market | India (domestic-first) |
| Currency | INR (₹), displayed inclusive of GST |
| Differentiator | Every garment is made by hand on a loom, by a named weaver, and the site says who. |
| Price tier | Premium-accessible: above Flipkart/Amazon handloom listings, below designer label |
| Deliverable | A single `index.html` — no build step, no framework, no bundler |

### 1.1 Product categories (10)

Unisex sizing across all apparel categories. Category slugs are for anchors and filter values.

| # | Category | Slug | Price band (₹) |
|---|---|---|---|
| 1 | Shirts | `shirts` | 2,290 – 3,890 |
| 2 | Kurtas | `kurtas` | 2,490 – 4,690 |
| 3 | Overshirts & Jackets | `overshirts` | 4,290 – 8,900 |
| 4 | Trousers | `trousers` | 2,190 – 3,490 |
| 5 | Dresses & Kaftans | `dresses` | 3,490 – 6,900 |
| 6 | Co-ord Sets | `co-ords` | 4,890 – 8,490 |
| 7 | Sarees & Drapes | `sarees` | 4,900 – 14,500 |
| 8 | Stoles & Scarves | `stoles` | 1,290 – 3,290 |
| 9 | Loungewear | `loungewear` | 2,690 – 4,490 |
| 10 | Fabric by the Metre | `fabric` | 690 – 1,890 / metre |

**Anchor price:** a core handloom cotton shirt is **₹2,890**. Use this whenever one representative price is needed.

These bands sit deliberately above mass-market handloom listings (roughly ₹500–2,000 on large marketplaces) and inside the range artisan-led Indian craft labels occupy (roughly ₹1,300–7,500 for apparel, higher for sarees). Do not undercut the bands to look competitive — the price *is* part of the positioning.

### 1.2 Price display rules

- Format: `₹2,890` — Indian digit grouping (`₹1,24,500`, not `₹124,500`), no decimals.
- Always append `Inclusive of all taxes` in small text on the product page.
- Sale price: current price first in `--madder`, original struck through in `--ink-muted`. Never invent a "was" price that was never charged.
- Fabric by the Metre shows `₹890 / metre` with a minimum-cut note.

---

## 2. Positioning & audience

**Positioning:** Handwoven clothing, made by named people, priced so you can actually wear it every day.

**Audience:** 25–45, Indian metros and tier-2 cities. Buys craft on purpose. Already knows what khadi, ikat and ajrakh are, or wants to. Reads care labels. Is suspicious of "artisanal" as a marketing word and will check whether you can name the weaver.

**What earns their trust:** specificity. A village name, a loom type, a number of days. Vagueness reads as a mill pretending.

**What loses it:** stock photos of white models in linen, fake scarcity timers, "artisanal luxury" language, and any claim you cannot evidence.

**Success test.** A first-time visitor should be able to answer, within 30 seconds: What do they sell? Is it actually handmade? Who made it? What does it cost? How do I buy it?

---

## 3. Voice & copy

**Voice:** plain, specific, unhurried. Sentence case. Active verbs. No superlatives you cannot prove.

The rule: **replace every adjective with a fact.** "Exquisite craftsmanship" is worth less than "14 days on a pit loom in Nuapatna."

| Write | Not |
|---|---|
| Woven by Sanjukta Behera, Nuapatna, Odisha | Crafted by skilled artisans |
| 14 days on a pit loom | Painstakingly created |
| Handspun cotton, natural indigo | Premium sustainable fabric |
| Free shipping over ₹2,000 | Amazing offers await |
| 6 pieces left of this weave | Only 3 left — hurry! |

**Buttons name what happens.** `Add to bag` → toast says `Added to bag`. `Place order` → confirmation says `Order placed`. One verb, all the way through the flow.

**Errors and empty states give direction, not mood.** `We don't ship to this pincode yet. Try another, or write to us.` Not `Oops! Something went wrong.`

**Never in copy:** "unleash", "elevate", "curated", "bespoke experience", "luxury redefined", "solutions", exclamation marks in product copy.

---

## 4. The signature: the Loom Record

This is the one element the site is remembered by. It exists because §1 says the difference is that a person made this, and everything else on the site is deliberately quiet so this can be loud.

**Every product page carries a Loom Record block:**

```text
THE LOOM RECORD
────────────────────────────
Woven by      Sanjukta Behera
Cluster       Nuapatna, Odisha
Loom          Pit loom
Yarn          Handspun cotton, 60s count
Dye           Natural indigo
On the loom   14 days
Metres woven  4.2
```

**Rules:**
- It appears above the description, not buried in an accordion. It is the reason for the price.
- Every field is filled or the row is omitted. Never `N/A`, never a placeholder name.
- The heading uses the label style (§5.3): uppercase, tracked, `--step--1`.
- Rows are a two-column definition list, hairline-ruled, no card, no shadow, no radius.

**Supporting motif — the selvedge rule.** Section dividers are not a 1px grey line. They are a woven-selvedge motif drawn in CSS, no image required:

```css
.rule-selvedge {
  height: 6px;
  background: repeating-linear-gradient(
    90deg,
    var(--ink) 0 1px,
    transparent 1px 5px
  );
  opacity: 0.35;
}
```

Use it between major homepage sections. Use it nowhere else — that is what makes it read as a signature and not as decoration.

**Homepage counterpart.** One section, mid-page: a live-feeling tally — number of weavers, clusters, total days on the loom this season. Numbers only, set in the display face at `--step-4`, no icons, no cards.

---

## 5. Design tokens

Single file, no build. Everything is a CSS custom property in `:root`. Never hard-code a colour, size, or duration anywhere else in the stylesheet.

### 5.1 Colour

Grounded in natural dye and undyed cloth, not in generic "premium neutral".

```css
:root {
  /* Ink */
  --ink:            #171717;  /* primary text, primary button fill */
  --ink-muted:      #5F5C57;  /* secondary text, metadata */

  /* Ground */
  --bg:             #EFEAE0;  /* Kora — undyed khadi. Page background. */
  --surface:        #FFFFFF;  /* Cards, drawers, modals, inputs */

  /* Dye */
  --indigo:         #22335C;  /* Accent. Links, focus ring, active states. */
  --madder:         #9B3B2E;  /* Sale price, errors, low stock. */
  --olive:          #6F7561;  /* Large text and accents ONLY — see note. */

  /* Line */
  --line:           #DCD5C8;  /* hairline dividers, decorative */
  --line-strong:    #8A8071;  /* input borders, interactive boundaries */
}
```

**Contrast, measured against `--bg` (#EFEAE0):**

| Token | Ratio | Verdict |
|---|---|---|
| `--ink` | 15.3:1 | Passes AAA. Body and headings. |
| `--ink-muted` | 5.5:1 | Passes AA. Secondary text. |
| `--indigo` | 10.3:1 | Passes AAA. Safe as text and as button fill (with white label). |
| `--madder` | 5.7:1 | Passes AA. Safe for sale price and error text. |
| `--olive` | 4.4:1 | **Fails AA for normal text.** Permitted only at ≥24px or ≥19px bold, or as a non-text accent. |
| `--line-strong` | 3.2:1 | Passes the 3:1 UI-component minimum. Input borders, toggles. |
| `--line` | 1.2:1 | Decorative only. Never the sole indicator of a control's boundary. |

**Colour rules**
- 90% of the interface is `--bg`, `--surface`, `--ink`, `--line`. Colour comes from the cloth in the photographs.
- `--indigo` is the only accent for interactive states. Do not introduce a second link colour.
- `--madder` means *something is wrong or something is reduced*. Never decorative.
- Never communicate stock, error, or selection state by colour alone (§10).

### 5.2 Typography

Two families. Loaded from Google Fonts with `preconnect`.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500&display=swap">
```

```css
:root {
  --font-display: "Fraunces", Georgia, serif;
  --font-body:    "Inter", system-ui, -apple-system, sans-serif;
}
```

**Why Fraunces and not Playfair Display.** Playfair is the default serif in nearly every AI-generated "premium brand" layout; on this brief it would read as a template. Fraunces is a variable serif with an optical-size axis and a softness that suits handwork rather than couture. Use weights **400 and 600 only** — no 700, no italic display.

**Roles**
- `--font-display` — hero headline, section headings, the Loom Record tally numbers, the price on the product page. Nowhere else.
- `--font-body` — everything else, including navigation, buttons and labels.

**Scale** (fluid, clamped — no media queries needed for type):

```css
:root {
  --step--1: clamp(0.78rem, 0.75rem + 0.15vw, 0.86rem);
  --step-0:  clamp(0.95rem, 0.90rem + 0.25vw, 1.0625rem);
  --step-1:  clamp(1.15rem, 1.05rem + 0.50vw, 1.375rem);
  --step-2:  clamp(1.40rem, 1.20rem + 1.00vw, 1.875rem);
  --step-3:  clamp(1.75rem, 1.40rem + 1.75vw, 2.75rem);
  --step-4:  clamp(2.25rem, 1.60rem + 3.25vw, 4.25rem);
  --step-5:  clamp(2.75rem, 1.50rem + 6.00vw, 6.50rem);
}
```

| Element | Size | Family | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Hero headline | `--step-5` | display | 400 | 1.02 | -0.025em |
| Section heading | `--step-3` | display | 400 | 1.12 | -0.02em |
| Sub-heading | `--step-1` | display | 600 | 1.25 | -0.01em |
| Body | `--step-0` | body | 400 | 1.6 | 0 |
| Product name | `--step-0` | body | 500 | 1.35 | 0 |
| PDP price | `--step-2` | display | 400 | 1 | -0.01em |
| Label / eyebrow | `--step--1` | body | 500 | 1.3 | **0.14em, uppercase** |
| Button | `--step--1` | body | 500 | 1 | 0.10em, uppercase |
| Fine print | `--step--1` | body | 400 | 1.5 | 0 |

**Rules**
- Maximum measure for running text: `68ch`.
- Only two weights per family. Never fake-bold, never `font-stretch`.
- Uppercase is for labels, eyebrows and buttons only. Never for headlines or body.
- Never centre a paragraph longer than two lines.

### 5.3 Space

```css
:root {
  --s-1: 4px;   --s-2: 8px;   --s-3: 12px;  --s-4: 16px;
  --s-5: 24px;  --s-6: 32px;  --s-7: 48px;  --s-8: 64px;
  --s-9: 96px;  --s-10: 128px; --s-11: 160px;
}
```

- Between major page sections: `--s-9` mobile, `--s-10` desktop. Editorial breaks may use `--s-11`.
- Inside a component: `--s-3` to `--s-5`.
- Page gutter: `--s-4` mobile, `--s-5` tablet, `--s-6` desktop.
- No arbitrary values. If you need something between two steps, you have a layout problem, not a spacing problem.

### 5.4 Radius, borders, elevation

This resolves a contradiction in v1, which asked for a flat editorial feel and then set a 8–12px default radius.

```css
:root {
  --r-0: 0;      /* images, product cards, sections — the default */
  --r-1: 2px;    /* buttons, inputs, selects */
  --r-full: 999px; /* pills and badges only */
}
```

- **Default radius is 0.** Photography is never rounded.
- **Shadows: none.** Separation comes from whitespace, hairline rules, and the `--surface` / `--bg` contrast.
- The single permitted exception is a drawer or modal overlay, which may use `0 1px 24px rgba(23,23,23,0.10)` to lift it off the page. Nothing else.

### 5.5 Motion

```css
:root {
  --dur-fast: 160ms;  /* hover, focus, press */
  --dur-base: 240ms;  /* image swap, accordion */
  --dur-slow: 360ms;  /* drawer, page-level reveal */
  --ease: cubic-bezier(0.2, 0, 0, 1);
}
```

- Animate `opacity` and `transform` only. Never `width`, `height`, `top`, or `left`.
- Scroll reveals: one per section maximum, fade + 12px rise, once, never re-triggering.
- No parallax. No auto-playing carousels. No loading spinners over 400ms of content — use a skeleton (§8).
- Reduced motion is not optional:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 5.6 Layout & breakpoints

```css
:root {
  --wrap: 1240px;        /* standard content */
  --wrap-narrow: 68ch;   /* running text, journal articles */
}
```

| Breakpoint | Min-width | Grid | Product grid |
|---|---|---|---|
| Mobile | 0 | 4 col, 16px gutter | 2-up |
| Large mobile | 480px | 4 col, 16px | 2-up |
| Tablet | 768px | 6 col, 24px | 3-up |
| Desktop | 1024px | 12 col, 24px | 3-up |
| Wide | 1280px | 12 col, 32px | 4-up |

- Hero and editorial imagery may break the wrapper and run full-bleed. Text never does.
- Mobile is 2-up for products, not 1-up: shoppers compare weaves side by side.
- Rearrange for mobile; do not shrink. Product image, name, price and Add to bag must be reachable without a horizontal scroll or a hidden accordion.

---

## 6. Components

### 6.1 Header

Sticky on scroll, `--surface` background, 1px `--line` bottom border, height 64px mobile / 80px desktop.

```text
[ WEST INDIA COMPANY ]     New   Shop   The Loom   Journal   About     [Search] [Account] [Bag 2]
```

Because the brand is unisex, **the top level is by garment, not by gender.** `Shop` opens a panel listing the 10 categories from §1.1 in a 2×5 grid, plus `View everything`.

- Bag count is a number in a `--r-full` pill, `--ink` fill, white text. Zero state shows no pill.
- Mobile: logo left, search + bag right, hamburger left of logo. Menu is a full-height drawer from the left, not a dropdown.
- One announcement bar maximum, dismissible, `--indigo` background, white text, `--step--1`. Content: shipping threshold or a real collection launch. Never a countdown.

### 6.2 Buttons

| Variant | Fill | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--ink` | `#FFFFFF` | none | Add to bag, Place order. **One per viewport.** |
| Secondary | transparent | `--ink` | 1px `--ink` | Explore, View all |
| Quiet | transparent | `--indigo` | none, underlined | Inline text actions |
| Disabled | `--line` | `--ink-muted` | none | Sold out, invalid form |

- Minimum hit area **44×44px**, all viewports.
- Padding: `--s-3` `--s-6`. Radius `--r-1`.
- Hover: `opacity: 0.85`, `--dur-fast`. No scale, no lift, no colour shift.
- Focus: `outline: 2px solid var(--indigo); outline-offset: 2px`. Never removed.
- Label is a verb phrase: `Shop the new weave`, not `Click here` or `Learn more`.

### 6.3 Product card

```text
┌───────────────────┐
│                   │   3:4 image, radius 0
│   PRODUCT IMAGE   │   hover: crossfade to on-model shot, --dur-base
│                   │
└───────────────────┘
Handspun Indigo Shirt        body 500, --step-0
₹2,890                       body 400, --ink
Nuapatna, Odisha             --step--1, --ink-muted
● ● ●                        colour dots, 20px, 1px --line-strong border
```

- The cluster name replaces the usual colour-swatch-only row as the third line. It is the differentiator, on every card.
- Colour dots have `title` and `aria-label` with the colour name — never colour alone (§10).
- Badges: at most one, text only, `--step--1` uppercase, top-left over the image. Permitted values: `New`, `Last few`, `Sold out`. No percentage-off starbursts.
- Whole card is one link. Do not nest a button inside a link.

### 6.4 Forms

- Input: `--surface` fill, 1px `--line-strong` border, `--r-1`, height 48px, padding `--s-4`.
- Label sits **above** the field, always visible. Placeholders are examples, never labels.
- Focus: 2px `--indigo` outline, offset 2px.
- Error: 1px `--madder` border **plus** a text message below **plus** `aria-describedby`. Never border colour alone.
- Required fields marked with the word `Required`, not an asterisk alone.
- Newsletter is one field and one button, inline on desktop, stacked on mobile. Never a modal, never on page load.

---

## 7. Pages

v1 specified only the homepage and product page. These are the seven the generator must produce or stub.

### 7.1 Homepage

```text
ANNOUNCEMENT (optional, dismissible)
HEADER
HERO                       one image, one headline, one primary CTA
NEW THIS SEASON            4 products, horizontal scroll on mobile
─ selvedge rule ─
SHOP BY CATEGORY           10 tiles from §1.1, 5×2 desktop / 2×5 mobile
─ selvedge rule ─
THE LOOM                   the tally from §4 — weavers, clusters, days
EDITORIAL                  full-bleed image + 68ch text, one story
BESTSELLERS                8 products, 4-up
HOW IT'S MADE              3 steps: yarn → loom → finish. Text-led.
NEWSLETTER                 one field
FOOTER
```

Do not add sections to lengthen the page. If a section has no real content, remove it — an eight-section homepage with substance beats a twelve-section one with filler.

**Hero content:**
- Eyebrow: `NEW — THE INDIGO SEASON`
- Headline (display, `--step-5`): `Cloth that took fourteen days.`
- Support (`--step-0`, max 2 lines): `Handwoven in Odisha and Kutch. Made by people we can name.`
- Primary: `Shop the new weave` · Secondary (quiet): `Meet the weavers`
- One image. Text sits in a `--bg` panel beside it on desktop, not laid over the photograph. On mobile, image above, text below. **Never text over an unmodified photo** — it fails contrast the moment the photo changes.

### 7.2 Collection / listing (PLP)

The largest gap in v1. Required:

- **Header:** category name (display, `--step-3`), one-line description, product count (`14 pieces`).
- **Filters:** desktop left rail 240px sticky; mobile a bottom sheet behind a `Filter` button showing the active count (`Filter (2)`).
  - Facets: Category, Size, Colour, Weave (ikat / khadi / ajrakh / jamdani / plain), Cluster, Price, In stock only.
  - Active filters render as removable pills above the grid, plus `Clear all`.
- **Sort:** Newest (default), Price low→high, Price high→low. A `<select>`, not a custom dropdown.
- **Grid:** per §5.6. Load more button, not infinite scroll — infinite scroll makes the footer unreachable.
- URL reflects filter state via query params so results are shareable.

### 7.3 Product page (PDP)

```text
┌──────────────┐  Handspun Indigo Shirt
│              │  ₹2,890  · display --step-2
│  MAIN IMAGE  │  Inclusive of all taxes  · --step--1 --ink-muted
│    3:4       │
│              │  Colour   Indigo · Kora · Madder    (named, not just dots)
└──────────────┘  Size     XS S M L XL XXL  [Size guide]
[▫][▫][▫][▫][▫]   Fit      Relaxed. Sized unisex — see guide.
                  
                  [ ADD TO BAG ]        primary, full width on mobile
                  Delivery  [ pincode ] → "Delivers by 2 Sep"

                  ─── THE LOOM RECORD ───   §4, always expanded
                  
                  Description
                  Fabric & care
                  Shipping & returns
                  Size guide
```

- Gallery is 5 images (§9.1). Desktop: main + vertical thumbnails, click to swap, no lightbox zoom on first load. Mobile: swipeable, with dot indicators.
- Size selection is required before Add to bag. Unselected → the button is enabled but on click focuses the size group and shows `Choose a size` in `--madder`. Never silently disabled.
- Out-of-stock sizes: struck through, `--ink-muted`, `aria-disabled="true"`, and the word `Sold out` on focus.
- Reviews: only render this block if real reviews exist. **Do not generate placeholder reviews** (§13).
- Sticky mobile bar appears once the main Add to bag scrolls out: product name, price, `Add to bag`.

### 7.4 Bag / cart

Slide-over drawer from the right, 420px desktop, full-width mobile.

- Line item: 3:4 thumbnail 72px, name, size, colour, quantity stepper, price, `Remove`.
- Subtotal, shipping line (`Free over ₹2,000` / `₹99`), estimated total.
- `Checkout` primary, `Continue shopping` quiet.
- **Empty state:** `Your bag is empty.` + `Shop new arrivals` + 3 bestsellers. Not an illustration, not a sad face.
- Quantity changes update in place. Never a full page reload.

### 7.5 Checkout

Single page, three collapsed sections, no account required.

1. **Contact** — email, mobile (10-digit, `+91` prefix shown, not typed).
2. **Delivery** — name, address lines, pincode (6-digit, triggers city/state autofill), city, state dropdown.
3. **Payment** — UPI, cards, netbanking, wallets, **Cash on Delivery**. COD is not optional in the Indian market; if it is unavailable for an order, say why inline.

- Order summary is sticky right on desktop, a collapsed accordion at the top on mobile.
- Show the GST line explicitly.
- One primary button: `Place order`. Confirmation page says `Order placed` and repeats the order number, delivery estimate, and support contact.
- No forced account creation. Offer account creation *after* the order is placed.

### 7.6 Search

- Opens as an overlay from the header, focus trapped, `Esc` closes.
- Suggestions after 2 characters: products (with thumbnail, name, price), then categories, then journal entries.
- **Zero results:** `No results for "jamdani shirt".` + `Check the spelling, or browse all shirts.` + 4 bestsellers. Never a blank screen.
- The input keeps its value when the overlay reopens.

### 7.7 Supporting pages

| Page | Must contain |
|---|---|
| The Loom | Cluster map or list, weave glossary (ikat, khadi, ajrakh, jamdani, kantha), named weaver profiles |
| Journal | Editorial entries, `--wrap-narrow` measure, one image per 400 words maximum |
| About | The founding, the no-machines commitment, and how it is verified (§13) |
| Size guide | Unisex chart in **both cm and inches**, garment measurements *and* body measurements, a fit note per category |
| Shipping & returns | Dispatch time, courier, COD availability, return window, who pays return shipping, refund timeline |
| Contact | Email, phone with hours, registered business address, GSTIN |
| 404 | `This page has come off the loom.` + search field + links to the 4 largest categories |

---

## 8. States

Every component needs four. v1 specified none of them.

**Loading.** Skeleton blocks in `--line` at 40% opacity, matching the final layout's dimensions exactly so nothing shifts when content lands. No spinners for content. A spinner is permitted only inside a button during submission, at 16px.

**Empty.** One sentence naming what is absent, one action to fix it. Bag, search, filtered PLP, wishlist, order history. Never an illustration.

**Error.** Say what happened and what to do. Keep the user's input. Never clear a filled form on error.
- Field-level: below the input, `--madder`, `--step--1`, plus `aria-describedby`.
- Page-level: an inline banner at the top of the affected region, not a toast, not a modal.

**Success.** A toast, bottom-centre mobile / bottom-left desktop, `--ink` fill, white text, 4 seconds, dismissible, `role="status"`. Wording matches the button verb (§3).

**Cumulative layout shift is a bug.** Every image gets explicit `width` and `height` attributes. Every skeleton matches its final size.

---

## 9. Imagery

There are no brand assets yet. This section covers both the target and the interim.

### 9.1 Shot list (per product)

| # | Shot | Ratio | Purpose |
|---|---|---|---|
| 1 | Flat lay, full garment, front | 3:4 | Grid thumbnail. Shape and colour. |
| 2 | On-model, full length | 3:4 | Hover swap. Fit and drape. |
| 3 | On-model, three-quarter | 3:4 | How it moves. |
| 4 | Weave close-up, ~15cm crop | 3:4 | **The proof.** The visible irregularity of handloom. |
| 5 | Detail — selvedge, button, hem | 3:4 | Finish quality. |

Shot 4 is mandatory on every product. It is the visual evidence for the price and the claim.

### 9.2 Ratios elsewhere

| Slot | Desktop | Mobile |
|---|---|---|
| Hero | 16:9 | 4:5 |
| Category tile | 1:1 | 1:1 |
| Editorial | 3:2 | 3:2 |
| Lookbook | 2:3 | 2:3 |
| Journal header | 21:9 | 3:2 |

### 9.3 Direction

- Daylight. Indoors near a window, or open shade. No studio strobe, no hard flash.
- Backgrounds: lime-washed wall, mud plaster, raw cotton, the loom itself. Never seamless white.
- Models: Indian, a real range of body types and ages, standing still and looking at the camera. Not laughing, not mid-stride.
- Colour treatment consistent across the catalogue: one LUT, no per-image filters. Cloth colour must be true — colour returns are expensive.
- **Never:** stock photography of Western models in linen, AI-generated garments, competitor product shots, heavy grain, vignettes, or motion blur used as an aesthetic.

### 9.4 Interim assets (before a shoot exists)

Until real photography exists, generate placeholders **in CSS**, not from a third-party image service:

```css
.ph { background: var(--line); position: relative; }
.ph::after {
  content: attr(data-label);
  position: absolute; inset: 0;
  display: grid; place-items: center;
  font: 500 var(--step--1)/1 var(--font-body);
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--ink-muted);
}
```

Each placeholder carries `data-label` naming the intended shot (`ON-MODEL 3:4`, `WEAVE DETAIL`) so the shoot brief writes itself.

If real photographs are needed for a demo, source only from **Unsplash** or **Pexels** under their free licence, using searches like `handloom weaving india`, `khadi cotton texture`, `indigo dyeing`, `pit loom weaver`. Check each image for visible third-party logos or garments before use. Do not source from marketplaces, competitor sites, Pinterest, or image search results — those are somebody's copyright.

### 9.5 Delivery

- AVIF with WebP fallback, `<picture>` + `srcset` at 400 / 800 / 1200 / 1600px.
- `loading="lazy"` and `decoding="async"` on everything below the fold.
- `fetchpriority="high"` and eager loading on the hero image only.
- `alt` describes the garment and what the shot shows: `Indigo handloom shirt, front view, showing the uneven weave at the shoulder`. Decorative images get `alt=""`.

---

## 10. Accessibility

**Target: WCAG 2.2 Level AA.** Not aspirational.

- Contrast: 4.5:1 body text, 3:1 large text and UI component boundaries. §5.1 has every ratio measured; do not introduce a colour without measuring it.
- Base font size 16px minimum. Never disable zoom (`user-scalable=no` is forbidden).
- Every interactive element reachable and operable by keyboard, in visual order. Visible focus ring, 2px `--indigo`, offset 2px, never `outline: none`.
- Drawers and modals: focus trapped, `Esc` closes, focus returns to the trigger.
- Touch targets 44×44px minimum with 8px spacing.
- Colour is never the only signal — pair it with text or an icon. Applies to stock status, colour swatches, form errors, and sale prices.
- Semantic HTML: one `<h1>` per page, headings in order, `<nav>`, `<main>`, `<footer>`, real `<button>` and `<a>` elements. Never a clickable `<div>`.
- Dynamic updates (bag count, filter results, toasts) announced via `aria-live="polite"`.
- Respect `prefers-reduced-motion` (§5.5).
- Skip-to-content link, first in tab order.

---

## 11. Build constraints

Single `index.html`. No build step.

- Structure: `<style>` in `<head>` with all tokens in `:root`; `<script>` before `</body>`.
- Vanilla JS only. No React, no jQuery, no Tailwind CDN, no icon library — draw the six icons you need (search, bag, account, close, chevron, minus/plus) as inline SVG.
- Google Fonts with `preconnect` and `display=swap`. Two families, four weights total. Nothing else external.
- Performance budget: LCP under 2.5s on a 4G connection, CLS under 0.1, total page weight under 1.5MB with images.
- **Caution:** if this file is previewed inside a Claude artifact, `localStorage` and `sessionStorage` are unavailable. Hold bag state in a JS object in memory. In a real deployment, `localStorage` is fine.
- Progressive enhancement: the catalogue and product information must be readable with JavaScript disabled. Filters and the bag may require it.
- Include `<meta name="viewport" content="width=device-width, initial-scale=1">`, a descriptive `<title>`, a meta description, Open Graph tags, and `Product` structured data on the PDP.

---

## 12. Hard rules

Consolidated from v1 §4, §23 and §24, which repeated each other three times.

**Always**
1. The cloth is the subject. The interface is the frame.
2. One primary action per viewport.
3. Every claim is specific and evidenced.
4. Whitespace and hairlines create hierarchy — not shadows, borders, or cards.
5. Radius 0 by default. Photography is never rounded.
6. Design mobile deliberately; do not scale the desktop down.
7. Every colour, size and duration comes from a token.
8. Contrast is measured, not assumed.

**Never**
1. More than two font families, or more than two weights per family.
2. Gradients, glassmorphism, drop shadows, or cards nested inside cards.
3. Fake reviews, fake scarcity, countdown timers, or invented artisan names.
4. Popups on page load, exit-intent modals, or more than one announcement bar.
5. Text laid over an unmodified photograph.
6. Infinite scroll on a listing page.
7. Colour as the only carrier of meaning.
8. Removing a focus ring.
9. Autoplaying carousels or parallax.
10. Hiding price, size, fabric, shipping, or return terms to look minimal.

---

## 13. Claims, legal and integrity

**The handmade claim.** "Handmade, no machines" is a substantive commercial claim, not a slogan. Before it appears on the homepage it should be backed by **Handloom Mark**, **Craftmark** or **Silk Mark** certification as applicable, and the site should say which. An unverifiable craft claim is the fastest way to lose exactly the audience described in §2.

**Do not generate:** reviews, ratings, testimonials, star counts, press logos, customer photos, artisan names, village names, certification marks, "as seen in" mentions, or trust badges. If real content does not exist, omit the block. A missing reviews section is invisible; a fabricated one is a liability.

**Required on the site (India, e-commerce):**
- Registered business name, address, and GSTIN in the footer.
- Prices inclusive of GST, stated as such.
- Country of origin on product pages.
- A published returns and refunds policy with a stated window and timeline.
- Grievance officer contact details, per the Consumer Protection (E-Commerce) Rules.
- Privacy policy and terms, linked from the footer.

**Inspiration boundary.** Draw on the general patterns of photography-led commerce. Do not reproduce any existing brand's layout, typography, copy, imagery, or identity.

---

## 14. Build order

Work in this sequence. Do not start with decoration.

1. Tokens in `:root` (§5). Nothing else until this is complete.
2. Semantic skeleton — header, main, footer, headings in order.
3. Product card, then the grid.
4. PDP, including the Loom Record (§4).
5. Homepage sections in the §7.1 order.
6. PLP with filters, then bag, then checkout.
7. All four states for every component (§8).
8. Accessibility pass against §10 — keyboard-only, then contrast.
9. Performance pass against §11.
10. Motion last (§5.5).

**Review loop:** screenshot at 390px, 768px and 1440px → compare against this file → fix the single highest-impact problem → screenshot again. Priority order: conversion path, hierarchy, product visibility, navigation, type, spacing, images, responsive, accessibility, motion.

**Self-check before shipping.** If the answer to any of these is yes, fix it:
- Could this be any premium clothing brand? (§4 should make it unmistakable.)
- Is there a shadow, gradient, or rounded photograph anywhere?
- Is any text sitting directly on a photograph?
- Does any number, name or review on the page not trace back to a real fact?
- Does the tab order match the visual order?

---

## 15. Open decisions

Flagged for the brand owner. Do not resolve these in code — leave a `TODO:` comment.

1. **Name and tagline.** "West India Company" and "East and west, our company is the best" deliberately echo "The East India Company" — which is a live trademark held by a revived UK luxury brand, and which carries a colonial association in the domestic market this brand is targeting. Separately, the rhyming construction reads as bargain retail and works against every other decision in this document. Trademark clearance is advised. Tagline alternatives in the §3 voice: `Made by hand. Made to name.` · `Fourteen days, by hand.` · `Cloth with a maker's name on it.`
2. **Weaving clusters.** Nuapatna and Kutch are used as examples throughout. Replace with the actual sourcing clusters before launch.
3. **Certification.** Which mark, and when (§13).
4. **Shipping threshold.** ₹2,000 free-shipping threshold is an assumption; confirm against margin.
5. **International shipping.** The market is India-first; if export follows, currency, duties and size conversion all need specifying.

---

## 16. Quick reference

| Area | Value |
|---|---|
| Background | `#EFEAE0` Kora |
| Ink | `#171717` |
| Accent | `#22335C` Indigo |
| Alert / sale | `#9B3B2E` Madder |
| Display face | Fraunces, 400/600 |
| Body face | Inter, 400/500 |
| Radius | 0 default, 2px controls |
| Shadow | None |
| Motion | 160 / 240 / 360ms |
| Container | 1240px |
| Product grid | 2 / 3 / 4-up |
| Product ratio | 3:4 |
| Currency | ₹, GST-inclusive |
| Anchor price | ₹2,890 |
| Accessibility | WCAG 2.2 AA |
| Signature | The Loom Record |
