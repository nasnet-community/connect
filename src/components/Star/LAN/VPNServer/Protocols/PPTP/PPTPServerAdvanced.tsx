import { component$, useSignal, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { usePPTPServer } from "./usePPTPServer";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { SectionTitle } from "~/components/Core/Form/ServerField";
import {
  NetworkDropdown,
  type ExtendedNetworks,
} from "../../components/NetworkSelection";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const PPTPServerAdvanced = component$(() => {
  const locale = useMessageLocale();
  const { advancedFormState: _advancedFormState } = usePPTPServer();

  // Local network state (not part of VPN server config)
  const selectedNetwork = useSignal<ExtendedNetworks>("PPTP" as const);

  // Local handler for network updates
  const updateNetwork$ = $((network: ExtendedNetworks) => {
    selectedNetwork.value = network;
  });

  return (
    <ServerCard
      title={semanticMessages.vpn_server_pptp_title({}, { locale })}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6">
        {/* Network Selection */}
        <div>
          <SectionTitle
            title={semanticMessages.zerotier_network_configuration(
              {},
              {
                locale,
              },
            )}
          />
          <NetworkDropdown
            selectedNetwork={selectedNetwork.value as ExtendedNetworks}
            onNetworkChange$={(network) => {
              updateNetwork$(network);
            }}
            _vpnType="PPTP"
            label={semanticMessages.vpn_server_network_label({}, { locale })}
          />
        </div>
      </div>
    </ServerCard>
  );
});
