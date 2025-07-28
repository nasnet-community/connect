import { component$, useSignal } from "@builder.io/qwik";
import { Field } from "../index";

export default component$(() => {
  const textValue = useSignal("");

  return (
    <div class="space-y-4">
      <Field
        label="Basic text field"
        type="text"
        value={textValue.value}
        onValueChange$={(value) => (textValue.value = value as string)}
        placeholder="Enter some text"
        helperText="This is a basic text field example"
      />

      <div class="text-sm text-gray-500 dark:text-gray-400">
        Current value: {textValue.value || "(empty)"}
      </div>
    </div>
  );
});
