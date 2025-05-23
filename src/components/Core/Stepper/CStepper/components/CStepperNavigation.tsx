import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

export interface CStepperNavigationProps {
  activeStep: number;
  currentStepIsComplete: boolean;
  currentStepHasErrors: boolean;
  isLoading: boolean;
  isLastStep: boolean;
  isOptional: boolean;
  allowSkipSteps: boolean;
  isStepSkippable: boolean;
  onPrevious$: QRL<() => void>;
  onNext$: QRL<() => Promise<void>>;
  onComplete$: QRL<() => Promise<void>>;
}

export const CStepperNavigation = component$((props: CStepperNavigationProps) => {
  const { 
    activeStep, 
    currentStepIsComplete, 
    currentStepHasErrors, 
    isLoading, 
    isLastStep,
    isOptional,
    allowSkipSteps,
    isStepSkippable,
    onPrevious$,
    onNext$,
    onComplete$
  } = props;
  
  // Determine if the next button should be disabled
  const isNextDisabled = currentStepHasErrors || 
    (!allowSkipSteps && !currentStepIsComplete && !isOptional && !isStepSkippable);
  
  const nextButtonAction = isLastStep ? onComplete$ : onNext$;
  
  return (
    <div class="flex justify-between">
      {/* Back button */}
      {activeStep > 0 ? (
        <button
          onClick$={onPrevious$}
          class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 
                text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 
                focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 
                dark:text-gray-200 dark:hover:bg-gray-600"
          aria-label="Go to previous step"
          type="button"
        >
          <span>{$localize`Back`}</span>
        </button>
      ) : <div></div>}
      
      {/* Next/Complete button */}
      <button
        onClick$={async () => {
          if (!isNextDisabled) {
            await nextButtonAction();
          }
        }}
        disabled={isNextDisabled}
        class={`inline-flex items-center gap-2 rounded-lg px-6 py-2.5 shadow-sm
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              ${currentStepHasErrors
                  ? 'bg-red-300 text-white cursor-not-allowed dark:bg-red-800/50'
                  : currentStepIsComplete || isOptional || allowSkipSteps || isStepSkippable
                    ? 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'}`}
        aria-label={isLastStep ? "Complete all steps" : "Go to next step"}
        aria-disabled={isNextDisabled}
        type="button"
        data-testid="stepper-next-button"
      >
        <span>
          {isLoading 
            ? $localize`Processing...`
            : isLastStep 
              ? $localize`Save & Complete` 
              : $localize`Next`}
        </span>
      </button>
    </div>
  );
}); 