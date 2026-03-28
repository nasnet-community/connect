import { component$, type QRL } from "@builder.io/qwik";
import type { PPPoEConfig } from "../../types";
import { Input, FormField, PasswordField } from "~/components/Core";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export interface PPPoEFieldsProps {
  config?: PPPoEConfig;
  onUpdate$: QRL<(config: PPPoEConfig) => void>;
  errors?: {
    username?: string[];
    password?: string[];
  };
}

export const PPPoEFields = component$<PPPoEFieldsProps>(
  ({ config, onUpdate$, errors }) => {
    const locale = useMessageLocale();

    return (
      <div class="space-y-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {semanticMessages.wan_advanced_pppoe_settings({}, { locale })}
        </h4>

        <FormField
          label={semanticMessages.wan_advanced_username({}, { locale })}
          required
          error={errors?.username?.[0]}
        >
          <Input
            type="text"
            value={config?.username || ""}
            onInput$={(event: Event, value: string) => {
              onUpdate$({
                username: value,
                password: config?.password || "",
              });
            }}
            placeholder="PPPoE username"
          />
        </FormField>

        <FormField
          label={semanticMessages.wan_advanced_password({}, { locale })}
          required
          error={errors?.password?.[0]}
        >
          <PasswordField
            value={config?.password || ""}
            onInput$={(event: Event, element: HTMLInputElement) => {
              onUpdate$({
                username: config?.username || "",
                password: element.value,
              });
            }}
            placeholder="PPPoE password"
          />
        </FormField>
      </div>
    );
  },
);
