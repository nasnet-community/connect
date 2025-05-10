import { component$ } from "@builder.io/qwik";
import type { CStepperProps } from "./types";
import { useCStepper } from "./useCStepper";

export const CStepper = component$((props: CStepperProps) => {
  const { activeStep, steps, handleNext$, handlePrev$, setStep$ } = useCStepper(props);
  
  if (!steps.value.length) return null;

  const CurrentStepComponent = steps.value[activeStep.value].component;
  
  const stepNumber = activeStep.value + 1;
  const stepTitle = steps.value[activeStep.value].title;
  const stepHeaderText = `Step ${stepNumber}: ${stepTitle}`;

  return (
    <div class="w-full">
      {/* Step Progress Indicator */}
      <div class="pb-4">
        <div class="flex items-center justify-between">
          {steps.value.map((step, index) => (
            <div 
              key={step.id}
              class={`flex-1 cursor-pointer ${
                activeStep.value >= index 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-500'
              }`}
              onClick$={() => setStep$(index)}
            >
              <div class="flex items-center">
                <div class={`flex h-8 w-8 items-center justify-center rounded-full ${
                  activeStep.value >= index 
                    ? 'bg-primary-100 dark:bg-primary-900/30' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  <span class={`text-sm font-medium ${
                    activeStep.value >= index 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>{index + 1}</span>
                </div>
                <div class="ml-2">
                  <span class="text-sm font-medium">{step.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Progress lines between steps */}
        <div class="mt-4 grid" 
          style={{ 
            gridTemplateColumns: `repeat(${steps.value.length - 1}, 1fr)`, 
            gap: '8px' 
          }}
        >
          {Array.from({ length: steps.value.length - 1 }).map((_, idx) => (
            <div key={idx} class="flex-grow">
              <div class={`h-1 w-full rounded ${
                activeStep.value > idx 
                  ? 'bg-primary-500 dark:bg-primary-400' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Step Content */}
      <div class="space-y-6">
        <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 p-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {stepHeaderText}
          </h2>
          <p class="mb-6 text-gray-600 dark:text-gray-400">
            {steps.value[activeStep.value].description}
          </p>
          
          <CurrentStepComponent />
        </div>
        
        {/* Navigation Buttons */}
        <div class="flex justify-between">
          {activeStep.value > 0 ? (
            <button
              onClick$={handlePrev$}
              class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 
                    text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 
                    focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 
                    dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <span>{$localize`Back`}</span>
            </button>
          ) : <div></div>}
          
          <button
            onClick$={handleNext$}
            disabled={!steps.value[activeStep.value].isComplete}
            class={`inline-flex items-center gap-2 rounded-lg px-6 py-2.5 shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  ${steps.value[activeStep.value].isComplete 
                    ? 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'}`}
          >
            <span>
              {activeStep.value < steps.value.length - 1 
                ? $localize`Next` 
                : $localize`Save & Complete`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}); 