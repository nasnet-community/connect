import { component$, type QRL } from "@builder.io/qwik";
import type { PPPoEConfig } from "../../../../../StarContext/WANType";
import { Input, FormField, PasswordField } from "~/components/Core";

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
    return (
      <div class="space-y-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {$localize`PPPoE Settings`}
        </h4>

        <FormField
          label={$localize`Username`}
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
          label={$localize`Password`}
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
