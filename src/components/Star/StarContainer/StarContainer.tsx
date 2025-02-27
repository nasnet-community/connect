import {
  component$,
  useContext,
  useSignal,
  $,
  useTask$,
} from "@builder.io/qwik";
import { Choose } from "../Choose/Choose";
import { ExtraConfig } from "../ExtraConfig/ExtraConfig";
import { LAN } from "../LAN/LAN";
import { WAN } from "../WAN/WAN";
import { ShowConfig } from "../ShowConfig/ShowConfig";
import { HStepper } from "~/components/Core/Stepper/HStepper/HStepper";
import { useStore } from "@builder.io/qwik";
import { StarContext } from "../StarContext";
import {
  LuSettings2,
  LuGlobe,
  LuNetwork,
  LuWrench,
  LuClipboardList,
} from "@qwikest/icons/lucide";

export const StarContainer = component$(() => {
  const activeStep = useSignal(0);
  const { state, updateMode$ } = useContext(StarContext);

  const stepsStore = useStore({
    steps: [] as any[],
  });

  useTask$(() => {
    stepsStore.steps = [
      {
        id: 1,
        title: $localize`Choose`,
        icon: $(LuSettings2),
        component: component$(() => (
          <Choose
            isComplete={stepsStore.steps[0].isComplete}
            onComplete$={() => {
              stepsStore.steps[0].isComplete = true;
              activeStep.value = 1;
            }}
          />
        )),
        isComplete: false,
      },
      {
        id: 2,
        title: $localize`WAN`,
        icon: $(LuGlobe),
        component: component$(() => (
          <WAN
            isComplete={stepsStore.steps[1].isComplete}
            onComplete$={() => {
              stepsStore.steps[1].isComplete = true;
              activeStep.value = 2;
            }}
          />
        )),
        isComplete: false,
      },
      {
        id: 3,
        title: $localize`LAN`,
        icon: $(LuNetwork),
        component: component$(() => (
          <LAN
            isComplete={stepsStore.steps[2].isComplete}
            onComplete$={() => {
              stepsStore.steps[2].isComplete = true;
              activeStep.value = 3;
            }}
          />
        )),
        isComplete: false,
      },
      {
        id: 4,
        title: $localize`Extra Config`,
        icon: $(LuWrench),
        component: component$(() => (
          <ExtraConfig
            isComplete={stepsStore.steps[3].isComplete}
            onComplete$={() => {
              stepsStore.steps[3].isComplete = true;
              activeStep.value = 4;
            }}
          />
        )),
        isComplete: false,
      },
      {
        id: 5,
        title: $localize`Show Config`,
        icon: $(LuClipboardList),
        component: component$(() => (
          <ShowConfig
            isComplete={stepsStore.steps[4].isComplete}
            onComplete$={() => {
              stepsStore.steps[4].isComplete = true;
            }}
          />
        )),
        isComplete: false,
      },
    ];
  });

  return (
    <div class="container mx-auto w-full px-4 pt-24">
      <HStepper
        steps={stepsStore.steps}
        mode={state.Mode}
        onModeChange$={updateMode$}
        activeStep={activeStep.value}
        onStepComplete$={(id) => {
          const stepIndex = stepsStore.steps.findIndex(
            (step) => step.id === id,
          );
          if (stepIndex > -1) {
            stepsStore.steps[stepIndex].isComplete = true;
          }
        }}
        onStepChange$={(id) => {
          activeStep.value = id - 1;
        }}
      />
    </div>
  );
});
