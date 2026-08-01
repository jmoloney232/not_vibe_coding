// Shared data model for all 4 creative-direction variants of the Meridian Dispatch Console.
// Fixed ISO timestamps throughout (not relative offsets) — round-8's Mission Control build
// found that relative-offset timestamps silently drift across reloads; all "time until X"
// values here are computed fresh from these fixed timestamps at render time, every time.

const MERIDIAN_NOW = "2026-07-31T14:32:00-05:00"; // mid-afternoon, Central time, an active shift

const MERIDIAN_DRIVERS = [
  { id: "D-104", name: "R. Alvarez", truck: "T-118", hosRemainingMin: 245, status: "driving" },
  { id: "D-112", name: "K. Boone", truck: "T-102", hosRemainingMin: 38, status: "driving" }, // HOS-critical
  { id: "D-119", name: "M. Chen", truck: "T-127", hosRemainingMin: 190, status: "driving" },
  { id: "D-121", name: "J. Delgado", truck: "T-109", hosRemainingMin: 0, status: "off_duty" }, // out of hours, done for the day
  { id: "D-130", name: "S. Faalele", truck: "T-133", hosRemainingMin: 310, status: "driving" },
  { id: "D-138", name: "T. Girard", truck: "T-115", hosRemainingMin: 92, status: "mechanical_issue" }, // truck T-115 reported a brake-warning issue at 14:18 (see load ML-4478's note) — status reflects that, not an ordinary break
  { id: "D-142", name: "A. Huynh", truck: "T-121", hosRemainingMin: 156, status: "driving" },
  { id: "D-150", name: "L. Ibarra", truck: "T-140", hosRemainingMin: 275, status: "driving" },
];

// status: "delivered" | "on_time" | "at_risk" | "late" | "exception" | "unassigned"
const MERIDIAN_LOADS = [
  { id: "ML-4471", shipper: "Cascade Foods", origin: "Waco, TX", destination: "Fort Worth, TX", driverId: "D-104", apptType: "delivery", apptWindowStart: "2026-07-31T15:00:00-05:00", apptWindowEnd: "2026-07-31T15:30:00-05:00", status: "on_time", note: null },
  { id: "ML-4472", shipper: "Redline Auto Parts", origin: "Fort Worth, TX", destination: "Denton, TX", driverId: "D-112", apptType: "delivery", apptWindowStart: "2026-07-31T15:10:00-05:00", apptWindowEnd: "2026-07-31T15:25:00-05:00", status: "at_risk", note: "Driver D-112 has 38 min HOS remaining and 55 min of driving left — will not make window without a relay." },
  { id: "ML-4473", shipper: "Blue Ridge Paper", origin: "Denton, TX", destination: "Waco, TX", driverId: "D-119", apptType: "pickup", apptWindowStart: "2026-07-31T14:45:00-05:00", apptWindowEnd: "2026-07-31T15:15:00-05:00", status: "on_time", note: null },
  { id: "ML-4474", shipper: "Coastal Produce Co.", origin: "Waco, TX", destination: "Austin, TX", driverId: "D-130", apptType: "delivery", apptWindowStart: "2026-07-31T15:45:00-05:00", apptWindowEnd: "2026-07-31T16:15:00-05:00", status: "on_time", note: null },
  { id: "ML-4475", shipper: "Redline Auto Parts", origin: "Austin, TX", destination: "San Antonio, TX", driverId: "D-142", apptType: "delivery", apptWindowStart: "2026-07-31T13:50:00-05:00", apptWindowEnd: "2026-07-31T14:05:00-05:00", status: "late", note: "Shipper Redline Auto Parts notified at 14:10." },
  { id: "ML-4476", shipper: "Alamo Beverage Distributing", origin: "San Antonio, TX", destination: "Waco, TX", driverId: "D-150", apptType: "pickup", apptWindowStart: "2026-07-31T16:00:00-05:00", apptWindowEnd: "2026-07-31T16:30:00-05:00", status: "on_time", note: null },
  { id: "ML-4477", shipper: "Highline Steel Supply", origin: "Fort Worth, TX", destination: "Waco, TX", driverId: null, apptType: "pickup", apptWindowStart: "2026-07-31T17:00:00-05:00", apptWindowEnd: "2026-07-31T17:30:00-05:00", status: "unassigned", note: "No driver assigned — 2h28m until window opens." },
  { id: "ML-4478", shipper: "Cascade Foods", origin: "Denton, TX", destination: "Fort Worth, TX", driverId: "T-115-pending", apptType: "delivery", apptWindowStart: "2026-07-31T15:30:00-05:00", apptWindowEnd: "2026-07-31T16:00:00-05:00", status: "exception", note: "Truck T-115 (driver T. Girard) reported a mechanical issue (trailer brake warning) at 14:18, pulled over on Hwy 35. Load ML-4478 needs reassignment." },
  { id: "ML-4479", shipper: "Coastal Produce Co.", origin: "Austin, TX", destination: "Waco, TX", driverId: "D-104", apptType: "pickup", apptWindowStart: "2026-07-31T18:00:00-05:00", apptWindowEnd: "2026-07-31T18:30:00-05:00", status: "on_time", note: null },
  { id: "ML-4480", shipper: "Blue Ridge Paper", origin: "Waco, TX", destination: "Denton, TX", driverId: "D-119", apptType: "delivery", apptWindowStart: "2026-07-31T17:15:00-05:00", apptWindowEnd: "2026-07-31T17:45:00-05:00", status: "on_time", note: null },
  { id: "ML-4481", shipper: "Highline Steel Supply", origin: "Waco, TX", destination: "San Antonio, TX", driverId: "D-130", apptType: "delivery", apptWindowStart: "2026-07-31T19:30:00-05:00", apptWindowEnd: "2026-07-31T20:00:00-05:00", status: "on_time", note: null },
  { id: "ML-4482", shipper: "Alamo Beverage Distributing", origin: "Waco, TX", destination: "Fort Worth, TX", driverId: "D-142", apptType: "delivery", apptWindowStart: "2026-07-31T16:40:00-05:00", apptWindowEnd: "2026-07-31T17:00:00-05:00", status: "at_risk", note: "Dock delay reported by shipper Alamo Beverage Distributing — prior truck still unloading; 20 min behind their own schedule." },
  { id: "ML-4483", shipper: "Redline Auto Parts", origin: "Denton, TX", destination: "Austin, TX", driverId: "D-150", apptType: "pickup", apptWindowStart: "2026-07-31T19:00:00-05:00", apptWindowEnd: "2026-07-31T19:30:00-05:00", status: "on_time", note: null },
  { id: "ML-4484", shipper: "Cascade Foods", origin: "San Antonio, TX", destination: "Austin, TX", driverId: "D-104", apptType: "delivery", apptWindowStart: "2026-07-31T12:15:00-05:00", apptWindowEnd: "2026-07-31T12:45:00-05:00", status: "delivered", note: "Delivered 12:38, within window." },
  { id: "ML-4485", shipper: "Coastal Produce Co.", origin: "Fort Worth, TX", destination: "Denton, TX", driverId: "D-119", apptType: "delivery", apptWindowStart: "2026-07-31T11:00:00-05:00", apptWindowEnd: "2026-07-31T11:30:00-05:00", status: "delivered", note: "Delivered 11:22, within window." },
  { id: "ML-4486", shipper: "Blue Ridge Paper", origin: "Austin, TX", destination: "San Antonio, TX", driverId: "D-130", apptType: "delivery", apptWindowStart: "2026-07-31T10:30:00-05:00", apptWindowEnd: "2026-07-31T11:00:00-05:00", status: "delivered", note: "Delivered 10:51, within window." },
];

function meridianMinutesUntil(isoTimestamp, fromIso) {
  const from = new Date(fromIso || MERIDIAN_NOW).getTime();
  const target = new Date(isoTimestamp).getTime();
  return Math.round((target - from) / 60000);
}

function meridianFormatClock(isoTimestamp) {
  const d = new Date(isoTimestamp);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Chicago' });
}

function meridianDriverFor(load) {
  return MERIDIAN_DRIVERS.find(d => d.id === load.driverId) || null;
}
