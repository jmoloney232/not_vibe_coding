# Creative Direction — The Fenwick Museum of Craft and Industry

Practical Exercise 3 (Editorial/Cultural website), built under the revised `ANTI_VIBE_CODING_UI.md` §3/§6 process. A fictional small regional museum (mid-size American city, decorative arts / industrial design / craft focus) — chosen specifically because it sits outside the SaaS/dashboard register every other build in this project has used so far, and because this project's own research base is genuinely strong here (MoMA, Cooper Hewitt, V&A, Serpentine, Walker Art Center, Monocle/Winkreative).

## Product Brief (§3)

- **What the product does**: a public museum website — tells visitors what's on, helps them plan a visit, and gives a taste of the collection online.
- **Primary users**: prospective visitors (local + tourists) checking hours/exhibitions before a trip; a smaller group of returning members/press looking for specific exhibition detail.
- **Primary task**: on the homepage, understand what's currently on view and whether it's worth a visit; on an exhibition page, understand the exhibition's actual content and see real objects from it.
- **Usage context**: mostly a one-time or occasional visit, often on a phone, often as one of several tabs while planning a day out — not a repeated-use tool like the dispatch console.
- **Routes built this exercise**: homepage (current/upcoming exhibitions, visit info) and one exhibition detail page ("Bent Wood, Bent Rules: American Furniture, 1946–1968").
- **Real reference anchors researched this project**: Walker Art Center (`design-reference-atlas.json` via `PROFESSIONAL_WEB_DESIGN_RESEARCH.md` Part 2 — 2011 relaunch, explicitly minimal/monochromatic/print-newspaper-style, a stated institutional choice predating current AI-critique discourse), MoMA (multiple named studios across eras, stated principle "never touch the art" — canonical artwork views stay uncropped even where it constrains layout), Cooper Hewitt (Pentagram identity + custom commissioned typeface), Monocle/Winkreative (`TYPOGRAPHY_RESEARCH.md` — Plantin serif for voice/authority + Helvetica Neue for data, a two-register system).

## No Recipe Without Reason — applied before drawing on each anchor

1. **Walker Art Center's minimal/monochromatic approach**: Why fit? A small museum with a real but modest collection benefits from letting real photography and real object detail carry the visual weight, the same reasoning Walker's own director gave in 2011. What transfers? Restraint as a frame for content, not as decoration. What does NOT transfer? Walker is a major contemporary-art institution with a large photography/production budget; Fenwick, as a fictional small museum, cannot assume equivalent asset quality — this constrains what Direction B below can honestly claim (see Asset Strategy).
2. **MoMA's "never touch the art" principle**: Why fit? Directly answers a concrete layout question this exercise will actually hit (do object photographs get cropped to fit a grid, or does the grid adapt to the objects). What transfers? The principle itself — object images are never force-cropped to a uniform aspect ratio. What does NOT transfer? MoMA's specific visual system, scale, or brand assets.
3. **Cooper Hewitt / Pentagram**: Why fit? Real evidence that a museum's own commissioned typeface can be a legitimate, credited identity move. What transfers? The idea that typography itself can be an identity-bearing asset for a small institution, not just a font pick. What does NOT transfer? A real commissioned typeface is out of scope for a fictional exercise — Direction C below draws on the *principle* (a distinctive, deliberately-chosen typographic identity) using a real, licensed, non-fabricated typeface instead of inventing a fake "custom" one, since the guide's asset-strategy rules (§3) prohibit fabricating design credentials that don't exist.
4. **Monocle/Winkreative's two-register pairing**: Why fit? A real, sourced model for combining an authoritative serif voice with a neutral sans for logistics/data (hours, admission, dates) — exactly the two content types this museum site actually has (editorial exhibition copy vs. practical visit information). What transfers? The register split itself. What does NOT transfer? Monocle's specific typefaces (Plantin is a real historical typeface, usable, but the exact pairing shouldn't be copied wholesale without checking it fits a museum rather than a travel/lifestyle magazine).

## Stage 2 — Three Structurally Different Directions

(Three, not four — this exercise is not the required 4-variant test; that was already satisfied by the dispatch-console exercise. Three genuinely different structures is still well above the single-direction default this document exists to prevent.)

### Direction A — "Object-First": exhibition-as-checklist
**Concept**: the homepage and exhibition page both lead with real objects, not curatorial prose — a checklist-style presentation (object image, maker, date, material) as the primary content, with curatorial text as clearly secondary, supporting material.
**Structural difference**: grid-of-objects as the primary reading path; text is subordinate and appears after or beside the object, never before it.
**Reference anchor**: MoMA's "never touch the art" principle, applied to *emphasis* as well as cropping — objects lead structurally, not just visually.
**Risk**: without genuinely strong photography, an object-first grid can look thin or amateur — the honest asset-strategy question (below) is central to whether this direction is viable at all for a *fictional* museum with no real photography budget.

### Direction B — "Editorial-First": the exhibition as a piece of writing
**Concept**: the exhibition page reads like a real long-form museum essay (the way a Walker Art Center or MoMA exhibition microsite actually reads) — a sustained curatorial narrative with objects embedded as illustrations to the argument, not the argument itself.
**Structural difference**: single-column, long-form reading path; objects are inline illustrations at intervals, not a grid; much higher word count than Direction A.
**Reference anchor**: Walker Art Center's monochromatic, print/newspaper-style restraint — applied here to *editorial voice*, not just visual minimalism.
**Risk**: the primary "plan a visit" task (hours, admission, location) can get buried under a long essay if not deliberately kept separate and fast to find.

### Direction C — "Two-Register System": voice and logistics kept visually distinct
**Concept**: a Monocle-style deliberate split between an authoritative serif "voice" register (exhibition titles, curatorial statements) and a neutral, fast-scanning sans "logistics" register (hours, dates, admission, object labels) — the two are never visually confused, so a visitor can tell at a glance whether they're reading the museum's argument or a practical fact.
**Structural difference**: two consistently-applied typographic/layout systems on the same page (not just two fonts — object labels use a tabular, caption-convention layout; curatorial text uses a magazine-column layout), with a persistent "Visit" utility strip that stays present regardless of how long the editorial content runs (solving Direction B's named risk directly).
**Reference anchor**: Monocle/Winkreative's two-register pairing (Plantin for voice, Helvetica Neue for data), translated to a museum's actual two content types rather than copied as a magazine layout.
**Risk**: two registers done without discipline can look like two unrelated designs stitched together — the review must check whether the split reads as a coherent system or an accident.

## Stage 3 — Decision

| Criterion | A: Object-First | B: Editorial-First | C: Two-Register |
|---|---|---|---|
| Product fit | Weak without real photography (see Asset Strategy) | Strong for the "understand the exhibition" task | Strong for both stated tasks (understand + plan a visit) |
| Task clarity (plan a visit) | Weak — visit info has no natural home in an object grid | Weak unless deliberately separated | Strong — visit info is structurally guaranteed a place |
| Distinctiveness | Moderate | Moderate (closest to "generic museum microsite") | Strong — the register split is the signature move |
| Content resilience (real vs. placeholder objects) | Fails hardest if assets are weak | Survives — text carries more weight | Survives — text and data both real |
| Asset dependence | Very high | Moderate | Moderate |

**Selected: Direction C**, specifically because it's the only direction whose viability doesn't depend on having strong photography this exercise cannot honestly provide (see Asset Strategy below), and because it directly solves Direction B's named risk (visit info getting buried) as a structural feature rather than an afterthought.

## Asset Strategy (§3) — the deciding factor

| Asset | Status | Notes |
|---|---|---|
| Object photography | **Honest placeholder** | This is a fictional museum; no real objects exist to photograph. Per §3's MUST-NOT list, this build will NOT use gradient blobs, generic stock "art" imagery, or fake AI-generated artwork standing in for real museum objects — that would misrepresent the exercise's own honesty about what it can and cannot demonstrate. Instead, object entries use real curatorial-style *text* (maker, date, material, dimensions, real-sounding provenance) with an explicitly labeled placeholder treatment for the image slot, stated as such in the UI itself, not hidden. |
| Museum wordmark | Available | A plain wordmark, no fabricated "custom typeface" claim (per the No Recipe Without Reason section above). |
| Typography | Obtainable | Real, licensed, open typefaces chosen for the two-register system (see Typography Decision below) — not fabricated as "custom commissioned." |
| Exhibition curatorial text | Must-generate | Written as real museum copy would read (specific objects, real design-history references, dated claims) rather than generic "explore our collection" filler — tested against the Copy Swap Test before shipping. |
| Visit information | Must-generate | Realistic hours/admission/location, internally consistent. |

This is the single most important asset-strategy decision in this exercise: **choosing a direction whose credibility does not depend on an asset this project cannot honestly provide**, rather than building Direction A and quietly filling the object grid with placeholder-that-pretends-to-be-real imagery.

## Typography Decision (§8's 15-question framework, condensed)

- **Voice register (exhibition titles, curatorial text)**: a real, licensed serif with genuine editorial/authoritative character. Chosen: **Source Serif 4** — wait, already used in the dispatch-console exercise's Direction C; re-examine before reusing (Default 3 caution). Checked against this product specifically: a museum's editorial voice benefits from a serif with more historical/craft character than Source Serif 4's contemporary neutrality offers. Selected instead: **Lora** (a real, open, text-focused serif with calligraphic roots, distinct from Source Serif 4, genuinely re-examined rather than defaulted to a prior choice).
- **Logistics register (hours, admission, object labels, dates)**: a neutral, highly legible sans for fast scanning. Chosen: **Work Sans** — distinct from every sans already used in this project's prior builds (Public Sans, IBM Plex Sans, Source Sans 3, Big Shoulders Text), a deliberate choice to avoid the same "which sans is left" pattern this document's own Default 3 warns about.
- Both are SIL OFL-licensed, real Google Fonts entries — no fabricated or downloaded proprietary files.
