import { component$, $ } from "@builder.io/qwik";
import {
  HiLockClosedOutline,
  HiChevronDownOutline,
  HiChevronUpOutline,
} from "@qwikest/icons/heroicons";
import { useGRE } from "./useGRE";
import type { GreTunnelConfig } from "../../../../StarContext/Utils/TunnelType";
import { Input } from "~/components/Core";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const GREProtocol = component$(() => {
  const locale = useMessageLocale();
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
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {semanticMessages.tunnel_step_gre({}, { locale })}
          </h3>
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
                  {semanticMessages.tunnel_gre_item_title(
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
                    <Input
                      type="text"
                      value={tunnel.name}
                      onInput$={(event: Event, value: string) =>
                        updateTunnelField$(index, "name", value)
                      }
                      placeholder={semanticMessages.tunnel_field_name_placeholder(
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
                    <Input
                      type="text"
                      value={tunnel.remoteAddress}
                      onInput$={(event: Event, value: string) =>
                        updateTunnelField$(index, "remoteAddress", value)
                      }
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
                    <Input
                      type="password"
                      value={tunnel.ipsecSecret || ""}
                      onInput$={(event: Event, value: string) =>
                        updateTunnelField$(index, "ipsecSecret", value)
                      }
                      placeholder={semanticMessages.tunnel_field_ipsec_secret_placeholder(
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
