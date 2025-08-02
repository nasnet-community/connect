import { component$, type QRL } from "@builder.io/qwik";
import type { WirelessCredentials } from "../../../../../StarContext/CommonType";

export interface WirelessFieldsProps {
  credentials?: WirelessCredentials;
  onUpdate$: QRL<(credentials: WirelessCredentials) => void>;
  errors?: {
    ssid?: string[];
    password?: string[];
  };
}

export const WirelessFields = component$<WirelessFieldsProps>(
  ({ credentials, onUpdate$, errors }) => {
    return (
      <div class="space-y-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {$localize`Wireless Settings`}
        </h4>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {$localize`SSID (Network Name)`}
          </label>
          <input
            type="text"
            class={`w-full rounded-md shadow-sm focus:ring-primary-500 
                 dark:bg-gray-700 dark:text-white
                 ${
                   errors?.ssid
                     ? "border-error-500 focus:border-error-500"
                     : "border-gray-300 focus:border-primary-500 dark:border-gray-600"
                 }`}
            value={credentials?.SSID || ""}
            onInput$={(e) => {
              const value = (e.target as HTMLInputElement).value;
              onUpdate$({
                SSID: value,
                Password: credentials?.Password || "",
              });
            }}
            placeholder="Enter network name"
          />
          {errors?.ssid && (
            <p class="mt-1 text-sm text-error-500 dark:text-error-400">
              {errors.ssid[0]}
            </p>
          )}
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {$localize`Password`}
          </label>
          <input
            type="password"
            class={`w-full rounded-md shadow-sm focus:ring-primary-500 
                 dark:bg-gray-700 dark:text-white
                 ${
                   errors?.password
                     ? "border-error-500 focus:border-error-500"
                     : "border-gray-300 focus:border-primary-500 dark:border-gray-600"
                 }`}
            value={credentials?.Password || ""}
            onInput$={(e) => {
              const value = (e.target as HTMLInputElement).value;
              onUpdate$({
                SSID: credentials?.SSID || "",
                Password: value,
              });
            }}
            placeholder="Min. 8 characters"
          />
          {errors?.password && (
            <p class="mt-1 text-sm text-error-500 dark:text-error-400">
              {errors.password[0]}
            </p>
          )}
        </div>
      </div>
    );
  },
);
