import type { QRL, JSX } from "@builder.io/qwik";
import type { StepHelpContent } from "../shared/types/base";

export type StepperMode = "easy" | "advance";

export interface StepItem {
  id: number;
  title: string;
  component: any;
  isComplete?: boolean;
  icon?: any;
  description?: string;
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

export interface HStepperProps {
  steps: StepItem[];
  activeStep?: number;
  onStepComplete$?: QRL<(id: number) => void>;
  onStepChange$?: QRL<(id: number) => void>;
  onComplete$?: QRL<() => void>;
  mode?: StepperMode;
  onModeChange$?: QRL<(mode: StepperMode) => void>;
  
  // Enhanced features (opt-in for backward compatibility)
  enableEnhancedFeatures?: boolean;
  allowNonLinearNavigation?: boolean;
  allowSkipSteps?: boolean;
  contextId?: any;
  contextValue?: any;
  isEditMode?: boolean;
  dynamicStepComponent?: any;
  validationMode?: 'onBlur' | 'onChange' | 'onSubmit';
  customIcons?: Record<number, any>;
  useNumbers?: boolean;
  
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
