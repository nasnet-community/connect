import { component$, useSignal } from "@builder.io/qwik";
import { CheckboxGroup } from "../CheckboxGroup";

export default component$(() => {
  const selectedFruits = useSignal<string[]>(["apple", "banana"]);

  const fruitOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape", disabled: true },
    { value: "mango", label: "Mango" },
  ];

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">
          Vertical Checkbox Group (Default)
        </h3>
        <CheckboxGroup
          options={fruitOptions}
          selected={selectedFruits.value}
          onToggle$={(value) => {
            if (selectedFruits.value.includes(value)) {
              selectedFruits.value = selectedFruits.value.filter(
                (item) => item !== value,
              );
            } else {
              selectedFruits.value = [...selectedFruits.value, value];
            }
          }}
          label="Select your favorite fruits"
          helperText="You can select multiple options"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Selected Values</h3>
        <div class="rounded bg-gray-100 p-2 dark:bg-gray-800">
          {selectedFruits.value.length
            ? selectedFruits.value.join(", ")
            : "No fruits selected"}
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Horizontal Checkbox Group</h3>
        <CheckboxGroup
          options={fruitOptions.slice(0, 3)}
          selected={selectedFruits.value}
          onToggle$={(value) => {
            if (selectedFruits.value.includes(value)) {
              selectedFruits.value = selectedFruits.value.filter(
                (item) => item !== value,
              );
            } else {
              selectedFruits.value = [...selectedFruits.value, value];
            }
          }}
          direction="horizontal"
          label="Select options"
        />
      </div>
    </div>
  );
});
