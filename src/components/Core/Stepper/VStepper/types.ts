import type { QRL, Signal, ContextId } from "@builder.io/qwik";
import type { StepHelpContent } from "../shared/types/base";
import type { UseStepperHelpOptions } from "../shared/hooks/useStepperHelp";

export interface UseVStepperProps {
  initialStep?: number;
  totalSteps: number;
  onStepComplete?: QRL<(stepId: number) => void>;
  onStepChange?: QRL<(stepId: number) => void>;
}

export interface StepComponentProps {
  isComplete: boolean;
  onComplete$: QRL<() => void>;
}

export interface StepItem {
  id: number;
  title: string;
  component: any;
  isComplete?: boolean;
  isDisabled?: boolean;
  isOptional?: boolean;
  skippable?: boolean;
  
  // Help system properties
  helpTitle?: string;
  helpContent?: string | JSX.Element;
  helpData?: StepHelpContent;
  hasHelp?: boolean;
}

export interface VStepperProps {
  steps: StepItem[];
  activeStep?: number;
  onStepComplete$?: QRL<(id: number) => void>;
  onStepChange$?: QRL<(id: number) => void>;
  onComplete$?: QRL<() => void>;
  position?: "left" | "right";
  isComplete?: boolean;
  preloadNext?: boolean;
  contextId?: ContextId<any>;
  contextValue?: any;
  allowStepNavigation?: boolean;
  isEditMode?: boolean;
  dynamicStepComponent?: any;
  
  // Enhanced features (opt-in for backward compatibility)
  enableEnhancedFeatures?: boolean;
  allowNonLinearNavigation?: boolean;
  allowSkipSteps?: boolean;
  
  // Help system properties
  enableHelp?: boolean;
  helpOptions?: UseStepperHelpOptions;
  helpButton?: {
    position?: "top" | "bottom";
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    showKeyboardHint?: boolean;
  };
}

export interface StepProps {
  step: StepItem;
  index: number;
  activeStep: number;
  onComplete$: QRL<(index: number) => void>;
  isComplete?: boolean;
  preloadNext?: boolean;
}

export interface DesktopProps {
  steps: StepItem[];
  activeStep: Signal<number>;
  position: "left" | "right";
  isComplete?: boolean;
  onStepClick$?: QRL<(index: number) => void>;
  allowStepNavigation?: boolean;
  
  // Help system integration
  helpButton?: VStepperProps['helpButton'];
  onHelpClick$?: QRL<() => void>;
}

export interface MobileProps {
  steps: StepItem[];
  activeStep: Signal<number>;
  isStepsVisible: Signal<boolean>;
  toggleStepsVisibility: QRL<() => void>;
  isComplete?: boolean;
  onStepClick$?: QRL<(index: number) => void>;
  allowStepNavigation?: boolean;
  
  // Help system integration
  helpButton?: VStepperProps['helpButton'];
  onHelpClick$?: QRL<() => void>;
}

export interface PreloadState {
  preloaded: boolean;
  visible: boolean;
}

export interface VStepperContext<T = any> {
  activeStep: Signal<number>;
  steps: Signal<StepItem[]>;
  goToStep$: QRL<(step: number) => void>;
  nextStep$: QRL<() => void>;
  prevStep$: QRL<() => void>;
  updateStepCompletion$: QRL<(stepId: number, isComplete: boolean) => void>;
  completeStep$: QRL<(stepId?: number) => void>;
  addStep$: QRL<(newStep: StepItem, position?: number) => number>;
  removeStep$: QRL<(stepId: number) => boolean>;
  swapSteps$: QRL<(sourceIndex: number, targetIndex: number) => boolean>;
  scrollToStep$: QRL<(index: number) => void>;
  data: T;
}

export interface StepManagementProps {
  steps: StepItem[];
  activeStep: number;
  addStep$: QRL<(step: StepItem, position?: number) => number>;
  removeStep$: QRL<(stepId: number) => boolean>;
  swapSteps$: QRL<(sourceIndex: number, targetIndex: number) => boolean>;
  isEditMode: boolean;
  dynamicStepComponent?: any;
}
