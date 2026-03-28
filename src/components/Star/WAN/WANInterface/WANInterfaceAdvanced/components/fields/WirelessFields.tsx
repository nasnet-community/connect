import { component$, type QRL } from "@builder.io/qwik";
import type { WirelessCredentials } from "../../../../../StarContext/CommonType";
import { Input, FormField, PasswordField } from "~/components/Core";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export interface WirelessFieldsProps {
  credentials?: WirelessCredentials;
  onUpdate$: QRL<(credentials: WirelessCredentials) => void>;
  errors?: {
    ssid?: string[];
    password?: string[];
  };
}

export const WirelessFields = component$<WirelessFieldsProps>(
  ({ credentials, onUpdate$, errors }) => {
    const locale = useMessageLocale();

    return (
      <div class="space-y-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {semanticMessages.wan_advanced_wireless_settings({}, { locale })}
        </h4>

        <FormField
          label={semanticMessages.wan_advanced_ssid_network_name(
            {},
            { locale },
          )}
          error={errors?.ssid?.[0]}
        >
          <Input
            type="text"
            value={credentials?.SSID || ""}
            onInput$={(event: Event, value: string) => {
              onUpdate$({
                SSID: value,
                Password: credentials?.Password || "",
              });
            }}
            placeholder="Enter network name"
          />
        </FormField>

        <FormField
          label={semanticMessages.wan_advanced_password({}, { locale })}
          error={errors?.password?.[0]}
        >
          <PasswordField
            value={credentials?.Password || ""}
            onInput$={(event: Event, element: HTMLInputElement) => {
              onUpdate$({
                SSID: credentials?.SSID || "",
                Password: element.value,
              });
            }}
            placeholder="Min. 8 characters"
          />
        </FormField>
      </div>
    );
  },
);
