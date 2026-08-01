function statusLabel(status) {
  return { graded: "Graded", open: "Open", upcoming: "Upcoming" }[status];
}

function assignmentRowHtml(a, index) {
  const isOpen = a.status === "open";
  return `<div class="assignment-row status-${a.status}" style="--i:${index}">
    <div class="assignment-main">
      <span class="assignment-title">${a.title}</span>
      <span class="assignment-status">${statusLabel(a.status)}</span>
    </div>
    <div class="assignment-meta">Due ${courseworkFormatDate(a.due)}${a.grade ? ' · ' + a.grade : ''}</div>
    ${isOpen ? `<div class="assignment-body">
      <p>${a.description}</p>
      <div class="submit-block">
        <label class="file-label" for="file-input">Upload your submission</label>
        <input type="file" id="file-input">
        <div class="file-chosen" id="file-chosen">No file selected</div>
        <button class="submit-btn" id="submit-btn" disabled>Submit assignment</button>
        <div class="submit-feedback" id="submit-feedback"></div>
      </div>
    </div>` : ''}
  </div>`;
}

const params = new URLSearchParams(window.location.search);
const slug = params.get("course") || "cs-340";
const course = COURSEWORK_COURSES.find(c => c.code.toLowerCase().replace(/\s+/g, '-') === slug) || COURSEWORK_COURSES[0];

document.getElementById("course-code").textContent = course.code;
document.getElementById("course-title").textContent = course.title;
document.getElementById("course-meta").textContent = `${course.instructor} · ${course.meeting}`;
document.getElementById("assignment-list").innerHTML = CS340_ASSIGNMENTS.map(assignmentRowHtml).join("");

const fileInput = document.getElementById("file-input");
const fileChosen = document.getElementById("file-chosen");
const submitBtn = document.getElementById("submit-btn");
const submitFeedback = document.getElementById("submit-feedback");

fileInput.addEventListener("change", () => {
  if (fileInput.files.length) {
    fileChosen.textContent = fileInput.files[0].name;
    submitBtn.disabled = false;
  } else {
    fileChosen.textContent = "No file selected";
    submitBtn.disabled = true;
  }
});

submitBtn.addEventListener("click", () => {
  if (submitBtn.disabled) return;
  submitFeedback.textContent = `Submitted "${fileInput.files[0].name}" — you can resubmit until the due date.`;
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitted";
});
