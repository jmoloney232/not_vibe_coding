/* Blind-review capture for the two round-two builds.
   Every state is reached by driving the real controls — clicking, selecting,
   scrolling — never by calling page internals. Round 10 recorded a case where a
   capture script that set state directly manufactured a defect the reviewer then
   reported in good faith; that is the failure this file exists to avoid. */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'file:///home/user/not_vibe_coding/practical-exercises-round-two';
const OUT = '/tmp/claude-0/-home-user-not-vibe-coding/d4b2983f-1937-572f-b8aa-12b9cd7a8641/scratchpad/blind-r2';
const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const W = { desktop: [1440, 900], tablet: [834, 1100], mobile: [390, 844] };

async function shot(page, dir, name, opts = {}) {
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, dir, name), ...opts });
}

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  const errors = [];

  for (const [tag, sub] of [['D', '01-science-publication'], ['E', '02-mill-guesthouse']]) {
    fs.mkdirSync(path.join(OUT, tag), { recursive: true });
    const routes = tag === 'D' ? ['index', 'article'] : ['index', 'stay'];

    for (const [wname, [w, h]] of Object.entries(W)) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
      const page = await ctx.newPage();
      page.on('pageerror', e => errors.push(`${tag}/${wname}: ${e.message}`));

      for (const [i, r] of routes.entries()) {
        await page.goto(`${BASE}/${sub}/${r}.html`, { waitUntil: "networkidle" });
        // Scroll the whole page first: lazy-loaded images below the fold are never
        // requested by a fullPage screenshot, and a reviewer reads the gap as a
        // missing asset. Driving the controls is not enough on its own.
        await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 50)); } window.scrollTo(0, 0); });
        await page.waitForTimeout(700);
        await shot(page, tag, `${tag}${i + 1}-route${i + 1}-${wname}-full.png`, { fullPage: true });
        await shot(page, tag, `${tag}${i + 1}-route${i + 1}-${wname}-firstscreen.png`);
      }
      await ctx.close();
    }

    // ---- interaction states, desktop, driven through the interface
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push(`${tag}/interact: ${e.message}`));

    if (tag === 'D') {
      await page.goto(`${BASE}/${sub}/article.html`, { waitUntil: 'networkidle' });
      // scroll the article for real; the marginal apparatus tracks reading position
      for (const [n, frac] of [['a', 0.25], ['b', 0.55], ['c', 0.85]]) {
        await page.evaluate(f => window.scrollTo(0, document.body.scrollHeight * f), frac);
        await shot(page, tag, `D3-scrolled-${n}.png`);
      }
      // keyboard focus, reached by tabbing
      await page.evaluate(() => window.scrollTo(0, 0));
      for (let i = 0; i < 3; i++) await page.keyboard.press('Tab');
      await shot(page, tag, 'D4-keyboard-focus.png');
    }

    if (tag === 'E') {
      await page.goto(`${BASE}/${sub}/stay.html`, { waitUntil: 'networkidle' });

      // change the month through the real select
      await page.selectOption('#avail-month', '8');
      await page.waitForTimeout(300);
      const box = await page.$eval('.avail', el => { const r = el.getBoundingClientRect();
        return { x: r.x - 10, y: r.y - 10, width: r.width + 20, height: r.height + 20 }; });
      await page.evaluate(y => window.scrollTo(0, y), 0);
      await page.$eval('.avail', el => el.scrollIntoView({ block: 'center' }));
      await shot(page, tag, 'E3-month-changed.png');

      // submit an invalid enquiry by clicking the real button
      await page.fill('#f-in', '2026-03-12');
      await page.fill('#f-out', '2026-03-13');
      await page.fill('#f-name', '');
      await page.click('#enq button[type=submit]');
      await page.$eval('#enq', el => el.scrollIntoView({ block: 'center' }));
      await shot(page, tag, 'E4-enquiry-rejected.png');

      // then a valid one, same way
      await page.fill('#f-out', '2026-07-09');
      await page.fill('#f-in', '2026-07-04');
      await page.fill('#f-name', 'A Guest');
      await page.selectOption('#f-room', 'bin');
      await page.click('#enq button[type=submit]');
      await page.waitForTimeout(300);
      await page.$eval('#enq-out', el => el.scrollIntoView({ block: 'center' }));
      await shot(page, tag, 'E5-enquiry-accepted.png');

      // keyboard focus
      await page.goto(`${BASE}/${sub}/index.html`, { waitUntil: 'networkidle' });
      for (let i = 0; i < 4; i++) await page.keyboard.press('Tab');
      await shot(page, tag, 'E6-keyboard-focus.png');
      void box;
    }
    await ctx.close();
  }

  console.log('page errors:', errors.length ? errors : 'none');
  for (const t of ['D', 'E']) {
    console.log(t, fs.readdirSync(path.join(OUT, t)).sort().join('\n   '));
  }
  await browser.close();
})();
