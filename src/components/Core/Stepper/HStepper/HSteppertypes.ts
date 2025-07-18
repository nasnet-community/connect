import type { QRL } from "@builder.io/qwik";

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
  onStepComplete$?: QRL<(id: number) => void>;
  onStepChange$?: QRL<(id: number) => void>;
  mode?: StepperMode;
  onModeChange$?: QRL<(mode: StepperMode) => void>;
}
