import * as React from "react";

/* ─── Types ───────────────────────────────────────────────── */

/**
 * Toast visual state.
 *
 * - `information` — neutral / informational (blue accent + ⓘ icon)
 * - `success`     — successful action     (green accent + ✓ icon)
 * - `error`       — error / warning       (red accent + ! icon)
 *
 * `default` is kept as an alias of `information` for backwards
 * compatibility with earlier versions of this component.
 */
export type ToastState = "information" | "success" | "error" | "default";

export interface ToastNotificationProps {
  /** Header / title text */
  header?: string;
  /** Body description text */
  body?: string;
  /** Visual state of the toast */
  state?: ToastState;
  /** Whether to show the action button */
  button?: boolean;
  /** Action button label */
  actionLabel?: string;
  /** Callback when the action button is clicked */
  onAction?: () => void;
  /** Whether to show the close icon */
  closeIcon?: boolean;
  /** Callback when the close icon is clicked */
  onClose?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/* ─── Status icons (inline SVG) ───────────────────────────── */

const InformationIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="8" fill="#0084D1" />
    <rect x="7.25" y="6.75" width="1.5" height="5" rx="0.5" fill="#FFFFFF" />
    <circle cx="8" cy="4.5" r="0.9" fill="#FFFFFF" />
  </svg>
);

const SuccessIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="8" fill="#00803F" />
    <path
      d="M4.5 8.25L7 10.5L11.5 5.75"
      stroke="#FFFFFF"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    width="16"
    height="14"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M8 0.75L15.25 13.25H0.75L8 0.75Z"
      fill="#CC3926"
    />
    <rect x="7.25" y="5" width="1.5" height="4.25" rx="0.5" fill="#FFFFFF" />
    <circle cx="8" cy="11" r="0.85" fill="#FFFFFF" />
  </svg>
);

const StatusIcon = ({ state }: { state: Exclude<ToastState, "default"> }) => {
  switch (state) {
    case "success":
      return <SuccessIcon />;
    case "error":
      return <ErrorIcon />;
    case "information":
    default:
      return <InformationIcon />;
  }
};

/* ─── Close icon ──────────────────────────────────────────── */

const CloseIcon = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M1 1L7 7" stroke="#1B2323" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 1L1 7" stroke="#1B2323" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ─── Add (+) icon for the action button ──────────────────── */

const AddIcon = () => (
  <svg
    width="10"
    height="9"
    viewBox="0 0 10 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M5 0.5V8.5" stroke="#30B6E6" strokeWidth="1" strokeLinecap="round" />
    <path d="M1 4.5H9" stroke="#30B6E6" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

/* ─── State → background color ────────────────────────────── */

const stateBackground: Record<Exclude<ToastState, "default">, string> = {
  information: "bg-[#E0F4FF]", // light blue
  success: "bg-[#E2FBDC]",     // pale green
  error: "bg-[#FFE5E0]",       // warm peach
};

/* ─── Presentational Toast Component ──────────────────────── */

/**
 * ToastNotification — a presentational toast matching the Figma design
 * (Sage Component kit, node 215-108).
 *
 * Design details:
 * - Width: 233px
 * - Border-radius: 8px
 * - Padding: 8px
 * - Shadow: 0px 4px 4px rgba(0,0,0,0.25)
 * - Status icon (16px) in top-left, color & glyph by state:
 *     • Information → blue circle with "i"
 *     • Success     → green circle with "✓"
 *     • Error       → red triangle with "!"
 * - Background: #E0F4FF (information), #E2FBDC (success), #FFE5E0 (error)
 * - Header: Hiragino Sans W5, 14px, #1B2323
 * - Body:   Hiragino Sans W2, 14px, #59554B
 * - Action: tertiary pill button (#30B6E6 border + label) with "+" icon
 * - Close:  small "×" in top-right corner, stroke 1.5px
 *
 * For animated toasts, use with Sonner:
 * ```tsx
 * import { toast } from "sonner";
 * toast.custom((id) => (
 *   <ToastNotification
 *     header="Saved"
 *     state="success"
 *     onClose={() => toast.dismiss(id)}
 *   />
 * ));
 * ```
 */
export const ToastNotification = ({
  header = "Header",
  body = "This is body text.",
  state = "information",
  button = true,
  actionLabel = "Action",
  onAction,
  closeIcon = true,
  onClose,
  className,
}: ToastNotificationProps) => {
  // Backwards-compat: treat "default" as "information"
  const resolvedState: Exclude<ToastState, "default"> =
    state === "default" ? "information" : state;

  const bg = stateBackground[resolvedState];

  return (
    <div
      className={[
        "flex flex-col items-start",
        "w-[233px] overflow-hidden",
        "rounded-lg",
        "shadow-[0px_4px_4px_rgba(0,0,0,0.25)]",
        "p-2",
        bg,
        className || "",
      ].join(" ")}
    >
      {/* Icon + content + close row */}
      <div className="flex gap-4 items-start w-full">
        {/* Status icon */}
        <div className="flex-shrink-0 flex items-center justify-center w-4 h-4 mt-0.5">
          <StatusIcon state={resolvedState} />
        </div>

        {/* Text + action */}
        <div className="flex flex-1 items-start justify-between min-w-0">
          <div className="flex flex-col gap-2 items-start flex-1 min-w-0">
            <p className="font-sans text-sm font-w5 text-brand-black leading-none">
              {header}
            </p>

            <p className="font-sans text-sm font-w2 text-[#59554B] leading-relaxed tracking-tight">
              {body}
            </p>

            {button && (
              <button
                type="button"
                onClick={onAction}
                className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-[16px] border-[0.5px] border-solid border-primary font-sans text-sm font-w5 text-primary bg-transparent hover:bg-[#E8F2F9] transition-all duration-200 self-start"
              >
                <span className="leading-none">{actionLabel}</span>
                <AddIcon />
              </button>
            )}
          </div>

          {/* Close icon */}
          {closeIcon && (
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 p-1 hover:opacity-60 transition-opacity"
              aria-label="Close toast"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
