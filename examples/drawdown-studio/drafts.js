// Weaving drafts.
//
// A draft is four related grids. Threading says which shaft each warp end is
// heddled on. The tie-up says which shafts each treadle lifts. The treadling
// says which treadle is pressed for each pick of weft. The drawdown is not
// entered at all — it is what those three produce, and it is the cloth.
//
// The patterns below are standard structures from the handweaving repertoire,
// not invented ones. Colour orders are included because a threading and a
// colour order together make the cloth: log cabin is plain weave, and the
// pattern in it is entirely an effect of alternating light and dark.

const SHAFTS = 8;
const TREADLES = 8;
const ENDS = 40;
const PICKS = 40;

// Dyestuffs a hand weaver would actually have at the loom.
const DYES = [
  { id: 'linen',  name: 'Undyed linen', hex: '#d8cdb6' },
  { id: 'indigo', name: 'Indigo',       hex: '#28405c' },
  { id: 'madder', name: 'Madder',       hex: '#9d3b2b' },
  { id: 'weld',   name: 'Weld',         hex: '#b28c2c' },
  { id: 'walnut', name: 'Walnut',       hex: '#4a3728' },
  { id: 'iron',   name: 'Iron-dipped',  hex: '#4b4c4e' },
];

const repeat = (seq, n) => Array.from({ length: n }, (_, i) => seq[i % seq.length]);

// A colour order names slots, not colours: slot 0 is the yarn the weaver picked
// for that direction, slot 1 the contrasting one it alternates with.

// Alternating single ends of two colours — the order that makes log cabin,
// reversed every block so the stripes change direction.
function logCabinOrder(n, a, b, block) {
  return Array.from({ length: n }, (_, i) => {
    const flipped = Math.floor(i / block) % 2 === 1;
    const even = i % 2 === 0;
    return (even !== flipped) ? a : b;
  });
}

const DRAFTS = [
  {
    id: 'tabby',
    name: 'Plain weave',
    shafts: 2,
    blurb: 'The simplest interlacement there is: over one, under one, and the same the other way. Two shafts will weave it; four are used here so the same warp can be re-tied for anything else.',
    threading: repeat([0, 1], ENDS),
    tieup: [[0], [1], [0], [1], [0], [1], [0], [1]],
    treadling: repeat([0, 1], PICKS),
    warpOrder: () => Array(ENDS).fill(0),
    weftOrder: () => Array(PICKS).fill(0),
  },
  {
    id: 'twill',
    name: '2/2 twill',
    shafts: 4,
    blurb: 'A straight draw and a walking treadling. Each pick steps one shaft along, and the float that carries over two ends builds the diagonal. This is the structure of denim and of most woollen cloth.',
    threading: repeat([0, 1, 2, 3], ENDS),
    tieup: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 1], [1, 2], [2, 3], [3, 0]],
    treadling: repeat([0, 1, 2, 3], PICKS),
    warpOrder: () => Array(ENDS).fill(0),
    weftOrder: () => Array(PICKS).fill(0),
  },
  {
    id: 'herringbone',
    name: 'Herringbone',
    shafts: 4,
    blurb: 'The same twill tie-up, threaded as a point instead of a straight run. Where the threading turns, the diagonal turns with it, and the cloth reverses direction without a break in the weave.',
    threading: repeat([0, 1, 2, 3, 2, 1], ENDS),
    tieup: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 1], [1, 2], [2, 3], [3, 0]],
    treadling: repeat([0, 1, 2, 3], PICKS),
    warpOrder: () => Array(ENDS).fill(0),
    weftOrder: () => Array(PICKS).fill(0),
  },
  {
    id: 'gooseeye',
    name: 'Goose eye',
    shafts: 8,
    blurb: 'A point threading and a point treadling on eight shafts. Turning the pattern in both directions at once closes the diagonal into a diamond, which is why this draft appears in linen towelling from Sweden to New England.',
    threading: repeat([0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1], ENDS),
    tieup: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0]],
    treadling: repeat([0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1], PICKS),
    warpOrder: () => Array(ENDS).fill(0),
    weftOrder: () => Array(PICKS).fill(0),
  },
  {
    id: 'logcabin',
    name: 'Log cabin',
    shafts: 2,
    blurb: 'Plain weave, and nothing but plain weave. Every square in this cloth comes from the colour order — single alternating ends of light and dark, reversed every eight — and none of it from the structure. Set a direction\u2019s two yarns to the same dye and its half of the pattern disappears.',
    threading: repeat([0, 1], ENDS),
    tieup: [[0], [1], [0], [1], [0], [1], [0], [1]],
    treadling: repeat([0, 1], PICKS),
    warpOrder: () => logCabinOrder(ENDS, 0, 1, 8),
    weftOrder: () => logCabinOrder(PICKS, 0, 1, 8),
    dyes: { warp: 1, warpB: 0, weft: 4, weftB: 0 },
  },
];
