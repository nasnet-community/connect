import { component$, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { ServerCard } from "~/components/Core/Card";

// Create a serialized version of the server icon
const ServerIcon = $(HiServerOutline);

export const WireguardServerEasy = component$(() => {
  return (
    <ServerCard
      title={$localize`WireGuard Server`}
      icon={ServerIcon}
    >
      <div class="py-4 text-center text-gray-700 dark:text-gray-300">
        <p>{$localize`WireGuard VPN server is configured. Advanced configuration is available in expert mode.`}</p>
      </div>
    </ServerCard>
  );
}); 