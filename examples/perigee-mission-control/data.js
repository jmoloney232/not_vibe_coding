/*
  Perigee Mission Operations Console — fleet dataset.

  This is illustrative test data for a fictional company (per this project's own
  §3/§11: invented operational texture used to exercise the interface, not presented
  as fact about a real entity). It is deliberately NOT idealized: one capsule has an
  active anomaly, one has degraded telemetry from a real-shaped cause (a ground-station
  handover gap, not a vague "connection lost"), one manifest slot is genuinely empty,
  and one schedule item has a real operational hold (recovery-zone sea state), per
  §11's requirement to test realistic content variance rather than only the tidy case.

  Telemetry timestamps are stored as fixed ISO 8601 UTC instants — real events that
  happened once — not as "minutes before whoever loads the page" offsets. An earlier
  version of this file made that mistake: it stored a relative offset and derived a
  fake "absolute" timestamp from it fresh on every page load, so the same real event
  showed a different absolute time each time the page was opened. A blind review of
  this build caught it directly by comparing timestamps across three screenshots of
  the same capsule. §11's dynamic-state-correctness requirement is exactly about this
  class of bug: the correct direction is a fixed source-of-truth timestamp with a
  relative age computed FROM it against the real current time, never the reverse.
*/

const PERIGEE_FLEET = [
  {
    id: "PGE-014",
    status: "anomaly",
    phase: "Orbital Processing",
    payload: "Protein crystal batch 7",
    customer: "Solenne Biologics",
    telemetryTimestamp: "2026-07-31T00:48:53Z",
    telemetry: {
      thermalC: { value: 41.8, unit: "°C", nominalMax: 37.5, state: "error" },
      attitudeErrorDeg: { value: 0.04, unit: "°", nominalMax: 0.5, state: "nominal" },
      commsLatencyMs: { value: 812, unit: "ms", nominalMax: 1500, state: "nominal" },
      batterySoc: { value: 87, unit: "%", nominalMin: 30, state: "nominal" },
    },
    anomaly: {
      title: "Thermal sensor B3 above nominal band",
      body: "Radiator-side thermal sensor B3 has read 4.2°C above the nominal band for the last 40 minutes. Consistent with a radiator sun-angle effect at the capsule's current beta angle; a sensor fault has not been ruled out. Thermal has not yet requested an attitude adjustment.",
      openedAgoMin: 40,
      owner: "M. Deng (Thermal)",
      // A steady, monotonic rise — the actual question a thermal controller has
      // ("is it rising, flat, or oscillating?") isn't answerable from the current
      // instantaneous reading alone. Rendered as a real trend chart in capsule.html.
      thermalHistoryC: [37.4, 37.6, 38.1, 38.6, 39.0, 39.6, 40.2, 40.9, 41.4, 41.8],
    },
    manifestNote: "No action required from Manifest — processing continues nominally aside from the flagged sensor.",
  },
  {
    id: "PGE-011",
    status: "caution",
    phase: "Deorbit Prep",
    payload: "Fiber preform draw, run 2 of 3",
    customer: "Halyard Photonics",
    telemetryTimestamp: "2026-07-31T00:31:53Z",
    telemetry: {
      thermalC: { value: 22.1, unit: "°C", nominalMax: 37.5, state: "nominal" },
      attitudeErrorDeg: { value: 0.11, unit: "°", nominalMax: 0.5, state: "nominal" },
      commsLatencyMs: { value: null, unit: "ms", state: "unavailable" },
      batterySoc: { value: 94, unit: "%", nominalMin: 30, state: "nominal" },
    },
    anomaly: null,
    telemetryGapNote: "Ground-station handover gap between Punta Arenas and Awarua passes; next contact expected in ~14 min. This is a known coverage gap for this orbit, not a vehicle fault.",
    manifestNote: "On schedule for deorbit burn in the next window (see Manifest & Schedule).",
  },
  {
    id: "PGE-009",
    status: "nominal",
    phase: "Orbital Processing",
    payload: "Semiconductor substrate anneal",
    customer: "Tessera Materials",
    telemetryTimestamp: "2026-07-31T00:52:53Z",
    telemetry: {
      thermalC: { value: 24.6, unit: "°C", nominalMax: 37.5, state: "nominal" },
      attitudeErrorDeg: { value: 0.02, unit: "°", nominalMax: 0.5, state: "nominal" },
      commsLatencyMs: { value: 640, unit: "ms", nominalMax: 1500, state: "nominal" },
      batterySoc: { value: 91, unit: "%", nominalMin: 30, state: "nominal" },
    },
    anomaly: null,
    manifestNote: "Anneal cycle 3 of 5 complete. On schedule.",
  },
  {
    id: "PGE-016",
    status: "nominal",
    phase: "Ascent",
    payload: "Pharmaceutical crystallization, initial run",
    customer: "Meridian Alloys Life Sciences",
    telemetryTimestamp: "2026-07-31T00:54:29Z",
    telemetry: {
      thermalC: { value: 18.3, unit: "°C", nominalMax: 37.5, state: "nominal" },
      attitudeErrorDeg: { value: 0.31, unit: "°", nominalMax: 0.5, state: "nominal" },
      commsLatencyMs: { value: 410, unit: "ms", nominalMax: 1500, state: "nominal" },
      batterySoc: { value: 99, unit: "%", nominalMin: 30, state: "nominal" },
    },
    anomaly: null,
    manifestNote: "Orbit insertion confirmed 11 min ago. Processing sequence begins after first full ground-station pass.",
  },
  {
    id: "PGE-007",
    status: "nominal",
    phase: "Reentry",
    payload: "Fiber preform draw, run 1 of 3 (complete)",
    customer: "Halyard Photonics",
    telemetryTimestamp: "2026-07-31T00:53:53Z",
    telemetry: {
      thermalC: { value: 31.0, unit: "°C", nominalMax: 37.5, state: "nominal" },
      attitudeErrorDeg: { value: 0.06, unit: "°", nominalMax: 0.5, state: "nominal" },
      commsLatencyMs: { value: 720, unit: "ms", nominalMax: 1500, state: "nominal" },
      batterySoc: { value: 73, unit: "%", nominalMin: 30, state: "nominal" },
    },
    anomaly: null,
    manifestNote: "Deorbit burn confirmed nominal. Recovery window opens per Manifest & Schedule.",
  },
  {
    id: "PGE-002",
    status: "recovered",
    phase: "Recovered",
    payload: "Optical fiber preform, qualification run",
    customer: "Halyard Photonics",
    telemetryTimestamp: null,
    telemetry: null,
    recovered: {
      landedAt: "2026-07-30T14:42:53Z",
      recoveryZone: "Pacific downrange corridor, station 3",
      handoffNote: "Payload handed off to customer courier at 04:20Z. No further telemetry expected — capsule is on the recovery vessel, not in contact.",
    },
    anomaly: null,
    manifestNote: "Mission complete.",
  },
];

const PERIGEE_SCHEDULE = [
  {
    windowStart: "2026-07-31T02:10:00Z",
    windowEnd: "2026-07-31T02:13:00Z",
    capsuleId: "PGE-007",
    payload: "Fiber preform draw, run 1 of 3 (complete)",
    customer: "Halyard Photonics",
    kind: "reentry",
    status: "hold",
    holdReason: "Recovery Zone (Pacific downrange corridor, station 3): significant wave height forecast at 2.8m, exceeds the 2.5m recovery-vessel operating limit. Next weather window under review with Recovery Ops; reentry burn itself is not blocked, only vessel recovery.",
  },
  {
    windowStart: "2026-07-31T09:45:00Z",
    windowEnd: "2026-07-31T09:48:00Z",
    capsuleId: "PGE-011",
    payload: "Fiber preform draw, run 2 of 3",
    customer: "Halyard Photonics",
    kind: "deorbit-burn",
    status: "scheduled",
  },
  {
    windowStart: "2026-08-01T14:20:00Z",
    windowEnd: null,
    capsuleId: null,
    payload: null,
    customer: null,
    kind: "reentry",
    status: "unassigned",
  },
  {
    windowStart: "2026-08-02T06:05:00Z",
    windowEnd: "2026-08-02T06:07:00Z",
    capsuleId: "PGE-009",
    payload: "Semiconductor substrate anneal",
    customer: "Tessera Materials",
    kind: "deorbit-burn",
    status: "scheduled",
  },
];

const CURRENT_SHIFT = {
  flightDirector: "R. Okonkwo",
  console: [
    { role: "CAPCOM", name: "J. Vasquez" },
    { role: "Thermal", name: "M. Deng" },
    { role: "Recovery Ops", name: "S. Iwueze" },
  ],
};
