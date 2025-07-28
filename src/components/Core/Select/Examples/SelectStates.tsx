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
        <h3 class="mb-2 text-sm font-semibold">Default State</h3>
        <Select options={options} placeholder="Select a fruit" />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Disabled State</h3>
        <Select
          options={options}
          placeholder="Disabled select"
          disabled={true}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Required State</h3>
        <Select
          options={options}
          placeholder="Required select"
          label="Required field"
          required={true}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">With Helper Text</h3>
        <Select
          options={options}
          placeholder="Select with helper text"
          helperText="This is some helpful information about the select."
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">With Error</h3>
        <Select
          options={options}
          placeholder="Select with error"
          errorMessage="This field is required"
        />
      </div>
    </div>
  );
});
