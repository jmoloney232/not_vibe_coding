# Perigee Mission Operations Console

A practical test of `ANTI_VIBE_CODING_UI.md`, built to close a gap the guide's own
research has flagged three separate times (Appendix C, Appendix F's round-3 entry,
Appendix J): every prior practical test (the bike shop, the Perigee marketing
landing page) was a simple, mostly-static, single-purpose marketing page. Nothing
had tested the guide against a denser, stateful, multi-route application — the
product type §3's own table calls out as having the highest cost of getting density,
motion, and color wrong ("Data-heavy dashboard... Decorative charts and metric cards
with no decision attached" as the named failure mode).

This is a fictional internal tool for Perigee (the same fictional orbital-manufacturing
company from this project's earlier landing-page example) — the tool its own mission
operations engineers would use to monitor active capsules, not the public-facing site
that markets the company. Three real routes:

- `fleet.html` — Fleet Overview: every active capsule, sorted attention-first
- `capsule.html?id=…` — Capsule Detail: full telemetry, anomaly/gap state, manifest
- `manifest.html` — Manifest & Schedule: upcoming deorbit/reentry windows

## Running it

Any static file server works, e.g.:

```
npx http-server . -p 8834
# then open http://127.0.0.1:8834/fleet.html
```

No build step, no dependencies — plain HTML/CSS/JS, deliberately proportional to a
three-page example (§5's Proportionality section).

## What this deliberately does differently from the prior marketing-page examples

- **Dark-native, not toggleable.** Justified per §5's Feature Prioritization test
  (extended-session, repeatedly-used, monitoring-context tool) rather than built
  reflexively or omitted reflexively.
- **No dramatic type, no negative tracking.** §8's own table already distinguishes
  marketing pages (can use looser tracking for impact) from application interfaces
  (should favor restraint and legibility) — this is a real, non-reflexive application
  of that distinction, not a ban. Round 7's live evidence (`research/INTERFACE_STUDY_RECORDS.md`)
  found negative tracking on marketing hero type at Stripe/Linear/Basecamp/Varda; this
  product deliberately doesn't use it, because it's the other product type in that
  same table row, not because the value range is inherently bad.
- **Three decision-relevant summary tiles, not a metric wall.** Every number on the
  Fleet Overview page changes what a viewer does next (§4.3's ceiling and its "what
  does the user do differently if this number is high vs. low" test) — no metric
  wall assembled because dashboards "should have some stats."
- **A real correctness bug deliberately exercised and fixed the right way.** §11's
  chief example of dynamic-state correctness is a business-hours indicator computed
  from the visitor's own clock instead of the business's timezone. This build's
  equivalent live value is "time since last telemetry" — computed from a real
  reference `Date` at load time, updated on an interval against real current time,
  displayed in UTC ("Zulu," the actual authoritative time reference mission ops
  uses) alongside the relative age, with genuine stale/lost thresholds. Verified live
  with Playwright, not just read as correct in the source.
- **Non-ideal states are load-bearing, not decorative.** An active anomaly (a thermal
  sensor reading outside nominal band, with a stated owner and an honest "fault not
  yet ruled out" — not a fabricated confident diagnosis), a telemetry gap explicitly
  modeled as a *different kind of state* than an anomaly (a known ground-station
  coverage gap, not a vehicle fault — §11's distinction between unavailable and
  erroneous data), an empty/unassigned manifest slot, a real "capsule not found"
  state for an unmatched URL parameter, and a recovered capsule that correctly has
  *no* live telemetry section at all rather than a broken/frozen one — real domain
  modeling, not a UI that only ever shows the tidy case.

## What self-review and build-time testing actually caught

Documented honestly rather than only claiming success, per Governing Principle 9 and
the Uncertainty Requirement (§19). Same-session self-review and automated checks
caught real, concrete defects — this is direct evidence for this project's own
repeated finding that a same-author process, even a careful one, is not a substitute
for independent review, not a claim that self-review is worthless:

1. **A real cross-width bug**, caught only by screenshotting every route at three
   widths, not just eyeballing desktop: hold-status schedule items showed a "Caution"
   badge twice (once inline in the hold-reason text, once as the row's trailing status
   pill) — redundant at 1440px, visibly broken (two identical badges stacked) at 834px.
   Fixed by removing the inline badge and keeping only the row's one trailing pill.
2. **An inconsistent status-color mapping**, caught by re-reading the rendered fleet
   table rather than just the CSS source: both "anomaly" and "caution" fleet rows
   shared one red-tinted `.row-attention` class, so a caution (amber) row was tinted
   red like an anomaly row. Split into `.row-anomaly` / `.row-caution` with matching
   tint colors.
3. **A missing focus-visible style**, caught by an automated Tab-order script, not by
   looking at the page: the skip link (the very first Tab stop on every page) fell
   back to the browser's default outline instead of this product's own consistent
   focus ring, breaking the "one consistent, high-contrast treatment" requirement
   (§5's token table) at the one place a keyboard user encounters first.
4. **Contrast was verified with an actual calculation, not eyeballed** (§9's explicit
   requirement) — both the base palette before writing any CSS, and again against the
   real rendered, alpha-blended status-pill backgrounds after building (the blended
   background differs from the flat semantic color once `color-mix()` opacity is
   accounted for; the lowest measured pair, the muted "Recovered" pill, still clears
   AA at 4.64:1).

## What one blind review caught that self-review didn't

A fresh subagent, given only four screenshots and zero framing, rationale, or shared
context — matching this project's established Blind Review Requirement methodology —
found real problems the build/self-review process above had missed entirely. In its
own words, rating: **4/5** on specificity ("not a 5... the shell is standard dark-SaaS
[but] the specificity lives almost entirely in the copy and the data, not in the
interface"), and **medium confidence** that this was human-considered rather than
AI-generated ("what tips me toward *considered* is the negative space... but it reads
as an authored narrative demo rather than a working tool"). The single most important
finding:

- **A real data-modeling bug, caught by comparing timestamps across screenshots.**
  The build originally stored each capsule's telemetry age as "minutes before the
  page loads" and derived a fake absolute timestamp from that offset on every load —
  so the *same real event* showed a different absolute UTC time in each of the three
  screenshots the reviewer was given (`23:30:34Z`, `23:30:37Z`, `23:30:36Z` for the
  same capsule). This is exactly the class of bug §11 exists to prevent (a confidently
  displayed value that's wrong, not merely a missing one) — and it slipped past this
  build's own Playwright verification because that verification checked that values
  rendered and updated, not that the same real event stayed consistent across
  independent page loads. **Fixed at the data-model level**, not patched: `data.js`
  now stores a fixed ISO 8601 timestamp per real event (an actual instant, e.g.
  `"2026-07-31T00:48:53Z"`), and `app.js` computes the relative age FROM that fixed
  source of truth against the real current time — verified fixed by loading the same
  page twice, four seconds apart, and confirming the absolute timestamp is now
  byte-identical both times while the relative age still advances correctly.

Other findings, triaged and either fixed or explicitly deferred rather than silently
dropped (§22's severity framework, applied honestly):

- **Fixed:** an unbacked "updated live" claim in the page subtitle (§11 prohibits
  claiming real-time accuracy the UI can't back up) and an inaccurate "6 capsules
  across active phases" count (one of the six is Recovered, not active) — both
  reworded to state only what's actually true.
- **Fixed:** a schedule hold on PGE-007 was visible on the Manifest page but invisible
  in the Fleet table — the primary screen a controller would actually be scanning.
  Added a row-level `⏸ hold` indicator cross-referencing the schedule data, so a
  hold is visible from the one place someone is actually looking.
- **Fixed:** the anomaly's thermal reading was presented as a single instantaneous
  number with no way to tell "is it rising, flat, or oscillating" — identified as the
  single biggest functional gap ("the entire question a thermal controller has... is
  unanswerable here"). Added a real ten-point trend chart (inline SVG, hand-authored
  data consistent with the anomaly's own "4.2°C above nominal for 40 minutes" text,
  a drawn nominal-ceiling reference line) — a chart that answers an actual question,
  not a decorative one (§10's chart requirement).
- **Fixed:** an hour-plus-old "Caution"/opacity-fade-adjacent double-affordance on the
  back button (a bordered `.btn` anchor was also picking up the browser's default
  anchor underline) and a hold-reason paragraph that colored 40 words of body text
  amber when only the "Hold reason:" label needed the emphasis (reduces legibility;
  spends the alert color on prose instead of reserving it).
- **Fixed:** capsule IDs wrapped mid-identifier ("PGE-" / "014") on mobile.
- **A second bug this fix introduced, caught immediately by re-screenshotting rather
  than assumed fixed:** making the "landed" row reuse the same live-age widget as
  active telemetry meant the recovered capsule's 10-hour-old landing time inherited
  the "stale/lost" alert coloring meant for a vehicle that should be talking to
  mission control and isn't — a false alarm on a capsule that is supposed to have no
  more telemetry by design. Fixed by adding an explicit `alert: false` mode to the
  age widget for cases where "old" doesn't mean "wrong."
- **Deferred, stated honestly rather than fixed cosmetically:** the reviewer's
  critique that the first two KPI tiles ("In Flight," "Needs Attention") don't
  individually earn their space as well as the third ("On hold") is a fair, arguable
  design judgment call, not a bug — left as-is rather than cut, since both still pass
  §4.3's "does this number change what the user does next" test, just less sharply
  than the third. The reviewer's broader critique that the mobile fleet table is a
  shrunk desktop table rather than a real mobile layout (card-based, not six columns)
  is accurate and not fixed here — a full mobile redesign of the table was judged out
  of scope for what this practical test needed to demonstrate; the concrete wrapping
  bug it produced (item above) was fixed, the underlying layout approach was not
  redesigned.

## What this has not validated

- **No independent human review yet** — only a same-session self-critique and one
  blind AI subagent review. Per Appendix C's standing caveat, a second AI reviewer is
  real evidence for structural/mechanical findings (and this round's is exactly that
  — a real data bug, a real cross-width bug, a real accessibility gap) but weaker
  evidence for taste/specificity judgments, since it may share correlated priors with
  the agent that built the thing.
- **No real users.** The anomaly, the telemetry gap, and the schedule hold are
  plausible, specific, internally consistent invented operational texture (per §3's
  "necessary complexity" guidance: invented to exercise the interface, not presented
  as fact about a real entity) — not validated against how a real mission-ops team's
  actual workflows and priorities differ from this build's assumptions.
- **One product, one team size.** This is still a single data point on a single dense
  product type, the same limitation every prior practical test in this project has
  carried individually — it closes the "never tested a dashboard/app" gap, but a
  denser multi-tenant or genuinely large-scale product (hundreds of capsules, not six)
  would stress proportionality and information-architecture tradeoffs this build
  never had to make.
