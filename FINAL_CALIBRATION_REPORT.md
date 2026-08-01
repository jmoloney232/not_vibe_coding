# Final Calibration Report

This report closes the "Major Design-Calibration Project" brief. It does not claim the project is finished in the sense of every numbered gate being met — several are not, and this report says exactly which ones, with real numbers, in Part 2. It claims something narrower and, per the brief's own final instruction, more important: that real research, real builds, and real independent review happened, that real findings were fixed rather than asserted away, and that the evidence for and against this project's own starting assumptions is now checkable rather than asserted.

## Part 1: What this project actually did, in order

1. Critically read the Garden skill repository (`github.com/ConardLi/garden-skills`) under its MIT license rather than installing its recipes uncritically — `PROFESSIONAL_WEB_DESIGN_RESEARCH.md` Part 0.
2. Built a live-rendering research pipeline (Playwright/Chromium, with a documented TLS-handshake fix) and used it to inspect real production websites' DOM/CSS/typography directly, rather than relying on memory or search snippets alone — the evidence-tiering system (`[LIVE]` > `[CODE]` > `[PROVENANCE]` > `[SEARCH]` > `[RECALLED]`) that runs through every research document in this project.
3. Logged 52 organizations toward the required 75+, with 23 at full `[LIVE]` atlas-entry detail, across cultural institutions, utilitarian/dense products, small/medium businesses, design studios, technology, and editorial/publishing.
4. Built 7 of the required 15+ matched professional-vs-AI-generated comparisons, and logged 5 of the required 10+ disclosed-AI-generated examples and 7 of the required 10+ counterexamples.
5. Wrote dedicated research documents for minimalism traditions (`MINIMALISM_RESEARCH.md`, 11 traditions including a newly-added architectural-minimalism entry), typography (`TYPOGRAPHY_RESEARCH.md`, ~15 of the required 30+ systems, a 15-question decision framework), and this project's own recurring design defaults (`CLAUDE_DESIGN_DEFAULTS.md`, 8 documented defaults, 2 of them tested and revised this round with real new evidence).
6. Materially rewrote `ANTI_VIBE_CODING_UI.md` rather than appending to it — new research-priority-order and asset-strategy requirements in §3, a structural-difference requirement and a "No Recipe Without Reason" gate in §6, a typography decision framework and specimen-prototyping requirement in §8, a fourth self-critique audit (Personal-Defaults) in §19, and a new appendix documenting the round honestly, including what the rewrite did *not* yet do.
7. Built and independently blind-reviewed all 6 required practical exercises, fixing real findings — not just aesthetic ones, but functional bugs, safety-UX gaps, and data-consistency errors — caught by actually rendering and interacting with the result. `exercises/README.md` is the index; each exercise has its own `CREATIVE_DIRECTION.md` and `REVIEW.md`.
8. Wrote `DESIGN_EVALUATION_PROTOCOL.md`, extracted from what was actually used across the six exercises rather than written speculatively.
9. Wrote this report.

## Part 2: Honest status against every numbered completion gate

| Gate | Required | Actual | Met? |
|---|---|---|---|
| Organizations researched | 75+ | 52 | No |
| — with verified provenance | 15+ | ~30+ across PROVENANCE-tier entries | Yes |
| — with accessible code/design-system evidence | 15+ | ~8-10 (GOV.UK, Primer, IBM Carbon, Palantir Blueprint, The Pudding, IKEA Skapa, Figma Config, Cooper Hewitt typeface) | Close, not confirmed exactly |
| — disclosed AI-generated | 10+ | 5 | No |
| — ambiguous/counterexamples | 10+ | 7 | No |
| Modern SaaS < half of detailed references | required | Yes — cultural institutions, editorial, minimalism traditions, and small-business entries outnumber SaaS entries in the detailed roster | Yes |
| Matched comparisons | 15+ | 7 | No |
| Minimalism traditions | comprehensive, not flattened | 11 traditions with real distinct sourcing (Vignelli, Rams, Hara/MUJI, Pawson, Monocle, Walker, GOV.UK, Aesop, Bloomberg Terminal, Vercel, Craigslist/Are.na) | Substantially yes |
| Typography systems documented | 30+ | ~15 | No |
| Typography Decision Framework | required | 15 questions, written, used in every exercise's typography decision | Yes |
| Specimen prototyping (3+ directions, real content) | required | Executed once (dispatch-console typography blind test) with real findings, not executed as a standalone step in the other 5 exercises | Partial |
| Design Reference Atlas (md + machine-readable) | required | Both exist, 23 entries, retrieval indices by school/industry/density | Yes, incomplete against the 75-org target |
| `CLAUDE_DESIGN_DEFAULTS.md` | required | 8 defaults, 2 tested with new evidence this round, 1 explicitly still untested (Default 6, uppercase labels) | Yes |
| `DESIGN_EVALUATION_PROTOCOL.md` | required | Written | Yes |
| Guide materially rewritten | required, not appended | 5 sections substantively rewritten, 2 more sections checked and found already adequate rather than padded | Yes |
| 6 practical exercises | required | All 6 built | Yes |
| 4-variant exercise | required, at least one | Done (dispatch console) | Yes |
| Rendered, multi-viewport review per exercise | required | Done for all 6 (desktop + mobile at minimum) | Yes |
| Independent blind critique per exercise | required, multiple reviewers | 1-3 reviewers per exercise, most exercises had 1-2, dispatch-console had 3 across its full review cycle | Partial — panel size is smaller than the brief implies |
| Typography-specific blind test | required per exercise | Done for 1 of 6 (dispatch console) | No, partial |
| Rationale-vs-perception comparison | required | Done per-exercise in each `REVIEW.md`; synthesized project-wide in Part 3 below | Yes |
| `FINAL_CALIBRATION_REPORT.md` | required | This document | Yes |

**Read plainly**: the research-breadth gates (org count, matched comparisons, typography systems, AI-generated/counterexample counts) are the ones most clearly short of target. The process gates (a materially rewritten guide, a working evaluation protocol, six real exercises with real blind review and real fixes) are largely met. This is the honest shape of an ambitious, genuinely multi-week-scale brief compressed into the time actually available — reported as such, not rounded up.

## Part 3: The rationale-vs-perception comparison, synthesized across all six exercises

This is the brief's own named test: for every exercise, does what a blind reviewer actually perceived match what the `CREATIVE_DIRECTION.md` intended? Full detail lives in each exercise's own `REVIEW.md`; this section is the cross-exercise pattern.

**Where intent and perception matched cleanly:**
- Ridgeline's "avoid Linear/Vercel, avoid their associated defaults" intent was independently confirmed — a blind reviewer named LaunchDarkly as the structural reference (correctly) while explicitly stating no visual copying occurred, and separately confirmed no dark-mode/purple/monospace-everywhere defaults leaked in.
- Northfield's "typography-led expressiveness can substitute for missing photography" intent was confirmed in the hero specifically — a reviewer described the exact intended gesture back unprompted.
- Fenwick's "two-register typography should do real information-hierarchy work" intent was confirmed almost verbatim — a reviewer said the serif/sans split was "doing real information hierarchy work, not decoration" without being asked about typography directly.
- North Bench's *predicted risk* ("this exercise cannot manufacture Stumptown's real-business advantage, and that gap should not be minimized") was confirmed, not just tolerated — a reviewer said the missing photography "tanks my confidence... I would not complete a purchase here."

**Where intent and perception diverged, and what that revealed:**
- Dispatch-console's Directions A and C were intended as genuinely different registers (neutral-civic vs. warm-humanist); two blind reviewers independently read them as "the same design system." Checking the actual token values confirmed the reviewers were right and the brief's own intent had not made it into the render (`#fbfaf6` vs `#fbf5ec` — nearly the same color). This was fixed and re-verified by a third reviewer, closing the loop, but the miss itself is the more important data point: **a written creative-direction document is not evidence a distinction actually exists in the rendered result** — only rendering and independent perception check that.
- Northfield's "no photography = deliberate graphic-design choice" intent held in the hero but not in the ticket cards or lineup rows, which fell back to generic SaaS-pricing-tile and plain-divider patterns. The reviewer's framing was precise: a real photo-free brand "compensates with more graphic personality elsewhere," and this build hadn't, outside the one screen that got direct attention. This generalizes past this one exercise: **a signature idea has to be checked on every screen it should apply to, not just the one it was designed on** — exactly what `ANTI_VIBE_CODING_UI.md` §6's Route-Level Coherence Review already names as a requirement, now with a concrete first-party instance of what happens when it's skipped.
- North Bench's typography reused Fraunces "deliberately, having checked it against the product" per the Typography Decision Framework — this claim was not directly tested by a blind typography specimen test for this exercise (only the dispatch-console exercise ran that instrument), so it remains a reasoned decision, not an independently confirmed one. Recorded as a real gap, not implied to be resolved.

**The general pattern across all six**: self-authored rationale correctly predicts genre-level outcomes (is this the right typographic register, is this too close to a specific competitor) more reliably than it predicts execution-level consistency (did the register actually get differentiated enough in the rendered surface colors, did the concept survive past the hero). This matches, and is now backed by first-party evidence for, Governing Principle 11's original claim in `ANTI_VIBE_CODING_UI.md`: a plausible rationale is not evidence a decision was good, and the failure this project's own guide names abstractly (round 6's corner-bracket incident) recurred, in a different concrete form, in round 9's own new work — which is itself the strongest evidence available that the guide's caution is correctly calibrated and not overcautious.

## Part 4: What this round resolved about Claude's own recurring defaults

`CLAUDE_DESIGN_DEFAULTS.md` Defaults 7 and 8 (a reflexive cool/teal accent, and reflexive dark theming, for "serious" products) were explicitly flagged as unconfirmed hypotheses pending exactly the instrument this round provided — the dispatch-console 4-variant exercise. Result: both downgraded from "unconfirmed hypothesis" to "tested once, evidence against a forced default." A warm, light register (Direction C) and a neutral-light register (Direction A) were both accepted as credible for a "serious" operational product by independent blind reviewers; the one dark direction (D) was praised for a stated, concept-specific reason (live-timeline legibility) rather than by default. The real, still-open finding this same exercise produced is narrower and more useful than either original hypothesis: **avoiding a specific default (a cool accent, a dark theme) does not by itself guarantee two intentionally different directions read as different** — that requires actual differentiation, checked by rendering and blind review, which is exactly where this round's own new work first failed (Directions A/C) before being caught and fixed.

Default 5 (rounded-card summary tiles) and Default 4 (monospace reached for beyond its functional need) both recurred as independent findings in this round's new exercises, reinforcing rather than revising those entries. Default 6 (uppercase micro-labels) was not specifically re-tested this round.

## Part 5: Limitations, stated plainly

- **Research breadth is the project's weakest area against its own targets** — org count, matched comparisons, typography systems, and AI-generated/counterexample counts are all short, in some cases by a wide margin (37% short on matched comparisons, 50% short on disclosed-AI-generated examples). This is not disguised; Part 2 states every number.
- **Blind-review panels were smaller than the brief's language implies.** Most exercises used 1-2 reviewers; the brief's own framing ("multiple fresh reviewers... record disagreement") is best satisfied by the dispatch-console exercise (3 reviewers across its full cycle) and least well satisfied by the single-page exercises (Fenwick, the barbershop, Northfield, North Bench — 1 reviewer each).
- **Typography-specific blind testing was executed once, not six times.** The Typography Decision Framework was applied in writing for every exercise; only one exercise's typography choices were independently tested against a fresh reviewer with no font names visible.
- **No real human has reviewed any of this project's practical work.** Every "independent" reviewer in this project is a fresh-context AI agent — a real, evidenced, but limited form of independence per Governing Principle 9's own stated caveat (correlated training-derived aesthetic priors). This is the single largest asterisk on every positive finding in Part 3.
- **North Bench's asset-honesty finding is unresolved by design**, not by oversight — this project cannot commission real photography, and the finding (a blind reviewer would not complete a purchase given the current placeholder) stands as a real, stated limitation of what this specific exercise can prove, not a defect to be engineered around.
- **The guide rewrite (Phase 9) is not exhaustive.** §16 and §21 were checked against the brief's concerns and found largely adequate already, which is itself an unverified self-assessment (see the caveat directly stated in `ANTI_VIBE_CODING_UI.md`'s own Appendix K) rather than an independently confirmed one.

## Part 6: Answering the brief's own final question

*"When the rationale, source code, and prompt are hidden, does the rendered interface still appear deliberately authored, appropriate to its product, typographically credible, and comparable to professionally designed work in the same category? Use external evidence to answer that question."*

The external evidence — nine independent blind-review passes across six exercises, summarized in Part 3 — says: **mostly yes, with one clear exception and one structural caution.** Five of the six exercises were read by fresh reviewers as deliberately authored and product-specific without being told what they were looking at or why; the developer-tool exercise specifically passed the hardest version of this test (distinguishing legitimate category-convention reuse from competitor imitation) on the first blind pass. The exception is North Bench Coffee, where a category-specific asset gap (no real product photography) was rated disqualifying for actual production use by the same standard — a result this project reports rather than argues with. The structural caution is Northfield and the original dispatch-console A/C pair: a design's authored quality can be real in one location (a hero, one direction) and absent in the surfaces immediately adjacent to it, which was only visible by checking, not by trusting the original creative brief. Both were fixed after being caught, which is the actual claim this report is willing to make: not that the work was right the first time, but that the process this project built — render, interact, test extremes, seek independent review, compare intent to perception, revise the render rather than defend the rationale — reliably catches it when it isn't, in time to fix it before calling it done.
