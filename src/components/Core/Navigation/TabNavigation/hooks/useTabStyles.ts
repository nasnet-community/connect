import type { TabSize, TabVariant } from "../TabNavigation.types";

export interface UseTabStylesProps {
  size: TabSize;
  variant: TabVariant;
  align: "left" | "center" | "right";
  fullWidth: boolean;
  animated: boolean;
}

export function useTabStyles({
  size,
  variant,
  align,
  fullWidth,
  animated,
}: UseTabStylesProps) {
  // Tab size classes with responsive adjustments
  const sizeClasses: Record<
    TabSize,
    {
      tab: string;
      icon: string;
      count: string;
    }
  > = {
    sm: {
      tab: "px-2 py-1 text-xs mobile:px-1.5 mobile:py-1 tablet:px-2 tablet:py-1",
      icon: "h-3.5 w-3.5 mr-1 mobile:h-3 mobile:w-3 mobile:mr-0.5",
      count: "ml-1 text-xs mobile:ml-0.5 mobile:text-2xs",
    },
    md: {
      tab: "px-3 py-2 text-sm mobile:px-2 mobile:py-1.5 tablet:px-3 tablet:py-2",
      icon: "h-4 w-4 mr-1.5 mobile:h-3.5 mobile:w-3.5 mobile:mr-1",
      count: "ml-1.5 text-xs mobile:ml-1",
    },
    lg: {
      tab: "px-4 py-3 text-base mobile:px-3 mobile:py-2 mobile:text-sm tablet:px-4 tablet:py-3 tablet:text-base",
      icon: "h-5 w-5 mr-2 mobile:h-4 mobile:w-4 mobile:mr-1.5",
      count: "ml-2 text-sm mobile:ml-1.5 mobile:text-xs",
    },
  };

  // Variant-specific styles
  const variantClasses: Record<
    TabVariant,
    {
      container: string;
      list: string;
      tab: {
        base: string;
        active: string;
        inactive: string;
        disabled: string;
      };
    }
  > = {
    underline: {
      container: "border-b border-border dark:border-border-dark",
      list: "-mb-px flex",
      tab: {
        base: "inline-block border-b-2 font-medium transition-colors",
        active:
          "border-primary-500 text-primary-600 dark:border-primary-500 dark:text-primary-500",
        inactive:
          "border-transparent text-text-secondary hover:border-border hover:text-text-primary dark:text-text-dark-secondary dark:hover:border-border-dark dark:hover:text-text-dark-primary",
        disabled:
          "border-transparent text-text-disabled cursor-not-allowed dark:text-text-dark-disabled",
      },
    },
    pills: {
      container: "",
      list: "flex gap-1",
      tab: {
        base: "inline-block rounded-full font-medium transition-colors",
        active: "bg-primary-500 text-white dark:bg-primary-600",
        inactive:
          "bg-surface-secondary text-text-secondary hover:bg-surface-secondary-hover hover:text-text-primary dark:bg-surface-dark-secondary dark:text-text-dark-secondary dark:hover:bg-surface-dark-secondary-hover dark:hover:text-text-dark-primary",
        disabled:
          "bg-surface-disabled text-text-disabled cursor-not-allowed dark:bg-surface-dark-disabled dark:text-text-dark-disabled",
      },
    },
    boxed: {
      container: "border-b border-border dark:border-border-dark",
      list: "flex",
      tab: {
        base: "inline-block rounded-t-lg font-medium transition-colors border border-b-0",
        active:
          "border-border bg-surface-primary text-text-primary dark:border-border-dark dark:bg-surface-dark-primary dark:text-text-dark-primary",
        inactive:
          "border-transparent bg-surface-secondary text-text-secondary hover:bg-surface-secondary-hover hover:text-text-primary dark:bg-surface-dark-secondary dark:text-text-dark-secondary dark:hover:bg-surface-dark-secondary-hover dark:hover:text-text-dark-primary",
        disabled:
          "border-transparent bg-surface-disabled text-text-disabled cursor-not-allowed dark:bg-surface-dark-disabled dark:text-text-dark-disabled",
      },
    },
    minimal: {
      container: "",
      list: "flex gap-1",
      tab: {
        base: "inline-block font-medium transition-colors",
        active: "text-primary-600 dark:text-primary-500",
        inactive:
          "text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary",
        disabled:
          "text-text-disabled cursor-not-allowed dark:text-text-dark-disabled",
      },
    },
  };

  // Alignment classes
  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  // Animation classes
  const animationClass = animated ? "transition-all duration-200" : "";

  // Full width class
  const widthClass = fullWidth ? "w-full" : "";

  // Use the variables to avoid unused variable errors
  const currentSizeClass = sizeClasses[size];
  const currentVariantClass = variantClasses[variant];
  const currentAlignClass = alignClasses[align];

  return {
    sizeClasses,
    variantClasses,
    alignClasses,
    animationClass,
    widthClass,
    // Return these so they're explicitly used
    currentSizeClass,
    currentVariantClass,
    currentAlignClass,
  };
}
