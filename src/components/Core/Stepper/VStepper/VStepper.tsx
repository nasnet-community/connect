import { component$ } from "@builder.io/qwik";
import { useVStepper } from "./useVStepper";
import type { VStepperProps } from "./types";
import { Step } from "./Step";
import { Desktop } from "./Desktop";
import { Mobile } from "./Mobile";

export const VStepper = component$((props: VStepperProps) => {
  const {
    activeStep,
    isStepsVisible,
    position,
    completeStep,
    toggleStepsVisibility,
    isComplete,
  } = useVStepper(props);

  return (
    <div class="relative min-h-screen w-full">
      <div class="space-y-12">
        {props.steps.map((step, index) => (
          <Step
            key={step.id}
            step={step}
            index={index}
            activeStep={activeStep.value}
            onComplete$={completeStep}
            isComplete={isComplete}
          />
        ))}
      </div>

      <Desktop
        steps={props.steps}
        activeStep={activeStep}
        position={position}
        isComplete={isComplete}
      />

      <Mobile
        steps={props.steps}
        activeStep={activeStep}
        isStepsVisible={isStepsVisible}
        toggleStepsVisibility={toggleStepsVisibility}
        isComplete={isComplete}
      />
    </div>
  );
});
