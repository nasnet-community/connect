import type { JSXChildren, QRL } from "@builder.io/qwik";

export type BadgeVariant = "solid" | "soft" | "outline";
export type BadgeSize = "sm" | "md" | "lg";
export type ResponsiveBadgeSize = BadgeSize | {
  mobile?: BadgeSize;
  tablet?: BadgeSize;
  desktop?: BadgeSize;
};
export type BadgeColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type BadgeShape = "square" | "rounded" | "pill";

export interface BadgeProps {
  children?: JSXChildren;
  variant?: BadgeVariant;
  size?: BadgeSize;
  color?: BadgeColor;
  shape?: BadgeShape;
  dismissible?: boolean;
  onDismiss$?: QRL<() => void>;
  dot?: boolean;
  dotPosition?: "start" | "end";
  bordered?: boolean;
  maxWidth?: string;
  truncate?: boolean;
  class?: string;
  id?: string;
  role?: string;
  hover?: boolean;
  disabled?: boolean;
  href?: string;
  target?: string;
  startIcon?: JSXChildren;
  endIcon?: JSXChildren;
  tooltip?: string;
}

export interface BadgeGroupProps {
  children?: JSXChildren;
  spacing?: "sm" | "md" | "lg";
  maxVisible?: number;
  wrap?: boolean;
  align?: "start" | "center" | "end";
  class?: string;
}
