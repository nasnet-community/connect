import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { Card } from "~/components/Core/Card";
import { Field } from "~/components/Core/Form/Field";
import { Input } from "~/components/Core/Input";
import { 
  HiLockClosedOutline, 
  HiEyeOutline, 
  HiEyeSlashOutline,
  HiCheckCircleOutline,
  HiXCircleOutline
} from "@qwikest/icons/heroicons";

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
    // Calculate passphrase strength and requirements
    const passphrase = certificatePassphrase.value;
    const hasMinLength = passphrase.length >= 10;
    const hasGoodLength = passphrase.length >= 12;
    const hasExcellentLength = passphrase.length >= 16;
    const hasNumbers = /\d/.test(passphrase);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]/.test(passphrase);
    
    const strengthScore = [hasMinLength, hasGoodLength, hasExcellentLength, hasNumbers, hasSpecialChars]
      .filter(Boolean).length;

    const getStrengthInfo = () => {
      if (strengthScore >= 4) return { level: $localize`Strong`, color: "green", width: "100%" };
      if (strengthScore >= 3) return { level: $localize`Good`, color: "blue", width: "75%" };
      if (strengthScore >= 2) return { level: $localize`Fair`, color: "yellow", width: "50%" };
      return { level: $localize`Weak`, color: "orange", width: "25%" };
    };

    const strength = getStrengthInfo();

    return (
      <Card hasHeader>
        <div q:slot="header" class="flex items-center gap-3">
          <HiLockClosedOutline class="h-5 w-5" />
          <span class="font-semibold">{$localize`Certificate Security`}</span>
        </div>

        <div class="space-y-6">
          <p class="text-gray-600 dark:text-gray-400">
            {$localize`Create a secure passphrase to protect your VPN server certificate's private key.`}
          </p>

          <Field
            label={$localize`Certificate Passphrase`}
            error={passphraseError.value}
            required
          >
            <Input
              type={showPassphrase.value ? "text" : "password"}
              value={passphrase}
              onChange$={(_, value) => updatePassphrase$(value)}
              placeholder={$localize`Enter a secure passphrase`}
              hasSuffixSlot={true}
            >
              <button
                q:slot="suffix"
                type="button"
                onClick$={togglePassphraseVisibility$}
                class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                aria-label={showPassphrase.value ? $localize`Hide passphrase` : $localize`Show passphrase`}
              >
                {showPassphrase.value ? (
                  <HiEyeSlashOutline class="h-4 w-4" />
                ) : (
                  <HiEyeOutline class="h-4 w-4" />
                )}
              </button>
            </Input>
            
            {/* Inline Strength Indicator */}
            {passphrase.length > 0 && (
              <div class="mt-3 space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">
                    {$localize`Strength:`}
                  </span>
                  <span class={`font-medium text-${strength.color}-600 dark:text-${strength.color}-400`}>
                    {strength.level}
                  </span>
                </div>
                <div class="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    class={`h-full rounded-full transition-all duration-300 bg-${strength.color}-500`}
                    style={`width: ${strength.width}`}
                  />
                </div>
              </div>
            )}
          </Field>

          {/* Requirements Checklist */}
          {passphrase.length > 0 && (
            <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <h4 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                {$localize`Security Requirements`}
              </h4>
              <div class="space-y-2">
                <RequirementItem
                  met={hasMinLength}
                  text={$localize`At least 10 characters`}
                />
                <RequirementItem
                  met={hasGoodLength}
                  text={$localize`12+ characters for better security`}
                  optional
                />
                <RequirementItem
                  met={hasNumbers}
                  text={$localize`Contains numbers`}
                  optional
                />
                <RequirementItem
                  met={hasSpecialChars}
                  text={$localize`Contains special characters (!@#$%^&*)`}
                  optional
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }
);

// Helper component for requirement items
const RequirementItem = component$<{ met: boolean; text: string; optional?: boolean }>(
  ({ met, text, optional }) => (
    <div class="flex items-center gap-2 text-sm">
      {met ? (
        <HiCheckCircleOutline class="h-4 w-4 text-green-500 flex-shrink-0" />
      ) : (
        <HiXCircleOutline class={`h-4 w-4 flex-shrink-0 ${optional ? 'text-gray-400' : 'text-orange-500'}`} />
      )}
      <span class={met ? "text-green-700 dark:text-green-400" : optional ? "text-gray-600 dark:text-gray-400" : "text-gray-700 dark:text-gray-300"}>
        {text}
        {optional && <span class="ml-1 text-gray-500">({$localize`optional`})</span>}
      </span>
    </div>
  )
);