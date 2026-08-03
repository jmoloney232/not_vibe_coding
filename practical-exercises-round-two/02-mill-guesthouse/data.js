/* Bellman's Mill — rooms, the mill's year, and the daylight calculation.
   The property is invented; the latitude, the hill and the abbey are not. */

const SITE = { lat: 54.978, lon: -3.617, year: 2026 };

/* -------------------------------------------------------------- daylight */
/* NOAA solar position; sunrise to sunset at the 90.833 deg zenith, which
   includes refraction and the solar radius. Returns hours. */
function dayLength(year, month, day, lat = SITE.lat, lon = SITE.lon) {
  const rad = Math.PI / 180, deg = 180 / Math.PI;
  const n = Date.UTC(year, month - 1, day) / 86400000 - Date.UTC(2000, 0, 1) / 86400000;
  const jc = (n + 0.5 - lon / 360) / 36525;
  const L = (280.46646 + jc * (36000.76983 + jc * 0.0003032)) % 360;
  const M = 357.52911 + jc * (35999.05029 - 0.0001537 * jc);
  const C = Math.sin(M * rad) * (1.914602 - jc * (0.004817 + 0.000014 * jc))
          + Math.sin(2 * M * rad) * (0.019993 - 0.000101 * jc)
          + Math.sin(3 * M * rad) * 0.000289;
  const omega = 125.04 - 1934.136 * jc;
  const lambda = L + C - 0.00569 - 0.00478 * Math.sin(omega * rad);
  const eps0 = 23 + (26 + (21.448 - jc * (46.815 + jc * (0.00059 - jc * 0.001813))) / 60) / 60;
  const eps = eps0 + 0.00256 * Math.cos(omega * rad);
  const decl = Math.asin(Math.sin(eps * rad) * Math.sin(lambda * rad)) * deg;
  const cosHA = Math.cos(90.833 * rad) / (Math.cos(lat * rad) * Math.cos(decl * rad))
              - Math.tan(lat * rad) * Math.tan(decl * rad);
  if (cosHA >= 1) return 0;
  if (cosHA <= -1) return 24;
  return 2 * Math.acos(cosHA) * deg / 15;
}

function hm(hours) {
  const h = Math.floor(hours), m = Math.round((hours - h) * 60);
  return m === 60 ? `${h + 1} h 00 m` : `${h} h ${String(m).padStart(2, '0')} m`;
}

/* ------------------------------------------------------------------ rooms */
/* Levels are metres above the wheel-floor slab; they drive the section
   drawing and the stair counts quoted in the room facts. */
const MILL = { levels: [0, 3.1, 3.1, 6.4], top: 9.2 };

const ROOMS = [
  {
    id: 'wheel',
    name: 'The Wheel Room',
    level: 0,
    where: 'Ground floor, lade side',
    line: 'On the level with the front door, and close enough to the wheel pit to hear water all night.',
    rate: 96,
    steps: 0,
    prose: [
      `The only room in the mill you can reach without climbing. It is built into the wall of the
       wheel pit, which is why it is the coolest room in the building in August and the one that
       needs the heating on in April.`,
      `Water noise is constant, not occasional: the tailrace runs under this end of the mill whether
       or not the wheel is turning. Guests either sleep better here than anywhere or not at all, and
       we have stopped trying to predict which.`,
    ],
    facts: [
      ['Access', 'Step-free from the road and the car'],
      ['Headroom', '2.25 m throughout'],
      ['Bed', 'One double, 140 cm'],
      ['Window', 'North-east, deep-set, at lade level. Little direct sun.'],
      ['When the wheel runs', 'Loud. You are against the pit wall.'],
      ['Warmth', 'Coolest room. Underfloor heating, on from September.'],
    ],
    view: { img: 'floor', alt: 'Bevel gear and brake on the wheel floor, cast iron against whitewash.',
            cap: 'The gearing on the other side of the Wheel Room wall.' },
  },
  {
    id: 'stone',
    name: 'The Stone Floor',
    level: 1,
    where: 'First floor, over the pit',
    line: 'The largest room, on the floor where the stones still run.',
    rate: 118,
    steps: 14,
    prose: [
      `The stone floor is where a mill does its work, and half of it is still working: the two pairs
       of stones, the tun, the hopper and the shoe are all in the other half of this level, behind a
       glazed partition put in when the room was made.`,
      `That partition is the whole character of the room. On a milling day you are four metres from
       running stones with a sheet of glass in between, and the floor moves. On any other day it is
       the quietest large room in the building.`,
    ],
    facts: [
      ['Access', '14 steps, one turn, handrail both sides'],
      ['Headroom', '2.60 m'],
      ['Bed', 'One double, 180 cm, or twin on request'],
      ['Window', 'Two: south over the lawn, north-west over the launder'],
      ['When the wheel runs', 'You feel it through the floor. This is the point of the room.'],
      ['Warmth', 'Even. The stone gable holds heat.'],
    ],
    view: { img: 'stones', alt: 'The tun, hopper and shoe on the stone floor, dusted with meal.',
            cap: 'The working half of the stone floor, through the partition.' },
  },
  {
    id: 'kiln',
    name: 'The Kiln Room',
    level: 2,
    where: 'First floor, in the drying kiln',
    line: 'Round walls, one high window, and no view at all. The quietest room we have.',
    rate: 110,
    steps: 18,
    prose: [
      `Grain was dried here over a slow fire on a perforated floor, and the walls are a metre thick
       because they had to be. Nothing outside gets in: not the wheel, not the road, not the geese on
       the pond at five in the morning.`,
      `The cost of that is daylight. There is one window, small and high, and it faces east. In
       December this room is dark by three whatever the sky is doing. People who want to read in
       daylight should take the Stone Floor.`,
    ],
    facts: [
      ['Access', '18 steps, two turns, handrail one side'],
      ['Headroom', '2.40 m at the wall, 3.80 m at the vent'],
      ['Bed', 'One double, 150 cm'],
      ['Window', 'One, east, 900 mm square, 2.1 m above the floor. No view.'],
      ['When the wheel runs', 'Barely audible. The thickest walls in the mill.'],
      ['Warmth', 'Warm and dry in January without help.'],
    ],
    view: { img: 'tools', alt: 'Millwright tools hung on a whitewashed wall beside dark machinery.',
            cap: 'The passage outside the Kiln Room door.' },
  },
  {
    id: 'bin',
    name: 'The Bin Floor',
    level: 3,
    where: 'Top floor, under the collar beams',
    line: 'Thirty-one steps up, and the only room in the mill you can see Criffel from.',
    rate: 124,
    steps: 31,
    prose: [
      `This is where the grain waited. It is the top of the building, under the collar beams, and the
       sack hoist trap is still in the floor — boarded and glazed, but you will notice it, and so will
       anyone who does not like looking down three storeys.`,
      `We will be plain about the stairs. They are mill stairs: steep, open-tread, turning twice, with
       a rope rather than a handrail on the last flight. There is nowhere in a listed mill to put a
       lift and we are not going to pretend otherwise.`,
    ],
    facts: [
      ['Access', '31 steps, two turns, rope handrail on the last flight'],
      ['Headroom', '1.90 m at the trap, 2.35 m at the window'],
      ['Bed', 'One double, 150 cm'],
      ['Window', 'South-west, over the pond to Criffel'],
      ['When the wheel runs', 'Audible, not loud — two floors down'],
      ['Warmth', 'Warmest room in the mill. No cooling in July.'],
    ],
    view: { img: 'pond', alt: 'The mill pond in summer, reeds in the foreground and a stone building beyond.',
            cap: 'The pond the south-west window overlooks, photographed from the bank. Criffel is '
               + 'behind the trees on the left and is not in this frame.' },
  },
];

/* --------------------------------------------------------- the mill's year */
/* `lade` is the state of the water; `mill` is whether we grind.
   Rates are the Wheel Room rate; other rooms carry their own. */
const YEAR = [
  { m: 1,  lade: 'full',    wheel: 'runs',      mill: 'Thursdays', band: 0,
    note: 'Dark by four. The pond path floods most winters and we will tell you if it has.' },
  { m: 2,  lade: 'full',    wheel: 'runs',      mill: 'Thursdays', band: 0,
    note: 'Coldest month in the Kiln Room’s favour, and the wheel is at its best.' },
  { m: 3,  lade: 'full',    wheel: 'runs',      mill: 'Thursdays', band: 1,
    note: 'Frogs in the lade. Genuinely a reason people come.' },
  { m: 4,  lade: 'good',    wheel: 'runs',      mill: 'Thursdays', band: 1,
    note: 'The last month we can promise milling. After this it depends on rain.' },
  { m: 5,  lade: 'falling', wheel: 'most weeks', mill: 'if there is water', band: 2,
    note: 'Best light in the valley, and the hawthorn along the lade is out.' },
  { m: 6,  lade: 'low',     wheel: 'demonstration only', mill: 'no', band: 3,
    note: 'Seventeen hours of daylight and no milling. Bright, quiet, busy in the village.' },
  { m: 7,  lade: 'low',     wheel: 'usually stopped', mill: 'no', band: 3,
    note: 'In a dry year the lade is a trickle and the mill is silent. Say if that matters.' },
  { m: 8,  lade: 'lowest',  wheel: 'stopped',   mill: 'no', band: 3,
    note: 'The pond is drawn down and weeded. Not the month to come for the wheel.' },
  { m: 9,  lade: 'rising',  wheel: 'some weeks', mill: 'occasionally', band: 2,
    note: 'Water returns before the light goes. Our own favourite month.' },
  { m: 10, lade: 'filling', wheel: 'most weeks', mill: 'occasionally', band: 1,
    note: 'The best compromise if you want the wheel turning and still want an evening.' },
  { m: 11, lade: 'full',    wheel: 'runs',      mill: 'Thursdays', band: 1,
    note: 'Milling resumes. Sixteen days of frost last year and none of it stopped us.' },
  { m: 12, lade: 'full',    wheel: 'runs',      mill: 'Thursdays', band: 0,
    note: 'Seven hours of daylight. Bring a torch: the lade path has no lighting.' },
];

const BANDS = [0, 8, 22, 36];   // added to each room's base rate
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

for (const row of YEAR) {
  row.name = MONTHS[row.m - 1];
  row.daylight = dayLength(SITE.year, row.m, 15);
  row.from = ROOMS[0].rate + BANDS[row.band];
}

/* Availability is invented, but it is generated once from a fixed seed so the
   same month always shows the same nights, on this page and on reload. */
const AVAILABILITY = (() => {
  let s = 20260114;
  const rnd = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;
  const out = {};
  for (const row of YEAR) {
    const days = new Date(SITE.year, row.m, 0).getDate();
    const taken = new Set();
    const pressure = row.band === 3 ? 0.62 : row.band === 2 ? 0.44 : row.band === 1 ? 0.3 : 0.18;
    for (const r of ROOMS) {
      for (let d = 1; d <= days; d++) if (rnd() < pressure) taken.add(`${r.id}:${d}`);
    }
    out[row.m] = { days, taken };
  }
  return out;
})();

/* Whether every night of a stay is free. The availability strip and the
   enquiry form were reading the same data and never compared it, so the form
   arrived pre-filled across a night the strip showed as taken. */
function nightsTaken(roomId, fromISO, nights) {
  const start = new Date(fromISO), out = [];
  for (let i = 0; i < nights; i++) {
    const d = new Date(start.getTime() + i * 86400000);
    const m = d.getMonth() + 1, day = d.getDate();
    if (AVAILABILITY[m] && AVAILABILITY[m].taken.has(`${roomId}:${day}`)) {
      out.push(d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }));
    }
  }
  return out;
}

function freeNights(monthNo, roomId) {
  const a = AVAILABILITY[monthNo];
  let n = 0;
  for (let d = 1; d <= a.days; d++) if (!a.taken.has(`${roomId}:${d}`)) n++;
  return n;
}
