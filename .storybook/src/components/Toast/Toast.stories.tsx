import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ToastNotification } from "./Toast";
import type { ToastState } from "./Toast";

/**
 * Toast Notification component — matching the Figma design.
 *
 * ## Figma Design
 * View the toast designs in Figma:
 * https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Component-kit?node-id=215-108
 *
 * ## States
 * Three visual states: **Default** (gold/beige), **Error** (pink/red), **Success** (mint/green).
 *
 * ## Features
 * - Optional **action button** (ghost style with "+" icon)
 * - Optional **close icon** (× in top-right)
 *
 * ## Sonner Integration
 * For animated toasts with auto-dismiss, combine with Sonner:
 * ```tsx
 * import { toast, Toaster } from "sonner";
 * import { ToastNotification } from "./Toast";
 *
 * // Add once at app root:
 * <Toaster position="bottom-right" toastOptions={{ unstyled: true }} />
 *
 * // Trigger from anywhere:
 * toast.custom((id) => (
 *   <ToastNotification
 *     header="Saved!"
 *     body="Your changes were saved."
 *     state="success"
 *     closeIcon
 *     onClose={() => toast.dismiss(id)}
 *   />
 * ));
 * ```
 */
const meta: Meta<typeof ToastNotification> = {
  title: "Components/Toast",
  component: ToastNotification,
  tags: ["autodocs"],
  argTypes: {
    header: { control: "text", description: "Header / title text" },
    body: { control: "text", description: "Body description text" },
    state: {
      control: "select",
      options: ["default", "error", "success"],
      description: "Visual state of the toast",
    },
    button: { control: "boolean", description: "Show action button" },
    actionLabel: { control: "text", description: "Action button label" },
    closeIcon: { control: "boolean", description: "Show close icon" },
  },
  parameters: {
    layout: "centered",
    backgrounds: { default: "light", values: [{ name: "light", value: "#F5F3EF" }] },
  },
};
export default meta;

type Story = StoryObj<typeof ToastNotification>;

// ─── Static Variants (by state) ──────────────────────────────

export const Default: Story = {
  name: "Default",
  args: {
    header: "Header",
    body: "This is body text.",
    state: "default",
    button: true,
    closeIcon: true,
  },
};

export const Error: Story = {
  name: "Error",
  args: {
    header: "Header",
    body: "This is body text.",
    state: "error",
    button: true,
    closeIcon: true,
  },
};

export const Success: Story = {
  name: "Success",
  args: {
    header: "Header",
    body: "This is body text.",
    state: "success",
    button: true,
    closeIcon: true,
  },
};

// ─── With Close Icon Only ────────────────────────────────────

export const DefaultCloseOnly: Story = {
  name: "Default — Close Only",
  args: { ...Default.args, button: false },
};

export const ErrorCloseOnly: Story = {
  name: "Error — Close Only",
  args: { ...Error.args, button: false },
};

export const SuccessCloseOnly: Story = {
  name: "Success — Close Only",
  args: { ...Success.args, button: false },
};

// ─── No Close, No Button ────────────────────────────────────

export const DefaultMinimal: Story = {
  name: "Default — Minimal",
  args: { ...Default.args, button: false, closeIcon: false },
};

export const ErrorMinimal: Story = {
  name: "Error — Minimal",
  args: { ...Error.args, button: false, closeIcon: false },
};

export const SuccessMinimal: Story = {
  name: "Success — Minimal",
  args: { ...Success.args, button: false, closeIcon: false },
};

// ─── Composite: All States Grid ──────────────────────────────

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs text-[#8A867E] font-sans uppercase tracking-wider mb-3">
          With Action + Close
        </p>
        <div className="flex flex-wrap gap-4">
          <ToastNotification state="default" button closeIcon />
          <ToastNotification state="error" button closeIcon />
          <ToastNotification state="success" button closeIcon />
        </div>
      </div>
      <div>
        <p className="text-xs text-[#8A867E] font-sans uppercase tracking-wider mb-3">
          Close Only
        </p>
        <div className="flex flex-wrap gap-4">
          <ToastNotification state="default" button={false} closeIcon />
          <ToastNotification state="error" button={false} closeIcon />
          <ToastNotification state="success" button={false} closeIcon />
        </div>
      </div>
      <div>
        <p className="text-xs text-[#8A867E] font-sans uppercase tracking-wider mb-3">
          Minimal (no action, no close)
        </p>
        <div className="flex flex-wrap gap-4">
          <ToastNotification state="default" button={false} closeIcon={false} />
          <ToastNotification state="error" button={false} closeIcon={false} />
          <ToastNotification state="success" button={false} closeIcon={false} />
        </div>
      </div>
    </div>
  ),
};

// ─── Figma Design Grid ───────────────────────────────────────

export const FigmaDesignGrid: Story = {
  name: "Figma Design Grid",
  render: () => (
    <div className="flex flex-col gap-5">
      <ToastNotification state="default" button closeIcon />
      <ToastNotification state="error" button closeIcon />
      <ToastNotification state="success" button closeIcon />
      <ToastNotification state="default" button={false} closeIcon />
      <ToastNotification state="error" button={false} closeIcon />
      <ToastNotification state="success" button={false} closeIcon />
      <ToastNotification state="default" button={false} closeIcon={false} />
      <ToastNotification state="success" button={false} closeIcon={false} />
      <ToastNotification state="error" button={false} closeIcon={false} />
    </div>
  ),
};

// ─── Interactive Demo: Sonner-Style Stacking ────────────────

/**
 * Helper component demonstrating Sonner-style stacked toast behavior.
 *
 * - Toasts appear from the bottom-right, stacking in the same position.
 * - Newest toast is on top at full scale; older ones are behind with
 *   reduced scale and vertical offset (depth effect).
 * - On hover the stack fans out vertically so all toasts are readable.
 * - Auto-dismiss after 4 seconds with a smooth slide-out to the right.
 */
const TOAST_GAP = 8;        // px between toasts when expanded
const STACK_OFFSET = 10;    // px vertical offset per stacked toast
const STACK_SCALE = 0.05;   // scale reduction per depth level
const MAX_VISIBLE = 3;      // max visible toasts in the stack
const DISMISS_MS = 4000;    // auto-dismiss timeout

const ToastDemo = () => {
  const [toasts, setToasts] = React.useState<
    Array<{
      id: number;
      state: ToastState;
      header: string;
      body: string;
      button: boolean;
      closeIcon: boolean;
      phase: "entering" | "idle" | "exiting";
    }>
  >([]);
  const [hovered, setHovered] = React.useState(false);

  const idRef = React.useRef(0);
  const timersRef = React.useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const dismissToast = React.useCallback((id: number) => {
    // Clear any pending auto-dismiss timer
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }

    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, phase: "exiting" as const } : t)),
    );
    // Remove after exit animation
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 350);
  }, []);

  const addToast = (
    state: ToastState,
    header: string,
    body: string,
    button: boolean,
    closeIcon: boolean,
  ) => {
    const id = ++idRef.current;
    setToasts((prev) => [
      ...prev,
      { id, state, header, body, button, closeIcon, phase: "entering" },
    ]);

    // Transition to idle after enter animation
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, phase: "idle" as const } : t)),
      );
    }, 350);

    // Auto-dismiss after DISMISS_MS
    timersRef.current[id] = setTimeout(() => dismissToast(id), DISMISS_MS);
  };

  // Toasts ordered newest-first for rendering (newest = index 0 = on top)
  const orderedToasts = [...toasts].reverse();

  // Measure actual toast heights so the 8px gap is always accurate
  const toastRefs = React.useRef<Record<number, HTMLDivElement | null>>({});
  const getExpandedY = (depth: number) => {
    // Sum up heights of all toasts in front of this one + gap per toast
    let offset = 0;
    for (let i = 0; i < depth; i++) {
      const id = orderedToasts[i]?.id;
      const el = id != null ? toastRefs.current[id] : null;
      const h = el ? el.getBoundingClientRect().height : 100;
      offset += h + TOAST_GAP;
    }
    return -offset;
  };

  return (
    <div className="w-full min-h-[500px] relative">
      {/* Trigger buttons */}
      <div className="flex flex-col gap-4 max-w-[500px]">
        <p className="font-brand text-xl text-secondary">
          Interactive Toast Demo
        </p>
        <p className="font-sans text-[13px] text-[#8A867E] mb-2">
          Click buttons to trigger toasts. They stack like Sonner — newest
          on top, older ones behind with a depth effect. Hover over the
          toast area to expand the stack. Toasts auto-dismiss after 4 s.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              addToast(
                "default",
                "Notification",
                "This is a default notification.",
                true,
                true,
              )
            }
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-sans text-[13px] font-medium bg-brand-foreground text-secondary border border-[#BF9A49] hover:bg-[#E5DDD4] transition-all cursor-pointer"
          >
            Default Toast
          </button>

          <button
            type="button"
            onClick={() =>
              addToast(
                "error",
                "Error",
                "Something went wrong. Please try again.",
                true,
                true,
              )
            }
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-sans text-[13px] font-medium bg-[#FAD4CF] text-[#DC3D29] border border-[#DC3D29] hover:bg-[#F5C0B8] transition-all cursor-pointer"
          >
            Error Toast
          </button>

          <button
            type="button"
            onClick={() =>
              addToast(
                "success",
                "Success",
                "Your changes have been saved.",
                false,
                true,
              )
            }
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-sans text-[13px] font-medium bg-[#B3F1D2] text-[#00803F] border border-[#00803F] hover:bg-[#9FE8C4] transition-all cursor-pointer"
          >
            Success Toast
          </button>

          <button
            type="button"
            onClick={() =>
              addToast(
                "default",
                "Quick note",
                "Auto-dismisses in 4 seconds.",
                false,
                false,
              )
            }
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-sans text-[13px] font-medium bg-brand-white text-secondary border border-[rgba(89,85,75,0.2)] hover:border-[rgba(89,85,75,0.4)] transition-all cursor-pointer"
          >
            Minimal Toast
          </button>
        </div>
      </div>

      {/* Toast stack — anchored to bottom-right */}
      <div
        className="absolute bottom-4 right-4 z-50"
        style={{ width: 233 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Wrapper keeps newest toast at bottom; older toasts shift upward */}
        <div className="relative" style={{ height: 100 }}>
          {orderedToasts.map((t, visualIndex) => {
            const isNewest = visualIndex === 0;
            const depth = visualIndex; // 0 = newest (front), 1+ = older (behind)
            const isVisible = depth < MAX_VISIBLE;

            // ── Stacked (default) transforms ──
            // Older toasts shift up slightly and scale down
            const stackedTranslateY = -(depth * STACK_OFFSET);
            const stackedScale = 1 - depth * STACK_SCALE;
            const stackedOpacity = isVisible
              ? 1 - depth * 0.15
              : 0;

            // ── Expanded (hovered) transforms ──
            // Fan out using measured heights so the 8px gap is exact
            const expandedTranslateY = getExpandedY(depth);

            // ── Enter / exit overrides ──
            let animation = "";
            if (t.phase === "entering") {
              animation = "sonner-enter 0.35s cubic-bezier(0.21,1.02,0.73,1) forwards";
            } else if (t.phase === "exiting") {
              animation = "sonner-exit 0.35s cubic-bezier(0.06,0.71,0.55,1) forwards";
            }

            const translateY = hovered ? expandedTranslateY : stackedTranslateY;
            const scale = hovered ? 1 : stackedScale;
            const opacity = t.phase === "exiting" ? undefined : (hovered ? 1 : stackedOpacity);

            return (
              <div
                key={t.id}
                ref={(el) => { toastRefs.current[t.id] = el; }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  zIndex: 100 - visualIndex,
                  transform: t.phase === "entering" || t.phase === "exiting"
                    ? undefined
                    : `translateY(${translateY}px) scale(${scale})`,
                  opacity,
                  transformOrigin: "bottom center",
                  transition: t.phase === "idle"
                    ? "transform 0.35s cubic-bezier(0.21,1.02,0.73,1), opacity 0.3s ease"
                    : "none",
                  animation,
                  pointerEvents: (hovered || isNewest) ? "auto" : "none",
                }}
              >
                <ToastNotification
                  header={t.header}
                  body={t.body}
                  state={t.state}
                  button={t.button}
                  closeIcon={t.closeIcon}
                  actionLabel="Action"
                  onAction={() => dismissToast(t.id)}
                  onClose={() => dismissToast(t.id)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyframe animations */}
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
};

export const LiveDemo: Story = {
  name: "Live Demo (Sonner-Style)",
  render: () => <ToastDemo />,
  parameters: {
    layout: "padded",
  },
};
