import * as React from "react";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * Navigation anchor styled like Button ghost — not a second in-component action.
 * For actions (Card, Toast, Profile), use `Button variant="ghost"`.
 */
export function Link({ href, children, className, ...props }: LinkProps) {
  return (
    <a
      href={href}
      className={[
        "relative inline-flex items-center justify-center gap-2",
        "min-touch-target rounded-button px-3 py-2",
        "font-sans text-sm font-medium leading-none tracking-tight text-primary",
        "bg-transparent",
        "fine-hover:bg-interactive-ghostHover active:bg-interactive-ghostActive",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-focus focus-visible:ring-offset-1",
        "transition-colors duration-ui ease-standard",
        className || "",
      ].join(" ")}
      {...props}
    >
      {children}
    </a>
  );
}
