import { component$ } from "@builder.io/qwik";
import type { FrequencySelectorProps, FrequencyOption } from "./FrequencySelector.types";

/**
 * FrequencySelector component for selecting frequency intervals (Daily, Weekly, Monthly).
 * Displays options as compact selection cards.
 *
 * @example
 * <FrequencySelector
 *   value={selectedFrequency}
 *   onChange$={(value) => setSelectedFrequency(value)}
 *   label="Update frequency"
 *   recommendedOption="Daily"
 * />
 */
export const FrequencySelector = component$<FrequencySelectorProps>((props) => {
  const {
    value,
    onChange$,
    label,
    disabled = false,
    recommendedOption,
    class: className = "",
  } = props;

  const frequencyOptions: FrequencyOption[] = [
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
  ];

  return (
    <div class={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <div class="mb-3">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            {label}
          </label>
        </div>
      )}

      {/* Frequency Cards */}
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {frequencyOptions.map((option) => {
          const isSelected = value === option.value;
          const isRecommended = recommendedOption === option.value;
          
          return (
            <div key={option.value} class="flex flex-col">
              <button
                type="button"
                disabled={disabled}
                onClick$={() => !disabled && onChange$(option.value)}
                class={`
                  relative px-4 py-3 rounded-lg border-2 font-medium text-sm text-center
                  transition-all duration-200 hover:shadow-sm
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-900/20 dark:text-primary-300'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-700'
                  }
                `}
              >
                {$localize`${option.label}`}
              </button>
              {isRecommended && (
                <div class="mt-1 text-center">
                  <span class="inline-block px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full dark:text-green-300 dark:bg-green-900/30">
                    {$localize`Recommended`}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});