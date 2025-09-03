/**
 * Type aliases for backward compatibility
 * These ensure existing code continues to work without modifications
 */

import type { BaseStepMeta, BaseStepperProps, BaseStepperContext } from "./base";

// CStepper compatibility types
export type CStepMeta = BaseStepMeta;
export type CStepperCompatProps = BaseStepperProps<CStepMeta> & {
  extraSteps?: CStepMeta[];
  allowNonLinearNavigation?: boolean;
  allowSkipSteps?: boolean;
  validationMode?: 'onBlur' | 'onChange' | 'onSubmit';
  customIcons?: Record<number, any>;
  useNumbers?: boolean;
  isEditMode?: boolean;
  dynamicStepComponent?: any;
};
export type CStepperCompatContext<T = any> = BaseStepperContext<T, CStepMeta> & {
  allowSkipSteps?: boolean;
};

// VStepper compatibility types  
export type VStepItem = BaseStepMeta;
export type VStepperCompatProps = BaseStepperProps<VStepItem> & {
  position?: "left" | "right";
  isComplete?: boolean;
  preloadNext?: boolean;
  allowStepNavigation?: boolean;
  isEditMode?: boolean;
  dynamicStepComponent?: any;
};
export type VStepperCompatContext<T = any> = BaseStepperContext<T, VStepItem> & {
  scrollToStep$?: any;
};

// HStepper compatibility types
export type HStepItem = BaseStepMeta;
export type HStepperCompatProps = BaseStepperProps<HStepItem> & {
  mode?: "easy" | "advance";
  onModeChange$?: any;
};
export type HStepperCompatContext<T = any> = BaseStepperContext<T, HStepItem>;