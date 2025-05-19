import { component$, useSignal, $ } from '@builder.io/qwik';
import { Slider } from '../';

/**
 * Example demonstrating range slider functionality
 */
export default component$(() => {
  const range = useSignal<[number, number]>([20, 80]);
  const constrainedRange = useSignal<[number, number]>([30, 70]);
  
  return (
    <div class="space-y-10 max-w-xl">
      <div>
        <h3 class="text-sm font-medium mb-2">Basic Range Slider</h3>
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
        <h3 class="text-sm font-medium mb-2">Range Slider with Min Range</h3>
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
        <h3 class="text-sm font-medium mb-2">Vertical Range Slider</h3>
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