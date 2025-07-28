export { default as Overview } from "./Overview";
export { default as Examples } from "./Examples";
export { default as APIReference } from "./APIReference";
export { default as Usage } from "./Usage";
export { default as Playground } from "./Playground";

export const componentIntegration = `
The Slider component can be easily integrated into any Qwik application. Import the component from your components directory and provide the necessary props.

Basic single slider example:
\`\`\`tsx
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Slider } from '~/components/Core/Form/Slider';

export default component$(() => {
  const value = useSignal(50);
  
  return (
    <Slider
      label="Volume"
      value={value.value}
      onChange$={$((newValue) => {
        value.value = newValue;
      })}
      min={0}
      max={100}
      showValue={true}
    />
  );
});
\`\`\`

Range slider example:
\`\`\`tsx
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Slider } from '~/components/Core/Form/Slider';

export default component$(() => {
  const range = useSignal<[number, number]>([20, 80]);
  
  return (
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
    />
  );
});
\`\`\`
`;

export const customization = `
The Slider component is highly customizable through props. You can control its appearance, behavior, and labels to fit your application's needs.

Key customization areas:
- **Variant and Size**: Choose between 'default' and 'filled' variants and 'sm', 'md', and 'lg' sizes
- **Orientation**: Use 'horizontal' or 'vertical' orientation
- **Visual Feedback**: Show marks, ticks, and current values with showMarks, showTicks, and showValue
- **Constraints**: Set min, max, step, and for range sliders, minRange and maxRange
- **Custom Formatting**: Use formatLabel$ to customize how values are displayed

Example with custom marks and formatting:
\`\`\`tsx
import { component$, useSignal, $ } from '@builder.io/qwik';
import { Slider } from '~/components/Core/Form/Slider';
import type { SliderMark } from '~/components/Core/Form/Slider';

export default component$(() => {
  const value = useSignal(50);
  
  // Custom marks
  const temperatureMarks: SliderMark[] = [
    { value: 0, label: "0°C" },
    { value: 25, label: "25°C" },
    { value: 50, label: "50°C" },
    { value: 75, label: "75°C" },
    { value: 100, label: "100°C" }
  ];
  
  // Custom formatter
  const formatTemperature$ = $((value: number) => {
    return \`\${value}°C\`;
  });
  
  return (
    <Slider
      label="Temperature"
      value={value.value}
      onChange$={$((newValue) => {
        value.value = newValue;
      })}
      showMarks={true}
      marks={temperatureMarks}
      formatLabel$={formatTemperature$}
      showValue={true}
    />
  );
});
\`\`\`
`;
