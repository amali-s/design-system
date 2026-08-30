import * as React from "react";
import { motionVar, motionDurationMs } from "../../tokens/motion";
import { isHoverPointer } from "../usePressInteraction";

/* ─── Types ───────────────────────────────────────────────── */

/**
 * Toast visual state.
 *
 * - `information` — neutral / informational (blue accent + ⓘ icon)
 * - `success`     — successful action     (green accent + ✓ icon)
 * - `error`       — error / warning       (red accent + ! icon)
 *
 * `default` is kept as an alias of `information` for backwards
 * compatibility with earlier versions of this component.
 */
export type ToastState = "information" | "success" | "error" | "default";

export interface ToastNotificationProps {
  /** Header / title text */
  header?: string;
  /** Body description text */
  body?: string;
  /** Visual state of the toast */
  state?: ToastState;
  /** Whether to show the action button */
  button?: boolean;
  /** Action button label */
  actionLabel?: string;
  /** Callback when the action button is clicked */
  onAction?: () => void;
  /** Whether to show the close icon */
  closeIcon?: boolean;
  /** Callback when the close icon is clicked */
  onClose?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export type ToastStackPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";

export interface ToastStackItem {
  id: number | string;
  header?: string;
  body?: string;
  state?: ToastState;
  button?: boolean;
  actionLabel?: string;
  closeIcon?: boolean;
}

export interface ToastStackProps {
  toasts: ToastStackItem[];
  onDismiss: (id: ToastStackItem["id"]) => void;
  onAction?: (id: ToastStackItem["id"]) => void;
  /** Corner pin — applies `env(safe-area-inset-*)` padding. */
  position?: ToastStackPosition;
  /** Auto-dismiss each toast after this many ms. Omit to keep until dismissed. */
  autoDismissMs?: number;
  className?: string;
}

/* ─── Status icons (inline SVG) ───────────────────────────── */

const InformationIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="8" fill="#0084D1" />
    <rect x="7.25" y="6.75" width="1.5" height="5" rx="0.5" fill="#FFFFFF" />
    <circle cx="8" cy="4.5" r="0.9" fill="#FFFFFF" />
  </svg>
);

const SuccessIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="8" fill="#00803F" />
    <path
      d="M4.5 8.25L7 10.5L11.5 5.75"
      stroke="#FFFFFF"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    width="16"
    height="14"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M8 0.75L15.25 13.25H0.75L8 0.75Z"
      fill="#CC3926"
    />
    <rect x="7.25" y="5" width="1.5" height="4.25" rx="0.5" fill="#FFFFFF" />
    <circle cx="8" cy="11" r="0.85" fill="#FFFFFF" />
  </svg>
);

const StatusIcon = ({ state }: { state: Exclude<ToastState, "default"> }) => {
  switch (state) {
    case "success":
      return <SuccessIcon />;
    case "error":
      return <ErrorIcon />;
    case "information":
    default:
      return <InformationIcon />;
  }
};

/* ─── Close icon ──────────────────────────────────────────── */

const CloseIcon = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M1 1L7 7" stroke="#1B2323" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 1L1 7" stroke="#1B2323" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ─── Add (+) icon for the action button ──────────────────── */

const AddIcon = () => (
  <svg
    width="10"
    height="9"
    viewBox="0 0 10 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M5 0.5V8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M1 4.5H9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

/* ─── State → background color ────────────────────────────── */

const stateBackground: Record<Exclude<ToastState, "default">, string> = {
  information: "bg-[#edf8ff]", // light blue
  success: "bg-[#eafbe7]",     // pale green
  error: "bg-[#fff2f0]",       // warm peach
};

const TOAST_WIDTH = "w-full max-w-[min(100%,24rem)]";

/* ─── Presentational Toast Component ──────────────────────── */

/**
 * ToastNotification — a presentational toast matching the Figma design
 * (Sage Component kit, node 215-108).
 *
 * Design details:
 * - Width: fluid, capped at 24rem (Figma snapshot was 233px)
 * - Border-radius: 8px
 * - Padding: 8px
 * - Shadow: 0px 4px 4px rgba(0,0,0,0.25)
 * - Status icon (16px) in top-left, color & glyph by state:
 *     • Information → blue circle with "i"
 *     • Success     → green circle with "✓"
 *     • Error       → red triangle with "!"
 * - Background: #edf8ff (information), #eafbe7 (success), #fff2f0 (error)
 * - Header: Rethink Sans Medium, 14px, #1B2323
 * - Body:   Spectral Light, 14px, #4b5459 (Text secondary)
 * - Action: borderless ghost button (Primary action #0095cc label) with "+" icon
 * - Close:  small "×" in top-right corner, stroke 1.5px
 *
 * For stacked toasts with tap-to-expand and swipe-to-dismiss, use `ToastStack`.
 */
export const ToastNotification = ({
  header = "Header",
  body = "This is body text.",
  state = "information",
  button = true,
  actionLabel = "Action",
  onAction,
  closeIcon = true,
  onClose,
  className,
}: ToastNotificationProps) => {
  // Backwards-compat: treat "default" as "information"
  const resolvedState: Exclude<ToastState, "default"> =
    state === "default" ? "information" : state;

  const bg = stateBackground[resolvedState];

  return (
    <div
      className={[
        "flex flex-col items-start",
        TOAST_WIDTH,
        "overflow-hidden",
        "rounded-lg",
        "shadow-[0px_4px_4px_rgba(0,0,0,0.25)]",
        "p-2",
        bg,
        className || "",
      ].join(" ")}
    >
      {/* Icon + content + close row */}
      <div className="flex gap-4 items-start w-full">
        {/* Status icon */}
        <div className="flex-shrink-0 flex items-center justify-center w-4 h-4 mt-0.5">
          <StatusIcon state={resolvedState} />
        </div>

        {/* Text + action */}
        <div className="flex flex-1 items-start justify-between min-w-0">
          <div className="flex flex-col gap-2 items-start flex-1 min-w-0">
            <p className="font-sans text-sm font-w5 text-brand-black leading-none">
              {header}
            </p>

            <p className="font-body text-sm font-w2 text-textSecondary leading-relaxed tracking-[-0.84px]">
              {body}
            </p>

            {button && (
              <button
                type="button"
                onClick={onAction}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-[16px] font-sans text-sm font-w4 text-primaryAction bg-transparent fine-hover:bg-primaryAction/10 active:bg-primaryAction/10 transition-colors duration-ui ease-standard self-start"
              >
                <span className="leading-none">{actionLabel}</span>
                <AddIcon />
              </button>
            )}
          </div>

          {/* Close icon */}
          {closeIcon && (
            <button
              type="button"
              onClick={onClose}
              className="min-touch-target flex-shrink-0 p-1 fine-hover:opacity-60 active:opacity-60 transition-opacity"
              aria-label="Close toast"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Stacked toasts (Sonner-style) ───────────────────────── */

const TOAST_GAP = 8;
const STACK_OFFSET = 10;
const STACK_SCALE = 0.05;
const MAX_VISIBLE = 3;
const SWIPE_DISMISS_PX = 80;
const SWIPE_INTENT_PX = 10;

type ToastPhase = "entering" | "idle" | "exiting";

type InternalToast = ToastStackItem & { phase: ToastPhase };

const POSITION_CLASS: Record<ToastStackPosition, string> = {
  "bottom-right": "absolute bottom-0 right-0",
  "bottom-left": "absolute bottom-0 left-0",
  "top-right": "absolute top-0 right-0",
  "top-left": "absolute top-0 left-0",
};

function safeAreaPadding(position: ToastStackPosition): React.CSSProperties {
  const top = position.startsWith("top");
  const right = position.endsWith("right");
  return {
    paddingTop: top ? "max(1rem, env(safe-area-inset-top, 0px))" : undefined,
    paddingBottom: !top ? "max(1rem, env(safe-area-inset-bottom, 0px))" : undefined,
    paddingRight: right ? "max(1rem, env(safe-area-inset-right, 0px))" : undefined,
    paddingLeft: !right ? "max(1rem, env(safe-area-inset-left, 0px))" : undefined,
  };
}

function originForPosition(position: ToastStackPosition): string {
  const y = position.startsWith("top") ? "top" : "bottom";
  const x = position.endsWith("right") ? "right" : "left";
  return `${y} ${x}`;
}

/**
 * Sonner-style stack: newest on top, tap or mouse-hover to fan out,
 * swipe horizontally to dismiss the newest (or any toast when expanded).
 */
export function ToastStack({
  toasts,
  onDismiss,
  onAction,
  position = "bottom-right",
  autoDismissMs,
  className,
}: ToastStackProps) {
  const [local, setLocal] = React.useState<InternalToast[]>([]);
  const [hoverExpanded, setHoverExpanded] = React.useState(false);
  const [tapExpanded, setTapExpanded] = React.useState(false);
  const expanded = hoverExpanded || tapExpanded;

  const stackRef = React.useRef<HTMLDivElement>(null);
  const toastRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const timersRef = React.useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const autoTimersRef = React.useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const swipeLock = React.useRef(false);
  const dismissedIds = React.useRef(new Set<string>());

  const keyOf = (id: ToastStackItem["id"]) => String(id);

  const clearTimer = (map: Record<string, ReturnType<typeof setTimeout>>, key: string) => {
    if (map[key]) {
      clearTimeout(map[key]);
      delete map[key];
    }
  };

  const beginExit = React.useCallback(
    (id: ToastStackItem["id"]) => {
      const key = keyOf(id);
      if (dismissedIds.current.has(key)) return;
      dismissedIds.current.add(key);
      clearTimer(timersRef.current, key);
      clearTimer(autoTimersRef.current, key);
      setLocal((prev) =>
        prev.map((t) => (t.id === id && t.phase !== "exiting" ? { ...t, phase: "exiting" } : t)),
      );
      onDismiss(id);
      timersRef.current[key] = setTimeout(() => {
        setLocal((prev) => prev.filter((t) => t.id !== id));
        delete timersRef.current[key];
      }, motionDurationMs("feedback"));
    },
    [onDismiss],
  );

  // Sync incoming toasts: enter new ones, exit ones the parent dropped.
  React.useEffect(() => {
    setLocal((prev) => {
      const incomingIds = new Set(toasts.map((t) => t.id));
      const prevById = new Map(prev.map((t) => [t.id, t]));

      const next: InternalToast[] = [];
      for (const t of toasts) {
        const key = keyOf(t.id);
        if (dismissedIds.current.has(key)) continue;
        const existing = prevById.get(t.id);
        next.push(existing ? { ...existing, ...t, phase: existing.phase } : { ...t, phase: "entering" });
      }

      for (const old of prev) {
        if (!incomingIds.has(old.id) && old.phase !== "exiting") {
          next.push({ ...old, phase: "exiting" });
        } else if (!incomingIds.has(old.id) && old.phase === "exiting") {
          next.push(old);
        }
      }

      return next;
    });
  }, [toasts]);

  // Enter → idle, auto-dismiss, and finish parent-driven exits.
  React.useEffect(() => {
    for (const t of local) {
      const key = keyOf(t.id);
      if (t.phase === "entering" && !timersRef.current[key]) {
        timersRef.current[key] = setTimeout(() => {
          setLocal((prev) =>
            prev.map((row) => (row.id === t.id && row.phase === "entering" ? { ...row, phase: "idle" } : row)),
          );
          delete timersRef.current[key];
        }, motionDurationMs("feedback"));
      }
      if (t.phase === "exiting" && !timersRef.current[key]) {
        timersRef.current[key] = setTimeout(() => {
          setLocal((prev) => prev.filter((row) => row.id !== t.id));
          delete timersRef.current[key];
        }, motionDurationMs("feedback"));
      }
      if (
        autoDismissMs != null &&
        t.phase !== "exiting" &&
        !autoTimersRef.current[key]
      ) {
        autoTimersRef.current[key] = setTimeout(() => {
          beginExit(t.id);
        }, autoDismissMs);
      }
    }
  }, [local, autoDismissMs, beginExit]);

  React.useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
      Object.values(autoTimersRef.current).forEach(clearTimeout);
    };
  }, []);

  // Collapse tap-expand on outside pointer (touch and mouse).
  React.useEffect(() => {
    if (!tapExpanded) return;
    const onDoc = (e: PointerEvent) => {
      if (!stackRef.current?.contains(e.target as Node)) {
        setTapExpanded(false);
      }
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, [tapExpanded]);

  const orderedToasts = [...local].reverse();
  const fromTop = position.startsWith("top");

  const getExpandedY = (depth: number) => {
    let offset = 0;
    for (let i = 0; i < depth; i++) {
      const id = orderedToasts[i]?.id;
      const el = id != null ? toastRefs.current[keyOf(id)] : null;
      const h = el ? el.getBoundingClientRect().height : 100;
      offset += h + TOAST_GAP;
    }
    return fromTop ? offset : -offset;
  };

  const handleStackPointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isHoverPointer(e.pointerType)) setHoverExpanded(true);
  };

  const handleStackPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isHoverPointer(e.pointerType)) setHoverExpanded(false);
  };

  const handleStackPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isHoverPointer(e.pointerType)) return;
    if (swipeLock.current) {
      swipeLock.current = false;
      return;
    }
    if ((e.target as HTMLElement).closest("button")) return;
    setTapExpanded((open) => !open);
  };

  return (
    <div
      ref={stackRef}
      className={[
        POSITION_CLASS[position],
        "z-50",
        TOAST_WIDTH,
        className || "",
      ].join(" ")}
      style={safeAreaPadding(position)}
      onPointerEnter={handleStackPointerEnter}
      onPointerLeave={handleStackPointerLeave}
      onPointerUp={handleStackPointerUp}
    >
      <div className="relative" style={{ height: 100 }}>
        {orderedToasts.map((t, visualIndex) => {
          const isNewest = visualIndex === 0;
          const depth = visualIndex;
          const isVisible = depth < MAX_VISIBLE;
          const swipeable = expanded || isNewest;

          const stackedTranslateY = fromTop ? depth * STACK_OFFSET : -(depth * STACK_OFFSET);
          const stackedScale = 1 - depth * STACK_SCALE;
          const stackedOpacity = isVisible ? 1 - depth * 0.15 : 0;
          const expandedTranslateY = getExpandedY(depth);

          let animation = "";
          if (t.phase === "entering") {
            animation = `sonner-enter ${motionVar.duration.feedback} ${motionVar.ease.toastIn} forwards`;
          } else if (t.phase === "exiting") {
            animation = `sonner-exit ${motionVar.duration.feedback} ${motionVar.ease.toastOut} forwards`;
          }

          const translateY = expanded ? expandedTranslateY : stackedTranslateY;
          const scale = expanded ? 1 : stackedScale;
          const opacity = t.phase === "exiting" ? undefined : expanded ? 1 : stackedOpacity;

          return (
            <ToastStackLayer
              key={t.id}
              toast={t}
              swipeable={swipeable && t.phase !== "exiting"}
              onDismiss={() => beginExit(t.id)}
              onSwiped={() => {
                swipeLock.current = true;
              }}
              registerRef={(el) => {
                toastRefs.current[keyOf(t.id)] = el;
              }}
              style={{
                position: "absolute",
                ...(fromTop ? { top: 0 } : { bottom: 0 }),
                ...(position.endsWith("right") ? { right: 0 } : { left: 0 }),
                width: "100%",
                zIndex: 100 - visualIndex,
                transform:
                  t.phase === "entering" || t.phase === "exiting"
                    ? undefined
                    : `translateY(${translateY}px) scale(${scale})`,
                opacity,
                transformOrigin: originForPosition(position),
                transition:
                  t.phase === "idle"
                    ? `transform ${motionVar.duration.feedback} ${motionVar.ease.toastIn}, opacity 0.3s ease`
                    : "none",
                animation,
                pointerEvents: expanded || isNewest ? "auto" : "none",
              }}
              onAction={() => {
                onAction?.(t.id);
                beginExit(t.id);
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes sonner-enter {
          0% {
            opacity: 0;
            transform: translateY(100%) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes sonner-exit {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(110%) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}

function ToastStackLayer({
  toast,
  swipeable,
  onDismiss,
  onSwiped,
  onAction,
  registerRef,
  style,
}: {
  toast: InternalToast;
  swipeable: boolean;
  onDismiss: () => void;
  onSwiped: () => void;
  onAction: () => void;
  registerRef: (el: HTMLDivElement | null) => void;
  style: React.CSSProperties;
}) {
  const [dragX, setDragX] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const startX = React.useRef(0);
  const lastX = React.useRef(0);
  const pointerId = React.useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!swipeable) return;
    if ((e.target as HTMLElement).closest("button")) return;
    pointerId.current = e.pointerId;
    startX.current = e.clientX;
    lastX.current = 0;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== e.pointerId) return;
    const dx = e.clientX - startX.current;
    lastX.current = dx;
    if (Math.abs(dx) > SWIPE_INTENT_PX) {
      setDragX(dx);
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== e.pointerId) return;
    pointerId.current = null;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (Math.abs(lastX.current) >= SWIPE_INTENT_PX) {
      onSwiped();
    }
    if (Math.abs(lastX.current) >= SWIPE_DISMISS_PX) {
      onDismiss();
      setDragX(0);
      return;
    }
    setDragX(0);
  };

  const dragStyle: React.CSSProperties =
    dragging || dragX !== 0
      ? {
          ...style,
          transform: style.transform
            ? `${style.transform} translateX(${dragX}px)`
            : `translateX(${dragX}px)`,
          transition: dragging
            ? "none"
            : `transform ${motionVar.duration.feedback} ${motionVar.ease.toastOut}`,
          opacity: dragX !== 0 ? Math.max(0.4, 1 - Math.abs(dragX) / 240) : style.opacity,
        }
      : style;

  return (
    <div
      ref={registerRef}
      style={dragStyle}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <ToastNotification
        header={toast.header}
        body={toast.body}
        state={toast.state}
        button={toast.button}
        closeIcon={toast.closeIcon}
        actionLabel={toast.actionLabel ?? "Action"}
        onAction={onAction}
        onClose={onDismiss}
      />
    </div>
  );
}
