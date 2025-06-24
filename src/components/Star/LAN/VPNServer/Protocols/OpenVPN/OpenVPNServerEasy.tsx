import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { HiServerOutline, HiLockClosedOutline } from "@qwikest/icons/heroicons";
import { ServerCard, ServerFormField } from "../../UI";
import { useOpenVPNServer } from "./useOpenVPNServer";
import type { AuthMethod } from "../../../../StarContext/CommonType";

export const OpenVPNServerEasy = component$(() => {
  const { openVpnState, updateOpenVPNServer$, passphraseError } = useOpenVPNServer();
  
  const formState = useStore({
    certificateKeyPassphrase: openVpnState.Certificate?.CertificateKeyPassphrase || "",
  });

  const showPassphrase = useSignal(false);

  // Helper function to update the server configuration with both TCP and UDP servers
  const updateServerConfig = $(() => {
    const baseConfig = {
      Certificate: {
        Certificate: "server-cert",
        CertificateKeyPassphrase: formState.certificateKeyPassphrase,
        RequireClientCertificate: false
      },
      enabled: true,
      Mode: 'ip' as const,
      DefaultProfile: 'ovpn-profile',
      Authentication: ['mschap2' as AuthMethod],
      PacketSize: { MaxMtu: 1450, MaxMru: 1450 },
      KeepaliveTimeout: 30,
      VRF: '',
      RedirectGetway: 'def1' as const,
      PushRoutes: '',
      RenegSec: 3600,
      Encryption: { 
        Auth: ['sha256' as const], 
        UserAuthMethod: 'mschap2' as const, 
        Cipher: ['aes256-cbc' as const], 
        TlsVersion: 'any' as const 
      },
      IPV6: { 
        EnableTunIPv6: false, 
        IPv6PrefixLength: 64, 
        TunServerIPv6: '' 
      },
      Address: {
        Netmask: 24,
        MacAddress: "",
        MaxMtu: 1450,
        AddressPool: 'ovpn-pool'
      }
    };

    // Create two servers - one UDP and one TCP with different ports
    const servers = [
      {
        ...baseConfig,
        name: 'openvpn-udp',
        Protocol: 'udp' as const,
        Port: 1194, // Standard OpenVPN UDP port
      },
      {
        ...baseConfig,
        name: 'openvpn-tcp',
        Protocol: 'tcp' as const,
        Port: 1195, 
      }
    ];

    // Only update if passphrase is provided
    if (formState.certificateKeyPassphrase) {
      updateOpenVPNServer$(servers);
    }
  });

  return (
    <ServerCard
      title={$localize`OpenVPN Server (TCP & UDP)`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6">
        {/* Certificate Key Passphrase */}
        <ServerFormField
          label={$localize`Certificate Key Passphrase`}
          errorMessage={passphraseError.value}
          helperText={passphraseError.value ? undefined : $localize`Creates both TCP and UDP OpenVPN servers with this passphrase`}
        >
          <div class="relative">
            <input
              type="text"
              value={formState.certificateKeyPassphrase}
              onInput$={(e) => {
                const target = e.target as HTMLInputElement;
                formState.certificateKeyPassphrase = target.value;
                updateServerConfig();
              }}
              placeholder={$localize`Enter passphrase for both servers`}
              class="w-full rounded-lg border border-border bg-white px-3 py-2
                     focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                     disabled:cursor-not-allowed disabled:opacity-75
                     dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
            />
            <button
              type="button"
              onClick$={() => (showPassphrase.value = !showPassphrase.value)}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <HiLockClosedOutline class="h-5 w-5" />
            </button>
          </div>
        </ServerFormField>
      </div>
    </ServerCard>
  );
}); 