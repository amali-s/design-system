import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

type PressInteraction = "enabled" | "hover" | "pressed";

/** Shared motion — transform-based so the grow stays on the compositor */
const MOTION_MS = 200;
const MOTION_EASE = "ease-in-out";
const MOTION_TRANSITION = `transform ${MOTION_MS}ms ${MOTION_EASE}, box-shadow ${MOTION_MS}ms ${MOTION_EASE}, background-image ${MOTION_MS}ms ${MOTION_EASE}`;

const sizePadding = (size: "sm" | "md" | "lg") =>
  size === "lg" ? "12px 16px" : "8px 12px";

const primaryInteractionStyle = (
  interaction: PressInteraction,
  size: "sm" | "md" | "lg",
): React.CSSProperties => {
  const base: React.CSSProperties = {
    backgroundColor: "#1AAED8",
    borderRadius: 32,
    padding: sizePadding(size),
    border: "none",
    transformOrigin: "center center",
    willChange: "transform",
    transition: MOTION_TRANSITION,
    touchAction: "manipulation",
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

  return {
    ...base,
    backgroundImage: "none",
    boxShadow: "none",
    transform: "scale(1)",
  };
};

/** Secondary — Figma node 116:66 (Default / Hover / Click / Focus / Disabled) */
const secondaryInteractionStyle = (
  interaction: PressInteraction,
  size: "sm" | "md" | "lg",
): React.CSSProperties => {
  const base: React.CSSProperties = {
    backgroundColor: "#575040",
    borderRadius: 24,
    padding: sizePadding(size),
    border: "none",
    transformOrigin: "center center",
    willChange: "transform",
    transition: MOTION_TRANSITION,
    touchAction: "manipulation",
  };

  if (interaction === "hover") {
    return {
      ...base,
      // Match primary: grow on hover without a gradient overlay
      backgroundImage: "none",
      boxShadow: "none",
      transform: "scale(1.06)",
    };
  }

  if (interaction === "pressed") {
    return {
      ...base,
      // Figma Click: brown gradient + inner shadow
      backgroundImage:
        "linear-gradient(264.21deg, rgba(73,50,0,0.6) 2.9%, rgba(150,144,130,0.06) 98.25%), linear-gradient(90deg, #575040 0%, #575040 100%)",
      boxShadow: "inset -1px 4px 4px 0px #453F30",
      transform: "scale(1)",
    };
  }

  return {
    ...base,
    backgroundImage: "none",
    boxShadow: "none",
    transform: "scale(1)",
  };
};

/** Danger / Error — Figma Primary Type=Error (329:197 / 650:1563 / 650:1573) */
const dangerInteractionStyle = (
  interaction: PressInteraction,
  size: "sm" | "md" | "lg",
): React.CSSProperties => {
  const base: React.CSSProperties = {
    backgroundColor: "#CC3926",
    borderRadius: 32,
    padding: sizePadding(size),
    border: "none",
    transformOrigin: "center center",
    willChange: "transform",
    transition: MOTION_TRANSITION,
    touchAction: "manipulation",
  };

  if (interaction === "hover") {
    return {
      ...base,
      // Match primary/secondary: grow on hover without a gradient overlay
      backgroundImage: "none",
      boxShadow: "none",
      transform: "scale(1.06)",
    };
  }

  if (interaction === "pressed") {
    return {
      ...base,
      // Figma Click: red gradient + inner shadow
      backgroundImage:
        "linear-gradient(263.63deg, rgba(110,2,2,0.2) 1.87%, rgba(247,189,189,0.08) 96.35%), linear-gradient(90deg, #CC3926 0%, #CC3926 100%)",
      boxShadow: "inset -2px 2px 4px 0px rgba(135,2,2,0.25)",
      transform: "scale(1)",
    };
  }

  return {
    ...base,
    backgroundImage: "none",
    boxShadow: "none",
    transform: "scale(1)",
  };
};

/** Tertiary — Figma node 116:83 (Enabled / Hover / Click / Disabled) */
const tertiaryInteractionStyle = (
  interaction: PressInteraction,
  size: "sm" | "md" | "lg",
): React.CSSProperties => {
  const base: React.CSSProperties = {
    borderRadius: 24,
    padding: sizePadding(size),
    transformOrigin: "center center",
    willChange: "transform",
    transition: `transform ${MOTION_MS}ms ${MOTION_EASE}, box-shadow ${MOTION_MS}ms ${MOTION_EASE}, background-color ${MOTION_MS}ms ${MOTION_EASE}, color ${MOTION_MS}ms ${MOTION_EASE}, border-color ${MOTION_MS}ms ${MOTION_EASE}`,
    touchAction: "manipulation",
  };

  if (interaction === "hover") {
    return {
      ...base,
      // Figma Hover: fill primary, white label + scale grow
      backgroundColor: "#1AAED8",
      backgroundImage: "none",
      color: "#FFFDFA",
      border: "0.5px solid transparent",
      boxShadow: "none",
      transform: "scale(1.06)",
    };
  }

  if (interaction === "pressed") {
    return {
      ...base,
      // Figma Click: filled + inset shadow
      backgroundColor: "#1AAED8",
      backgroundImage: "none",
      color: "#FFFDFA",
      border: "0.5px solid transparent",
      boxShadow: "inset -1px 3px 4px 0px #1795B9",
      transform: "scale(1)",
    };
  }

  // enabled — outline
  return {
    ...base,
    backgroundColor: "transparent",
    backgroundImage: "none",
    color: "#1AAED8",
    border: "0.5px solid #1AAED8",
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
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onBlur,
  style,
  ...props
}: ButtonProps) => {
  const [interaction, setInteraction] = React.useState<PressInteraction>("enabled");
  const isPressInteractive =
    (variant === "primary" ||
      variant === "secondary" ||
      variant === "tertiary" ||
      variant === "danger") &&
    !disabled;
  const pressPointerId = React.useRef<number | null>(null);

  const baseStyles = `
    relative inline-flex items-center justify-center gap-2
    font-sans text-sm font-medium leading-none tracking-tight
    focus-visible:outline-none
    touch-manipulation
    ${isPressInteractive ? "" : "transition-all duration-200 ease-in-out"}
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
      ? "bg-disabled text-[#D0D3D3] cursor-not-allowed rounded-2xl px-3 py-2"
      : [
          "text-brand-white border-0",
          "focus-visible:ring-1 focus-visible:ring-secondary-gold focus-visible:ring-offset-1",
        ].join(" "),

    tertiary: disabled
      ? "border-[0.75px] border-disabled text-disabled bg-transparent cursor-not-allowed rounded-2xl px-3 py-2"
      : [
          "bg-transparent",
          "focus-visible:ring-1 focus-visible:ring-primary-focus focus-visible:ring-offset-1",
        ].join(" "),

    ghost: disabled
      ? "text-[#ADABA5] cursor-not-allowed rounded-2xl px-3 py-1"
      : [
          "text-primary bg-transparent rounded-2xl px-3 py-1",
          "hover:bg-[#D7DDE0]",
        ].join(" "),

    danger: disabled
      ? "bg-disabled text-[#f6f1eb] cursor-not-allowed rounded-[32px] px-3.5 py-1.5"
      : [
          "text-[#f6f1eb] border-0",
          "focus-visible:ring-1 focus-visible:ring-error focus-visible:ring-offset-1",
        ].join(" "),
  };

  const pressStyle = !isPressInteractive
    ? undefined
    : variant === "secondary"
      ? secondaryInteractionStyle(interaction, size)
      : variant === "tertiary"
        ? tertiaryInteractionStyle(interaction, size)
        : variant === "danger"
          ? dangerInteractionStyle(interaction, size)
          : primaryInteractionStyle(interaction, size);

  const releasePress = React.useCallback(() => {
    pressPointerId.current = null;
    setInteraction("enabled");
  }, []);

  // ── Pointer events cover mouse, touch, and pen for press-interactive variants ─

  const handlePointerEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (isPressInteractive && e.pointerType === "mouse") {
      setInteraction("hover");
    }
    onPointerEnter?.(e);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (isPressInteractive && pressPointerId.current === null) {
      setInteraction("enabled");
    }
    onPointerLeave?.(e);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    const isValidPress =
      isPressInteractive &&
      (e.pointerType !== "mouse" || e.button === 0);

    if (isValidPress) {
      pressPointerId.current = e.pointerId;
      setInteraction("pressed");
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    onPointerDown?.(e);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (isPressInteractive && pressPointerId.current === e.pointerId) {
      releasePress();
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    }
    onPointerUp?.(e);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (isPressInteractive && pressPointerId.current === e.pointerId) {
      releasePress();
    }
    onPointerCancel?.(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(e);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseDown?.(e);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseUp?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (isPressInteractive) releasePress();
    onBlur?.(e);
  };

  React.useEffect(() => {
    if (!isPressInteractive || interaction !== "pressed") return;
    const onWindowUp = () => releasePress();
    window.addEventListener("pointerup", onWindowUp);
    window.addEventListener("pointercancel", onWindowUp);
    window.addEventListener("touchend", onWindowUp);
    window.addEventListener("touchcancel", onWindowUp);
    return () => {
      window.removeEventListener("pointerup", onWindowUp);
      window.removeEventListener("pointercancel", onWindowUp);
      window.removeEventListener("touchend", onWindowUp);
      window.removeEventListener("touchcancel", onWindowUp);
    };
  }, [isPressInteractive, interaction, releasePress]);

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className || ""}`}
      disabled={disabled}
      style={{ ...pressStyle, ...style }}
      {...props}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
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
