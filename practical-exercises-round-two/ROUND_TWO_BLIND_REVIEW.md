# Round Two — Blind Review

Protocol Step 5, run on the two builds completed so far. Three reviewers, none of whom sees source,
directory paths, creative-direction documents, or any statement of what the builder hoped to hear.

- **Reviewer D** — Exercise 01 only, under the neutral label `D`.
- **Reviewer E** — Exercise 02 only, under the neutral label `E`.
- **Reviewer X** — both, asked one question only: were these made by the same designer, and what
  makes you say so? This is the round's diversity claim put to a test that the builder cannot run on
  themselves, because the builder knows the answer.

**Standing limitation, stated first and unchanged from round 10.** These reviewers are AI agents in
fresh contexts. This is a real but limited form of independence: reliable for mechanical, structural
and arithmetic defects, materially weaker for taste, because a second similarly-trained model shares
correlated aesthetic priors with the first. Nothing here closes the "no domain reader" gap, and
nothing here is a substitute for a person.

**Capture method.** Every state was reached by driving the real interface — clicking the submit
button, choosing from the real `select`, scrolling the real page, pressing Tab. Round 10 recorded a
case where a capture script that set state directly manufactured a defect a reviewer then reported in
good faith. `capture-r2.js` calls no page internals.

---

## Predictions, recorded before the reviews returned

Committed to this file while the reviewers were still running. The scoring section below is only
meaningful because this section was fixed in advance.

### D — the glaciology quarterly

| # | Prediction |
|---|---|
| D1 | Identified correctly: an independent science publication, long-form, for a reader with a science background who is not a specialist. High confidence. |
| D2 | The marginal rail is read as the strongest device — but its **provenance is missed**. I expect it read as a table of contents or a progress indicator, not as the stratigraphic core log it is copying. The function lands; the reason does not. |
| D3 | The rail's displaced labels and leader lines are **not** noticed as a solved collision. Correctly-solved craft is invisible, which is the point and also means it goes uncredited. |
| D4 | Someone says the page is visually quiet to the point of being undifferentiated — that it reads as "a well-made article template" rather than as a publication with its own voice. This is my main exposure on D. |
| D5 | The contents list sets each entry at a scale proportional to its length. I expect this read as **inconsistent hierarchy rather than as intentional**. |
| D6 | The correction carried as a first-class contents item is noticed and approved of. |
| D7 | At mobile the rail degrades to a horizontal key above the article. I expect at least one reviewer calls it decorative or ignorable there. |

### E — the watermill guesthouse

| # | Prediction |
|---|---|
| E1 | Identified correctly: a very small guesthouse in a converted working watermill. High confidence. |
| E2 | **The absence of bedroom photography is flagged as a defect** — "a place-to-stay site that never shows you a room." This is my largest exposure anywhere in the round. The reasoning behind it is sound and is written down, but a blind reviewer sees only the artefact, and the artefact does not explain itself. |
| E3 | The photographic field is read as a gallery, and the **captions** — not the pictures — are identified as the thing that distinguishes it. |
| E4 | The section drawing is named the best single piece of work on the page. |
| E5 | Someone says it takes too long to get to the point, or that it reads as a museum record rather than as somewhere you want to sleep. Refusing a hero has a cost and I expect to be charged for it. |
| E6 | The "Before you book" section — stairs, noise, no wheel in August, the Solway — is read as the strongest thing about the product rather than as a liability. |
| E7 | The availability night-strips are read as decorative or unreadable rather than as data. |
| E8 | On mobile the stacked year list is very long. I expect "exhausting" or "should be collapsed". |

### X — the same-designer test

| # | Prediction |
|---|---|
| X1 | The verdict is **not** a clean "no". I expect "same studio, different clients" or "same designer, different brief" rather than either extreme. |
| X2 | The fingerprint they name is, in some order: a pale low-chroma ground, exactly one accent colour, tight negative letterspacing on large display type, hairline rules under section heads, and wide-tracked uppercase micro-labels. **These are my personal defaults and I expect them to be caught**, notwithstanding that the two builds differ in typeface, ground, structure, register and page architecture, which is what the diversity matrix actually constrained. |
| X3 | The differences they name are typeface and subject. The similarities they name are spacing, restraint and label treatment — i.e. the things the diversity matrix does **not** currently constrain. If that is what comes back, the matrix has been controlling the wrong variables. |

---

## Results — X, the same-designer test

**Verdict: "certainly the same" — the strongest point on the five-point scale, with the reviewer
adding "Not 'probably.'"**

### Predictions, scored

| # | Outcome |
|---|---|
| X1 | **Wrong, and wrong in the comfortable direction.** I predicted the verdict would land in the middle — "same studio, different clients" — and it landed at the far end. Predicting a hedge when the answer is unambiguous is itself the defect Governing Principle 9 describes: I graded my own separation generously. |
| X2 | **Hit, all five.** Pale low-chroma ground, exactly one accent, tightened display tracking, hairline rules under section labels, wide-tracked uppercase micro-labels — every one named. But five was not the list. The reviewer found roughly fifteen more. |
| X3 | **Hit, and stated better than I stated it.** My version was "the matrix constrains the wrong variables." The reviewer's version: every difference lives at the **specification layer** — typeface, ground value, display weight, whether there is a form — which are "exactly the knobs anyone would turn first if they were *trying* to make two sites look unrelated. They are cheap to vary and they prove nothing." Every similarity lives at the **habit layer**. That distinction is the single most useful sentence produced in this round. |

### What I did not predict at all

The three most serious findings were, again, all things I had no idea were there — the same pattern
as round 10, and the reason this review exists.

**1. The footer is not a shared convention. It is one paragraph retyped.**

> "Firn is a demonstration document, not a real publication." → grey continuation → second paragraph
> on photographs and licences → "Set in Newsreader and Barlow Semi Condensed, both under the SIL Open
> Font License 1.1."
>
> "Bellman's Mill is invented for a design exercise." → grey continuation → second paragraph on
> photographs and licences → "Set in Schibsted Grotesk, SIL Open Font License 1.1."

Same sentence shape, same bold lead-in, same two-paragraph structure, same closing colophon naming
the licence. I wrote both of these, weeks apart, believing each came from its own product. The
reviewer's phrasing is correct and worth keeping: *"This is not a shared convention; it is one
person's boilerplate retyped."*

**2. Punctuation tics I did not know I had.** The middot as universal separator (`Bergen · 3,100
words`, `Ground floor, lade side · no steps`, every photo credit) and the spaced em dash in headers,
captions and fact lists (`ISSUE 14 — TIMESCALES`, `the wheel — 3.4 m, overshot`, `800 m — red
sandstone, founded 1273`). Neither appears in any brief. Both appear in both builds.

**3. The caption is one component with the typeface swapped.** Bold lead-in clause → grey
continuation → credit on its own line → underlined licence link after a middot. Identical in both,
down to which clause gets bolded. Firn's marginal side notes are the same grammar again, wearing a
different name.

Also unpredicted, and all confirmed by re-measurement:

- **The filled hard-edged square does double duty in both** — as an identity chip (Firn's `RO` author
  square, Bellman's numbered room squares) *and* as a data mark (the rail's position marker, the
  kiln-head square on the section).
- **Exactly two rule weights, never three, with the same semantics in both**: hairline = row
  separator, heavy = new major block, section label always above the rule and left-aligned.
- **The header is the same object.** Wordmark left → plain text nav → one right-aligned *fact* rather
  than a call to action → full-bleed rule. No button, pill or hamburger at any width in either build.
- **Diagrams use lowercase grey annotations while the surrounding UI labels are uppercase** — the same
  internal inconsistency, applied identically, in two unrelated drawings.
- **Surfaces are always made lighter than the ground, never darker, never elevated.**
- **Both are willing to leave half a 1440 viewport empty**, and both *increase* display type relative
  to layout at 390px.

### The defect it found

**The year table's caption collapsed to a 72px column at 390px** — measured after the report at
72 × 440px, roughly one word per line, inside a 326px content area. The mobile rule set
`display: block` on `table, tbody, tr, th, td` and omitted `caption`, which stayed `table-caption`
inside a block table and shrink-wrapped. **Fixed**; the caption now runs the full 326px.

This is a defect class the existing harness cannot see. The render check tests for horizontal
overflow and console errors, and a 72px caption produces neither — it does not overflow, it does not
error, it is simply unreadable. A new check (`evaluation/narrow-text.js`) now flags any element whose
text needs more than three lines in a box under 200px wide, at every tested width.

### The judgement worth not flinching from

> "The taste is real but it is also a hiding place. Both sites reach for the same tiny-caps-label-
> over-a-hairline move whenever they need to *signal* seriousness, and the restraint is quietly doing
> work that a stronger structural idea ought to be doing. Strip the accent colour out of either and
> you'd struggle to say what the page was actually arguing."

That is a fair charge against Firn and a partly fair one against Bellman's, whose survey field and
section drawing are structural arguments that survive losing the accent. It is recorded here rather
than argued with.

### Pre-registered test for Exercise 03

The reviewer was asked to predict three things a third site by the same author would almost certainly
do. Those predictions were made with no knowledge that a third site was planned, which makes them a
genuine pre-registration rather than a checklist I wrote for myself:

1. A non-white off-white ground, exactly one chromatic accent doing eyebrow labels, links and one data
   mark, a red reserved solely for errors, and no radius, shadow or elevated card anywhere.
2. A bespoke hand-built SVG explainer in the accent colour on a lighter-than-ground panel, with
   hairline leaders and lowercase grey annotations, plus a two-column label/value fact table with
   hairline row rules and no vertical rules.
3. A footer opening with a bold clause admitting the site is a design exercise, crediting CC
   photographs by name with underlined licence links separated by " · ", and closing by naming the
   typeface and its SIL Open Font License 1.1.

Plus the "safe extras": 10px uppercase labels tracked ~+0.1em above a rule; a spaced em dash in header
metadata; a square accent focus outline; one column at 390px with the nav wrapping under the wordmark.

**Exercise 03 will be checked against this list before it is committed.** The interesting outcome is
not avoiding all of them — some are defensible and one (the disclosure footer) is an honesty
requirement that should not be traded away for novelty. The test is whether each one can be *chosen
again on its own merits for this product*, or whether it arrives unexamined. Any that arrives
unexamined is a confirmed default and goes into `CLAUDE_DESIGN_DEFAULTS.md` as such.

## Results — D and E

*Both reviewers were still running when this section was written. Their findings will be added here.
If either fails to return, that is recorded as a failure rather than replaced by the builder's own
judgement.*
