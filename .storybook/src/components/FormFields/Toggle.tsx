import * as React from "react";
import { Field } from "./Field";
import { usePressInteraction, type PressInteraction } from "../usePressInteraction";

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  preview?: PressInteraction;
}

/**
 * Switch — `role="switch"`. On = navy (`semantic.interactive`), off = field fill.
 */
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  {
    label,
    checked: checkedProp,
    defaultChecked,
    onCheckedChange,
    helperText,
    error,
    errorMessage,
    disabled,
    className,
    preview,
    id,
    ...buttonProps
  },
  ref,
) {
  const genId = React.useId();
  const buttonId = id ?? genId;
  const helperId = `${buttonId}-helper`;
  const isControlled = checkedProp !== undefined;
  const [internal, setInternal] = React.useState(Boolean(defaultChecked));
  const checked = isControlled ? Boolean(checkedProp) : internal;
  const isError = Boolean(error || errorMessage);

  const { interaction, pointerHandlers } = usePressInteraction<HTMLButtonElement>({
    disabled: disabled || Boolean(preview),
  });
  const hover = preview === "hover" || interaction === "hover" || interaction === "pressed";

  const toggle = () => {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };

  const track = (
    <span className="inline-flex min-h-11 items-center gap-3">
      <button
        ref={ref}
        id={buttonId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label ? undefined : "Toggle"}
        disabled={disabled}
        aria-invalid={isError || undefined}
        aria-describedby={helperText || errorMessage ? helperId : undefined}
        {...buttonProps}
        onClick={(e) => {
          buttonProps.onClick?.(e);
          toggle();
        }}
        className={[
          "inline-flex h-6 w-11 shrink-0 items-center overflow-hidden rounded-full border p-px",
          "touch-manipulation appearance-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
          disabled
            ? "cursor-not-allowed border-line-field bg-disabled"
            : checked
              ? "border-primary bg-primary"
              : ["border-line-field bg-field", hover ? "border-line-strong" : ""].join(" "),
          isError && !disabled && !checked ? "border-line-error" : "",
        ].join(" ")}
        {...(disabled ? {} : pointerHandlers)}
      >
        <span
          className={[
            "block size-[18px] shrink-0 rounded-full shadow-ghibli-sm transition-transform duration-ui ease-standard",
            disabled
              ? "bg-textDisabled"
              : checked
                ? "bg-[var(--sage-on-interactive)]"
                : "bg-primary",
            // 44px track − 2px border − 2px padding − 18px thumb = 22px travel
            checked ? "translate-x-[22px]" : "translate-x-0",
          ].join(" ")}
          aria-hidden
        />
      </button>
      {label ? (
        <label
          htmlFor={buttonId}
          className={[
            "font-body text-xs font-light leading-[1.4] tracking-[-0.72px]",
            disabled ? "cursor-not-allowed text-textDisabled" : "cursor-pointer text-brand-black",
          ].join(" ")}
        >
          {label}
        </label>
      ) : null}
    </span>
  );

  if (!helperText && !errorMessage) {
    return <span className={className}>{track}</span>;
  }

  return (
    <Field
      helperText={helperText}
      error={isError}
      errorMessage={errorMessage}
      disabled={disabled}
      helperId={helperId}
      className={className}
    >
      {track}
    </Field>
  );
});
