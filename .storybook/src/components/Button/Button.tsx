import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The visual style of the button */
  variant?: "primary" | "secondary" | "sage" | "red" | "ghost";
  /** The size of the button */
  size?: "sm" | "md" | "lg";
  /** Optional icon element rendered before children */
  icon?: React.ReactNode;
}

/**
 * Button component — Ghibli x Brand aesthetic.
 *
 * Design details:
 * - Shape: Pill-shaped (rounded-full)
 * - Typography: Hiragino Sans, 13px, weight 500
 * - Warm box-shadows with rgba(89,85,75,...) tones
 * - Variants: primary (blue), secondary (outline), sage (green), red, ghost
 * - Hover: Darker shade + deeper shadow
 * - Disabled: opacity-50, cursor-not-allowed
 */
export const Button = ({
  variant = "primary",
  size = "md",
  icon,
  children,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles = `
    relative inline-flex items-center justify-center gap-2
    font-sans font-medium
    rounded-full
    transition-all duration-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary
  `;

  const sizeStyles = {
    sm: "text-xs px-4 py-1.5",
    md: "text-[13px] px-6 py-2.5",
    lg: "text-sm px-8 py-3.5",
  };

  const variantStyles = {
    primary: [
      "bg-primary text-brand-white border-[1.5px] border-primary",
      "shadow-[0_2px_8px_rgba(31,131,189,0.2)]",
      "hover:bg-primary-hover hover:border-primary-hover hover:shadow-[0_4px_16px_rgba(31,131,189,0.25)]",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:hover:shadow-[0_2px_8px_rgba(31,131,189,0.2)]",
    ].join(" "),
    secondary: [
      "bg-transparent text-secondary border-[1.5px] border-[rgba(89,85,75,0.2)]",
      "hover:border-[rgba(89,85,75,0.4)] hover:bg-[rgba(89,85,75,0.03)]",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ].join(" "),
    sage: [
      "bg-sage text-brand-white border-[1.5px] border-sage",
      "shadow-[0_2px_8px_rgba(169,193,169,0.25)]",
      "hover:bg-sage-hover hover:border-sage-hover",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-sage",
    ].join(" "),
    red: [
      "bg-deepRed text-brand-white border-[1.5px] border-deepRed",
      "shadow-[0_2px_8px_rgba(125,10,22,0.2)]",
      "hover:bg-deepRed-hover hover:border-deepRed-hover",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-deepRed",
    ].join(" "),
    ghost: [
      "bg-transparent text-primary border-[1.5px] border-transparent",
      "px-1",
      "hover:bg-[#E8F2F9] hover:border-[#E8F2F9]",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ].join(" "),
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className || ""}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
