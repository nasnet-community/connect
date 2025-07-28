import { component$, useSignal } from "@builder.io/qwik";
import { RadioGroup } from "../index";

export default component$(() => {
  const defaultValue = useSignal("option1");
  const disabledValue = useSignal("option2");
  const errorValue = useSignal("");

  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-3 text-sm font-semibold">Default State</h3>
        <RadioGroup
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
          ]}
          value={defaultValue.value}
          name="default-radio"
          label="Select an option"
          onChange$={(value) => (defaultValue.value = value)}
        />
      </div>

      <div>
        <h3 class="mb-3 text-sm font-semibold">Required State</h3>
        <RadioGroup
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
          ]}
          value={defaultValue.value}
          name="required-radio"
          label="Select an option (required)"
          required
          onChange$={(value) => (defaultValue.value = value)}
        />
      </div>

      <div>
        <h3 class="mb-3 text-sm font-semibold">Disabled State (Group)</h3>
        <RadioGroup
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
          ]}
          value={disabledValue.value}
          name="disabled-group"
          label="Select an option (disabled group)"
          disabled
          onChange$={(value) => (disabledValue.value = value)}
        />
      </div>

      <div>
        <h3 class="mb-3 text-sm font-semibold">Disabled Options</h3>
        <RadioGroup
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2 (disabled)", disabled: true },
            { value: "option3", label: "Option 3" },
          ]}
          value={defaultValue.value}
          name="disabled-options"
          label="Select an option (one option disabled)"
          onChange$={(value) => (defaultValue.value = value)}
        />
      </div>

      <div>
        <h3 class="mb-3 text-sm font-semibold">Error State</h3>
        <RadioGroup
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
          ]}
          value={errorValue.value}
          name="error-radio"
          label="Select an option"
          error="Please select an option"
          onChange$={(value) => (errorValue.value = value)}
        />
      </div>
    </div>
  );
});
