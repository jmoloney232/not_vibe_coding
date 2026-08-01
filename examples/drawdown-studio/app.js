const NS = 'http://www.w3.org/2000/svg';
const el = id => document.getElementById(id);
const cellSize = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cell'));

const state = {
  draftId: 'twill',
  shafts: 4,
  threading: [],
  tieup: [],
  treadling: [],
  warpOrder: [],
  weftOrder: [],
  warpDye: 1,
  warpDyeB: 0,
  weftDye: 0,
  weftDyeB: 1,
  revealed: PICKS,       // how many picks of cloth are on the loom
};

function node(tag, attrs = {}) {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
}

function loadDraft(id) {
  const d = DRAFTS.find(x => x.id === id);
  state.draftId = id;
  state.shafts = d.shafts;
  state.threading = d.threading.slice();
  state.tieup = d.tieup.map(t => t.slice());
  state.treadling = d.treadling.slice();
  state.warpOrder = d.warpOrder();
  state.weftOrder = d.weftOrder();
  state.revealed = PICKS;
  if (d.dyes) {
    state.warpDye = d.dyes.warp; state.warpDyeB = d.dyes.warpB;
    state.weftDye = d.dyes.weft; state.weftDyeB = d.dyes.weftB;
    syncDyeButtons();
  }
  el('blurb').textContent = d.blurb;
  el('shaft-count').textContent = `· ${SHAFTS} shafts`;
}

/* --------------------------------------------------------- interlacement */

// The whole design reduces to this one line: an end shows warp when the
// treadle used for that pick lifts the shaft the end is threaded on.
const warpUp = (pick, end) => state.tieup[state.treadling[pick]].includes(state.threading[end]);

const dyeOf = i => DYES[i].hex;

/* ------------------------------------------------------------- rendering */

function sizeGrid(svgEl, cols, rows) {
  const c = cellSize();
  svgEl.setAttribute('viewBox', `0 0 ${cols * c} ${rows * c}`);
  svgEl.setAttribute('width', cols * c);
  svgEl.setAttribute('height', rows * c);
  svgEl.replaceChildren();
  return c;
}

function gridLines(svgEl, cols, rows, c) {
  const g = node('g', { class: 'rules' });
  for (let i = 0; i <= cols; i++) {
    g.appendChild(node('line', {
      x1: i * c, x2: i * c, y1: 0, y2: rows * c,
      stroke: i % 4 === 0 ? 'var(--hair)' : 'var(--hair-soft)', 'stroke-width': 1,
    }));
  }
  for (let j = 0; j <= rows; j++) {
    g.appendChild(node('line', {
      x1: 0, x2: cols * c, y1: j * c, y2: j * c,
      stroke: j % 4 === 0 ? 'var(--hair)' : 'var(--hair-soft)', 'stroke-width': 1,
    }));
  }
  svgEl.appendChild(g);
}

function drawColourStrip(svgEl, order, dyeIdx, dyeIdxB, horizontal) {
  const c = sizeGrid(svgEl, horizontal ? ENDS : 1, horizontal ? 1 : PICKS);
  order.forEach((slot, i) => {
    svgEl.appendChild(node('rect', {
      x: horizontal ? i * c : 0,
      y: horizontal ? 0 : i * c,
      width: c, height: c,
      fill: dyeOf(slot === 0 ? dyeIdx : dyeIdxB),
    }));
  });
  svgEl.appendChild(node('rect', {
    x: 0.5, y: 0.5,
    width: (horizontal ? ENDS : 1) * c - 1, height: (horizontal ? 1 : PICKS) * c - 1,
    fill: 'none', stroke: 'var(--hair)', 'stroke-width': 1,
  }));
}

function drawThreading() {
  const c = sizeGrid(el('threading'), ENDS, SHAFTS);
  gridLines(el('threading'), ENDS, SHAFTS, c);
  state.threading.forEach((shaft, end) => {
    el('threading').appendChild(node('rect', {
      x: end * c + 1, y: shaft * c + 1, width: c - 2, height: c - 2,
      fill: 'var(--ink)', class: 'mark', 'data-end': end, 'data-shaft': shaft,
    }));
  });
}

function drawTieup() {
  const c = sizeGrid(el('tieup'), TREADLES, SHAFTS);
  gridLines(el('tieup'), TREADLES, SHAFTS, c);
  state.tieup.forEach((shafts, treadle) => {
    shafts.forEach(shaft => {
      el('tieup').appendChild(node('rect', {
        x: treadle * c + 1, y: shaft * c + 1, width: c - 2, height: c - 2,
        fill: 'var(--ink)', class: 'mark',
      }));
    });
  });
}

function drawTreadling() {
  const c = sizeGrid(el('treadling'), TREADLES, PICKS);
  gridLines(el('treadling'), TREADLES, PICKS, c);
  state.treadling.forEach((treadle, pick) => {
    el('treadling').appendChild(node('rect', {
      x: treadle * c + 1, y: pick * c + 1, width: c - 2, height: c - 2,
      fill: pick < state.revealed ? 'var(--ink)' : 'var(--hair-soft)', class: 'mark',
    }));
  });
}

function drawCloth() {
  const svgEl = el('drawdown');
  const c = sizeGrid(svgEl, ENDS, PICKS);

  const warpHex = dyeOf(state.warpDye);
  const warpAlt = dyeOf(state.warpDyeB);
  const weftHex = dyeOf(state.weftDye);
  const weftAlt = dyeOf(state.weftDyeB);

  for (let pick = 0; pick < state.revealed; pick++) {
    for (let end = 0; end < ENDS; end++) {
      const up = warpUp(pick, end);
      const fill = up
        ? (state.warpOrder[end] === 0 ? warpHex : warpAlt)
        : (state.weftOrder[pick] === 0 ? weftHex : weftAlt);
      svgEl.appendChild(node('rect', {
        x: end * c, y: pick * c, width: c + 0.3, height: c + 0.3, fill,
      }));
    }
  }

  // Unwoven warp below the fell of the cloth, so a partial weave reads as a
  // loom in progress rather than as a rendering that failed.
  if (state.revealed < PICKS) {
    for (let end = 0; end < ENDS; end++) {
      svgEl.appendChild(node('rect', {
        x: end * c + c * 0.28, y: state.revealed * c,
        width: c * 0.44, height: (PICKS - state.revealed) * c,
        fill: state.warpOrder[end] === 0 ? warpHex : warpAlt, opacity: 0.5,
      }));
    }
    svgEl.appendChild(node('line', {
      x1: 0, x2: ENDS * c, y1: state.revealed * c, y2: state.revealed * c,
      stroke: 'var(--ink)', 'stroke-width': 1.5,
    }));
  }

  svgEl.appendChild(node('rect', {
    x: 0.5, y: 0.5, width: ENDS * c - 1, height: PICKS * c - 1,
    fill: 'none', stroke: 'var(--ink)', 'stroke-width': 1,
  }));

  const floats = longestFloat();
  el('cloth-desc').textContent =
    `${ENDS} ends by ${PICKS} picks. The longest warp float in this cloth is ${floats} ${floats === 1 ? 'end' : 'ends'}` +
    (floats > 3 ? ' — long floats snag, which is why a weaver checks them before cutting the warp.' : '.');
}

function longestFloat() {
  let best = 1;
  for (let pick = 0; pick < PICKS; pick++) {
    let run = 0;
    for (let end = 0; end < ENDS; end++) {
      run = warpUp(pick, end) ? run + 1 : 0;
      if (run > best) best = run;
    }
  }
  return best;
}

function drawAll() {
  drawColourStrip(el('warp-colour'), state.warpOrder, state.warpDye, state.warpDyeB, true);
  drawColourStrip(el('weft-colour'), state.weftOrder, state.weftDye, state.weftDyeB, false);
  drawThreading();
  drawTieup();
  drawTreadling();
  drawCloth();
  if (focusedGrid) drawCursor(focusedGrid);
}

/* ----------------------------------------------------------- editing grids */

// Threading and treadling are one-of-N per column/row; the tie-up is a free
// toggle, because a treadle really can be corded to any set of shafts.
const GRIDS = {
  threading: { cols: () => ENDS, rows: () => SHAFTS },
  tieup:     { cols: () => TREADLES, rows: () => SHAFTS },
  treadling: { cols: () => TREADLES, rows: () => PICKS },
};

// One cursor per grid, so tabbing away and back returns to where you were.
const cursor = { threading: { col: 0, row: 0 }, tieup: { col: 0, row: 0 }, treadling: { col: 0, row: 0 } };
let focusedGrid = null;

function applyEdit(id, col, row) {
  if (id === 'threading') {
    state.threading[col] = row;
  } else if (id === 'treadling') {
    state.treadling[row] = col;
  } else {
    const set = state.tieup[col];
    const at = set.indexOf(row);
    if (at >= 0) set.splice(at, 1); else { set.push(row); set.sort((a, b) => a - b); }
  }
  markCustom();
}

// Announce the cell the cursor is on and whether it is set, not the column's
// current value — otherwise moving the cursor down a column says nothing new.
function describe(id, col, row) {
  if (id === 'threading') {
    return `Warp end ${col + 1}, shaft ${row + 1}: ${state.threading[col] === row ? 'threaded here' : 'not threaded here'}.`;
  }
  if (id === 'treadling') {
    return `Pick ${row + 1}, treadle ${col + 1}: ${state.treadling[row] === col ? 'pressed' : 'not pressed'}.`;
  }
  return `Treadle ${col + 1}, shaft ${row + 1}: ${state.tieup[col].includes(row) ? 'tied' : 'not tied'}.`;
}

function cellFromEvent(e, svgEl, cols, rows) {
  const r = svgEl.getBoundingClientRect();
  const col = Math.floor(((e.clientX - r.left) / r.width) * cols);
  const row = Math.floor(((e.clientY - r.top) / r.height) * rows);
  if (col < 0 || row < 0 || col >= cols || row >= rows) return null;
  return { col, row };
}

function drawCursor(id) {
  const svgEl = el(id);
  svgEl.querySelectorAll('.cursor').forEach(n => n.remove());
  if (focusedGrid !== id) return;
  const c = cellSize();
  const { col, row } = cursor[id];
  svgEl.appendChild(node('rect', {
    class: 'cursor', x: col * c - 1, y: row * c - 1, width: c + 2, height: c + 2,
    fill: 'none', stroke: 'var(--ink)', 'stroke-width': 2,
  }));
}

for (const [id, dims] of Object.entries(GRIDS)) {
  const svgEl = el(id);

  svgEl.addEventListener('click', e => {
    const c = cellFromEvent(e, svgEl, dims.cols(), dims.rows());
    if (!c) return;
    cursor[id] = c;
    applyEdit(id, c.col, c.row);
  });

  svgEl.addEventListener('focus', () => { focusedGrid = id; drawCursor(id); say(id); });
  svgEl.addEventListener('blur', () => { focusedGrid = null; drawCursor(id); el('grid-say').textContent = ''; });

  svgEl.addEventListener('keydown', e => {
    const cur = cursor[id];
    const maxC = dims.cols() - 1, maxR = dims.rows() - 1;
    if (e.key === 'ArrowRight') cur.col = Math.min(maxC, cur.col + 1);
    else if (e.key === 'ArrowLeft') cur.col = Math.max(0, cur.col - 1);
    else if (e.key === 'ArrowDown') cur.row = Math.min(maxR, cur.row + 1);
    else if (e.key === 'ArrowUp') cur.row = Math.max(0, cur.row - 1);
    else if (e.key === 'Home') cur.col = 0;
    else if (e.key === 'End') cur.col = maxC;
    else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      applyEdit(id, cur.col, cur.row);
      return;
    } else return;
    e.preventDefault();
    drawCursor(id);
    say(id);
  });
}

function say(id) {
  const { col, row } = cursor[id];
  el('grid-say').textContent = describe(id, col, row);
}

function markCustom() {
  state.revealed = PICKS;
  el('draft-chooser').querySelectorAll('button').forEach(b => b.setAttribute('aria-checked', 'false'));
  el('blurb').textContent = 'Edited by hand. The cloth below is whatever these three grids now say it is; choose a draft above to start again from a known one.';
  drawAll();
  if (focusedGrid) { drawCursor(focusedGrid); say(focusedGrid); }
}

/* --------------------------------------------------------------- chooser */

function buildChooser() {
  const box = el('draft-chooser');
  DRAFTS.forEach(d => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'radio');
    b.setAttribute('aria-checked', String(d.id === state.draftId));
    b.textContent = d.name;
    b.addEventListener('click', () => {
      loadDraft(d.id);
      box.querySelectorAll('button').forEach(x => x.setAttribute('aria-checked', String(x === b)));
      drawAll();
      updateDyeHint();
    });
    box.appendChild(b);
  });
}

function buildDyes(containerId, which) {
  const box = el(containerId);
  DYES.forEach((dye, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'dye';
    b.dataset.index = i;
    b.setAttribute('role', 'radio');
    b.setAttribute('aria-checked', String(state[which] === i));
    b.setAttribute('aria-label', dye.name);
    b.style.background = dye.hex;
    b.addEventListener('click', () => {
      state[which] = i;
      box.querySelectorAll('.dye').forEach(x => x.setAttribute('aria-checked', String(x === b)));
      drawAll();
      updateDyeHint();
    });
    box.appendChild(b);
  });
}

const DYE_BOXES = [['warp-dyes', 'warpDye'], ['warpb-dyes', 'warpDyeB'],
                   ['weft-dyes', 'weftDye'], ['weftb-dyes', 'weftDyeB']];

function syncDyeButtons() {
  for (const [boxId, key] of DYE_BOXES) {
    el(boxId).querySelectorAll('.dye').forEach(b => {
      b.setAttribute('aria-checked', String(Number(b.dataset.index) === state[key]));
    });
  }
}

// The second yarn only exists when the draft's colour order asks for one, so
// its swatches are only offered then.
function updateDyeHint() {
  const warpTwo = state.warpOrder.some(v => v === 1);
  const weftTwo = state.weftOrder.some(v => v === 1);
  el('warp-row-b').hidden = !warpTwo;
  el('weft-row-b').hidden = !weftTwo;

  const flat = (warpTwo && state.warpDye === state.warpDyeB) || (weftTwo && state.weftDye === state.weftDyeB);
  el('dye-hint').textContent = !(warpTwo || weftTwo)
    ? 'One yarn each way, so every square you see is structure. Log cabin is the draft where colour does the work instead.'
    : flat
      ? 'Both yarns in that direction are now the same dye, and its half of the pattern has gone — the structure underneath never changed.'
      : 'This draft alternates two yarns in each direction. Set a direction\u2019s two swatches to the same dye to watch that half of the pattern vanish.';
}

/* ----------------------------------------------------------- weaving it */

let weaveTimer = null;

el('weave').addEventListener('click', () => {
  if (weaveTimer) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { state.revealed = PICKS; drawAll(); return; }

  state.revealed = 0;
  el('weave').disabled = true;
  el('weave').textContent = 'Weaving…';
  drawAll();

  weaveTimer = setInterval(() => {
    state.revealed++;
    drawTreadling();
    drawCloth();
    if (state.revealed >= PICKS) {
      clearInterval(weaveTimer);
      weaveTimer = null;
      el('weave').disabled = false;
      el('weave').textContent = 'Weave it, pick by pick';
    }
  }, 70);
});

/* ------------------------------------------------------------------ init */

let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(drawAll, 150);
});

buildChooser();
for (const [boxId, key] of DYE_BOXES) buildDyes(boxId, key);
loadDraft(state.draftId);
drawAll();
updateDyeHint();
