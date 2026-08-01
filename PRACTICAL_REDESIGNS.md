# Practical Redesigns — Small Business, Developer Tool, Operational

Three structural redesigns required by the round-2 brief, nominated in
`EXISTING_EXERCISE_REVIEW.md` on the grounds that each exercise's real
problem was diagnosed there as structural rather than purely cosmetic.
Northfield Sessions' redesign is documented separately in
`NORTHFIELD_REDESIGN_STUDY.md`. All three below are built and rendered at
desktop and mobile widths.

## Small business / artisan e-commerce — North Bench Coffee

`exercises/north-bench-coffee/redesign/`

**The diagnosed problem** was not the color or type system — it was that an
e-commerce product page with no product photography is close to
non-functional for a shopper evaluating a bag of coffee sight-unseen. Faking
a photo was already ruled out by this project's own asset rules, and simply
restyling the placeholder box would leave the actual defect in place.

**The fix is structural**: the redesign removes the dependency on
photography entirely by leading with what a specialty-coffee buyer actually
uses to evaluate a lot before buying — real per-lot traceability (a
farm-to-cup chain-of-custody ledger) and a cupping score presented as a
technical readout, the way real specialty roasters' own lot reports work.
The "tasting note pills" the original used are replaced with an actual
roast-profile data readout (charge temp, first crack, drop temp, development
ratio) — real technical content a specialty buyer reads, not decorative
flavor-word chips. Typography moved off Fraunces + Inter (this project's own
flagged "artisan premium" default) to Zilla Slab + IBM Plex Mono, and the
background moved off cream to a cool stone/sage neutral to avoid the same
warm-artisan costume in a different shade.

**What this doesn't solve**: real product photography would still make this
a stronger commerce page than a data-forward one — this redesign is a way to
be honest and functional without real assets, not a claim that data
transparency is always superior to good photography when photography is
actually available.

## Developer tool — Ridgeline Flags detail page

`exercises/ridgeline-flags/redesign/`

**The diagnosed problem**: the original's flag-detail screen had one working
control (a rollout-percentage slider with real production-safety behavior)
followed by several hundred pixels of empty white space — an
under-specified product, not an over-decorated one.

**The fix is structural**: the redesign keeps the original's real, working
interaction logic (the slider, the live percentage readout, the
production-only two-click confirm — that logic was sound and is reused
unchanged) and adds the content a real flag-detail screen needs: targeting
rules, rollout history with attributed changes, and related/dependent
flags, laid out as a two-column page that uses the reclaimed width instead
of leaving it blank. Typography moved off Inter + JetBrains Mono — this
project's own most-repeated developer-tool default, confirmed by the
round-2 convergence audit in `PROFESSIONAL_WEB_DESIGN_RESEARCH.md` — to
Hanken Grotesk + Space Mono.

**What this doesn't solve**: the added history/targeting/related data is
plausible synthetic content for this one flag (`checkout_v2_rollout`), not
a fully generalized system — a real product would need this data present
for every flag, which this prototype does not attempt to fake for all
eight.

## Operational application — Dispatch C: Shift Handoff

`exercises/dispatch-console/redesign-c/`

**The diagnosed problem**: beige background, serif operator names, and an
excessively vertical single column for a task that is explicitly
time-pressured — a shift handoff read under pressure, not browsed at
leisure. The underlying grouping logic (flagged drivers sorted first, loads
grouped by driver) was already sound and is reused unchanged from the
original `app.js`.

**The fix is structural, not just cosmetic**: driver sections now wrap into
a multi-column grid (`grid-template-columns: repeat(auto-fit, minmax(320px,
1fr))`) instead of stacking in one long column, which cuts scroll depth
dramatically at desktop width — confirmed by direct comparison of the two
renders, not asserted: the original's full-page desktop screenshot runs
roughly 3,400px tall, the redesign's fits in under 950px. Typography and
color moved to Public Sans and the same semantic amber/red/slate status
system already used in Direction A, restoring one consistent status-color
vocabulary across the Meridian console family instead of each direction
inventing its own palette.

## Cross-cutting note

All three redesigns reuse their original exercise's real interaction logic
(the flag slider's production-confirm behavior, the dispatch console's
driver-grouping and urgency-sorting) unchanged — the corrections are
consistently structural (layout, content completeness, information
architecture) and typographic, not a case of discarding working product
logic to chase a different visual mood. This matches the pattern the round-2
brief is trying to instill: a wrong visual register is a real defect worth
fixing, but it should be diagnosed and fixed at the layer where the actual
problem lives, which in two of these three cases was not "wrong colors" but
"missing or under-built content."

## Limitation

As with the other round-2 review documents, these three redesigns were
built and evaluated by the same agent, without an independent blind review
against matched professional or documented vibe-coded examples. That review
is still owed.
