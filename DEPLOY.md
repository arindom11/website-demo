# Deploying West India Company

The site is a static build. There is no build step, no framework and no server code —
`index.html` plus the `images/` folder is the whole thing (§11).

**Nothing has been deployed. Do not deploy until the blockers below are cleared.**

---

## What ships

```
index.html            the entire site (markup, CSS, JS)
images/               54 WebP files (27 slots x 1x and @2x)
brand assets/         source logos and the guideline — NOT needed at runtime
favicon.svg
apple-touch-icon.png
og-image.jpg
robots.txt
sitemap.xml
```

`node_modules/`, `serve.mjs`, `screenshot.mjs`, `package*.json` and
`temporary screenshots/` are development-only. Do not upload them.

## How to deploy (when cleared)

Any static host works — Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3 + CloudFront.
Publish directory is the project root. No install command, no build command.

Because routing is hash-based, **no rewrite rules are needed** — every URL is served by
`index.html` already.

---

## Blockers before launch

### 1. Legally required, currently missing

Indian e-commerce rules (§13) require all of these. They are marked `TODO` in the
markup and on the Contact page. None can be invented:

- Registered business name, registered address, GSTIN (footer + Contact)
- A published returns and refunds policy: window, who pays return shipping, refund timeline
- Grievance officer name and contact, per the Consumer Protection (E-Commerce) Rules
- Privacy policy and terms of sale

### 2. Substantive claims not yet evidenced

- **"Handmade, no machines"** is a commercial claim, not a slogan. §13 wants it backed by
  Handloom Mark, Craftmark or Silk Mark, with the site saying which.
- **Trademark clearance** for "West India Company" is outstanding (§15.1). The name echoes a
  live UK trademark and carries a colonial association in the domestic market.

### 3. Placeholder data

- All 13 products, prices, stock counts and Loom Records are placeholders. Prices follow the
  §1.1 bands and the ₹2,890 anchor, but nothing is real.
- The "Woven by" row of the Loom Record is **deliberately omitted**, not filled with a
  placeholder — §13 forbids inventing artisan names, and §4 says fill the row or omit it.
  Add it once real sourcing records exist.
- The homepage tally (31 weavers / 4 clusters / 2,940 days) is unverified.
- Clusters (Nuapatna, Sambalpur, Bhuj, Ajrakhpur) are the guideline's own examples (§15.2).
- Free-shipping threshold of ₹2,000 is an assumption (§15.4).

### 4. Not connected to anything

These are wired in the UI and clearly say so when used:

- Checkout / payment gateway (UPI, cards, netbanking, wallets, COD — §7.5)
- Pincode serviceability check
- Order tracking
- Accounts
- Newsletter list provider

### 5. Absolute URLs

`og:image`, `twitter:image` and `og:url` are relative. Most crawlers will not resolve them.
Set them to absolute URLs on the real domain, and update `robots.txt` and `sitemap.xml`,
which both currently say `example.com`.

---

## Known trade-off: hash routing and SEO

§1 mandates a single `index.html` with no build step, so routes are hash-based
(`#/shop/shirts`, `#/product/handspun-indigo-shirt`). Search engines treat every hash URL as
the same page, so **only the homepage is indexable**. Product and category pages will not rank,
and link previews are identical for every route.

That is fine for a demo or a soft launch. If organic search matters commercially, the fix is
real server paths (`/shop/shirts`), which means either a static generator emitting one HTML
file per route, or a host with server-side rendering. That conflicts with the "no build step"
rule, so it is a decision for the brand owner rather than something to change silently.

## Imagery

All 27 photographs are placeholders sourced from Unsplash under its free licence, showing
cloth and garments only — no people, which also avoids needing model releases. They are not
this brand's products. Replace with a real shoot against the §9.1 five-shot list before launch;
§6.3's hover-to-on-model swap also needs that second shot per product.
