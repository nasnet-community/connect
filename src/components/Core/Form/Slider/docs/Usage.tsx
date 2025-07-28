import { component$ } from "@builder.io/qwik";
import {
  UsageTemplate,
  type UsageGuideline,
  type BestPractice,
  type AccessibilityTip,
} from "~/components/Docs/templates";

/**
 * Slider component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use appropriate min, max, and step values",
      description:
        "Set sensible boundaries with min and max values, and choose step increments that match the precision needed for the task.",
      code: `<Slider
  label="Volume"
  min={0}
  max={100}
  step={1}
  value={50}
  onChange$={$((value) => console.log(value))}
/>`,
      type: "do",
    },
    {
      title: "Show visual indicators for important values",
      description:
        "Use marks or ticks to highlight important values on the slider track.",
      code: `<Slider
  label="Temperature"
  min={0}
  max={100}
  value={50}
  showMarks={true}
  marks={[
    { value: 0, label: "0°C" },
    { value: 25, label: "25°C" },
    { value: 50, label: "50°C" },
    { value: 75, label: "75°C" },
    { value: 100, label: "100°C" }
  ]}
/>`,
      type: "do",
    },
    {
      title: "Provide appropriate feedback and helper text",
      description:
        "Use helper text to explain what the slider does and validation messages when appropriate.",
      code: `<Slider
  label="CPU Throttling"
  value={90}
  helperText="Adjust performance vs. energy usage"
  warningMessage="High values may cause system overheating"
/>`,
      type: "do",
    },
    {
      title: "Don't use inconsistent or confusing step sizes",
      description:
        "Avoid step sizes that result in awkward decimal values that don't match user expectations.",
      code: `// Avoid this:
<Slider
  label="Zoom"
  min={1}
  max={5}
  step={0.33}
  value={2.33}
/>

// Better:
<Slider
  label="Zoom"
  min={100}
  max={500}
  step={25}
  value={200}
  formatLabel$={$((value) => \`\${value / 100}x\`)}
/>`,
      type: "dont",
    },
    {
      title: "Don't omit visual cues for ranges with specific meanings",
      description:
        "When ranges have natural segments or thresholds, visualize them for users.",
      code: `// Avoid this for risk level selection:
<Slider
  label="Risk Level"
  min={1}
  max={10}
  value={5}
/>

// Better:
<Slider
  label="Risk Level"
  min={1}
  max={10}
  value={5}
  showTicks={true}
  tickCount={10}
  marks={[
    { value: 1, label: "Low" },
    { value: 5, label: "Medium" },
    { value: 10, label: "High" }
  ]}
/>`,
      type: "dont",
    },
    {
      title: "Don't make vertical sliders too short",
      description:
        "Ensure vertical sliders have sufficient height for accurate adjustment.",
      code: `// Avoid this:
<div class="h-24">
  <Slider
    orientation="vertical"
    label="Volume"
    value={50}
  />
</div>

// Better:
<div class="h-64">
  <Slider
    orientation="vertical"
    label="Volume"
    value={50}
  />
</div>`,
      type: "dont",
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Use range sliders for filtering between two values",
      description:
        "Range sliders are ideal for selecting a span of values, like price ranges or date ranges.",
    },
    {
      title: "Format values to match their meaning",
      description:
        "Use formatLabel$ to apply appropriate formatting like currency symbols, percent signs, or units.",
    },
    {
      title:
        "When using a vertical slider, place it on the right side of related content",
      description:
        "This follows the mental model most users have for volume or other vertical controls.",
    },
    {
      title: "Keep horizontal sliders wide enough for comfortable interaction",
      description:
        "Ensure the slider width is sufficient to enable precision adjustment (at least 200px for standard sliders).",
    },
    {
      title: "Consider using onChangeEnd$ for expensive operations",
      description:
        "For operations that would be costly to perform on every value change, use onChangeEnd$ to trigger them when the user finishes dragging.",
    },
    {
      title:
        "Use showValue to display the current value when precision matters",
      description:
        "When exact values are important, displaying the current value gives users necessary feedback.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Provide descriptive labels",
      description:
        "Always include a label that clearly describes what the slider controls.",
    },
    {
      title: "Support keyboard interactions",
      description:
        "Users can navigate with Tab, and adjust values with arrow keys, Home (min value), and End (max value) keys.",
    },
    {
      title: "Include units in aria labels",
      description:
        "When the slider represents a value with units, make sure the units are included in labels and formatting.",
    },
    {
      title: "Announce value changes",
      description:
        "Values are properly announced to screen readers when they change.",
    },
    {
      title: "Ensure sufficient contrast",
      description:
        "The track, thumb, and marks should have sufficient contrast against the background.",
    },
    {
      title: "Support disabled and read-only states properly",
      description:
        "Disabled sliders properly convey their state to assistive technology.",
    },
  ];

  const performanceTips = [
    "Avoid using many sliders that update the same state simultaneously",
    "For range sliders with a large range, consider using step values to reduce processing",
    "Use debouncing or throttling for onChange$ handlers that trigger expensive operations",
    "Prefer controlled usage with proper memoization to prevent unnecessary re-renders",
    "Be cautious with formatLabel$ functions as they run frequently - keep them simple",
    "For extremely complex sliders with many marks, consider lazy loading those elements",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The Slider component provides an interactive way for users to select a
        value or range within defined boundaries. It's ideal for adjusting
        settings where the relative position matters more than precise numeric
        input.
      </p>
      <p class="mt-2">
        Sliders come in two main types: single sliders for selecting a single
        value, and range sliders for selecting a span between two values. They
        can be oriented horizontally or vertically depending on the interface
        requirements and available space.
      </p>
    </UsageTemplate>
  );
});
