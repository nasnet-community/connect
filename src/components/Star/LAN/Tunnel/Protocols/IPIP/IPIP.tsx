import { component$, $ } from "@builder.io/qwik";
import {
  HiLockClosedOutline,
  HiChevronDownOutline,
  HiChevronUpOutline,
} from "@qwikest/icons/heroicons";
import { useIPIP } from "./useIPIP";
import type { IpipTunnelConfig } from "../../../../StarContext/Utils/TunnelType";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const IPIPProtocol = component$(() => {
  const locale = useMessageLocale();
  const { ipipTunnels, expandedSections, toggleSection, updateTunnelField } =
    useIPIP();

  const toggleSection$ = $((section: string) => toggleSection(section));
  const updateTunnelField$ = $(
    (
      index: number,
      field: keyof IpipTunnelConfig,
      value: string | boolean | number | undefined,
    ) => {
      updateTunnelField(index, field, value);
    },
  );

  return (
    <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div
        class="flex cursor-pointer items-center justify-between p-6"
        onClick$={() => toggleSection$("ipip")}
      >
        <div class="flex items-center gap-3">
          <HiLockClosedOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {semanticMessages.tunnel_step_ipip({}, { locale })}
          </h3>
        </div>
        {expandedSections.ipip ? (
          <HiChevronUpOutline class="h-5 w-5 text-gray-500" />
        ) : (
          <HiChevronDownOutline class="h-5 w-5 text-gray-500" />
        )}
      </div>

      {expandedSections.ipip && (
        <div class="border-t border-gray-200 p-6 dark:border-gray-700">
          <div class="space-y-8">
            {ipipTunnels.map((tunnel, index) => (
              <div
                key={index}
                class="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <h4 class="text-md font-medium text-gray-900 dark:text-white">
                  {semanticMessages.tunnel_ipip_item_title(
                    { index: String(index + 1) },
                    { locale },
                  )}
                </h4>

                <div class="grid gap-4 md:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {semanticMessages.tunnel_field_name({}, { locale })} *
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
                      placeholder={semanticMessages.tunnel_field_name_placeholder(
                        {},
                        { locale },
                      )}
                    />
                  </div>

                  {/* MTU */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {semanticMessages.tunnel_field_mtu({}, { locale })}
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
                      placeholder={semanticMessages.tunnel_field_mtu_placeholder(
                        {},
                        { locale },
                      )}
                    />
                  </div>

                  {/* Local Address */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {semanticMessages.tunnel_field_local_address(
                        {},
                        {
                          locale,
                        },
                      )}{" "}
                      *
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
                      placeholder={semanticMessages.tunnel_field_local_address_placeholder(
                        {},
                        { locale },
                      )}
                    />
                  </div>

                  {/* Remote Address */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {semanticMessages.tunnel_field_remote_address(
                        {},
                        {
                          locale,
                        },
                      )}{" "}
                      *
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
                      placeholder={semanticMessages.tunnel_field_remote_address_placeholder(
                        {},
                        { locale },
                      )}
                    />
                  </div>

                  {/* IPsec Secret */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {semanticMessages.tunnel_field_ipsec_secret(
                        {},
                        {
                          locale,
                        },
                      )}
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
                      placeholder={semanticMessages.tunnel_field_ipsec_secret_placeholder(
                        {},
                        { locale },
                      )}
                    />
                  </div>

                  {/* Keepalive */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {semanticMessages.tunnel_field_keepalive(
                        {},
                        {
                          locale,
                        },
                      )}
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
                      placeholder={semanticMessages.tunnel_field_keepalive_placeholder(
                        {},
                        { locale },
                      )}
                    />
                  </div>
                </div>

                {/* DSCP and Clamp TCP MSS */}
                <div class="grid gap-4 md:grid-cols-2">
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {semanticMessages.tunnel_field_dscp({}, { locale })}
                    </label>
                    <select
                      value={
                        typeof tunnel.dscp === "number"
                          ? tunnel.dscp.toString()
                          : tunnel.dscp || ""
                      }
                      onChange$={(e) => {
                        const value = (e.target as HTMLSelectElement).value;
                        updateTunnelField$(
                          index,
                          "dscp",
                          value === "inherit"
                            ? "inherit"
                            : parseInt(value) || undefined,
                        );
                      }}
                      class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">
                        {semanticMessages.tunnel_option_default(
                          {},
                          {
                            locale,
                          },
                        )}
                      </option>
                      <option value="inherit">
                        {semanticMessages.tunnel_option_inherit(
                          {},
                          {
                            locale,
                          },
                        )}
                      </option>
                      {Array.from({ length: 64 }, (_, i) => (
                        <option key={i} value={i.toString()}>
                          {i.toString()}
                        </option>
                      ))}
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
                      {semanticMessages.tunnel_field_clamp_tcp_mss(
                        {},
                        {
                          locale,
                        },
                      )}
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
