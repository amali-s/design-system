import { create } from 'storybook/theming/create';

/**
 * Sage Design System — Storybook Theme
 *
 * Palette: sage-tinted sidebar, warm cream canvas, brand navy accents
 * Fonts: Rasa (brand headings), Hiragino Sans (UI), JetBrains Mono (code)
 */
export const sageTheme = create({
  base: 'light',

  // ── Brand identity ────────────────────────────────────────────────────────
  brandTitle: 'Sage Design System',
  brandUrl:   '/',

  // ── Core palette ─────────────────────────────────────────────────────────
  // Primary = brand navy; secondary = action cyan
  colorPrimary:   '#1E526F',   // brand.darkBlue
  colorSecondary: '#30B6E6',   // status.primary (cyan)

  // ── App shell ─────────────────────────────────────────────────────────────
  appBg:          '#EDF3ED',   // semantic.background.sage  ← sidebar / panel bg
  appContentBg:   '#FFFDFA',   // brand.white               ← canvas / story bg
  appPreviewBg:   '#FFFDFA',   // brand.white               ← preview iframe bg
  appBorderColor: 'rgba(89, 85, 75, 0.12)',  // semantic.border.medium
  appBorderRadius: 4,

  // ── Typography ────────────────────────────────────────────────────────────
  // Rasa loads via manager-head.html; Hiragino falls back gracefully
  fontBase: '"Rasa", "Hiragino Sans", "Hiragino Kaku Gothic ProN", system-ui, sans-serif',
  fontCode: '"JetBrains Mono", Menlo, monospace',

  // ── Text ──────────────────────────────────────────────────────────────────
  textColor:        '#1B2323',  // brand.black
  textInverseColor: '#EDE6DE',  // brand.foreground (cream)
  textMutedColor:   '#8A867E',  // semantic.text.muted

  // ── Toolbar / tab bar ─────────────────────────────────────────────────────
  barBg:           '#EDF3ED',   // sage tint — matches sidebar
  barTextColor:    '#413E36',   // brand.darkGrey
  barHoverColor:   '#1E526F',   // brand.darkBlue
  barSelectedColor:'#1E526F',   // brand.darkBlue

  // ── Inputs ────────────────────────────────────────────────────────────────
  inputBg:           '#FFFDFA', // brand.white
  inputBorder:       'rgba(89, 85, 75, 0.12)',
  inputTextColor:    '#1B2323', // brand.black
  inputBorderRadius: 4,
});
