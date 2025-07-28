import { component$, useSignal } from "@builder.io/qwik";
import { DatePicker } from "../index";

export default component$(() => {
  const selectedDateTime = useSignal<Date | null>(null);

  return (
    <div class="space-y-4">
      <DatePicker
        mode="datetime"
        label="Select date and time"
        value={selectedDateTime.value || undefined}
        onDateSelect$={(date) => (selectedDateTime.value = date)}
        helperText="Select both date and time"
        showSeconds={true}
        use12HourTime={true}
      />

      <div class="text-sm text-gray-500 dark:text-gray-400">
        Selected date and time:{" "}
        {selectedDateTime.value
          ? `${selectedDateTime.value.toLocaleDateString()} ${selectedDateTime.value.toLocaleTimeString()}`
          : "None"}
      </div>
    </div>
  );
});
