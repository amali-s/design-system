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
          DEFAULT: '#0F88CB',
          hover: '#0D7AB8',
          active: '#0B6CA3',
        },
        secondary: {
          DEFAULT: '#575040',
          hover: '#4A4437',
          active: '#3D382E',
        },
        warning: {
          DEFAULT: '#D98900',
          light: '#FFF3CD',
          dark: '#B37300',
        },
        error: {
          DEFAULT: '#ED112E',
          light: '#FEE2E5',
          dark: '#C40D25',
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
          black: '#1B2323',
          darkGrey: '#413E36',
          foreground: '#EDE6DE',
          highlightYellow: '#FFD60C',
          darkRed: '#902944',
          darkGreen: '#198D54',
        },
      },
      fontFamily: {
        brand: ['Rasa', 'Georgia', 'serif'],
        sans: ['Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'system-ui', 'sans-serif'],
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
        'w5': '600',
        'medium': '500',
        'bold': '700',
      },
      letterSpacing: {
        'tight': '-0.01em',
        'normal': '0',
      },
    },
  },
  plugins: [],
};