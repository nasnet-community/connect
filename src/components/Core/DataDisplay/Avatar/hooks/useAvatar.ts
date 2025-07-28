import { useSignal, useTask$, $ } from "@builder.io/qwik";
import type { Signal, QRL } from "@builder.io/qwik";
import type {
  AvatarSize,
  AvatarShape,
  AvatarVariant,
  AvatarStatus,
  AvatarStatusPosition,
} from "../Avatar.types";

export interface UseAvatarParams {
  size?: AvatarSize;
  shape?: AvatarShape;
  variant?: AvatarVariant;
  src?: string;
  status?: AvatarStatus;
  statusPosition?: AvatarStatusPosition;
  bordered?: boolean;
  borderColor?: string;
  loading?: boolean;
  clickable?: boolean;
  color?: string;
}

export interface UseAvatarReturn {
  imageLoaded: Signal<boolean>;
  imageError: Signal<boolean>;
  handleImageLoad$: QRL<() => void>;
  handleImageError$: QRL<() => void>;
  handleClick$: QRL<(e: MouseEvent) => void>;
  avatarClasses: string;
  sizeClasses: string;
  statusClasses: string;
  statusPositionClasses: string;
  statusSize: string;
}

export function useAvatar(
  params: UseAvatarParams,
  onClick$?: QRL<(event: MouseEvent) => void>,
): UseAvatarReturn {
  const {
    size = "md",
    shape = "circle",
    variant = "image",
    src,
    status = "none",
    statusPosition = "bottom-right",
    bordered = false,
    borderColor = "white",
    loading = false,
    clickable = false,
    color = "primary",
  } = params;

  // Handle image loading states
  const imageLoaded = useSignal(false);
  const imageError = useSignal(false);

  // Reset image states when src changes
  useTask$(({ track }) => {
    track(() => src);
    imageLoaded.value = false;
    imageError.value = false;
  });

  // Handle image load event
  const handleImageLoad$ = $(() => {
    imageLoaded.value = true;
  });

  // Handle image error event
  const handleImageError$ = $(() => {
    imageError.value = true;
  });

  // Store whether component is loading or disabled for click handler
  const isLoadingOrDisabled = loading;
  const handleClickFn = onClick$;

  // Click handler
  const handleClick$ = $((e: MouseEvent) => {
    if (isLoadingOrDisabled) return;
    if (handleClickFn) handleClickFn(e);
  });

  // Generate responsive size classes for the avatar with mobile-first approach
  const sizeClasses = {
    xs: [
      // Mobile: minimum 44px touch target
      "h-11 w-11 text-xs mobile:h-6 mobile:w-6 mobile:text-xs",
      // Tablet and desktop
      "tablet:h-6 tablet:w-6 tablet:text-xs",
      "desktop:h-6 desktop:w-6 desktop:text-xs",
    ].join(" "),
    sm: [
      // Mobile: minimum 44px touch target
      "h-11 w-11 text-sm mobile:h-8 mobile:w-8 mobile:text-sm",
      // Tablet and desktop
      "tablet:h-8 tablet:w-8 tablet:text-sm",
      "desktop:h-8 desktop:w-8 desktop:text-sm",
    ].join(" "),
    md: [
      // Mobile: comfortable touch target
      "h-11 w-11 text-fluid-sm mobile:h-10 mobile:w-10 mobile:text-base",
      // Tablet and desktop
      "tablet:h-10 tablet:w-10 tablet:text-base",
      "desktop:h-10 desktop:w-10 desktop:text-fluid-base",
    ].join(" "),
    lg: [
      // Mobile sizing
      "h-12 w-12 text-fluid-base mobile:h-12 mobile:w-12 mobile:text-lg",
      // Tablet and desktop
      "tablet:h-12 tablet:w-12 tablet:text-lg",
      "desktop:h-14 desktop:w-14 desktop:text-fluid-lg",
    ].join(" "),
    xl: [
      // Mobile sizing
      "h-14 w-14 text-fluid-lg mobile:h-16 mobile:w-16 mobile:text-xl",
      // Tablet and desktop
      "tablet:h-16 tablet:w-16 tablet:text-xl",
      "desktop:h-20 desktop:w-20 desktop:text-fluid-xl",
    ].join(" "),
    "2xl": [
      // Mobile sizing
      "h-16 w-16 text-fluid-xl mobile:h-20 mobile:w-20 mobile:text-2xl",
      // Tablet and desktop
      "tablet:h-20 tablet:w-20 tablet:text-2xl",
      "desktop:h-24 desktop:w-24 desktop:text-fluid-2xl",
    ].join(" "),
  }[size];

  // Generate responsive shape classes for the avatar
  const shapeClasses = {
    circle: "rounded-full",
    square: ["rounded-none", "mobile:rounded-sm", "tablet:rounded-md"].join(
      " ",
    ),
    rounded: ["rounded-md", "mobile:rounded-lg", "tablet:rounded-xl"].join(" "),
  }[shape];

  // Generate color classes for initials and icon variants
  const colorClasses = {
    primary:
      "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300",
    secondary:
      "bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300",
    success:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    warning:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  }[color as string];

  // Generate border classes
  const borderClasses = bordered
    ? `border-2 ${
        borderColor === "white"
          ? "border-white dark:border-gray-800"
          : `border-${borderColor}`
      }`
    : "";

  // Generate status indicator classes
  const statusClasses =
    status !== "none"
      ? {
          online: "bg-green-500",
          offline: "bg-gray-400",
          away: "bg-yellow-500",
          busy: "bg-red-500",
        }[status]
      : "";

  // Generate status position classes with RTL support
  const statusPositionClasses =
    status !== "none"
      ? {
          "top-right": "top-0 end-0",
          "top-left": "top-0 start-0", 
          "bottom-right": "bottom-0 end-0",
          "bottom-left": "bottom-0 start-0",
        }[statusPosition]
      : "";

  // Determine responsive status indicator size based on the avatar size
  const statusSize = {
    xs: [
      "h-1.5 w-1.5",
      "mobile:h-2 mobile:w-2",
      "tablet:h-1.5 tablet:w-1.5",
    ].join(" "),
    sm: ["h-2 w-2", "mobile:h-2.5 mobile:w-2.5", "tablet:h-2 tablet:w-2"].join(
      " ",
    ),
    md: [
      "h-2.5 w-2.5",
      "mobile:h-3 mobile:w-3",
      "tablet:h-2.5 tablet:w-2.5",
    ].join(" "),
    lg: ["h-3 w-3", "mobile:h-3.5 mobile:w-3.5", "tablet:h-3 tablet:w-3"].join(
      " ",
    ),
    xl: [
      "h-3.5 w-3.5",
      "mobile:h-4 mobile:w-4",
      "tablet:h-3.5 tablet:w-3.5",
      "desktop:h-4 desktop:w-4",
    ].join(" "),
    "2xl": [
      "h-4 w-4",
      "mobile:h-5 mobile:w-5",
      "tablet:h-4 tablet:w-4",
      "desktop:h-5 desktop:w-5",
    ].join(" "),
  }[size];

  // Generate loading state classes with motion preferences
  const loadingClasses = loading
    ? "animate-pulse motion-reduce:animate-none bg-gray-200 dark:bg-gray-700"
    : "";

  // Generate responsive clickable classes with touch feedback
  const clickableClasses =
    clickable && !loading
      ? [
          "cursor-pointer",
          // Touch feedback for mobile
          "touch:active:scale-95",
          // Hover states for desktop
          "can-hover:hover:opacity-80",
          "can-hover:hover:scale-105",
          // Transitions
          "transition-all duration-200",
          // Focus states
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          // Ensure minimum touch target
          "min-h-[44px] min-w-[44px] tablet:min-h-0 tablet:min-w-0",
        ].join(" ")
      : "";

  // Add responsive spacing utilities
  const responsiveUtilities = [
    // Viewport-based sizing support
    "supports-[height:100svh]:h-[var(--avatar-size,auto)]",
    // Safe area support for mobile
    "supports-[padding:max(0px)]:p-[max(0px,env(safe-area-inset-left))]",
    // High contrast mode
    "high-contrast:border-2 high-contrast:border-current",
    // Print optimization
    "print:grayscale",
  ];

  // Combined classes for the avatar
  const avatarClasses = [
    "relative inline-flex items-center justify-center overflow-hidden",
    sizeClasses,
    shapeClasses,
    variant !== "image" || imageError.value || !src ? colorClasses : "",
    borderClasses,
    loadingClasses,
    clickableClasses,
    ...responsiveUtilities,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    imageLoaded,
    imageError,
    handleImageLoad$,
    handleImageError$,
    handleClick$,
    avatarClasses,
    sizeClasses,
    statusClasses,
    statusPositionClasses,
    statusSize,
  };
}
