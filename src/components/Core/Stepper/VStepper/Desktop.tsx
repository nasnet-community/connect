import { component$ } from "@builder.io/qwik";
import type { DesktopProps } from "./types";
import { StepperProgressDisplay } from "../shared/components/StepperProgressDisplay";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const Desktop = component$((props: DesktopProps) => {
  const locale = useMessageLocale();
  const {
    activeStep,
    position,
    allowStepNavigation = false,
    onStepClick$,
  } = props;
  const stepNumber = activeStep.value + 1;
  const totalSteps = props.steps.length;

  return (
    <div
      class={`fixed top-1/2 z-40 hidden -translate-y-1/2 md:block 
      ${position === "left" ? "left-4" : "right-4"}`}
    >
      <div class="relative w-[224px]">
        <div class="bg-surface/88 dark:bg-surface-dark/88 relative overflow-hidden rounded-2xl border border-border/60 p-4 shadow-[0_24px_48px_-36px_rgba(15,23,42,0.55)] backdrop-blur-md dark:border-border-dark/60">
          <div class="mb-2 border-b border-border/50 pb-2 dark:border-border-dark/50">
            <div class="flex min-h-8 items-center">
              <p class="text-text-secondary dark:text-text-dark-secondary text-[0.8rem] font-semibold uppercase leading-none tracking-[0.16em]">
                {semanticMessages.stepper_step_of_total(
                  {
                    current: String(stepNumber),
                    total: String(totalSteps),
                  },
                  { locale },
                )}
              </p>
            </div>
          </div>

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
