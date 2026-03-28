import { component$, $, useComputed$ } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { useTunnel } from "./useTunnel";
import { TunnelHeader } from "./TunnelHeader";
import {
  CStepper,
  type CStepMeta,
  createStepperContext,
} from "~/components/Core/Stepper/CStepper";
import { TunnelProtocolStep } from "./Steps/TunnelProtocolStep";
import { IPIPTunnelStep } from "./Steps/IPIPTunnelStep";
import { EOIPTunnelStep } from "./Steps/EOIPTunnelStep";
import { GRETunnelStep } from "./Steps/GRETunnelStep";
import { VXLANTunnelStep } from "./Steps/VXLANTunnelStep";
import { TunnelSummaryStep } from "./Steps/TunnelSummaryStep";
import type { PropFunction } from "@builder.io/qwik";
import type { TunnelStepperData } from "./types";
import { ActionFooter } from "./ActionFooter";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

// Create a typed context for Tunnel
export const TunnelContextId = createStepperContext<TunnelStepperData>(
  "tunnel-stepper-context",
);

export const Tunnel = component$<StepProps>(({ onComplete$, onDisabled$ }) => {
  const locale = useMessageLocale();
  const {
    tunnelsEnabled,
    ipipTunnels,
    eoipTunnels,
    greTunnels,
    vxlanTunnels,
    saveTunnels,
  } = useTunnel();

  // Define saveSettings function wrapper
  const saveSettings$ = $((onComplete?: PropFunction<() => void>) =>
    saveTunnels(onComplete),
  );

  // Create steps for stepper with JSX components directly
  const steps = useComputed$<CStepMeta[]>(() => {
    return [
      {
        id: 0,
        title: semanticMessages.tunnel_step_select_protocol({}, { locale }),
        description: semanticMessages.tunnel_step_select_protocol_description(
          {},
          { locale },
        ),
        component: <TunnelProtocolStep />,
        isComplete: false,
      },
      {
        id: 1,
        title: semanticMessages.tunnel_step_ipip({}, { locale }),
        description: semanticMessages.tunnel_step_ipip_description(
          {},
          {
            locale,
          },
        ),
        component: <IPIPTunnelStep />,
        isComplete: true, // Step completion is managed in the step component
      },
      {
        id: 2,
        title: semanticMessages.tunnel_step_eoip({}, { locale }),
        description: semanticMessages.tunnel_step_eoip_description(
          {},
          {
            locale,
          },
        ),
        component: <EOIPTunnelStep />,
        isComplete: true, // Step completion is managed in the step component
      },
      {
        id: 3,
        title: semanticMessages.tunnel_step_gre({}, { locale }),
        description: semanticMessages.tunnel_step_gre_description(
          {},
          {
            locale,
          },
        ),
        component: <GRETunnelStep />,
        isComplete: true, // Step completion is managed in the step component
      },
      {
        id: 4,
        title: semanticMessages.tunnel_step_vxlan({}, { locale }),
        description: semanticMessages.tunnel_step_vxlan_description(
          {},
          {
            locale,
          },
        ),
        component: <VXLANTunnelStep />,
        isComplete: true, // Step completion is managed in the step component
      },
      {
        id: 5,
        title: semanticMessages.tunnel_step_summary({}, { locale }),
        description: semanticMessages.tunnel_step_summary_description(
          {},
          {
            locale,
          },
        ),
        component: <TunnelSummaryStep />,
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
                {semanticMessages.tunnel_disabled_message({}, { locale })}
              </p>
            </div>
            <ActionFooter
              saveDisabled={false}
              onSave$={$(async () => {
                await saveSettings$(onComplete$);
              })}
              saveText={semanticMessages.shared_save({}, { locale })}
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
