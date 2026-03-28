import { component$ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useL2TPServer } from "./useL2TPServer";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import {
  ServerFormField,
  SectionTitle,
} from "~/components/Core/Form/ServerField";
import { PasswordField } from "~/components/Core/Form/PasswordField";
import { UnifiedSelect } from "~/components/Core/Select/UnifiedSelect";
import { NetworkDropdown } from "../../components/NetworkSelection";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

/**
 * L2TP Server Configuration Component
 *
 * Allows users to configure L2TP VPN server settings including:
 * - Enable/disable L2TP server
 * - Configure authentication methods
 * - Set IPsec secret
 * - Configure MTU/MRU and other connection parameters
 */
export const L2TPServerAdvanced = component$(() => {
  const locale = useMessageLocale();
  const { advancedFormState, updateUseIpsec$, updateIpsecSecret$ } =
    useL2TPServer();

  return (
    <ServerCard
      title={semanticMessages.vpn_server_l2tp_title({}, { locale })}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      {/* Basic Configuration */}
      <div class="mb-6 space-y-4">
        <SectionTitle
          title={semanticMessages.vpn_server_basic_configuration(
            {},
            {
              locale,
            },
          )}
        />

        {/* Network Selection */}
        <ServerFormField
          label={semanticMessages.vpn_server_network_label({}, { locale })}
        >
          <NetworkDropdown
            selectedNetwork={"VPN" as const}
            onNetworkChange$={(network) => {
              console.log("L2TP network changed to:", network);
            }}
          />
        </ServerFormField>

        {/* IPsec Usage Dropdown */}
        <ServerFormField
          label={semanticMessages.vpn_server_l2tp_use_ipsec({}, { locale })}
        >
          <UnifiedSelect
            value={advancedFormState.useIpsec.toString()}
            onChange$={(value) => {
              if (value === "yes" || value === "no" || value === "required") {
                updateUseIpsec$(value);
              }
            }}
            options={[
              {
                value: "yes",
                label: semanticMessages.shared_yes({}, { locale }),
              },
              {
                value: "no",
                label: semanticMessages.shared_no({}, { locale }),
              },
              {
                value: "required",
                label: semanticMessages.shared_required({}, { locale }),
              },
            ]}
          />
        </ServerFormField>

        {/* IPsec Secret Key - Only shown when IPsec is enabled */}
        {advancedFormState.useIpsec !== "no" && (
          <ServerFormField
            label={semanticMessages.vpn_server_l2tp_ipsec_secret(
              {},
              {
                locale,
              },
            )}
          >
            <PasswordField
              value={advancedFormState.ipsecSecret}
              onValueChange$={(value) => updateIpsecSecret$(value)}
              placeholder={semanticMessages.vpn_server_l2tp_ipsec_placeholder(
                {},
                { locale },
              )}
            />
          </ServerFormField>
        )}
      </div>

      {/* Apply Settings Button
      <ServerButton
        onClick$={applyChanges}
        class="mt-4"
      >
        Apply Settings
      </ServerButton> */}
    </ServerCard>
  );
});
