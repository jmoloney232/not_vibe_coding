# Design Reference Atlas

Human-readable companion to `design-reference-atlas.json` (the authoritative, machine-readable version — same entries, full field detail). This file is a curated, retrievable reference set, not a mood-board dump: every entry exists because it demonstrated something specific and checkable, logged with an evidence tier.

**Evidence tiers** (see `PROFESSIONAL_WEB_DESIGN_RESEARCH.md` Part 1 for full definitions): `LIVE` (rendered + DOM/CSS-inspected this project), `SEARCH` (cited live web search), `CODE` (verified against public repo/design-system docs), `PROVENANCE` (verified designer/studio attribution), `RECALLED` (training knowledge, lowest tier, always flagged).

**Status: 10 entries as of this version** (seeded from this project's own round-7 live-verification work). This is a running document — see `PROFESSIONAL_WEB_DESIGN_RESEARCH.md` Part 2 for the full target roster and current progress against the completion gates.

---

## Retrieval index

### By design school

- **brutalist-raw**: `v0-color-palette-generator`, `craigslist-sfbay`
- **editorial-minimalist**: `lovable-maison-storefront`
- **information-architecture**: `govuk-design-system`, `github-primer`, `varda-space-industries`
- **modern-tool-builder-saas**: `stripe-homepage`, `linear-homepage`
- **warm-humanist**: `basecamp-homepage`, `lovable-continuum-habit-tracker`

### By industry

- **aerospace**: `varda-space-industries`
- **consumer-marketplace**: `craigslist-sfbay`
- **developer-tools**: `github-primer`, `linear-homepage`, `v0-color-palette-generator`
- **ecommerce**: `lovable-maison-storefront`
- **fintech**: `stripe-homepage`
- **government**: `govuk-design-system`
- **saas**: `basecamp-homepage`
- **saas-wellness**: `lovable-continuum-habit-tracker`

### By density

- **extremely-high**: `craigslist-sfbay`
- **high-per-length**: `stripe-homepage`
- **low**: `github-primer`, `lovable-maison-storefront`, `lovable-continuum-habit-tracker`
- **low-moderate**: `govuk-design-system`, `varda-space-industries`
- **moderate**: `linear-homepage`, `basecamp-homepage`, `v0-color-palette-generator`

---

## Entries

### Government Digital Service (UK) — GOV.UK Design System

`govuk-design-system` · https://design-system.service.gov.uk/ · Evidence: LIVE, PROVENANCE, CODE · Confidence: high · Reviewed: 2026-07-31

**Category**: government-civic-design-system

**Provenance**: Verified — Government Digital Service (named internal team). Design Museum's Design of the Year award; public GitHub repo; on-page 'Support' section credits 'a team at the Government Digital Service'

**Visual approach**: Plain document structure; restraint instrumented to a stated purpose (user need over government convenience), not generic minimalism

**Typography**: display=GDS Transport, body=GDS Transport, H1 letter-spacing=normal

**Composition**: Single-column, linear, heading+paragraph+link blocks repeated ~10x — genre-appropriate for a documentation portal

**Color**: one blue, one green, high-contrast black-on-white, crest mark

**Authorship signals**: dated, specific release notes (v6.4.0, named component changes); restrained content (no padding)

**Weaknesses / limitations**: genre is intrinsically plain (documentation portal) — some plainness may not transfer as evidence to marketing-page contexts

**Transferable principle**: restraint instrumented to a stated, verifiable purpose reads as authored; a hard-offset non-blurred shadow is a legitimate, distinctive alternative to the generic soft-shadow default

**Do not copy**: the specific crest mark and GDS Transport typeface (protected government identity)

**Tags**: {"industry": "government", "product_type": "design-system", "design_school": "information-architecture", "density": "low-moderate", "tone": "plain-institutional", "typography_type": "custom-sans", "motion_level": "none-observed", "asset_dependence": "low", "brand_maturity": "mature", "page_type": "documentation-portal"}

---

### GitHub — Primer Design System

`github-primer` · https://primer.style/ · Evidence: LIVE, PROVENANCE, CODE · Confidence: high · Reviewed: 2026-07-31

**Category**: developer-tool-design-system

**Provenance**: Verified — GitHub Primer core team (named 'About us' page). public repo github.com/primer, on-page team credit page

**Visual approach**: Large centered wordmark hero, hand-drawn wireframe illustrations as literal component demos

**Typography**: display=Mona Sans, body=Mona Sans / system stack fallback, H1 letter-spacing=normal

**Composition**: 3 large hero cards, then 3-up and 2-up rows

**Color**: black/white/grayscale plus brand accent

**Authorship signals**: organized around Primer's actual 2 real audiences (product engineers, brand designers); real production overflow bug found live ('Display' clipped to 'Displo' at 1440px) — logged as evidence bugs occur on both AI and human work, not a provenance signal

**Weaknesses / limitations**: one lorem-ipsum placeholder string inside a simulated UI mockup (inside a component demo, not real site copy — different case from shipped placeholder content)

**Transferable principle**: restraint (short page relative to how much the system actually documents); literal, specific component demonstrations beat decorative illustration

**Do not copy**: Octocat mascot (GitHub trademark)

**Tags**: {"industry": "developer-tools", "product_type": "design-system", "design_school": "information-architecture", "density": "low", "tone": "friendly-technical", "typography_type": "custom-variable-sans", "motion_level": "not-observed", "asset_dependence": "medium", "brand_maturity": "mature", "page_type": "documentation-portal"}

---

### Stripe — Stripe.com marketing homepage

`stripe-homepage` · https://stripe.com · Evidence: LIVE, PROVENANCE · Confidence: high (LIVE render); medium (provenance, SEARCH-tier only) · Reviewed: 2026-07-31

**Category**: fintech-developer-tool-marketing

**Provenance**: Verified — Stripe design-engineering team (named individuals in public blog posts, per round-6 SEARCH evidence). SEARCH-tier: widely cited named design-engineering blog posts; not re-verified via primary source this round

**Visual approach**: Long, section-varied page (14,782px), animated gradient mesh used sparingly, licensed custom typeface

**Typography**: display=sohne-var (licensed), body=sohne-var, H1 letter-spacing=-0.02em (-0.96px at 48px)

**Composition**: varied section types (card grids, stat rows, testimonial, dark CTA bands) — not one block repeated

**Color**: lime-green/near-black hero accent pairing, gradient mesh bounded to hero/CTA bands only

**Authorship signals**: named customers ('1Password unified $2B...'), dated current terminology ('agentic commerce', 'stablecoins and crypto')

**Weaknesses / limitations**: marketing budget/headcount far exceeds a typical product this research is meant to generalize to

**Transferable principle**: IMPORTANT COUNTEREVIDENCE: H1 letter-spacing -0.02em, squarely in the range previously (incorrectly) flagged by this project's own guide as an AI tell — negative tracking alone is not diagnostic

**Do not copy**: licensed Söhne-derived typeface without a license

**Tags**: {"industry": "fintech", "product_type": "marketing-homepage", "design_school": "modern-tool-builder-saas", "density": "high-per-length", "tone": "confident-technical", "typography_type": "licensed-custom-sans", "motion_level": "restrained", "asset_dependence": "high", "brand_maturity": "mature", "page_type": "marketing-landing"}

---

### Linear — Linear.app marketing homepage

`linear-homepage` · https://linear.app · Evidence: LIVE, PROVENANCE · Confidence: high (LIVE render); medium (provenance, SEARCH-tier only) · Reviewed: 2026-07-31

**Category**: saas-developer-tool-marketing

**Provenance**: Verified — Linear's own small, credited design team (public design commentary, own blog per round-6 SEARCH evidence). SEARCH-tier, not re-verified via primary source this round

**Visual approach**: Extremely large (64px), extremely tight H1 directly above a real embedded product screenshot; dark theme full commitment

**Typography**: display=Inter Variable, body=Inter Variable, H1 letter-spacing=-0.022em (-1.408px at 64px), line-height 100% of font-size

**Composition**: each section uses a different layout (screenshot, stat row, feature callout, testimonial carousel) — low repetition

**Color**: near-black rgb(8,9,10) background, off-white text, single accent inside product screenshot only

**Authorship signals**: ENG-2703 ticket ID format, realistic timestamps, single short direct subhead sentence

**Weaknesses / limitations**: none identified beyond general resourcing-level caveat

**Transferable principle**: IMPORTANT COUNTEREVIDENCE: H1 letter-spacing -0.022em, second independent confirmation that negative tracking alone is not diagnostic of AI generation; using the ACTUAL product UI as the hero visual is about as close to 'form follows real content' as a marketing hero can get

**Do not copy**: n/a

**Tags**: {"industry": "developer-tools", "product_type": "marketing-homepage", "design_school": "modern-tool-builder-saas", "density": "moderate", "tone": "confident-dark-technical", "typography_type": "variable-sans", "motion_level": "not-observed", "asset_dependence": "medium", "brand_maturity": "mature", "page_type": "marketing-landing"}

---

### 37signals — Basecamp.com marketing homepage

`basecamp-homepage` · https://basecamp.com · Evidence: LIVE, PROVENANCE · Confidence: high (LIVE render); medium (provenance, SEARCH-tier only) · Reviewed: 2026-07-31

**Category**: saas-project-management-marketing

**Provenance**: Verified — DHH and Jason Fried (publicly, repeatedly document their own design decisions). SEARCH-tier, open 37signals engineering/design blog; on-page voice directly consistent with their well-documented public writing

**Visual approach**: Two-column hero: short informal link list left, real embedded product screenshot right

**Typography**: display=Graphik, body=Graphik, H1 letter-spacing=-0.0225em (-0.942872px at 41.9054px)

**Composition**: mixed section types, notably short — six link labels plus one closing statement in the hero

**Color**: muted sage-green/off-white oklch() palette, one blue accent reserved for primary buttons

**Authorship signals**: distinctive informal voice ('Tell me if this sounds about right') consistent with 37signals' documented public writing elsewhere — real cross-context corroboration

**Weaknesses / limitations**: none identified

**Transferable principle**: STRONGEST counterevidence in the corpus: H1 letter-spacing -0.0225em on a company famous for public, opinionated, hand-crafted decisions specifically — the least plausible candidate anywhere for 'used a default without checking it'; real plausible file sizes/names in mockups are a strong, cheap realism signal

**Do not copy**: n/a

**Tags**: {"industry": "saas", "product_type": "marketing-homepage", "design_school": "warm-humanist", "density": "moderate", "tone": "informal-opinionated", "typography_type": "licensed-sans", "motion_level": "not-observed", "asset_dependence": "medium", "brand_maturity": "mature", "page_type": "marketing-landing"}

---

### v0 by Vercel community (author: neonpostgres) — Color Palette Generator (v0 template)

`v0-color-palette-generator` · https://v0.app/templates/color-palette-generator-350IE4ojQXK · Evidence: LIVE · Confidence: very high provenance; medium depth (iframe-limited inspection) · Reviewed: 2026-07-31

**Category**: ai-generated-utility-app

**Provenance**: Verified — disclosed AI-generation (v0 by Vercel) — definitional, not inferred. hosted on v0.app's own template gallery with explicit 'Open in v0' provenance

**Visual approach**: Neo-brutalist: thick black borders, hard-offset non-blurred shadows, saturated primary colors, no radius softening

**Typography**: display=not determined, body=not determined

**Composition**: two-column controls-left/output-right utility pattern

**Color**: saturated blue/yellow-gold/pink on warm off-white

**Authorship signals**: internally consistent, distinctive visual system — NOT the purple-gradient stereotype

**Weaknesses / limitations**: neo-brutalist thick-border convention is itself becoming a recognizable AI-tool-generation signature across galleries — a new cluster, not evidence of genericness in this specific instance

**Transferable principle**: AI-tool output is not visually monolithic; disclosed-AI provenance does not predict genericness on its own

**Do not copy**: n/a — already a generated template, not a proprietary brand

**Tags**: {"industry": "developer-tools", "product_type": "utility-app", "design_school": "brutalist-raw", "density": "moderate", "tone": "bold-utilitarian", "typography_type": "unknown", "motion_level": "not-observed", "asset_dependence": "low", "brand_maturity": "none", "page_type": "app-interior"}

---

### Lovable community (author: matsu-adjacent template gallery) — Home Goods Storefront 'Maison' (Lovable template)

`lovable-maison-storefront` · https://lovable.dev/templates/websites/ecommerce/maison-artisan-home-lifestyle-store-template · Evidence: LIVE · Confidence: very high provenance; low depth (preview screenshot only) · Reviewed: 2026-07-31

**Category**: ai-generated-ecommerce

**Provenance**: Verified — disclosed AI-generation (Lovable). hosted on Lovable's own template gallery, '4.1k remixes' attribution

**Visual approach**: Editorial serif/italic mixed-weight headline over warm desaturated lifestyle photography

**Typography**: display=editorial serif (not identified by name), body=not determined

**Composition**: kicker + headline + subhead + CTA, standard e-commerce hero shape

**Color**: terracotta/rust CTA pulled from the photograph's own palette, not an arbitrary brand blue

**Authorship signals**: genuinely tasteful, non-generic — the typography, photography-led hero, and palette-derived accent are choices this project's own guide would score positively if provenance were unknown

**Weaknesses / limitations**: showcase-gallery selection bias (platform's own best examples, not representative of typical output); static preview only, no DOM/CSS/other routes inspected

**Transferable principle**: DIRECT COUNTEREXAMPLE to 'AI-generated always looks generic' — provenance and quality are separate axes (Governing Principle 11)

**Do not copy**: n/a

**Tags**: {"industry": "ecommerce", "product_type": "storefront", "design_school": "editorial-minimalist", "density": "low", "tone": "premium-editorial", "typography_type": "editorial-serif", "motion_level": "unknown", "asset_dependence": "high", "brand_maturity": "none", "page_type": "marketing-landing"}

---

### Lovable community — Daily Habit Tracker 'Continuum' (Lovable template)

`lovable-continuum-habit-tracker` · https://lovable.dev/templates/apps/saas/continuum-daily-habit-tracker-template · Evidence: LIVE · Confidence: very high provenance; low depth (preview screenshot only) · Reviewed: 2026-07-31

**Category**: ai-generated-saas

**Provenance**: Verified — disclosed AI-generation (Lovable). hosted on Lovable's own template gallery, '7.2k remixes' attribution

**Visual approach**: Bold sans headline over dark-overlay lifestyle photograph, standard centered SaaS hero

**Typography**: display=bold sans (not identified), body=not determined

**Composition**: centered-content-over-photo hero, low visual tension

**Color**: single orange CTA on otherwise neutral palette

**Authorship signals**: weak — nothing hero-level specific to habit-tracking beyond the word 'habit'

**Weaknesses / limitations**: CLEAN PRODUCT SWAP TEST FAILURE: hero copy ('Build lasting habits, one day at a time') is interchangeable with any habit app with a one-word brand swap; the closest live match in this entire corpus to the stereotyped generic-AI-SaaS-marketing pattern

**Transferable principle**: the diagnostic signal is content interchangeability, not visual polish — this record has good visual craft and still fails on product specificity

**Do not copy**: n/a

**Tags**: {"industry": "saas-wellness", "product_type": "marketing-landing", "design_school": "warm-humanist", "density": "low", "tone": "calm-generic", "typography_type": "system-adjacent-sans", "motion_level": "unknown", "asset_dependence": "medium", "brand_maturity": "none", "page_type": "marketing-landing"}

---

### Varda Space Industries — Varda.com marketing homepage

`varda-space-industries` · https://varda.com · Evidence: LIVE · Confidence: high (LIVE render); provenance unverified · Reviewed: 2026-07-31

**Category**: aerospace-manufacturing-marketing

**Provenance**: Not verified — not identified this round. real, funded, operating company — provenance inferred from operation, not from a named-designer case study; should be upgraded to PROVENANCE tier if a case study is found in Phase 2

**Visual approach**: Huge (107px) tight orange-on-navy H1 over full-bleed duotone satellite/terrain photograph with dotted grid overlay

**Typography**: display=MT Everyday Sans (licensed/commissioned), body=MT Everyday Sans, H1 letter-spacing=-0.03em (-3.22358px at 107.453px) — edge of the previously-flagged AI-tell range

**Composition**: mark/nav, headline+subhead, three vertical links (Government/Biopharma/Microgravity Research), dated announcement bar

**Color**: navy/orange duotone applied to real photography

**Authorship signals**: tagline 'Space born, Earth bound' fails the Product Swap Test in the POSITIVE direction — only makes sense for Varda's actual round-trip microgravity-manufacturing model

**Weaknesses / limitations**: internal pages not inspected; cross-route coherence untested

**Transferable principle**: MOST IMPORTANT: dotted grid overlay on a REAL satellite photograph is direct counter-instance evidence that 'technical framing decoration' is not automatically a hollow AI tell — it reads as motivated because it sits on literal geospatial imagery, unlike this project's own earlier Perigee example where a similar device framed a non-photographic illustrative diagram with no representational justification. Also a 4th independent confirmation that negative tracking (-0.03em here) is not diagnostic.

**Do not copy**: MT Everyday Sans (licensed typeface)

**Tags**: {"industry": "aerospace", "product_type": "marketing-homepage", "design_school": "information-architecture", "density": "low-moderate", "tone": "confident-technical", "typography_type": "licensed-custom-sans", "motion_level": "not-observed", "asset_dependence": "high", "brand_maturity": "mature", "page_type": "marketing-landing"}

---

### Craigslist — SF Bay Area regional index

`craigslist-sfbay` · https://sfbay.craigslist.org · Evidence: LIVE · Confidence: very high · Reviewed: 2026-07-31

**Category**: consumer-marketplace-counterexample

**Provenance**: Not verified — not applicable — predates AI-generation tooling entirely. SEARCH-tier round-6 sourcing (design essentially unchanged since late 1990s/2000s), now LIVE-confirmed by rendering

**Visual approach**: Deliberately flat, no dominant focal point, scan-based reading path, extremely high density

**Typography**: display=Times New Roman (default), body=Open Sans, H1 letter-spacing=n/a — no H1

**Composition**: ~15 category blocks, uniform link-list styling, no card treatment anywhere

**Color**: none — plain default black/white/blue-link

**Authorship signals**: restraint has an explicit business rationale (high-frequency trust-through-familiarity marketplace) confirmed directly by round-6 SEARCH sourcing, not just inferred

**Weaknesses / limitations**: n/a for this record's purpose — logged specifically as the clearest available counterexample

**Transferable principle**: THE canonical case that 'looks good' and 'works well' are separable axes; near-zero properties in common with any AI-generation convention this project catalogs — not merely 'not generic,' close to orthogonal to the entire evaluative frame

**Do not copy**: n/a — this is the opposite of a style to imitate cosmetically; the lesson is the underlying reasoning (density serves the actual task), not the literal visual output

**Tags**: {"industry": "consumer-marketplace", "product_type": "index-listing", "design_school": "brutalist-raw", "density": "extremely-high", "tone": "utilitarian-plain", "typography_type": "system-default", "motion_level": "none", "asset_dependence": "none", "brand_maturity": "mature-legacy", "page_type": "index-listing"}

---
