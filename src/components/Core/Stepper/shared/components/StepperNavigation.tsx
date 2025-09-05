import { component$, type QRL } from "@builder.io/qwik";
import { HelpSettingsToggle } from "../../HStepper/HStepperProgress";

export interface StepperNavigationProps {
  activeStep: number;
  totalSteps: number;
  currentStepIsComplete?: boolean;
  currentStepHasErrors?: boolean;
  isLoading?: boolean;
  isLastStep: boolean;
  isOptional?: boolean;
  allowSkipSteps?: boolean;
  isStepSkippable?: boolean;
  onPrevious$: QRL<() => void>;
  onNext$: QRL<() => void>;
  onComplete$?: QRL<() => void>;
  stepperType?: 'content' | 'vertical' | 'horizontal';
  
  // Help system props
  hasHelp?: boolean;
  onShowHelp$?: QRL<() => void>;
  helpButtonLabel?: string;
  isHelpOpen?: boolean;
}

/**
 * Shared navigation component for all stepper types
 * Provides consistent navigation interface across different steppers
 */
export const StepperNavigation = component$<StepperNavigationProps>((props) => {
  const {
    activeStep,
    totalSteps,
    currentStepIsComplete = false,
    currentStepHasErrors = false,
    isLoading = false,
    isLastStep,
    isOptional = false,
    allowSkipSteps = false,
    isStepSkippable = false,
    onPrevious$,
    onNext$,
    onComplete$,
    stepperType = 'content',
    // Help system props
    hasHelp = false,
    onShowHelp$,
    helpButtonLabel = 'Get help for this step',
    isHelpOpen = false
  } = props;

  const getNavigationClass = () => {
    const baseClass = "flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700";
    switch (stepperType) {
      case 'vertical': return `${baseClass} stepper-navigation-vertical`;
      case 'horizontal': return `${baseClass} stepper-navigation-horizontal`;
      default: return `${baseClass} stepper-navigation-content`;
    }
  };

  const canSkip = allowSkipSteps || isStepSkippable || isOptional;
  const canProceed = currentStepIsComplete || canSkip;

  return (
    <div class={getNavigationClass()}>
      <div class="flex items-center gap-2">
        {/* Previous button */}
        <button
          type="button"
          onClick$={onPrevious$}
          disabled={activeStep === 0}
          class={`
            inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
            ${activeStep === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }
          `}
          aria-label="Go to previous step"
        >
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          {$localize`Previous`}
        </button>

        {/* Step indicator */}
        <span class="text-sm text-gray-600 dark:text-gray-400">
          {$localize`Step ${activeStep + 1} of ${totalSteps}`}
        </span>
      </div>

      {/* Center section - Help controls */}
      <div class="flex flex-col items-center gap-2">
        {/* Help button */}
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
            
            {/* Help tooltip */}
            <div class="ml-2 hidden md:block">
              <span class="text-xs text-gray-500 dark:text-gray-400">
                Press <kbd class="px-1.5 py-0.5 text-xs font-mono font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">?</kbd> for help
              </span>
            </div>
          </div>
        )}
        
        {/* Global Help Settings Toggle */}
        <HelpSettingsToggle 
          size="sm" 
          class="text-xs text-gray-600 dark:text-gray-400"
        />
      </div>

      <div class="flex items-center gap-2">
        {/* Optional/Skip indicator */}
        {canSkip && !isLastStep && (
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {isOptional && $localize`(Optional)`}
            {isStepSkippable && !isOptional && $localize`(Skippable)`}
          </span>
        )}

        {/* Next/Complete button */}
        <button
          type="button"
          onClick$={() => {
            if (isLastStep && currentStepIsComplete && onComplete$) {
              onComplete$();
            } else {
              onNext$();
            }
          }}
          disabled={!canProceed || currentStepHasErrors || isLoading}
          class={`
            inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
            ${!canProceed || currentStepHasErrors || isLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
              : isLastStep
                ? 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600'
                : 'bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600'
            }
          `}
          aria-label={isLastStep ? "Complete stepper" : "Go to next step"}
        >
          {isLoading ? (
            <>
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {$localize`Loading...`}
            </>
          ) : (
            <>
              {isLastStep ? (
                <>
                  {$localize`Complete`}
                  <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </>
              ) : (
                <>
                  {currentStepIsComplete ? $localize`Next` : canSkip ? $localize`Skip` : $localize`Continue`}
                  <svg class="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </>
          )}
        </button>
      </div>

      {/* Error message */}
      {currentStepHasErrors && (
        <div class="absolute -bottom-8 right-0 text-sm text-red-600 dark:text-red-400">
          {$localize`Please fix errors before proceeding`}
        </div>
      )}
    </div>
  );
});