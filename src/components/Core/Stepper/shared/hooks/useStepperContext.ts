import { 
  useContextProvider, 
  useContext,
  createContextId,
  $, 
  useSignal,
  type ContextId,
  type Signal,
  type QRL
} from "@builder.io/qwik";
import type { BaseStepperContext, BaseStepMeta } from "../types";


/**
 * Creates an isolated stepper context with unique namespace
 * Prevents state collision in nested stepper scenarios
 */
export function createIsolatedStepperContext<T = any, S extends BaseStepMeta = BaseStepMeta>(
  name: string,
  parentPath?: string
): {
  contextId: ContextId<BaseStepperContext<T, S>>;
  contextPath: string;
} {
  // Generate unique context path based on hierarchy
  const contextPath = parentPath ? `${parentPath}.${name}` : name;
  const contextId = createContextId<BaseStepperContext<T, S>>(`stepper-${contextPath}`);
  
  return {
    contextId,
    contextPath
  };
}

/**
 * Interface for context provider configuration
 */
export interface StepperContextProviderConfig<T = any, S extends BaseStepMeta = BaseStepMeta> {
  contextId: ContextId<BaseStepperContext<T, S>>;
  steps: Signal<S[]>;
  activeStep: Signal<number>;
  setStep$: QRL<(step: number) => void>;
  handleNext$: QRL<() => void>;
  handlePrev$: QRL<() => void>;
  data?: T;
  onStepComplete$?: QRL<(id: number) => void>;
  previousSteps?: Signal<number[]>;
  addStep$: QRL<(newStep: S, position?: number) => number>;
  removeStep$: QRL<(stepId: number) => boolean>;
  swapSteps$: QRL<(sourceIndex: number, targetIndex: number) => boolean>;
  allowSkipSteps?: boolean;
  contextPath?: string;
  isolateState?: boolean;
  renderCount?: Signal<number>;
  lastCompletedStep?: Signal<number | null>;
}

/**
 * Provides an isolated stepper context to child components
 * Includes state management
 */
export function useProvideStepperContext<T = any, S extends BaseStepMeta = BaseStepMeta>(
  config: StepperContextProviderConfig<T, S>
): BaseStepperContext<T, S> {
  const {
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
    contextPath = '',
    isolateState = true,
    renderCount,
    lastCompletedStep
  } = config;

  // For tracking validation status
  const validationInProgress = useSignal(false);
  const stepValidationErrors = useSignal<Record<number, string[]>>({});
  
  // Create a local previousSteps if not provided
  const defaultPreviousSteps = useSignal<number[]>([]);
  const internalPreviousSteps = previousSteps || defaultPreviousSteps;
  
  // Create default signals for loop prevention if not provided
  const defaultRenderCount = useSignal(0);
  const defaultLastCompletedStep = useSignal<number | null>(null);
  const internalRenderCount = renderCount || defaultRenderCount;
  const internalLastCompletedStep = lastCompletedStep || defaultLastCompletedStep;
  
  
  

  // Safely call onStepComplete$ without returning the Promise
  const safelyCallOnStepComplete = $((stepId: number) => {
    if (onStepComplete$) {
      // Detach the promise to prevent it from propagating
      const promise = onStepComplete$(stepId);
      void promise; // Using void operator to explicitly ignore the promise
    }
    return null;
  });

  // Update step completion function
  const updateStepCompletion$ = $((stepId: number, isComplete: boolean) => {
    // Prevent duplicate updates in nested scenarios
    if (isolateState) {
      const step = steps.value.find(s => s.id === stepId);
      if (step && step.isComplete === isComplete) {
        return null; // No change needed
      }
    }
    
    steps.value = steps.value.map(step => 
      step.id === stepId ? { ...step, isComplete } : step
    );
    
    
    return null;
  });

  // Complete step function
  const completeStep$ = $((stepId?: number) => {
    const idToComplete = stepId !== undefined 
      ? stepId 
      : steps.value[activeStep.value]?.id;
    
    if (idToComplete === undefined) return null;
    
    // Check if already complete (prevent duplicate calls in nested scenarios)
    const step = steps.value.find(s => s.id === idToComplete);
    if (step?.isComplete) {
      return null; // Already complete, skip
    }
    
    // Update the step completion status
    steps.value = steps.value.map(step => 
      step.id === idToComplete ? { ...step, isComplete: true } : step
    );
    
    // Call the onStepComplete callback if provided
    if (onStepComplete$) {
      safelyCallOnStepComplete(idToComplete);
    }
    
    
    return null;
  });
  
  // Async step validation 
  const validateStep$ = $(async (stepId?: number): Promise<boolean> => {
    const idToValidate = stepId !== undefined
      ? stepId
      : steps.value[activeStep.value]?.id;
      
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
      console.error(`[${contextPath}] Step validation error:`, error);
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
  const contextValue: BaseStepperContext<T, S> = {
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
    renderCount: internalRenderCount,
    lastCompletedStep: internalLastCompletedStep,
    contextPath
  };

  // Provide the context
  useContextProvider(contextId, contextValue);

  return contextValue;
}

/**
 * Hook to consume stepper context from any child component
 */
export function useStepperContext<T = any, S extends BaseStepMeta = BaseStepMeta>(
  contextId: ContextId<BaseStepperContext<T, S>>
): BaseStepperContext<T, S> {
  return useContext(contextId);
}