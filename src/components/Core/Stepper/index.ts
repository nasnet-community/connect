// CStepper exports
export { CStepper } from './CStepper/CStepper';
export { useCStepper } from './CStepper/hooks/useCStepper';
export { createStepperContext, useStepperContext } from './CStepper/hooks/useStepperContext';
export type { CStepMeta, CStepperProps, CStepperContext } from './CStepper/types';

// HStepper exports
export { HStepper } from './HStepper/HStepper';
// export { useHStepperContext } from './HStepper/useHStepperContext';
export type { HStepperProps, StepperMode as HStepperMode, StepItem as HStepItem } from './HStepper/HSteppertypes';

// VStepper exports
export { VStepper } from './VStepper';
export type { VStepperProps, StepItem as VStepItem, StepComponentProps as VStepComponentProps } from './VStepper/types';

// StateViewer (debugging tool)
export { StateViewer } from './StateViewer/StateViewer';

// Shared exports for enhanced features (opt-in)
export { 
  useBaseStepper,
  createIsolatedStepperContext,
  useProvideStepperContext as useProvideSharedStepperContext,
  useStepperContext as useSharedStepperContext
} from './shared/hooks';

export {
  StepperErrors,
  StepperManagement,
  StepperNavigation,
  StepperProgress
} from './shared/components';

export type {
  BaseStepMeta,
  BaseStepperProps,
  BaseStepperContext,
  UseBaseStepperOptions,
  UseBaseStepperReturn,
  StepperNavigationOptions,
  StepperUIOptions,
  StepperManagementProps
} from './shared/types';

export type {
  StepperNavigationProps,
  StepperProgressProps,
  StepperErrorsProps
} from './shared/components';

// Qwik-compatible flow system exports (Enhanced conditional step management)
export {
  useQwikSteps,
  useQwikFlows, 
  useQwikBooleanSteps,
  useQwikSimpleFlows,
  QwikStepEvaluator,
  QwikStepUtils,
  when,
} from './shared/qwik-flows';

export type {
  QwikStepDefinition,
  QwikStepFlow,
  StepContext,
  StepCondition,
  SerializableCondition,
  ComplexCondition,
  StepEvaluationResult,
  FlowEvaluationResult,
  UseQwikStepsOptions,
  UseQwikFlowsOptions,
  UseQwikStepsReturn,
  UseQwikFlowsReturn,
  StepEvaluationOptions,
} from './shared/qwik-flows'; 