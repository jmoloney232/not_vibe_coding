# 02 — Bellman's Mill: four rooms in a working meal mill

Two routes: the property (`index.html`) and rooms, the year and dates (`stay.html`).

This is the round's photography test. Photography is not decoration here; remove the images and there
is no product.

## Product reality brief

A four-room guesthouse inside a working eighteenth-century oat mill at New Abbey, Dumfries and
Galloway, on the lade below Loch Kindar. Run by two people. No reception, no lift, no dinner.

**Who is on the page.** Someone choosing between four or five places for two or three nights. They
have already decided roughly where; they are now deciding whether *this* place suits them and, if it
does, which room and which month.

**What they actually need, in order.** (1) Is this the kind of place I want — which only photographs
can answer. (2) Which room, given that three of the four are up mill stairs. (3) Which month, given
that a watermill's year is governed by water and a Scottish year by daylight. (4) A way to ask.

**Where the money is.** A small proprietor's advantage over a chain is that they can tell the truth
and be believed. The commercial argument of this design is that stating the drawbacks plainly —
thirty-one steps, no lift, a loud building on Thursdays, no wheel in August, a dangerous shore —
converts better than concealing them, because the people it puts off were going to leave a bad review
anyway. Every section is written on that basis.

## The asset constraint that changed the design

Ten large CC BY-SA photographs of a real working mill exist and are excellent: exterior, launder,
wheel, lade, pond in two seasons, stone floor, gearing, tools, hoist trap. **No honest photograph of a
guest bedroom exists**, and none was faked — no period-house interior standing in for a room, no
stock, no gradient block. See `ASSETS.md`.

That absence is a fact about the brief, not an excuse, and it produced the better answer. A generic
hospitality site is a bedroom gallery, and bedroom galleries do not distinguish one converted mill
from another. What actually differs between these four rooms is *where they are in the building* —
which decides stairs, noise, warmth and view. So the rooms are carried by a scale section drawing,
measured facts, and a photograph of what each one looks out at or backs onto.

## References

| Reference | Why relevant | Attribute studied | Transfers | Does not transfer |
|---|---|---|---|---|
| **The Fife Arms, Braemar** (professional) | Scottish, property-specific, expensive without being generic luxury | Committing to one place hard enough that the site could not be re-skinned for anywhere else | Naming rooms after what they were; letting the building's oddity be the selling point | Its budget — commissioned photography and illustration on every screen |
| **Trunk Hotel / Kagurazaka-type independent sites** (professional) | Small inventory, image-led, restrained | Pacing: how few words a photograph needs beside it | Captions that state a fact rather than set a mood | Fashion-adjacent art direction, which would look absurd on a meal mill |
| **A National Trust for Scotland property page** (conventional) | What a reader of this subject actually encounters | The conventions guests expect: what it is, when it opens, how to get there, what the access is like | The access statement, taken seriously and moved to the front instead of a footer link | Institutional voice, ticketing furniture, three-card "plan your visit" |
| **AI-generated "boutique hotel" landing pages** (negative) | The documented template cluster for this category | Full-bleed hero with the name overlaid, a Playfair or Cormorant display serif, three equal room cards, "nestled in the heart of", a sticky dark booking bar | — | Everything. Specific avoidances: no hero, no display serif, no room cards, and the booking task lives in a plain header line and a form rather than a floating bar |
| **A measured building survey / RIBA section drawing** (outside web design) | The document that explains a vertical building | Levels annotated to a datum, rooms shaded, stairs drawn as treads, notes on leaders | The section is this, directly, including putting the kiln's label on a leader because the shaft is too narrow to letter inside | Full survey formality — no dimensions strings, no north point, no title block |

Quality dependence: the Fife Arms's quality depends heavily on commissioned art and cannot be copied
without that budget. The NTS page's quality depends on discipline about facts, which is free — so it
is the closer model.

## Typography

Three directions rendered on identical content: `../evaluation/02-studies/typography.html`.

**Chosen: B — Schibsted Grotesk alone.** Hierarchy from size, weight, case and colour, with no second
family.

**Rejected A — Literata reading serif + Schibsted Grotesk apparatus.** The best-looking of the three
and genuinely comfortable to read. Two reasons against. First, the italic serif standfirst assigns a
literary, romantic register to a proprietor whose voice is "we are not going to pretend otherwise" —
it makes the page sound like a magazine writing *about* the mill rather than the people who run it.
Second, it is structurally the same recipe as Exercise 01 — reading serif for prose, sans for
apparatus, on a near-white ground — and a family resemblance across exercises is the specific failure
this benchmark exists to detect.

**Rejected C — Zilla Slab display + Literata reading.** The slab title has a good machine-age
quality, but setting the fact lists in Zilla and the prose in Literata puts two serifs next to each
other in a way that reads as an accident rather than a decision, and three families is one too many
for a site with this little text.

**Not tested, and why:** the category default — Playfair Display or Cormorant Garamond over a neutral
sans — was excluded before the specimen test rather than after. It is the documented signature of the
template cluster this exercise exists to avoid, and testing it would have been theatre.

Choosing a single family also means half the round's exercises must succeed on a compressed
hierarchy, which was a stated target in the baseline. Display runs 88px against 11.5px micro type:
about 7.6×, well below round one's 8.4–12.9×.

## Colour

Ground study: `../evaluation/02-studies/ground.html`, three grounds under the same photographs.

**Chosen: limewash `#e6e8e0`** — low-chroma, faintly olive, sampled from the harled walls and pulled
off yellow so it reads as chalk rather than cream. Ink `#1d1811` from the tarred timber of the
launder; one accent `#44562d` from moss on the lade wall.

**Rejected: wet slate `#1b2023` and dark timber `#1a1612`.** The provisional plan in the diversity
matrix was a dark, photograph-derived ground. Rendering it killed it. These are bright daylight
photographs of a white building in a green valley: on a dark ground each frame becomes an isolated
rectangle floating in a void, the white gable punches so hard that the exterior dominates everything
else, and the interiors lose their shadow detail. The pale ground is continuous with the daylight in
the pictures, so the building extends into the page.

That also frees the round's fourth dark-ground slot, which is now unclaimed.

## Structure

Three directions sketched: `../evaluation/02-studies/structure.html`.

**Chosen: S3 — survey field.** No hero. Ten photographs laid out at once in masonry columns, every
one captioned with what it actually is, then the prose beneath. A mill is a machine made of parts and
you understand it by seeing the parts together — lade, pond, launder, wheel, gearing, stones, tun.
An establishing shot of the outside tells you almost nothing about a mill.

**Rejected S1 — full-bleed sequence with a sticky date bar.** Competent, and indistinguishable from a
thousand others. Three specific problems: the headline overlaid on the photograph is fragile with real
content; the short centred passages between images carry no information and exist only to give the
pictures air; and giving every photograph the same 62vh makes them equally important when they are
not.

**Rejected S2 — held photograph, moving text.** Reads expensively and keeps a full measure, but it
fails on mobile — below 760px it collapses to image-then-text, which is S1 without the bleed, so the
whole idea evaporates exactly where more than half the audience is. It also forces hard crops: a
fixed tall pane cropped the wheel photograph to portrait and cut off the launder.

Two things were taken from the rejected directions: S1's insistence that the booking task stay
reachable (as a plain rate line in the sticky header, not a floating dark bar), and S2's full reading
measure for the prose.

## The signature move, tested against the six questions

The section drawing is the one non-obvious structural device. It was put through the six questions
before it was built, and one of the answers changed the design.

1. **Does it improve comprehension or task completion?** Yes. "31 steps" is abstract; seeing where
   the room sits in a three-storey mill is not. Position in the building is the single largest
   difference between the four rooms.
2. **Does it emerge from the subject?** Yes. A mill is stacked by machinery, and a scale section is
   the conventional notation for exactly this. It is not a metaphor — it is the same idea as a seat
   map or a campsite plan, both of which are ordinary.
3. **Does it survive real content?** Yes — it is generated from the same `ROOMS` array the cards use,
   so the drawing and the step counts cannot disagree.
4. **Does it survive mobile?** Not as drawn, which the render proved: scaled into 390px the labels
   came out at about six pixels and the figure lost both facts it exists to carry. It now has a
   second, narrower composition that drops the wheel, the water and the dimension column and lets the
   numbered badges do the naming against the cards below.
5. **Does it scale to the secondary route?** It belongs to one route and is not stretched onto the
   other. The numbering it introduces is reused by the room cards.
6. **Would the design be better without it?** Without any drawing, worse. **Without it being
   interactive, better** — and that is where the honest answer changed the plan. The first design had
   the section as a room selector. Someone comparing four rooms wants all four visible at once;
   making the drawing a control would have hidden three-quarters of the comparison behind a click, to
   demonstrate cleverness. It is a static figure, and the four rooms are set out in full beneath it.

## Data that is computed rather than invented

Daylight in the year table is sunrise-to-sunset from the NOAA solar-position algorithm at
54.978 °N, 3.617 °W, at the 90.833° zenith, on the 15th of each month — 7 h 12 m in December,
17 h 20 m in June. It is calculated in `data.js` at load rather than typed in, so it cannot drift
from the claim in the caption. Availability is invented but generated from a fixed seed, so a month
shows the same nights on every reload and the figure quoted back in the enquiry summary is the same
number the table shows.

## States and edge cases

- Enquiry rejects: missing dates, a leaving date before the arriving date, a stay under the stated
  two-night minimum, and a missing name — each with a specific message rather than a generic one.
- The confirmation is composed per month, not templated: all twelve months were run and each produces
  a grammatical sentence for the wheel and the milling.
- The year table becomes a stacked list below 720px rather than scrolling sideways, because "which
  month should I come" is a comparison and a sideways-scrolling comparison is not one.
- Dry months are grouped by a ground tint, not by lightening the text.
- The photographs form two comparison sets — the June/November pond, and the four rooms — and each
  set is held to one aspect ratio.

## Verified

Rendered at 1440 / 834 / 390, both routes: no console errors, no horizontal overflow, no page errors.

- **All text passes WCAG AA** at its own size and weight, measured against its real computed
  background on both routes.
- **Keyboard:** 16 tab stops on `index.html`, 18 on `stay.html`; every one has a visible focus ring
  and no focusable target is under 24px tall.
- Every image carries explicit `width`/`height`, so nothing reflows if an image fails.
- Total page weight 4.6 MB across ten photographs at two sizes each; nothing over 330 KB at the large
  size, 110 KB at the small.

### Defects the renders and the interaction tests caught

**The survey field was never marked up.** The CSS carried a wide lead plate and a paired seasonal
comparison; the HTML had neither, so all ten frames flowed as equal columns. Invisible in the
stylesheet, obvious in the first render.

**The seasonal pond pair was not a comparison.** The June frame is portrait and the November frame
landscape, so in a two-column grid one was twice the height of the other and the point of putting
them together — the same pond, drawn down — was lost. A 4:3 derivative was cut from the original and
both halves are now locked to one shape.

**Every room in the section drawing was one storey below its own floor level.** Rooms were positioned
from `floor + height` downwards instead of upwards, so the Stone Floor and the Kiln Room were drawn
on the ground floor and overdrew the Wheel Room, which vanished entirely. Rooms now derive their
extent from a metres range and the drawing is generated from it.

**The room numbers were invisible.** The badge numerals were set by a presentation attribute in JS
while a CSS class set `fill` — CSS wins, so each numeral rendered dark green on dark green.

**The section drawing failed at 390px** — see question 4 above.

**A date input showed no focus ring on the way in.** Chromium focuses a segment inside the input's
shadow tree, so the host matches `:focus-within` but neither `:focus` nor `:focus-visible`, and a
keyboard user tabbing into the arrival date saw nothing at all.

**Two copy defects found by driving the form.** The confirmation read "the *The* Bin Floor rate", and
built its wheel sentence out of table-cell fragments, producing "in July the wheel usually stopped".
Table cells are noun phrases and do not survive being dropped into sentences; prose now has its own
wording, checked across all twelve months.

**Photograph credits sat at 2.91:1.** Attribution is a licence obligation, not a footnote, and it was
the least readable text on the page. It is now separated by size rather than by being faded out.

## Not verified

- **Blind review has been run** — `../ROUND_TWO_BLIND_REVIEW.md`, reviewer E, plus the authorship
  reviewer X. Distinctiveness scored 4 of 4. It also found the defect that mattered most: the enquiry
  form arrived pre-filled across a night its own availability strip showed as taken. Fixed, along
  with the missing telephone number behind "we would rather you rang", a caption claiming Criffel was
  visible where it is not, and a room list quoting one rate all year. Still open, and listed in that
  document: no room photography, no map, no bathroom or cancellation detail, and a 4px availability
  strip at 390px.
- No screen-reader pass. The section drawing is a labelled `role="img"` and everything it shows is
  also stated in the room cards below, so nothing exists only in the drawing — but this is reasoned,
  not tested.
- Ten inline attribution links sit between the header and the prose in the tab order. The skip link
  covers it, but a keyboard user reading top to bottom passes through all of them.
- The availability strip is a `role="img"` with a summary label; the individual nights are not
  separately reachable, which would matter if this were a real booking calendar rather than an
  indication.
- No print stylesheet.
