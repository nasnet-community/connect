import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { 
  CStepper, 
  createStepperContext, 
  useStepperContext,
  type CStepMeta 
} from "../index";

// Create a custom context for this management example
const StepManagementContext = createStepperContext<{
  formData: {
    title: string;
    description: string;
    options: string[];
  }
}>("step-management-example");

/**
 * First Step Component
 */
const Step1 = component$(() => {
  const context = useStepperContext(StepManagementContext);
  
  return (
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <input 
          type="text" 
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={context.data.formData.title}
          onInput$={(_, el) => {
            context.data.formData.title = el.value;
            
            // Mark step as complete if title is not empty
            if (context.data.formData.title) {
              context.completeStep$(context.steps.value[0].id);
            }
          }}
          placeholder="Enter title"
        />
      </div>
      
      <button
        class="px-4 py-2 bg-primary-500 text-white rounded-md"
        onClick$={() => {
          if (context.data.formData.title) {
            context.nextStep$();
          }
        }}
      >
        Next
      </button>
    </div>
  );
});

/**
 * Second Step Component
 */
const Step2 = component$(() => {
  const context = useStepperContext(StepManagementContext);
  
  return (
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea 
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={context.data.formData.description}
          onInput$={(_, el) => {
            context.data.formData.description = el.value;
            
            // Mark step as complete if description is not empty
            if (context.data.formData.description) {
              context.completeStep$(context.steps.value[1].id);
            }
          }}
          placeholder="Enter description"
          rows={4}
        />
      </div>
      
      <div class="flex justify-between">
        <button
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md"
          onClick$={() => context.prevStep$()}
        >
          Previous
        </button>
        
        <button
          class="px-4 py-2 bg-primary-500 text-white rounded-md"
          onClick$={() => {
            if (context.data.formData.description) {
              context.nextStep$();
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
});

/**
 * Third Step Component
 */
const Step3 = component$(() => {
  const context = useStepperContext(StepManagementContext);
  const newOption = useSignal("");
  
  // Mark this step as complete initially
  context.completeStep$(context.steps.value[2]?.id);
  
  return (
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Options
        </label>
        
        <div class="flex gap-2 mb-2">
          <input 
            type="text" 
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={newOption.value}
            onInput$={(_, el) => {
              newOption.value = el.value;
            }}
            placeholder="Add option"
          />
          
          <button
            class="px-3 py-2 bg-green-500 text-white rounded-md"
            onClick$={() => {
              if (newOption.value) {
                context.data.formData.options.push(newOption.value);
                newOption.value = "";
              }
            }}
          >
            Add
          </button>
        </div>
        
        {/* Display options */}
        <ul class="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
          {context.data.formData.options.length === 0 ? (
            <li class="px-4 py-3 text-gray-500 dark:text-gray-400">No options added</li>
          ) : (
            context.data.formData.options.map((option, index) => (
              <li 
                key={index} 
                class="px-4 py-3 flex justify-between items-center bg-white dark:bg-gray-800"
              >
                <span>{option}</span>
                <button
                  class="text-red-500"
                  onClick$={() => {
                    context.data.formData.options.splice(index, 1);
                  }}
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
      
      <div class="flex justify-between">
        <button
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md"
          onClick$={() => context.prevStep$()}
        >
          Previous
        </button>
        
        <button
          class="px-4 py-2 bg-primary-500 text-white rounded-md"
          onClick$={() => {
            context.nextStep$();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
});

/**
 * Summary Step Component
 */
const SummaryStep = component$(() => {
  const context = useStepperContext(StepManagementContext);
  
  // Mark this step as complete initially
  context.completeStep$(context.steps.value[3]?.id);
  
  return (
    <div class="space-y-6">
      <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
        <h3 class="text-md font-medium mb-2">Form Summary</h3>
        
        <div class="grid grid-cols-1 gap-2">
          <div>
            <span class="font-semibold">Title:</span> {context.data.formData.title}
          </div>
          
          <div>
            <span class="font-semibold">Description:</span>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {context.data.formData.description}
            </p>
          </div>
          
          <div>
            <span class="font-semibold">Options:</span>
            <ul class="mt-1 ml-4 list-disc text-sm text-gray-600 dark:text-gray-400">
              {context.data.formData.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div class="flex justify-between">
        <button
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md"
          onClick$={() => context.prevStep$()}
        >
          Previous
        </button>
      </div>
    </div>
  );
});

/**
 * Dynamic Step Component
 * Used for steps created dynamically during the process
 */
const DynamicStep = component$(() => {
  const context = useStepperContext(StepManagementContext);
  const stepData = useSignal("");
  
  return (
    <div class="space-y-4">
      <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
        <h3 class="font-medium text-blue-700 dark:text-blue-300 mb-2">
          This is a dynamically added step
        </h3>
        <p class="text-sm text-blue-600 dark:text-blue-400">
          You can add, remove, or reorder steps at any time using the management controls.
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
            
            // Mark step as complete if there is data
            if (stepData.value) {
              // Get current step id based on active step index
              const currentStepId = context.steps.value[context.activeStep.value].id;
              context.completeStep$(currentStepId);
            }
          }}
          placeholder="Enter some data"
        />
      </div>
      
      <div class="flex justify-between">
        <button
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md"
          onClick$={() => context.prevStep$()}
        >
          Previous
        </button>
        
        <button
          class="px-4 py-2 bg-primary-500 text-white rounded-md"
          onClick$={() => {
            if (stepData.value) {
              context.nextStep$();
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
});

/**
 * Main example component for demonstrating the CStepper with management features
 */
export const CStepperManagementExample = component$(() => {
  // Toggle for edit mode
  const isEditMode = useSignal(false);
  
  // Initialize form data
  const formData = useStore({
    title: "",
    description: "",
    options: []
  });
  
  // Define initial steps
  const initialSteps: CStepMeta[] = [
    {
      id: 1,
      title: "Title",
      description: "Enter the title for your form",
      component: <Step1 />,
      isComplete: false
    },
    {
      id: 2,
      title: "Description",
      description: "Provide a detailed description",
      component: <Step2 />,
      isComplete: false
    },
    {
      id: 3,
      title: "Options",
      description: "Add available options",
      component: <Step3 />,
      isComplete: false
    },
    {
      id: 4,
      title: "Summary",
      description: "Review your information",
      component: <SummaryStep />,
      isComplete: false
    }
  ];
  
  // Handle completion
  const handleComplete$ = $(() => {
    alert(`Form completed with:\nTitle: ${formData.title}\nDescription: ${formData.description}\nOptions: ${formData.options.join(", ")}`);
  });
  
  // When a step is completed
  const handleStepComplete$ = $((id: number) => {
    console.log(`Step ${id} completed`);
  });
  
  return (
    <div class="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Step Management Example
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          This example demonstrates how to add, remove, and reorder steps in a stepper.
        </p>
      </div>
      
      {/* Edit mode toggle */}
      <div class="flex items-center p-4 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
        <input 
          type="checkbox"
          id="edit-mode-toggle"
          checked={isEditMode.value}
          onChange$={() => isEditMode.value = !isEditMode.value}
          class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700"
        />
        <label 
          for="edit-mode-toggle" 
          class="ml-2 text-sm text-yellow-800 dark:text-yellow-200"
        >
          Enable Step Management Mode
        </label>
        
        <div class="ml-auto text-xs text-yellow-600 dark:text-yellow-400">
          {isEditMode.value ? "Step management enabled" : "Edit mode disabled"}
        </div>
      </div>
      
      {/* Stepper component */}
      <CStepper 
        steps={initialSteps}
        onStepComplete$={handleStepComplete$}
        onComplete$={handleComplete$}
        contextId={StepManagementContext}
        contextValue={{ formData }}
        isEditMode={isEditMode.value}
        dynamicStepComponent={<DynamicStep />}
      />
      
      {/* Instructions for users */}
      {isEditMode.value && (
        <div class="p-4 rounded-md bg-gray-50 dark:bg-gray-800 space-y-2">
          <h2 class="font-medium text-gray-900 dark:text-white">Step Management Instructions</h2>
          
          <ul class="ml-5 list-disc text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>Use the management panel above to add, remove, or reorder steps</li>
            <li>When adding a new step, it will use the <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">DynamicStep</code> component</li>
            <li>You can continue navigating through steps while in edit mode</li>
            <li>Try adding a step between existing steps and note how the navigation maintains context</li>
          </ul>
          
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Notes: The stepper context and form data are preserved when modifying steps
          </div>
        </div>
      )}
    </div>
  );
}); 