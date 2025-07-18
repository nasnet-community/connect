import { component$, $ } from "@builder.io/qwik";
import type { StepProps } from "./types";

export const Step = component$((props: StepProps) => {
  const { step, index, activeStep } = props;
  const shouldRender =
    index === activeStep ||
    step.isComplete ||
    (props.preloadNext && index === activeStep + 1);

  const isVisible = index === activeStep || step.isComplete;

  return (
    <div
      id={`step-${index}`}
      class={`transition-all duration-500 ease-in-out
        ${!isVisible ? "invisible h-0 overflow-hidden" : ""}`}
    >
      {shouldRender && (
        <div
          class={`rounded-xl bg-surface p-6 dark:bg-surface-dark
            ${index === activeStep ? "ring-primary-500/20 ring-2" : ""}
            ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
            transition-all duration-500 ease-in-out`}
        >
          <step.component
            isComplete={step.isComplete}
            onComplete$={$(() => props.onComplete$(index))}
          />
        </div>
      )}
    </div>
  );
});
