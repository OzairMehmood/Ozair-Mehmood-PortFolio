// Post-build step: renders the built SPA in a headless browser and writes the
// fully-rendered DOM back into dist/index.html, so crawlers (and anything that
// doesn't execute JS) see real content instead of an empty <div id="root">.
// Real visitors are unaffected: main.jsx still calls createRoot(...).render(...),
// which takes over the DOM on mount and replays the normal loader/animation flow.
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        const urlPath = decodeURIComponent(req.url.split('?')[0]);
        let filePath = join(distDir, urlPath === '/' ? 'index.html' : urlPath);
        let ext = extname(filePath);
        if (!ext) {
          filePath = join(distDir, 'index.html');
          ext = '.html';
        }
        const data = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function prerender() {
  const server = await startServer();
  const { port } = server.address();
  const url = `http://127.0.0.1:${port}/`;

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    // Skip the GSAP intro animation so the real sections mount immediately.
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.waitForSelector('.portfolio-app-root main', { timeout: 15000 });

    // Walk down the page so scroll-triggered reveal animations settle,
    // then rest back at the top for a clean initial paint.
    await page.evaluate(async () => {
      const step = 600;
      const height = document.body.scrollHeight;
      for (let y = 0; y < height; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 300));
    });

    const html = await page.content();
    await writeFile(join(distDir, 'index.html'), html);
    console.log('[prerender] dist/index.html rewritten with fully rendered content.');
  } finally {
    await browser.close();
    server.close();
  }
}

prerender().catch((err) => {
  console.error('[prerender] failed:', err);
  process.exit(1);
});
