"use client";

import * as React from "react";
import { Drawer } from "vaul";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";
import { Close } from "../../icons";

export interface TearsheetProps {
  /** Whether the tearsheet is open (controlled mode) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Title displayed in the header */
  title?: string;
  /** Optional description below the title */
  description?: string;
  /** Main content of the tearsheet */
  children?: React.ReactNode;
  /** Primary action button label */
  primaryActionLabel?: string;
  /** Secondary action button label */
  secondaryActionLabel?: string;
  /** Callback when primary action is clicked */
  onPrimaryAction?: () => void;
  /** Callback when secondary action is clicked */
  onSecondaryAction?: () => void;
  /** Whether the primary action is disabled */
  primaryActionDisabled?: boolean;
  /** Custom trigger element. If not provided, uses "Open Tearsheet" button */
  trigger?: React.ReactNode;
  /** Additional class names for the content panel */
  className?: string;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Tearsheet component — Bottom drawer panel using Vaul for motion.
 *
 * Design details:
 * - Slides up from bottom with smooth animation
 * - Overlay: semi-transparent black
 * - Content: brand-white background, rounded top corners
 * - Header: title (Rethink Sans), optional description
 * - Footer: primary + secondary actions (stacked full-width below `sm`)
 * - Uses design system typography and colors
 */
export const Tearsheet = ({
  open,
  onOpenChange,
  title = "Tearsheet",
  description,
  children,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
  primaryActionDisabled = false,
  trigger,
  className,
}: TearsheetProps) => {
  const drawerProps =
    open !== undefined
      ? { open, onOpenChange }
      : onOpenChange
        ? { onOpenChange }
        : {};

  // Vaul has no duration / reduced-motion prop. Open/close CSS is covered by
  // the global `prefers-reduced-motion` 1ms override in tailwind.css. Scale-
  // background is a JS transform on a wrapper, so disable it when reduced.
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Drawer.Root {...drawerProps} shouldScaleBackground={!prefersReducedMotion}>
      <Drawer.Trigger asChild>
        {trigger ?? (
          <Button variant="primary" size="md">
            Open Tearsheet
          </Button>
        )}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-brand-black/40 z-40" />
        <Drawer.Content
          className={`
            fixed bottom-0 left-0 right-0 z-50
            outline-none
            bg-brand-white
            rounded-t-2xl
            shadow-ghibli-lg
            max-h-[90vh] flex flex-col
            pt-[env(safe-area-inset-top)]
            pl-[env(safe-area-inset-left)]
            pr-[env(safe-area-inset-right)]
            pb-[env(safe-area-inset-bottom)]
            ${className ?? ""}
          `}
        >
          {/* Handle bar for drag gesture */}
          <div className="mx-auto mt-2 h-1.5 w-12 flex-shrink-0 cursor-grab rounded-full bg-line-strong active:cursor-grabbing" />

          {/* Header */}
          <div className="flex flex-col gap-1 px-6 pt-4 pb-4 border-b border-line">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="font-brand text-xl font-medium text-secondary">
                  {title}
                </h2>
                {description && (
                  <p className="font-body text-sm font-w3 text-muted mt-1">
                    {description}
                  </p>
                )}
              </div>
              <Drawer.Close asChild>
                <IconButton
                  aria-label="Close"
                  size="md"
                  shape="round"
                  icon={<Close size={20} />}
                  className="-m-1 text-muted"
                />
              </Drawer.Close>
            </div>
          </div>

          {/* Content - scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {children}
          </div>

          {/* Footer actions — stacked full-width below sm; primary last (thumb). */}
          {(primaryActionLabel || secondaryActionLabel) && (
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end px-6 pt-4 pb-4 border-t border-line bg-line-subtle">
              {secondaryActionLabel && (
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto"
                  onClick={onSecondaryAction}
                >
                  {secondaryActionLabel}
                </Button>
              )}
              {primaryActionLabel && (
                <Button
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                  onClick={onPrimaryAction}
                  disabled={primaryActionDisabled}
                >
                  {primaryActionLabel}
                </Button>
              )}
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
