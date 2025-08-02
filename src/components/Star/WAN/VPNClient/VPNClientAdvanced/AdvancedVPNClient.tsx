import {
  component$,
  useContext,
  $,
  useSignal,
  useComputed$,
  useVisibleTask$,
  type QRL,
} from "@builder.io/qwik";
import { CStepper, type CStepMeta } from "~/components/Core/Stepper/CStepper";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { useAdvancedVPN } from "./hooks/useAdvancedVPN";
import { useVPNPersistence } from "./hooks/useVPNPersistence";
import { useVPNValidation } from "./hooks/useVPNValidation";
import { Step1_AddVPNs } from "./steps/Step1_AddVPNs";
import { StepVPNConfig } from "./steps/StepVPNConfig";
import { StepPriorities } from "./steps/StepPriorities";
import { StepSummary } from "./steps/StepSummary";
import { VPNLinksLayout } from "./components/VPNLinksLayout";

export interface AdvancedVPNClientProps {
  onComplete$?: QRL<() => Promise<void>>;
}

export const AdvancedVPNClient = component$<AdvancedVPNClientProps>(
  ({ onComplete$ }) => {
    const starContext = useContext(StarContext);
    const isCommitting = useSignal(false);
    const stepErrors = useSignal<Record<number, string[]>>({});

    // Get foreign WAN count from context
    const foreignWANCount = useComputed$(() => {
      const wanLinks = starContext.state.WAN.WANLinks || [];
      return (
        wanLinks.filter(
          (link) =>
            link.name.toLowerCase().includes("foreign") ||
            link.id.includes("foreign"),
        ).length || 1
      ); // Default to 1 if no foreign links
    });

    // Initialize VPN wizard hooks
    const {
      state: wizardState,
      addVPN$,
      removeVPN$,
      updateVPN$,
      setPriorities$,
      resetVPNs$,
      moveVPNPriority$,
      generateVPNName$,
      minVPNCount,
    } = useAdvancedVPN();

    const { validateVPN$, validateAllVPNs$: validateAll$ } = useVPNValidation();

    // Use persistence hook
    const {
      syncToStarContext$: saveToContext$,
      loadFromStarContext$: loadFromContext$,
    } = useVPNPersistence();

    // Create wizard actions object
    const wizardActions = {
      state: wizardState,
      addVPN$,
      removeVPN$,
      updateVPN$,
      setPriorities$,
      resetVPNs$,
      moveVPNPriority$,
      generateVPNName$,
      minVPNCount,
      validateVPN$,
      validateAll$,
    };

    // Load existing VPN configuration on mount
    useVisibleTask$(async () => {
      const existingState = await loadFromContext$();
      if (existingState && existingState.vpnConfigs.length > 0) {
        // Load existing VPNs into wizard state
        for (const vpn of existingState.vpnConfigs) {
          await addVPN$({
            name: vpn.name || `VPN ${wizardState.vpnConfigs.length + 1}`,
            type: vpn.type || "Wireguard",
            description: vpn.description,
          });
        }
      } else if (wizardState.vpnConfigs.length === 0) {
        // Add minimum required VPNs
        const minCount = foreignWANCount.value;
        for (let i = 0; i < minCount; i++) {
          await addVPN$({
            name: `VPN ${i + 1}`,
            type: "Wireguard",
          });
        }
      }
    });


    // Validate step before proceeding
    const validateStep$ = $(async (stepId: number): Promise<string[]> => {
      const errors: string[] = [];

      switch (stepId) {
        case 1: // Add VPNs step
          if (wizardState.vpnConfigs.length < foreignWANCount.value) {
            errors.push(
              $localize`You need at least ${foreignWANCount.value} VPN(s) for foreign WAN links`,
            );
          }
          if (wizardState.vpnConfigs.some((vpn) => !vpn.name || !vpn.type)) {
            errors.push($localize`All VPNs must have a name and type selected`);
          }
          break;

        case 2: // VPN Configuration steps (dynamic)
          // Validation handled by individual VPN config steps
          break;

        case 3: // Priorities step
          if (
            wizardState.vpnConfigs.length > 1 &&
            (!wizardState.priorities || wizardState.priorities.length === 0)
          ) {
            errors.push($localize`Please set VPN priorities`);
          }
          break;
      }

      return errors;
    });

    // Handle step completion
    const handleStepComplete$ = $(async (stepId: number) => {
      const errors = await validateStep$(stepId);

      if (errors.length > 0) {
        stepErrors.value = { ...stepErrors.value, [stepId]: errors };
        return false;
      }

      // Clear errors for this step
      const newErrors = { ...stepErrors.value };
      delete newErrors[stepId];
      stepErrors.value = newErrors;

      return true;
    });

    // Handle wizard completion
    const handleComplete$ = $(async () => {
      isCommitting.value = true;

      try {
        // Save VPN configuration to context
        await saveToContext$(wizardState);

        // Update Star context with VPN client configuration
        await starContext.updateWAN$({
          VPNClient: {
            mode: starContext.state.WAN.VPNClient?.mode || "advanced",
            vpns: wizardState.vpnConfigs,
            priorities: wizardState.priorities,
          } as any,
        });

        if (onComplete$) {
          await onComplete$();
        }
      } catch (error) {
        console.error("Failed to save VPN configuration:", error);
        stepErrors.value = {
          ...stepErrors.value,
          [99]: [$localize`Failed to save configuration. Please try again.`],
        };
      } finally {
        isCommitting.value = false;
      }
    });

    // Create dynamic steps based on VPN configurations
    const createSteps$ = $(() => {
      const steps: CStepMeta[] = [];

      // Step 1: Add VPNs
      steps.push({
        id: 1,
        title: $localize`Add VPNs`,
        description: $localize`Add and name your VPN configurations`,
        component: (
          <Step1_AddVPNs
            wizardState={wizardState}
            wizardActions={wizardActions}
            foreignWANCount={foreignWANCount.value}
          />
        ),
        isComplete:
          wizardState.vpnConfigs.length >= foreignWANCount.value &&
          wizardState.vpnConfigs.every((vpn) => vpn.name && vpn.type),
      });

      // Step 2-N: Configure each VPN
      wizardState.vpnConfigs.forEach((vpn, index) => {
        steps.push({
          id: 2 + index,
          title: $localize`Configure ${vpn.name || `VPN ${index + 1}`}`,
          description: $localize`Set up ${vpn.type} connection parameters`,
          component: (
            <StepVPNConfig
              vpnId={vpn.id}
              wizardState={wizardState}
              wizardActions={wizardActions}
            />
          ),
          isComplete: false, // Will be validated in step completion handler
        });
      });

      // Priority step (only if more than 1 VPN)
      if (wizardState.vpnConfigs.length > 1) {
        steps.push({
          id: 2 + wizardState.vpnConfigs.length,
          title: $localize`Set Priorities`,
          description: $localize`Order VPNs by priority for failover`,
          component: (
            <StepPriorities
              wizardState={wizardState}
              wizardActions={wizardActions}
            />
          ),
          isComplete:
            wizardState.priorities.length === wizardState.vpnConfigs.length,
        });
      }

      // Summary step
      steps.push({
        id: 3 + wizardState.vpnConfigs.length,
        title: $localize`Review & Complete`,
        description: $localize`Review your VPN configuration`,
        component: (
          <StepSummary
            wizardState={wizardState}
            wizardActions={wizardActions}
            isCommitting={isCommitting.value}
          />
        ),
        isComplete: false,
      });

      return steps;
    });

    const steps = useComputed$(() => createSteps$());

    return (
      <div class="w-full">
        {/* VPN Links Layout Wrapper */}
        <VPNLinksLayout>
          {/* CStepper with dynamic steps */}
          <CStepper
            steps={steps.value}
            onComplete$={handleComplete$}
            onStepComplete$={handleStepComplete$}
            allowSkipSteps={false}
            contextValue={{
              wizardState,
              wizardActions,
              foreignWANCount: foreignWANCount.value,
            }}
          />
        </VPNLinksLayout>

        {/* Global errors */}
        {Object.entries(wizardState.validationErrors)
          .filter(([key]) => key.startsWith("global-"))
          .map(([key, errors]) => (
            <div
              key={key}
              class="mt-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20"
            >
              {errors.map((error, idx) => (
                <p key={idx} class="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              ))}
            </div>
          ))}
      </div>
    );
  },
);
