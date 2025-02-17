import { component$, useContext, useStore, $ } from "@builder.io/qwik";
import { Wireless } from "./Wireless/Wireless";
import { VPNServer } from "./VPNServer/VPNServer";
import { VStepper } from "~/components/Core/Stepper/VStepper/VStepper";
import { StarContext } from "../StarContext";
import type { StepItem } from "~/components/Core/Stepper/VStepper/types";
import type { StepProps } from "~/types/step";

export const LAN = component$((props: StepProps) => {
  const starContext = useContext(StarContext);

  const WirelessStep = component$((props: StepProps) => (
    <Wireless isComplete={props.isComplete} onComplete$={props.onComplete$} />
  ));

  const VPNServerStep = component$((props: StepProps) => (
    <VPNServer isComplete={props.isComplete} onComplete$={props.onComplete$} />
  ));

  const baseSteps: StepItem[] = [
    ...(starContext.state.LAN.Wireless.isWireless
      ? [
          {
            id: 1,
            title: $localize`Wireless`,
            component: WirelessStep,
            isComplete: false,
          },
        ]
      : []),
    {
      id: starContext.state.LAN.Wireless.isWireless ? 2 : 1,
      title: $localize`VPN Server`,
      component: VPNServerStep,
      isComplete: false,
    },
  ];

  const steps =
    starContext.state.Mode === "advance" ? [...baseSteps] : baseSteps;

  const stepsStore = useStore({
    activeStep: 0,
    steps,
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
