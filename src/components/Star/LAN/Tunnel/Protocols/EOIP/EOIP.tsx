import { component$, $ } from "@builder.io/qwik";
import {
  HiLockClosedOutline,
  HiChevronDownOutline,
  HiChevronUpOutline,
} from "@qwikest/icons/heroicons";
import { useEOIP } from "./useEOIP";
import type { EoipTunnelConfig } from "../../../../StarContext/Utils/TunnelType";
import type { ARPState } from "../../../../StarContext/CommonType";

export const EOIPProtocol = component$(() => {
  const { eoipTunnels, expandedSections, toggleSection, updateTunnelField } =
    useEOIP();

  const toggleSection$ = $((section: string) => toggleSection(section));
  const updateTunnelField$ = $(
    (
      index: number,
      field: keyof EoipTunnelConfig,
      value: string | boolean | number | undefined,
    ) => {
      updateTunnelField(index, field, value);
    },
  );

  return (
    <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div
        class="flex cursor-pointer items-center justify-between p-6"
        onClick$={() => toggleSection$("eoip")}
      >
        <div class="flex items-center gap-3">
          <HiLockClosedOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{$localize`EOIP Tunnels`}</h3>
        </div>
        {expandedSections.eoip ? (
          <HiChevronUpOutline class="h-5 w-5 text-gray-500" />
        ) : (
          <HiChevronDownOutline class="h-5 w-5 text-gray-500" />
        )}
      </div>

      {expandedSections.eoip && (
        <div class="border-t border-gray-200 p-6 dark:border-gray-700">
          <div class="space-y-8">
            {eoipTunnels.map((tunnel, index) => (
              <div
                key={index}
                class="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <h4 class="text-md font-medium text-gray-900 dark:text-white">
                  {$localize`EOIP Tunnel ${index + 1}`}
                </h4>

                <div class="grid gap-4 md:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`Name`} *
                    </label>
                    <input
                      type="text"
                      value={tunnel.name}
                      onChange$={(e) =>
                        updateTunnelField$(
                          index,
                          "name",
                          (e.target as HTMLInputElement).value,
                        )
                      }
                      class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder={$localize`Enter tunnel name`}
                    />
                  </div>

                  {/* Tunnel ID */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`Tunnel ID`} *
                    </label>
                    <input
                      type="number"
                      value={tunnel.tunnelId}
                      onChange$={(e) =>
                        updateTunnelField$(
                          index,
                          "tunnelId",
                          parseInt((e.target as HTMLInputElement).value) || 1,
                        )
                      }
                      class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder={$localize`Enter tunnel ID`}
                      min="1"
                    />
                  </div>

                  {/* MTU */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`MTU`}
                    </label>
                    <input
                      type="number"
                      value={tunnel.mtu || ""}
                      onChange$={(e) => {
                        const val = (e.target as HTMLInputElement).value;
                        updateTunnelField$(
                          index,
                          "mtu",
                          val ? parseInt(val) : undefined,
                        );
                      }}
                      class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder={$localize`Enter MTU (optional)`}
                    />
                  </div>

                  {/* Local Address */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`Local Address`} *
                    </label>
                    <input
                      type="text"
                      value={tunnel.localAddress}
                      onChange$={(e) =>
                        updateTunnelField$(
                          index,
                          "localAddress",
                          (e.target as HTMLInputElement).value,
                        )
                      }
                      class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder={$localize`Enter local address`}
                    />
                  </div>

                  {/* Remote Address */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`Remote Address`} *
                    </label>
                    <input
                      type="text"
                      value={tunnel.remoteAddress}
                      onChange$={(e) =>
                        updateTunnelField$(
                          index,
                          "remoteAddress",
                          (e.target as HTMLInputElement).value,
                        )
                      }
                      class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder={$localize`Enter remote address`}
                    />
                  </div>

                  {/* MAC Address */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`MAC Address`}
                    </label>
                    <input
                      type="text"
                      value={tunnel.macAddress || ""}
                      onChange$={(e) =>
                        updateTunnelField$(
                          index,
                          "macAddress",
                          (e.target as HTMLInputElement).value,
                        )
                      }
                      class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder={$localize`Enter MAC address (optional)`}
                    />
                  </div>

                  {/* IPsec Secret */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`IPsec Secret`}
                    </label>
                    <input
                      type="text"
                      value={tunnel.ipsecSecret || ""}
                      onChange$={(e) =>
                        updateTunnelField$(
                          index,
                          "ipsecSecret",
                          (e.target as HTMLInputElement).value,
                        )
                      }
                      class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder={$localize`Enter IPsec secret (optional)`}
                    />
                  </div>

                  {/* Keepalive */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`Keepalive`}
                    </label>
                    <input
                      type="text"
                      value={tunnel.keepalive || ""}
                      onChange$={(e) =>
                        updateTunnelField$(
                          index,
                          "keepalive",
                          (e.target as HTMLInputElement).value,
                        )
                      }
                      class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder={$localize`Enter keepalive (optional)`}
                    />
                  </div>
                </div>

                {/* ARP and Clamp TCP MSS */}
                <div class="grid gap-4 md:grid-cols-2">
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`ARP`}
                    </label>
                    <select
                      value={tunnel.arp || ""}
                      onChange$={(e) => {
                        const value = (e.target as HTMLSelectElement)
                          .value as ARPState;
                        updateTunnelField$(index, "arp", value || undefined);
                      }}
                      class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">{$localize`Default`}</option>
                      <option value="enabled">{$localize`Enabled`}</option>
                      <option value="disabled">{$localize`Disabled`}</option>
                      <option value="proxy-arp">{$localize`Proxy ARP`}</option>
                      <option value="reply-only">{$localize`Reply Only`}</option>
                    </select>
                  </div>

                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id={`clampTcpMss-${index}`}
                      checked={tunnel.clampTcpMss || false}
                      onChange$={(e) =>
                        updateTunnelField$(
                          index,
                          "clampTcpMss",
                          (e.target as HTMLInputElement).checked,
                        )
                      }
                      class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      for={`clampTcpMss-${index}`}
                      class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {$localize`Clamp TCP MSS`}
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
