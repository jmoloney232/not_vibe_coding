const STATUS_ORDER = { exception: 0, late: 1, at_risk: 2, unassigned: 3, on_time: 4, delivered: 5 };
const STATUS_LABEL = { on_time: "On time", at_risk: "At risk", late: "Late", exception: "Exception", unassigned: "Unassigned", delivered: "Delivered" };

function driverStripItemHtml(d) {
  const hosLow = d.hosRemainingMin <= 60 && d.status !== "off_duty";
  const statusLabel = { driving: "Driving", on_break: "On break", off_duty: "Off duty", mechanical_issue: "Out of service" }[d.status];
  return `<div class="driver-chip ${hosLow ? 'hos-low' : ''}">
    <span class="dc-name">${d.name}</span>
    <span class="dc-truck">${d.truck}</span>
    <span class="dc-hos">${Math.floor(d.hosRemainingMin/60)}h${String(d.hosRemainingMin%60).padStart(2,'0')}</span>
    <span class="dc-status">${statusLabel}</span>
  </div>`;
}

function rowHtml(load) {
  const driver = meridianDriverFor(load);
  const mins = meridianMinutesUntil(load.apptWindowEnd);
  const timeLeft = load.status === "delivered" ? "—"
    : mins >= 0 ? `${Math.floor(mins/60)}h${String(mins%60).padStart(2,'0')}`
    : `−${Math.floor(Math.abs(mins)/60)}h${String(Math.abs(mins)%60).padStart(2,'0')}`;
  return `<tr class="row-${load.status}">
    <td class="mono">${load.id}</td>
    <td data-label="Status"><span class="status-dot status-${load.status}"></span>${STATUS_LABEL[load.status]}</td>
    <td data-label="Route">${load.origin} → ${load.destination}</td>
    <td data-label="Shipper">${load.shipper}</td>
    <td data-label="Driver">${driver ? driver.name : "—"}</td>
    <td class="mono" data-label="Truck">${driver ? driver.truck : "—"}</td>
    <td class="mono ${driver && driver.hosRemainingMin <= 60 ? 'hos-flag' : ''}" data-label="HOS">${driver ? Math.floor(driver.hosRemainingMin/60)+'h'+String(driver.hosRemainingMin%60).padStart(2,'0') : "—"}</td>
    <td class="mono" data-label="Window">${meridianFormatClock(load.apptWindowStart)}–${meridianFormatClock(load.apptWindowEnd)}</td>
    <td class="mono ${mins < 0 && load.status !== 'delivered' ? 'hos-flag' : ''}" data-label="Time left">${timeLeft}</td>
  </tr>`;
}

function render(sortKey) {
  document.getElementById("clock").textContent = meridianFormatClock(MERIDIAN_NOW) + " CT";
  document.getElementById("driver-strip").innerHTML = MERIDIAN_DRIVERS.map(driverStripItemHtml).join("");

  let loads = [...MERIDIAN_LOADS];
  if (sortKey === "urgency") loads.sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status] || a.apptWindowEnd.localeCompare(b.apptWindowEnd));
  if (sortKey === "window") loads.sort((a, b) => a.apptWindowEnd.localeCompare(b.apptWindowEnd));
  if (sortKey === "driver") loads.sort((a, b) => {
    const da = meridianDriverFor(a), db = meridianDriverFor(b);
    return (da ? da.name : "zzz").localeCompare(db ? db.name : "zzz");
  });

  document.getElementById("board-body").innerHTML = loads.map(rowHtml).join("");
}

document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.sort);
  });
});

render("urgency");
