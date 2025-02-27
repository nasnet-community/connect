import { component$, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { StepperProgress } from "./HStepperProgress";
import { useStepper } from "./useHStepper";
import type { HStepperProps } from "./HSteppertypes";
import { HStepperNavigation } from "./HStepperNavigation";
import { StateViewer } from "../StateViewer/StateViewer";

export const HStepper = component$((props: HStepperProps) => {
  const { activeStep, steps, handleNext$, handlePrev$ } = useStepper(props);
  const stepperRef = useSignal<Element>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (stepperRef.value) {
      stepperRef.value.scrollIntoView({ behavior: "smooth" });
    }
  });

  if (!steps.value.length) return null;

  const CurrentStepComponent = steps.value[activeStep.value].component;

  return (
    <div
      ref={stepperRef}
      class="min-h-screen w-full bg-background dark:bg-background-dark"
    >
      <div class="fixed inset-x-0 top-20 z-40 bg-surface/80 backdrop-blur-md dark:bg-surface-dark/80">
        <div class="container mx-auto py-2"></div>
        <StepperProgress steps={steps.value} activeStep={activeStep.value} />
      </div>

      <div class="container mx-auto pb-20 pt-44 md:pt-48">
        <div class="mx-auto max-w-4xl px-4">
          <div class="min-h-[300px] rounded-xl bg-surface p-6 shadow-lg dark:bg-surface-dark">
            <CurrentStepComponent />
          </div>

          <HStepperNavigation
            activeStep={activeStep.value}
            totalSteps={steps.value.length}
            isCurrentStepComplete={steps.value[activeStep.value].isComplete}
            onPrevious$={handlePrev$}
            onNext$={handleNext$}
          />
        </div>
        <StateViewer />
      </div>
    </div>
  );
});
