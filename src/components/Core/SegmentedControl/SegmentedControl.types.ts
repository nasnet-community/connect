import type { JSXNode, Signal, QRL } from "@builder.io/qwik";

export interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: JSXNode;
  disabled?: boolean;
  ariaLabel?: string;
}

export type SegmentedControlSize = "sm" | "md" | "lg";
export type SegmentedControlColor = "primary" | "secondary" | "neutral";

export interface SegmentedControlProps {
  value: Signal<string>;
  options: SegmentedControlOption[];
  onChange$?: QRL<(value: string) => void>;
  size?: SegmentedControlSize;
  color?: SegmentedControlColor;
  fullWidth?: boolean;
  disabled?: boolean;
  name?: string;
  label?: string;
  required?: boolean;
  class?: string;
  id?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}