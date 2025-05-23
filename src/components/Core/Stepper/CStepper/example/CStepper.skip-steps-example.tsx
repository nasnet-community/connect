import { component$, useSignal } from "@builder.io/qwik";
import { CStepper, type CStepMeta } from "../index";

/**
 * Simple Step Component
 */
const SimpleStep = component$(({ stepNumber }: { stepNumber: number }) => {
  const isComplete = useSignal(false);
  
  return (
    <div class="space-y-4">
      <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
        <h3 class="font-medium mb-2">Step {stepNumber} Content</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          This step is {isComplete.value ? 'completed' : 'not completed'}.
          Notice that you can still navigate to the next step even when not completed.
        </p>
      </div>
      
      <div class="flex items-center space-x-2">
        <input 
          type="checkbox" 
          id={`complete-step-${stepNumber}`}
          checked={isComplete.value}
          onChange$={() => {
            isComplete.value = !isComplete.value;
          }}
          class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:bg-gray-700"
        />
        <label for={`complete-step-${stepNumber}`} class="text-sm">
          Mark this step as complete
        </label>
      </div>
    </div>
  );
});

/**
 * Example component showing how the allowSkipSteps property works
 */
export const CStepperSkipStepsExample = component$(() => {
  const allowSkipSteps = useSignal(true);
  
  // Define steps
  const steps = useSignal<CStepMeta[]>([
    {
      id: 1,
      title: "Step One",
      description: "First step in the process",
      component: <SimpleStep stepNumber={1} />,
      isComplete: false
    },
    {
      id: 2,
      title: "Step Two",
      description: "Second step in the process",
      component: <SimpleStep stepNumber={2} />,
      isComplete: false
    },
    {
      id: 3,
      title: "Step Three",
      description: "Third step in the process",
      component: <SimpleStep stepNumber={3} />,
      isComplete: false
    },
    {
      id: 4,
      title: "Final Step",
      description: "Complete the process",
      component: <SimpleStep stepNumber={4} />,
      isComplete: false
    }
  ]);
  
  return (
    <div class="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Skip Steps Example
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          This example demonstrates how to allow users to navigate through steps even when they're not complete.
        </p>
      </div>
      
      {/* Toggle for allow skip steps mode */}
      <div class="flex items-center p-4 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <input 
          type="checkbox"
          id="skip-mode-toggle"
          checked={allowSkipSteps.value}
          onChange$={() => allowSkipSteps.value = !allowSkipSteps.value}
          class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700"
        />
        <label 
          for="skip-mode-toggle" 
          class="ml-2 text-sm text-blue-800 dark:text-blue-200"
        >
          Allow skipping incomplete steps
        </label>
        
        <div class="ml-auto text-xs text-blue-600 dark:text-blue-400">
          {allowSkipSteps.value ? "Skip steps enabled" : "Skip steps disabled"}
        </div>
      </div>
      
      <CStepper 
        steps={steps.value}
        allowSkipSteps={allowSkipSteps.value}
        onComplete$={() => alert("All steps completed!")}
      />
      
      <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
        <h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">How it works</h3>
        <ul class="list-disc pl-5 text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
          <li>Toggle the checkbox above to enable/disable the ability to skip steps</li>
          <li>With skip steps enabled, the Next button is always clickable</li>
          <li>With skip steps disabled, you need to mark each step as complete before proceeding</li>
          <li>This feature is useful for wizard-like interfaces where some steps are optional</li>
        </ul>
      </div>
    </div>
  );
}); 