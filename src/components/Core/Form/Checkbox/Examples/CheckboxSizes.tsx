import { component$, useSignal } from "@builder.io/qwik";
import { Checkbox } from "../index";

export default component$(() => {
  const smallChecked = useSignal(false);
  const mediumChecked = useSignal(true);
  const largeChecked = useSignal(false);

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Small Size</h3>
        <Checkbox
          checked={smallChecked.value}
          onChange$={(checked) => (smallChecked.value = checked)}
          label="Small checkbox"
          size="sm"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Medium Size (Default)</h3>
        <Checkbox
          checked={mediumChecked.value}
          onChange$={(checked) => (mediumChecked.value = checked)}
          label="Medium checkbox"
          size="md"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Large Size</h3>
        <Checkbox
          checked={largeChecked.value}
          onChange$={(checked) => (largeChecked.value = checked)}
          label="Large checkbox"
          size="lg"
        />
      </div>
    </div>
  );
});
