import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

/**
 * Slider component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Single Value and Range Selection: Support for both single value sliders and range sliders",
    "Orientation Options: Horizontal and vertical orientations",
    "Visual Customization: Adjustable track, thumb, and marks appearance",
    "Accessibility Features: Keyboard navigation, ARIA attributes, and screen reader compatibility",
    "Visual Feedback: Display current values, validation states, and feedback messages",
    "Constraints: Min/max limits, step increments, and minimum range constraints",
    "Markers: Optional ticks and marked values for visual guidance",
  ];

  const whenToUse = [
    "When selecting a value or range from a continuous or stepped number interval",
    "When adjusting settings with visual feedback (volume, brightness, etc.)",
    "When filtering data within a range (price filters, date ranges, etc.)",
    "When a compact input method is preferred over text input for numeric values",
    "When the relative position or proportion is more important than precise input",
  ];

  const whenNotToUse = [
    "When precise numeric input is required (use a numeric Field component instead)",
    "When selection from a small set of discrete options is needed (use RadioGroup or Select)",
    "When there are more than 2-3 sliders needed on a single form (consider alternative UI)",
    "When the range of possible values is very large and step granularity is important",
    "When screen space is extremely limited (especially for vertical sliders)",
  ];

  return (
    <OverviewTemplate
      title="Slider Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Slider component provides an interactive control for selecting
        numeric values by dragging a thumb along a track. It offers both
        single-value and range selection modes to accommodate different use
        cases.
      </p>
      <p class="mt-2">
        Sliders are useful when users need to make adjustments within a defined
        range where the exact value may be less important than the relative
        position. They provide immediate visual feedback and allow users to
        quickly try different values.
      </p>
      <p class="mt-2">
        With support for horizontal and vertical orientations, customizable
        marks and ticks, and various visual feedback options, the Slider
        component can be configured to meet diverse interface requirements while
        maintaining accessibility and usability.
      </p>
    </OverviewTemplate>
  );
});
