/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Status & Action Colors
        primary: {
          DEFAULT: '#1AAED8',
          hover: '#1599C0',
          active: '#85CEDE',
          focus: '#85CEDE',
        },
        secondary: {
          DEFAULT: '#575040',
          hover: '#4A4740',
          active: '#3D3A35',
          gold: '#BF9A49',
        },
        disabled: {
          DEFAULT: '#A5B1B8',
        },
        sage: {
          DEFAULT: '#A9C1A9',
          light: '#EDF3ED',
          hover: '#96B496',
          dark: '#7A9E7A',
        },
        deepRed: {
          DEFAULT: '#7D0A16',
          light: '#F5E8E9',
          hover: '#6A0813',
        },
        warning: {
          DEFAULT: '#F6C12F',
          light: '#FFF8E0',
          dark: '#D98900',
          yellow: '#FFB80F',
        },
        error: {
          DEFAULT: '#CC3926',
          light: '#FEE2E5',
          dark: '#A52D1E',
        },
        success: {
          DEFAULT: '#14C714',
          light: '#D4EDDA',
          dark: '#10A310',
        },

        // Tag & Data Visualization Colors
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

        /** Figma / Sage surfaces — form fields, layered UI */
        layer1: '#fffdf0',
        /** Figma "Layer 1 Hover" — row/surface hover fill */
        layer1Hover: '#FAF7E1',
        /** Figma "Background" — disabled card border / page base */
        background: '#fbf8e9',
        /** Figma "Neutral text" — secondary copy, hairline borders */
        neutralText: '#6C7275',
        /** Figma "Primary action" — ghost action links, accent CTAs */
        primaryAction: '#0095cc',
        /** Figma "Accent" — neutral slot / placeholder surface (distinct from mustard brand.accent) */
        surfaceAccent: '#eae9db',
        /** Figma text ramp (text-primary = brand.black #1B2323) */
        textSecondary: '#4b5459',
        textTertiary: '#647782',
        textDisabled: '#d0d3d3',
      },
      fontFamily: {
        // ── Headings & UI — Rethink Sans ──
        /** Section and component headings */
        heading: ['Rethink Sans', 'system-ui', 'sans-serif'],
        /** Branding and page titles */
        brand: ['Rethink Sans', 'system-ui', 'sans-serif'],
        /** UI chrome — buttons, chips, micro-labels */
        sans: ['Rethink Sans', 'system-ui', 'sans-serif'],

        // ── Reading text — Spectral ──
        /** Body copy, field labels, helper text (Figma "Body 1" / "Label 1") */
        body: ['Spectral', 'Georgia', 'serif'],
        serif: ['Spectral', 'Georgia', 'serif'],

        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',      // 12px
        'sm': '0.875rem',     // 14px
        'base': '1rem',       // 16px
        'lg': '1.25rem',      // 20px
        'xl': '1.5rem',       // 24px
        '2xl': '2rem',        // 32px
        '3xl': '2.25rem',     // 36px
        '4xl': '4rem',        // 64px
      },
      fontWeight: {
        'w1': '300',
        'w2': '350',
        'w3': '400',
        'w4': '500',
        'w5': '600',
        'medium': '500',
        'bold': '700',
      },
      letterSpacing: {
        'tight': '-0.01em',
        'normal': '0',
        'wide': '0.05em',
        'wider': '0.1em',
      },
      borderRadius: {
        'pill': '999px',
      },
      boxShadow: {
        'ghibli-sm': '0 1px 4px rgba(89, 85, 75, 0.06)',
        'ghibli-md': '0 4px 16px rgba(89, 85, 75, 0.08)',
        'ghibli-lg': '0 8px 32px rgba(89, 85, 75, 0.1)',
      },
    },
  },
  plugins: [],
};
