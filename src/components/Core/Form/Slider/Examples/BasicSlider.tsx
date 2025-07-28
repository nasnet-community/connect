import { component$, useSignal, $ } from "@builder.io/qwik";
import { Slider } from "../";

/**
 * Basic slider example demonstrating the default implementation with a single value
 */
export default component$(() => {
  const value = useSignal(50);

  return (
    <div class="max-w-xl space-y-8">
      <div>
        <h3 class="mb-2 text-sm font-medium">Basic Slider</h3>
        <Slider
          label="Volume"
          value={value.value}
          onChange$={$((newValue) => {
            value.value = newValue;
          })}
          showValue={true}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">With Helper Text</h3>
        <Slider
          label="Brightness"
          value={value.value}
          onChange$={$((newValue) => {
            value.value = newValue;
          })}
          showValue={true}
          helperText="Drag the thumb to adjust brightness"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">With Min/Max Values</h3>
        <Slider
          label="Temperature (°C)"
          value={value.value}
          onChange$={$((newValue) => {
            value.value = newValue;
          })}
          min={-10}
          max={40}
          showValue={true}
          helperText="Select temperature between -10°C and 40°C"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">With Custom Step</h3>
        <Slider
          label="Zoom Level"
          value={value.value}
          onChange$={$((newValue) => {
            value.value = newValue;
          })}
          min={0}
          max={100}
          step={5}
          showValue={true}
          helperText="Adjust in steps of 5%"
        />
      </div>
    </div>
  );
});
