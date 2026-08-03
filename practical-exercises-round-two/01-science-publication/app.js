const NS = 'http://www.w3.org/2000/svg';
const el = id => document.getElementById(id);

function n(tag, attrs = {}, text) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (text !== undefined) node.textContent = text;
  return node;
}

const AX = { fill: '#5a6468', size: 11 };

function axisText(x, y, str, anchor = 'middle') {
  const t = n('text', { x, y, 'text-anchor': anchor, fill: AX.fill }, str);
  t.setAttribute('style', `font-family:'Barlow Semi Condensed',sans-serif;font-size:${AX.size}px`);
  return t;
}

/* ------------------------------------------------- Fig 2 — layer thickness */

function drawLayers() {
  const svg = el('plot-layers');
  if (!svg) return;
  const W = 900, H = 300, L = 54, R = 20, T = 20, B = 40;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.replaceChildren();

  // The axis runs the whole core even though the series stops at 2,400 m: the
  // point of the figure is how small the countable interval is against the rest.
  const maxD = CORE.depthTotal;
  const dataEnd = LAYERS[LAYERS.length - 1].depth;
  const maxT = 0.24;
  const x = d => L + (d / maxD) * (W - L - R);
  const y = t => T + (1 - t / maxT) * (H - T - B);

  // The interval where summers stay separable, shaded before anything is drawn on it.
  svg.appendChild(n('rect', {
    x: x(0), y: T, width: x(COUNTABLE_DEPTH) - x(0), height: H - T - B,
    fill: '#2b5f8f', opacity: 0.09,
  }));
  // Sits low in the band, clear of the surface annotation at the top left.
  svg.appendChild(axisText(x(COUNTABLE_DEPTH / 2), H - B - 10, 'countable by eye'));

  // The top tick is left unlabelled and its slot carries the unit instead, so
  // the unit and the 24 do not print on top of each other.
  for (let t = 0; t <= 0.18; t += 0.06) {
    svg.appendChild(n('line', { x1: L, x2: W - R, y1: y(t), y2: y(t), stroke: '#14181a', opacity: t === 0 ? 0.4 : 0.1 }));
    svg.appendChild(axisText(L - 8, y(t) + 4, (t * 100).toFixed(0), 'end'));
  }
  svg.appendChild(n('line', { x1: L, x2: W - R, y1: y(0.24), y2: y(0.24), stroke: '#14181a', opacity: 0.1 }));
  svg.appendChild(axisText(L - 8, y(0.24) + 4, 'cm', 'end'));

  for (let d = 0; d <= maxD; d += 600) {
    svg.appendChild(n('line', { x1: x(d), x2: x(d), y1: T, y2: y(0), stroke: '#14181a', opacity: 0.1 }));
    svg.appendChild(axisText(x(d), H - B + 18, d.toLocaleString('en-GB')));
  }
  svg.appendChild(axisText(W - R, H - B + 34, 'depth, metres', 'end'));

  const d = LAYERS.map((p, i) => `${i ? 'L' : 'M'}${x(p.depth).toFixed(1)},${y(p.thickness).toFixed(1)}`).join('');
  svg.appendChild(n('path', { d: `${d}L${x(maxD)},${y(0)}L${x(0)},${y(0)}Z`, fill: '#2b5f8f', opacity: 0.14 }));
  svg.appendChild(n('path', { d, fill: 'none', stroke: '#14181a', 'stroke-width': 1.8, 'stroke-linejoin': 'round' }));

  // The threshold the whole article is about, marked on the figure that shows it.
  svg.appendChild(n('line', {
    x1: x(COUNTABLE_DEPTH), x2: x(COUNTABLE_DEPTH), y1: T, y2: y(0),
    stroke: '#14181a', 'stroke-width': 1.2, 'stroke-dasharray': '3 3', opacity: 0.7,
  }));
  const th = axisText(x(COUNTABLE_DEPTH) + 5, H - B - 26, `${COUNTABLE_DEPTH} m`, 'start');
  th.setAttribute('fill', '#14181a');
  svg.appendChild(th);
  svg.appendChild(axisText(x(dataEnd), H - B + 34, 'no thickness data below 2,400 m', 'end'));

  const top = LAYERS[0];
  svg.appendChild(n('circle', { cx: x(top.depth), cy: y(top.thickness), r: 3, fill: '#14181a' }));
  const lab = axisText(x(top.depth) + 8, y(top.thickness) + 4, `${LAYER_AT_TOP_CM} cm at the surface`, 'start');
  lab.setAttribute('fill', '#14181a');
  svg.appendChild(lab);
}

/* ---------------------------------------------------- Fig 3 — isotope curve */

function drawIsotopes() {
  const svg = el('plot-isotopes');
  if (!svg) return;
  const W = 900, H = 330, L = 54, R = 20, T = 22, B = 46;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.replaceChildren();

  const maxD = CORE.depthTotal;
  const lo = -46, hi = -32;
  const x = d => L + (d / maxD) * (W - L - R);
  const y = v => T + (1 - (v - lo) / (hi - lo)) * (H - T - B);

  // The top tick's slot carries the unit instead of a number, so the unit and
  // the -32 do not print on top of each other.
  for (let v = -46; v <= -34; v += 2) {
    svg.appendChild(n('line', { x1: L, x2: W - R, y1: y(v), y2: y(v), stroke: '#14181a', opacity: 0.1 }));
    svg.appendChild(axisText(L - 8, y(v) + 4, String(v), 'end'));
  }
  svg.appendChild(n('line', { x1: L, x2: W - R, y1: y(-32), y2: y(-32), stroke: '#14181a', opacity: 0.1 }));
  svg.appendChild(axisText(L - 8, y(-32) + 4, '‰', 'end'));

  for (let d = 0; d <= maxD; d += 500) {
    svg.appendChild(n('line', { x1: x(d), x2: x(d), y1: T, y2: H - B, stroke: '#14181a', opacity: 0.1 }));
    svg.appendChild(axisText(x(d), H - B + 18, d.toLocaleString('en-GB')));
  }
  svg.appendChild(axisText(W - R, H - B + 34, 'depth, metres', 'end'));

  const path = ISOTOPES.map((p, i) => `${i ? 'L' : 'M'}${x(p.depth).toFixed(1)},${y(p.d18O).toFixed(1)}`).join('');
  svg.appendChild(n('path', { d: path, fill: 'none', stroke: '#2b5f8f', 'stroke-width': 1.3, 'stroke-linejoin': 'round' }));

  // Fixed horizons, so the figure and the rail name the same points.
  HORIZONS.filter(h => h.depth > 0 && h.depth < maxD).forEach(h => {
    svg.appendChild(n('line', {
      x1: x(h.depth), x2: x(h.depth), y1: T, y2: H - B,
      stroke: '#14181a', 'stroke-width': 1, 'stroke-dasharray': '3 3', opacity: 0.55,
    }));
    const t = axisText(x(h.depth) + 4, T + 12, h.age, 'start');
    t.setAttribute('fill', '#14181a');
    svg.appendChild(t);
  });
}

/* ------------------------------------------------------------- the core rail */

/* Ticks sit at true depth. Labels cannot — the top four horizons fall within 4%
   of the column and would overlap — so each label is pushed to the nearest free
   slot and a leader joins it back to its own tick, the way a section drawing
   annotates a thin band.

   There are two compositions. Scaled into a phone the tall version keeps its
   proportional spacing and becomes about 1.6 screens of mostly empty column
   standing between the headline and the first sentence — the apparatus becoming
   the obstacle. The flat version lays the same horizons out left to right in
   about 100px and keeps the reader marker working. */

const TALL = { w: 132, h: 520, pad: 8, labelOff: 22, gap: 40 };
const FLAT = { w: 640, h: 100, pad: 10, axisY: 30, gap: 86 };

let railFlat = null;   // which composition is currently drawn

function railLayout() {
  return window.innerWidth <= 1080;
}

function buildRail() {
  const host = el('rail-scale');
  if (!host) return;
  const flat = railLayout();
  railFlat = flat;

  const maxD = CORE.depthTotal;
  const svg = n('svg', {
    viewBox: flat ? `0 0 ${FLAT.w} ${FLAT.h}` : `0 0 ${TALL.w} ${TALL.h + 34}`,
    width: '100%', role: 'img',
    'aria-label': 'Depth scale of the core from the surface at zero metres to bedrock at 3,405 '
      + 'metres, marked with six dated horizons.',
  });

  if (flat) {
    const span = FLAT.w - FLAT.pad * 2;
    const xOf = d => FLAT.pad + (d / maxD) * span;

    svg.appendChild(n('line', {
      x1: FLAT.pad, x2: FLAT.w - FLAT.pad, y1: FLAT.axisY, y2: FLAT.axisY,
      stroke: '#14181a', opacity: .42,
    }));

    // Same displacement rule as the tall version, transposed onto x — but a
    // horizontal strip has two walls, not one. Pushing right to clear overlaps
    // and then shifting the whole run left to fit drove the first label off the
    // canvas, so both ends are clamped and the forward pass is re-run.
    const MIN_X = 34, MAX_X = FLAT.w - 34;
    const marks = HORIZONS.map(h => ({ h, tick: xOf(h.depth), label: xOf(h.depth) }));
    const spread = () => {
      for (const m of marks) m.label = Math.max(m.label, MIN_X);
      for (let i = 1; i < marks.length; i++) {
        if (marks[i].label - marks[i - 1].label < FLAT.gap) marks[i].label = marks[i - 1].label + FLAT.gap;
      }
    };
    spread();
    const over = marks[marks.length - 1].label - MAX_X;
    if (over > 0) { for (const m of marks) m.label -= over; spread(); }

    marks.forEach(({ h, tick, label }) => {
      svg.appendChild(n('path', {
        d: `M${tick.toFixed(1)},${FLAT.axisY} L${tick.toFixed(1)},${FLAT.axisY + 6} `
         + `L${label.toFixed(1)},${FLAT.axisY + 13} L${label.toFixed(1)},${FLAT.axisY + 18}`,
        fill: 'none', stroke: '#14181a', opacity: .38, 'stroke-width': 1,
      }));
      const anchor = { x: label.toFixed(1), 'text-anchor': 'middle' };
      svg.appendChild(n('text', { ...anchor, y: FLAT.axisY + 30, class: 'rl-b' }, h.label));
      svg.appendChild(n('text', { ...anchor, y: FLAT.axisY + 43, class: 'rl-a' }, h.age));
    });

    svg.appendChild(n('rect', {
      id: 'rail-read-bar', x: FLAT.pad, y: FLAT.axisY - 1, width: 0, height: 2,
      fill: '#2b5f8f', opacity: .3,
    }));
    svg.appendChild(n('rect', {
      id: 'rail-here-sq', x: FLAT.pad - 4.5, y: FLAT.axisY - 4.5, width: 9, height: 9, fill: '#2b5f8f',
    }));
  } else {
    const yOf = d => TALL.pad + (d / maxD) * TALL.h;

    svg.appendChild(n('line', {
      x1: 5, x2: 5, y1: TALL.pad, y2: TALL.pad + TALL.h, stroke: '#14181a', opacity: .42,
    }));

    const marks = HORIZONS.map(h => ({ h, tick: yOf(h.depth), label: yOf(h.depth) }));
    for (let i = 1; i < marks.length; i++) {
      if (marks[i].label - marks[i - 1].label < TALL.gap) marks[i].label = marks[i - 1].label + TALL.gap;
    }
    const over = marks[marks.length - 1].label - (TALL.pad + TALL.h);
    if (over > 0) for (const m of marks) m.label -= over;

    marks.forEach(({ h, tick, label }) => {
      svg.appendChild(n('path', {
        d: `M5,${tick.toFixed(1)} L${TALL.labelOff - 8},${label.toFixed(1)} `
         + `L${TALL.labelOff - 3},${label.toFixed(1)}`,
        fill: 'none', stroke: '#14181a', opacity: .38, 'stroke-width': 1,
      }));
      const t = (str, dy, cls) =>
        svg.appendChild(n('text', { x: TALL.labelOff, y: (label + dy).toFixed(1), class: cls }, str));
      t(h.label, -3, 'rl-b');
      t(h.age, 9, 'rl-a');
      t(h.note, 20, 'rl-n');
    });

    svg.appendChild(n('rect', {
      id: 'rail-read-bar', x: 4, y: TALL.pad, width: 2, height: 0, fill: '#2b5f8f', opacity: .3,
    }));
    svg.appendChild(n('rect', {
      id: 'rail-here-sq', x: 1, y: TALL.pad - 4.5, width: 9, height: 9, fill: '#2b5f8f',
    }));
  }

  host.replaceChildren(svg);
}

function trackReading() {
  const article = document.querySelector('.prose');
  if (!article) return;

  const update = () => {
    const sq = document.getElementById('rail-here-sq');
    const bar = document.getElementById('rail-read-bar');
    if (!sq || !bar) return;
    const box = article.getBoundingClientRect();
    const total = box.height - window.innerHeight;
    const passed = Math.min(1, Math.max(0, -box.top / (total > 0 ? total : 1)));
    if (railFlat) {
      const x = FLAT.pad + passed * (FLAT.w - FLAT.pad * 2);
      sq.setAttribute('x', (x - 4.5).toFixed(1));
      bar.setAttribute('width', (x - FLAT.pad).toFixed(1));
    } else {
      const y = TALL.pad + passed * TALL.h;
      sq.setAttribute('y', (y - 4.5).toFixed(1));
      bar.setAttribute('height', (y - TALL.pad).toFixed(1));
    }
  };

  update();
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', update);
  window.__railUpdate = update;
}

let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    drawLayers();
    drawIsotopes();
    if (railLayout() !== railFlat) { buildRail(); window.__railUpdate?.(); }
  }, 150);
});

drawLayers();
drawIsotopes();
buildRail();
trackReading();
