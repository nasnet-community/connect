import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import type { NetworkProtocol, LayerMode, AuthMethod } from "../../../../StarContext/CommonType";
import type { OvpnAuthMethod, OvpnCipher } from "../../../../StarContext/Utils/VPNServerType";
import { Card, FormField, Input, Button, TabNavigation, Select } from "../../../VPNServer/UI";
import { useOpenVPNServer } from "./useOpenVPNServer";
import { HiDocumentOutline, HiLockClosedOutline, HiServerOutline } from "@qwikest/icons/heroicons";

export const OpenVPNServerAdvanced = component$(() => {
  const { openVpnState, updateOpenVPNServer$, certificateError, passphraseError } = useOpenVPNServer();
  
  const formState = useStore({
    name: openVpnState.name || "default",
    certificate: openVpnState.Certificate?.Certificate || "",
    enabled: openVpnState.enabled !== undefined ? openVpnState.enabled : true,
    port: openVpnState.Port || 1194,
    protocol: openVpnState.Protocol || "tcp",
    mode: openVpnState.Mode || "ip",
    addressPool: openVpnState.Address?.AddressPool || "192.168.78.0/24",
    requireClientCertificate: openVpnState.Certificate?.RequireClientCertificate !== undefined ? openVpnState.Certificate.RequireClientCertificate : false,
    auth: (openVpnState.Encryption?.Auth && openVpnState.Encryption.Auth[0]) || "sha256",
    cipher: (openVpnState.Encryption?.Cipher && openVpnState.Encryption.Cipher[0]) || "aes256-gcm",
    certificateKeyPassphrase: openVpnState.Certificate?.CertificateKeyPassphrase || "",
    defaultProfile: openVpnState.DefaultProfile || "default",
    tlsVersion: openVpnState.Encryption?.TlsVersion || "only-1.2",
    maxMtu: openVpnState.PacketSize?.MaxMtu || 1450,
    maxMru: openVpnState.PacketSize?.MaxMru || 1450,
    keepaliveTimeout: openVpnState.KeepaliveTimeout || 30,
    authentication: openVpnState.Authentication || ["mschap2"]
  });

  const isEnabled = useSignal(!!openVpnState.name);
  const showPassphrase = useSignal(false);
  const activeTab = useSignal<'basic' | 'network' | 'security'>('basic');

  const tabOptions = [
    { id: 'basic', label: $localize`Basic Settings` },
    { id: 'network', label: $localize`Network Settings` },
    { id: 'security', label: $localize`Security Settings` }
  ];

  // Protocol options
  const protocolOptions = [
    { value: "tcp", label: "TCP" },
    { value: "udp", label: "UDP" }
  ];

  // Mode options
  const modeOptions = [
    { value: "ip", label: $localize`IP (Layer 3)` },
    { value: "ethernet", label: $localize`Ethernet (Layer 2)` }
  ];

  // Auth method options
  const authMethodOptions = [
    { value: "md5", label: "MD5" },
    { value: "sha1", label: "SHA1" },
    { value: "sha256", label: "SHA256" },
    { value: "sha512", label: "SHA512" },
    { value: "null", label: "None" }
  ];

  // Cipher options
  const cipherOptions = [
    { value: "null", label: "None" },
    { value: "aes128-cbc", label: "AES-128-CBC" },
    { value: "aes192-cbc", label: "AES-192-CBC" },
    { value: "aes256-cbc", label: "AES-256-CBC" },
    { value: "aes128-gcm", label: "AES-128-GCM" },
    { value: "aes192-gcm", label: "AES-192-GCM" },
    { value: "aes256-gcm", label: "AES-256-GCM" },
    { value: "blowfish128", label: "Blowfish-128" }
  ];

  // TLS version options
  const tlsVersionOptions = [
    { value: "any", label: $localize`Any` },
    { value: "only-1.2", label: $localize`Only 1.2` }
  ];

  const applyChanges = $(() => {
    try {
      if (isEnabled.value) {
        updateOpenVPNServer$({
          name: formState.name,
          enabled: formState.enabled,
          Port: formState.port,
          Protocol: formState.protocol as NetworkProtocol,
          Mode: formState.mode as LayerMode,
          DefaultProfile: formState.defaultProfile,
          Authentication: formState.authentication as AuthMethod[],
          PacketSize: {
            MaxMtu: formState.maxMtu,
            MaxMru: formState.maxMru,
          },
          KeepaliveTimeout: formState.keepaliveTimeout,
          VRF: "",
          RedirectGetway: "disabled",
          PushRoutes: "",
          RenegSec: 3600,
          Encryption: {
            Auth: [formState.auth as OvpnAuthMethod],
            Cipher: [formState.cipher as OvpnCipher],
            TlsVersion: formState.tlsVersion as "any" | "only-1.2",
            UserAuthMethod: "mschap2"
          },
          IPV6: {
            EnableTunIPv6: false,
            IPv6PrefixLength: 64,
            TunServerIPv6: ""
          },
          Certificate: {
            Certificate: formState.certificate,
            RequireClientCertificate: formState.requireClientCertificate,
            CertificateKeyPassphrase: formState.certificateKeyPassphrase,
          },
          Address: {
            AddressPool: formState.addressPool,
            Netmask: 24,
            MacAddress: "",
            MaxMtu: formState.maxMtu
          }
        });
      } else {
        updateOpenVPNServer$({
          name: "",
          enabled: false
        });
      }
    } catch (error) {
      console.error("Error applying OpenVPN settings:", error);
    }
  });

  const handleToggle = $((enabled: boolean) => {
    try {
      isEnabled.value = enabled;
      if (isEnabled.value && !formState.name) {
        formState.name = "default";
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
    >
      {/* Enable/Disable */}
      <FormField label={$localize`Enable OpenVPN Server`}>
        <input
          type="checkbox"
          checked={isEnabled.value}
          onChange$={() => handleToggle(!isEnabled.value)}
          class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
        />
      </FormField>

      {isEnabled.value && (
        <>
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
                  value={formState.name}
                  onChange$={(event: Event, value: string) => {
                    formState.name = value;
                    applyChanges();
                  }}
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
                    onChange$={(event: Event, value: string) => {
                      formState.certificate = value;
                      applyChanges();
                    }}
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
                    onChange$={(event: Event, value: string) => {
                      formState.certificateKeyPassphrase = value;
                      applyChanges();
                    }}
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

              {/* Protocol */}
              <FormField label={$localize`Protocol`}>
                <Select
                  options={protocolOptions}
                  value={formState.protocol}
                  onChange$={(value: string) => {
                    formState.protocol = value as NetworkProtocol;
                    applyChanges();
                  }}
                />
              </FormField>

              {/* Port */}
              <FormField label={$localize`Port`}>
                <Input
                  type="number"
                  value={formState.port.toString()}
                  onChange$={(event: Event, value: string) => {
                    formState.port = parseInt(value, 10) || 1194;
                    applyChanges();
                  }}
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
                  options={modeOptions}
                  value={formState.mode}
                  onChange$={(value: string) => {
                    formState.mode = value as LayerMode;
                    applyChanges();
                  }}
                />
              </FormField>

              {/* Address Pool */}
              <FormField label={$localize`Address Pool`}>
                <Input
                  type="text"
                  value={formState.addressPool}
                  onChange$={(event: Event, value: string) => {
                    formState.addressPool = value;
                    applyChanges();
                  }}
                  placeholder={$localize`e.g., 192.168.78.0/24`}
                />
              </FormField>

              {/* Default Profile */}
              <FormField label={$localize`Default Profile`}>
                <Input
                  type="text"
                  value={formState.defaultProfile}
                  onChange$={(event: Event, value: string) => {
                    formState.defaultProfile = value;
                    applyChanges();
                  }}
                  placeholder={$localize`Enter PPP profile name`}
                />
              </FormField>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label={$localize`Maximum MTU`}>
                  <Input
                    type="number"
                    value={String(formState.maxMtu)}
                    onChange$={(event: Event, value: string) => {
                      formState.maxMtu = parseInt(value) || 1450;
                      applyChanges();
                    }}
                  />
                </FormField>

                <FormField label={$localize`Maximum MRU`}>
                  <Input
                    type="number"
                    value={String(formState.maxMru)}
                    onChange$={(event: Event, value: string) => {
                      formState.maxMru = parseInt(value) || 1450;
                      applyChanges();
                    }}
                  />
                </FormField>
              </div>

              <FormField label={$localize`Keepalive Timeout`}>
                <Input
                  type="number"
                  value={String(formState.keepaliveTimeout)}
                  onChange$={(event: Event, value: string) => {
                    formState.keepaliveTimeout = parseInt(value) || 30;
                    applyChanges();
                  }}
                />
              </FormField>
            </div>
          )}

          {/* Security Settings */}
          {activeTab.value === 'security' && (
            <div class="space-y-4">
              {/* Auth Method */}
              <FormField label={$localize`Authentication Algorithm`}>
                <Select
                  options={authMethodOptions}
                  value={formState.auth}
                  onChange$={(value: string) => {
                    formState.auth = value as OvpnAuthMethod;
                    applyChanges();
                  }}
                />
              </FormField>

              {/* Cipher */}
              <FormField label={$localize`Encryption Cipher`}>
                <Select
                  options={cipherOptions}
                  value={formState.cipher}
                  onChange$={(value: string) => {
                    formState.cipher = value as OvpnCipher;
                    applyChanges();
                  }}
                />
              </FormField>

              {/* TLS Version */}
              <FormField label={$localize`TLS Version`}>
                <Select
                  options={tlsVersionOptions}
                  value={formState.tlsVersion}
                  onChange$={(value: string) => {
                    formState.tlsVersion = value as "any" | "only-1.2";
                    applyChanges();
                  }}
                />
              </FormField>

              {/* Require Client Certificate */}
              <FormField label={$localize`Require Client Certificate`}>
                <input
                  type="checkbox"
                  checked={formState.requireClientCertificate}
                  onChange$={() => {
                    formState.requireClientCertificate = !formState.requireClientCertificate;
                    applyChanges();
                  }}
                  class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
              </FormField>
            </div>
          )}
        </>
      )}
    </Card>
  );
}); 