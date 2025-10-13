import {
  component$,
  $,
} from "@builder.io/qwik";
import { Wireless } from "./Wireless/Wireless";
import { VPNServer } from "./VPNServer/VPNServer";
import { Tunnel } from "./Tunnel/Tunnel";
import { Subnets } from "./Subnets";
import { VStepper } from "~/components/Core/Stepper/VStepper/VStepper";
import type { StepProps } from "~/types/step";
import EInterface from "./EInterface/EInterface";
import { useLAN } from "./useLAN";

// Define step components outside the main component to avoid serialization issues
const EInterfaceStep = component$((props: StepProps) => (
  <EInterface isComplete={props.isComplete} onComplete$={props.onComplete$} />
));

const WirelessStep = component$((props: StepProps) => (
  <Wireless
    isComplete={props.isComplete}
    onComplete$={props.onComplete$}
    // Don't advance to the next step when disabled - let the Save button handle it
    onDisabled$={$(() => {})}
  />
));

const VPNServerStep = component$((props: StepProps) => (
  <VPNServer
    isComplete={props.isComplete}
    onComplete$={props.onComplete$}
    // Don't advance to the next step when disabled - let the Save button handle it
    onDisabled$={$(() => {})}
  />
));

const TunnelStep = component$((props: StepProps) => (
  <Tunnel
    isComplete={props.isComplete}
    onComplete$={props.onComplete$}
    // Don't advance to the next step when disabled - let the Save button handle it
    onDisabled$={$(() => {})}
  />
));

const SubnetsStep = component$((props: StepProps) => (
  <Subnets isComplete={props.isComplete} onComplete$={props.onComplete$} />
));


export const LAN = component$((props: StepProps) => {
  const { stepsStore, handleStepComplete, handleStepChange } = useLAN({
    onComplete$: props.onComplete$,
    WirelessStep,
    EInterfaceStep,
    VPNServerStep,
    TunnelStep,
    SubnetsStep,
  });

  return (
    <div class="container mx-auto w-full px-4">
      <VStepper
        steps={stepsStore.steps}
        activeStep={stepsStore.activeStep}
        onStepComplete$={handleStepComplete}
        onStepChange$={handleStepChange}
        isComplete={props.isComplete}
      />
    </div>
  );
});
