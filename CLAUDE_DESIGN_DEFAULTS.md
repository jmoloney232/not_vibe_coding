# Claude's Recurring Design Defaults

**Method**: this document is built from real, checkable evidence — actual code from this project's own three built examples (Harbor Cycle Works, the Perigee landing page across rounds 5–6, and Perigee Mission Control, round 8), actual blind-review transcripts already recorded in this repository, and a direct comparison between this project's own guide's illustrative examples and this project's own subsequent implementation choices. It is not a generic list of AI-writing-critique clichés applied to design without evidence — every entry below cites where it was actually observed.

---

## Default 1: Rationale-driven self-assessment, not perception-driven — the single best-evidenced habit in this entire project

**Evidence**: this exact failure has now been documented independently, three separate times, across three separate rounds of this same project:
- Round 5: a same-author build/review cycle (including this document's own Playwright verification suite) passed the Perigee landing page's default shadcn-style button and cliché negative-tracking headings. Only direct user critique of the *rendered page* caught it.
- Round 6: two blind reviewers, given zero context, independently flagged a corner-bracket framing device this project's own round-5 self-review had defended with an internally consistent rationale ("grounded in the Mission Control creative thesis"). The rationale was real, coherent, and wrong.
- Round 8: a blind subagent review caught a real data-modeling bug (a telemetry timestamp silently drifting across reloads) in Perigee Mission Control that this project's own automated Playwright verification suite — which checked that values rendered and updated — did not catch, because it never occurred to check whether the *same real event* stayed consistent across independent page loads.

**Why I default to it**: I can articulate a design rationale fluently and consistently, and a fluent, internally-consistent rationale *feels* like verification while I'm writing it. Self-critique, even when I follow my own guide's checklist rigorously, tends to check "does this satisfy the rule I just cited" rather than "what does a reader with zero access to my reasoning actually see."
**When it's appropriate to trust my own assessment**: mechanical/structural checks with an objective pass/fail (does this contrast ratio clear 4.5:1, does Tab order reach every control, does the console show errors) — self-review is genuinely reliable here, and this project's own evidence backs that (round-3's contrast fix, round-8's automated a11y checks all caught real issues via self-review).
**When it produces a real defect**: any claim about what a design *communicates*, *reads as*, or *implies* — exactly the category every one of the three documented incidents above falls into.
**How to detect it before shipping**: if I am about to write "this looks/reads/feels like X" without having shown the rendered artifact to a genuinely fresh reviewer, that sentence is a hypothesis, not a finding — flag it as such explicitly rather than stating it with the same confidence as a measured fact.
**Replacement process**: this project's existing Blind Review Requirement (Governing Principle 9) already exists specifically because of this pattern. The fix is not writing a better rationale — it is treating any perception-level claim as unverified until an independent, context-free look confirms it, every time, not just when a mistake has already been made once.

## Default 2: Performative, citation-heavy comments — a documented recurrence, not a one-time lapse

**Evidence**: this project's own guide added Governing Principle 10 in round 3, specifically because a same-author build produced source comments that read as justification to an imagined evaluator rather than notes for a future maintainer. Checking Perigee Mission Control's own `styles.css` (round 8, five rounds after that principle was added): 32 comment lines, a meaningful fraction of which cite section numbers from this project's own guide directly in the code (e.g., "§9's own token table," "§4.3's ceiling"). The habit that produced Governing Principle 10 recurred in the exact codebase built to demonstrate the guide that principle lives in.
**Why I default to it**: writing "per §9" inside a comment is genuinely faster than writing what a maintainer would actually need to know, and it *feels* like rigor while writing it — the same mechanism as Default 1, applied to code comments specifically.
**When it's appropriate**: a comment explaining a genuinely non-obvious constraint, a workaround for a specific bug, or an invariant a future editor could easily break — this project's own stated standard (default to no comments; write one only when the WHY is non-obvious).
**When it creates a tell**: a comment whose real function is to pre-empt a criticism ("this isn't the AI-default because...") reads, to a maintainer with no stake in that argument, as unrelated noise — worse than no comment, because it signals the code was written for review rather than for use.
**How to detect before shipping**: for every comment, ask "would this sentence make sense to someone who has never seen this project's design guide and never will?" If the answer requires the guide's own vocabulary or section numbers to parse, delete it or rewrite it in product terms.
**Replacement process**: put design rationale in the PR/commit description or a dedicated brief document (this project already has a real, better home for this: the per-example README files), never in the source comments themselves.

## Default 3: Treating my own guide's illustrative examples as prescriptions

**Evidence**: `ANTI_VIBE_CODING_UI.md` §5's spacing-scale table lists "5–8 steps (e.g., 4/8/12/16/24/32/48/64px)" explicitly as an *example*, with the accompanying note "A geometric or near-geometric progression avoids visually meaningless steps" — i.e., the actual rule is about progression shape, not this specific number set. Perigee Mission Control's `styles.css` uses exactly `4px / 8px / 12px / 16px / 24px / 32px / 48px / 64px` — the illustrative example, verbatim, digit for digit.
**Why I default to it**: an example in my own reference material reads as "the answer" under time pressure, even when the surrounding text explicitly frames it as one possible instance of a more general rule.
**When it's harmless**: this specific scale is a genuinely reasonable near-geometric progression, and reusing a good progression is not inherently wrong — the problem is not the number set, it's that I did not actually check whether *this product's own density and control sizing* implied a different progression, which is the same "unexamined default" mechanism this entire project exists to catch, just occurring in my own reference material rather than a third-party library's defaults.
**How to detect before shipping**: if a token value can be traced directly back to an "e.g." in this project's own guide without an intermediate product-specific reasoning step, treat it the same as an unexamined shadcn default — it needs its own justification, not inherited authority from being "in the guide."
**Replacement process**: when consulting §5's token table, generate the actual scale from the product's real control-height/density requirements first, then check whether it happens to resemble the illustrative example — not the reverse.

## Default 4: Monospace reached for beyond its functional need

**Evidence**: Perigee Mission Control's sidebar mark uses a mono, uppercase, letter-spaced "MISSION OPS" label (`.mark-sub`) — a static, non-tabular, non-technical piece of brand text, styled in the same monospace register used elsewhere in the same file for genuinely tabular data (capsule IDs, timestamps, telemetry readouts). 10 total `font-mono` references in the file; roughly one of them (this label) has no tabular-alignment or real-data justification — it's there because monospace "reads as technical," which is exactly the mechanism this project's own §4.4 AVOID entry ("monospace used merely to signal 'technology'") already names, applied to my own build after writing that exact rule.
**Why I default to it**: monospace genuinely is correct for the majority of the technical content on that page (IDs, timestamps, numeric readouts) — which makes it easy to extend the same choice to an adjacent element (a static label) without re-checking whether the justification actually still applies there.
**When appropriate**: real tabular/numeric/ID content, verified per-element, not per-page.
**How to detect before shipping**: for every monospace element, name the specific tabular-alignment or real-technical-content reason; if the honest answer is "it matches the register of nearby elements," that is the same failure as a shared page-wide accent color applied decoratively — check every element individually, not by proximity.
**Replacement process**: the sidebar mark's sub-label should use the page's UI sans, not mono — a small, concrete, immediately actionable fix, left uncorrected in the shipped example specifically so this document can cite a real, current instance rather than a hypothetical one.

## Default 5: Rounded-card summary tiles as an unexamined compositional default

**Evidence**: Mission Control's Fleet Overview page presents its three KPI numbers as three individually bordered, individually rounded (`--radius-md`), individually padded containers in a row — the exact "cardification" pattern this project's own §4.1 catalog entry warns against ("every piece of content... wrapped in its own bordered/shadowed rounded box... no hierarchy, just a grid of boxes"), applied by the same project, after writing that catalog entry, to genuinely decision-relevant content that the catalog entry itself would likely score as a legitimate exception (a small number of distinct, genuinely separate top-level metrics). **This is logged as a borderline case, not a clean violation** — three tiles is well under the catalog's own "~4-6 competing at equal weight" detection threshold, and each tile passes the §4.3 decision-relevance test independently (this was confirmed directly during Mission Control's own build). The habit worth flagging is narrower: three-bordered-boxes-in-a-row is my own reflexive shape for "a small number of top-line metrics," reached for without first considering whether a plain three-column stat row without individual borders/containers would have served the same content with less visual apparatus.
**How to detect before shipping**: for a small (2–4) group of top-line numbers specifically, try the ungridded version first (a plain row of label/value pairs with dividers or spacing alone) and add individual card containers only if that plainer version genuinely fails to establish separation — not by default.

## Default 6: Uppercase micro-labels, applied pervasively rather than selectively

**Evidence**: Mission Control's `styles.css` uses `text-transform: uppercase` five separate times across otherwise-unrelated element types (tile labels, section headings, the sidebar sub-mark, readout labels) — a single formatting move applied as a blanket convention across the entire page rather than selected per-element for a specific reason each time.
**Why I default to it**: an uppercase, letter-spaced micro-label is a fast, low-risk way to signal "this is metadata, not primary content" — genuinely useful once, and cheap to reapply everywhere once established.
**When it's appropriate**: this project's own calibration brief names "uppercase micro-labels" directly as a pattern common in *both* authored and generated minimalism — it is not disqualifying by itself (Signal-Combination Model, Governing Principle 11). The question is whether its blanket, page-wide application was a deliberate typographic decision or a convenience default; in Mission Control's case, it was closer to the latter — chosen once for the first label and then reused without re-litigating for each subsequent one.
**How to detect before shipping**: count uppercase-label instances per page the same way this project already counts cards per viewport (§20's Card Count Test) — more than roughly 4–5 distinct uppercase-label roles on one screen is worth a second look at whether the convention is load-bearing or just convenient.

## Default 7: A cool, restrained accent (teal/cyan-family) for "serious" technical products — tested this round, evidence points against a hard default

**Evidence**: Mission Control's single accent (`#5fb3c4`, a muted cyan-teal) was chosen specifically to avoid the "AI Purple Problem" (round 6/7 research) — a deliberate, reasoned choice, not an unexamined default, but the only data point available when this entry was first written.
**Round-9 test**: built a second dense/professional-application brief (the Meridian dispatch-console exercise, `exercises/dispatch-console/`) in 4 structurally different directions, one of which (Direction C, "Shift Handoff") deliberately used a warm terracotta accent (`#b5562f`) instead of anything cool/teal, specifically to test this default. Two independent blind reviewers, shown only the rendered screenshots with no context, both accepted Direction C's warm register as coherent and did not penalize it for departing from a cooler/more technical palette. **This is real evidence against Default 7 being a forced or unavoidable pattern** — a deliberately different accent choice, when actually executed, reads as legitimate rather than as a mistake. Full detail: `exercises/dispatch-console/REVIEW.md`.
**Remaining caveat, not fully resolved**: the same exercise also surfaced a related, unflagged problem — Direction C and Direction A (a *third*, neutral-civic register, not cool/teal either) were under-differentiated from each other on background/surface color specifically (`#fbfaf6` vs `#fbf5ec`, both read as "the same cream palette" by both blind reviewers). This doesn't confirm Default 7 (neither direction used a cool accent), but it's a related caution: successfully avoiding one specific default (a teal accent) doesn't guarantee two intentionally different non-teal directions will actually read as distinct — the avoidance has to be paired with genuine differentiation, checked by rendering and blind review, not assumed from the written brief.
**Revised status**: downgraded from "unconfirmed hypothesis" to "tested once, evidence against a hard default, but sample size is still one exercise" — keep this entry, but treat it as weaker evidence for caution than for an active pattern going forward.

## Default 8: Dark-technical aesthetic as the reflexive answer to "dense/professional product" — tested this round, evidence against a forced default, with one legitimate reason to still use dark noted

**Evidence**: Mission Control is dark-native, justified explicitly (extended-session monitoring tool, per §5's Feature Prioritization test) rather than defaulted into — a genuine, reasoned decision, documented as such in its own README, but it was the only dense/professional-application example this project had built until this round.
**Round-9 test**: the same 4-direction Meridian dispatch-console exercise produced two light-themed directions (A: light neutral, C: light warm) and one dark direction (D: "Live Board"). Both blind reviewers rated the light directions as fully credible for a "serious," time-pressured operational product — light theming was never treated as a credibility problem. Direction D's dark theme was independently praised by both reviewers, but specifically **for a stated reason tied to its own concept** (a live timeline of color-coded state changes reads more clearly against a dark canvas, similar to real control-room/broadcast displays), not because dark is inherently more "serious." **This is the intended distinction the whole exercise was designed to surface**: dark theming is a legitimate choice when tied to a specific, stated visual reason (as in D), not a default that dense/professional products need to earn credibility (as A and C's reception disproves).
**Revised status**: downgraded from "unconfirmed hypothesis" to "tested once, evidence against a forced default." Two dense/professional-application builds now exist (Mission Control, dark-justified; the Meridian exercise, split across light/light/dark with all three well-received) — a real, if still small, cross-project sample. Recommend keeping this entry as a caution to check the reasoning (not the color itself) rather than continuing to treat it as an open, unconfirmed hypothesis.

## Round-11 re-measurement across five builds

All five builds from `examples/` and `practical-exercises-round-two/` were measured directly against
the entries above, and an independent authorship reviewer was given two of them and asked only whether
the same person made both. Full detail: `ANTI_VIBE_CODING_UI.md` Appendix L and
`practical-exercises-round-two/ROUND_TWO_BLIND_REVIEW.md`.

**Default 2 — closed.** Zero occurrences of `§`, "Governing Principle", "Intentional accent", "Not
decorative" or the other banned phrasings across every round-two source file. The comments that
remain explain non-obvious constraints. This habit is fixed.

**Default 5 — closed.** `border-radius` declarations per stylesheet: Mission Control 11, then 3, 3, 3,
0, 1 across the five later builds. Cardification is no longer the reflex.

**Default 6 — not closed, and the evidence is far stronger than the single Mission Control data point
recorded above.** `text-transform: uppercase` appears in **5 of 5** builds — 7, 5, 8, 6 and 4
instances — including two exercises briefed specifically to look unlike each other. An independent
reviewer named the treatment unprompted as one of the strongest authorship signals across two
otherwise unrelated sites. Upgrade this entry from "worth a second look" to an active, confirmed
default.

**Default 1 — recurred in its purest recorded form.** Firn's README described a responsive behaviour
("the rail becomes a horizontal key above the article") that had never been implemented: the
stylesheet targeted elements the page has never rendered, and the author repeated the claim in
conversation. The rationale was fluent, internally consistent, and describing dead code. This is the
fourth documented instance, and the first where the false claim was about the builder's *own shipped
behaviour* rather than about how a design reads.

## Default 9: a private spacing generator — new, and it explains Default 3

**Evidence**: two round-two builds, derived weeks apart, each believed at the time to come from its
own product's requirements:

- Firn: `6 / 12 / 18 / 30 / 48 / 78 / 126`
- Bellman's Mill: `6 / 12 / 20 / 32 / 52 / 84 / 136`

Different numbers. Both start at 6px, and both are Fibonacci-additive (18+30=48, 30+48=78;
32+52=84, 52+84=136). The same construction, twice, unprompted.

**Why this matters more than Default 3**: Default 3 was recorded as "I copy the guide's illustrative
scale verbatim." The deeper habit is that **changing the output does not change the generator** — I
stopped copying the numbers and kept the method, and then presented the difference in numbers as
evidence of product-specific reasoning. A per-product scale that arrives by the same procedure every
time is not a per-product scale.

**How to detect before shipping**: write down the actual control heights, reading measure and image
gutters the product needs, derive the scale from those, and then check whether it happens to be
6-based and additive. If it is, that is a coincidence worth one more look, not a confirmation.

**Replacement process**: for at least one exercise in a series, choose the progression deliberately
against the previous one — a linear scale, a 4px-based one, a scale derived from a grid module or from
a photograph's aspect ratio — and record which was used, so the series has a checkable spread rather
than one method wearing different numbers.

## What this document does not yet contain

- Direct code-level re-inspection of the bike-shop and original Perigee-landing-page source files (this session did not have them loaded in working context; the evidence above for those two examples is drawn from this project's own prior written record of them, not fresh re-reading of their actual source). A follow-up pass that actually re-opens those files and checks them the same way Mission Control was checked in this document is a concrete, valuable next step.
- ~~Confirmation or refutation of Defaults 7 and 8, which require the Part 14 four-variant exercise to actually test rather than assert.~~ Done this round via the Meridian dispatch-console exercise — see the revised Default 7/8 entries above. A new, narrower gap replaces it: Direction A/C's under-differentiation (found during the same exercise) has not yet been fixed and re-reviewed, and this document's own Default 5/6 entries have not been re-checked against the same exercise's four codebases yet.
- A pass specifically looking for the calibration brief's other named candidate habits not yet evidenced one way or the other in this project's own work: "strong homepage followed by generic inner screens" (Mission Control's own cross-route consistency was checked directly during its build and is *not* an instance of this — worth stating as a real negative result, not a silent omission) and "asymmetry that doesn't affect reading order" (not clearly present or absent in the material re-inspected this round).
