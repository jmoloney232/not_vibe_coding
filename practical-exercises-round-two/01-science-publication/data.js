// Values for the article's two drawn figures.
//
// This is invented data for a fictional publication, generated deterministically
// so the figures and the numbers quoted in the prose can never disagree. The
// shape follows what a West Antarctic core actually looks like — Holocene ice
// near −34 per mil, last glacial maximum near −44, a transition through the
// deglaciation — but no value here should be cited.

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CORE = {
  name: 'Renland South',
  depthTotal: 3405,
  bedYear: -68400,
  drilled: '2011',
};

// δ18O against depth, sampled every 15 m to bedrock.
const ISOTOPES = (() => {
  const rand = mulberry32(140714);
  const out = [];
  for (let d = 0; d <= CORE.depthTotal; d += 15) {
    const f = d / CORE.depthTotal;
    // Holocene plateau, deglacial ramp, glacial trough, older interglacial at depth.
    let base;
    if (f < 0.17) base = -34.2 - f * 2.2;
    else if (f < 0.33) base = -34.6 - (f - 0.17) * 52;
    else if (f < 0.72) base = -42.9 - Math.sin((f - 0.33) * 7) * 1.4;
    else base = -42.6 + (f - 0.72) * 22;
    const millennial = Math.sin(f * 46) * 0.85 + Math.sin(f * 113) * 0.4;
    out.push({ depth: d, d18O: +(base + millennial + (rand() - 0.5) * 0.7).toFixed(2) });
  }
  return out;
})();

// Annual layer thickness against depth: thick at the top where summers can be
// counted by eye, thinning until the eye is no use.
const LAYERS = (() => {
  const out = [];
  for (let d = 0; d <= 2400; d += 60) {
    const t = 0.223 * Math.exp(-d / 980) + 0.004;
    out.push({ depth: d, thickness: +t.toFixed(4) });
  }
  return out;
})();

// The rail's fixed marks: depth against age, and what changes at each.
const HORIZONS = [
  { depth: 0,    label: 'surface',  age: '2011',      note: 'Drilling season' },
  { depth: 120,  label: '120 m',    age: '1610 CE',   note: 'Huaynaputina ash' },
  { depth: 577,  label: '577 m',    age: '4.2 ka',    note: 'Last countable summer' },
  { depth: 1800, label: '1,800 m',  age: '31 ka',     note: 'Conductivity takes over' },
  { depth: 2760, label: '2,760 m',  age: '58 ka',     note: 'Layers below 4 mm' },
  { depth: 3405, label: 'bedrock',  age: '68.4 ka',   note: 'Basal ice, disturbed' },
];

const COUNTABLE_DEPTH = 577;
const LAYER_AT_TOP_CM = 22;
