# Creative Direction — Meridian Dispatch Console

Built under the revised process in `ANTI_VIBE_CODING_UI.md` §3/§6 (round-9 rewrite). This is the calibration project's required 4-structural-variant exercise (brief Part 14) — see `exercises/README.md` for why this exercise was chosen to carry it.

## Product Brief (§3 / §6 Stage 1)

- **What the product does**: a live freight-dispatch console for a regional trucking/3PL company. Dispatchers assign inbound/outbound loads to drivers and trucks, monitor which loads are running late against appointment windows, and handle exceptions (a truck breakdown, a driver running over Hours-of-Service, a shipper delaying a dock appointment) in real time during an active shift.
- **Primary users**: dispatchers, working an 8-10 hour shift, watching this screen continuously, making frequent small decisions rather than occasional deep ones.
- **Primary task**: at any given moment, know which loads are at risk of missing their appointment window, and reassign/intervene before it happens.
- **Usage context**: a dispatch-office monitor, viewed continuously and glanced at, not read start-to-finish; also opened on a laptop by an on-call manager checking status remotely.
- **Real reference anchors researched this session** (`PROFESSIONAL_WEB_DESIGN_RESEARCH.md`, `design-reference-atlas.json`): Bloomberg Terminal (density defended as trained fluency, not decoration — `bloomberg-terminal` atlas-adjacent entry), SAP Fiori (the "1:1:3" one-user/one-use-case/three-screen-size enterprise discipline), Palantir Blueprint/Foundry Workshop (a real open-source toolkit purpose-built for dense operational interfaces), GOV.UK (restraint instrumented to a stated user-need purpose).

## No Recipe Without Reason — applied to each anchor before any direction below draws on it

1. **Bloomberg Terminal**: Why does it fit? Both are used by expert operators for hours at a stretch making frequent time-pressured decisions. What constraint does it solve? Justifies high information density and minimal decorative chrome as *correct*, not merely tolerated. What transfers? The *principle* (density earns trust from experts; visual "calm" is not automatically the right goal for this user). What does NOT transfer? Bloomberg's specific black/amber palette and 1982-era keyboard-shortcut interaction model are historical path-dependency, not a design lesson — copying the literal look would be recognizable imitation with no product reason (dispatchers have no Bloomberg-trained muscle memory to preserve).
2. **SAP Fiori**: Why does it fit? Fiori's 1:1:3 principle (one user, one task, three screen sizes) matches this console's actual usage pattern (one dispatcher, one task — triage at-risk loads — across a office monitor and a laptop). What transfers? The discipline of designing each *screen* around one decision, not a dashboard of everything. What does NOT transfer? Fiori's specific visual skin (SAP's own token set) — not licensed, not appropriate to imitate literally.
3. **Palantir Blueprint/Foundry Workshop**: Why does it fit? A real, public, open-source example of density built deliberately rather than defaulted into. What transfers? Component patterns for dense tabular/status data (collapsible sections, tabs) are a legitimate, non-proprietary interaction vocabulary. What does NOT transfer? Palantir's specific brand marks or literal visual system.
4. **GOV.UK**: Why does it fit? The strongest available real case of restraint chosen *for a stated reason* rather than defensively (Governing Principle 4). What transfers? The discipline of asking "does this restraint serve a real user need" before applying it, used specifically in Direction 1 below. What does NOT transfer? GOV.UK's own crest/typeface (protected identity) and its specific document-portal genre, which is a different task shape than a live-monitoring console.

## Stage 2 — Four Structurally Different Directions

Each differs from the others in page architecture, reading path, density, hierarchy model, and compositional rhythm — not only in color/font, per the round-9 rewrite of §6 Stage 2.

### Direction A — Authored Minimalism: "Exception-First"
**Concept**: the screen shows almost nothing by default except loads that actually need a decision right now. Normal, on-time loads are visually near-silent (a single-line list, low contrast) until a dispatcher explicitly asks to see them; at-risk loads are the only thing rendered with any real visual weight.
**Structural difference**: single-column, priority-ordered list (not a grid, not a dashboard of tiles) — reading path is strictly top-to-bottom by urgency, nothing competes with the top item.
**Reference anchor**: GOV.UK's restraint-for-a-stated-reason discipline, applied to *information triage* rather than *document layout* — the translation, not the visual style, is what's borrowed.
**Risk**: could read as empty/underbuilt if a dispatcher's mental model expects to see everything at a glance, not filtered.

### Direction B — Information-Dense Utilitarian: "Full Board"
**Concept**: every load, every driver, every dock, visible simultaneously in a dense tabular grid, the way an experienced dispatcher's current whiteboard/spreadsheet-hybrid tools already work — density is not hidden, it's the entire value proposition (a dispatcher scans the whole board, not a curated subset).
**Structural difference**: a wide multi-column data-grid architecture, sortable/filterable columns, status conveyed by compact inline indicators rather than cards — reading path is scan-the-grid, not read-top-to-bottom.
**Reference anchor**: Bloomberg Terminal's defended-density philosophy + Palantir Blueprint's real component vocabulary for dense tabular data.
**Risk**: could overwhelm a newer dispatcher or fail entirely on the laptop/remote-check use case named in the brief.

### Direction C — Warm Humanist: "Shift Handoff"
**Concept**: the console is framed around the actual human shift structure — organized by driver, with a warmer, more legible, less clinical register (as if designed for someone reading it during a stressful 10-hour shift, not a screen meant to look impressively technical). Tests Default 7/8 directly: light background, a warm accent instead of the cool teal/cyan Mission Control used, deliberately not dark-native.
**Structural difference**: grouped-by-driver card sections (not a flat list, not a dense grid) — reading path follows the human organizational unit (driver → their loads) rather than urgency-ranking or a flat table.
**Reference anchor**: Basecamp's warm, human-first register (already LIVE-verified in this project's roster) translated to an operations context — explicitly the register this project's own guide's §6 already argues is under-explored for "serious" products (Governing Principle 4's restraint-has-two-causes note).
**Risk**: grouping by driver instead of by urgency could bury a genuinely critical exception below several normal drivers' sections — a real usability risk to test directly, not just a style risk.

### Direction D — Expressive/Experimental: "Live Board"
**Concept**: the console leans into its real-time nature as the defining visual idea — state changes are the actual content, and the interface visibly shows *change itself* (an at-risk load visibly shifting state, a live-updating countdown to an appointment window) rather than being a static table a dispatcher must re-scan for changes.
**Structural difference**: a spatial/timeline-based layout (loads positioned along a literal time axis toward their appointment window) rather than a list or grid keyed to categories — reading path follows time left-to-right, not priority or grouping.
**Reference anchor**: Ramp's Bakken & Bæck-designed system (a real, sourced example of expressive-but-disciplined fintech design, single accent reserved for a specific semantic role — "where money moves," translated here to "where a deadline is closing").
**Risk**: the strongest risk of all four — a timeline metaphor could become the "signature move that doesn't survive the One-Screenshot Test" (§6) if it doesn't hold up with 40 real loads instead of 5, or on mobile.

## Stage 3 — Decision Table

| Criterion | A: Exception-First | B: Full Board | C: Shift Handoff | D: Live Board |
|---|---|---|---|---|
| Product fit | Strong — matches "know what needs a decision now" | Strong — matches experienced dispatchers' existing mental model | Moderate — good for handoff context, weaker for pure triage | Moderate — strong for the real-time framing, unproven for triage speed |
| Task clarity | High for the primary task, but hides context a dispatcher may want | High — nothing is hidden | Moderate — urgency can be buried within a driver's section | Moderate — time-axis reading is unfamiliar, real learning cost |
| Distinctiveness | Moderate | Low (closest to category convention) | Moderate-high | High |
| Cross-screen scalability (laptop/remote) | Strong (short list scales down easily) | Weak — a wide dense grid is the hardest of the four to make usable on a laptop | Moderate | Weak — a horizontal timeline is the hardest to reflow to narrow widths |
| Accessibility risk | Low | Moderate (dense grids are harder to make keyboard/screen-reader navigable) | Low | Moderate-high (spatial/timeline positioning needs a real non-visual equivalent) |
| Content resilience (real data extremes: 5 loads vs. 60 loads) | Strong — the whole point is filtering | Strong — built for exactly this | Moderate — many drivers could still create a long scroll | Weak until tested — untested whether 60 loads on one time axis stays legible |

All four are being built and rendered — per this project's own Governing Principle 11, a written decision table is not sufficient evidence on its own; each direction gets built, screenshotted at real widths, tested against realistic load counts, and reviewed blind before any of these Low/Moderate/Strong/Weak ratings are trusted.

## Asset Strategy (§3)

| Asset | Status | Notes |
|---|---|---|
| Logo/wordmark | Available | "Meridian" — a plain wordmark, no commissioned mark; this is a fictional exercise company, so a wordmark is used rather than inventing a fake polished logo mark, per the guide's own MUST-NOT-fabricate-a-pseudo-logo rule |
| Product imagery | Not required | Operational console has no product photography need |
| UI screenshots | N/A (this is the product) | |
| Real/representative data | Must-generate | Realistic load/driver/appointment data generated with real constraints (HOS limits, real-seeming dock windows, at least one genuine exception per variant) rather than idealized happy-path data only, per §11 |
| Color tokens | Direction-specific | Each of the 4 variants gets its own token set, deliberately not sharing Mission Control's teal/dark defaults unless a direction specifically justifies reusing it |
| Typography | Direction-specific | To be selected per direction against `TYPOGRAPHY_RESEARCH.md` Part 6's 15-question framework, not reused from Mission Control by default (testing Default 3 — treating a prior build's choice as inherited authority) |
