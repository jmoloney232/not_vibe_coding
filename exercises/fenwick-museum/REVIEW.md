# Blind Review — The Fenwick Museum

One independent, fresh-context blind reviewer (Governing Principle 9), shown only the home and exhibition page screenshots (desktop + mobile), with no access to `CREATIVE_DIRECTION.md` or any rationale.

## What the review confirmed working

- **The two-register typography read as functional, not decorative** — unprompted, the reviewer identified that serif is "consistently reserved for titles/headlines, sans for body copy and metadata," and that it's "doing real information hierarchy work." This is the entire concept Direction C was selected for (over Directions A and B), and it landed exactly as intended.
- **The curatorial essay passed the realism/Copy-Swap test** — asked whether it reads as generic filler, the reviewer quoted two specific sentences back as evidence it doesn't ("a mid-sized manufacturer thirty miles from this museum that spent 1948 to 1963..."), correctly identifying the actual curatorial thesis (a regional manufacturer vs. famous coastal studios) rather than reading it as boilerplate "explore the beauty of design" copy.
- **The object checklist's catalog-convention formatting (medium, dimensions, accession number) was read as "a deliberate 'real museum wall label' convention, not a generic template default."**
- **The persistent Visit utility strip, the terracotta accent, and the italicized wordmark subtitle were all named specifically as evidence of deliberate authorship** — the reviewer did not need these pointed out.

## The one real, actionable finding — fixed this round

Asked to react to the placeholder object images (originally reading "Object photography not available for this exercise"), the reviewer called the *underlying decision* right ("honest and refreshingly self-aware... much better than a broken image icon or a fake stock photo pretending to be a museum object") but identified that the specific **wording** was the only thing that broke the illusion of a real production site: "the placeholder text itself literally says '...for this exercise,' which is a dead giveaway this is a generated/demo exercise." The reviewer's own recommended fix: "even a neutral gray swatch without exercise-referencing copy would preserve the site's credibility while photography is pending."

This is a genuinely useful distinction this project's own asset-strategy rules (`ANTI_VIBE_CODING_UI.md` §3) hadn't separated out before: **there are two different honesty obligations, not one** — (1) don't fake a missing asset with a substitute that pretends to be real (satisfied from the start: no gradient/stock-photo standing in for a museum object), and (2) *within* an honest placeholder, use the wording a real product would actually ship, not meta-commentary about the exercise itself. Conflating these two produced copy that was honest at the project level but broke realism at the product level.

**Fixed**: replaced "Object photography not available for this exercise" with "Photography pending" across both pages (8 instances) — plausible, real museum-collection-database language for an object awaiting imaging, with no reference to this being an exercise. Re-rendered and confirmed the shorter text still centers cleanly in the placeholder boxes at both checklist-grid and hero-card sizes. Not re-run through a second blind pass — the fix is a narrow, literal wording change directly following the reviewer's own stated recommendation, not a structural or perceptual claim that needs re-verification the way the dispatch-console's color/typography fixes did.

## What this exercise has not yet done

- Only one blind reviewer was used (vs. two for the dispatch-console exercise) — adequate to catch a specific, actionable finding, but a smaller sample.
- No typography-specific blind test was run for this exercise — the two-register concept was validated as part of the general blind review, which is weaker evidence than an isolated specimen test (per the dispatch-console exercise's own method).
- Only 2 of the site's likely real routes were built (home, one exhibition detail page) — no collection-browse page, no "About" page, both referenced in the nav as dead links.
