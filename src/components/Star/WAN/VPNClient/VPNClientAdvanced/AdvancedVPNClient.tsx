import {
  component$,
  $,
  useSignal,
  useTask$,
  useVisibleTask$,
  type QRL,
} from "@builder.io/qwik";
import { CStepper, type CStepMeta } from "~/components/Core/Stepper/CStepper";
import { SegmentedControl } from "~/components/Core";
import { useVPNClientAdvanced } from "./hooks/useVPNClientAdvanced";
import { useVPNClientValidation } from "./hooks/useVPNClientValidation";
import { useVPNClientEnabled } from "../useVPNClientEnabled";
import { Step1_VPNProtocols } from "./steps/Step1_VPNProtocols";
import { StepPriorities } from "./steps/StepPriorities";
import { Step2_VPNConfiguration } from "./steps/Step2_VPNConfiguration";
import { Step3_Summary } from "./steps/Step3_Summary";
import type { L2TPCredentials } from "~/utils/supabaseClient";
// Removed unused VPNClientAdvancedState import

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

    // VPNClient enabled/disabled state
    const { enabled, hasForeignLink, handleToggle$ } = useVPNClientEnabled();

    // Initialize steps signal early
    const steps = useSignal<CStepMeta[]>([]);

    // Track step completion status (following WANInterfaceAdvanced pattern)
    const step1Complete = useSignal(false); // VPN Protocol Selection
    const step2Complete = useSignal(false); // VPN Configuration
    const step3Complete = useSignal(false); // Strategy & Priority

    // Always use advanced mode
    useTask$(() => {
      advancedHooks.state.mode = "advanced";
    });

    // Initialize state on client after first paint to avoid blocking render
    useVisibleTask$(async () => {
      console.log('[AdvancedVPNClient] Initializing VPN Client Advanced component');
      console.log('[AdvancedVPNClient] Initial foreignWANCount:', advancedHooks.foreignWANCount);
      console.log('[AdvancedVPNClient] Initial vpnConfigs length:', advancedHooks.state.vpnConfigs.length);
      
      // Refresh foreign WAN count first to get latest from StarContext
      console.log('[AdvancedVPNClient] Refreshing foreign WAN count...');
      await advancedHooks.refreshForeignWANCount$();
      
      // Initialize with minimum required VPN clients if none exist
      const minCount = advancedHooks.foreignWANCount;
      console.log('[AdvancedVPNClient] After refresh - minCount:', minCount);
      console.log('[AdvancedVPNClient] Current vpnConfigs length:', advancedHooks.state.vpnConfigs.length);
      
      if (advancedHooks.state.vpnConfigs.length === 0) {
        console.log('[AdvancedVPNClient] Adding', minCount, 'VPN clients');
        for (let i = 0; i < minCount; i++) {
          console.log('[AdvancedVPNClient] Adding VPN client', i + 1);
          await advancedHooks.addVPN$({
            name: `VPN ${i + 1}`,
            priority: i + 1 // Ensure proper priority from the start
          });
        }
        console.log('[AdvancedVPNClient] Final vpnConfigs length:', advancedHooks.state.vpnConfigs.length);
        console.log('[AdvancedVPNClient] VPN configs with priorities:', advancedHooks.state.vpnConfigs.map(v => ({ name: v.name, priority: v.priority })));
        
        // Initialize priorities array
        advancedHooks.state.priorities = advancedHooks.state.vpnConfigs.map(vpn => vpn.id);
        console.log('[AdvancedVPNClient] Initialized priorities array:', advancedHooks.state.priorities);
      } else {
        console.log('[AdvancedVPNClient] VPN configs already exist, skipping initialization');
        
        // Ensure existing VPNs have proper priorities
        const needsPriorityFix = advancedHooks.state.vpnConfigs.some(vpn => !vpn.priority);
        if (needsPriorityFix) {
          console.log('[AdvancedVPNClient] Fixing missing priorities for existing VPNs');
          advancedHooks.state.vpnConfigs = advancedHooks.state.vpnConfigs.map((vpn, index) => ({
            ...vpn,
            priority: vpn.priority || index + 1
          }));
        }
        
        // Ensure priorities array is initialized
        if (advancedHooks.state.priorities.length === 0) {
          console.log('[AdvancedVPNClient] Initializing missing priorities array');
          advancedHooks.state.priorities = advancedHooks.state.vpnConfigs.map(vpn => vpn.id);
        }
      }
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

      // Create a new step object to ensure reactivity detects the change
      const stepIndex = steps.value.findIndex((s) => s.id === stepId);
      if (stepIndex !== -1 && !steps.value[stepIndex].isComplete) {
        const updatedSteps = [...steps.value];
        updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], isComplete: true };
        steps.value = updatedSteps;
        console.log('[VPNClientAdvanced] Step marked as complete with new object:', stepId);
      }
    });

    // Apply configuration
    const applyConfiguration$ = $(async () => {
      console.log('[VPNClientAdvanced] Starting applyConfiguration');

      // If VPNClient is disabled, allow immediate completion
      if (enabled.value === "false") {
        console.log('[VPNClientAdvanced] VPNClient disabled, completing immediately');
        if (onComplete$) {
          await onComplete$();
        }
        return;
      }

      try {
        const validationResult = await validation.validateAdvanced$(advancedHooks.state);
        console.log('[VPNClientAdvanced] Full validation result:', validationResult);

        if (!validationResult.isValid) {
          console.error("[VPNClientAdvanced] Configuration has validation errors");
          console.log('Detailed validation errors:', validationResult.errors);
          console.log('Error keys:', Object.keys(validationResult.errors));
          console.log('Error details:', Object.entries(validationResult.errors).map(([key, errors]) => `${key}: ${errors.join(', ')}`));

          // Update state with validation errors for display
          advancedHooks.state.validationErrors = validationResult.errors;
          return;
        }
      } catch (error) {
        console.error("[VPNClientAdvanced] Validation failed with error:", error);
        return;
      }

      console.log('[VPNClientAdvanced] Configuration ready for application');

      // Save configuration to StarContext before completion
      console.log('[VPNClientAdvanced] Saving VPN configuration to StarContext');
      await advancedHooks.syncWithStarContext$();
      console.log('[VPNClientAdvanced] VPN configuration saved to StarContext');

      // Call completion handler
      if (onComplete$) {
        console.log('[VPNClientAdvanced] Calling completion handler');
        await onComplete$();
      }

      console.log('[VPNClientAdvanced] applyConfiguration completed');
    });

    // Forward declaration for refreshStepCompletion$
    // eslint-disable-next-line prefer-const
    let refreshStepCompletion$: QRL<() => Promise<void>>;

    // Handler for promotional L2TP credentials
    const handlePromoL2TP$ = $(async (credentials: L2TPCredentials) => {
      console.log('[AdvancedVPNClient] Handling promotional L2TP credentials');

      // Check if we already have a promotional L2TP VPN
      const hasPromoL2TP = advancedHooks.state.vpnConfigs.some(vpn =>
        vpn.type === "L2TP" && vpn.name.includes("Promotional")
      );

      if (hasPromoL2TP) {
        console.log('[AdvancedVPNClient] Promotional L2TP already exists, skipping');
        return;
      }

      // Create a new L2TP VPN with promotional credentials
      const promoVPNId = `vpn-promo-l2tp-${Date.now()}`;
      const promoVPN = {
        id: promoVPNId,
        name: "Promotional L2TP VPN",
        type: "L2TP" as const,
        enabled: true,
        priority: 1, // Give it highest priority
        weight: 50,
        config: {
          Name: "NASnetConnect",
          Server: {
            Address: credentials.server,
            Port: 1701
          },
          Credentials: {
            Username: credentials.username,
            Password: credentials.password
          },
          UseIPsec: true,
          IPsecSecret: "nasnetconnect", // Default promotional IPsec secret
        },
      };

      // If we have existing VPNs, adjust their priorities
      if (advancedHooks.state.vpnConfigs.length > 0) {
        // Shift all existing VPN priorities down by 1
        advancedHooks.state.vpnConfigs.forEach(vpn => {
          if (vpn.priority) {
            vpn.priority += 1;
          }
        });
      }

      // Add the promotional L2TP VPN
      await advancedHooks.addVPN$(promoVPN);

      console.log('[AdvancedVPNClient] Promotional L2TP VPN added successfully');

      // Refresh step completion status
      if (refreshStepCompletion$) {
        await refreshStepCompletion$();
      }
    });

    // Create step definitions - isComplete values will be updated directly in useTask
    const createSteps = $(async (): Promise<CStepMeta[]> => {
      // Check if we have multiple VPN clients to determine if Strategy & Priority step is needed
      const hasMultipleVPNs = advancedHooks.state.vpnConfigs.length > 1;

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
              onPromoL2TP$={handlePromoL2TP$}
            />
          ),
          isComplete: false, // Will be updated in useTask
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
          isComplete: false, // Will be updated in useTask
        },
      ];

      // Only add Strategy & Priority step when there are multiple VPNs
      if (hasMultipleVPNs) {
        steps.push({
          id: 3,
          title: $localize`Strategy & Priority`,
          description: $localize`Configure VPN strategy and set connection priorities`,
          component: (
            <StepPriorities
              wizardState={advancedHooks.state}
              wizardActions={advancedHooks}
            />
          ),
          isComplete: false, // Will be updated in useTask
          skippable: true,
        });
      }

      // Add Review step - mark as complete when all previous steps are complete
      // Use appropriate step ID based on whether priority step exists
      const reviewStepId = hasMultipleVPNs ? 4 : 3;

      steps.push({
        id: reviewStepId,
        title: $localize`Review & Summary`,
        description: $localize`Review and confirm your VPN configuration`,
        component: (
          <Step3_Summary
            wizardState={advancedHooks.state}
            wizardActions={advancedHooks}
            onEdit$={$((step: number) => {
              activeStep.value = step;
            })}
            onValidate$={validateAdvanced$}
          />
        ),
        isComplete: false, // Will be updated in useTask
        skippable: true,
      });

      return steps;
    });

    // Manual step completion refresh (called by user actions) - following WANInterfaceAdvanced pattern
    refreshStepCompletion$ = $(async () => {
      console.log('[VPNClientAdvanced] Manual step completion refresh requested');

      const hasMultipleVPNs = advancedHooks.state.vpnConfigs.length > 1;

      // Check step 1 completion
      const allVPNsHaveProtocols = advancedHooks.state.vpnConfigs.length >= advancedHooks.foreignWANCount &&
                                   advancedHooks.state.vpnConfigs.every(vpn => Boolean(vpn.name) && Boolean(vpn.type));

      // Check step 2 completion with detailed logging
      let allVPNsConfigured = false;
      if (allVPNsHaveProtocols && advancedHooks.state.vpnConfigs.length > 0) {
        console.log('[VPNClientAdvanced] Manual refresh - Validating all VPNs for step 2 completion...');
        const validationResults = await Promise.all(
          advancedHooks.state.vpnConfigs.map(async (vpn, index) => {
            const isValid = await validation.hasAllMandatoryFields$(vpn);
            console.log(`[VPNClientAdvanced] Manual refresh - VPN ${index + 1} (${vpn.name}) validation result:`, isValid);
            return isValid;
          })
        );
        allVPNsConfigured = validationResults.every(isValid => isValid);
        console.log('[VPNClientAdvanced] Manual refresh - All VPNs configured result:', allVPNsConfigured, 'Individual results:', validationResults);
      }

      // Check step 3 completion (if applicable)
      const allVPNsHavePriorities = hasMultipleVPNs ?
        (allVPNsConfigured && advancedHooks.state.vpnConfigs.length > 0 &&
         advancedHooks.state.vpnConfigs.every(vpn => Boolean(vpn.priority))) :
        true;

      // Update step completion signals
      step1Complete.value = allVPNsHaveProtocols;
      step2Complete.value = allVPNsConfigured;
      step3Complete.value = allVPNsHavePriorities;

      // Directly update steps array - WANAdvanced pattern
      if (steps.value[0]) {
        steps.value[0].isComplete = allVPNsHaveProtocols;
      }

      if (steps.value[1]) {
        steps.value[1].isComplete = allVPNsConfigured;
        console.log('[VPNClientAdvanced] Manual refresh - Step 2 isComplete updated to:', allVPNsConfigured);
      }

      // Update step 3 (Strategy & Priority) if it exists
      if (hasMultipleVPNs && steps.value[2] && steps.value[2].title === $localize`Strategy & Priority`) {
        steps.value[2].isComplete = allVPNsHavePriorities;
      }

      // Update Review step (last step)
      const lastStepIndex = steps.value.length - 1;
      if (steps.value[lastStepIndex]) {
        steps.value[lastStepIndex].isComplete = allVPNsHaveProtocols && allVPNsConfigured && allVPNsHavePriorities;
      }

      // Trigger reactivity - WANAdvanced pattern
      steps.value = [...steps.value];
      console.log('[VPNClientAdvanced] Manual refresh - Steps array updated with reactivity trigger');
      
      console.log('[VPNClientAdvanced] Manual refresh completed - Final states:', {
        step1Complete: step1Complete.value,
        step2Complete: step2Complete.value,
        step3Complete: step3Complete.value
      });
    });

    // Initialize steps
    useTask$(async () => {
      steps.value = await createSteps();
      
      // After initializing steps, trigger an immediate completion check
      console.log('[VPNClientAdvanced] Steps initialized, checking initial completion state...');
      await refreshStepCompletion$();
    });

    // Simple step completion tracking - using WANAdvanced pattern for better reliability
    useTask$(async ({ track, cleanup }) => {
      // Track essential properties like WANAdvanced does
      track(() => advancedHooks.state.vpnConfigs.length);
      track(() => advancedHooks.state.vpnConfigs.map(v => v.name)); // Track VPN names
      track(() => advancedHooks.state.vpnConfigs.map(v => v.type)); // Track VPN types
      track(() => advancedHooks.foreignWANCount);
      
      // Track config fields for Step 2 completion - simplified tracking
      track(() => advancedHooks.state.vpnConfigs.map(vpn => {
        if (vpn.type && 'config' in vpn && vpn.config) {
          const config = vpn.config as any;
          switch (vpn.type) {
            case 'Wireguard':
              return `${vpn.id}:${config.InterfacePrivateKey}:${config.InterfaceAddress}:${config.PeerPublicKey}:${config.PeerEndpointAddress}:${config.PeerEndpointPort}`;
            case 'OpenVPN':
              return `${vpn.id}:${config.Server?.Address}:${config.Server?.Port}:${config.Credentials?.Username}:${config.Credentials?.Password}`;
            case 'L2TP':
              return `${vpn.id}:${config.Server?.Address}:${config.Credentials?.Username}:${config.Credentials?.Password}`;
            case 'IKeV2':
              return `${vpn.id}:${config.ServerAddress}:${config.Credentials?.Username}:${config.Credentials?.Password}`;
            case 'PPTP':
              return `${vpn.id}:${config.ConnectTo}:${config.Credentials?.Username}:${config.Credentials?.Password}`;
            case 'SSTP':
              return `${vpn.id}:${config.Server?.Address}:${config.Credentials?.Username}:${config.Credentials?.Password}`;
            default:
              return `${(vpn as any).id}:incomplete`;
          }
        }
        return `${vpn.id}:no-config`;
      }));
      
      console.log('[VPNClientAdvanced] Step completion tracking triggered');
      
      // Check step 1 completion: All VPNs have names and types
      const allVPNsHaveProtocols = advancedHooks.state.vpnConfigs.length >= advancedHooks.foreignWANCount &&
                                   advancedHooks.state.vpnConfigs.every(vpn => Boolean(vpn.name) && Boolean(vpn.type));

      // Update step 1 signal - following WANAdvanced pattern
      step1Complete.value = allVPNsHaveProtocols;

      // Check step 2 completion: All VPNs have mandatory fields configured
      let allVPNsConfigured = false;
      if (step1Complete.value && advancedHooks.state.vpnConfigs.length > 0) {
        console.log('[VPNClientAdvanced] Checking step 2 completion...');
        const validationResults = await Promise.all(
          advancedHooks.state.vpnConfigs.map(async (vpn, index) => {
            const isValid = await validation.hasAllMandatoryFields$(vpn);
            console.log(`[VPNClientAdvanced] VPN ${index + 1} (${vpn.name}) validation:`, isValid);
            return isValid;
          })
        );
        allVPNsConfigured = validationResults.every(isValid => isValid);
        console.log('[VPNClientAdvanced] All VPNs configured result:', allVPNsConfigured);
      }

      // Update step 2 signal - following WANAdvanced pattern
      step2Complete.value = allVPNsConfigured;

      // Check step 3 completion
      const hasMultipleVPNs = advancedHooks.state.vpnConfigs.length > 1;
      const allVPNsHavePriorities = hasMultipleVPNs ?
        (step2Complete.value && advancedHooks.state.vpnConfigs.length > 0 &&
         advancedHooks.state.vpnConfigs.every(vpn => Boolean(vpn.priority))) :
        true;

      // Update step 3 signal
      step3Complete.value = allVPNsHavePriorities;

      // Immediately update step completion in steps array - WANAdvanced pattern (no debouncing)
      if (steps.value[0]) {
        steps.value[0].isComplete = allVPNsHaveProtocols;
      }
      if (steps.value[1]) {
        steps.value[1].isComplete = allVPNsConfigured;
        console.log('[VPNClientAdvanced] Step 2 isComplete directly set to:', allVPNsConfigured);
      }
      
      // Update step 3 (Strategy & Priority) if it exists
      if (hasMultipleVPNs && steps.value[2] && steps.value[2].title === $localize`Strategy & Priority`) {
        steps.value[2].isComplete = allVPNsHavePriorities;
      }

      // Update Review step (last step)
      const lastStepIndex = steps.value.length - 1;
      if (steps.value[lastStepIndex]) {
        steps.value[lastStepIndex].isComplete = allVPNsHaveProtocols && allVPNsConfigured && allVPNsHavePriorities;
      }

      // Trigger reactivity - WANAdvanced pattern
      steps.value = [...steps.value];
      console.log('[VPNClientAdvanced] Steps array updated with reactivity trigger');
      
      // Handle step structure changes separately (only when VPN count changes)
      let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
      
      const updateStepStructure = async () => {
        // Check if we need to add/remove the Strategy & Priority step
        const currentHasStrategyStep = steps.value.some(s => s.title === $localize`Strategy & Priority`);
        
        // Only recreate steps if structure changes (multi-VPN step added/removed)
        if (hasMultipleVPNs !== currentHasStrategyStep) {
          console.log('[VPNClientAdvanced] Step structure changed, recreating steps');
          steps.value = await createSteps();
        }
      };
      
      // Debounce only structure changes, not completion updates
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        updateStepStructure();
      }, 100);
      
      cleanup(() => {
        if (timeoutId) clearTimeout(timeoutId);
      });
    });

    // Handle step change and refresh step completion
    const handleStepChange$ = $(async (step: number) => {
      activeStep.value = step;
      console.log('[VPNClientAdvanced] Step changed to:', step);

      // Save current state to StarContext when navigating steps (optional)
      // This ensures state is persisted even if user doesn't complete the wizard
      await advancedHooks.syncWithStarContext$();

      // Call refreshStepCompletion$ instead of recreating steps
      await refreshStepCompletion$();
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

              {/* Right side: Toggle + Cancel button */}
              <div class="flex items-center gap-4">
                {/* VPN Client Enable/Disable Toggle (only shown when no Foreign Link) */}
                {!hasForeignLink.value && (
                  <SegmentedControl
                    value={enabled}
                    options={[
                      { value: "false", label: $localize`Disabled` },
                      { value: "true", label: $localize`Enabled` }
                    ]}
                    onChange$={handleToggle$}
                    size="sm"
                    color="primary"
                  />
                )}

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
          </div>

          {/* Stepper Container or Disabled Message */}
          <div class="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            {enabled.value === "true" ? (
              <CStepper
                steps={steps.value}
                activeStep={activeStep.value}
                onStepChange$={handleStepChange$}
                onStepComplete$={handleStepComplete$}
                onComplete$={applyConfiguration$}
                hideStepHeader={true}
                disableAutoFocus={true}
              />
            ) : (
              <div class="p-12 text-center">
                <div class="flex justify-center mb-6">
                  <div class="rounded-full bg-gray-200 dark:bg-gray-700 p-6">
                    <svg
                      class="h-12 w-12 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {$localize`VPN Client is Disabled`}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                  {$localize`Enable VPN Client above to configure multiple VPN connections with advanced features.`}
                </p>
                <button
                  onClick$={applyConfiguration$}
                  class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                  {$localize`Continue`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
