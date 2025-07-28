import { component$, useSignal, $ } from "@builder.io/qwik";
import { Slider } from "../";
import type { SliderMark } from "../Slider.types";

/**
 * Example demonstrating various slider features
 */
export default component$(() => {
  const value = useSignal(50);
  const customValue = useSignal(30);

  // Custom marks for temperature slider
  const temperatureMarks: SliderMark[] = [
    { value: 0, label: "0°C" },
    { value: 25, label: "25°C" },
    { value: 50, label: "50°C" },
    { value: 75, label: "75°C" },
    { value: 100, label: "100°C" },
  ];

  // Currency formatter
  const formatCurrency$ = $((value: number) => {
    return `$${value}`;
  });

  return (
    <div class="max-w-xl space-y-10">
      <div>
        <h3 class="mb-2 text-sm font-medium">Slider with Marks</h3>
        <Slider
          label="Temperature"
          value={value.value}
          onChange$={$((newValue) => {
            value.value = newValue;
          })}
          showMarks={true}
          marks={temperatureMarks}
          showValue={true}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Slider with Ticks</h3>
        <Slider
          label="Volume Level"
          value={value.value}
          onChange$={$((newValue) => {
            value.value = newValue;
          })}
          showTicks={true}
          tickCount={5}
          showValue={true}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">
          Slider with Custom Value Format
        </h3>
        <Slider
          label="Price"
          value={customValue.value}
          onChange$={$((newValue) => {
            customValue.value = newValue;
          })}
          min={0}
          max={1000}
          step={10}
          formatLabel$={formatCurrency$}
          showValue={true}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Slider with Custom Step</h3>
        <Slider
          label="Rating (0.5 steps)"
          value={value.value}
          onChange$={$((newValue) => {
            value.value = newValue;
          })}
          min={0}
          max={5}
          step={0.5}
          showValue={true}
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Vertical Slider with Marks</h3>
        <div class="h-64">
          <Slider
            label="Height"
            orientation="vertical"
            value={value.value}
            onChange$={$((newValue) => {
              value.value = newValue;
            })}
            showMarks={true}
            markCount={5}
            showValue={true}
          />
        </div>
      </div>
    </div>
  );
});
