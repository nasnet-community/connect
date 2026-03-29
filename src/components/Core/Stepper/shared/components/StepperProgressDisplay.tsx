import { component$, $, type JSX, type QRL } from "@builder.io/qwik";

export interface StepperProgressDisplayStep {
  id: number;
  title: string;
  isComplete?: boolean;
  isDisabled?: boolean;
  isOptional?: boolean;
  validationErrors?: string[];
}

export interface StepperProgressDisplayProps {
  steps: StepperProgressDisplayStep[];
  activeStep: number;
  onStepClick$?: QRL<(index: number) => void>;
  customIcons?: Record<number, JSX.Element>;
  useNumbers?: boolean;
  allowSkipSteps?: boolean;
  allowDirectNavigation?: boolean;
  interactive?: boolean;
  compact?: boolean;
  orientation?: "horizontal" | "vertical";
  scrollable?: boolean;
  verticalSide?: "left" | "right";
}

export const StepperProgressDisplay = component$(
  (props: StepperProgressDisplayProps) => {
    const {
      steps,
      activeStep,
      onStepClick$,
      customIcons = {},
      useNumbers = false,
      allowSkipSteps = false,
      allowDirectNavigation = false,
      interactive = true,
      compact = false,
      orientation = "horizontal",
      scrollable = false,
      verticalSide = "left",
    } = props;

    const desktopMinHeight = compact ? "58px" : "80px";
    const titleMarginClass = compact ? "mt-1.5" : "mt-4";
    const titleTextClass = compact
      ? "text-[10px] max-w-[82px]"
      : "text-xs max-w-[90px]";
    const optionalTextClass = compact ? "text-[7px]" : "text-[9px]";

    const renderStepIndicator = (
      stepIndex: number,
      isComplete: boolean,
      isCurrent: boolean,
      hasErrors: boolean,
    ) => {
      const step = steps[stepIndex];

      if (customIcons[step.id]) {
        return customIcons[step.id];
      }

      if (hasErrors) {
        return (
          <span class="text-sm font-semibold text-red-600 dark:text-red-400">
            !
          </span>
        );
      }

      if (isComplete && !useNumbers) {
        return (
          <svg
            class="h-5 w-5 text-white dark:text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg>
        );
      }

      return (
        <span
          class={`text-sm font-medium ${
            isCurrent
              ? "text-yellow-600 dark:text-yellow-400"
              : isComplete && useNumbers
                ? "text-white dark:text-gray-900"
                : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {stepIndex + 1}
        </span>
      );
    };

    const getCanInteract = (stepIndex: number) => {
      if (!interactive || !onStepClick$ || steps[stepIndex]?.isDisabled) {
        return false;
      }

      if (allowDirectNavigation || allowSkipSteps) {
        return true;
      }

      return stepIndex === activeStep;
    };

    if (orientation === "vertical") {
      return (
        <div class="relative space-y-0">
          {steps.map((step, stepIndex) => {
            const isComplete = activeStep > stepIndex;
            const isCurrent = activeStep === stepIndex;
            const hasErrors = Boolean(
              step.validationErrors && step.validationErrors.length > 0,
            );
            const canInteract = getCanInteract(stepIndex);
            const circleCenterOffset = "1.125rem";
            const connectorThickness = "2px";
            const connectorPosition = `calc(${circleCenterOffset} - 1px)`;

            return (
              <div
                key={`step-${step.id}-vertical-${stepIndex}`}
                class={`relative ${stepIndex === steps.length - 1 ? "pb-0" : "pb-5"}`}
              >
                {stepIndex < steps.length - 1 && (
                  <div
                    class={`absolute bottom-0 rounded-full transition-colors duration-300 ${
                      stepIndex < activeStep
                        ? "bg-yellow-500 dark:bg-yellow-400"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                    style={{
                      [verticalSide]: connectorPosition,
                      top: "2.125rem",
                      width: connectorThickness,
                    }}
                    aria-hidden="true"
                  />
                )}

                <div
                  class={`relative flex items-start gap-3.5 ${verticalSide === "right" ? "flex-row-reverse text-right" : ""}`}
                >
                  <button
                    class={`relative z-10 flex items-center justify-center rounded-full outline-none transition-all duration-200 ${
                      step.isDisabled
                        ? "cursor-not-allowed opacity-60"
                        : canInteract
                          ? "cursor-pointer hover:scale-110"
                          : "cursor-default"
                    }`}
                    onClick$={
                      step.isDisabled
                        ? undefined
                        : $(() => {
                            if (canInteract && onStepClick$) {
                              onStepClick$(stepIndex);
                            }
                          })
                    }
                    disabled={step.isDisabled || !canInteract}
                    aria-disabled={step.isDisabled || !canInteract}
                    aria-current={isCurrent ? "step" : undefined}
                    aria-label={`Go to step ${stepIndex + 1}: ${step.title}`}
                    type="button"
                  >
                    <div
                      class={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                        hasErrors
                          ? "border border-red-300 bg-red-100 dark:border-red-700 dark:bg-red-900/20"
                          : isComplete
                            ? "bg-yellow-500 dark:bg-yellow-400"
                            : isCurrent
                              ? "border-4 border-yellow-500 bg-white dark:border-yellow-400 dark:bg-gray-900"
                              : "border-2 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900"
                      }`}
                    >
                      {renderStepIndicator(
                        stepIndex,
                        isComplete,
                        isCurrent,
                        hasErrors,
                      )}
                    </div>
                  </button>

                  <div
                    class={`min-w-0 flex-1 pt-1.5 ${step.isDisabled ? "opacity-50" : ""}`}
                  >
                    <div
                      class={`break-words text-sm leading-snug transition-colors ${
                        isCurrent
                          ? "font-medium text-yellow-700 dark:text-yellow-300"
                          : isComplete
                            ? "text-text dark:text-white"
                            : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {step.title}
                    </div>
                    {step.isOptional && (
                      <div class="mt-0.5 text-[11px] text-gray-400 dark:text-gray-500">
                        (Optional)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div class="relative w-full" style={{ minHeight: desktopMinHeight }}>
        <div class="absolute left-0 right-0 top-[18px] z-0 h-1">
          <div
            class="h-1 w-full bg-gray-200 dark:bg-gray-700"
            aria-hidden="true"
          ></div>
          <div
            class="absolute left-0 top-0 h-1 bg-yellow-500 transition-all duration-500 dark:bg-yellow-400"
            style={{
              width: `${steps.length > 1 ? Math.min(100, (activeStep / (steps.length - 1)) * 100) : 0}%`,
            }}
            aria-hidden="true"
          ></div>
        </div>

        <div
          class={`relative z-10 flex items-start ${scrollable ? "gap-8 px-8 pt-0" : "w-full justify-between px-4 pt-0"}`}
          style={{
            minHeight: desktopMinHeight,
            minWidth: scrollable ? "min-content" : undefined,
          }}
        >
          {steps.map((step, stepIndex) => {
            const isComplete = activeStep > stepIndex;
            const isCurrent = activeStep === stepIndex;
            const hasErrors = Boolean(
              step.validationErrors && step.validationErrors.length > 0,
            );
            const canInteract = getCanInteract(stepIndex);

            return (
              <div
                key={`step-${step.id}-horizontal-${stepIndex}`}
                data-step-index={stepIndex}
                class={`flex flex-col items-center ${scrollable ? "flex-shrink-0 snap-center" : ""}`}
              >
                <button
                  class={`flex h-9 w-9 items-center justify-center rounded-full outline-none transition-all duration-200 ${
                    step.isDisabled
                      ? "cursor-not-allowed opacity-60"
                      : canInteract
                        ? "cursor-pointer hover:scale-110"
                        : "cursor-default"
                  }`}
                  onClick$={
                    step.isDisabled
                      ? undefined
                      : $(() => {
                          if (canInteract && onStepClick$) {
                            onStepClick$(stepIndex);
                          }
                        })
                  }
                  disabled={step.isDisabled || !canInteract}
                  aria-disabled={step.isDisabled || !canInteract}
                  aria-current={isCurrent ? "step" : undefined}
                  aria-label={`Go to step ${stepIndex + 1}: ${step.title}`}
                  type="button"
                >
                  <div
                    class={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                      hasErrors
                        ? "border border-red-300 bg-red-100 dark:border-red-700 dark:bg-red-900/20"
                        : isComplete
                          ? "bg-yellow-500 dark:bg-yellow-400"
                          : isCurrent
                            ? "border-4 border-yellow-500 bg-white dark:border-yellow-400 dark:bg-gray-900"
                            : "border-2 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900"
                    }`}
                  >
                    {renderStepIndicator(
                      stepIndex,
                      isComplete,
                      isCurrent,
                      hasErrors,
                    )}
                  </div>
                </button>

                <div
                  class={`text-center ${titleMarginClass} ${isCurrent ? "font-medium" : ""}`}
                >
                  <div
                    class={`${titleTextClass} hyphens-auto break-words leading-tight ${
                      isCurrent
                        ? "text-yellow-700 dark:text-yellow-300"
                        : isComplete
                          ? "text-gray-800 dark:text-gray-200"
                          : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.title}
                  </div>
                  {step.isOptional && (
                    <div
                      class={`${optionalTextClass} mt-0.5 text-gray-400 dark:text-gray-500`}
                    >
                      (Optional)
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
