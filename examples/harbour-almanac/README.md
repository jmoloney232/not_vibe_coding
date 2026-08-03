# Cape Ansell — Tide and Light Almanac

One harbour, one day, on one composed plate. The harbour is invented; every method used to compute
the page is real.

## Why this brief

Two findings from this project's own record drove it.

**Specialty/Genre was never attempted** across 15 prior outputs (`PROFESSIONAL_WEB_DESIGN_RESEARCH.md`,
round-2 convergence audit). The printed nautical almanac is a genre with several centuries of settled
conventions, which makes it a real test of whether this project can work *inside* a tradition rather
than inventing a look.

**The Asset Protocol failure is this project's most repeated structural defect** — Fourth Street
Barber, North Bench Coffee, and Fenwick Museum all put "photography pending" where the identity-carrying
asset belonged. An almanac is the answer to that, not a dodge: its primary assets are *drawings*, and a
drawing computed from real harmonics is a genuine authored asset in a way a stock photograph never was.

## The idea, in one line

The moon is on this page because it is why the water moves, and the page proves the connection rather
than asserting it.

## References, and what was taken from each

| Reference | What was taken | What was not |
|---|---|---|
| Reed's Nautical Almanac, Admiralty Tide Tables | The standing-data header (position, datum, time zone), the HW/LW table form, the discipline of stating the datum before any number | Their page furniture and typography |
| Admiralty charts | Magenta as the convention for lights and cautions — used here for lights and the reader's own cursor, and nothing else | Chart symbology proper; this is not a chart |
| International light characteristics (Fl, Iso, Oc, Q) | The abbreviations, and the timing structure they encode | — |
| Engraved almanac plates | The single composed plate rather than a row of separate charts | Ornament |

## Decisions worth defending

**The tide plate's vertical scale is fixed at 0–4.8 m for every day of the year.** Autoscaling would
make a neap day look like a spring day. Fixing it means two days can be compared by looking at them,
which is the entire reason an almanac is bound rather than printed one day at a time.

**Sun and water share one drawing.** Night and civil twilight are shaded behind the curve instead of
being listed in a separate panel, so "is the flood in daylight" is answered by looking.

**The lights animate, and the animation is the content.** Two light characteristics are genuinely
hard to tell apart from a written abbreviation and trivial to tell apart by watching. The lamps keep
real time against a to-scale period bar. `prefers-reduced-motion` starts them paused and lit, and
there is an explicit toggle either way.

**Magenta is rationed.** Lights and the live cursor. Nothing decorative.

**No monospace.** Fira Sans Condensed's tabular figures carry the alignment, which is the real
requirement (Default 4).

**Spacing comes from the leading of the text**, the way a book page is measured — deliberately a
different derivation from the sibling examples, so no single scale gets reused across all three.

## Verified

- Reload-stable: identical date, tides, sun, moon, and depth arithmetic on an independent load.
- **The plate's HW/LW labels and the table's times are asserted equal**, because they are computed
  once and rendered twice.
- Day navigation, including 31 Dec 2026 → 1 Jan 2027, and a day with only 3 turns of tide.
- Keyboard cursor on the plate (arrows, Shift for hours, Home/End, Escape) with a live readout.
- Lights animate; pause holds; the toggle's label and `aria-pressed` both change.
- Contrast: lowest measured 6.07:1. No console errors or horizontal overflow at 1440 / 834 / 390.

### Two real defects this caught

**The tide model was wrong in a way only a domain check finds.** N2's amplitude exceeded S2's, so the
27.6-day perigean beat swamped the spring–neap cycle and the page printed its *smallest* range at full
moon. Nothing in the code looked wrong; the render was plausible; a month-long sweep comparing range
against moon phase was what exposed it. Corrected ratios now give a mean range of 3.42 m at syzygy
against 2.55 m at quadrature. S2's phase is derived from the epoch new moon plus the harbour's age of
tide, so the two can no longer disagree by construction.

**`line-height: calc(var(--lead) / 17 * 1.18)` resolved to 1.39 *pixels*.** `--lead` is a length, so
the division produced a length, not a ratio. Every definition list and table on the page was collapsed
into overlapping text. Invisible in the source, unmissable in the first render — Protocol Step 1
earning its place.

The moon was also drawn inverted at first (lit limb dark), so a 1%-illuminated waning crescent read as
a full moon. Also a render-only catch.

## Not verified

- **Blind review has been run** — see `../../BLIND_REVIEW_ROUND_10.md`, reviewer B. It caught a defect
  in which the page contradicted its own caption: the caption promised each light bar was "one full
  period of the light, drawn to scale in seconds", while every bar was normalised to its own period,
  so a one-second quick flash and a twelve-second composite group drew identical width. Fixed by
  giving all five bars one shared twelve-second axis, which keeps the claim rather than softening it.
  But the reviewer was **an AI agent in a fresh context, not a person**: reliable for structural and
  arithmetic defects, materially weaker on taste. Three of six perceptual predictions went unmentioned
  rather than confirmed.
- **No real navigator has seen it**, and that is the review that would matter. The page is explicitly
  labelled not for navigation, but whether its conventions read correctly to someone who uses the real
  instrument is untested.
- The lunar model is a mean synodic month: the age can be out by roughly half a day, and no moonrise
  or moonset is offered because that calculation is not attempted. Stated on the page itself rather
  than left for a reader to discover.
- Solar times are not corrected for the observer's height of eye or for non-standard refraction.
- No screen-reader pass. The tide plate is a labelled, described `role="img"` with a keyboard cursor;
  whether that is genuinely usable non-visually is unknown, and the honest fallback is the HW/LW table
  beside it.
