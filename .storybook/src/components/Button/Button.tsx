import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

type PrimaryInteraction = "enabled" | "hover" | "pressed";

/** Primary motion — transform-based so the grow stays on the compositor (no layout thrash) */
const PRIMARY_MS = 200;
const PRIMARY_EASE = "ease-in-out";
const PRIMARY_TRANSITION = `transform ${PRIMARY_MS}ms ${PRIMARY_EASE}, box-shadow ${PRIMARY_MS}ms ${PRIMARY_EASE}, background-image ${PRIMARY_MS}ms ${PRIMARY_EASE}`;

const primaryInteractionStyle = (
  interaction: PrimaryInteraction,
  size: "sm" | "md" | "lg",
): React.CSSProperties => {
  const isLarge = size === "lg";
  const padding = isLarge ? "12px 16px" : "8px 12px";

  const base: React.CSSProperties = {
    backgroundColor: "#1AAED8",
    borderRadius: 32,
    padding,
    border: "none",
    transformOrigin: "center center",
    willChange: "transform",
    // Same transition on every state so the browser never restarts mid-tween
    transition: PRIMARY_TRANSITION,
  };

  if (interaction === "hover") {
    return {
      ...base,
      backgroundImage: "none",
      boxShadow: "none",
      transform: "scale(1.06)",
    };
  }

  if (interaction === "pressed") {
    return {
      ...base,
      backgroundImage:
        "linear-gradient(89.45deg, rgba(59,180,224,0.265) 0.19%, rgba(18,101,124,0.5) 91.52%), linear-gradient(90deg, #1AAED8 0%, #1AAED8 100%)",
      boxShadow: "inset -1px 3px 4px 0px #1394b8",
      transform: "scale(1)",
    };
  }

  // enabled
  return {
    ...base,
    backgroundImage: "none",
    boxShadow: "none",
    transform: "scale(1)",
  };
};

export const Button = ({
  variant = "primary",
  size = "md",
  icon,
  children,
  disabled,
  className,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onBlur,
  style,
  ...props
}: ButtonProps) => {
  const [interaction, setInteraction] = React.useState<PrimaryInteraction>("enabled");
  const isPrimaryInteractive = variant === "primary" && !disabled;

  const baseStyles = `
    relative inline-flex items-center justify-center gap-2
    font-sans text-sm font-medium leading-none tracking-tight
    focus-visible:outline-none
    ${variant === "primary" ? "" : "transition-all duration-200 ease-in-out"}
  `;

  const sizeStyles = {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-xl",
  };

  const variantStyles = {
    primary: disabled
      ? "bg-disabled text-[#f6f1eb] cursor-not-allowed rounded-[32px] px-3.5 py-1.5"
      : [
          "text-[#f6f1eb] border-0",
          "focus-visible:ring-1 focus-visible:ring-primary-focus focus-visible:ring-offset-1",
        ].join(" "),

    secondary: disabled
      ? "bg-disabled text-[#f6f1eb] cursor-not-allowed rounded-2xl px-3 py-1"
      : [
          "bg-secondary text-brand-white rounded-2xl px-3 py-1",
          "hover:rounded-[18px]",
          "focus-visible:ring-1 focus-visible:ring-secondary-gold focus-visible:ring-offset-1",
        ].join(" "),

    tertiary: disabled
      ? "border border-disabled text-disabled cursor-not-allowed rounded-2xl px-3 py-1"
      : [
          "border-[0.5px] border-primary text-primary bg-transparent rounded-2xl px-3 py-1",
          "hover:bg-primary hover:text-brand-white",
          "focus-visible:ring-1 focus-visible:ring-primary-focus focus-visible:ring-offset-1",
        ].join(" "),

    ghost: disabled
      ? "text-[#ADABA5] cursor-not-allowed rounded-2xl px-3 py-1"
      : [
          "text-primary bg-transparent rounded-2xl px-3 py-1",
          "hover:bg-[#D7DDE0]",
        ].join(" "),

    danger: [
      "text-error bg-transparent rounded-2xl px-3 py-1",
      disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#D7DDE0]",
    ].join(" "),
  };

  const [secondaryHovered, setSecondaryHovered] = React.useState(false);

  const secondaryHoverStyle: React.CSSProperties | undefined =
    !disabled && variant === "secondary" && secondaryHovered
      ? {
          backgroundImage:
            "linear-gradient(-89deg, rgba(191,154,73,0.5) 0%, rgba(102,102,102,0) 99%), linear-gradient(90deg, #575040 0%, #575040 100%)",
        }
      : undefined;

  const primaryStyle = isPrimaryInteractive
    ? primaryInteractionStyle(interaction, size)
    : undefined;

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      if (variant === "primary") setInteraction("hover");
      if (variant === "secondary") setSecondaryHovered(true);
    }
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      if (variant === "primary") setInteraction("enabled");
      if (variant === "secondary") setSecondaryHovered(false);
    }
    onMouseLeave?.(e);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Figma: MOUSE_DOWN → Click (pressed) with inner shadow
    if (isPrimaryInteractive && e.button === 0) {
      setInteraction("pressed");
    }
    onMouseDown?.(e);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Figma: MOUSE_UP → Enabled
    if (isPrimaryInteractive) {
      setInteraction("enabled");
    }
    onMouseUp?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (isPrimaryInteractive) setInteraction("enabled");
    onBlur?.(e);
  };

  // Release outside the button still returns to Enabled
  React.useEffect(() => {
    if (!isPrimaryInteractive || interaction !== "pressed") return;
    const onWindowMouseUp = () => setInteraction("enabled");
    window.addEventListener("mouseup", onWindowMouseUp);
    return () => window.removeEventListener("mouseup", onWindowMouseUp);
  }, [isPrimaryInteractive, interaction]);

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className || ""}`}
      disabled={disabled}
      style={{ ...primaryStyle, ...secondaryHoverStyle, ...style }}
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onBlur={handleBlur}
    >
      <span>{children}</span>
      {icon && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
};
