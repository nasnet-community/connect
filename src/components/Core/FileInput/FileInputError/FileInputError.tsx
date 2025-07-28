import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { FileInputErrorProps } from "../types";

/**
 * FileInputError Component
 * 
 * Displays error messages for file input operations with retry and dismiss options.
 * Supports multiple display variants and auto-dismiss functionality.
 */
export const FileInputError = component$<FileInputErrorProps>(({
  error,
  onRetry$,
  onDismiss$,
  autoDismissMs,
  variant = "inline",
}) => {
  const isVisible = useSignal(true);

  // Auto-dismiss functionality
  useVisibleTask$(({ cleanup }) => {
    if (autoDismissMs && autoDismissMs > 0) {
      const timer = setTimeout(() => {
        isVisible.value = false;
        onDismiss$?.();
      }, autoDismissMs);
      
      cleanup(() => clearTimeout(timer));
    }
  });

  const handleDismiss = $(() => {
    isVisible.value = false;
    onDismiss$?.();
  });

  if (!isVisible.value) return null;

  // Error type to user-friendly message mapping
  const getErrorIcon = () => {
    switch (error.type) {
      case "FILE_TOO_LARGE":
        return (
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case "INVALID_FORMAT":
        return (
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "READ_ERROR":
      case "NETWORK_ERROR":
        return (
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Inline variant
  if (variant === "inline") {
    return (
      <div class="mt-2 flex items-start gap-2 rounded-md bg-error-50 p-3 dark:bg-error-950/20">
        <div class="flex-shrink-0 text-error-600 dark:text-error-400">
          {getErrorIcon()}
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-error-800 dark:text-error-200">
            {error.message}
          </p>
          {error.details !== undefined && error.details !== null && (
            <p class="mt-1 text-xs text-error-700 dark:text-error-300">
              {typeof error.details === 'string' ? error.details : JSON.stringify(error.details)}
            </p>
          )}
          {(error.retryable || onDismiss$) && (
            <div class="mt-2 flex gap-2">
              {error.retryable && onRetry$ && (
                <button
                  onClick$={onRetry$}
                  class="text-xs font-medium text-error-700 hover:text-error-800 
                         focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-1
                         dark:text-error-400 dark:hover:text-error-300"
                  type="button"
                >
                  {$localize`Try again`}
                </button>
              )}
              {onDismiss$ && (
                <button
                  onClick$={handleDismiss}
                  class="text-xs font-medium text-error-600 hover:text-error-700 
                         focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-1
                         dark:text-error-500 dark:hover:text-error-400"
                  type="button"
                >
                  {$localize`Dismiss`}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Toast variant
  if (variant === "toast") {
    return (
      <div class="fixed bottom-4 end-4 z-toast max-w-sm animate-slide-up">
        <div class="flex items-start gap-3 rounded-lg bg-white p-4 shadow-lg 
                    ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-white dark:ring-opacity-10">
          <div class="flex-shrink-0 text-error-500 dark:text-error-400">
            {getErrorIcon()}
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
              {error.message}
            </p>
            {error.details !== undefined && error.details !== null && (
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {typeof error.details === 'string' ? error.details : JSON.stringify(error.details)}
              </p>
            )}
          </div>
          <button
            onClick$={handleDismiss}
            class="flex-shrink-0 text-gray-400 hover:text-gray-500 
                   focus:outline-none focus:ring-2 focus:ring-primary-500
                   dark:text-gray-500 dark:hover:text-gray-400"
            type="button"
            aria-label={$localize`Close`}
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Banner variant
  return (
    <div class="mb-4 rounded-lg border border-error-200 bg-error-50 p-4 dark:border-error-800 dark:bg-error-950/30">
      <div class="flex">
        <div class="flex-shrink-0 text-error-600 dark:text-error-400">
          {getErrorIcon()}
        </div>
        <div class="ms-3 flex-1">
          <h3 class="text-sm font-medium text-error-800 dark:text-error-200">
            {$localize`Upload Error`}
          </h3>
          <div class="mt-2 text-sm text-error-700 dark:text-error-300">
            <p>{error.message}</p>
            {error.details !== undefined && error.details !== null && (
              <p class="mt-1 text-xs opacity-90">{typeof error.details === 'string' ? error.details : JSON.stringify(error.details)}</p>
            )}
          </div>
          <div class="mt-4 flex gap-3">
            {error.retryable && onRetry$ && (
              <button
                onClick$={onRetry$}
                class="rounded-md bg-error-600 px-3 py-1.5 text-sm font-medium text-white 
                       shadow-sm hover:bg-error-700 focus:outline-none focus:ring-2 
                       focus:ring-error-500 focus:ring-offset-2 dark:bg-error-500 
                       dark:hover:bg-error-600 dark:focus:ring-error-400 
                       dark:focus:ring-offset-gray-900"
                type="button"
              >
                {$localize`Retry Upload`}
              </button>
            )}
            {onDismiss$ && (
              <button
                onClick$={handleDismiss}
                class="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-error-700 
                       shadow-sm ring-1 ring-inset ring-error-200 hover:bg-error-50 
                       focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2
                       dark:bg-gray-800 dark:text-error-400 dark:ring-error-700 
                       dark:hover:bg-gray-700 dark:focus:ring-error-400 
                       dark:focus:ring-offset-gray-900"
                type="button"
              >
                {$localize`Dismiss`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});