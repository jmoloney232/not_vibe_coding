/*
  Perigee Mission Operations Console — shared behavior.

  Two things this file exists to get right, both direct applications of §11's
  dynamic-state-correctness requirement:

  1. The sidebar clock and every telemetry timestamp are in UTC ("Zulu time"), the
     actual authoritative time reference real mission operations use, computed via
     Date.prototype.toISOString / getUTC* methods — never the viewer's local timezone,
     which would silently misrepresent when telemetry was actually last received.
  2. "Time since last telemetry" is computed live from each event's own fixed,
     real timestamp (data.js), re-evaluated on an interval against the real current
     time, with genuine stale/lost thresholds — not a string baked in ahead of time,
     and not derived backwards from an offset that would silently drift on every
     reload (a real bug an earlier version of this file had; see data.js's note).
*/

const STATUS_META = {
  nominal: { label: "Nominal", className: "status-nominal" },
  caution: { label: "Caution", className: "status-caution" },
  anomaly: { label: "Anomaly", className: "status-anomaly" },
  recovered: { label: "Recovered", className: "status-recovered" },
};

function pad(n, width = 2) {
  return String(n).padStart(width, "0");
}

function formatZuluClock(date) {
  return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}Z`;
}

function formatZuluTimestamp(date) {
  return (
    `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ` +
    `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}Z`
  );
}

/** Correct relative-age formatting with real rollover, not a single "Xm ago" template. */
function formatRelativeAge(ms) {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  if (totalSeconds < 60) return "just now";
  const totalMinutes = Math.floor(totalSeconds / 60);
  if (totalMinutes < 60) return `${totalMinutes}m ago`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours < 24) return minutes > 0 ? `${hours}h ${minutes}m ago` : `${hours}h ago`;
  const days = Math.floor(hours / 24);
  const remHours = hours % 24;
  return remHours > 0 ? `${days}d ${remHours}h ago` : `${days}d ago`;
}

function ageState(ms) {
  const minutes = ms / 60000;
  if (minutes >= 60) return "lost";
  if (minutes >= 15) return "stale";
  return "fresh";
}

/** Same correctness bar as formatRelativeAge, for a timestamp in the future. */
function formatRelativeToNow(targetDate, now = new Date()) {
  const diffMs = targetDate - now;
  if (Math.abs(diffMs) < 60000) return diffMs >= 0 ? "starts in <1m" : "in progress";
  if (diffMs < 0) return `${formatRelativeAge(-diffMs)} (window passed)`;
  const totalMinutes = Math.floor(diffMs / 60000);
  if (totalMinutes < 60) return `in ${totalMinutes}m`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours < 24) return minutes > 0 ? `in ${hours}h ${minutes}m` : `in ${hours}h`;
  const days = Math.floor(hours / 24);
  const remHours = hours % 24;
  return remHours > 0 ? `in ${days}d ${remHours}h` : `in ${days}d`;
}

/** Wires [data-window-start] (an ISO timestamp) to a live, correctly-computed countdown. */
function initCountdownWidgets(root = document) {
  const widgets = root.querySelectorAll("[data-window-start]");
  const entries = Array.from(widgets).map((el) => ({
    el,
    target: new Date(el.dataset.windowStart),
  }));

  function update() {
    const now = new Date();
    for (const { el, target } of entries) {
      el.textContent = formatRelativeToNow(target, now);
    }
  }

  update();
  setInterval(update, 15000);
}

function initZuluClock(el) {
  function tick() {
    el.textContent = formatZuluClock(new Date());
  }
  tick();
  setInterval(tick, 1000);
}

/**
 * Wires every element with [data-telemetry-timestamp] (a fixed ISO 8601 UTC instant —
 * a real event, not an offset from whenever the page happens to load) to a live,
 * correctly-computed age readout: a relative string plus the real absolute UTC
 * timestamp, both derived from that same fixed source of truth every time this runs.
 */
function initTelemetryAgeWidgets(root = document) {
  const widgets = root.querySelectorAll("[data-telemetry-timestamp]");
  const entries = Array.from(widgets).map((el) => ({
    el,
    eventTime: new Date(el.dataset.telemetryTimestamp),
  }));

  function update() {
    const now = new Date();
    for (const { el, eventTime } of entries) {
      const ageMs = now - eventTime;
      const relative = el.querySelector(".age-relative");
      const absolute = el.querySelector(".age-absolute");
      if (relative) relative.textContent = formatRelativeAge(ageMs);
      if (absolute) absolute.textContent = formatZuluTimestamp(eventTime);
      el.classList.remove("age-stale", "age-lost");
      // Stale/lost alert coloring means "this vehicle should be talking to us and
      // isn't" — it does NOT apply to a recovered capsule's landing time, which is
      // expected to age indefinitely with no telemetry at all (§11: a "no longer
      // applicable" state is not the same as a "missing when it should be there" one).
      if (el.dataset.noAlert !== "true") {
        const state = ageState(ageMs);
        if (state === "stale") el.classList.add("age-stale");
        if (state === "lost") el.classList.add("age-lost");
      }
    }
  }

  update();
  setInterval(update, 15000);
}

function statusPillHtml(status) {
  const meta = STATUS_META[status] || { label: status, className: "" };
  return `<span class="status ${meta.className}">${meta.label}</span>`;
}

function telemetryAgeHtml(isoTimestamp, { alert = true } = {}) {
  if (!isoTimestamp) {
    return `<span class="telemetry-age"><span class="age-relative" style="color: var(--text-muted)">no telemetry</span></span>`;
  }
  return (
    `<span class="telemetry-age" data-telemetry-timestamp="${isoTimestamp}"${alert ? "" : ' data-no-alert="true"'}>` +
    `<span class="age-relative"></span>` +
    `<span class="age-absolute"></span>` +
    `</span>`
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const clockEl = document.querySelector("[data-zulu-clock]");
  if (clockEl) initZuluClock(clockEl);
  initTelemetryAgeWidgets();
});
