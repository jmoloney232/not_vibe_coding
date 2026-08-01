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
    structure: 'White granite tower, 24 m tall, on the 18 m cliff',
    note: 'Two flashes, then eight seconds of darkness.',
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
    note: 'Equal light and dark. Bring it under the rear range and hold the pair in line: while they stay one above the other you are in the channel, and when they open you are not.',
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
    note: 'Occulting — lit far longer than dark, so the eclipse reads as a blink.',
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
    note: 'Sixty flashes a minute. Quick red marks the end of the stonework. These are Region B waters, so it is kept to starboard entering.',
  },
  {
    ref: 'A 3190',
    name: 'Ansell Ledge',
    char: 'Fl(2) W 5s',
    period: 5,
    seq: [[0, 0.4], [1.4, 0.4]],
    colour: 'W',
    elevation: 4,
    range: 4,
    structure: 'Black pillar buoy, red band, two black spheres, bell',
    note: 'An isolated danger mark: the ledge dries at low water springs and there is navigable water all round it. Two white flashes, like Cape Ansell — but on a five-second period, not ten.',
  },
];

const COLOUR_NAME = { W: 'white', G: 'green', R: 'red' };
