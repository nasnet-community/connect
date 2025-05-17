import { component$, useComputed$, $ } from "@builder.io/qwik";
import type { ToastProps, ToastStatus } from "./Toast.types";
import { InfoIcon, SuccessIcon, WarningIcon, ErrorIcon, LoadingSpinner } from "./icons";
import { useToastItem } from "./useToastItem";

/**
 * Toast component for displaying temporary notifications
 * 
 * Follows accessibility best practices:
 * - Uses appropriate ARIA roles
 * - Has live regions for screen readers
 * - Provides keyboard accessibility
 * - Includes visual and auditory cues
 * 
 * @example
 * ```tsx
 * <Toast 
 *   id="toast-1"
 *   status="success" 
 *   title="Success!" 
 *   message="Operation completed successfully."
 *   onDismiss$={(id) => console.log(`Toast ${id} dismissed`)}
 * />
 * ```
 */
export const Toast = component$<ToastProps>(({
  id,
  status = 'info',
  title,
  message,
  dismissible = true,
  onDismiss$,
  icon = true,
  size = 'md',
  duration = 5000,
  loading = false,
  persistent = false,
  actionLabel,
  onAction$,
  ariaLive = status === 'error' ? 'assertive' : 'polite',
  ariaLabel,
  class: className,
  children,
}) => {
  const {
    isVisible,
    isMounted,
    progress,
    dismissToast,
    handleMouseEnter,
    handleMouseLeave
  } = useToastItem({
    id,
    duration,
    persistent,
    onDismiss$
  });
  
  // Action handler
  const handleAction = $(() => {
    onAction$?.(id);
  });
  
  // Compute the appropriate icon based on status
  const statusIcon = useComputed$(() => {
    if (loading) return <LoadingSpinner />;
    
    if (typeof icon === 'boolean' && icon) {
      return {
        info: <InfoIcon />,
        success: <SuccessIcon />,
        warning: <WarningIcon />,
        error: <ErrorIcon />,
      }[status];
    }
    
    return icon;
  });
  
  // Generate status-based classes
  const getStatusClasses = (status: ToastStatus) => {
    return {
      info: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-100 dark:border-blue-800",
      success: "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-100 dark:border-green-800",
      warning: "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-100 dark:border-yellow-800",
      error: "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-100 dark:border-red-800"
    }[status];
  };
  
  // Size classes
  const sizeClasses = {
    sm: "text-xs p-2 max-w-xs",
    md: "text-sm p-3 max-w-sm",
    lg: "text-base p-4 max-w-md"
  }[size];
  
  // Progress bar color
  const progressColor = {
    info: "bg-blue-500 dark:bg-blue-400",
    success: "bg-green-500 dark:bg-green-400",
    warning: "bg-yellow-500 dark:bg-yellow-400",
    error: "bg-red-500 dark:bg-red-400"
  }[status];
  
  // Base classes
  const baseClasses = "flex rounded-lg border shadow-lg";
  const animationClasses = isMounted.value ? "opacity-100 transform-none" : "opacity-0 translate-y-2";
  const statusClasses = getStatusClasses(status);
  
  // Early return if toast is no longer visible
  if (!isVisible.value) return null;
  
  return (
    <div
      id={id}
      role="status"
      aria-live={ariaLive}
      aria-atomic="true"
      aria-label={ariaLabel || title || message}
      class={`${baseClasses} ${statusClasses} ${sizeClasses} ${animationClasses} transition-all duration-300 ease-in-out relative overflow-hidden ${className || ""}`}
      onMouseEnter$={handleMouseEnter}
      onMouseLeave$={handleMouseLeave}
      data-testid="toast"
    >
      {/* Progress bar */}
      {!persistent && duration && duration > 0 && (
        <div 
          class={`absolute bottom-0 left-0 h-1 ${progressColor}`}
          style={{ width: `${progress.value}%` }}
        />
      )}
      
      {/* Toast content */}
      <div class="flex gap-3 w-full">
        {/* Icon */}
        {statusIcon.value && (
          <div class="flex-shrink-0 mt-0.5">
            {statusIcon.value}
          </div>
        )}
        
        {/* Content */}
        <div class="flex-1 min-w-0">
          {title && <div class="font-medium leading-5">{title}</div>}
          {message && <div class="mt-1">{message}</div>}
          {children && <div class="mt-1">{children}</div>}
          
          {/* Action button */}
          {actionLabel && onAction$ && (
            <button
              type="button"
              class="mt-2 px-3 py-1 text-xs font-medium rounded-md bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
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
            class="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            onClick$={dismissToast}
            aria-label="Dismiss notification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});

export default Toast;
