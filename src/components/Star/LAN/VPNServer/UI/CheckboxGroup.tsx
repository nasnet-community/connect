import { component$, type QRL } from "@builder.io/qwik";

export interface CheckboxOption {
  /**
   * The value of the checkbox
   */
  value: string;

  /**
   * The label to display for the checkbox
   */
  label: string;
}

export interface CheckboxGroupProps {
  /**
   * The available options
   */
  options: CheckboxOption[];

  /**
   * The currently selected values
   */
  selected: string[];

  /**
   * Orientation of the group (horizontal or vertical)
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Whether the group is disabled
   */
  disabled?: boolean;

  /**
   * CSS class for the component
   */
  class?: string;

  /**
   * Handler for when an option is toggled
   */
  onToggle$: QRL<(value: string) => void>;
}

export const CheckboxGroup = component$<CheckboxGroupProps>(
  ({
    options,
    selected,
    orientation = "horizontal",
    disabled = false,
    class: className = "",
    onToggle$,
  }) => {
    const containerClass =
      orientation === "horizontal"
        ? "flex flex-wrap gap-4"
        : "flex flex-col space-y-3";

    return (
      <div class={`${containerClass} ${className}`}>
        {options.map((option) => {
          const isChecked = selected.includes(option.value);

          return (
            <label
              key={option.value}
              class={`flex items-center gap-2 ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
            >
              <input
                type="checkbox"
                value={option.value}
                checked={isChecked}
                disabled={disabled}
                class="h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
                onChange$={() => onToggle$(option.value)}
              />
              <span class="text-text-default dark:text-text-dark-default">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    );
  },
);
