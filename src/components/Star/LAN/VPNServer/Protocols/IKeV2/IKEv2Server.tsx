import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { HiServerOutline, HiLockClosedOutline, HiDocumentOutline } from "@qwikest/icons/heroicons";
import { useIKEv2Server } from "./useIKEv2Server";
import type { ClientAuthMethod } from "../../../../StarContext/LANType";
import { ServerCard } from "~/components/Core/Card";
import { 
  ServerFormField, 
  ServerButton,
  Select,
  SectionTitle
} from "~/components/Core/Form/ServerField";
import { Input } from "~/components/Core/Input";

// Create a serialized version of the server icon
const ServerIcon = $(HiServerOutline);

export const IKEv2Server = component$(() => {
  const { 
    ikev2State, 
    updateIKEv2Server$, 
    certificateError, 
    presharedKeyError,
    addressPoolError 
  } = useIKEv2Server();
  
  const formState = useStore({
    addressPool: ikev2State.AddressPool || "192.168.77.0/24",
    clientAuthMethod: ikev2State.ClientAuthMethod || "digital-signature",
    presharedKey: ikev2State.PresharedKey || "",
    eapMethods: ikev2State.EapMethods || "eap-mschapv2,eap-tls",
    serverCertificate: ikev2State.ServerCertificate || "",
    clientCaCertificate: ikev2State.ClientCaCertificate || "",
    dnsServers: ikev2State.DnsServers || "",
    peerName: ikev2State.PeerName || "",
    ipsecProfile: ikev2State.IpsecProfile || "default",
    ipsecProposal: ikev2State.IpsecProposal || "default",
    policyTemplateGroup: ikev2State.PolicyTemplateGroup || "default"
  });

  const isEnabled = useSignal(!!ikev2State.AddressPool);
  const showPassword = useSignal(false);

  const authMethods: {value: ClientAuthMethod, label: string}[] = [
    { value: "digital-signature", label: "Digital Signature (Certificate)" },
    { value: "pre-shared-key", label: "Pre-shared Key" },
    { value: "eap", label: "EAP" }
  ];

  const applyChanges = $(() => {
    try {
      if (isEnabled.value) {
        updateIKEv2Server$({
          AddressPool: formState.addressPool,
          ClientAuthMethod: formState.clientAuthMethod as ClientAuthMethod,
          PresharedKey: formState.presharedKey,
          EapMethods: formState.eapMethods,
          ServerCertificate: formState.serverCertificate,
          ClientCaCertificate: formState.clientCaCertificate,
          DnsServers: formState.dnsServers,
          PeerName: formState.peerName,
          IpsecProfile: formState.ipsecProfile,
          IpsecProposal: formState.ipsecProposal,
          PolicyTemplateGroup: formState.policyTemplateGroup
        });
      } else {
        updateIKEv2Server$({
          AddressPool: ""
        });
      }
    } catch (error) {
      console.error("Error applying IKEv2 settings:", error);
    }
  });

  const handleToggle = $((enabled: boolean) => {
    try {
      isEnabled.value = enabled;
      if (isEnabled.value && !formState.addressPool) {
        formState.addressPool = "192.168.77.0/24";
      }
      applyChanges();
    } catch (error) {
      console.error("Error toggling IKEv2 server:", error);
      isEnabled.value = !enabled; // Revert the change if there's an error
    }
  });

  return (
    <ServerCard
      title={$localize`IKEv2 Server`}
      icon={ServerIcon}
      enabled={isEnabled.value}
      onToggle$={handleToggle}
    >
      <div class="space-y-6 md:space-y-8">
        {/* Basic Settings */}
        <div>
          <SectionTitle title={$localize`Basic Settings`} />
          <div class="space-y-4">
            {/* Address Pool */}
            <ServerFormField 
              label={$localize`Address Pool`}
              errorMessage={addressPoolError.value}
            >
              <Input
                type="text"
                value={formState.addressPool}
                onChange$={(_, value) => (formState.addressPool = value)}
                placeholder={$localize`e.g. 192.168.77.0/24`}
                validation={addressPoolError.value ? "invalid" : "default"}
              />
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {$localize`IP pool for client address assignment`}
              </p>
            </ServerFormField>

            {/* DNS Servers */}
            <ServerFormField label={$localize`DNS Servers`}>
              <Input
                type="text"
                value={formState.dnsServers}
                onChange$={(_, value) => (formState.dnsServers = value)}
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
                onChange$={(_, value) => (formState.peerName = value)}
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
                value={formState.clientAuthMethod}
                onChange$={(value) => (formState.clientAuthMethod = value as ClientAuthMethod)}
              />
            </ServerFormField>

            {/* Pre-shared Key */}
            {formState.clientAuthMethod === "pre-shared-key" && (
              <ServerFormField 
                label={$localize`Pre-shared Key`}
                errorMessage={presharedKeyError.value}
              >
                <div class="relative">
                  <Input
                    type={showPassword.value ? "text" : "password"}
                    value={formState.presharedKey}
                    onChange$={(_, value) => (formState.presharedKey = value)}
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
            {formState.clientAuthMethod === "eap" && (
              <ServerFormField label={$localize`EAP Methods`}>
                <Input
                  type="text"
                  value={formState.eapMethods}
                  onChange$={(_, value) => (formState.eapMethods = value)}
                  placeholder={$localize`e.g. eap-mschapv2,eap-tls`}
                />
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {$localize`Comma-separated list of supported EAP methods`}
                </p>
              </ServerFormField>
            )}

            {/* Server Certificate */}
            {(formState.clientAuthMethod === "digital-signature" || formState.clientAuthMethod === "eap") && (
              <ServerFormField 
                label={$localize`Server Certificate`}
                errorMessage={certificateError.value}
              >
                <div class="flex items-center gap-2">
                  <Input
                    type="text"
                    value={formState.serverCertificate}
                    onChange$={(_, value) => (formState.serverCertificate = value)}
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

            {/* Client CA Certificate */}
            {formState.clientAuthMethod === "digital-signature" && (
              <ServerFormField label={$localize`Client CA Certificate`}>
                <div class="flex items-center gap-2">
                  <Input
                    type="text"
                    value={formState.clientCaCertificate}
                    onChange$={(_, value) => (formState.clientCaCertificate = value)}
                    placeholder={$localize`Enter CA certificate name`}
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
            <ServerFormField label={$localize`IPsec Profile`}>
              <Input
                type="text"
                value={formState.ipsecProfile}
                onChange$={(_, value) => (formState.ipsecProfile = value)}
                placeholder={$localize`Enter IPsec profile name`}
              />
            </ServerFormField>

            {/* IPsec Proposal */}
            <ServerFormField label={$localize`IPsec Proposal`}>
              <Input
                type="text"
                value={formState.ipsecProposal}
                onChange$={(_, value) => (formState.ipsecProposal = value)}
                placeholder={$localize`Enter IPsec proposal name`}
              />
            </ServerFormField>

            {/* Policy Template Group */}
            <ServerFormField label={$localize`Policy Template Group`}>
              <Input
                type="text"
                value={formState.policyTemplateGroup}
                onChange$={(_, value) => (formState.policyTemplateGroup = value)}
                placeholder={$localize`Enter policy template group name`}
              />
            </ServerFormField>
          </div>
        </div>

        <ServerButton
          onClick$={applyChanges}
          class="mt-4"
        >
          {$localize`Apply Settings`}
        </ServerButton>
      </div>
    </ServerCard>
  );
});