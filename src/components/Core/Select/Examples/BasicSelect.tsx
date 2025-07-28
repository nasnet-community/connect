import { component$, useSignal } from "@builder.io/qwik";
import { Select } from "../index";

export default component$(() => {
  const selectedValue = useSignal<string>("");

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "kiwi", label: "Kiwi" },
  ];

  return (
    <div class="space-y-4">
      <Select
        options={options}
        value={selectedValue.value}
        onChange$={(value) => (selectedValue.value = value as string)}
        placeholder="Select a fruit"
        label="Fruit"
      />

      <div class="text-sm text-gray-500 dark:text-gray-400">
        Selected value: {selectedValue.value || "None"}
      </div>
    </div>
  );
});
