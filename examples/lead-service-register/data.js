// Demonstration inventory for a fictional water system. No real address,
// household, or utility is described here.
//
// Classification vocabulary, verification methods, and the replacement
// deadline structure follow EPA's Lead and Copper Rule Revisions inventory
// requirements (40 CFR 141.84) so the document behaves like the real
// instrument it imitates.

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Lead service lines track housing age: the practice was common until the
// 1940s, tapered through the 50s, and effectively ended with the 1986 federal
// ban. Each block carries its dominant construction era, and the material
// distribution is derived from it rather than assigned at random.
const ERA_PROFILE = {
  '1890–1919': { lead: 0.46, grr: 0.17, unknown: 0.14 },
  '1920–1939': { lead: 0.38, grr: 0.14, unknown: 0.16 },
  '1940–1955': { lead: 0.17, grr: 0.11, unknown: 0.19 },
  '1956–1972': { lead: 0.03, grr: 0.04, unknown: 0.13 },
  '1973–1994': { lead: 0.0, grr: 0.01, unknown: 0.06 },
};

// A hundred-block holds at most 100 numbers (evens on one side of the street,
// odds on the other), so no block may carry more connections than that.
const BLOCK_DEFS = [
  ['700 Ferrand St', '1890–1919', 84, 700],
  ['800 Ferrand St', '1890–1919', 78, 800],
  ['700 Kesler Ave', '1920–1939', 96, 700],
  ['800 Kesler Ave', '1920–1939', 92, 800],
  ['900 Kesler Ave', '1940–1955', 74, 900],
  ['200 Pell St', '1890–1919', 62, 200],
  ['300 Pell St', '1920–1939', 88, 300],
  ['1100 Ostrander Rd', '1940–1955', 98, 1100],
  ['1200 Ostrander Rd', '1956–1972', 96, 1200],
  ['400 Vine St', '1920–1939', 70, 400],
  ['500 Vine St', '1940–1955', 66, 500],
  ['1500 Dunmore Ave', '1956–1972', 94, 1500],
  ['1600 Dunmore Ave', '1973–1994', 96, 1600],
  ['100 Wickett Ln', '1890–1919', 48, 100],
];

const METHODS = {
  LEAD: ['Field verification — excavation', 'Field verification — interior meter', 'Records review — tap card'],
  GRR: ['Field verification — interior meter', 'Records review — tap card'],
  NONLEAD: ['Field verification — interior meter', 'Records review — tap card', 'Records review — plumbing permit'],
  UNKNOWN: ['Not yet verified'],
};

// Replacement sequencing is by block, not by household: the utility opens a
// trench once per block. A household's window is therefore its block's window.
const WINDOWS = ['2026 Q2', '2026 Q4', '2027 Q2', '2027 Q4', '2028 Q2', '2029 Q1', '2030 Q3'];

function buildInventory() {
  const rand = mulberry32(20260416);
  const blocks = [];
  let recordId = 0;

  BLOCK_DEFS.forEach(([name, era, count, baseNo], bi) => {
    const p = ERA_PROFILE[era];
    const lines = [];
    for (let i = 0; i < count; i++) {
      const r = rand();
      let material;
      if (r < p.lead) material = 'LEAD';
      else if (r < p.lead + p.grr) material = 'GRR';
      else if (r < p.lead + p.grr + p.unknown) material = 'UNKNOWN';
      else material = 'NONLEAD';

      const methods = METHODS[material];
      const method = methods[Math.floor(rand() * methods.length)];
      const houseNo = baseNo + i;
      const street = name.replace(/^\d+\s/, '');

      lines.push({
        id: ++recordId,
        addr: `${houseNo} ${street}`,
        block: name,
        material,
        method,
        verified: material === 'UNKNOWN' ? null : verifiedDate(rand),
        era,
      });
    }

    // Blocks with the most lead and galvanized lines are trenched first.
    const affected = lines.filter(l => l.material === 'LEAD' || l.material === 'GRR').length;
    blocks.push({ name, era, count, lines, affected, share: affected / count });
  });

  blocks.sort((a, b) => b.share - a.share);
  blocks.forEach((b, i) => {
    b.window = b.affected === 0 ? null : WINDOWS[Math.min(i, WINDOWS.length - 1)];
    b.lines.forEach(l => { l.window = l.material === 'LEAD' || l.material === 'GRR' ? b.window : null; });
  });
  // Restore the surveyor's street order for display; sequencing above was only
  // used to assign windows.
  blocks.sort((a, b) => BLOCK_DEFS.findIndex(d => d[0] === a.name) - BLOCK_DEFS.findIndex(d => d[0] === b.name));

  return blocks;
}

function verifiedDate(rand) {
  const start = Date.UTC(2023, 6, 1);
  const end = Date.UTC(2026, 2, 31);
  const d = new Date(start + rand() * (end - start));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

const MATERIAL_LABEL = {
  LEAD: 'Lead',
  GRR: 'Galvanized requiring replacement',
  UNKNOWN: 'Lead status unknown',
  NONLEAD: 'Non-lead',
};

const INVENTORY = buildInventory();
const ALL_LINES = INVENTORY.flatMap(b => b.lines);
const TOTALS = ALL_LINES.reduce((acc, l) => { acc[l.material] = (acc[l.material] || 0) + 1; return acc; }, {});
