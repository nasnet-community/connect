import { component$, useSignal, useTask$, $, useVisibleTask$ } from "@builder.io/qwik";
import type { CStepMeta } from "../types";
import type { QRL } from "@builder.io/qwik";
import type { JSX } from "@builder.io/qwik";

export interface CStepperProgressProps {
  steps: CStepMeta[];
  activeStep: number;
  onStepClick$: QRL<(index: number) => void>;
  customIcons?: Record<number, JSX.Element>; // Custom icons for specific steps by id
  useNumbers?: boolean; // Whether to use numbers instead of icons for completed steps
  allowSkipSteps?: boolean; // Whether to allow skipping to completed steps
}

export const CStepperProgress = component$((props: CStepperProgressProps) => {
  const { steps, activeStep, onStepClick$, customIcons = {}, useNumbers = false, allowSkipSteps = false } = props;

  const containerRef = useSignal<Element>();
  const scrollContainerRef = useSignal<HTMLDivElement>();
  const hasShownScrollHint = useSignal(false);

  // Calculate which steps to show - always show all steps
  const visibleSteps = useSignal<number[]>([]);
  
  // Calculate visible steps - always show all steps
  useTask$(({ track }) => {
    track(() => [steps.length, activeStep]);

    // Always show all steps
    visibleSteps.value = steps.map((_, i) => i);
  });

  // Auto-scroll to active step for 6+ steps
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => activeStep);

    // Only apply scroll behavior if we have more than 5 steps
    if (steps.length > 5 && scrollContainerRef.value) {
      const activeStepEl = scrollContainerRef.value.querySelector(`[data-step-index="${activeStep}"]`);
      if (activeStepEl) {
        activeStepEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  });

  // Show scroll hint animation on mount (only once for 6+ steps)
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (steps.length > 5 && scrollContainerRef.value && !hasShownScrollHint.value) {
      hasShownScrollHint.value = true;

      // Delay to ensure component is fully rendered
      setTimeout(() => {
        if (scrollContainerRef.value) {
          // Subtle scroll right to hint scrollability
          scrollContainerRef.value.scrollBy({ left: 100, behavior: 'smooth' });

          // Scroll back after a brief pause
          setTimeout(() => {
            if (scrollContainerRef.value) {
              scrollContainerRef.value.scrollBy({ left: -100, behavior: 'smooth' });
            }
          }, 800);
        }
      }, 500);
    }
  });
  
  // Function to render step indicator content
  const renderStepIndicator = (stepIndex: number, isComplete: boolean, isCurrent: boolean, hasErrors: boolean) => {
    const step = steps[stepIndex];
    
    // If custom icon is provided for this step, render it
    if (customIcons[step.id]) {
      return customIcons[step.id];
    }
    
    // Otherwise follow default rendering logic
    if (hasErrors) {
      return <span class="text-red-600 dark:text-red-400 text-sm font-semibold">!</span>;
    } 
    
    if (isComplete && !useNumbers) {
      return (
        <svg class="w-5 h-5 text-white dark:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
        </svg>
      );
    } 
    
    // Show number when step is not complete or when useNumbers=true
    return (
      <span class={`text-sm font-medium
        ${isCurrent 
          ? 'text-yellow-600 dark:text-yellow-400' 
          : isComplete && useNumbers 
            ? 'text-white dark:text-gray-900'
            : 'text-gray-600 dark:text-gray-400'}`
      }>{stepIndex + 1}</span>
    );
  };
  
  return (
    <div class="pt-2 pb-8 flex flex-col items-center w-full" ref={containerRef}>
      {/* Mobile view: vertical stepper */}
      <div class="flex justify-center w-full sm:hidden">
        <ol class="relative border-l border-gray-200 dark:border-gray-700 ml-4 space-y-6">
        {steps.map((step, index) => {
          const isComplete = activeStep > index;
          const isCurrent = activeStep === index;
          const hasErrors = step.validationErrors && step.validationErrors.length > 0 ? true : false;
          
          return (
            <li key={`step-${step.id}-mobile-${index}`} class="mb-10 ml-4">
              <div 
                class={`absolute flex items-center justify-center w-9 h-9 rounded-full -left-4.5 ring-8 ring-white dark:ring-gray-900 
                ${hasErrors 
                  ? 'bg-red-100 dark:bg-red-900/30' 
                  : isComplete 
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300' 
                    : isCurrent 
                      ? 'bg-white dark:bg-gray-800 border-2 border-yellow-500' 
                      : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600'}
                ${allowSkipSteps || isCurrent ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                onClick$={step.isDisabled ? undefined : $(() => {
                  // When allowSkipSteps is true, allow clicking on any step
                  // Otherwise, only allow clicking the current step
                  if (allowSkipSteps || isCurrent) {
                    onStepClick$(index);
                  }
                })}
              >
                {renderStepIndicator(index, isComplete, isCurrent, hasErrors)}
              </div>
              <div class={`ml-2 ${step.isDisabled ? 'opacity-50' : ''}`}>
                <h3 class={`font-medium text-sm 
                  ${isCurrent 
                    ? 'text-yellow-600 dark:text-yellow-400' 
                    : isComplete 
                      ? 'text-gray-900 dark:text-gray-200' 
                      : 'text-gray-500 dark:text-gray-400'}`}>
                  {step.title}
                </h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {step.isOptional && <span class="italic">(Optional)</span>}
                </p>
              </div>
            </li>
          );
        })}
        </ol>
      </div>

      {/* Desktop view: horizontal stepper */}
      <div class="hidden sm:flex justify-center w-full px-2">
        {/* For 5 or fewer steps: use existing full-width layout */}
        {steps.length <= 5 ? (
          <div class="relative w-full" style={{ minHeight: "80px" }}>
            {/* Progress line that spans full width */}
            <div class="absolute top-[18px] left-0 right-0 h-1 z-0">
              {/* Progress track (background) */}
              <div
                class="h-1 bg-gray-200 dark:bg-gray-700 w-full"
                aria-hidden="true"
              ></div>

              {/* Progress bar (filled part) */}
              <div
                class="absolute top-0 left-0 h-1 bg-yellow-500 dark:bg-yellow-400 transition-all duration-500"
                style={{ width: `${Math.min(100, (activeStep / (steps.length - 1)) * 100)}%` }}
                aria-hidden="true"
              ></div>
            </div>

            {/* Step nodes container */}
            <div class="flex justify-between items-start w-full px-4 pt-0 relative z-10" style={{ minHeight: "80px" }}>
              {visibleSteps.value.map((stepIndex, displayIndex) => {
                const step = steps[stepIndex];
                const isComplete = activeStep > stepIndex;
                const isCurrent = activeStep === stepIndex;
                const hasErrors = step.validationErrors && step.validationErrors.length > 0 ? true : false;

                return (
                  <div key={`step-${step.id}-display-${displayIndex}`} class="flex flex-col items-center">
                    {/* Step button */}
                    <button
                      class={`flex items-center justify-center outline-none rounded-full w-9 h-9 transition-all duration-200
                            ${step.isDisabled
                              ? 'cursor-not-allowed opacity-60'
                              : allowSkipSteps || isCurrent
                                ? 'cursor-pointer hover:scale-110'
                                : 'cursor-not-allowed opacity-60'}`}
                      onClick$={step.isDisabled ? undefined : $(() => {
                        if (allowSkipSteps || isCurrent) {
                          onStepClick$(stepIndex);
                        }
                      })}
                      disabled={step.isDisabled}
                      aria-disabled={step.isDisabled}
                      aria-current={isCurrent ? 'step' : undefined}
                      aria-label={`Go to step ${stepIndex + 1}: ${step.title}`}
                      type="button"
                    >
                      {/* Step indicator circle */}
                      <div
                        class={`w-9 h-9 rounded-full transition-all duration-300 flex items-center justify-center
                              ${hasErrors
                                ? 'bg-red-100 border border-red-300 dark:bg-red-900/20 dark:border-red-700'
                                : isComplete
                                  ? 'bg-yellow-500 dark:bg-yellow-400'
                                  : isCurrent
                                    ? 'bg-white dark:bg-gray-900 border-4 border-yellow-500 dark:border-yellow-400'
                                    : 'bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600'
                              }`}
                      >
                        {renderStepIndicator(stepIndex, isComplete, isCurrent, hasErrors)}
                      </div>
                    </button>

                    {/* Step title */}
                    <div class={`text-center mt-4 ${isCurrent ? 'font-medium' : ''}`}>
                      <div
                        class={`text-xs max-w-[90px] break-words hyphens-auto leading-tight
                              ${isCurrent
                                ? 'text-yellow-700 dark:text-yellow-300'
                                : isComplete
                                  ? 'text-gray-800 dark:text-gray-200'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}
                      >
                        {step.title}
                      </div>
                      {step.isOptional && (
                        <div class="text-[9px] text-gray-400 dark:text-gray-500 mt-0.5">
                          (Optional)
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* For 6+ steps: use scrollable container */
          <div class="relative w-full" style={{ minHeight: "80px" }}>
            {/* Scrollable container with snap */}
            <div
              ref={scrollContainerRef}
              class="overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgb(209 213 219) transparent"
              }}
            >
              {/* Inner flex container with consistent gaps */}
              <div class="flex gap-8 px-8 pt-0 relative" style={{ minHeight: "80px", minWidth: "min-content" }}>
                {/* Progress line (decorative, not full width) */}
                <div class="absolute top-[18px] left-0 right-0 h-1 z-0 pointer-events-none">
                  <div class="h-1 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
                </div>

                {visibleSteps.value.map((stepIndex, displayIndex) => {
                  const step = steps[stepIndex];
                  const isComplete = activeStep > stepIndex;
                  const isCurrent = activeStep === stepIndex;
                  const hasErrors = step.validationErrors && step.validationErrors.length > 0 ? true : false;

                  return (
                    <div
                      key={`step-${step.id}-display-${displayIndex}`}
                      data-step-index={stepIndex}
                      class="flex flex-col items-center snap-center flex-shrink-0 relative z-10"
                    >
                      {/* Step button */}
                      <button
                        class={`flex items-center justify-center outline-none rounded-full w-9 h-9 transition-all duration-200
                              ${step.isDisabled
                                ? 'cursor-not-allowed opacity-60'
                                : allowSkipSteps || isCurrent
                                  ? 'cursor-pointer hover:scale-110'
                                  : 'cursor-not-allowed opacity-60'}`}
                        onClick$={step.isDisabled ? undefined : $(() => {
                          if (allowSkipSteps || isCurrent) {
                            onStepClick$(stepIndex);
                          }
                        })}
                        disabled={step.isDisabled}
                        aria-disabled={step.isDisabled}
                        aria-current={isCurrent ? 'step' : undefined}
                        aria-label={`Go to step ${stepIndex + 1}: ${step.title}`}
                        type="button"
                      >
                        {/* Step indicator circle */}
                        <div
                          class={`w-9 h-9 rounded-full transition-all duration-300 flex items-center justify-center
                                ${hasErrors
                                  ? 'bg-red-100 border border-red-300 dark:bg-red-900/20 dark:border-red-700'
                                  : isComplete
                                    ? 'bg-yellow-500 dark:bg-yellow-400'
                                    : isCurrent
                                      ? 'bg-white dark:bg-gray-900 border-4 border-yellow-500 dark:border-yellow-400'
                                      : 'bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600'
                                }`}
                        >
                          {renderStepIndicator(stepIndex, isComplete, isCurrent, hasErrors)}
                        </div>
                      </button>

                      {/* Step title */}
                      <div class={`text-center mt-4 ${isCurrent ? 'font-medium' : ''}`}>
                        <div
                          class={`text-xs max-w-[90px] break-words hyphens-auto leading-tight
                                ${isCurrent
                                  ? 'text-yellow-700 dark:text-yellow-300'
                                  : isComplete
                                    ? 'text-gray-800 dark:text-gray-200'
                                    : 'text-gray-500 dark:text-gray-400'
                                }`}
                        >
                          {step.title}
                        </div>
                        {step.isOptional && (
                          <div class="text-[9px] text-gray-400 dark:text-gray-500 mt-0.5">
                            (Optional)
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}); 