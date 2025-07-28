import { component$ } from "@builder.io/qwik";
import {
  UsageTemplate,
  type UsageGuideline,
  type BestPractice,
  type AccessibilityTip,
} from "~/components/Docs/templates";

/**
 * RadioGroup component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use descriptive labels",
      description:
        "Always provide clear, concise labels that describe each option.",
      code: `<RadioGroup 
  options={[
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "push", label: "Push Notification" }
  ]}
  name="notification-method"
  value={notificationMethod}
  onChange$={(value) => setNotificationMethod(value)}
/>`,
      type: "do",
    },
    {
      title: "Use vertical layout for more than 3 options",
      description:
        "Use vertical layout when you have 4 or more options for better readability.",
      code: `<RadioGroup 
  direction="vertical"
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" }
  ]}
  name="selection"
  value={selection}
  onChange$={(value) => setSelection(value)}
/>`,
      type: "do",
    },
    {
      title: "Include error messages for validation",
      description:
        "Provide clear error messages when a required selection is not made.",
      code: `<RadioGroup 
  options={options}
  name="required-selection"
  value={value}
  onChange$={(v) => setValue(v)}
  required
  error={!value && formSubmitted ? "Please select an option" : undefined}
/>`,
      type: "do",
    },
    {
      title: "Don't use for multiple selection",
      description:
        "Avoid using RadioGroup when users need to select multiple options. Use CheckboxGroup instead.",
      code: `// Avoid this approach
<RadioGroup 
  options={[
    { value: "feature1", label: "Feature 1" },
    { value: "feature2", label: "Feature 2" }
  ]}
  // For multiple selection, use CheckboxGroup instead
/>`,
      type: "dont",
    },
    {
      title: "Don't use for large sets of options",
      description:
        "Avoid using RadioGroup for more than 7 options. Use a dropdown Select component instead.",
      code: `// Avoid this approach for many options
<RadioGroup 
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    // ... many more options
  ]}
/>

// Better approach for many options
<Select
  options={manyOptions}
  value={selectedOption}
  onChange$={(value) => setSelectedOption(value)}
/>`,
      type: "dont",
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Provide a default value when possible",
      description:
        "Pre-select a default value to minimize the need for validation and additional user action.",
    },
    {
      title: "Order options logically",
      description:
        "Arrange radio options in a logical order (frequency of use, alphabetical, etc.).",
    },
    {
      title: "Use consistent alignment",
      description:
        "Keep consistent alignment of radio buttons and their labels throughout your application.",
    },
    {
      title: "Group related options",
      description:
        "Use RadioGroup to group related options only; create separate groups for unrelated choices.",
    },
    {
      title: "Keep option labels concise",
      description:
        "Use short, clear labels for radio options to improve readability.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Ensure keyboard navigability",
      description:
        "Radio groups should be navigable using arrow keys for option selection.",
    },
    {
      title: "Use fieldset and legend",
      description:
        "The component uses fieldset and legend elements to properly group related radio inputs.",
    },
    {
      title: "Associate labels with inputs",
      description: "Each radio input should have a properly associated label.",
    },
    {
      title: "Communicate validation errors",
      description:
        "Error messages should be programmatically linked to the radio group using appropriate ARIA attributes.",
    },
    {
      title: "Ensure sufficient touch targets",
      description:
        "Radio buttons should have sufficiently large hit areas for users with motor impairments.",
    },
  ];

  const performanceTips = [
    "Avoid excessive re-renders by managing the RadioGroup state efficiently",
    "Use a single state variable for the selected value rather than multiple signals",
    "Consider lazy loading radio groups with many options if they're not immediately visible",
    "Use memoization for complex option arrays that don't change frequently",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The RadioGroup component is designed for mutually exclusive selections
        where only one choice can be active at a time. Use it when presenting
        users with a set of related but mutually exclusive options.
      </p>
      <p class="mt-2">
        This component is particularly useful in forms, settings pages, and
        configuration interfaces where users need to make a singular choice from
        a visible set of options.
      </p>
    </UsageTemplate>
  );
});
