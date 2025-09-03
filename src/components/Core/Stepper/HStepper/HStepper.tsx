import { component$, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { StepperProgress } from "./HStepperProgress";
import { useStepper } from "./useHStepper";
import type { HStepperProps } from "./HSteppertypes";
import { HStepperNavigation } from "./HStepperNavigation";
import { StateViewer } from "../StateViewer/StateViewer";
import { 
  StepperManagement, 
  StepperErrors,
  StepperNavigation 
} from "../shared/components";
import { StepperHelpModal } from "../shared/components/StepperHelpModal";
import { useStepperHelp } from "../shared/hooks/useStepperHelp";

export const HStepper = component$((props: HStepperProps) => {
  const stepperData = useStepper(props);
  const { activeStep, steps, handleNext$, handlePrev$ } = stepperData;
  const stepperRef = useSignal<Element>();
  
  // Check if we're using enhanced features
  const hasEnhancedFeatures = props.enableEnhancedFeatures;

  // Initialize help system (always call hook, but use enableHelp flag)
  const helpSystem = useStepperHelp(
    steps,
    activeStep,
    props.helpOptions
  );

  useVisibleTask$(() => {
    if (stepperRef.value) {
      stepperRef.value.scrollIntoView({ behavior: "smooth" });
    }
  });
  
  // Show error state if enhanced features are enabled and there's an error
  if (hasEnhancedFeatures && 'hasError' in stepperData && stepperData.hasError?.value) {
    return (
      <StepperErrors
        hasError={stepperData.hasError.value}
        errorMessage={stepperData.errorMessage?.value || ''}
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
        {/* Step Management UI (only visible in edit mode) */}
        {props.isEditMode && hasEnhancedFeatures && 'addStep$' in stepperData && (
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
          <div class="min-h-[300px] rounded-xl bg-surface p-6 shadow-lg dark:bg-surface-dark">
            <CurrentStepComponent />
          </div>

          {hasEnhancedFeatures ? (
            <StepperNavigation
              activeStep={activeStep.value}
              totalSteps={steps.value.length}
              currentStepIsComplete={steps.value[activeStep.value].isComplete || false}
              isLoading={'isLoading' in stepperData ? stepperData.isLoading?.value : false}
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
            isCurrentStepComplete={steps.value[activeStep.value].isComplete || false}
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
