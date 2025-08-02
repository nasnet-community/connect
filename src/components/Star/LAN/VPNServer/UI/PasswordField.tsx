import { component$, useSignal, type QRL } from "@builder.io/qwik";
import { HiEyeOutline, HiEyeSlashOutline } from "@qwikest/icons/heroicons";

export interface PasswordFieldProps {
  /**
   * Current value of the password field
   */
  value: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Whether the field is disabled
   */
  disabled?: boolean;

  /**
   * CSS class for the component
   */
  class?: string;

  /**
   * Handler for value changes
   */
  onChange$: QRL<(value: string) => void>;
}

export const PasswordField = component$<PasswordFieldProps>(
  ({
    value,
    placeholder = "",
    disabled = false,
    class: className = "",
    onChange$,
  }) => {
    const showPassword = useSignal(false);

    return (
      <div class={`relative ${className}`}>
        <input
          type={showPassword.value ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          class="disabled:bg-surface-lighter disabled:text-text-muted w-full rounded-md border-border 
               pr-10 shadow-sm 
               focus:border-primary-500 focus:ring-primary-500 disabled:cursor-not-allowed
               dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
          onChange$={(e) => {
            const target = e.target as HTMLInputElement;
            onChange$(target.value);
          }}
        />
        <button
          type="button"
          class="hover:text-text-default text-text-muted dark:text-text-dark-muted absolute inset-y-0 right-0 flex items-center px-3 dark:hover:text-text-dark-default"
          onClick$={() => (showPassword.value = !showPassword.value)}
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
