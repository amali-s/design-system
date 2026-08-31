import { create } from 'storybook/theming/create';
import { colors, semantic } from './src/tokens/colors';

/**
 * Sage Design System — Storybook Theme
 *
 * Palette: sage-tinted sidebar, warm cream canvas, brand navy accents
 * Fonts: Rethink Sans (headings/UI), Spectral (body), JetBrains Mono (code)
 */
export const sageTheme = create({
  base: 'light',

  // ── Brand identity ────────────────────────────────────────────────────────
  brandTitle: 'Sage Design System',
  brandUrl:   '/',

  // ── Core palette ─────────────────────────────────────────────────────────
  // Primary = brand navy; secondary = cyan chrome accent (not component UI)
  colorPrimary:   colors.brand.darkBlue,
  colorSecondary: semantic.status.primary,

  // ── App shell ─────────────────────────────────────────────────────────────
  appBg:          semantic.background.sage,
  appContentBg:   colors.brand.white,
  appPreviewBg:   colors.brand.white,
  appBorderColor: semantic.border.medium,
  appBorderRadius: 4,

  // ── Typography ────────────────────────────────────────────────────────────
  fontBase: '"Rethink Sans", system-ui, sans-serif',
  fontCode: '"JetBrains Mono", Menlo, monospace',

  // ── Text ──────────────────────────────────────────────────────────────────
  textColor:        colors.brand.black,
  textInverseColor: colors.brand.foreground,
  textMutedColor:   semantic.text.muted,

  // ── Toolbar / tab bar ─────────────────────────────────────────────────────
  barBg:           semantic.background.sage,
  barTextColor:    colors.brand.darkGrey,
  barHoverColor:   colors.brand.darkBlue,
  barSelectedColor:colors.brand.darkBlue,

  // ── Inputs ────────────────────────────────────────────────────────────────
  inputBg:           colors.brand.white,
  inputBorder:       semantic.border.medium,
  inputTextColor:    colors.brand.black,
  inputBorderRadius: 4,
});
