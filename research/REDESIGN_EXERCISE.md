# Redesign Exercise: Perigee Landing Page

Per the task's Part 12 requirement: critique and plan before touching code.

## 1. Blind first-impression critique

Already performed — see `INDEPENDENT_REVIEWS.md`. Summary: both reviewers found the copy/content more credible than the composition; both independently named the orbit-diagram + corner-bracket device as the page's weakest, most generic element ("a classic AI-tool-generated 'sci-fi HUD' motif," "decoration wearing the costume of data").

## 2. Taxonomy-based critique (`TAXONOMY.md`)

- **Tier 1 (surface):** dark theme + single amber accent + monospace labels — individually fine, not the problem.
- **Tier 2 (structural):** hero → 4-step process → 2 fact blocks → CTA is the standard marketing-page shape. Per `TAXONOMY.md`, this is weak evidence alone — the actual test is content interchangeability, and Perigee's content (ZBLAN fiber convection, semiconductor dislocation mechanisms) does not survive a product swap, so this tier is not where the real problem lives.
- **Tier 6 (production-realism) — this is where the real problem lives:** the orbit diagram is explicitly illustrative/placeholder, disclosed honestly in its caption, but disclosure doesn't fix the underlying issue both reviewers named — it's decoration, not data, regardless of how honestly it's labeled. This is a Tier 6 finding, not a Tier 1/2 one, which is exactly the distinction Governing Principle 11 and the corrected §23 workflow now require stating before fixing.
- **Tier 7 (signal combination):** technical-looking-device + stated-thesis-rationale + near-zero information content is the exact "hollow decoration" cluster named in `TAXONOMY.md`.

**Conclusion: this redesign must be a Tier 6 fix (replace decoration with real information), not another Tier 1/2 fix (more composition work).** Per §23's corrected workflow, stating this before starting is the point — round 5's mistake was doing another Tier 1/2 pass when the actual complaint was Tier 6.

## 3. Comparison with a real, relevant reference

Varda Space Industries is a real, operating company doing close to Perigee's exact fictional business model — in-orbit manufacturing (pharmaceutical crystals, in their real case) with reentry-capsule return to Earth. **[SEARCH]**, varda.com structure (via search results, not a live fetch/screenshot — flagged accordingly): their real site organizes around **/platform** (the actual reentry-capsule hardware, real specs), **/biopharma** (one real product vertical, described as "differentiated drug products enabled by microgravity"), and **/company** (a real founding story — named founders, a former SpaceX avionics engineer and a named venture investor). Their real public tagline is declarative and confident without a decorative technical diagram: "Low Earth orbit is now open for business."

The comparison is scoped fairly (same category: early-stage hard-tech orbital manufacturing, same primary user: a technical/industrial evaluator, same content type: a technically literate B2B pitch) — not compared against a mature consumer brand or a different product category. What it suggests, concretely: **a real hardware/platform page with actual specs, and a company-stage page that's honest about being early**, does more credibility work than a decorative illustration of an orbit ever could. Perigee's fictional status means it cannot have real specs or a real founder — inventing them would be exactly the fabrication this guide's Realism Audit prohibits — so the redesign's job is to restructure around what *can* be honestly presented (real physics reasoning, an honestly-labeled illustrative comparison chart with real informational content instead of a placeholder diagram, and honest stage-appropriate framing) rather than manufacture fake specificity.

## 4. Recurring generation habits present in the current build (from `SELF_AUDIT.md`)

Habit #2 (reaching for a technical-looking decorative device instead of real data) and habit #3 (doing composition work when the gap was content/product modeling) are both directly present and are what this redesign targets.

## 5. Product-specific creative brief (revised)

- **Product:** Perigee — fictional early-stage orbital-manufacturing company (optical fiber, semiconductor crystals).
- **Primary user:** a materials/supply-chain engineer at a company evaluating exotic-materials sourcing, technically literate, skeptical of unsupported claims.
- **Primary task:** decide whether the physics claim is credible enough to request more information.
- **What must be honest, not decorative:** the page cannot claim more maturity or evidence than a real early-stage hard-tech company would have. Illustrative material must carry real information (a real-shaped comparison, even if the exact numbers are illustrative) rather than being a content-free diagram wearing a technical costume.

## 6. Three genuinely different structural directions considered

1. **Keep the marketing-page shape, replace only the diagram** — lowest-risk, directly answers both reviewers' specific fix suggestion, minimal architecture change.
2. **Restructure around a "platform + vertical" architecture like Varda's real site** — split into a hardware/process page and a materials-science page, more closely mirroring how a real company in this category actually organizes information; larger change, more real-feeling IA, but a bigger lift for what is still a one-page fictional example.
3. **Reframe the whole page as an honest early-stage/stage-appropriate brief** — add explicit stage framing (what's built vs. not yet), replacing the confident-startup-marketing register with a more technical-memo register throughout, not just in the diagram caption.

## 7. Reasoned selection

**Direction 1, extended with elements of Direction 3, not Direction 2.** Direction 2's multi-page restructure is the most "authentic to a real company" but is disproportionate to what a single-file fictional demo needs (the Proportionality Test, §5/§20, cuts against building out a second page's worth of content for a page whose actual job in this project is to demonstrate a fix, not to simulate a full company site). Direction 1 directly answers the specific, convergent finding from both blind reviewers. Layering in Direction 3's honest stage-framing (rather than a full register rewrite) adds the realism-audit benefit without the scope of a full rewrite. This is stated explicitly per §23's new requirement to name which taxonomy tier is being targeted: **this is a Tier 6 (production-realism) fix**, not a Tier 1/2 (composition) one.

## 8. Redesign plan

1. Remove the corner-bracket "HUD" framing device entirely — it was independently identified as the hollow-decoration cliché; removing it, not iterating its styling, is the fix (Governing Principle 11).
2. Replace the orbit-diagram-with-two-dots with an actual comparative chart carrying real informational content: ground-based vs. microgravity defect/dislocation comparison, illustrated as a real (if illustrative-scale) bar/line comparison rather than an empty ellipse — i.e., the visual's content should be the thing the copy is already honestly claiming (ZBLAN density variation, crystal dislocation reduction), not a decorative orbit animation standing in for it.
3. Keep the orbit motion/telemetry idea only if it earns its place informationally — reduce its prominence rather than treating it as the page's signature visual, since neither reviewer flagged the *idea* of telemetry, only the fact that the diagram carrying it had no real content.
4. Add a small, honest "stage" note (what Perigee has actually demonstrated vs. what's still ahead) — matching the real-company pattern of being candid about being early, rather than projecting more maturity via confident, uncited claims.
5. Re-verify with Playwright (console, focus/tab order, both motion states, contrast on any new chart colors) and re-screenshot at all required widths.
6. Blind-validate: show a fresh reviewer the original and the redesign, unlabeled, and ask which reads as more authored and why (Part 13).
