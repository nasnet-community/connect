import { component$, useSignal, $ } from "@builder.io/qwik";
import { VStepper } from "../VStepper";
import type { StepItem } from "../types";

// Simple step content component
const StepContent = component$(({ stepNumber }: { stepNumber: number }) => {
  const isComplete = useSignal(false);

  return (
    <div class="space-y-4">
      <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
        <h3 class="font-medium mb-2">Vertical Step {stepNumber} Content</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          This is the content for vertical step {stepNumber}. Mark it as complete to proceed.
        </p>
      </div>
      
      <div class="flex items-center space-x-2">
        <input 
          type="checkbox" 
          id={`v-complete-step-${stepNumber}`}
          checked={isComplete.value}
          onChange$={() => {
            isComplete.value = !isComplete.value;
          }}
          class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:bg-gray-700"
        />
        <label for={`v-complete-step-${stepNumber}`} class="text-sm">
          Mark this step as complete
        </label>
      </div>
    </div>
  );
});

// Dynamic step component
const DynamicStepContent = component$(() => {
  const stepData = useSignal("");
  const isComplete = useSignal(false);
  
  return (
    <div class="space-y-4">
      <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
        <h3 class="font-medium text-blue-700 dark:text-blue-300 mb-2">
          This is a dynamically added vertical step
        </h3>
        <p class="text-sm text-blue-600 dark:text-blue-400">
          You can add, remove, or reorder vertical steps using the management controls.
        </p>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Dynamic Step Data
        </label>
        <input 
          type="text" 
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={stepData.value}
          onInput$={(_, el) => {
            stepData.value = el.value;
            isComplete.value = el.value.trim().length > 0;
          }}
          placeholder="Enter some data"
        />
      </div>
      
      <div class="flex items-center space-x-2">
        <input 
          type="checkbox" 
          id="dynamic-complete"
          checked={isComplete.value}
          onChange$={() => {
            isComplete.value = !isComplete.value;
          }}
          class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:bg-gray-700"
        />
        <label for="dynamic-complete" class="text-sm">
          Mark this dynamic step as complete
        </label>
      </div>
    </div>
  );
});

export const VStepperManagementExample = component$(() => {
  // Toggle for edit mode
  const isEditMode = useSignal(false);
  
  // Track the steps array
  const steps = useSignal<StepItem[]>([
    {
      id: 1,
      title: "First Vertical Step",
      component: () => <StepContent stepNumber={1} />,
      isComplete: false
    },
    {
      id: 2,
      title: "Second Vertical Step",
      component: () => <StepContent stepNumber={2} />,
      isComplete: false
    },
    {
      id: 3,
      title: "Third Vertical Step", 
      component: () => <StepContent stepNumber={3} />,
      isComplete: false
    }
  ]);
  
  // Function to add a new step programmatically
  const addStep = $(() => {
    const newStepId = Math.max(...steps.value.map(s => s.id)) + 1;
    const newStep: StepItem = {
      id: newStepId,
      title: `Vertical Step ${newStepId}`,
      component: () => <StepContent stepNumber={newStepId} />,
      isComplete: false
    };
    
    steps.value = [...steps.value, newStep];
  });
  
  // Function to add a dynamic step
  const addDynamicStep = $(() => {
    const newStepId = Math.max(...steps.value.map(s => s.id)) + 1;
    const newStep: StepItem = {
      id: newStepId,
      title: `Dynamic Step ${newStepId}`,
      component: () => <DynamicStepContent />,
      isComplete: false
    };
    
    steps.value = [...steps.value, newStep];
  });
  
  return (
    <div class="max-w-3xl mx-auto space-y-6 p-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          VStepper Management Example
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          This example demonstrates how to manage vertical stepper steps dynamically.
        </p>
      </div>
      
      {/* Edit mode toggle */}
      <div class="flex items-center p-4 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
        <input 
          type="checkbox"
          id="v-edit-mode-toggle"
          checked={isEditMode.value}
          onChange$={() => isEditMode.value = !isEditMode.value}
          class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700"
        />
        <label 
          for="v-edit-mode-toggle" 
          class="ml-2 text-sm text-yellow-800 dark:text-yellow-200"
        >
          Enable Vertical Step Management Mode
        </label>
        
        <div class="ml-auto text-xs text-yellow-600 dark:text-yellow-400">
          {isEditMode.value ? "Step management enabled" : "Edit mode disabled"}
        </div>
      </div>
      
      {/* Control buttons */}
      <div class="flex gap-3">
        <button
          onClick$={addStep}
          class="px-4 py-2 bg-green-500 text-white rounded-md flex items-center hover:bg-green-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add Regular Step
        </button>
        
        <button
          onClick$={addDynamicStep}
          class="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center hover:bg-blue-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add Dynamic Step
        </button>
      </div>
      
      <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800">
        <p class="text-sm text-blue-700 dark:text-blue-300">
          <strong>Current Steps:</strong> {steps.value.length} 
          <span class="ml-2 text-xs text-blue-500 dark:text-blue-400">
            (Enable edit mode to use the built-in management UI)
          </span>
        </p>
      </div>
      
      {/* VStepper component */}
      <VStepper 
        steps={steps.value}
        onComplete$={() => alert("All vertical steps completed!")}
        onStepComplete$={(id) => console.log(`Vertical step ${id} completed`)}
        isEditMode={isEditMode.value}
        dynamicStepComponent={() => <DynamicStepContent />}
        allowStepNavigation={true}
        position="left"
      />
      
      {/* Instructions */}
      {isEditMode.value && (
        <div class="p-4 rounded-md bg-gray-50 dark:bg-gray-800 space-y-2">
          <h2 class="font-medium text-gray-900 dark:text-white">Vertical Step Management Instructions</h2>
          
          <ul class="ml-5 list-disc text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>Use the management panel to add, remove, or reorder vertical steps</li>
            <li>When adding a new step, it will use the dynamic step component</li>
            <li>You can continue navigating through steps while in edit mode</li>
            <li>The vertical stepper maintains its scrolling behavior during management</li>
          </ul>
          
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Notes: Step data and navigation state are preserved when modifying steps
          </div>
        </div>
      )}
    </div>
  );
}); 