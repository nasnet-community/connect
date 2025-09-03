import { useSignal, $, useTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { VStepperProps, StepItem } from "./types";
import { useBaseStepper } from "../shared/hooks/useBaseStepper";

/**
 * Legacy implementation for backward compatibility
 */
const useVStepperLegacy = (props: VStepperProps) => {
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

/**
 * Enhanced VStepper hook using shared base functionality
 */
export const useVStepper = (props: VStepperProps) => {
  // Convert StepItem[] to BaseStepMeta[] for base stepper compatibility
  const convertedProps = {
    ...props,
    steps: props.steps.map(step => ({
      ...step,
      helpContent: step.helpContent as any, // Type assertion for JSX.Element compatibility
    }))
  };

  // Always call all hooks at top level for Qwik compliance
  const baseStepperResult = useBaseStepper(convertedProps, {
    contextNamespace: 'vstepper',
    preventInfiniteLoops: true,
    maxRenderCycles: 15 // Higher limit for vertical stepper due to scrolling
  });

  // Always create these signals
  const isStepsVisibleEnhanced = useSignal(false);
  const location = useLocation();
  
  // Always call legacy implementation
  const legacyResult = useVStepperLegacy(props);

  // Calculate position (this doesn't need to be conditional)
  const position =
    props.position ||
    (location.url.pathname.startsWith("/ar") ? "right" : "left");
  const isComplete = props.isComplete || false;

  // VStepper-specific scroll function
  const scrollToStepEnhanced = $((index: number) => {
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

  const scrollToBottomEnhanced = $(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  });

  // Navigation with scroll
  const goToStepEnhanced$ = $((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < baseStepperResult.steps.value.length) {
      baseStepperResult.setStep$(stepIndex);
      scrollToStepEnhanced(stepIndex);
    }
  });

  // Always create the task, but conditionally execute its logic
  useTask$(({ track }) => {
    // Only run enhanced logic if features are enabled
    if (!props.enableEnhancedFeatures) return;
    
    track(() => baseStepperResult.steps.value[baseStepperResult.activeStep.value]?.isComplete);

    if (baseStepperResult.steps.value[baseStepperResult.activeStep.value]?.isComplete) {
      props.onStepComplete$?.(baseStepperResult.steps.value[baseStepperResult.activeStep.value].id);

      if (baseStepperResult.activeStep.value < baseStepperResult.steps.value.length - 1) {
        baseStepperResult.activeStep.value++;
        props.onStepChange$?.(baseStepperResult.steps.value[baseStepperResult.activeStep.value].id);
        scrollToStepEnhanced(baseStepperResult.activeStep.value);
      } else {
        scrollToBottomEnhanced();
        props.onComplete$?.();
      }
    }
  });

  const toggleStepsVisibilityEnhanced = $(() => {
    isStepsVisibleEnhanced.value = !isStepsVisibleEnhanced.value;
  });

  // Return based on whether enhanced features are enabled
  if (props.enableEnhancedFeatures) {
    return {
      // From base stepper
      activeStep: baseStepperResult.activeStep,
      steps: baseStepperResult.steps,
      addStep$: baseStepperResult.addStep$,
      removeStep$: baseStepperResult.removeStep$,
      swapSteps$: baseStepperResult.swapSteps$,
      completeStep: baseStepperResult.completeStep$,
      hasError: baseStepperResult.hasError,
      errorMessage: baseStepperResult.errorMessage,
      isLoading: baseStepperResult.isLoading,
      
      // VStepper-specific
      isStepsVisible: isStepsVisibleEnhanced,
      position,
      isComplete,
      scrollToStep: scrollToStepEnhanced,
      goToStep$: goToStepEnhanced$,
      toggleStepsVisibility: toggleStepsVisibilityEnhanced,
    };
  }

  // Fall back to legacy implementation for backward compatibility
  return legacyResult;
};