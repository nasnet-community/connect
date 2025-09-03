import type {
  SerializableCondition,
  StepCondition,
  ComplexCondition,
  StepContext,
  QwikStepDefinition,
  QwikStepFlow,
  StepEvaluationResult,
  FlowEvaluationResult,
  StepEvaluationOptions,
  ConditionBuilder,
} from "./types";

/**
 * Utility class for evaluating serializable conditions
 * This class contains only pure functions and works with serializable data
 */
export class QwikStepEvaluator {
  /**
   * Evaluate a single condition against a context
   */
  static evaluateCondition(
    condition: SerializableCondition | undefined,
    context: StepContext
  ): boolean {
    if (!condition) return true;

    try {
      if ("type" in condition) {
        // Complex condition (AND/OR)
        return this.evaluateComplexCondition(condition, context);
      } else {
        // Simple condition
        return this.evaluateSimpleCondition(condition, context);
      }
    } catch (error) {
      console.warn("[QwikStepEvaluator] Condition evaluation failed:", error);
      return false;
    }
  }

  /**
   * Evaluate a simple condition
   */
  private static evaluateSimpleCondition(
    condition: StepCondition,
    context: StepContext
  ): boolean {
    const { field, operator, value } = condition;
    const contextValue = this.getNestedValue(context, field);

    switch (operator) {
      case "equals":
        return contextValue === value;
      
      case "not-equals":
        return contextValue !== value;
      
      case "truthy":
        return !!contextValue;
      
      case "falsy":
        return !contextValue;
      
      case "contains":
        if (typeof contextValue === "string" && typeof value === "string") {
          return contextValue.includes(value);
        }
        if (Array.isArray(contextValue)) {
          return contextValue.includes(value);
        }
        return false;
      
      case "not-contains":
        if (typeof contextValue === "string" && typeof value === "string") {
          return !contextValue.includes(value);
        }
        if (Array.isArray(contextValue)) {
          return !contextValue.includes(value);
        }
        return true;
      
      case "greater-than":
        return Number(contextValue) > Number(value);
      
      case "less-than":
        return Number(contextValue) < Number(value);
      
      case "in-array":
        return Array.isArray(value) && value.includes(contextValue);
      
      case "not-in-array":
        return !Array.isArray(value) || !value.includes(contextValue);
      
      default:
        console.warn(`[QwikStepEvaluator] Unknown operator: ${operator}`);
        return false;
    }
  }

  /**
   * Evaluate a complex condition (AND/OR)
   */
  private static evaluateComplexCondition(
    condition: ComplexCondition,
    context: StepContext
  ): boolean {
    const { type, conditions } = condition;

    if (conditions.length === 0) return true;

    switch (type) {
      case "AND":
        return conditions.every(cond => this.evaluateCondition(cond, context));
      
      case "OR":
        return conditions.some(cond => this.evaluateCondition(cond, context));
      
      default:
        console.warn(`[QwikStepEvaluator] Unknown complex condition type: ${type}`);
        return false;
    }
  }

  /**
   * Get nested value from object using dot notation
   */
  private static getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
      return current && typeof current === 'object' ? current[key] : undefined;
    }, obj);
  }

  /**
   * Check if dependencies have changed
   */
  static dependenciesChanged(
    dependencies: string[] | undefined,
    context: StepContext,
    previousContext: StepContext
  ): boolean {
    if (!dependencies || dependencies.length === 0) return false;

    return dependencies.some(dep => {
      const current = this.getNestedValue(context, dep);
      const previous = this.getNestedValue(previousContext, dep);
      return current !== previous;
    });
  }

  /**
   * Evaluate a single step definition
   */
  static evaluateStep(
    step: QwikStepDefinition,
    context: StepContext,
    options: StepEvaluationOptions = {}
  ): StepEvaluationResult {
    try {
      // Check if step should be visible based on condition
      const visible = this.evaluateCondition(step.condition, context);

      // Skip disabled steps unless explicitly included
      if (step.isDisabled && !options.includeDisabled) {
        return {
          step,
          visible: false,
        };
      }

      return {
        step,
        visible,
      };
    } catch (error) {
      return {
        step,
        visible: false,
        error: error instanceof Error ? error.message : "Unknown evaluation error",
      };
    }
  }

  /**
   * Evaluate multiple steps and return visible ones
   */
  static evaluateSteps(
    steps: QwikStepDefinition[],
    context: StepContext,
    options: StepEvaluationOptions = {}
  ): StepEvaluationResult[] {
    let results = steps.map(step => this.evaluateStep(step, context, options));

    // Filter to visible steps only
    results = results.filter(result => result.visible);

    // Sort by priority and ID
    results.sort((a, b) => {
      const priorityA = a.step.priority ?? Number.MAX_SAFE_INTEGER;
      const priorityB = b.step.priority ?? Number.MAX_SAFE_INTEGER;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      return a.step.id - b.step.id;
    });

    // Apply max steps limit
    if (options.maxSteps && options.maxSteps > 0) {
      results = results.slice(0, options.maxSteps);
    }

    return results;
  }

  /**
   * Evaluate a flow definition
   */
  static evaluateFlow(
    flow: QwikStepFlow,
    context: StepContext,
    options: StepEvaluationOptions = {}
  ): FlowEvaluationResult {
    const errors: string[] = [];

    try {
      // Check if flow should be active
      const active = this.evaluateCondition(flow.condition, context);

      if (!active) {
        return {
          flow,
          active: false,
          visibleSteps: [],
          errors,
        };
      }

      // Evaluate steps in this flow
      const stepResults = this.evaluateSteps(flow.steps, context, options);
      
      // Collect any step errors
      stepResults.forEach(result => {
        if (result.error) {
          errors.push(`Step ${result.step.id}: ${result.error}`);
        }
      });

      return {
        flow,
        active: true,
        visibleSteps: stepResults,
        errors,
      };
    } catch (error) {
      errors.push(error instanceof Error ? error.message : "Unknown flow evaluation error");
      
      return {
        flow,
        active: false,
        visibleSteps: [],
        errors,
      };
    }
  }

  /**
   * Evaluate multiple flows and return active ones with their visible steps
   */
  static evaluateFlows(
    flows: QwikStepFlow[],
    context: StepContext,
    options: StepEvaluationOptions = {}
  ): FlowEvaluationResult[] {
    const results = flows.map(flow => this.evaluateFlow(flow, context, options));
    
    // Sort by priority
    return results.sort((a, b) => {
      const priorityA = a.flow.priority ?? Number.MAX_SAFE_INTEGER;
      const priorityB = b.flow.priority ?? Number.MAX_SAFE_INTEGER;
      return priorityA - priorityB;
    });
  }

  /**
   * Merge visible steps from multiple flows, removing duplicates
   */
  static mergeFlowSteps(
    flowResults: FlowEvaluationResult[]
  ): QwikStepDefinition[] {
    const seenIds = new Set<number>();
    const mergedSteps: QwikStepDefinition[] = [];

    // Only process active flows
    const activeFlows = flowResults.filter(result => result.active);

    // Collect all visible steps
    activeFlows.forEach(result => {
      result.visibleSteps.forEach(stepResult => {
        if (!seenIds.has(stepResult.step.id)) {
          seenIds.add(stepResult.step.id);
          mergedSteps.push(stepResult.step);
        }
      });
    });

    // Sort merged steps by priority and ID
    return mergedSteps.sort((a, b) => {
      const priorityA = a.priority ?? Number.MAX_SAFE_INTEGER;
      const priorityB = b.priority ?? Number.MAX_SAFE_INTEGER;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      return a.id - b.id;
    });
  }

  /**
   * Extract dependency values from context for change detection
   */
  static extractDependencies(
    dependencies: string[],
    context: StepContext
  ): Record<string, any> {
    const result: Record<string, any> = {};
    
    dependencies.forEach(dep => {
      result[dep] = this.getNestedValue(context, dep);
    });
    
    return result;
  }
}

/**
 * Condition builder utility for creating serializable conditions easily
 */
export const when: ConditionBuilder = {
  field: (fieldName: string) => ({
    equals: (value: any): StepCondition => ({
      field: fieldName,
      operator: "equals",
      value,
    }),
    notEquals: (value: any): StepCondition => ({
      field: fieldName,
      operator: "not-equals",
      value,
    }),
    truthy: (): StepCondition => ({
      field: fieldName,
      operator: "truthy",
    }),
    falsy: (): StepCondition => ({
      field: fieldName,
      operator: "falsy",
    }),
    contains: (value: any): StepCondition => ({
      field: fieldName,
      operator: "contains",
      value,
    }),
    notContains: (value: any): StepCondition => ({
      field: fieldName,
      operator: "not-contains",
      value,
    }),
    greaterThan: (value: number): StepCondition => ({
      field: fieldName,
      operator: "greater-than",
      value,
    }),
    lessThan: (value: number): StepCondition => ({
      field: fieldName,
      operator: "less-than",
      value,
    }),
    inArray: (values: any[]): StepCondition => ({
      field: fieldName,
      operator: "in-array",
      value: values,
    }),
    notInArray: (values: any[]): StepCondition => ({
      field: fieldName,
      operator: "not-in-array",
      value: values,
    }),
  }),

  and: (...conditions: SerializableCondition[]): ComplexCondition => ({
    type: "AND",
    conditions,
  }),

  or: (...conditions: SerializableCondition[]): ComplexCondition => ({
    type: "OR",
    conditions,
  }),
};

/**
 * Utility functions for creating common step definitions
 */
export class QwikStepUtils {
  /**
   * Create a step definition with a simple condition
   */
  static createConditionalStep(
    id: number,
    title: string,
    component: any,
    condition: SerializableCondition,
    options?: Partial<QwikStepDefinition>
  ): QwikStepDefinition {
    return {
      id,
      title,
      component,
      condition,
      isComplete: false,
      ...options,
    };
  }

  /**
   * Create a flow definition
   */
  static createFlow(
    id: string,
    name: string,
    steps: QwikStepDefinition[],
    options?: Partial<QwikStepFlow>
  ): QwikStepFlow {
    return {
      id,
      name,
      steps,
      priority: 0,
      exclusive: false,
      ...options,
    };
  }

  /**
   * Create a step that's always visible
   */
  static createAlwaysVisibleStep(
    id: number,
    title: string,
    component: any,
    options?: Partial<QwikStepDefinition>
  ): QwikStepDefinition {
    return {
      id,
      title,
      component,
      isComplete: false,
      ...options,
    };
  }

  /**
   * Preserve completion status across step evaluations
   */
  static preserveCompletionStatus(
    steps: QwikStepDefinition[],
    completions: Record<number, boolean>
  ): QwikStepDefinition[] {
    return steps.map(step => ({
      ...step,
      isComplete: completions[step.id] ?? step.isComplete ?? false,
    }));
  }
}