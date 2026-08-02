const NS = 'http://www.w3.org/2000/svg';
const el = id => document.getElementById(id);

function n(tag, attrs = {}, text) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (text !== undefined) node.textContent = text;
  return node;
}

/* ------------------------------------------------- section through the mill */
/* Drawn from the ROOMS array, so the levels and step counts in the drawing and
   in the room cards below it cannot disagree. It is a figure, not a control:
   all four rooms are set out in full underneath, which is what someone
   comparing them actually needs.

   There are two compositions rather than one that scales. Scaled into a phone
   the wide drawing renders its labels at about six pixels, which loses the only
   two facts it exists to carry — which floor, and how many steps. The narrow one
   drops the wheel, the water and the dimension column, and lets the numbered
   badges do the naming against the room cards below. */

const WIDE = {
  vb: '0 0 660 474', gy: 405, ppm: 33,
  x0: 158, x1: 398, kx0: 398, kx1: 472,
  apex: 278, kapex: 435, dim: 600,
  rooms: {
    wheel: { x0: 170, x1: 302 },
    stone: { x0: 170, x1: 344 },
    kiln:  { x0: 406, x1: 466, labelOut: 484 },
    bin:   { x0: 170, x1: 372 },
  },
  full: true,
};

const NARROW = {
  vb: '0 0 320 400', gy: 340, ppm: 27,
  x0: 12, x1: 212, kx0: 212, kx1: 288,
  apex: 112, kapex: 250,
  rooms: {
    wheel: { x0: 22, x1: 152 },
    stone: { x0: 22, x1: 170 },
    kiln:  { x0: 220, x1: 280, stepsOnly: true },
    bin:   { x0: 22, x1: 162 },
  },
  full: false,
};

/* Each room's true extent in metres above the wheel-floor slab. Heights are
   always derived from these, never from a pixel constant. */
const EXTENT = {
  wheel: [0.15, 2.85], stone: [3.25, 6.15], kiln: [3.25, 5.75], bin: [6.55, 8.45],
};

const SECTION_LABEL =
  'Section through the mill. The waterwheel stands against the west gable, fed from above by a '
  + 'timber launder and discharging into a tailrace below the wheel floor. Four rooms are shown: '
  + 'the Wheel Room on the ground floor, level with the front door and reached without steps; the '
  + 'Stone Floor and the Kiln Room on the first floor at 3.1 metres, fourteen and eighteen steps up; '
  + 'and the Bin Floor under the roof at 6.4 metres, thirty-one steps up.';

function drawSection() {
  const host = el('section-holder');
  if (!host) return;

  const L = host.clientWidth < 560 ? NARROW : WIDE;
  const yOf = m => L.gy - m * L.ppm;
  const EAVE = yOf(MILL.top);
  const svg = n('svg', { viewBox: L.vb, role: 'img', 'aria-label': SECTION_LABEL });
  const vbW = Number(L.vb.split(' ')[2]);

  if (L.full) {
    // water, drawn before the building so the building sits on top of it
    svg.appendChild(n('rect', { x: 0, y: 272, width: 96, height: 9, class: 'sec-fill' }));
    svg.appendChild(n('rect', { x: 88, y: 281, width: 7, height: 26, class: 'sec-fill' }));
    svg.appendChild(n('rect', { x: 0, y: 393, width: L.x0, height: 12, class: 'sec-fill' }));
    svg.appendChild(n('path', { class: 'sec-water', d: 'M0,276 L92,276 L92,300' }));
    svg.appendChild(n('path', { class: 'sec-water', d: `M0,399 L${L.x0},399` }));

    // the launder: a timber trough carrying the lade over the top of the wheel
    svg.appendChild(n('path', { class: 'sec-shell', d: 'M0,268 L100,268 M0,285 L100,285 L100,268' }));

    // the wheel: rim, shroud, six arms, hub
    const WC = { x: 96, y: 341, r: 56 };
    svg.appendChild(n('circle', { cx: WC.x, cy: WC.y, r: WC.r, class: 'sec-shell' }));
    svg.appendChild(n('circle', { cx: WC.x, cy: WC.y, r: WC.r - 10, class: 'sec-inner' }));
    for (let i = 0; i < 6; i++) {
      const t = (i / 6) * Math.PI * 2;
      svg.appendChild(n('line', {
        x1: WC.x, y1: WC.y, x2: (WC.x + Math.cos(t) * (WC.r - 10)).toFixed(1),
        y2: (WC.y + Math.sin(t) * (WC.r - 10)).toFixed(1), class: 'sec-inner',
      }));
    }
    svg.appendChild(n('circle', { cx: WC.x, cy: WC.y, r: 4.5, fill: '#1d1811' }));
  }

  // shell: main block, kiln, kiln vent, ground
  svg.appendChild(n('path', {
    class: 'sec-shell',
    d: `M${L.x0},${L.gy} L${L.x0},${EAVE} L${L.apex},${EAVE - 42} L${L.x1},${EAVE} L${L.x1},${L.gy} Z`,
  }));
  svg.appendChild(n('path', {
    class: 'sec-shell',
    d: `M${L.kx0},${L.gy} L${L.kx0},${EAVE} L${L.kapex},${EAVE - 50} L${L.kx1},${EAVE} L${L.kx1},${L.gy} Z`,
  }));
  svg.appendChild(n('rect', { x: L.kapex - 9, y: EAVE - 66, width: 18, height: 17, class: 'sec-hat' }));
  svg.appendChild(n('line', { x1: 0, y1: L.gy, x2: vbW, y2: L.gy, class: 'sec-shell' }));

  // floor slabs, and the kiln's perforated drying floor
  for (const m of [3.1, 6.4]) {
    svg.appendChild(n('line', { x1: L.x0, y1: yOf(m), x2: L.kx1, y2: yOf(m), class: 'sec-inner' }));
  }
  svg.appendChild(n('line', { x1: L.kx0, y1: yOf(1.9), x2: L.kx1, y2: yOf(1.9), class: 'sec-inner' }));

  // stair flights, drawn as a run of treads between the levels
  const runX = L.rooms.stone.x1 + 6, runW = L.x1 - runX - 6;
  for (const [lo, hi] of [[0, 3.1], [3.1, 6.4]]) {
    const top = yOf(lo) - 3, bot = yOf(hi) + 3, treads = 7;
    const dx = runW / treads, dy = (bot - top) / treads;
    let d = `M${runX},${top.toFixed(1)}`;
    for (let i = 0; i < treads; i++) d += ` l0,${dy.toFixed(1)} l${dx.toFixed(1)},0`;
    svg.appendChild(n('path', { d, class: 'sec-inner' }));
  }

  // the rooms
  ROOMS.forEach((r, i) => {
    const b = L.rooms[r.id], [lo, hi] = EXTENT[r.id];
    const top = yOf(hi), h = yOf(lo) - yOf(hi);
    svg.appendChild(n('rect', { x: b.x0, y: top, width: b.x1 - b.x0, height: h, class: 'sec-room' }));

    const bx = b.x0 + 7, by = top + 8;
    svg.appendChild(n('rect', { x: bx, y: by, width: 15, height: 15, fill: '#44562d' }));
    svg.appendChild(n('text', { x: bx + 7.5, y: by + 11.5, 'text-anchor': 'middle', class: 'sec-num' },
                      String(i + 1)));

    const steps = r.steps === 0 ? 'no steps' : `${r.steps} steps`;
    if (b.labelOut) {
      // The kiln shaft is too narrow to letter inside, so its label sits clear
      // of the wall on a leader, the way a section note does.
      const ly = top + h / 2;
      svg.appendChild(n('line', { x1: b.x1, y1: ly, x2: b.labelOut - 5, y2: ly, class: 'sec-inner' }));
      svg.appendChild(n('text', { x: b.labelOut, y: ly - 2, class: 'sec-lab' }, r.name));
      svg.appendChild(n('text', { x: b.labelOut, y: ly + 12, class: 'sec-min' }, steps));
    } else if (b.stepsOnly) {
      svg.appendChild(n('text', { x: bx, y: by + 30, class: 'sec-min' }, steps));
    } else if (L.full) {
      svg.appendChild(n('text', { x: bx + 22, y: by + 11.5, class: 'sec-lab' }, r.name));
      svg.appendChild(n('text', { x: bx + 22, y: by + 26, class: 'sec-min' }, steps));
    } else {
      svg.appendChild(n('text', { x: bx + 22, y: by + 12, class: 'sec-min' }, steps));
    }
  });

  if (L.full) {
    // level dimensions on the east side, as on any section drawing
    for (const m of [0, 3.1, 6.4, MILL.top]) {
      svg.appendChild(n('line', { x1: L.kx1, y1: yOf(m), x2: L.dim, y2: yOf(m), class: 'sec-inner' }));
      svg.appendChild(n('text', { x: L.dim + 5, y: yOf(m) - 4, class: 'sec-min' },
        m === 0 ? '±0.00 m' : `+${m.toFixed(2)} m`));
    }
    for (const [x, y, t] of [
      [4, 262, 'lade, from the pond'], [4, 299, 'launder'], [4, 389, 'tailrace'],
      [38, 435, 'the wheel — 3.4 m, overshot'],
      [L.x0 + 6, 421, 'front door'], [L.kx0 + 4, 421, 'the drying kiln'],
    ]) svg.appendChild(n('text', { x, y, class: 'sec-min' }, t));
    svg.appendChild(n('line', { x1: L.x0 + 2, y1: L.gy, x2: L.x0 + 2, y2: L.gy - 22, class: 'sec-shell' }));
  } else {
    for (const [x, y, t] of [
      [L.x0, L.gy + 16, 'front door'], [L.kx0 + 2, L.gy + 16, 'the kiln'],
      [L.x0, L.gy + 34, 'Numbers match the four rooms below.'],
    ]) svg.appendChild(n('text', { x, y, class: 'sec-min' }, t));
    svg.appendChild(n('line', { x1: L.x0 + 2, y1: L.gy, x2: L.x0 + 2, y2: L.gy - 20, class: 'sec-shell' }));
  }

  host.replaceChildren(svg);
}

/* -------------------------------------------------------------- room cards */

function buildRooms() {
  const host = el('room-list');
  if (!host) return;
  const frag = document.createDocumentFragment();

  ROOMS.forEach((r, i) => {
    const sec = document.createElement('section');
    sec.className = 'room';
    sec.id = `room-${r.id}`;

    const facts = r.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
    const prose = r.prose.map(p => `<p>${p.replace(/\s+/g, ' ').trim()}</p>`).join('');
    const big = r.view.img, small = { floor: 700, stones: 800, tools: 800, pond: 700 }[big];

    sec.innerHTML = `
      <div class="room-head">
        <span class="room-no">${i + 1}</span>
        <h3>${r.name}</h3>
        <p class="room-where">${r.where} · ${r.steps === 0 ? 'no steps' : `${r.steps} steps`}</p>
      </div>
      <p class="room-line">${r.line}</p>
      <div class="room-body">
        <div>
          ${prose}
          <dl class="room-facts">${facts}</dl>
          <p class="room-rate">
            <span class="n">£${r.rate}</span>
            <span class="u">a night in the quietest months, two people, breakfast included.
              Add £${BANDS[3]} at midsummer.</span>
          </p>
        </div>
        <div class="room-aside">
          <figure>
            <img src="img/${big}.jpg" srcset="img/${big}@${small}.jpg ${small}w, img/${big}.jpg 1400w"
                 sizes="(max-width: 860px) 100vw, 40vw" loading="lazy"
                 alt="${r.view.alt}">
            <figcaption>${r.view.cap}</figcaption>
          </figure>
        </div>
      </div>`;
    frag.appendChild(sec);
  });

  host.replaceChildren(frag);
}

/* --------------------------------------------------------- the mill's year */

function buildYear() {
  const body = document.querySelector('#year-table tbody');
  if (!body) return;
  const frag = document.createDocumentFragment();

  for (const row of YEAR) {
    const tr = document.createElement('tr');
    if (row.mill === 'no') tr.className = 'is-dry';
    const pct = Math.round(row.daylight / 18 * 100);
    tr.innerHTML = `
      <th scope="row">${row.name}</th>
      <td class="num" data-label="Daylight">${hm(row.daylight)}<span class="bar"><i style="width:${pct}%"></i></span></td>
      <td data-label="The lade">${row.lade}</td>
      <td data-label="The wheel">${row.wheel}</td>
      <td data-label="Milling" class="${row.mill === 'no' ? '' : 'mill-yes'}">${row.mill}</td>
      <td class="num" data-label="From">£${row.from}</td>
      <td class="note-cell" data-label="What it is like">${row.note}</td>`;
    frag.appendChild(tr);
  }
  body.replaceChildren(frag);
}

/* ------------------------------------------------------------ availability */

function buildAvailability() {
  const sel = el('avail-month'), body = el('avail-body');
  if (!sel || !body) return;

  sel.replaceChildren(...YEAR.map(r => {
    const o = document.createElement('option');
    o.value = String(r.m);
    o.textContent = `${r.name} ${SITE.year}`;
    return o;
  }));
  sel.value = '3';

  const render = () => {
    const m = Number(sel.value);
    const a = AVAILABILITY[m];
    const frag = document.createDocumentFragment();
    for (const r of ROOMS) {
      const free = freeNights(m, r.id);
      let marks = '';
      for (let d = 1; d <= a.days; d++) {
        marks += `<i class="${a.taken.has(`${r.id}:${d}`) ? 'taken' : ''}"></i>`;
      }
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <th scope="row">${r.name}</th>
        <td class="free">${free} of ${a.days}</td>
        <td><span class="strip" role="img"
             aria-label="${free} of ${a.days} nights free in ${MONTHS[m - 1]}">${marks}</span></td>`;
      frag.appendChild(tr);
    }
    body.replaceChildren(frag);
  };

  sel.addEventListener('change', render);
  render();
}

/* ----------------------------------------------------------------- enquiry */

/* The table cells are noun phrases ('usually stopped'), which do not survive
   being dropped into a sentence. Prose needs its own wording. */
const WHEEL_SAY = {
  'runs': 'the wheel runs',
  'most weeks': 'the wheel runs most weeks',
  'some weeks': 'the wheel runs some weeks',
  'demonstration only': 'the wheel is run only as a demonstration',
  'usually stopped': 'the wheel is usually stopped',
  'stopped': 'the wheel is stopped',
};

function wireEnquiry() {
  const form = el('enq');
  if (!form) return;
  const roomSel = el('f-room'), out = el('enq-out'), err = el('enq-err');

  roomSel.replaceChildren(...ROOMS.map(r => {
    const o = document.createElement('option');
    o.value = r.id;
    o.textContent = `${r.name} — from £${r.rate}, ${r.steps === 0 ? 'no steps' : `${r.steps} steps`}`;
    return o;
  }));
  roomSel.value = 'stone';

  const DAY = 86400000;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const inV = el('f-in').value, outV = el('f-out').value;
    const name = el('f-name').value.trim();
    const room = ROOMS.find(r => r.id === roomSel.value);

    const problems = [];
    if (!inV || !outV) problems.push('two dates');
    if (!name) problems.push('a name to reply to');
    let nights = 0;
    if (inV && outV) {
      nights = Math.round((Date.parse(outV) - Date.parse(inV)) / DAY);
      if (nights <= 0) problems.push('a leaving date after the arriving date');
      else if (nights < 2) problems.push('at least two nights');
    }
    if (problems.length) {
      err.textContent = `We need ${problems.join(', and ')}.`;
      out.hidden = true;
      return;
    }
    err.textContent = '';

    const start = new Date(inV);
    const band = YEAR[start.getMonth()];
    const rate = room.rate + BANDS[band.band];
    const total = rate * nights;
    const free = freeNights(band.m, room.id);

    const bare = room.name.replace(/^The /, '');
    const milling = band.mill === 'no' ? 'we are not milling'
      : `we mill ${band.mill === 'Thursdays' ? 'on Thursdays' : band.mill}`;

    out.hidden = false;
    out.innerHTML = `
      <p><b>${nights} nights in ${room.name}, from ${start.toLocaleDateString('en-GB',
        { day: 'numeric', month: 'long' })}.</b></p>
      <p>£${rate} a night in ${band.name} — the ${bare} rate of £${room.rate}, plus £${BANDS[band.band]}
      for the season. <b>£${total}</b> in total, breakfast included.</p>
      <p>In ${band.name} ${WHEEL_SAY[band.wheel]}, and ${milling}. ${band.note}</p>
      <p>${free} of ${AVAILABILITY[band.m].days} nights are still free in that room that month.
      Nothing has been sent and nothing has been charged: this page is a design exercise.</p>`;
  });
}

let sectionW = 0;
function redrawSection() {
  const host = el('section-holder');
  if (!host) return;
  const wide = host.clientWidth >= 560;
  if (wide === sectionW) return;
  sectionW = wide;
  drawSection();
}

drawSection();
sectionW = (el('section-holder')?.clientWidth ?? 0) >= 560;
let sectionTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(sectionTimer);
  sectionTimer = setTimeout(redrawSection, 150);
});

buildRooms();
buildYear();
buildAvailability();
wireEnquiry();
