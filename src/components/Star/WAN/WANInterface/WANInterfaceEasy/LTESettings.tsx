import { component$, type QRL } from "@builder.io/qwik";
import { Input, FormField } from "~/components/Core";

export interface LTESettingsProps {
  apn?: string;
  onAPNChange$: QRL<(value: string) => void>;
}

export const LTESettings = component$<LTESettingsProps>(
  ({ apn, onAPNChange$ }) => {
    return (
      <div class="space-y-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {$localize`LTE Settings`}
        </h4>

        <FormField
          label={$localize`APN (Access Point Name)`}
        >
          <Input
            type="text"
            value={apn || ""}
            onInput$={(event: Event, value: string) => {
              onAPNChange$(value);
            }}
            placeholder="Enter APN"
            required
          />
        </FormField>
      </div>
    );
  },
);