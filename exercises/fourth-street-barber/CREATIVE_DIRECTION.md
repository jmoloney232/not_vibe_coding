# Creative Direction — Fourth Street Barber

Practical Exercise 1 (Minimal small-business website), built under the revised `ANTI_VIBE_CODING_UI.md` §3/§6 process.

## Product Brief

- **What it does**: a single-barber, single-location neighborhood barbershop's website — the entire job is to get a new or returning customer to book an appointment or know when to walk in.
- **Primary users**: local residents, mostly on a phone, mostly deciding in under a minute whether to book.
- **Primary task**: see the price list, see when it's open, book or call.
- **Real reference anchors**: `PROFESSIONAL_WEB_DESIGN_RESEARCH.md`'s small/medium-business findings (Spot Studio × Chiringuito, Spreeformat Architects) — both real cases where a small business's specificity (a real name, a real neighborhood detail, a real specific service) carried more weight than any layout choice; `MINIMALISM_RESEARCH.md`'s Kenya Hara/MUJI *ku* distinction (emptiness that invites use, not decoration removed for its own sake) — directly applicable to a one-task page; Craigslist's restraint-for-a-stated-reason (a fast, low-friction task deserves a page that gets out of the way).

## No Recipe Without Reason

The obvious template to reach for here is a generic "modern barbershop" site (dark background, gold accent, scissors icon, Bebas Neue-style condensed headline — this project's own prior research logged this exact cluster as a recognizable small-business-template convention). Checked against the actual task: a customer deciding in under a minute needs the price list and hours *immediately visible*, not behind a hero animation or a moody full-bleed photo. The "moody barbershop" aesthetic is decorative brand personality; this brief's real constraint (fast task completion on a phone) outweighs it unless the shop's actual identity depends on that specific mood — a real, single-chair neighborhood shop competing on convenience and consistency, not on an upscale "gentleman's grooming lounge" positioning, has no stated reason to pay that decorative cost.

## Directions (condensed — three real structural options, not three color variants)

- **A — Everything above the fold**: hours, price list, and a call/book button all visible without scrolling on a phone, no hero image. Reference: Craigslist's task-first restraint.
- **B — Photo-led trust builder**: a real-feeling shop-interior photo leads, building trust/mood before the price list. Risk: pushes the actual task (price/hours) below the fold on mobile, the device most customers will use.
- **C — Single scrolling card**: hours + prices + booking all inside one visually contained "card" component, everything else omitted.

**Selected: A.** Direction B's risk (burying the primary task under a mood-building photo) directly contradicts the brief's own stated primary task and usage context (a fast, phone-based decision) — the same reasoning that ruled out Direction A in the Fenwick Museum exercise, applied here to a different asset (photography vs. task-priority) and a different structural risk. Direction C was rejected as a smaller, less distinctive version of A (a "card" adds a container with no added function).

## Asset Strategy

Real interior/exterior photography is **must-commission** (not available for this fictional exercise) — per §3, this build will not fake it with stock photography of a generic barbershop or a gradient, and will not silently omit any visual placeholder either; it states plainly in the page that photography is pending, using product-appropriate wording (not "for this exercise," per the Fenwick finding already folded into the main guide). Logo: a plain wordmark, no fabricated custom mark.

## Typography

A single, real, legible sans — **Figtree** (real, SIL OFL, not used in any prior build in this project) — chosen because a single-task, phone-first page has no real need for a second typeface; adding one (a "characterful" display face) would be decoration without a stated purpose, the same failure this project's guide already names for unjustified typographic variety.
