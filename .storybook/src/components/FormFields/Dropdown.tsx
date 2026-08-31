import * as React from "react";
import { formControlType } from "../../tokens/typography";
import { usePressInteraction } from "../usePressInteraction";
import { Field } from "./Field";
import { Check, Chevron } from "../../icons";

const DEFAULT_OPTIONS = ["Studio", "Garden room", "Library", "Cafe"];

export interface DropdownProps {
  /** Options shown when the menu is open */
  options?: string[];
  placeholder?: string;
  value?: string | null;
  defaultValue?: string | null;
  disabled?: boolean;
  className?: string;
  id?: string;
  label?: string;
  helperText?: string;
  onChange?: (value: string) => void;
  /** Marks the field invalid (error border). */
  error?: boolean;
  /** Alias of `error`. */
  invalid?: boolean;
  /** Support text shown in error color; replaces any helper. */
  errorMessage?: string;
}

function ChevronIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <Chevron
      size={16}
      className={`shrink-0 transition-transform duration-ui ease-standard ${open ? "rotate-180" : ""} ${className || ""}`}
    />
  );
}

/** Check mark shown against the currently-selected option. */
function CheckIcon({ className }: { className?: string }) {
  return <Check size={16} className={`shrink-0 ${className || ""}`} />;
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
      ? "bg-secondary/30"
      : interaction === "hover" || selected
        ? "bg-secondary/20"
        : "";

  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={() => onSelect(opt)}
      {...pointerHandlers}
      className={[
        "flex min-h-11 items-center justify-between gap-2 bg-field px-2 py-2 text-left font-body font-light leading-[1.5] text-brand-black",
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
  label = "Label",
  helperText,
  onChange,
  error,
  invalid,
  errorMessage,
}: DropdownProps) {
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | null>(defaultValue);
  const value = isControlled ? valueProp! : internalValue;

  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const listId = React.useId();
  const triggerId = id ?? `${listId}-trigger`;
  const helperId = `${listId}-helper`;
  const isError = Boolean(error || invalid || errorMessage);

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
      ? "text-muted"
      : "text-brand-black";

  const describedBy = errorMessage || helperText ? helperId : undefined;

  return (
    <Field
      label={label}
      htmlFor={triggerId}
      helperText={helperText}
      error={isError}
      errorMessage={errorMessage}
      disabled={disabled}
      helperId={helperId}
      className={`inline-block w-full min-w-field-sm max-w-field-sm ${className || ""}`}
    >
      <div ref={rootRef} className="relative">
        <button
          type="button"
          id={triggerId}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-invalid={isError || undefined}
          aria-describedby={describedBy}
          onClick={() => !disabled && setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
          className={[
            "flex min-h-11 w-full flex-col items-stretch overflow-hidden rounded-lg border border-line-field bg-field p-2 text-left",
            "touch-manipulation transition-colors duration-hover",
            disabled ? "cursor-not-allowed bg-disabled" : "cursor-pointer active:bg-secondary/10",
            isError && !disabled ? "border-line-error" : "",
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
              "absolute left-0 right-0 top-[calc(100%-1px)] z-10 flex flex-col shadow-ghibli-md will-change-transform origin-top transition-all duration-ui",
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
    </Field>
  );
}
