import { useSignal, $ } from "@builder.io/qwik";
import type { Signal, QRL } from "@builder.io/qwik";
import type { BadgeProps } from "../Badge.types";

export interface UseBadgeReturn {
  visible: Signal<boolean>;
  handleClose$: QRL<(event: MouseEvent) => void>;
  badgeClasses: string;
  handleDismiss$: QRL<() => void>;
  classes: string;
  dotClasses: string;
}

export function useBadge(params: BadgeProps, className = ""): UseBadgeReturn {
  const {
    size = "md",
    variant = "solid",
    color = "default",
    disabled = false,
    onDismiss$,
    dismissible = false,
    shape = "rounded",
    bordered = false,
    hover = false,
  } = params;

  // Visibility state
  const visible = useSignal(true);

  // Handle dismiss button click
  const handleDismiss$ = $(() => {
    if (onDismiss$) {
      onDismiss$();
    }
  });

  // Handle close event
  const handleClose$ = $((event: MouseEvent) => {
    event.stopPropagation();
    if (!disabled) {
      visible.value = false;
    }
  });

  // Determine badge classes based on props
  const colorMap = {
    solid: {
      default: "bg-gray-500 text-white",
      primary: "bg-primary-500 text-white",
      secondary: "bg-secondary-500 text-white",
      info: "bg-blue-500 text-white",
      success: "bg-green-500 text-white",
      warning: "bg-yellow-500 text-white",
      error: "bg-red-500 text-white",
    },
    outline: {
      default: "border border-gray-500 text-gray-500 bg-transparent",
      primary: "border border-primary-500 text-primary-500 bg-transparent",
      secondary:
        "border border-secondary-500 text-secondary-500 bg-transparent",
      info: "border border-blue-500 text-blue-500 bg-transparent",
      success: "border border-green-500 text-green-500 bg-transparent",
      warning: "border border-yellow-500 text-yellow-500 bg-transparent",
      error: "border border-red-500 text-red-500 bg-transparent",
    },
    soft: {
      default: "bg-gray-100 text-gray-800",
      primary: "bg-primary-100 text-primary-800",
      secondary: "bg-secondary-100 text-secondary-800",
      info: "bg-blue-100 text-blue-800",
      success: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
    },
  };

  const variantClasses = colorMap[variant][color];

  // Responsive size classes with fluid typography and mobile-first approach
  const sizeClasses = {
    sm: [
      // Mobile: ensure readable text and comfortable padding
      "text-xs px-2.5 py-1 mobile:text-xs mobile:px-2 mobile:py-0.5",
      // Tablet and desktop
      "tablet:text-xs tablet:px-2 tablet:py-0.5",
      "desktop:text-fluid-xs desktop:px-2.5 desktop:py-0.5",
      // Minimum height for touch targets on mobile
      "min-h-[32px] mobile:min-h-0 tablet:min-h-0",
    ].join(" "),
    md: [
      // Mobile: larger for better touch targets
      "text-sm px-3 py-1.5 mobile:text-sm mobile:px-2.5 mobile:py-0.5",
      // Tablet and desktop
      "tablet:text-sm tablet:px-2.5 tablet:py-0.5",
      "desktop:text-fluid-sm desktop:px-3 desktop:py-1",
      // Minimum height for touch targets on mobile
      "min-h-[36px] mobile:min-h-0 tablet:min-h-0",
    ].join(" "),
    lg: [
      // Mobile: comfortable touch targets
      "text-base px-4 py-2 mobile:text-base mobile:px-3 mobile:py-1",
      // Tablet and desktop
      "tablet:text-base tablet:px-3 tablet:py-1",
      "desktop:text-fluid-base desktop:px-4 desktop:py-1.5",
      // Minimum height for touch targets on mobile
      "min-h-[44px] mobile:min-h-0 tablet:min-h-0",
    ].join(" "),
  }[size];

  // Responsive shape classes
  const shapeClasses = {
    square: ["rounded", "mobile:rounded-sm", "tablet:rounded"].join(" "),
    rounded: ["rounded-md", "mobile:rounded-lg", "tablet:rounded-md"].join(" "),
    pill: "rounded-full",
  }[shape];

  const stateClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  // Responsive dismissible classes
  const dismissibleClasses = dismissible
    ? ["pr-1", "mobile:pr-2", "tablet:pr-1"].join(" ")
    : "";

  const borderClasses = bordered
    ? "ring-1 ring-inset ring-gray-200 dark:ring-gray-700"
    : "";

  // Enhanced hover classes with touch feedback
  const hoverClasses =
    hover && !disabled
      ? [
          // Touch feedback for mobile
          "touch:active:scale-95",
          // Hover for desktop
          "can-hover:hover:opacity-80",
          "can-hover:hover:scale-105",
          // Transitions
          "transition-all duration-200",
          // Focus states
          "focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1",
        ].join(" ")
      : "";

  // Add responsive utilities
  const responsiveUtilities = [
    // Ensure inline-flex on all screen sizes
    "inline-flex",
    // Center items
    "items-center justify-center",
    // Font weight adjustments
    "font-medium mobile:font-semibold tablet:font-medium",
    // Line height adjustments for better readability
    "leading-tight",
    // Whitespace handling
    "whitespace-nowrap",
    // Max width handling for responsive layouts
    "max-w-full mobile:max-w-[200px] tablet:max-w-[250px] desktop:max-w-none",
    // Motion preferences
    "motion-reduce:transition-none",
    // High contrast mode
    "high-contrast:border high-contrast:border-current",
    // Print mode
    "print:text-black print:bg-transparent print:border",
  ];

  const classes = [
    ...responsiveUtilities,
    shapeClasses,
    variantClasses,
    sizeClasses,
    stateClasses,
    dismissibleClasses,
    borderClasses,
    hoverClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Dot classes based on variant and color
  const dotColorMap = {
    solid: {
      default: "bg-white",
      primary: "bg-white",
      secondary: "bg-white",
      info: "bg-white",
      success: "bg-white",
      warning: "bg-white",
      error: "bg-white",
    },
    outline: {
      default: "bg-gray-500",
      primary: "bg-primary-500",
      secondary: "bg-secondary-500",
      info: "bg-blue-500",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      error: "bg-red-500",
    },
    soft: {
      default: "bg-gray-800",
      primary: "bg-primary-800",
      secondary: "bg-secondary-800",
      info: "bg-blue-800",
      success: "bg-green-800",
      warning: "bg-yellow-800",
      error: "bg-red-800",
    },
  };

  const dotClasses = dotColorMap[variant][color];

  return {
    visible,
    handleClose$,
    badgeClasses: classes, // Keep for backward compatibility
    handleDismiss$,
    classes,
    dotClasses,
  };
}
