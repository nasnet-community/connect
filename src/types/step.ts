import type { QRL } from "@builder.io/qwik";

export interface StepProps {
  isComplete: boolean;
  onComplete$: QRL<() => void>;
}
