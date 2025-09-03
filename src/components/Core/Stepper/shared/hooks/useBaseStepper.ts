import { $, useSignal, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import type { 
  BaseStepMeta, 
  BaseStepperProps, 
  UseBaseStepperOptions, 
  UseBaseStepperReturn 
} from "../types";
import { useStepperHelp } from "./useStepperHelp";

/**
 * Base stepper hook with shared logic for all stepper types
 * Includes loop prevention for nested steppers and common functionality
 */
export function useBaseStepper<S extends BaseStepMeta = BaseStepMeta>(
  props: BaseStepperProps<S>,
  options: UseBaseStepperOptions = {}
): UseBaseStepperReturn<S> {
  const {
    preventInfiniteLoops = true,
    maxRenderCycles = 10,
    contextNamespace = '',
  } = options;

  // Core stepper state
  const activeStep = useSignal(props.activeStep || 0);
  const steps = useSignal<S[]>(props.steps);
  const previousSteps = useSignal<number[]>([]);
  const isStepperMounted = useSignal(false);

  // Error and loading state
  const hasError = useSignal(false);
  const errorMessage = useSignal('');
  const isLoading = useSignal(false);

  // Loop prevention state
  const renderCount = useSignal(0);
  const lastCompletedStep = useSignal<number | null>(null);
  const completionInProgress = useSignal(false);

  // Track steps changes to handle dynamic step modifications
  useTask$(({ track }) => {
    track(() => props.steps);
    
    if (isStepperMounted.value) {
      // Handle dynamic steps changes (adding or removing steps)
      const newSteps = [...props.steps];
      
      // Keep active step within bounds
      if (activeStep.value >= newSteps.length) {
        activeStep.value = Math.max(0, newSteps.length - 1);
      }
      
      // Update steps signal
      steps.value = newSteps;
    }
  });

  // Error handling for steps
  useTask$(({ track }) => {
    track(() => steps.value);
    
    // Check for problematic step configurations
    if (steps.value.length === 0) {
      hasError.value = true;
      errorMessage.value = 'No steps provided to the stepper component';
    } else {
      // Reset error state if we have steps
      hasError.value = false;
      errorMessage.value = '';
    }
  });

  // Handle step completion with loop prevention
  useTask$(({ track, cleanup }) => {
    // Prevent infinite loops in nested scenarios
    if (preventInfiniteLoops && renderCount.value > maxRenderCycles) {
      console.warn(
        `[${contextNamespace}] Stepper render cycle limit reached (${maxRenderCycles}). ` +
        `This usually indicates an infinite loop in nested steppers.`
      );
      return;
    }

    // Track only the active step index to minimize re-renders
    const currentStepIndex = track(() => activeStep.value);
    
    // Safety check
    if (currentStepIndex < 0 || currentStepIndex >= steps.value.length) {
      return;
    }

    const currentStep = steps.value[currentStepIndex];
    
    // Check if current step is complete and we haven't already processed it
    if (currentStep?.isComplete && 
        lastCompletedStep.value !== currentStep.id &&
        !completionInProgress.value) {
      
      // Mark as in progress to prevent duplicate calls
      completionInProgress.value = true;
      lastCompletedStep.value = currentStep.id;
      
      // Call the completion handler
      props.onStepComplete$?.(currentStep.id);
      
      // Reset completion flag after a short delay
      setTimeout(() => {
        completionInProgress.value = false;
      }, 50);
    }

    // Increment render count
    renderCount.value++;

    // Reset render counter after stable state
    const resetTimer = setTimeout(() => {
      renderCount.value = 0;
    }, 100);

    cleanup(() => clearTimeout(resetTimer));
  });

  useVisibleTask$(() => {
    isStepperMounted.value = true;
  });


  // Navigation functions
  const handleNext$ = $(() => {
    const canProceed = 
      activeStep.value < steps.value.length - 1 &&
      (steps.value[activeStep.value].isComplete || 
       props.allowSkipSteps || 
       steps.value[activeStep.value].skippable);

    if (canProceed) {
      // Store previous step for back navigation tracking
      previousSteps.value = [...previousSteps.value, activeStep.value];
      
      // Navigate to next step
      activeStep.value++;
      
      
      props.onStepChange$?.(steps.value[activeStep.value].id);
    } else if (
      activeStep.value === steps.value.length - 1 &&
      (steps.value[activeStep.value].isComplete || 
       props.allowSkipSteps || 
       steps.value[activeStep.value].skippable)
    ) {
      props.onComplete$?.();
    }
  });

  const handlePrev$ = $(() => {
    if (activeStep.value > 0) {
      // Use the tracked previous step if available
      if (previousSteps.value.length > 0) {
        const prevStep = previousSteps.value.pop();
        if (prevStep !== undefined) {
          activeStep.value = prevStep;
        } else {
          activeStep.value--;
        }
      } else {
        activeStep.value--;
      }
      
      
      props.onStepChange$?.(steps.value[activeStep.value].id);
    }
  });

  const setStep$ = $((step: number) => {
    // Allow navigation based on props configuration
    const canNavigateToStep = 
      step <= activeStep.value || 
      (step === activeStep.value + 1 && (
        steps.value[activeStep.value].isComplete || 
        props.allowSkipSteps || 
        steps.value[activeStep.value].skippable)) ||
      props.allowNonLinearNavigation ||
      props.allowSkipSteps;
    
    if (step >= 0 && step < steps.value.length && canNavigateToStep) {
      // Store previous step if advancing forward
      if (step > activeStep.value) {
        previousSteps.value = [...previousSteps.value, activeStep.value];
      }
      
      activeStep.value = step;
      
      
      props.onStepChange$?.(steps.value[step].id);
    }
  });

  // Step management functions
  const completeStep$ = $((stepId?: number) => {
    // If no stepId is provided, complete the current active step
    const idToComplete = stepId !== undefined 
      ? stepId 
      : steps.value[activeStep.value].id;
    
    // Update the step completion status
    steps.value = steps.value.map(step => 
      step.id === idToComplete ? { ...step, isComplete: true } : step
    );
    
    // Trigger onStepComplete prop if provided
    props.onStepComplete$?.(idToComplete);
  });

  const addStep$ = $((newStep: S, position?: number) => {
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

  // Error boundary for step component rendering errors
  const handleStepError = $((error: Error) => {
    console.error(`[${contextNamespace}] Error rendering step:`, error);
    hasError.value = true;
    errorMessage.value = `Error rendering step: ${error.message}`;
  });

  // Initialize help system (always call hook, but use enableHelp flag)
  const helpSystem = useStepperHelp(
    steps,
    activeStep,
    props.helpOptions
  );

  return {
    // Core state
    activeStep,
    steps,
    previousSteps,
    
    // Error and loading state
    hasError,
    errorMessage,
    isLoading,
    
    // Navigation functions
    handleNext$,
    handlePrev$,
    setStep$,
    
    // Step management
    completeStep$,
    addStep$,
    removeStep$,
    swapSteps$,
    handleStepError,
    
    // Loop prevention
    renderCount,
    lastCompletedStep,
    
    // Help system (only included if enabled)
    ...(props.enableHelp && { helpSystem }),
  };
}