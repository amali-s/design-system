import * as React from "react";

/* ─── Types ───────────────────────────────────────────────── */

export type ToastState = "default" | "error" | "success";

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

/* ─── Design tokens per state ─────────────────────────────── */

const stateStyles: Record<
  ToastState,
  { bg: string; borderColor: string; borderWidth: string }
> = {
  default: {
    bg: "bg-brand-foreground",           // #EDE6DE
    borderColor: "border-l-[#BF9A49]",  // gold
    borderWidth: "border-l-[5px]",
  },
  error: {
    bg: "bg-[#FAD4CF]",                 // soft pink
    borderColor: "border-l-[#DC3D29]",  // red
    borderWidth: "border-l-[6px]",
  },
  success: {
    bg: "bg-[#B3F1D2]",                 // mint green
    borderColor: "border-l-[#00803F]",  // dark green
    borderWidth: "border-l-[5px]",
  },
};

/* ─── Close icon ──────────────────────────────────────────── */

const CloseIcon = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 1L7 7" stroke="#1B2323" strokeWidth="1" strokeLinecap="round" />
    <path d="M7 1L1 7" stroke="#1B2323" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

/* ─── Presentational Toast Component ──────────────────────── */

/**
 * ToastNotification — a presentational toast matching the Figma design.
 *
 * Design details (from Figma node 215-108):
 * - Width: 233px
 * - Border-radius: 8px
 * - Shadow: 0px 4px 4px rgba(0,0,0,0.25)
 * - Left accent border: 5-6px colored by state
 * - Background: #EDE6DE (default), #FAD4CF (error), #B3F1D2 (success)
 * - Header: Rasa Regular, 16px, #1B2323
 * - Body: Hiragino Sans W2, 12px, #59554B
 * - Action: Rasa Light, 14px, #1F83BD with "+" icon
 * - Close: small "×" in top-right corner
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
  state = "default",
  button = true,
  actionLabel = "Action",
  onAction,
  closeIcon = true,
  onClose,
  className,
}: ToastNotificationProps) => {
  const styles = stateStyles[state];

  return (
    <div
      className={[
        "flex flex-col items-start",
        "w-[233px] overflow-hidden",
        "rounded-lg",
        "shadow-[0px_4px_4px_rgba(0,0,0,0.25)]",
        "border-solid",
        styles.bg,
        styles.borderColor,
        styles.borderWidth,
        "pt-3 pl-4 pr-2 pb-2",
        className || "",
      ].join(" ")}
    >
      {/* Header row with close icon */}
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-2 flex-1">
          {/* Header */}
          <p className="font-brand text-base font-w3 text-brand-black leading-none">
            {header}
          </p>

          {/* Body */}
          <p className="font-sans text-xs font-w2 text-[#59554B] leading-normal">
            {body}
          </p>

          {/* Action button — matches ghost variant from Button component */}
          {button && (
            <button
              type="button"
              onClick={onAction}
              className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full font-sans text-xs font-medium text-primary bg-transparent border-[1.5px] border-transparent hover:bg-[#E8F2F9] hover:border-[#E8F2F9] transition-all duration-200 self-start"
            >
              {actionLabel}
            </button>
          )}
        </div>

        {/* Close icon */}
        {closeIcon && (
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 p-1 hover:opacity-60 transition-opacity mt-0.5"
            aria-label="Close toast"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
};
