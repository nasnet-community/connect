import { component$, useSignal, $ } from "@builder.io/qwik";
import { HiServerOutline, HiLockClosedOutline } from "@qwikest/icons/heroicons";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { ServerFormField } from "~/components/Core/Form/ServerField";
import { useOpenVPNServer } from "./useOpenVPNServer";
import { Input } from "~/components/Core";
import {
  NetworkDropdown,
  type ExtendedNetworks,
} from "../../components/NetworkSelection";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const OpenVPNServerEasy = component$(() => {
  const locale = useMessageLocale();
  const { easyFormState, passphraseError, updateEasyPassphrase$ } =
    useOpenVPNServer();

  // Local network state (not part of VPN server config)
  const selectedNetwork = useSignal<ExtendedNetworks>("VPN" as const);

  // Local handler for network updates
  const updateNetwork$ = $((network: ExtendedNetworks) => {
    selectedNetwork.value = network;
  });

  return (
    <ServerCard
      title={semanticMessages.vpn_server_easy_openvpn_title({}, { locale })}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6">
        {/* Network Selection */}
        <ServerFormField
          label={semanticMessages.vpn_server_network_label({}, { locale })}
        >
          <NetworkDropdown
            selectedNetwork={selectedNetwork.value}
            onNetworkChange$={updateNetwork$}
          />
        </ServerFormField>

        {/* Certificate Key Passphrase */}
        <ServerFormField
          label={semanticMessages.vpn_server_certificate_key_passphrase(
            {},
            { locale },
          )}
          errorMessage={
            passphraseError.value ||
            (!passphraseError.value
              ? semanticMessages.vpn_server_easy_openvpn_passphrase_help(
                  {},
                  { locale },
                )
              : undefined)
          }
        >
          <div class="relative">
            <Input
              type="password"
              value={easyFormState.certificateKeyPassphrase}
              onInput$={(event: Event, value: string) => {
                updateEasyPassphrase$(value);
              }}
              placeholder={semanticMessages.vpn_server_easy_openvpn_passphrase_placeholder(
                {},
                { locale },
              )}
              class="pr-10"
            />
            <button
              type="button"
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
