import { component$, useSignal } from "@builder.io/qwik";
import { DatePicker } from "../index";

export default component$(() => {
  const dateValue = useSignal<Date | null>(null);

  // Get today's date for min/max date examples
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const oneWeekLater = new Date();
  oneWeekLater.setDate(today.getDate() + 7);

  const disabledDates = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
  ];

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Required DatePicker</h3>
        <DatePicker
          mode="single"
          label="Required date"
          value={dateValue.value || undefined}
          onDateSelect$={(date) => (dateValue.value = date)}
          required
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Disabled DatePicker</h3>
        <DatePicker
          mode="single"
          label="Disabled date picker"
          value={today}
          onDateSelect$={(date) => (dateValue.value = date)}
          disabled
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">With Error Message</h3>
        <DatePicker
          mode="single"
          label="Date with error"
          value={dateValue.value || undefined}
          onDateSelect$={(date) => (dateValue.value = date)}
          errorMessage="Please select a valid date"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">With Min Date (One week ago)</h3>
        <DatePicker
          mode="single"
          label="Min date constraint"
          value={dateValue.value || undefined}
          onDateSelect$={(date) => (dateValue.value = date)}
          minDate={oneWeekAgo}
          helperText="Cannot select dates before one week ago"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">
          With Max Date (One week later)
        </h3>
        <DatePicker
          mode="single"
          label="Max date constraint"
          value={dateValue.value || undefined}
          onDateSelect$={(date) => (dateValue.value = date)}
          maxDate={oneWeekLater}
          helperText="Cannot select dates after one week from now"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">With Specific Disabled Dates</h3>
        <DatePicker
          mode="single"
          label="Disabled specific dates"
          value={dateValue.value || undefined}
          onDateSelect$={(date) => (dateValue.value = date)}
          disabledDates={disabledDates}
          helperText="Some dates in the next week are disabled"
        />
      </div>
    </div>
  );
});
