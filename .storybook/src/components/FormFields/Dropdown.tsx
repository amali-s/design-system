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
      className={`shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""} ${className || ""}`}
      aria-hidden
    >
      <path d="M1 1L6 5L11 1" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
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

  React.useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  const commit = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    setOpen(false);
  };

  const display = value ?? "";
  const showPlaceholder = !value;

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
        className={[
          "flex h-9 w-full cursor-pointer flex-col items-stretch overflow-hidden rounded-lg border-0 bg-layer1 p-2 text-left",
          disabled ? "cursor-not-allowed opacity-60" : "",
        ].join(" ")}
      >
        <span className="flex w-full items-center justify-between gap-2">
          <span
            className={[
              "font-sans text-sm font-light leading-[1.5]",
              showPlaceholder ? "text-[#6c7275]" : "text-brand-black",
            ].join(" ")}
          >
            {showPlaceholder ? placeholder : display}
          </span>
          <ChevronIcon open={open} className={showPlaceholder ? "text-[#6c7275]" : "text-brand-black"} />
        </span>
      </button>

      {open && !disabled && (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%-1px)] z-10 flex flex-col shadow-[0px_4px_2px_rgba(0,0,0,0.25)]"
        >
          {options.map((opt, i) => (
            <button
              key={opt}
              type="button"
              role="option"
              aria-selected={value === opt}
              onClick={() => commit(opt)}
              className={[
                "bg-layer1 px-2 py-2 text-left font-sans text-sm font-light leading-[1.5] text-brand-black",
                "hover:bg-brand-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                i === 0 ? "rounded-t-lg" : "",
                i === options.length - 1 ? "rounded-b-lg" : "",
              ].join(" ")}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
