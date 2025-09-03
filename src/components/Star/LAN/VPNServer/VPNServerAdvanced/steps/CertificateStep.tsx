import { component$, useSignal, $ } from "@builder.io/qwik";
// Removed unused QRL import
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { VPNServerContextId } from "../VPNServerContext";
import { Field } from "~/components/Core/Form/Field";
import { Input } from "~/components/Core/Input";
import { 
  HiLockClosedOutline, 
  HiEyeOutline, 
  HiEyeSlashOutline
} from "@qwikest/icons/heroicons";
import type { VPNType } from "../../../../StarContext/CommonType";

interface CertificateStepProps {
  enabledProtocols: Record<VPNType, boolean>;
}

export const CertificateStep = component$<CertificateStepProps>(
  ({ enabledProtocols }) => {
    const _context = useStepperContext(VPNServerContextId);
    
    // Local state for certificate configuration
    const certificatePassphrase = useSignal("");
    const showPassphrase = useSignal(false);
    const passphraseError = useSignal("");

    // Toggle passphrase visibility
    const togglePassphraseVisibility$ = $(() => {
      showPassphrase.value = !showPassphrase.value;
    });

    // Update passphrase with validation
    const updatePassphrase$ = $((value: string) => {
      certificatePassphrase.value = value;
      if (value.length > 0 && value.length < 10) {
        passphraseError.value = $localize`Passphrase must be at least 10 characters long`;
      } else {
        passphraseError.value = "";
      }
    });

    // Get enabled protocols that require certificates
    const protocolsRequiringCertificates = [
      { type: "OpenVPN" as VPNType, name: "OpenVPN" },
      { type: "SSTP" as VPNType, name: "SSTP" },
      { type: "IKeV2" as VPNType, name: "IKEv2" }
    ].filter(protocol => enabledProtocols[protocol.type]);

    return (
      <div class="space-y-8">
        {/* Header */}
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <HiLockClosedOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              {$localize`Certificate Configuration`}
            </h2>
          </div>

          <p class="text-gray-600 dark:text-gray-400">
            {$localize`Configure certificates and security settings for VPN protocols that require them: ${protocolsRequiringCertificates.map(p => p.name).join(", ")}.`}
          </p>
        </div>

        {/* Certificate Configuration */}
        <div class="space-y-6">
          {/* Certificate Key Passphrase */}
          <Field
            label={$localize`Certificate Key Passphrase`}
            helperText={$localize`Secure passphrase to protect the certificate private key (minimum 10 characters)`}
            error={passphraseError.value}
            required
          >
            <div class="relative">
              <Input
                type={showPassphrase.value ? "text" : "password"}
                value={certificatePassphrase.value}
                onChange$={(_, value) => updatePassphrase$(value)}
                placeholder={$localize`Enter certificate passphrase`}
                hasSuffixSlot={true}
              >
                <button
                  q:slot="suffix"
                  type="button"
                  onClick$={togglePassphraseVisibility$}
                  class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  aria-label={showPassphrase.value ? $localize`Hide passphrase` : $localize`Show passphrase`}
                >
                  {showPassphrase.value ? (
                    <HiEyeSlashOutline class="h-5 w-5" />
                  ) : (
                    <HiEyeOutline class="h-5 w-5" />
                  )}
                </button>
              </Input>
            </div>
          </Field>

          {/* Passphrase strength indicator */}
          {certificatePassphrase.value.length > 0 && (
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">
                  {$localize`Passphrase strength`}
                </span>
                <span
                  class={
                    certificatePassphrase.value.length >= 16
                      ? "text-green-600 dark:text-green-400"
                      : certificatePassphrase.value.length >= 12
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-orange-600 dark:text-orange-400"
                  }
                >
                  {certificatePassphrase.value.length >= 16
                    ? $localize`Strong`
                    : certificatePassphrase.value.length >= 12
                    ? $localize`Medium`
                    : $localize`Weak`}
                </span>
              </div>
              <div class="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  class={`h-2 rounded-full transition-all ${
                    certificatePassphrase.value.length >= 16
                      ? "w-full bg-green-500"
                      : certificatePassphrase.value.length >= 12
                      ? "w-2/3 bg-yellow-500"
                      : "w-1/3 bg-orange-500"
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Protocol-specific notes */}
        {protocolsRequiringCertificates.length > 0 && (
          <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <h3 class="mb-2 text-sm font-medium text-blue-800 dark:text-blue-200">
              {$localize`Certificate Usage`}
            </h3>
            <ul class="space-y-1 text-sm text-blue-700 dark:text-blue-300">
              {protocolsRequiringCertificates.map((protocol) => (
                <li key={protocol.type} class="flex items-start gap-2">
                  <span class="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-blue-500" />
                  <span>
                    {protocol.type === "OpenVPN" 
                      ? $localize`OpenVPN will use this certificate for TLS encryption and client authentication`
                      : protocol.type === "SSTP"
                      ? $localize`SSTP will use this certificate for HTTPS/SSL connections`
                      : $localize`IKEv2 will use this certificate for digital signature authentication`
                    }
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);