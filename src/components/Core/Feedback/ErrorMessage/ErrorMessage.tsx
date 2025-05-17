import { component$, useVisibleTask$, $ } from "@builder.io/qwik";
import type { QRL } from '@builder.io/qwik';

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
export const ErrorMessage = component$<ErrorMessageProps>(({ 
  message, 
  title = $localize`Configuration Error`,
  class: className,
  dismissible = false,
  onDismiss$,
  autoDismissDuration = 0,
  id,
  animate = true
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

  return (
    <div
      id={id}
      role="alert"
      class={`
        bg-error-surface dark:bg-error-900/50 
        border-error-200 dark:border-error-800 
        ${animate ? 'animate-fadeIn' : ''}
        flex items-start space-x-3 rounded-lg border p-4
        ${className || ""}
      `}
    >
      <svg
        class="text-error dark:text-error-400 mt-0.5 h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div class="flex-1">
        <h3 class="text-error-dark dark:text-error-200 text-sm font-medium">
          {title}
        </h3>
        <p class="text-error dark:text-error-300 mt-1 text-sm">{message}</p>
      </div>
      
      {dismissible && (
        <button 
          type="button"
          onClick$={handleDismiss$}
          class="text-error-400 hover:text-error-500 dark:text-error-300 dark:hover:text-error-200 ml-3 flex-shrink-0"
          aria-label="Dismiss error"
        >
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
}); 