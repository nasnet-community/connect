import { component$, $ } from "@builder.io/qwik";
import { CStepperProgress } from "../CStepper/components/CStepperProgress";
import { useStepper } from "./useHStepper";
import type { HStepperProps } from "./HSteppertypes";
import { HStepperNavigation } from "./HStepperNavigation";
import { StateViewer } from "../StateViewer/StateViewer";
import {
  StepperManagement,
  StepperErrors,
  StepperNavigation,
} from "../shared/components";
import { StepperHelpModal } from "../shared/components/StepperHelpModal";
import { useStepperHelp } from "../shared/hooks/useStepperHelp";

export const HStepper = component$((props: HStepperProps) => {
  const stepperData = useStepper(props);
  const { activeStep, steps, handleNext$, handlePrev$ } = stepperData;

  // Check if we're using enhanced features
  const hasEnhancedFeatures = props.enableEnhancedFeatures;

  // Initialize help system (always call hook, but use enableHelp flag)
  const helpSystem = useStepperHelp(steps, activeStep, props.helpOptions);

  // Show error state if enhanced features are enabled and there's an error
  if (
    hasEnhancedFeatures &&
    "hasError" in stepperData &&
    stepperData.hasError?.value
  ) {
    return (
      <StepperErrors
        hasError={stepperData.hasError.value}
        errorMessage={stepperData.errorMessage?.value || ""}
        stepsLength={steps.value.length}
        stepperType="horizontal"
      />
    );
  }

  if (!steps.value.length) return null;

  const CurrentStepComponent = steps.value[activeStep.value].component;
  const isLastStep = activeStep.value === steps.value.length - 1;
  const currentStep = steps.value[activeStep.value];

  // Help system properties
  const hasHelp = helpSystem?.currentStepHasHelp.value || false;
  const stepTitle = currentStep.title;
  const stepNumber = activeStep.value + 1;
  const totalSteps = steps.value.length;
  const progressSteps = steps.value.map((step, index) => ({
    id: step.id,
    title: step.title,
    description: step.description || "",
    component: step.component,
    isComplete: index < activeStep.value,
    isDisabled: step.isDisabled,
    isOptional: step.isOptional,
    skippable: step.skippable,
    validationErrors: step.validationErrors,
  }));

  return (
    <div class="min-h-screen w-full bg-background dark:bg-background-dark">
      <div class="bg-surface/78 dark:bg-surface-dark/78 fixed inset-x-0 top-20 z-40 border-b border-border/60 shadow-[0_18px_48px_-32px_rgba(15,23,42,0.55)] backdrop-blur-xl dark:border-border-dark/60">
        <div class="container mx-auto px-4 py-2 md:hidden">
          <div class="mx-auto max-w-4xl">
            <div class="bg-surface-secondary/80 dark:bg-surface-dark-secondary/80 flex items-center justify-between rounded-2xl border border-border/60 px-4 py-2.5 shadow-sm dark:border-border-dark/60">
              <div>
                <p class="text-text-secondary dark:text-text-dark-secondary text-[0.7rem] font-semibold uppercase tracking-[0.22em]">
                  {`Step ${stepNumber} of ${totalSteps}`}
                </p>
                <p class="mt-0.5 text-sm font-semibold text-text dark:text-white">
                  {stepTitle}
                </p>
              </div>
              <div class="rounded-full bg-primary-500/10 px-3 py-1 text-sm font-semibold text-primary-700 dark:bg-primary-500/20 dark:text-primary-300">
                {Math.round((stepNumber / totalSteps) * 100)}%
              </div>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="container mx-auto flex items-center px-4">
            <div class="mx-auto w-full max-w-4xl">
              <CStepperProgress
                steps={progressSteps}
                activeStep={activeStep.value}
                onStepClick$={$(() => {})}
                interactive={false}
                showMobileLayout={false}
                compact={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto pb-20 pt-20 md:pt-20 lg:pt-24">
        {/* Step Management UI (only visible in edit mode) */}
        {props.isEditMode &&
          hasEnhancedFeatures &&
          "addStep$" in stepperData && (
            <StepperManagement
              steps={steps.value}
              activeStep={activeStep.value}
              addStep$={stepperData.addStep$}
              removeStep$={stepperData.removeStep$}
              swapSteps$={stepperData.swapSteps$}
              isEditMode={props.isEditMode}
              dynamicStepComponent={props.dynamicStepComponent}
              stepperType="horizontal"
            />
          )}

        <div class="mx-auto max-w-4xl px-4">
          <div class="min-h-[300px] rounded-[1.75rem] border border-border/60 bg-surface/95 p-5 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.45)] dark:border-border-dark/60 dark:bg-surface-dark/95 md:p-6">
            <CurrentStepComponent />
          </div>

          {hasEnhancedFeatures ? (
            <StepperNavigation
              activeStep={activeStep.value}
              totalSteps={steps.value.length}
              currentStepIsComplete={
                steps.value[activeStep.value].isComplete || false
              }
              isLoading={
                "isLoading" in stepperData
                  ? stepperData.isLoading?.value
                  : false
              }
              isLastStep={isLastStep}
              onPrevious$={handlePrev$}
              onNext$={handleNext$}
              onComplete$={props.onComplete$}
              stepperType="horizontal"
              allowSkipSteps={props.allowSkipSteps}
              // Help system props
              hasHelp={hasHelp}
              onShowHelp$={helpSystem?.openHelp$}
              helpButtonLabel={`Get help for ${stepTitle}`}
              isHelpOpen={helpSystem?.isHelpOpen.value || false}
            />
          ) : (
            <HStepperNavigation
              activeStep={activeStep.value}
              totalSteps={steps.value.length}
              isCurrentStepComplete={
                steps.value[activeStep.value].isComplete || false
              }
              onPrevious$={handlePrev$}
              onNext$={handleNext$}
              // Help system props (if available)
              hasHelp={hasHelp}
              onShowHelp$={helpSystem?.openHelp$}
              helpButtonLabel={`Get help for ${stepTitle}`}
              isHelpOpen={helpSystem?.isHelpOpen.value || false}
            />
          )}
        </div>
        <StateViewer />
      </div>

      {/* Help Modal */}
      {props.enableHelp && helpSystem && (
        <StepperHelpModal
          isOpen={helpSystem.isHelpOpen}
          onClose$={helpSystem.closeHelp$}
          currentStep={currentStep}
          stepTitle={stepTitle}
          stepNumber={stepNumber}
          totalSteps={totalSteps}
        />
      )}
    </div>
  );
});
