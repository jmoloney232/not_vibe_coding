# Drawdown — a weaving draft, worked out

A four-quadrant weaving draft you can edit, with the cloth computed live from the three grids that
produce it.

## Why this brief

**Motion/Experimental was never attempted** across 15 prior outputs (round-2 convergence audit), and
the audit's own note on it is the useful part: that school is the one that is honest about being
expensive and narrow, and it loses most of its value in a static deliverable. So the test is not
"can motion be added" but "is there a brief where motion is the content."

A weaving draft is that brief. The relationship between notation and cloth is the entire thing a
weaver learns, it is invisible on paper, and it is instantaneous on screen. The cloth also solves the
Asset Protocol problem outright: there is no photograph to be missing, because the cloth is computed.

## The idea, in one line

Nothing is drawn in the drawdown. Change one square anywhere above it and watch the cloth answer.

## References, and what was taken from each

| Reference | What was taken | What was not |
|---|---|---|
| Standard draft notation (threading top, tie-up in the corner, treadling down the side, drawdown below) | The exact quadrant arrangement, unaltered — a weaver should be able to read this without being taught the page | — |
| Marguerite Porter Davison, *A Handweaver's Pattern Book*, and the wider repertoire | Plain weave, 2/2 twill, herringbone, goose eye, log cabin as real structures | Invented "patterns" dressed as traditional ones |
| Colour-and-weave theory | Log cabin, included specifically because its pattern is entirely colour order and not structure at all | — |
| Bauhaus weaving workshop (Anni Albers) | The premise that the structure *is* the design, and Jost as a Futura-lineage face contemporary with it | The primary-red/yellow/blue Bauhaus costume, which is a poster cliché rather than a weaving one |

## Decisions worth defending

**Colour comes from dyestuffs, not from a palette.** Undyed linen, indigo, madder, weld, walnut,
iron. That is what would actually be at the loom, and it sidesteps the Bauhaus-primaries costume that
"geometric sans + weaving" invites.

**Selection state uses no colour at all.** Chosen swatches, chosen drafts, and focus are shown with
weight, rule, and outline. Every hue on the page is yarn. The accent-abstraction test is passed by
construction rather than by hope.

**The second yarn is only offered when the draft asks for one.** Warp 2 and Weft 2 appear for log
cabin and stay hidden for the solid drafts, so the panel never shows a control with nothing to do.

**The animation is a loom, not a transition.** "Weave it, pick by pick" lays picks down at 70 ms
each, and the unwoven warp stays visible below the fell of the cloth so a half-finished weave reads as
work in progress rather than as a failed render. `prefers-reduced-motion` jumps to the finished cloth.

**Spacing is measured from the cell** — one warp end by one pick — so the prose and the cloth sit on
the same grid. Third example, third derivation; no scale is shared between them.

## Verified

- **The interlacement is asserted correct against an independent re-implementation**: 1,600 cells
  checked with two distinct hues, 0 disagreements with `tieup[treadling[pick]].includes(threading[end])`.
- All five drafts render the structure they name — goose eye closes into diamonds, herringbone
  reverses at the threading turn, log cabin blocks alternate direction every eight ends.
- Editing threading, tie-up, or treadling changes the cloth; the tie-up toggle is reversible and now
  order-stable.
- Log cabin with both yarns in a direction set to one dye drops from 3 colours to 2 and the pattern
  goes, which is what the text claims.
- Weave animation runs, reveals progressively, and restores the button.
- Contrast: lowest 6.19:1. No console errors; the draft scrolls inside its own frame at 390px instead
  of pushing the page sideways.

### Two real defects this caught

**The cloth rendered as a blank rectangle.** Colour orders name *slots* (0 = the chosen yarn,
1 = the alternate), and the solid presets were filling their orders with `1` — so warp and weft both
resolved to the same yarn and the interlacement was invisible under a single flat colour. The
structure was correct the whole time; only the render showed it.

**The page made a claim the interface couldn't honour.** The log cabin text said "set both colours the
same and the pattern disappears entirely", but the second yarn was chosen automatically, so a reader
could not do what the sentence told them to. Rather than soften the copy, the second yarn became a real
control — which made the claim true, demonstrable, and now asserted in the test suite. This is worth
recording as a category: the defect was in the *agreement between the writing and the interface*, and
neither half was wrong on its own.

## Not verified

- **No independent blind review**, and none of the perception-level claims above ("reads as a loom",
  "reads as a workshop instrument") should be treated as confirmed.
- **No weaver has seen it.** The structures are checkable against published drafts and the
  interlacement is proven internally consistent, but whether the page is *useful* to someone who
  actually warps a loom — and whether the quadrant labels use the vocabulary they expect — is exactly
  the question a same-author review cannot answer.
- No screen-reader pass. The three editable grids each take one tab stop, carry a visible cursor moved
  by the arrow keys, apply on Enter, and announce the cell through a live region — verified by driving
  the keyboard, but **not** verified with NVDA, JAWS, or VoiceOver, which is where this pattern
  usually fails. The drawdown itself is a described `role="img"` and a non-visual reader cannot inspect
  an individual square of cloth.
- Undo is absent. Editing is destructive until a preset is reloaded.
