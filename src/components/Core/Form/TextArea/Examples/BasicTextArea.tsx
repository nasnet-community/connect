import { component$, useSignal } from "@builder.io/qwik";
import { TextArea } from "../TextArea";

export default component$(() => {
  const value = useSignal("");

  return (
    <div class="max-w-md space-y-4">
      <TextArea
        label="Comments"
        placeholder="Enter your comments here..."
        helperText="Please provide any additional feedback"
        value={value.value}
        onInput$={(event, element) => {
          value.value = element.value;
        }}
      />

      <div class="text-sm text-gray-500 dark:text-gray-400">
        Current value: {value.value ? `"${value.value}"` : "(empty)"}
      </div>
    </div>
  );
});
