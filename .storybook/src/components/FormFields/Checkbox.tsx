import * as React from "react";
import { Check } from "../../icons";
import { Field } from "./Field";
import { usePressInteraction, type PressInteraction } from "../usePressInteraction";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  helperText?: string;
  error?: boolean;
  invalid?: boolean;
  errorMessage?: string;
  /** Story snapshot pin. */
  preview?: PressInteraction;
}

function boxClass(checked: boolean, disabled: boolean, error: boolean, hover: boolean) {
  if (disabled) {
    return "border-line-field bg-disabled text-textDisabled";
  }
  if (error) {
    return checked
      ? "border-line-error bg-primary text-[var(--sage-on-interactive)]"
      : "border-line-error bg-field";
  }
  if (checked) {
    return "border-primary bg-primary text-[var(--sage-on-interactive)]";
  }
  return [
    "border-line-field bg-field",
    hover ? "border-line-strong" : "",
  ].join(" ");
}

/**
 * Checkbox — selected fill is navy (`semantic.interactive`), not cyan.
 * Native input is visually hidden; 44px hit area on the label row.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label,
    helperText,
    error,
    invalid,
    errorMessage,
    id,
    className,
    disabled,
    checked: checkedProp,
    defaultChecked,
    onChange,
    preview,
    ...inputProps
  },
  ref,
) {
  const genId = React.useId();
  const inputId = id ?? genId;
  const helperId = `${inputId}-helper`;
  const isError = Boolean(error || invalid || errorMessage);
  const isControlled = checkedProp !== undefined;
  const [internal, setInternal] = React.useState(Boolean(defaultChecked));
  const checked = isControlled ? Boolean(checkedProp) : internal;

  const { interaction, pointerHandlers } = usePressInteraction<HTMLLabelElement>({
    disabled: disabled || Boolean(preview),
    capture: false,
  });
  const hover = preview === "hover" || interaction === "hover" || interaction === "pressed";

  const control = (
    <label
      htmlFor={inputId}
      className={[
        "inline-flex min-h-11 cursor-pointer items-center gap-3",
        disabled ? "cursor-not-allowed" : "",
        className || "",
      ].join(" ")}
      {...(disabled ? {} : pointerHandlers)}
    >
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className="sr-only"
        disabled={disabled}
        checked={isControlled ? checked : undefined}
        defaultChecked={isControlled ? undefined : defaultChecked}
        aria-invalid={isError || undefined}
        aria-describedby={helperText || errorMessage ? helperId : undefined}
        onChange={(e) => {
          if (!isControlled) setInternal(e.target.checked);
          onChange?.(e);
        }}
        {...inputProps}
      />
      <span
        className={[
          "inline-flex size-5 shrink-0 items-center justify-center rounded border",
          boxClass(checked, Boolean(disabled), isError && !disabled, hover && !disabled),
        ].join(" ")}
        aria-hidden
      >
        {checked ? <Check size={16} /> : null}
      </span>
      {label ? (
        <span
          className={[
            "font-body text-xs font-light leading-[1.4] tracking-[-0.72px]",
            disabled ? "text-textDisabled" : "text-brand-black",
          ].join(" ")}
        >
          {label}
        </span>
      ) : null}
    </label>
  );

  if (!helperText && !errorMessage && !label) {
    return control;
  }

  const showField = helperText || errorMessage;
  if (!showField) return control;

  return (
    <Field
      helperText={helperText}
      error={isError}
      errorMessage={errorMessage}
      disabled={disabled}
      helperId={helperId}
    >
      {control}
    </Field>
  );
});
