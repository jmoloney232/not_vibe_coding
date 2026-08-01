# Round 10 — Three Examples Against This Project's Own Findings

Three new builds in `examples/`, chosen to attack the two most concrete, most self-implicating
findings this project has produced about its own work rather than to demonstrate the guide again.

| | Example | School | Primary asset |
|---|---|---|---|
| 1 | [`lead-service-register/`](examples/lead-service-register/) | Brutalist/Raw | A plate of 1,142 marks, one per household |
| 2 | [`harbour-almanac/`](examples/harbour-almanac/) | Specialty/Genre | Tide curve, moon, and light-timing diagrams, computed |
| 3 | [`drawdown-studio/`](examples/drawdown-studio/) | Motion/Experimental | Cloth, computed live from the draft |

## The two findings these were built against

**Finding 1 — convergence.** `PROFESSIONAL_WEB_DESIGN_RESEARCH.md`'s round-2 audit classified 15 prior
outputs and found 11 in just two Garden schools, with **Brutalist/Raw, Motion/Experimental, and
Specialty/Genre never attempted at all**. It called this "the single most concrete, self-implicating
finding" of that round. These three take one untouched school each. That is the whole reason for the
domain choices; the domains are downstream of the schools, not the other way round.

**Finding 2 — the Asset Protocol.** `EXISTING_EXERCISE_REVIEW.md` calls the placeholder-image problem
"the single most repeated structural defect in the set", across Fourth Street Barber, North Bench
Coffee, and Fenwick Museum. The round-2 Garden re-inspection sharpened it: a recipe whose defining
asset is commissioned illustration cannot be executed by an agent that cannot commission illustration,
so applying its tokens "does not produce a Mailchimp-style result, it produces a shell wearing
Mailchimp's palette."

Every one of these three has a primary visual asset that is **genuinely authored in code from real
data or real mathematics**, not a photograph substituted for or apologised about:

- A survey plate of 1,142 marks whose distribution *is* the argument the page makes.
- A tide curve from a six-constituent harmonic synthesis, a moon disc from its illuminated fraction, and
  light characteristics drawn to scale in seconds and animated in real time.
- Woven cloth computed from threading × tie-up × treadling.

This is offered as a real answer to the asset problem for a class of briefs, not as a general one. It
does not help a barbershop. `PRACTICAL_REDESIGNS.md` already makes the same caveat about North Bench,
and it still stands: where photography is the honest answer, a data-forward substitute is a
consolation, not an improvement.

## Other named defaults these were built to test

From `CLAUDE_DESIGN_DEFAULTS.md`:

- **Default 3 (copying the guide's illustrative spacing scale verbatim).** Three examples, three
  independent derivations: the register's scale comes from the plate's 12px mark on a 3px gutter; the
  almanac's from the leading of its running text, as a book page is measured; the studio's from one
  warp end by one pick. No scale is shared between them, and none matches the guide's "e.g." list.
- **Default 4 (monospace reached for beyond its need).** None of the three uses a monospace face
  anywhere, including in a dense ledger, a tide table, and a set of technical grids. Tabular figures
  do the alignment work, which was always the actual requirement.
- **Default 5 (rounded summary tiles as a reflex).** No card grid appears in any of the three. The
  register's four material counts are a plain label/value stack with rules; the almanac's three columns
  are separated by heads and rules only.
- **Default 6 (uppercase micro-labels applied as a blanket convention).** Present in all three, and
  worth flagging honestly rather than claiming a win: uppercase letterspaced labels are used for
  section heads and quadrant labels in each. The register's stylesheet carries **seven** distinct
  uppercase roles (masthead bar, record heading, record field labels, table headers, form label,
  guidance headings, colophon meta), against the ~4–5 threshold Default 6 itself proposes. Default 6
  states the test per screen and this count is per page, so it is an upper bound rather than a
  confirmed breach — but it is the wrong side of the line either way. **Not fixed. Logged.**
- **Defaults 7 and 8 (cool teal accent; dark theming for "serious" products).** Not applicable and not
  reached for: the three accents are a stamp red taken from inspection stamps, chart magenta taken from
  admiralty convention, and no accent at all. All three are light-ground.

## The accent-abstraction test, applied deliberately

`EXISTING_EXERCISE_REVIEW.md` downgraded Northfield Sessions specifically because its identity was
colour-dependent — "does it survive with the colour and the names abstracted away?" Each of these
three was built so the answer is yes by construction:

- **Register**: the four materials differ in *form* (solid, solid, outline-with-dot, faint outline), so
  the plate survives greyscale. Colour is redundant, deliberately.
- **Almanac**: strip magenta and the plate still reads — the argument is carried by the curve against
  the night bands and by the timing bars' proportions.
- **Studio**: selection, focus, and active state use no hue at all. Every colour on the page is yarn.

## What the process actually caught

Six defects, none of which was visible in the source. Each is the Design Evaluation Protocol earning a
step:

| Step | Defect |
|---|---|
| 1 — render first | `line-height: calc(var(--lead) / 17 * 1.18)` resolved to **1.39 pixels**, because `--lead` is a length. Every list and table in the almanac was collapsed into overlapping text. |
| 1 — render first | The almanac's moon was drawn inverted: lit limb dark, so a 1% waning crescent read as a full moon. |
| 1 — render first | The studio's cloth rendered as a blank rectangle — the colour orders named slot `1` throughout, so warp and weft resolved to the same yarn and the interlacement vanished under one flat colour. |
| 2 — real interaction | The register's address lookup returned **two** results for `812 Kesler Ave`: house numbers were overrunning their hundred-block, so the 700 block ran up to 868 and collided with the 800 block. |
| 3 — data extremes | The almanac's tide model printed its **smallest** range at full moon. N2's amplitude exceeded S2's, so the 27.6-day perigean beat swamped the spring–neap cycle. Correct now by construction: S2's phase is derived from the epoch new moon plus the harbour's age of tide. |
| — new category | The studio's copy told the reader to "set both colours the same", and the interface made that impossible, because the second yarn was chosen automatically. Neither half was wrong alone; the *agreement between the writing and the interface* was. Fixed by adding the control, not by softening the sentence. |

That last one is worth adding to the protocol. Steps 1–3 check the render, the interaction, and the
data. Nothing currently checks whether the prose makes a claim the interface can honour — and this is a
failure mode an agent is unusually prone to, because it writes both halves fluently in the same pass.

## The gate this round does not clear

**Protocol Step 5 — independent blind review — has not been run on any of the three.** These were
built and assessed by one agent. Every claim above about mechanics is measured: reload stability,
interlacement correctness against an independent re-implementation, contrast ratios on rendered pairs,
keyboard reachability, overflow. Every claim about *perception* — that the register reads as a document
of record, that the almanac reads as a genuine almanac rather than a pastiche of one, that the studio
reads as a workshop instrument — is a hypothesis.

`CLAUDE_DESIGN_DEFAULTS.md` Default 1 documents this exact failure recurring three separate times
across three separate rounds, and states the rule plainly: a fluent, internally-consistent rationale
*feels* like verification while it is being written. This document is a rationale. It is not evidence.

Three further gaps, stated rather than omitted (Protocol Step 9):

- No screen-reader pass on any of the three. Keyboard paths are driven and asserted; ARIA patterns are
  built to spec but unverified with real assistive technology.
- No domain reader. A resident looking up their own pipe, a navigator reading a tide table, and a
  weaver reading a draft are the three people who would find the real problems, and none has seen these.
- The register's uppercase-label count exceeds this project's own proposed threshold and was left
  as-is rather than fixed, so it can be counted rather than argued about.
