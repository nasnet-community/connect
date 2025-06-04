import { component$ } from "@builder.io/qwik";
import type { MobileProps } from "./types";

export const Mobile = component$((props: MobileProps) => {
  const { activeStep, isStepsVisible, toggleStepsVisibility, allowStepNavigation = false, onStepClick$ } = props;

  return (
    <div class="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div class="border-t border-border/10 bg-surface/95 backdrop-blur-sm dark:bg-surface-dark/95">
        <div class="space-y-2 px-4 py-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-text-secondary">
              {$localize`Step ${activeStep.value + 1} of ${props.steps.length}`}
            </span>
            <button
              onClick$={() => toggleStepsVisibility()}
              class="text-sm text-primary-500"
            >
              {isStepsVisible.value ? $localize`Hide` : $localize`Show`}{" "}
              {$localize`Steps`}
            </button>
          </div>

          {/* Progress Indicators */}
          <div class="flex gap-1">
            {props.steps.map((_, index) => (
              <div
                key={index}
                class={`h-1 rounded-full transition-all duration-300 ${
                  index === activeStep.value
                    ? "flex-1 bg-primary-500"
                    : index < activeStep.value
                      ? "w-4 bg-primary-500/50"
                      : "w-4 bg-border dark:bg-border-dark"
                } ${allowStepNavigation ? "cursor-pointer" : ""}`}
                onClick$={allowStepNavigation && onStepClick$ ? () => onStepClick$(index) : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Steps List */}
      <div
        class={`overflow-hidden border-t border-border/10 bg-surface/95 backdrop-blur-sm
            transition-all duration-300 dark:bg-surface-dark/95
            ${isStepsVisible.value ? "max-h-[50vh]" : "max-h-0"}
          `}
      >
        <div class="space-y-4 p-4">
          {props.steps.map((step, index) => (
            <div
              key={step.id}
              class={`flex items-center gap-3 rounded-lg p-2 ${
                index === activeStep.value ? "bg-primary-500/10" : ""
              } ${allowStepNavigation ? "cursor-pointer hover:bg-primary-500/5" : ""}`}
              onClick$={allowStepNavigation && onStepClick$ ? () => onStepClick$(index) : undefined}
            >
              <div
                class={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  step.isComplete
                    ? "border-primary-500 bg-primary-500"
                    : index === activeStep.value
                      ? "border-primary-500"
                      : "border-border dark:border-border-dark"
                }`}
              >
                {step.isComplete ? (
                  <svg
                    class="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span class="text-xs">{index + 1}</span>
                )}
              </div>
              <span class="text-sm font-medium">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
