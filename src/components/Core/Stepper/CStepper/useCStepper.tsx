import { $, useSignal, useTask$ } from "@builder.io/qwik";
import type { CStepperProps } from "./types";

export function useCStepper(props: CStepperProps) {
  const activeStep = useSignal(props.activeStep || 0);
  const steps = useSignal(props.steps);

  const handleNext$ = $(() => {
    if (
      activeStep.value < steps.value.length - 1 &&
      steps.value[activeStep.value].isComplete
    ) {
      activeStep.value++;
      props.onStepChange$?.(steps.value[activeStep.value].id);
    } else if (
      activeStep.value === steps.value.length - 1 &&
      steps.value[activeStep.value].isComplete
    ) {
      props.onComplete$?.();
    }
  });

  const handlePrev$ = $(() => {
    if (activeStep.value > 0) {
      activeStep.value--;
      props.onStepChange$?.(steps.value[activeStep.value].id);
    }
  });

  const setStep$ = $((step: number) => {
    if (step <= activeStep.value) {
      activeStep.value = step;
      props.onStepChange$?.(steps.value[step].id);
    }
  });

  useTask$(({ track }) => {
    track(() => steps.value[activeStep.value]?.isComplete);

    const currentStep = steps.value[activeStep.value];
    if (currentStep?.isComplete) {
      props.onStepComplete$?.(currentStep.id);
    }
  });

  return {
    activeStep,
    steps,
    handleNext$,
    handlePrev$,
    setStep$,
  };
} 