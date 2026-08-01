function dueLabel(iso) {
  const days = courseworkDaysUntil(iso);
  if (days < 0) return `${courseworkFormatDate(iso)} (past due)`;
  if (days === 0) return `${courseworkFormatDate(iso)} (today)`;
  if (days === 1) return `${courseworkFormatDate(iso)} (tomorrow)`;
  return `${courseworkFormatDate(iso)} (${days} days)`;
}

function courseCardHtml(course, index) {
  const slug = course.code.toLowerCase().replace(/\s+/g, '-');
  return `<a class="course-card" href="detail${window.PRESET_SUFFIX}.html?course=${slug}" style="--i:${index}">
    <div class="course-card-top">
      <span class="course-code">${course.code}</span>
      <span class="course-grade">${course.grade}</span>
    </div>
    <h2 class="course-title">${course.title}</h2>
    <div class="course-meta">${course.instructor}</div>
    <div class="course-meta">${course.meeting}</div>
    <div class="course-due">
      <span class="due-label">Next due</span>
      <span class="due-value">${course.nextDue.title} — ${dueLabel(course.nextDue.date)}</span>
    </div>
  </a>`;
}

document.getElementById("term-label").textContent = COURSEWORK_TERM;
document.getElementById("course-grid").innerHTML = COURSEWORK_COURSES.map(courseCardHtml).join("");

// Only present in the custom direction's HTML (a structural difference,
// not present in presets A-D at all — same underlying data, aggregated
// differently) — real content, sorted by actual urgency across courses.
const dueSoonEl = document.getElementById("due-soon-list");
if (dueSoonEl) {
  const sorted = [...COURSEWORK_COURSES].sort((a, b) => courseworkDaysUntil(a.nextDue.date) - courseworkDaysUntil(b.nextDue.date));
  dueSoonEl.innerHTML = sorted.map(c => {
    const days = courseworkDaysUntil(c.nextDue.date);
    return `<div class="due-soon-row ${days <= 2 ? 'urgent' : ''}">
      <span><span class="assn-course">${c.code}</span><span class="assn-title">${c.nextDue.title}</span></span>
      <span class="assn-when">${dueLabel(c.nextDue.date)}</span>
    </div>`;
  }).join("");
}
