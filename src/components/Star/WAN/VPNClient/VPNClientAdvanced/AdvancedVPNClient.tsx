import {
  component$,
  $,
  useSignal,
  useTask$,
  useVisibleTask$,
  type QRL,
} from "@builder.io/qwik";
import { CStepper, type CStepMeta } from "~/components/Core/Stepper/CStepper";
import { useVPNClientAdvanced } from "./hooks/useVPNClientAdvanced";
import { useVPNClientValidation } from "./hooks/useVPNClientValidation";
import { useVPNClientPersistence } from "./hooks/useVPNClientPersistence";
import { Step1_VPNProtocols } from "./steps/Step1_VPNProtocols";
import { StepPriorities } from "./steps/StepPriorities";
import { Step2_VPNConfiguration } from "./steps/Step2_VPNConfiguration";
import { Step3_Summary } from "./steps/Step3_Summary";
import type { VPNClientAdvancedState } from "./types/VPNClientAdvancedTypes";

export interface VPNClientAdvancedProps {
  onComplete$?: QRL<() => Promise<void>>;
  onCancel$?: QRL<() => void>;
}

export const VPNClientAdvanced = component$<VPNClientAdvancedProps>(
  ({ onComplete$, onCancel$ }) => {
    const activeStep = useSignal(0);
    const isValidating = useSignal(false);

    // Initialize hooks
    const advancedHooks = useVPNClientAdvanced();
    const validation = useVPNClientValidation();
    const persistence = useVPNClientPersistence();

    // Initialize steps signal early
    const steps = useSignal<CStepMeta[]>([]);

    // Always use advanced mode
    useTask$(() => {
      advancedHooks.state.mode = "advanced";
    });

    // Initialize state on client after first paint to avoid blocking render
    useVisibleTask$(async () => {
      // Check if we have existing state in StarContext
      const existingState: VPNClientAdvancedState | null = await persistence.loadFromStarContext$();
      
      if (existingState && existingState.vpnConfigs && existingState.vpnConfigs.length > 0) {
        // Load existing VPN configs (using new property name)
        advancedHooks.state.vpnConfigs = existingState.vpnConfigs;
        advancedHooks.state.validationErrors = existingState.validationErrors || {};
      } else {
        // Initialize with minimum required VPN clients if none exist
        const minCount = advancedHooks.foreignWANCount;
        if (advancedHooks.state.vpnConfigs.length === 0) {
          for (let i = 0; i < minCount; i++) {
            await advancedHooks.addVPN$({
              type: "Wireguard",
              name: `VPN ${i + 1}`
            });
          }
        }
      }
      
      // Defer localStorage merge to next tick to keep UI responsive
      setTimeout(async () => {
        const hasStored = await persistence.hasStoredState$();
        if (hasStored) {
          const stored = await persistence.loadState$();
          if (stored) {
            // Merge stored state with current state
            Object.assign(advancedHooks.state, stored);
          }
        }
      }, 0);
    });

    // Note: Removed automatic state saving to prevent render loops
    // State is saved manually during applyConfiguration$ only


    // Note: Removed validateCurrentStep$ to prevent validation loops during step completion

    // Validate entire wizard
    const validateAdvanced$ = $(async () => {
      isValidating.value = true;
      const result = await validation.validateAdvanced$(advancedHooks.state);
      advancedHooks.state.validationErrors = result.errors;
      isValidating.value = false;
      return result.isValid;
    });

    // Handle step completion (simplified - no complex validation to prevent loops)
    const handleStepComplete$ = $(async (stepId: number) => {
      console.log('[VPNClientAdvanced] Step completion requested:', stepId);
      
      // Simply mark the step as complete - validation happens only in applyConfiguration$
      const stepIndex = steps.value.findIndex((s) => s.id === stepId);
      if (stepIndex !== -1 && !steps.value[stepIndex].isComplete) {
        steps.value[stepIndex].isComplete = true;
        steps.value = [...steps.value]; // Force re-render
        console.log('[VPNClientAdvanced] Step marked as complete:', stepId);
      }
    });

    // Apply configuration
    const applyConfiguration$ = $(async () => {
      console.log('[VPNClientAdvanced] Starting applyConfiguration');
      
      try {
        const isValid = await validateAdvanced$();
        console.log('[VPNClientAdvanced] Validation result:', isValid);
        
        if (!isValid) {
          console.error("[VPNClientAdvanced] Configuration has validation errors");
          console.log('Validation errors:', Object.keys(advancedHooks.state.validationErrors));
          return;
        }
      } catch (error) {
        console.error("[VPNClientAdvanced] Validation failed with error:", error);
        return;
      }

      // Save VPN client state to StarContext
      try {
        await persistence.syncToStarContext$(advancedHooks.state);
        console.log('[VPNClientAdvanced] State synced to StarContext');
      } catch (error) {
        console.error("[VPNClientAdvanced] Failed to sync state:", error);
        return;
      }

      // Clear persisted state
      await persistence.clearState$();
      console.log('[VPNClientAdvanced] Persisted state cleared');

      // Call completion handler
      if (onComplete$) {
        console.log('[VPNClientAdvanced] Calling completion handler');
        await onComplete$();
      }
      
      console.log('[VPNClientAdvanced] applyConfiguration completed');
    });

    // Manual step completion refresh (called by user actions)
    const refreshStepCompletion$ = $(async () => {
      console.log('[VPNClientAdvanced] Manual step completion refresh requested');
      steps.value = await createSteps();
      console.log('[VPNClientAdvanced] Step completion refreshed');
    });

    // Create step definitions
    const createSteps = $((): CStepMeta[] => {
      // Check if step 1 is complete - minimum VPNs with names and types
      const step1Complete = advancedHooks.state.vpnConfigs.length >= advancedHooks.foreignWANCount &&
                           advancedHooks.state.vpnConfigs.every(vpn => Boolean(vpn.name) && Boolean(vpn.type));
      
      // Check if step 2 (configuration) is complete - all VPNs have valid configurations
      const step2Complete = step1Complete && advancedHooks.state.vpnConfigs.length > 0 &&
                           advancedHooks.state.vpnConfigs.every(vpn => Boolean(vpn.config));
      
      // Check if step 3 (priorities) is complete - VPNs have proper priorities
      const step3Complete = step2Complete && advancedHooks.state.vpnConfigs.length > 0 &&
                           advancedHooks.state.vpnConfigs.every(vpn => Boolean(vpn.priority));
      
      console.log('[VPNClientAdvanced] createSteps - Step completion calculated:', {
        step1Complete,
        step2Complete,
        step3Complete,
        vpnConfigsCount: advancedHooks.state.vpnConfigs.length,
        minVPNCount: advancedHooks.foreignWANCount
      });
      
      const steps: CStepMeta[] = [
        {
          id: 1,
          title: $localize`VPN Protocol Selection`,
          description: $localize`Add and select VPN protocols for Foreign WAN links`,
          component: (
            <Step1_VPNProtocols
              wizardState={advancedHooks.state}
              wizardActions={advancedHooks}
              foreignWANCount={advancedHooks.foreignWANCount}
              onRefreshCompletion$={refreshStepCompletion$}
            />
          ),
          isComplete: step1Complete,
        },
        {
          id: 2,
          title: $localize`VPN Configuration`,
          description: $localize`Configure connection details for each VPN`,
          component: (
            <Step2_VPNConfiguration
              wizardState={advancedHooks.state}
              wizardActions={advancedHooks}
              onRefreshCompletion$={refreshStepCompletion$}
            />
          ),
          isComplete: step2Complete,
        },
        {
          id: 3,
          title: $localize`Strategy & Priority`,
          description: $localize`Configure VPN strategy and set connection priorities`,
          component: (
            <StepPriorities
              wizardState={advancedHooks.state}
              wizardActions={advancedHooks}
            />
          ),
          isComplete: step3Complete,
        },
      ];

      // Add Review step - mark as complete when all previous steps are complete
      const step4Complete = step1Complete && step2Complete && step3Complete;
      
      steps.push({
        id: 4,
        title: $localize`Review & Summary`,
        description: $localize`Review and confirm your VPN configuration`,
        component: (
          <Step3_Summary
            wizardState={advancedHooks.state}
            wizardActions={advancedHooks}
            onEdit$={(step: number) => activeStep.value = step}
            onValidate$={validateAdvanced$}
          />
        ),
        isComplete: step4Complete,
      });

      return steps;
    });

    // Initialize steps
    useTask$(async () => {
      steps.value = await createSteps();
    });

    // Add lightweight step completion tracking (debounced to prevent loops)
    useTask$(({ track, cleanup }) => {
      // Track essential configuration changes only
      track(() => advancedHooks.state.vpnConfigs.map(vpn => ({
        hasName: !!vpn.name,
        hasType: !!vpn.type,
        hasConfig: !!vpn.config,
        isEnabled: vpn.enabled
      })));
      track(() => advancedHooks.foreignWANCount);
      
      // Debounce step refresh to prevent excessive updates
      let timeoutId: ReturnType<typeof setTimeout>;
      
      const refreshSteps = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          console.log('[VPNClientAdvanced] Refreshing steps due to configuration change');
          steps.value = await createSteps();
        }, 300); // 300ms debounce
      };
      
      refreshSteps();
      
      cleanup(() => {
        clearTimeout(timeoutId);
      });
    });

    // Handle step change and refresh step completion
    const handleStepChange$ = $(async (step: number) => {
      activeStep.value = step;
      console.log('[VPNClientAdvanced] Step changed to:', step);
      
      // Refresh step completion status when changing steps
      steps.value = await createSteps();
      console.log('[VPNClientAdvanced] Steps refreshed after step change');
    });

    // Note: handleStepComplete$ is now defined above before createSteps

    return (
      <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div class="mb-8">
            <div class="flex items-center justify-between rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <svg class="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                
                <div>
                  <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
                    {$localize`Advanced VPN Client Configuration`}
                  </h1>
                  <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {$localize`Configure multiple VPN clients with advanced networking features`}
                  </p>
                </div>
              </div>

              {onCancel$ && (
                <button
                  onClick$={onCancel$}
                  class="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {$localize`Cancel`}
                </button>
              )}
            </div>
          </div>

          {/* Stepper Container */}
          <div class="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <CStepper
              steps={steps.value}
              activeStep={activeStep.value}
              onStepChange$={handleStepChange$}
              onStepComplete$={handleStepComplete$}
              onComplete$={applyConfiguration$}
              persistState={false}
              allowSkipSteps={false}
              key={`stepper-${steps.value.map(s => (s.isComplete ? 1 : 0)).join('')}`}
            />
          </div>
        </div>
      </div>
    );
  },
);
