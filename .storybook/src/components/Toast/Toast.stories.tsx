import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ToastNotification, ToastStack } from "./Toast";
import type { ToastStackItem, ToastState } from "./Toast";

/**
 * Toast Notification component — matching the Figma design.
 *
 * ## Figma Design
 * View the toast designs in Figma:
 * https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Sage-Component-kit?node-id=215-108
 *
 * ## States
 * Three visual states, each with its own status icon:
 * - **Information** — light blue background, blue ⓘ icon
 * - **Success**     — pale green background, green ✓ icon
 * - **Error**       — warm peach background, red ! triangle icon
 *
 * ## Features
 * - Status icon (16px) in top-left, color/glyph chosen by state
 * - Optional **action button** (tertiary pill with "+" icon)
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
  parameters: {
    layout: "centered",
    backgrounds: { default: "light", values: [{ name: "light", value: "#F5F3EF" }] },
    docs: {
      description: {
        component:
          "Toast Notification component — matching the Figma design. **Motion design:** API by [Emil Kowalski](https://github.com/emilkowalski).",
      },
    },
  },
  argTypes: {
    header: { control: "text", description: "Header / title text" },
    body: { control: "text", description: "Body description text" },
    state: {
      control: "select",
      options: ["information", "success", "error"],
      description: "Visual state of the toast",
    },
    button: { control: "boolean", description: "Show action button" },
    actionLabel: { control: "text", description: "Action button label" },
    closeIcon: { control: "boolean", description: "Show close icon" },
  },
};
export default meta;

type Story = StoryObj<typeof ToastNotification>;

// ─── Static Variants (by state) ──────────────────────────────

export const Information: Story = {
  name: "Information",
  args: {
    header: "Header",
    body: "This is body text.",
    state: "information",
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

// ─── With Close Icon Only ────────────────────────────────────

export const InformationCloseOnly: Story = {
  name: "Information — Close Only",
  args: { ...Information.args, button: false },
};

export const SuccessCloseOnly: Story = {
  name: "Success — Close Only",
  args: { ...Success.args, button: false },
};

export const ErrorCloseOnly: Story = {
  name: "Error — Close Only",
  args: { ...Error.args, button: false },
};

// ─── No Close, No Button ────────────────────────────────────

export const InformationMinimal: Story = {
  name: "Information — Minimal",
  args: { ...Information.args, button: false, closeIcon: false },
};

export const SuccessMinimal: Story = {
  name: "Success — Minimal",
  args: { ...Success.args, button: false, closeIcon: false },
};

export const ErrorMinimal: Story = {
  name: "Error — Minimal",
  args: { ...Error.args, button: false, closeIcon: false },
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
          <ToastNotification state="information" button closeIcon />
          <ToastNotification state="error" button closeIcon />
          <ToastNotification state="success" button closeIcon />
        </div>
      </div>
      <div>
        <p className="text-xs text-[#8A867E] font-sans uppercase tracking-wider mb-3">
          Close Only
        </p>
        <div className="flex flex-wrap gap-4">
          <ToastNotification state="information" button={false} closeIcon />
          <ToastNotification state="error" button={false} closeIcon />
          <ToastNotification state="success" button={false} closeIcon />
        </div>
      </div>
      <div>
        <p className="text-xs text-[#8A867E] font-sans uppercase tracking-wider mb-3">
          Minimal (no action, no close)
        </p>
        <div className="flex flex-wrap gap-4">
          <ToastNotification state="information" button={false} closeIcon={false} />
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
      <ToastNotification state="information" button closeIcon />
      <ToastNotification state="error" button closeIcon />
      <ToastNotification state="success" button closeIcon />
      <ToastNotification state="information" button={false} closeIcon />
      <ToastNotification state="error" button={false} closeIcon />
      <ToastNotification state="success" button={false} closeIcon />
      <ToastNotification state="information" button={false} closeIcon={false} />
      <ToastNotification state="success" button={false} closeIcon={false} />
      <ToastNotification state="error" button={false} closeIcon={false} />
    </div>
  ),
};

// ─── Interactive Demo: Sonner-Style Stacking ────────────────

/**
 * Helper demonstrating Sonner-style stacked toast behavior via `ToastStack`.
 *
 * - Toasts appear from the bottom-right, stacking in the same position.
 * - Newest toast is on top at full scale; older ones are behind with
 *   reduced scale and vertical offset (depth effect).
 * - Tap the stack (or hover with a mouse) to fan out so every toast is hittable.
 *   Tap outside or tap the stack chrome again to collapse.
 * - Swipe horizontally to dismiss. Auto-dismiss after 4 seconds.
 */
const DISMISS_MS = 4000;

const ToastDemo = () => {
  const [toasts, setToasts] = React.useState<ToastStackItem[]>([]);
  const idRef = React.useRef(0);

  const dismissToast = React.useCallback((id: ToastStackItem["id"]) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = (
    state: ToastState,
    header: string,
    body: string,
    button: boolean,
    closeIcon: boolean,
  ) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, state, header, body, button, closeIcon }]);
  };

  return (
    <div className="w-full min-h-[500px] relative">
      <div className="flex flex-col gap-4 max-w-[500px]">
        <p className="font-brand text-xl text-secondary">
          Interactive Toast Demo
        </p>
        <p className="font-body text-[13px] text-[#8A867E] mb-2">
          Click buttons to trigger toasts. They stack like Sonner — newest
          on top, older ones behind with a depth effect. Tap the stack (or
          hover with a mouse) to expand. Swipe a toast sideways to dismiss.
          Toasts auto-dismiss after 4 s.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              addToast(
                "information",
                "Notification",
                "This is an informational notification.",
                true,
                true,
              )
            }
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-sans text-[13px] font-medium bg-[#edf8ff] text-[#0084D1] border border-[#0084D1] fine-hover:bg-[#d8f0ff] active:bg-[#d8f0ff] transition-colors cursor-pointer"
          >
            Information Toast
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
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-sans text-[13px] font-medium bg-[#fff2f0] text-[#DC3D29] border border-[#DC3D29] fine-hover:bg-[#ffe3df] active:bg-[#ffe3df] transition-colors cursor-pointer"
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
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-sans text-[13px] font-medium bg-[#eafbe7] text-[#00803F] border border-[#00803F] fine-hover:bg-[#d6f6d0] active:bg-[#d6f6d0] transition-colors cursor-pointer"
          >
            Success Toast
          </button>

          <button
            type="button"
            onClick={() =>
              addToast(
                "information",
                "Quick note",
                "Auto-dismisses in 4 seconds.",
                false,
                false,
              )
            }
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-sans text-[13px] font-medium bg-brand-white text-secondary border border-[rgba(89,85,75,0.2)] fine-hover:border-[rgba(89,85,75,0.4)] active:border-[rgba(89,85,75,0.4)] transition-colors cursor-pointer"
          >
            Minimal Toast
          </button>
        </div>
      </div>

      <ToastStack
        toasts={toasts}
        onDismiss={dismissToast}
        position="bottom-right"
        autoDismissMs={DISMISS_MS}
      />
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
