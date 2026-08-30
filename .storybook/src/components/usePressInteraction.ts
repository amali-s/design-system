import * as React from "react";

export type PressInteraction = "enabled" | "hover" | "pressed";

export type PressPointerHandlers<T extends HTMLElement = HTMLElement> = {
  onPointerEnter?: React.PointerEventHandler<T>;
  onPointerLeave?: React.PointerEventHandler<T>;
  onPointerDown?: React.PointerEventHandler<T>;
  onPointerUp?: React.PointerEventHandler<T>;
  onPointerCancel?: React.PointerEventHandler<T>;
  onBlur?: React.FocusEventHandler<T>;
};

export type UsePressInteractionOptions<T extends HTMLElement = HTMLElement> =
  PressPointerHandlers<T> & {
    disabled?: boolean;
    /**
     * Capture the pointer on press so mouseup/touchend outside still ends
     * the press. Disable on containers that wrap nested controls (Accordion
     * row, Card) so inner buttons keep their own pointer stream.
     */
    capture?: boolean;
  };

/**
 * True when this pointer can hover without also being a tap.
 *
 * `pointerType === "mouse"` is necessary but not sufficient: iOS synthesizes
 * compatibility mouse events after a tap. Require a fine hover-capable
 * pointer so hover fill/scale never sticks on touch.
 */
export function isHoverPointer(pointerType: string) {
  if (pointerType !== "mouse") return false;
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return true;
  }
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/**
 * Shared hover/press machine.
 *
 * - Hover only for mouse + `@media (hover: hover) and (pointer: fine)`
 * - Press for mouse (primary button), touch, and pen
 * - `pressed` wins over `hover` until pointerup / cancel / blur
 * - Mouse press restores hover if the pointer is still over the target
 */
export function usePressInteraction<T extends HTMLElement = HTMLElement>(
  options: UsePressInteractionOptions<T> = {},
) {
  const {
    disabled = false,
    capture = true,
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    onBlur,
  } = options;

  const [interaction, setInteraction] = React.useState<PressInteraction>("enabled");
  const pressPointerId = React.useRef<number | null>(null);
  const canHoverRef = React.useRef(false);

  const releasePress = React.useCallback(() => {
    pressPointerId.current = null;
    setInteraction(canHoverRef.current ? "hover" : "enabled");
  }, []);

  const handlePointerEnter = (e: React.PointerEvent<T>) => {
    if (!disabled && isHoverPointer(e.pointerType)) {
      canHoverRef.current = true;
      if (pressPointerId.current === null) {
        setInteraction("hover");
      }
    }
    onPointerEnter?.(e);
  };

  const handlePointerLeave = (e: React.PointerEvent<T>) => {
    canHoverRef.current = false;
    if (!disabled && pressPointerId.current === null) {
      setInteraction("enabled");
    }
    onPointerLeave?.(e);
  };

  const handlePointerDown = (e: React.PointerEvent<T>) => {
    const isValidPress = !disabled && (e.pointerType !== "mouse" || e.button === 0);

    if (isValidPress) {
      pressPointerId.current = e.pointerId;
      setInteraction("pressed");
      if (capture) {
        e.currentTarget.setPointerCapture(e.pointerId);
      }
    }
    onPointerDown?.(e);
  };

  const handlePointerUp = (e: React.PointerEvent<T>) => {
    if (!disabled && pressPointerId.current === e.pointerId) {
      if (capture && e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      releasePress();
    }
    onPointerUp?.(e);
  };

  const handlePointerCancel = (e: React.PointerEvent<T>) => {
    if (!disabled && pressPointerId.current === e.pointerId) {
      releasePress();
    }
    onPointerCancel?.(e);
  };

  const handleBlur = (e: React.FocusEvent<T>) => {
    if (!disabled) releasePress();
    onBlur?.(e);
  };

  React.useEffect(() => {
    if (disabled || interaction !== "pressed") return;
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
  }, [disabled, interaction, releasePress]);

  return {
    interaction,
    isHovered: interaction === "hover",
    isPressed: interaction === "pressed",
    pointerHandlers: {
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
      onBlur: handleBlur,
    } satisfies PressPointerHandlers<T>,
  };
}
