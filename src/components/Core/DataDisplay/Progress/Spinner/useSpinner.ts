import type { SpinnerProps } from "./Spinner.types";

export function useSpinner(props: SpinnerProps) {
  const {
    size = "md",
    color = "primary",
    variant = "border",
    speed = 1000,
    showLabel = false,
    label = "Loading...",
    labelPosition = "right",
    class: className = "",
    ariaLabel = "Loading",
    centered = false,
    labelClass = "",
  } = props;

  // Generate size classes for different variants
  const sizeClasses = {
    border: {
      inline: "h-3.5 w-3.5 border-2",
      xs: "h-4 w-4 border-2",
      sm: "h-5 w-5 border-2",
      md: "h-8 w-8 border-[3px]",
      lg: "h-12 w-12 border-4",
      xl: "h-16 w-16 border-4",
    },
    grow: {
      inline: "h-3.5 w-3.5",
      xs: "h-4 w-4",
      sm: "h-5 w-5",
      md: "h-8 w-8",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    },
    dots: {
      inline: "h-3.5",
      xs: "h-4",
      sm: "h-5",
      md: "h-8",
      lg: "h-12",
      xl: "h-16",
    },
    bars: {
      inline: "h-3.5",
      xs: "h-4",
      sm: "h-5",
      md: "h-8",
      lg: "h-12",
      xl: "h-16",
    },
    circle: {
      inline: "h-3.5 w-3.5",
      xs: "h-4 w-4",
      sm: "h-5 w-5",
      md: "h-8 w-8",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    },
  }[variant][size];

  // Generate color classes for different variants with proper dark mode support
  const colorClasses = {
    border: {
      primary:
        "border-primary-600 border-t-transparent dark:border-primary-dark-500 dark:border-t-transparent dim:border-primary-dark-400 dim:border-t-transparent",
      secondary:
        "border-secondary-600 border-t-transparent dark:border-secondary-dark-500 dark:border-t-transparent dim:border-secondary-dark-400 dim:border-t-transparent",
      success:
        "border-success-600 border-t-transparent dark:border-success-light dark:border-t-transparent dim:border-success-500 dim:border-t-transparent",
      warning:
        "border-warning-600 border-t-transparent dark:border-warning-light dark:border-t-transparent dim:border-warning-500 dim:border-t-transparent",
      error:
        "border-error-600 border-t-transparent dark:border-error-light dark:border-t-transparent dim:border-error-500 dim:border-t-transparent",
      info: "border-info-600 border-t-transparent dark:border-info-light dark:border-t-transparent dim:border-info-500 dim:border-t-transparent",
      white: "border-white border-t-transparent",
    },
    grow: {
      primary:
        "bg-primary-600 dark:bg-primary-dark-500 dim:bg-primary-dark-400",
      secondary:
        "bg-secondary-600 dark:bg-secondary-dark-500 dim:bg-secondary-dark-400",
      success: "bg-success-600 dark:bg-success-light dim:bg-success-500",
      warning: "bg-warning-600 dark:bg-warning-light dim:bg-warning-500",
      error: "bg-error-600 dark:bg-error-light dim:bg-error-500",
      info: "bg-info-600 dark:bg-info-light dim:bg-info-500",
      white:
        "bg-white dark:bg-surface-dark-elevated dim:bg-surface-dim-elevated",
    },
    dots: {
      primary:
        "text-primary-600 dark:text-primary-dark-500 dim:text-primary-dark-400",
      secondary:
        "text-secondary-600 dark:text-secondary-dark-500 dim:text-secondary-dark-400",
      success: "text-success-600 dark:text-success-light dim:text-success-500",
      warning: "text-warning-600 dark:text-warning-light dim:text-warning-500",
      error: "text-error-600 dark:text-error-light dim:text-error-500",
      info: "text-info-600 dark:text-info-light dim:text-info-500",
      white:
        "text-white dark:text-surface-dark-elevated dim:text-surface-dim-elevated",
    },
    bars: {
      primary:
        "text-primary-600 dark:text-primary-dark-500 dim:text-primary-dark-400",
      secondary:
        "text-secondary-600 dark:text-secondary-dark-500 dim:text-secondary-dark-400",
      success: "text-success-600 dark:text-success-light dim:text-success-500",
      warning: "text-warning-600 dark:text-warning-light dim:text-warning-500",
      error: "text-error-600 dark:text-error-light dim:text-error-500",
      info: "text-info-600 dark:text-info-light dim:text-info-500",
      white:
        "text-white dark:text-surface-dark-elevated dim:text-surface-dim-elevated",
    },
    circle: {
      primary:
        "text-primary-600 dark:text-primary-dark-500 dim:text-primary-dark-400",
      secondary:
        "text-secondary-600 dark:text-secondary-dark-500 dim:text-secondary-dark-400",
      success: "text-success-600 dark:text-success-light dim:text-success-500",
      warning: "text-warning-600 dark:text-warning-light dim:text-warning-500",
      error: "text-error-600 dark:text-error-light dim:text-error-500",
      info: "text-info-600 dark:text-info-light dim:text-info-500",
      white:
        "text-white dark:text-surface-dark-elevated dim:text-surface-dim-elevated",
    },
  }[variant][color];

  // Generate label position classes
  const labelPositionClasses = {
    top: "flex-col items-center",
    right: "flex-row items-center",
    bottom: "flex-col-reverse items-center",
    left: "flex-row-reverse items-center",
  }[labelPosition];

  // Generate label spacing classes based on position
  const labelSpacingClasses = {
    top: "mt-2",
    right: "ml-2",
    bottom: "mb-2",
    left: "mr-2",
  }[labelPosition];

  // Generate animation duration style
  const animationDuration = `${speed}ms`;

  // Generate centered class
  const centeredClass = centered ? "mx-auto" : "";

  // Generate default label color classes with proper dark mode support
  const defaultLabelClass =
    "text-gray-700 dark:text-gray-300 dim:text-gray-400";

  return {
    sizeClasses,
    colorClasses,
    labelPositionClasses,
    labelSpacingClasses,
    animationDuration,
    centeredClass,
    variant,
    showLabel,
    label,
    labelClass: labelClass || defaultLabelClass,
    className,
    ariaLabel,
    speed,
  };
}
