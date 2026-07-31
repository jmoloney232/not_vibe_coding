function billActHtml(act) {
  return `<div class="bill-act ${act.size}">
    <span class="name">${act.name}</span>
    <span class="time">${act.time}</span>
  </div>`;
}

function renderDay(dayId) {
  const day = NORTHFIELD_DAYS.find(d => d.id === dayId);
  document.getElementById("bill").innerHTML = day.bill.map(billActHtml).join("");
  document.querySelectorAll(".day-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.day === dayId);
  });
}

function tabHtml(day) {
  return `<button class="day-tab" data-day="${day.id}">${day.label}<span class="date">${day.date}</span></button>`;
}

function tixCardHtml(t) {
  return `<div class="tix-card">
    <div class="price">$${t.price}</div>
    <div class="name">${t.name}</div>
    <div class="note">${t.note}</div>
  </div>`;
}

document.getElementById("day-tabs").innerHTML = NORTHFIELD_DAYS.map(tabHtml).join("");
document.getElementById("tix-grid").innerHTML = NORTHFIELD_TICKETS.map(tixCardHtml).join("");

document.querySelectorAll(".day-tab").forEach(tab => {
  tab.addEventListener("click", () => renderDay(tab.dataset.day));
});

renderDay(NORTHFIELD_DAYS[0].id);
