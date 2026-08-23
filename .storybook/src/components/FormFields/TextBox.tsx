import * as React from "react";
import { formControlType } from "../../tokens/typography";

export interface TextBoxProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  containerClassName?: string;
}

export const TextBox = React.forwardRef<HTMLTextAreaElement, TextBoxProps>(function TextBox(
  {
    label = "Text field title",
    helperText,
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

  return (
    <div className={`flex w-full max-w-[314px] flex-col gap-2 ${containerClassName || ""}`}>
      <label htmlFor={boxId} className="font-body text-sm font-light leading-[1.5] text-[#6c7275]">
        {label}
      </label>
      <div
        className={[
          "rounded-lg border-0 bg-layer1 p-2",
          !disabled ? "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-1" : "",
        ].join(" ")}
      >
        <textarea
          ref={ref}
          id={boxId}
          rows={rows}
          disabled={disabled}
          aria-describedby={helperText ? helperId : undefined}
          className={[
            "min-h-[40px] w-full resize-y bg-transparent font-body font-light leading-[1.5]",
            formControlType,
            "text-brand-black placeholder:text-[#6c7275]",
            "focus-visible:outline-none",
            disabled ? "cursor-not-allowed text-[#ADABA5] placeholder:text-[#ADABA5]/80" : "",
            className || "",
          ].join(" ")}
          {...textareaProps}
        />
      </div>
      {helperText ? (
        <p id={helperId} className="font-body text-xs font-light leading-[1.4] tracking-[-0.72px] text-[#6c7275]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
