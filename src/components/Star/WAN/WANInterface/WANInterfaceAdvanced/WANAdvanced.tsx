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
// import type { WANLink } from "./types";

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
    const advancedHooks = useWANAdvanced(mode);
    const validation = useWANValidation();
    const isApplying = useSignal(false);

    // Initialize steps signal early with stable reference
    const steps = useSignal<CStepMeta[]>([]);
    const stepsInitialized = useSignal(false);
    
    // Track step completion status
    const step1Complete = useSignal(false); // Link & Interface
    const step2Complete = useSignal(false); // Connection

    // Note: Removed automatic step completion tracking to avoid potential render loops

    // Load persisted state on mount and initialize for single mode
    useVisibleTask$(async () => {
      // Set advanced mode (moved from render function to prevent state mutation error)
      advancedHooks.state.mode = "advanced";
      
      // Check if we have existing state in StarContext for this mode
      const existingConfig = starContext.state.WAN.WANLink[mode];
      
      // If we have existing config and no links, initialize with it
      if (existingConfig?.WANConfigs?.[0] && advancedHooks.state.links.length === 0) {
        const interfaceConfig = existingConfig.WANConfigs[0].InterfaceConfig;
        advancedHooks.state.links = [{
          id: `${mode.toLowerCase()}-1`,
          name: `${mode} Link`,
          interfaceType: interfaceConfig.InterfaceName.includes("wifi") ? "Wireless" : 
                        interfaceConfig.InterfaceName.includes("lte") ? "LTE" : 
                        interfaceConfig.InterfaceName.includes("sfp") ? "SFP" : "Ethernet",
          interfaceName: interfaceConfig.InterfaceName || "",
          InterfaceConfig: interfaceConfig,
          connectionConfirmed: false, // User must confirm connection settings
          priority: 1,
          weight: 100, // Single link gets 100% weight
        }];
      }
      
      // Initialize with at least one link if none exist
      if (advancedHooks.state.links.length === 0) {
        advancedHooks.state.links = [{
          id: `${mode.toLowerCase()}-1`,
          name: `${mode} Link`,
          interfaceType: "Ethernet",
          interfaceName: "",
          connectionConfirmed: false, // User must confirm connection settings
          priority: 1,
          weight: 100, // Single link gets 100% weight
          InterfaceConfig: {
            InterfaceName: "ether1"
          },
        }];
      }
      
      // Ensure all links have weights and priorities set
      advancedHooks.state.links = advancedHooks.state.links.map((link, index) => ({
        ...link,
        priority: link.priority ?? index + 1,
        weight: link.weight ?? (advancedHooks.state.links.length === 1 ? 100 : Math.floor(100 / advancedHooks.state.links.length))
      }));
      
      // Note: WANLinks property doesn't exist in StarContext, using WANLink structure instead
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
        // Basic validation check
        if (!advancedHooks.state.links[0]?.interfaceName) {
          console.warn('Cannot apply configuration: No interface selected');
          return;
        }

        // Use syncWithStarContext$ to save with proper data mapping
        await advancedHooks.syncWithStarContext$();

        // Call onComplete$ directly without setTimeout to prevent timing issues
        if (onComplete$) {
          await onComplete$();
        }

      } catch (error) {
        console.error('Error in apply configuration:', error);
        // Re-throw to let the UI handle the error appropriately
        throw error;
      } finally {
        // Always reset the applying flag
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



    // Create step definitions - simplified to avoid complex reactive dependencies
    const createSteps = $((): CStepMeta[] => {
      // Simple checks without complex reactive tracking
      const hasMultipleLinks = advancedHooks.state.links.length > 1;
      
      const steps: CStepMeta[] = [
        {
          id: 1,
          title: mode === "Foreign" ? $localize`Foreign Link & Interface` : $localize`Domestic Link & Interface`,
          description: $localize`Configure ${mode} WAN interfaces and settings`,
          component: (
            <Step1_LinkInterface
              wizardState={advancedHooks.state}
              wizardActions={advancedHooks}
            />
          ),
          isComplete: step1Complete.value,
        },
        {
          id: 2,
          title: $localize`${mode} Connection`,
          description: $localize`Configure ${mode} connection types and settings`,
          component: (
            <Step2_Connection
              wizardState={advancedHooks.state}
              wizardActions={advancedHooks}
            />
          ),
          isComplete: step2Complete.value,
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
          isComplete: true, // Allow navigation between steps
          skippable: true,
          isOptional: true,
          isDisabled: !step1Complete.value || !step2Complete.value,
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
          />
        ),
        isComplete: true, // Allow navigation between steps
        skippable: true,
        isOptional: true,
        isDisabled: !step1Complete.value || !step2Complete.value,
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

    // Watch for changes and check step completion status
    // Only track essential properties to prevent unnecessary updates
    useTask$(async ({ track, cleanup }) => {
      // Track only essential properties that affect step structure
      track(() => advancedHooks.state.links.length);
      track(() => advancedHooks.state.links.map(l => l.interfaceName)); // Track interface selection
      track(() => advancedHooks.state.links.map(l => l.connectionType)); // Track connection type
      track(() => advancedHooks.state.links.map(l => l.connectionConfirmed)); // Track connection confirmation
      
      // Don't track weight/priority changes as they don't affect step structure
      // Weight and priority tracking removed to prevent infinite loops
      
      // Check step 1 completion: All links have interfaces selected
      const allLinksHaveInterfaces = advancedHooks.state.links.length > 0 &&
        advancedHooks.state.links.every(link => link.interfaceName);

      // Save to StarContext when step 1 is completed for the first time
      const prevStep1Complete = step1Complete.value;
      step1Complete.value = allLinksHaveInterfaces;
      if (!prevStep1Complete && allLinksHaveInterfaces) {
        await advancedHooks.syncWithStarContext$();
      }

      // Immediately update step 1's isComplete property for responsive UI
      if (steps.value[0]) {
        steps.value[0].isComplete = allLinksHaveInterfaces;
        steps.value = [...steps.value]; // Trigger reactivity
      }

      // Check step 2 completion: All links have connection type selected and confirmed
      const allLinksHaveConnectionConfirmed = advancedHooks.state.links.length > 0 &&
        advancedHooks.state.links.every(link => link.connectionType && link.connectionConfirmed);

      // Save to StarContext when step 2 is completed for the first time
      const prevStep2Complete = step2Complete.value;
      step2Complete.value = allLinksHaveConnectionConfirmed;
      if (!prevStep2Complete && allLinksHaveConnectionConfirmed) {
        await advancedHooks.syncWithStarContext$();
      }

      // Immediately update step 2's isComplete property for responsive UI
      if (steps.value[1]) {
        steps.value[1].isComplete = allLinksHaveConnectionConfirmed;
      }
      
      // Update optional Step 3 (MultiLink) if it exists - always allow navigation
      if (steps.value[2] && advancedHooks.state.links.length > 1) {
        steps.value[2].isDisabled = !allLinksHaveInterfaces || !allLinksHaveConnectionConfirmed;
      }
      
      // Update Review step (last step) if it exists
      const lastStepIndex = steps.value.length - 1;
      if (steps.value[lastStepIndex] && steps.value[lastStepIndex].title?.includes('Review')) {
        steps.value[lastStepIndex].isDisabled = !allLinksHaveInterfaces || !allLinksHaveConnectionConfirmed;
      }
      
      // Trigger reactivity after all updates
      steps.value = [...steps.value];
      
      // Add debouncing to prevent rapid step updates
      let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
      
      const updateSteps = async () => {
        if (stepsInitialized.value) {
          // Check if we need to add/remove the multi-link step
          const hasMultipleLinks = advancedHooks.state.links.length > 1;
          const currentHasMultiLink = steps.value.some(s => s.title?.includes('LoadBalance'));
          
          // Only recreate steps if structure changes (multi-link step added/removed)
          if (hasMultipleLinks !== currentHasMultiLink) {
            const newSteps = await createSteps();
            steps.value = newSteps;
            
            // If we're currently on step 3 but it no longer exists (single link), go to step 2
            if (activeStep.value >= 2 && advancedHooks.state.links.length === 1) {
              activeStep.value = 1; // Go to step 2 (0-indexed)
            }
          } else {
            // Only update completion status without recreating components
            // This prevents re-mounting of Step3_MultiLink
            const newCompletions = {
              step1: advancedHooks.state.links.length > 0 && 
                     advancedHooks.state.links.every(link => link.interfaceName),
              step2: advancedHooks.state.links.length > 0 && 
                     advancedHooks.state.links.every(link => link.connectionType && link.connectionConfirmed)
            };
            
            // Update step 1 completion
            if (steps.value[0]) {
              steps.value[0].isComplete = newCompletions.step1;
            }
            
            // Update step 2 completion
            if (steps.value[1]) {
              steps.value[1].isComplete = newCompletions.step2;
            }
            
            // Update optional steps' disabled state
            for (let i = 2; i < steps.value.length; i++) {
              if (steps.value[i]) {
                steps.value[i].isDisabled = !newCompletions.step1 || !newCompletions.step2;
              }
            }
            
            // Trigger minimal reactivity update
            steps.value = [...steps.value];
          }
          
          // Note: WANLinks array doesn't exist in StarContext
        }
      };
      
      // Debounce the update with 500ms delay to prevent rapid updates
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        updateSteps();
      }, 500);
      
      cleanup(() => {
        if (timeoutId) clearTimeout(timeoutId);
      });
    });

    // Note: Removed automatic step completion tracking to prevent infinite loops
    // Steps are now only updated on explicit user actions

    // Note: Removed auto-update step completion tracking to prevent infinite render loops
    // Step completion is now handled manually through handleStepComplete$ only

    // Handle step change (no automatic step refresh to prevent loops)
    const handleStepChange$ = $(async (step: number) => {
      // Save current state to StarContext when navigating steps
      await advancedHooks.syncWithStarContext$();
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
              hideStepHeader={true}
              disableAutoFocus={true}
            />
          </div>
        </div>
      </div>
    );
  },
);
