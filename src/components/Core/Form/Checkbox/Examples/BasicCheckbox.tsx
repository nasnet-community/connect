import { component$, useSignal } from "@builder.io/qwik";
import { Checkbox } from "../index";

export default component$(() => {
  const isChecked = useSignal(false);

  return (
    <div class="space-y-4">
      <Checkbox
        checked={isChecked.value}
        onChange$={(checked) => (isChecked.value = checked)}
        label="Accept terms and conditions"
      />

      <div class="text-sm text-gray-500 dark:text-gray-400">
        Current state: {isChecked.value ? "Checked" : "Unchecked"}
      </div>
    </div>
  );
});
