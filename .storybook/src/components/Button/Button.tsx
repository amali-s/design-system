import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

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
    font-sans text-sm leading-none
    rounded-[16px]
    transition-all duration-200
    focus-visible:outline-none
  `;

  const sizeStyles = {
    sm: "px-4 py-2",
    md: "px-4 py-2",
    lg: "text-base px-[18px] py-[10px] rounded-[18px]",
  };

  const variantStyles = {
    primary: disabled
      ? "bg-disabled text-[#f6f1eb] cursor-not-allowed"
      : [
          "bg-primary text-[#f6f1eb]",
          "hover:rounded-[18px] hover:bg-[length:100%_100%]",
          "focus-visible:ring-1 focus-visible:ring-primary-focus focus-visible:ring-offset-1",
        ].join(" "),

    secondary: disabled
      ? "bg-disabled text-[#f6f1eb] cursor-not-allowed"
      : [
          "bg-secondary text-brand-white",
          "hover:rounded-[18px]",
          "focus-visible:ring-1 focus-visible:ring-secondary-gold focus-visible:ring-offset-1",
        ].join(" "),

    tertiary: disabled
      ? "border border-disabled text-disabled cursor-not-allowed"
      : [
          "border border-primary text-primary bg-transparent",
          "hover:text-brand-white",
          "focus-visible:ring-1 focus-visible:ring-primary-focus focus-visible:ring-offset-1",
        ].join(" "),

    ghost: disabled
      ? "text-[#ADABA5] cursor-not-allowed"
      : [
          "text-primary bg-transparent",
          "hover:bg-[#D7DDE0]",
        ].join(" "),

    danger: [
      "text-error bg-transparent",
      disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#D7DDE0]",
    ].join(" "),
  };

  const hoverStyle: React.CSSProperties | undefined =
    disabled ? undefined
    : variant === "primary"
      ? { backgroundImage: "linear-gradient(89deg, rgba(255,255,255,0) 0%, rgba(211,250,255,0.5) 92%), linear-gradient(90deg, #30B6E6 0%, #30B6E6 100%)" }
    : variant === "secondary"
      ? { backgroundImage: "linear-gradient(-89deg, rgba(191,154,73,0.5) 0%, rgba(102,102,102,0) 99%), linear-gradient(90deg, #575040 0%, #575040 100%)" }
    : variant === "tertiary"
      ? { background: "radial-gradient(circle, rgba(48,182,230,1) 0%, rgba(48,182,230,0.5) 100%)" }
    : undefined;

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className || ""}`}
      disabled={disabled}
      style={isHovered ? hoverStyle : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
};
