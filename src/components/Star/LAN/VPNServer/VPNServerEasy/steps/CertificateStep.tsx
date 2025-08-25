import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { Field } from "~/components/Core/Form/Field";
import { Input } from "~/components/Core/Input";
import { HiLockClosedOutline, HiEyeOutline, HiEyeSlashOutline } from "@qwikest/icons/heroicons";

interface CertificateStepProps {
  certificatePassphrase: { value: string };
  showPassphrase: { value: boolean };
  passphraseError: { value: string };
  updatePassphrase$: QRL<(value: string) => void>;
  togglePassphraseVisibility$: QRL<() => void>;
}

export const CertificateStep = component$<CertificateStepProps>(
  ({
    certificatePassphrase,
    showPassphrase,
    passphraseError,
    updatePassphrase$,
    togglePassphraseVisibility$,
  }) => {
    return (
      <div class="space-y-8">
        {/* Certificate Section */}
        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <HiLockClosedOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              {$localize`Certificate Configuration`}
            </h2>
          </div>

          <p class="text-gray-600 dark:text-gray-400">
            {$localize`Set up a secure passphrase for your VPN server certificate. This passphrase will be used to protect the certificate private key.`}
          </p>

          <Field
            label={$localize`Certificate Passphrase`}
            helperText={$localize`Enter a secure passphrase (minimum 10 characters)`}
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

        {/* Info Box */}
        <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg
                class="h-5 w-5 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-blue-800 dark:text-blue-200">
                {$localize`In easy mode, OpenVPN and WireGuard protocols are automatically enabled with optimized settings. The certificate passphrase will be used to secure the OpenVPN server certificate.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);