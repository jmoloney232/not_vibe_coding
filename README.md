# not_vibe_coding — start here

A design-calibration project. It exists to answer one question: **why does AI-generated interface work
look AI-generated, and what specifically has to change.** The answers are evidence-backed — built,
rendered, independently reviewed, and corrected when the review disagreed.

**This file is the routing layer. Read it first, then read only what your task needs.**

The repository is large: about **280,000 tokens** of documentation and code. Reading it all is almost
always the wrong move. Most tasks need this file plus one or two others — roughly 5,000–15,000 tokens.

---

## The eleven rules that carry most of the value

Inlined so that a straightforward build needs no further reading. Every one is here because it was
learned by getting it wrong first; the citation is where the evidence lives.

**1. Design from the product, not from a layout vocabulary.** The structure should be derivable from
what the thing *is*. A mill is a stack of floors, so its rooms are shown in a building section. An ice
core is read down its length, so the article is annotated like a core log. If the structure would work
equally well for an unrelated product, it is a template.

**2. Never fake an asset.** No blank rectangles, no gradient stand-ins, no "photography pending", no
stock image standing in for a thing that does not exist. Two legitimate routes: **author the asset
from real values in code** (a computed tide curve, a woven cloth, a scale drawing), or **source real
licensed material** and credit it inline. If the honest asset does not exist, that constraint should
change the design — it is information, not an obstacle. *(`practical-exercises-round-two/02-mill-guesthouse/README.md`)*

**3. Test typography, don't select it.** Render **three materially different directions on the real
content** (`practical-exercises-round-two/evaluation/02-studies/typography.html` is a working template) and reject two for stated functional reasons. Expect the best-looking one to lose:
directions usually fail on **register or role**, not legibility. *(§8)*

**4. Do the same for the ground colour.** A written colour decision that has not been rendered against
the real assets is a guess. A pre-committed "dark, sampled from the photographs" died in one look once
the actual images existed. *(`practical-exercises-round-two/evaluation/02-studies/ground.html`)*

**5. Put every signature move through six questions.** Does it improve comprehension, navigation, task
completion or emotional fit? Does it emerge from the subject or get applied to it? Does it survive real
content? Does it survive mobile? Does it scale to a second route? **Would the design be better without
it?** If the honest answer to the first is "it demonstrates creativity," remove it. A conventional
structure executed with exceptional judgment beats a forced signature device. *(`practical-exercises-round-two/FIRN_LESSONS.md`)*

**6. Render before you believe anything.** Every build here shipped defects that were invisible in
source and obvious on screen. The repeatable classes:

- CSS written for markup the page never emits *(happened twice — check every responsive selector matches something real)*
- a generated figure positioned one unit off, silently overdrawing other content
- label collisions in generated graphics *(fix it once, then check the figure next to it)*
- a comparison set whose members have different aspect ratios — **anything presented as a set gets one shape**
- text that is narrow but not overflowing, so no error fires and nothing scrolls
- CSS beating a JS presentation attribute, rendering content invisible
- a figure legible at 1440 and illegible at 390 — **two compositions, not one that scales**
- prose composed from data fragments: table cells are noun phrases and break sentences
- `:focus-within` on date inputs — Chromium focuses a shadow-tree segment, so no ring appears
- attribution text as the least readable thing on the page, when it is a licence obligation

**7. Independent review finds what you structurally cannot.** Across two rounds, **the most serious
defect in every single build was one the builder did not predict.** Commit your predictions *before*
the review returns, or the comparison is a retrofit. *(`BLIND_REVIEW_ROUND_10.md`, `practical-exercises-round-two/ROUND_TWO_BLIND_REVIEW.md`)*

**8. Capture states by driving the real interface — and scroll before capturing.** A script calling
internal functions manufactured a defect a reviewer reported in good faith. A later script that obeyed
that rule still manufactured two, because `loading="lazy"` images below the fold are never requested by
a `fullPage` screenshot. Then **measure every reported defect before acting** — of one round's
findings, two were refuted and two were the harness's fault.

**9. Varying typeface, colour and layout will not make two projects look different.** Two builds made
under a matrix constraining thirteen axes were judged **"certainly the same"** author. Differences sat
at the *specification layer* — the knobs anyone turns first. Similarities sat at the **habit layer**:
caption grammar, punctuation, rule weights, focus treatment, spacing construction, and two footers that
were one paragraph retyped with two nouns changed. **Before a second project in a series, list the ten
smallest things the first did unasked, and vary those.** *(Appendix L §L1)*

**10. Know your own defaults.** Measured across five builds: rounded-card tiles and guide-citing code
comments are **closed**; uppercase micro-labels appear in **5 of 5** builds; and two spacing scales
derived weeks apart were different numbers built by the same Fibonacci method — changing the output did
not change the generator. *(`CLAUDE_DESIGN_DEFAULTS.md`)*

**11. Restraint is not automatically correct.** Bland is a failure mode too. Removing something because
it "might look AI-generated" is defensive restraint and is not a product reason. *(§0, Governing Principle 4)*

---

## Route by task

| If you are… | Read | Cost |
|---|---|---|
| **Building an interface** | This file. Then `ANTI_VIBE_CODING_UI.md` **§0** (principles) and **§24** (build checklist). Skim §4 for the failure patterns. | ~14k |
| **Reviewing someone's interface** | This file, then §19 (self-critique), §20 (heuristic tests), §23 (definition of done), §25 (review template) | ~7k |
| **Choosing typefaces** | This file's rule 3, then §8, then run a real specimen test — copy `practical-exercises-round-two/evaluation/02-studies/typography.html` | ~4k |
| **Choosing colour** | Rule 4, then §9, then build a ground study — copy `practical-exercises-round-two/evaluation/02-studies/ground.html` | ~3k |
| **Deciding how ambitious to be** | §6 (creative direction, expression budget) and §0's restraint principles | ~13k |
| **Looking for a reference** | `DESIGN_REFERENCE_ATLAS.md` (or `design-reference-atlas.json` to query) — do not read `PROFESSIONAL_WEB_DESIGN_RESEARCH.md` unless the atlas is insufficient | ~8k |
| **Wanting a worked example** | Pick one build below and read its README | 2–4k each |
| **Continuing this project** | This file, then `practical-exercises-round-two/EXPANDED_DIVERSITY_MATRIX.md` and `practical-exercises-round-two/ROUND_TWO_BLIND_REVIEW.md` | ~9k |
| **Auditing what is claimed vs proven** | `ANTI_VIBE_CODING_UI.md` Appendix L, then `CLAUDE_DESIGN_DEFAULTS.md` | ~8k |

**Do not read `ANTI_VIBE_CODING_UI.md` end to end.** It is ~70k tokens; §0–§26 is ~49k and Appendices
A–L are ~23k of project history. Jump to sections.

---

## The five worked examples

Each is a complete, verified build with a README explaining what was chosen, what was rejected and
why, and what is still unverified. **These are the fastest way to see the standard.**

| Build | What it demonstrates | Routes |
|---|---|---|
| [`practical-exercises-round-two/01-science-publication/`](./practical-exercises-round-two/01-science-publication/) — *Firn* | Structure derived from the subject; two compositions of one figure; licensed photography | 2 |
| [`practical-exercises-round-two/02-mill-guesthouse/`](./practical-exercises-round-two/02-mill-guesthouse/) — *Bellman's Mill* | **The asset constraint changing the design.** Photography-led with no faked images; scale drawing; honest disclosure as the product argument | 2 |
| [`examples/lead-service-register/`](./examples/lead-service-register/) | 1,142 real marks; material encoded by shape so it survives greyscale; a civic document register | 1 |
| [`examples/harbour-almanac/`](./examples/harbour-almanac/) | Assets authored from real harmonics — nothing is drawn that is not computed | 1 |
| [`examples/drawdown-studio/`](./examples/drawdown-studio/) | Interaction as the content; cloth computed live from notation | 1 |

Both round-two builds carry print stylesheets and pass: no console errors, no horizontal overflow,
WCAG AA on all text, every focus stop visibly ringed.

---

## What each top-level file is

**Operational — consult as needed**

- `ANTI_VIBE_CODING_UI.md` — the guide. Jump to sections; see the routing table.
- `CLAUDE_DESIGN_DEFAULTS.md` — this builder's measured recurring habits, with evidence and status.
- `DESIGN_EVALUATION_PROTOCOL.md` — the 9-step build/review protocol.
- `DESIGN_REFERENCE_ATLAS.md` / `design-reference-atlas.json` — named references with evidence tiers.

**Research inputs — read only if the guide's claim needs checking**

`PROFESSIONAL_WEB_DESIGN_RESEARCH.md`, `TYPOGRAPHY_RESEARCH.md`, `MINIMALISM_RESEARCH.md`,
`research/*` — the source material behind the guide's assertions.

**History — do not read unless doing archaeology**

`FINAL_CALIBRATION_REPORT.md`, `EXISTING_EXERCISE_REVIEW.md`, `VIBEFYRE_PRESET_ANALYSIS.md`,
`NORTHFIELD_REDESIGN_STUDY.md`, `PRACTICAL_REDESIGNS.md`, `ROUND_10_EXAMPLES.md`, and
`ANTI_VIBE_CODING_UI.md` Appendices A–K. **`exercises/` is round-zero work, superseded by
`examples/` and `practical-exercises-round-two/`** — it is kept as a before-picture, not as a model.
Appendix K in particular contains four claims that were true when written and are now false; it
carries a supersession notice pointing to Appendix L.

---

## Current state

- **Built:** 5 verified examples, all blind-reviewed, all findings acted on.
- **Round two:** 2 of 12 exercises built. The plan is `practical-exercises-round-two/EXPANDED_DIVERSITY_MATRIX.md`.
- **Next exercise:** 03, Meridian Credit — a very dense credit-research workspace, and the first of four
  briefed to ship with **no signature device at all**, because a conventional structure executed with
  exceptional judgment is the harder and better answer for that brief.
- **Pre-registered test:** an independent reviewer predicted three things a third build by this author
  would do. Exercise 03 is checked against that list before it is committed — recorded at the end of
  `ROUND_TWO_BLIND_REVIEW.md`.

**Known gaps, stated plainly:** no human or domain practitioner has reviewed any build — every blind
review so far is an AI in a fresh context, which is reliable on structure and arithmetic and weak on
taste. No screen-reader pass anywhere. The round-two evaluation set (comparative review, scoring,
regression report, fingerprint audit) does not exist yet. And the specification-versus-habit-layer
finding in rule 9 has been diagnosed but not acted on — the diversity matrix still constrains only the
specification layer.
