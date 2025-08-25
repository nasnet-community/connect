import { component$, $ } from "@builder.io/qwik";
import {
  HiLockClosedOutline,
  HiChevronDownOutline,
  HiChevronUpOutline,
} from "@qwikest/icons/heroicons";
import { useGRE } from "./useGRE";
import type { GreTunnelConfig } from "../../../../StarContext/Utils/TunnelType";
import { Input, Select, Checkbox } from "~/components/Core";

export const GREProtocol = component$(() => {
  const { greTunnels, expandedSections, toggleSection, updateTunnelField } =
    useGRE();

  const toggleSection$ = $((section: string) => toggleSection(section));
  const updateTunnelField$ = $(
    (
      index: number,
      field: keyof GreTunnelConfig,
      value: string | boolean | number | undefined,
    ) => {
      updateTunnelField(index, field, value);
    },
  );

  return (
    <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div
        class="flex cursor-pointer items-center justify-between p-6"
        onClick$={() => toggleSection$("gre")}
      >
        <div class="flex items-center gap-3">
          <HiLockClosedOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{$localize`GRE Tunnels`}</h3>
        </div>
        {expandedSections.gre ? (
          <HiChevronUpOutline class="h-5 w-5 text-gray-500" />
        ) : (
          <HiChevronDownOutline class="h-5 w-5 text-gray-500" />
        )}
      </div>

      {expandedSections.gre && (
        <div class="border-t border-gray-200 p-6 dark:border-gray-700">
          <div class="space-y-8">
            {greTunnels.map((tunnel, index) => (
              <div
                key={index}
                class="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <h4 class="text-md font-medium text-gray-900 dark:text-white">
                  {$localize`GRE Tunnel ${index + 1}`}
                </h4>

                <div class="grid gap-4 md:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`Name`} *
                    </label>
                    <Input
                      type="text"
                      value={tunnel.name}
                      onInput$={(event: Event, value: string) =>
                        updateTunnelField$(
                          index,
                          "name",
                          value,
                        )
                      }
                      placeholder={$localize`Enter tunnel name`}
                    />
                  </div>

                  {/* MTU */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`MTU`}
                    </label>
                    <Input
                      type="number"
                      value={tunnel.mtu || ""}
                      onInput$={(event: Event, value: string) => {
                        updateTunnelField$(
                          index,
                          "mtu",
                          value ? parseInt(value) : undefined,
                        );
                      }}
                      placeholder={$localize`Enter MTU (optional)`}
                    />
                  </div>

                  {/* Local Address */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`Local Address`} *
                    </label>
                    <Input
                      type="text"
                      value={tunnel.localAddress}
                      onInput$={(event: Event, value: string) =>
                        updateTunnelField$(
                          index,
                          "localAddress",
                          value,
                        )
                      }
                      placeholder={$localize`Enter local address`}
                    />
                  </div>

                  {/* Remote Address */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`Remote Address`} *
                    </label>
                    <Input
                      type="text"
                      value={tunnel.remoteAddress}
                      onInput$={(event: Event, value: string) =>
                        updateTunnelField$(
                          index,
                          "remoteAddress",
                          value,
                        )
                      }
                      placeholder={$localize`Enter remote address`}
                    />
                  </div>

                  {/* IPsec Secret */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`IPsec Secret`}
                    </label>
                    <Input
                      type="password"
                      value={tunnel.ipsecSecret || ""}
                      onInput$={(event: Event, value: string) =>
                        updateTunnelField$(
                          index,
                          "ipsecSecret",
                          value,
                        )
                      }
                      placeholder={$localize`Enter IPsec secret (optional)`}
                    />
                  </div>

                  {/* Keepalive */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`Keepalive`}
                    </label>
                    <Input
                      type="text"
                      value={tunnel.keepalive || ""}
                      onInput$={(event: Event, value: string) =>
                        updateTunnelField$(
                          index,
                          "keepalive",
                          value,
                        )
                      }
                      placeholder={$localize`Enter keepalive (optional)`}
                    />
                  </div>
                </div>

                {/* DSCP and Clamp TCP MSS */}
                <div class="grid gap-4 md:grid-cols-2">
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {$localize`DSCP`}
                    </label>
                    <Select
                      value={
                        typeof tunnel.dscp === "number"
                          ? tunnel.dscp.toString()
                          : tunnel.dscp || ""
                      }
                      onChange$={(value: string | string[]) => {
                        const stringValue = Array.isArray(value) ? value[0] : value;
                        updateTunnelField$(
                          index,
                          "dscp",
                          stringValue === "inherit"
                            ? "inherit"
                            : parseInt(stringValue) || undefined,
                        );
                      }}
                      options={[
                        { value: "", label: $localize`Default` },
                        { value: "inherit", label: $localize`Inherit` },
                        ...Array.from({ length: 64 }, (_, i) => ({
                          value: i.toString(),
                          label: i.toString(),
                        })),
                      ]}
                    />
                  </div>

                  <div class="flex items-center">
                    <Checkbox
                      id={`clampTcpMss-${index}`}
                      checked={tunnel.clampTcpMss || false}
                      onChange$={() =>
                        updateTunnelField$(
                          index,
                          "clampTcpMss",
                          !tunnel.clampTcpMss,
                        )
                      }
                      label={$localize`Clamp TCP MSS`}
                    />
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
