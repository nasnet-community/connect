import { component$, useStore, $ } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { Services } from "./Services/Services";
import { Game } from "./Game/Game";
import { Identity } from "./Identity/Identity";
import { RebootUpdate } from "./RebootUpdate/RebootUpdate";
import { UsefulServices } from "./UsefulServices/UsefulServices";
import { VStepper } from "~/components/Core/Stepper/VStepper/VStepper";
import type { StepItem } from "~/components/Core/Stepper/VStepper/types";

export const ExtraConfig = component$<StepProps>((props) => {
  const IdentityStep = component$((props: StepProps) => (
    <Identity isComplete={props.isComplete} onComplete$={props.onComplete$} />
  ));

  const ServicesStep = component$((props: StepProps) => (
    <Services isComplete={props.isComplete} onComplete$={props.onComplete$} />
  ));

  const RebootUpdateStep = component$((props: StepProps) => (
    <RebootUpdate
      isComplete={props.isComplete}
      onComplete$={props.onComplete$}
    />
  ));

  const UsefulServicesStep = component$((props: StepProps) => (
    <UsefulServices
      isComplete={props.isComplete}
      onComplete$={props.onComplete$}
    />
  ));

  const GameStep = component$((props: StepProps) => (
    <Game isComplete={props.isComplete} onComplete$={props.onComplete$} />
  ));

  const stepsStore = useStore({
    activeStep: 0,
    steps: [
      {
        id: 1,
        title: $localize`Identity`,
        component: IdentityStep,
        isComplete: false,
      },
      {
        id: 2,
        title: $localize`Services`,
        component: ServicesStep,
        isComplete: false,
      },
      {
        id: 3,
        title: $localize`Reboot & Update`,
        component: RebootUpdateStep,
        isComplete: false,
      },
      {
        id: 4,
        title: $localize`Useful Services`,
        component: UsefulServicesStep,
        isComplete: false,
      },
      {
        id: 5,
        title: $localize`Game`,
        component: GameStep,
        isComplete: false,
      },
    ] as StepItem[],
  });

  const handleStepComplete = $((id: number) => {
    const stepIndex = stepsStore.steps.findIndex((step) => step.id === id);
    if (stepIndex > -1) {
      stepsStore.steps[stepIndex].isComplete = true;

      if (stepIndex < stepsStore.steps.length - 1) {
        stepsStore.activeStep = stepIndex + 1;
      }

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
