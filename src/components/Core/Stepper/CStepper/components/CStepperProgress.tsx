import { component$, useSignal, useTask$, $ } from "@builder.io/qwik";
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
  
  // Signal to track if we need condensed mode (too many steps)
  const useCondensedView = useSignal(false);
  const containerRef = useSignal<Element>();
  
  // Calculate which steps to show in condensed mode
  const visibleSteps = useSignal<number[]>([]);
  
  // Calculate visible steps when active step or condensed mode changes
  useTask$(({ track }) => {
    track(() => [steps.length, activeStep, useCondensedView.value]);
    
    if (steps.length > 5) {
      // In condensed mode, show maximum 5 steps:
      // - First step
      // - Previous step (if not first)
      // - Active step
      // - Next step (if not last) 
      // - Last step
      const stepsToShow = new Set<number>();
      
      // Always show first step
      stepsToShow.add(0);
      
      // Always show last step
      stepsToShow.add(steps.length - 1);
      
      // Always show active step
      stepsToShow.add(activeStep);
      
      // Show previous step if possible and not first
      if (activeStep > 0 && activeStep > 1) {
        stepsToShow.add(activeStep - 1);
      }
      
      // Show next step if possible and not last
      if (activeStep < steps.length - 1 && activeStep < steps.length - 2) {
        stepsToShow.add(activeStep + 1);
      }
      
      // Convert to sorted array
      visibleSteps.value = Array.from(stepsToShow).sort((a, b) => a - b);
    } else {
      // Show all steps when 5 or fewer
      visibleSteps.value = steps.map((_, i) => i);
    }
  });
  
  // Set condensed view based on step count
  useTask$(({ track }) => {
    track(() => steps.length);
    
    // Use condensed view when more than 5 steps
    useCondensedView.value = steps.length > 5;
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
        {/* Full width container for stepper */}
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
              
              
              
              // Ensure unique keys by combining step.id with displayIndex
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
                      // When allowSkipSteps is true, allow clicking on any step
                      // Otherwise, only allow clicking the current step
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
                      {/* Icon or number inside the circle */}
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
    </div>
  );
}); 