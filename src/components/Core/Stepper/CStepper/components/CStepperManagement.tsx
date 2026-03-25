import { component$, useSignal } from "@builder.io/qwik";
import type { CStepMeta } from "../types";
import type { QRL } from "@builder.io/qwik";

export interface CStepperManagementProps {
  steps: CStepMeta[];
  activeStep: number;
  addStep$: QRL<(step: CStepMeta, position?: number) => number>;
  removeStep$: QRL<(stepId: number) => boolean>;
  swapSteps$: QRL<(sourceIndex: number, targetIndex: number) => boolean>;
  isEditMode: boolean;
  dynamicStepComponent?: any; // Added prop for dynamic step component
}

export const CStepperManagement = component$(
  (props: CStepperManagementProps) => {
    const {
      steps,
      activeStep,
      addStep$,
      removeStep$,
      swapSteps$,
      isEditMode,
      dynamicStepComponent,
    } = props;

    // State for new step form
    const isAddingStep = useSignal(false);
    const newStepTitle = useSignal("");
    const newStepDescription = useSignal("");
    const insertPosition = useSignal<string | undefined>(undefined);

    // If not in edit mode, don't render
    if (!isEditMode) return null;

    return (
      <div class="mb-8 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">
          Manage Steps
        </h3>

        {/* List existing steps */}
        <div class="mb-6 space-y-2">
          <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Current Steps ({steps.length})
          </h4>
          {steps.map((step, index) => (
            <div
              key={step.id}
              class={`flex items-center justify-between rounded-md p-3 ${
                index === activeStep
                  ? "border border-primary-200 bg-primary-50 dark:border-primary-700 dark:bg-primary-900/20"
                  : "border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700/30"
              }`}
            >
              <div class="flex items-center gap-2">
                <span class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-sm dark:bg-gray-700">
                  {index + 1}
                </span>
                <div>
                  <p
                    class={`text-sm font-medium ${
                      index === activeStep
                        ? "text-primary-700 dark:text-primary-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-1">
                {/* Move up button */}
                {index > 0 && (
                  <button
                    type="button"
                    onClick$={() => swapSteps$(index, index - 1)}
                    class="p-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    title="Move up"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                )}

                {/* Move down button */}
                {index < steps.length - 1 && (
                  <button
                    type="button"
                    onClick$={() => swapSteps$(index, index + 1)}
                    class="p-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    title="Move down"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                )}

                {/* Delete button */}
                {steps.length > 1 && (
                  <button
                    type="button"
                    onClick$={() => removeStep$(step.id)}
                    class="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    title="Remove step"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add new step form */}
        {isAddingStep.value ? (
          <div class="rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700/30">
            <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Add New Step
            </h4>

            <form
              preventdefault:submit
              onSubmit$={() => {
                if (newStepTitle.value.trim()) {
                  // Generate a unique ID
                  const newId = Math.max(0, ...steps.map((s) => s.id)) + 1;

                  // Create new step object
                  const newStep: CStepMeta = {
                    id: newId,
                    title: newStepTitle.value.trim(),
                    description:
                      newStepDescription.value.trim() || "Step description",
                    component: dynamicStepComponent || (
                      <div>Please add content for this step</div>
                    ),
                    isComplete: false,
                  };

                  // Parse position if specified
                  const position = insertPosition.value
                    ? parseInt(insertPosition.value, 10)
                    : undefined;

                  // Add the step
                  addStep$(newStep, position);

                  // Reset form
                  newStepTitle.value = "";
                  newStepDescription.value = "";
                  insertPosition.value = undefined;
                  isAddingStep.value = false;
                }
              }}
              class="space-y-3"
            >
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title*
                </label>
                <input
                  type="text"
                  bind:value={newStepTitle}
                  required
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter step title"
                />
              </div>

              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <input
                  type="text"
                  bind:value={newStepDescription}
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter step description"
                />
              </div>

              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Position
                </label>
                <select
                  onChange$={(_, el) => {
                    insertPosition.value = el.value;
                  }}
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">At the end</option>
                  {steps.map((_, index) => {
                    const stepNumber = (index + 1).toString();
                    return (
                      <option key={`option-${index}`} value={`${index}`}>
                        {"Before Step " + stepNumber}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div class="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick$={() => {
                    isAddingStep.value = false;
                    newStepTitle.value = "";
                    newStepDescription.value = "";
                  }}
                  class="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="rounded-md bg-primary-600 px-3 py-1.5 text-sm text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800"
                >
                  Add Step
                </button>
              </div>
            </form>
          </div>
        ) : (
          <button
            onClick$={() => (isAddingStep.value = true)}
            class="flex w-full items-center justify-center rounded-md border-2 border-dashed border-gray-300 py-2 text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-1 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Add New Step
          </button>
        )}
      </div>
    );
  },
);
