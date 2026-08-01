# Blind Review — North Bench Coffee

One independent, fresh-context blind reviewer, shown desktop and mobile screenshots, no rationale.

## The central finding of this entire exercise — confirmed, not avoided

`CREATIVE_DIRECTION.md` predicted, before any code was written, that this exercise's asset-honesty commitment (no fabricated product photography) would carry a real cost specific to this category, and stated that cost should not be minimized in the eventual review. The blind reviewer confirmed this directly and without prompting for diplomacy: asked how the placeholder affected purchase confidence, the answer was "This tanks my confidence hard, more than it would for almost any other product category... My gut reaction seeing a tan box on a live-looking product page: is this even a real, in-stock item... I would not complete a purchase here." Asked what to change first: "Replace the placeholder with a real photo — non-negotiable before launch."

**This is the single most important result across all five practical exercises completed so far, and it is a negative one, honestly reported.** Every other exercise's asset-honesty decisions (Fenwick's placeholder wording, the barbershop's placeholder sizing) were validated as acceptable trade-offs by blind reviewers. This exercise is the one case where a blind reviewer says the honest choice is not acceptable for production — the missing asset isn't a minor gap here, it's disqualifying for actually shipping. That is real, useful evidence about *when* an honest placeholder is sufficient and when it isn't: the reviewer's own reasoning ties it to the category ("Coffee is bought on sensory trust... an empty photo box directly contradicts the craft narrative the copy is selling"), not to execution quality — nothing about how this page was built would fix it short of having a real photo.

## What else confirmed working

- The specific, non-generic curatorial-style copy was rated the page's strongest element, with the reviewer quoting the fermentation-time and espresso-ratio details as evidence "a template generator" wouldn't produce.
- The buy box was rated fully clear and functionally trustworthy ("Size, grind, quantity, and price update logically... No confusion about what you're buying") — a real confirmation that interactivity correctness and asset-trust are separable failures, not the same problem.
- The color palette and type hierarchy were both read as deliberate and on-brand, not default-template.

## One smaller, real, fixed finding

The reviewer noted the placeholder "eats a large chunk of the first mobile viewport... pushing 'Cerro Alto' and price below the fold." Fixed by shrinking the placeholder further at narrow widths specifically (100px vs. 160px), on top of the general de-emphasis already applied following the Fourth Street Barber exercise's finding — re-rendered and confirmed the product name and price now surface much sooner on mobile.

## What this exercise has not yet done

- The category-specific asset-honesty finding above is a result to carry into `FINAL_CALIBRATION_REPORT.md`, not something this single exercise can resolve — commissioning real photography is out of scope for this project.
- Only one blind reviewer was used.
- No typography-specific blind test was run.
