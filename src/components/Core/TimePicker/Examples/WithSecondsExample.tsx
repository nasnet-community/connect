import { component$, useSignal } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "../Timepicker";

export const WithSecondsExample = component$(() => {
  const time = useSignal<TimeValue>({ hour: "15", minute: "45", second: "30" });

  return (
    <div class="space-y-4">
      <div class="rounded-lg border border-border-DEFAULT dark:border-border-dark p-4">
        <h3 class="mb-3 text-lg font-semibold">With Seconds</h3>
        <TimePicker
          time={time.value}
          showSeconds
          secondStep={5}
          label="Time with seconds (5-second intervals)"
          onChange$={(_field, _value) => {
            time.value = { ...time.value, [_field]: _value };
          }}
        />
        <div class="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Selected time: {time.value.hour}:{time.value.minute}:{time.value.second}
        </div>
      </div>

      <div class="rounded-lg border border-border-DEFAULT dark:border-border-dark p-4">
        <h3 class="mb-3 text-lg font-semibold">Precise Seconds</h3>
        <TimePicker
          time={{
            hour: "09",
            minute: "15",
            second: "00",
          }}
          showSeconds
          secondStep={1}
          label="Precise seconds (1-second intervals)"
          onChange$={(_field, _value) => {
            // Handle change
          }}
        />
      </div>
    </div>
  );
});