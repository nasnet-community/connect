import { component$ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useL2TPServer } from "./useL2TPServer";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { ServerFormField, SectionTitle } from "~/components/Core/Form/ServerField";
import { PasswordField } from "~/components/Core/Form/PasswordField";
import { CheckboxGroup } from "~/components/Core/Form/Checkbox";
import { UnifiedSelect } from "~/components/Core/Select/UnifiedSelect";
import { Input } from "~/components/Core/Input";
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
    isEnabled,
    authOptions,
    handleToggle,
    toggleAuthMethod,
    updateProfile$,
    updateMaxMtu$,
    updateMaxMru$,
    updateUseIpsec$,
    updateIpsecSecret$,
    updateKeepaliveTimeout$,
    updateAllowFastPath$,
    updateOneSessionPerHost$,
  } = useL2TPServer();

  return (
    <ServerCard
      title={$localize`L2TP Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
      enabled={isEnabled.value}
      onToggle$={handleToggle}
    >
      {/* Basic Configuration */}
      <div class="mb-6 space-y-4">
        <SectionTitle title={$localize`Basic Configuration`} />

        {/* Network Selection */}
        <ServerFormField label={$localize`Network`}>
          <NetworkDropdown
            selectedNetwork="VPN"
            onNetworkChange$={(network) => {
              console.log("L2TP network changed to:", network);
            }}
          />
        </ServerFormField>

        {/* Profile Name Field */}
        <ServerFormField label={$localize`Profile Name`}>
          <Input
            type="text"
            value={advancedFormState.profile}
            onChange$={(_, value) => updateProfile$(value)}
            placeholder={$localize`Enter profile name`}
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

        {/* Authentication Methods */}
        <ServerFormField label={$localize`Authentication Methods`}>
          <CheckboxGroup
            options={authOptions}
            selected={advancedFormState.authentication}
            onToggle$={toggleAuthMethod}
          />
        </ServerFormField>
      </div>

      {/* Advanced Configuration */}
      <div class="mb-6 space-y-4">
        <SectionTitle title={$localize`Advanced Configuration`} />

        {/* Max MTU Field */}
        <ServerFormField label={$localize`Max MTU`}>
          <Input
            type="number"
            value={advancedFormState.maxMtu.toString()}
            onChange$={(_, value) => updateMaxMtu$(parseInt(value, 10) || 1450)}
          />
        </ServerFormField>

        {/* Max MRU Field */}
        <ServerFormField label={$localize`Max MRU`}>
          <Input
            type="number"
            value={advancedFormState.maxMru.toString()}
            onChange$={(_, value) => updateMaxMru$(parseInt(value, 10) || 1450)}
          />
        </ServerFormField>

        {/* Keepalive Timeout Field */}
        <ServerFormField label={$localize`Keepalive Timeout (seconds)`}>
          <Input
            type="number"
            value={advancedFormState.keepaliveTimeout.toString()}
            onChange$={(_, value) =>
              updateKeepaliveTimeout$(parseInt(value, 10) || 30)
            }
          />
        </ServerFormField>

        {/* Allow Fast Path */}
        <ServerFormField label={$localize`Allow Fast Path`}>
          <input
            type="checkbox"
            checked={advancedFormState.allowFastPath}
            onChange$={() =>
              updateAllowFastPath$(!advancedFormState.allowFastPath)
            }
            class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
        </ServerFormField>

        {/* One Session Per Host */}
        <ServerFormField label={$localize`One Session Per Host`}>
          <input
            type="checkbox"
            checked={advancedFormState.oneSessionPerHost}
            onChange$={() =>
              updateOneSessionPerHost$(!advancedFormState.oneSessionPerHost)
            }
            class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
        </ServerFormField>
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
