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
  HiXCircleOutline,
} from "@qwikest/icons/heroicons";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

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
    const locale = useMessageLocale();

    // Calculate passphrase strength and requirements
    const passphrase = certificatePassphrase.value;
    const hasMinLength = passphrase.length >= 10;
    const hasGoodLength = passphrase.length >= 12;
    const hasExcellentLength = passphrase.length >= 16;
    const hasNumbers = /\d/.test(passphrase);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]/.test(
      passphrase,
    );

    const strengthScore = [
      hasMinLength,
      hasGoodLength,
      hasExcellentLength,
      hasNumbers,
      hasSpecialChars,
    ].filter(Boolean).length;

    const getStrengthInfo = () => {
      if (strengthScore >= 4)
        return {
          level: semanticMessages.vpn_server_strength_strong({}, { locale }),
          color: "green",
          width: "100%",
        };
      if (strengthScore >= 3)
        return {
          level: semanticMessages.vpn_server_strength_good({}, { locale }),
          color: "blue",
          width: "75%",
        };
      if (strengthScore >= 2)
        return {
          level: semanticMessages.vpn_server_strength_fair({}, { locale }),
          color: "yellow",
          width: "50%",
        };
      return {
        level: semanticMessages.vpn_server_strength_weak({}, { locale }),
        color: "orange",
        width: "25%",
      };
    };

    const strength = getStrengthInfo();

    return (
      <Card hasHeader>
        <div q:slot="header" class="flex items-center gap-3">
          <HiLockClosedOutline class="h-5 w-5" />
          <span class="font-semibold">
            {semanticMessages.vpn_server_certificate_security_title(
              {},
              { locale },
            )}
          </span>
        </div>

        <div class="space-y-6">
          <p class="text-gray-600 dark:text-gray-400">
            {semanticMessages.vpn_server_certificate_security_description(
              {},
              { locale },
            )}
          </p>

          <Field
            label={semanticMessages.vpn_server_certificate_passphrase(
              {},
              { locale },
            )}
            error={passphraseError.value}
            required
          >
            <Input
              type={showPassphrase.value ? "text" : "password"}
              value={passphrase}
              onInput$={(_, value) => updatePassphrase$(value)}
              placeholder={semanticMessages.vpn_server_certificate_enter_passphrase(
                {},
                { locale },
              )}
              hasSuffixSlot={true}
            >
              <button
                q:slot="suffix"
                type="button"
                onClick$={togglePassphraseVisibility$}
                class="text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                aria-label={
                  showPassphrase.value
                    ? semanticMessages.vpn_server_hide_passphrase(
                        {},
                        { locale },
                      )
                    : semanticMessages.vpn_server_show_passphrase(
                        {},
                        { locale },
                      )
                }
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
                    {semanticMessages.vpn_server_strength_label({}, { locale })}
                  </span>
                  <span
                    class={`font-medium text-${strength.color}-600 dark:text-${strength.color}-400`}
                  >
                    {strength.level}
                  </span>
                </div>
                <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
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
                {semanticMessages.vpn_server_security_requirements(
                  {},
                  { locale },
                )}
              </h4>
              <div class="space-y-2">
                <RequirementItem
                  met={hasMinLength}
                  text={semanticMessages.vpn_server_requirement_min_length(
                    {},
                    { locale },
                  )}
                />
                <RequirementItem
                  met={hasGoodLength}
                  text={semanticMessages.vpn_server_requirement_good_length(
                    {},
                    { locale },
                  )}
                  optional
                />
                <RequirementItem
                  met={hasNumbers}
                  text={semanticMessages.vpn_server_requirement_numbers(
                    {},
                    { locale },
                  )}
                  optional
                />
                <RequirementItem
                  met={hasSpecialChars}
                  text={semanticMessages.vpn_server_requirement_special_chars(
                    {},
                    { locale },
                  )}
                  optional
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  },
);

// Helper component for requirement items
const RequirementItem = component$<{
  met: boolean;
  text: string;
  optional?: boolean;
}>(({ met, text, optional }) => {
  const locale = useMessageLocale();

  return (
    <div class="flex items-center gap-2 text-sm">
      {met ? (
        <HiCheckCircleOutline class="h-4 w-4 flex-shrink-0 text-green-500" />
      ) : (
        <HiXCircleOutline
          class={`h-4 w-4 flex-shrink-0 ${optional ? "text-gray-400" : "text-orange-500"}`}
        />
      )}
      <span
        class={
          met
            ? "text-green-700 dark:text-green-400"
            : optional
              ? "text-gray-600 dark:text-gray-400"
              : "text-gray-700 dark:text-gray-300"
        }
      >
        {text}
        {optional && (
          <span class="ml-1 text-gray-500">
            ({semanticMessages.vpn_server_optional({}, { locale })})
          </span>
        )}
      </span>
    </div>
  );
});
