---
name: Roosevelt Segura Portfolio
description: A Swiss program wall for one IT career — deep navy ground, paper ink, one signal orange.
colors:
  signal-orange: "#ff7a1a"
  orange-bright: "#ffa25e"
  abyss: "#0b1526"
  paper-ink: "#f5f2ec"
  gray: "#a3adc0"
  band-num: "#8b94a7"
  tile: "#ffffff"
  hairline: "rgba(245, 242, 236, 0.25)"
  glass-fill: "rgba(14, 27, 48, 0.46)"
  glass-fill-sticky: "rgba(11, 21, 38, 0.7)"
  glass-fill-solid: "#132238"
  glass-edge: "rgba(196, 218, 239, 0.28)"
  glass-sheen-start: "rgba(232, 241, 255, 0.075)"
  glass-sheen-mid: "rgba(232, 241, 255, 0.012)"
  glass-sheen-clear: "rgba(232, 241, 255, 0)"
  glass-highlight: "rgba(232, 241, 255, 0.16)"
  light-cobalt: "rgba(48, 108, 204, 0.46)"
  light-teal: "rgba(22, 124, 146, 0.36)"
  light-violet: "rgba(78, 66, 168, 0.28)"
  selection-fill: "rgba(245, 242, 236, 0.22)"
  record-hover: "rgba(232, 241, 255, 0.05)"
  station-shadow: "rgba(2, 7, 18, 0.7)"
  print-ink: "#000000"
typography:
  display:
    fontFamily: "'Yanone Kaffeesatz', 'Arial Narrow', sans-serif"
    fontSize: "clamp(3.75rem, 7vw, 8.5rem)"
    fontWeight: 700
    lineHeight: 0.88
  display-mobile:
    fontFamily: "'Yanone Kaffeesatz', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.75rem, 15vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 0.88
  headline:
    fontFamily: "'Yanone Kaffeesatz', 'Arial Narrow', sans-serif"
    fontSize: "2rem"
    fontWeight: 700
  title:
    fontFamily: "'Yanone Kaffeesatz', 'Arial Narrow', sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.05
  action:
    fontFamily: "'Yanone Kaffeesatz', 'Arial Narrow', sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    letterSpacing: "0.05em"
  data:
    fontFamily: "'Yanone Kaffeesatz', 'Arial Narrow', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    letterSpacing: "0.06em"
  lead:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.1em"
  chip:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.06em"
rounded:
  none: "0px"
spacing:
  col: "2rem 2.5rem"
  block: "3.5rem"
components:
  button-solid:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.abyss}"
    rounded: "{rounded.none}"
    padding: "1rem 1.25rem"
  button-solid-hover:
    backgroundColor: "{colors.paper-ink}"
    textColor: "{colors.abyss}"
  button-outline:
    backgroundColor: "{colors.abyss}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.none}"
    padding: "1rem 1.25rem"
  station-current:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.abyss}"
    rounded: "{rounded.none}"
---

# Design System: Roosevelt Segura Portfolio

## Overview

**Creative North Star: "The Printed Program"**

The page is a printed concert program for one career, set after dark behind frosted glass: a deep-sea navy ground lit by a fixed cool light field, square-cut glass panes, paper ink, tabular numerals, and one signal orange reserved for the current post and the two funnel actions. Density is poster-like up top and tabular below; nothing rounds, and the only glow is the cool light the glass frosts.

**Key Characteristics:**
- Three-column program wall: identity / timetable spine / proof rail.
- Sharp corners everywhere; rules and glass edges do the separating (one soft state lift on the in-view station).
- Content panes are frosted glass over a fixed light field; the light stays still while panes scroll across it.
- Condensed grotesk voice for names, titles, and numbers; neutral grotesk for reading.
- Orange means now or act: current station, resume bar, active section — nothing else.
- Asset tiles stay white so logos and badges pop off the navy.

## Colors

Deep navy ground, paper ink, one signal orange; cool grays only for secondary ink.

### Primary
- **Signal Orange** (#ff7a1a): current station panel, resume bar, active nav underline, station discs, focus rings. Navy text on it pairs at ~5.7:1.

### Neutral
- **Abyss** (#0b1526): ground everywhere.
- **Paper Ink** (#f5f2ec): text, rules, button fills.
- **Bright Orange** (#ffa25e): small orange text on navy (labels, pills, lead counter) where Signal Orange would fall short.
- **Secondary Gray** (#a3adc0): proof lines, meta, tagline.
- **Band Numeral Gray** (#8b94a7): large section numerals only.
- **Tile White** (#ffffff): logo and badge tiles only — never text ground.

### Named Rules
**The One-Orange Rule.** Orange marks the current post and the funnel actions. Dates, badges, expired states, and decoration never touch it.

## Typography

**Display Font:** Yanone Kaffeesatz (fallback Arial Narrow, sans-serif)
**Body Font:** Archivo (fallback Helvetica Neue, Arial, sans-serif)

**Character:** Condensed poster voice for names, titles, and numerals; plain reading grotesk for prose. Numerals everywhere are tabular.

### Hierarchy
Tokens live in `:root` (`--display-*`, `--text-*`, `--track-*`); rules reference roles, never literal sizes.
- **Display** (`--display-xl`, 700, clamp(3.75rem, 7vw, 8.5rem), 0.88; narrow layout clamp(2.75rem, 15vw, 4.5rem)): identity name, uppercase. Both sizes are capped at 29cqi of the identity pane, so the name cannot cross a column rule when text is enlarged.
- **Headline** (`--display-l`, 700, 2rem): numbered section bands `01–06`.
- **Title** (`--display-m`, 600–700, 1.75rem, 1.05): station role titles, role line, proof-counter numerals, military rank. ≤860px role and counters step down to Action size.
- **Action** (`--display-s`, 600, 1.375rem, 0.05em, uppercase): buttons.
- **Data** (`--display-xs`, 600, 1.125rem, 0.06em): index counter, skip link. The career-range readout reuses the text steps in Yanone: moving year at Small (0.875rem, bright orange), end years at Micro (0.75rem).
- **Lead** (`--text-lead`, 400, 1.125rem, 1.6, max 62ch): summary; also the city line at 600.
- **Body** (`--text-body`, 400, 1rem, 1.55): station descriptions, military copy, contact line.
- **Small** (`--text-small`, 400–600, 0.875rem): station meta and proof lines, rail rows, credentials, index links, tagline, counter captions.
- **Label** (`--text-micro`, 700, 0.75rem, `--track-label` 0.1em, uppercase): dates, `Description`/`Tech` heads, skill-group heads.
- **Chip** (`--text-micro`, 600, 0.75rem, `--track-chip` 0.06em, uppercase): tech chips, training chips, status pills, Copy button.

Station descriptions sit beside Tech only when the record is ≥44rem wide (container query on `.job`); narrower records stack so the description keeps a ~50ch+ measure.

### Named Rules
**The Tabular Rule.** Every numeral — dates, counters, section numbers — sets tabular. Ragged numbers are a defect.

## Layout

Program wall grid `3fr 5fr 2fr` (identity / career / rail), max 110rem, ink rules between columns. Identity groups portrait, name, role, tagline, the real AWS/Azure badge tiles, then resume/contact actions. Badge labels use Micro text in a two-column auto-fit strip; the Credentials section keeps the names, dates and status without duplicate images.

The identity pane sticks only above 64em of viewport height; shorter screens let the whole pane scroll normally so contact links never get trapped below the fold. Career is a ruled timetable spine descending as it is read: current post flush left, each older post one tread right (`--step` 1.15rem; narrow layout min(0.35rem, 6px)), joined by a 2px tread.

Viewport breakpoints use em (68.75em / 53.75em). Named `program` container queries at 68.75rem / 53.75rem apply the same reflow to text-only enlargement. The rail drops below at the first breakpoint. At the second, wrappers dissolve into the reading order identity, summary, credentials, experience, skills, military, education, contact. Non-interactive notes may reorder; keyboard controls retain a logical sequence.

The named `navigation` container becomes one native horizontally scrollable row at 53.75rem. Counter stays visible; the career-range scrubber hides. The header stays sticky, with 44px minimum links, visible focus and native horizontal/vertical touch scrolling. No custom drag handler.

Narrow job headers use a logo/chevron row and a full-width title/meta row; logos are 36px, location text wraps at spaces. Gutters have pixel caps so text enlargement grows type rather than consuming the card with padding. The military card places seal and rank above full-width text.

## Elevation & Depth

Glass by default, lit from behind. A fixed `body::before` light field (cobalt top-left, teal bottom-right, dim violet core; never orange) sits under every pane. Depth comes from blur, the glass edge, a 1px top highlight, rules, and the orange panel.

### Glass Vocabulary
- **Pane** (`--glass-fill` rgba(14,27,48,0.46) + `--glass-sheen` top-down gradient, `blur(22px) saturate(150%)`, 1px `--glass-edge`, inset 1px top highlight): station records, rail sections, military card. Blur drops to 14px in the narrow program container. Rail selectors use `:where()` so print resets win without `!important`.
- **Sticky pane** (`--glass-fill-sticky` rgba(11,21,38,0.7)): index bar and identity head, which content slides under.
- **Solid fallback** (`--glass-fill-solid` #132238): no `backdrop-filter` support or `prefers-reduced-transparency: reduce` (light field also off). Print and forced colors drop glass entirely.

### Shadow Vocabulary
- **Station lift** (`0 18px 36px -14px rgba(2,7,18,0.7)` + top highlight): active (in-view) station only, with 2px ink border. The single state-only shadow.

## Shapes

Radius is 0 everywhere: buttons, panels, chips, badges, images. Recurring geometry: 1px ink hairlines (2px for bands and spine), 14px station discs on the spine (orange when current or in-view), one navy quarter-arc on the current-station panel, square white badge tiles with 1px borders.

## Components

### Buttons
Solid orange bar (navy Yanone caps, icon) → hover paper fill. Outlined twin (2px ink) → hover ink fill, navy text. 140ms press scale. Full-width in identity, 44px minimum on touch.

### Station entries
Bordered articles on the spine; native-button headers (logo tile, tabular dates, title, meta, proof line, chevron). Accordion collapse via grid-rows; collapsed bodies take `inert`. Current station inverts to the orange panel with navy ink. Only the header responds to hover; tech chips are static labels.

Reveal opt-in happens once before paint. The module reads all initial geometry before writes, shows anything in the viewport plus an 80px lead zone, then sets `data-reveal-ready` after observer setup succeeds. Threshold is 0 and each shown target is unobserved. A 1200ms inline fallback reveals all if the module fails; no JS or no IntersectionObserver leaves content visible. Reduced motion preserves state and content without the entrance shift.

### Index bar
Typographic nav with 2px orange underline states, tabular `01/06` counter driven by section tracking (main column wins ties).

### Proof counters
Ruled definition rows, Yanone tabular numerals, lead numeral in bright orange.

### Credentials / training
Badged rows and outline pills; in-progress outlined bright orange, expired quiet gray.

### Navigation
See index bar. Focus: 3px solid orange outline, 2px offset. The current orange station uses an inset navy ring; forced colors uses ButtonText for both.

## Do's and Don'ts

### Do:
- **Do** keep orange to now-or-act: current station, resume bar, active section.
- **Do** set every numeral tabular.
- **Do** keep corners at 0 and separators as ink rules.
- **Do** keep logo tiles white so assets pop off the navy.
- **Do** reuse the real assets in `assets/` untouched.

### Don't:
- **Don't** put white text on the orange — navy ink only.
- **Don't** add side-accent borders, rounded panes, gradient text, or warm/orange light in the glass field.
- **Don't** invent employers, dates, metrics, or testimonials.
- **Don't** animate beyond the grid-snapped station shift and quiet reveals.
