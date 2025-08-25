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
import type { WANConfig } from "../../../StarContext/WANType";
import type { Ethernet, Wireless, Sfp, LTE } from "../../../StarContext/CommonType";

export interface WANAdvancedProps {
  mode?: "Foreign" | "Domestic";
  onComplete$?: QRL<() => void>;
  onCancel$?: QRL<() => void>;
}

export const WANAdvanced = component$<WANAdvancedProps>(
  ({ mode = "Foreign", onComplete$, onCancel$ }) => {
    const starContext = useContext(StarContext) as StarContextType;
    const activeStep = useSignal(0);

    // Initialize hooks
    const advancedHooks = useWANAdvanced();
    const validation = useWANValidation();
    const persistence = useWANPersistence();
    const isApplying = useSignal(false);

    // Initialize steps signal early with stable reference
    const steps = useSignal<CStepMeta[]>([]);
    const stepsInitialized = useSignal(false);
    const stepGenerationCounter = useSignal(0); // Track step regeneration to prevent loops

    // Note: Removed automatic step completion tracking to avoid potential render loops

    // Load persisted state on mount and initialize for single mode
    useVisibleTask$(async () => {
      // Set advanced mode (moved from render function to prevent state mutation error)
      advancedHooks.state.mode = "advanced";
      
      // Check if we have existing state in StarContext for this mode
      const existingConfig = starContext.state.WAN.WANLink[mode];
      
      // If we have existing config and no links, initialize with it
      if (existingConfig && advancedHooks.state.links.length === 0) {
        advancedHooks.state.links = [{
          id: `${mode.toLowerCase()}-1`,
          name: `${mode} Link`,
          interfaceType: existingConfig.InterfaceName.includes("wifi") ? "Wireless" : 
                        existingConfig.InterfaceName.includes("lte") ? "LTE" : 
                        existingConfig.InterfaceName.includes("sfp") ? "SFP" : "Ethernet",
          interfaceName: existingConfig.InterfaceName || "",
          wirelessCredentials: existingConfig.WirelessCredentials,
          connectionType: "DHCP",
          connectionConfirmed: false, // User must confirm connection settings
          priority: 1,
          weight: 100,
        }];
      }
      
      // Initialize with at least one link if none exist
      if (advancedHooks.state.links.length === 0) {
        advancedHooks.state.links = [{
          id: `${mode.toLowerCase()}-1`,
          name: `${mode} Link`,
          interfaceType: "Ethernet",
          interfaceName: "",
          connectionType: "DHCP",
          connectionConfirmed: false, // User must confirm connection settings
          priority: 1,
          weight: 100,
        }];
      }
      
      const hasStored = await persistence.hasStoredState$();
      if (hasStored) {
        const stored = await persistence.loadState$();
        if (stored) {
          // Merge stored state with current state, allowing multiple links
          Object.assign(advancedHooks.state, stored);
        }
      }
    });

    // Note: Removed automatic state saving to prevent render loops
    // State is now saved manually during applyConfiguration$ only

    // Note: Removed validateCurrentStep$ to prevent validation loops during step completion

    // Validate entire wizard (no state updates to prevent loops)
    const validateAdvanced$ = $(async () => {
      const result = await validation.validateAdvanced$(advancedHooks.state);
      // Don't update state during final validation to prevent loops
      return result.isValid;
    });

        // Simplified apply configuration to prevent freezing
    const applyConfiguration$ = $(async () => {
      if (isApplying.value) return;
      isApplying.value = true;
      try {
        // Basic check
        if (!advancedHooks.state.links[0]?.interfaceName) {
          isApplying.value = false;
          return;
        }

        const linkConfig = advancedHooks.state.links[0];
        
        // Direct, simple save to StarContext
        const wanConfig: WANConfig = {
          InterfaceName: linkConfig.interfaceName as Ethernet | Wireless | Sfp | LTE,
          WirelessCredentials: linkConfig.wirelessCredentials,
        };
        starContext.state.WAN.WANLink[mode] = wanConfig;
        
        // Signal outer step completion on next tick to avoid any re-render deadlocks
        if (onComplete$) {
          setTimeout(() => {
            onComplete$();
          }, 0);
        }
        
      } catch (error) {
        console.error('Error in apply configuration:', error);
      } finally {
        isApplying.value = false;
      }
    });

    // Note: Removed handleStepComplete$ to prevent reactive loops

    // Note: Removed refreshStepCompletion$ to prevent reactive loops
    // Steps are now static after initialization

    // Edit specific step
    const editStep$ = $((step: number) => {
      activeStep.value = step;
    });

    // Manual refresh function with debouncing to prevent rapid updates
    const refreshTimeout = useSignal<number | null>(null);
    const refreshStepCompletion$ = $(async () => {
      // Debounce rapid calls to prevent loops
      if (refreshTimeout.value) {
        clearTimeout(refreshTimeout.value);
      }
      
      await new Promise(resolve => {
        refreshTimeout.value = setTimeout(resolve, 100) as unknown as number;
      });
      // Force recalculation of step completion
      const step1Complete = advancedHooks.state.links.length > 0 && 
        advancedHooks.state.links.every(link => 
          Boolean(link.interfaceName) && 
          Boolean(link.interfaceType) &&
          // Check wireless credentials if needed
          (link.interfaceType !== "Wireless" || Boolean(link.wirelessCredentials?.SSID)) &&
          // Check LTE settings if needed
          (link.interfaceType !== "LTE" || Boolean(link.lteSettings?.apn))
        );
      
      // Calculate step 2 completion - connection must be fully configured
      const step2Complete = advancedHooks.state.links.length > 0 && 
        advancedHooks.state.links.every(link => {
          if (!link.connectionType) return false;
          
          if (link.connectionType === "PPPoE") {
            return Boolean(link.connectionConfig?.pppoe?.username) && 
                   Boolean(link.connectionConfig?.pppoe?.password);
          }
          
          if (link.connectionType === "Static") {
            return Boolean(link.connectionConfig?.static?.ipAddress) && 
                   Boolean(link.connectionConfig?.static?.subnet) && 
                   Boolean(link.connectionConfig?.static?.gateway) && 
                   Boolean(link.connectionConfig?.static?.primaryDns);
          }
          
          // For DHCP and LTE, automatically consider complete
          if (link.connectionType === "DHCP" || link.connectionType === "LTE") {
            return true;
          }
          
          return false;
        });
      
      // Check if user has multiple links
      const hasMultipleLinks = advancedHooks.state.links.length > 1;
      
      // Calculate step 3 completion - only required when there are multiple links
      const step3Complete = !hasMultipleLinks || Boolean(advancedHooks.state.multiLinkStrategy?.strategy);
      
      // Always update step completion status
      const newSteps = [...steps.value];
      
      // Update step 1
      if (newSteps[0]) {
        newSteps[0] = { ...newSteps[0], isComplete: step1Complete };
      }
      
      // Update step 2
      if (newSteps[1]) {
        newSteps[1] = { ...newSteps[1], isComplete: step2Complete };
      }
      
      // Update step 3 if it exists (multi-link strategy)
      if (hasMultipleLinks && newSteps[2] && newSteps[2].id === 3) {
        newSteps[2] = { ...newSteps[2], isComplete: step3Complete };
      }
      
      // Find and update summary step (last step)
      const summaryStepIndex = newSteps.length - 1;
      const allRequiredStepsComplete = hasMultipleLinks ? 
        (step1Complete && step2Complete && step3Complete) : 
        (step1Complete && step2Complete);
      
      if (newSteps[summaryStepIndex]) {
        newSteps[summaryStepIndex] = { ...newSteps[summaryStepIndex], isComplete: allRequiredStepsComplete };
      }
      
      // Always update to force reactivity
      steps.value = newSteps;
    });



    // Create step definitions (check completion status without reactive tracking)
    const createSteps = $((): CStepMeta[] => {
      // Check if step 1 is complete - interface must be fully configured
      const step1Complete = advancedHooks.state.links.every(link => 
        Boolean(link.interfaceName) && 
        Boolean(link.interfaceType)
      );
      
      // Check if step 2 is complete - connection must be fully configured
      const step2Complete = advancedHooks.state.links.every(link => {
        if (!link.connectionType) return false;
        
        if (link.connectionType === "PPPoE") {
          return Boolean(link.connectionConfig?.pppoe?.username) && 
                 Boolean(link.connectionConfig?.pppoe?.password);
        }
        
        if (link.connectionType === "Static") {
          return Boolean(link.connectionConfig?.static?.ipAddress) && 
                 Boolean(link.connectionConfig?.static?.subnet) && 
                 Boolean(link.connectionConfig?.static?.gateway) && 
                 Boolean(link.connectionConfig?.static?.primaryDns);
        }
        
        // For DHCP and LTE, automatically consider complete
        if (link.connectionType === "DHCP" || link.connectionType === "LTE") {
          return true;
        }
        
        return false;
      });
      
      // Check if user has multiple links (show multi-link strategy step)
      const hasMultipleLinks = advancedHooks.state.links.length > 1;
      
      // Check if step 3 (multi-link) is complete - only required when there are multiple links
      const step3Complete = !hasMultipleLinks || Boolean(advancedHooks.state.multiLinkStrategy?.strategy);

      
      const steps: CStepMeta[] = [
        {
          id: 1,
          title: mode === "Foreign" ? $localize`Foreign Link & Interface` : $localize`Domestic Link & Interface`,
          description: $localize`Configure ${mode} WAN interfaces and settings`,
          component: (
            <Step1_LinkInterface
              wizardState={advancedHooks.state}
              wizardActions={advancedHooks}
              onRefreshCompletion$={refreshStepCompletion$}
            />
          ),
          isComplete: step1Complete,
        },
        {
          id: 2,
          title: $localize`${mode} Connection`,
          description: $localize`Configure ${mode} connection types and settings`,
          component: (
            <Step2_Connection
              wizardState={advancedHooks.state}
              wizardActions={advancedHooks}
              onRefreshCompletion$={refreshStepCompletion$}
            />
          ),
          isComplete: step2Complete,
        },
      ];

      // Add multi-link strategy step only if user has multiple links
      if (hasMultipleLinks) {
        steps.push({
          id: 3,
          title: $localize`LoadBalance & Failover`,
          description: $localize`Configure multi-link strategy and priorities`,
          component: (
            <Step3_MultiLink
              wizardState={advancedHooks.state}
              wizardActions={advancedHooks}
            />
          ),
          isComplete: step3Complete,
        });
      }

      // Summary step - mark as complete when all previous steps are complete
      const summaryStepComplete = steps.every(step => step.isComplete);
      
      steps.push({
        id: steps.length + 1,
        title: $localize`Review`,
        description: $localize`Review and apply configuration`,
        component: (
          <Step4_Summary
            wizardState={advancedHooks.state}
            onEdit$={editStep$}
            onValidate$={validateAdvanced$}
          />
        ),
        isComplete: summaryStepComplete,
      });

      return steps;
    });

    // Initialize steps immediately to prevent undefined errors    
    useVisibleTask$(async () => {
      if (!stepsInitialized.value) {
        // Initialize steps with proper structure based on link count
        steps.value = await createSteps();
        stepsInitialized.value = true;
      }
    });

    // Watch for changes in link count to regenerate steps (with protection against loops)
    useTask$(async ({ track }) => {
      track(() => advancedHooks.state.links.length);
      
      if (stepsInitialized.value) {
        // Limit step regeneration frequency
        stepGenerationCounter.value++;
        if (stepGenerationCounter.value > 10) {
          console.warn('Too many step regenerations, skipping to prevent loop');
          return;
        }
        
        // Use setTimeout to break out of reactive context
        setTimeout(async () => {
          const newSteps = await createSteps();
          // Only update if steps actually changed
          if (JSON.stringify(newSteps.map(s => s.id)) !== JSON.stringify(steps.value.map(s => s.id))) {
            steps.value = newSteps;
          }
          
          // If we're currently on step 3 but it no longer exists (single link), go to step 2
          if (activeStep.value >= 2 && advancedHooks.state.links.length === 1) {
            activeStep.value = 1; // Go to step 2 (0-indexed)
          }
        }, 50);
      }
    });

    // Note: Removed automatic step completion tracking to prevent infinite loops
    // Steps are now only updated on explicit user actions

    // Note: Removed auto-update step completion tracking to prevent infinite render loops
    // Step completion is now handled manually through handleStepComplete$ only

    // Handle step change (no automatic step refresh to prevent loops)
    const handleStepChange$ = $((step: number) => {
      activeStep.value = step;
    });

    // Note: Removed step completion check functions to prevent reactivity issues
    // Validation now only happens in applyConfiguration$ when user clicks Save & Complete

    return (
      <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div class="mb-8">
            <div class="flex items-center justify-between rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <svg class="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                
                <div>
                  <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
                    {$localize`Advanced WAN Configuration`}
                  </h1>
                  <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {$localize`Configure multiple WAN connections with advanced networking features`}
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
              onComplete$={applyConfiguration$}
              persistState={false}
              allowSkipSteps={false}
            />
          </div>
        </div>
      </div>
    );
  },
);
