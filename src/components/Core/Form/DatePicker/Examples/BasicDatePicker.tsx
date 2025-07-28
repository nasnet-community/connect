import { component$, useSignal } from "@builder.io/qwik";
import { DatePicker } from "../index";

export default component$(() => {
  const selectedDate = useSignal<Date | null>(null);

  return (
    <div class="space-y-4">
      <DatePicker
        mode="single"
        label="Select a date"
        value={selectedDate.value || undefined}
        onDateSelect$={(date) => (selectedDate.value = date)}
        helperText="Click to open the calendar and select a date"
      />

      <div class="text-sm text-gray-500 dark:text-gray-400">
        Selected date:{" "}
        {selectedDate.value ? selectedDate.value.toLocaleDateString() : "None"}
      </div>
    </div>
  );
});
