import { component$, useSignal } from "@builder.io/qwik";
import { Select } from "../index";

export default component$(() => {
  const selectedValues = useSignal<string[]>([]);

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "kiwi", label: "Kiwi" },
    { value: "mango", label: "Mango" },
    { value: "strawberry", label: "Strawberry" },
    { value: "blueberry", label: "Blueberry" },
  ];

  return (
    <div class="space-y-4">
      <Select
        options={options}
        value={selectedValues.value}
        onChange$={(values) => (selectedValues.value = values as string[])}
        placeholder="Select multiple fruits"
        label="Favorite Fruits"
        multiple={true}
        searchable={true}
        clearable={true}
      />

      <div class="text-sm text-gray-500 dark:text-gray-400">
        Selected values:{" "}
        {selectedValues.value.length > 0
          ? selectedValues.value.join(", ")
          : "None"}
      </div>

      <div class="mt-4 text-sm text-gray-600 dark:text-gray-300">
        <p>This example demonstrates:</p>
        <ul class="ml-5 mt-2 list-disc">
          <li>Multiple selection mode</li>
          <li>Search functionality for finding options</li>
          <li>Clearable option to reset selections</li>
          <li>Tag-style display of multiple selected items</li>
        </ul>
      </div>
    </div>
  );
});
