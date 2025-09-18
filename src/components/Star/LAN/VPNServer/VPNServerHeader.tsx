import { component$, type Signal, type QRL, $, useSignal, useTask$ } from "@builder.io/qwik";
import {
  HiServerOutline,
  HiCheckCircleOutline,
  HiXCircleOutline,
} from "@qwikest/icons/heroicons";
import { SegmentedControl } from "~/components/Core";

interface VPNServerHeaderProps {
  vpnServerEnabled: Signal<boolean>;
  onToggle$?: QRL<(enabled: boolean) => void>;
}

export const VPNServerHeader = component$<VPNServerHeaderProps>(
  ({ vpnServerEnabled, onToggle$ }) => {
    // Create a mutable string signal for SegmentedControl
    const enabledState = useSignal(vpnServerEnabled.value ? "enabled" : "disabled");

    // Keep the string signal in sync with the boolean signal
    useTask$(({ track }) => {
      track(() => vpnServerEnabled.value);
      enabledState.value = vpnServerEnabled.value ? "enabled" : "disabled";
    });

    return (
      <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div class="flex items-center gap-4">
          <div class="rounded-xl bg-primary-100 p-3 dark:bg-primary-900/30">
            <HiServerOutline class="h-8 w-8 text-primary-500 dark:text-primary-400" />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              {$localize`VPN Server Configuration`}
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              {$localize`Set up your VPN server settings and user access`}
            </p>
          </div>
        </div>

        {/* Enable/Disable SegmentedControl */}
        <SegmentedControl
          value={enabledState}
          options={[
            {
              value: "disabled",
              label: $localize`Disabled`,
            },
            {
              value: "enabled", 
              label: $localize`Enabled`,
            },
          ]}
          onChange$={$(async (value: string) => {
            const enabled = value === "enabled";
            vpnServerEnabled.value = enabled;
            if (onToggle$) {
              await onToggle$(enabled);
            }
          })}
          color="primary"
          size="md"
        />
      </div>
    );
  },
);
