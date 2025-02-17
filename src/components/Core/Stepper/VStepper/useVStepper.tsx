import { useSignal, $, useTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { VStepperProps } from "./types";

export const useVStepper = (props: VStepperProps) => {
  const activeStep = useSignal(props.activeStep || 0);
  const isStepsVisible = useSignal(false);
  const location = useLocation();
  const position =
    props.position ||
    (location.url.pathname.startsWith("/ar") ? "right" : "left");
  const isComplete = props.isComplete || false;

  useTask$(({ track }) => {
    track(() => props.steps[activeStep.value]?.isComplete);

    if (
      props.steps[activeStep.value]?.isComplete &&
      activeStep.value < props.steps.length - 1
    ) {
      props.onStepComplete$?.(props.steps[activeStep.value].id);
      activeStep.value++;
      props.onStepChange$?.(props.steps[activeStep.value].id);
    }
  });

  const completeStep = $((index: number) => {
    props.steps[index].isComplete = true;
    props.onStepComplete$?.(props.steps[index].id);
  });

  const toggleStepsVisibility = $(() => {
    isStepsVisible.value = !isStepsVisible.value;
  });

  return {
    activeStep,
    isStepsVisible,
    position,
    completeStep,
    toggleStepsVisibility,
    isComplete,
  };
};
