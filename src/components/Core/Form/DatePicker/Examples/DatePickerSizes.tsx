import { component$, useSignal } from "@builder.io/qwik";
import { DatePicker } from "../index";

export default component$(() => {
  const smallDate = useSignal<Date | null>(null);
  const mediumDate = useSignal<Date | null>(null);
  const largeDate = useSignal<Date | null>(null);

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Small Size</h3>
        <DatePicker
          mode="single"
          size="sm"
          label="Small date picker"
          value={smallDate.value || undefined}
          onDateSelect$={(date) => (smallDate.value = date)}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Medium Size (Default)</h3>
        <DatePicker
          mode="single"
          size="md"
          label="Medium date picker"
          value={mediumDate.value || undefined}
          onDateSelect$={(date) => (mediumDate.value = date)}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Large Size</h3>
        <DatePicker
          mode="single"
          size="lg"
          label="Large date picker"
          value={largeDate.value || undefined}
          onDateSelect$={(date) => (largeDate.value = date)}
        />
      </div>
    </div>
  );
});
