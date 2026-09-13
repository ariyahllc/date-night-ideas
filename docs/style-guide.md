# Ember style guide

Source of truth is `src/theme/tokens.ts` — this is the same data, laid out
for reference. See it visually on the **Style Guide** artboard of the
[design canvas](https://claude.ai/code/artifact/753008d3-5db8-4a2a-9b84-f0d7337e2b27).

## Color — light mode

| Token | Hex | Use |
|---|---|---|
| `bg` | `#FBF6F3` | Screen background |
| `surface` | `#FFFDFB` | Cards, sheets, tab bar |
| `surfaceAlt` | `#F6E4E2` | Tag backgrounds |
| `border` | `#EDE0E3` | Dividers, chip borders |
| `textPrimary` | `#2B1620` | Headings, primary text |
| `textSecondary` | `#6B4C5A` | Body text |
| `textMuted` | `#8B6B78` | Captions, meta text |
| `plum700` | `#4A1942` | Brand / primary actions |
| `plum600` | `#7A1942` | Brand gradient partner |
| `gold500` | `#E8A33D` | Accent, CTA gradient start |
| `coral500` | `#E8735F` | Accent, like/heart, CTA gradient end |
| `sage500` | `#7A9471` | "Open now" / free indicator |

## Color — dark mode

| Token | Hex |
|---|---|
| `bg` | `#1C0F17` |
| `surface` | `#2E1B27` |
| `border` | `#3C2530` |
| `textPrimary` | `#F5E9EE` |
| `textMuted` | `#B79AA8` |

Accent colors (`gold500`, `coral500`, `sage500`) stay the same in both
modes — they're already saturated enough to read on a dark background.

## Typography

Font family: **Manrope** (Google Fonts on the design canvas; the system
font on-device unless you add `expo-font` + the Manrope files).

| Style | Size / line height | Weight |
|---|---|---|
| Display | 28 / 34 | Extrabold (800) |
| Heading 1 | 22 / 28 | Bold (700) |
| Heading 2 | 18 / 24 | Bold (700) |
| Body | 15 / 22 | Medium (500) |
| Body small | 13 / 18 | Medium (500) |
| Caption / label | 12 / 16, uppercase, +0.4 tracking | Extrabold (800) |

## Spacing scale (px)

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64`

## Radii

| Token | Value | Use |
|---|---|---|
| `sm` | 10 | Small elements, map corners |
| `button` | 14 | Buttons |
| `card` | 20 | Cards, sheets |
| `pill` | 999 | Chips, badges, tab dots |

## Elevation

Cards use a soft, warm-tinted shadow rather than a hard drop shadow:
`shadowColor: rgba(43,22,32,0.22)`, `shadowOffset: {0, 10}`,
`shadowRadius: 20` (light mode) — swap the shadow color for
`rgba(0,0,0,0.55)` in dark mode, since a plum-tinted shadow disappears
against a dark background.

## Components

- **Button** (`src/components/Button.tsx`) — `primary` (gold→coral
  gradient, dark text), `secondary` (solid plum, light text), `ghost`
  (transparent, bordered, plum text).
- **FilterChip** (`src/components/FilterChip.tsx`) — pill, toggles
  selected state (plum fill + gold dot) on tap.
- **Tag** (`src/components/Tag.tsx`) — small uppercase pill; `default`
  tone for activity type, `mood` tone (warm gold) for mood.
- **DateCard** (`src/components/DateCard.tsx`) — the home-feed card:
  gradient photo placeholder (keyed by activity type, see
  `categoryGradients` in `tokens.ts`) + price/distance badges + title,
  blurb, tags.
