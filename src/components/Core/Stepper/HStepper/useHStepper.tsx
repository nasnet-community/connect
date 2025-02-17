import { $, useSignal, useTask$ } from "@builder.io/qwik";
import type { HStepperProps, StepperMode } from "./HSteppertypes";

export function useStepper(props: HStepperProps) {
  const activeStep = useSignal(props.activeStep || 0);
  const selectedMode = useSignal<StepperMode>(props.mode || "easy");
  const steps = useSignal(props.steps);

  const handleModeChange$ = $((mode: StepperMode) => {
    selectedMode.value = mode;
    props.onModeChange$?.(mode);
  });

  const handleNext$ = $(() => {
    if (
      activeStep.value < steps.value.length - 1 &&
      steps.value[activeStep.value].isComplete
    ) {
      activeStep.value++;
      props.onStepChange$?.(steps.value[activeStep.value].id);
    }
  });

  const handlePrev$ = $(() => {
    if (activeStep.value > 0) {
      activeStep.value--;
      props.onStepChange$?.(steps.value[activeStep.value].id);
    }
  });

  useTask$(({ track }) => {
    track(() => steps.value[activeStep.value]?.isComplete);

    const currentStep = steps.value[activeStep.value];
    if (currentStep.isComplete && activeStep.value < steps.value.length - 1) {
      props.onStepComplete$?.(currentStep.id);
    }
  });

  return {
    activeStep,
    selectedMode,
    steps,
    handleModeChange$,
    handleNext$,
    handlePrev$,
  };
}
