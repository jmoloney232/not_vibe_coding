# Blind Review — Northfield Sessions

One independent, fresh-context blind reviewer, shown desktop and mobile screenshots, no rationale.

## What confirmed working

- Correctly identified the product, audience, and primary action ("Get tickets") without prompting.
- Rated the hero as memorable, describing back the exact intended gesture: "the stacked three-line black-and-pink hero statement."
- Rated the page as "deliberate and reasonably disciplined... coherent, not haphazard."

## The one real finding — fixed this round

Asked directly whether the absence of photography read as a deliberate choice or a missing feature, the reviewer gave a genuinely useful, non-obvious answer: the hero alone *could* read as intentional "graphic design, not photo," but nothing else on the page backed that up — "a genuinely photo-free brand usually compensates with more graphic personality elsewhere... here the absence just leaves flat black boxes." Asked what felt generic, the reviewer named the ticket cards specifically: "three equal-width bordered boxes... a very common SaaS/pricing-table pattern transplanted onto a festival page," plus plain divider-line lineup rows — concluding "everything below the fold could belong to almost any dark-mode event site."

This is a precise instance of `ANTI_VIBE_CODING_UI.md` §6's "signature move confined to the hero" failure — the poster concept was real in the top 500px and absent everywhere else, exactly the gap the Route-Level Coherence Review exists to catch.

**Fixed**: two structural changes, not new decoration layered on top. (1) Lineup rows now carry a stage-color-coded left border (pink for Main Stage, amber for Barn Stage) — a real gig-poster convention, not an invented flourish, extended consistently across every act rather than living only in the hero. (2) The ticket section was rebuilt from three bordered pricing-tile boxes into a stacked list using the *same* typographic system as the bill itself (large left-aligned name, large accent-colored price) — removing a second, unrelated component convention rather than adding a third one. Re-rendered at both widths; both changes hold up correctly on mobile.

## What this exercise has not yet done

- The fix has not been re-verified by a second blind reviewer.
- Only one reviewer was used.
- No typography-specific blind test was run.
