/**
 * Design System Color Tokens
 * 
 * This file defines the color palette for the design system.
 * Colors are organized by their purpose and usage context.
 */

export const colors = {
  // Status & Action Colors
  // Used for interactive elements and status indicators
  status: {
    primary: '#0F88CB',
    secondary: '#575040',
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
    black: '#1B2323',
    darkGrey: '#413E36',
    foreground: '#EDE6DE',
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
    inverse: colors.brand.foreground,
    brand: colors.brand.darkBlue,
  },

  // Background colors
  background: {
    default: '#FFFFFF',
    subtle: colors.brand.foreground,
    accent: colors.brand.accent,
    dark: colors.brand.black,
  },

  // Border colors
  border: {
    default: colors.brand.darkGrey,
    subtle: '#D1D5DB',
    focus: colors.status.primary,
  },

  // Interactive states
  interactive: {
    default: colors.status.primary,
    hover: '#0D7AB8',
    active: '#0B6CA3',
    disabled: '#9CA3AF',
  },
} as const;

export type StatusColor = keyof typeof colors.status;
export type DataColor = keyof typeof colors.data;
export type BrandColor = keyof typeof colors.brand;
