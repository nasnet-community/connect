import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { HiServerOutline, HiLockClosedOutline, HiDocumentOutline } from "@qwikest/icons/heroicons";
import { useIKEv2Server } from "./useIKEv2Server";
import type { ClientAuthMethod } from "../../../../StarContext/LANType";

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
  });

  return (
    <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div class="mb-6 flex items-center gap-3">
        <HiServerOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{$localize`IKEv2 Server`}</h3>
      </div>

      <div class="mb-4 flex items-center justify-between">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {$localize`Enable IKEv2 Server`}
        </label>
        <label class="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={isEnabled.value}
            class="peer sr-only"
            onChange$={() => {
              isEnabled.value = !isEnabled.value;
              if (isEnabled.value && !formState.addressPool) {
                formState.addressPool = "192.168.77.0/24";
              }
              applyChanges();
            }}
          />
          <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/25 dark:border-gray-600 dark:bg-gray-700"></div>
        </label>
      </div>

      {isEnabled.value && (
        <div class="space-y-6 md:space-y-8">
          {/* Basic Settings */}
          <div>
            <h4 class="mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
              {$localize`Basic Settings`}
            </h4>
            <div class="space-y-4">
              {/* Address Pool */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Address Pool`}
                </label>
                <input
                  type="text"
                  value={formState.addressPool}
                  onChange$={(e) => (formState.addressPool = (e.target as HTMLInputElement).value)}
                  class={`w-full rounded-lg border ${
                    addressPoolError.value
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600"
                  } px-4 py-2 dark:bg-gray-700 dark:text-white`}
                  placeholder={$localize`e.g. 192.168.77.0/24`}
                />
                {addressPoolError.value && (
                  <p class="mt-1 text-sm text-red-600 dark:text-red-500">
                    {addressPoolError.value}
                  </p>
                )}
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {$localize`IP pool for client address assignment`}
                </p>
              </div>

              {/* DNS Servers */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`DNS Servers`}
                </label>
                <input
                  type="text"
                  value={formState.dnsServers}
                  onChange$={(e) => (formState.dnsServers = (e.target as HTMLInputElement).value)}
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder={$localize`e.g. 8.8.8.8,1.1.1.1`}
                />
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {$localize`Comma-separated list of DNS servers to push to clients`}
                </p>
              </div>

              {/* Peer Name */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Peer Name`}
                </label>
                <input
                  type="text"
                  value={formState.peerName}
                  onChange$={(e) => (formState.peerName = (e.target as HTMLInputElement).value)}
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder={$localize`Enter peer name`}
                />
              </div>
            </div>
          </div>

          {/* Authentication */}
          <div>
            <h4 class="mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
              {$localize`Authentication`}
            </h4>
            <div class="space-y-4">
              {/* Client Authentication Method */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Client Authentication Method`}
                </label>
                <select
                  value={formState.clientAuthMethod}
                  onChange$={(e) => (formState.clientAuthMethod = (e.target as HTMLSelectElement).value as ClientAuthMethod)}
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  {authMethods.map((method) => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pre-shared Key */}
              {formState.clientAuthMethod === "pre-shared-key" && (
                <div>
                  <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {$localize`Pre-shared Key`}
                  </label>
                  <div class="relative">
                    <input
                      type={showPassword.value ? "text" : "password"}
                      value={formState.presharedKey}
                      onChange$={(e) => (formState.presharedKey = (e.target as HTMLInputElement).value)}
                      class={`w-full rounded-lg border ${
                        presharedKeyError.value
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600"
                      } px-4 py-2 dark:bg-gray-700 dark:text-white`}
                      placeholder={$localize`Enter pre-shared key`}
                    />
                    <button
                      type="button"
                      onClick$={() => (showPassword.value = !showPassword.value)}
                      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <HiLockClosedOutline class="h-5 w-5" />
                    </button>
                  </div>
                  {presharedKeyError.value && (
                    <p class="mt-1 text-sm text-red-600 dark:text-red-500">
                      {presharedKeyError.value}
                    </p>
                  )}
                </div>
              )}

              {/* EAP Methods */}
              {formState.clientAuthMethod === "eap" && (
                <div>
                  <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {$localize`EAP Methods`}
                  </label>
                  <input
                    type="text"
                    value={formState.eapMethods}
                    onChange$={(e) => (formState.eapMethods = (e.target as HTMLInputElement).value)}
                    class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder={$localize`e.g. eap-mschapv2,eap-tls`}
                  />
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {$localize`Comma-separated list of supported EAP methods`}
                  </p>
                </div>
              )}

              {/* Server Certificate */}
              {(formState.clientAuthMethod === "digital-signature" || formState.clientAuthMethod === "eap") && (
                <div>
                  <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {$localize`Server Certificate`}
                  </label>
                  <div class="flex items-center gap-2">
                    <input
                      type="text"
                      value={formState.serverCertificate}
                      onChange$={(e) => (formState.serverCertificate = (e.target as HTMLInputElement).value)}
                      class={`w-full rounded-lg border ${
                        certificateError.value
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600"
                      } px-4 py-2 dark:bg-gray-700 dark:text-white`}
                      placeholder={$localize`Enter certificate name`}
                    />
                    <button
                      type="button"
                      class="flex items-center gap-1 rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      <HiDocumentOutline class="h-5 w-5" />
                      {$localize`Select`}
                    </button>
                  </div>
                  {certificateError.value && (
                    <p class="mt-1 text-sm text-red-600 dark:text-red-500">
                      {certificateError.value}
                    </p>
                  )}
                </div>
              )}

              {/* Client CA Certificate */}
              {formState.clientAuthMethod === "digital-signature" && (
                <div>
                  <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {$localize`Client CA Certificate`}
                  </label>
                  <div class="flex items-center gap-2">
                    <input
                      type="text"
                      value={formState.clientCaCertificate}
                      onChange$={(e) => (formState.clientCaCertificate = (e.target as HTMLInputElement).value)}
                      class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder={$localize`Enter CA certificate name`}
                    />
                    <button
                      type="button"
                      class="flex items-center gap-1 rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      <HiDocumentOutline class="h-5 w-5" />
                      {$localize`Select`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* IPsec Settings */}
          <div>
            <h4 class="mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
              {$localize`IPsec Settings`}
            </h4>
            <div class="space-y-4">
              {/* IPsec Profile */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`IPsec Profile`}
                </label>
                <input
                  type="text"
                  value={formState.ipsecProfile}
                  onChange$={(e) => (formState.ipsecProfile = (e.target as HTMLInputElement).value)}
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder={$localize`Enter IPsec profile name`}
                />
              </div>

              {/* IPsec Proposal */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`IPsec Proposal`}
                </label>
                <input
                  type="text"
                  value={formState.ipsecProposal}
                  onChange$={(e) => (formState.ipsecProposal = (e.target as HTMLInputElement).value)}
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder={$localize`Enter IPsec proposal name`}
                />
              </div>

              {/* Policy Template Group */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Policy Template Group`}
                </label>
                <input
                  type="text"
                  value={formState.policyTemplateGroup}
                  onChange$={(e) => (formState.policyTemplateGroup = (e.target as HTMLInputElement).value)}
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder={$localize`Enter policy template group name`}
                />
              </div>
            </div>
          </div>

          <button
            onClick$={applyChanges}
            class="mt-4 rounded-lg bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-500/25 dark:bg-primary-600 dark:hover:bg-primary-700"
          >
            {$localize`Apply Settings`}
          </button>
        </div>
      )}
    </div>
  );
}); 