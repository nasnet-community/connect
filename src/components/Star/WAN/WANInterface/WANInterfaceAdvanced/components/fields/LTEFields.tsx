import { component$, type QRL } from "@builder.io/qwik";
import type { LTESettings } from "../../../../../StarContext/WANType";

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

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {$localize`APN`} <span class="text-error-500">*</span>
          </label>
          <input
            type="text"
            class={`w-full rounded-md shadow-sm focus:ring-primary-500 
                 dark:bg-gray-700 dark:text-white
                 ${
                   errors?.apn
                     ? "border-error-500 focus:border-error-500"
                     : "border-gray-300 focus:border-primary-500 dark:border-gray-600"
                 }`}
            value={settings?.apn || ""}
            onInput$={(e) => {
              const value = (e.target as HTMLInputElement).value;
              onUpdate$({
                apn: value,
                username: settings?.username,
                password: settings?.password,
              });
            }}
            placeholder="Enter APN"
          />
          {errors?.apn && (
            <p class="mt-1 text-sm text-error-500 dark:text-error-400">
              {errors.apn[0]}
            </p>
          )}
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {$localize`Username`}{" "}
            <span class="text-xs text-gray-400">{$localize`(Optional)`}</span>
          </label>
          <input
            type="text"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 
                 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 
                 dark:text-white"
            value={settings?.username || ""}
            onInput$={(e) => {
              const value = (e.target as HTMLInputElement).value;
              onUpdate$({
                apn: settings?.apn || "",
                username: value,
                password: settings?.password,
              });
            }}
            placeholder="LTE username"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {$localize`Password`}{" "}
            <span class="text-xs text-gray-400">{$localize`(Optional)`}</span>
          </label>
          <input
            type="password"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 
                 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 
                 dark:text-white"
            value={settings?.password || ""}
            onInput$={(e) => {
              const value = (e.target as HTMLInputElement).value;
              onUpdate$({
                apn: settings?.apn || "",
                username: settings?.username,
                password: value,
              });
            }}
            placeholder="LTE password"
          />
        </div>
      </div>
    );
  },
);
