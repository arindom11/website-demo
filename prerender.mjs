/**
 * Pre-render every route to a real HTML file.
 *
 * The site itself stays a single hash-routed index.html (guideline §1: one
 * file, no build step). This script runs ONCE, by hand, and writes static
 * entry pages so search engines and link previews see a real URL per product
 * and category. Nothing runs at deploy time.
 *
 * Each generated file:
 *   - carries its own <title>, meta description, canonical and OG tags
 *   - renders the real content server-side-ish (copied from the live DOM)
 *   - then hands over to the app by setting the matching hash
 *
 * Usage:  node serve.mjs        (in another terminal)
 *         node prerender.mjs [https://your-domain]
 */
import puppeteer from 'puppeteer';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname } from 'node:path';

const ORIGIN = (process.argv[2] || 'https://example.com').replace(/\/$/, '');
const BASE = 'http://localhost:3000';

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const b = await puppeteer.launch();
const page = await b.newPage();
await page.setViewport({ width: 1440, height: 900 });

// Pull the catalogue straight out of the running app so this never drifts
// from the real product data.
await page.goto(BASE + '/#/shop', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 500));

const catalogue = await page.evaluate(() => {
  const cards = [...document.querySelectorAll('#plp-grid .card')];
  return cards.map(c => ({
    slug: c.querySelector('a').getAttribute('href').split('/').pop(),
    name: c.querySelector('.card-name').textContent.trim(),
    price: c.querySelector('.card-price').textContent.trim(),
    cluster: c.querySelector('.card-cluster').textContent.trim(),
    img: (c.querySelector('img').getAttribute('src') || '')
  }));
});

const categories = await page.evaluate(() =>
  [...document.querySelectorAll('#filter-rail .facet')][0]
    ? [...document.querySelectorAll('#filter-rail input[data-facet="cat"]')].map(i => ({
        slug: i.value,
        name: i.closest('label').querySelector('span').textContent.trim()
      }))
    : []);

console.log(`catalogue: ${catalogue.length} products, ${categories.length} categories`);

const routes = [
  { path: 'shop', hash: '#/shop', title: 'Shop everything', desc: 'Every piece woven on a loom, by hand, and finished by hand. Sized unisex, priced inclusive of GST.' },
  { path: 'new', hash: '#/new', title: 'New this season', desc: 'Dyed in natural indigo, woven on pit looms. Off the loom this month.' },
  { path: 'the-loom', hash: '#/the-loom', title: 'The Loom', desc: 'The weaves, the clusters and how handloom cloth is made.' },
  { path: 'journal', hash: '#/journal', title: 'Journal', desc: 'Why a handwoven shirt takes fourteen days.' },
  { path: 'about', hash: '#/about', title: 'About', desc: 'Handloom clothing from Odisha and Kutch, made by hand.' },
  { path: 'size-guide', hash: '#/size-guide', title: 'Size guide', desc: 'Unisex sizing in centimetres and inches, with fit notes per category.' },
  { path: 'shipping', hash: '#/shipping', title: 'Shipping & returns', desc: 'Where we ship, what it costs, and how returns work.' },
  { path: 'contact', hash: '#/contact', title: 'Contact', desc: 'How to reach us.' },
  { path: 'privacy', hash: '#/privacy', title: 'Privacy policy', desc: 'What we collect, why, and what you can ask us to do about it.' },
  { path: 'terms', hash: '#/terms', title: 'Terms of sale', desc: 'The terms that cover anything you buy from this site.' },
  { path: 'returns', hash: '#/returns', title: 'Returns & refunds', desc: 'The return window, who pays shipping, and refund timelines.' },
  { path: 'grievance', hash: '#/grievance', title: 'Grievance officer', desc: 'How to escalate a complaint.' }
];

for (const c of categories) {
  routes.push({
    path: `shop/${c.slug}`, hash: `#/shop/${c.slug}`,
    title: c.name,
    desc: `${c.name} woven by hand on a loom and finished by hand. Sized unisex, priced inclusive of GST.`
  });
}
for (const p of catalogue) {
  routes.push({
    path: `product/${p.slug}`, hash: `#/product/${p.slug}`,
    title: p.name,
    desc: `${p.name}, ${p.price}. Handwoven in ${p.cluster}. Inclusive of all taxes, country of origin India.`,
    image: p.img
  });
}

const shell = await readFile('index.html', 'utf8');

// Everything before </head> and the body, so each page is the real site.
await rm('shop', { recursive: true, force: true });
await rm('product', { recursive: true, force: true });

let written = 0;
for (const r of routes) {
  await page.goto(BASE + '/' + r.hash, { waitUntil: 'networkidle0' });
  await new Promise(t => setTimeout(t, 350));

  // Take the rendered DOM, then rewrite the head for this specific route.
  let html = await page.content();

  const canonical = `${ORIGIN}/${r.path}/`;
  const ogImage = r.image ? ORIGIN + (r.image.startsWith("/") ? r.image : "/" + r.image) : ORIGIN + "/og-image.jpg";
  const fullTitle = `${r.title} — West India Company`;

  html = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(fullTitle)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(r.desc)}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(fullTitle)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(r.desc)}">`)
    .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${esc(ogImage)}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${esc(fullTitle)}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${esc(r.desc)}">`)
    .replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${esc(ogImage)}">`);

  // Canonical + og:url for this route.
  html = html.replace('</head>',
    `<link rel="canonical" href="${esc(canonical)}">\n` +
    `<meta property="og:url" content="${esc(canonical)}">\n` +
    `<script>if(!location.hash){location.replace(location.pathname+'${r.hash}');}</script>\n` +
    '</head>');

  const file = `${r.path}/index.html`;
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  written++;
}

await b.close();

// Sitemap covering every real URL.
const urls = ['', ...routes.map(r => r.path + '/')];
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => `  <url><loc>${ORIGIN}/${u}</loc><changefreq>weekly</changefreq><priority>${u === '' ? '1.0' : u.startsWith('product/') ? '0.8' : '0.6'}</priority></url>`).join('\n') +
  '\n</urlset>\n';
await writeFile('sitemap.xml', sitemap);

await writeFile('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);

console.log(`pre-rendered ${written} pages`);
console.log(`sitemap: ${urls.length} URLs at ${ORIGIN}`);
