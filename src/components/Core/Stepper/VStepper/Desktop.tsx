import { component$ } from "@builder.io/qwik";
import type { DesktopProps } from "./types";
import { StepperProgressDisplay } from "../shared/components/StepperProgressDisplay";

export const Desktop = component$((props: DesktopProps) => {
  const {
    activeStep,
    position,
    allowStepNavigation = false,
    onStepClick$,
    helpButton,
    onHelpClick$,
  } = props;

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
              <span class="text-text-secondary text-xs font-semibold dark:text-white/90">
                {$localize`Step ${activeStep.value + 1} of ${props.steps.length}`}
              </span>
              <button
                onClick$={() => onHelpClick$()}
                class={`group flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-all
                  ${
                    helpButtonConfig.variant === "primary"
                      ? "bg-primary-500/20 text-primary-600 hover:bg-primary-500/30 dark:text-primary-400"
                      : helpButtonConfig.variant === "secondary"
                        ? "bg-secondary-500/20 text-secondary-600 hover:bg-secondary-500/30 dark:text-secondary-400"
                        : "text-text-secondary dark:text-text-dark-secondary hover:bg-primary-500/10 hover:text-primary-500 dark:hover:text-primary-400"
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
              <span class="text-text-secondary text-xs font-semibold dark:text-white/90">
                {$localize`Step ${activeStep.value + 1} of ${props.steps.length}`}
              </span>
            </div>
          )}

          <StepperProgressDisplay
            steps={props.steps}
            activeStep={activeStep.value}
            onStepClick$={onStepClick$}
            interactive={allowStepNavigation}
            allowDirectNavigation={allowStepNavigation}
            orientation="vertical"
            verticalSide={position}
          />
        </div>
      </div>
    </div>
  );
});
