export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl" | "inline";
export type SpinnerColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "white";
export type SpinnerVariant = "border" | "grow" | "dots" | "bars" | "circle";

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  variant?: SpinnerVariant;
  speed?: number;
  showLabel?: boolean;
  label?: string;
  labelPosition?: "top" | "right" | "bottom" | "left";
  class?: string;
  ariaLabel?: string;
  centered?: boolean;
  labelClass?: string;
}
