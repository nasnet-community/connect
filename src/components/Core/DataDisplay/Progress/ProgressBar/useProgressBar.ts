import type { ProgressBarProps } from "./ProgressBar.types";

export interface UseProgressBarParams
  extends Omit<ProgressBarProps, "children"> {}

export type UseProgressBarReturn = {
  normalizedValue: number;
  normalizedBuffer?: number;
  formattedValue: string;
  heightClasses: string;
  bgColorClasses: string;
  bufferColorClasses: string;
  variantClasses: string;
  shapeClasses: string;
  animationClasses: string;
  valueLabelClasses: string;
  valueLabelSizeClasses: string;
  min: number;
  max: number;
  value: number;
  indeterminate: boolean;
  showValue: boolean;
  valuePosition: "right" | "center" | "inside";
  fullWidth: boolean;
  className: string;
  ariaLabel?: string;
};

export function useProgressBar(
  params: UseProgressBarParams,
): UseProgressBarReturn {
  const {
    value = 0,
    min = 0,
    max = 100,
    size = "md",
    color = "primary",
    variant = "solid",
    shape = "rounded",
    animation = "none",
    showValue = false,
    valuePosition = "right",
    valueFormat,
    indeterminate = false,
    fullWidth = false,
    class: className = "",
    ariaLabel,
    buffer,
  } = params;

  // Normalized value (0-100 percentage)
  const clampedValue = Math.min(Math.max(value, min), max);
  const normalizedValue = ((clampedValue - min) / (max - min)) * 100;

  // Normalized buffer (0-100 percentage) if buffer is provided
  const normalizedBuffer =
    buffer !== undefined
      ? (() => {
          const clampedBuffer = Math.min(Math.max(buffer, min), max);
          return ((clampedBuffer - min) / (max - min)) * 100;
        })()
      : undefined;

  // Formatted value for display
  const formattedValue = (() => {
    if (valueFormat) {
      // Handle QRL function call properly
      const result = valueFormat(value);
      return typeof result === "string"
        ? result
        : `${Math.round(((value - min) / (max - min)) * 100)}%`;
    }
    return `${Math.round(((value - min) / (max - min)) * 100)}%`;
  })();

  // Height classes based on size
  const heightMap = {
    xs: "h-1",
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };
  const heightClasses = heightMap[size] || heightMap.md;

  // Background color classes with proper dark mode support
  const bgColorClasses =
    "bg-surface-light-quaternary dark:bg-surface-dark-secondary dim:bg-surface-dim-secondary";

  // Buffer color classes (lighter version of main color) with proper dark mode support
  const bufferColorMap = {
    primary: "bg-primary-200 dark:bg-primary-dark-200 dim:bg-primary-dark-300",
    secondary:
      "bg-secondary-200 dark:bg-secondary-dark-200 dim:bg-secondary-dark-300",
    success: "bg-success-200 dark:bg-success-dark dim:bg-success-700",
    warning: "bg-warning-200 dark:bg-warning-dark dim:bg-warning-700",
    error: "bg-error-200 dark:bg-error-dark dim:bg-error-700",
    info: "bg-info-200 dark:bg-info-dark dim:bg-info-700",
  };
  const bufferColorClasses = bufferColorMap[color] || bufferColorMap.primary;

  // Variant classes (main progress bar color) with proper dark mode support
  const variantColorMap = {
    primary: "bg-primary-500 dark:bg-primary-dark-500 dim:bg-primary-dark-400",
    secondary:
      "bg-secondary-500 dark:bg-secondary-dark-500 dim:bg-secondary-dark-400",
    success: "bg-success-500 dark:bg-success-light dim:bg-success-400",
    warning: "bg-warning-500 dark:bg-warning-light dim:bg-warning-400",
    error: "bg-error-500 dark:bg-error-light dim:bg-error-400",
    info: "bg-info-500 dark:bg-info-light dim:bg-info-400",
  };
  const baseVariantClass = variantColorMap[color] || variantColorMap.primary;

  const variantClasses =
    variant === "gradient"
      ? `bg-gradient-to-r ${baseVariantClass.replace(/bg-/g, "from-")} ${baseVariantClass.replace(/bg-/g, "to-").replace(/500|light|400/g, (match) => (match === "500" ? "600" : match === "light" ? "400" : "500"))}`
      : baseVariantClass;

  // Shape classes
  const shapeMap = {
    flat: "",
    rounded: "rounded",
    pill: "rounded-full",
  };
  const shapeClasses = shapeMap[shape] || shapeMap.rounded;

  // Animation classes
  const animationMap = {
    none: "",
    pulse: "animate-pulse",
    striped: "bg-stripes",
    "striped-animated": "bg-stripes animate-stripes",
  };
  const animationClasses = indeterminate
    ? "animate-indeterminate"
    : animationMap[animation] || "";

  // Value label classes with proper dark mode support
  const valueLabelClasses =
    "text-sm font-medium text-gray-700 dark:text-gray-300 dim:text-gray-400";
  const valueLabelSizeClasses = "";

  return {
    normalizedValue,
    normalizedBuffer,
    formattedValue,
    heightClasses,
    bgColorClasses,
    bufferColorClasses,
    variantClasses,
    shapeClasses,
    animationClasses,
    valueLabelClasses,
    valueLabelSizeClasses,
    min,
    max,
    value,
    indeterminate,
    showValue: showValue || false,
    valuePosition: valuePosition || "right",
    fullWidth: fullWidth || false,
    className: className || "",
    ariaLabel,
  };
}
