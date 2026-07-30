# Taxonomy of Vibe-Coded Characteristics

Derived from the evidence in `RESEARCH_REPORT.md` and `CALIBRATION_CORPUS.md`, not from the pre-existing guide. Compared against the old framework at the end of this document.

The organizing idea, stated once so it doesn't need repeating at every tier: **no single signal in this taxonomy is sufficient evidence on its own.** Every tier below existed, in some form, before generative AI tooling — what's new is that AI tools reproduce the *average* of these patterns fluently and cheaply, which is why combinations and content-realism matter more than any individual pattern's presence.

---

## Tier 1: Surface signals (weakest evidence alone)

Visual/stylistic patterns that are individually common in both genuinely good and genuinely generic work.

- Rounded cards, small uniform border-radius
- Purple-to-blue gradients ("the AI Purple Problem" — [SEARCH], indiehackers.com)
- Inter/system-default sans-serif with no distinct display face
- Outline icon sets from a common library, used decoratively
- Glassmorphism, noise/grain texture, soft shadows
- Opacity-fade hover states with no other state change
- Negative letter-spacing on headings ("tracking-tight")
- Bento-grid layout
- Corner-bracket / "sci-fi HUD" framing devices around diagrams — **[OWN, verified]** this project's own most recent finding: a device added *specifically to avoid genericness* was independently flagged by a blind reviewer as itself a generic AI-generation signifier

**Why weak alone:** every item on this list is used constantly by good, human-authored, intentional design. A gradient is not a defect; an unexamined gradient is. Tier 1 signals only become meaningful evidence in combination (Tier 7) or when a reviewer can show the specific element carries no informational or functional weight relative to its visual prominence.

## Tier 2: Structural signals

Page- and product-architecture patterns.

- Hero → logo bar → 3-4 feature cards → testimonial → pricing → FAQ → CTA (marketing sites)
- Header metrics row → chart grid → data table (dashboards)
- Sidebar + top bar + cards + table + modal, with no domain-specific structure
- Every content group expressed as a rectangular card regardless of what it actually is
- Identical section rhythm top-to-bottom (same padding, same border treatment, same heading style, every section)

**Why weaker than commonly assumed:** [SEARCH] confirms the SaaS hero/features/testimonial/pricing/FAQ shape is the *converting, industry-standard* structure, predating AI tooling by years (unbounce.com, fibr.ai). Structural conformity alone is closer to no evidence than to strong evidence. **The actual test is the Product Swap Test** (already in the existing guide, §20): could this exact structure, with only labels/colors changed, serve an unrelated product? If yes regardless of shape, that's the real signal — not the shape's mere existence.

## Tier 3: Product signals

Whether the interface reflects real product/domain understanding.

- Domain terminology, relevant icons, plausible sample data, industry-colored palette present — **but** no real workflows, operational constraints, edge cases, or task sequences underneath (the "themed vs. modeled" distinction — [SEARCH], marketmedianews.com: "audiences judge believability through the content, not the chrome")
- Every screen/state shown is the ideal/happy-path state; no partial completion, no errors, no permission boundaries, no exceptions modeled ([SEARCH], modus.medium.com on happy-path design; designlikeyoumeanit.com on edge cases)
- Real vendor-documented complexity absent: proration/billing edge cases, legacy/grandfathered states, permission nuance ([SEARCH], kinde.com, zuora.com, wix-ux.com's permissions case study)

**Why this is a stronger tier than Tier 1/2:** this is where the research found the most authoritative, citable sourcing (NN/g, FTC, real vendor documentation) — content/operational fidelity is a harder, more diagnostic signal than any visual choice.

## Tier 4: Content signals

- Generic value propositions, interchangeable across products ([SEARCH], go.sandler.com: value props that are "corporate wallpaper")
- Fake or unverifiable testimonials, metrics, logos — a pattern serious enough that the FTC issued a 2024 rule specifically banning fake AI-generated reviews/testimonials ([SEARCH], Sidley Austin, Harvard Tagteam)
- Repeated sentence-structure tics documented as AI writing tells: mechanical "rule of three" triads used far more densely than human writers would ([SEARCH], gptzero.me, refine.so), generic openers ("In today's fast-paced world..."). **Caveat:** the specific em-dash tell is contested, not settled ([SEARCH], Rolling Stone vs. salt.agency directly disagree) — treat individual stylistic tics as weak/contested evidence, not proof.
- Content that exists to complete a layout section rather than serve a stated user need

## Tier 5: Interaction signals

- Hover states that change only opacity, with no other state change ("hover states that do nothing" — a named AI-interface tell, corroborated this session by this project's own round-1 Perigee button finding)
- Motion applied uniformly regardless of purpose (every card fades in, every hover moves) rather than reserved for moments that matter
- Focus/keyboard/reduced-motion behavior either absent or present-but-untested (a mechanical, not aesthetic, signal — but one that correlates with unexamined-default shipping)

## Tier 6: Production-realism signals

The newest tier relative to the prior guide, and per the research the single most under-weighted category before this round.

- Does the interface show messy, real, awkward content: long strings, missing data, conflicting states, dense forms, legacy behavior — or only tidy default-length content?
- Cross-route coherence: does a distinctive idea established on the homepage/hero survive into settings, forms, empty states, and mobile — or does the product "revert to generic" the moment you leave the first viewport? (This project's own reasoning here is flagged **[OWN, inferred]** — the dedicated research pass on this specific pattern came back thin; see Research Report §4's honest gap note.)
- Does dynamic/computed state represent real, authoritative information (correct timezone, correct permission state, correct availability) rather than a plausible-looking placeholder?

## Tier 7: Strong signal combinations

Per the Signal-Combination Model this taxonomy exists partly to justify: individual Tier 1-2 signals are weak, but specific combinations are named, repeatedly and independently, as strong composite evidence:

- **The canonical "AI slop" cluster** ([SEARCH], convergent across 925studios.co, axe-web.com, developersdigest.tech): purple/blue gradient + Inter/system font + 3-4 card feature grid + generic stock/abstract-3D imagery + identical padding/radius throughout + generic value-prop copy. No single element of this cluster is damning; the full cluster, together, is what the discourse actually means by "AI slop."
- **The shadcn-default cluster**: default shadcn component shapes + default spacing + a swapped accent color + no structural composition beyond the library's own demo layout + a hero/feature/CTA structure with interchangeable copy. ([SEARCH], Design Systems Collective: "shadcn is not the problem—shadcn defaults are the problem" — i.e., the library plus zero de-defaulting effort is the cluster, not the library alone.)
- **The "hollow decoration" cluster** (this project's own newly-surfaced pattern): a technical-looking visual device (HUD brackets, a data-looking diagram) + a stated rationale connecting it to a "thesis" + near-zero actual information content behind the device. The rationale's existence is not exculpatory; per this session's blind review, reviewers read straight through it to the information-density problem underneath.

## Tier 8: Legitimate exceptions (per-signal, not blanket)

The taxonomy's discipline requirement: every tier above has a documented case where the same surface pattern is *correct*, not a smell.

- Dense card/metric grids: correct for professional dashboards (trading, ops) where users scan for anomaly-by-contrast — already established in this guide's round-2 practical simulation.
- Hero/features/pricing/FAQ structure: correct and converting when content within each section is genuinely product-specific (structure isn't the smell; content interchangeability is).
- Staying recognizably close to a component library's defaults: correct for internal tools where user familiarity across a dozen similar tools is the actual usability win (already established in this guide, §16's exception).
- Visual restraint/minimalism: correct when instrumented to a stated, verifiable purpose (GOV.UK — [SEARCH], "user need and convenience... not the needs of government") — the failure mode is restraint with no stated purpose beyond "avoid looking AI-generated," not restraint itself.
- Plain, visually unimpressive interfaces: correct when the product's actual value is speed/trust/familiarity over visual investment (Craigslist — [SEARCH], "subverting the Aesthetic-Usability Effect" as a documented, successful strategy for two decades).

---

## Comparison with the old framework

The prior `ANTI_VIBE_CODING_UI.md` (pre-this-round) had extensive Tier 1/2 machinery (the pattern catalog in old §4, component-library de-defaulting in old §16) and comparatively little Tier 3/6/7/8 machinery. Concretely:

- **Old strength, confirmed correct by this research:** the existing Product Swap Test, Authentic Detail Test, and Operational Truth Test (added after the round-3 bike-shop practical test) already targeted Tier 3/6 concerns correctly — this research corroborates rather than replaces them. They were previously under-emphasized relative to the pattern catalog, not wrong.
- **Old gap #1:** no Signal-Combination Model — every pattern was evaluated (and could be individually banned or required) in isolation, which both overpunishes legitimate Tier 1 use and underweights the combinations that actually drive perception.
- **Old gap #2:** almost no machinery for defensive/hollow restraint (Tier 8's minimalism exception implies its inverse — hollow minimalism — but the old guide never named or tested for it directly; Governing Principle 4's blandness note gestured at it without a mechanism).
- **Old gap #3:** self-review and independent-review requirements existed (Governing Principle 9, §19) but were never actually exercised with real blind image review until this round — the mechanism was correct on paper and unused in practice.
- **Old gap #4 (the most consequential one, per this round's direct evidence):** no check for "was this decoration/motif added because it was reachable, or because the content earned it" — which is precisely how the bracket-motif regression happened one turn before this research began.
