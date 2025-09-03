import { $, useSignal, useTask$ } from "@builder.io/qwik";
import type { HStepperProps, StepperMode } from "./HSteppertypes";
import { useBaseStepper } from "../shared/hooks/useBaseStepper";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/**
 * Legacy implementation for backward compatibility
 */
function useHStepperLegacy(props: HStepperProps) {
  const activeStep = useSignal(props.activeStep || 0);
  const selectedMode = useSignal<StepperMode>(props.mode || "easy");
  const steps = useSignal(props.steps);

  const handleModeChange$ = $((mode: StepperMode) => {
    selectedMode.value = mode;
    props.onModeChange$?.(mode);
  });

  // const handleNext$ = $(() => {
  //   if (
  //     activeStep.value < steps.value.length - 1 &&
  //     steps.value[activeStep.value].isComplete
  //   ) {
  //     activeStep.value++;
  //     props.onStepChange$?.(steps.value[activeStep.value].id);
  //   }
  // });

  const handleNext$ = $(() => {
    if (
      activeStep.value < steps.value.length - 1 &&
      steps.value[activeStep.value].isComplete
    ) {
      activeStep.value++;
      props.onStepChange$?.(steps.value[activeStep.value].id);
      scrollToTop();
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

/**
 * Enhanced HStepper hook using shared base functionality
 */
export function useStepper(props: HStepperProps) {
  // Always call hooks at top level for Qwik compliance
  const baseStepperResult = useBaseStepper(props, {
    contextNamespace: 'hstepper',
    preventInfiniteLoops: true,
    maxRenderCycles: 10
  });

  // Always create these signals
  const selectedModeEnhanced = useSignal<StepperMode>(props.mode || "easy");
  
  // Always call legacy implementation
  const legacyResult = useHStepperLegacy(props);

  // Enhanced mode change handler
  const handleModeChangeEnhanced$ = $((mode: StepperMode) => {
    selectedModeEnhanced.value = mode;
    props.onModeChange$?.(mode);
  });

  // Enhanced next with scroll
  const handleNextEnhanced$ = $(() => {
    if (
      baseStepperResult.activeStep.value < baseStepperResult.steps.value.length - 1 &&
      baseStepperResult.steps.value[baseStepperResult.activeStep.value].isComplete
    ) {
      baseStepperResult.activeStep.value++;
      props.onStepChange$?.(baseStepperResult.steps.value[baseStepperResult.activeStep.value].id);
      scrollToTop();
    } else if (
      baseStepperResult.activeStep.value === baseStepperResult.steps.value.length - 1 &&
      baseStepperResult.steps.value[baseStepperResult.activeStep.value].isComplete
    ) {
      props.onComplete$?.();
    }
  });

  // Enhanced prev
  const handlePrevEnhanced$ = $(() => {
    if (baseStepperResult.activeStep.value > 0) {
      baseStepperResult.activeStep.value--;
      props.onStepChange$?.(baseStepperResult.steps.value[baseStepperResult.activeStep.value].id);
      scrollToTop();
    }
  });

  // Always create the task, but conditionally execute its logic
  useTask$(({ track }) => {
    // Only run enhanced logic if features are enabled
    if (!props.enableEnhancedFeatures) return;
    
    track(() => baseStepperResult.steps.value[baseStepperResult.activeStep.value]?.isComplete);

    const currentStep = baseStepperResult.steps.value[baseStepperResult.activeStep.value];
    if (currentStep?.isComplete && baseStepperResult.activeStep.value < baseStepperResult.steps.value.length - 1) {
      props.onStepComplete$?.(currentStep.id);
    }
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
      completeStep$: baseStepperResult.completeStep$,
      setStep$: baseStepperResult.setStep$,
      hasError: baseStepperResult.hasError,
      errorMessage: baseStepperResult.errorMessage,
      isLoading: baseStepperResult.isLoading,
      
      // HStepper-specific
      selectedMode: selectedModeEnhanced,
      handleModeChange$: handleModeChangeEnhanced$,
      handleNext$: handleNextEnhanced$,
      handlePrev$: handlePrevEnhanced$,
    };
  }

  // Fall back to legacy implementation for backward compatibility
  return legacyResult;
}
