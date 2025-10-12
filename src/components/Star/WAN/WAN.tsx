import { component$, useStore, useContext, $ } from "@builder.io/qwik";
import { VPNClient } from "./VPNClient/VPNClient";
// import { DNS } from "./DNS/DNS";
import { VStepper } from "~/components/Core/Stepper/VStepper/VStepper";
import type { StepItem } from "~/components/Core/Stepper/VStepper/types";
import type { StepProps } from "~/types/step";
import { WANInterface } from "./WANInterface/WANInterface";
import { StarContext } from "../StarContext/StarContext";

// Define step components outside the main component to avoid serialization issues
// Foreign step for both easy and advanced modes
const ForeignStep = component$((props: StepProps) => (
  <WANInterface
    mode={"Foreign"}
    isComplete={props.isComplete}
    onComplete$={props.onComplete$}
  />
));

// Domestic step for both easy and advanced modes
const DomesticStep = component$((props: StepProps) => (
  <WANInterface
    mode={"Domestic"}
    isComplete={props.isComplete}
    onComplete$={props.onComplete$}
  />
));

const VPNClientStep = component$((props: StepProps) => (
  <VPNClient isComplete={props.isComplete} onComplete$={props.onComplete$} />
));

// const DNSStep = component$((props: StepProps) => (
//   <DNS isComplete={props.isComplete} onComplete$={props.onComplete$} />
// ));


export const WAN = component$((props: StepProps) => {
  const starContext = useContext(StarContext);
  const wanLinkType = starContext.state.Choose.WANLinkType;
  // const isAdvancedMode = starContext.state.Choose.Mode === "advance";

  const steps: StepItem[] = [];

  // Add WAN interface steps based on WANLinkType
  if (wanLinkType === "foreign" || wanLinkType === "both") {
    steps.push({
      id: steps.length + 1,
      title: $localize`Foreign WAN`,
      component: ForeignStep,
      isComplete: false,
    });
  }

  if (wanLinkType === "domestic" || wanLinkType === "both") {
    steps.push({
      id: steps.length + 1,
      title: $localize`Domestic WAN`,
      component: DomesticStep,
      isComplete: false,
    });
  }

  // Always add VPN Client step
  steps.push({
    id: steps.length + 1,
    title: $localize`VPN Client`,
    component: VPNClientStep,
    isComplete: false,
  });

  // // Only add DNS Configuration step in advanced mode
  // if (isAdvancedMode) {
  //   steps.push({
  //     id: steps.length + 1,
  //     title: $localize`DNS Configuration`,
  //     component: DNSStep,
  //     isComplete: false,
  //   });
  // }

  const stepsStore = useStore({
    activeStep: 0,
    steps,
  });

  const handleStepComplete = $(async (_id: number) => {
    // Intentionally do not call outer onComplete$ here.
    // Each inner step completion should only advance the inner stepper.
    // The outer onComplete$ will be invoked when the inner VStepper finishes all steps.
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
        onComplete$={props.onComplete$}
      />
    </div>
  );
});
