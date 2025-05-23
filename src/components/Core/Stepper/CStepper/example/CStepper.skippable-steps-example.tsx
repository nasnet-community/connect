import { component$, useSignal } from "@builder.io/qwik";
import { CStepper, type CStepMeta } from "../index";

/**
 * Simple Step Component that shows if it's skippable
 */
const StepContent = component$(({ stepNumber, isSkippable }: { stepNumber: number; isSkippable: boolean }) => {
  const isComplete = useSignal(false);
  
  return (
    <div class="space-y-4">
      <div class={`p-4 rounded-md ${isSkippable ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}>
        <div class="flex items-center justify-between mb-2">
          <h3 class="font-medium">Step {stepNumber} Content</h3>
          {isSkippable && (
            <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              Skippable
            </span>
          )}
        </div>
        
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {isSkippable 
            ? "This step is marked as skippable, so you can proceed without completing it." 
            : "This step must be completed before proceeding."}
        </p>
        
        <div class="mt-4 text-sm">
          <div class="font-medium">Current status:</div>
          <div class={isComplete.value ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400"}>
            {isComplete.value ? "Completed" : "Not completed"}
          </div>
        </div>
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
 * Example component showing how to use skippable steps
 */
export const CStepperSkippableStepsExample = component$(() => {
  // Define steps with some marked as skippable
  const steps = useSignal<CStepMeta[]>([
    {
      id: 1,
      title: "Required Step",
      description: "This step must be completed",
      component: <StepContent stepNumber={1} isSkippable={false} />,
      isComplete: false
    },
    {
      id: 2,
      title: "Optional Details",
      description: "This step can be skipped",
      component: <StepContent stepNumber={2} isSkippable={true} />,
      isComplete: false,
      skippable: true // Mark this step as skippable
    },
    {
      id: 3,
      title: "Required Information",
      description: "Another required step",
      component: <StepContent stepNumber={3} isSkippable={false} />,
      isComplete: false
    },
    {
      id: 4,
      title: "Additional Info",
      description: "This step can be skipped",
      component: <StepContent stepNumber={4} isSkippable={true} />,
      isComplete: false,
      skippable: true // Mark this step as skippable
    },
    {
      id: 5,
      title: "Review & Submit",
      description: "Final step to review and submit",
      component: <StepContent stepNumber={5} isSkippable={false} />,
      isComplete: false
    }
  ]);
  
  return (
    <div class="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Skippable Steps Example
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          This example demonstrates how to mark specific steps as skippable, while keeping others required.
        </p>
      </div>
      
      <div class="p-4 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 mb-4">
        <h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Demonstration</h3>
        <ul class="list-disc pl-5 text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
          <li>Notice that steps 2 and 4 are marked as <b>skippable</b></li>
          <li>You can proceed past these steps without completing them</li>
          <li>Required steps must still be completed before proceeding</li>
          <li>The Next button is enabled for skippable steps even if they're not completed</li>
        </ul>
      </div>
      
      <CStepper 
        steps={steps.value}
        onComplete$={() => alert("All steps completed or skipped!")}
      />
      
      <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700 mt-8">
        <h3 class="text-md font-medium mb-2">How to Use Skippable Steps</h3>
        <div class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>To mark a step as skippable, add the <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">skippable: true</code> property to your step definition:</p>
          <pre class="bg-gray-200 dark:bg-gray-700 p-2 rounded overflow-x-auto text-xs">
{`{
  id: 2,
  title: "Optional Details",
  description: "This step can be skipped",
  component: <YourComponent />,
  isComplete: false,
  skippable: true  // This makes the step skippable
}`}
          </pre>
          <p>This approach provides more granular control compared to the global <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">allowSkipSteps</code> property.</p>
        </div>
      </div>
    </div>
  );
}); 