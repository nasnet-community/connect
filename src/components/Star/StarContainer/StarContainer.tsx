import {
  component$,
  useContext,
  useSignal,
  $,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Choose } from "../Choose/Choose";
import { ExtraConfig } from "../ExtraConfig/ExtraConfig";
import { LAN } from "../LAN/LAN";
import { WAN } from "../WAN/WAN";
import { ShowConfig } from "../ShowConfig/ShowConfig";
import { HStepper } from "~/components/Core/Stepper/HStepper/HStepper";
import { useStore } from "@builder.io/qwik";
import { StarContext } from "../StarContext/StarContext";
import {
  LuSettings2,
  LuGlobe,
  LuNetwork,
  LuWrench,
  LuClipboardList,
} from "@qwikest/icons/lucide";
import { track } from '@vercel/analytics';
import type { Mode } from "../StarContext/ChooseType";

export const StarContainer = component$(() => {
  const activeStep = useSignal(0);
  const { state, updateChoose$ } = useContext(StarContext);
  const sessionStarted = useSignal(false);

  const stepsStore = useStore({
    steps: [] as any[],
  });

  // Track session start when component mounts
  useVisibleTask$(() => {
    if (!sessionStarted.value) {
      track('config_session_started', {
        user_mode: state.Choose.Mode,
        entry_point: 'star_container',
        timestamp: new Date().toISOString()
      });
      sessionStarted.value = true;
    }
  });

  // Track mode changes
  const handleModeChange = $((mode: Mode) => {
    track('mode_changed', {
      from_mode: state.Choose.Mode,
      to_mode: mode,
      current_step: stepsStore.steps[activeStep.value]?.title || 'unknown',
      step_number: activeStep.value + 1
    });
    updateChoose$({ Mode: mode });
  });

  // Track step completion
  const handleStepComplete = $((stepId: number, stepTitle: string) => {
    const stepIndex = stepsStore.steps.findIndex((step) => step.id === stepId);
    if (stepIndex > -1) {
      stepsStore.steps[stepIndex].isComplete = true;
      
      // Track step completion event
      track('step_completed', {
        step_name: stepTitle,
        step_number: stepId,
        step_index: stepIndex,
        user_mode: state.Choose.Mode,
        total_steps: stepsStore.steps.length,
        progress_percentage: Math.round(((stepIndex + 1) / stepsStore.steps.length) * 100)
      });

      // Check if this is the final step
      if (stepId === 5) { // ShowConfig is the final step
        track('config_flow_completed', {
          user_mode: state.Choose.Mode,
          total_steps_completed: stepsStore.steps.filter(step => step.isComplete).length,
          completion_time: new Date().toISOString()
        });
      }
    }
  });

  // Track step navigation
  const handleStepChange = $((stepId: number) => {
    const previousStep = activeStep.value;
    const newStep = stepId - 1;
    
    track('step_navigated', {
      from_step: stepsStore.steps[previousStep]?.title || 'unknown',
      to_step: stepsStore.steps[newStep]?.title || 'unknown',
      from_step_number: previousStep + 1,
      to_step_number: stepId,
      user_mode: state.Choose.Mode,
      navigation_direction: newStep > previousStep ? 'forward' : 'backward'
    });

    activeStep.value = newStep;
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
              handleStepComplete(1, 'Choose');
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
              handleStepComplete(2, 'WAN');
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
              handleStepComplete(3, 'LAN');
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
              handleStepComplete(4, 'Extra Config');
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
              handleStepComplete(5, 'Show Config');
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
        mode={state.Choose.Mode}
        onModeChange$={handleModeChange}
        activeStep={activeStep.value}
        onStepComplete$={(id) => {
          const stepIndex = stepsStore.steps.findIndex(
            (step) => step.id === id,
          );
          if (stepIndex > -1) {
            stepsStore.steps[stepIndex].isComplete = true;
          }
        }}
        onStepChange$={handleStepChange}
      />
    </div>
  );
});
