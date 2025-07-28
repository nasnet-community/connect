import { component$, useSignal } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "../Timepicker";

export const TimeFormatExample = component$(() => {
  const time24 = useSignal<TimeValue>({ hour: "14", minute: "30" });
  const time12 = useSignal<TimeValue>({ hour: "02", minute: "30", period: "PM" });

  return (
    <div class="space-y-6">
      <div class="rounded-lg border border-border-DEFAULT dark:border-border-dark p-4">
        <h3 class="mb-3 text-lg font-semibold">24-Hour Format</h3>
        <TimePicker
          time={time24.value}
          format="24"
          label="24-hour format"
          onChange$={(field, value) => {
            time24.value = { ...time24.value, [field]: value };
          }}
        />
        <div class="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Selected time: {time24.value.hour}:{time24.value.minute}
        </div>
      </div>

      <div class="rounded-lg border border-border-DEFAULT dark:border-border-dark p-4">
        <h3 class="mb-3 text-lg font-semibold">12-Hour Format</h3>
        <TimePicker
          time={time12.value}
          format="12"
          label="12-hour format with AM/PM"
          onChange$={(field, value) => {
            time12.value = { ...time12.value, [field]: value };
          }}
        />
        <div class="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Selected time: {time12.value.hour}:{time12.value.minute} {time12.value.period}
        </div>
      </div>
    </div>
  );
});