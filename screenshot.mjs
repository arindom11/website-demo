// Screenshot a URL to ./temporary screenshots/. Usage: node screenshot.mjs <url> [label]
import puppeteer from 'puppeteer';
import { mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const url = process.argv[2];
const label = process.argv[3];
const width = Number(process.argv[4]) || 1440;

if (!url) {
  console.error('Usage: node screenshot.mjs <url> [label] [width]');
  console.error('Example: node screenshot.mjs http://localhost:3000 hero 390');
  process.exit(1);
}

if (url.startsWith('file://')) {
  console.error('Refusing to screenshot a file:// URL — serve the page first (node serve.mjs) and use http://localhost:3000');
  process.exit(1);
}

const outDir = join(import.meta.dirname, 'temporary screenshots');
await mkdir(outDir, { recursive: true });

// Auto-increment past whatever is already there so nothing is overwritten.
const existing = await readdir(outDir);
const highest = existing.reduce((max, name) => {
  const match = /^screenshot-(\d+)/.exec(name);
  return match ? Math.max(max, Number(match[1])) : max;
}, 0);

const filename = label
  ? `screenshot-${highest + 1}-${label}.png`
  : `screenshot-${highest + 1}.png`;
const outPath = join(outDir, filename);

const browser = await puppeteer.launch();

try {
  const page = await browser.newPage();
  const height = Math.round(width * 0.625);
  await page.setViewport({ width, height, deviceScaleFactor: 2 });

  const response = await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  if (response && !response.ok()) {
    console.error(`Warning: ${url} returned HTTP ${response.status()}`);
  }

  // Let webfonts settle so type is never captured mid-swap.
  await page.evaluate(() => document.fonts.ready);

  // Scroll the full page and return to the top, so scroll-triggered
  // reveals have fired by the time the capture runs.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });

  // Chrome cannot capture past ~16384 device px in one texture — beyond
  // that the full-page image silently wraps and repeats content. Drop the
  // scale factor so a tall page still fits in one honest capture.
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const LIMIT = 16384;
  let scale = 2;
  while (scale > 1 && Math.max(pageHeight, height) * scale > LIMIT) {
    scale -= 0.5;
  }
  if (scale !== 2) {
    await page.setViewport({ width, height, deviceScaleFactor: scale });
    console.log(`Page is ${pageHeight}px tall — captured at ${scale}x to stay within Chrome's limit.`);
  }
  if (pageHeight > LIMIT) {
    console.error(`Warning: page is ${pageHeight} CSS px tall; capture may still be clipped.`);
  }

  await page.screenshot({ path: outPath, fullPage: true });
  console.log(`Saved ${outPath}`);
} catch (err) {
  console.error(`Screenshot failed: ${err.message}`);
  process.exitCode = 1;
} finally {
  await browser.close();
}
