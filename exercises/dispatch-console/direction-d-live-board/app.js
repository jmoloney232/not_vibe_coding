const TIMELINE_BEFORE_MIN = 60;   // how far before NOW the timeline starts
const TIMELINE_AFTER_MIN = 360;   // how far after NOW the timeline ends
const TIMELINE_SPAN_MIN = TIMELINE_BEFORE_MIN + TIMELINE_AFTER_MIN;

const STATUS_LABEL = { on_time: "On schedule", at_risk: "At risk", late: "Late", exception: "Exception", unassigned: "Unassigned" };

function pctForMinutesFromNow(mins) {
  const clamped = Math.max(-TIMELINE_BEFORE_MIN, Math.min(TIMELINE_AFTER_MIN, mins));
  return ((clamped + TIMELINE_BEFORE_MIN) / TIMELINE_SPAN_MIN) * 100;
}

function trackRowHtml(load) {
  const startMin = meridianMinutesUntil(load.apptWindowStart);
  const endMin = meridianMinutesUntil(load.apptWindowEnd);
  const startPct = pctForMinutesFromNow(startMin);
  const endPct = pctForMinutesFromNow(endMin);
  const width = Math.max(endPct - startPct, 1.2);
  const driver = meridianDriverFor(load);
  return `<div class="track-row">
    <div class="track-label">${load.id}<span class="track-driver">${driver ? driver.name : "unassigned"}</span></div>
    <div class="track-lane">
      <div class="bar bar-${load.status}" style="left:${startPct}%; width:${width}%;" title="${load.id}: ${meridianFormatClock(load.apptWindowStart)}–${meridianFormatClock(load.apptWindowEnd)}"></div>
    </div>
  </div>`;
}

function rulerHtml() {
  const marks = [];
  for (let m = -60; m <= 360; m += 60) {
    const t = new Date(new Date(MERIDIAN_NOW).getTime() + m * 60000);
    marks.push(`<span class="ruler-mark" style="left:${pctForMinutesFromNow(m)}%">${meridianFormatClock(t.toISOString())}</span>`);
  }
  return marks.join("");
}

function listRowHtml(load) {
  const driver = meridianDriverFor(load);
  const mins = meridianMinutesUntil(load.apptWindowEnd);
  const timeLabel = mins >= 0 ? `closes in ${Math.floor(mins/60)}h ${mins%60}m` : `closed ${Math.abs(Math.floor(mins/60))}h ${Math.abs(mins%60)}m ago`;
  return `<div class="list-row status-${load.status}">
    <div class="lr-main">
      <span class="lr-id">${load.id}</span>
      <span class="lr-status">${STATUS_LABEL[load.status]}</span>
      <span class="lr-route">${load.origin} → ${load.destination}</span>
    </div>
    <div class="lr-sub">${meridianFormatClock(load.apptWindowStart)}–${meridianFormatClock(load.apptWindowEnd)} ${load.apptType} · ${timeLabel} · ${driver ? driver.name : "no driver assigned"}</div>
    ${load.note ? `<div class="lr-note">${load.note}</div>` : ""}
  </div>`;
}

function render() {
  document.getElementById("clock").textContent = meridianFormatClock(MERIDIAN_NOW) + " CT";
  document.getElementById("now-line").style.left = pctForMinutesFromNow(0) + "%";
  document.getElementById("ruler").innerHTML = rulerHtml();

  const active = MERIDIAN_LOADS.filter(l => l.status !== "delivered")
    .sort((a, b) => meridianMinutesUntil(a.apptWindowEnd) - meridianMinutesUntil(b.apptWindowEnd));

  document.getElementById("tracks").innerHTML = active.map(trackRowHtml).join("");
  document.getElementById("list-body").innerHTML = active.map(listRowHtml).join("");
}

render();
