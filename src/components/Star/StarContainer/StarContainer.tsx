import { component$ } from "@builder.io/qwik";
import { HStepper } from "~/components/Core/Stepper/HStepper/HStepper";
import { useProvideGlobalHelpSettings } from "~/components/Core/Stepper/shared/hooks/useGlobalHelpSettings";
import { useStarContainer } from "./useStarContainer";

export const StarContainer = component$(() => {
  // Initialize global help settings provider for all steppers
  useProvideGlobalHelpSettings(false); // Start with auto-show disabled

  // Use custom hook to manage all StarContainer logic
  const {
    activeStep,
    stepsStore,
    state,
    handleModeChange,
    handleStepChange,
  } = useStarContainer();

  return (
    <div class="container mx-auto w-full px-4 pt-24">
      <HStepper
        steps={stepsStore.steps}
        mode={state.Choose.Mode}
        onModeChange$={handleModeChange}
        activeStep={activeStep.value}
        enableEnhancedFeatures={true}
        enableHelp={true}
        helpOptions={{
          enableKeyboardShortcuts: true,
          helpKey: '?'
        }}
        onStepComplete$={(id) => {
          const stepIndex = stepsStore.steps.findIndex(
            (step: { id: number }) => step.id === id,
          );
          if (stepIndex > -1) {
            stepsStore.steps[stepIndex].isComplete = true;
          }
        }}
        onStepChange$={handleStepChange}
      />
    </div>
  );
});
