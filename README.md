# Ember — date night ideas

A cross-platform React Native (Expo) prototype that helps people find date
ideas near them, or a short getaway, without feeling aimed at one budget.

**Design canvas** (wireframes, dark mode, style guide):
https://claude.ai/code/artifact/753008d3-5db8-4a2a-9b84-f0d7337e2b27

## Run it

```bash
npm install
npx expo start
```

Press `i` for iOS Simulator, `a` for Android, or scan the QR code with
Expo Go on a physical device.

## What's here

- **Home feed** — a Tinder-style swipeable card stack. Drag, or use the
  skip/info/save buttons. Swiping right (or tapping save) adds an idea to
  the Date Jar.
- **Filters** — budget, distance, activity type, and mood, all as
  multi-select chips, opened as a modal from the home feed.
- **Detail screen** — full description, hours, an abstract map, photos,
  and Directions / Book Now actions.
- **Date Jar** — the saved-ideas list (`src/context/SavedContext.tsx`),
  persisted locally with `AsyncStorage` so it survives an app restart.
- **Surprise Me** — builds a two-step dinner + activity plan
  (`src/utils/surprise.ts`), weighted toward your active filters and the
  moods you've saved most, with a random jitter so "Shuffle" actually
  shuffles.
- **Share** — the native share sheet, from the Detail screen and from
  each row in the Date Jar.
- **Dark mode** — follows the system appearance automatically
  (`src/theme/`).

## Project structure

```
src/
  theme/        design tokens (colors, spacing, radii, type) + ThemeProvider
  data/         sample date ideas + label lookups
  types.ts      shared domain types
  context/      SavedContext (Date Jar), FiltersContext
  components/   DateCard, SwipeDeck, FilterChip, Button, Tag, Icons, MapPlaceholder
  navigation/   RootNavigator (stack: tabs + Filters modal + Detail)
  screens/      HomeFeedScreen, FiltersScreen, DetailScreen, SavedScreen, SurpriseScreen
  utils/        surprise.ts — the "Surprise Me" plan generator
```

Sample data (14 date ideas spanning every budget tier, distance band,
activity type, and mood) lives in `src/data/dateIdeas.ts` — replace with a
real backend/API when there is one.

See [docs/style-guide.md](docs/style-guide.md) for exact colors, type
scale, and spacing rules, or the **Style Guide** artboard on the design
canvas linked above for the same thing visually.

"Ember" is a placeholder name — swap it in `app.json` and
`src/screens/HomeFeedScreen.tsx` whenever you land on the real one.
