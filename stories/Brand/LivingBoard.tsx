import * as React from "react";
import {
  colors,
  semantic,
  semanticDark,
} from "../../.storybook/src/tokens/colors";
import { textStyles, fontFamily } from "../../.storybook/src/tokens/typography";
import { layout, borderRadius, spacing } from "../../.storybook/src/tokens/spacing";

type Swatch = { token: string; hex: string; note?: string; large?: boolean };

const CORE: Swatch[] = [
  { token: "interactive.default", hex: semantic.interactive.default, note: "UI navy — 14px actions", large: true },
  { token: "status.primary", hex: semantic.status.primary, note: "Cyan — decorative only", large: true },
  { token: "status.sage", hex: colors.status.sage, note: "Sage", large: true },
  { token: "brand.accent", hex: colors.brand.accent, note: "Gold", large: true },
  { token: "brand.darkBlue", hex: colors.brand.darkBlue, note: "Navy" },
  { token: "brand.black", hex: colors.brand.black, note: "Dark surface" },
  { token: "brand.white", hex: colors.brand.white, note: "Cream" },
  { token: "brand.foreground", hex: colors.brand.foreground, note: "Warm canvas" },
];

const STATUS: Swatch[] = [
  { token: "success", hex: semantic.status.success, note: "UI / icons" },
  { token: "successOnSurface", hex: semantic.status.successOnSurface, note: "14px text" },
  { token: "successBright", hex: semantic.status.successBright, note: "Charts only" },
  { token: "warning", hex: semantic.status.warning, note: "UI fill" },
  { token: "warningOnSurface", hex: semantic.status.warningOnSurface, note: "14px text" },
  { token: "warningBright", hex: semantic.status.warningBright, note: "Charts only" },
  { token: "error", hex: semantic.status.error, note: "UI + text" },
];

function luminance(hex: string) {
  const h = hex.replace("#", "");
  if (h.length < 6) return 0;
  const toLin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const r = toLin(parseInt(h.slice(0, 2), 16));
  const g = toLin(parseInt(h.slice(2, 4), 16));
  const b = toLin(parseInt(h.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function labelColor(hex: string) {
  return luminance(hex) > 0.45 ? colors.brand.black : colors.brand.white;
}

function SwatchTile({ item, onCopy }: { item: Swatch; onCopy: (hex: string, token: string) => void }) {
  const fg = labelColor(item.hex);
  return (
    <button
      type="button"
      data-token={item.token}
      data-hex={item.hex}
      aria-label={`${item.token} ${item.hex}`}
      onClick={() => onCopy(item.hex, item.token)}
      className={[
        "flex flex-col justify-between rounded-lg p-3 text-left transition-transform duration-hover fine-hover:-translate-y-0.5 fine-hover:shadow-ghibli-md",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-highlightYellow",
        item.large ? "min-h-[120px]" : "min-h-[88px]",
      ].join(" ")}
      style={{ background: item.hex, color: fg }}
    >
      <span className="font-mono text-[10px] opacity-80">{item.token}</span>
      <span>
        <span className="block font-sans text-xs font-medium">{item.note}</span>
        <span className="font-mono text-[11px] opacity-80">{item.hex}</span>
      </span>
    </button>
  );
}

const RAMP: { key: keyof typeof textStyles; sample: string }[] = [
  { key: "pageTitle1", sample: "Sage" },
  { key: "heading1", sample: "Heading 1 — 36" },
  { key: "heading2", sample: "Heading 2 — 32" },
  { key: "heading3", sample: "Heading 3 — 24" },
  { key: "heading4", sample: "Heading 4 — 20" },
  { key: "heading5", sample: "Heading 5 — 20 medium" },
  { key: "heading6", sample: "Heading 6 — 14" },
  { key: "body2", sample: "Body 2 — Spectral Light 16. Spaces worth lingering in." },
  { key: "body1", sample: "Body 1 — Spectral Light 14 for reading and UI copy." },
  { key: "label1", sample: "Label 1 — Spectral Light 12" },
];

export function LivingBoard() {
  const [toast, setToast] = React.useState<string | null>(null);
  const [lorem, setLorem] = React.useState(true);
  const [scale, setScale] = React.useState(1);

  const copy = (hex: string, token: string) => {
    void navigator.clipboard?.writeText(hex);
    setToast(`Copied ${token} · ${hex}`);
    window.setTimeout(() => setToast(null), 1600);
  };

  return (
    <div className="min-h-screen bg-brand-foreground px-8 py-12 text-brand-black">
      <div className="mx-auto flex max-w-5xl flex-col gap-14">
        {/* 5-second read */}
        <header className="flex flex-wrap items-end justify-between gap-8 border-b border-line-medium pb-10">
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              Design system
            </p>
            <h1
              className="font-brand text-[clamp(3rem,10vw,7.5rem)] font-semibold leading-[1.05] tracking-tight text-brand-darkBlue"
              contentEditable
              suppressContentEditableWarning
            >
              Sage
            </h1>
            <p className="mt-3 max-w-md font-body text-base font-light text-brand-darkGrey">
              Rethink Sans for the wordmark and UI. Spectral for body. Navy for 14px
              actions; cyan is decorative only.
            </p>
          </div>
          <p className="font-sans text-xs text-muted">
            Theme toolbar: Light / Dark · filled Primary on dark is cream
            ({colors.brand.white}) on {colors.brand.black} — navy is ~1.9:1 on black.
          </p>
        </header>

        {/* 30-second + 5-minute: colour wall */}
        <section>
          <h2 className="mb-2 font-brand text-2xl font-medium text-brand-darkBlue">Colour</h2>
          <p className="mb-6 font-body text-sm font-light text-brand-darkGrey">
            Live tokens from <code className="font-mono text-xs">colors.ts</code>. Click a tile to copy hex.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CORE.map((item) => (
              <SwatchTile key={item.token} item={item} onCopy={copy} />
            ))}
          </div>
          <h3 className="mb-3 mt-8 font-sans text-sm font-medium text-brand-darkBlue">
            Status — UI vs chart brights
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
            {STATUS.map((item) => (
              <SwatchTile key={item.token} item={item} onCopy={copy} />
            ))}
          </div>
        </section>

        {/* Type ramp */}
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-brand text-2xl font-medium text-brand-darkBlue">Type</h2>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 font-sans text-xs text-muted">
                Scale
                <input
                  type="range"
                  min={0.85}
                  max={1.15}
                  step={0.01}
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="accent-primary"
                />
              </label>
              <button
                type="button"
                onClick={() => setLorem((v) => !v)}
                className="rounded-button px-3 py-2 font-sans text-xs font-medium text-primary"
              >
                {lorem ? "Token names" : "Sage copy"}
              </button>
            </div>
          </div>
          <p className="mb-6 font-body text-sm font-light text-brand-darkGrey">
            {fontFamily.sans[0]} (UI) · {fontFamily.body[0]} (body). Headings are size-order:
            heading1 is 36px, heading6 is 14px.
          </p>
          <div style={{ zoom: scale }}>
            {RAMP.map(({ key, sample }) => {
              const style = textStyles[key];
              return (
                <div
                  key={key}
                  className="border-b border-line-subtle py-3"
                >
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    style={{
                      fontFamily: style.fontFamily.join(", "),
                      fontSize: style.fontSize,
                      fontWeight: style.fontWeight,
                      letterSpacing: style.letterSpacing,
                      lineHeight: style.lineHeight,
                    }}
                  >
                    {lorem ? sample : key}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted">
                    {key} · {style.fontSize} · {style.fontWeight}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Spacing / radius / layout */}
        <section>
          <h2 className="mb-6 font-brand text-2xl font-medium text-brand-darkBlue">
            Space, radius, layout
          </h2>
          <div className="flex flex-wrap items-end gap-3">
            {([2, 3, 4, 6, 8, 12] as const).map((k) => (
              <div key={k} className="flex flex-col items-center gap-2">
                <div className="bg-primary" style={{ width: spacing[k], height: spacing[k] }} />
                <span className="font-mono text-[10px] text-muted">
                  {k} · {spacing[k]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-end gap-6">
            {(["default", "lg", "xl", "button", "full"] as const).map((k) => (
              <div key={k} className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-16 bg-primary"
                  style={{ borderRadius: borderRadius[k] }}
                />
                <span className="font-mono text-[10px] text-muted">
                  {k} · {borderRadius[k]}
                </span>
              </div>
            ))}
          </div>
          <ul className="mt-8 grid gap-2 font-mono text-xs text-brand-darkGrey sm:grid-cols-2">
            <li>field.sm {layout.fieldSm} — TextInput, Dropdown</li>
            <li>field.md {layout.fieldMd} — TextBox</li>
            <li>card {layout.card} — Card + Profile</li>
            <li>readable {layout.readable} — accordion column</li>
            <li>toast {layout.toast}</li>
            <li>borderRadius.button {borderRadius.button} — pills</li>
          </ul>
        </section>

        <section className="rounded-xl bg-brand-black p-6 text-brand-foreground">
          <h2 className="font-brand text-xl font-medium text-brand-white">Dark theme</h2>
          <p className="mt-2 font-body text-sm font-light text-brand-foreground/80">
            Surfaces sit on brand.black ({semanticDark.background.default}). Field fill is a step
            above ({semanticDark.background.field}), not cream. Filled Primary is cream with dark
            labels — navy fails WCAG on black. Use the Storybook Theme toolbar to preview
            components.
          </p>
        </section>
      </div>

      {toast ? (
        <div
          role="status"
          className="fixed bottom-6 right-6 rounded-lg bg-field px-4 py-3 font-sans text-sm text-brand-black shadow-ghibli-md"
        >
          {toast}
        </div>
      ) : null}
    </div>
  );
}
