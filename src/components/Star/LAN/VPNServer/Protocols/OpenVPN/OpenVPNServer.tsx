import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { HiServerOutline, HiLockClosedOutline, HiDocumentOutline } from "@qwikest/icons/heroicons";
import { useOpenVPNServer } from "./useOpenVPNServer";
import type { NetworkProtocol, LayerMode, TLSVersion } from "../../../../StarContext/CommonType";
import type { OvpnAuthMethod, OvpnCipher } from "../../../../StarContext/LANType";

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

  const handlePassphraseChange = $((e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    formState.certificateKeyPassphrase = value;
  });

  const protocols: {value: NetworkProtocol, label: string}[] = [
    { value: "tcp", label: "TCP" },
    { value: "udp", label: "UDP" }
  ];

  const modes: {value: LayerMode, label: string}[] = [
    { value: "ip", label: "IP (Layer 3)" },
    { value: "ethernet", label: "Ethernet (Layer 2)" }
  ];

  const authMethods: {value: OvpnAuthMethod, label: string}[] = [
    { value: "md5", label: "MD5" },
    { value: "sha1", label: "SHA1" },
    { value: "sha256", label: "SHA256" },
    { value: "sha512", label: "SHA512" },
    { value: "null", label: "None" }
  ];

  const ciphers: {value: OvpnCipher, label: string}[] = [
    { value: "aes128-cbc", label: "AES-128-CBC" },
    { value: "aes128-gcm", label: "AES-128-GCM" },
    { value: "aes192-cbc", label: "AES-192-CBC" },
    { value: "aes192-gcm", label: "AES-192-GCM" },
    { value: "aes256-cbc", label: "AES-256-CBC" },
    { value: "aes256-gcm", label: "AES-256-GCM" },
    { value: "blowfish128", label: "Blowfish-128" },
    { value: "null", label: "None" }
  ];

  const tlsVersions: {value: TLSVersion, label: string}[] = [
    { value: "any", label: "Any" },
    { value: "only-1.2", label: "TLS 1.2 Only" },
    { value: "only-1.3", label: "TLS 1.3 Only" }
  ];

  const applyChanges = $(() => {
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
  });

  return (
    <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div class="mb-6 flex items-center gap-3">
        <HiServerOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{$localize`OpenVPN Server`}</h3>
      </div>

      <div class="mb-4 flex items-center justify-between">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {$localize`Enable OpenVPN Server`}
        </label>
        <label class="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={isEnabled.value}
            class="peer sr-only"
            onChange$={() => {
              isEnabled.value = !isEnabled.value;
              if (isEnabled.value && !formState.profile) {
                formState.profile = "default";
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
              {/* Profile Name */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Profile Name`}
                </label>
                <input
                  type="text"
                  value={formState.profile}
                  onChange$={(e) => (formState.profile = (e.target as HTMLInputElement).value)}
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder={$localize`Enter profile name`}
                />
              </div>

              {/* Certificate */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Server Certificate`}
                </label>
                <div class="flex items-center gap-2">
                  <input
                    type="text"
                    value={formState.certificate}
                    onChange$={(e) => (formState.certificate = (e.target as HTMLInputElement).value)}
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
                  <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                    {certificateError.value}
                  </p>
                )}
              </div>

              {/* Certificate Key Passphrase */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Certificate Key Passphrase`}
                </label>
                <div class="relative">
                  <input
                    type={showPassphrase.value ? "text" : "password"}
                    value={formState.certificateKeyPassphrase}
                    onChange$={handlePassphraseChange}
                    class={`w-full rounded-lg border ${
                      passphraseError.value
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600"
                    } px-4 py-2 dark:bg-gray-700 dark:text-white`}
                    placeholder={$localize`Enter passphrase (at least 10 characters)`}
                  />
                  <button
                    type="button"
                    onClick$={() => (showPassphrase.value = !showPassphrase.value)}
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <HiLockClosedOutline class="h-5 w-5" />
                  </button>
                </div>
                {passphraseError.value && (
                  <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                    {passphraseError.value}
                  </p>
                )}
              </div>

              {/* Enabled */}
              <div class="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="enabled"
                  checked={formState.enabled}
                  onChange$={() => (formState.enabled = !formState.enabled)}
                  class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  for="enabled"
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {$localize`Enable this VPN server instance`}
                </label>
              </div>

              {/* Protocol */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Protocol`}
                </label>
                <select
                  value={formState.protocol}
                  onChange$={(e) => (formState.protocol = (e.target as HTMLSelectElement).value as NetworkProtocol)}
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  {protocols.map((protocol) => (
                    <option key={protocol.value} value={protocol.value}>
                      {protocol.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Port */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Port`}
                </label>
                <input
                  type="number"
                  min="1"
                  max="65535"
                  value={formState.port}
                  onChange$={(e) => (formState.port = parseInt((e.target as HTMLInputElement).value, 10))}
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Network Settings */}
          <div>
            <h4 class="mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
              {$localize`Network Settings`}
            </h4>
            <div class="space-y-4">
              {/* Mode */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Mode`}
                </label>
                <select
                  value={formState.mode}
                  onChange$={(e) => (formState.mode = (e.target as HTMLSelectElement).value as LayerMode)}
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  {modes.map((mode) => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Address Pool */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Address Pool`}
                </label>
                <input
                  type="text"
                  value={formState.addressPool}
                  onChange$={(e) => (formState.addressPool = (e.target as HTMLInputElement).value)}
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder={$localize`e.g. 192.168.78.0/24`}
                />
              </div>

              {/* Netmask */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Netmask (subnet bits)`}
                </label>
                <input
                  type="number"
                  min="8"
                  max="30"
                  value={formState.netmask}
                  onChange$={(e) => (formState.netmask = parseInt((e.target as HTMLInputElement).value, 10))}
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Max Sessions */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Maximum Sessions`}
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={formState.maxSessions}
                  onChange$={(e) => (formState.maxSessions = parseInt((e.target as HTMLInputElement).value, 10))}
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div>
            <h4 class="mb-3 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
              {$localize`Security Settings`}
            </h4>
            <div class="space-y-4">
              {/* Authentication Method */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Authentication Method`}
                </label>
                <select
                  value={formState.auth}
                  onChange$={(e) => (formState.auth = (e.target as HTMLSelectElement).value as OvpnAuthMethod)}
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  {authMethods.map((method) => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cipher */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`Cipher`}
                </label>
                <select
                  value={formState.cipher}
                  onChange$={(e) => (formState.cipher = (e.target as HTMLSelectElement).value as OvpnCipher)}
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  {ciphers.map((cipher) => (
                    <option key={cipher.value} value={cipher.value}>
                      {cipher.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* TLS Version */}
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {$localize`TLS Version`}
                </label>
                <select
                  value={formState.tlsVersion}
                  onChange$={(e) => (formState.tlsVersion = (e.target as HTMLSelectElement).value as TLSVersion)}
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  {tlsVersions.map((version) => (
                    <option key={version.value} value={version.value}>
                      {version.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Require Client Certificate */}
              <div class="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="requireClientCert"
                  checked={formState.requireClientCertificate}
                  onChange$={() => (formState.requireClientCertificate = !formState.requireClientCertificate)}
                  class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  for="requireClientCert"
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {$localize`Require Client Certificate`}
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick$={applyChanges}
            class="mt-4 rounded-lg bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-500/25 dark:bg-primary-600 dark:hover:bg-primary-700"
            disabled={!!certificateError.value || !!passphraseError.value}
          >
            {$localize`Apply Settings`}
          </button>
        </div>
      )}
    </div>
  );
}); 