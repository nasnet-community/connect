import { component$, useStore, $, useContext, useTask$ } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { Services } from "./Services/Services";
import { Game } from "./Game/Game";
import { Identity } from "./Identity/Identity";
import { RebootUpdate } from "./RebootUpdate/RebootUpdate";
import { UsefulServices } from "./UsefulServices/UsefulServices";
import { VStepper } from "~/components/Core/Stepper/VStepper/VStepper";
import type { StepItem } from "~/components/Core/Stepper/VStepper/types";
import { StarContext } from "../StarContext/StarContext";
import type { ServiceType } from "../StarContext/ExtraType";

export const ExtraConfig = component$<StepProps>((props) => {
  const ctx = useContext(StarContext);
  const isEasyMode = ctx.state.Choose.Mode === "easy";

  // Set default values for hidden components in easy mode
  useTask$(() => {
    if (isEasyMode) {
      // Set default values for Services if not already set
      if (!ctx.state.ExtraConfig.services) {
        const defaultServices = {
          api: { type: "Local" as ServiceType, port: 8728 },
          apissl: { type: "Local" as ServiceType, port: 8729 },
          ftp: { type: "Local" as ServiceType, port: 21 },
          ssh: { type: "Local" as ServiceType, port: 22 },
          telnet: { type: "Local" as ServiceType, port: 23 },
          winbox: { type: "Enable" as ServiceType, port: 8291 },
          web: { type: "Local" as ServiceType, port: 80 },
          webssl: { type: "Local" as ServiceType, port: 443 },
        };
        ctx.updateExtraConfig$({ services: defaultServices });
      }

      // Set default values for UsefulServices if not already set
      if (!ctx.state.ExtraConfig.usefulServices) {
        const defaultUsefulServices = {
          certificate: { SelfSigned: true, LetsEncrypt: false },
          ntp: { servers: ["pool.ntp.org"], updateInterval: "1h" as const },
          graphing: { Interface: true, Queue: true, Resources: true },
          cloudDDNS: { ddnsEntries: [] },
          upnp: { linkType: "domestic" as const },
          natpmp: { linkType: "domestic" as const },
        };
        
        ctx.updateExtraConfig$({ 
          usefulServices: defaultUsefulServices 
        });
      }
    }
  });

  const IdentityStep$ = $((props: StepProps) => (
    <Identity isComplete={props.isComplete} onComplete$={props.onComplete$} />
  ));

  const ServicesStep$ = $((props: StepProps) => (
    <Services isComplete={props.isComplete} onComplete$={props.onComplete$} />
  ));

  const RebootUpdateStep$ = $((props: StepProps) => (
    <RebootUpdate
      isComplete={props.isComplete}
      onComplete$={props.onComplete$}
    />
  ));

  const UsefulServicesStep$ = $((props: StepProps) => (
    <UsefulServices
      isComplete={props.isComplete}
      onComplete$={props.onComplete$}
    />
  ));

  const GameStep$ = $((props: StepProps) => (
    <Game isComplete={props.isComplete} onComplete$={props.onComplete$} />
  ));

  // Build steps array conditionally based on mode
  const buildSteps = (): StepItem[] => {
    const allSteps: StepItem[] = [
      {
        id: 1,
        title: $localize`Identity`,
        component: IdentityStep$,
        isComplete: false,
      },
    ];

    // Only add Services and UsefulServices in advanced mode
    if (!isEasyMode) {
      allSteps.push({
        id: 2,
        title: $localize`Services`,
        component: ServicesStep$,
        isComplete: false,
      });
    }

    allSteps.push({
      id: allSteps.length + 1,
      title: $localize`Reboot & Update`,
      component: RebootUpdateStep$,
      isComplete: false,
    });

    if (!isEasyMode) {
      allSteps.push({
        id: allSteps.length + 1,
        title: $localize`Useful Services`,
        component: UsefulServicesStep$,
        isComplete: false,
      });
    }

    allSteps.push({
      id: allSteps.length + 1,
      title: $localize`Game`,
      component: GameStep$,
      isComplete: false,
    });

    return allSteps;
  };

  const stepsStore = useStore({
    activeStep: 0,
    steps: buildSteps(),
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
