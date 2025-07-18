import { component$, type Signal, type QRL } from "@builder.io/qwik";
import {
  HiServerOutline,
  HiCheckCircleOutline,
  HiXCircleOutline,
} from "@qwikest/icons/heroicons";

interface VPNServerHeaderProps {
  vpnServerEnabled: Signal<boolean>;
  onToggle$?: QRL<(enabled: boolean) => void>;
}

export const VPNServerHeader = component$<VPNServerHeaderProps>(({ vpnServerEnabled, onToggle$ }) => {
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

      {/* Enable/Disable Toggle */}
      <div class="flex gap-4 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
        <label
          class={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2
          ${
            !vpnServerEnabled.value
              ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          <input
            type="radio"
            name="vpnserver"
            checked={!vpnServerEnabled.value}
            onChange$={async () => {
              vpnServerEnabled.value = false;
              if (onToggle$) {
                await onToggle$(false);
              }
            }}
            class="hidden"
          />
          <HiXCircleOutline class="h-5 w-5" />
          <span>{$localize`Disable`}</span>
        </label>
        <label
          class={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2
          ${
            vpnServerEnabled.value
              ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          <input
            type="radio"
            name="vpnserver"
            checked={vpnServerEnabled.value}
            onChange$={async () => {
              vpnServerEnabled.value = true;
              if (onToggle$) {
                await onToggle$(true);
              }
            }}
            class="hidden"
          />
          <HiCheckCircleOutline class="h-5 w-5" />
          <span>{$localize`Enable`}</span>
        </label>
      </div>
    </div>
  );
}); 