const MARK_CLASS = { LEAD: 'm-lead', GRR: 'm-grr', UNKNOWN: 'm-unknown', NONLEAD: 'm-nonlead' };
const fmt = n => n.toLocaleString('en-US');

const plateEl = document.getElementById('plate');
const readoutBody = document.getElementById('readout-body');

let pinned = null;

/* ------------------------------------------------------------------ plate */

function buildPlate() {
  const frag = document.createDocumentFragment();

  INVENTORY.forEach(block => {
    const wrap = document.createElement('section');
    wrap.className = 'block';

    const head = document.createElement('div');
    head.className = 'block-head';
    const pct = Math.round(block.share * 100);
    head.innerHTML =
      `<span class="block-name">${block.name}</span>` +
      `<span class="block-share${pct >= 40 ? ' hot' : ''}">${pct}%</span>`;
    wrap.appendChild(head);

    const grid = document.createElement('div');
    grid.className = 'block-grid';
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label',
      `${block.name}, ${block.count} connections, ${pct}% lead or galvanized`);

    block.lines.forEach((line, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cell';
      btn.tabIndex = i === 0 ? 0 : -1;
      btn.dataset.id = line.id;
      btn.dataset.material = line.material;
      btn.setAttribute('aria-label', `${line.addr} — ${MATERIAL_LABEL[line.material]}`);
      btn.innerHTML = `<span class="mark ${MARK_CLASS[line.material]}"></span>`;
      grid.appendChild(btn);
    });

    wrap.appendChild(grid);
    frag.appendChild(wrap);
  });

  plateEl.appendChild(frag);
}

const lineById = new Map(ALL_LINES.map(l => [l.id, l]));
const WARD = ALL_LINES.reduce((a, l) => { a[l.material]++; return a; }, { LEAD: 0, GRR: 0, UNKNOWN: 0, NONLEAD: 0 });

function lineFromEvent(e) {
  const cell = e.target.closest('.cell');
  return cell ? lineById.get(Number(cell.dataset.id)) : null;
}

plateEl.addEventListener('pointerover', e => {
  const line = lineFromEvent(e);
  if (line && !pinned) renderRecord(line);
});

plateEl.addEventListener('pointerleave', () => {
  if (!pinned) renderEmpty();
});

plateEl.addEventListener('focusin', e => {
  const line = lineFromEvent(e);
  if (line) renderRecord(line);
});

plateEl.addEventListener('click', e => {
  const line = lineFromEvent(e);
  if (!line) return;
  pinned = pinned === line.id ? null : line.id;
  renderRecord(line);
});

// Arrow keys move within a block; Tab moves between blocks. Only one cell per
// block is ever in the tab order, so the plate costs 14 tab stops, not 1,088.
plateEl.addEventListener('keydown', e => {
  const cell = e.target.closest('.cell');
  if (!cell) return;

  const grid = cell.parentElement;
  const cells = [...grid.children];
  const idx = cells.indexOf(cell);
  const perRow = columnsIn(grid);

  let next = null;
  if (e.key === 'ArrowRight') next = cells[idx + 1];
  else if (e.key === 'ArrowLeft') next = cells[idx - 1];
  else if (e.key === 'ArrowDown') next = cells[idx + perRow];
  else if (e.key === 'ArrowUp') next = cells[idx - perRow];
  else if (e.key === 'Home') next = cells[0];
  else if (e.key === 'End') next = cells[cells.length - 1];
  else return;

  e.preventDefault();
  if (!next) return;
  cell.tabIndex = -1;
  next.tabIndex = 0;
  next.focus();
});

function columnsIn(grid) {
  const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
  return Math.max(1, cols);
}

/* ---------------------------------------------------------------- readout */

// The panel's resting state is the ward total rather than a "nothing selected"
// message, so the column carries information whether or not anything is hovered.
function renderEmpty() {
  const t = counts(ALL_LINES);
  const total = ALL_LINES.length;
  const row = (key, label) => `
    <div class="sum-row${key === 'LEAD' ? ' is-lead' : ''}">
      <span class="mark ${MARK_CLASS[key]}"></span>
      <span>${label}</span>
      <span class="sum-n">${fmt(t[key])}</span>
    </div>`;

  readoutBody.className = 'readout-body';
  readoutBody.innerHTML = `
    <p class="sum-title">Ward Seven, all ${fmt(total)} connections:</p>
    ${row('LEAD', 'Lead')}
    ${row('GRR', 'Galvanized')}
    ${row('UNKNOWN', 'Unknown')}
    ${row('NONLEAD', 'Non-lead')}
    <p class="sum-hint">Point at a mark for that connection's record. Use the four headings above the plate to isolate one material.</p>
  `;
}

function renderRecord(line) {
  const affected = line.material === 'LEAD' || line.material === 'GRR';
  readoutBody.className = 'readout-body';
  readoutBody.innerHTML = `
    <p class="rec-addr">${line.addr}</p>
    <p class="rec-material${line.material === 'LEAD' ? ' is-lead' : ''}">
      <span class="mark ${MARK_CLASS[line.material]}"></span>${MATERIAL_LABEL[line.material]}
    </p>
    <dl class="rec-dl">
      <dt>Block</dt><dd>${line.block}</dd>
      <dt>Built</dt><dd>${line.era}</dd>
      <dt>Method</dt><dd>${line.method}</dd>
      <dt>Verified</dt><dd>${line.verified || '—'}</dd>
    </dl>
    <p class="rec-window">${windowSentence(line, affected)}</p>
    <p class="rec-context">Ward Seven: ${fmt(WARD.LEAD)} lead · ${fmt(WARD.GRR)} galvanized · ${fmt(WARD.UNKNOWN)} unknown · ${fmt(WARD.NONLEAD)} non-lead</p>
    ${pinned === line.id ? '<p class="rec-window" style="border:0;padding-top:0;margin-top:6px;color:var(--ink-quiet)">Pinned. Click the mark again to release.</p>' : ''}
  `;
}

// What the household should do this week, said at the point they find out.
function nowSentence(material) {
  if (material === 'NONLEAD')
    return 'Nothing to do. The line was verified as copper or plastic.';
  return 'Until the line is replaced, filter every tap you drink or cook from with a filter '
       + 'certified to NSF/ANSI 53 for lead, never draw cooking or formula water from the hot tap, '
       + 'and run a tap cold for 30 seconds to two minutes if it has stood unused more than six hours. '
       + 'Testing and replacement are free — call 555 0142.';
}

function windowSentence(line, affected) {
  if (affected) return `Scheduled for replacement <b>${line.window}</b>. No charge to the property owner.`;
  if (line.material === 'UNKNOWN') return 'Carried as unknown. Scheduled for field verification; treat as lead until verified.';
  return 'No replacement required.';
}

/* ----------------------------------------------------------------- ledger */

function buildLedger() {
  const body = document.getElementById('ledger-body');
  const foot = document.getElementById('ledger-foot');

  const order = new Map(
    INVENTORY.filter(b => b.affected > 0)
      .slice().sort((a, b2) => b2.share - a.share)
      .map((b, i) => [b.name, i + 1]));

  INVENTORY.forEach(b => {
    const c = counts(b.lines);
    const pct = Math.round(b.share * 100);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="c-order">${order.get(b.name) || '—'}</td>
      <td class="c-block" data-label="Block">${b.name}</td>
      <td class="c-era" data-label="Built">${b.era}</td>
      <td class="num" data-label="Connections">${b.count}</td>
      <td class="num ${c.LEAD ? 'lead-n' : 'zero'}" data-label="Lead">${c.LEAD}</td>
      <td class="num ${c.GRR ? '' : 'zero'}" data-label="Galvanized">${c.GRR}</td>
      <td class="num ${c.UNKNOWN ? '' : 'zero'}" data-label="Unknown">${c.UNKNOWN}</td>
      <td class="num ${c.NONLEAD ? '' : 'zero'}" data-label="Non-lead">${c.NONLEAD}</td>
      <td class="c-bar" data-label="Share affected">
        <span class="bar-wrap">
          <span class="bar"><span class="bar-fill" style="width:${pct}%"></span></span>
          <span class="bar-num">${pct}%</span>
        </span>
      </td>
      <td class="c-win" data-label="Window">${b.window || '<span class="no-win">not required</span>'}</td>
    `;
    body.appendChild(tr);
  });

  const t = counts(ALL_LINES);
  const total = ALL_LINES.length;
  const pct = Math.round(((t.LEAD + t.GRR) / total) * 100);
  foot.innerHTML = `
    <tr>
      <td class="c-order"></td>
      <td class="c-block">Ward Seven</td>
      <td class="c-era"></td>
      <td class="num">${fmt(total)}</td>
      <td class="num lead-n">${t.LEAD}</td>
      <td class="num">${t.GRR}</td>
      <td class="num">${t.UNKNOWN}</td>
      <td class="num">${t.NONLEAD}</td>
      <td class="c-bar">
        <span class="bar-wrap">
          <span class="bar"><span class="bar-fill" style="width:${pct}%"></span></span>
          <span class="bar-num">${pct}%</span>
        </span>
      </td>
      <td class="c-win">through 2030</td>
    </tr>
  `;
}

function counts(lines) {
  const c = { LEAD: 0, GRR: 0, UNKNOWN: 0, NONLEAD: 0 };
  lines.forEach(l => c[l.material]++);
  return c;
}

/* ----------------------------------------------------------------- lookup */

const form = document.getElementById('lookup-form');
const input = document.getElementById('lookup-input');
const statusEl = document.getElementById('lookup-status');
const resultsEl = document.getElementById('lookup-results');

form.addEventListener('submit', e => {
  e.preventDefault();
  runLookup(input.value.trim());
});

function runLookup(q) {
  resultsEl.innerHTML = '';
  if (!q) {
    statusEl.textContent = 'Enter a house number or a street name.';
    return;
  }

  const needle = q.toLowerCase();
  const hits = ALL_LINES.filter(l => l.addr.toLowerCase().includes(needle));

  if (!hits.length) {
    statusEl.textContent = `No connection in Ward Seven matches “${q}”. Check the street spelling, or call 555 0142.`;
    return;
  }

  const shown = hits.slice(0, 24);
  statusEl.textContent = hits.length > shown.length
    ? `${fmt(hits.length)} connections match. Showing the first ${shown.length} — narrow the search with a house number.`
    : `${hits.length} connection${hits.length === 1 ? '' : 's'} match${hits.length === 1 ? 'es' : ''}.`;

  shown.forEach(l => {
    const el = document.createElement('article');
    el.className = 'result' + (l.material === 'LEAD' ? ' is-lead' : l.material === 'NONLEAD' ? ' is-nonlead' : '');
    const affected = l.material === 'LEAD' || l.material === 'GRR';
    el.innerHTML = `
      <h3 class="result-addr">${l.addr}</h3>
      <p class="result-mat"><span class="mark ${MARK_CLASS[l.material]}"></span>${MATERIAL_LABEL[l.material]}</p>
      <p class="result-do">${nowSentence(l.material)}</p>
      <p class="result-meta">
        <b>${affected ? `Trench due ${l.window}` : l.material === 'UNKNOWN' ? 'Field verification not yet scheduled' : 'No replacement required'}</b><br>
        ${l.method}${l.verified ? ` · verified ${l.verified}` : ''}
      </p>
    `;
    resultsEl.appendChild(el);
  });
}

/* ------------------------------------------------------------ plate filter */

const legend = document.getElementById('legend');
let activeFilter = null;

legend.addEventListener('click', e => {
  const btn = e.target.closest('.legend-item');
  if (!btn) return;
  activeFilter = activeFilter === btn.dataset.material ? null : btn.dataset.material;

  legend.querySelectorAll('.legend-item').forEach(b => {
    b.setAttribute('aria-pressed', String(b.dataset.material === activeFilter));
  });

  plateEl.classList.toggle('filtered', Boolean(activeFilter));
  plateEl.querySelectorAll('.cell').forEach(c => {
    c.classList.toggle('match', c.dataset.material === activeFilter);
  });
});

/* -------------------------------------------------------------------- init */

buildPlate();
buildLedger();
renderEmpty();

const t = counts(ALL_LINES);
document.getElementById('fig-affected').textContent = fmt(t.LEAD + t.GRR);
document.getElementById('fig-total').textContent = fmt(ALL_LINES.length);
document.getElementById('fig-unknown').textContent = fmt(t.UNKNOWN);
