import { component$ } from "@builder.io/qwik";

export interface StepperErrorsProps {
  hasError: boolean;
  errorMessage: string;
  stepsLength: number;
  stepperType?: 'content' | 'vertical' | 'horizontal';
}

/**
 * Shared error display component for all stepper types
 * Provides consistent error handling UI across different steppers
 */
export const StepperErrors = component$<StepperErrorsProps>((props) => {
  const { hasError, errorMessage, stepsLength, stepperType = 'content' } = props;

  if (!hasError) return null;

  const getStepperTypeName = () => {
    switch (stepperType) {
      case 'vertical': return 'Vertical Stepper';
      case 'horizontal': return 'Horizontal Stepper';
      default: return 'Stepper';
    }
  };

  return (
    <div class="w-full p-4" role="alert" aria-live="assertive">
      <div class="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            {/* Error Icon */}
            <svg
              class="h-5 w-5 text-red-600 dark:text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
              {getStepperTypeName()} Error
            </h3>
            <div class="mt-2 text-sm text-red-700 dark:text-red-300">
              <p>{errorMessage || 'An error occurred while rendering the stepper.'}</p>
              {stepsLength === 0 && (
                <p class="mt-1">
                  No steps were provided. Please ensure at least one step is configured.
                </p>
              )}
            </div>
            <div class="mt-4">
              <button
                type="button"
                onClick$={() => window.location.reload()}
                class="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
              >
                Reload page
                <span aria-hidden="true"> →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});