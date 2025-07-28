import type { QRL } from "@builder.io/qwik";

export type StatSize = "sm" | "md" | "lg";
export type StatVariant = "default" | "bordered" | "elevated";
export type TrendDirection = "up" | "down" | "neutral";
export type StatAlign = "left" | "center" | "right";

export interface StatProps {
  size?: StatSize;
  variant?: StatVariant;
  align?: StatAlign;
  loading?: boolean;
  animate?: boolean;
  class?: string;
}

export interface StatNumberProps {
  value: number | string;
  format?: "number" | "currency" | "percent" | "custom";
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  currency?: string;
  animate?: boolean;
  animationDuration?: number;
  class?: string;
}

export interface StatLabelProps {
  secondary?: boolean;
  class?: string;
}

export interface StatIconProps {
  position?: "left" | "right" | "top";
  size?: StatSize;
  class?: string;
}

export interface StatTrendProps {
  value: number;
  direction?: TrendDirection;
  showIcon?: boolean;
  format?: "percent" | "number";
  decimals?: number;
  label?: string;
  class?: string;
}

export interface StatGroupProps {
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "sm" | "md" | "lg";
  responsive?: boolean;
  class?: string;
}

export interface StatAnimationOptions {
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  delay?: number;
}

export interface UseStatOptions {
  format?: StatNumberProps["format"];
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  currency?: string;
  animate?: boolean;
  animationDuration?: number;
  onAnimationComplete$?: QRL<() => void>;
}

export interface UseStatGroupOptions {
  columns?: StatGroupProps["columns"];
  gap?: StatGroupProps["gap"];
  responsive?: boolean;
}
