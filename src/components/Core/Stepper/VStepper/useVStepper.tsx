import { useSignal, $, useTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { VStepperProps, StepItem } from "./types";

export const useVStepper = (props: VStepperProps) => {
  const activeStep = useSignal(props.activeStep || 0);
  const steps = useSignal<StepItem[]>(props.steps);
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

  // Step management functions
  const addStep$ = $((newStep: StepItem, position?: number) => {
    const newSteps = [...steps.value];
    
    if (position !== undefined && position >= 0 && position <= newSteps.length) {
      // Insert at specific position
      newSteps.splice(position, 0, newStep);
    } else {
      // Append to end
      newSteps.push(newStep);
    }
    
    steps.value = newSteps;
    return newStep.id;
  });
  
  const removeStep$ = $((stepId: number) => {
    const stepIndex = steps.value.findIndex(step => step.id === stepId);
    
    if (stepIndex >= 0) {
      const newSteps = [...steps.value];
      newSteps.splice(stepIndex, 1);
      
      // Adjust active step if necessary
      if (activeStep.value >= newSteps.length) {
        activeStep.value = Math.max(0, newSteps.length - 1);
      } else if (activeStep.value >= stepIndex) {
        // If we removed a step before the active one, adjust active step
        activeStep.value = Math.max(0, activeStep.value - 1);
      }
      
      steps.value = newSteps;
      return true;
    }
    
    return false;
  });

  const swapSteps$ = $((sourceIndex: number, targetIndex: number) => {
    if (
      sourceIndex >= 0 && 
      sourceIndex < steps.value.length && 
      targetIndex >= 0 && 
      targetIndex < steps.value.length &&
      sourceIndex !== targetIndex
    ) {
      const newSteps = [...steps.value];
      
      // Swap the steps
      [newSteps[sourceIndex], newSteps[targetIndex]] = 
      [newSteps[targetIndex], newSteps[sourceIndex]];
      
      // Update active step if it was one of the swapped steps
      if (activeStep.value === sourceIndex) {
        activeStep.value = targetIndex;
      } else if (activeStep.value === targetIndex) {
        activeStep.value = sourceIndex;
      }
      
      steps.value = newSteps;
      return true;
    }
    
    return false;
  });

  // Navigation functions
  const goToStep$ = $((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.value.length) {
      activeStep.value = stepIndex;
      scrollToStep(stepIndex);
      props.onStepChange$?.(steps.value[stepIndex].id);
    }
  });

  useTask$(({ track }) => {
    track(() => steps.value[activeStep.value]?.isComplete);

    if (steps.value[activeStep.value]?.isComplete) {
      props.onStepComplete$?.(steps.value[activeStep.value].id);

      if (activeStep.value < steps.value.length - 1) {
        activeStep.value++;
        props.onStepChange$?.(steps.value[activeStep.value].id);
        scrollToStep(activeStep.value);
      } else {
        scrollToBottom();
        props.onComplete$?.();
      }
    }
  });

  const completeStep = $((index: number) => {
    // Update the step completion status
    steps.value = steps.value.map((step, i) => 
      i === index ? { ...step, isComplete: true } : step
    );
    props.onStepComplete$?.(steps.value[index].id);
  });

  const toggleStepsVisibility = $(() => {
    isStepsVisible.value = !isStepsVisible.value;
  });

  return {
    activeStep,
    steps,
    isStepsVisible,
    position,
    completeStep,
    toggleStepsVisibility,
    isComplete,
    scrollToStep,
    addStep$,
    removeStep$,
    swapSteps$,
    goToStep$,
  };
};
