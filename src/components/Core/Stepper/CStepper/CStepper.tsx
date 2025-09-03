import { component$, useVisibleTask$, $, useTask$, useSignal } from "@builder.io/qwik";
import type { CStepperProps } from "./types";
import { useCStepper } from "./hooks/useCStepper";
import { CStepperContextId } from "./hooks/useStepperContext";
import { useProvideStepperContext } from "./hooks/useProvideStepperContext";
import { CStepperErrors } from "./components/CStepperErrors";
import { CStepperContent } from "./components/CStepperContent";
import { CStepperProgress } from "./components/CStepperProgress";
import { CStepperNavigation } from "./components/CStepperNavigation";
import { CStepperManagement } from "./components/CStepperManagement";
import { StepperHelpModal } from "../shared/components/StepperHelpModal";
import { useStepperHelp } from "../shared/hooks/useStepperHelp";

/**
 * Content-focused stepper component with top navigation
 */
export const CStepper = component$((props: CStepperProps) => {
  // Initialize edit mode signal
  const isEditMode = useSignal(props.isEditMode || false);
  
  // Get all stepper functionality from useCStepper hook
  const { 
    activeStep, 
    steps, 
    handleNext$, 
    handlePrev$, 
    setStep$,
    hasError,
    errorMessage,
    isLoading,
    handleStepError,
    addStep$,
    removeStep$,
    swapSteps$
  } = useCStepper(props);

  // Initialize help system (always call hook, but use enableHelp flag)
  const helpSystem = useStepperHelp(
    steps,
    activeStep,
    props.helpOptions
  );

  // Use the useProvideStepperContext hook to create and provide the context
  useProvideStepperContext({
    contextId: props.contextId || CStepperContextId,
    steps,
    activeStep,
    setStep$,
    handleNext$,
    handlePrev$,
    data: props.contextValue || {},
    onStepComplete$: props.onStepComplete$,
    addStep$,
    removeStep$,
    swapSteps$,
    allowSkipSteps: props.allowSkipSteps
  });

  // Process extraSteps if provided
  useTask$(({ track }) => {
    track(() => props.extraSteps);
    
    // Add extra steps if provided
    if (props.extraSteps && props.extraSteps.length > 0) {
      // We have to use for loop because we can't await Promise inside map
      // Process one by one to ensure correct ordering
      for (const step of props.extraSteps) {
        addStep$(step);
      }
    }
  });

  // Setup focus management for accessibility
  useVisibleTask$(({ track }) => {
    track(() => activeStep.value);
    
    // Focus the active step element after step change
    setTimeout(() => {
      const activeStepEl = document.getElementById(`cstepper-step-${activeStep.value}`);
      if (activeStepEl) {
        const focusableEl = activeStepEl.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableEl) {
          (focusableEl as HTMLElement).focus();
        } else {
          activeStepEl.setAttribute('tabindex', '-1');
          activeStepEl.focus();
        }
      }
    }, 100);
  });

  // Render error state if there are issues with the stepper
  if (hasError.value) {
    return (
      <CStepperErrors 
        hasError={hasError.value}
        errorMessage={errorMessage.value}
        stepsLength={steps.value.length}
      />
    );
  }

  // Don't render anything if there are no steps
  if (!steps.value.length) return null;

  // Calculate some values for the current step
  const stepNumber = activeStep.value + 1;
  const stepTitle = steps.value[activeStep.value].title;
  const stepHeaderText = `Step ${stepNumber}: ${stepTitle}`;
  const totalSteps = steps.value.length;
  const isLastStep = activeStep.value === totalSteps - 1;
  const currentStepIsComplete = steps.value[activeStep.value].isComplete;
  const currentStep = steps.value[activeStep.value];
  const currentStepHasErrors = Boolean(currentStep.validationErrors && currentStep.validationErrors.length > 0);
  const isOptional = Boolean(currentStep.isOptional);
  const isStepSkippable = Boolean(currentStep.skippable);
  
  // Help system properties
  const hasHelp = helpSystem?.currentStepHasHelp.value || false;

  return (
    <div class="w-full" role="application" aria-label="Multi-step form">
      {/* Step Management UI (only visible in edit mode) */}
      <CStepperManagement 
        steps={steps.value}
        activeStep={activeStep.value}
        addStep$={addStep$}
        removeStep$={removeStep$}
        swapSteps$={swapSteps$}
        isEditMode={isEditMode.value}
        dynamicStepComponent={props.dynamicStepComponent}
      />
      
      {/* Step Progress Indicator */}
      <CStepperProgress 
        steps={steps.value}
        activeStep={activeStep.value}
        onStepClick$={setStep$}
        customIcons={props.customIcons}
        useNumbers={props.useNumbers}
        allowSkipSteps={props.allowSkipSteps}
      />
      
      {/* Step Content */}
      <div class="space-y-6">
        <CStepperContent
          currentStep={currentStep}
          isLoading={isLoading.value}
          activeStep={activeStep.value}
          stepNumber={stepNumber}
          totalSteps={totalSteps}
          stepHeaderText={stepHeaderText}
          handleStepError={handleStepError}
          hideStepHeader={props.hideStepHeader}
        />
        
        {/* Navigation Buttons */}
        <CStepperNavigation
          activeStep={activeStep.value}
          currentStepIsComplete={currentStepIsComplete}
          currentStepHasErrors={currentStepHasErrors}
          isLoading={isLoading.value}
          isLastStep={isLastStep}
          isOptional={isOptional}
          allowSkipSteps={props.allowSkipSteps || false}
          isStepSkippable={isStepSkippable}
          onPrevious$={handlePrev$}
          onNext$={handleNext$}
          onComplete$={props.onComplete$ || $(() => {})}
          
          // Help system props
          hasHelp={hasHelp}
          onShowHelp$={helpSystem?.openHelp$}
          helpButtonLabel={`Get help for ${stepTitle}`}
          isHelpOpen={helpSystem?.isHelpOpen.value || false}
        />
        
        {/* Accessible progress indicator */}
        <div class="sr-only" aria-live="polite">
          {$localize`Step ${stepNumber} of ${totalSteps}\: ${stepTitle}`}
          {currentStepIsComplete ? $localize`Step is complete` : $localize`Step is incomplete`}
          {currentStepHasErrors ? $localize`Step has validation errors` : ''}
        </div>
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