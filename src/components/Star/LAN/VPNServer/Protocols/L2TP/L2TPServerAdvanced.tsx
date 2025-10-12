import { component$ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useL2TPServer } from "./useL2TPServer";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { ServerFormField, SectionTitle } from "~/components/Core/Form/ServerField";
import { PasswordField } from "~/components/Core/Form/PasswordField";
import { UnifiedSelect } from "~/components/Core/Select/UnifiedSelect";
import { NetworkDropdown } from "../../components/NetworkSelection";

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
  const {
    advancedFormState,
    updateUseIpsec$,
    updateIpsecSecret$,
  } = useL2TPServer();

  return (
    <ServerCard
      title={$localize`L2TP Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      {/* Basic Configuration */}
      <div class="mb-6 space-y-4">
        <SectionTitle title={$localize`Basic Configuration`} />

        {/* Network Selection */}
        <ServerFormField label={$localize`Network`}>
          <NetworkDropdown
            selectedNetwork={"VPN" as const}
            onNetworkChange$={(network) => {
              console.log("L2TP network changed to:", network);
            }}
          />
        </ServerFormField>


        {/* IPsec Usage Dropdown */}
        <ServerFormField label={$localize`Use IPsec`}>
          <UnifiedSelect
            value={advancedFormState.useIpsec.toString()}
            onChange$={(value) => {
              if (value === "yes" || value === "no" || value === "required") {
                updateUseIpsec$(value);
              }
            }}
            options={[
              { value: "yes", label: $localize`Yes` },
              { value: "no", label: $localize`No` },
              { value: "required", label: $localize`Required` },
            ]}
          />
        </ServerFormField>

        {/* IPsec Secret Key - Only shown when IPsec is enabled */}
        {advancedFormState.useIpsec !== "no" && (
          <ServerFormField label={$localize`IPsec Secret Key`}>
            <PasswordField
              value={advancedFormState.ipsecSecret}
              onValueChange$={(value) => updateIpsecSecret$(value)}
              placeholder={$localize`Enter IPsec secret key`}
            />
          </ServerFormField>
        )}

      </div>


      {/* Apply Settings Button
      <ServerButton
        onClick$={applyChanges}
        class="mt-4"
      >
        {$localize`Apply Settings`}
      </ServerButton> */}
    </ServerCard>
  );
});
