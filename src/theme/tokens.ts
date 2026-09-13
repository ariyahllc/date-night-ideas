// Ember design tokens — see the style guide canvas for the visual reference.
// Warm base (plum/blush/terracotta) + one gold/coral accent. Colors are exact
// hex values, not derived at runtime, so they always match the design canvas.

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
  massive: 64,
} as const;

export const radii = {
  sm: 10,
  button: 14,
  card: 20,
  pill: 999,
} as const;

export const typography = {
  display: { fontSize: 28, lineHeight: 34, fontWeight: '800' as const },
  h1: { fontSize: 22, lineHeight: 28, fontWeight: '700' as const },
  h2: { fontSize: 18, lineHeight: 24, fontWeight: '700' as const },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '500' as const },
  bodySmall: { fontSize: 13, lineHeight: 18, fontWeight: '500' as const },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '700' as const },
};

const lightColors = {
  bg: '#FBF6F3',
  surface: '#FFFDFB',
  surfaceAlt: '#F6E4E2',
  border: '#EDE0E3',
  textPrimary: '#2B1620',
  textSecondary: '#6B4C5A',
  textMuted: '#8B6B78',
  plum700: '#4A1942',
  plum600: '#7A1942',
  gold500: '#E8A33D',
  gold600: '#CE8A28',
  coral500: '#E8735F',
  sage500: '#7A9471',
  tagText: '#8A4A63',
  moodBg: '#FBEFD9',
  moodText: '#8A6412',
  shadow: 'rgba(43,22,32,0.22)',
};

const darkColors = {
  bg: '#1C0F17',
  surface: '#2E1B27',
  surfaceAlt: '#3C2530',
  border: '#3C2530',
  textPrimary: '#F5E9EE',
  textSecondary: '#D9B9C6',
  textMuted: '#B79AA8',
  plum700: '#4A1942',
  plum600: '#7A1942',
  gold500: '#E8A33D',
  gold600: '#F0C878',
  coral500: '#E8735F',
  sage500: '#7A9471',
  tagText: '#E7B7C9',
  moodBg: '#3E301B',
  moodText: '#F0C878',
  shadow: 'rgba(0,0,0,0.55)',
};

export type ColorScheme = typeof lightColors;

export const palettes = { light: lightColors, dark: darkColors };

// Category → gradient + tint, shared by cards, rows, and the detail hero.
export const categoryGradients: Record<string, [string, string]> = {
  food: ['#4A1942', '#E8A33D'],
  outdoor: ['#7A1942', '#E8A33D'],
  indoor: ['#8A4A2E', '#E8735F'],
  adventure: ['#7A1942', '#CE8A28'],
  culture: ['#4A1942', '#8A4A2E'],
  relaxation: ['#7A9471', '#CE8A28'],
};
