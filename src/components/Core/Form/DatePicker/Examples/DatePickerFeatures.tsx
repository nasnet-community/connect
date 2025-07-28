import { component$, useSignal } from "@builder.io/qwik";
import { DatePicker } from "../index";

export default component$(() => {
  const selectedDate = useSignal<Date | null>(null);
  const formattedDate = useSignal<Date | null>(null);

  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Inline DatePicker</h3>
        <p class="mb-4 text-xs text-gray-500 dark:text-gray-400">
          Calendar is always visible, no popup/dropdown
        </p>
        <div class="flex flex-col gap-6 md:flex-row">
          <div>
            <DatePicker
              mode="single"
              inline
              showTodayButton
              value={selectedDate.value || undefined}
              onDateSelect$={(date) => (selectedDate.value = date)}
            />
          </div>
          <div class="mt-4 md:mt-0">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Selected date:{" "}
              {selectedDate.value
                ? selectedDate.value.toLocaleDateString()
                : "None"}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Custom Date Format</h3>
        <DatePicker
          mode="single"
          label="Date with custom format"
          dateFormat="dd.MM.yyyy"
          value={formattedDate.value || undefined}
          onDateSelect$={(date) => (formattedDate.value = date)}
          helperText="Using format: dd.MM.yyyy"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Week Starts on Monday</h3>
        <DatePicker
          mode="single"
          label="Week starts on Monday"
          value={selectedDate.value || undefined}
          onDateSelect$={(date) => (selectedDate.value = date)}
          weekStart={1}
          helperText="Calendar week starts on Monday instead of Sunday"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Show Week Numbers</h3>
        <DatePicker
          mode="single"
          label="With week numbers"
          value={selectedDate.value || undefined}
          onDateSelect$={(date) => (selectedDate.value = date)}
          showWeekNumbers
          helperText="Calendar shows week numbers on the left side"
        />
      </div>
    </div>
  );
});
