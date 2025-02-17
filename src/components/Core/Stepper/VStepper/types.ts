import type { QRL, Signal } from "@builder.io/qwik";

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
}

export interface VStepperProps {
  steps: StepItem[];
  activeStep?: number;
  onStepComplete$?: QRL<(id: number) => void>;
  onStepChange$?: QRL<(id: number) => void>;
  position?: "left" | "right";
  isComplete?: boolean;
}

export interface StepProps {
  step: StepItem;
  index: number;
  activeStep: number;
  onComplete$: QRL<(index: number) => void>;
  isComplete?: boolean;
}

export interface DesktopProps {
  steps: StepItem[];
  activeStep: Signal<number>;
  position: "left" | "right";
  isComplete?: boolean;
}

export interface MobileProps {
  steps: StepItem[];
  activeStep: Signal<number>;
  isStepsVisible: Signal<boolean>;
  toggleStepsVisibility: QRL<() => void>;
  isComplete?: boolean;
}
