import { component$, useComputed$, $, useSignal } from "@builder.io/qwik";
import type { ToastProps } from "./Toast.types";
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
  LoadingSpinner,
} from "./icons";
import { useToastItem } from "./useToastItem";
import { useSwipeGesture } from "./useSwipeGesture";
import {
  getStatusColors,
  getResponsiveSizeClasses,
  getIconSizeClasses,
  getTouchTargetClasses,
  cn,
} from "../utils/theme";

/**
 * Toast component for displaying temporary notifications
 *
 * Follows accessibility best practices:
 * - Uses appropriate ARIA roles
 * - Has live regions for screen readers
 * - Provides keyboard accessibility
 * - Includes visual and auditory cues
 *
 * Mobile optimizations:
 * - Swipe-to-dismiss gesture support
 * - Touch-friendly dismiss button
 * - Responsive sizing and positioning
 * - Safe area support for mobile devices
 *
 * @example
 * ```tsx
 * <Toast
 *   id="toast-1"
 *   status="success"
 *   title="Success!"
 *   message="Operation completed successfully."
 *   swipeable={true}
 *   onDismiss$={(id) => console.log(`Toast ${id} dismissed`)}
 * />
 * ```
 */
export const Toast = component$<ToastProps>(
  ({
    id,
    status = "info",
    title,
    message,
    dismissible = true,
    onDismiss$,
    icon = true,
    size = "md",
    duration = 5000,
    loading = false,
    persistent = false,
    actionLabel,
    onAction$,
    ariaLive = status === "error" ? "assertive" : "polite",
    ariaLabel,
    class: className,
    children,
    position = "top-right",
    swipeable = true,
    variant = "solid",
  }) => {
    const {
      isVisible,
      isMounted,
      progress,
      dismissToast,
      handleMouseEnter,
      handleMouseLeave,
    } = useToastItem({
      id,
      duration,
      persistent,
      onDismiss$,
    });

    const isSwipeEnabled = useSignal(swipeable && dismissible);

    // Set up swipe gesture for mobile
    const { elementRef, swipeOffset, isDragging, swipeDirection } =
      useSwipeGesture({
        onSwipeLeft: position.includes("right") ? dismissToast : undefined,
        onSwipeRight: position.includes("left") ? dismissToast : undefined,
        onSwipeUp: position.includes("bottom") ? dismissToast : undefined,
        onSwipeDown: position.includes("top") ? dismissToast : undefined,
        threshold: 60,
        enabled: isSwipeEnabled.value,
      });

    // Action handler
    const handleAction = $(() => {
      onAction$?.(id);
    });

    // Compute the appropriate icon based on status
    const statusIcon = useComputed$(() => {
      if (loading) return <LoadingSpinner class={getIconSizeClasses(size)} />;

      if (typeof icon === "boolean" && icon) {
        const iconClass = getIconSizeClasses(size);
        return {
          info: <InfoIcon class={iconClass} />,
          success: <SuccessIcon class={iconClass} />,
          warning: <WarningIcon class={iconClass} />,
          error: <ErrorIcon class={iconClass} />,
        }[status];
      }

      return icon;
    });

    // Get theme-based classes
    const statusClasses = getStatusColors(status, variant);
    const sizeClasses = getResponsiveSizeClasses(size, "toast");
    const dismissButtonClasses = getTouchTargetClasses(size);

    // Progress bar color based on status and variant
    const progressColor = useComputed$(() => {
      const colorMap = {
        info:
          variant === "solid" ? "bg-info-600 dark:bg-info-400" : "bg-info-500",
        success:
          variant === "solid"
            ? "bg-success-600 dark:bg-success-400"
            : "bg-success-500",
        warning:
          variant === "solid"
            ? "bg-warning-600 dark:bg-warning-400"
            : "bg-warning-500",
        error:
          variant === "solid"
            ? "bg-error-600 dark:bg-error-400"
            : "bg-error-500",
      };
      return colorMap[status];
    });

    // Animation classes based on position
    const animationClass = useComputed$(() => {
      if (!isMounted.value) {
        if (position.includes("top")) return "translate-y-[-100%] opacity-0";
        if (position.includes("bottom")) return "translate-y-[100%] opacity-0";
        return "scale-95 opacity-0";
      }

      // Apply swipe offset when dragging
      if (isDragging.value && swipeOffset.value) {
        return "transform-gpu";
      }

      return "translate-x-0 translate-y-0 opacity-100";
    });

    // Dynamic styles for swipe transform
    const dynamicStyles = useComputed$(() => {
      if (isDragging.value && swipeOffset.value) {
        const { x, y } = swipeOffset.value;
        const opacity = Math.max(0, 1 - Math.abs(x) / 200);
        return {
          transform: `translate(${x}px, ${y}px)`,
          opacity: opacity.toString(),
        };
      }
      return {};
    });

    // Position-specific classes for mobile
    const positionClasses = useComputed$(() => {
      const basePosition = "fixed z-50";
      const mobileClasses = {
        "top-left":
          "mobile:top-2 mobile:left-2 mobile:right-2 tablet:top-4 tablet:left-4 tablet:right-auto",
        "top-center":
          "mobile:top-2 mobile:left-2 mobile:right-2 tablet:top-4 tablet:left-1/2 tablet:-translate-x-1/2 tablet:right-auto",
        "top-right":
          "mobile:top-2 mobile:left-2 mobile:right-2 tablet:top-4 tablet:right-4 tablet:left-auto",
        "bottom-left":
          "mobile:bottom-2 mobile:left-2 mobile:right-2 tablet:bottom-4 tablet:left-4 tablet:right-auto",
        "bottom-center":
          "mobile:bottom-2 mobile:left-2 mobile:right-2 tablet:bottom-4 tablet:left-1/2 tablet:-translate-x-1/2 tablet:right-auto",
        "bottom-right":
          "mobile:bottom-2 mobile:left-2 mobile:right-2 tablet:bottom-4 tablet:right-4 tablet:left-auto",
      };
      return `${basePosition} ${mobileClasses[position]}`;
    });

    // Base classes
    const baseClasses = "flex rounded-lg border shadow-lg backdrop-blur-sm";
    const transitionClasses = "transition-all duration-300 ease-out";

    // Early return if toast is no longer visible
    if (!isVisible.value) return null;

    return (
      <div
        ref={elementRef}
        id={id}
        role="status"
        aria-live={ariaLive}
        aria-atomic="true"
        aria-label={ariaLabel || title || message}
        class={cn(
          baseClasses,
          statusClasses,
          sizeClasses,
          positionClasses.value,
          animationClass.value,
          transitionClasses,
          "relative overflow-hidden",
          isDragging.value && "cursor-grabbing select-none",
          swipeable && "touch-pan-y",
          className,
        )}
        style={dynamicStyles.value}
        onMouseEnter$={handleMouseEnter}
        onMouseLeave$={handleMouseLeave}
        data-testid="toast"
        data-status={status}
        data-swipe-direction={swipeDirection.value}
      >
        {/* Progress bar */}
        {!persistent && duration && duration > 0 && (
          <div
            class={cn(
              "absolute bottom-0 left-0 h-1 transition-all duration-100",
              progressColor.value,
            )}
            style={{ width: `${progress.value}%` }}
            role="progressbar"
            aria-valuenow={progress.value}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        )}

        {/* Toast content */}
        <div class="flex w-full gap-3">
          {/* Icon */}
          {statusIcon.value && (
            <div class="mt-0.5 flex-shrink-0" aria-hidden="true">
              {statusIcon.value}
            </div>
          )}

          {/* Content */}
          <div class="min-w-0 flex-1">
            {title && (
              <div class="font-medium leading-5 mobile:text-sm tablet:text-base">
                {title}
              </div>
            )}
            {message && (
              <div class="mt-1 mobile:text-xs tablet:text-sm">{message}</div>
            )}
            {children && <div class="mt-1">{children}</div>}

            {/* Action button */}
            {actionLabel && onAction$ && (
              <button
                type="button"
                class={cn(
                  "mt-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  "bg-white/90 hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-600",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2",
                  getTouchTargetClasses("sm"),
                )}
                onClick$={handleAction}
              >
                {actionLabel}
              </button>
            )}
          </div>

          {/* Dismiss button */}
          {dismissible && (
            <button
              type="button"
              class={cn(
                "flex flex-shrink-0 items-center justify-center rounded-full transition-colors",
                "hover:bg-black/10 dark:hover:bg-white/10",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                dismissButtonClasses,
                "mobile:p-2 tablet:p-1",
              )}
              onClick$={dismissToast}
              aria-label="Dismiss notification"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class={cn("mobile:h-5 mobile:w-5 tablet:h-4 tablet:w-4")}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Swipe indicator */}
        {swipeable && isDragging.value && (
          <div
            class={cn(
              "pointer-events-none absolute inset-0",
              "bg-gradient-to-r from-transparent via-white/10 to-transparent",
              "animate-pulse",
            )}
          />
        )}
      </div>
    );
  },
);

export default Toast;
