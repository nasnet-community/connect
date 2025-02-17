import { component$, type QRL } from "@builder.io/qwik";

interface RadioButtonProps {
  checked: boolean;
  onChange$: QRL<() => void>;
  label?: string;
}

export const RadioButton = component$<RadioButtonProps>(
  ({ checked, onChange$, label }) => {
    return (
      <label class="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange$={onChange$}
          class="peer sr-only"
        />
        <div
          class="peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 peer h-6 w-11 
               rounded-full bg-gray-200 after:absolute 
               after:left-[2px] after:top-[2px] after:h-5 
               after:w-5 after:rounded-full after:border 
               after:border-gray-300 after:bg-white after:transition-all after:content-[''] 
               peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 
               dark:border-gray-600 dark:bg-gray-700"
        ></div>
        {label && (
          <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {label}
          </span>
        )}
      </label>
    );
  },
);
