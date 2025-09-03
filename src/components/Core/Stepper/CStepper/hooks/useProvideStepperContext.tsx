import { useContextProvider, $, useSignal } from "@builder.io/qwik";
import type { CStepperContext, CStepMeta } from "../types";
import type { ContextId, Signal, QRL } from "@builder.io/qwik";


/**
 * A hook to create and provide a CStepper context
 * @param contextId The context ID to use
 * @param steps Steps signal from CStepper
 * @param activeStep Active step signal from CStepper
 * @param handlers Navigation handlers
 * @param data Additional data to store in the context
 */
export function useProvideStepperContext<T = any>({
  contextId,
  steps,
  activeStep,
  setStep$,
  handleNext$,
  handlePrev$,
  data = {} as T,
  onStepComplete$,
  previousSteps,
  addStep$,
  removeStep$,
  swapSteps$,
  allowSkipSteps = false,
}: {
  contextId: ContextId<CStepperContext<T>>;
  steps: Signal<CStepMeta[]>;
  activeStep: Signal<number>;
  setStep$: QRL<(step: number) => void>;
  handleNext$: QRL<() => void>;
  handlePrev$: QRL<() => void>;
  data?: T;
  onStepComplete$?: QRL<(id: number) => void>;
  previousSteps?: Signal<number[]>;
  addStep$: QRL<(newStep: CStepMeta, position?: number) => number>;
  removeStep$: QRL<(stepId: number) => boolean>;
  swapSteps$: QRL<(sourceIndex: number, targetIndex: number) => boolean>;
  allowSkipSteps?: boolean;
}) {
  // For tracking validation status
  const validationInProgress = useSignal(false);
  const stepValidationErrors = useSignal<Record<number, string[]>>({});
  
  // Create a local previousSteps at the root level
  const defaultPreviousSteps = useSignal<number[]>([]);
  // Use the provided previousSteps or the default one
  const internalPreviousSteps = previousSteps || defaultPreviousSteps;
  
  
  

  // Safely call onStepComplete$ without returning the Promise
  const safelyCallOnStepComplete = $((stepId: number) => {
    if (onStepComplete$) {
      // Detach the promise to prevent it from propagating
      const promise = onStepComplete$(stepId);
      void promise; // Using void operator to explicitly ignore the promise
    }
    // Always return a non-promise value
    return null;
  });

  // Create update step completion function
  const updateStepCompletion$ = $((stepId: number, isComplete: boolean) => {
    // Find and update step completion
    steps.value = steps.value.map(step => 
      step.id === stepId ? { ...step, isComplete } : step
    );
    
    
    // Explicitly return null instead of undefined to ensure it's not a promise
    return null;
  });

  // Add function to easily complete a step
  const completeStep$ = $((stepId?: number) => {
    // If no stepId is provided, complete the current active step
    const idToComplete = stepId !== undefined 
      ? stepId 
      : steps.value[activeStep.value]?.id;
    
    // Safety check for undefined id
    if (idToComplete === undefined) return null;
    
    // Update the step completion status
    steps.value = steps.value.map(step => 
      step.id === idToComplete ? { ...step, isComplete: true } : step
    );
    
    // Call the onStepComplete callback if provided
    if (onStepComplete$) {
      // Use the safe wrapper to avoid promise leakage
      safelyCallOnStepComplete(idToComplete);
    }
    
    
    // Explicitly return null to prevent promise leakage
    return null;
  });
  
  // Async step validation 
  const validateStep$ = $(async (stepId?: number): Promise<boolean> => {
    // Default to current step if no ID is provided
    const idToValidate = stepId !== undefined
      ? stepId
      : steps.value[activeStep.value]?.id;
      
    // Safety check
    if (idToValidate === undefined) return false;
    
    // Set validation in progress flag
    validationInProgress.value = true;
    
    try {
      // Find the step
      const stepIndex = steps.value.findIndex(step => step.id === idToValidate);
      if (stepIndex === -1) return false;
      
      // Get validation errors
      const errors = steps.value[stepIndex].validationErrors || [];
      
      // Clear previous errors
      const newErrors = { ...stepValidationErrors.value };
      delete newErrors[idToValidate];
      stepValidationErrors.value = newErrors;
      
      // Check if step has validation errors
      const isValid = errors.length === 0;
      
      if (!isValid) {
        // Store validation errors for the step
        stepValidationErrors.value = {
          ...stepValidationErrors.value,
          [idToValidate]: errors
        };
      }
      
      return isValid;
    } catch (error) {
      console.error('Step validation error:', error);
      return false;
    } finally {
      validationInProgress.value = false;
    }
  });
  
  // Set validation errors for a step
  const setStepErrors$ = $((stepId: number, errors: string[]) => {
    // Update step with errors
    steps.value = steps.value.map(step => 
      step.id === stepId ? { ...step, validationErrors: errors } : step
    );
    
    // Store validation errors
    stepValidationErrors.value = {
      ...stepValidationErrors.value,
      [stepId]: errors
    };
  });

  // Create the context value
  const contextValue: CStepperContext<T> = {
    activeStep,
    steps,
    previousSteps: internalPreviousSteps,
    goToStep$: setStep$,
    nextStep$: handleNext$,
    prevStep$: handlePrev$,
    updateStepCompletion$,
    completeStep$,
    validateStep$,
    setStepErrors$,
    data,
    addStep$,
    removeStep$,
    swapSteps$,
    allowSkipSteps,
  };

  // Provide the context
  useContextProvider(contextId, contextValue);

  return contextValue;
} 