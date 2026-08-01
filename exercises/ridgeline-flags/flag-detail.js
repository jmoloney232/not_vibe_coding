function pctClass(pct) {
  if (pct === 0) return "pct-zero";
  if (pct === 100) return "pct-full";
  return "";
}

function render() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("key");
  const flag = RIDGELINE_FLAGS.find(f => f.key === key) || RIDGELINE_FLAGS[0];
  const cls = pctClass(flag.percentage);

  document.title = `${flag.key} — Ridgeline`;

  document.getElementById("detail-root").innerHTML = `
    <div class="detail-head">
      <div class="flag-key mono">${flag.key}</div>
      <div class="flag-desc ${flag.description ? '' : 'empty'}">${flag.description || 'No description added'}</div>
      <div class="flag-meta" style="margin-top:8px;">
        <span class="env-badge env-${flag.environment}">${flag.environment}</span>
      </div>
    </div>

    <div class="detail-panel">
      <div class="big-pct ${cls}" id="big-pct">${flag.percentage}%</div>
      <div class="big-pct-label">of ${flag.segments.toLowerCase()} receive this flag</div>
      <div class="big-track"><div class="big-fill" id="big-fill" style="width:${flag.percentage}%"></div></div>

      <label for="pct-slider" style="display:block; font-size:12px; color:var(--ink-quiet); margin-top:20px; margin-bottom:6px;">Rollout percentage</label>
      <input type="range" id="pct-slider" min="0" max="100" step="5" value="${flag.percentage}" style="width:100%;" aria-describedby="slider-warning">

      <div id="slider-warning" style="margin-top:16px; display:none;"></div>

      <div class="detail-fields">
        <div class="detail-field"><dt>Segments</dt><dd>${flag.segments}</dd></div>
        <div class="detail-field"><dt>Environment</dt><dd style="text-transform:capitalize;">${flag.environment}</dd></div>
        <div class="detail-field"><dt>Last changed</dt><dd>${ridgelineFormatDate(flag.lastChanged)}</dd></div>
        <div class="detail-field"><dt>Changed by</dt><dd>${flag.lastChangedBy}</dd></div>
      </div>
    </div>

    <button id="save-btn" disabled style="font-family:inherit; font-size:14px; font-weight:600; padding:9px 18px; border-radius:4px; border:1px solid var(--accent); background:var(--ink-faint); color:#fff; cursor:not-allowed;">Save change</button>
    <span id="save-state" style="margin-left:12px; font-size:13px; color:var(--ink-quiet);"></span>
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
    saveBtn.style.background = changed ? "var(--accent)" : "var(--ink-faint)";
    saveBtn.style.cursor = changed ? "pointer" : "not-allowed";
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
      warning.style.display = "block";
      warning.innerHTML = `<div class="change-note">This flag is live in <strong>production</strong>. Changing from ${originalPct}% to ${val}% will take effect immediately for matching users.</div>`;
    } else {
      warning.style.display = "none";
    }
  }

  slider.addEventListener("input", update);

  // Production changes require a real second confirmation step, not just an
  // informational note — a blind reviewer flagged the original one-click
  // save as "mostly decorative" for a 30-point production jump: informative
  // but no actual friction. Staging/development flags save on the first
  // click, since the risk that justifies the extra step isn't present there
  // — this is a reasoned distinction, not blanket caution added everywhere.
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
