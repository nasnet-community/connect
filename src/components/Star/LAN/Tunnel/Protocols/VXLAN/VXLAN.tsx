import { component$, $ } from "@builder.io/qwik";
import {
  HiLockClosedOutline,
  HiChevronDownOutline,
  HiChevronUpOutline,
} from "@qwikest/icons/heroicons";
import { useVXLAN } from "./useVXLAN";
import type { VxlanInterfaceConfig } from "../../../../StarContext/Utils/TunnelType";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const VXLANProtocol = component$(() => {
  const locale = useMessageLocale();
  const { vxlanTunnels, expandedSections, toggleSection, updateTunnelField } =
    useVXLAN();

  const toggleSection$ = $((section: string) => toggleSection(section));
  const updateTunnelField$ = $(
    (
      index: number,
      field: keyof VxlanInterfaceConfig,
      value: string | boolean | number | undefined,
    ) => {
      updateTunnelField(index, field, value);
    },
  );

  return (
    <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div
        class="flex cursor-pointer items-center justify-between p-6"
        onClick$={() => toggleSection$("vxlan")}
      >
        <div class="flex items-center gap-3">
          <HiLockClosedOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {semanticMessages.tunnel_step_vxlan({}, { locale })}
          </h3>
        </div>
        {expandedSections.vxlan ? (
          <HiChevronUpOutline class="h-5 w-5 text-gray-500" />
        ) : (
          <HiChevronDownOutline class="h-5 w-5 text-gray-500" />
        )}
      </div>

      {expandedSections.vxlan && (
        <div class="border-t border-gray-200 p-6 dark:border-gray-700">
          <div class="space-y-8">
            {vxlanTunnels.map((tunnel, index) => (
              <div
                key={index}
                class="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <h4 class="text-md font-medium text-gray-900 dark:text-white">
                  {semanticMessages.tunnel_vxlan_item_title(
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

                  {/* VNI */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {semanticMessages.tunnel_field_vni({}, { locale })} *
                    </label>
                    <input
                      type="number"
                      value={tunnel.vni}
                      onChange$={(e) =>
                        updateTunnelField$(
                          index,
                          "vni",
                          parseInt((e.target as HTMLInputElement).value) || 1,
                        )
                      }
                      class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder={semanticMessages.tunnel_field_vni_placeholder(
                        {},
                        { locale },
                      )}
                      min="1"
                      max="16777215"
                    />
                  </div>

                  {/* Port */}
                  <div>
                    <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {semanticMessages.shared_port({}, { locale })}
                    </label>
                    <input
                      type="number"
                      value={tunnel.port || ""}
                      onChange$={(e) => {
                        const val = (e.target as HTMLInputElement).value;
                        updateTunnelField$(
                          index,
                          "port",
                          val ? parseInt(val) : undefined,
                        );
                      }}
                      class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder={semanticMessages.tunnel_field_port_placeholder(
                        {},
                        { locale },
                      )}
                      min="1"
                      max="65535"
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
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
