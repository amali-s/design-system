import * as React from "react";
import { Field } from "./Field";
import { usePressInteraction, type PressInteraction } from "../usePressInteraction";

type RadioGroupContextValue = {
  name: string;
  value?: string;
  disabled?: boolean;
  error?: boolean;
  onChange?: (value: string) => void;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  label?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Radio group — native radios share `name` so arrow keys move selection.
 */
export function RadioGroup({
  name: nameProp,
  value: valueProp,
  defaultValue,
  onChange,
  disabled,
  error,
  errorMessage,
  helperText,
  label,
  children,
  className,
}: RadioGroupProps) {
  const genId = React.useId();
  const name = nameProp ?? genId;
  const helperId = `${name}-helper`;
  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const value = isControlled ? valueProp : internal;
  const isError = Boolean(error || errorMessage);

  const commit = (next: string) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <Field
      label={label}
      helperText={helperText}
      error={isError}
      errorMessage={errorMessage}
      disabled={disabled}
      helperId={helperId}
      className={className}
    >
      <RadioGroupContext.Provider value={{ name, value, disabled, error: isError, onChange: commit }}>
        <div role="radiogroup" className="flex flex-col">
          {children}
        </div>
      </RadioGroupContext.Provider>
    </Field>
  );
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: string;
  value: string;
  preview?: PressInteraction;
}

function radioBoxClass(checked: boolean, disabled: boolean, error: boolean, hover: boolean) {
  if (disabled) return "border-line-field bg-disabled";
  if (error) return checked ? "border-line-error bg-primary" : "border-line-error bg-field";
  if (checked) return "border-primary bg-primary";
  return ["border-line-field bg-field", hover ? "border-line-strong" : ""].join(" ");
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, value, id, className, disabled, preview, name: nameProp, checked: checkedProp, onChange, ...inputProps },
  ref,
) {
  const ctx = React.useContext(RadioGroupContext);
  const genId = React.useId();
  const inputId = id ?? genId;
  const name = nameProp ?? ctx?.name;
  const isDisabled = disabled || ctx?.disabled;
  const isError = Boolean(ctx?.error);
  const checked = checkedProp ?? (ctx ? ctx.value === value : undefined);

  const { interaction, pointerHandlers } = usePressInteraction<HTMLLabelElement>({
    disabled: isDisabled || Boolean(preview),
    capture: false,
  });
  const hover = preview === "hover" || interaction === "hover" || interaction === "pressed";

  return (
    <label
      htmlFor={inputId}
      className={[
        "inline-flex min-h-11 cursor-pointer items-center gap-3",
        isDisabled ? "cursor-not-allowed" : "",
        className || "",
      ].join(" ")}
      {...(isDisabled ? {} : pointerHandlers)}
    >
      <input
        ref={ref}
        id={inputId}
        type="radio"
        className="sr-only"
        name={name}
        value={value}
        disabled={isDisabled}
        checked={checked}
        aria-invalid={isError || undefined}
        onChange={(e) => {
          ctx?.onChange?.(value);
          onChange?.(e);
        }}
        {...inputProps}
      />
      <span
        className={[
          "inline-flex size-5 shrink-0 items-center justify-center rounded-full border",
          radioBoxClass(Boolean(checked), Boolean(isDisabled), isError && !isDisabled, hover && !isDisabled),
        ].join(" ")}
        aria-hidden
      >
        {checked ? (
          <span className="size-2 rounded-full bg-[var(--sage-on-interactive)]" />
        ) : null}
      </span>
      <span
        className={[
          "font-body text-xs font-light leading-[1.4] tracking-[-0.72px]",
          isDisabled ? "text-textDisabled" : "text-brand-black",
        ].join(" ")}
      >
        {label}
      </span>
    </label>
  );
});
