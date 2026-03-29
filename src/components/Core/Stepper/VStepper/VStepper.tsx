import { component$ } from "@builder.io/qwik";
import { useVStepper } from "./useVStepper";
import type { VStepperProps } from "./types";
import { Step } from "./Step";
import { Desktop } from "./Desktop";
import { Mobile } from "./Mobile";
import { VStepperManagement } from "./components/VStepperManagement";
import { StepperManagement, StepperErrors } from "../shared/components";

export const VStepper = component$((props: VStepperProps) => {
  const stepperData = useVStepper(props);

  // Check if we're using enhanced features to access additional properties
  const hasEnhancedFeatures = props.enableEnhancedFeatures;

  const {
    activeStep,
    steps,
    isStepsVisible,
    position,
    completeStep,
    toggleStepsVisibility,
    isComplete,
    addStep$,
    removeStep$,
    swapSteps$,
    goToStep$,
  } = stepperData;

  // Show error state if enhanced features are enabled and there's an error
  if (
    hasEnhancedFeatures &&
    "hasError" in stepperData &&
    stepperData.hasError.value
  ) {
    return (
      <StepperErrors
        hasError={stepperData.hasError.value}
        errorMessage={stepperData.errorMessage.value}
        stepsLength={steps.value.length}
        stepperType="vertical"
      />
    );
  }

  return (
    <div class="relative min-h-screen w-full">
      {/* Step Management UI (only visible in edit mode) */}
      {props.isEditMode && hasEnhancedFeatures ? (
        <StepperManagement
          steps={steps.value}
          activeStep={activeStep.value}
          addStep$={addStep$ as any}
          removeStep$={removeStep$}
          swapSteps$={swapSteps$}
          isEditMode={props.isEditMode}
          dynamicStepComponent={props.dynamicStepComponent}
          stepperType="vertical"
        />
      ) : props.isEditMode ? (
        <VStepperManagement
          steps={steps.value}
          activeStep={activeStep.value}
          addStep$={addStep$ as any}
          removeStep$={removeStep$}
          swapSteps$={swapSteps$}
          isEditMode={props.isEditMode}
          dynamicStepComponent={props.dynamicStepComponent}
        />
      ) : null}

      <div class="space-y-12">
        {steps.value.map((step, index) => (
          <Step
            key={step.id}
            step={step}
            index={index}
            activeStep={activeStep.value}
            onComplete$={completeStep}
            isComplete={isComplete}
            preloadNext={props.preloadNext}
          />
        ))}
      </div>

      <Desktop
        steps={steps.value}
        activeStep={activeStep}
        position={position}
        isComplete={isComplete}
        allowStepNavigation={props.allowStepNavigation}
        onStepClick$={goToStep$}
      />

      <Mobile
        steps={steps.value}
        activeStep={activeStep}
        isStepsVisible={isStepsVisible}
        toggleStepsVisibility={toggleStepsVisibility}
        isComplete={isComplete}
        allowStepNavigation={props.allowStepNavigation}
        onStepClick$={goToStep$}
      />
    </div>
  );
});
