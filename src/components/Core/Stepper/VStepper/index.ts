// Main components
export { VStepper } from './VStepper';
export { VStepperWithContext } from './VStepperWithContext';

// Sub-components
export { Desktop } from './Desktop';
export { Mobile } from './Mobile';
export { Step } from './Step';
export { VStepperManagement } from './components/VStepperManagement';

// Hooks and context
export { useVStepper } from './useVStepper';
export { 
  createVStepperContext, 
  useVStepperContext,
  useProvideVStepperContext,
  VStepperContextId 
} from './hooks/useVStepperContext';

// Types
export type { 
  VStepperProps, 
  StepItem, 
  VStepperContext,
  StepManagementProps,
  DesktopProps,
  MobileProps,
  StepProps,
  StepComponentProps
} from './types';

// Examples
export { VStepperContextExample } from './examples/VStepper.context-example';
export { VStepperManagementExample } from './examples/VStepper.management-example'; 