import { component$, useVisibleTask$, $ } from "@builder.io/qwik";
import type { CStepperProps } from "./types";
import { useCStepper } from "./hooks/useCStepper";
import { CStepperContextId } from "./hooks/useStepperContext";
import { useProvideStepperContext } from "./hooks/useProvideStepperContext";
import { CStepperErrors } from "./components/CStepperErrors";
import { CStepperContent } from "./components/CStepperContent";

/**
 * Content-focused stepper component with top navigation
 */
export const CStepper = component$((props: CStepperProps) => {
  // Get all stepper functionality from useCStepper hook
  const { 
    activeStep, 
    steps, 
    handleNext$, 
    handlePrev$, 
    setStep$,
    hasError,
    errorMessage,
    isLoading,
    handleStepError,
    handleNextClick
  } = useCStepper(props);

  // Use the useProvideStepperContext hook to create and provide the context
  useProvideStepperContext({
    contextId: props.contextId || CStepperContextId,
    steps,
    activeStep,
    setStep$,
    handleNext$,
    handlePrev$,
    data: props.contextValue || {},
    onStepComplete$: props.onStepComplete$,
    persistState: props.persistState
  });

  // Setup focus management for accessibility
  useVisibleTask$(({ track }) => {
    track(() => activeStep.value);
    
    // Focus the active step element after step change
    setTimeout(() => {
      const activeStepEl = document.getElementById(`cstepper-step-${activeStep.value}`);
      if (activeStepEl) {
        const focusableEl = activeStepEl.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableEl) {
          (focusableEl as HTMLElement).focus();
        } else {
          activeStepEl.setAttribute('tabindex', '-1');
          activeStepEl.focus();
        }
      }
    }, 100);
  });

  // Render error state if there are issues with the stepper
  if (hasError.value) {
    return (
      <CStepperErrors 
        hasError={hasError.value}
        errorMessage={errorMessage.value}
        stepsLength={steps.value.length}
      />
    );
  }

  // Don't render anything if there are no steps
  if (!steps.value.length) return null;

  // Calculate some values for the current step
  const stepNumber = activeStep.value + 1;
  const stepTitle = steps.value[activeStep.value].title;
  const stepHeaderText = `Step ${stepNumber}: ${stepTitle}`;
  const totalSteps = steps.value.length;
  const isLastStep = activeStep.value === totalSteps - 1;
  const currentStepIsComplete = steps.value[activeStep.value].isComplete;
  const currentStep = steps.value[activeStep.value];
  const currentStepHasErrors = Boolean(currentStep.validationErrors && currentStep.validationErrors.length > 0);
  const isOptional = Boolean(currentStep.isOptional);

  return (
    <div class="w-full" role="application" aria-label="Multi-step form">
      {/* Step Progress Indicator */}
      <div class="pb-4">
        <div 
          class="flex items-center justify-between" 
          role="tablist" 
          aria-label="Progress steps"
        >
          {steps.value.map((step, index) => (
            <div 
              key={step.id}
              class={`flex-1 cursor-pointer ${
                step.isDisabled ? 'opacity-50 cursor-not-allowed' :
                activeStep.value >= index 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-500'
              }`}
              onClick$={!step.isDisabled ? $((/* event here to force scope capture */) => setStep$(index)) : undefined}
              role="tab"
              id={`step-tab-${index}`}
              aria-selected={activeStep.value === index}
              aria-controls={`cstepper-step-${index}`}
              aria-disabled={step.isDisabled}
              tabIndex={activeStep.value === index ? 0 : -1}
              onKeyDown$={$((e) => {
                if (!step.isDisabled && (e.key === 'Enter' || e.key === ' ')) {
                  setStep$(index);
                  e.preventDefault();
                }
              })}
            >
              <div class="flex items-center">
                <div 
                  class={`flex h-8 w-8 items-center justify-center rounded-full ${
                    step.validationErrors && step.validationErrors.length > 0
                      ? 'bg-red-100 dark:bg-red-900/30' 
                      : activeStep.value >= index 
                        ? 'bg-primary-100 dark:bg-primary-900/30' 
                        : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  aria-hidden="true"
                >
                  {step.validationErrors && step.validationErrors.length > 0 ? (
                    <span class="text-sm font-medium text-red-600 dark:text-red-400">!</span>
                  ) : (
                    <span class={`text-sm font-medium ${
                      activeStep.value >= index 
                        ? 'text-primary-600 dark:text-primary-400' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>{index + 1}</span>
                  )}
                </div>
                <div class="ml-2">
                  <span class="text-sm font-medium">{step.title}</span>
                  {step.isOptional && (
                    <span class="ml-1 text-xs text-gray-500 dark:text-gray-400">(Optional)</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Progress lines between steps */}
        <div 
          class="mt-4 grid" 
          style={{ 
            gridTemplateColumns: `repeat(${steps.value.length - 1}, 1fr)`, 
            gap: '8px' 
          }}
          role="presentation"
        >
          {Array.from({ length: steps.value.length - 1 }).map((_, idx) => (
            <div key={idx} class="flex-grow">
              <div 
                class={`h-1 w-full rounded ${
                  activeStep.value > idx 
                    ? 'bg-primary-500 dark:bg-primary-400' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
                aria-hidden="true"
              ></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Step Content */}
      <div class="space-y-6">
        <CStepperContent
          currentStep={currentStep}
          isLoading={isLoading.value}
          activeStep={activeStep.value}
          stepNumber={stepNumber}
          totalSteps={totalSteps}
          stepHeaderText={stepHeaderText}
          handleStepError={handleStepError}
        />
        
        {/* Navigation Buttons */}
        <div class="flex justify-between">
          {activeStep.value > 0 ? (
            <button
              onClick$={handlePrev$}
              class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 
                    text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 
                    focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 
                    dark:text-gray-200 dark:hover:bg-gray-600"
              aria-label="Go to previous step"
            >
              <span>{$localize`Back`}</span>
            </button>
          ) : <div></div>}
          
          <button
            onClick$={handleNextClick}
            disabled={currentStepHasErrors || (!currentStepIsComplete && !isOptional)}
            class={`inline-flex items-center gap-2 rounded-lg px-6 py-2.5 shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  ${currentStepHasErrors
                      ? 'bg-red-300 text-white cursor-not-allowed dark:bg-red-800/50'
                      : currentStepIsComplete || isOptional
                        ? 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'}`}
            aria-label={isLastStep ? "Complete all steps" : "Go to next step"}
            aria-disabled={currentStepHasErrors || (!currentStepIsComplete && !isOptional)}
          >
            <span>
              {isLoading.value 
                ? $localize`Processing...`
                : isLastStep 
                  ? $localize`Save & Complete` 
                  : $localize`Next`}
            </span>
          </button>
        </div>
        
        {/* Accessible progress indicator */}
        <div class="sr-only" aria-live="polite">
          {$localize`Step ${stepNumber} of ${totalSteps}\: ${stepTitle}`}
          {currentStepIsComplete ? $localize`Step is complete` : $localize`Step is incomplete`}
          {currentStepHasErrors ? $localize`Step has validation errors` : ''}
        </div>
      </div>
    </div>
  );
}); 