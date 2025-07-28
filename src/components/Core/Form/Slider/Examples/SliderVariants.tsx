import { component$, useSignal, $ } from "@builder.io/qwik";
import { Slider } from "../";

/**
 * Example demonstrating different slider variants and sizes
 */
export default component$(() => {
  const value = useSignal(50);
  const largeValue = useSignal(75);
  const smallValue = useSignal(25);

  return (
    <div class="max-w-xl space-y-10">
      <div>
        <h3 class="mb-2 text-sm font-medium">Default Variant</h3>
        <Slider
          label="Default Variant"
          value={value.value}
          onChange$={$((newValue) => {
            value.value = newValue;
          })}
          variant="default"
          showValue={true}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Filled Variant</h3>
        <Slider
          label="Filled Variant"
          value={value.value}
          onChange$={$((newValue) => {
            value.value = newValue;
          })}
          variant="filled"
          showValue={true}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Small Size</h3>
        <Slider
          label="Small Size"
          value={smallValue.value}
          onChange$={$((newValue) => {
            smallValue.value = newValue;
          })}
          size="sm"
          showValue={true}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Medium Size (Default)</h3>
        <Slider
          label="Medium Size"
          value={value.value}
          onChange$={$((newValue) => {
            value.value = newValue;
          })}
          size="md"
          showValue={true}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Large Size</h3>
        <Slider
          label="Large Size"
          value={largeValue.value}
          onChange$={$((newValue) => {
            largeValue.value = newValue;
          })}
          size="lg"
          showValue={true}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Vertical Orientation</h3>
        <div class="h-48">
          <Slider
            label="Vertical Slider"
            orientation="vertical"
            value={value.value}
            onChange$={$((newValue) => {
              value.value = newValue;
            })}
            showValue={true}
          />
        </div>
      </div>
    </div>
  );
});
