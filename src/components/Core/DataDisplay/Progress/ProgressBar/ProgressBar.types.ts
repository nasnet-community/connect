import type { JSXChildren, QRL } from "@builder.io/qwik";

export type ProgressBarSize = "xs" | "sm" | "md" | "lg";
export type ProgressBarColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type ProgressBarVariant = "solid" | "gradient";
export type ProgressBarAnimation =
  | "none"
  | "pulse"
  | "striped"
  | "striped-animated";
export type ProgressBarShape = "flat" | "rounded" | "pill";

export interface ProgressBarProps {
  value?: number; // Optional when indeterminate is true
  size?: ProgressBarSize;
  color?: ProgressBarColor;
  variant?: ProgressBarVariant;
  shape?: ProgressBarShape;
  animation?: ProgressBarAnimation;
  showValue?: boolean;
  valuePosition?: "right" | "center" | "inside";
  valueFormat?: QRL<(value: number) => string>;
  indeterminate?: boolean;
  error?: boolean;
  children?: JSXChildren;
  class?: string;
  ariaLabel?: string;
  fullWidth?: boolean;
  max?: number;
  min?: number;
  buffer?: number;
  label?: string; // Added missing label property
}
