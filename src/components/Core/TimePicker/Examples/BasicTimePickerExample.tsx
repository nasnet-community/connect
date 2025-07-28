import { component$, useSignal } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "../Timepicker";

export const BasicTimePickerExample = component$(() => {
  const time = useSignal<TimeValue>({ hour: "09", minute: "00" });

  return (
    <div class="space-y-4">
      <div class="rounded-lg border border-border-DEFAULT dark:border-border-dark p-4">
        <h3 class="mb-3 text-lg font-semibold">Basic Usage</h3>
        <TimePicker
          time={time.value}
          label="Select Time"
          onChange$={(field, value) => {
            time.value = { ...time.value, [field]: value };
          }}
        />
        <div class="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Selected time: {time.value.hour}:{time.value.minute}
        </div>
      </div>
    </div>
  );
});