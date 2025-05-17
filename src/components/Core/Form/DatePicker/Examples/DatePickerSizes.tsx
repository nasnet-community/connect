import { component$, useSignal } from '@builder.io/qwik';
import { DatePicker } from '../index';

export default component$(() => {
  const smallDate = useSignal<Date | null>(null);
  const mediumDate = useSignal<Date | null>(null);
  const largeDate = useSignal<Date | null>(null);
  
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-sm font-semibold mb-2">Small Size</h3>
        <DatePicker
          size="sm"
          label="Small date picker"
          value={smallDate.value || undefined}
          onDateSelect$={(date) => smallDate.value = date}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Medium Size (Default)</h3>
        <DatePicker
          size="md"
          label="Medium date picker"
          value={mediumDate.value || undefined}
          onDateSelect$={(date) => mediumDate.value = date}
        />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Large Size</h3>
        <DatePicker
          size="lg"
          label="Large date picker"
          value={largeDate.value || undefined}
          onDateSelect$={(date) => largeDate.value = date}
        />
      </div>
    </div>
  );
});
