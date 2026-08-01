# VibeFyre Preset Analysis

Round 9b of the design-calibration project supplied four fully-specified "premium
design system" presets (referred to here by their given names — Indigo
Infrastructure, Terminal Green, Focus Flow, Midnight Triangle) as a controlled
experiment, plus an explicit instruction to test them against a brief they were
**not** written for, compare them against a genuinely researched fifth direction,
and check whether each design survives having its accent color removed. This
document reports that experiment.

## Method

All five versions share one brief, one content model, one set of routes, and one
set of interaction requirements — only the CSS (and, for the custom version, the
minimum HTML/JS needed for one structural difference) changes. This isolates
*visual system* as the only variable.

- **Brief**: a university coursework portal — course list + course detail with
  assignment status and a file-submission flow. Deliberately not fintech, not a
  developer tool, not an API dashboard — none of the four presets' named
  reference products (Stripe, Supabase, Linear, Vercel) build anything like it.
  This is the point: the presets are marketed as general-purpose "premium"
  systems, so a mismatched category is the real test of that claim.
- **Shared code**: `data.js` (4 courses, realistic meeting times/grades/due
  dates, one assignment with a genuine technical prompt — 40,000-row schema
  query optimization, not placeholder lorem ipsum), `list.js`, `detail.js`
  (working file-input + submit interaction, not a static mock).
- **Five stylesheets**: `preset-a.css` through `preset-d.css` implemented
  faithfully to the given specs (exact hex values, exact font pairings, hairline
  borders, spring-curve transitions approximated as
  `cubic-bezier(0.34, 1.56, 0.64, 1)`, hover states on every interactive
  element), plus `custom.css` — a fifth direction with its own research
  grounding, described below.
- **Tests run**: desktop (1440px) and mobile (390px) full-page renders of both
  routes for all five versions; a "no-accent" test that overrides each
  version's accent/primary custom property to a neutral gray via
  `page.addStyleTag()` and re-screenshots, to check whether the design still
  reads as considered once its one vivid color is gone.

All renders are in `exercises/preset-experiment/`. Screenshots referenced below
were viewed directly, not inferred from code.

## Per-preset findings

### Preset A — "Indigo Infrastructure" (Plus Jakarta Sans / Inter, Stripe-coded)

**Useful constraint it enforces**: a real numeric palette with defined
secondary/accent roles, a named border color, a specific easing curve — an
agent given only "make it look premium" would not arrive at this level of
specificity on its own, and specificity is genuinely better than vagueness.

**Vibe-coded risks confirmed by the render**: rounded white cards on pale
blue-gray, soft drop shadows, translateY-on-hover, Plus Jakarta Sans headings
over Inter body — this is visually almost interchangeable with Preset B and D's
card grids once color is factored out (see no-accent test below). The
"Stripe-inspired" framing borrows Stripe's specific brand equity for a product
that has nothing to do with payments infrastructure.

**Product-fit problem**: nothing about a course list needs indigo-on-white
fintech trust signaling. The preset answers a branding question ("look
premium") the brief never asked, instead of a structural one ("what does a
student actually scan first").

### Preset B — "Terminal Green" (DM Sans / Inter, Supabase-coded)

**Useful constraint**: forces a real dark-mode palette with contrast-checked
role separation (background vs. surface vs. border), which is harder to get
right than it looks.

**Vibe-coded risks confirmed**: this is the single most recognizable "AI
developer tool" aesthetic in the whole set — dark navy, one green accent,
monospace course codes for no functional reason (course codes aren't code).
Applying a developer-tool dark theme to a student's own grades and assignments
inverts the actual use context: students check this during the day, often on
a phone between classes, not in a terminal at night.

**Product-fit problem**: the darkest, most "control room" of the four presets
attached to the least urgent, least technical of the four candidate products.

### Preset C — "Focus Flow" (Space Grotesk / Inter, Linear-coded)

**Useful constraint**: glass-panel/gradient treatment is at least a genuine
attempt at atmosphere rather than flat color, and the two-column grid with
generous gap is a real layout decision.

**Vibe-coded risks confirmed**: `backdrop-filter: blur()` panels over a radial
indigo gradient is Linear's specific visual signature, not a general
"productive" solution — reproducing it elsewhere reads as imitation, not
inspiration. On rendering, the glass panels add real visual noise (edge
aliasing, blur cost) for zero functional benefit on a list of four courses.

**Product-fit problem**: "moody and productive" is a mood for creative or
technical deep-work tools. A course list is neither moody nor a flow state —
it's a five-second daily check.

### Preset D — "Midnight Triangle" (Manrope / Inter, Vercel-coded)

**Useful constraint**: the single-pixel-gap card grid (background-color
showing through 1px gaps instead of per-card borders) is a genuinely elegant
minimal-surface-count technique — clean in the DOM, clean in the diff, no
double-border collision.

**Vibe-coded risks confirmed**: pure black background, pure white primary,
one saturated blue accent is Vercel's specific identity, not a neutral
"precision" statement — and of the four, this is the one where removing the
accent leaves the *least* residual character (see no-accent test), because
white-on-black plus a blue link color was carrying almost the entire visual
identity.

**Product-fit problem**: "high drama and precision" for grade tracking
overstates the stakes of the product. Drama is for launches and landing pages,
not for a Tuesday check of whether a problem set got graded.

## The no-accent test

Per the brief's explicit instruction, each version's accent color was replaced
with neutral gray via a CSS custom-property override and re-rendered, without
touching layout, type, or spacing.

**Presets A, B, C, D**: in every case, the page remained fully legible,
fully "finished-looking," and fully generic — a competent, anonymous SaaS
dashboard. Nothing about the composition, the card rhythm, or the information
hierarchy changed in a way that revealed a design *problem* once the color
left — but nothing revealed a design *idea* either. The accent color was
doing the entire job of making each preset look distinct from the other
three. Strip it, and A/B/C/D visually converge toward the same object: a
two-column (or four-card) grid of rounded or hairline-bordered panels, in one
of two possible ground colors (white or near-black), with a sans-serif
heading font sitting on top of Inter body text. This is the strongest
evidence in the whole experiment for the brief's central claim: **that these
presets manufacture the appearance of decisiveness through color and
polish, not through structural authorship.**

**Custom version**: with navy and amber replaced by gray, the due-soon list
(sorted by real urgency across all four courses, not per-card), the PT
Serif/PT Sans split between course titles and UI text, and the plain
list-with-dividers composition all remained fully intact and legible as a
*different kind of page*, not just a different-colored version of the same
page. The identity survives because it was never primarily a color choice.

## Mobile behavior

All five versions reflow correctly at 390px with no overflow or breakage —
none of the presets are structurally fragile. But the same convergence problem
shows up again, more starkly: at mobile width, Presets A, B, C, and D reduce
to a **single visually identical pattern** — a vertically stacked list of
rounded-or-bordered cards, each with a code/grade row, a title, two meta
lines, and a due-date footer — differing from each other only in background
color, border treatment, and font choice. Seen without labels, side by side,
A/B/C/D-mobile are the same information architecture wearing four coats of
paint. The custom version's mobile list is structurally different: a
dedicated urgency-sorted section above the course list, addressing "what's
due soon across everything" as its own first-class question rather than
something the user has to reconstruct by scanning four separate cards. This
structural difference — not a color or font difference — is what survives
compression to a small screen, which is the harshest test of whether a
design decision was real.

## What this experiment shows

The brief asked whether these presets are a useful constraint or a
sophisticated way to reproduce vibe-coded sameness. The honest answer is
**both, and the split is legible**:

- **Genuinely useful, worth keeping as technique, independent of any preset**:
  named custom-property tokens with defined roles (background / surface /
  border / ink), a real hover-state discipline, the single-pixel-gap grid
  technique from Preset D, treating dark-mode as a first-class palette rather
  than an inverted light palette.
- **Vibe-coded regardless of which preset is chosen**: Inter as the universal
  body font across all four, a named-SaaS-brand as the entire creative
  brief ("Stripe-inspired," "Supabase-inspired," "Linear-inspired,"
  "Vercel-inspired"), identity concentrated almost entirely in one accent
  color rather than in structure or type, one motion system (the same spring
  curve, the same hover lift) applied uniformly regardless of whether the
  product's tasks are urgent, playful, dense, or calm, and — most importantly
  for this project's purposes — the assumption that "premium" has one visual
  answer that can be parameterized by swapping four hex codes and four
  Google Fonts.

None of the four presets were rejected outright, and none were adopted
outright either, per the brief's instruction not to do either. The technique
layer (tokens, hover discipline, the grid trick) was kept. The identity layer
(named-brand imitation, accent-color-as-personality, one motion system for
every task) was not.

## The custom direction's grounding

`custom.css` was not built by picking a fifth aesthetic to add to the
catalog. It started from two research questions specific to this product:

1. **What does a student actually need from this page?** Real student-portal
   UX research (on systems like MyCUinfo and comparable university portals)
   consistently finds that "what's due soon, across everything" is the
   highest-frequency real task — not browsing a grid of courses as if they
   were product tiles. That finding is why the due-soon list exists as a
   first-class section, sorted by actual urgency, not nested inside each
   course card where the student has to do the sorting themselves.
2. **What register does an institutional academic product actually need?**
   USWDS and Stanford IT's own accessibility/typography guidance for
   institutional interfaces favor plain, legible, non-"premium" register —
   informing the choice to drop the hairline-border-plus-shadow card system
   and the spring-hover-everywhere treatment entirely, in favor of plain
   dividers and a single serif/sans split that marks *content* (a course
   title, which behaves like a piece of content) as typographically distinct
   from *interface* (everything else).

PT Serif and PT Sans were chosen specifically because they are a single-
foundry (Paratype) pairing with a real, intentional relationship to each
other, and neither appears on this project's own AI-overused-typeface list —
avoiding the failure the brief explicitly warned about (a "fifth catalog
entry" competing with the same four schools).

This direction scored higher on the no-accent and mobile-compression tests
not because it is more tasteful, but because more of its identity was located
in structure and content prioritization rather than in decoration — which is
exactly the distinction this whole project has been trying to teach.

## Honest limitation

This is one brief, one comparison, five versions, reviewed by the same agent
that built them — not a blind review by an independent party, and not
independently validated against a real student's actual priorities beyond the
cited secondary research. It demonstrates the *mechanism* the brief predicted
(color-dependent distinctiveness, convergent mobile behavior, brand-borrowed
identity) clearly and repeatably across four independently-specified presets,
which is meaningful, but it is not proof that the custom direction is
"good design" in an absolute sense — only that it fails these two specific
diagnostic tests (no-accent, mobile-compression) less than the four presets
do. A genuine blind review of this comparison set is still owed as part of
this project's later blind-review phase, and should not assume the conclusion
reached here survives it.
