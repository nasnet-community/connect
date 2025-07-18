import { component$, useSignal, $ } from "@builder.io/qwik";
import { CStepper, type CStepMeta } from "../index";

/**
 * Simple step content component
 * Used for both initial and dynamically added steps
 */
const StepContent = component$(({ stepNumber }: { stepNumber: number }) => {
  const isComplete = useSignal(false);

  return (
    <div class="space-y-4">
      <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
        <h3 class="font-medium mb-2">Step {stepNumber} Content</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          This is the content for step {stepNumber}. Mark it as complete to proceed.
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
 * Example component showing how to add steps dynamically
 */
export const CStepperDynamicStepsExample = component$(() => {
  // Track the next step ID to ensure uniqueness
  const nextStepId = useSignal(3);
  
  // Track the steps array
  const steps = useSignal<CStepMeta[]>([
    {
      id: 1,
      title: "First Step",
      description: "This is the first step",
      component: <StepContent stepNumber={1} />,
      isComplete: false
    },
    {
      id: 2,
      title: "Second Step",
      description: "This is the second step",
      component: <StepContent stepNumber={2} />,
      isComplete: false
    }
  ]);
  
  // Function to add a new step
  const addStep = $(() => {
    const newStepId = nextStepId.value++;
    const newStep: CStepMeta = {
      id: newStepId,
      title: `Step ${newStepId}`,
      description: `This is step ${newStepId}`,
      component: <StepContent stepNumber={newStepId} />,
      isComplete: false
    };
    
    // Add to steps array
    steps.value = [...steps.value, newStep];
  });
  
  // Function to mark all steps as complete
  const markAllComplete = $(() => {
    steps.value = steps.value.map(step => ({
      ...step,
      isComplete: true
    }));
  });
  
  return (
    <div class="max-w-3xl mx-auto space-y-6 p-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Dynamic Steps Example
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          This example shows how to dynamically add steps to the stepper.
        </p>
      </div>
      
      <div class="flex gap-3">
        <button
          onClick$={addStep}
          class="px-4 py-2 bg-green-500 text-white rounded-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add New Step
        </button>
        
        <button
          onClick$={markAllComplete}
          class="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          Mark All Complete
        </button>
      </div>
      
      <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800">
        <p class="text-sm text-blue-700 dark:text-blue-300">
          <strong>Current Steps:</strong> {steps.value.length} 
          <span class="ml-2 text-xs text-blue-500 dark:text-blue-400">
            (Click the "Add New Step" button to add more steps)
          </span>
        </p>
      </div>
      
      <CStepper 
        steps={steps.value}
        onComplete$={() => alert("All steps completed!")}
        onStepComplete$={(id) => console.log(`Step ${id} completed`)}
      />
    </div>
  );
}); 