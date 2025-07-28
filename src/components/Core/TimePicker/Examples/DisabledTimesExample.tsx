import { component$, useSignal } from "@builder.io/qwik";
import { TimePicker, type TimeValue } from "../Timepicker";

export const DisabledTimesExample = component$(() => {
  const businessTime = useSignal<TimeValue>({ hour: "09", minute: "00" });
  const appointmentTime = useSignal<TimeValue>({ hour: "10", minute: "00" });

  return (
    <div class="space-y-6">
      <div class="rounded-lg border border-border-DEFAULT dark:border-border-dark p-4">
        <h3 class="mb-3 text-lg font-semibold">Business Hours Only</h3>
        <p class="mb-3 text-sm text-gray-600 dark:text-gray-400">
          Only hours from 9 AM to 5 PM are available for selection.
        </p>
        <TimePicker
          time={businessTime.value}
          disabledTimes={{
            hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23],
          }}
          label="Business hours (9 AM - 5 PM)"
          onChange$={(field, value) => {
            businessTime.value = { ...businessTime.value, [field]: value };
          }}
        />
        <div class="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Selected time: {businessTime.value.hour}:{businessTime.value.minute}
        </div>
      </div>

      <div class="rounded-lg border border-border-DEFAULT dark:border-border-dark p-4">
        <h3 class="mb-3 text-lg font-semibold">Appointment Slots</h3>
        <p class="mb-3 text-sm text-gray-600 dark:text-gray-400">
          15-minute intervals with some specific times disabled.
        </p>
        <TimePicker
          time={appointmentTime.value}
          minuteStep={15}
          disabledTimes={{
            hours: [12, 13], // Lunch break
            minutes: [45], // No appointments at 45 minutes
          }}
          label="Appointment time (15-min slots, no lunch break)"
          onChange$={(field, value) => {
            appointmentTime.value = { ...appointmentTime.value, [field]: value };
          }}
        />
        <div class="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Selected time: {appointmentTime.value.hour}:{appointmentTime.value.minute}
        </div>
      </div>
    </div>
  );
});