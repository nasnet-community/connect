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

  const scrollToStep = $((index: number) => {
    const currentStepElement = document.getElementById(`step-${index}`);
    const previousStepElement = document.getElementById(`step-${index - 1}`);
    const headerOffset = 220;

    if (currentStepElement) {
      const viewportHeight = window.innerHeight;
      const viewportTop = window.pageYOffset;

      const currentRect = currentStepElement.getBoundingClientRect();
      const currentAbsoluteTop = viewportTop + currentRect.top;

      const padding = 80;
      let targetScroll = currentAbsoluteTop - headerOffset - padding;

      if (previousStepElement) {
        const previousRect = previousStepElement.getBoundingClientRect();
        const previousAbsoluteBottom = viewportTop + previousRect.bottom;
        const minVisiblePrevious = 200;

        targetScroll = Math.max(
          targetScroll,
          previousAbsoluteBottom - minVisiblePrevious,
        );
      }

      const maxScroll = document.documentElement.scrollHeight - viewportHeight;
      const finalScroll = Math.max(0, Math.min(targetScroll, maxScroll));

      window.scrollTo({
        top: finalScroll,
        behavior: "smooth",
      });
    }
  });

  const scrollToBottom = $(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  });

  useTask$(({ track }) => {
    track(() => props.steps[activeStep.value]?.isComplete);

    if (props.steps[activeStep.value]?.isComplete) {
      props.onStepComplete$?.(props.steps[activeStep.value].id);

      if (activeStep.value < props.steps.length - 1) {
        activeStep.value++;
        props.onStepChange$?.(props.steps[activeStep.value].id);
        scrollToStep(activeStep.value);
      } else {
        scrollToBottom();
      }
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
