# Existing Exercise Review — Round 2

A harsher, comparative re-review of all 10 previously-built exercises, per the
round-2 brief's explicit instruction not to begin from the prior rationale and
to treat the prior scores only as a baseline that may go down.

## Method and its real limitations

All 14 routes across the 10 exercises were re-rendered fresh at four widths
(1440/834/1100/390px — desktop/tablet/intermediate/mobile) via Playwright,
full-page, and reviewed from the screenshots rather than from memory or from
re-reading each exercise's original design-rationale document. This is a
genuine improvement over reviewing from memory, but it is **not** the
independent blind review the brief's Stage 9 and completion gates ultimately
require: I already knew, going in, which exercise was which and what the
user's own baseline critique said about each one, because that critique was
supplied verbatim in the brief that commissioned this document. That prior
knowledge cannot be fully un-known. What follows is a genuinely fresh visual
pass — several scores move, and the reasoning is drawn from what is visible
in the renders, not from restating the given critique — but it should be read
as a harsher self-review, not a substitute for a review by a party who has
never seen the prompts. That gap is named again in Limitations at the end.

Scores use the brief's own scale (4 = convincingly professional; 3 = strong
direction with real generic/execution weaknesses; 2 = competent but
template-like; 1 = strongly vibe-coded or harmful to the workflow).

## Per-exercise findings

### Fourth Street Barber — 2/4 (unchanged)

The composition is honestly plainer than "trying and failing at artisan
warmth" — it's a single centered column of functional information (hours,
prices, contact) with almost no attempt at visual personality beyond a
rust-colored call-to-action button. That restraint is not, on its own, a
flaw. The real product-fit failure is structural, not decorative: the literal
text **"Shop photos coming soon"** sits where a real barbershop's strongest
trust signal — the shop itself, the chairs, the barber — should be. A
one-person or two-chair local business's actual credibility argument is
almost entirely visual and photographic; a beige placeholder box does not
just look unfinished, it removes the one thing that would have made this
page product-specific rather than a generic template for any single-location
service business. Genuine authorship: the information hierarchy (status →
booking → prices → hours → location, in that order) is sound and
product-appropriate. Surface-only: the color and type choices carry no
connection to an actual barbershop's visual world (a shop sign, a chair, a
strop, a specific neighborhood). **Structural fix needed, not a skin
change**: this exercise cannot reach a higher score without a real asset
strategy — the placeholder has to become an actual (or realistically
simulated) photograph, because the Asset Protocol finding from the Garden
review applies directly here.

### North Bench Coffee — 2/4 (unchanged)

Same placeholder problem, more damaging here: an e-commerce product listing
with **no product photography** is close to non-functional as a real
storefront, not just visually generic — a shopper cannot evaluate a bag of
coffee they cannot see. The tasting-note pill row (`Stone fruit`,
`Brown sugar`, `Light florals`, `Clean finish`) and the "About this lot" /
"Roast & brew notes" copy are genuinely well-observed specialty-coffee
content, better than the visual system deserves. Genuine authorship: the
content register (single-origin lot data, elevation, process, varietal) is
accurate to how real specialty roasters describe coffee. Surface-only: cream
background, rust accent, and the Fraunces-coded serif wordmark are a stock
"premium artisan" costume with no unique brand mark underneath it — swap the
name and this could be any coffee, candle, or skincare product page.
**Structural fix needed**: the two-column product-detail layout itself is
fine; what's missing is a reason for this specific roaster to look like
itself rather than any artisan seller.

### Northfield Sessions — 3/4 (down from ~3.5/4)

On a fresh look, this does not hold up to the higher score. The huge
condensed headline on black with a single hot-pink/amber accent is genuinely
more confident than the rest of the set, and the type scale carries real
visual weight without leaning on cards or gradients — that's a real,
creditable difference from every other exercise. But "confident" is not the
same as "authored." This exact pattern — oversized condensed sans on pure
black, one saturated accent bar per list row — is now a recognizable default
for AI-generated event and creative-brand sites, in the same way dark-navy-
plus-one-accent is the default for AI-generated dev tools (see the
convergence audit in `PROFESSIONAL_WEB_DESIGN_RESEARCH.md`'s Part 0
addendum). Nothing on the page — not the artist names, not the venue
description, not the ticket tiers — gives this festival a specific cultural
identity that couldn't be relabeled onto any other three-day indie festival
by changing the accent color and the band names, which is exactly the "no
accent" test this round's preset experiment ran on the SaaS presets. That is
the honest reason to move this down rather than up: it is the least
templated-*looking* result in the set, but by the harsher standard the brief
sets (does it survive with the color and the artist names abstracted away?)
it has not yet demonstrated it is the least templated-*thinking* result.
Given this, Northfield gets the dedicated deep study and three structural
redesigns required by task #32, rather than being treated as merely needing
polish.

### Fenwick Museum — 3/4 (unchanged)

The strongest content in the set: a specific, invented regional manufacturer
(the Fenwick Chair Company, 1948–1963, in-house uncredited designers, school-
board and export contracts) with an accession-numbered checklist and named
curator — this is real curatorial-voice authorship, not generic museum copy.
That content depth is why this holds at 3/4 despite the same placeholder
problem as the two small-business exercises (six checklist objects, zero
images). A museum's core promise is visual access to objects; six
consecutive "Photography pending" boxes in the checklist is a more visible
failure here than almost anywhere else in the set, because it directly
contradicts the page's own subject matter. Genuine authorship: the exhibition
essay's specific historical claims and the checklist's material/dimension/
accession-number format. Surface-only: Lora-plus-Work-Sans and warm paper
tones are a generic "regional institution" costume applied on top of that
real content.

### Ridgeline Flags — 2/4, but the deeper problem is structural (unchanged score, new finding)

The list view (8 flags, percentage rollout bars, environment pills) reads as
competent but familiar. The real finding on this pass is on the **detail
page**: a single flag's rollout percentage, a slider, four metadata fields,
and then several hundred pixels of empty white space below a single "Save
change" button. That is not a color or font problem — it is a genuine
under-specification of the product. A real feature-flag detail view carries
targeting rules, rollout history, dependent flags, and recent activity; this
one has almost none of that, which reads less like "restrained developer-tool
minimalism" and more like an unfinished screen. **This is nominated as the
developer-tool redesign for task #33** — not because the visual system is
the worst in the set (Dispatch C is worse), but because it is the clearest
case where the fix has to be informational/structural before it can be
visual at all.

### Dispatch A: Exception First — 3/4 (unchanged)

Left-border-colored alert cards (amber/red/slate) ordered by urgency, with
collapsed "On schedule" and "Delivered" sections below, is a genuinely sound
information architecture for a dispatcher's actual task (what needs a
decision right now). The visual system — light-gray canvas, rounded cards,
status-colored left borders — is familiar enterprise-admin territory, but
here the familiarity is arguably closer to *correct genre convention* than
to *AI default*, since this is close to how real dispatch/logistics software
(actual products, not AI output) already organizes exception queues. Kept
unchanged.

### Dispatch B: Full Board — 3/4 (down from 3–3.5/4)

The strongest execution of the operational set — a real dense table with
urgency/window/driver view toggles and a driver-status strip — but on a
fresh look it does not clear 3.5. Nothing about it is memorable or
product-specific beyond "correctly executed dense table," and the honest
comparison the user's own brief asks for ("does it resemble an existing admin
template under close inspection") has an honest answer: yes, closely — this
is structurally very close to how real fleet-dispatch software (Samsara,
Motive, Trimble-class products) already presents a load board. That's a
point in its favor for *plausibility* and a point against it for
*authorship* — competent genre execution is not the same as a designed
identity. Moved down to 3/4 to reflect that the "closest to a 4" read from
round 1 was itself part of the vibe-coded pattern the brief is trying to
correct: mistaking density and real-seeming data for design quality.

### Dispatch C: Shift Handoff — 1/4 (unchanged, and the reasoning holds up)

Confirmed on fresh render: beige background, serif operator names, rounded
warm-toned alert cards, and an unusually tall single-column layout for a
time-pressured handoff task. This is the sharpest example in the whole
project of the brief's central claim — that a named, describable design
direction ("warm humanist") can still be a wrong and vibe-coded choice for a
specific product. The underlying data and logic are identical to Dispatch A
and B (same load list, same urgency signals); only the skin changed, and the
skin actively works against the task. Kept at 1/4. **This is the clearest
existing evidence for why "does this product's actual urgency and frequency
support this register" (Stage 1 of the new workflow) has to be answered
before any visual direction is chosen** — this exercise chose the direction
first and the product second.

### Dispatch D: Live Board — 3/4 (unchanged)

Structurally the most original of the four Dispatch directions — a real
timeline/gantt strip is a different information architecture from a table or
a card stack, not just a different skin on the same layout, and that's
genuine structural authorship worth crediting on its own terms. But the
visual execution (black background, monospace type, a red "LIVE" pill) pulls
it straight back into the dark-console cluster this project's own convergence
audit already flagged as one of only two schools this project ever produces.
The concept is ahead of the execution.

### Perigee Mission Control — 2/4 (unchanged)

Confirmed: dark sidebar, three summary stat cards, colored status pills
(Anomaly/Caution/Nominal/Recovered), monospace metadata, thin borders. This
remains the most textbook example in the whole set of the convergence
problem — swap "capsule," "reentry," and "telemetry" for "server," "deploy,"
and "uptime" and nothing about the visual system would need to change. The
domain vocabulary is real and specific; the interface around it is not.

## Cross-cutting findings

**The placeholder-image problem is the single most repeated structural
defect in the set**, not a cosmetic one: Fourth Street Barber, North Bench
Coffee, and Fenwick Museum (6 instances) all substitute "photography
pending" text for the actual asset that would carry most of their real-world
identity. This is the Garden skill's Asset Protocol finding landing directly
on this project's own prior work — a correct color token is not brand
identity, and for three of ten exercises the missing asset is not a
nice-to-have, it is close to the entire product.

**Two exercises (Ridgeline Flags, Northfield Sessions) have their real
problem misdiagnosed by the original round-1 critique as a "vibe" issue when
it is closer to a structural or informational one** — Ridgeline's detail page
is under-built, not just under-styled; Northfield's identity is
color-dependent in the same way the preset experiment demonstrated for the
four SaaS presets.

**No score moved up.** Two moved down (Northfield Sessions, Dispatch B),
seven held, one (Ridgeline) held its number but gained a more specific
structural diagnosis. This is consistent with the brief's instruction not to
inflate scores and its expectation that a harsher pass would not produce a
4/4 anywhere in the existing set — none of the fresh scores approach 4.

## Redesign nominations for task #33

Per the brief's requirement to redesign at least one small-business, one
developer-tool, and one operational example, plus Northfield Sessions
(covered separately in `NORTHFIELD_REDESIGN_STUDY.md`):

- **Small business**: North Bench Coffee — chosen over Fourth Street Barber
  because the missing-asset problem is more functionally damaging for a
  product a customer must evaluate sight-unseen before buying.
- **Developer tool**: Ridgeline Flags — chosen because its detail-page
  under-specification makes it the clearest case for practicing the new
  workflow's Stage 1 (Product Reality) before any visual work begins.
- **Operational application**: Dispatch C: Shift Handoff — chosen because it
  is the project's own named, explicit failure case, and because Dispatch A
  and B's proven interaction logic already exists to redesign against rather
  than needing to be reinvented from zero.

## Limitations

This review was conducted by the same agent that built the original
exercises and that already knew the user's prior critique verbatim before
looking at a single screenshot. Genuine effort was made to reason from the
renders rather than restate the given critique (two scores moved, and the
reasoning for each is tied to a specific visible defect, not a paraphrase of
the brief), but this is not equivalent to the fully blind, prompt-and-
rationale-hidden review the brief's Stage 9 and its own completion gates
call for. That review — ideally comparing each exercise side-by-side with a
matched professional example and a documented vibe-coded example, with no
labels — is still owed and should be treated as a distinct, not-yet-complete
step, not something this document already satisfies.
