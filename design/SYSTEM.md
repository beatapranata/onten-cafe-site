# Cafe Onten — design system

## Positioning
A bright, plant-filled Midtown coffee bar pouring layered house signatures
(ube, salted peanut, Thai tea + espresso) with housemade syrups — and the ON10
handroll bar at the same address.

**Conversion event:** a visit. Every primary CTA is directions.

## Signature moment
The signature moment is **the house signature list set on one pane of liquid
glass laid over a photo of the bar, with a highlight that follows the cursor
across the glass**. It exists because the brief asked for liquid glass and the
room is glass, steel and daylight — the pane frosts the La Marzocco behind it.
Everything else is quiet so it lands. Glass elsewhere (nav, chips, captions,
the address card) is the material, not a second moment.

Replaced: drawn SVG cups poured on scroll. The client didn't like them, and
real photography arrived that made illustration unnecessary.

## Photography
Every photo lives in `src/assets/photos` with a descriptive filename, and in
`content.ts` with alt text and a `tier`:
- **primary** — the cafe's official photos, plus Brady's shots delivered
  alongside them (people, the ON10 sign, the counter). Prime placements.
- **last** — Brady's `USE LAST` folder. Only ever the final gallery row.

Placement: hero (interior + pink-tee inset print) · signatures (bar detail
behind the glass) · full-width band (friends) · gallery (10) · ON10 (the sign)
· visit (Brady's dining-room shot, IMG_2982 — the counter photo it replaced was stock). OG image is a static 1200×630 crop of the interior.

## Palette — sampled
| Token | Hex | From |
|---|---|---|
| paper | `#fcfbf8` | printed menu card stock |
| paper-alt | `#f3ede5` | teak shelving light on the white walls |
| ink | `#2d302e` | the ONTEN CAFE wordmark, as printed |
| ink-deep | `#1f2321` | ink, deepened for the ON10 ground |
| muted | `#5a5e5a` | ink, lifted |
| sage / sage-deep | `#b7cdb9` / `#3b654a` | potted trees in the listing photo; green menu rules |
| mocha / mocha-deep | `#dcc6ae` / `#77533a` | the teak menu cabinet |

## Measured contrast (`npm run contrast`, 30/30 declared pairs pass)
Lowest shipped pairs: muted on glass-over-sage **5.19**, sage-deep on
glass-over-sage **5.25**, muted on paper-alt **5.67**. Ink on paper **12.89**;
paper on ink-deep **15.37**; ink on the nav glass over ON10 **8.89**.

Glass over photography is measured against **pure black** as a bound
(`glass-photo-worst` / `glass-photo-ink-worst`): the real image is always
lighter, so the pairs hold whatever the photo and wherever the layout puts
the glass. `.glass-photo` (.86) carries every colour, `muted` lowest at 4.76;
`.glass-caption` (.66) carries **ink only** (5.61).

**Rules the matrix forces**
- On raw sage or mocha fills, only `ink` is legible (others ≈4.0:1).
- The nav carries `ink` only — `muted` drops to 4.40 over the dark section.
- Nav glass is white at **.80**, not the base .52. Enforced with a two-class
  selector because the single-class version lost to `.glass` in the browser.

## Type
- Display: Instrument Serif, italic as the single warm accent (mocha-deep).
- Body + brand caps: Jost — nearest open geometric to the wordmark.
- Fluid scale `--step--2` … `--step-5`; top step pushed hard (light serif needs size).

## Rhythm
Radius 14/24/36px + pills: soft, product-polished — the room has no hard corners.

## Traps hit in this build
0. **SVG displacement "lens" in backdrop-filter killed the blur in Chromium.**
   The whole chain dropped and the hero headline read crisply through the
   nav. Removed. The rim is a soft inset glow instead. Don't reintroduce it.
1. **SplitText observing its own words never fires** — words start outside
   their overflow mask, and IntersectionObserver honours ancestor clipping.
   Observe the headline.
2. **Module class tied with global `.glass` and lost** (nav rendered at .52).

## Open items (not shipped because not sourced)
- **Model consent** for the three people photographed (pink tee, grey
  hoodie, sage tee) before this goes live on a business's site.
- The coffee bags on the bar read "Non-Fiction Coffee" — confirm the roaster
  before the site says so.
- Coffee hours: sources conflict (7–4 pre-opening post vs "closes 9 PM" on Google).
- Name: Google lists "Cafe Onten", collateral says "ONTEN CAFE" — pick one for NAP.
- Production domain → `NEXT_PUBLIC_SITE_URL`.
- Logo files to replace the set wordmark.
- Photos of the signature drinks themselves — the list is typographic until they exist.
- "Jamaican Blue Mountain No. 1" appears in third-party posts only — confirm before use.
