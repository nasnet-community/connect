import { component$, type QRL } from "@builder.io/qwik";
import type { LTESettings } from "../../types";
import { Input, FormField } from "~/components/Core";

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
              });
            }}
            placeholder="Enter APN"

          />
        </FormField>
      </div>
    );
  },
);
