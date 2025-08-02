import { component$ } from "@builder.io/qwik";

export interface ValidationMessageProps {
  errors: string[];
  type?: "error" | "warning" | "info";
}

export const ValidationMessage = component$<ValidationMessageProps>(
  ({ errors, type = "error" }) => {
    if (errors.length === 0) return null;

    const getStyles = () => {
      switch (type) {
        case "error":
          return "bg-error-50 border-error-200 text-error-700 dark:bg-error-900/20 dark:border-error-800 dark:text-error-300";
        case "warning":
          return "bg-warning-50 border-warning-200 text-warning-700 dark:bg-warning-900/20 dark:border-warning-800 dark:text-warning-300";
        case "info":
          return "bg-info-50 border-info-200 text-info-700 dark:bg-info-900/20 dark:border-info-800 dark:text-info-300";
      }
    };

    const getIcon = () => {
      switch (type) {
        case "error":
          return (
            <svg
              class="h-5 w-5"
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
          );
        case "warning":
          return (
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          );
        case "info":
          return (
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          );
      }
    };

    return (
      <div class={`rounded-md border p-4 ${getStyles()}`}>
        <div class="flex">
          <div class="flex-shrink-0">{getIcon()}</div>
          <div class="ml-3">
            <h3 class="text-sm font-medium">
              {type === "error" && $localize`Validation Error`}
              {type === "warning" && $localize`Warning`}
              {type === "info" && $localize`Information`}
            </h3>
            <div class="mt-2 text-sm">
              <ul class="list-inside list-disc space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
