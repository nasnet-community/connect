import { component$ } from "@builder.io/qwik";
import { HiServerOutline, HiLockClosedOutline } from "@qwikest/icons/heroicons";
import { useIKEv2Server } from "./useIKEv2Server";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import {
  ServerFormField,
  SectionTitle,
} from "~/components/Core/Form/ServerField";
import { UnifiedSelect } from "~/components/Core/Select/UnifiedSelect";
import { Input } from "~/components/Core/Input";
import { NetworkDropdown } from "../../components/NetworkSelection";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const IKEv2ServerAdvanced = component$(() => {
  const locale = useMessageLocale();
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
      title={semanticMessages.vpn_server_ikev2_title({}, { locale })}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6 md:space-y-8">
        {/* Basic Settings */}
        <div>
          <SectionTitle
            title={semanticMessages.vpn_server_basic_settings({}, { locale })}
          />
          <div class="space-y-4">
            {/* Network Selection */}
            <ServerFormField
              label={semanticMessages.vpn_server_network_label({}, { locale })}
            >
              <NetworkDropdown
                selectedNetwork={"VPN" as const}
                onNetworkChange$={(network) => {
                  console.log("IKEv2 network changed to:", network);
                }}
              />
            </ServerFormField>
          </div>
        </div>

        {/* Authentication */}
        <div>
          <SectionTitle
            title={semanticMessages.vpn_server_authentication({}, { locale })}
          />
          <div class="space-y-4">
            {/* Client Authentication Method */}
            <ServerFormField
              label={semanticMessages.vpn_server_client_auth_method(
                {},
                { locale },
              )}
            >
              <UnifiedSelect
                options={authMethods}
                value={advancedFormState.authMethod}
                onChange$={(value) => updateAuthMethod$(value as any)}
              />
            </ServerFormField>

            {/* Pre-shared Key */}
            {advancedFormState.authMethod === "pre-shared-key" && (
              <ServerFormField
                label={semanticMessages.vpn_server_preshared_key(
                  {},
                  { locale },
                )}
                errorMessage={presharedKeyError.value}
              >
                <div class="relative">
                  <Input
                    type={showPassword.value ? "text" : "password"}
                    value={advancedFormState.presharedKey}
                    onChange$={(_, value) => updatePresharedKey$(value)}
                    placeholder={semanticMessages.vpn_server_enter_preshared_key(
                      {},
                      { locale },
                    )}
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
            {semanticMessages.vpn_server_certificate_configuration_title(
              {},
              { locale },
            )}
          </h4>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            {semanticMessages.vpn_server_ikev2_certificate_description(
              {},
              { locale },
            )}
          </p>
        </div>
      </div>
    </ServerCard>
  );
});
