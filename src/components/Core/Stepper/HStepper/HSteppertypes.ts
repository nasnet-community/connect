import type { PropFunction } from "@builder.io/qwik";

export type StepperMode = "easy" | "advance";

export interface StepItem {
  id: number;
  title: string;
  component: any;
  isComplete: boolean;
  icon?: any;
}

export interface HStepperProps {
  steps: StepItem[];
  activeStep?: number;
  onStepComplete$?: PropFunction<(id: number) => void>;
  onStepChange$?: PropFunction<(id: number) => void>;
  mode?: StepperMode;
  onModeChange$?: PropFunction<(mode: StepperMode) => void>;
}
