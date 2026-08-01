# Lead Service Line Inventory — Ward Seven

A public water utility's statutory service-line inventory, presented as a document of record.
Rensdale Municipal Water is invented; the instrument it imitates is not.

## Why this brief

`PROFESSIONAL_WEB_DESIGN_RESEARCH.md`'s round-2 convergence audit found that 11 of this project's
15 prior outputs fell into two Garden schools (Modern Tool/Builder SaaS, Warm Humanist) and that
**Brutalist/Raw was never attempted at all**. This exercise takes that school directly, and takes it
in the one register where visual aggression is not a pose: a legal instrument about lead in drinking
water, where the reader's stake is real and the tone should be flat, factual, and unavoidable.

## The idea, in one line

Every household in the ward is one mark. All 1,142 of them, on one page.

Nothing else on the page is asked to carry the argument. The counts, the ledger, and the guidance are
all downstream of a plate you can see the size of the problem in.

## References, and what was taken from each

Per §6's "No Recipe Without Reason", each reference is named with the specific attribute studied.

| Reference | What was taken | What was not |
|---|---|---|
| EPA Lead and Copper Rule Revisions inventories (40 CFR 141.84) | The classification vocabulary (Lead / Galvanized Requiring Replacement / Unknown / Non-lead), the verification-method taxonomy, and the full-line replacement policy | Any real utility's data, branding, or page structure |
| Government audit and inspection reports | The masthead-as-filing-header: authority, identifier, revision number, filing date, statutory citation | Their typography, which is usually a default |
| Bloomberg Businessweek, Turley era | Extreme scale contrast between display and data, and rule-work as the only ornament | Its palette and its editorial playfulness, which would be wrong here |
| Survey and inspection plates | Material encoded by mark *shape*, with colour redundant | Literal cartography — this is not a map, and does not pretend to geographic accuracy |

## Decisions worth defending

**The mark ramp is semantic, not decorative.** Solid red (lead) → solid ink (galvanized) → outline
with a centre dot (unknown) → faint outline (non-lead). It ramps by how bad the finding is *and* by
how much is known, and it survives greyscale: the first draft used a filled black square for
"unknown", which put so much ink on the plate that the lead marks stopped reading. That was caught by
looking at the render, not by reading the CSS.

**One accent, load-bearing.** Stamp red appears on confirmed lead, on the headline count of affected
connections, and nowhere else. Strip the colour entirely and the plate still works, because the four
materials differ in form. That is the accent-abstraction test from `EXISTING_EXERCISE_REVIEW.md`
applied deliberately rather than hoped for.

**The spacing scale is derived, not inherited.** The plate's mark is 12px on a 3px gutter, and every
measurement on the page is a multiple of 3px. `CLAUDE_DESIGN_DEFAULTS.md` Default 3 records this
project copying its own guide's illustrative 4/8/12/16/24/32/48/64 scale verbatim; this page's scale
comes from the artefact it is drawing.

**No monospace anywhere.** Default 4 records monospace being reached for as a "technical" signal.
Libre Franklin's tabular figures do the alignment work in the ledger, which is the actual requirement.

**The record panel has no empty state.** It rests on the ward totals and switches to a single
connection on hover or focus, so the column is never a labelled void.

## Verified

Driven with Playwright at 1440 / 834 / 390:

- 1,142 marks render; material counts sum to the total; the headline figure, the ledger footer, and
  the plate agree with each other because all three are computed from one array.
- **Identical on an independent reload.** `CLAUDE_DESIGN_DEFAULTS.md` Default 1 records a
  timestamp-drift bug that a same-author verification suite missed by never checking this.
- Hover, click-to-pin, pin-holds-while-hovering-elsewhere, unpin.
- Legend filtering: 308 lead marks matched, `aria-pressed` correct, filter clears.
- Keyboard: 14 tab stops for 1,142 cells (roving tabindex), arrow keys move within a block, the
  record follows focus.
- Lookup with a hit, a miss, and a 136-result query that is correctly truncated with an explanation.
- Contrast, measured on rendered pairs: lowest is 5.69:1. No horizontal overflow at any width.

### A real defect this caught

The lookup returned **two** results for `812 Kesler Ave`. House numbers were being generated as
`base + i*2`, so a block labelled "700 Kesler Ave" ran up to 868 and collided with the 800 block. A
hundred-block holds at most 100 numbers; the generator now respects that, and the assertion suite
checks every address is unique and inside its own block. This is exactly Protocol Step 3 — it was
invisible from the code and only appeared by running a real query.

## Not verified

- **No independent blind review.** The Design Evaluation Protocol's Step 5 is the load-bearing one
  and it has not been run: this page was built and assessed by the same agent, so every claim above
  about what it *reads as* is a hypothesis, not a finding. Governing Principle 9 and
  `CLAUDE_DESIGN_DEFAULTS.md` Default 1 both predict that this is precisely where a miss will be.
- No screen-reader pass. The roving-tabindex plate and the `aria-live` record panel are built to the
  documented patterns but have not been driven with NVDA, JAWS, or VoiceOver.
- No real reader. Whether a resident could find their own address and understand what to do next is
  the question that matters most about this page, and it is untested.
- Print styles exist but no print output was inspected.
