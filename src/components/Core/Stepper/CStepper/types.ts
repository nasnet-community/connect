import type { JSX } from "@builder.io/qwik";
import type { Signal, QRL, ContextId } from "@builder.io/qwik";
import type { StepHelpContent } from "../shared/types/base";

export interface CStepMeta {
  id: number;
  title: string;
  description: string;
  component: any;
  isComplete: boolean;
  isDisabled?: boolean;
  isHidden?: boolean;
  isOptional?: boolean;
  skippable?: boolean;
  validationErrors?: string[];
  
  // Help system properties
  helpTitle?: string;
  helpContent?: string | JSX.Element;
  helpData?: StepHelpContent;
  hasHelp?: boolean;
}

export interface CStepperProps {
  steps: CStepMeta[];
  extraSteps?: CStepMeta[];
  activeStep?: number;
  onStepComplete$?: QRL<(id: number) => void>;
  onStepChange$?: QRL<(id: number) => void>;
  onComplete$?: QRL<() => void>;
  contextId?: ContextId<any>;
  contextValue?: any;
  allowNonLinearNavigation?: boolean;
  allowSkipSteps?: boolean;
  validationMode?: 'onBlur' | 'onChange' | 'onSubmit';
  customIcons?: Record<number, JSX.Element>;
  useNumbers?: boolean;
  isEditMode?: boolean;
  dynamicStepComponent?: any;
  
  // Help system options
  enableHelp?: boolean;
  helpOptions?: {
    enableKeyboardShortcuts?: boolean;
    autoShowHelpOnFirstStep?: boolean;
    helpKey?: string;
    onHelpOpen$?: QRL<(stepId: number) => void>;
    onHelpClose$?: QRL<(stepId: number) => void>;
  };
  
  // UI customization
  hideStepHeader?: boolean;
  disableAutoFocus?: boolean;
}

export interface CStepperContext<T = any> {
  activeStep: Signal<number>;
  steps: Signal<CStepMeta[]>;
  previousSteps?: Signal<number[]>;
  goToStep$: QRL<(step: number) => void>;
  nextStep$: QRL<() => void>;
  prevStep$: QRL<() => void>;
  updateStepCompletion$: QRL<(stepId: number, isComplete: boolean) => void | null>;
  completeStep$: QRL<(stepId?: number) => void | null>;
  addStep$: QRL<(newStep: CStepMeta, position?: number) => number>;
  removeStep$: QRL<(stepId: number) => boolean>;
  swapSteps$: QRL<(sourceIndex: number, targetIndex: number) => boolean>;
  validateStep$?: QRL<(stepId?: number) => Promise<boolean>>;
  setStepErrors$?: QRL<(stepId: number, errors: string[]) => void>;
  allowSkipSteps?: boolean;
  data: T;
} 