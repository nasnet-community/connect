import { component$, useSignal } from "@builder.io/qwik";
import { DatePicker } from "../index";
import type { DateRange } from "../DatePicker.types";

export default component$(() => {
  const selectedRange = useSignal<DateRange>({
    startDate: null,
    endDate: null,
  });

  return (
    <div class="space-y-4">
      <DatePicker
        mode="range"
        label="Select date range"
        value={selectedRange.value}
        onRangeSelect$={(range) => (selectedRange.value = range)}
        helperText="Select start and end dates"
      />

      <div class="text-sm text-gray-500 dark:text-gray-400">
        <div>
          Start date:{" "}
          {selectedRange.value.startDate
            ? selectedRange.value.startDate.toLocaleDateString()
            : "None"}
        </div>
        <div>
          End date:{" "}
          {selectedRange.value.endDate
            ? selectedRange.value.endDate.toLocaleDateString()
            : "None"}
        </div>
      </div>
    </div>
  );
});
