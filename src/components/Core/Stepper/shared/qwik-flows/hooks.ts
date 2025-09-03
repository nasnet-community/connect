import { useSignal, useTask$, $ } from "@builder.io/qwik";
import { QwikStepEvaluator, QwikStepUtils } from "./evaluator";
import type {
  QwikStepDefinition,
  StepContext,
  UseQwikStepsOptions,
  UseQwikFlowsOptions,
  UseQwikStepsReturn,
  UseQwikFlowsReturn,
  StepCompletionState,
  StepEvaluationOptions,
} from "./types";


/**
 * Hook for managing conditional steps with serializable conditions
 * This is the main hook for simple step conditional logic
 */
export function useQwikSteps(options: UseQwikStepsOptions): UseQwikStepsReturn {
  const { steps, context, options: evalOptions, onStepsChange$, onContextChange$ } = options;

  // Reactive state
  const visibleSteps = useSignal<QwikStepDefinition[]>([]);
  const completionState = useSignal<StepCompletionState>({
    completions: {},
    lastEvaluated: 0,
    evaluatedKeys: [],
  });
  const previousContext = useSignal<StepContext>({});
  const contextSignal = useSignal<StepContext>(
    typeof context === 'object' && context && !('resolve' in context) 
      ? context as StepContext 
      : {}
  );

  // Track context changes and re-evaluate steps
  useTask$(({ track }) => {
    const currentContext = track(() => contextSignal.value);
    
    // Extract dependencies from all steps
    const allDependencies = steps.flatMap(step => step.dependencies || []);
    const uniqueDependencies = [...new Set(allDependencies)];
    
    // Check if any dependencies have changed
    const hasChanges = uniqueDependencies.length === 0 || 
      QwikStepEvaluator.dependenciesChanged(
        uniqueDependencies, 
        currentContext, 
        previousContext.value
      );

    if (hasChanges) {
      // Evaluate all steps
      const stepResults = QwikStepEvaluator.evaluateSteps(
        steps,
        currentContext,
        evalOptions
      );

      // Extract just the step definitions
      const evaluatedSteps = stepResults.map(result => result.step);

      // Preserve completion status if enabled
      const finalSteps = evalOptions?.preserveCompletion 
        ? QwikStepUtils.preserveCompletionStatus(evaluatedSteps, completionState.value.completions)
        : evaluatedSteps;

      // Update visible steps
      visibleSteps.value = finalSteps;

      // Update completion state tracking
      completionState.value = {
        ...completionState.value,
        lastEvaluated: Date.now(),
        evaluatedKeys: uniqueDependencies,
      };

      // Store current context for next comparison
      previousContext.value = { ...currentContext };

      // Trigger callback if provided
      if (onStepsChange$) {
        onStepsChange$(finalSteps);
      }

      if (onContextChange$) {
        onContextChange$(currentContext);
      }

      // Debug logging
      if (evalOptions?.debug) {
        console.log("[useQwikSteps] Steps re-evaluated:", {
          totalSteps: steps.length,
          visibleSteps: finalSteps.length,
          context: currentContext,
          dependencies: uniqueDependencies,
        });
      }
    }
  });

  // Methods for managing step completion
  const updateContext$ = $((newContext: StepContext) => {
    // Context updates are handled by the tracking above
    // This is mainly for external updates
    if (onContextChange$) {
      onContextChange$(newContext);
    }
  });

  const setStepCompletion$ = $((stepId: number, completed: boolean) => {
    completionState.value = {
      ...completionState.value,
      completions: {
        ...completionState.value.completions,
        [stepId]: completed,
      },
    };

    // Update visible steps with new completion status
    visibleSteps.value = visibleSteps.value.map(step =>
      step.id === stepId ? { ...step, isComplete: completed } : step
    );
  });

  const getStepCompletion$ = $((stepId: number) => {
    return completionState.value.completions[stepId] ?? false;
  });

  const reevaluate$ = $(() => {
    // Force re-evaluation by updating the previous context
    previousContext.value = {};
  });

  return {
    visibleSteps,
    completionState,
    updateContext$,
    setStepCompletion$,
    getStepCompletion$,
    reevaluate$,
  };
}

/**
 * Hook for managing multiple flows with conditional activation
 */
export function useQwikFlows(options: UseQwikFlowsOptions): UseQwikFlowsReturn {
  const { flows, context, defaultFlow, options: evalOptions, onFlowsChange$, onContextChange$ } = options;

  // Reactive state
  const activeFlows = useSignal<string[]>([]);
  const visibleSteps = useSignal<QwikStepDefinition[]>([]);
  const completionState = useSignal<StepCompletionState>({
    completions: {},
    lastEvaluated: 0,
    evaluatedKeys: [],
  });
  const previousContext = useSignal<StepContext>({});
  const contextSignal = useSignal<StepContext>(
    typeof context === 'object' && context && !('resolve' in context) 
      ? context as StepContext 
      : {}
  );

  // Track context changes and re-evaluate flows
  useTask$(({ track }) => {
    const currentContext = track(() => contextSignal.value);
    
    // Extract dependencies from all flows and their steps
    const allDependencies = flows.flatMap(flow => [
      ...(flow.dependencies || []),
      ...flow.steps.flatMap(step => step.dependencies || [])
    ]);
    const uniqueDependencies = [...new Set(allDependencies)];
    
    // Check if any dependencies have changed
    const hasChanges = uniqueDependencies.length === 0 || 
      QwikStepEvaluator.dependenciesChanged(
        uniqueDependencies, 
        currentContext, 
        previousContext.value
      );

    if (hasChanges) {
      // Evaluate all flows
      const flowResults = QwikStepEvaluator.evaluateFlows(
        flows,
        currentContext,
        evalOptions
      );

      // Get active flow IDs
      const activeFlowIds = flowResults
        .filter(result => result.active)
        .map(result => result.flow.id);

      // If no flows are active and we have a default, use it
      if (activeFlowIds.length === 0 && defaultFlow) {
        const defaultFlowExists = flows.some(flow => flow.id === defaultFlow);
        if (defaultFlowExists) {
          activeFlowIds.push(defaultFlow);
        }
      }

      // Merge steps from active flows
      const mergedSteps = QwikStepEvaluator.mergeFlowSteps(flowResults);

      // Preserve completion status if enabled
      const finalSteps = evalOptions?.preserveCompletion 
        ? QwikStepUtils.preserveCompletionStatus(mergedSteps, completionState.value.completions)
        : mergedSteps;

      // Update state
      activeFlows.value = activeFlowIds;
      visibleSteps.value = finalSteps;

      // Update completion state tracking
      completionState.value = {
        ...completionState.value,
        lastEvaluated: Date.now(),
        evaluatedKeys: uniqueDependencies,
      };

      // Store current context for next comparison
      previousContext.value = { ...currentContext };

      // Trigger callback if provided
      if (onFlowsChange$) {
        onFlowsChange$(activeFlowIds, finalSteps);
      }

      if (onContextChange$) {
        onContextChange$(currentContext);
      }

      // Debug logging
      if (evalOptions?.debug) {
        console.log("[useQwikFlows] Flows re-evaluated:", {
          totalFlows: flows.length,
          activeFlows: activeFlowIds,
          visibleSteps: finalSteps.length,
          context: currentContext,
          dependencies: uniqueDependencies,
        });
      }
    }
  });

  // Methods for managing flows and steps
  const updateContext$ = $((newContext: StepContext) => {
    if (onContextChange$) {
      onContextChange$(newContext);
    }
  });

  const setStepCompletion$ = $((stepId: number, completed: boolean) => {
    completionState.value = {
      ...completionState.value,
      completions: {
        ...completionState.value.completions,
        [stepId]: completed,
      },
    };

    // Update visible steps with new completion status
    visibleSteps.value = visibleSteps.value.map(step =>
      step.id === stepId ? { ...step, isComplete: completed } : step
    );
  });

  const getStepCompletion$ = $((stepId: number) => {
    return completionState.value.completions[stepId] ?? false;
  });

  const isFlowActive$ = $((flowId: string) => {
    return activeFlows.value.includes(flowId);
  });

  const reevaluate$ = $(() => {
    // Force re-evaluation by updating the previous context
    previousContext.value = {};
  });

  return {
    activeFlows,
    visibleSteps,
    completionState,
    updateContext$,
    setStepCompletion$,
    getStepCompletion$,
    isFlowActive$,
    reevaluate$,
  };
}

/**
 * Simple hook for basic conditional steps using boolean logic
 * This is useful for simple show/hide logic based on boolean values
 */
export function useQwikBooleanSteps(
  baseSteps: QwikStepDefinition[],
  conditionalSteps: Array<{
    step: QwikStepDefinition;
    when: string; // field name
    equals?: any;
    truthy?: boolean;
  }>,
  context: StepContext,
  options?: StepEvaluationOptions
) {
  const allSteps = useSignal<QwikStepDefinition[]>([]);

  useTask$(({ track }) => {
    const currentContext = track(() => context);
    
    // Start with base steps
    const steps: QwikStepDefinition[] = [...baseSteps];
    
    // Add conditional steps that meet their conditions
    conditionalSteps.forEach(({ step, when, equals, truthy }) => {
      const contextValue = currentContext[when];
      
      let shouldInclude = false;
      
      if (equals !== undefined) {
        shouldInclude = contextValue === equals;
      } else if (truthy !== undefined) {
        shouldInclude = truthy ? !!contextValue : !contextValue;
      } else {
        shouldInclude = !!contextValue;
      }
      
      if (shouldInclude) {
        steps.push(step);
      }
    });
    
    // Sort steps by priority and ID
    const sortedSteps = steps.sort((a, b) => {
      const priorityA = a.priority ?? Number.MAX_SAFE_INTEGER;
      const priorityB = b.priority ?? Number.MAX_SAFE_INTEGER;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      return a.id - b.id;
    });
    
    // Apply options
    const finalSteps = options?.maxSteps 
      ? sortedSteps.slice(0, options.maxSteps)
      : sortedSteps;
    
    allSteps.value = finalSteps;
  });

  return allSteps.value;
}

/**
 * Hook for simple flow switching based on a single context field
 */
export function useQwikSimpleFlows(
  flowDefinitions: Record<string, {
    steps: QwikStepDefinition[];
    when?: string; // field name to check
    equals?: any; // value to match
    priority?: number;
  }>,
  context: StepContext,
  options?: {
    defaultFlow?: string;
    preserveCompletion?: boolean;
    debug?: boolean;
  }
) {
  const currentSteps = useSignal<QwikStepDefinition[]>([]);
  const completions = useSignal<Record<number, boolean>>({});

  useTask$(({ track }) => {
    const currentContext = track(() => context);
    
    // Find the first matching flow
    let activeFlow: string | undefined;
    
    for (const [flowId, flowDef] of Object.entries(flowDefinitions)) {
      if (!flowDef.when) {
        // No condition means always active (if no other flow matched)
        if (!activeFlow) {
          activeFlow = flowId;
        }
      } else {
        const contextValue = currentContext[flowDef.when];
        if (contextValue === flowDef.equals) {
          activeFlow = flowId;
          break; // First match wins
        }
      }
    }
    
    // Use default flow if no match
    if (!activeFlow && options?.defaultFlow) {
      activeFlow = options.defaultFlow;
    }
    
    // Get steps from active flow
    let steps: QwikStepDefinition[] = [];
    if (activeFlow && flowDefinitions[activeFlow]) {
      steps = flowDefinitions[activeFlow].steps;
    }
    
    // Preserve completion status
    if (options?.preserveCompletion) {
      steps = steps.map(step => ({
        ...step,
        isComplete: completions.value[step.id] ?? step.isComplete ?? false,
      }));
    }
    
    currentSteps.value = steps;
    
    if (options?.debug) {
      console.log("[useQwikSimpleFlows] Flow changed:", {
        activeFlow,
        steps: steps.length,
        context: currentContext,
      });
    }
  });

  const setCompletion = $((stepId: number, completed: boolean) => {
    completions.value = {
      ...completions.value,
      [stepId]: completed,
    };
  });

  return {
    steps: currentSteps.value,
    setCompletion,
    completions: completions.value,
  };
}