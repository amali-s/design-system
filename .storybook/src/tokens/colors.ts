/**
 * Design System Color Tokens — Sage
 *
 * Single source of truth for hex. Tailwind, components, and docs import from here.
 *
 * Roles:
 * - UI actions (14px labels, outlines, focus rings): navy `brand.darkBlue`
 * - Cyan `status.primary`: decorative / data / large non-text only
 * - Success / warning brights: charts only — use `successOnSurface` / `warningOnSurface` for text and icons
 */

export const colors = {
  // Status colors. Brights are chart/data; UI text/icons use the semantic.onSurface aliases.
  status: {
    /** Decorative / data / brand accent — not 14px labels, ghost text, or focus rings. */
    primary: '#1AAED8',
    secondary: '#575040',
    sage: '#A9C1A9',
    deepRed: '#7D0A16',
    /** Chart / data bright only. */
    warningBright: '#F6C12F',
    /** Warning UI (fills, large color). Too light for 14px text on cream. */
    warning: '#D98900',
    error: '#CC3926',
    /** Chart / data bright only. */
    successBright: '#14C714',
    /** Success UI (toast icon fills, large color). */
    success: '#198D54',
  },

  // Tag & data visualization
  data: {
    lightBlue: '#60E1F0',
    darkOrange: '#875C00',
    brightMagenta: '#FF4978',
    paleMustard: '#D9D059',
    darkBlue: '#096694',
    limeGreen: '#16D113',
    darkMagenta: '#902944',
    successBright: '#14C714',
    warningBright: '#F6C12F',
  },

  // Branding & layout
  brand: {
    darkBlue: '#1E526F',
    accent: '#E8DDA2',
    gold: '#E8DDA2',
    black: '#1B2323',
    darkGrey: '#413E36',
    foreground: '#EDE6DE',
    white: '#FFFDFA',
    highlightYellow: '#FFD60C',
    darkRed: '#902944',
    darkGreen: '#198D54',
  },
} as const;

const navy = colors.brand.darkBlue;

/** Hover/active derived from navy (darkened). Cream labels stay ≥4.5:1. */
const navyHover = '#1A4862';
const navyActive = '#184259';

export const semantic = {
  text: {
    primary: colors.brand.black,
    secondary: colors.brand.darkGrey,
    muted: '#8A867E',
    inverse: colors.brand.white,
    brand: colors.brand.darkBlue,
    /** Disabled control labels — 5.0:1 on disabled fill, 8.6:1 on cream. */
    disabled: colors.brand.darkGrey,
    error: colors.status.error,
    /** Darkened so 14px text hits ≥4.5:1 on cream/white. Icon fills may use status.success. */
    success: '#147143',
    /** Darkened so 14px text hits ≥4.5:1 on cream/white. */
    warning: '#8F5A00',
    body: '#4B5459',
    tertiary: '#647782',
  },

  background: {
    default: colors.brand.white,
    subtle: colors.brand.foreground,
    accent: colors.brand.accent,
    sage: '#EDF3ED',
    blue: '#E8F2F9',
    red: '#F5E8E9',
    gold: '#F9F6E8',
    success: '#E8F3EC',
    dark: colors.brand.black,
    layer1: '#FFF8F0',
    field: '#FFF8F0',
    layer1Hover: '#FAF7E1',
    surfaceAccent: '#EAE9DB',
    disabled: '#B5B1A9',
  },

  border: {
    default: 'rgba(89, 85, 75, 0.08)',
    subtle: 'rgba(89, 85, 75, 0.06)',
    medium: 'rgba(89, 85, 75, 0.12)',
    strong: 'rgba(89, 85, 75, 0.2)',
    focus: navy,
    field: 'rgba(89, 85, 75, 0.2)',
    error: colors.status.error,
  },

  interactive: {
    default: navy,
    hover: navyHover,
    active: navyActive,
    disabled: '#B5B1A9',
    ghostHover: 'rgba(89, 85, 75, 0.12)',
    ghostActive: 'rgba(89, 85, 75, 0.2)',
    pressShadow: `inset -1px 3px 4px 0px ${navyActive}`,
    pressGradient:
      `linear-gradient(89.45deg, rgba(30, 82, 111, 0.28) 0.19%, rgba(12, 40, 58, 0.5) 91.52%), linear-gradient(90deg, ${navy} 0%, ${navy} 100%)`,
    secondaryPressShadow: 'inset -1px 4px 4px 0px #453F30',
    secondaryPressGradient:
      `linear-gradient(264.21deg, rgba(73,50,0,0.6) 2.9%, rgba(150,144,130,0.06) 98.25%), linear-gradient(90deg, ${colors.status.secondary} 0%, ${colors.status.secondary} 100%)`,
    dangerPressShadow: 'inset -2px 2px 4px 0px rgba(135,2,2,0.25)',
    dangerPressGradient:
      `linear-gradient(263.63deg, rgba(110,2,2,0.2) 1.87%, rgba(247,189,189,0.08) 96.35%), linear-gradient(90deg, ${colors.status.error} 0%, ${colors.status.error} 100%)`,
  },

  status: {
    /** Cyan — decorative / data / large non-text only. */
    primary: colors.status.primary,
    success: colors.status.success,
    successOnSurface: '#147143',
    successBright: colors.status.successBright,
    warning: colors.status.warning,
    warningOnSurface: '#8F5A00',
    warningBright: colors.status.warningBright,
    error: colors.status.error,
  },

  shadow: {
    sm: '0 1px 4px rgba(89, 85, 75, 0.06)',
    md: '0 4px 16px rgba(89, 85, 75, 0.08)',
    lg: '0 8px 32px rgba(89, 85, 75, 0.1)',
  },
} as const;

/**
 * Dark theme — surfaces on `brand.black`. Navy `#1E526F` is ~1.9:1 on black,
 * so filled Primary / selected controls use cream (`brand.white`) with dark
 * labels. Cyan is still decorative only.
 */
export const semanticDark = {
  text: {
    primary: colors.brand.foreground,
    secondary: '#C5C0B6',
    muted: '#A8A49C',
    inverse: colors.brand.black,
    brand: colors.brand.white,
    disabled: '#C5C0B6',
    error: '#F07A6A',
    success: '#7BC49A',
    warning: '#E8C36A',
    body: '#C5C0B6',
    tertiary: '#A8A49C',
  },
  background: {
    default: colors.brand.black,
    subtle: '#141A1A',
    accent: '#3A382C',
    sage: '#24302A',
    blue: '#1C2E38',
    red: '#3A2224',
    gold: '#2E2A1C',
    success: '#1A2E24',
    dark: colors.brand.black,
    layer1: '#252D2D',
    field: '#252D2D',
    layer1Hover: '#2C3535',
    surfaceAccent: '#2A3232',
    disabled: '#3A403C',
  },
  border: {
    default: 'rgba(237, 230, 222, 0.10)',
    subtle: 'rgba(237, 230, 222, 0.08)',
    medium: 'rgba(237, 230, 222, 0.14)',
    strong: 'rgba(237, 230, 222, 0.22)',
    focus: colors.brand.white,
    field: 'rgba(237, 230, 222, 0.22)',
    error: '#F07A6A',
  },
  interactive: {
    default: colors.brand.white,
    hover: colors.brand.foreground,
    active: colors.brand.accent,
    disabled: '#3A403C',
    ghostHover: 'rgba(237, 230, 222, 0.12)',
    ghostActive: 'rgba(237, 230, 222, 0.2)',
    pressShadow: 'inset -1px 3px 4px 0px rgba(27, 35, 35, 0.35)',
    pressGradient:
      'linear-gradient(89.45deg, rgba(27, 35, 35, 0.12) 0.19%, rgba(27, 35, 35, 0.28) 91.52%), linear-gradient(90deg, #FFFDFA 0%, #FFFDFA 100%)',
    secondaryPressShadow: 'inset -1px 4px 4px 0px rgba(27, 35, 35, 0.28)',
    secondaryPressGradient:
      'linear-gradient(264.21deg, rgba(27, 35, 35, 0.2) 2.9%, rgba(232, 221, 162, 0.12) 98.25%), linear-gradient(90deg, #E8DDA2 0%, #E8DDA2 100%)',
    dangerPressShadow: semantic.interactive.dangerPressShadow,
    dangerPressGradient: semantic.interactive.dangerPressGradient,
  },
  shadow: {
    sm: '0 1px 4px rgba(0, 0, 0, 0.35)',
    md: '0 4px 16px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.5)',
  },
} as const;

/**
 * Tailwind `theme.extend.colors`. Themeable UI roles use `--sage-*` CSS variables
 * (`tailwind.css`) so `html.dark` swaps light/dark. Data viz and chart brights stay literal.
 */
export const tailwindThemeColors = {
  primary: {
    DEFAULT: 'var(--sage-interactive)',
    hover: 'var(--sage-interactive-hover)',
    active: 'var(--sage-interactive-active)',
    focus: 'var(--sage-interactive)',
  },
  secondary: {
    DEFAULT: 'var(--sage-secondary)',
    hover: 'var(--sage-secondary-hover)',
    active: 'var(--sage-secondary-active)',
    gold: '#BF9A49',
  },
  disabled: {
    DEFAULT: 'var(--sage-surface-disabled)',
    text: 'var(--sage-text-disabled)',
  },
  sage: {
    DEFAULT: colors.status.sage,
    light: 'var(--sage-surface-sage)',
    hover: '#96B496',
    dark: '#7A9E7A',
  },
  deepRed: {
    DEFAULT: colors.status.deepRed,
    light: semantic.background.red,
    hover: '#6A0813',
  },
  warning: {
    DEFAULT: semantic.status.warning,
    bright: semantic.status.warningBright,
    onSurface: semantic.status.warningOnSurface,
    light: '#FFF8E0',
    dark: semantic.status.warning,
    yellow: '#FFB80F',
  },
  error: {
    DEFAULT: colors.status.error,
    light: '#FEE2E5',
    dark: '#A52D1E',
  },
  success: {
    DEFAULT: semantic.status.success,
    bright: semantic.status.successBright,
    onSurface: semantic.status.successOnSurface,
    light: semantic.background.success,
    dark: semantic.status.successOnSurface,
  },
  status: {
    primary: semantic.status.primary,
    success: semantic.status.success,
    successOnSurface: semantic.status.successOnSurface,
    successBright: semantic.status.successBright,
    warning: semantic.status.warning,
    warningOnSurface: semantic.status.warningOnSurface,
    warningBright: semantic.status.warningBright,
    error: semantic.status.error,
  },
  interactive: {
    DEFAULT: 'var(--sage-interactive)',
    hover: 'var(--sage-interactive-hover)',
    active: 'var(--sage-interactive-active)',
    disabled: 'var(--sage-surface-disabled)',
    ghostHover: 'var(--sage-ghost-hover)',
    ghostActive: 'var(--sage-ghost-active)',
  },
  data: {
    lightBlue: colors.data.lightBlue,
    darkOrange: colors.data.darkOrange,
    brightMagenta: colors.data.brightMagenta,
    paleMustard: colors.data.paleMustard,
    darkBlue: colors.data.darkBlue,
    limeGreen: colors.data.limeGreen,
    darkMagenta: colors.data.darkMagenta,
    successBright: colors.data.successBright,
    warningBright: colors.data.warningBright,
  },
  brand: {
    darkBlue: 'var(--sage-heading)',
    accent: colors.brand.accent,
    gold: colors.brand.gold,
    black: 'var(--sage-text)',
    darkGrey: 'var(--sage-text-secondary)',
    foreground: 'var(--sage-surface-subtle)',
    white: 'var(--sage-surface)',
    highlightYellow: colors.brand.highlightYellow,
    darkRed: colors.brand.darkRed,
    darkGreen: colors.brand.darkGreen,
  },
  background: {
    DEFAULT: 'var(--sage-surface-subtle)',
    sage: 'var(--sage-surface-sage)',
    blue: 'var(--sage-surface-blue)',
    red: 'var(--sage-surface-red)',
    gold: 'var(--sage-surface-gold)',
    success: 'var(--sage-surface-success)',
    field: 'var(--sage-surface-field)',
    disabled: 'var(--sage-surface-disabled)',
  },
  line: {
    DEFAULT: 'var(--sage-border)',
    subtle: 'var(--sage-border-subtle)',
    medium: 'var(--sage-border-medium)',
    strong: 'var(--sage-border-strong)',
    field: 'var(--sage-border-field)',
    focus: 'var(--sage-border-focus)',
    error: 'var(--sage-border-error)',
  },
  field: 'var(--sage-surface-field)',
  layer1: 'var(--sage-surface-layer1)',
  layer1Hover: 'var(--sage-surface-layer1-hover)',
  surfaceAccent: 'var(--sage-surface-accent)',
  muted: 'var(--sage-text-muted)',
  neutralText: 'var(--sage-text-muted)',
  primaryAction: 'var(--sage-interactive)',
  textSecondary: 'var(--sage-text-body)',
  textTertiary: 'var(--sage-text-tertiary)',
  textDisabled: 'var(--sage-text-disabled)',
} as const;

export type StatusColor = keyof typeof colors.status;
export type DataColor = keyof typeof colors.data;
export type BrandColor = keyof typeof colors.brand;
