import { component$ } from "@builder.io/qwik";

export interface CStepperErrorsProps {
  hasError: boolean;
  errorMessage: string;
  stepsLength: number;
}

export const CStepperErrors = component$((props: CStepperErrorsProps) => {
  const { hasError, errorMessage, stepsLength } = props;

  // If no error, don't render anything
  if (!hasError) return null;

  return (
    <div 
      class="w-full rounded-xl border border-red-300 bg-red-50 p-6 text-red-800 shadow-sm dark:border-red-800 dark:bg-red-900/30 dark:text-red-400"
      role="alert"
    >
      <h2 class="mb-2 text-lg font-semibold">Stepper Error</h2>
      <p>{errorMessage || 'An unexpected error occurred in the stepper component'}</p>
      {stepsLength === 0 && (
        <p class="mt-4 text-sm">
          Please provide a non-empty array of steps to the stepper component.
        </p>
      )}
    </div>
  );
}); 