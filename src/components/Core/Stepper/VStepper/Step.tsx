import { component$ } from "@builder.io/qwik";
import type { StepProps } from "./types";

export const Step = component$((props: StepProps) => {
  const { step, index, activeStep } = props;

  return (
    <div class="transition-all duration-300">
      {(index === activeStep || step.isComplete) && (
        <div
          class={`rounded-xl bg-surface p-6 dark:bg-surface-dark 
          ${index === activeStep ? "ring-primary-500/20 ring-1" : ""}
          ${step.isComplete ? "opacity-100" : "opacity-100"}`}
        >
          <step.component
            isComplete={step.isComplete}
            onComplete$={() => props.onComplete$(index)}
          />
        </div>
      )}
    </div>
  );
});
