import { $, useSignal, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import type { CStepMeta, CStepperProps } from "../types";

export function useCStepper(props: CStepperProps) {
  // Core stepper state
  const activeStep = useSignal(props.activeStep || 0);
  const steps = useSignal(props.steps);
  const previousSteps = useSignal<number[]>([]);
  const isStepperMounted = useSignal(false);
  
  // Error and loading state
  const hasError = useSignal(false);
  const errorMessage = useSignal('');
  const isLoading = useSignal(false);

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

  // Initialize stepper
  useVisibleTask$(() => {
    isStepperMounted.value = true;
  });

  const handleNext$ = $(() => {
    if (
      activeStep.value < steps.value.length - 1 &&
      (steps.value[activeStep.value].isComplete || 
       props.allowSkipSteps || 
       steps.value[activeStep.value].skippable)
    ) {
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

  // Error boundary for step component rendering errors
  const handleStepError = $((error: Error) => {
    console.error('Error rendering step:', error);
    hasError.value = true;
    errorMessage.value = `Error rendering step: ${error.message}`;
  });

  // Enhanced setStep$ to support conditional navigation
  const setStep$ = $((step: number) => {
    // Prevent navigation to incomplete steps that aren't adjacent
    const canNavigateToStep = 
      // Allow navigation to any previous step
      step <= activeStep.value || 
      // Allow navigation to next step if current is complete or step is skippable
      (step === activeStep.value + 1 && (
        steps.value[activeStep.value].isComplete || 
        props.allowSkipSteps || 
        steps.value[activeStep.value].skippable)) ||
      // Allow navigation to any step if non-linear navigation is enabled
      props.allowNonLinearNavigation ||
      // Allow navigation to any step if allowSkipSteps is enabled
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

  // Handle next button click with loading state
  const handleNextClick = $(async () => {
    const currentStep = steps.value[activeStep.value];
    const currentStepHasErrors = Boolean(currentStep.validationErrors && currentStep.validationErrors.length > 0);
    
    if (currentStepHasErrors) return;
    
    if (currentStep.isComplete) {
      isLoading.value = true;
      try {
        await handleNext$();
      } catch (err) {
        console.error('Navigation error:', err);
        errorMessage.value = 'Error navigating to next step';
        hasError.value = true;
      } finally {
        isLoading.value = false;
      }
    } else {
      isLoading.value = true;
      try {
        await completeStep$();
      } catch (err) {
        console.error('Step completion error:', err);
      } finally {
        isLoading.value = false;
      }
    }
  });

  // Dynamically add a new step
  const addStep$ = $((newStep: CStepMeta, position?: number) => {
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
  
  // Dynamically remove a step
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

  // Swap steps positions
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

  // Add function to easily complete a step
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

  useTask$(({ track }) => {
    track(() => steps.value[activeStep.value]?.isComplete);

    const currentStep = steps.value[activeStep.value];
    if (currentStep?.isComplete) {
      props.onStepComplete$?.(currentStep.id);
    }
  });

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
    handleNextClick,
    
    // Step management
    completeStep$,
    addStep$,
    removeStep$,
    handleStepError,
    swapSteps$,
  };
} 