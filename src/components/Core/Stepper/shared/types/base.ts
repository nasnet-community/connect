import type { JSX, QRL, Signal, ContextId } from "@builder.io/qwik";

/**
 * Help section interface for structured help content
 */
export interface HelpSection {
  id?: string;
  title: string;
  content: string | JSX.Element;
  icon?: JSX.Element;
  type?: 'info' | 'tip' | 'warning' | 'example';
}

/**
 * Help content interface for step help modal
 */
export interface StepHelpContent {
  title?: string;
  description?: string;
  sections?: HelpSection[];
  videoUrl?: string;
  externalLinks?: Array<{
    title: string;
    url: string;
    icon?: JSX.Element;
  }>;
}

/**
 * Base step metadata interface that all steppers will use
 * This provides a unified structure while maintaining compatibility
 */
export interface BaseStepMeta {
  id: number;
  title: string;
  component: any;
  isComplete?: boolean;
  isDisabled?: boolean;
  isHidden?: boolean;
  isOptional?: boolean;
  skippable?: boolean;
  validationErrors?: string[];
  description?: string;
  icon?: any;
  
  // Help system properties
  helpTitle?: string;
  helpContent?: string | JSX.Element;
  helpData?: StepHelpContent;
  hasHelp?: boolean;
}

/**
 * Base props that all steppers share
 */
export interface BaseStepperProps<T extends BaseStepMeta = BaseStepMeta> {
  steps: T[];
  activeStep?: number;
  onStepComplete$?: QRL<(id: number) => void>;
  onStepChange$?: QRL<(id: number) => void>;
  onComplete$?: QRL<() => void>;
  contextId?: ContextId<any>;
  contextValue?: any;
  
  // Navigation options
  allowNonLinearNavigation?: boolean;
  allowSkipSteps?: boolean;
  
  // Enhanced features (opt-in for backward compatibility)
  enableEnhancedFeatures?: boolean;
  preventInfiniteLoops?: boolean;
  maxRenderCycles?: number;
  contextNamespace?: string;
  
  // Help system options
  enableHelp?: boolean;
  helpOptions?: {
    enableKeyboardShortcuts?: boolean;
    autoShowHelpOnFirstStep?: boolean;
    helpKey?: string;
    onHelpOpen$?: QRL<(stepId: number) => void>;
    onHelpClose$?: QRL<(stepId: number) => void>;
  };
}

/**
 * Base context interface for stepper state sharing
 */
export interface BaseStepperContext<T = any, S extends BaseStepMeta = BaseStepMeta> {
  activeStep: Signal<number>;
  steps: Signal<S[]>;
  previousSteps?: Signal<number[]>;
  goToStep$: QRL<(step: number) => void>;
  nextStep$: QRL<() => void>;
  prevStep$: QRL<() => void>;
  updateStepCompletion$?: QRL<(stepId: number, isComplete: boolean) => void | null>;
  completeStep$?: QRL<(stepId?: number) => void | null>;
  addStep$?: QRL<(newStep: S, position?: number) => number>;
  removeStep$?: QRL<(stepId: number) => boolean>;
  swapSteps$?: QRL<(sourceIndex: number, targetIndex: number) => boolean>;
  validateStep$?: QRL<(stepId?: number) => Promise<boolean>>;
  setStepErrors$?: QRL<(stepId: number, errors: string[]) => void>;
  data: T;
  
  // Enhanced features
  renderCount?: Signal<number>;
  lastCompletedStep?: Signal<number | null>;
  contextPath?: string;
}

/**
 * Navigation options for steppers
 */
export interface StepperNavigationOptions {
  allowNonLinearNavigation?: boolean;
  allowSkipSteps?: boolean;
  allowStepNavigation?: boolean;
  validationMode?: 'onBlur' | 'onChange' | 'onSubmit';
}


/**
 * UI customization options
 */
export interface StepperUIOptions {
  customIcons?: Record<number, JSX.Element>;
  useNumbers?: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
  layout?: 'horizontal' | 'vertical' | 'content';
}

/**
 * Hook options for useBaseStepper
 */
export interface UseBaseStepperOptions {
  preventInfiniteLoops?: boolean;
  maxRenderCycles?: number;
  contextNamespace?: string;
}

/**
 * Return type for useBaseStepper hook
 */
export interface UseBaseStepperReturn<S extends BaseStepMeta = BaseStepMeta> {
  // Core state
  activeStep: Signal<number>;
  steps: Signal<S[]>;
  previousSteps: Signal<number[]>;
  
  // Error and loading state
  hasError: Signal<boolean>;
  errorMessage: Signal<string>;
  isLoading: Signal<boolean>;
  
  // Navigation functions
  handleNext$: QRL<() => void>;
  handlePrev$: QRL<() => void>;
  setStep$: QRL<(step: number) => void>;
  
  // Step management
  completeStep$: QRL<(stepId?: number) => void>;
  addStep$: QRL<(newStep: S, position?: number) => number>;
  removeStep$: QRL<(stepId: number) => boolean>;
  swapSteps$: QRL<(sourceIndex: number, targetIndex: number) => boolean>;
  handleStepError: QRL<(error: Error) => void>;
  
  // Loop prevention
  renderCount: Signal<number>;
  lastCompletedStep: Signal<number | null>;
  
  // Help system (optional - only available when enableHelp is true)
  helpSystem?: {
    isHelpOpen: Signal<boolean>;
    helpStepId: Signal<number | null>;
    openHelp$: QRL<(stepId?: number) => void>;
    closeHelp$: QRL<() => void>;
    toggleHelp$: QRL<(stepId?: number) => void>;
    stepHasHelp$: QRL<(step: S) => boolean>;
    currentStepHasHelp: Signal<boolean>;
    getStepHelpContent$: QRL<(step: S) => any>;
  };
}

/**
 * Step component props (common interface for all step components)
 */
export interface StepComponentProps {
  isComplete?: boolean;
  onComplete$: QRL<() => void>;
  // Additional props can be added by specific implementations
}

/**
 * Management UI props
 */
export interface StepperManagementProps<S extends BaseStepMeta = BaseStepMeta> {
  steps: S[];
  activeStep: number;
  addStep$: QRL<(step: S, position?: number) => number>;
  removeStep$: QRL<(stepId: number) => boolean>;
  swapSteps$: QRL<(sourceIndex: number, targetIndex: number) => boolean>;
  isEditMode: boolean;
  dynamicStepComponent?: any;
  stepperType?: 'content' | 'vertical' | 'horizontal';
}