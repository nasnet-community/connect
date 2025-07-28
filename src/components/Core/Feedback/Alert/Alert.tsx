import { component$, Slot } from "@builder.io/qwik";
import type { AlertProps } from "./Alert.types";
import { useAlert } from "./useAlert";
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
  LoadingSpinner,
} from "./icons";
import {
  getStatusColors,
  getResponsiveSizeClasses,
  getTouchTargetClasses,
  getAnimationClasses,
  getIconSizeClasses,
  cn,
} from "../utils/theme";

/**
 * Alert component for displaying various types of messages (info, success, warning, error)
 * with consistent styling and optional close button.
 *
 * Enhanced with size variants, auto-closing functionality, loading state, responsive design,
 * and theme-based styling.
 *
 * @example
 * ```tsx
 * <Alert status="success" title="Success!" dismissible>
 *   Your changes have been saved successfully.
 * </Alert>
 * ```
 *
 * @example
 * ```tsx
 * <Alert
 *   status="warning"
 *   variant="outline"
 *   size="lg"
 *   autoCloseDuration={5000}
 *   animation="slideDown"
 *   onDismiss$={() => console.log('Alert dismissed')}
 * >
 *   This alert will auto-dismiss after 5 seconds.
 * </Alert>
 * ```
 */
export const Alert = component$<AlertProps>(
  ({
    status = "info",
    dismissible = false,
    onDismiss$,
    title,
    icon = true,
    message,
    size = "md",
    variant = "solid",
    autoCloseDuration,
    loading = false,
    animation = "fadeIn",
    id,
    class: className,
    ...rest
  }) => {
    const { state, handleDismiss$ } = useAlert({
      autoCloseDuration,
      onDismiss$,
    });

    // Get theme-based classes
    const statusClasses = getStatusColors(status, variant);
    const sizeClasses = getResponsiveSizeClasses(size, "alert");
    const iconSizeClasses = getIconSizeClasses(size);
    const animationClass = state.isMounted
      ? getAnimationClasses(animation)
      : "";
    const touchTargetClasses = getTouchTargetClasses(size);

    // Base classes
    const baseClasses = cn(
      "rounded-md border flex items-start gap-3 transition-all duration-300 ease-in-out",
      "relative overflow-hidden",
      // Mobile-first responsive design
      "w-full max-w-full",
      // Ensure proper touch targets on mobile
      "touch-manipulation",
    );

    // Animation classes
    const visibilityClasses = state.isMounted
      ? "opacity-100 transform-none"
      : "opacity-0 -translate-y-2";

    // Don't render if not visible
    if (!state.isVisible) {
      return null;
    }

    return (
      <div
        id={id}
        role="alert"
        class={cn(
          baseClasses,
          statusClasses,
          sizeClasses,
          visibilityClasses,
          animationClass,
          className,
        )}
        {...rest}
      >
        {icon && (
          <div class={cn("flex flex-shrink-0 items-center", iconSizeClasses)}>
            {loading && <LoadingSpinner size={size} />}
            {!loading && typeof icon === "boolean" && status === "info" && (
              <InfoIcon size={size} />
            )}
            {!loading && typeof icon === "boolean" && status === "success" && (
              <SuccessIcon size={size} />
            )}
            {!loading && typeof icon === "boolean" && status === "warning" && (
              <WarningIcon size={size} />
            )}
            {!loading && typeof icon === "boolean" && status === "error" && (
              <ErrorIcon size={size} />
            )}
            {!loading && typeof icon !== "boolean" && icon}
          </div>
        )}

        <div class="min-w-0 flex-grow">
          {title && (
            <div
              class={cn(
                "font-medium",
                size === "sm" ? "mb-0.5" : "mb-1",
                // Responsive font sizes
                size === "sm" && "text-sm mobile:text-xs",
                size === "md" && "text-base mobile:text-sm",
                size === "lg" && "text-lg mobile:text-base",
              )}
            >
              {title}
            </div>
          )}
          <div class="break-words">
            {message && <p class="m-0">{message}</p>}
            <Slot />
          </div>
        </div>

        {dismissible && (
          <button
            type="button"
            class={cn(
              "inline-flex flex-shrink-0 items-center justify-center",
              "rounded-lg transition-all duration-200",
              "hover:bg-black/10 dark:hover:bg-white/10",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              "focus:ring-current focus:ring-opacity-50",
              // Touch-friendly size
              touchTargetClasses,
              // Responsive positioning
              "-mr-1 -mt-1 ml-auto",
            )}
            onClick$={handleDismiss$}
            aria-label="Dismiss alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class={cn(iconSizeClasses, "pointer-events-none")}
              viewBox="0 0 20 20"
              fill="currentColor"
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
    );
  },
);
