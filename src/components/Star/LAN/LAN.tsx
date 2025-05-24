import { component$, useContext, useStore, $ } from "@builder.io/qwik";
import { Wireless } from "./Wireless/Wireless";
import { VPNServer } from "./VPNServer/VPNServer";
import { Tunnel } from "./Tunnel/Tunnel";
import { VStepper } from "~/components/Core/Stepper/VStepper/VStepper";
import { StarContext } from "../StarContext/StarContext";
import type { StepItem } from "~/components/Core/Stepper/VStepper/types";
import type { StepProps } from "~/types/step";
import EInterface from "./EInterface/EInterface";

export const LAN = component$((props: StepProps) => {
  const starContext = useContext(StarContext);

  const hasWirelessEInterface = starContext.state.Choose.RouterModels.some(
    (routerModel) => !!routerModel.Interfaces.wireless?.length
  );

  const isDomesticLinkEnabled = starContext.state.Choose.DomesticLink === true;

  const EInterfaceStep = component$((props: StepProps) => (
    <EInterface isComplete={props.isComplete} onComplete$={props.onComplete$} />
  ));

  const WirelessStep = component$((props: StepProps) => (
    <Wireless 
      isComplete={props.isComplete} 
      onComplete$={props.onComplete$} 
      onDisabled$={$(() => {
        // When Wireless is disabled, automatically mark the step as complete
        const step = stepsStore.steps.find(step => step.title === $localize`Wireless`);
        if (step) {
          step.isComplete = true;
          handleStepComplete(step.id);
        }
      })}
    />
  ));

  const VPNServerStep = component$((props: StepProps) => (
    <VPNServer 
      isComplete={props.isComplete} 
      onComplete$={props.onComplete$} 
      onDisabled$={$(() => {
        // When VPN Server is disabled, automatically mark the step as complete
        const step = stepsStore.steps.find(step => step.title === $localize`VPN Server`);
        if (step) {
          step.isComplete = true;
          handleStepComplete(step.id);
        }
      })}
    />
  ));

  const TunnelStep = component$((props: StepProps) => (
    <Tunnel 
      isComplete={props.isComplete} 
      onComplete$={props.onComplete$}
      onDisabled$={$(() => {
        // When Tunnel is disabled, automatically mark the step as complete
        const step = stepsStore.steps.find(step => step.title === $localize`Network Tunnels`);
        if (step) {
          step.isComplete = true;
          handleStepComplete(step.id);
        }
      })}
    />
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
  }
  
  const advancedSteps: StepItem[] = [
    ...baseSteps,
  ];

  const steps = isAdvancedMode ? advancedSteps : baseSteps;

  const stepsStore = useStore({
    activeStep: 0,
    steps,
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
