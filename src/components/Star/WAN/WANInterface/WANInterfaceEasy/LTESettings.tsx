import { component$, type QRL } from "@builder.io/qwik";
import { Input, FormField, PasswordField } from "~/components/Core";

export interface LTESettingsProps {
  apn?: string;
  username?: string;
  password?: string;
  onAPNChange$: QRL<(value: string) => void>;
  onUsernameChange$: QRL<(value: string) => void>;
  onPasswordChange$: QRL<(value: string) => void>;
}

export const LTESettings = component$<LTESettingsProps>(
  ({ apn, username, password, onAPNChange$, onUsernameChange$, onPasswordChange$ }) => {
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

        <FormField
          label={$localize`Username (Optional)`}
        >
          <Input
            type="text"
            value={username || ""}
            onInput$={(event: Event, value: string) => {
              onUsernameChange$(value);
            }}
            placeholder="Enter username"
          />
        </FormField>

        <FormField
          label={$localize`Password (Optional)`}
        >
          <PasswordField
            value={password || ""}
            onInput$={(event: Event, element: HTMLInputElement) => {
              onPasswordChange$(element.value);
            }}
            placeholder="Enter password"
          />
        </FormField>
      </div>
    );
  },
);