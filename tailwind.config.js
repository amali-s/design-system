/** @type {import('tailwindcss').Config} */
const jiti = require("jiti")(__filename);
const { tailwindThemeColors } = jiti("./.storybook/src/tokens/colors.ts");
const { layout } = jiti("./.storybook/src/tokens/spacing.ts");

module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: tailwindThemeColors,
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
        /** Shared 32px pill — Button, Tag, Ghost-styled Link. */
        'button': '32px',
      },
      boxShadow: {
        'ghibli-sm': 'var(--sage-shadow-sm)',
        'ghibli-md': 'var(--sage-shadow-md)',
        'ghibli-lg': 'var(--sage-shadow-lg)',
      },
      maxWidth: {
        'field-sm': layout.fieldSm,
        'field-md': layout.fieldMd,
        card: layout.card,
        readable: layout.readable,
        toast: layout.toast,
      },
      minWidth: {
        'field-sm': layout.fieldSm,
        'field-md': layout.fieldMd,
        card: layout.card,
      },
      // Names match `.storybook/src/tokens/motion.ts`; values are CSS vars
      // so prefers-reduced-motion can set durations to 1ms.
      transitionDuration: {
        micro: 'var(--motion-duration-micro)',
        hover: 'var(--motion-duration-hover)',
        ui: 'var(--motion-duration-ui)',
        disclosure: 'var(--motion-duration-disclosure)',
        feedback: 'var(--motion-duration-feedback)',
      },
      transitionTimingFunction: {
        standard: 'var(--motion-ease-standard)',
        hoverIn: 'var(--motion-ease-hover-in)',
        'hover-in': 'var(--motion-ease-hover-in)',
        hoverOut: 'var(--motion-ease-hover-out)',
        'hover-out': 'var(--motion-ease-hover-out)',
        collapseChevron: 'var(--motion-ease-collapse-chevron)',
        collapsePanel: 'var(--motion-ease-collapse-panel)',
        bounce: 'var(--motion-ease-bounce)',
        toastIn: 'var(--motion-ease-toast-in)',
        toastOut: 'var(--motion-ease-toast-out)',
      },
      scale: {
        buttonHover: 'var(--motion-scale-button-hover)',
      },
    },
  },
  plugins: [
    // Hover fills/scale only when the device can hover. Touch uses `active:` /
    // the shared `usePressInteraction` press state instead of sticky `:hover`.
    function fineHoverVariant({ addVariant }) {
      addVariant(
        "fine-hover",
        "@media (hover: hover) and (pointer: fine) { &:hover }",
      );
    },
  ],
};
