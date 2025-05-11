import { component$, $ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { VPNServerContextId } from "./VPNServer";

interface ActionFooterProps {
  /**
   * Disable the save button when true
   */
  saveDisabled?: boolean;
  
  /**
   * Handler for the next button - if not provided, the save handler is used
   */
  onNext$?: PropFunction<() => void>;
  
  /**
   * Handler for the save button
   */
  onSave$: PropFunction<() => void>;
  
  /**
   * Show the back button
   */
  showBack?: boolean;
  
  /**
   * Show the next button
   */
  showNext?: boolean;
  
  /**
   * Custom text for the save button
   */
  saveText?: string;
  
  /**
   * Whether this component is rendered within a stepper context
   */
  inStepper?: boolean;
  
  /**
   * The step ID to complete when using within a stepper
   */
  stepId?: number;
}

export const ActionFooter = component$<ActionFooterProps>(({ 
  onNext$,
  onSave$,
  showBack = false,
  showNext = true,
  saveDisabled = false,
  saveText = $localize`Save`,
  inStepper = false,
  stepId
}) => {
  const handleSave$ = $(async () => {
    if (inStepper && stepId !== undefined) {
      await onSave$();
    } else {
      await onSave$();
    }
    return null;
  });

  return (
    <div class="flex justify-between">
      {showBack && (
        <button
          class="rounded-lg border border-gray-300 bg-white px-6 py-2.5 
                text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 
                dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <span>{$localize`Back`}</span>
        </button>
      )}
      
      <div class={showBack ? '' : 'ml-auto'}>
        {showNext && (
          <button
            onClick$={onNext$ ? (async () => await onNext$()) : handleSave$}
            disabled={saveDisabled}
            data-next-btn
            class={`inline-flex items-center gap-2 rounded-lg px-6 py-2.5 shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                    ${!saveDisabled
                      ? "bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"}`}
          >
            <span>{saveText}</span>
          </button>
        )}
      </div>
    </div>
  );
});

// A specialized version of the ActionFooter that can be used within a stepper context
export const StepperActionFooter = component$<ActionFooterProps>(({ 
  onNext$,
  onSave$,
  showBack = false,
  showNext = true,
  saveDisabled = false,
  saveText = $localize`Save`,
  stepId
}) => {
  // Access the stepper context
  const stepper = useStepperContext(VPNServerContextId);
  
  // Create safe wrapper functions that don't leak promises
  const safeCompleteStep = $(async (id: number) => {
    if (stepper?.completeStep$) {
      await stepper.completeStep$(id);
    }
    return null;
  });
  
  const safeNextStep = $(async () => {
    if (stepper?.nextStep$) {
      await stepper.nextStep$();
    }
    return null;
  });

  // Function to save settings and complete step
  const handleStepperSave$ = $(async () => {
    if (stepId !== undefined) {
      await safeCompleteStep(stepId);
      if (onNext$) {
        await onNext$();
      } else {
        await safeNextStep();
      }
    }
    await onSave$();
    return null;
  });

  return (
    <ActionFooter
      onNext$={handleStepperSave$}
      onSave$={onSave$}
      showBack={showBack}
      showNext={showNext}
      saveDisabled={saveDisabled}
      saveText={saveText}
    />
  );
}); 