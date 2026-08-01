// Tide, sun, and moon model for the Cape Ansell almanac.
//
// The harbour is invented; the methods are not. Tides are a six-constituent
// harmonic synthesis using the standard constituent speeds. Sun times use the
// NOAA solar-position algorithm and are correct for the stated position. The
// moon uses a mean synodic month, which is good to roughly half a day.
//
// The spring/neap cycle is not modelled independently: S2's phase is derived
// from the epoch new moon plus the harbour's age of tide, so the page can never
// print a full moon beside a neap range.

const STATION = {
  name: 'Cape Ansell',
  water: 'Hollis Reach',
  lat: 44.5186,
  lon: -66.1394,
  tzOffset: -4,       // local standard time, no summer adjustment
  datum: 'Lowest Astronomical Tide',
  ageOfTide: 36,      // hours between syzygy and the following spring tide
  z0: 2.36,           // mean level above chart datum, metres
};

const SYNODIC = 29.530588853;
const EPOCH_NEW_MOON = Date.UTC(2026, 0, 18, 19, 52); // model epoch

// Speeds in degrees per mean solar hour. Amplitudes follow the ratios typical
// of a semidiurnal North Atlantic port: S2 near a quarter of M2, N2 below it.
// S2 must outweigh N2 or the 27.6-day perigean beat swamps the spring-neap
// cycle and the page prints neap ranges at full moon.
const CONSTITUENTS = [
  { name: 'M2', speed: 28.984104, amp: 1.412, phase: 214.0 },
  { name: 'S2', speed: 30.000000, amp: 0.361, phase: null },  // derived below
  { name: 'N2', speed: 28.439730, amp: 0.269, phase: 191.5 },
  { name: 'K1', speed: 15.041069, amp: 0.126, phase: 62.0 },
  { name: 'O1', speed: 13.943035, amp: 0.104, phase: 21.5 },
  { name: 'M4', speed: 57.968208, amp: 0.071, phase: 68.0 },
];

// Springs must follow syzygy by the age of tide. The M2/S2 relative phase turns
// at 1.0159 deg/hr, so fixing S2 against M2 at the epoch new moon pins the whole
// spring-neap cycle to the moon the page draws.
(function deriveS2Phase() {
  const m2 = CONSTITUENTS[0], s2 = CONSTITUENTS[1];
  const rel = s2.speed - m2.speed;
  s2.phase = mod360(m2.phase + rel * STATION.ageOfTide);
})();

function mod360(x) { return ((x % 360) + 360) % 360; }
const rad = d => d * Math.PI / 180;
const deg = r => r * 180 / Math.PI;

// Hours from the model epoch, in UTC.
function hoursFromEpoch(dateUTCms) {
  return (dateUTCms - EPOCH_NEW_MOON) / 3600000;
}

/** Predicted height above chart datum, in metres, for a UTC instant. */
function tideHeight(dateUTCms) {
  const t = hoursFromEpoch(dateUTCms);
  let h = STATION.z0;
  for (const c of CONSTITUENTS) h += c.amp * Math.cos(rad(c.speed * t - c.phase));
  return h;
}

/** High and low waters for one local day, found by scanning at one-minute steps. */
function tideExtremes(localMidnightUTCms) {
  const step = 60000;
  const span = 24 * 60;
  const pts = [];
  for (let i = -2; i <= span + 2; i++) pts.push(tideHeight(localMidnightUTCms + i * step));

  const out = [];
  for (let i = 1; i < pts.length - 1; i++) {
    const [a, b, c] = [pts[i - 1], pts[i], pts[i + 1]];
    const isHigh = b >= a && b >= c;
    const isLow = b <= a && b <= c;
    if (!isHigh && !isLow) continue;
    const minute = i - 2;
    if (minute < 0 || minute > span) continue;

    // Parabolic fit through the three samples for a sub-minute turning point.
    const denom = a - 2 * b + c;
    const shift = denom === 0 ? 0 : 0.5 * (a - c) / denom;
    out.push({
      kind: isHigh ? 'HW' : 'LW',
      minute: minute + shift,
      height: denom === 0 ? b : b - 0.25 * (a - c) * shift,
    });
  }
  return out;
}

/* ------------------------------------------------------------------- sun */

function julianCentury(dateUTCms) {
  return (dateUTCms / 86400000 + 2440587.5 - 2451545) / 36525;
}

function solarGeometry(T) {
  const L0 = mod360(280.46646 + T * (36000.76983 + T * 0.0003032));
  const M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
  const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
  const C = Math.sin(rad(M)) * (1.914602 - T * (0.004817 + 0.000014 * T))
          + Math.sin(rad(2 * M)) * (0.019993 - 0.000101 * T)
          + Math.sin(rad(3 * M)) * 0.000289;
  const trueLong = L0 + C;
  const omega = 125.04 - 1934.136 * T;
  const appLong = trueLong - 0.00569 - 0.00478 * Math.sin(rad(omega));
  const eps0 = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60;
  const eps = eps0 + 0.00256 * Math.cos(rad(omega));
  const decl = deg(Math.asin(Math.sin(rad(eps)) * Math.sin(rad(appLong))));

  const y = Math.tan(rad(eps / 2)) ** 2;
  const eqTime = 4 * deg(
    y * Math.sin(2 * rad(L0))
    - 2 * e * Math.sin(rad(M))
    + 4 * e * y * Math.sin(rad(M)) * Math.cos(2 * rad(L0))
    - 0.5 * y * y * Math.sin(4 * rad(L0))
    - 1.25 * e * e * Math.sin(2 * rad(M))
  );
  return { decl, eqTime };
}

/** Minutes after local midnight for the sun crossing a given altitude. */
function sunEvents(localMidnightUTCms) {
  const T = julianCentury(localMidnightUTCms + 12 * 3600000);
  const { decl, eqTime } = solarGeometry(T);
  const noonLocal = 720 - 4 * STATION.lon - eqTime + STATION.tzOffset * 60;

  const hourAngle = alt => {
    const cosH = (Math.sin(rad(alt)) - Math.sin(rad(STATION.lat)) * Math.sin(rad(decl)))
               / (Math.cos(rad(STATION.lat)) * Math.cos(rad(decl)));
    if (cosH > 1) return null;   // never rises to that altitude
    if (cosH < -1) return 'all'; // stays above it all day
    return deg(Math.acos(cosH));
  };

  const pair = alt => {
    const H = hourAngle(alt);
    if (H === null) return { rise: null, set: null };
    if (H === 'all') return { rise: 'all', set: 'all' };
    return { rise: noonLocal - 4 * H, set: noonLocal + 4 * H };
  };

  return {
    decl,
    noon: noonLocal,
    day: pair(-0.833),
    civil: pair(-6),
    nautical: pair(-12),
  };
}

/** Solar altitude in degrees at a given number of minutes after local midnight. */
function solarAltitude(localMidnightUTCms, minute) {
  const inst = localMidnightUTCms + minute * 60000;
  const { decl, eqTime } = solarGeometry(julianCentury(inst));
  const trueSolarMin = minute - STATION.tzOffset * 60 + eqTime + 4 * STATION.lon;
  const ha = trueSolarMin / 4 - 180;
  const sinAlt = Math.sin(rad(STATION.lat)) * Math.sin(rad(decl))
               + Math.cos(rad(STATION.lat)) * Math.cos(rad(decl)) * Math.cos(rad(ha));
  return deg(Math.asin(Math.max(-1, Math.min(1, sinAlt))));
}

/* ------------------------------------------------------------------ moon */

// The four principal phases are instants, not stretches: an almanac may only
// print "Full moon" on the day the moon is actually full. Everything between
// them is a crescent or a gibbous.
const PRINCIPAL = [
  { at: 0, name: 'New moon' },
  { at: SYNODIC * 0.25, name: 'First quarter' },
  { at: SYNODIC * 0.5, name: 'Full moon' },
  { at: SYNODIC * 0.75, name: 'Last quarter' },
  { at: SYNODIC, name: 'New moon' },
];
const PRINCIPAL_WINDOW = 0.6; // days either side of the exact instant

function moonState(dateUTCms) {
  const raw = ((dateUTCms - EPOCH_NEW_MOON) / 86400000) % SYNODIC;
  const age = raw < 0 ? raw + SYNODIC : raw;
  const frac = (1 - Math.cos(2 * Math.PI * age / SYNODIC)) / 2;
  const waxing = age < SYNODIC / 2;

  const hit = PRINCIPAL.find(p => Math.abs(age - p.at) <= PRINCIPAL_WINDOW);
  let name, principal = false;
  if (hit) {
    name = hit.name;
    principal = true;
  } else if (age < SYNODIC * 0.25) name = 'Waxing crescent';
  else if (age < SYNODIC * 0.5) name = 'Waxing gibbous';
  else if (age < SYNODIC * 0.75) name = 'Waning gibbous';
  else name = 'Waning crescent';

  return { age, illuminated: frac, waxing, name, principal };
}

/* --------------------------------------------------------------- helpers */

function localMidnightUTC(y, m, d) {
  return Date.UTC(y, m, d) - STATION.tzOffset * 3600000;
}

function hhmm(minutes) {
  if (minutes === null || minutes === undefined) return '—';
  let m = Math.round(minutes);
  m = ((m % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}${String(m % 60).padStart(2, '0')}`;
}
