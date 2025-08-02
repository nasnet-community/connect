import { component$ } from "@builder.io/qwik";

export interface ErrorMessageProps {
  message: string;
  title?: string;
  class?: string;
}

export const ErrorMessage = component$<ErrorMessageProps>(
  ({
    message,
    title = $localize`Configuration Error`,
    class: className = "",
  }) => {
    if (!message) return null;

    return (
      <div
        class={`animate-fadeIn flex items-start space-x-3 rounded-lg
      border border-error-200 
      bg-error-50 p-4 dark:border-error-800
      dark:bg-error-900/50 ${className}`}
      >
        <svg
          class="mt-0.5 h-5 w-5 text-error-500 dark:text-error-400"
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
          <h3 class="text-sm font-medium text-error-900 dark:text-error-200">
            {title}
          </h3>
          <p class="mt-1 text-sm text-error-700 dark:text-error-300">
            {message}
          </p>
        </div>
      </div>
    );
  },
);
