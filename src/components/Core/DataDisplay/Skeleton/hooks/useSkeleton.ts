import type {
  SkeletonProps,
  SkeletonAnimation,
  SkeletonVariant,
} from "../Skeleton.types";

export interface UseSkeletonReturn {
  classes: string;
  styles: Record<string, string | number>;
  responsiveClasses: string;
}

export function useSkeleton(props: SkeletonProps): UseSkeletonReturn {
  const {
    variant = "text",
    width,
    height,
    animation = "pulse",
    class: className = "",
    responsiveWidth,
    responsiveHeight,
  } = props;

  // Base classes with improved dark mode and accessibility
  const baseClasses = [
    "relative",
    "overflow-hidden",
    "bg-gray-200",
    "dark:bg-gray-700",
    "transition-colors",
    "duration-200",
    // Add minimum touch target size for interactive skeletons
    "touch-manipulation",
  ];

  // Animation classes with motion preferences
  const animationClasses: Record<SkeletonAnimation, string> = {
    pulse: "animate-pulse motion-reduce:animate-none",
    wave: "skeleton-wave motion-reduce:animate-none",
    none: "",
  };

  // Responsive variant classes with mobile-first approach
  const variantClasses: Record<SkeletonVariant, string> = {
    text: [
      // Mobile sizes
      "h-3 mobile:h-3.5 mobile-md:h-4",
      // Tablet and desktop sizes
      "tablet:h-4 laptop:h-5 desktop:h-5",
      // Border radius
      "rounded",
    ].join(" "),
    circular: [
      "rounded-full",
      // Ensure minimum 44px touch target on mobile
      "min-w-[44px] min-h-[44px]",
      "mobile:min-w-[44px] mobile:min-h-[44px]",
      "tablet:min-w-[48px] tablet:min-h-[48px]",
    ].join(" "),
    rectangular: "rounded-none",
    rounded: ["rounded-md", "mobile:rounded-lg", "tablet:rounded-xl"].join(" "),
  };

  // Responsive spacing and sizing utilities
  const responsiveUtilities = [
    // Fluid typography support for text variant
    variant === "text" && "text-fluid-base",
    // Responsive padding for better mobile experience
    "p-0 mobile:p-0.5 tablet:p-1",
    // Safe area support for mobile devices
    "supports-[padding:max(0px)]:p-[max(theme(spacing.1),env(safe-area-inset-left))]",
  ].filter(Boolean);

  // Combine classes
  const classes = [
    ...baseClasses,
    variantClasses[variant],
    animationClasses[animation],
    ...responsiveUtilities,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Build styles object with responsive considerations
  const styles: Record<string, string | number> = {};

  // Handle responsive width if provided
  if (responsiveWidth) {
    if (responsiveWidth.mobile) {
      styles["--skeleton-width-mobile"] =
        typeof responsiveWidth.mobile === "number"
          ? `${responsiveWidth.mobile}px`
          : responsiveWidth.mobile;
    }
    if (responsiveWidth.tablet) {
      styles["--skeleton-width-tablet"] =
        typeof responsiveWidth.tablet === "number"
          ? `${responsiveWidth.tablet}px`
          : responsiveWidth.tablet;
    }
    if (responsiveWidth.desktop) {
      styles["--skeleton-width-desktop"] =
        typeof responsiveWidth.desktop === "number"
          ? `${responsiveWidth.desktop}px`
          : responsiveWidth.desktop;
    }
    // Use CSS custom properties with media queries
    styles.width = "var(--skeleton-width-mobile, 100%)";
  } else if (width) {
    // Support viewport units for responsive widths
    if (
      typeof width === "string" &&
      (width.includes("vw") ||
        width.includes("vh") ||
        width.includes("svh") ||
        width.includes("dvh"))
    ) {
      styles.width = width;
    } else {
      styles.width = typeof width === "number" ? `${width}px` : width;
    }
  }

  // Handle responsive height if provided
  if (responsiveHeight) {
    if (responsiveHeight.mobile) {
      styles["--skeleton-height-mobile"] =
        typeof responsiveHeight.mobile === "number"
          ? `${responsiveHeight.mobile}px`
          : responsiveHeight.mobile;
    }
    if (responsiveHeight.tablet) {
      styles["--skeleton-height-tablet"] =
        typeof responsiveHeight.tablet === "number"
          ? `${responsiveHeight.tablet}px`
          : responsiveHeight.tablet;
    }
    if (responsiveHeight.desktop) {
      styles["--skeleton-height-desktop"] =
        typeof responsiveHeight.desktop === "number"
          ? `${responsiveHeight.desktop}px`
          : responsiveHeight.desktop;
    }
    // Use CSS custom properties with media queries
    styles.height = "var(--skeleton-height-mobile, auto)";
  } else if (height) {
    // Support viewport units for responsive heights
    if (
      typeof height === "string" &&
      (height.includes("vh") ||
        height.includes("svh") ||
        height.includes("dvh"))
    ) {
      styles.height = height;
    } else {
      styles.height = typeof height === "number" ? `${height}px` : height;
    }
  }

  // Set responsive default dimensions based on variant if not provided
  if (!width && variant === "circular") {
    // Use CSS custom properties for responsive sizing
    styles["--skeleton-size"] = "clamp(40px, 10vw, 60px)";
    styles.width = "var(--skeleton-size)";
  }

  if (!height) {
    if (variant === "circular") {
      styles.height = width ? styles.width : "var(--skeleton-size, 40px)";
    } else if (variant === "text") {
      // Use fluid sizing for text skeleton height
      styles.height = "clamp(14px, 1.5vw, 20px)";
    }
  }

  // Generate responsive classes for different breakpoints
  const responsiveClasses = [
    // Mobile-specific classes
    "mobile:animate-pulse",
    "mobile-md:animate-pulse",
    // Tablet-specific classes
    "tablet:animate-pulse",
    // Desktop-specific classes
    "desktop:animate-pulse",
    // High contrast mode support
    "high-contrast:border high-contrast:border-gray-500",
    // Print mode
    "print:hidden",
  ].join(" ");

  return {
    classes,
    styles,
    responsiveClasses,
  };
}
