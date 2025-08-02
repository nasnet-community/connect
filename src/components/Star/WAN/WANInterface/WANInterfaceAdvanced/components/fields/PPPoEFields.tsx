import { component$, type QRL } from "@builder.io/qwik";
import type { PPPoEConfig } from "../../../../../StarContext/WANType";

export interface PPPoEFieldsProps {
  config?: PPPoEConfig;
  onUpdate$: QRL<(config: PPPoEConfig) => void>;
  errors?: {
    username?: string[];
    password?: string[];
  };
}

export const PPPoEFields = component$<PPPoEFieldsProps>(
  ({ config, onUpdate$, errors }) => {
    return (
      <div class="space-y-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {$localize`PPPoE Settings`}
        </h4>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {$localize`Username`} <span class="text-error-500">*</span>
          </label>
          <input
            type="text"
            class={`w-full rounded-md shadow-sm focus:ring-primary-500 
                 dark:bg-gray-700 dark:text-white
                 ${
                   errors?.username
                     ? "border-error-500 focus:border-error-500"
                     : "border-gray-300 focus:border-primary-500 dark:border-gray-600"
                 }`}
            value={config?.username || ""}
            onInput$={(e) => {
              const value = (e.target as HTMLInputElement).value;
              onUpdate$({
                username: value,
                password: config?.password || "",
              });
            }}
            placeholder="PPPoE username"
          />
          {errors?.username && (
            <p class="mt-1 text-sm text-error-500 dark:text-error-400">
              {errors.username[0]}
            </p>
          )}
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {$localize`Password`} <span class="text-error-500">*</span>
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
            value={config?.password || ""}
            onInput$={(e) => {
              const value = (e.target as HTMLInputElement).value;
              onUpdate$({
                username: config?.username || "",
                password: value,
              });
            }}
            placeholder="PPPoE password"
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
