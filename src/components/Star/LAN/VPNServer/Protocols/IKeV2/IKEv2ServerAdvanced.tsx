import { component$ } from "@builder.io/qwik";
import {
  HiServerOutline,
  HiLockClosedOutline,
  HiDocumentOutline,
} from "@qwikest/icons/heroicons";
import { useIKEv2Server } from "./useIKEv2Server";
import {
  ServerCard,
  ServerFormField,
  ServerButton,
  Select,
  SectionTitle,
  Input,
} from "../../UI";

export const IKEv2ServerAdvanced = component$(() => {
  const {
    advancedFormState,
    showPassword,
    certificateError,
    presharedKeyError,
    addressPoolError,
    authMethods,
    eapMethods,
    updateAddressPoolRanges$,
    updateAddressPoolName$,
    updateAuthMethod$,
    updatePresharedKey$,
    updateEapMethods$,
    updateServerCertificate$,
    updatePeerName$,
    updateProfileName$,
    updateProposalName$,
    updatePolicyGroupName$,
    updateModeConfigName$,
    updateStaticDns$,
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
            {/* Address Pool */}
            <ServerFormField
              label={$localize`Address Pool Range`}
              errorMessage={addressPoolError.value}
            >
              <Input
                type="text"
                value={advancedFormState.addressPoolRanges}
                onChange$={(_, value) => updateAddressPoolRanges$(value)}
                placeholder={$localize`e.g. 192.168.77.2-192.168.77.254`}
                validation={addressPoolError.value ? "invalid" : "default"}
              />
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {$localize`IP range for client address assignment`}
              </p>
            </ServerFormField>

            {/* Address Pool Name */}
            <ServerFormField label={$localize`Address Pool Name`}>
              <Input
                type="text"
                value={advancedFormState.addressPoolName}
                onChange$={(_, value) => updateAddressPoolName$(value)}
                placeholder={$localize`e.g. ike2-pool`}
              />
            </ServerFormField>

            {/* DNS Servers */}
            <ServerFormField label={$localize`DNS Servers`}>
              <Input
                type="text"
                value={advancedFormState.staticDns}
                onChange$={(_, value) => updateStaticDns$(value)}
                placeholder={$localize`e.g. 8.8.8.8,1.1.1.1`}
              />
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {$localize`Comma-separated list of DNS servers to push to clients`}
              </p>
            </ServerFormField>

            {/* Peer Name */}
            <ServerFormField label={$localize`Peer Name`}>
              <Input
                type="text"
                value={advancedFormState.peerName}
                onChange$={(_, value) => updatePeerName$(value)}
                placeholder={$localize`Enter peer name`}
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
              <Select
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

            {/* EAP Methods */}
            {advancedFormState.authMethod === "eap" && (
              <ServerFormField label={$localize`EAP Method`}>
                <Select
                  options={eapMethods}
                  value={advancedFormState.eapMethods}
                  onChange$={(value) => updateEapMethods$(value as any)}
                />
              </ServerFormField>
            )}

            {/* Server Certificate */}
            {(advancedFormState.authMethod === "digital-signature" ||
              advancedFormState.authMethod === "eap") && (
              <ServerFormField
                label={$localize`Server Certificate`}
                errorMessage={certificateError.value}
              >
                <div class="flex items-center gap-2">
                  <Input
                    type="text"
                    value={advancedFormState.serverCertificate}
                    onChange$={(_, value) => updateServerCertificate$(value)}
                    placeholder={$localize`Enter certificate name`}
                    validation={certificateError.value ? "invalid" : "default"}
                  />
                  <ServerButton
                    onClick$={() => {}}
                    primary={false}
                    class="flex items-center gap-1"
                  >
                    <HiDocumentOutline class="h-5 w-5" />
                    {$localize`Select`}
                  </ServerButton>
                </div>
              </ServerFormField>
            )}
          </div>
        </div>

        {/* IPsec Settings */}
        <div>
          <SectionTitle title={$localize`IPsec Settings`} />
          <div class="space-y-4">
            {/* IPsec Profile */}
            <ServerFormField label={$localize`IPsec Profile Name`}>
              <Input
                type="text"
                value={advancedFormState.profileName}
                onChange$={(_, value) => updateProfileName$(value)}
                placeholder={$localize`Enter IPsec profile name`}
              />
            </ServerFormField>

            {/* IPsec Proposal */}
            <ServerFormField label={$localize`IPsec Proposal Name`}>
              <Input
                type="text"
                value={advancedFormState.proposalName}
                onChange$={(_, value) => updateProposalName$(value)}
                placeholder={$localize`Enter IPsec proposal name`}
              />
            </ServerFormField>

            {/* Policy Template Group */}
            <ServerFormField label={$localize`Policy Template Group`}>
              <Input
                type="text"
                value={advancedFormState.policyGroupName}
                onChange$={(_, value) => updatePolicyGroupName$(value)}
                placeholder={$localize`Enter policy template group name`}
              />
            </ServerFormField>

            {/* Mode Config Name */}
            <ServerFormField label={$localize`Mode Config Name`}>
              <Input
                type="text"
                value={advancedFormState.modeConfigName}
                onChange$={(_, value) => updateModeConfigName$(value)}
                placeholder={$localize`Enter mode config name`}
              />
            </ServerFormField>
          </div>
        </div>
      </div>
    </ServerCard>
  );
});
