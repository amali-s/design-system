/**
 * Motion tokens — Sage Component kit.
 *
 * Durations and easings already used by Button, Accordion, Dropdown, Ghost,
 * Tearsheet, and Toast. CSS custom properties on `:root` (see `tailwind.css`)
 * carry the same values so `prefers-reduced-motion: reduce` can set durations
 * to 1ms without a JS hook.
 */

export const motion = {
  duration: {
    /** Dropdown option active */
    micro: "100ms",
    /** Accordion hover, Dropdown color */
    hover: "150ms",
    /** Button, Dropdown open, Ghost, Tearsheet close, Toast action */
    ui: "200ms",
    /** Accordion expand/collapse */
    disclosure: "220ms",
    /** Toast enter/exit/stack */
    feedback: "350ms",
  },
  ease: {
    standard: "ease-in-out",
    hoverIn: "ease-out",
    hoverOut: "ease-in",
    /**
     * Accordion chevron on collapse — easeInOutBack. Transform is unclamped,
     * so the overshoot (flick past 180°) reads.
     */
    collapseChevron: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
    /**
     * Accordion panel on collapse. Same x-rhythm as collapseChevron with y
     * overshoot removed: `grid-template-rows` clamps below 0fr and above 1fr,
     * so back-ease overshoot is invisible and only eats duration.
     */
    collapsePanel: "cubic-bezier(0.68, 0, 0.32, 1)",
    bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    toastIn: "cubic-bezier(0.21, 1.02, 0.73, 1)",
    toastOut: "cubic-bezier(0.06, 0.71, 0.55, 1)",
  },
  scale: {
    buttonHover: 1.06,
  },
} as const;

/** CSS variables — honor reduced-motion overrides on `:root`. */
export const motionVar = {
  duration: {
    micro: "var(--motion-duration-micro)",
    hover: "var(--motion-duration-hover)",
    ui: "var(--motion-duration-ui)",
    disclosure: "var(--motion-duration-disclosure)",
    feedback: "var(--motion-duration-feedback)",
  },
  ease: {
    standard: "var(--motion-ease-standard)",
    hoverIn: "var(--motion-ease-hover-in)",
    hoverOut: "var(--motion-ease-hover-out)",
    collapseChevron: "var(--motion-ease-collapse-chevron)",
    collapsePanel: "var(--motion-ease-collapse-panel)",
    bounce: "var(--motion-ease-bounce)",
    toastIn: "var(--motion-ease-toast-in)",
    toastOut: "var(--motion-ease-toast-out)",
  },
  scale: {
    buttonHover: "var(--motion-scale-button-hover)",
  },
} as const;

/**
 * Resolved duration in milliseconds. Reads the CSS variable so reduced-motion
 * (1ms on `:root`) is picked up by timeouts that wait on enter/exit.
 */
export function motionDurationMs(token: keyof typeof motion.duration): number {
  const fallback = Number.parseFloat(motion.duration[token]);
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(`--motion-duration-${token}`)
    .trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}
