# Creative Direction — Ridgeline (feature-flag & rollout platform)

Practical Exercise 6 (Developer/technical product), built under the revised `ANTI_VIBE_CODING_UI.md` §3/§6 process. This is the exercise the calibration brief names most specifically: avoid imitating Linear or Vercel, and avoid reflexively reaching for dark mode, monospace-everywhere "technical" chips, or a purple accent unless each is actually justified by the product.

## Product Brief (§3)

- **What the product does**: a feature-flag and gradual-rollout platform for engineering teams — create flags, target them to user segments, control rollout percentage, and see basic before/after metrics.
- **Primary users**: backend/full-stack engineers (create and configure flags), plus product managers checking rollout status without touching code.
- **Primary task**: quickly see which flags are live, at what rollout percentage, and change that percentage with confidence (a wrong flag change can break production).
- **Usage context**: occasional, task-focused visits — not a continuously-monitored screen like the dispatch console. Sessions are short: "check this flag, change this number, leave."

## Why not Linear or Vercel, specifically (the brief's own named risk)

Both are extremely well-documented in this project's own research (`PROFESSIONAL_WEB_DESIGN_RESEARCH.md`, `design-reference-atlas.json`) and both are genuinely excellent, which is exactly why they're dangerous defaults — a developer-tool brief reflexively pulls toward "Linear's owned purple + dark sidebar" or "Vercel's stark black-and-white + extreme negative tracking" because they're the most available, most repeated reference in this category, not because either is actually the right answer for *this* product. Applying "No Recipe Without Reason" to both, explicitly:
- **Linear**: real attribute worth naming — a single owned accent color used with total discipline (Governing Principle 4's own repeated example). Does it transfer? The *discipline* (one accent, reserved for meaning) transfers; the *specific purple hue* does not — there's no product reason Ridgeline needs Linear's exact color, and copying it would be recognizable imitation with zero translation, exactly what Stage 7 of §6 forbids.
- **Vercel**: real attribute worth naming — extreme monochrome restraint and confident negative tracking on a geometric sans. Does it transfer? Ridgeline's actual task (glancing at a rollout percentage and making a quick, low-error change) needs clearer state differentiation than a near-monochrome palette gives for free — the attribute doesn't fit this product's task shape, so it's rejected on product grounds, not merely to avoid resemblance.
- **Real anchors used instead**: IBM Carbon Design System (`design-reference-atlas.json` — real enterprise cross-functional design-system discipline, public repo), Figma's Config identity (`PROFESSIONAL_WEB_DESIGN_RESEARCH.md` Part 2 — a design system deriving its shape language from the product's *own* toolbar primitives rather than an imported decoration, directly translatable here: Ridgeline's own core object is a percentage/toggle, which can generate its own visual language rather than borrowing one), GOV.UK (restraint justified by a stated user need — here, "don't let a misread number cause a bad production change" is a real, stated reason for restraint, not a defensive one).

## Testing this project's own defaults directly

- **Dark mode**: `CLAUDE_DESIGN_DEFAULTS.md` Default 8 was already downgraded by the dispatch-console exercise's evidence, but that exercise's dark direction (D) had a stated, product-specific reason (live control-room legibility). Ridgeline has no equivalent reason — task-focused, short sessions, both engineers and PMs, often checked in normal daylight office conditions. **Selected: light theme**, specifically because the default-8 justification doesn't apply here, not because dark is wrong in general.
- **Monospace-as-a-credibility-signal**: `ANTI_VIBE_CODING_UI.md` §4.4 and this project's own Default 4 (`CLAUDE_DESIGN_DEFAULTS.md`) both flag monospace reached for "because it reads as technical" without a tabular/real-data reason. Ridgeline's flag *keys* (e.g., `checkout_v2_rollout`) are genuinely code-identifier content — monospace there is earned. Rollout percentages benefit from tabular-nums for scanning. Everything else (labels, descriptions, nav) stays in the UI sans — checked per-element, not applied as a page-wide "developer tool" costume.
- **Purple accent**: no product reason found for purple specifically. **Selected accent: a warm amber/gold**, chosen for a stated reason below (see Color Direction), not swapped in merely to avoid purple — avoiding one unexamined default by landing on a different unexamined default would be the same failure in a new color.

## Stage 2 — Three Structurally Different Directions

### Direction A — "Percentage-First": the rollout number is the entire visual system
**Concept**: every flag's row is organized around one large, immediately legible number (the rollout percentage) — the number *is* the primary visual element, not a small stat buried in a row of equal-weight metadata.
**Structural difference**: a flag list where percentage is rendered as a large proportional visual (not just a numeral) leading each row, flag key/description subordinate beside it.
**Reference anchor**: Figma Config's principle of deriving visual identity from the product's own primitive — here, the primitive is "a percentage," not a toolbar shape.
**Risk**: could overweight percentage relative to other real decision factors (which segments are targeted, when it was last changed).

### Direction B — "Environment-Grouped": flags organized by where they're live
**Concept**: flags grouped by deployment environment (Production / Staging / Development) as the primary structure, since "is this actually live in production" is often the first real question an engineer has.
**Structural difference**: three-column or tabbed environment grouping as the top-level structure, with percentage as one of several equal-weight fields per flag, not the lead visual.
**Reference anchor**: IBM Carbon's enterprise information-architecture discipline (organize around the real operational structure a team already uses, not an abstract visual hierarchy).
**Risk**: a flag live in multiple environments needs to appear multiple times or the grouping becomes misleading — a real structural cost to check.

### Direction C — "Change-Log-Led": the flag list is secondary to a log of recent changes
**Concept**: the primary view is "what changed recently and who changed it" (a real audit-log-first product decision, since the actual failure mode this product exists to prevent is an unreviewed, unexplained rollout change) — the flag list itself is one tab among several, not the landing view.
**Structural difference**: a chronological activity feed as the primary reading path, not a flag list or grid at all.
**Reference anchor**: GOV.UK's restraint-for-a-stated-reason discipline, applied to information priority rather than visual restraint — "what changed and why" is the actual user need this structure serves.
**Risk**: an engineer who just wants to check one specific flag's current state has to search/filter rather than scan — a real cost for the single most common task named in the brief.

## Stage 3 — Decision

| Criterion | A: Percentage-First | B: Environment-Grouped | C: Change-Log-Led |
|---|---|---|---|
| Product fit (primary task: check/change a flag's rollout) | Strong | Moderate | Weak |
| Task clarity | Strong — the number you came to check is the first thing you see | Moderate | Weak for the stated primary task |
| Distinctiveness | Moderate-strong | Moderate | Strong, but for a different task than the brief names as primary |
| Error-prevention (wrong flag change) | Strong — large, legible percentage reduces misread risk | Moderate | Weak — buries the number that matters most |
| Content resilience (many flags, many environments) | Needs a real test with 20+ flags | Handles multi-environment naturally | Handles high change-volume naturally |

**Selected: Direction A**, because it's the only direction whose structure is built around the brief's own stated primary task (quickly and confidently reading/changing a rollout percentage) rather than a secondary, real, but non-primary concern.

## Asset Strategy (§3)

| Asset | Status | Notes |
|---|---|---|
| Logo/wordmark | Available | Plain "Ridgeline" wordmark, no fabricated custom mark. |
| UI screenshots | N/A | This is the product being built. |
| Real/representative data | Must-generate | Realistic flag keys, descriptions, environments, rollout percentages, and a plausible last-changed history — tested against extremes (0%, 100%, a flag with no description, a very long flag key) per §11. |
| Color tokens | Direction-specific | Warm amber accent, justified below, not a purple/teal default. |
| Typography | Direction-specific | See Typography Decision below. |

## Typography Decision (§8, condensed)

- **UI/body**: a real, distinct sans not reused from any prior build in this project (Public Sans, IBM Plex Sans, Source Sans 3, Work Sans, Big Shoulders Text already used). Selected: **Inter** — deliberately re-examined rather than avoided reflexively: `TYPOGRAPHY_RESEARCH.md` Part 5 already establishes Inter is not disqualifying by itself (Linear itself uses Inter, checked and thesis-driven), and Ridgeline has a genuine reason to want a highly legible, dense-numeral-friendly UI face for scanning many percentages quickly — the question per the Decision Framework is whether the choice was examined, not whether the name appears on a list.
- **Flag keys / code identifiers only**: **JetBrains Mono** — reused from the dispatch-console Direction D, with the reuse reasoned explicitly (same functional need: real code-identifier content, not decoration) rather than defaulted to without checking.
- Both real, licensed, open (SIL OFL).

## Color Direction — the amber accent, stated reason

Amber/gold was selected specifically because rollout percentage is fundamentally a **gradient concept** (0% to 100%, "how far along is this"), and warm amber has a natural, real-world association with partial/in-progress states (a fuel gauge, a battery indicator, a progress bar) that a cool teal or purple doesn't carry the same way — a reason tied to what the product's core object *is*, not a preference or an attempt to simply avoid the two named competitors' colors.
