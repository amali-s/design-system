import * as React from "react";

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  inputClassName?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { label = "Label", helperText = "Helper text", id, className, inputClassName, disabled, ...inputProps },
  ref,
) {
  const genId = React.useId();
  const inputId = id ?? genId;
  const helperId = `${inputId}-helper`;

  return (
    <div className={`flex w-full max-w-[240px] flex-col gap-2 ${className || ""}`}>
      <label htmlFor={inputId} className="font-sans text-xs font-light leading-[1.4] tracking-[-0.72px] text-brand-black">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        disabled={disabled}
        aria-describedby={helperText ? helperId : undefined}
        className={[
          "h-8 w-full rounded-lg border-0 bg-layer1 px-2 py-2 font-sans text-sm font-light leading-[1.5]",
          "text-brand-black placeholder:text-disabled",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
          disabled ? "cursor-not-allowed text-disabled placeholder:text-disabled/80" : "",
          inputClassName || "",
        ].join(" ")}
        {...inputProps}
      />
      {helperText ? (
        <p id={helperId} className="font-sans text-xs font-light leading-[1.4] tracking-[-0.72px] text-[#6c7275]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
