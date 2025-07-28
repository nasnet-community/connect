import { component$, useSignal } from "@builder.io/qwik";
import { Field } from "../index";

export default component$(() => {
  const normalValue = useSignal("");
  const disabledValue = useSignal("Disabled input");
  const requiredValue = useSignal("");
  const errorValue = useSignal("");

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Normal State</h3>
        <Field
          label="Normal input"
          type="text"
          value={normalValue.value}
          onValueChange$={(value) => (normalValue.value = value as string)}
          placeholder="Enter text"
          helperText="This is a standard field with helper text"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Disabled State</h3>
        <Field
          label="Disabled input"
          type="text"
          value={disabledValue.value}
          onValueChange$={(value) => (disabledValue.value = value as string)}
          disabled
          helperText="This field cannot be edited"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Required State</h3>
        <Field
          label="Required input"
          type="text"
          value={requiredValue.value}
          onValueChange$={(value) => (requiredValue.value = value as string)}
          placeholder="This field is required"
          required
          helperText="This field must be filled"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Error State</h3>
        <Field
          label="Input with error"
          type="text"
          value={errorValue.value}
          onValueChange$={(value) => (errorValue.value = value as string)}
          placeholder="Type something"
          error="This field has an invalid value"
        />
      </div>
    </div>
  );
});
