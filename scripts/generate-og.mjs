/**
 * Renders the site's social preview card (public/og.png, 1200×630) with the same fonts and colours
 * as the site. Run with `npm run og` after changing the headline or brand.
 * Set PW_CHROMIUM_PATH to use a pre-installed Chromium instead of Playwright's download.
 */
import { resolve } from 'node:path';
import { constellation, fontFaces, openRenderer, root } from './og-shared.mjs';

const html = /* html */ `<!doctype html>
<html><head><meta charset="utf-8" /><style>
  ${fontFaces}
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #08090b; color: #eceae4; font-family: Geist; position: relative; overflow: hidden; }
  .glow { position: absolute; right: -160px; top: -40px; width: 760px; height: 760px; border-radius: 50%;
          background: radial-gradient(circle, rgb(200 255 46 / .22), transparent 62%); }
  svg { position: absolute; right: 40px; top: 35px; }
  .wrap { position: absolute; inset: 64px 72px; display: flex; flex-direction: column; }
  .kicker { font-family: GeistMono; font-size: 20px; letter-spacing: .12em; text-transform: uppercase; color: #c8ff2e; display: flex; align-items: center; gap: 16px; }
  .kicker::before { content: ''; width: 44px; height: 1px; background: currentColor; }
  h1 { margin-top: auto; font-weight: 450; font-size: 104px; line-height: .95; letter-spacing: -.045em; }
  h1 em { font-family: Serif; font-weight: 400; color: #c8ff2e; letter-spacing: -.01em; }
  h1 span { color: #8b8a85; }
  .foot { margin-top: 44px; display: flex; justify-content: space-between; font-family: GeistMono; font-size: 22px; color: #c4c2bb; }
  .foot b { font-family: Geist; font-weight: 500; color: #eceae4; font-size: 26px; }
</style></head><body>
  <div class="glow"></div>
  <svg width="560" height="560" viewBox="-1 -1 2 2">${constellation(7)}</svg>
  <div class="wrap">
    <p class="kicker">AI Engineer &amp; Systems Architect</p>
    <h1>I design <em>AI‑native</em> systems<br /><span>and ship them.</span></h1>
    <div class="foot"><b>Jorge Hernández</b><span>r3b0rnjhs.github.io</span></div>
  </div>
</body></html>`;

const renderer = await openRenderer();
await renderer.render(html, resolve(root, 'public/og.png'));
await renderer.close();
console.log('✓ public/og.png');
