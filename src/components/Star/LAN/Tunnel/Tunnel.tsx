import { component$, $, useComputed$ } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { useTunnel } from "./useTunnel";
import { TunnelHeader } from "./TunnelHeader";
import { CStepper, type CStepMeta, createStepperContext } from "~/components/Core/Stepper/CStepper";
import { TunnelProtocolStep } from "./Steps/TunnelProtocolStep";
import { IPIPTunnelStep } from "./Steps/IPIPTunnelStep";
import { EOIPTunnelStep } from "./Steps/EOIPTunnelStep";
import { GRETunnelStep } from "./Steps/GRETunnelStep";
import { VXLANTunnelStep } from "./Steps/VXLANTunnelStep";
import { TunnelSummaryStep } from "./Steps/TunnelSummaryStep";
import type { PropFunction } from "@builder.io/qwik";
import type { TunnelStepperData } from "./types";
import { ActionFooter } from "./ActionFooter";

// Create a typed context for Tunnel
export const TunnelContextId = createStepperContext<TunnelStepperData>("tunnel-stepper-context");

export const Tunnel = component$<StepProps>(({ onComplete$, onDisabled$ }) => {
  const {
    tunnelsEnabled,
    ipipTunnels,
    eoipTunnels,
    greTunnels,
    vxlanTunnels,
    saveTunnels,
    isValid,
  } = useTunnel();

  // Define saveSettings function wrapper
  const saveSettings$ = $((onComplete?: PropFunction<() => void>) => saveTunnels(onComplete));

  // Create steps for stepper with JSX components directly
  const steps = useComputed$<CStepMeta[]>(() => {
    return [
      {
        id: 0,
        title: $localize`Select Protocol`,
        description: $localize`Choose the tunnel protocol you want to configure.`,
        component: (
          <TunnelProtocolStep />
        ),
        isComplete: false,
      },
      {
        id: 1,
        title: $localize`IPIP Tunnels`,
        description: $localize`Configure IP over IP tunnels to connect remote networks.`,
        component: (
          <IPIPTunnelStep />
        ),
        isComplete: true, // Step completion is managed in the step component
      },
      {
        id: 2,
        title: $localize`EOIP Tunnels`,
        description: $localize`Configure Ethernet over IP tunnels for bridging remote Ethernet segments.`,
        component: (
          <EOIPTunnelStep />
        ),
        isComplete: true, // Step completion is managed in the step component
      },
      {
        id: 3,
        title: $localize`GRE Tunnels`,
        description: $localize`Configure Generic Routing Encapsulation tunnels.`,
        component: (
          <GRETunnelStep />
        ),
        isComplete: true, // Step completion is managed in the step component
      },
      {
        id: 4,
        title: $localize`VXLAN Tunnels`,
        description: $localize`Configure Virtual Extensible LAN tunnels for scaling network overlays.`,
        component: (
          <VXLANTunnelStep />
        ),
        isComplete: true, // Step completion is managed in the step component
      },
      {
        id: 5,
        title: $localize`Summary`,
        description: $localize`Review your tunnel configuration before saving.`,
        component: (
          <TunnelSummaryStep />
        ),
        isComplete: false, // Completion is managed in the step component
      },
    ];
  });

  // Handle completion of all steps
  const handleComplete$ = $(() => {
    saveSettings$(onComplete$);
  });

  // Create context data
  const contextData: TunnelStepperData = {
    tunnelEnabled: tunnelsEnabled,
    ipip: ipipTunnels,
    eoip: eoipTunnels,
    gre: greTunnels,
    vxlan: vxlanTunnels,
  };

  return (
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="space-y-8">
        {/* Header with enable/disable toggle */}
        <TunnelHeader 
          tunnelsEnabled={tunnelsEnabled} 
          onToggle$={$(async (enabled: boolean) => {
            if (!enabled && onDisabled$) {
              await onDisabled$();
            }
          })}
        />

        {/* Message when tunnels are disabled */}
        {!tunnelsEnabled.value ? (
          <div class="space-y-4">
            <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-800">
              <p class="text-gray-700 dark:text-gray-300">
                {$localize`Network tunneling is currently disabled. Enable it using the toggle above to configure tunnel settings.`}
              </p>
            </div>
            <ActionFooter 
              saveDisabled={!isValid.value}
              onSave$={() => saveSettings$(onComplete$)}
              saveText={$localize`Save`}
            />
          </div>
        ) : (
          /* Stepper - only shown when tunnels are enabled */
          <CStepper
            steps={steps.value}
            onComplete$={handleComplete$}
            contextId={TunnelContextId}
            contextValue={contextData}
            allowNonLinearNavigation={true}
          />
        )}
      </div>
    </div>
  );
}); 