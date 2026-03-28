import * as React from "react";
import { Button } from "../Button/Button";

export interface CardProps {
  /** Small label text above the heading */
  label?: string;
  /** Main heading text (rendered in Rasa serif font) */
  heading?: string;
  /** Body description text */
  body?: string;
  /** Whether to show the action button */
  action?: boolean;
  /** Action button label */
  actionLabel?: string;
  /** Secondary action button label */
  secondaryActionLabel?: string;
  /** Callback when the action button is clicked */
  onAction?: () => void;
  /** Callback when the secondary action is clicked */
  onSecondaryAction?: () => void;
  /** Optional slot content rendered between header and body text */
  slot?: React.ReactNode;
  /** Accent color bar at the top of the card */
  accentColor?: "blue" | "sage" | "red" | "gold" | "none";
  /** Visual state of the card */
  state?: "enabled" | "hover" | "disabled";
  /** Additional CSS classes */
  className?: string;
}

/**
 * Card component — Ghibli x Brand aesthetic.
 *
 * Design details:
 * - Background: #FFFDFA (brand-white)
 * - Border: 1px solid rgba(89,85,75,0.08) — soft, warm
 * - Corner radius: 16px (rounded-2xl)
 * - Shadow: ghibli-sm default, ghibli-md on hover
 * - Hover: translateY(-2px) lift + deeper shadow
 * - Disabled: opacity-60
 * - Accent bar: 4px colored bar at top (blue, sage, red, gold)
 * - Heading: Rasa serif font
 * - Body: Hiragino Sans, muted grey
 * - Divider: gradient fade from transparent
 */
export const Card = ({
  label = "Exploration",
  heading = "A Path Through the Trees",
  body = "The forest spirits watch over travelers who walk with a gentle heart. Every journey begins with a single step.",
  action = true,
  actionLabel = "Begin",
  secondaryActionLabel = "Later",
  onAction,
  onSecondaryAction,
  slot,
  accentColor = "blue",
  state = "enabled",
  className,
}: CardProps) => {
  const isDisabled = state === "disabled";
  const isHover = state === "hover";

  // Accent bar colors
  const accentStyles: Record<string, string> = {
    blue: "bg-gradient-to-r from-primary to-sage",
    sage: "bg-sage",
    red: "bg-deepRed",
    gold: "bg-brand-gold",
    none: "hidden",
  };

  // Label color — neutral muted grey for all accents
  const labelColor = "text-[#8A867E]";

  // Container
  const containerBase = [
    "flex flex-col w-full max-w-[320px]",
    "bg-brand-white",
    "border border-[rgba(89,85,75,0.08)]",
    "rounded-2xl",
    "shadow-ghibli-sm",
    "transition-all duration-300",
    "overflow-hidden",
  ].join(" ");

  const containerState = isDisabled
    ? "opacity-60 cursor-not-allowed"
    : isHover
      ? "shadow-ghibli-md -translate-y-0.5"
      : "hover:shadow-ghibli-md hover:-translate-y-0.5";

  return (
    <div className={`${containerBase} ${containerState} ${className || ""}`}>
      {/* Accent bar */}
      {accentColor !== "none" && (
        <div className={`h-1 rounded-t-2xl ${accentStyles[accentColor]}`} />
      )}

      {/* Content */}
      <div className="flex flex-col gap-3 pt-7 px-7 pb-4 flex-1">
        {/* Header */}
        <div className="flex flex-col gap-1.5">
          <p
            className={`font-sans text-[11px] font-w5 uppercase tracking-wider ${labelColor}`}
          >
            {label}
          </p>
          <h3 className="font-brand text-[22px] font-medium text-secondary leading-snug">
            {heading}
          </h3>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(89,85,75,0.12), transparent)",
          }}
        />

        {/* Slot */}
        {slot && <div className="w-full overflow-hidden rounded-lg">{slot}</div>}

        {/* Body text */}
        <p className="font-sans text-[13px] font-w3 text-[#8A867E] leading-relaxed flex-1">
          {body}
        </p>

        {/* Footer actions — 16px (pb-4) from card bottom */}
        {action && (
          <div className="flex gap-2 items-center justify-end pt-3 mt-auto border-t border-[rgba(89,85,75,0.06)]">
            {secondaryActionLabel && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSecondaryAction}
                disabled={isDisabled}
              >
                {secondaryActionLabel}
              </Button>
            )}
            <Button
              variant={accentColor === "red" ? "danger" : "primary"}
              size="sm"
              onClick={onAction}
              disabled={isDisabled}
            >
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
