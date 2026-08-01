const STATUS_LABEL = { on_time: "On schedule", at_risk: "At risk", late: "Late", exception: "Exception", unassigned: "Unassigned", delivered: "Delivered" };

function loadRowHtml(load) {
  const mins = meridianMinutesUntil(load.apptWindowEnd);
  const timeLabel = load.status === "delivered" ? "Delivered"
    : mins >= 0 ? `${Math.floor(mins/60)}h ${mins%60}m left`
    : `${Math.abs(Math.floor(mins/60))}h ${Math.abs(mins%60)}m past window`;
  return `<div class="load-row status-${load.status}">
    <div class="lr-top">
      <span class="lr-id">${load.id}</span>
      <span class="lr-badge">${STATUS_LABEL[load.status]}</span>
    </div>
    <div class="lr-route">${load.origin} → ${load.destination} <span class="lr-shipper">for ${load.shipper}</span></div>
    <div class="lr-time">${meridianFormatClock(load.apptWindowStart)}–${meridianFormatClock(load.apptWindowEnd)} ${load.apptType} · ${timeLabel}</div>
    ${load.note ? `<div class="lr-note">${load.note}</div>` : ""}
  </div>`;
}

function isDriverFlagged(driver, loads) {
  return loads.some(l => ["at_risk", "late", "exception"].includes(l.status)) || driver.status === "mechanical_issue";
}

function driverSectionHtml(driver, loads) {
  const flagged = isDriverFlagged(driver, loads);
  const statusWord = { driving: "Driving", on_break: "On a break", off_duty: "Off duty for the day", mechanical_issue: "Truck out of service (mechanical)" }[driver.status];
  const hosLow = driver.hosRemainingMin <= 60 && driver.status !== "off_duty";
  const emptyMessage = driver.status === "mechanical_issue"
    ? "Load ML-4478 was reassigned out of this driver's queue — see \"Needs a driver\" above."
    : "No loads currently assigned this shift.";
  return `<section class="driver-section ${flagged ? 'flagged' : ''}">
    <div class="ds-head">
      <h2>${driver.name}${flagged ? ' <span class="flag-dot" title="Needs attention"></span>' : ''}</h2>
      <div class="ds-meta">${driver.truck} · ${statusWord} · <span class="${hosLow ? 'hos-low' : ''}">${Math.floor(driver.hosRemainingMin/60)}h ${driver.hosRemainingMin%60}m HOS remaining</span></div>
    </div>
    <div class="ds-loads">${loads.length ? loads.map(loadRowHtml).join("") : `<p class="ds-empty">${emptyMessage}</p>`}</div>
  </section>`;
}

function render() {
  document.getElementById("clock").textContent = meridianFormatClock(MERIDIAN_NOW) + " CT";

  const unassigned = MERIDIAN_LOADS.filter(l => !meridianDriverFor(l));
  document.getElementById("unassigned-band").innerHTML = unassigned.length ? `
    <h2 class="unassigned-heading">Needs a driver</h2>
    <div class="unassigned-loads">${unassigned.map(loadRowHtml).join("")}</div>
  ` : "";

  const sections = MERIDIAN_DRIVERS.map(d => {
    const loads = MERIDIAN_LOADS.filter(l => l.driverId === d.id);
    return { driver: d, loads, flagged: isDriverFlagged(d, loads) };
  }).sort((a, b) => (b.flagged - a.flagged));

  document.getElementById("driver-sections").innerHTML = sections.map(s => driverSectionHtml(s.driver, s.loads)).join("");
}

render();
