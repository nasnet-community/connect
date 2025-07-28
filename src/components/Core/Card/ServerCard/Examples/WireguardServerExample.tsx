import { component$, useSignal, $ } from "@builder.io/qwik";
import { ServerCard } from "../../ServerCard";
import { WireguardIcon } from "~/components/Star/LAN/VPNServer/Protocols/icons";

/**
 * WireGuard VPN Server configuration example
 * Demonstrates a complete server configuration interface with form validation
 */
export const WireguardServerExample = component$(() => {
  const enabled = useSignal(false);
  const port = useSignal("51820");
  const maxClients = useSignal("10");
  const networkRange = useSignal("10.0.0.0/24");

  const handleToggle = $((newEnabled: boolean) => {
    enabled.value = newEnabled;
    // In a real implementation, you would trigger server start/stop logic here
    console.log(`WireGuard server ${newEnabled ? "enabled" : "disabled"}`);
  });

  return (
    <ServerCard
      title="WireGuard VPN Server"
      icon={$(WireguardIcon)}
      enabled={enabled.value}
      onToggle$={handleToggle}
      class="max-w-md"
    >
      <div class="space-y-4">
        {/* Server Status */}
        <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
          <div class="text-sm">
            <div class="font-medium text-gray-700 dark:text-gray-300">
              Status: {enabled.value ? "Running" : "Stopped"}
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              Interface: {enabled.value ? "wg0" : "N/A"}
            </div>
          </div>
        </div>

        {/* Configuration Form */}
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Listen Port
            </label>
            <input
              type="number"
              min="1"
              max="65535"
              value={port.value}
              onInput$={(e) => {
                port.value = (e.target as HTMLInputElement).value;
              }}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              disabled={enabled.value}
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Network Range
            </label>
            <input
              type="text"
              value={networkRange.value}
              onInput$={(e) => {
                networkRange.value = (e.target as HTMLInputElement).value;
              }}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              disabled={enabled.value}
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Max Clients
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={maxClients.value}
              onInput$={(e) => {
                maxClients.value = (e.target as HTMLInputElement).value;
              }}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              disabled={enabled.value}
            />
          </div>
        </div>

        {/* Status Messages */}
        {enabled.value && (
          <div class="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <div class="text-sm text-green-700 dark:text-green-300">
              WireGuard server is running on port {port.value}
            </div>
          </div>
        )}

        {!enabled.value && (
          <div class="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <div class="text-sm text-blue-700 dark:text-blue-300">
              Configure settings above and enable to start the server
            </div>
          </div>
        )}
      </div>
    </ServerCard>
  );
});
