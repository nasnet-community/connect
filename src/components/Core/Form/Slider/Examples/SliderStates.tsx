import { component$, useSignal, $ } from "@builder.io/qwik";
import { Slider } from "../";

/**
 * Example demonstrating different slider states
 */
export default component$(() => {
  const value = useSignal(50);

  return (
    <div class="max-w-xl space-y-8">
      <div>
        <h3 class="mb-2 text-sm font-medium">Default State</h3>
        <Slider
          label="Default State"
          value={value.value}
          onChange$={$((newValue) => {
            value.value = newValue;
          })}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Disabled State</h3>
        <Slider
          label="Disabled Slider"
          value={30}
          disabled={true}
          helperText="This slider is disabled and cannot be interacted with"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Read-only State</h3>
        <Slider
          label="Read-only Slider"
          value={70}
          readonly={true}
          helperText="This slider is read-only but can receive focus"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Error State</h3>
        <Slider
          label="Error State"
          value={20}
          onChange$={$((newValue) => {
            value.value = newValue;
          })}
          errorMessage="Please select a value above 50"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Success State</h3>
        <Slider
          label="Success State"
          value={80}
          onChange$={$((newValue) => {
            value.value = newValue;
          })}
          successMessage="Perfect! This value is within the recommended range."
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Warning State</h3>
        <Slider
          label="Warning State"
          value={10}
          onChange$={$((newValue) => {
            value.value = newValue;
          })}
          warningMessage="Low values may affect performance"
        />
      </div>
    </div>
  );
});
