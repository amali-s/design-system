/**
 * Design System Typography Tokens
 *
 * Font Families (from Figma Sage Component kit):
 * - Rethink Sans: Headings, branding, UI actions
 * - Spectral: Body text and labels
 */

export const fontFamily = {
  // Heading / branding font
  brand: ['Rethink Sans', 'system-ui', 'sans-serif'],
  // UI font — headings, buttons, interactive labels
  sans: ['Rethink Sans', 'system-ui', 'sans-serif'],
  // Body / reading font
  body: ['Spectral', 'Georgia', 'serif'],
  serif: ['Spectral', 'Georgia', 'serif'],
  // Code font
  mono: ['JetBrains Mono', 'Menlo', 'monospace'],
} as const;

export const fontSize = {
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  base: '1rem',      // 16px
  lg: '1.25rem',     // 20px
  xl: '1.5rem',      // 24px
  '2xl': '2rem',     // 32px
  '3xl': '2.25rem',  // 36px
  '4xl': '4rem',     // 64px
} as const;

export const fontWeight = {
  w1: '300',      // Spectral Light / Rethink Light
  w2: '350',
  w3: '400',      // Rethink Regular
  w5: '600',
  light: '300',   // Spectral Light
  medium: '500',  // Rethink Medium
  bold: '700',
} as const;

export const lineHeight = {
  tight: '1.1',
  normal: '1.3',
  relaxed: '1.5',
} as const;

export const letterSpacing = {
  tight: '-0.01em',  // -1%
  normal: '0',       // 0%
  label: '-0.06em',  // -6% — Figma Label styles
} as const;

/**
 * Pre-composed text styles matching the Figma type scale
 */
export const textStyles = {
  // Page Titles - Rethink Sans
  pageTitle1: {
    fontFamily: fontFamily.brand,
    fontSize: '4rem',        // 64px
    fontWeight: fontWeight.bold,
    letterSpacing: '-0.01em',
    lineHeight: lineHeight.tight,
  },
  pageTitle2: {
    fontFamily: fontFamily.brand,
    fontSize: '4rem',        // 64px
    fontWeight: fontWeight.medium,
    letterSpacing: '-0.01em',
    lineHeight: lineHeight.tight,
  },

  // Headings - Rethink Sans
  heading6: {
    fontFamily: fontFamily.sans,
    fontSize: '2.25rem',     // 36px
    fontWeight: fontWeight.w3,
    letterSpacing: '0',
    lineHeight: lineHeight.normal,
  },
  heading5: {
    fontFamily: fontFamily.sans,
    fontSize: '2rem',        // 32px
    fontWeight: fontWeight.w3,
    letterSpacing: '0',
    lineHeight: lineHeight.normal,
  },
  heading4: {
    fontFamily: fontFamily.sans,
    fontSize: '1.5rem',      // 24px
    fontWeight: fontWeight.medium,
    letterSpacing: '0',
    lineHeight: lineHeight.normal,
  },
  heading3: {
    fontFamily: fontFamily.sans,
    fontSize: '1.25rem',     // 20px
    fontWeight: fontWeight.w3,
    letterSpacing: '0',
    lineHeight: lineHeight.normal,
  },
  heading2: {
    fontFamily: fontFamily.sans,
    fontSize: '1.25rem',     // 20px
    fontWeight: fontWeight.medium,
    letterSpacing: '0',
    lineHeight: lineHeight.normal,
  },
  heading1: {
    fontFamily: fontFamily.sans,
    fontSize: '0.875rem',    // 14px
    fontWeight: fontWeight.medium,
    letterSpacing: '-0.01em',
    lineHeight: lineHeight.normal,
  },

  // Body - Spectral
  body2: {
    fontFamily: fontFamily.body,
    fontSize: '1rem',        // 16px
    fontWeight: fontWeight.light,
    letterSpacing: '0',
    lineHeight: lineHeight.relaxed,
  },
  body1: {
    fontFamily: fontFamily.body,
    fontSize: '0.875rem',    // 14px
    fontWeight: fontWeight.light,
    letterSpacing: '0',
    lineHeight: lineHeight.relaxed,
  },

  // Labels - Spectral
  label2: {
    fontFamily: fontFamily.body,
    fontSize: '0.875rem',    // 14px
    fontWeight: fontWeight.light,
    letterSpacing: letterSpacing.label,
    lineHeight: lineHeight.relaxed,
  },
  label1: {
    fontFamily: fontFamily.body,
    fontSize: '0.75rem',     // 12px
    fontWeight: fontWeight.light,
    letterSpacing: letterSpacing.label,
    lineHeight: '1.4',
  },
} as const;

export type TextStyle = keyof typeof textStyles;
