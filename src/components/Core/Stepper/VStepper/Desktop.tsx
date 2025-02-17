import { component$ } from "@builder.io/qwik";
import type { DesktopProps } from "./types";

export const Desktop = component$((props: DesktopProps) => {
  const { activeStep, position } = props;

  return (
    <div
      class={`fixed top-1/2 z-40 hidden -translate-y-1/2 md:block 
      ${position === "left" ? "left-4" : "right-4"}`}
    >
      <div class="relative w-[200px]">
        {/* Stronger gradient border */}
        <div class="absolute -inset-[1px] rounded-xl bg-gradient-to-b from-primary-500/40 via-secondary-500/40 to-transparent"></div>

        {/* Darker background in dark mode */}
        <div class="relative rounded-xl bg-white/30 p-4 shadow-lg backdrop-blur-sm dark:bg-surface-dark/70">
          {/* Clearer step counter */}
          <div class="mb-4 px-1">
            <span class="text-xs font-semibold text-text-secondary dark:text-white/90">
              {$localize`Step ${activeStep.value + 1} of ${props.steps.length}`}
            </span>
          </div>

          <div class="relative space-y-4">
            {/* More visible progress line */}
            <div
              class="absolute bottom-6 top-[2.5rem] w-0.5 
              bg-gradient-to-b from-primary-500/50 via-primary-500/60 to-secondary-500/50"
              style={{
                [position === "left" ? "left" : "right"]: "1.25rem",
              }}
            />

            {props.steps.map((step, index) => (
              <div
                key={step.id}
                class={`relative flex items-start gap-3 ${
                  position === "right" ? "flex-row-reverse" : ""
                }`}
              >
                {/* Enhanced step indicators */}
                <div class="relative flex-shrink-0">
                  <div
                    class={`flex h-6 w-6 items-center justify-center rounded-full border-2 
                    transition-all duration-300 ${
                      step.isComplete
                        ? "border-primary-500 bg-primary-500 shadow-md shadow-primary-500/30"
                        : index === activeStep.value
                          ? "border-primary-500 bg-surface shadow-md shadow-primary-500/20 dark:bg-surface-dark"
                          : "border-border/50 bg-surface-secondary/50 dark:border-border-dark/50 dark:bg-surface-dark-secondary/50"
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
                      <span
                        class={`text-xs font-medium ${
                          index === activeStep.value
                            ? "text-primary-500 dark:text-primary-400"
                            : "text-text-secondary dark:text-text-dark-secondary"
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>
                </div>

                {/* Higher contrast titles */}
                <div class="min-w-0 flex-1">
                  <h3
                    class={`truncate text-xs font-medium ${
                      index === activeStep.value
                        ? "text-text dark:text-white"
                        : step.isComplete
                          ? "text-text-secondary dark:text-text-dark-secondary"
                          : "text-text-secondary/90 dark:text-text-dark-secondary/90"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
