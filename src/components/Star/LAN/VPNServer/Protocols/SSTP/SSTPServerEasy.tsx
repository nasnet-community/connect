import { component$ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { ServerCard } from "../../UI";

export const SSTPServerEasy = component$(() => {
  return (
    <ServerCard
      title={$localize`SSTP Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="py-4 text-center text-gray-700 dark:text-gray-300">
        <p>{$localize`SSTP VPN server is configured. Advanced configuration is available in expert mode.`}</p>
      </div>
    </ServerCard>
  );
}); 