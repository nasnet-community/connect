import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { HiServerOutline, HiLockClosedOutline } from "@qwikest/icons/heroicons";
import { ServerCard } from "~/components/Core/Card";
import { useOpenVPNServer } from "./useOpenVPNServer";
import { ServerFormField } from "~/components/Core/Form/ServerField";
import { Input } from "~/components/Core/Input";
import { protocols } from "./constants";
import type { NetworkProtocol } from "../../../../StarContext/CommonType";

// Create a serialized version of the server icon
const ServerIcon = $(HiServerOutline);

export const OpenVPNServerEasy = component$(() => {
  const { openVpnState, updateOpenVPNServer$, passphraseError } = useOpenVPNServer();
  
  const formState = useStore({
    certificateKeyPassphrase: openVpnState.CertificateKeyPassphrase || "",
    protocol: openVpnState.Protocol || "tcp",
  });

  const showPassphrase = useSignal(false);

  // Helper function to update the server configuration
  const updateServerConfig = $(() => {
    updateOpenVPNServer$({
      Profile: "default", // Use default profile in easy mode
      Certificate: "default", // Use default certificate in easy mode
      CertificateKeyPassphrase: formState.certificateKeyPassphrase,
      Protocol: formState.protocol as NetworkProtocol,
    });
  });

  return (
    <ServerCard
      title={$localize`OpenVPN Server`}
      icon={ServerIcon}
    >
      <div class="space-y-6">
        {/* Certificate Key Passphrase */}
        <ServerFormField 
          label={$localize`Certificate Key Passphrase`}
          errorMessage={passphraseError.value}
        >
          <div class="relative">
            <Input
              type={showPassphrase.value ? "text" : "password"}
              value={formState.certificateKeyPassphrase}
              onChange$={(_, value) => {
                formState.certificateKeyPassphrase = value;
                updateServerConfig();
              }}
              placeholder={$localize`Enter passphrase`}
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

        {/* Protocol selection */}
        <ServerFormField label={$localize`Protocol`}>
          <div class="flex flex-wrap gap-2">
            {protocols.map(protocol => (
              <label 
                key={protocol.value}
                class={`
                  cursor-pointer rounded-full px-3 py-1 transition-colors
                  ${formState.protocol === protocol.value
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}
                `}
              >
                <input
                  type="radio"
                  value={protocol.value}
                  checked={formState.protocol === protocol.value}
                  onChange$={() => {
                    formState.protocol = protocol.value as NetworkProtocol;
                    updateServerConfig();
                  }}
                  class="sr-only"
                />
                {protocol.label}
              </label>
            ))}
          </div>
        </ServerFormField>
      </div>
    </ServerCard>
  );
}); 