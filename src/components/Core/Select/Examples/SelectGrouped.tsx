import { component$, useSignal } from "@builder.io/qwik";
import { Select } from "../index";

export default component$(() => {
  const selectedValue = useSignal<string>("");

  const groupedOptions = [
    { value: "apple", label: "Apple", group: "Fruits" },
    { value: "banana", label: "Banana", group: "Fruits" },
    { value: "orange", label: "Orange", group: "Fruits" },
    { value: "strawberry", label: "Strawberry", group: "Fruits" },
    { value: "carrot", label: "Carrot", group: "Vegetables" },
    { value: "broccoli", label: "Broccoli", group: "Vegetables" },
    { value: "spinach", label: "Spinach", group: "Vegetables" },
    { value: "garlic", label: "Garlic", group: "Vegetables" },
    { value: "milk", label: "Milk", group: "Dairy" },
    { value: "cheese", label: "Cheese", group: "Dairy" },
    { value: "yogurt", label: "Yogurt", group: "Dairy" },
  ];

  return (
    <div class="space-y-4">
      <Select
        options={groupedOptions}
        value={selectedValue.value}
        onChange$={(value) => (selectedValue.value = value as string)}
        placeholder="Select a food item"
        label="Food Categories"
        searchable={true}
      />

      <div class="text-sm text-gray-500 dark:text-gray-400">
        Selected value: {selectedValue.value || "None"}
      </div>

      <div class="mt-4 text-sm text-gray-600 dark:text-gray-300">
        <p>This example demonstrates:</p>
        <ul class="ml-5 mt-2 list-disc">
          <li>Option grouping for better organization</li>
          <li>Searchable dropdown for easier navigation</li>
          <li>Categories make it easier to find relevant options</li>
        </ul>
      </div>
    </div>
  );
});
