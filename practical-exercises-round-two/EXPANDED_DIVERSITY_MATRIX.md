# Expanded Diversity Matrix — twelve exercises

Supersedes `ROUND_TWO_DIVERSITY_MATRIX.md` for 09–12 and adds the cross-set constraints. Rows 01–08
are unchanged from that file except where a decision has since been made.

## Exercises 09–12

| # | Exercise | Category | Primary user | Primary task | Density | Energy | Design tradition | Typography | Layout model | Assets | Colour behaviour | Motion | Device | Ground |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 09 | **Halstead Permits** — civic permit & inspection service | Government service | Homeowner or small contractor mid-application | Know where the application stands and what is needed next | Med | **Deliberately low** | Public service design; GOV.UK/USWDS lineage | Public Sans | Single-column task flow + a status page | None; icons only where a system exists | Neutral institutional; status never colour-only | None | Mobile and desktop equally | Cool institutional light |
| 10 | **Tidepool** — interactive youth science | Learning | Reader aged roughly 9–13, plus a teacher | Run an experiment, see what changes, understand why | Low | **High, but not cute** | Science museum exhibit, not a cartoon | Rubik + Recursive Mono (readouts) | Interactive canvas with a controls tray and a results log | Authored simulation graphics | Bright, but instrument-legible | **Load-bearing — the simulation is the content** | Tablet-first | Bright light |
| 11 | **Splitline** — live athletics timing & results | Live sport data | Spectator, coach, or official during a meet | Read the race that is happening now, then find a result | **High** | Med-high | Stadium scoreboard and federation results sheet | Chivo + Chivo Mono | Live board → event tree → athlete card | Authored track/lane graphics | **Dark-first**, lane colours as identity | Live updating only | **Large screen and phone, both primary** | Dark |
| 12 | **Bench & Course** — architectural materials catalog | Specification tooling | Architect or specifier assembling a schedule | Compare materials, then export the spec | High | Low-med | Trade sample book and specification sheet | Familjen Grotesk + Spline Sans | Sample field → material sheet → schedule | **Licensed material photography (surfaces, not buildings)** | Warm neutral; material colour is the only saturation | None | Desktop-first | Warm neutral |

## Typeface allocation across all twelve

| Family | Exercise | Licence |
|---|---|---|
| Newsreader | 01 | OFL 1.1 |
| Barlow Semi Condensed | 01, 07 | OFL 1.1 |
| Source Sans 3 | 03 | OFL 1.1 |
| Instrument Sans / Instrument Serif | 04 | OFL 1.1 |
| Atkinson Hyperlegible | 05 | OFL 1.1 |
| Encode Sans Semi Condensed | 06 | OFL 1.1 |
| Bricolage Grotesque | 07 | OFL 1.1 |
| Radio Canada + Source Code Pro | 08 | OFL 1.1 |
| Public Sans | 09 | OFL 1.1 |
| Rubik + Recursive | 10 | OFL 1.1 |
| Chivo + Chivo Mono | 11 | OFL 1.1 |
| Familjen Grotesk + Spline Sans | 12 | OFL 1.1 |
| Schibsted Grotesk | 02 | OFL 1.1 |

No family is primary in more than two exercises. Barlow Semi Condensed appears twice, both times as a
secondary apparatus voice rather than a display face — recorded as the one documented reuse.

Three superfamily pairings (Chivo/Chivo Mono, Recursive's axes, Familjen/Spline) are each justified by
a numeric requirement: results, readouts and schedules need tabular figures that match their display
face exactly. If more than three exercises reach for that solution it stops being a reason and starts
being a habit.

Excluded outright: Inter, JetBrains Mono, Fraunces, Lora, Figtree, Space Grotesk, Manrope, DM Sans,
Plus Jakarta Sans, and every round-one face (Libre Franklin, Source Serif 4, EB Garamond, Fira Sans
Condensed, Jost, Archivo, Work Sans, IBM Plex).

## Amendments to 01–08 after building

**02 Bellman's Mill.** Three rows in `ROUND_TWO_DIVERSITY_MATRIX.md` were provisional and are now
settled, in two cases against the provisional guess:

| Axis | Provisional | Built | Why |
|---|---|---|---|
| Typography | TBD after specimen test | Schibsted Grotesk, single family | The serif-led direction won on looks and lost on register and on distance from Exercise 01 |
| Layout model | Full-bleed image sequence + fixed booking rail | Captioned survey field, no hero, booking task in the header and a form | The full-bleed sequence is the category template; it made every photograph equally important and needed filler text between frames |
| Ground | Dark, derived from imagery | Limewash `#e6e8e0` | Rendered. Dark grounds isolate bright daylight photographs and crush the interiors |

## Cross-set role assignments

Each of these is claimed by exactly one exercise, so none of them can quietly go unbuilt.

| Required role | Exercise | What it means in practice |
|---|---|---|
| Deliberately conventional | **09 Halstead Permits** | Follows established public-service patterns exactly. Inventing here would be a defect. Success is measured in task completion, not in distinctiveness. |
| Highly expressive | **07 The Gantry** | Two-colour riso overprint, loud, promotional. |
| Very dense | **03 Meridian Credit** | Hundreds of comparable figures on one screen without scrolling. |
| Mobile-first | **04 Reedcase** | Designed at 390 first; desktop is the adaptation. (05 and 02 are also mobile-first but 04 is the graded case.) |
| Asset-led | **02 Bellman's Mill** | Photography carries the argument. Remove the images and there is no product. |
| Interaction-led | **10 Tidepool** | The interaction *is* the content; static screenshots cannot represent it. |
| Typographically led | **12 Bench & Course** | Hierarchy, tabular alignment and specification conventions do the work. Explicitly not another editorial publication. |
| Intentionally neutral | **08 Transom** | No personality by design; a reference manual that gets out of the way. |

## Diversity limits, tracked

**Page architecture** — no model repeated more than twice:
text column + margin rail (01); captioned survey field + a section-and-year page (02); frozen comparison table (03);
feed → detail (04, 11 event tree is a variant and counts against this pair); single-task stack (05, 09);
ledger → job card (06, 12 sample field → sheet counts as a variant of this pair); poster grid → schedule (07);
three-pane docs (08); canvas + controls tray (10).
No model reaches three uses. If a build drifts into a third instance of any of these, it is
re-architected, not shipped.

**Dark-first grounds** — limit 4. Committed: 11 (dark), 08 (dark code surfaces in a light shell,
counts as one). **02 was provisionally dark and is not**: the ground study showed that a dark ground
turns bright daylight photographs of a white building into isolated rectangles and crushes the
interiors, so it ships on a pale limewash `#e6e8e0`. That leaves 2 of 4 used and two slots unclaimed.

**Warm-neutral / cream grounds** — limit 3. Committed: 12 only. Round one used warm paper in all three
builds; this round uses it once, in the one place where a trade sample book makes it a domain
reference rather than a default.

**Signature interactions** — no device repeated. Firn's margin rail is spent and will not recur in any
form: no reading-position indicators, no annotation margins, no depth/progress spines.

**Exercises that will ship with no signature device at all: 03, 05, 08, 09.** This is a stated target,
not a fallback. A third of the set must demonstrate that a conventional structure executed with
exceptional judgment beats an invented one.

## What 09–12 add that 01–08 did not cover

- **09** is the first exercise where the correct answer is to design nothing novel. It tests whether
  restraint is available as a deliberate choice rather than as a shortage of ideas.
- **10** is the first where motion and state are load-bearing. Everything so far has been readable as
  a static render; this one is not, which also tests whether the render-inspection process extends to
  behaviour.
- **11** is the first with genuinely live data and a dark, glanceable, distance-legible mode, and the
  first that must work at both 2,000px on a wall and 390px in a hand with the same information model.
- **12** is the second photography exercise, and a harder one than 02: material surfaces at close
  range, where colour fidelity and scale reference matter and a beautiful photograph that misrepresents
  a finish is a product failure, not a design win.
