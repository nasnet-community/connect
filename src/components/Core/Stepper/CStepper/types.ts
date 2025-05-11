import type { PropFunction } from "@builder.io/qwik";
import type { JSX } from "@builder.io/qwik";
import type { Signal, QRL, ContextId } from "@builder.io/qwik";

export interface CStepMeta {
  id: number;
  title: string;
  description: string;
  component: JSX.Element;
  isComplete: boolean;
  isDisabled?: boolean;
  isHidden?: boolean;
  isOptional?: boolean;
  validationErrors?: string[];
}

export interface CStepperProps {
  steps: CStepMeta[];
  activeStep?: number;
  onStepComplete$?: PropFunction<(id: number) => void>;
  onStepChange$?: PropFunction<(id: number) => void>;
  onComplete$?: PropFunction<() => void>;
  contextId?: ContextId<any>;
  contextValue?: any;
  allowNonLinearNavigation?: boolean;
  persistState?: boolean;
  validationMode?: 'onBlur' | 'onChange' | 'onSubmit';
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
  addStep$?: QRL<(newStep: CStepMeta, position?: number) => number>;
  removeStep$?: QRL<(stepId: number) => boolean>;
  validateStep$?: QRL<(stepId?: number) => Promise<boolean>>;
  setStepErrors$?: QRL<(stepId: number, errors: string[]) => void>;
  restoreSavedState$?: QRL<() => boolean>;
  clearSavedState$?: QRL<() => void>;
  data: T;
} 