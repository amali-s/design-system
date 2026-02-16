import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

/**
 * Button component following the design system specifications.
 * 
 * Primary button design:
 * - Asymmetric corners: top-left 8px, top-right 0, bottom-right 8px, bottom-left 0
 * - Left-aligned content with icon
 * - Padding: 8px top/bottom, 8px left, 12px right
 * - 8px gap between icon and text
 * - Text/icon color: #F6F1EB
 * - Text style: Body 1 (Hiragino Sans, 14px, W3)
 * - Hover: #0E7BB8 background
 * - Disabled: #A5B1B8 background
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
  const isPrimary = variant === "primary";
  
  // Base styles with Body 1 typography: font-sans (Hiragino Sans), text-sm (14px), font-w3 (400)
  const baseStyles = `
    relative inline-flex items-center gap-2
    font-sans text-sm font-w3
    transition-all focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-offset-2
  `;

  // Primary uses custom asymmetric corners, others use standard rounded
  const cornerStyles = isPrimary
    ? "rounded-tl-lg rounded-tr-none rounded-br-lg rounded-bl-none"
    : "rounded-xl";

  // Primary uses left-aligned content, others centered
  const alignmentStyles = isPrimary ? "justify-start" : "justify-center";

  // Padding: 8px top/bottom, 8px left, 12px right for primary
  const paddingStyles = isPrimary 
    ? "pl-2 pr-3 py-2" 
    : "px-4 py-2";

  const variants = {
    primary: "bg-primary text-[#F6F1EB] hover:bg-[#0E7BB8] disabled:bg-[#A5B1B8] disabled:hover:bg-[#A5B1B8] disabled:cursor-not-allowed focus-visible:ring-primary",
    secondary: "bg-secondary text-[#F6F1EB] hover:bg-secondary-hover active:bg-secondary-active disabled:bg-[#A5B1B8] disabled:cursor-not-allowed focus-visible:ring-secondary",
    success: "bg-success text-white hover:bg-success-dark disabled:bg-[#A5B1B8] disabled:cursor-not-allowed focus-visible:ring-success",
    warning: "bg-warning text-white hover:bg-warning-dark disabled:bg-[#A5B1B8] disabled:cursor-not-allowed focus-visible:ring-warning",
    error: "bg-error text-white hover:bg-error-dark disabled:bg-[#A5B1B8] disabled:cursor-not-allowed focus-visible:ring-error",
  };

  // Text color for icon
  const iconColor = (variant === "primary" || variant === "secondary") 
    ? "text-[#F6F1EB]" 
    : "text-white";

  return (
    <button 
      className={`${baseStyles} ${cornerStyles} ${alignmentStyles} ${paddingStyles} ${variants[variant]} ${className || ""}`} 
      disabled={disabled}
      {...props}
    >
      {icon && <span className={`flex-shrink-0 ${iconColor}`}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
