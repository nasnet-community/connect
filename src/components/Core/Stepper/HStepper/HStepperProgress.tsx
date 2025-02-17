import { component$ } from "@builder.io/qwik";
import type { StepItem } from "./HSteppertypes";
import { LuCheck } from "@qwikest/icons/lucide";

interface StepperProgressProps {
  steps: StepItem[];
  activeStep: number;
}

export const StepperProgress = component$((props: StepperProgressProps) => {
  return (
    <div class="container mx-auto">
      <div class="hidden py-6 md:block">
        <div class="mx-auto max-w-4xl px-4">
          <div class="relative">
            <div class="absolute left-0 top-[2.125rem] h-0.5 w-full">
              <div class="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-primary-500/20 dark:from-primary-500/40 dark:via-secondary-500/40 dark:to-primary-500/40" />
              <div
                class="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500"
                style={{
                  width: `${(props.activeStep / (props.steps.length - 1)) * 100}%`,
                }}
              />
            </div>

            <div class="relative flex justify-between">
              {props.steps.map((step, index) => (
                <div key={step.id} class="group flex flex-col items-center">
                  <div
                    class={`flex h-9 w-9 items-center justify-center rounded-full border-2 
                    shadow-lg transition-all duration-300 ${
                      step.isComplete
                        ? "scale-110 border-primary-500 bg-primary-500"
                        : index === props.activeStep
                          ? "scale-110 border-primary-500 bg-surface dark:bg-surface-dark"
                          : "border-border/40 bg-surface-secondary/60 dark:border-border-dark dark:bg-surface-dark-secondary/80"
                    }`}
                  >
                    {step.isComplete ? (
                      <LuCheck class="h-4 w-4 text-white" />
                    ) : step.icon ? (
                      <step.icon
                        class={`h-4 w-4 ${
                          index === props.activeStep
                            ? "text-primary-500 dark:text-primary-300"
                            : "text-text-secondary dark:text-text-dark-secondary/80"
                        }`}
                      />
                    ) : null}
                  </div>
                  <span
                    class={`mt-2 text-sm transition-all duration-300 ${
                      index === props.activeStep
                        ? "scale-105 font-bold text-text dark:text-white"
                        : "font-medium text-text-secondary dark:text-text-dark-secondary/80"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
