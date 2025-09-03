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
  
  // Help system props
  hasHelp?: boolean;
  onShowHelp$?: QRL<() => void>;
  helpButtonLabel?: string;
  isHelpOpen?: boolean;
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
    onComplete$,
    // Help system props
    hasHelp = false,
    onShowHelp$,
    helpButtonLabel = 'Get help for this step',
    isHelpOpen = false
  } = props;
  
  // Determine if the next button should be disabled
  const isNextDisabled = currentStepHasErrors || 
    (!allowSkipSteps && !currentStepIsComplete && !isOptional && !isStepSkippable);
  
  const nextButtonAction = isLastStep ? onComplete$ : onNext$;
  
  return (
    <div class="flex justify-between items-center">
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
      
      {/* Center - Help button */}
      {hasHelp && onShowHelp$ && (
        <div class="flex items-center">
          <button
            type="button"
            onClick$={() => onShowHelp$ && onShowHelp$()}
            class={`
              inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 group
              ${isHelpOpen
                ? 'bg-primary-100 text-primary-700 border-2 border-primary-300 dark:bg-primary-900/50 dark:text-primary-300 dark:border-primary-600'
                : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 dark:hover:border-primary-700'
              }
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            `}
            aria-label={helpButtonLabel}
            title={helpButtonLabel}
          >
            <svg 
              class={`w-5 h-5 transition-transform duration-200 ${isHelpOpen ? 'scale-110' : 'group-hover:scale-110'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            
            {/* Pulse animation for attention */}
            {!isHelpOpen && (
              <span class="absolute -top-1 -right-1 flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
              </span>
            )}
          </button>
        </div>
      )}
      
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