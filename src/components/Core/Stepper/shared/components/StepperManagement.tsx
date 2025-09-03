import { component$, useSignal } from "@builder.io/qwik";
import type { BaseStepMeta, StepperManagementProps } from "../types";

/**
 * Shared step management UI component for all stepper types
 * Provides consistent step management interface across different steppers
 */
export const StepperManagement = component$<StepperManagementProps>((props) => {
  const { 
    steps, 
    activeStep, 
    addStep$, 
    removeStep$, 
    swapSteps$, 
    isEditMode, 
    dynamicStepComponent,
    stepperType = 'content'
  } = props;
  
  // State for new step form
  const isAddingStep = useSignal(false);
  const newStepTitle = useSignal("");
  const newStepDescription = useSignal("");
  const insertPosition = useSignal<string>("");
  
  // If not in edit mode, don't render
  if (!isEditMode) return null;

  const getStepperTitle = () => {
    switch (stepperType) {
      case 'vertical': return 'Manage Vertical Steps';
      case 'horizontal': return 'Manage Horizontal Steps';
      default: return 'Manage Steps';
    }
  };

  const getStepperClass = () => {
    switch (stepperType) {
      case 'vertical': return 'stepper-management-vertical';
      case 'horizontal': return 'stepper-management-horizontal';
      default: return 'stepper-management-content';
    }
  };
  
  return (
    <div class={`mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 ${getStepperClass()}`}>
      <h3 class="text-lg font-medium mb-4 text-gray-900 dark:text-white">
        {getStepperTitle()}
      </h3>
      
      {/* List existing steps */}
      <div class="space-y-2 mb-6">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Current Steps ({steps.length})
        </h4>
        {steps.map((step, index) => (
          <div 
            key={step.id}
            class={`flex items-center justify-between p-3 rounded-md transition-colors ${
              index === activeStep
                ? 'bg-primary-50 border border-primary-200 dark:bg-primary-900/20 dark:border-primary-700' 
                : 'bg-gray-50 border border-gray-200 dark:bg-gray-700/30 dark:border-gray-600'
            }`}
          >
            <div class="flex items-center gap-3">
              <span class={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium ${
                index === activeStep
                  ? 'bg-primary-600 text-white dark:bg-primary-500'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {index + 1}
              </span>
              <div>
                <p class={`text-sm font-medium ${
                  index === activeStep 
                    ? 'text-primary-700 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {step.title}
                </p>
                {step.description && (
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {step.description}
                  </p>
                )}
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    ID: {step.id}
                  </span>
                  {step.isComplete && (
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Complete
                    </span>
                  )}
                  {step.isOptional && (
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      Optional
                    </span>
                  )}
                  {step.skippable && (
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                      Skippable
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div class="flex items-center gap-1">
              {/* Move up button */}
              {index > 0 && (
                <button
                  type="button"
                  onClick$={() => swapSteps$(index, index - 1)}
                  class="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  title="Move up"
                  aria-label={`Move ${step.title} up`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              )}
              
              {/* Move down button */}
              {index < steps.length - 1 && (
                <button
                  type="button"
                  onClick$={() => swapSteps$(index, index + 1)}
                  class="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  title="Move down"
                  aria-label={`Move ${step.title} down`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              )}
              
              {/* Delete button */}
              {steps.length > 1 && (
                <button
                  type="button"
                  onClick$={() => removeStep$(step.id)}
                  class="p-1.5 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  title="Remove step"
                  aria-label={`Remove ${step.title}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Add new step form */}
      {isAddingStep.value ? (
        <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Add New Step
          </h4>
          <div class="space-y-3">
            <div>
              <label for="new-step-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Step Title
              </label>
              <input
                id="new-step-title"
                type="text"
                value={newStepTitle.value}
                onInput$={(e) => newStepTitle.value = (e.target as HTMLInputElement).value}
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter step title"
              />
            </div>
            
            <div>
              <label for="new-step-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Step Description (Optional)
              </label>
              <input
                id="new-step-description"
                type="text"
                value={newStepDescription.value}
                onInput$={(e) => newStepDescription.value = (e.target as HTMLInputElement).value}
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter step description"
              />
            </div>
            
            <div>
              <label for="insert-position" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Insert Position
              </label>
              <select
                id="insert-position"
                value={insertPosition.value}
                onChange$={(e) => insertPosition.value = (e.target as HTMLSelectElement).value}
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">End of list</option>
                {steps.map((_, index) => (
                    <option key={`position-${index}`} value={index.toString()}>
                      {`After step ${index + 1}`}
                    </option>
                ))}
              </select>
            </div>
            
            <div class="flex gap-2">
              <button
                type="button"
                onClick$={() => {
                  if (newStepTitle.value.trim()) {
                    const newStep: BaseStepMeta = {
                      id: Date.now(), // Simple ID generation
                      title: newStepTitle.value.trim(),
                      description: newStepDescription.value.trim() || undefined,
                      component: dynamicStepComponent || (() => null),
                      isComplete: false
                    };
                    
                    const position = insertPosition.value ? parseInt(insertPosition.value) + 1 : undefined;
                    addStep$(newStep, position);
                    
                    // Reset form
                    newStepTitle.value = "";
                    newStepDescription.value = "";
                    insertPosition.value = "";
                    isAddingStep.value = false;
                  }
                }}
                class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors"
              >
                Add Step
              </button>
              <button
                type="button"
                onClick$={() => {
                  isAddingStep.value = false;
                  newStepTitle.value = "";
                  newStepDescription.value = "";
                  insertPosition.value = "";
                }}
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick$={() => isAddingStep.value = true}
          class="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors"
        >
          Add New Step
        </button>
      )}
    </div>
  );
});