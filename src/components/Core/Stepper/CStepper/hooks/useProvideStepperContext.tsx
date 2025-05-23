import { useContextProvider, $, useVisibleTask$, useSignal } from "@builder.io/qwik";
import type { CStepperContext, CStepMeta } from "../types";
import type { ContextId, Signal, QRL } from "@builder.io/qwik";

const STORAGE_KEY_PREFIX = 'qwik-stepper-';

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
  persistState = false,
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
  persistState?: boolean;
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
  
  // Storage key for this specific stepper
  const storageKey = `${STORAGE_KEY_PREFIX}${contextId.id}`;
  
  // Handle persistence and resuming from saved state
  useVisibleTask$(({ track, cleanup }) => {
    if (persistState) {
      // Create deep clones for tracking
      const trackableSteps = track(() => JSON.parse(JSON.stringify(steps.value)));
      const trackableData = track(() => JSON.parse(JSON.stringify(data)));
      const trackableActiveStep = track(() => activeStep.value);
      
      // Save current state to localStorage
      const saveState = () => {
        try {
          const stateToSave = {
            steps: trackableSteps,
            data: trackableData,
            activeStep: trackableActiveStep,
            timestamp: new Date().toISOString()
          };
          localStorage.setItem(storageKey, JSON.stringify(stateToSave));
        } catch (err) {
          console.warn('Failed to save stepper state:', err);
        }
      };
      
      // Save state on changes
      saveState();
      
      // Setup window unload handler for final save
      const handleUnload = () => saveState();
      window.addEventListener('beforeunload', handleUnload);
      
      // Cleanup
      cleanup(() => {
        window.removeEventListener('beforeunload', handleUnload);
      });
    }
  });
  
  // Function to restore saved state (if available)
  const restoreSavedState$ = $(() => {
    if (!persistState) return false;
    
    try {
      const savedStateJson = localStorage.getItem(storageKey);
      if (!savedStateJson) return false;
      
      const savedState = JSON.parse(savedStateJson);
      
      // Validate saved state
      if (!savedState || !savedState.steps || !savedState.data) {
        return false;
      }
      
      // Restore data
      if (typeof data === 'object' && data !== null && typeof savedState.data === 'object') {
        Object.assign(data as Record<string, any>, savedState.data);
      }
      
      // Restore step completion states
      const savedSteps = savedState.steps as CStepMeta[];
      steps.value = steps.value.map((step) => {
        const savedStep = savedSteps.find(s => s.id === step.id);
        return savedStep ? { ...step, isComplete: savedStep.isComplete } : step;
      });
      
      // Restore active step safely
      if (typeof savedState.activeStep === 'number' && 
          savedState.activeStep >= 0 && 
          savedState.activeStep < steps.value.length) {
        activeStep.value = savedState.activeStep;
      }
      
      return true;
    } catch (err) {
      console.warn('Failed to restore stepper state:', err);
      return false;
    }
  });
  
  // Clear saved state
  const clearSavedState$ = $(() => {
    if (persistState) {
      localStorage.removeItem(storageKey);
    }
  });

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
    
    // Save state if persistence is enabled
    if (persistState) {
      const stateToSave = {
        steps: steps.value,
        data,
        activeStep: activeStep.value,
        timestamp: new Date().toISOString()
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(stateToSave));
      } catch (e) {
        console.warn('Failed to save state:', e);
      }
    }
    
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
    
    // Save state if persistence is enabled
    if (persistState) {
      const stateToSave = {
        steps: steps.value,
        data,
        activeStep: activeStep.value,
        timestamp: new Date().toISOString()
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(stateToSave));
      } catch (e) {
        console.warn('Failed to save state:', e);
      }
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
    restoreSavedState$,
    clearSavedState$,
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