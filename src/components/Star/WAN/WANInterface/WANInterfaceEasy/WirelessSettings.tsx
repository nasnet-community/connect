import { component$ } from "@builder.io/qwik";
import { Input, FormField } from "~/components/Core";
import type { WirelessSettingsProps } from "./types";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const WirelessSettings = component$<WirelessSettingsProps>(
  ({ ssid, password, onSSIDChange, onPasswordChange }) => {
    const locale = useMessageLocale();
    return (
      <div class="mt-4 space-y-4">
        <h3 class="text-md text-text-primary dark:text-text-dark-primary mb-2 font-medium">
          {semanticMessages.wan_easy_wireless_settings({}, { locale })}
        </h3>

        <FormField label={semanticMessages.wan_easy_ssid_label({}, { locale })}>
          <Input
            type="text"
            value={ssid}
            onInput$={(event: Event, value: string) => {
              onSSIDChange(value);
            }}
            placeholder={semanticMessages.wan_easy_ssid_placeholder(
              {},
              { locale },
            )}
            required
          />
        </FormField>

        <FormField
          label={semanticMessages.wan_easy_password_label({}, { locale })}
          helperText={semanticMessages.wan_easy_password_help({}, { locale })}
        >
          <Input
            type="text"
            value={password}
            onInput$={(event: Event, value: string) => {
              onPasswordChange(value);
            }}
            placeholder={semanticMessages.wan_easy_password_placeholder(
              {},
              { locale },
            )}
            required
          />
        </FormField>
      </div>
    );
  },
);
