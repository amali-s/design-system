import * as React from "react";
import { motionVar } from "../../tokens/motion";
import { usePressInteraction, type PressInteraction } from "../usePressInteraction";

export type IconButtonSize = "sm" | "md" | "lg";
export type IconButtonVariant = "ghost" | "tertiary";
export type IconButtonShape = "square" | "round";

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label"> {
  /** Accessible name — required for icon-only controls. */
  "aria-label": string;
  icon: React.ReactNode;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  shape?: IconButtonShape;
  /**
   * Story snapshot pin. `"hover"` freezes the hover treatment.
   */
  preview?: PressInteraction;
}

const PRESS_TRANSITION = `transform ${motionVar.duration.ui} ${motionVar.ease.standard}, box-shadow ${motionVar.duration.ui} ${motionVar.ease.standard}, background-color ${motionVar.duration.ui} ${motionVar.ease.standard}, color ${motionVar.duration.ui} ${motionVar.ease.standard}, border-color ${motionVar.duration.ui} ${motionVar.ease.standard}`;
const GHOST_TRANSITION = `background-color ${motionVar.duration.ui} ${motionVar.ease.standard}`;
const HOVER_SCALE = `scale(${motionVar.scale.buttonHover})`;

const navy = "var(--sage-interactive)";
const cream = "var(--sage-on-interactive)";

export const ICON_BUTTON_ICON_SIZE: Record<IconButtonSize, 16 | 20 | 24> = {
  sm: 16,
  md: 20,
  lg: 24,
};

function ghostStyle(interaction: PressInteraction): React.CSSProperties {
  const base: React.CSSProperties = {
    border: "none",
    transition: GHOST_TRANSITION,
    touchAction: "manipulation",
    backgroundColor: "transparent",
  };
  if (interaction === "hover") return { ...base, backgroundColor: "var(--sage-ghost-hover)" };
  if (interaction === "pressed") return { ...base, backgroundColor: "var(--sage-ghost-active)" };
  return base;
}

function tertiaryStyle(interaction: PressInteraction): React.CSSProperties {
  const base: React.CSSProperties = {
    transformOrigin: "center center",
    willChange: "transform",
    transition: PRESS_TRANSITION,
    touchAction: "manipulation",
  };
  if (interaction === "hover") {
    return {
      ...base,
      backgroundColor: navy,
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
      color: cream,
      border: "0.5px solid transparent",
      boxShadow: "var(--sage-press-shadow)",
      transform: "scale(1)",
    };
  }
  return {
    ...base,
    backgroundColor: "transparent",
    color: navy,
    border: `0.5px solid ${navy}`,
    boxShadow: "none",
    transform: "scale(1)",
  };
}

/**
 * Square (or round) icon-only control. 44px minimum target; icon 16 / 20 / 24.
 * Press/hover matches Button ghost or tertiary.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    icon,
    size = "md",
    variant = "ghost",
    shape = "square",
    disabled,
    className,
    preview,
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    onBlur,
    style,
    ...props
  },
  ref,
) {
  const isPressInteractive = !disabled && !preview;
  const { interaction, pointerHandlers } = usePressInteraction<HTMLButtonElement>({
    disabled: !isPressInteractive,
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    onBlur,
  });
  const resolved = preview ?? interaction;

  const pressStyle = !disabled
    ? variant === "tertiary"
      ? tertiaryStyle(resolved)
      : ghostStyle(resolved)
    : undefined;

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={[
        "inline-flex size-11 shrink-0 items-center justify-center",
        "min-touch-target touch-manipulation",
        "font-sans text-primary",
        shape === "round" ? "rounded-full" : "rounded-lg",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-focus focus-visible:ring-offset-1",
        disabled ? "cursor-not-allowed text-textDisabled" : "",
        className || "",
      ].join(" ")}
      style={{ ...pressStyle, ...style }}
      {...props}
      {...(isPressInteractive ? pointerHandlers : {})}
    >
      {icon}
    </button>
  );
});
