import { component$, $ } from "@builder.io/qwik";
import type { CStepMeta } from "../types";
import type { QRL } from "@builder.io/qwik";

export interface CStepperContentProps {
  currentStep: CStepMeta;
  isLoading: boolean;
  activeStep: number;
  stepNumber: number;
  totalSteps: number;
  stepHeaderText: string;
  handleStepError: QRL<(error: Error) => void>;
  hideStepHeader?: boolean;
}

export const CStepperContent = component$((props: CStepperContentProps) => {
  const { 
    currentStep, 
    isLoading, 
    activeStep, 
    stepHeaderText,
    handleStepError,
    hideStepHeader = false
  } = props;
  
  const currentStepHasErrors = currentStep.validationErrors && 
    currentStep.validationErrors.length > 0;
  
  // Helper function to safely render step component with error boundary
  const renderStepComponent = $(() => {
    try {
      if (typeof currentStep.component === 'function') {
        // For functional components that have been wrapped with $()
        return currentStep.component({});
      } else {
        // For JSX elements or other component types
        return currentStep.component;
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      handleStepError(error);
      
      return (
        <div class="rounded-md bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
          <p>Error rendering step component: {error.message}</p>
        </div>
      );
    }
  });

  return (
    <div 
      class={`rounded-xl border ${
        currentStepHasErrors 
          ? 'border-red-300 dark:border-red-800' 
          : 'border-gray-200 dark:border-gray-700'
      } bg-white shadow-sm dark:bg-gray-800 p-6`}
      role="tabpanel"
      id={`cstepper-step-${activeStep}`}
      aria-labelledby={`step-tab-${activeStep}`}
    >
      {!hideStepHeader && (
        <>
          <h2 
            class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
            id={`step-heading-${activeStep}`}
          >
            {stepHeaderText}
          </h2>
          <p 
            class="mb-6 text-gray-600 dark:text-gray-400"
            id={`step-description-${activeStep}`}
          >
            {currentStep.description}
          </p>
        </>
      )}
      
      {/* Display validation errors if any */}
      {currentStepHasErrors && currentStep.validationErrors && (
        <div 
          class="mb-6 rounded-md bg-red-50 p-4 dark:bg-red-900/20"
          role="alert"
          aria-atomic="true"
        >
          <h3 class="text-sm font-medium text-red-800 dark:text-red-400">
            Please correct the following errors:
          </h3>
          <ul class="mt-2 list-inside list-disc text-sm text-red-700 dark:text-red-300">
            {currentStep.validationErrors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Loading state */}
      {isLoading ? (
        <div class="flex items-center justify-center py-12">
          <div class="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
          <span class="ml-3 text-gray-700 dark:text-gray-300">Loading...</span>
        </div>
      ) : (
        /* Step component with error boundary */
        <div>
          {renderStepComponent()}
        </div>
      )}
    </div>
  );
}); 