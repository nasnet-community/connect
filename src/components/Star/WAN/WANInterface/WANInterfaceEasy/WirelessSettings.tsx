import { component$ } from "@builder.io/qwik";
import type { WirelessSettingsProps } from "./types";

export const WirelessSettings = component$<WirelessSettingsProps>(
  ({ ssid, password, onSSIDChange, onPasswordChange }) => {
    return (
      <div class="mt-4 space-y-4">
        <h3 class="text-md text-text-primary dark:text-text-dark-primary mb-2 font-medium">
          {$localize`Wireless Settings`}
        </h3>

        <div>
          <label
            for="ssid"
            class="text-text-secondary dark:text-text-dark-secondary block text-sm font-medium"
          >
            {$localize`SSID (Network Name)`}
          </label>
          <input
            id="ssid"
            type="text"
            value={ssid}
            onChange$={(_, el) => onSSIDChange(el.value)}
            class="text-text-default mt-1 w-full rounded-lg border border-border 
            bg-white px-4
            py-2 focus:ring-2
            focus:ring-primary-500 dark:border-border-dark
            dark:bg-surface-dark dark:text-text-dark-default"
            placeholder={$localize`Enter wireless network name`}
            required
            minLength={1}
            maxLength={32}
          />
        </div>

        <div>
          <label
            for="password"
            class="text-text-secondary dark:text-text-dark-secondary block text-sm font-medium"
          >
            {$localize`Password`}
          </label>
          <input
            id="password"
            type="text"
            value={password}
            onChange$={(_, el) => onPasswordChange(el.value)}
            class="text-text-default mt-1 w-full rounded-lg border border-border 
            bg-white px-4
            py-2 focus:ring-2
            focus:ring-primary-500 dark:border-border-dark
            dark:bg-surface-dark dark:text-text-dark-default"
            placeholder={$localize`Enter Password (min 8 characters)`}
            required
            minLength={8}
            maxLength={63}
          />
          <p class="text-text-secondary dark:text-text-dark-secondary mt-1 text-xs">
            {$localize`Password must be at least 8 characters long`}
          </p>
        </div>
      </div>
    );
  },
);
