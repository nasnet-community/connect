import { component$, useSignal, $ } from "@builder.io/qwik";
import { Slider } from "../";

/**
 * Example demonstrating range slider functionality
 */
export default component$(() => {
  const range = useSignal<[number, number]>([20, 80]);
  const constrainedRange = useSignal<[number, number]>([30, 70]);

  return (
    <div class="max-w-xl space-y-10">
      <div>
        <h3 class="mb-2 text-sm font-medium">Basic Range Slider</h3>
        <Slider
          type="range"
          label="Price Range"
          value={range.value}
          onChange$={$((newRange) => {
            range.value = newRange;
          })}
          min={0}
          max={100}
          showValue={true}
          helperText="Select a range of values"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Range Slider with Min Range</h3>
        <Slider
          type="range"
          label="Date Range (Min 5 days)"
          value={constrainedRange.value}
          onChange$={$((newRange) => {
            constrainedRange.value = newRange;
          })}
          min={0}
          max={100}
          minRange={10}
          showValue={true}
          helperText="The minimum range between values is 10"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Vertical Range Slider</h3>
        <div class="h-48">
          <Slider
            type="range"
            label="Temperature Range"
            orientation="vertical"
            value={range.value}
            onChange$={$((newRange) => {
              range.value = newRange;
            })}
            min={0}
            max={100}
            showValue={true}
          />
        </div>
      </div>
    </div>
  );
});
