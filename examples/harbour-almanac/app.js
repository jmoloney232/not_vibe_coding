const SVG_NS = 'http://www.w3.org/2000/svg';
const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAY_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June',
               'July', 'August', 'September', 'October', 'November', 'December'];

// The vertical scale is fixed across every day of the year so two days can be
// compared by looking at them. It runs from chart datum to a little above the
// highest astronomical tide the model produces.
const H_MAX = 4.8;

let day = { y: 2026, m: 3, d: 16 };
let cursorMinute = null;

const el = id => document.getElementById(id);

function svg(tag, attrs = {}, text) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (text !== undefined) node.textContent = text;
  return node;
}

const midnight = () => localMidnightUTC(day.y, day.m, day.d);
const one = n => n.toFixed(1);
const two = n => n.toFixed(2);

/* ------------------------------------------------------------- tide plate */

const frame = el('plate-frame');
const plot = el('tide-svg');

function drawPlate() {
  const w = Math.max(320, frame.clientWidth);
  const h = frame.clientHeight || 360;
  plot.setAttribute('viewBox', `0 0 ${w} ${h}`);
  plot.setAttribute('width', w);
  plot.setAttribute('height', h);
  plot.replaceChildren();

  const padL = 44, padR = 14, padT = 22, padB = 26;
  const pw = w - padL - padR;
  const ph = h - padT - padB;
  const x = min => padL + (min / 1440) * pw;
  const y = m => padT + (1 - m / H_MAX) * ph;

  const mid = midnight();
  const sun = sunEvents(mid);

  // Night and civil twilight, drawn first so everything else sits on them.
  const band = (a, b, fill) => {
    if (a === null || b === null || b <= a) return;
    plot.appendChild(svg('rect', {
      x: x(Math.max(0, a)), y: padT,
      width: x(Math.min(1440, b)) - x(Math.max(0, a)), height: ph, fill,
    }));
  };
  band(0, sun.civil.rise, 'var(--night)');
  band(sun.civil.set, 1440, 'var(--night)');
  band(sun.civil.rise, sun.day.rise, 'var(--twilight)');
  band(sun.day.set, sun.civil.set, 'var(--twilight)');

  // Metre lines.
  for (let m = 0; m <= 4; m++) {
    plot.appendChild(svg('line', {
      x1: padL, x2: w - padR, y1: y(m), y2: y(m),
      stroke: m === 0 ? 'var(--ink)' : 'var(--hair-soft)', 'stroke-width': 1,
    }));
    plot.appendChild(svg('text', {
      x: padL - 8, y: y(m) + 4, 'text-anchor': 'end', class: 'ax',
    }, `${m}`));
  }
  plot.appendChild(svg('text', { x: padL - 8, y: padT - 8, 'text-anchor': 'end', class: 'ax-unit' }, 'm'));

  // Hour lines, every two hours.
  for (let hr = 0; hr <= 24; hr += 2) {
    const px = x(hr * 60);
    plot.appendChild(svg('line', {
      x1: px, x2: px, y1: padT, y2: y(0),
      stroke: 'var(--hair-soft)', 'stroke-width': 1,
    }));
    if (hr < 24) {
      plot.appendChild(svg('text', {
        x: px + 4, y: h - padB + 15, class: 'ax',
      }, String(hr).padStart(2, '0')));
    }
  }

  // The curve, sampled every four minutes.
  const pts = [];
  for (let min = 0; min <= 1440; min += 4) pts.push([x(min), y(tideHeight(mid + min * 60000))]);
  const line = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)},${py.toFixed(1)}`).join('');

  plot.appendChild(svg('path', {
    d: `${line}L${x(1440)},${y(0)}L${x(0)},${y(0)}Z`,
    fill: 'var(--water)', opacity: 0.62,
  }));
  plot.appendChild(svg('path', {
    d: line, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 1.6,
    'stroke-linejoin': 'round',
  }));

  // High and low waters.
  for (const e of tideExtremes(mid)) {
    const px = x(e.minute), py = y(e.height);
    const up = e.kind === 'HW';
    plot.appendChild(svg('line', {
      x1: px, x2: px, y1: py, y2: up ? py - 13 : py + 13,
      stroke: 'var(--ink)', 'stroke-width': 1,
    }));
    plot.appendChild(svg('circle', { cx: px, cy: py, r: 2.6, fill: 'var(--ink)' }));

    // Two lines of label, kept inside the plot at both ends of the day and at
    // both ends of the range.
    const anchor = px < padL + 46 ? 'start' : px > w - padR - 46 ? 'end' : 'middle';
    const wanted = up ? py - 20 : py + 26;
    const ty = Math.max(padT + 14, Math.min(h - padB - 18, wanted));
    if (ty !== wanted) plot.lastElementChild.previousElementSibling.remove();
    plot.appendChild(svg('text', { x: px, y: ty, 'text-anchor': anchor, class: 'ext-t' }, hhmm(e.minute)));
    plot.appendChild(svg('text', { x: px, y: ty + 14, 'text-anchor': anchor, class: 'ext-h' }, `${two(e.height)} m`));
  }

  drawCursor();
}

function drawCursor() {
  plot.querySelectorAll('.cursor').forEach(n => n.remove());
  if (cursorMinute === null) return;

  const w = Number(plot.getAttribute('width'));
  const h = Number(plot.getAttribute('height'));
  const padL = 44, padR = 14, padT = 22, padB = 26;
  const pw = w - padL - padR, ph = h - padT - padB;
  const px = padL + (cursorMinute / 1440) * pw;
  const height = tideHeight(midnight() + cursorMinute * 60000);
  const py = padT + (1 - height / H_MAX) * ph;

  const g = svg('g', { class: 'cursor' });
  g.appendChild(svg('line', {
    x1: px, x2: px, y1: padT, y2: h - padB, stroke: 'var(--magenta)', 'stroke-width': 1,
  }));
  g.appendChild(svg('circle', { cx: px, cy: py, r: 4, fill: 'var(--magenta)' }));
  plot.appendChild(g);

  el('plate-readout').innerHTML =
    `${hhmm(cursorMinute)} &nbsp; <b>${two(height)} m</b> above chart datum`;
}

function clearCursor() {
  cursorMinute = null;
  plot.querySelectorAll('.cursor').forEach(n => n.remove());
  el('plate-readout').textContent = '';
}

function minuteFromClientX(clientX) {
  const r = frame.getBoundingClientRect();
  const padL = 44, padR = 14;
  const pw = r.width - padL - padR;
  const rel = (clientX - r.left - padL) / pw;
  return Math.max(0, Math.min(1440, Math.round(rel * 1440)));
}

const readAt = e => { cursorMinute = minuteFromClientX(e.clientX); drawCursor(); };
frame.addEventListener('pointerdown', e => { readAt(e); frame.setPointerCapture(e.pointerId); });
frame.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || e.buttons) readAt(e); });
frame.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') clearCursor(); });

frame.addEventListener('keydown', e => {
  const step = e.shiftKey ? 60 : 10;
  if (e.key === 'ArrowRight') cursorMinute = Math.min(1440, (cursorMinute ?? 0) + step);
  else if (e.key === 'ArrowLeft') cursorMinute = Math.max(0, (cursorMinute ?? 1440) - step);
  else if (e.key === 'Home') cursorMinute = 0;
  else if (e.key === 'End') cursorMinute = 1440;
  else if (e.key === 'Escape') { clearCursor(); return; }
  else return;
  e.preventDefault();
  drawCursor();
});

frame.addEventListener('blur', clearCursor);

/* ------------------------------------------------------------- tide table */

function drawTideTable() {
  const mid = midnight();
  const ex = tideExtremes(mid);
  const rows = el('tide-rows');
  rows.replaceChildren();

  for (const e of ex) {
    const tr = document.createElement('tr');
    tr.className = e.kind === 'HW' ? 'is-high' : 'is-low';
    tr.innerHTML = `<td class="kind">${e.kind}</td><td class="t">${hhmm(e.minute)}</td><td class="num">${two(e.height)} m</td>`;
    rows.appendChild(tr);
  }

  const heights = ex.map(e => e.height);
  const range = Math.max(...heights) - Math.min(...heights);
  const moon = moonState(mid + 12 * 3600000);
  el('tide-meta').innerHTML = `
    <dt>Range of the day</dt><dd>${two(range)} m</dd>
    <dt>Harbour mean level</dt><dd>${two(STATION.z0)} m</dd>
  `;
  return { ex, range, moon };
}

/* -------------------------------------------------------------------- sun */

function drawSun() {
  const sun = sunEvents(midnight());
  const dayLength = sun.day.rise === null || sun.day.set === null
    ? null : sun.day.set - sun.day.rise;
  el('sun-list').innerHTML = `
    <dt>Civil twilight begins</dt><dd>${hhmm(sun.civil.rise)}</dd>
    <dt>Sunrise</dt><dd>${hhmm(sun.day.rise)}</dd>
    <dt>Meridian passage</dt><dd>${hhmm(sun.noon)}</dd>
    <dt>Sunset</dt><dd>${hhmm(sun.day.set)}</dd>
    <dt>Civil twilight ends</dt><dd>${hhmm(sun.civil.set)}</dd>
    <dt>Length of day</dt><dd>${dayLength === null ? '—' : `${Math.floor(dayLength / 60)} h ${String(Math.round(dayLength % 60)).padStart(2, '0')} m`}</dd>
    <dt>Declination</dt><dd>${sun.decl >= 0 ? 'N' : 'S'} ${Math.abs(sun.decl).toFixed(1)}°</dd>
  `;
}

/* ------------------------------------------------------------------- moon */

// The lit limb is bounded by the moon's own circumference on one side and by
// the terminator on the other. The terminator projects as an ellipse whose
// semi-axis is R·cos(phase angle): zero at the quarters, a full R at new and
// full, and reversing direction as the moon passes half.
function drawMoon(moon) {
  const disc = el('moon-disc');
  disc.replaceChildren();
  const R = 46;

  // The whole disc is the unlit moon; the lit limb is painted over it.
  disc.appendChild(svg('circle', { cx: 0, cy: 0, r: R, fill: 'var(--moondark)' }));

  const theta = Math.acos(1 - 2 * moon.illuminated);
  const rx = Math.abs(R * Math.cos(theta));
  const sweep = Math.cos(theta) > 0 ? 0 : 1;

  const lit = svg('path', {
    d: `M0,${-R} A${R},${R} 0 0 1 0,${R} A${rx.toFixed(2)},${R} 0 0 ${sweep} 0,${-R} Z`,
    fill: 'var(--moonlit)',
    transform: moon.waxing ? '' : 'scale(-1,1)',
  });
  disc.appendChild(lit);
  disc.appendChild(svg('circle', { cx: 0, cy: 0, r: R, fill: 'none', stroke: 'var(--ink)', 'stroke-width': 1 }));

  el('moon-list').innerHTML = `
    <dt>Phase</dt><dd>${moon.name}</dd>
    <dt>Age</dt><dd>${one(moon.age)} d</dd>
    <dt>Illuminated</dt><dd>${Math.round(moon.illuminated * 100)}%</dd>
  `;
}

/* ------------------------------------------------ springs and neaps note */

function springsNote(range, moon) {
  const mid = midnight();
  // Compare with the fortnight around this day to say where in the cycle it sits.
  let lo = Infinity, hi = -Infinity;
  for (let k = -7; k <= 7; k++) {
    const m2 = mid + k * 86400000;
    const hs = tideExtremes(m2).map(e => e.height);
    if (!hs.length) continue;
    const r = Math.max(...hs) - Math.min(...hs);
    lo = Math.min(lo, r); hi = Math.max(hi, r);
  }
  const t = (range - lo) / (hi - lo || 1);
  const where = t > 0.78 ? 'at springs' : t > 0.5 ? 'making toward springs'
              : t < 0.22 ? 'at neaps' : 'taking off toward neaps';

  el('springs-note').innerHTML =
    `The moon is here because it is what moves the column beside it. Sun and moon pull together at new and
     full and the range opens; they pull across each other at the quarters and it closes. Today&#8217;s
     ${two(range)}&nbsp;m sits <b>${where}</b>, in a fortnight running from ${two(lo)}&nbsp;m at neaps to
     ${two(hi)}&nbsp;m at springs. The turn does not fall exactly on the moon: the lunar distance term pulls
     the largest ranges a day or two either side of new and full, which is why the week strip above peaks
     when it does rather than on the phase itself.`;
}

/* ----------------------------------------------------------------- lights */

let lightsRunning = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let rafId = null;

// Every bar is drawn on the same twelve-second axis, and each light's pattern
// repeats across it. Normalising each bar to its own period would make a
// one-second quick flash and a twelve-second group occupy the same width, which
// is the one comparison the reader is here to make.
const AXIS_SECONDS = 12;

function buildLights() {
  const list = el('light-list');
  list.replaceChildren();

  for (const L of LIGHTS) {
    const li = document.createElement('li');
    li.className = 'light';
    const colour = `var(--lamp-${L.colour})`;

    li.innerHTML = `
      <svg class="lamp" viewBox="-26 -26 52 52" aria-hidden="true" data-lamp="${L.ref}">
        <circle cx="0" cy="0" r="22" fill="none" stroke="var(--hair)" stroke-width="1"></circle>
        <circle class="lamp-glass" cx="0" cy="0" r="15" fill="var(--paper-sunk)"
                stroke="var(--ink)" stroke-width="1"></circle>
      </svg>
      <div class="light-id">
        <span class="light-ref">${L.ref}</span>
        <p class="light-name">${L.name}</p>
        <p class="light-structure">${L.structure}</p>
      </div>
      <div class="light-char">
        <div class="char-line">
          <span class="char-code">${L.char}</span>
          <span class="char-spec">repeats every ${L.period}s &nbsp;·&nbsp;
            light ${L.elevation}&nbsp;m above high water &nbsp;·&nbsp;
            visible ${L.range} nautical miles</span>
        </div>
        <svg class="timing" viewBox="0 0 600 30" preserveAspectRatio="none" aria-hidden="true"
             data-timing="${L.ref}"></svg>
      </div>
      <p class="light-note">${L.note}</p>
    `;
    list.appendChild(li);

    const timing = li.querySelector('.timing');
    const W = 600, baseY = 20;
    const px = sec => (sec / AXIS_SECONDS) * W;

    timing.appendChild(svg('line', { x1: 0, x2: W, y1: baseY, y2: baseY, stroke: 'var(--hair)', 'stroke-width': 1 }));

    for (let sec = 0; sec <= AXIS_SECONDS; sec++) {
      timing.appendChild(svg('line', {
        x1: px(sec), x2: px(sec), y1: baseY, y2: baseY + (sec % 5 === 0 ? 8 : 4),
        stroke: 'var(--hair)', 'stroke-width': 1,
      }));
    }

    // Repeat the pattern across the shared axis, and mark where each period ends.
    for (let cycle = 0; cycle * L.period < AXIS_SECONDS; cycle++) {
      const offset = cycle * L.period;
      for (const [startS, dur] of L.seq) {
        const a = offset + startS;
        if (a >= AXIS_SECONDS) continue;
        const b = Math.min(a + dur, AXIS_SECONDS);
        timing.appendChild(svg('rect', {
          x: px(a), y: 4, width: Math.max(1, px(b) - px(a)), height: 16,
          fill: colour, stroke: 'var(--ink)', 'stroke-width': L.colour === 'W' ? 1 : 0,
        }));
      }
      if (offset > 0) {
        timing.appendChild(svg('line', {
          x1: px(offset), x2: px(offset), y1: 0, y2: baseY,
          stroke: 'var(--hair)', 'stroke-width': 1, 'stroke-dasharray': '2 3',
        }));
      }
    }

    timing.appendChild(svg('rect', {
      class: 'playhead', x: 0, y: 2, width: 2, height: 20, fill: 'var(--magenta)',
    }));
  }
}

function litNow(L, tSeconds) {
  const phase = tSeconds % L.period;
  return L.seq.some(([start, dur]) => phase >= start && phase < start + dur);
}

function tickLights(now) {
  const t = now / 1000;
  for (const L of LIGHTS) {
    const lamp = document.querySelector(`[data-lamp="${CSS.escape(L.ref)}"] .lamp-glass`);
    const head = document.querySelector(`[data-timing="${CSS.escape(L.ref)}"] .playhead`);
    const on = litNow(L, t);
    lamp.setAttribute('fill', on ? `var(--lamp-${L.colour})` : 'var(--paper-sunk)');
    head.setAttribute('x', ((t % AXIS_SECONDS) / AXIS_SECONDS) * 600);
  }
  rafId = requestAnimationFrame(tickLights);
}

function setLights(running) {
  lightsRunning = running;
  const btn = el('motion-toggle');
  btn.setAttribute('aria-pressed', String(running));
  btn.textContent = running ? 'Pause the lights' : 'Run the lights';

  if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  if (running) {
    rafId = requestAnimationFrame(tickLights);
  } else {
    for (const L of LIGHTS) {
      document.querySelector(`[data-lamp="${CSS.escape(L.ref)}"] .lamp-glass`)
        .setAttribute('fill', `var(--lamp-${L.colour})`);
      document.querySelector(`[data-timing="${CSS.escape(L.ref)}"] .playhead`).setAttribute('x', 0);
    }
  }
}

el('motion-toggle').addEventListener('click', () => setLights(!lightsRunning));

/* ------------------------------------------------------------------ datum */

const CHARTED_SOUNDING = 3.4;
const DRAUGHT = 1.8;

// A section through the channel: what the chart promises, what the tide adds,
// and what is actually left under the keel — which is the only one of the three
// a navigator acts on.
function drawDatum(ex) {
  const fig = el('datum-fig');
  fig.replaceChildren();

  const hw = ex.filter(e => e.kind === 'HW').sort((a, b) => b.height - a.height)[0] || ex[0];
  const lw = Math.min(...ex.map(e => e.height));
  const tide = hw.height;

  const W = 580, H = 330;
  const top = 34, bottom = 46;
  const left = 150, right = W - 96;
  const perMetre = (H - top - bottom) / (tide + CHARTED_SOUNDING);
  const surfaceY = top;
  const datumY = surfaceY + tide * perMetre;
  const bedY = datumY + CHARTED_SOUNDING * perMetre;
  const keelY = surfaceY + DRAUGHT * perMetre;

  fig.setAttribute('viewBox', `0 0 ${W} ${H}`);

  // Hatching for the ground, the way a section is drawn.
  const defs = svg('defs');
  const pat = svg('pattern', {
    id: 'ground', width: 7, height: 7, patternUnits: 'userSpaceOnUse',
    patternTransform: 'rotate(45)',
  });
  pat.appendChild(svg('line', { x1: 0, y1: 0, x2: 0, y2: 7, stroke: 'var(--hair)', 'stroke-width': 1 }));
  defs.appendChild(pat);

  const arrow = svg('marker', {
    id: 'tick', markerWidth: 9, markerHeight: 9, refX: 4.5, refY: 4.5, orient: 'auto',
  });
  arrow.appendChild(svg('path', { d: 'M4.5,1 L4.5,8', stroke: 'var(--ink)', 'stroke-width': 1.4 }));
  defs.appendChild(arrow);
  fig.appendChild(defs);

  // Water, in two tones: the column that is there at any state of tide, and
  // the part the tide has added today.
  fig.appendChild(svg('rect', {
    x: left, y: datumY, width: right - left, height: bedY - datumY,
    fill: 'var(--water)', opacity: 0.8,
  }));
  fig.appendChild(svg('rect', {
    x: left, y: surfaceY, width: right - left, height: datumY - surfaceY,
    fill: 'var(--water)', opacity: 0.4,
  }));

  fig.appendChild(svg('rect', { x: left, y: bedY, width: right - left, height: H - bedY, fill: 'url(#ground)' }));
  fig.appendChild(svg('line', { x1: left, x2: right, y1: bedY, y2: bedY, stroke: 'var(--ink)', 'stroke-width': 1.6 }));
  fig.appendChild(svg('line', { x1: left, x2: right, y1: surfaceY, y2: surfaceY, stroke: 'var(--ink)', 'stroke-width': 1.6 }));
  fig.appendChild(svg('line', {
    x1: left - 10, x2: right, y1: datumY, y2: datumY,
    stroke: 'var(--magenta)', 'stroke-width': 1, 'stroke-dasharray': '5 3',
  }));

  // A hull on the same vertical scale as the water, so the clearance under it
  // is measured rather than suggested.
  const hx = left + 104;
  const beam = 84;
  const draughtPx = keelY - surfaceY;
  const B = beam, d = draughtPx;
  fig.appendChild(svg('path', {
    d: `M${hx - B},${surfaceY - 15} L${hx + B},${surfaceY - 15}
        C${hx + B * 0.98},${surfaceY + d * 0.3} ${hx + B * 0.82},${keelY - d * 0.12} ${hx + B * 0.4},${keelY}
        L${hx - B * 0.4},${keelY}
        C${hx - B * 0.82},${keelY - d * 0.12} ${hx - B * 0.98},${surfaceY + d * 0.3} ${hx - B},${surfaceY - 15} Z`,
    fill: 'var(--paper)', stroke: 'var(--ink)', 'stroke-width': 1.4, 'stroke-linejoin': 'round',
  }));
  fig.appendChild(svg('line', {
    x1: hx - beam + 2, x2: hx + beam - 2, y1: surfaceY, y2: surfaceY,
    stroke: 'var(--ink)', 'stroke-width': 1,
  }));

  const label = (yPos, text, cls) =>
    fig.appendChild(svg('text', { x: left - 16, y: yPos + 4, 'text-anchor': 'end', class: cls || 'fig-l' }, text));
  label(surfaceY, 'Surface, high water');
  label(datumY, 'Chart datum (LAT)', 'fig-l fig-l-mag');
  label(bedY, 'Seabed');

  const dim = (x0, yA, yB, text, accent, anchor) => {
    fig.appendChild(svg('line', {
      x1: x0, x2: x0, y1: yA, y2: yB,
      stroke: accent ? 'var(--magenta)' : 'var(--ink)', 'stroke-width': 1,
      'marker-start': 'url(#tick)', 'marker-end': 'url(#tick)',
    }));
    fig.appendChild(svg('text', {
      x: x0 + (anchor === 'end' ? -7 : 7), y: (yA + yB) / 2 + 4,
      'text-anchor': anchor || 'start',
      class: accent ? 'fig-d fig-d-mag' : 'fig-d',
    }, text));
  };

  // Two stacks: what the chart and the tide give, at the right; what the vessel
  // takes and keeps, beside the hull.
  dim(right + 16, surfaceY, datumY, `${two(tide)} tide`);
  dim(right + 16, datumY, bedY, `${one(CHARTED_SOUNDING)} charted`);
  dim(hx + beam + 16, surfaceY, keelY, `${one(DRAUGHT)} draught`);
  dim(hx + beam + 16, keelY, bedY, `${two(tide + CHARTED_SOUNDING - DRAUGHT)} under the keel`, true);

  fig.appendChild(svg('text', { x: left, y: H - 12, class: 'fig-l' }, 'Metres. Vertical scale only.'));

  el('datum-sum').innerHTML =
    `A vessel drawing ${one(DRAUGHT)}&nbsp;m over a ${one(CHARTED_SOUNDING)}&nbsp;m sounding has
     <b>${two(tide + CHARTED_SOUNDING - DRAUGHT)}&nbsp;m</b> under the keel at today&#8217;s high water
     and <b>${two(lw + CHARTED_SOUNDING - DRAUGHT)}&nbsp;m</b> at today&#8217;s low water.`;
}

/* -------------------------------------------------------------- week strip */

function drawWeek() {
  const week = el('week');
  week.replaceChildren();

  const centre = Date.UTC(day.y, day.m, day.d);
  for (let k = -3; k <= 3; k++) {
    const d = new Date(centre + k * 86400000);
    const mid = localMidnightUTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    const hs = tideExtremes(mid).map(e => e.height);
    const range = hs.length ? Math.max(...hs) - Math.min(...hs) : 0;
    const isCurrent = k === 0;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'day';
    if (isCurrent) btn.setAttribute('aria-current', 'date');
    btn.innerHTML = `
      <span class="day-wd">${WEEKDAY[d.getUTCDay()]}</span>
      <span class="day-n">${d.getUTCDate()}</span>
      <span class="day-range" style="width:${Math.round((range / 4.6) * 100)}%"></span>
      <span class="day-range-t">${two(range)} m</span>
    `;
    btn.setAttribute('aria-label',
      `${WEEKDAY[d.getUTCDay()]} ${d.getUTCDate()} ${MONTH[d.getUTCMonth()]}, range ${two(range)} metres`);
    btn.addEventListener('click', () => {
      day = { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate() };
      render();
    });
    week.appendChild(btn);
  }
}

function shiftDay(n) {
  const d = new Date(Date.UTC(day.y, day.m, day.d) + n * 86400000);
  day = { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate() };
  render();
}

el('prev-day').addEventListener('click', () => shiftDay(-1));
el('next-day').addEventListener('click', () => shiftDay(1));

/* ------------------------------------------------------------------ render */

function render() {
  const d = new Date(Date.UTC(day.y, day.m, day.d));
  el('daydate').textContent = `${WEEKDAY_LONG[d.getUTCDay()]} ${day.d} ${MONTH[day.m]} ${day.y}`;

  clearCursor();
  drawWeek();
  drawPlate();
  const { ex, range, moon } = drawTideTable();
  drawSun();
  drawMoon(moon);
  springsNote(range, moon);
  drawDatum(ex);
}

let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(drawPlate, 120);
});

buildLights();
setLights(lightsRunning);
render();
