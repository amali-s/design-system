import * as React from "react";
import { formControlType } from "../../tokens/typography";
import { Field } from "./Field";

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  /** Marks the field invalid (error border + helper color). */
  error?: boolean;
  /** Alias of `error`. */
  invalid?: boolean;
  /** Replaces helper text when set. */
  errorMessage?: string;
  inputClassName?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    label = "Label",
    helperText = "Helper text",
    error,
    invalid,
    errorMessage,
    id,
    className,
    inputClassName,
    disabled,
    ...inputProps
  },
  ref,
) {
  const genId = React.useId();
  const inputId = id ?? genId;
  const helperId = `${inputId}-helper`;
  const isError = Boolean(error || invalid || errorMessage);
  const describedBy = errorMessage || helperText ? helperId : undefined;

  return (
    <Field
      label={label}
      htmlFor={inputId}
      helperText={helperText}
      error={isError}
      errorMessage={errorMessage}
      disabled={disabled}
      helperId={helperId}
      className={`w-full max-w-field-sm ${className || ""}`}
    >
      <input
        ref={ref}
        id={inputId}
        disabled={disabled}
        aria-invalid={isError || undefined}
        aria-describedby={describedBy}
        className={[
          "min-h-11 w-full rounded-lg border border-line-field bg-field px-2 py-2 font-body font-light leading-[1.5]",
          formControlType,
          "text-brand-black placeholder:text-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
          disabled ? "cursor-not-allowed bg-disabled text-textDisabled placeholder:text-textDisabled" : "",
          isError && !disabled ? "border-line-error" : "",
          inputClassName || "",
        ].join(" ")}
        {...inputProps}
      />
    </Field>
  );
});
