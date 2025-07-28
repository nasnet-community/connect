import type { JSXChildren } from "@builder.io/qwik";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerThickness = "thin" | "medium" | "thick";
export type DividerVariant = "solid" | "dashed" | "dotted";
export type DividerColor = "default" | "primary" | "secondary" | "muted";
export type DividerSpacing = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type DividerLabelPosition = "start" | "center" | "end";

export interface DividerProps {
  orientation?: DividerOrientation;
  thickness?: DividerThickness;
  variant?: DividerVariant;
  color?: DividerColor;
  label?: JSXChildren;
  labelPosition?: DividerLabelPosition;
  spacing?: DividerSpacing;
  class?: string;
  role?: string;
}
