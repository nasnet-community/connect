import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import type { NetworkProtocol, LayerMode, TLSVersion } from "../../../../StarContext/CommonType";
import type { OvpnAuthMethod, OvpnCipher } from "../../../../StarContext/LANType";
import { protocols, modes, authMethods, ciphers, tlsVersions } from "./constants";
import { ServerCard } from "~/components/Core/Card";
import { Input } from "~/components/Core/Input";
import { 
  ServerFormField, 
  ServerButton,
  TabNavigation,
  Select as ServerSelect
} from "~/components/Core/Form/ServerField";
import { useOpenVPNServer } from "./useOpenVPNServer";
import { ServerIcon } from "../icons";
import { HiDocumentOutline, HiLockClosedOutline } from "@qwikest/icons/heroicons";

export const OpenVPNServer = component$(() => {
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
    <ServerCard
      title={$localize`OpenVPN Server`}
      icon={ServerIcon}
      enabled={isEnabled.value}
      onToggle$={handleToggle}
    >
      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabOptions}
        activeTab={activeTab.value}
        onSelect$={(tabId) => (activeTab.value = tabId as 'basic' | 'network' | 'security')}
      />

      {/* Basic Settings */}
      {activeTab.value === 'basic' && (
        <div class="space-y-4">
          {/* Profile Name */}
          <ServerFormField label={$localize`Profile Name`}>
            <Input
              type="text"
              value={formState.profile}
              onChange$={(_, value) => (formState.profile = value)}
              placeholder={$localize`Enter profile name`}
            />
          </ServerFormField>

          {/* Certificate */}
          <ServerFormField 
            label={$localize`Server Certificate`}
            errorMessage={certificateError.value}
          >
            <div class="flex items-center gap-2">
              <Input
                type="text"
                value={formState.certificate}
                onChange$={(_, value) => (formState.certificate = value)}
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

          {/* Certificate Key Passphrase */}
          <ServerFormField 
            label={$localize`Certificate Key Passphrase`}
            errorMessage={passphraseError.value}
          >
            <div class="relative">
              <Input
                type={showPassphrase.value ? "text" : "password"}
                value={formState.certificateKeyPassphrase}
                onChange$={(_, value) => (formState.certificateKeyPassphrase = value)}
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
          </ServerFormField>

          {/* Enabled Checkbox */}
          <ServerFormField label={$localize`Enable this VPN server instance`}>
            <input
              type="checkbox"
              checked={formState.enabled}
              onChange$={() => (formState.enabled = !formState.enabled)}
              class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
          </ServerFormField>

          {/* Protocol */}
          <ServerFormField label={$localize`Protocol`}>
            <ServerSelect
              options={protocols}
              value={formState.protocol}
              onChange$={(value) => (formState.protocol = value as NetworkProtocol)}
            />
          </ServerFormField>

          {/* Port */}
          <ServerFormField label={$localize`Port`}>
            <Input
              type="number"
              value={formState.port.toString()}
              onChange$={(_, value) => (formState.port = parseInt(value, 10))}
              placeholder="1-65535"
            />
          </ServerFormField>
        </div>
      )}

      {/* Network Settings */}
      {activeTab.value === 'network' && (
        <div class="space-y-4">
          {/* Mode */}
          <ServerFormField label={$localize`Mode`}>
            <ServerSelect
              options={modes}
              value={formState.mode}
              onChange$={(value) => (formState.mode = value as LayerMode)}
            />
          </ServerFormField>

          {/* Address Pool */}
          <ServerFormField label={$localize`Address Pool`}>
            <Input
              type="text"
              value={formState.addressPool}
              onChange$={(_, value) => (formState.addressPool = value)}
              placeholder={$localize`e.g. 192.168.78.0/24`}
            />
          </ServerFormField>

          {/* Netmask */}
          <ServerFormField label={$localize`Netmask (subnet bits)`}>
            <Input
              type="number"
              value={formState.netmask.toString()}
              onChange$={(_, value) => (formState.netmask = parseInt(value, 10))}
              placeholder="8-30"
            />
          </ServerFormField>

          {/* Max Sessions */}
          <ServerFormField label={$localize`Maximum Sessions`}>
            <Input
              type="number"
              value={formState.maxSessions.toString()}
              onChange$={(_, value) => (formState.maxSessions = parseInt(value, 10))}
              placeholder="1-500"
            />
          </ServerFormField>
        </div>
      )}

      {/* Security Settings */}
      {activeTab.value === 'security' && (
        <div class="space-y-4">
          {/* Authentication Method */}
          <ServerFormField label={$localize`Authentication Method`}>
            <ServerSelect
              options={authMethods}
              value={formState.auth}
              onChange$={(value) => (formState.auth = value as OvpnAuthMethod)}
            />
          </ServerFormField>

          {/* Cipher */}
          <ServerFormField label={$localize`Cipher`}>
            <ServerSelect
              options={ciphers}
              value={formState.cipher.toString()}
              onChange$={(value) => (formState.cipher = value as OvpnCipher)}
            />
          </ServerFormField>

          {/* TLS Version */}
          <ServerFormField label={$localize`TLS Version`}>
            <ServerSelect
              options={tlsVersions}
              value={formState.tlsVersion}
              onChange$={(value) => (formState.tlsVersion = value as TLSVersion)}
            />
          </ServerFormField>

          {/* Require Client Certificate */}
          <ServerFormField label={$localize`Require Client Certificate`}>
            <input
              type="checkbox"
              checked={formState.requireClientCertificate}
              onChange$={() => (formState.requireClientCertificate = !formState.requireClientCertificate)}
              class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
          </ServerFormField>
        </div>
      )}

      {/* Save Button */}
      <ServerButton
        onClick$={applyChanges}
        class="mt-6"
        disabled={!!certificateError.value || !!passphraseError.value}
      >
        {$localize`Apply Settings`}
      </ServerButton>
    </ServerCard>
  );
}); 