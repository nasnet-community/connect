import { component$ } from "@builder.io/qwik";
import { Select } from "../index";

export default component$(() => {
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "kiwi", label: "Kiwi" },
  ];

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Small Size</h3>
        <Select options={options} placeholder="Small select" size="sm" />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Medium Size (Default)</h3>
        <Select options={options} placeholder="Medium select" size="md" />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Large Size</h3>
        <Select options={options} placeholder="Large select" size="lg" />
      </div>
    </div>
  );
});
