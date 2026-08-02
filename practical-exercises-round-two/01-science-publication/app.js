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

  const maxD = LAYERS[LAYERS.length - 1].depth;
  const maxT = 0.24;
  const x = d => L + (d / maxD) * (W - L - R);
  const y = t => T + (1 - t / maxT) * (H - T - B);

  // The interval where summers stay separable, shaded before anything is drawn on it.
  svg.appendChild(n('rect', {
    x: x(0), y: T, width: x(COUNTABLE_DEPTH) - x(0), height: H - T - B,
    fill: '#2b5f8f', opacity: 0.09,
  }));
  svg.appendChild(axisText(x(COUNTABLE_DEPTH / 2), T + 16, 'countable by eye'));

  for (let t = 0; t <= 0.24; t += 0.06) {
    svg.appendChild(n('line', { x1: L, x2: W - R, y1: y(t), y2: y(t), stroke: '#14181a', opacity: t === 0 ? 0.4 : 0.1 }));
    svg.appendChild(axisText(L - 8, y(t) + 4, (t * 100).toFixed(0), 'end'));
  }
  svg.appendChild(axisText(L - 8, T - 6, 'cm', 'end'));

  for (let d = 0; d <= maxD; d += 600) {
    svg.appendChild(n('line', { x1: x(d), x2: x(d), y1: T, y2: y(0), stroke: '#14181a', opacity: 0.1 }));
    svg.appendChild(axisText(x(d), H - B + 18, d.toLocaleString('en-GB')));
  }
  svg.appendChild(axisText(W - R, H - B + 34, 'depth, metres', 'end'));

  const d = LAYERS.map((p, i) => `${i ? 'L' : 'M'}${x(p.depth).toFixed(1)},${y(p.thickness).toFixed(1)}`).join('');
  svg.appendChild(n('path', { d: `${d}L${x(maxD)},${y(0)}L${x(0)},${y(0)}Z`, fill: '#2b5f8f', opacity: 0.14 }));
  svg.appendChild(n('path', { d, fill: 'none', stroke: '#14181a', 'stroke-width': 1.8, 'stroke-linejoin': 'round' }));

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

  for (let v = -46; v <= -32; v += 2) {
    svg.appendChild(n('line', { x1: L, x2: W - R, y1: y(v), y2: y(v), stroke: '#14181a', opacity: 0.1 }));
    svg.appendChild(axisText(L - 8, y(v) + 4, String(v), 'end'));
  }
  svg.appendChild(axisText(L - 8, T - 6, '‰', 'end'));

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

// Ticks sit at true depth. Labels cannot — the top four horizons fall within
// 4% of the column and would overlap — so each label is pushed to the nearest
// free slot and a leader joins it back to its own tick, the way a section
// drawing annotates a thin band.
const RAIL_W = 132, RAIL_H = 520, RAIL_X = 5, LABEL_X = 22, MIN_GAP = 40;

function buildRail() {
  const host = el('rail-scale');
  if (!host) return;
  host.replaceChildren();

  const svg = n('svg', {
    viewBox: `0 0 ${RAIL_W} ${RAIL_H + 34}`, width: '100%',
    role: 'img',
    'aria-label': 'Depth scale of the core from surface to bedrock, with fixed dated horizons.',
  });

  const maxD = CORE.depthTotal;
  const yOf = d => 8 + (d / maxD) * RAIL_H;

  svg.appendChild(n('line', { x1: RAIL_X, x2: RAIL_X, y1: 8, y2: 8 + RAIL_H, stroke: '#14181a', opacity: .42 }));

  // Push labels down until each clears the one above it.
  const marks = HORIZONS.map(h => ({ h, tick: yOf(h.depth), label: yOf(h.depth) }));
  for (let i = 1; i < marks.length; i++) {
    if (marks[i].label - marks[i - 1].label < MIN_GAP) marks[i].label = marks[i - 1].label + MIN_GAP;
  }
  const overflow = marks[marks.length - 1].label - (8 + RAIL_H);
  if (overflow > 0) for (const m of marks) m.label -= overflow;

  marks.forEach(({ h, tick, label }) => {
    svg.appendChild(n('path', {
      d: `M${RAIL_X},${tick.toFixed(1)} L${LABEL_X - 8},${label.toFixed(1)} L${LABEL_X - 3},${label.toFixed(1)}`,
      fill: 'none', stroke: '#14181a', opacity: .38, 'stroke-width': 1,
    }));
    const t = (str, dy, cls) => {
      const node = n('text', { x: LABEL_X, y: (label + dy).toFixed(1), class: cls }, str);
      svg.appendChild(node);
    };
    t(h.label, -3, 'rl-b');
    t(h.age, 9, 'rl-a');
    t(h.note, 20, 'rl-n');
  });

  svg.appendChild(n('rect', { id: 'rail-read-bar', x: RAIL_X - 1, y: 8, width: 2, height: 0, fill: '#2b5f8f', opacity: .3 }));
  svg.appendChild(n('rect', { id: 'rail-here-sq', x: RAIL_X - 4, y: 4, width: 9, height: 9, fill: '#2b5f8f' }));

  host.appendChild(svg);
}

function trackReading() {
  const article = document.querySelector('.prose');
  const sq = document.getElementById('rail-here-sq');
  const bar = document.getElementById('rail-read-bar');
  if (!article || !sq) return;

  const update = () => {
    const box = article.getBoundingClientRect();
    const total = box.height - window.innerHeight;
    const passed = Math.min(1, Math.max(0, -box.top / (total > 0 ? total : 1)));
    const y = 8 + passed * RAIL_H;
    sq.setAttribute('y', (y - 4.5).toFixed(1));
    bar.setAttribute('height', (y - 8).toFixed(1));
  };

  update();
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', update);
}

let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { drawLayers(); drawIsotopes(); }, 150);
});

drawLayers();
drawIsotopes();
buildRail();
trackReading();
