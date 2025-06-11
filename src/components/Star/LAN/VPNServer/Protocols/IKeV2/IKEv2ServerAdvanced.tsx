import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { HiServerOutline, HiLockClosedOutline, HiDocumentOutline } from "@qwikest/icons/heroicons";
import { useIKEv2Server } from "./useIKEv2Server";
import { 
  ServerCard, 
  ServerFormField, 
  ServerButton,
  Select,
  SectionTitle,
  Input
} from "../../UI";
import type { IpsecIdentityAuthMethod, IpsecIdentityEapMethod } from "../../../../StarContext/Utils/VPNServerType";

export const IKEv2ServerAdvanced = component$(() => {
  const { 
    ikev2State, 
    updateIKEv2Server$, 
    certificateError, 
    presharedKeyError,
    addressPoolError 
  } = useIKEv2Server();
  
  const formState = useStore({
    addressPoolRanges: ikev2State.ipPools?.Ranges || "192.168.77.2-192.168.77.254",
    addressPoolName: ikev2State.ipPools?.Name || "ike2-pool",
    authMethod: ikev2State.identities?.authMethod || "digital-signature",
    presharedKey: ikev2State.identities?.secret || "",
    eapMethods: ikev2State.identities?.eapMethods || "eap-mschapv2",
    serverCertificate: ikev2State.identities?.certificate || "",
    peerName: ikev2State.peer?.name || "ike2",
    profileName: ikev2State.profile?.name || "ike2",
    proposalName: ikev2State.proposal?.name || "ike2",
    policyGroupName: ikev2State.policyGroup?.name || "ike2-policies",
    modeConfigName: ikev2State.modeConfigs?.name || "ike2-conf",
    staticDns: ikev2State.modeConfigs?.staticDns || ""
  });

  const showPassword = useSignal(false);

  const authMethods: {value: IpsecIdentityAuthMethod, label: string}[] = [
    { value: "digital-signature", label: "Digital Signature (Certificate)" },
    { value: "pre-shared-key", label: "Pre-shared Key" },
    { value: "eap", label: "EAP" }
  ];

  const eapMethods: {value: IpsecIdentityEapMethod, label: string}[] = [
    { value: "eap-mschapv2", label: "EAP-MSCHAPv2" },
    { value: "eap-tls", label: "EAP-TLS" },
    { value: "eap-peap", label: "EAP-PEAP" },
    { value: "eap-ttls", label: "EAP-TTLS" }
  ];

  // Helper function to update the server configuration
  const updateServerConfig = $((updatedValues: Partial<typeof formState>) => {
    // Update local state first
    Object.assign(formState, updatedValues);
    
    // Then update server config with proper StarContext structure
    updateIKEv2Server$({
      ipPools: {
        Name: formState.addressPoolName,
        Ranges: formState.addressPoolRanges
      },
      identities: {
        authMethod: formState.authMethod,
        secret: formState.presharedKey,
        eapMethods: formState.eapMethods,
        certificate: formState.serverCertificate,
        peer: formState.peerName,
        generatePolicy: "port-strict",
        policyTemplateGroup: formState.policyGroupName
      },
      peer: {
        name: formState.peerName,
        exchangeMode: "ike2",
        passive: true,
        profile: formState.profileName
      },
      profile: {
        name: formState.profileName
      },
      proposal: {
        name: formState.proposalName
      },
      policyGroup: {
        name: formState.policyGroupName
      },
      modeConfigs: {
        name: formState.modeConfigName,
        addressPool: formState.addressPoolName,
        addressPrefixLength: 32,
        responder: true,
        staticDns: formState.staticDns
      }
    });
  });

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
                value={formState.addressPoolRanges}
                onChange$={(_, value) => updateServerConfig({ addressPoolRanges: value })}
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
                value={formState.addressPoolName}
                onChange$={(_, value) => updateServerConfig({ addressPoolName: value })}
                placeholder={$localize`e.g. ike2-pool`}
              />
            </ServerFormField>

            {/* DNS Servers */}
            <ServerFormField label={$localize`DNS Servers`}>
              <Input
                type="text"
                value={formState.staticDns}
                onChange$={(_, value) => updateServerConfig({ staticDns: value })}
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
                value={formState.peerName}
                onChange$={(_, value) => updateServerConfig({ peerName: value })}
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
                value={formState.authMethod}
                onChange$={(value) => updateServerConfig({ authMethod: value as IpsecIdentityAuthMethod })}
              />
            </ServerFormField>

            {/* Pre-shared Key */}
            {formState.authMethod === "pre-shared-key" && (
              <ServerFormField 
                label={$localize`Pre-shared Key`}
                errorMessage={presharedKeyError.value}
              >
                <div class="relative">
                  <Input
                    type={showPassword.value ? "text" : "password"}
                    value={formState.presharedKey}
                    onChange$={(_, value) => updateServerConfig({ presharedKey: value })}
                    placeholder={$localize`Enter pre-shared key`}
                    validation={presharedKeyError.value ? "invalid" : "default"}
                    hasSuffixSlot={true}
                  >
                    <button
                      q:slot="suffix"
                      type="button"
                      onClick$={() => (showPassword.value = !showPassword.value)}
                      class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <HiLockClosedOutline class="h-5 w-5" />
                    </button>
                  </Input>
                </div>
              </ServerFormField>
            )}

            {/* EAP Methods */}
            {formState.authMethod === "eap" && (
              <ServerFormField label={$localize`EAP Method`}>
                <Select
                  options={eapMethods}
                  value={formState.eapMethods}
                  onChange$={(value) => updateServerConfig({ eapMethods: value as IpsecIdentityEapMethod })}
                />
              </ServerFormField>
            )}

            {/* Server Certificate */}
            {(formState.authMethod === "digital-signature" || formState.authMethod === "eap") && (
              <ServerFormField 
                label={$localize`Server Certificate`}
                errorMessage={certificateError.value}
              >
                <div class="flex items-center gap-2">
                  <Input
                    type="text"
                    value={formState.serverCertificate}
                    onChange$={(_, value) => updateServerConfig({ serverCertificate: value })}
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
                value={formState.profileName}
                onChange$={(_, value) => updateServerConfig({ profileName: value })}
                placeholder={$localize`Enter IPsec profile name`}
              />
            </ServerFormField>

            {/* IPsec Proposal */}
            <ServerFormField label={$localize`IPsec Proposal Name`}>
              <Input
                type="text"
                value={formState.proposalName}
                onChange$={(_, value) => updateServerConfig({ proposalName: value })}
                placeholder={$localize`Enter IPsec proposal name`}
              />
            </ServerFormField>

            {/* Policy Template Group */}
            <ServerFormField label={$localize`Policy Template Group`}>
              <Input
                type="text"
                value={formState.policyGroupName}
                onChange$={(_, value) => updateServerConfig({ policyGroupName: value })}
                placeholder={$localize`Enter policy template group name`}
              />
            </ServerFormField>

            {/* Mode Config Name */}
            <ServerFormField label={$localize`Mode Config Name`}>
              <Input
                type="text"
                value={formState.modeConfigName}
                onChange$={(_, value) => updateServerConfig({ modeConfigName: value })}
                placeholder={$localize`Enter mode config name`}
              />
            </ServerFormField>
          </div>
        </div>
      </div>
    </ServerCard>
  );
});