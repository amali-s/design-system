/**
 * Design System Color Tokens — Ghibli x Brand
 *
 * A warm, organic palette inspired by nature and craft.
 * Colors are organized by their purpose and usage context.
 */

export const colors = {
  // Status & Action Colors
  // Used for interactive elements and status indicators
  status: {
    primary: '#1F83BD',
    secondary: '#59554B',
    sage: '#A9C1A9',
    deepRed: '#7D0A16',
    warning: '#D98900',
    error: '#ED112E',
    success: '#14C714',
  },

  // Tag & Data Visualization Colors
  // Used for charts, graphs, tags, and data differentiation
  data: {
    lightBlue: '#60E1F0',
    darkOrange: '#875C00',
    brightMagenta: '#FF4978',
    paleMustard: '#D9D059',
    darkBlue: '#096694',
    limeGreen: '#16D113',
    darkMagenta: '#902944',
  },

  // Branding & Layout Colors
  // Core colors for branding, backgrounds, and typography
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

// Semantic color aliases for common use cases
export const semantic = {
  // Text colors
  text: {
    primary: colors.brand.black,
    secondary: colors.brand.darkGrey,
    muted: '#8A867E',
    inverse: colors.brand.foreground,
    brand: colors.brand.darkBlue,
  },

  // Background colors
  background: {
    default: colors.brand.white,       // #FFFDFA — card/surface background
    subtle: colors.brand.foreground,    // #EDE6DE — page background
    accent: colors.brand.accent,        // #E8DDA2 — gold accent
    sage: '#EDF3ED',                    // sage tint
    blue: '#E8F2F9',                    // blue tint
    red: '#F5E8E9',                     // red tint
    gold: '#F9F6E8',                    // gold tint
    dark: colors.brand.black,
  },

  // Border colors
  border: {
    default: 'rgba(89, 85, 75, 0.08)',  // barely visible warm border
    subtle: 'rgba(89, 85, 75, 0.06)',
    medium: 'rgba(89, 85, 75, 0.12)',   // dividers
    strong: 'rgba(89, 85, 75, 0.2)',    // secondary button borders
    focus: colors.status.primary,
  },

  // Interactive states
  interactive: {
    default: colors.status.primary,
    hover: '#1A6FA0',
    active: '#165D87',
    disabled: '#B5B1A9',
  },

  // Shadows (warm-toned)
  shadow: {
    sm: '0 1px 4px rgba(89, 85, 75, 0.06)',
    md: '0 4px 16px rgba(89, 85, 75, 0.08)',
    lg: '0 8px 32px rgba(89, 85, 75, 0.1)',
  },
} as const;

export type StatusColor = keyof typeof colors.status;
export type DataColor = keyof typeof colors.data;
export type BrandColor = keyof typeof colors.brand;
