"use client";

import * as React from "react";
import { Drawer } from "vaul";
import { Button } from "../Button/Button";

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

/**
 * Tearsheet component — Bottom drawer panel using Vaul for motion.
 *
 * Design details:
 * - Slides up from bottom with smooth animation
 * - Overlay: semi-transparent black
 * - Content: brand-white background, rounded top corners
 * - Header: title (Rasa), optional description
 * - Footer: primary + secondary actions
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

  return (
    <Drawer.Root {...drawerProps}>
      <Drawer.Trigger asChild>
        {trigger ?? (
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-brand-white border-[1.5px] border-primary px-6 py-2.5 font-sans text-[13px] font-medium shadow-[0_2px_8px_rgba(31,131,189,0.2)] hover:bg-primary-hover hover:border-primary-hover transition-all duration-200"
          >
            Open Tearsheet
          </button>
        )}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Drawer.Content
          className={`
            fixed bottom-0 left-0 right-0 z-50
            outline-none
            bg-brand-white
            rounded-t-2xl
            shadow-ghibli-lg
            max-h-[90vh] flex flex-col
            ${className ?? ""}
          `}
        >
          {/* Handle bar for drag gesture */}
          <div className="mx-auto mt-2 h-1.5 w-12 flex-shrink-0 rounded-full bg-[rgba(89,85,75,0.2)]" />

          {/* Header */}
          <div className="flex flex-col gap-1 px-6 pt-4 pb-4 border-b border-[rgba(89,85,75,0.08)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="font-brand text-xl font-medium text-secondary">
                  {title}
                </h2>
                {description && (
                  <p className="font-sans text-sm font-w3 text-[#8A867E] mt-1">
                    {description}
                  </p>
                )}
              </div>
              <Drawer.Close asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className="
                    flex-shrink-0 p-2 -m-2 rounded-full
                    text-[#8A867E] hover:text-secondary hover:bg-[rgba(89,85,75,0.06)]
                    transition-colors duration-200
                  "
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 5L5 15M5 5l10 10" />
                  </svg>
                </button>
              </Drawer.Close>
            </div>
          </div>

          {/* Content - scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {children}
          </div>

          {/* Footer actions */}
          {(primaryActionLabel || secondaryActionLabel) && (
            <div className="flex gap-2 justify-end px-6 py-4 border-t border-[rgba(89,85,75,0.08)] bg-[rgba(89,85,75,0.02)]">
              {secondaryActionLabel && (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={onSecondaryAction}
                >
                  {secondaryActionLabel}
                </Button>
              )}
              {primaryActionLabel && (
                <Button
                  variant="primary"
                  size="md"
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
