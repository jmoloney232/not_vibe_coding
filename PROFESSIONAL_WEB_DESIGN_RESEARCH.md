# Professional Web Design Research

**Status: in progress.** This document is being built in phases (see the project's task tracker). This version contains a complete, critical study of the mandatory starting reference (the Garden `web-design-engineer` skill) and the research infrastructure/method for everything that follows. The organization ledger, matched comparisons, and major findings sections are scaffolded and will be filled in as Phases 1–5 complete — they are not padded with placeholder content in the meantime, per this project's own standing rule against presenting unverified specificity as if it were finished work.

---

## Part 0: Critical Study of the Garden `web-design-engineer` Skill

**Source**: `github.com/ConardLi/garden-skills`, path `skills/web-design-engineer/`. Cloned and read directly (not summarized from a description) on 2026-07-31. **License: MIT** — permissive, copy/modify/distribute allowed with the copyright and permission notice retained. Nothing below reproduces its file structure or complete text; direct quotes are short and attributed for the specific claims being evaluated, consistent with MIT's attribution expectation and this project's own "record observations rather than reproducing entire implementations" instruction.

**Files read**: `SKILL.md` (full), `references/failure-patterns.md` (full), `references/design-directions.md` (full), `references/design-calibration.md` (full), `references/critique-guide.md` (full), `references/redesign-protocol.md` (full), `references/browser-acceptance.md` (full), `references/style-recipes/INDEX.md` (full), and five individual recipe files spanning four of its six schools (`linear.md`, `aesop.md`, `tufte-dataink.md`, `are-na.md`) plus the color/typography sections of `references/advanced-patterns.md`.

### What it does well — durable, worth adopting

1. **Gathering context before styling, with a real priority order.** Step 2's priority list (user-provided resources → existing product pages → industry references → a named anchor → explicit "starting from scratch, tell the user quality is capped" as the last resort) is a genuinely useful, concrete ordering that this project's own guide has never stated this explicitly. The instruction to read a codebase over a screenshot when both are available ("rebuilding/editing an interface from code yields far higher quality than from screenshots") is a specific, actionable, correct claim about where real design fidelity comes from — this project's guide should adopt the ordering.
2. **The Asset Protocol's recognition hierarchy is the single most importable idea in the whole skill.** "Logo → product imagery/UI screenshots → color tokens → typography," explicitly ranked by "recognition contribution," with the hard rule that a logo is non-negotiable and missing assets get an honest placeholder, never a CSS silhouette or a hand-drawn pseudo-logo. This directly names a failure mode this project's own framework had under-addressed: treating a correct hex code as equivalent to actual brand identity. The "Asset > Spec" framing is exactly right and is being incorporated (see Part 12 of the calibration project, forthcoming).
3. **Requiring differentiated directions anchored to named references, not adjective soup.** "Never recommend 3 picks from the same row," "never recommend 'minimalist / modern / clean' as a direction name," and requiring 2–3 lines of *why this fits the user's context* rather than a style-name multiple-choice — this is a real, structural fix for exactly the failure this project's own round-8 blind review flagged in Perigee Mission Control ("the shell is standard dark-SaaS... the specificity lives almost entirely in the copy and the data, not in the interface"). A direction chosen by adjective invites a generic execution; a direction anchored to a specific studio's actual signature moves does not.
4. **The "show a v0 draft early" checkpoint discipline.** Explicitly stopping after Steps 3a/3 (system declared) and again after Step 4 (v0 shown) to let a human course-correct before full build is a real, well-reasoned answer to a documented failure category (round 5 and round 8 of this project's own guide both found defects that survived a same-author build/review cycle and were only caught by a fresh look at the rendered result). Building this checkpoint discipline directly into the *process*, not just the review, is stronger than this project's current approach of reviewing only at the end.
5. **Five-dimension critique with per-output-type weighting.** Explicitly weighting Functionality/Craft higher for a dashboard and Originality/Philosophy higher for a brand film, rather than one fixed rubric for every artifact type, is a real refinement this project's own Scoring Rubric (§21) does not currently make.
6. **Treating failure patterns as contextual (default → why → exceptions → detect → repair) rather than absolute bans.** This matches the spirit of this project's own Signal-Combination Model (round 6) closely, and independently arriving at the same structure from a different author is corroborating evidence the shape is right, not just a shared blind spot.
7. **The redesign-protocol's "Protected Contracts" list** (routes, form field names, analytics events, accessibility semantics, component APIs, user-provided real content) names concrete things an "improve the design" pass can silently break that this project's own guide does not currently enumerate as explicitly. Worth adopting close to verbatim (with attribution).

### What it oversimplifies, or presents as fact when it is closer to taste

1. **Every specific value in the style-recipes is stated with total confidence and zero evidence tier.** `linear.md` states Linear's accent purple is `#5E6AD2`, used on "< 5% of pixels," with `-0.02em` letter-spacing on display headlines, a `cubic-bezier(0.22, 1, 0.36, 1)` easing curve, and specific radius/shadow rules — presented as settled fact, with no citation, no "as of" date, and no acknowledgment that Linear's actual site changes over time. **This project's own round-7 live re-verification is directly comparable evidence here**: this project independently, live-rendered Linear this round and measured `-0.022em` letter-spacing on the real H1 — remarkably close to the recipe's `-0.02em` claim, which is a genuine point in the recipe's favor. But the recipe offers no way to know that in advance; it reads with the same confidence whether a value is a well-verified observation or an extrapolated guess, and this project's own research repeatedly found that confidence and correctness come apart (the corner-bracket finding, the negative-tracking AVOID entry that had to be corrected after live measurement). A recipe file that stated "verified via live render, [date]" versus "recalled, not re-verified this cycle" for each claim would be strictly more useful and is the single most important structural gap between this skill and this project's own evidence-tagging convention (`[SEARCH]`/`[RECALLED]`/`[LIVE]`/`[OWN]`).
2. **The "Non-default" font table is a second default cluster wearing the first one's disguise.** `advanced-patterns.md`'s font-recommendation table — Plus Jakarta Sans, Outfit, Space Grotesk, Sora, Newsreader — is offered as the escape from "Inter/Roboto/Arial," but every one of these names appears, independently, on this same research project's own list (Part 6 of the calibration brief that commissioned this document) of *fonts specifically flagged as overrepresented in current AI-generated output*. This is not a minor nitpick — it is direct evidence that a fixed "safe alternative" list decays into a new statistical average the moment enough tools converge on recommending it, which is the exact mechanism (`research/RESEARCH_REPORT.md` from this project's round 6, §5: "the mathematical average of the internet") this whole line of research exists to fight. The skill's own hard rule ("avoid fonts overused by AI-generated content") is undermined by its own recommendation table one section later. **This is a genuinely durable, evidence-backed critique, not a stylistic disagreement — it will be treated as a load-bearing finding in this project's typography research (Phase 3).**
3. **The Color × Font Pairing table assigns a fixed oklch hue per "style bucket"** ("modern tech" → hue 250 blue-violet, "premium brand" → near-black, "lively consumer" → hue 30 coral). This has the same failure shape as finding #2: a rule meant to prevent one default (arbitrary Inter+blue) risks manufacturing a new one (every "modern tech" product converging on hue-250 blue-violet) if applied mechanically across many independent uses of this same table. The skill does hedge this ("drop this table immediately once the user provides a brand"), which is the right instinct, but the hedge is easy for an agent under time pressure to skip, and the table's existence is itself an invitation to skip real color reasoning.
4. **Numeric rules presented as more universal than they are.** The critique-guide's "whitespace should be at least 40% of total area (60%+ for minimalist)" and "title at least 3× body (6× for hero)" are stated as fixed thresholds. Both are reasonable defaults for a *specific* register (spacious editorial/marketing) and actively wrong for others the skill itself elsewhere endorses — Tufte's own recipe file two clicks away explicitly calls for *tight* spacing and small body type ("12–14px... the reader leans in"), and Bloomberg Terminal-style density is listed as a legitimate anchor in the same document. The critique guide's numeric thresholds are not cross-referenced against the calibration dials (Information Density) that would tell an agent when 40% whitespace is the wrong target — an agent using the critique guide in isolation (which the routing table explicitly permits — "Read on demand... don't preload everything") could easily penalize a dense, correctly-designed dashboard for failing a whitespace threshold that was never meant to apply to it.
5. **The five-dial calibration system (Visual Variance / Motion / Density / Assets / Fidelity) is a genuine improvement over an unstated intuition, but the "Completion Test" — "the calibration is successful only if someone can point from each dial to concrete consequences" — has no enforcement mechanism.** Nothing in the workflow checks this after the fact. This is the same category of gap this project's own Appendix C already names for its own self-reported checklists: a well-designed check that nothing actually verifies was applied.

### Which recommendations are durable vs. context-dependent

**Durable, high-confidence, adopt directly:**
- The context-gathering priority order (Step 2)
- The Asset Protocol's recognition hierarchy and hard rule against CSS-silhouette brand substitution
- Requiring 3 differentiated, named-anchor directions rather than adjective-only proposals
- The v0-draft checkpoint discipline
- Protected Contracts for redesign/extension work
- Treating failure patterns as contextual defaults with named exceptions, not absolute bans

**Context-dependent — genuinely useful as a *starting* reference, dangerous as an *ending* one:**
- The 25 style recipes themselves. Each recipe is a plausible, well-observed *description* of a real design tradition (the Aesop, Tufte, and Are.na recipes in particular read as informed, specific, and largely consistent with this project's own general knowledge of those actual products). But a recipe is, definitionally, a *pre-digested* answer — reading `linear.md` and pasting its palette is the same category of move as reading a search-snippet summary and treating it as verified fact, which is precisely the evidentiary gap this project's own round-7 work exists to close. **A recipe should be treated as a hypothesis to verify against the real, current, live product before use, not as a citation.** This project's live-rendering pipeline (Playwright + the proxy fix from round 7) makes that verification cheap enough that there's no good reason to skip it when the anchor is a real, currently-live product.
- The numeric thresholds in the critique guide (whitespace %, title/body ratio) — genuinely useful as a sanity-check floor for spacious/editorial registers, actively misleading for dense/utilitarian ones, and the guide does not gate their applicability on the calibration dials that would resolve this.

**Which recipes could become another form of vibe coding if applied mechanically:**
Any of them, if an agent's actual process is "read the one recipe file named by the user, paste its values, ship it" without ever verifying the anchor against the real current product or asking why *this* recipe fits *this* product's actual constraints. The skill's own INDEX.md is aware of this risk in one direction (it warns against combining two recipes incoherently, and against silently drifting into a 26th unnamed recipe) but not in the other: faithfully, single-mindedly executing exactly one of the 25 recipes, unmodified, for a product that doesn't actually share the anchor's constraints (its budget, its asset availability, its content type, its audience) produces a different flavor of templated output — a Linear-recipe SaaS product for a team with no product screenshot to show, or an Aesop-recipe consumer product with stock photography standing in for the tactile object photography the recipe depends on. The skill's own `linear.md` file names this exact risk in its "Don't use when" field but nothing in the workflow *forces* that field to be checked before a recipe is applied — same structural gap as the Completion Test above.

**Which numeric rules are contextual rather than universal, stated plainly:** every numeric threshold in this skill (whitespace %, title/body ratio, spacing-scale values, radius ceilings, color counts, "≤ 2 font families") is a real, evidence-consistent default *for the register the rule was written against* (spacious editorial/marketing, moderate density, restrained builder-SaaS) and is not universal across the full range of legitimate professional registers the skill's own six schools and this project's own Governing Principles both claim to support. None of them are wrong; all of them need a stated register/context to be actionable rather than mechanically applied.

### What should be incorporated into this project's framework vs. remain an external reference

**Incorporate (with attribution) into the revised `ANTI_VIBE_CODING_UI.md`:**
- Context-gathering priority order → new subsection under Product Understanding (§3)
- Asset recognition hierarchy and hard rules → new Asset Strategy section (Part 12 of this calibration project)
- Three-differentiated-directions-with-named-anchors requirement → replaces/strengthens this project's existing Creative Direction stages (§6)
- v0-draft checkpoint → new step in the Implementation Workflow (§17)
- Protected Contracts → incorporated into any future redesign-specific guidance
- Per-output-type critique weighting → incorporated into the Scoring Rubric (§21)

**Remain an external reference, cited but not internalized as this project's own claims:**
- The 25 individual style recipes — cited as research leads and a useful example of how to *organize* anchored design knowledge for an agent, explicitly not copied as verified fact. Where this project's own atlas (Part 9 deliverable) covers the same anchor (e.g., Linear, Aesop), this project's entry is built from this round's own live-rendered evidence and is the authoritative one for this project's purposes; the Garden recipe is noted as a corroborating or conflicting external source, never substituted for verification.
- The fixed font and color-pairing tables in `advanced-patterns.md` — explicitly *not* incorporated, per the critique above (finding #2); this project's typography research (Phase 3) treats "safe alternative font list" as a failure pattern in its own right, not a fix for one.

### Confidence and limitations of this review

**Confidence: high** on the structural findings (recipe files lack evidence tiers; the font table contradicts its own hard rule; numeric thresholds aren't gated on the density dial) — these are directly checkable against the files themselves and against this project's own round-7 live measurements, not matters of taste. **Confidence: medium** on how the skill performs in actual use, since this review did not execute the skill's own workflow end-to-end on a real brief — it evaluates the reference documents as written, not the skill's real-world output distribution. **Limitation:** only 5 of 25 recipe files were read in full (spanning 4 of 6 schools; Motion/Experimental and Warm Humanist schools were not sampled at the individual-recipe level, only via the design-directions.md summary table) — conclusions about the recipe catalog's general character are drawn from this partial sample and the consistent pattern across `design-directions.md`'s summaries of the other 20, not from exhaustive reading.

---

## Part 1: Research Method (governs everything that follows)

Every organization entry in this document and in `DESIGN_REFERENCE_ATLAS.md` is tagged with an evidence tier, extending the tagging convention this project established in round 6–7 (`research/RESEARCH_REPORT.md`, `research/CALIBRATION_CORPUS.md`):

- **[LIVE]** — actually rendered this round via Playwright/Chromium (desktop/tablet/mobile), with computed-style/DOM inspection. The strongest tier.
- **[SEARCH]** — a claim retrieved live via WebSearch this round, with a real, dated, cited URL. Real evidence, but summarized/excerpted, not full-fetch-verified.
- **[CODE]** — a claim verified against a real, publicly accessible source repository, package, or design-system documentation site.
- **[PROVENANCE]** — a claim about who designed something (named designer, named studio, case study), sourced from an official case study, interview, credited portfolio entry, or comparable primary evidence — logged separately from visual/implementation claims because provenance and quality are different axes (this project's Governing Principle 11).
- **[RECALLED]** — training-knowledge description not verified this round. Lowest tier; used only when explicitly flagged, never presented as equivalent to the tiers above.

An organization is only counted toward this project's "detailed analysis" quota if it carries at least one [LIVE] or [CODE] entry, not [SEARCH]/[RECALLED] alone — matching the standard this project's round-7 work already established and the discipline the Garden-skill critique above argues the recipe catalog itself is missing.

## Part 2: Organizations Studied — Ledger

*Scaffolded; populated during Phases 1–2. Target: 75+ logged here, 30+ with a full entry in `DESIGN_REFERENCE_ATLAS.md`, at least 15 tagged [PROVENANCE], at least 15 tagged [CODE], at least 10 tagged as disclosed-AI-generated provenance, at least 10 tagged ambiguous/counterexample. Progress against these gates is checkable at any point by counting tags in the atlas.*

## Part 3: Major Findings

*To be written after Phases 1–5 produce enough evidence to synthesize from — not written in advance of the evidence, per this project's own standing rule against a rationale that outruns what was actually verified.*

## Part 4: Counterexamples

*Scaffolded; see Part 2 gate (10 ambiguous/counterexample minimum).*

## Part 5: Source Ledger

- Garden skill repository: `github.com/ConardLi/garden-skills`, commit at time of cloning 2026-07-31, MIT License.
- All further sources logged inline in the atlas with URL and access date.

## Part 6: Limitations

- This document's Part 0 (Garden skill review) is complete and load-bearing. Parts 1–5 are infrastructure and scaffolding only as of this version — the substantive research they will contain has not been done yet, and this document will be revised, not silently backfilled, as that happens.
