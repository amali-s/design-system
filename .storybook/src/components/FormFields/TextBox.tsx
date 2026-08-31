import * as React from "react";
import { formControlType } from "../../tokens/typography";
import { Field } from "./Field";

export interface TextBoxProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  /** Marks the field invalid (error border + helper color). */
  error?: boolean;
  /** Alias of `error`. */
  invalid?: boolean;
  /** Replaces helper text when set. */
  errorMessage?: string;
  containerClassName?: string;
}

export const TextBox = React.forwardRef<HTMLTextAreaElement, TextBoxProps>(function TextBox(
  {
    label = "Text field title",
    helperText,
    error,
    invalid,
    errorMessage,
    id,
    className,
    containerClassName,
    disabled,
    rows = 3,
    ...textareaProps
  },
  ref,
) {
  const genId = React.useId();
  const boxId = id ?? genId;
  const helperId = `${boxId}-helper`;
  const isError = Boolean(error || invalid || errorMessage);
  const describedBy = errorMessage || helperText ? helperId : undefined;

  return (
    <Field
      label={label}
      htmlFor={boxId}
      helperText={helperText}
      error={isError}
      errorMessage={errorMessage}
      disabled={disabled}
      helperId={helperId}
      className={`w-full max-w-field-md ${containerClassName || ""}`}
    >
      <div
        className={[
          "rounded-lg border border-line-field bg-field p-2 min-h-11",
          !disabled ? "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-1" : "",
          disabled ? "cursor-not-allowed bg-disabled" : "",
          isError && !disabled ? "border-line-error" : "",
        ].join(" ")}
      >
        <textarea
          ref={ref}
          id={boxId}
          rows={rows}
          disabled={disabled}
          aria-invalid={isError || undefined}
          aria-describedby={describedBy}
          className={[
            "min-h-[40px] w-full resize-y bg-transparent font-body font-light leading-[1.5]",
            formControlType,
            "text-brand-black placeholder:text-muted",
            "focus-visible:outline-none",
            disabled ? "cursor-not-allowed text-textDisabled placeholder:text-textDisabled" : "",
            className || "",
          ].join(" ")}
          {...textareaProps}
        />
      </div>
    </Field>
  );
});
