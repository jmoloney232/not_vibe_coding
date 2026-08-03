/* Catches the defect class the overflow check cannot: a text block that is far
   too narrow but does not overflow, so nothing errors and nothing scrolls
   sideways — it is simply unreadable. Flags any element whose text is long
   enough to need a line but whose rendered box is narrower than 200px. */
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const pages = process.argv.slice(2);
  let bad = 0;
  for (const url of pages) {
    for (const [w, h] of [[1440, 900], [834, 1100], [390, 844]]) {
      const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
      await p.goto(url, { waitUntil: 'networkidle' });
      await p.waitForTimeout(400);
      const hits = await p.evaluate(() => {
        const out = [];
        document.querySelectorAll('p,li,dd,dt,td,th,caption,figcaption,h1,h2,h3,label,span,div')
          .forEach(el => {
            if (el.children.length && !el.matches('caption,figcaption,p,dd,li')) return;
            const t = (el.textContent || '').trim();
            if (t.length < 45) return;
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) return;
            const lines = r.height / parseFloat(getComputedStyle(el).lineHeight || 20);
            if (r.width < 200 && lines > 3) {
              out.push({ w: Math.round(r.width), lines: Math.round(lines),
                         tag: el.tagName + '.' + (el.className || ''), t: t.slice(0, 50) });
            }
          });
        return out;
      });
      for (const x of hits) {
        bad++;
        console.log(`[${w}] ${url.split('/').pop()} ${x.w}px wide / ~${x.lines} lines  ${x.tag}  "${x.t}"`);
      }
      await p.context().close();
    }
  }
  console.log(bad ? `${bad} narrow-text findings` : 'no narrow-text findings');
  await b.close();
})();
