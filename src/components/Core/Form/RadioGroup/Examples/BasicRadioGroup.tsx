import { component$, useSignal } from "@builder.io/qwik";
import { RadioGroup } from "../index";

export default component$(() => {
  const selectedValue = useSignal("option1");

  return (
    <div class="p-4">
      <RadioGroup
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" },
        ]}
        value={selectedValue.value}
        name="basic-radio-group"
        label="Select an option"
        onChange$={(value) => (selectedValue.value = value)}
      />

      <div class="mt-4 text-sm">
        Selected value: <span class="font-medium">{selectedValue.value}</span>
      </div>
    </div>
  );
});
