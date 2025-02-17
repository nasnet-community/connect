import { component$ } from "@builder.io/qwik";
import type { WirelessSettingsProps } from "./types";

export const WirelessSettings = component$<WirelessSettingsProps>(
  ({ ssid, password, onSSIDChange, onPasswordChange }) => {
    return (
      <div class="mt-4 space-y-4">
        <div>
          <label
            for="ssid"
            class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary"
          >
            {$localize`SSID`}
          </label>
          <input
            id="ssid"
            type="text"
            value={ssid}
            onChange$={(_, el) => onSSIDChange(el.value)}
            class="text-text-default focus:ring-primary-500 mt-1 w-full rounded-lg border 
            border-border bg-white
            px-4 py-2
            focus:ring-2 dark:border-border-dark
            dark:bg-surface-dark dark:text-text-dark-default"
            placeholder={$localize`Enter SSID`}
            required
            minLength={1}
            maxLength={32}
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary"
          >
            {$localize`Password`}
          </label>
          <input
            id="password"
            type="text"
            value={password}
            onChange$={(_, el) => onPasswordChange(el.value)}
            class="text-text-default focus:ring-primary-500 mt-1 w-full rounded-lg border 
            border-border bg-white
            px-4 py-2
            focus:ring-2 dark:border-border-dark
            dark:bg-surface-dark dark:text-text-dark-default"
            placeholder={$localize`Enter Password (min 8 characters)`}
            required
            minLength={8}
            maxLength={63}
          />
        </div>
      </div>
    );
  },
);
