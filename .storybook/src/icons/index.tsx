import * as React from "react";
import { colors } from "../tokens/colors";

export type IconSize = 16 | 20 | 24;

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "width" | "height"> {
  size?: IconSize;
  className?: string;
}

/** Visual stroke ~1.5px at 16; scales so cap/join stay consistent in a 24 viewBox. */
function strokeWidth(size: IconSize) {
  const visual = size === 16 ? 1.5 : size === 20 ? 1.6 : 1.75;
  return visual * (24 / size);
}

function IconShell({
  size = 16,
  className,
  children,
  ...rest
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth(size)}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
}

export function Copy({ size = 16, className, ...rest }: IconProps) {
  return (
    <IconShell size={size} className={className} {...rest}>
      <rect x="8" y="8" width="11" height="11" rx="1.5" />
      <path d="M16 8V6.5A1.5 1.5 0 0 0 14.5 5h-9A1.5 1.5 0 0 0 4 6.5v9A1.5 1.5 0 0 0 5.5 17H8" />
    </IconShell>
  );
}

export function Chevron({ size = 16, className, ...rest }: IconProps) {
  return (
    <IconShell size={size} className={className} {...rest}>
      <path d="M6 9L12 15L18 9" />
    </IconShell>
  );
}

export function Plus({ size = 16, className, ...rest }: IconProps) {
  return (
    <IconShell size={size} className={className} {...rest}>
      <path d="M12 5V19M5 12H19" />
    </IconShell>
  );
}

export function Heart({
  size = 16,
  filled = false,
  className,
  ...rest
}: IconProps & { filled?: boolean }) {
  return (
    <IconShell size={size} className={className} fill={filled ? "currentColor" : "none"} {...rest}>
      <path d="M12 20s-7-4.35-7-9.15C5 7.6 7.15 6 9.2 6c1.45 0 2.7.75 2.8 1.9C12.1 6.75 13.35 6 14.8 6 16.85 6 19 7.6 19 10.85 19 15.65 12 20 12 20z" />
    </IconShell>
  );
}

export function Close({ size = 16, className, ...rest }: IconProps) {
  return (
    <IconShell size={size} className={className} {...rest}>
      <path d="M6 6L18 18M18 6L6 18" />
    </IconShell>
  );
}

export function Check({ size = 16, className, ...rest }: IconProps) {
  return (
    <IconShell size={size} className={className} {...rest}>
      <path d="M5 12.5L10 17.5L19 7" />
    </IconShell>
  );
}

/** Always cream glyph on a token-colored fill — not a theme-remapped white. */
const STATUS_GLYPH = colors.brand.white;

export function StatusInfo({ size = 16, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...rest}
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <rect x="11" y="10.5" width="2" height="7" rx="0.75" fill={STATUS_GLYPH} />
      <circle cx="12" cy="7.5" r="1.25" fill={STATUS_GLYPH} />
    </svg>
  );
}

export function StatusSuccess({ size = 16, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...rest}
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M7 12.5L10.5 16L17 8.5"
        stroke={STATUS_GLYPH}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StatusError({ size = 16, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...rest}
    >
      <path d="M12 3.5L22 20.5H2L12 3.5Z" fill="currentColor" />
      <rect x="11" y="9" width="2" height="6" rx="0.75" fill={STATUS_GLYPH} />
      <circle cx="12" cy="17.5" r="1.15" fill={STATUS_GLYPH} />
    </svg>
  );
}

export const icons = {
  Copy,
  Chevron,
  Plus,
  Heart,
  Close,
  Check,
  StatusInfo,
  StatusSuccess,
  StatusError,
} as const;
