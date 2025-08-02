import {
  component$,
  useContext,
  useStore,
  $,
  useTask$,
} from "@builder.io/qwik";
import { Wireless } from "./Wireless/Wireless";
import { VPNServer } from "./VPNServer/VPNServer";
import { Tunnel } from "./Tunnel/Tunnel";
import { Subnets } from "./Subnets";
import { VStepper } from "~/components/Core/Stepper/VStepper/VStepper";
import { StarContext } from "../StarContext/StarContext";
import type { StepItem } from "~/components/Core/Stepper/VStepper/types";
import type { StepProps } from "~/types/step";
import EInterface from "./EInterface/EInterface";

export const LAN = component$((props: StepProps) => {
  const starContext = useContext(StarContext);

  const hasWirelessEInterface = starContext.state.Choose.RouterModels.some(
    (routerModel) => !!routerModel.Interfaces.wireless?.length,
  );

  const isDomesticLinkEnabled = starContext.state.Choose.DomesticLink === true;

  // Create a store to manage steps
  const stepsStore = useStore({
    activeStep: 0,
    steps: [] as StepItem[],
  });

  const handleStepComplete = $((id: number) => {
    const stepIndex = stepsStore.steps.findIndex((step) => step.id === id);
    if (stepIndex > -1) {
      stepsStore.steps[stepIndex].isComplete = true;

      // Move to the next step if there is one
      if (stepIndex < stepsStore.steps.length - 1) {
        stepsStore.activeStep = stepIndex + 1;
      } else {
        // This was the last step, so complete the entire LAN section
        props.onComplete$();
      }

      // Check if all steps are now complete
      if (stepsStore.steps.every((step) => step.isComplete)) {
        props.onComplete$();
      }
    }
  });

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

  const isAdvancedMode = starContext.state.Choose.Mode === "advance";
  let nextId = 1;

  const baseSteps: StepItem[] = [];

  if (hasWirelessEInterface) {
    baseSteps.push({
      id: nextId,
      title: $localize`Wireless`,
      component: WirelessStep,
      isComplete: false,
    });
    nextId++;
  }

  baseSteps.push({
    id: nextId,
    title: $localize`LAN EInterfaces`,
    component: EInterfaceStep,
    isComplete: false,
  });

  nextId++;

  // Only add VPNServer and Tunnel steps if DomesticLink is enabled
  if (isDomesticLinkEnabled) {
    baseSteps.push({
      id: nextId,
      title: $localize`VPN Server`,
      component: VPNServerStep,
      isComplete: false,
    });

    nextId++;

    baseSteps.push({
      id: nextId,
      title: $localize`Network Tunnels`,
      component: TunnelStep,
      isComplete: false,
    });

    nextId++;
  }

  // Create advanced steps by copying base steps
  const advancedSteps: StepItem[] = [...baseSteps];

  // Only add Subnets step in advanced mode
  if (isAdvancedMode) {
    advancedSteps.push({
      id: nextId,
      title: $localize`Network Subnets`,
      component: SubnetsStep,
      isComplete: false,
    });
  }

  const steps = isAdvancedMode ? advancedSteps : baseSteps;

  // Initialize steps in the store
  useTask$(() => {
    stepsStore.steps = steps;
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
