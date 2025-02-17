import { component$ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

interface TimezoneCardProps {
  selectedTimezone: Signal<string>;
}

export const TimezoneCard = component$<TimezoneCardProps>(
  ({ selectedTimezone }) => {
    return (
      <div class="rounded-xl bg-surface-secondary p-5 dark:bg-surface-dark-secondary">
        <label class="mb-2 block text-sm font-medium">{$localize`Timezone`}</label>
        <select
          value={selectedTimezone.value}
          onChange$={(e, currentTarget) =>
            (selectedTimezone.value = currentTarget.value)
          }
          class="w-full rounded-lg border bg-surface px-4 py-2.5 dark:bg-surface-dark"
        >
          <option value="Asia/Tehran">{$localize`Asia/Tehran`}</option>
          {/* Add more timezone options */}
        </select>
      </div>
    );
  },
);
