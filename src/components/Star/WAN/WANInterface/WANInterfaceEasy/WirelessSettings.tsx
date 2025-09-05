import { component$ } from "@builder.io/qwik";
import { Input, FormField } from "~/components/Core";
import type { WirelessSettingsProps } from "./types";

export const WirelessSettings = component$<WirelessSettingsProps>(
  ({ ssid, password, onSSIDChange, onPasswordChange }) => {
    return (
      <div class="mt-4 space-y-4">
        <h3 class="text-md text-text-primary dark:text-text-dark-primary mb-2 font-medium">
          {$localize`Wireless Settings`}
        </h3>

        <FormField
          label={$localize`SSID (Network Name)`}
        >
          <Input
            type="text"
            value={ssid}
            onInput$={(event: Event, value: string) => {
              onSSIDChange(value);
            }}
            placeholder={$localize`Enter wireless network name`}
            required
          />
        </FormField>

        <FormField
          label={$localize`Password`}
          helperText={$localize`Password must be at least 8 characters long`}
        >
          <Input
            type="text"
            value={password}
            onInput$={(event: Event, value: string) => {
              onPasswordChange(value);
            }}
            placeholder={$localize`Enter Password (min 8 characters)`}
            required
          />
        </FormField>
      </div>
    );
  },
);
