/**
 * Theme utility functions for Feedback components
 * Provides consistent color mapping and responsive styling
 */

export type FeedbackStatus = "info" | "success" | "warning" | "error";
export type FeedbackVariant = "solid" | "outline" | "subtle";
export type FeedbackSize = "sm" | "md" | "lg";

/**
 * Get theme-based colors for feedback components
 */
export function getStatusColors(
  status: FeedbackStatus,
  variant: FeedbackVariant = "solid",
): string {
  const colorMap = {
    solid: {
      info: "bg-info-100 text-info-800 border-info-200 dark:bg-info-900 dark:text-info-100 dark:border-info-700",
      success:
        "bg-success-100 text-success-800 border-success-200 dark:bg-success-900 dark:text-success-100 dark:border-success-700",
      warning:
        "bg-warning-100 text-warning-800 border-warning-200 dark:bg-warning-900 dark:text-warning-100 dark:border-warning-700",
      error:
        "bg-error-100 text-error-800 border-error-200 dark:bg-error-900 dark:text-error-100 dark:border-error-700",
    },
    outline: {
      info: "bg-transparent border-info-500 text-info-700 dark:border-info-400 dark:text-info-300",
      success:
        "bg-transparent border-success-500 text-success-700 dark:border-success-400 dark:text-success-300",
      warning:
        "bg-transparent border-warning-500 text-warning-700 dark:border-warning-400 dark:text-warning-300",
      error:
        "bg-transparent border-error-500 text-error-700 dark:border-error-400 dark:text-error-300",
    },
    subtle: {
      info: "bg-info-50 text-info-700 border-info-100 dark:bg-info-950 dark:text-info-300 dark:border-info-800",
      success:
        "bg-success-50 text-success-700 border-success-100 dark:bg-success-950 dark:text-success-300 dark:border-success-800",
      warning:
        "bg-warning-50 text-warning-700 border-warning-100 dark:bg-warning-950 dark:text-warning-300 dark:border-warning-800",
      error:
        "bg-error-50 text-error-700 border-error-100 dark:bg-error-950 dark:text-error-300 dark:border-error-800",
    },
  };

  return colorMap[variant][status];
}

/**
 * Get responsive size classes for feedback components
 */
export function getResponsiveSizeClasses(
  size: FeedbackSize,
  component: "alert" | "toast" | "dialog" | "drawer" = "alert",
): string {
  const sizeMap = {
    alert: {
      sm: "text-xs mobile:py-2 mobile:px-3 tablet:py-2.5 tablet:px-3.5 desktop:py-3 desktop:px-4",
      md: "text-sm mobile:py-3 mobile:px-4 tablet:py-3.5 tablet:px-4.5 desktop:py-4 desktop:px-5",
      lg: "text-base mobile:py-4 mobile:px-5 tablet:py-4.5 tablet:px-5.5 desktop:py-5 desktop:px-6",
    },
    toast: {
      sm: "text-xs mobile:p-2 tablet:p-2.5 desktop:p-3 mobile:max-w-[90vw] tablet:max-w-xs desktop:max-w-sm",
      md: "text-sm mobile:p-3 tablet:p-3.5 desktop:p-4 mobile:max-w-[90vw] tablet:max-w-sm desktop:max-w-md",
      lg: "text-base mobile:p-4 tablet:p-4.5 desktop:p-5 mobile:max-w-[90vw] tablet:max-w-md desktop:max-w-lg",
    },
    dialog: {
      sm: "mobile:max-w-full mobile:m-2 tablet:max-w-sm desktop:max-w-md",
      md: "mobile:max-w-full mobile:m-2 tablet:max-w-md desktop:max-w-lg",
      lg: "mobile:max-w-full mobile:m-2 tablet:max-w-lg desktop:max-w-xl",
    },
    drawer: {
      sm: "mobile:w-full tablet:w-80 desktop:w-96",
      md: "mobile:w-full tablet:w-96 desktop:w-[28rem]",
      lg: "mobile:w-full tablet:w-[28rem] desktop:w-[32rem]",
    },
  };

  return sizeMap[component][size];
}

/**
 * Get icon size classes based on component size
 */
export function getIconSizeClasses(size: FeedbackSize): string {
  return {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }[size];
}

/**
 * Get responsive font size classes
 */
export function getResponsiveFontSize(size: FeedbackSize): string {
  return {
    sm: "text-xs sm:text-sm",
    md: "text-sm sm:text-base",
    lg: "text-base sm:text-lg",
  }[size];
}

/**
 * Get touch-friendly button sizes
 */
export function getTouchTargetClasses(size: FeedbackSize = "md"): string {
  return {
    sm: "min-h-[36px] min-w-[36px] touch:min-h-[44px] touch:min-w-[44px]",
    md: "min-h-[40px] min-w-[40px] touch:min-h-[44px] touch:min-w-[44px]",
    lg: "min-h-[44px] min-w-[44px] touch:min-h-[48px] touch:min-w-[48px]",
  }[size];
}

/**
 * Get animation classes from theme
 */
export function getAnimationClasses(
  animation:
    | "fadeIn"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "scaleUp",
): string {
  return {
    fadeIn: "animate-fade-in",
    slideUp: "animate-slide-up",
    slideDown: "animate-slide-down",
    slideLeft: "animate-slide-left",
    slideRight: "animate-slide-right",
    scaleUp: "animate-scale-up",
  }[animation];
}

/**
 * Get mobile-specific animation classes for drawers
 */
export function getMobileDrawerAnimation(
  placement: "left" | "right" | "top" | "bottom",
  isVisible: boolean,
): string {
  if (!isVisible) {
    return {
      left: "-translate-x-full",
      right: "translate-x-full",
      top: "-translate-y-full",
      bottom: "translate-y-full",
    }[placement];
  }

  return "translate-x-0 translate-y-0";
}

/**
 * Get surface elevation classes
 */
export function getSurfaceElevation(
  elevation: "base" | "elevated" | "depressed",
  _theme: "light" | "dark" = "light",
): string {
  return {
    base: `bg-white dark:bg-gray-800`,
    elevated: `bg-white dark:bg-gray-800 shadow-lg dark:shadow-dark-lg`,
    depressed: `bg-gray-50 dark:bg-gray-900`,
  }[elevation];
}

/**
 * Get responsive spacing for mobile safe areas
 */
export function getSafeAreaClasses(position: "top" | "bottom" | "all"): string {
  switch (position) {
    case "top":
      return "pt-[env(safe-area-inset-top)]";
    case "bottom":
      return "pb-[env(safe-area-inset-bottom)]";
    case "all":
      return "p-[env(safe-area-inset-top)_env(safe-area-inset-right)_env(safe-area-inset-bottom)_env(safe-area-inset-left)]";
    default:
      return "";
  }
}

/**
 * Get backdrop blur classes
 */
export function getBackdropClasses(
  variant: "light" | "medium" | "heavy",
): string {
  return {
    light: "backdrop-blur-sm bg-black/30 dark:bg-black/50",
    medium: "backdrop-blur-md bg-black/50 dark:bg-black/70",
    heavy: "backdrop-blur-lg bg-black/70 dark:bg-black/90",
  }[variant];
}

/**
 * Combine classes conditionally
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
