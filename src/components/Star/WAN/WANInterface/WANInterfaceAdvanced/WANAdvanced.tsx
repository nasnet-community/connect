import {
  component$,
  useSignal,
  useContext,
  $,
  useVisibleTask$,
  useTask$,
  type QRL,
} from "@builder.io/qwik";
import { CStepper } from "../../../../Core/Stepper/CStepper/CStepper";
import type { CStepMeta } from "../../../../Core/Stepper/CStepper/types";
import { StarContext } from "../../../StarContext/StarContext";
import type { StarContextType } from "../../../StarContext/StarContext";
import { Step1_LinkInterface } from "./steps/Step1_LinkInterface";
import { Step2_Connection } from "./steps/Step2_Connection";
import { Step3_MultiLink } from "./steps/Step3_MultiLink";
import { Step4_Summary } from "./steps/Step4_Summary";
import { useWANAdvanced } from "./hooks/useWANAdvanced";
import { useWANValidation } from "./hooks/useWANValidation";
import { useWANPersistence } from "./hooks/useWANPersistence";
import { generateWANState } from "./utils/configGenerator";

export interface WANAdvancedProps {
  onComplete$?: QRL<() => void>;
  onCancel$?: QRL<() => void>;
}

export const WANAdvanced = component$<WANAdvancedProps>(
  ({ onComplete$, onCancel$ }) => {
    const starContext = useContext(StarContext) as StarContextType;
    const activeStep = useSignal(0);
    const isValidating = useSignal(false);

    // Initialize hooks
    const advancedHooks = useWANAdvanced();
    const validation = useWANValidation();
    const persistence = useWANPersistence();

    // Always use advanced mode
    useTask$(() => {
      advancedHooks.state.mode = "advanced";
    });

    // Load persisted state on mount
    useVisibleTask$(async () => {
      const hasStored = await persistence.hasStoredState$();
      if (hasStored) {
        const stored = await persistence.loadState$();
        if (stored) {
          // Merge stored state with current state
          Object.assign(advancedHooks.state, stored);
        }
      }
    });

    // Save state on changes
    useVisibleTask$(({ track }) => {
      track(() => advancedHooks.state);
      persistence.saveState$(advancedHooks.state);
    });

    // Validate current step
    const validateCurrentStep$ = $(async () => {
      isValidating.value = true;
      const result = await validation.validateStep$(
        activeStep.value,
        advancedHooks.state,
      );
      advancedHooks.state.validationErrors = result.errors;
      isValidating.value = false;
      return result.isValid;
    });

    // Validate entire wizard
    const validateAdvanced$ = $(async () => {
      isValidating.value = true;
      const result = await validation.validateAdvanced$(advancedHooks.state);
      advancedHooks.state.validationErrors = result.errors;
      isValidating.value = false;
      return result.isValid;
    });

    // Apply configuration
    const applyConfiguration$ = $(async () => {
      const isValid = await validateAdvanced$();
      if (!isValid) {
        console.error("Configuration has validation errors");
        return;
      }

      // Generate WAN state and update StarContext
      const wanState = generateWANState(advancedHooks.state);
      Object.assign(starContext.state.WAN, wanState);

      // Clear persisted state
      await persistence.clearState$();

      // Call completion handler
      if (onComplete$) {
        onComplete$();
      }
    });

    // Edit specific step
    const editStep$ = $((step: number) => {
      activeStep.value = step;
    });

    // Create step definitions
    const createSteps = $((): CStepMeta[] => {
      const steps: CStepMeta[] = [
        {
          id: 1,
          title: $localize`Link & Interface`,
          description: $localize`Configure WAN interfaces and settings`,
          component: (
            <Step1_LinkInterface
              wizardState={advancedHooks.state}
              wizardActions={advancedHooks}
            />
          ),
          isComplete: false,
        },
        {
          id: 2,
          title: $localize`Connection`,
          description: $localize`Configure connection types and settings`,
          component: (
            <Step2_Connection
              wizardState={advancedHooks.state}
              wizardActions={advancedHooks}
            />
          ),
          isComplete: false,
        },
      ];

      // Conditionally add multi-link step
      if (advancedHooks.state.links.length > 1) {
        steps.push({
          id: 3,
          title: $localize`Multi-Link`,
          description: $localize`Configure multi-WAN strategy`,
          component: (
            <Step3_MultiLink
              wizardState={advancedHooks.state}
              wizardActions={advancedHooks}
            />
          ),
          isComplete: false,
        });
      }

      // Summary step
      steps.push({
        id: steps.length + 1,
        title: $localize`Review`,
        description: $localize`Review and apply configuration`,
        component: (
          <Step4_Summary
            wizardState={advancedHooks.state}
            onEdit$={editStep$}
            onValidate$={validateAdvanced$}
            onApply$={applyConfiguration$}
          />
        ),
        isComplete: false,
      });

      return steps;
    });

    const steps = useSignal<CStepMeta[]>([]);

    // Initialize steps
    useTask$(async () => {
      steps.value = await createSteps();
    });

    // Update steps when link count changes
    useVisibleTask$(async ({ track }) => {
      track(() => advancedHooks.state.links.length);
      steps.value = await createSteps();
    });

    // Handle step change
    const handleStepChange$ = $((step: number) => {
      activeStep.value = step;
    });

    // Handle step completion
    const handleStepComplete$ = $(async (stepId: number) => {
      const isValid = await validateCurrentStep$();
      if (isValid) {
        const stepIndex = steps.value.findIndex((s) => s.id === stepId);
        if (stepIndex !== -1) {
          steps.value[stepIndex].isComplete = true;
        }
      }
    });

    return (
      <div class="min-h-full bg-gray-50 dark:bg-gray-900">
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div class="mb-8">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                  {$localize`Advanced WAN Configuration`}
                </h1>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {$localize`Configure multiple WAN connections with advanced networking features`}
                </p>
              </div>

              {onCancel$ && (
                <button
                  onClick$={onCancel$}
                  class="rounded-md border border-gray-300 px-4 py-2 text-sm 
                       font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600
                       dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {$localize`Cancel`}
                </button>
              )}
            </div>
          </div>

          {/* Stepper */}
          <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <CStepper
              steps={steps.value}
              activeStep={activeStep.value}
              onStepChange$={handleStepChange$}
              onStepComplete$={handleStepComplete$}
              onComplete$={applyConfiguration$}
              persistState={false}
              allowSkipSteps={false}
            />
          </div>

          {/* Footer Info */}
          <div class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            {advancedHooks.state.links.length === 1
              ? $localize`Single WAN configuration`
              : $localize`Multi-WAN configuration with ${advancedHooks.state.links.length} links`}
          </div>
        </div>
      </div>
    );
  },
);
