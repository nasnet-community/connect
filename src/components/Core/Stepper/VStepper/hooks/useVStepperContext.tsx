import { 
  createContextId, 
  useContext, 
  useContextProvider,
  $,
  useSignal
} from "@builder.io/qwik";
import type { VStepperContext, StepItem } from "../types";
import type { ContextId } from "@builder.io/qwik";

// Create default context ID for VStepper
export const VStepperContextId = createContextId<VStepperContext>("VStepper-context");

/**
 * Creates a context for sharing state between vertical stepper steps
 * @param name A unique name for this stepper context
 * @returns A context ID for the stepper
 */
export function createVStepperContext<T = any>(name: string = "custom-vstepper") {
  // Create a typed context ID for this specific stepper
  return createContextId<VStepperContext<T>>(`VStepper-${name}`);
}

/**
 * Hook to provide stepper context to all steps
 * @param contextId The context ID created with createVStepperContext
 * @param steps Initial steps array
 * @param activeStep Initial active step index
 * @param data Initial data to store in context
 * @param scrollToStep Function to scroll to a specific step
 */
export function useProvideVStepperContext<T = any>(
  contextId: ContextId<VStepperContext<T>>,
  steps: StepItem[],
  activeStep: number,
  data: T,
  scrollToStep$: any
) {
  const stepsSignal = useSignal<StepItem[]>(steps);
  const activeStepSignal = useSignal<number>(activeStep);
  
  // Step navigation functions
  const goToStep$ = $((step: number) => {
    if (step >= 0 && step < stepsSignal.value.length) {
      activeStepSignal.value = step;
      scrollToStep$(step);
    }
  });
  
  const nextStep$ = $(() => {
    const currentStep = activeStepSignal.value;
    if (currentStep < stepsSignal.value.length - 1) {
      activeStepSignal.value++;
      scrollToStep$(activeStepSignal.value);
    }
  });
  
  const prevStep$ = $(() => {
    if (activeStepSignal.value > 0) {
      activeStepSignal.value--;
      scrollToStep$(activeStepSignal.value);
    }
  });
  
  // Step completion state
  const updateStepCompletion$ = $((stepId: number, isComplete: boolean) => {
    stepsSignal.value = stepsSignal.value.map(step => 
      step.id === stepId ? { ...step, isComplete } : step
    );
  });
  
  // Add function to easily complete a step
  const completeStep$ = $((stepId?: number) => {
    // If no stepId is provided, complete the current active step
    const idToComplete = stepId !== undefined ? stepId : stepsSignal.value[activeStepSignal.value].id;
    
    // Update the step completion status
    stepsSignal.value = stepsSignal.value.map(step => 
      step.id === idToComplete ? { ...step, isComplete: true } : step
    );
  });
  
  // Add step management functions
  const addStep$ = $((newStep: StepItem, position?: number) => {
    const newSteps = [...stepsSignal.value];
    
    if (position !== undefined && position >= 0 && position <= newSteps.length) {
      // Insert at specific position
      newSteps.splice(position, 0, newStep);
    } else {
      // Append to end
      newSteps.push(newStep);
    }
    
    stepsSignal.value = newSteps;
    return newStep.id;
  });
  
  const removeStep$ = $((stepId: number) => {
    const stepIndex = stepsSignal.value.findIndex(step => step.id === stepId);
    
    if (stepIndex >= 0) {
      const newSteps = [...stepsSignal.value];
      newSteps.splice(stepIndex, 1);
      
      // Adjust active step if necessary
      if (activeStepSignal.value >= newSteps.length) {
        activeStepSignal.value = Math.max(0, newSteps.length - 1);
      } else if (activeStepSignal.value >= stepIndex) {
        // If we removed a step before the active one, adjust active step
        activeStepSignal.value = Math.max(0, activeStepSignal.value - 1);
      }
      
      stepsSignal.value = newSteps;
      return true;
    }
    
    return false;
  });
  
  const swapSteps$ = $((sourceIndex: number, targetIndex: number) => {
    if (
      sourceIndex >= 0 && 
      sourceIndex < stepsSignal.value.length && 
      targetIndex >= 0 && 
      targetIndex < stepsSignal.value.length &&
      sourceIndex !== targetIndex
    ) {
      const newSteps = [...stepsSignal.value];
      
      // Swap the steps
      [newSteps[sourceIndex], newSteps[targetIndex]] = 
      [newSteps[targetIndex], newSteps[sourceIndex]];
      
      // Update active step if it was one of the swapped steps
      if (activeStepSignal.value === sourceIndex) {
        activeStepSignal.value = targetIndex;
      } else if (activeStepSignal.value === targetIndex) {
        activeStepSignal.value = sourceIndex;
      }
      
      stepsSignal.value = newSteps;
      return true;
    }
    
    return false;
  });
  
  // Create the context value
  const contextValue: VStepperContext<T> = {
    activeStep: activeStepSignal,
    steps: stepsSignal,
    goToStep$,
    nextStep$,
    prevStep$,
    updateStepCompletion$,
    completeStep$,
    addStep$,
    removeStep$,
    swapSteps$,
    scrollToStep$,
    data
  };
  
  // Provide the context
  useContextProvider(contextId, contextValue);
  
  return contextValue;
}

/**
 * Hook to consume stepper context from any step component
 * @param contextId Optional custom context ID (if not provided, uses default)
 * @returns The stepper context with shared state and functions
 */
export function useVStepperContext<T = any>(
  contextId: ContextId<VStepperContext<T>> = VStepperContextId as unknown as ContextId<VStepperContext<T>>
) {
  return useContext<VStepperContext<T>>(contextId);
} 