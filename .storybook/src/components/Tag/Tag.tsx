import * as React from "react";

export interface TagProps {
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  /**
   * Same size family; fill may differ.
   * `default` = cream field fill; `mustard` = pale mustard (Profile).
   */
  variant?: "default" | "mustard";
  className?: string;
}

/**
 * Chip used by Accordion and Profile — 12px type, shared pill radius.
 */
export function Tag({
  label,
  icon,
  disabled = false,
  variant = "default",
  className,
}: TagProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-button px-2 py-1",
        "font-sans text-xs font-normal tracking-[-0.32px]",
        variant === "mustard" ? "bg-data-paleMustard" : "bg-field",
        disabled ? "text-textDisabled" : variant === "mustard" ? "text-textSecondary" : "text-neutralText",
        className || "",
      ].join(" ")}
    >
      {icon}
      {label}
    </span>
  );
}
