# Round 10 — Blind Review

Protocol Step 5, run on the three `examples/` builds. Each reviewer received rendered screenshots
only, at desktop and mobile width plus detail and interaction states, under neutral filenames (`A-`,
`B-`, `C-`), with no product name, no directory path, no creative-direction document, and no statement
of what the builder hoped to hear. Reviewers were instructed not to look for source or related files.

**Standing limitation, stated first.** These reviewers are AI agents in fresh contexts. Per Governing
Principle 9 this is a real but limited form of independence: reliable for mechanical and structural
defects, materially weaker for taste-based claims, because a second similarly-trained model shares
correlated aesthetic priors with the first. Agreement between them is not the same evidentiary event
as a human or a domain practitioner disagreeing. Nothing below should be read as closing the
"no domain reader" gap.

## Predictions, recorded before the reviews returned

Written and committed to file while the reviewers were still running, so the comparison in the
findings section is a test rather than a retrofit. Protocol Step 8 asks for intent against perception;
that only means something if the intent is fixed in advance.

### A — the register

| # | Prediction | Confidence |
|---|---|---|
| A1 | Identified as a municipal water utility's lead-pipe inventory for residents | High |
| A2 | The plate of marks is read as doing real informational work, not as decoration | **Medium — this is the exercise's central open question** |
| A3 | "Unknown" and "Galvanized" marks are called hard to tell apart at a glance | Medium |
| A4 | The large empty area to the right of the masthead is flagged as unbalanced | Medium |
| A5 | The relationship between the headline "445" and the total 1,142 is called unclear | Low–medium |
| A6 | Risk I expect to be told about: the flat, hard, legalistic register reads as cold or alarming for a public-health page aimed at worried residents | Low, but it is the failure I would least expect to see coming |

### B — the almanac

| # | Prediction | Confidence |
|---|---|---|
| B1 | Identified as a tide and navigation almanac for a harbour | High |
| B2 | Read as a real working instrument rather than an aesthetic exercise | **Medium-high — the exercise's central open question** |
| B3 | The absence of moonrise and moonset is noticed as a gap | Medium |
| B4 | The light-timing bars are read as genuinely informational rather than decorative | Medium |
| B5 | Someone asks why this harbour, or what task the page is for — the page states conditions but never states a use | Medium |
| B6 | Risk I expect to be told about: the whole thing reads as pastiche — a convincing costume of an almanac rather than one | Low–medium |

### C — the studio

| # | Prediction | Confidence |
|---|---|---|
| C1 | Identified as a weaving draft tool | Medium — a reviewer with no weaving background may not get there |
| C2 | **It is not obvious that the grids are editable.** The only affordances are a pointer cursor and one sentence of body copy; nothing in the drawing says "click me" | **High — I expect this to be the main finding** |
| C3 | The four-quadrant relationship is partly worked out, with the explanatory section below doing most of the work rather than the layout itself | Medium |
| C4 | The mid-animation state is read as intentional, because of the unwoven warp below the fell | Medium — this was designed against specifically and may still fail |
| C5 | The "Warp 2 / Weft 2" rows appearing and disappearing between drafts is found confusing | Low–medium |

## Predictions, scored

| # | Outcome |
|---|---|
| A1 | **Hit.** "A public lead service line inventory for Ward Seven of a water utility… Audience: residents." |
| A2 | **Hit, and stronger than predicted.** The reviewer verified it rather than accepting it: "I zoomed the 700 Ferrand St block and counted: a 12×7 grid = 84 marks, and Table I lists 84 connections… This is a true unit chart, not a texture that looks like data." They also read the finding off it unprompted — "every heavily-red block is 1890–1939 and every clean one is 1956–1994." |
| A3 | **Missed, in the design's favour.** The shape encoding was called "the single best craft detail on the page." |
| A4 | **Missed.** The masthead's white space was never mentioned. |
| A5 | **Partial hit.** Not the arithmetic, but the label: "451 connections still carrying lead or galvanized pipe scheduled for replacement" was flagged as parsing two ways. |
| A6 | **Missed.** The legalistic register was not called cold. |
| B1 | **Hit.** |
| B2 | **Hit.** "Real instrument, with two or three numbers that don't survive checking… the arithmetic is load-bearing and correct in places nobody would bother faking." |
| B3 | **Missed** as a complaint — the disclosure was read as a point in the page's favour: "the disclaimer that names its own failure modes." |
| B4 | **Half.** The bars were read as informational but the caption's claim about them was caught as false. |
| B5 | **Missed.** |
| B6 | **Missed.** Not read as pastiche. |
| C1 | **Hit.** |
| C2 | **Hit, and this was the main finding, as predicted.** "Inputs and outputs are styled identically… no cursor affordance, no hover tint, no border weight difference." |
| C3 | **Hit.** The reviewer worked the relationships out from alignment rather than from the prose — "the tie-up shares the threading's horizontal gridlines *and* the treadling's vertical gridlines… This is the best single piece of information design on the page." |
| C4 | **Hit, conditionally.** Read as intentional "but only because of the ghosted treadling squares." |
| C5 | **Hit.** "WARP 2 … isn't a second warp, it's the alternate end in the colour order." |

Twelve of seventeen predictions landed. That is not the useful number. The useful number is that
**the three most serious defects found were all things I did not predict at all** — and all three
are exactly the category Governing Principle 9 says a builder's own reasoning pass will not generate.

## The three findings I had no idea were there

**1. The register's headline numbers silently excluded the unknowns.** "Share affected" and the
headline count were computed over lead and galvanized only, while the guidance section is titled
"If your line is lead, galvanized, **or unknown**" and tells those households to filter and flush.
The reviewer put it exactly right: "The headline number says you're fine; the guidance says behave as
if you have lead." 1200 Ostrander Rd read as "6%" while 20% of its connections were unclassified.
Two parts of one page, each internally consistent, disagreeing with each other about the same
household. **Fixed**: the unknowns now have their own headline figure beside the affected count, and
Table I's note defines "share affected" and says what it leaves out and why.

**2. The almanac's light bars broke their own caption.** The caption promised "each bar is one full
period of the light, drawn to scale in seconds", but each bar was normalised to its own period — so a
one-second quick flash and a twelve-second composite group occupied identical width. As the reviewer
noted, they "are not comparable to each other, which is precisely what 'to scale in seconds'
promises." **Fixed**, and fixed in the direction that keeps the claim rather than softening it: all
five bars now share one twelve-second axis with each pattern repeating across it, so a quick flash
is drawn twelve times over and the comparison the caption offers is the one the reader can make.

**3. The drawdown's treadling was misaligned with its own cloth by about 1.5 rows.** Measured off the
render: cloth at y=627, treadling at y=648. The treadling's visible label sat in the flow while the
cloth had no label above it, so the two grids started on different lines. The reviewer identified
both the effect and its cost: "'One row for every pick of weft' is true in the code and false on
screen — you cannot slide your eye across from a treadling row to its pick. The one reading gesture
the layout exists to support doesn't work." **Fixed** by lifting the label out of the flow; both
grids now start at y=743 at desktop and y=623 at mobile, asserted.

## A methodological finding: the review inherits the harness's bugs

The C reviewer reported, with care and correctly from what they were shown, that the selected draft
tab said "2/2 twill" while the content was log cabin — and called it "the worst kind of bug on a page
whose entire job is teaching correspondence."

**It was not a page bug. It was mine, in the screenshot script.** The capture called `loadDraft()`
directly instead of clicking the control, bypassing the handler that syncs the tab. Clicking "Log
cabin" in the real page sets `aria-checked` correctly, which is now asserted.

This is worth recording because it is a failure mode the Design Evaluation Protocol does not currently
name. Step 1 says render before evaluating; Step 5 says give the reviewer screenshots only. Nothing
says the screenshots must be produced by driving the interface the way a user would. A capture script
that sets state directly can manufacture a defect that does not exist, and a blind reviewer has no way
to tell the difference — they will report it as real, in good faith, with evidence. **The rule that
follows: capture states by driving the real controls, never by calling internal functions.** The page
was hardened anyway so that `loadDraft` owns the sync and the desync is unreachable by any path.

The reverse also happened, and is worth the same note: the reviewer read the mobile draft as "Not
scrollable — clipped." It *was* scrollable, by 33px. A static screenshot cannot show scrollability.
The finding was still correct in substance — an affordance nobody can see is not an affordance — and
the fix was to make the draft fit at 390px rather than to argue about it.

## Everything else, and what was done

**Register.** Ledger stacks into one block per record below 760px, so the Window column — "the most
actionable field on the page", previously scrolled off the right edge with no visible affordance — is
now in view at 390px, asserted. The record panel is sticky on mobile so a tapped mark does not update
something off-screen. A trench-order column makes the replacement sequence readable without mentally
re-sorting fourteen rows. The red/grey percentage threshold is now stated. The plate note says what
the plate is for and, more usefully, what it is not for. The fiction disclosure moved from the last
line of the colophon to a strip above the masthead — the reviewer's closing point, that a page
imitating a statutory filing with a PWSID and a CFR citation should not bury that, is right and is
about more than design. Copy fixes: singular "resident's report" for 61 records, the ambiguous
headline label, and the intro's claim that the mark always tells you the material when for 167
connections it explicitly does not.

**Almanac.** IALA region error corrected — the stated position is in Region B waters, where red is
kept to starboard entering, and the note had the Region A convention. Ansell Ledge changed from a
preferred-channel mark to an isolated danger mark, since a bifurcation mark was being used to mark a
drying rock. Elevation and range were two heights on one line distinguished by letter case ("42 m",
"19 M"); both now spelled out. The spring-neap claim in the moon column asserted a 1.5-day lag the
week strip visibly contradicted — the note now describes what the strip actually shows and says why
the peak falls either side of the phase rather than on it. The footer's claim that the spring-neap
cycle was "derived from the moon rather than modelled separately" was self-contradictory in a
synthesis containing M2 and S2, and now says what is actually true: the beat is the model, and what
is derived is S2's phase. "Mean level" relabelled "Harbour mean level", since it is Z₀ and not the
mean of the day's turns. Zone −4 now says UTC−4. Touch reading added to the tide plate, and the
caption no longer instructs phone users to use a pointer and arrow keys.

**Drawdown.** Editable grids now show a hover outline and the cloth deliberately does not, which is
the direct answer to C2. Shaft numbers beside the tie-up and treadle numbers below the treadling.
The intro's "Change any square below" contradicted the explainer's "Nothing is entered here" —
corrected to name the three grids. "Shaft one is the row nearest the cloth" contradicted the
rendering; the text now matches what is drawn. End, pick, and float are defined before use. The
duplicated instruction is gone. The unwoven warp is drawn at the real warp colour rather than
desaturated, which read as disabled rather than unwoven, and the weave button now reports "Pick n
of 40".

**A defect in the fixes themselves.** The keyboard announcer added earlier in this round was a third
child of a two-column grid, which pushed the entire control panel below the cloth — so at 1440px you
could not see the cloth and the controls at once, on a page whose whole promise is that changing one
changes the other. The reviewer measured it precisely ("you press a button at y≈1780 and the thing
that changes lives at y≈600–1147"). An accessibility fix broke the layout, and only the blind pass
caught it.

## Not fixed, on purpose

- The register's uppercase-label count still exceeds this project's own threshold, still logged.
- The reviewers' consistent complaint about the **prose** — em-dash density, isometric paragraph
  blocks, terminal aphorisms — is partly addressed and not resolved. All three independently
  identified the writing rather than the artefact as the AI tell, which is a real and repeated signal
  worth carrying forward rather than patching away: "LLM-written or LLM-polished prose over a
  genuinely built thing."
- The register's plate still cannot be used to find a specific address, which the reviewer is right
  about. The lookup does that job and the note now says so, but the plate does not label its own
  address ranges.

## Re-verification status (Protocol Step 6)

Factual and mechanical fixes are re-verified by measurement and are closed: row alignment, panel
placement, mobile ledger visibility, chooser sync, figure arithmetic, no overflow at any width.

**Perceptual fixes are not closed by the same evidence.** Whether the hover outline actually makes
the grids read as editable, and whether the register's two-figure lede resolves the contradiction for
a reader rather than only in the markup, are claims about perception and need a fresh pass. One
re-verification review was run on the drawdown's affordance and alignment fixes specifically; the
register and almanac fixes have **not** been re-reviewed and should be treated as fixed-but-unconfirmed.
