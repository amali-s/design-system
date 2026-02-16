/**
 * Design System Typography Tokens
 * 
 * Font Families:
 * - Rasa: Branding headers, main page titles
 * - Hiragino Sans: Page headers, section headers, body text
 */

export const fontFamily = {
  // Branding font - for main page titles
  brand: ['Rasa', 'Georgia', 'serif'],
  // UI font - for headers, body, labels
  sans: ['Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'system-ui', 'sans-serif'],
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

// Hiragino Sans uses W0-W9 weights
// W1 ≈ 300, W2 ≈ 350, W3 ≈ 400, W5 ≈ 600
export const fontWeight = {
  w1: '300',      // Hiragino W1 - Light
  w2: '350',      // Hiragino W2 - Book
  w3: '400',      // Hiragino W3 - Regular
  w5: '600',      // Hiragino W5 - Semibold
  medium: '500',  // Rasa Medium
  bold: '700',    // Rasa Bold
} as const;

export const lineHeight = {
  tight: '1.1',
  normal: '1.4',
  relaxed: '1.6',
} as const;

export const letterSpacing = {
  tight: '-0.01em',  // -1%
  normal: '0',       // 0%
} as const;

/**
 * Pre-composed text styles matching your type scale
 */
export const textStyles = {
  // Page Titles - Rasa (Branding)
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

  // Headings - Hiragino Sans
  heading6: {
    fontFamily: fontFamily.sans,
    fontSize: '2.25rem',     // 36px
    fontWeight: fontWeight.w2,
    letterSpacing: '0',
    lineHeight: lineHeight.tight,
  },
  heading5: {
    fontFamily: fontFamily.sans,
    fontSize: '2rem',        // 32px
    fontWeight: fontWeight.w3,
    letterSpacing: '0',
    lineHeight: lineHeight.tight,
  },
  heading4: {
    fontFamily: fontFamily.sans,
    fontSize: '1.5rem',      // 24px
    fontWeight: fontWeight.w5,
    letterSpacing: '0',
    lineHeight: lineHeight.normal,
  },
  heading3: {
    fontFamily: fontFamily.sans,
    fontSize: '1.25rem',     // 20px
    fontWeight: fontWeight.w1,
    letterSpacing: '0',
    lineHeight: lineHeight.normal,
  },
  heading2: {
    fontFamily: fontFamily.sans,
    fontSize: '1rem',        // 16px
    fontWeight: fontWeight.w5,
    letterSpacing: '0',
    lineHeight: lineHeight.normal,
  },
  heading1: {
    fontFamily: fontFamily.sans,
    fontSize: '0.875rem',    // 14px
    fontWeight: fontWeight.w5,
    letterSpacing: '0',
    lineHeight: lineHeight.normal,
  },

  // Body - Hiragino Sans
  body2: {
    fontFamily: fontFamily.sans,
    fontSize: '1rem',        // 16px
    fontWeight: fontWeight.w3,
    letterSpacing: '0',
    lineHeight: lineHeight.relaxed,
  },
  body1: {
    fontFamily: fontFamily.sans,
    fontSize: '0.875rem',    // 14px
    fontWeight: fontWeight.w3,
    letterSpacing: '0',
    lineHeight: lineHeight.relaxed,
  },

  // Labels - Hiragino Sans
  label2: {
    fontFamily: fontFamily.sans,
    fontSize: '0.875rem',    // 14px
    fontWeight: fontWeight.w2,
    letterSpacing: '0',
    lineHeight: lineHeight.normal,
  },
  label1: {
    fontFamily: fontFamily.sans,
    fontSize: '0.75rem',     // 12px
    fontWeight: fontWeight.w2,
    letterSpacing: '0',
    lineHeight: lineHeight.normal,
  },
} as const;

export type TextStyle = keyof typeof textStyles;
