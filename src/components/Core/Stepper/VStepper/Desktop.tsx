import { component$ } from "@builder.io/qwik";
import type { DesktopProps } from "./types";

export const Desktop = component$((props: DesktopProps) => {
  const { activeStep, position, allowStepNavigation = false, onStepClick$, helpButton, onHelpClick$ } = props;
  
  const showHelp = !!onHelpClick$;
  const helpButtonConfig = helpButton || {};

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
          {/* Help Button */}
          {showHelp && (
            <div class="mb-4 flex items-center justify-between">
              <span class="text-xs font-semibold text-text-secondary dark:text-white/90">
                {$localize`Step ${activeStep.value + 1} of ${props.steps.length}`}
              </span>
              <button
                onClick$={() => onHelpClick$ && onHelpClick$()}
                class={`group flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-all
                  ${helpButtonConfig.variant === 'primary'
                    ? 'bg-primary-500/20 text-primary-600 hover:bg-primary-500/30 dark:text-primary-400'
                    : helpButtonConfig.variant === 'secondary'
                      ? 'bg-secondary-500/20 text-secondary-600 hover:bg-secondary-500/30 dark:text-secondary-400'
                      : 'text-text-secondary hover:text-primary-500 hover:bg-primary-500/10 dark:text-text-dark-secondary dark:hover:text-primary-400'
                  }`}
                title={$localize`Get help for this step (Press ? key)`}
              >
                <svg
                  class="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {helpButtonConfig.showKeyboardHint !== false && (
                  <span class="opacity-60 group-hover:opacity-80">(?)</span>
                )}
              </button>
            </div>
          )}
          
          {/* Step counter (when no help button) */}
          {!showHelp && (
            <div class="mb-4 px-1">
              <span class="text-xs font-semibold text-text-secondary dark:text-white/90">
                {$localize`Step ${activeStep.value + 1} of ${props.steps.length}`}
              </span>
            </div>
          )}

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
                } ${allowStepNavigation ? "cursor-pointer" : ""}`}
                onClick$={allowStepNavigation && onStepClick$ ? () => onStepClick$(index) : undefined}
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
                    } ${allowStepNavigation ? "hover:scale-110" : ""}`}
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
                    } ${allowStepNavigation ? "hover:text-primary-500 dark:hover:text-primary-400" : ""}`}
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
