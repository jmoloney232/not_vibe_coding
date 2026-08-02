# Round Two — Baseline: what actually improved, and what is now at risk

Method: all ten prior builds were re-rendered at 1440px and measured in the browser — type-size range
and step count, rounded-corner count, shadow count, bordered-and-padded container count,
uppercase-transform count, and background colour. Numbers below are from `evaluation/measures.json`,
not from the rationale documents. Where a measurement misleads, that is said rather than used.

| | ground | type min/max | scale ratio | steps | radius | card-ish | UPPER |
|---|---|---|---:|---:|---:|---:|---:|
| Fourth Street Barber | #fdfcfa | 12 / 22 | 1.8× | 5 | 4 | 2 | 3 |
| North Bench Coffee | #fbf7f0 | 12 / 32 | 2.7× | 6 | 16 | 1 | 1 |
| Fenwick Museum | #faf8f4 | 11 / 40 | 3.6× | 9 | 0 | 0 | 3 |
| Ridgeline Flags | #ffffff | 11 / 26 | 2.4× | 7 | 8 | 0 | 8 |
| Northfield Sessions | #121113 | 11 / 56 | 5.1× | 8 | 0 | 0 | 0 |
| Dispatch B | #eef1f4 | 10 / 14 | 1.4× | 5 | 16 | 0 | 17 |
| Perigee Mission Control | #0a0c10 | 10 / 25 | 2.5× | 7 | 3 | 3 | 10 |
| **Lead Register** | #e9e6dd | 11 / 132 | **12.0×** | 10 | **0** | **0** | 19 |
| **Cape Ansell Almanac** | #f5f1e4 | 11 / 92 | **8.4×** | 13 | **0** | **0** | 18 |
| **Drawdown** | #eae4d8 | 9 / 116 | **12.9×** | 11 | **0** | **0** | 15 |

## Improvements visible in the recent work

**Type scale opened by roughly 4×, and it is the sharpest measurable change.** The older builds
compress everything into a 1.4–5.1× range, median about 2.5. The recent three run 8.4–12.9×. In the
contact sheet the older pages read as one texture at one size; the newer ones have a genuine top and
bottom to the hierarchy. Step count rose too (5–9 → 10–13), so the range is populated rather than
being two extremes with a gap.

**Rounded corners and card containers went to zero.** Not reduced — zero, in all three, measured. The
older set carried up to 16 rounded elements and up to 3 bordered-padded-rounded containers per page.
This is the single cleanest break from component-library defaults.

**Composition moved off the centred column.** Barber, Coffee and Fenwick are all a narrow measure down
the middle of a wide frame. All three recent builds use the full frame with a real second axis — the
register's plate against its record panel, the almanac's plate over three columns, the drawdown's
four quadrants against a control panel.

**The content became the composition.** In the older work the visual system sits on top of content
that could be swapped out. In the newer work the primary artefact — 1,142 marks, a computed tide
curve, computed cloth — *is* the page. Nothing else is asked to carry the argument.

**Numbers are cross-checked rather than asserted.** Every figure in the recent three is computed from
one source and rendered in several places, and the equality is asserted in tests. Reload-stability is
asserted, which the round-8 timestamp-drift bug shows was not previously true.

### One measurement that looks like a finding and is not

The register reports 710 box-shadows. That is not decoration: `box-shadow: inset` draws the outline
form of 1,142 material marks. Counted naively it looks like the worst offender in the set; read
correctly it is the opposite. Recording it because a measurement harness that nobody sanity-checks
produces exactly this kind of confident wrong answer.

### A claimed improvement the evidence does not support

The brief lists **cross-route coherence** among the improvements. The rendered evidence does not
support that: the register, the almanac and the drawdown are **one HTML route each**. The older set is
where the multi-route work actually is — Perigee (3 routes), Fenwick (2), Ridgeline (2), Northfield
(4 variants). Whatever improved, it was demonstrated on single-page documents, and multi-route
identity is untested in the recent work. Round two requires two meaningful routes per exercise, so
this is being tested for the first time, not carried forward.

## Remaining risks

**Every recent build is warm light paper. All three.** Grounds are `#e9e6dd`, `#f5f1e4`, `#eae4d8` —
within a few points of each other. Having escaped dark-console styling, the work landed on a new
single ground. This is the largest regression risk in the set and round two must break it decisively:
at least one true dark product where dark is instrumented to a task, at least one white/neutral
clinical ground, at least one saturated or image-led ground.

**Every recent typeface is editorial or humanist.** Libre Franklin, Source Serif 4, EB Garamond, Fira
Sans Condensed, Jost. There is no neutral UI grotesque, no true display face, no technical face, no
geometric or grotesque used at UI density. The range shown is one corner of typography, confidently
worked. Round two needs faces that would be wrong in any of these three.

**Uppercase micro-labels went up, not down.** Old median 3 per page; new 15–19. This is
`CLAUDE_DESIGN_DEFAULTS.md` Default 6 getting worse while other defaults got better, and it is the one
metric where the recent work is measurably more mannered than the work it replaced.

**All three share a register: quiet, authoritative, print-derived, instrument-like.** A document of
record, an almanac, a workshop instrument. None is consumer, warm, playful, promotional, image-led, or
brand-driven. The improvement may be an improvement at *one temperature*.

**No photograph appears anywhere in the recent work, by construction.** Each brief was chosen so its
primary asset could be authored in code. That solved the Asset Protocol failure for a class of briefs
and left the original problem untested: this process has still never produced a good image-led page.
Exercise 02 tests exactly that, and it is the most likely failure in round two.

**Oversized display type is doing a lot of work.** A 12× scale ratio is confident; it is also a single
move, and three-for-three is a pattern rather than a decision. At least two round-two exercises must
succeed with a compressed scale, where hierarchy comes from weight, rule, colour or position.

## Transferable principles — reasoning, not appearance

1. **Choose the brief so the identity-carrying asset is one you can actually produce.** The deepest
   lesson of the round. Where that is impossible — photography — say so and design the honest
   alternative rather than shipping a placeholder and calling it done.
2. **Derive the spacing scale from the artefact.** Three builds, three derivations: the plate's mark
   and gutter; the leading of the running text; one warp end by one pick. None reused a remembered
   list. This transfers to any brief and is invisible in the output, which is the point.
3. **Make identity survive colour removal.** Encode by form first and let colour be redundant. Passed
   by construction rather than hoped for.
4. **Cross-check every printed number against its source, and assert reload stability.**
5. **Record predictions before blind review.** Twelve of seventeen landed and it did not matter; the
   three worst defects were all unpredicted. The value is in measuring the gap, not the hit rate.
6. **Capture review states by driving real controls.** A harness that sets state directly can
   fabricate a defect that a blind reviewer will report in good faith.
7. **Check that the prose does not promise what the interface cannot do.** A failure category with no
   step in the current protocol, and one an agent is unusually prone to because it writes both halves
   in the same pass.
8. **Re-measure after every fix.** Two regressions this round, both introduced *while fixing something
   else*, both invisible to inspection and caught only by re-measuring.

## What must not transfer

Warm paper grounds. Libre Franklin, Source Serif 4, EB Garamond, Fira Sans Condensed, Jost. Zero
radius as a rule rather than a decision. A 12× type ratio. Uppercase letterspaced micro-labels.
Hairline rule-work as the default separator. The quiet-instrument register. The plate-plus-panel
layout. Any of these may reappear where a brief genuinely calls for it — but each reappearance needs
its own reason, and the regression report will count them.
