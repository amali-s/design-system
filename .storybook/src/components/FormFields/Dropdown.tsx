import * as React from "react";

const DEFAULT_OPTIONS = ["Dropdown", "Checkbox", "Radio Button", "Toggle Switch"];

export interface DropdownProps {
  /** Options shown when the menu is open */
  options?: string[];
  placeholder?: string;
  value?: string | null;
  defaultValue?: string | null;
  disabled?: boolean;
  className?: string;
  id?: string;
  onChange?: (value: string) => void;
}

function ChevronIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      width={12}
      height={6}
      viewBox="0 0 12 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 ease-in-out ${open ? "scale-y-[-1]" : "scale-y-[1]"} ${className || ""}`}
      aria-hidden
    >
      <path d="M1 1L6 5L11 1" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Check mark shown against the currently-selected option (Figma "check yes"). */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width={12}
      height={8}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className || ""}`}
      aria-hidden
    >
      <path d="M1 4L4.5 7L11 1" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Dropdown({
  options = DEFAULT_OPTIONS,
  placeholder = "Select a value",
  value: valueProp,
  defaultValue = null,
  disabled = false,
  className,
  id,
  onChange,
}: DropdownProps) {
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | null>(defaultValue);
  const value = isControlled ? valueProp! : internalValue;

  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const listId = React.useId();

  // Dismiss on outside interaction. `pointerdown` covers mouse, touch, and pen
  // so a tap outside on a mobile device closes the menu just like a click.
  React.useEffect(() => {
    if (!open) return;
    const onDocPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [open]);

  const commit = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    setOpen(false);
  };

  const display = value ?? "";
  const showPlaceholder = !value;

  const textColor = disabled
    ? "text-textDisabled"
    : showPlaceholder
      ? "text-[#6c7275]"
      : "text-brand-black";

  return (
    <div ref={rootRef} className={`relative inline-block min-w-[168px] ${className || ""}`}>
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        className={[
          "flex h-9 w-full flex-col items-stretch overflow-hidden rounded-lg border-0 bg-layer1 p-2 text-left",
          "touch-manipulation transition-colors duration-150",
          disabled ? "cursor-not-allowed" : "cursor-pointer active:bg-[#8A7C5E]/10",
        ].join(" ")}
      >
        <span className="flex w-full items-center justify-between gap-2">
          <span className={["font-body text-sm font-light leading-[1.5]", textColor].join(" ")}>
            {showPlaceholder ? placeholder : display}
          </span>
          <ChevronIcon open={open} className={textColor} />
        </span>
      </button>

      {!disabled && (
        <div
          id={listId}
          role="listbox"
          className={[
            "absolute left-0 right-0 top-[calc(100%-1px)] z-10 flex flex-col shadow-[0px_4px_2px_rgba(0,0,0,0.25)] will-change-transform origin-top transition-all duration-200",
            open
              ? "opacity-100 scale-y-100 pointer-events-auto ease-in-out"
              : "opacity-0 scale-y-0 pointer-events-none",
          ].join(" ")}
          style={!open ? { transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" } : undefined}
        >
          {options.map((opt, i) => {
            const selected = value === opt;
            return (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => commit(opt)}
                className={[
                  "flex items-center justify-between gap-2 bg-layer1 px-2 py-2 text-left font-body text-sm font-light leading-[1.5] text-brand-black",
                  "touch-manipulation transition-colors duration-150 ease-out",
                  "hover:bg-[#8A7C5E]/20",
                  "active:bg-[#8A7C5E]/30 active:transition-colors active:duration-100 active:ease-in-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                  selected ? "bg-[#8A7C5E]/20" : "",
                  i === 0 ? "rounded-t-lg" : "",
                  i === options.length - 1 ? "rounded-b-lg" : "",
                ].join(" ")}
              >
                <span>{opt}</span>
                {selected && <CheckIcon className="text-brand-black" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
