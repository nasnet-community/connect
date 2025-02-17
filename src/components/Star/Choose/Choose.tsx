import { component$, useStore, $ } from "@builder.io/qwik";
import { Frimware } from "./Frimware";
import { RouterMode } from "./RouterMode";
import { RouterModel } from "./RouterModel";
import { VStepper } from "~/components/Core/Stepper/VStepper/VStepper";
import type { StepItem } from "~/components/Core/Stepper/VStepper/types";
import type { StepProps } from "~/types/step";

interface StepsStore {
  activeStep: number;
  steps: StepItem[];
}

export const Choose = component$((props: StepProps) => {
  const FirmwareStep = component$((props: StepProps) => (
    <Frimware isComplete={props.isComplete} onComplete$={props.onComplete$} />
  ));

  const RouterModeStep = component$((props: StepProps) => (
    <RouterMode isComplete={props.isComplete} onComplete$={props.onComplete$} />
  ));

  const RouterModelStep = component$((props: StepProps) => (
    <RouterModel
      isComplete={props.isComplete}
      onComplete$={props.onComplete$}
    />
  ));

  const stepsStore = useStore<StepsStore>({
    activeStep: 0,
    steps: [
      {
        id: 1,
        title: $localize`Firmware`,
        component: FirmwareStep,
        isComplete: false,
      },
      {
        id: 1,
        title: $localize`Router Mode`,
        component: RouterModeStep,
        isComplete: false,
      },
      {
        id: 2,
        title: $localize`Router Model`,
        component: RouterModelStep,
        isComplete: false,
      },
    ],
  });

  const handleStepComplete = $((id: number) => {
    const stepIndex = stepsStore.steps.findIndex((step) => step.id === id);
    if (stepIndex > -1) {
      stepsStore.steps[stepIndex].isComplete = true;
      stepsStore.activeStep = stepIndex + 1;

      if (stepsStore.steps.every((step) => step.isComplete)) {
        props.onComplete$();
      }
    }
  });

  return (
    <div class="container mx-auto w-full px-4">
      <VStepper
        steps={stepsStore.steps}
        activeStep={stepsStore.activeStep}
        onStepComplete$={handleStepComplete}
        onStepChange$={(id: number) => {
          stepsStore.activeStep = id - 1;
        }}
        isComplete={props.isComplete}
      />
    </div>
  );
});
