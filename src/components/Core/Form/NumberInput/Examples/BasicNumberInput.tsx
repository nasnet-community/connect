import { component$ } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import { NumberInput } from "../NumberInput";

export const BasicNumberInput = component$(() => {
  const value = useSignal<number | undefined>(0);

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-4 text-lg font-medium">Basic Number Input</h3>
        <NumberInput
          label="Quantity"
          value={value.value}
          onValueChange$={(val) => (value.value = val)}
          placeholder="Enter a number"
          helperText="Use the steppers or arrow keys to adjust"
        />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-medium">With Min/Max Constraints</h3>
        <NumberInput
          label="Age"
          value={value.value}
          onValueChange$={(val) => (value.value = val)}
          min={0}
          max={120}
          placeholder="Enter your age"
          helperText="Must be between 0 and 120"
        />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-medium">With Step and Precision</h3>
        <NumberInput
          label="Price"
          value={value.value}
          onValueChange$={(val) => (value.value = val)}
          step={0.01}
          precision={2}
          min={0}
          placeholder="0.00"
          helperText="Currency format with 2 decimal places"
        />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-medium">Disabled State</h3>
        <NumberInput
          label="Disabled Input"
          value={42}
          disabled
          helperText="This input is disabled"
        />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-medium">Error State</h3>
        <NumberInput
          label="With Error"
          value={value.value}
          onValueChange$={(val) => (value.value = val)}
          error="Value must be greater than zero"
          min={1}
        />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-medium">Without Steppers</h3>
        <NumberInput
          label="No Steppers"
          value={value.value}
          onValueChange$={(val) => (value.value = val)}
          showSteppers={false}
          placeholder="Type a number"
        />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-medium">Size Variants</h3>
        <div class="space-y-4">
          <NumberInput
            label="Small"
            value={value.value}
            onValueChange$={(val) => (value.value = val)}
            size="sm"
            placeholder="Small input"
          />
          <NumberInput
            label="Medium (Default)"
            value={value.value}
            onValueChange$={(val) => (value.value = val)}
            size="md"
            placeholder="Medium input"
          />
          <NumberInput
            label="Large"
            value={value.value}
            onValueChange$={(val) => (value.value = val)}
            size="lg"
            placeholder="Large input"
          />
        </div>
      </div>
    </div>
  );
});
