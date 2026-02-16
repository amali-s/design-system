import * as React from "react";

export interface CardProps {
  /** Small label text above the heading */
  label?: string;
  /** Main heading text */
  heading?: string;
  /** Body description text */
  body?: string;
  /** Whether to show the action button */
  action?: boolean;
  /** Action button label */
  actionLabel?: string;
  /** Callback when the action button is clicked */
  onAction?: () => void;
  /** Optional slot content rendered between header and body text */
  slot?: React.ReactNode;
  /** Visual state of the card */
  state?: "enabled" | "hover" | "disabled";
  /** Additional CSS classes */
  className?: string;
}

/**
 * Card component following the design system specifications.
 *
 * Design details:
 * - Border: 0.5px solid brand-darkBlue (#1E526F)
 * - Background: brand-foreground (#EDE6DE)
 * - Corner radius: 8px
 * - Padding: 8px horizontal, 16px vertical
 * - Header border-bottom: 0.5px solid brand-darkBlue
 * - Label: label1 style (12px, W2)
 * - Heading: heading2 style (16px, W5)
 * - Body: body1 style (14px, W3)
 * - Action: Ghost button with "+" icon, primary color
 * - Hover: Gradient overlay, lighter border
 * - Disabled: Muted colors, disabled background
 */
export const Card = ({
  label = "Label",
  heading = "Heading",
  body = "Body Text where you can add a card description for the card if case needed. Why else have a card?",
  action = true,
  actionLabel = "Action",
  onAction,
  slot,
  state = "enabled",
  className,
}: CardProps) => {
  const isDisabled = state === "disabled";
  const isHover = state === "hover";

  // Card container styles
  const containerBase = "flex flex-col gap-6 items-end overflow-hidden px-2 py-4 rounded-lg border-[0.5px] border-solid w-[264px]";

  const containerState = isDisabled
    ? "bg-brand-foreground border-[#ADABA5]"
    : isHover
      ? "border-brand-darkBlue"
      : "bg-brand-foreground border-brand-darkBlue";

  // Hover gradient background
  const hoverStyle = isHover
    ? {
        backgroundImage:
          "linear-gradient(180deg, rgba(165, 177, 184, 0.3) 72%, rgba(237, 230, 222, 0.4) 100%), linear-gradient(90deg, #FFFDFA 0%, #FFFDFA 100%)",
      }
    : undefined;

  // Header border
  const headerBorder = isDisabled
    ? "border-b border-brand-foreground"
    : isHover
      ? "border-b border-[#D5D8D9]"
      : "border-b-[0.5px] border-brand-darkBlue";

  // Text colors
  const labelColor = isDisabled ? "text-[#ADABA5]" : "text-brand-darkGrey";
  const headingColor = isDisabled ? "text-[#ADABA5]" : "text-brand-black";
  const bodyColor = isDisabled ? "text-[#ADABA5]" : "text-brand-black";

  return (
    <div
      className={`${containerBase} ${containerState} ${className || ""}`}
      style={hoverStyle}
    >
      {/* Content area */}
      <div className="flex flex-col gap-4 items-start pb-2 pl-2 pr-4 w-full">
        {/* Header */}
        <div className={`flex flex-col gap-2 items-start pb-4 w-full ${headerBorder}`}>
          <p className={`font-sans text-xs font-w2 leading-normal ${labelColor}`}>
            {label}
          </p>
          <p className={`font-sans text-base font-w5 leading-none ${headingColor}`}>
            {heading}
          </p>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 items-start w-full">
          {slot && (
            <div className="w-full overflow-hidden">
              {slot}
            </div>
          )}
          <div className="w-full">
            <p className={`font-sans text-sm font-w3 leading-relaxed ${bodyColor}`}>
              {body}
            </p>
          </div>
        </div>
      </div>

      {/* Action button (ghost style) */}
      {action && (
        <button
          type="button"
          onClick={onAction}
          disabled={isDisabled}
          className="inline-flex items-center gap-2 pl-2 pr-3 py-1 rounded-tl rounded-br font-sans text-sm font-w3 text-primary hover:opacity-80 transition-opacity disabled:cursor-not-allowed"
        >
          <span>{actionLabel}</span>
          <PlusIcon />
        </button>
      )}
    </div>
  );
};

/** Small plus icon for the ghost action button */
const PlusIcon = () => (
  <svg
    width="10"
    height="9"
    viewBox="0 0 10 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 0.5V8.5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <path
      d="M1 4.5H9"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);
