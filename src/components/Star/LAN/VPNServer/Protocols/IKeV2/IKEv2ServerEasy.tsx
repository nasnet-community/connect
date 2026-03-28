import { component$ } from "@builder.io/qwik";
import { HiServerOutline, HiLockClosedOutline } from "@qwikest/icons/heroicons";
import { useIKEv2Server } from "./useIKEv2Server";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { ServerFormField } from "~/components/Core/Form/ServerField";
import { NetworkDropdown } from "../../components/NetworkSelection";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const IKEv2ServerEasy = component$(() => {
  const locale = useMessageLocale();
  const {
    easyFormState,
    // showPassword,
    presharedKeyError,
    updateEasyForm$,
    togglePasswordVisibility$,
  } = useIKEv2Server();

  return (
    <ServerCard
      title={semanticMessages.vpn_server_ikev2_title({}, { locale })}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6">
        {/* Network Selection */}
        <ServerFormField
          label={semanticMessages.vpn_server_network_label({}, { locale })}
        >
          <NetworkDropdown
            selectedNetwork={"VPN" as const}
            onNetworkChange$={(_network) => {
              console.log("IKEv2 Easy network changed");
            }}
          />
        </ServerFormField>

        <ServerFormField
          label={semanticMessages.vpn_ikev2_pre_shared_key({}, { locale })}
          errorMessage={
            presharedKeyError.value ||
            (!presharedKeyError.value
              ? semanticMessages.vpn_server_easy_ikev2_preshared_key_help(
                  {},
                  { locale },
                )
              : undefined)
          }
          required={true}
        >
          <div class="relative">
            <input
              type="text"
              value={easyFormState.presharedKey}
              onInput$={(e) => {
                const target = e.target as HTMLInputElement;
                updateEasyForm$(target.value);
              }}
              placeholder={semanticMessages.vpn_server_easy_ikev2_preshared_key_placeholder(
                {},
                { locale },
              )}
              class="w-full rounded-lg border border-border bg-white px-3 py-2
                     focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                     disabled:cursor-not-allowed disabled:opacity-75
                     dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
            />
            <button
              type="button"
              onClick$={togglePasswordVisibility$}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <HiLockClosedOutline class="h-5 w-5" />
            </button>
          </div>
        </ServerFormField>
      </div>
    </ServerCard>
  );
});
