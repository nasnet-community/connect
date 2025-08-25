import { component$, type QRL } from "@builder.io/qwik";
import type { LTESettings } from "../../../../../StarContext/WANType";
import { Input, FormField, PasswordField } from "~/components/Core";

export interface LTEFieldsProps {
  settings?: LTESettings;
  onUpdate$: QRL<(settings: LTESettings) => void>;
  errors?: {
    apn?: string[];
  };
}

export const LTEFields = component$<LTEFieldsProps>(
  ({ settings, onUpdate$, errors }) => {
    return (
      <div class="space-y-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {$localize`LTE Settings`}
        </h4>

        <FormField
          label={$localize`APN`}
          required
          error={errors?.apn?.[0]}
        >
          <Input
            type="text"
            value={settings?.apn || ""}
            onInput$={(event: Event, value: string) => {
              onUpdate$({
                apn: value,
                username: settings?.username,
                password: settings?.password,
              });
            }}
            placeholder="Enter APN"
            
          />
        </FormField>

        <FormField
          label={$localize`Username`}
          helperText={$localize`(Optional)`}
        >
          <Input
            type="text"
            value={settings?.username || ""}
            onInput$={(event: Event, value: string) => {
              onUpdate$({
                apn: settings?.apn || "",
                username: value,
                password: settings?.password,
              });
            }}
            placeholder="LTE username"
          />
        </FormField>

        <FormField
          label={$localize`Password`}
          helperText={$localize`(Optional)`}
        >
          <PasswordField
            value={settings?.password || ""}
            onInput$={(event: Event, element: HTMLInputElement) => {
              onUpdate$({
                apn: settings?.apn || "",
                username: settings?.username,
                password: element.value,
              });
            }}
            placeholder="LTE password"
          />
        </FormField>
      </div>
    );
  },
);
