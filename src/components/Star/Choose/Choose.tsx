import { component$, useSignal, $, useContext, useTask$ } from "@builder.io/qwik";
import { Frimware } from "./Frimware/Frimware";
import { RouterMode } from "./RouterMode/RouterMode";
import { RouterModel } from "./RouterModel/RouterModel";
import { DomesticWAN } from "./DomesticWAN/DomesticWAN";
import { OWRT } from "./OWRT/OWRT";
import { OWRTInstall } from "./OWRT/Install";
import { OWRTPackage } from "./OWRT/Package";
// import { SetupMode } from "./SetupMode/SetupMode";
import { VStepper } from "~/components/Core/Stepper/VStepper/VStepper";
import type { StepItem } from "~/components/Core/Stepper/VStepper/types";
import type { StepProps } from "~/types/step";
import { StarContext } from "../StarContext/StarContext";

// Define step components outside the main component to avoid serialization issues
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

const DomesticStep = component$((props: StepProps) => (
  <DomesticWAN
    isComplete={props.isComplete}
    onComplete$={props.onComplete$}
  />
));

const OWRTFISStep = component$((props: StepProps) => (
  <OWRT
    isComplete={props.isComplete}
    onComplete$={props.onComplete$}
  />
));

const OWRTInstallStep = component$((props: StepProps) => (
  <OWRTInstall
    isComplete={props.isComplete}
    onComplete$={props.onComplete$}
  />
));

const OWRTPackageStep = component$(() => (
  <OWRTPackage
    // isComplete={props.isComplete}
    // onComplete$={props.onComplete$}
  />
));

export const Choose = component$((props: StepProps) => {
  const starContext = useContext(StarContext);

  // Create step building functions to avoid serialization issues
  const createMikroTikSteps = $(() => [
    {
      id: 2,
      title: $localize`Router Mode`,
      component: RouterModeStep,
      isComplete: false,
    },
    {
      id: 3,
      title: $localize`Domestic Link`,
      component: DomesticStep,
      isComplete: false,
    },
    {
      id: 4,
      title: $localize`Router Model`,
      component: RouterModelStep,
      isComplete: false,
    },
  ]);

  const createOpenWRTSteps = $(() => [
    {
      id: 2,
      title: $localize`Configuration`,
      component: OWRTFISStep,
      isComplete: false,
    },
    {
      id: 3,
      title: $localize`Install OpenWrt`,
      component: OWRTInstallStep,
      isComplete: false,
    },
    {
      id: 4,
      title: $localize`Install Package`,
      component: OWRTPackageStep,
      isComplete: false,
    },
  ]);

  // Initialize with default MikroTik steps (same as before)
  const steps = useSignal<StepItem[]>([
    {
      id: 1,
      title: $localize`Firmware`,
      component: FirmwareStep,
      isComplete: false,
    },
    {
      id: 2,
      title: $localize`Router Mode`,
      component: RouterModeStep,
      isComplete: false,
    },
    {
      id: 3,
      title: $localize`Domestic Link`,
      component: DomesticStep,
      isComplete: false,
    },
    {
      id: 4,
      title: $localize`Router Model`,
      component: RouterModelStep,
      isComplete: false,
    },
  ]);

  const activeStep = useSignal(0);
  const stepperKey = useSignal(0); // Force re-render when this changes

  // Handle firmware changes - watch for OpenWRT vs MikroTik
  useTask$(async ({ track }) => {
    const selectedFirmware = track(() => starContext.state.Choose.Firmware);
    
    console.log('=== FIRMWARE CHANGE DETECTED ==='); // Debug log
    console.log('Previous steps count:', steps.value.length); // Debug log
    console.log('Firmware changed to:', selectedFirmware); // Debug log
    
    // Only proceed if we have a valid firmware selection
    if (!selectedFirmware) {
      console.log('No firmware selected yet'); // Debug log
      return;
    }
    
    if (selectedFirmware === "OpenWRT") {
      // Remove MikroTik-specific steps and add OpenWRT steps
      const owrtSteps = await createOpenWRTSteps();
      console.log('Adding OpenWRT steps:', owrtSteps); // Debug log
      
      // Create new array with firmware and all OpenWRT steps
      const newSteps = [
        {
          id: 1,
          title: $localize`Firmware`,
          component: FirmwareStep,
          isComplete: false,
        },
        ...owrtSteps
      ];
      
      steps.value = newSteps;
      stepperKey.value++; // Force re-render
      
      // Reset active step to firmware if we're beyond the new step count
      if (activeStep.value >= newSteps.length) {
        activeStep.value = 0;
      }
      
      console.log('Steps after OpenWRT selection:', steps.value.length, 'steps'); // Debug log
      console.log('Step titles:', steps.value.map(s => s.title)); // Debug log
    } else if (selectedFirmware === "MikroTik") {
      // Restore MikroTik steps if user switches back from OpenWRT
      const mikrotikSteps = await createMikroTikSteps();
      console.log('Adding MikroTik steps:', mikrotikSteps); // Debug log
      
      // Create new array with firmware and MikroTik steps
      const newSteps = [
        {
          id: 1,
          title: $localize`Firmware`,
          component: FirmwareStep,
          isComplete: false,
        },
        ...mikrotikSteps
      ];
      
      steps.value = newSteps;
      stepperKey.value++; // Force re-render
      
      // Reset active step to firmware if we're beyond it
      if (activeStep.value >= newSteps.length) {
        activeStep.value = 0;
      }
      
      console.log('Steps after MikroTik selection:', steps.value.length, 'steps'); // Debug log
      console.log('Step titles:', steps.value.map(s => s.title)); // Debug log
    }
  });

  const handleStepComplete = $((id: number) => {
    const stepIndex = steps.value.findIndex((step) => step.id === id);
    if (stepIndex > -1) {
      // Update the step completion status
      steps.value = steps.value.map((step, index) => 
        index === stepIndex ? { ...step, isComplete: true } : step
      );
      
      // Move to next step
      if (stepIndex < steps.value.length - 1) {
        activeStep.value = stepIndex + 1;
      }

      // Check if all steps are complete
      if (steps.value.every((step) => step.isComplete)) {
        props.onComplete$();
      }
    }
  });

  return (
    <div class="container mx-auto w-full px-4">
      {/* Add a key to force re-render when steps change */}
      <VStepper
        key={`stepper-${stepperKey.value}-${steps.value.length}-${steps.value.map(s => s.id).join('-')}`}
        steps={steps.value}
        activeStep={activeStep.value}
        onStepComplete$={handleStepComplete}
        onStepChange$={(id: number) => {
          const stepIndex = steps.value.findIndex(step => step.id === id);
          if (stepIndex > -1) {
            activeStep.value = stepIndex;
          }
        }}
        isComplete={props.isComplete}
      />
    </div>
  );
});
