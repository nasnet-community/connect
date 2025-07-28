import { component$, useVisibleTask$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import {
  cn,
  getStatusColors,
  getResponsiveFontSize,
  getIconSizeClasses,
  getTouchTargetClasses,
} from "../utils/theme";

export interface ErrorMessageProps {
  /** The error message to display */
  message: string;

  /** Optional title for the error message */
  title?: string;

  /** Optional CSS classes to apply to the root element */
  class?: string;

  /** Whether the error message can be dismissed by user action */
  dismissible?: boolean;

  /** Callback when the error message is dismissed */
  onDismiss$?: QRL<() => void>;

  /** Duration in milliseconds to automatically hide the error message (0 = no auto-hide) */
  autoDismissDuration?: number;

  /** Optional ID for the error message element */
  id?: string;

  /** Whether to animate the error message appearance */
  animate?: boolean;

  /** Size of the error message */
  size?: "sm" | "md" | "lg";

  /** Display mode for responsive behavior */
  displayMode?: "inline" | "block" | "responsive";

  /** Whether to show an icon */
  showIcon?: boolean;

  /** Custom icon to display */
  customIcon?: any;

  /** Color variant for the error message */
  variant?: "solid" | "outline" | "subtle";
}

/**
 * ErrorMessage component for displaying error messages with consistent styling.
 *
 * @example
 * ```tsx
 * <ErrorMessage
 *   message="Failed to save your changes. Please try again."
 *   title="Connection Error"
 * />
 * ```
 */
export const ErrorMessage = component$<ErrorMessageProps>(
  ({
    message,
    title = $localize`Configuration Error`,
    class: className,
    dismissible = false,
    onDismiss$,
    autoDismissDuration = 0,
    id,
    animate = true,
    size = "md",
    displayMode = "responsive",
    showIcon = true,
    customIcon,
    variant = "solid",
  }) => {
    // Don't render if no message is provided
    if (!message) return null;

    // Set up auto-dismiss functionality
    useVisibleTask$(({ cleanup }) => {
      let timerId: number | undefined;

      if (autoDismissDuration && autoDismissDuration > 0) {
        timerId = setTimeout(() => {
          onDismiss$?.();
        }, autoDismissDuration) as unknown as number;
      }

      // Clean up the timer when unmounting
      cleanup(() => {
        if (timerId) {
          clearTimeout(timerId);
        }
      });
    });

    // Handle dismiss action
    const handleDismiss$ = $(() => {
      onDismiss$?.();
    });

    // Get responsive classes
    const statusClasses = getStatusColors("error", variant);
    const fontClasses = getResponsiveFontSize(size);
    const iconClasses = getIconSizeClasses(size);
    const touchClasses = dismissible ? getTouchTargetClasses(size) : "";

    // Determine display classes based on mode
    const getDisplayClasses = () => {
      switch (displayMode) {
        case "inline":
          return "inline-flex";
        case "block":
          return "flex";
        case "responsive":
        default:
          return "mobile:flex tablet:inline-flex desktop:flex";
      }
    };

    return (
      <div
        id={id}
        role="alert"
        class={cn(
          "items-start space-x-3 rounded-lg border p-4",
          statusClasses,
          fontClasses,
          getDisplayClasses(),
          animate && "animate-fadeIn",
          className
        )}
      >
        {showIcon && (
          <div class="mt-0.5 flex-shrink-0">
            {customIcon ? (
              customIcon
            ) : (
              <svg
                class={cn(iconClasses, "text-current")}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
        )}
        <div class="flex-1 min-w-0">
          {title && (
            <h3 class={cn(
              "font-medium text-current",
              size === "sm" ? "text-sm" : size === "lg" ? "text-base" : "text-sm"
            )}>
              {title}
            </h3>
          )}
          <p class={cn(
            "text-current",
            title ? "mt-1" : "",
            size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-sm"
          )}>
            {message}
          </p>
        </div>

        {dismissible && (
          <button
            type="button"
            onClick$={handleDismiss$}
            class={cn(
              "ml-3 flex-shrink-0 rounded-md text-current opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2",
              touchClasses,
              "transition-opacity"
            )}
            aria-label="Dismiss error"
          >
            <svg 
              class={cn(iconClasses)} 
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
    );
  },
);
