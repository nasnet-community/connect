import { component$, useSignal, $, type QRL } from "@builder.io/qwik";
import { HiEyeOutline, HiEyeSlashOutline } from "@qwikest/icons/heroicons";

export interface PasswordFieldProps {
  value: string;
  onChange$: QRL<(value: string) => void>;
  placeholder?: string;
  error?: boolean;
  class?: string;
}

export const PasswordField = component$<PasswordFieldProps>(
  ({ value, onChange$, placeholder, error = false, class: className = "" }) => {
    const showPassword = useSignal(false);

    const togglePasswordVisibility = $(() => {
      showPassword.value = !showPassword.value;
    });

    return (
      <div class={`relative ${className}`}>
        <input
          type={showPassword.value ? "text" : "password"}
          value={value}
          onInput$={(e) => {
            const inputValue = (e.target as HTMLInputElement).value;
            onChange$(inputValue);
          }}
          placeholder={placeholder}
          class={`w-full rounded-lg border ${
            error
              ? "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500"
              : "border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          } px-4 py-2 pr-10`}
        />
        <button
          type="button"
          onClick$={togglePasswordVisibility}
          class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400"
        >
          {showPassword.value ? (
            <HiEyeSlashOutline class="h-5 w-5" />
          ) : (
            <HiEyeOutline class="h-5 w-5" />
          )}
        </button>
      </div>
    );
  },
);
