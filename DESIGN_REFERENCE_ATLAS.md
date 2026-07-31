# Design Reference Atlas

Human-readable companion to `design-reference-atlas.json` (the authoritative, machine-readable version — same entries, full field detail). This file is a curated, retrievable reference set, not a mood-board dump: every entry exists because it demonstrated something specific and checkable, logged with an evidence tier.

**Evidence tiers** (see `PROFESSIONAL_WEB_DESIGN_RESEARCH.md` Part 1 for full definitions): `LIVE` (rendered + DOM/CSS-inspected this project), `SEARCH` (cited live web search), `CODE` (verified against public repo/design-system docs), `PROVENANCE` (verified designer/studio attribution), `RECALLED` (training knowledge, lowest tier, always flagged).

**Status: 18 entries as of this version.** This is a running document — see `PROFESSIONAL_WEB_DESIGN_RESEARCH.md` Part 2 for the full target roster and current progress against the completion gates.

## A load-bearing cross-entry finding: negative letter-spacing

As of this version, H1 letter-spacing has now been directly LIVE-measured on 8 highly-credited, definitely-human-designed products: Stripe (-0.02em), Linear (-0.022em), Basecamp (-0.0225em), Varda (-0.03em), IKEA (-0.0348em), Notion (-0.048em), and Vercel (-0.06em) — all negative — against Monocle and Airbnb (both `normal`) as the only two `normal`-tracking entries in the tight-typography cluster. Vercel's -0.06em is roughly double the top of this project's own previously-flagged '-0.01em to -0.03em template tell' range. **The pattern that's emerging is not 'negative tracking is fine' vs. 'negative tracking is a tell' — it's that tight tracking on large display type is the dominant convention among design-forward tech/retail products specifically, while editorial/travel-marketplace products (Monocle, Airbnb) more often use normal tracking.** The register (tech/SaaS/retail hero type vs. editorial/magazine type) predicts the choice far better than any fixed em-value threshold does. See `TYPOGRAPHY_RESEARCH.md` (forthcoming) for the full analysis.

## A second finding: AI-generated dense dashboards are not automatically generic

The `lovable-cfo-command-center` entry is a real, live-verified counter-example to the assumption that AI-tool output defaults to decorative 'metric wall' dashboards: every visible KPI is decision-relevant, the Sankey chart carries real informational payload, and the listing includes a specific, plausible operational-governance detail ('books locked by the controller') that matches this project's own Realism Audit criteria almost exactly. Combined with round 7's finding that AI-tool marketing output is not visually monolithic, this extends the same conclusion to dense/utilitarian product types.

---

## Retrieval index

### By design school

- **brutalist-raw**: `v0-color-palette-generator`, `craigslist-sfbay`
- **editorial-minimalist**: `lovable-maison-storefront`, `ikea-homepage`, `monocle-homepage`, `airbnb-homepage`
- **information-architecture**: `govuk-design-system`, `github-primer`, `varda-space-industries`, `nytimes-homepage`, `lovable-cfo-command-center`
- **modern-tool-builder-saas**: `stripe-homepage`, `linear-homepage`, `vercel-homepage`
- **warm-humanist**: `basecamp-homepage`, `lovable-continuum-habit-tracker`, `notion-homepage`, `lovable-coffee-order-page`

### By industry

- **aerospace**: `varda-space-industries`
- **consumer-marketplace**: `craigslist-sfbay`
- **developer-tools**: `github-primer`, `linear-homepage`, `v0-color-palette-generator`, `vercel-homepage`
- **ecommerce**: `lovable-maison-storefront`
- **editorial**: `nytimes-homepage`, `monocle-homepage`
- **fintech**: `stripe-homepage`
- **fintech-internal-tools**: `lovable-cfo-command-center`
- **food-beverage-small-business**: `lovable-coffee-order-page`
- **government**: `govuk-design-system`
- **marketplace-travel**: `airbnb-homepage`
- **retail**: `ikea-homepage`
- **saas**: `basecamp-homepage`
- **saas-productivity**: `notion-homepage`
- **saas-wellness**: `lovable-continuum-habit-tracker`

### By density

- **extremely-high**: `craigslist-sfbay`, `nytimes-homepage`
- **high**: `lovable-cfo-command-center`
- **high-per-length**: `stripe-homepage`
- **low**: `github-primer`, `lovable-maison-storefront`, `lovable-continuum-habit-tracker`, `vercel-homepage`
- **low-moderate**: `govuk-design-system`, `varda-space-industries`, `lovable-coffee-order-page`
- **moderate**: `linear-homepage`, `basecamp-homepage`, `v0-color-palette-generator`, `notion-homepage`
- **moderate-high**: `ikea-homepage`
- **unknown**: `monocle-homepage`, `airbnb-homepage`

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

### The New York Times — NYTimes.com homepage

`nytimes-homepage` · https://www.nytimes.com · Evidence: LIVE, PROVENANCE · Confidence: high · Reviewed: 2026-07-31

**Category**: editorial-news

**Provenance**: Verified — NYT in-house (design director Tom Bodkin commissioned Matthew Carter for the Cheltenham headline system, 2003). SEARCH-tier sourcing (Fonts In Use, It's Nice That), now LIVE-confirmed the masthead and page structure render as described

**Visual approach**: Dense multi-column front page, real-time news hierarchy, blackletter masthead logotype as an image/custom mark, not live text

**Typography**: display=custom NYT type system (Cheltenham/Franklin/Imperial/Georgia, role-specific), body=Georgia (digital body), H1 letter-spacing=not applicable — masthead is a custom mark, not a live H1; a found <h1> element was a small 16px byline-style element, not the masthead

**Composition**: Multi-column front-page news layout: lead story with image, secondary story list, live news ticker with real timestamps ('1m ago', '6m ago')

**Color**: near-monochrome (black/white/gray), red used only for 'LIVE' status label

**Authorship signals**: genuinely live, dated, current content — the strongest possible 'evidence of ongoing operation' signal, impossible to fake convincingly at this density and freshness

**Weaknesses / limitations**: one ad slot failed to load in the render (visible as a blank gray box) — logged as a rendering artifact, not a design defect

**Transferable principle**: extremely high information density is legitimate and expected for this product type and audience — directly reinforces this project's own §3 table row for 'content-heavy site' and pushes back against any blanket 'more whitespace is more professional' heuristic

**Do not copy**: NYT's proprietary type system (Cheltenham/Imperial/Franklin are commissioned, not licensable)

**Tags**: {"industry": "editorial", "product_type": "news-homepage", "design_school": "information-architecture", "density": "extremely-high", "tone": "authoritative-current", "typography_type": "custom-serif-system", "motion_level": "not-observed", "asset_dependence": "high", "brand_maturity": "mature-legacy", "page_type": "index-listing"}

---

### IKEA — IKEA.com (US) homepage

`ikea-homepage` · https://www.ikea.com/us/en/ · Evidence: LIVE, CODE, PROVENANCE · Confidence: high · Reviewed: 2026-07-31

**Category**: retail-ecommerce

**Provenance**: Verified — IKEA in-house (Skapa design system team). SEARCH-tier (intodesignsystems.com case study: 200+ product teams, React Storybook), now LIVE-confirmed the live site uses the described custom type stack

**Visual approach**: Bold, high-contrast product-forward retail homepage

**Typography**: display=Noto IKEA (custom), body=Noto IKEA / Noto Sans fallback, H1 letter-spacing=-0.0348em (-1.39286px at 40px)

**Composition**: not deeply inspected beyond hero

**Color**: IKEA yellow/blue brand colors

**Authorship signals**: custom-named typeface (Noto IKEA, an IKEA-specific variant) confirms real typographic investment beyond a default stack

**Weaknesses / limitations**: only the homepage hero was inspected this round; Skapa's actual component-level craft (the more interesting design-system evidence per the SEARCH-tier case study) was not directly verified live

**Transferable principle**: ANOTHER CONFIRMATION of negative tracking (-0.0348em) on a real, massive-scale, definitely-human-designed retail brand — now six independent real-brand confirmations across this project's research (Stripe, Linear, Basecamp, Varda from round 7; IKEA and more below from this round)

**Do not copy**: Noto IKEA typeface (custom/licensed)

**Tags**: {"industry": "retail", "product_type": "ecommerce-homepage", "design_school": "editorial-minimalist", "density": "moderate-high", "tone": "bold-approachable", "typography_type": "custom-sans", "motion_level": "not-observed", "asset_dependence": "high", "brand_maturity": "mature", "page_type": "marketing-landing"}

---

### Vercel — Vercel.com homepage

`vercel-homepage` · https://vercel.com · Evidence: LIVE, PROVENANCE · Confidence: high · Reviewed: 2026-07-31

**Category**: developer-infrastructure-marketing

**Provenance**: Verified — Vercel in-house design team (named Design Engineer Rauno Freiberg, CEO Guillermo Rauch publicly discusses product/design philosophy). SEARCH-tier sourcing, now LIVE-confirmed

**Visual approach**: Extreme restraint: near-monochrome gray/black/white palette, one large 3D-shadowed triangle (the Vercel logomark) as the entire hero visual, no gradient mesh visible on this render

**Typography**: display=GeistSans (Vercel's own open-source typeface), body=GeistSans, H1 letter-spacing=-0.06em (-3.84px at 64px) — the tightest tracking measured anywhere in this project's research to date

**Composition**: centered hero, real named customer logo row below the fold (Blackbox.ai, Charles Schwab, DoorDash, OpenAI, Supreme, The Weather Company, Polymarket)

**Color**: near-monochrome; pill-shaped black primary button, white secondary button

**Authorship signals**: real, checkable, named customer logos (not fabricated); the entire hero visual is the brand's own logomark rendered large rather than a stock/generated image or abstract decoration

**Weaknesses / limitations**: single-page hero inspection only

**Transferable principle**: LOAD-BEARING FINDING: -0.06em tracking is nearly double the top of this project's previously-flagged 'AI tell' range (-0.01em to -0.03em) — on GeistSans, Vercel's own open-source typeface, at a company whose CEO/design team are named and public. This is the single strongest piece of evidence yet that negative tracking magnitude alone carries essentially no diagnostic signal.

**Do not copy**: the Vercel triangle logomark itself (trademark); GeistSans is open-source (SIL OFL) and may be used with attribution per its license

**Tags**: {"industry": "developer-tools", "product_type": "marketing-homepage", "design_school": "modern-tool-builder-saas", "density": "low", "tone": "confident-restrained", "typography_type": "open-source-custom-sans", "motion_level": "not-observed", "asset_dependence": "low", "brand_maturity": "mature", "page_type": "marketing-landing"}

---

### Notion — Notion.com homepage

`notion-homepage` · https://www.notion.com · Evidence: LIVE, PROVENANCE · Confidence: high · Reviewed: 2026-07-31

**Category**: saas-productivity-marketing

**Provenance**: Verified — Notion in-house (co-founder Ivan Zhao; named illustrators Roman, Iris and others for the hand-drawn 'Faces' system). SEARCH-tier sourcing, now LIVE-confirmed the hand-drawn face illustrations are real and currently on the live homepage

**Visual approach**: Huge, extremely tight bold display type, hand-drawn circular 'Faces' avatar illustrations across the top, a real embedded product screenshot mid-page

**Typography**: display=NotionInter (custom Inter variant), body=NotionInter/Inter, H1 letter-spacing=-0.0479em (-4.6px at 96px) — second-tightest tracking measured in this project's research

**Composition**: centered hero with hand-drawn avatar row above headline, real product screenshot ('Ramp HQ' workspace) embedded below the fold

**Color**: blue accent, otherwise black/white

**Authorship signals**: hand-drawn illustration used consistently and currently, not just in historical marketing materials; real named customer logos (OpenAI, Figma, Ramp, Cursor, Vercel, Nvidia, Volvo, L'Oréal, Discord)

**Weaknesses / limitations**: single hero inspection only

**Transferable principle**: THIRD extreme-tracking confirmation this batch (-0.048em) — negative tracking, even at values far beyond this project's original flagged range, keeps appearing on exactly the highly-credited, design-forward products this research treats as positive references

**Do not copy**: the specific hand-drawn Faces illustration style (Notion's own commissioned illustration system)

**Tags**: {"industry": "saas-productivity", "product_type": "marketing-homepage", "design_school": "warm-humanist", "density": "moderate", "tone": "friendly-confident", "typography_type": "custom-variable-sans", "motion_level": "not-observed", "asset_dependence": "medium", "brand_maturity": "mature", "page_type": "marketing-landing"}

---

### Winkreative / Monocle — Monocle.com homepage

`monocle-homepage` · https://monocle.com · Evidence: LIVE, PROVENANCE · Confidence: high (typography); medium (rest of page, not deeply inspected) · Reviewed: 2026-07-31

**Category**: editorial-lifestyle-magazine

**Provenance**: Verified — Winkreative (Tyler Brûlé's own agency). SEARCH-tier sourcing (Wikipedia, magculture), now LIVE-confirmed Plantin renders as the live headline typeface exactly as described

**Visual approach**: restrained editorial, serif headlines, normal (not tightened) tracking

**Typography**: display=Plantin (a 1910s old-style serif, per SEARCH sourcing), body=not fully inspected, H1 letter-spacing=normal

**Composition**: not deeply inspected beyond hero typography

**Color**: not deeply inspected

**Authorship signals**: direct LIVE confirmation that a SEARCH-tier claim (Plantin as the real headline typeface) was accurate — a positive methodological data point for how much to trust well-sourced SEARCH-tier claims generally

**Weaknesses / limitations**: only typography was closely inspected this round; full page composition needs a follow-up pass

**Transferable principle**: counter-example within this same research batch: Monocle uses NORMAL tracking, not tight — confirming that negative tracking is a common convention in one register (tech/SaaS/retail hero type) and not a universal rule even among equally credited, equally professional references; the two clusters (tight-tracked tech vs. normal-tracked editorial) are both legitimate, register-specific choices

**Do not copy**: Plantin is a licensed commercial typeface, not free to use without a license

**Tags**: {"industry": "editorial", "product_type": "magazine-homepage", "design_school": "editorial-minimalist", "density": "unknown", "tone": "considered-international", "typography_type": "licensed-old-style-serif", "motion_level": "not-observed", "asset_dependence": "unknown", "brand_maturity": "mature", "page_type": "marketing-landing"}

---

### Airbnb — Airbnb.com homepage

`airbnb-homepage` · https://www.airbnb.com · Evidence: LIVE, PROVENANCE · Confidence: medium (typography only; full page not deeply inspected) · Reviewed: 2026-07-31

**Category**: marketplace-travel

**Provenance**: Verified — Airbnb in-house Design Language System team (codified ~2016; Karri Saarinen among named team members). SEARCH-tier sourcing (karrisaarinen.com/dls), now LIVE-confirmed the custom Airbnb Cereal VF typeface renders live

**Visual approach**: photography-led, restrained UI chrome, search-first utility layout

**Typography**: display=Airbnb Cereal VF (custom variable font), body=not fully inspected, H1 letter-spacing=normal

**Composition**: not deeply inspected beyond hero this round

**Color**: not deeply inspected

**Authorship signals**: custom variable font (Airbnb Cereal VF) confirmed live, matching the well-documented DLS history

**Weaknesses / limitations**: this round's inspection was typography-focused only; the DLS's actual component-level claims (ListingCard, DateRangePicker, PhotoGallery) were not independently re-verified against the live site

**Transferable principle**: another real confirmation that normal tracking is equally legitimate and common among top-tier, definitely-human, definitely-not-generic products — the split is not tight-tracking=bad, it's whether the choice was actually examined for this specific product

**Do not copy**: Airbnb Cereal VF (proprietary custom typeface)

**Tags**: {"industry": "marketplace-travel", "product_type": "marketing-homepage", "design_school": "editorial-minimalist", "density": "unknown", "tone": "warm-trustworthy", "typography_type": "custom-variable-sans", "motion_level": "not-observed", "asset_dependence": "high", "brand_maturity": "mature", "page_type": "marketing-landing"}

---

### Lovable community — CFO Command Center - Finance Reporting Dashboard (Lovable template)

`lovable-cfo-command-center` · https://lovable.dev/templates/apps/internal-tools/cfo-command-center-finance-reporting-dashboard-template · Evidence: LIVE · Confidence: very high provenance; medium depth (preview screenshot only) · Reviewed: 2026-07-31

**Category**: ai-generated-dense-dashboard

**Provenance**: Verified — disclosed AI-generation (Lovable). hosted on Lovable's own template gallery, '113 remixes' attribution

**Visual approach**: Dense, dark-theme finance dashboard: animated Sankey money-flow diagram, real KPI card row, scenario-comparison tabs

**Typography**: display=not identified by name, body=not determined

**Composition**: KPI row (ARR/Gross Margin/Net Burn/Runway/Cash Balance) above a large labeled Sankey chart, scenario tabs (Actuals/Board plan/Efficiency case/Upside case/Model a scenario)

**Color**: dark navy/near-black background, blue/orange/green semantic Sankey flow colors

**Authorship signals**: genuinely strong: every KPI is decision-relevant (ARR, Gross Margin, Net Burn, Runway, Cash Balance — a real CFO's actual primary metric set), the Sankey chart has real informational payload (a genuine money-flow breakdown with real category labels), and the operational governance detail ('books locked by the controller') is a specific, non-generic realism signal

**Weaknesses / limitations**: static preview only — motion, interaction, and other routes/states not independently verified

**Transferable principle**: MAJOR COUNTEREXAMPLE to any assumption that AI-generated dense/utilitarian interfaces default to decorative 'metric wall' dashboards. This one passes this project's own §4.3 'does this number change what the user does next' test on every visible KPI, and includes a specific, plausible governance/operational detail exactly matching this project's own Realism Audit criteria. Directly relevant to this calibration project's Exercise 2 (dense professional application) as both inspiration and a real point of comparison.

**Do not copy**: n/a

**Tags**: {"industry": "fintech-internal-tools", "product_type": "dashboard", "design_school": "information-architecture", "density": "high", "tone": "serious-operational", "typography_type": "unknown", "motion_level": "claimed-animated-unverified", "asset_dependence": "low", "brand_maturity": "none", "page_type": "app-interior"}

---

### Lovable community — Coffee Order Page 'Groundwork Coffee' (Lovable template)

`lovable-coffee-order-page` · https://lovable.dev/templates/websites/ecommerce/coffee-shop-order-page · Evidence: LIVE · Confidence: very high provenance; medium depth (preview screenshot only) · Reviewed: 2026-07-31

**Category**: ai-generated-small-business

**Provenance**: Verified — disclosed AI-generation (Lovable). hosted on Lovable's own template gallery, '69 remixes' attribution

**Visual approach**: Full-bleed real latte-art photography hero, dark navy nav bar, bold repeated 'SMALL BATCH' marquee-style banner

**Typography**: display=bold condensed sans (not identified by name), body=not determined

**Composition**: Menu/Location/About nav, full-bleed photo hero, repeated marquee text band below

**Color**: dark navy/cream, warm coffee-photo tones

**Authorship signals**: the 'without third-party platforms taking your identity' positioning is a real Product Swap Test PASS — specific to the actual pain point of independent coffee shops using DoorDash/Grubhub/Square-branded ordering pages that dilute their own brand

**Weaknesses / limitations**: static preview only; unclear how much of the photography is licensed stock vs. AI-generated vs. genuinely commissioned

**Transferable principle**: a tasteful, real counter-example for the specific small-business category this project's own Phase 5 flagged as hardest to find genuine provenance for on the human-made side — useful as a paired comparison point for this calibration project's Exercise 1

**Do not copy**: n/a

**Tags**: {"industry": "food-beverage-small-business", "product_type": "ecommerce-order-page", "design_school": "warm-humanist", "density": "low-moderate", "tone": "warm-independent", "typography_type": "bold-condensed-sans", "motion_level": "unknown", "asset_dependence": "high", "brand_maturity": "none", "page_type": "marketing-landing"}

---
