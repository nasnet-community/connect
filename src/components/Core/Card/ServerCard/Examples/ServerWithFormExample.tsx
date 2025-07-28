import { component$, useSignal, $ } from "@builder.io/qwik";
import { ServerCard } from "../../ServerCard";
import { L2TPIcon } from "~/components/Star/LAN/VPNServer/Protocols/icons";

/**
 * Server card with complex form example
 * Shows how to integrate form validation and server configuration
 */
export const ServerWithFormExample = component$(() => {
  const enabled = useSignal(false);
  const isLoading = useSignal(false);
  const formValid = useSignal(false);

  // Form state
  const config = useSignal({
    presharedKey: "",
    maxClients: "10",
    authMethod: "mschapv2",
    encryption: "require",
    compression: false,
    dns1: "8.8.8.8",
    dns2: "8.8.4.4",
  });

  const validateForm = $(() => {
    const isValid =
      config.value.presharedKey.length >= 8 &&
      parseInt(config.value.maxClients) > 0 &&
      config.value.dns1.length > 0;
    formValid.value = isValid;
    return isValid;
  });

  const handleToggle = $(async (newEnabled: boolean) => {
    if (newEnabled) {
      const isValid = validateForm();
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!isValid) {
        alert("Please fix form validation errors before enabling the server.");
        return;
      }
    }

    isLoading.value = true;

    // Simulate server start/stop operation
    setTimeout(() => {
      enabled.value = newEnabled;
      isLoading.value = false;
      console.log(
        `L2TP server ${newEnabled ? "started" : "stopped"}`,
        config.value,
      );
    }, 2000);
  });

  return (
    <div class="max-w-lg">
      <ServerCard
        title="L2TP/IPSec Server"
        icon={$(L2TPIcon)}
        enabled={enabled.value}
        onToggle$={handleToggle}
        class={isLoading.value ? "opacity-75" : ""}
      >
        <div class="space-y-4">
          {/* Loading State */}
          {isLoading.value && (
            <div class="flex items-center justify-center rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
              <div class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
              <span class="text-sm text-blue-700 dark:text-blue-300">
                {enabled.value ? "Stopping server..." : "Starting server..."}
              </span>
            </div>
          )}

          {/* Configuration Form */}
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Pre-shared Key
              </label>
              <input
                type="password"
                value={config.value.presharedKey}
                onInput$={(e) => {
                  config.value = {
                    ...config.value,
                    presharedKey: (e.target as HTMLInputElement).value,
                  };
                  validateForm();
                }}
                placeholder="Enter strong pre-shared key"
                class={`mt-1 block w-full rounded-md border shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white ${
                  config.value.presharedKey.length > 0 &&
                  config.value.presharedKey.length < 8
                    ? "border-red-300 dark:border-red-600"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                disabled={enabled.value || isLoading.value}
              />
              {config.value.presharedKey.length > 0 &&
                config.value.presharedKey.length < 8 && (
                  <p class="mt-1 text-xs text-red-600 dark:text-red-400">
                    Pre-shared key must be at least 8 characters
                  </p>
                )}
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Max Clients
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={config.value.maxClients}
                  onInput$={(e) => {
                    config.value = {
                      ...config.value,
                      maxClients: (e.target as HTMLInputElement).value,
                    };
                    validateForm();
                  }}
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  disabled={enabled.value || isLoading.value}
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Authentication
                </label>
                <select
                  value={config.value.authMethod}
                  onChange$={(e) => {
                    config.value = {
                      ...config.value,
                      authMethod: (e.target as HTMLSelectElement).value,
                    };
                  }}
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  disabled={enabled.value || isLoading.value}
                >
                  <option value="mschapv2">MS-CHAPv2</option>
                  <option value="chap">CHAP</option>
                  <option value="pap">PAP</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Encryption
              </label>
              <select
                value={config.value.encryption}
                onChange$={(e) => {
                  config.value = {
                    ...config.value,
                    encryption: (e.target as HTMLSelectElement).value,
                  };
                }}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                disabled={enabled.value || isLoading.value}
              >
                <option value="require">Required</option>
                <option value="optional">Optional</option>
                <option value="none">None</option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Primary DNS
                </label>
                <input
                  type="text"
                  value={config.value.dns1}
                  onInput$={(e) => {
                    config.value = {
                      ...config.value,
                      dns1: (e.target as HTMLInputElement).value,
                    };
                    validateForm();
                  }}
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  disabled={enabled.value || isLoading.value}
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Secondary DNS
                </label>
                <input
                  type="text"
                  value={config.value.dns2}
                  onInput$={(e) => {
                    config.value = {
                      ...config.value,
                      dns2: (e.target as HTMLInputElement).value,
                    };
                  }}
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  disabled={enabled.value || isLoading.value}
                />
              </div>
            </div>

            <div class="flex items-center">
              <input
                type="checkbox"
                id="compression"
                checked={config.value.compression}
                onChange$={(e) => {
                  config.value = {
                    ...config.value,
                    compression: (e.target as HTMLInputElement).checked,
                  };
                }}
                class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                disabled={enabled.value || isLoading.value}
              />
              <label
                for="compression"
                class="ml-2 text-sm text-gray-700 dark:text-gray-300"
              >
                Enable compression
              </label>
            </div>
          </div>

          {/* Validation Status */}
          {!formValid.value && !enabled.value && !isLoading.value && (
            <div class="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
              <div class="text-sm text-yellow-700 dark:text-yellow-300">
                ⚠️ Please complete all required fields before enabling the
                server
              </div>
            </div>
          )}

          {/* Server Status */}
          {enabled.value && (
            <div class="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
              <div class="text-sm text-green-700 dark:text-green-300">
                <div class="font-medium">L2TP/IPSec server is running</div>
                <div>
                  Authentication: {config.value.authMethod.toUpperCase()}
                </div>
                <div>Max clients: {config.value.maxClients}</div>
              </div>
            </div>
          )}
        </div>
      </ServerCard>
    </div>
  );
});
