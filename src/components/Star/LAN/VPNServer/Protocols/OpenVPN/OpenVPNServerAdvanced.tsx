import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import type { NetworkProtocol, LayerMode, TLSVersion } from "../../../../StarContext/CommonType";
import type { OvpnAuthMethod, OvpnCipher } from "../../../../StarContext/LANType";
import { protocols, modes, authMethods, ciphers, tlsVersions } from "./constants";
import { Card, FormField, Input, Button, TabNavigation, Select } from "../../UI";
import { useOpenVPNServer } from "./useOpenVPNServer";
import { HiDocumentOutline, HiLockClosedOutline, HiServerOutline } from "@qwikest/icons/heroicons";

export const OpenVPNServerAdvanced = component$(() => {
  const { openVpnState, updateOpenVPNServer$, certificateError, passphraseError } = useOpenVPNServer();
  
  const formState = useStore({
    profile: openVpnState.Profile || "default",
    certificate: openVpnState.Certificate || "",
    enabled: openVpnState.Enabled !== undefined ? openVpnState.Enabled : true,
    port: openVpnState.Port || 1194,
    protocol: openVpnState.Protocol || "tcp",
    mode: openVpnState.Mode || "ip",
    netmask: openVpnState.Netmask || 24,
    addressPool: openVpnState.AddressPool || "192.168.78.0/24",
    requireClientCertificate: openVpnState.RequireClientCertificate !== undefined ? openVpnState.RequireClientCertificate : false,
    auth: openVpnState.Auth || "sha256",
    cipher: openVpnState.Cipher || "aes256-gcm",
    certificateKeyPassphrase: openVpnState.CertificateKeyPassphrase || "",
    maxSessions: openVpnState.MaxSessions || 10,
    defaultProfile: openVpnState.DefaultProfile || "default",
    tlsVersion: openVpnState.TlsVersion || "only-1.2"
  });

  const isEnabled = useSignal(!!openVpnState.Profile);
  const showPassphrase = useSignal(false);
  const activeTab = useSignal<'basic' | 'network' | 'security'>('basic');

  const tabOptions = [
    { id: 'basic', label: $localize`Basic Settings` },
    { id: 'network', label: $localize`Network Settings` },
    { id: 'security', label: $localize`Security Settings` }
  ];

  const applyChanges = $(() => {
    try {
      if (isEnabled.value) {
        updateOpenVPNServer$({
          Profile: formState.profile,
          Certificate: formState.certificate,
          Enabled: formState.enabled,
          Port: formState.port,
          Protocol: formState.protocol as NetworkProtocol,
          Mode: formState.mode as LayerMode,
          Netmask: formState.netmask,
          AddressPool: formState.addressPool,
          RequireClientCertificate: formState.requireClientCertificate,
          Auth: formState.auth as OvpnAuthMethod,
          Cipher: formState.cipher as OvpnCipher,
          CertificateKeyPassphrase: formState.certificateKeyPassphrase,
          MaxSessions: formState.maxSessions,
          DefaultProfile: formState.defaultProfile,
          TlsVersion: formState.tlsVersion as TLSVersion
        });
      } else {
        updateOpenVPNServer$({
          Profile: ""
        });
      }
    } catch (error) {
      console.error("Error applying OpenVPN settings:", error);
    }
  });

  const handleToggle = $((enabled: boolean) => {
    try {
      isEnabled.value = enabled;
      if (isEnabled.value && !formState.profile) {
        formState.profile = "default";
      }
      applyChanges();
    } catch (error) {
      console.error("Error toggling OpenVPN server:", error);
      isEnabled.value = !enabled; // Revert the change if there's an error
    }
  });

  return (
    <Card
      title={$localize`OpenVPN Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
      enabled={isEnabled.value}
      onToggle$={handleToggle}
    >
      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabOptions}
        activeTab={activeTab.value}
        onSelect$={(tabId: string) => (activeTab.value = tabId as 'basic' | 'network' | 'security')}
      />

      {/* Basic Settings */}
      {activeTab.value === 'basic' && (
        <div class="space-y-4">
          {/* Profile Name */}
          <FormField label={$localize`Profile Name`}>
            <Input
              type="text"
              value={formState.profile}
              onChange$={(event: Event, value: string) => (formState.profile = value)}
              placeholder={$localize`Enter profile name`}
            />
          </FormField>

          {/* Certificate */}
          <FormField 
            label={$localize`Server Certificate`}
            errorMessage={certificateError.value}
          >
            <div class="flex items-center gap-2">
              <Input
                type="text"
                value={formState.certificate}
                onChange$={(event: Event, value: string) => (formState.certificate = value)}
                placeholder={$localize`Enter certificate name`}
                validation={certificateError.value ? "invalid" : "default"}
              />
              <Button
                onClick$={() => {}}
                primary={false}
                class="flex items-center gap-1"
              >
                <HiDocumentOutline class="h-5 w-5" />
                {$localize`Select`}
              </Button>
            </div>
          </FormField>

          {/* Certificate Key Passphrase */}
          <FormField 
            label={$localize`Certificate Key Passphrase`}
            errorMessage={passphraseError.value}
          >
            <div class="relative">
              <Input
                type={showPassphrase.value ? "text" : "password"}
                value={formState.certificateKeyPassphrase}
                onChange$={(event: Event, value: string) => (formState.certificateKeyPassphrase = value)}
                placeholder={$localize`Enter passphrase (at least 10 characters)`}
                validation={passphraseError.value ? "invalid" : "default"}
                hasSuffixSlot={true}
              >
                <button
                  q:slot="suffix"
                  type="button"
                  onClick$={() => (showPassphrase.value = !showPassphrase.value)}
                  class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <HiLockClosedOutline class="h-5 w-5" />
                </button>
              </Input>
            </div>
          </FormField>

          {/* Enabled Checkbox */}
          <FormField label={$localize`Enable this VPN server instance`}>
            <input
              type="checkbox"
              checked={formState.enabled}
              onChange$={() => (formState.enabled = !formState.enabled)}
              class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
          </FormField>

          {/* Protocol */}
          <FormField label={$localize`Protocol`}>
            <Select
              options={protocols}
              value={formState.protocol}
              onChange$={(value: string) => (formState.protocol = value as NetworkProtocol)}
            />
          </FormField>

          {/* Port */}
          <FormField label={$localize`Port`}>
            <Input
              type="number"
              value={formState.port.toString()}
              onChange$={(event: Event, value: string) => (formState.port = parseInt(value, 10))}
              placeholder="1-65535"
            />
          </FormField>
        </div>
      )}

      {/* Network Settings */}
      {activeTab.value === 'network' && (
        <div class="space-y-4">
          {/* Mode */}
          <FormField label={$localize`Mode`}>
            <Select
              options={modes}
              value={formState.mode}
              onChange$={(value: string) => (formState.mode = value as LayerMode)}
            />
          </FormField>

          {/* Address Pool */}
          <FormField label={$localize`Address Pool`}>
            <Input
              type="text"
              value={formState.addressPool}
              onChange$={(event: Event, value: string) => (formState.addressPool = value)}
              placeholder={$localize`e.g. 192.168.78.0/24`}
            />
          </FormField>

          {/* Netmask */}
          <FormField label={$localize`Netmask (subnet bits)`}>
            <Input
              type="number"
              value={formState.netmask.toString()}
              onChange$={(event: Event, value: string) => (formState.netmask = parseInt(value, 10))}
              placeholder="8-30"
            />
          </FormField>

          {/* Max Sessions */}
          <FormField label={$localize`Maximum Sessions`}>
            <Input
              type="number"
              value={formState.maxSessions.toString()}
              onChange$={(event: Event, value: string) => (formState.maxSessions = parseInt(value, 10))}
              placeholder="1-500"
            />
          </FormField>
        </div>
      )}

      {/* Security Settings */}
      {activeTab.value === 'security' && (
        <div class="space-y-4">
          {/* Authentication Method */}
          <FormField label={$localize`Authentication Method`}>
            <Select
              options={authMethods}
              value={formState.auth}
              onChange$={(value: string) => (formState.auth = value as OvpnAuthMethod)}
            />
          </FormField>

          {/* Cipher */}
          <FormField label={$localize`Cipher`}>
            <Select
              options={ciphers}
              value={formState.cipher.toString()}
              onChange$={(value: string) => (formState.cipher = value as OvpnCipher)}
            />
          </FormField>

          {/* TLS Version */}
          <FormField label={$localize`TLS Version`}>
            <Select
              options={tlsVersions}
              value={formState.tlsVersion}
              onChange$={(value: string) => (formState.tlsVersion = value as TLSVersion)}
            />
          </FormField>

          {/* Require Client Certificate */}
          <FormField label={$localize`Require Client Certificate`}>
            <input
              type="checkbox"
              checked={formState.requireClientCertificate}
              onChange$={() => (formState.requireClientCertificate = !formState.requireClientCertificate)}
              class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
          </FormField>
        </div>
      )}

      {/* Save Button */}
      <Button
        onClick$={applyChanges}
        class="mt-6"
        disabled={!!certificateError.value || !!passphraseError.value}
      >
        {$localize`Apply Settings`}
      </Button>
    </Card>
  );
}); 