function pctClass(pct) {
  if (pct === 0) return "pct-zero";
  if (pct === 100) return "pct-full";
  return "";
}

function flagRowHtml(flag) {
  const cls = pctClass(flag.percentage);
  return `<a class="flag-row" href="flag-detail.html?key=${encodeURIComponent(flag.key)}">
    <div class="pct-block">
      <div class="pct-number ${cls}">${flag.percentage}%</div>
      <div class="pct-track"><div class="pct-fill ${cls}" style="width:${flag.percentage}%"></div></div>
    </div>
    <div>
      <div class="flag-key mono">${flag.key}</div>
      <div class="flag-desc ${flag.description ? '' : 'empty'}">${flag.description || 'No description added'}</div>
      <div class="flag-meta">
        <span class="env-badge env-${flag.environment}">${flag.environment}</span>
      </div>
    </div>
    <div class="flag-side">
      <div class="segments">${flag.segments}</div>
      <div>Changed ${ridgelineFormatDate(flag.lastChanged)} · ${flag.lastChangedBy}</div>
    </div>
  </a>`;
}

document.getElementById("flag-list").innerHTML = RIDGELINE_FLAGS.map(flagRowHtml).join("");
