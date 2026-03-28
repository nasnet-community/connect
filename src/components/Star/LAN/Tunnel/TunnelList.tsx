import { component$ } from "@builder.io/qwik";
import {
  HiServerOutline,
  HiChevronDownOutline,
  HiChevronUpOutline,
} from "@qwikest/icons/heroicons";
import type { BaseTunnelConfig } from "../../StarContext/Utils/TunnelType";
import type { QRL } from "@builder.io/qwik";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface TunnelListProps {
  tunnels: BaseTunnelConfig[];
  expandedSections: Record<string, boolean>;
  toggleSection$: QRL<(section: string) => void>;
}

export const TunnelList = component$<TunnelListProps>(
  ({ tunnels, expandedSections, toggleSection$ }) => {
    const locale = useMessageLocale();

    return (
      <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div
          class="flex cursor-pointer items-center justify-between p-6"
          onClick$={() => toggleSection$("tunnelList")}
        >
          <div class="flex items-center gap-3">
            <HiServerOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {semanticMessages.tunnel_list_configured({}, { locale })}
            </h3>
          </div>
          {expandedSections.tunnelList ? (
            <HiChevronUpOutline class="h-5 w-5 text-gray-500" />
          ) : (
            <HiChevronDownOutline class="h-5 w-5 text-gray-500" />
          )}
        </div>

        {expandedSections.tunnelList && (
          <div class="border-t border-gray-200 p-6 dark:border-gray-700">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      {semanticMessages.tunnel_list_type({}, { locale })}
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      {semanticMessages.tunnel_field_name({}, { locale })}
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      {semanticMessages.tunnel_field_remote_address(
                        {},
                        {
                          locale,
                        },
                      )}
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      {semanticMessages.tunnel_list_extra_config(
                        {},
                        {
                          locale,
                        },
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  {tunnels.map((tunnel, index) => (
                    <tr
                      key={index}
                      class="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {tunnel.type.toUpperCase()}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {tunnel.name}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {tunnel.remoteAddress}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {tunnel.type === "eoip" &&
                          `${semanticMessages.tunnel_summary_tunnel_id(
                            {},
                            {
                              locale,
                            },
                          )} ${(tunnel as any).tunnelId}`}
                        {tunnel.type === "vxlan" &&
                          `${semanticMessages.tunnel_summary_vni(
                            {},
                            {
                              locale,
                            },
                          )} ${(tunnel as any).vni}`}
                        {tunnel.type === "ipip" &&
                          (tunnel as any).ipsecSecret &&
                          `${semanticMessages.tunnel_field_ipsec_secret(
                            {},
                            {
                              locale,
                            },
                          )}: ${(tunnel as any).ipsecSecret}`}
                        {tunnel.type === "gre" &&
                          (tunnel as any).ipsecSecret &&
                          `${semanticMessages.tunnel_field_ipsec_secret(
                            {},
                            {
                              locale,
                            },
                          )}: ${(tunnel as any).ipsecSecret}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  },
);
