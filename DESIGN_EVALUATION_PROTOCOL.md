# Design Evaluation Protocol

A practical, step-by-step runbook for evaluating a design — extracted from the process actually used across this project's six practical exercises (`exercises/*/REVIEW.md`), not written speculatively in advance. `ANTI_VIBE_CODING_UI.md` contains the full reasoning and the rules this protocol operationalizes (§6, §18, §19, §21, Governing Principle 9); this document is the checklist you actually run, in order, with real examples of what each step caught when it was used for real.

This document assumes an AI agent building the design does not have a human reviewer available on demand — every step below was actually executed by an AI agent this project, using fresh-context sub-agents as the "independent" reviewer. Where a real human is available, substitute one for at least the final blind-review step; a same-species reviewer is a real but limited form of independence (Governing Principle 9).

## Step 1 — Render before evaluating anything

Do not evaluate from source code. Render every route at desktop and mobile width at minimum; add intermediate widths if the layout has a known fragile range. This project used Playwright/Chromium locally for every exercise — `node inspect_load.js <url> <outdir>` in the pattern established in round 7, or equivalent.

**What this alone catches, evidenced**: a `background: #cabf a8` typo (invalid CSS, silently ignored by the browser) would not have been caught by reading the file; a native `<input type=range>` rendering in default browser blue against a deliberate amber palette (Ridgeline) was only visible in a screenshot.

## Step 2 — Exercise real interaction, not just static screenshots

If the design has any interactive element (a slider, a tab, a form, an add-to-cart flow), drive it programmatically — click, type, drag — and assert on the resulting state, not just its appearance.

**What this caught, evidenced**: Ridgeline's production-safety confirm flow was verified by actually clicking Save twice and checking the button text changed to "Confirm: set to X%?" between clicks. North Bench's cart badge bug (never updated after Add to Cart) was caught this way, self-caught before any blind review even ran, specifically because the interaction was tested end-to-end rather than assumed correct from the code.

## Step 3 — Check real data extremes, not just the happy path

Render the design with: an empty/zero state, a maximum/100% state, missing optional fields, and the longest realistic value a field could hold. Per `ANTI_VIBE_CODING_UI.md` §11.

**What this caught, evidenced**: the dispatch-console exercise's ML-4475 was marked "late" while its window timestamp was still in the future relative to the fixed "now" — a data-consistency bug invisible unless the extreme/edge values were actually checked against each other, not just individually plausible.

## Step 4 — Run the four structured self-audits (§19) before seeking outside review

Composition, Authorship, Realism, and Personal-Defaults. Do this yourself first — it's real signal, just weaker than independent review, and it catches different things (structural/mechanical issues) than a blind reviewer typically will.

## Step 5 — Independent blind review, with a written, reusable prompt

The reviewer gets: rendered screenshots only (or a live render they navigate themselves), zero context about the product's name/purpose beyond what's visible, zero access to the creative-direction rationale, zero knowledge of what you're hoping they'll say. Ask, at minimum:
1. What is this, who is it for, what's the primary action?
2. Three visual/typographic traits.
3. What feels intentional vs. generic — with a quote or specific detail as evidence, not a vague impression.
4. Does anything read as AI-generated, and why or why not, specifically?
5. Is there a real usability problem (not an aesthetic nitpick)?
6. What would you change first?

Add product-specific questions for what the design most needs to prove (e.g., Ridgeline added "does this remind you of a specific known product, and is that a problem?" because avoiding a specific competitor's look was the exercise's actual point; North Bench added "how much does the missing photo hurt your purchase confidence" because that was the exercise's real open question).

**Never skip straight to a single combined "is this good" question** — the specific questions are what produce quotable, checkable evidence instead of vague praise or vague criticism, which this project's own guide (§19) already names as unusable.

## Step 6 — Distinguish "fixed" from "fixed and re-verified"

A finding that's about a fact (a broken link, a missing column, a color-value typo) is resolved once fixed and re-rendered. A finding that's about *perception* (does this now read as a different register, does this now feel less generic) requires a second blind pass on the fix specifically before it counts as closed — fixing the thing you think caused the perception is a hypothesis, not a confirmed result, until someone who didn't know what changed confirms the perception actually changed.

**Evidenced**: the dispatch-console exercise's Direction A/C color fix was re-verified with a third fresh reviewer before being logged as closed (`exercises/dispatch-console/REVIEW.md`); Northfield's ticket-card and North Bench's cart-badge fixes were logged as fixed-but-not-re-verified, honestly, because they were factual/mechanical fixes, not perceptual claims.

## Step 7 — Typography-specific blind test, separately, when typography is load-bearing

Strip color and composition out — same real content, different typefaces, on one neutral shared layout — and ask a fresh reviewer to rate tone, readability, distinctiveness, AI-association, and product fit per specimen, before revealing which specimen is which. This is a different instrument from Step 5's general review and catches different things.

**Evidenced**: the dispatch-console exercise's typography specimen test found Direction A's single-typeface treatment of IDs/timestamps read as the clearest AI-template tell of the four specimens — a finding the general visual blind review (Step 5) had not surfaced, because the color/composition differences were dominating the reviewer's attention there.

## Step 8 — Compare intent against perception explicitly, in writing

For every claim in the creative-direction document ("this should read as X"), check what the blind reviewer actually said the design reads as. Where they match, that's confirmation. Where they diverge, the design is wrong and the rationale is not — per Governing Principle 9/11, revise the render, don't argue the reviewer missed the point.

**Evidenced, both directions**: dispatch-console's Direction C was intended to read as "warm humanist," distinct from Direction A's "neutral civic" — a blind reviewer's report that they read as the same design system was a real divergence, and the fix targeted the actual gap (surface color) rather than defending the original intent. North Bench's photography gap was *predicted* correctly in advance and the blind reviewer's report confirmed the prediction — matching intent to perception isn't only useful for catching misses, it's also how you verify a stated risk was actually risky and not just hedging.

## Step 9 — Say what's still unverified, every time

No exercise in this project claims to be "done" — each `REVIEW.md` ends with a specific, non-generic list of what wasn't checked (panel size, re-verification status, untested routes). A protocol step that gets skipped for a specific, stated reason is honest; a protocol step that's silently omitted is not.
