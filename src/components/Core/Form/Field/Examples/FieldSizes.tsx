import { component$, useSignal } from "@builder.io/qwik";
import { Field } from "../index";

export default component$(() => {
  const smallValue = useSignal("");
  const mediumValue = useSignal("");
  const largeValue = useSignal("");

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Small Size Field</h3>
        <Field
          size="sm"
          label="Small input"
          type="text"
          value={smallValue.value}
          onValueChange$={(value) => (smallValue.value = value as string)}
          placeholder="Small size input"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Medium Size Field (Default)</h3>
        <Field
          size="md"
          label="Medium input"
          type="text"
          value={mediumValue.value}
          onValueChange$={(value) => (mediumValue.value = value as string)}
          placeholder="Medium size input"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Large Size Field</h3>
        <Field
          size="lg"
          label="Large input"
          type="text"
          value={largeValue.value}
          onValueChange$={(value) => (largeValue.value = value as string)}
          placeholder="Large size input"
        />
      </div>
    </div>
  );
});
