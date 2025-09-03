import type { QRL, Signal } from "@builder.io/qwik";
import type { BaseStepMeta } from "../types";

/**
 * Serializable condition operators for step visibility rules
 */
export type ConditionOperator = 
  | "equals" 
  | "not-equals"
  | "truthy"
  | "falsy"
  | "contains"
  | "not-contains"
  | "greater-than"
  | "less-than"
  | "in-array"
  | "not-in-array";

/**
 * Simple serializable condition that can be evaluated without functions
 */
export interface StepCondition {
  /** The field/property name in the context to check */
  field: string;
  /** The comparison operator */
  operator: ConditionOperator;
  /** The value to compare against */
  value?: any;
}

/**
 * Complex condition that combines multiple simple conditions
 */
export interface ComplexCondition {
  /** The logical operator for combining conditions */
  type: "AND" | "OR";
  /** Array of conditions to evaluate */
  conditions: (StepCondition | ComplexCondition)[];
}

/**
 * Union type for all condition types
 */
export type SerializableCondition = StepCondition | ComplexCondition;

/**
 * Step definition that works with Qwik's serialization
 */
export interface QwikStepDefinition {
  /** Unique step identifier */
  id: number;
  /** Display title for the step */
  title: string;
  /** Qwik component for rendering the step */
  component: any;
  /** Optional description */
  description?: string;
  /** Whether the step is initially complete */
  isComplete?: boolean;
  /** Whether the step is disabled */
  isDisabled?: boolean;
  /** Whether the step can be skipped */
  skippable?: boolean;
  /** Priority for step ordering (lower = higher priority) */
  priority?: number;
  /** Serializable condition for step visibility */
  condition?: SerializableCondition;
  /** Array of context keys this step depends on */
  dependencies?: string[];
  /** Flow identifier for grouping steps */
  flowId?: string;
  /** Whether this step persists across flow changes */
  persistent?: boolean;
}

/**
 * Flow definition using serializable conditions
 */
export interface QwikStepFlow {
  /** Unique flow identifier */
  id: string;
  /** Display name for the flow */
  name: string;
  /** Optional description */
  description?: string;
  /** Steps that belong to this flow */
  steps: QwikStepDefinition[];
  /** Condition for when this flow should be active */
  condition?: SerializableCondition;
  /** Dependencies for flow evaluation */
  dependencies?: string[];
  /** Priority for flow ordering */
  priority?: number;
  /** Whether this flow can be combined with others */
  exclusive?: boolean;
}

/**
 * Context type for evaluating conditions (must be serializable)
 */
export type StepContext = Record<string, any>;

/**
 * Result of step evaluation
 */
export interface StepEvaluationResult {
  /** The evaluated step with current completion status */
  step: QwikStepDefinition;
  /** Whether the step should be visible */
  visible: boolean;
  /** Any evaluation errors */
  error?: string;
}

/**
 * Result of flow evaluation
 */
export interface FlowEvaluationResult {
  /** The flow being evaluated */
  flow: QwikStepFlow;
  /** Whether the flow should be active */
  active: boolean;
  /** Visible steps from this flow */
  visibleSteps: StepEvaluationResult[];
  /** Any evaluation errors */
  errors: string[];
}

/**
 * Configuration options for step evaluation
 */
export interface StepEvaluationOptions {
  /** Whether to preserve completion status across evaluations */
  preserveCompletion?: boolean;
  /** Maximum number of steps to return */
  maxSteps?: number;
  /** Whether to include disabled steps */
  includeDisabled?: boolean;
  /** Debug mode for logging evaluation details */
  debug?: boolean;
}

/**
 * State for tracking step completion across evaluations
 */
export interface StepCompletionState {
  /** Map of step ID to completion status */
  completions: Record<number, boolean>;
  /** Last evaluation timestamp */
  lastEvaluated: number;
  /** Context keys that were evaluated */
  evaluatedKeys: string[];
}

/**
 * Hook options for useQwikSteps
 */
export interface UseQwikStepsOptions {
  /** Step definitions to manage */
  steps: QwikStepDefinition[];
  /** Current context for evaluation - can be static, a builder function, or a QRL builder */
  context: StepContext | (() => StepContext) | QRL<() => StepContext>;
  /** Evaluation options */
  options?: StepEvaluationOptions;
  /** Callback when steps change */
  onStepsChange$?: QRL<(steps: QwikStepDefinition[]) => void>;
  /** Callback when context changes */
  onContextChange$?: QRL<(context: StepContext) => void>;
}

/**
 * Hook options for useQwikFlows
 */
export interface UseQwikFlowsOptions {
  /** Flow definitions to manage */
  flows: QwikStepFlow[];
  /** Current context for evaluation - can be static, a builder function, or a QRL builder */
  context: StepContext | (() => StepContext) | QRL<() => StepContext>;
  /** Default flow ID when no flows match */
  defaultFlow?: string;
  /** Evaluation options */
  options?: StepEvaluationOptions;
  /** Callback when active flows change */
  onFlowsChange$?: QRL<(activeFlows: string[], visibleSteps: QwikStepDefinition[]) => void>;
  /** Callback when context changes */
  onContextChange$?: QRL<(context: StepContext) => void>;
}

/**
 * Return type for useQwikSteps hook
 */
export interface UseQwikStepsReturn {
  /** Current visible steps */
  visibleSteps: Signal<QwikStepDefinition[]>;
  /** Step completion state */
  completionState: Signal<StepCompletionState>;
  /** Update context and re-evaluate */
  updateContext$: QRL<(newContext: StepContext) => void>;
  /** Set completion status for a step */
  setStepCompletion$: QRL<(stepId: number, completed: boolean) => void>;
  /** Get completion status for a step */
  getStepCompletion$: QRL<(stepId: number) => boolean>;
  /** Force re-evaluation of all conditions */
  reevaluate$: QRL<() => void>;
}

/**
 * Return type for useQwikFlows hook
 */
export interface UseQwikFlowsReturn {
  /** Currently active flow IDs */
  activeFlows: Signal<string[]>;
  /** Current visible steps from all active flows */
  visibleSteps: Signal<QwikStepDefinition[]>;
  /** Step completion state */
  completionState: Signal<StepCompletionState>;
  /** Update context and re-evaluate flows */
  updateContext$: QRL<(newContext: StepContext) => void>;
  /** Set completion status for a step */
  setStepCompletion$: QRL<(stepId: number, completed: boolean) => void>;
  /** Get completion status for a step */
  getStepCompletion$: QRL<(stepId: number) => boolean>;
  /** Check if a specific flow is active */
  isFlowActive$: QRL<(flowId: string) => boolean>;
  /** Force re-evaluation of all flows */
  reevaluate$: QRL<() => void>;
}

/**
 * Utility type for building step conditions
 */
export interface ConditionBuilder {
  /** Create a simple condition */
  field: (fieldName: string) => {
    equals: (value: any) => StepCondition;
    notEquals: (value: any) => StepCondition;
    truthy: () => StepCondition;
    falsy: () => StepCondition;
    contains: (value: any) => StepCondition;
    notContains: (value: any) => StepCondition;
    greaterThan: (value: number) => StepCondition;
    lessThan: (value: number) => StepCondition;
    inArray: (values: any[]) => StepCondition;
    notInArray: (values: any[]) => StepCondition;
  };
  /** Create an AND condition */
  and: (...conditions: SerializableCondition[]) => ComplexCondition;
  /** Create an OR condition */
  or: (...conditions: SerializableCondition[]) => ComplexCondition;
}

/**
 * Enhanced step definition that extends BaseStepMeta for backward compatibility
 */
export interface QwikEnhancedStepMeta extends BaseStepMeta {
  /** Serializable condition instead of function */
  condition?: SerializableCondition;
  /** Flow identifier */
  flowId?: string;
  /** Whether step persists across flow changes */
  persistent?: boolean;
  /** Priority for ordering */
  priority?: number;
}