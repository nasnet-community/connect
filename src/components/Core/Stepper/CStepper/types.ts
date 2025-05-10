import type { PropFunction } from "@builder.io/qwik";

export interface CStepItem {
  id: number;
  title: string;
  description: string;
  component: any;
  isComplete: boolean;
}

export interface CStepperProps {
  steps: CStepItem[];
  activeStep?: number;
  onStepComplete$?: PropFunction<(id: number) => void>;
  onStepChange$?: PropFunction<(id: number) => void>;
  onComplete$?: PropFunction<() => void>;
} 