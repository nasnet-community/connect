import { component$, Slot } from "@builder.io/qwik";
import type { AlertProps } from "./Alert.types";
import { useAlert, getVariantClasses, getSizeClasses } from "./useAlert";
import { InfoIcon, SuccessIcon, WarningIcon, ErrorIcon, LoadingSpinner } from "./icons";

/**
 * Alert component for displaying various types of messages (info, success, warning, error)
 * with consistent styling and optional close button.
 * 
 * Enhanced with size variants, auto-closing functionality, loading state, and more customization options.
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
 *   autoCloseDuration={5000} 
 *   onDismiss$={() => console.log('Alert dismissed')}
 * >
 *   This alert will auto-dismiss after 5 seconds.
 * </Alert>
 * ```
 */
export const Alert = component$<AlertProps>(({ 
  status = "info",
  dismissible = false,
  subtle = false,
  onDismiss$,
  title,
  icon = true,
  message,
  size = "md",
  variant = "solid",
  autoCloseDuration,
  loading = false,
  id,
  class: className,
  ...rest
}) => {
  const { state, handleDismiss$ } = useAlert({
    autoCloseDuration,
    onDismiss$
  });
  
  // Base, animation, and variant classes
  const baseClasses = "rounded-md border flex gap-3 transition-all duration-300 ease-in-out";
  const animationClasses = state.isMounted ? "opacity-100 transform-none" : "opacity-0 -translate-y-2";
  const statusClasses = getVariantClasses(status, variant, subtle);
  const sizeClasses = getSizeClasses(size);
  
  // Don't render if not visible
  if (!state.isVisible) {
    return null;
  }
  
  return (
    <div
      id={id}
      role="alert"
      class={`${baseClasses} ${statusClasses} ${sizeClasses} ${animationClasses} ${className || ""}`}
      {...rest}
    >
      {icon && (
        <div class="flex-shrink-0">
          {loading && <LoadingSpinner />}
          {!loading && typeof icon === "boolean" && status === "info" && <InfoIcon />}
          {!loading && typeof icon === "boolean" && status === "success" && <SuccessIcon />}
          {!loading && typeof icon === "boolean" && status === "warning" && <WarningIcon />}
          {!loading && typeof icon === "boolean" && status === "error" && <ErrorIcon />}
          {!loading && typeof icon !== "boolean" && icon}
        </div>
      )}
      
      <div class="flex-grow">
        {title && <div class="font-medium mb-1">{title}</div>}
        <div>
          {message && <p>{message}</p>}
          <Slot />
        </div>
      </div>
      
      {dismissible && (
        <button
          type="button"
          class="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200"
          onClick$={handleDismiss$}
          aria-label="Dismiss alert"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
});