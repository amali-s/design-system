import * as React from "react";
import { motion, motionDurationMs } from "../../tokens/motion";

export interface TooltipProps {
  content: string;
  children: React.ReactElement;
  /** Delay before show — default `motion.duration.ui` (~200ms). */
  delay?: number;
  className?: string;
}

/**
 * Short-string hint. Cream field, brand-black text, ghibli shadow — no cool gray chrome.
 */
export function Tooltip({ content, children, delay, className }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const showTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = React.useId();

  const clear = () => {
    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = null;
    }
  };

  const scheduleOpen = () => {
    clear();
    const ms = delay ?? (typeof window === "undefined" ? 200 : motionDurationMs("ui"));
    showTimer.current = setTimeout(() => setOpen(true), ms);
  };

  const hide = () => {
    clear();
    setOpen(false);
  };

  React.useEffect(() => () => clear(), []);

  const child = React.Children.only(children);
  const trigger = React.cloneElement(child, {
    "aria-describedby": open ? id : child.props["aria-describedby"],
    onPointerEnter: (e: React.PointerEvent) => {
      child.props.onPointerEnter?.(e);
      scheduleOpen();
    },
    onPointerLeave: (e: React.PointerEvent) => {
      child.props.onPointerLeave?.(e);
      hide();
    },
    onFocus: (e: React.FocusEvent) => {
      child.props.onFocus?.(e);
      scheduleOpen();
    },
    onBlur: (e: React.FocusEvent) => {
      child.props.onBlur?.(e);
      hide();
    },
  });

  return (
    <span className={`relative inline-flex ${className || ""}`}>
      {trigger}
      {open ? (
        <span
          id={id}
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-field px-3 py-2 font-body text-xs font-light leading-snug text-brand-black shadow-ghibli-md"
          style={{ transitionDuration: motion.duration.ui }}
        >
          {content}
        </span>
      ) : null}
    </span>
  );
}
