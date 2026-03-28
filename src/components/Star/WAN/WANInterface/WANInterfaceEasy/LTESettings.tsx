import { component$, type QRL } from "@builder.io/qwik";
import { Input, FormField } from "~/components/Core";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export interface LTESettingsProps {
  apn?: string;
  onAPNChange$: QRL<(value: string) => void>;
}

export const LTESettings = component$<LTESettingsProps>(
  ({ apn, onAPNChange$ }) => {
    const locale = useMessageLocale();
    return (
      <div class="space-y-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {semanticMessages.wan_easy_lte_settings({}, { locale })}
        </h4>

        <FormField label={semanticMessages.wan_easy_apn_label({}, { locale })}>
          <Input
            type="text"
            value={apn || ""}
            onInput$={(event: Event, value: string) => {
              onAPNChange$(value);
            }}
            placeholder={semanticMessages.wan_easy_apn_placeholder(
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
