import { useSignal, $ } from "@builder.io/qwik";
import type { Signal, QRL } from "@builder.io/qwik";
import type { CardProps } from "../Card.types";

// Define size type to match the object keys
export type CardSize = "sm" | "md" | "lg" | "xl";

export interface UseCardParams extends Partial<CardProps> {
  size?: CardSize;
  bordered?: boolean;
  hoverable?: boolean;
  selected?: boolean;
  clickable?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  mobileOptimized?: boolean;
  touchFeedback?: boolean;
}

export interface UseCardReturn {
  isHovered: Signal<boolean>;
  isPressed: Signal<boolean>;
  handleMouseEnter$: QRL<() => void>;
  handleMouseLeave$: QRL<() => void>;
  handleClick$: QRL<(e: MouseEvent) => void>;
  handleTouchStart$: QRL<() => void>;
  handleTouchEnd$: QRL<() => void>;
  cardClasses: string;
}

export function useCard(params: UseCardParams, className = ""): UseCardReturn {
  const {
    variant = "default",
    size = "md",
    bordered = false,
    hoverable = params.hoverEffect !== "none" &&
      params.hoverEffect !== undefined,
    disabled = false,
    selected = false,
    clickable = params.interactive || false,
    rounded = params.radius || "md",
    elevation,
    mobileOptimized = true,
    touchFeedback = true,
  } = params;

  // State for hover and touch effects
  const isHovered = useSignal(false);
  const isPressed = useSignal(false);

  // Mouse event handlers
  const handleMouseEnter$ = $(() => {
    if (!disabled && (hoverable || clickable)) {
      isHovered.value = true;
    }
  });

  const handleMouseLeave$ = $(() => {
    if (!disabled && (hoverable || clickable)) {
      isHovered.value = false;
    }
  });

  const handleClick$ = $((e: MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  // Touch event handlers for mobile feedback
  const handleTouchStart$ = $(() => {
    if (!disabled && touchFeedback && (hoverable || clickable)) {
      isPressed.value = true;
    }
  });

  const handleTouchEnd$ = $(() => {
    if (!disabled && touchFeedback && (hoverable || clickable)) {
      isPressed.value = false;
    }
  });

  // Base classes
  const baseClasses = [
    "relative",
    "overflow-hidden",
    "transition-all",
    "duration-200",
    // Mobile safe area padding
    mobileOptimized ? "pb-safe-bottom" : "",
  ];

  // Size classes with mobile adjustments
  const sizeMap: Record<CardSize, string> = {
    sm: "p-3 mobile:p-2",
    md: "p-4 mobile:p-3",
    lg: "p-5 mobile:p-4",
    xl: "p-6 mobile:p-5",
  };
  const sizeClasses = sizeMap[size];

  // Border radius classes
  const roundedMap: Record<string, string> = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };
  const roundedClasses = roundedMap[rounded];

  // Variant classes
  const variantMap: Record<string, string> = {
    default: "bg-white dark:bg-gray-800",
    outlined: "bg-transparent",
    filled: "bg-gray-100 dark:bg-gray-900",
  };
  const variantClasses = variantMap[variant];

  // Mobile-optimized elevation classes
  const elevationMap: Record<string, string> = {
    none: "",
    xs: "shadow-xs mobile:shadow-mobile-card",
    sm: "shadow-sm mobile:shadow-mobile-card",
    md: "shadow-md mobile:shadow-mobile-card",
    lg: "shadow-lg mobile:shadow-mobile-card",
    xl: "shadow-xl mobile:shadow-mobile-card",
  };
  const elevationClasses = elevation ? elevationMap[elevation] || "" : "";

  // Border classes
  const borderClasses =
    bordered || variant === "outlined"
      ? "border border-gray-200 dark:border-gray-700"
      : "";

  // Hover classes with touch device considerations
  const hoverClasses =
    hoverable && !disabled
      ? "can-hover:hover:shadow-md dark:can-hover:hover:shadow-gray-900/30"
      : "";

  // Selected state
  const selectedClasses = selected
    ? "ring-2 ring-primary-500 dark:ring-primary-400"
    : "";

  // Disabled state
  const disabledClasses = disabled ? "opacity-60 cursor-not-allowed" : "";

  // Clickable state with mobile touch support
  const clickableClasses =
    clickable && !disabled
      ? [
          "cursor-pointer",
          "can-hover:hover:shadow-md dark:can-hover:hover:shadow-gray-900/30",
          "touch:active:scale-[0.98]",
          touchFeedback ? "touch:animate-press" : "",
        ]
          .filter(Boolean)
          .join(" ")
      : "";

  // Mobile animation classes
  const mobileAnimationClasses = mobileOptimized
    ? [
        "animate-fade-in",
        "motion-safe:animate-slide-up",
        isPressed.value && touchFeedback ? "animate-press" : "",
      ]
        .filter(Boolean)
        .join(" ")
    : "";

  // Combine all classes
  const cardClasses = [
    ...baseClasses,
    sizeClasses,
    roundedClasses,
    variantClasses,
    elevationClasses,
    borderClasses,
    hoverClasses,
    selectedClasses,
    disabledClasses,
    clickableClasses,
    mobileAnimationClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    isHovered,
    isPressed,
    handleMouseEnter$,
    handleMouseLeave$,
    handleClick$,
    handleTouchStart$,
    handleTouchEnd$,
    cardClasses,
  };
}
