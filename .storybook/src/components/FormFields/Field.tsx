import * as React from "react";

export interface FieldProps {
  label?: string;
  htmlFor?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  /** id for helper/error text — wire to the control as `aria-describedby` */
  helperId?: string;
}

/**
 * Shared label + helper + error chrome for TextInput, TextBox, Dropdown,
 * Checkbox, Radio, and Toggle.
 * Does not change the P0 control recipe (`border-line-field`, `bg-field`, `border-line-error`).
 */
export function Field({
  label,
  htmlFor,
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  children,
  className,
  helperId: helperIdProp,
}: FieldProps) {
  const genId = React.useId();
  const helperId = helperIdProp ?? `${genId}-helper`;
  const isError = Boolean(error || errorMessage);
  const supportText = isError && errorMessage ? errorMessage : helperText;

  return (
    <div className={`flex flex-col gap-2 ${className || ""}`}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className={[
            "font-body text-xs font-light leading-[1.4] tracking-[-0.72px]",
            disabled ? "text-textDisabled" : "text-brand-black",
          ].join(" ")}
        >
          {label}
        </label>
      ) : null}
      {children}
      {supportText ? (
        <p
          id={helperId}
          className={[
            "font-body text-xs font-light leading-[1.4] tracking-[-0.72px]",
            isError ? "text-error" : "text-muted",
          ].join(" ")}
        >
          {supportText}
        </p>
      ) : null}
    </div>
  );
}
