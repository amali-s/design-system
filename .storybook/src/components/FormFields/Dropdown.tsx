import * as React from "react";
import { formControlType } from "../../tokens/typography";
import { usePressInteraction } from "../usePressInteraction";

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
      className={`shrink-0 transition-transform duration-ui ease-standard ${open ? "scale-y-[-1]" : "scale-y-[1]"} ${className || ""}`}
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

function DropdownOption({
  opt,
  selected,
  isFirst,
  isLast,
  onSelect,
}: {
  opt: string;
  selected: boolean;
  isFirst: boolean;
  isLast: boolean;
  onSelect: (value: string) => void;
}) {
  const { interaction, pointerHandlers } = usePressInteraction<HTMLButtonElement>();
  const fill =
    interaction === "pressed"
      ? "bg-[#8A7C5E]/30"
      : interaction === "hover" || selected
        ? "bg-[#8A7C5E]/20"
        : "";

  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={() => onSelect(opt)}
      {...pointerHandlers}
      className={[
        "flex min-h-11 items-center justify-between gap-2 bg-layer1 px-2 py-2 text-left font-body font-light leading-[1.5] text-brand-black",
        formControlType,
        "touch-manipulation transition-colors duration-hover ease-hover-in",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
        fill,
        isFirst ? "rounded-t-lg" : "",
        isLast ? "rounded-b-lg" : "",
      ].join(" ")}
    >
      <span>{opt}</span>
      {selected && <CheckIcon className="text-brand-black" />}
    </button>
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
          "flex min-h-11 w-full flex-col items-stretch overflow-hidden rounded-lg border-0 bg-layer1 p-2 text-left",
          "touch-manipulation transition-colors duration-hover",
          disabled ? "cursor-not-allowed" : "cursor-pointer active:bg-[#8A7C5E]/10",
        ].join(" ")}
      >
        <span className="flex w-full items-center justify-between gap-2">
          <span className={["font-body font-light leading-[1.5]", formControlType, textColor].join(" ")}>
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
            "absolute left-0 right-0 top-[calc(100%-1px)] z-10 flex flex-col shadow-[0px_4px_2px_rgba(0,0,0,0.25)] will-change-transform origin-top transition-all duration-ui",
            open
              ? "opacity-100 scale-y-100 pointer-events-auto ease-standard"
              : "opacity-0 scale-y-0 pointer-events-none ease-bounce",
          ].join(" ")}
        >
          {options.map((opt, i) => (
            <DropdownOption
              key={opt}
              opt={opt}
              selected={value === opt}
              isFirst={i === 0}
              isLast={i === options.length - 1}
              onSelect={commit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
