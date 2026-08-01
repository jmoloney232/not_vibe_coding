function statusLabel(status) {
  return {
    on_time: "On schedule", at_risk: "At risk", late: "Late", exception: "Exception",
    unassigned: "Unassigned", delivered: "Delivered",
  }[status];
}

function attentionCardHtml(load) {
  const driver = meridianDriverFor(load);
  const mins = meridianMinutesUntil(load.apptWindowEnd);
  const timeLabel = mins >= 0
    ? `${Math.floor(mins / 60)}h ${mins % 60}m until window closes`
    : `Window closed ${Math.abs(Math.floor(mins / 60))}h ${Math.abs(mins % 60)}m ago`;
  return `
    <article class="attn-card attn-${load.status}">
      <div class="attn-head">
        <span class="load-id">${load.id}</span>
        <span class="badge badge-${load.status}">${statusLabel(load.status)}</span>
      </div>
      <div class="attn-route">${load.origin} → ${load.destination} · ${load.shipper}</div>
      <div class="attn-time">${timeLabel} (${meridianFormatClock(load.apptWindowStart)}–${meridianFormatClock(load.apptWindowEnd)} ${load.apptType})</div>
      ${driver ? `<div class="attn-driver">${driver.name} · ${driver.truck} · HOS ${Math.floor(driver.hosRemainingMin/60)}h${driver.hosRemainingMin%60}m remaining</div>` : `<div class="attn-driver">No driver assigned</div>`}
      ${load.note ? `<div class="attn-note">${load.note}</div>` : ""}
    </article>`;
}

function quietRowHtml(load) {
  const driver = meridianDriverFor(load);
  return `<div class="quiet-row">
    <span class="quiet-id">${load.id}</span>
    <span class="quiet-route">${load.origin} → ${load.destination}</span>
    <span class="quiet-driver">${driver ? driver.name : "—"}</span>
    <span class="quiet-window">${meridianFormatClock(load.apptWindowStart)}–${meridianFormatClock(load.apptWindowEnd)}</span>
  </div>`;
}

function render() {
  document.getElementById("clock").textContent = meridianFormatClock(MERIDIAN_NOW) + " CT";

  const needsAttention = MERIDIAN_LOADS.filter(l => ["at_risk", "late", "exception", "unassigned"].includes(l.status));
  const onTime = MERIDIAN_LOADS.filter(l => l.status === "on_time");
  const delivered = MERIDIAN_LOADS.filter(l => l.status === "delivered");

  document.getElementById("attention-list").innerHTML = needsAttention.length
    ? needsAttention.map(attentionCardHtml).join("")
    : `<p class="all-clear">No loads currently need a decision.</p>`;

  document.getElementById("ontime-count").textContent = `(${onTime.length})`;
  document.getElementById("ontime-list").innerHTML = onTime.map(quietRowHtml).join("");

  document.getElementById("delivered-count").textContent = `(${delivered.length})`;
  document.getElementById("delivered-list").innerHTML = delivered.map(quietRowHtml).join("");
}

render();
