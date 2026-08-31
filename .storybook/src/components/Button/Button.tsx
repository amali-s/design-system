import * as React from "react";
import { colors, semantic } from "../../tokens/colors";
import { borderRadius } from "../../tokens/spacing";
import { motionVar } from "../../tokens/motion";
import { usePressInteraction, type PressInteraction } from "../usePressInteraction";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

/** Shared motion — transform-based so the grow stays on the compositor. Durations are CSS vars so reduced-motion can set them to 1ms. */
const PRESS_TRANSITION = `transform ${motionVar.duration.ui} ${motionVar.ease.standard}, box-shadow ${motionVar.duration.ui} ${motionVar.ease.standard}, background-image ${motionVar.duration.ui} ${motionVar.ease.standard}`;
const TERTIARY_TRANSITION = `transform ${motionVar.duration.ui} ${motionVar.ease.standard}, box-shadow ${motionVar.duration.ui} ${motionVar.ease.standard}, background-color ${motionVar.duration.ui} ${motionVar.ease.standard}, color ${motionVar.duration.ui} ${motionVar.ease.standard}, border-color ${motionVar.duration.ui} ${motionVar.ease.standard}`;
const GHOST_TRANSITION = `background-color ${motionVar.duration.ui} ${motionVar.ease.standard}`;
const HOVER_SCALE = `scale(${motionVar.scale.buttonHover})`;

const navy = "var(--sage-interactive)";
const cream = "var(--sage-on-interactive)";
const secondaryFill = "var(--sage-secondary)";
const dangerFill = colors.status.error;

/** One pill radius for every variant (press styles + classNames). */
const BUTTON_RADIUS = borderRadius.button;

const sizePadding: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "6px 10px",
  md: "8px 12px",
  lg: "12px 16px",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "text-xs py-1.5 px-2.5",
  md: "text-sm py-2 px-3",
  lg: "text-base py-3 px-4",
};

const primaryInteractionStyle = (
  interaction: PressInteraction,
  size: "sm" | "md" | "lg",
): React.CSSProperties => {
  const base: React.CSSProperties = {
    backgroundColor: navy,
    borderRadius: BUTTON_RADIUS,
    padding: sizePadding[size],
    border: "none",
    transformOrigin: "center center",
    willChange: "transform",
    transition: PRESS_TRANSITION,
    touchAction: "manipulation",
  };

  if (interaction === "hover") {
    return {
      ...base,
      backgroundImage: "none",
      boxShadow: "none",
      transform: HOVER_SCALE,
    };
  }

  if (interaction === "pressed") {
    return {
      ...base,
      backgroundImage: "var(--sage-press-gradient)",
      boxShadow: "var(--sage-press-shadow)",
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
    backgroundColor: secondaryFill,
    borderRadius: BUTTON_RADIUS,
    padding: sizePadding[size],
    border: "none",
    transformOrigin: "center center",
    willChange: "transform",
    transition: PRESS_TRANSITION,
    touchAction: "manipulation",
  };

  if (interaction === "hover") {
    return {
      ...base,
      backgroundImage: "none",
      boxShadow: "none",
      transform: HOVER_SCALE,
    };
  }

  if (interaction === "pressed") {
    return {
      ...base,
      backgroundImage: "var(--sage-secondary-press-gradient)",
      boxShadow: "var(--sage-secondary-press-shadow)",
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
    backgroundColor: dangerFill,
    borderRadius: BUTTON_RADIUS,
    padding: sizePadding[size],
    border: "none",
    transformOrigin: "center center",
    willChange: "transform",
    transition: PRESS_TRANSITION,
    touchAction: "manipulation",
  };

  if (interaction === "hover") {
    return {
      ...base,
      backgroundImage: "none",
      boxShadow: "none",
      transform: HOVER_SCALE,
    };
  }

  if (interaction === "pressed") {
    return {
      ...base,
      backgroundImage: semantic.interactive.dangerPressGradient,
      boxShadow: semantic.interactive.dangerPressShadow,
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

/** Tertiary — navy outline + navy text; hover fills navy with cream label. */
const tertiaryInteractionStyle = (
  interaction: PressInteraction,
  size: "sm" | "md" | "lg",
): React.CSSProperties => {
  const base: React.CSSProperties = {
    borderRadius: BUTTON_RADIUS,
    padding: sizePadding[size],
    transformOrigin: "center center",
    willChange: "transform",
    transition: TERTIARY_TRANSITION,
    touchAction: "manipulation",
  };

  if (interaction === "hover") {
    return {
      ...base,
      backgroundColor: navy,
      backgroundImage: "none",
      color: cream,
      border: "0.5px solid transparent",
      boxShadow: "none",
      transform: HOVER_SCALE,
    };
  }

  if (interaction === "pressed") {
    return {
      ...base,
      backgroundColor: navy,
      backgroundImage: "none",
      color: cream,
      border: "0.5px solid transparent",
      boxShadow: "var(--sage-press-shadow)",
      transform: "scale(1)",
    };
  }

  return {
    ...base,
    backgroundColor: "transparent",
    backgroundImage: "none",
    color: navy,
    border: `0.5px solid ${navy}`,
    boxShadow: "none",
    transform: "scale(1)",
  };
};

/** Ghost — navy label; warm hover fill (not cool gray). */
const ghostInteractionStyle = (
  interaction: PressInteraction,
  size: "sm" | "md" | "lg",
): React.CSSProperties => {
  const base: React.CSSProperties = {
    borderRadius: BUTTON_RADIUS,
    padding: sizePadding[size],
    border: "none",
    transition: GHOST_TRANSITION,
    touchAction: "manipulation",
  };

  if (interaction === "hover") {
    return {
      ...base,
      backgroundColor: "var(--sage-ghost-hover)",
    };
  }

  if (interaction === "pressed") {
    return {
      ...base,
      backgroundColor: "var(--sage-ghost-active)",
    };
  }

  return {
    ...base,
    backgroundColor: "transparent",
  };
};

export const Button = ({
  variant = "primary",
  size = "md",
  icon,
  children,
  disabled,
  className,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onBlur,
  style,
  ...props
}: ButtonProps) => {
  const isPressInteractive = !disabled;
  const { interaction, pointerHandlers } = usePressInteraction<HTMLButtonElement>({
    disabled: !isPressInteractive,
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    onBlur,
  });

  const baseStyles = `
    relative inline-flex items-center justify-center gap-2
    min-touch-target
    font-sans font-medium leading-none tracking-tight
    rounded-button
    focus-visible:outline-none
    touch-manipulation
  `;

  const variantStyles = {
    primary: disabled
      ? "bg-disabled text-textDisabled cursor-not-allowed"
      : [
          "text-[var(--sage-on-interactive)] border-0",
          "focus-visible:ring-1 focus-visible:ring-primary-focus focus-visible:ring-offset-1",
        ].join(" "),

    secondary: disabled
      ? "bg-disabled text-textDisabled cursor-not-allowed"
      : [
          "text-[var(--sage-on-secondary)] border-0",
          "focus-visible:ring-1 focus-visible:ring-secondary-gold focus-visible:ring-offset-1",
        ].join(" "),

    tertiary: disabled
      ? "border-[0.75px] border-disabled text-textDisabled bg-transparent cursor-not-allowed"
      : [
          "bg-transparent",
          "focus-visible:ring-1 focus-visible:ring-primary-focus focus-visible:ring-offset-1",
        ].join(" "),

    ghost: disabled
      ? "text-textDisabled cursor-not-allowed"
      : [
          "text-primary bg-transparent",
          "focus-visible:ring-1 focus-visible:ring-primary-focus focus-visible:ring-offset-1",
        ].join(" "),

    danger: disabled
      ? "bg-disabled text-textDisabled cursor-not-allowed"
      : [
          "text-brand-white border-0",
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
          : variant === "ghost"
            ? ghostInteractionStyle(interaction, size)
            : primaryInteractionStyle(interaction, size);

  return (
    <button
      className={`${baseStyles} ${sizeClasses[size]} ${variantStyles[variant]} ${className || ""}`}
      disabled={disabled}
      style={{ ...pressStyle, ...style }}
      {...props}
      {...pointerHandlers}
    >
      <span>{children}</span>
      {icon && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
};
