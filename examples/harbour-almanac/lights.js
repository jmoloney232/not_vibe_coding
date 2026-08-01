// Light list for the Cape Ansell approach.
//
// `seq` is the lit intervals within one period, in seconds: [start, duration].
// The abbreviations follow the international light characteristics used on
// admiralty charts — Fl group flashing, Iso equal light and dark, Oc occulting
// (light longer than dark), Q quick flashing at 60 per minute.

const LIGHTS = [
  {
    ref: 'A 3184',
    name: 'Cape Ansell Light',
    char: 'Fl(2) W 10s',
    period: 10,
    seq: [[0, 0.4], [1.6, 0.4]],
    colour: 'W',
    elevation: 42,
    range: 19,
    structure: 'White granite tower, 24 m',
    note: 'Two flashes, then eight seconds of darkness. The long eclipse is what tells it apart from the ledge buoy at a distance.',
  },
  {
    ref: 'A 3186',
    name: 'Hollis Reach Front Range',
    char: 'Iso G 4s',
    period: 4,
    seq: [[0, 2]],
    colour: 'G',
    elevation: 8,
    range: 5,
    structure: 'Skeleton tower, orange daymark',
    note: 'Equal light and dark. Bring it under the rear range and hold the pair in line for the channel.',
  },
  {
    ref: 'A 3186.1',
    name: 'Hollis Reach Rear Range',
    char: 'Oc G 6s',
    period: 6,
    seq: [[0, 4.5]],
    colour: 'G',
    elevation: 16,
    range: 6,
    structure: 'Skeleton tower, orange daymark, 340 m behind the front',
    note: 'Occulting: lit far longer than it is dark, so the eclipse reads as a blink rather than a flash.',
  },
  {
    ref: 'A 3188',
    name: 'Breakwater Head',
    char: 'Q R',
    period: 1,
    seq: [[0, 0.3]],
    colour: 'R',
    elevation: 6,
    range: 4,
    structure: 'Red column on the pierhead',
    note: 'Sixty flashes a minute. Quick red marks the end of the stonework; keep it to port entering.',
  },
  {
    ref: 'A 3190',
    name: 'Ansell Ledge',
    char: 'Fl(2+1) R 12s',
    period: 12,
    seq: [[0, 0.5], [1.6, 0.5], [4.2, 0.5]],
    colour: 'R',
    elevation: 4,
    range: 4,
    structure: 'Red and green pillar buoy with bell',
    note: 'A composite group: two flashes, a pause, then one. It marks the ledge that dries at low water springs.',
  },
];

const COLOUR_NAME = { W: 'white', G: 'green', R: 'red' };
