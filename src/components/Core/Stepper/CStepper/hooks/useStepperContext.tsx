import { 
  createContextId, 
  useContext, 
  useContextProvider,
  $,
  useSignal
} from "@builder.io/qwik";
import type { CStepperContext, CStepMeta } from "../types";
import type { ContextId } from "@builder.io/qwik";

// Create default context ID for CStepper
export const CStepperContextId = createContextId<CStepperContext>("CStepper-context");

/**
 * Creates a context for sharing state between stepper steps
 * @param name A unique name for this stepper context
 * @returns A context ID for the stepper
 */
export function createStepperContext<T = any>(name: string = "custom-stepper") {
  // Create a typed context ID for this specific stepper
  return createContextId<CStepperContext<T>>(`CStepper-${name}`);
}

/**
 * Hook to provide stepper context to all steps
 * @param contextId The context ID created with createStepperContext
 * @param steps Initial steps array
 * @param activeStep Initial active step index
 * @param data Initial data to store in context
 */
export function useProvideStepperContext<T = any>(
  contextId: ContextId<CStepperContext<T>>,
  steps: CStepMeta[],
  activeStep: number,
  data: T
) {
  const stepsSignal = useSignal<CStepMeta[]>(steps);
  const activeStepSignal = useSignal<number>(activeStep);
  
  // Step navigation functions
  const goToStep$ = $((step: number) => {
    if (step >= 0 && step < stepsSignal.value.length) {
      activeStepSignal.value = step;
    }
  });
  
  const nextStep$ = $(() => {
    const currentStep = activeStepSignal.value;
    if (currentStep < stepsSignal.value.length - 1 && stepsSignal.value[currentStep].isComplete) {
      activeStepSignal.value++;
    }
  });
  
  const prevStep$ = $(() => {
    if (activeStepSignal.value > 0) {
      activeStepSignal.value--;
    }
  });
  
  // Step completion state
  const updateStepCompletion$ = $((stepId: number, isComplete: boolean) => {
    stepsSignal.value = stepsSignal.value.map(step => 
      step.id === stepId ? { ...step, isComplete } : step
    );
  });
  
  // Add new function to easily complete a step
  const completeStep$ = $((stepId?: number) => {
    // If no stepId is provided, complete the current active step
    const idToComplete = stepId !== undefined ? stepId : stepsSignal.value[activeStepSignal.value].id;
    
    // Update the step completion status
    stepsSignal.value = stepsSignal.value.map(step => 
      step.id === idToComplete ? { ...step, isComplete: true } : step
    );
  });
  
  // Create the context value
  const contextValue: CStepperContext<T> = {
    activeStep: activeStepSignal,
    steps: stepsSignal,
    goToStep$,
    nextStep$,
    prevStep$,
    updateStepCompletion$,
    completeStep$,
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
export function useStepperContext<T = any>(
  contextId: ContextId<CStepperContext<T>> = CStepperContextId as unknown as ContextId<CStepperContext<T>>
) {
  return useContext<CStepperContext<T>>(contextId);
} 