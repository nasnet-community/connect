import { component$, type QRL } from "@builder.io/qwik";

export interface SwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange$: QRL<(checked: boolean) => void>;
  disabled?: boolean;
}

export const Switch = component$<SwitchProps>(
  ({ id, label, checked, onChange$, disabled = false }) => {
    return (
      <div class="flex items-center">
        <label
          for={id}
          class="relative inline-flex cursor-pointer items-center"
        >
          <input
            type="checkbox"
            id={id}
            class="peer sr-only"
            checked={checked}
            disabled={disabled}
            onChange$={(_, target) => onChange$(target.checked)}
          />
          <div
            class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px]
                    after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white
                    after:transition-all after:content-[''] peer-checked:bg-primary-500
                    peer-checked:after:translate-x-full peer-checked:after:border-white
                    peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500
                    peer-disabled:cursor-not-allowed peer-disabled:opacity-60
                    dark:bg-gray-700 dark:after:border-gray-600"
          ></div>
          <span class="text-text-default ml-3 text-sm font-medium dark:text-text-dark-default">
            {label}
          </span>
        </label>
      </div>
    );
  },
);
