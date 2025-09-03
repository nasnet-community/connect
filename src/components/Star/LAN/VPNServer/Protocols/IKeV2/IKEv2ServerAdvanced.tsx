import { component$ } from "@builder.io/qwik";
import {
  HiServerOutline,
  HiLockClosedOutline,
} from "@qwikest/icons/heroicons";
import { useIKEv2Server } from "./useIKEv2Server";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { ServerFormField, SectionTitle } from "~/components/Core/Form/ServerField";
import { UnifiedSelect } from "~/components/Core/Select/UnifiedSelect";
import { Input } from "~/components/Core/Input";
import { NetworkDropdown } from "../../components/NetworkSelection";

export const IKEv2ServerAdvanced = component$(() => {
  const {
    advancedFormState,
    showPassword,
    presharedKeyError,
    authMethods,
    updateAuthMethod$,
    updatePresharedKey$,
    togglePasswordVisibility$,
  } = useIKEv2Server();

  return (
    <ServerCard
      title={$localize`IKEv2 Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6 md:space-y-8">
        {/* Basic Settings */}
        <div>
          <SectionTitle title={$localize`Basic Settings`} />
          <div class="space-y-4">
            {/* Network Selection */}
            <ServerFormField label={$localize`Network`}>
              <NetworkDropdown
                selectedNetwork="VPN"
                onNetworkChange$={(network) => {
                  console.log("IKEv2 network changed to:", network);
                }}
              />
            </ServerFormField>

          </div>
        </div>

        {/* Authentication */}
        <div>
          <SectionTitle title={$localize`Authentication`} />
          <div class="space-y-4">
            {/* Client Authentication Method */}
            <ServerFormField label={$localize`Client Authentication Method`}>
              <UnifiedSelect
                options={authMethods}
                value={advancedFormState.authMethod}
                onChange$={(value) => updateAuthMethod$(value as any)}
              />
            </ServerFormField>

            {/* Pre-shared Key */}
            {advancedFormState.authMethod === "pre-shared-key" && (
              <ServerFormField
                label={$localize`Pre-shared Key`}
                errorMessage={presharedKeyError.value}
              >
                <div class="relative">
                  <Input
                    type={showPassword.value ? "text" : "password"}
                    value={advancedFormState.presharedKey}
                    onChange$={(_, value) => updatePresharedKey$(value)}
                    placeholder={$localize`Enter pre-shared key`}
                    validation={presharedKeyError.value ? "invalid" : "default"}
                    hasSuffixSlot={true}
                  >
                    <button
                      q:slot="suffix"
                      type="button"
                      onClick$={togglePasswordVisibility$}
                      class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <HiLockClosedOutline class="h-5 w-5" />
                    </button>
                  </Input>
                </div>
              </ServerFormField>
            )}


          </div>
        </div>

        {/* Certificate Configuration Note */}
        <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h4 class="mb-2 text-sm font-medium text-blue-800 dark:text-blue-200">
            {$localize`Certificate Configuration`}
          </h4>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            {$localize`IKEv2 server certificates are configured in the Certificate step when using digital signature authentication. This ensures consistent certificate management across all protocols.`}
          </p>
        </div>
      </div>
    </ServerCard>
  );
});
