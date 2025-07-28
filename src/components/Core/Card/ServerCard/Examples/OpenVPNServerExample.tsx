import { component$, useSignal, $ } from "@builder.io/qwik";
import { ServerCard } from "../../ServerCard";
import { OpenVPNIcon } from "~/components/Star/LAN/VPNServer/Protocols/icons";

/**
 * OpenVPN Server configuration example
 * Shows advanced configuration options with protocol selection
 */
export const OpenVPNServerExample = component$(() => {
  const enabled = useSignal(true);
  const protocol = useSignal("UDP");
  const port = useSignal("1194");
  const encryption = useSignal("AES-256-GCM");
  const compression = useSignal(true);

  const handleToggle = $((newEnabled: boolean) => {
    enabled.value = newEnabled;
    console.log(`OpenVPN server ${newEnabled ? "enabled" : "disabled"}`);
  });

  return (
    <ServerCard
      title="OpenVPN Server"
      icon={$(OpenVPNIcon)}
      enabled={enabled.value}
      onToggle$={handleToggle}
      class="max-w-md"
    >
      <div class="space-y-4">
        {/* Connection Info */}
        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
            <div class="text-xs font-medium text-gray-500 dark:text-gray-400">
              ACTIVE CONNECTIONS
            </div>
            <div class="text-lg font-semibold text-gray-900 dark:text-white">
              {enabled.value ? "3" : "0"}
            </div>
          </div>
          <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
            <div class="text-xs font-medium text-gray-500 dark:text-gray-400">
              DATA TRANSFERRED
            </div>
            <div class="text-lg font-semibold text-gray-900 dark:text-white">
              {enabled.value ? "1.2 GB" : "0 GB"}
            </div>
          </div>
        </div>

        {/* Configuration Options */}
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Protocol
              </label>
              <select
                value={protocol.value}
                onChange$={(e) => {
                  protocol.value = (e.target as HTMLSelectElement).value;
                }}
                class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                disabled={enabled.value}
              >
                <option value="UDP">UDP</option>
                <option value="TCP">TCP</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Port
              </label>
              <input
                type="number"
                value={port.value}
                onInput$={(e) => {
                  port.value = (e.target as HTMLInputElement).value;
                }}
                class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                disabled={enabled.value}
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Encryption
            </label>
            <select
              value={encryption.value}
              onChange$={(e) => {
                encryption.value = (e.target as HTMLSelectElement).value;
              }}
              class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              disabled={enabled.value}
            >
              <option value="AES-256-GCM">AES-256-GCM</option>
              <option value="AES-128-GCM">AES-128-GCM</option>
              <option value="CHACHA20-POLY1305">CHACHA20-POLY1305</option>
            </select>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              id="compression"
              checked={compression.value}
              onChange$={(e) => {
                compression.value = (e.target as HTMLInputElement).checked;
              }}
              class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              disabled={enabled.value}
            />
            <label
              for="compression"
              class="ml-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Enable LZ4 compression
            </label>
          </div>
        </div>

        {/* Server Status */}
        {enabled.value ? (
          <div class="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <div class="text-sm text-green-700 dark:text-green-300">
              <div class="font-medium">Server Active</div>
              <div>
                Listening on {protocol.value.toLowerCase()}:{port.value} with{" "}
                {encryption.value} encryption
              </div>
            </div>
          </div>
        ) : (
          <div class="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
            <div class="text-sm text-orange-700 dark:text-orange-300">
              Server is stopped. Clients cannot connect.
            </div>
          </div>
        )}
      </div>
    </ServerCard>
  );
});
