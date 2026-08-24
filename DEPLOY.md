# Deploying West India Company

**This is a practice project.** A portfolio build, not a real shop. No orders are taken,
no payments are processed, and no company is registered behind it. That is stated in the
footer of every page and at the top of every policy page, so nobody can mistake it for a
live store.

Target host: **Vercel**. Nothing has been deployed — deploy only when you say so.

---

## Deploying

The site is static. There is no build step and no server code.

```
npx vercel            # preview deployment
npx vercel --prod     # production
```

Vercel serves the repo root. `vercel.json` sets `cleanUrls`, `trailingSlash` and the
security headers; `.vercelignore` keeps development files off the deployment.

### Set your real domain first

Absolute URLs (canonical, `og:url`, `og:image`, `sitemap.xml`, `robots.txt`) are baked in
by the pre-render step, which takes the domain as an argument:

```
node serve.mjs                                   # terminal 1
node prerender.mjs https://your-domain.vercel.app  # terminal 2
```

Re-run that whenever the domain changes or the catalogue changes, then commit the result.
Without it, every absolute URL says `example.com` and link previews will break.

---

## How routing works

The site is a single hash-routed `index.html` (guideline §1: one file, no build step).
On its own that would mean only the homepage is indexable, since search engines treat every
`#/...` URL as the same page.

`prerender.mjs` fixes that **without adding a deploy-time build**. Run by hand, it writes a
real HTML file per route — 35 of them — each with its own title, meta description, canonical
and Open Graph tags, and each handing over to the app on load:

```
/                             index.html
/shop/  /shop/shirts/  …      11 pages
/product/<slug>/              13 pages
/new/ /the-loom/ /journal/ /about/ /size-guide/
/shipping/ /contact/ /privacy/ /terms/ /returns/ /grievance/
```

Verified: a cold load of `/product/handspun-indigo-shirt/` renders the product view directly,
images resolve, and clicking through to another route does **not** reload the page.

Asset paths are root-absolute (`/images/…`) so they resolve identically from `/` and from
`/product/<slug>/`. That means the site must be served from a domain root, not a subfolder.

---

## What ships

```
index.html                the app
shop/ product/ …          35 pre-rendered entry pages
images/                   54 WebP files (27 slots x 1x and @2x)
404.html                  host-level not-found page
favicon.svg  apple-touch-icon.png  og-image.jpg
robots.txt  sitemap.xml
vercel.json  .vercelignore
_headers                  only if you switch to Netlify/Cloudflare
```

Excluded by `.vercelignore`: `node_modules/`, `temporary screenshots/`, `brand assets/`,
`serve.mjs`, `screenshot.mjs`, `prerender.mjs`, `package*.json`, `CLAUDE.md`, this file.

---

## Measured

On 4G with 4x CPU throttling:

| Metric | Result | Budget (§11) |
|---|---|---|
| LCP | 884 ms | 2500 ms |
| CLS | 0.0089 | 0.1 |
| Page weight | ~1.1 MB all images at 1x, 298 KB above the fold | 1.5 MB |

All 19 in-app routes render, the buy flow works from a cold deep link, and there are no
console errors. Touch targets meet 44x44 across the bag, filters and every view.

---

## Known trade-offs

**CSP allows `'unsafe-inline'`.** Guideline §11 requires all CSS and JS inline in one file
with no build step, which rules out nonces or hashes. This is the one place the single-file
constraint costs real hardening. If you ever accept a build step, switch to per-deploy hashes
and drop `'unsafe-inline'`.

**Product pages need JavaScript.** The homepage catalogue renders without it — 12 products
with prices and clusters — and a `<noscript>` notice says what is unavailable. Filters, the
bag and product detail do not work with JS off.

**Image caching is one week, not one year.** Filenames are unhashed (`hero.webp`, not
`hero.a1b2c3.webp`), so an immutable long cache would strand visitors on an old photo after
a reshoot. Rename a file if you need instant busting.

---

## If this ever becomes a real shop

None of the below is done, and none of it can be invented:

- **Legal identity:** registered business name, address and GSTIN. Currently "Not applicable
  — demo project".
- **Grievance officer:** a named officer with contact details is required by the Consumer
  Protection (E-Commerce) Rules, 2020.
- **Policy review:** privacy, terms and returns are realistic sample copy written to the right
  shape. They are not legal advice and need a lawyer.
- **The handmade claim:** "handmade, no machines" is a commercial claim. §13 wants it backed
  by Handloom Mark, Craftmark or Silk Mark, naming which.
- **Trademark:** "West India Company" echoes a live UK trademark and carries a colonial
  association in the Indian market. Clearance would be needed.
- **Checkout, payments, accounts, order tracking and the newsletter** are not connected. Each
  says so plainly when used rather than failing silently.
- **Product data** — all 13 products, prices, stock and Loom Records — is placeholder. The
  "Woven by" row is deliberately omitted rather than filled with an invented name.
- **Photography** is Unsplash stock showing cloth only, not this brand's products.
