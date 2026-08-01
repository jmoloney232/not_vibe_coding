/* Redesign of flag-detail.js. Keeps the original's real, working
   interaction (slider, live percentage, production-only confirm-click)
   unchanged — that logic was sound. What's added is the content the
   original page was missing: targeting rules, rollout history, and
   related flags — turning "one control and a lot of white space" into
   what a real flag detail screen needs. Layout uses the reclaimed width
   (two columns) instead of a single centered control on an otherwise
   empty page. */
function pctClass(pct) {
  if (pct === 0) return "pct-zero";
  if (pct === 100) return "pct-full";
  return "";
}

function historyRowHtml(row) {
  return `<div class="history-row">
    <div class="history-when">${ridgelineFormatDate(row.date)}</div>
    <div class="history-what"><strong>${row.by}</strong> changed rollout ${row.change}</div>
    ${row.note ? `<div class="history-note">${row.note}</div>` : ""}
  </div>`;
}

function render() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("key") || "checkout_v2_rollout";
  const flag = RIDGELINE_FLAGS.find(f => f.key === key) || RIDGELINE_FLAGS[0];
  const cls = pctClass(flag.percentage);
  const targeting = RIDGELINE_TARGETING[flag.key] || [];
  const history = RIDGELINE_HISTORY[flag.key] || [];
  const related = RIDGELINE_RELATED[flag.key] || [];

  document.title = `${flag.key} — Ridgeline`;

  document.getElementById("detail-root").innerHTML = `
    <div class="detail-head">
      <div class="flag-key mono">${flag.key}</div>
      <div class="flag-desc ${flag.description ? '' : 'empty'}">${flag.description || 'No description added'}</div>
      <span class="env-badge env-${flag.environment}">${flag.environment}</span>
    </div>

    <div class="detail-body">
      <div class="detail-main">
        <section class="panel">
          <div class="big-pct ${cls}" id="big-pct">${flag.percentage}%</div>
          <div class="big-pct-label">of ${flag.segments.toLowerCase()} receive this flag</div>
          <div class="big-track"><div class="big-fill" id="big-fill" style="width:${flag.percentage}%"></div></div>
          <label for="pct-slider" class="slider-label">Rollout percentage</label>
          <input type="range" id="pct-slider" min="0" max="100" step="5" value="${flag.percentage}" aria-describedby="slider-warning">
          <div id="slider-warning"></div>
          <div class="save-row">
            <button id="save-btn" disabled>Save change</button>
            <span id="save-state"></span>
          </div>
        </section>

        <section class="panel">
          <h2 class="panel-head">Targeting rules</h2>
          ${targeting.length
            ? `<ul class="rule-list">${targeting.map(r => `<li class="mono">${r}</li>`).join("")}</ul>`
            : `<p class="panel-empty">No conditional targeting — rollout percentage is the only gate.</p>`}
        </section>

        <section class="panel">
          <h2 class="panel-head">Rollout history</h2>
          ${history.length
            ? `<div class="history-list">${history.map(historyRowHtml).join("")}</div>`
            : `<p class="panel-empty">No changes recorded before the current value.</p>`}
        </section>
      </div>

      <aside class="detail-sidebar">
        <section class="panel">
          <h2 class="panel-head">Details</h2>
          <div class="detail-field"><dt>Segments</dt><dd>${flag.segments}</dd></div>
          <div class="detail-field"><dt>Environment</dt><dd class="cap">${flag.environment}</dd></div>
          <div class="detail-field"><dt>Last changed</dt><dd>${ridgelineFormatDate(flag.lastChanged)}</dd></div>
          <div class="detail-field"><dt>Changed by</dt><dd>${flag.lastChangedBy}</dd></div>
        </section>
        <section class="panel">
          <h2 class="panel-head">Related flags</h2>
          ${related.length
            ? `<ul class="related-list">${related.map(r => `<li><span class="mono related-key">${r.key}</span><span class="related-relation">${r.relation}</span></li>`).join("")}</ul>`
            : `<p class="panel-empty">No related flags recorded.</p>`}
        </section>
      </aside>
    </div>
  `;

  const slider = document.getElementById("pct-slider");
  const bigPct = document.getElementById("big-pct");
  const bigFill = document.getElementById("big-fill");
  const warning = document.getElementById("slider-warning");
  const saveBtn = document.getElementById("save-btn");
  const saveState = document.getElementById("save-state");
  const originalPct = flag.percentage;
  let awaitingConfirm = false;

  function resetButton(changed) {
    awaitingConfirm = false;
    saveBtn.textContent = "Save change";
    saveBtn.disabled = !changed;
    saveBtn.classList.toggle("is-active", changed);
  }

  function update() {
    const val = Number(slider.value);
    bigPct.textContent = `${val}%`;
    bigPct.className = `big-pct ${pctClass(val)}`;
    bigFill.style.width = `${val}%`;

    const changed = val !== originalPct;
    resetButton(changed);
    saveState.textContent = "";

    if (flag.environment === "production" && changed) {
      warning.innerHTML = `<div class="change-note">This flag is live in <strong>production</strong>. Changing from ${originalPct}% to ${val}% will take effect immediately for matching users.</div>`;
    } else {
      warning.innerHTML = "";
    }
  }

  slider.addEventListener("input", update);

  saveBtn.addEventListener("click", () => {
    if (saveBtn.disabled) return;
    const val = slider.value;

    if (flag.environment === "production" && !awaitingConfirm) {
      awaitingConfirm = true;
      saveBtn.textContent = `Confirm: set to ${val}%?`;
      saveState.textContent = "Click again to confirm this production change.";
      return;
    }

    saveState.textContent = `Saved — now live at ${val}%.`;
    flag.percentage = Number(val);
    resetButton(false);
  });
}

render();
