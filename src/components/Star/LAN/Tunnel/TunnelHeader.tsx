import { component$, type Signal, type QRL, useSignal, useTask$, $ } from "@builder.io/qwik";
import {
  HiCubeTransparentOutline,
  HiCheckCircleOutline,
  HiXCircleOutline,
} from "@qwikest/icons/heroicons";
import { SegmentedControl } from "~/components/Core";

interface TunnelHeaderProps {
  tunnelsEnabled: Signal<boolean>;
  onToggle$?: QRL<(enabled: boolean) => void>;
}

export const TunnelHeader = component$<TunnelHeaderProps>(
  ({ tunnelsEnabled, onToggle$ }) => {
    // Create a string signal for SegmentedControl
    const tunnelState = useSignal(tunnelsEnabled.value ? "enable" : "disable");
    
    // Sync the string signal with the boolean signal
    useTask$(({ track }) => {
      track(() => tunnelsEnabled.value);
      tunnelState.value = tunnelsEnabled.value ? "enable" : "disable";
    });
    
    return (
      <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div class="flex items-center gap-4">
          <div class="rounded-xl bg-primary-100 p-3 dark:bg-primary-900/30">
            <HiCubeTransparentOutline class="h-8 w-8 text-primary-500 dark:text-primary-400" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              {$localize`Network Tunnels Setup`}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              {$localize`Configure network tunnels for connecting remote networks`}
            </p>
          </div>
        </div>

        {/* Enable/Disable Toggle using SegmentedControl */}
        <SegmentedControl
          value={tunnelState}
          options={[
            { 
              value: "disable", 
              label: $localize`Disable`,
              icon: <HiXCircleOutline class="h-5 w-5" /> as any
            },
            { 
              value: "enable", 
              label: $localize`Enable`,
              icon: <HiCheckCircleOutline class="h-5 w-5" /> as any
            }
          ]}
          onChange$={$((value: string) => {
            const enabled = value === "enable";
            tunnelsEnabled.value = enabled;
            if (onToggle$) {
              onToggle$(enabled);
            }
          })}
          size="md"
          color="primary"
        />
      </div>
    );
  },
);
