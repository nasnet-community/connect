import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const installation = `import { Radio, RadioGroup } from "~/components/Core";`;

  const basicUsage = `// Basic Radio Button
<Radio
  name="options"
  value="option1"
  label="Option 1"
  checked={selectedValue.value === "option1"}
  onChange$={(value) => (selectedValue.value = value)}
/>

// Radio Group
<RadioGroup
  name="preferences"
  label="Select your preference"
  options={[
    { value: "email", label: "Email notifications" },
    { value: "sms", label: "SMS notifications" },
    { value: "push", label: "Push notifications" }
  ]}
  value={preference.value}
  onChange$={(value) => (preference.value = value)}
/>`;

  const advancedUsage = `// With Form Integration
<form onSubmit$={handleSubmit}>
  <RadioGroup
    name="subscription"
    label="Subscription Plan"
    helperText="Choose the plan that best fits your needs"
    error={errors.subscription}
    required
    options={[
      { value: "basic", label: "Basic - $9/month" },
      { value: "pro", label: "Pro - $29/month" },
      { value: "enterprise", label: "Enterprise - Custom pricing", disabled: !isEligible }
    ]}
    value={formData.subscription}
    onChange$={(value) => {
      formData.subscription = value;
      errors.subscription = "";
    }}
  />
  
  <Button type="submit">Continue</Button>
</form>

// Custom Styled Radio Group
<RadioGroup
  name="theme"
  label="Theme Selection"
  direction="horizontal"
  size="lg"
  options={themeOptions}
  value={selectedTheme.value}
  onChange$={handleThemeChange}
  class="rounded-lg bg-surface-light p-4 dark:bg-surface-dark"
/>

// Responsive Radio Group
<RadioGroup
  name="layout"
  label="Layout Preference"
  options={layoutOptions}
  value={layout.value}
  onChange$={(value) => (layout.value = value)}
  direction="vertical"
  class="sm:flex-row sm:space-x-4"
/>`;

  const dos = [
    "Use RadioGroup for managing multiple related radio buttons",
    "Provide clear, descriptive labels for each option",
    "Group related options under a descriptive fieldset label",
    "Use helper text to provide additional context when needed",
    "Ensure all options are keyboard accessible",
    "Consider mobile touch targets (minimum 44x44px)",
    "Use horizontal layout only when you have 2-4 short options",
    "Validate selection on form submission when required",
  ];

  const donts = [
    "Don't use radio buttons for multiple selections (use checkboxes)",
    "Don't have too many options (>7) - consider a select dropdown",
    "Don't pre-select an option unless there's a safe default",
    "Don't use radio buttons for binary yes/no choices (use switch)",
    "Don't make all options disabled - hide the component instead",
    "Don't use horizontal layout on mobile for long labels",
    "Don't forget to handle the onChange event",
    "Don't mix different sized radio buttons in the same group",
  ];

  const bestPractices = [
    {
      title: "State Management",
      description:
        "Use Qwik's useSignal() for reactive state management. Update the value through the onChange$ handler to maintain single source of truth.",
    },
    {
      title: "Form Integration",
      description:
        "When using in forms, leverage the name attribute for proper form submission and use the required prop for validation.",
    },
    {
      title: "Error Handling",
      description:
        "Show error messages only after user interaction or form submission attempt. Clear errors when the user makes a selection.",
    },
    {
      title: "Default Selection",
      description:
        "Only pre-select an option if it's a safe, reversible choice. For critical decisions, force users to make an explicit selection.",
    },
    {
      title: "Mobile Optimization",
      description:
        "Use larger touch targets on mobile devices. Consider using size='lg' or custom styles to ensure 44px minimum touch targets.",
    },
    {
      title: "Grouping Logic",
      description:
        "Group radio buttons logically. If options belong to different categories, consider using multiple RadioGroups or visual separation.",
    },
  ];

  const accessibilityTips = [
    {
      title: "Keyboard Navigation",
      description:
        "Radio groups support arrow key navigation. Users can move between options with Up/Down or Left/Right arrows, and select with Space.",
    },
    {
      title: "Screen Reader Support",
      description:
        "Always provide labels for radio buttons. Use aria-label when visible labels aren't possible. The component announces selection state changes.",
    },
    {
      title: "Focus Management",
      description:
        "Ensure focus indicators are visible. The component provides default focus styles that meet WCAG contrast requirements.",
    },
    {
      title: "Required Fields",
      description:
        "When a radio group is required, use the required prop. This adds appropriate ARIA attributes and visual indicators (asterisk).",
    },
    {
      title: "Error Announcements",
      description:
        "Error messages are associated with the radio group using aria-describedby, ensuring screen readers announce them.",
    },
    {
      title: "Fieldset and Legend",
      description:
        "RadioGroup uses semantic fieldset and legend elements, providing proper context for screen reader users about the group's purpose.",
    },
  ];

  const performanceTips = [
    "Use RadioGroup instead of multiple Radio components for better performance with reactive state",
    "Memoize option arrays if they're computed from props or state",
    "For large forms, consider lazy loading radio groups that aren't immediately visible",
    "Avoid inline function creation in onChange$ handlers - use pre-defined handlers",
    "Use the $ suffix for event handlers to enable Qwik's lazy loading optimization",
    "Enable staggered animations only when necessary - they add computational overhead",
    "Use container queries (@container) instead of media queries for component-level responsiveness",
    "Prefer CSS animations over JavaScript-based animations for better performance",
    "Consider disabling animations on low-end devices using the animation.enabled prop",
    "Use the responsive prop and responsiveSizes to optimize rendering across breakpoints",
  ];

  const keyboardShortcuts = [
    {
      title: "Tab Navigation",
      description: "Use Tab to enter and exit radio groups. Focus moves to the selected radio or first option if none selected.",
    },
    {
      title: "Arrow Key Navigation",
      description: "Use Up/Down or Left/Right arrows to move between radio options within a group.",
    },
    {
      title: "Space Selection",
      description: "Press Space to select the focused radio option.",
    },
    {
      title: "Enter Behavior",
      description: "Enter key behaves the same as Space for radio selection.",
    },
    {
      title: "Escape for Forms",
      description: "If radio is in a modal or dialog, Escape closes the container without changing selection.",
    },
  ];

  const advancedPatterns = [
    {
      title: "Dynamic Option Loading",
      description: "Load options dynamically based on user selections or external data",
      code: `const options = useResource$(async ({ track }) => {
  const category = track(() => selectedCategory.value);
  if (!category) return [];
  
  const response = await fetch(\`/api/options/\${category}\`);
  return response.json();
});

<RadioGroup
  options={options.value || []}
  value={selectedOption.value}
  onChange$={(value) => selectedOption.value = value}
/>`,
    },
    {
      title: "Form Integration with Validation",
      description: "Integrate with form libraries and validation schemas",
      code: `const formData = useStore({ subscription: "" });
const errors = useStore({ subscription: "" });

const validateSubscription = $((value: string) => {
  if (!value) return "Please select a subscription plan";
  if (value === "enterprise" && !isEligible) return "Not eligible for enterprise";
  return "";
});

<RadioGroup
  name="subscription"
  options={subscriptionOptions}
  value={formData.subscription}
  error={errors.subscription}
  onChange$={async (value) => {
    formData.subscription = value;
    errors.subscription = await validateSubscription(value);
  }}
/>`,
    },
    {
      title: "Conditional Rendering",
      description: "Show/hide radio groups based on previous selections",
      code: `<RadioGroup
  name="payment-method"
  options={paymentOptions}
  value={paymentMethod.value}
  onChange$={(value) => paymentMethod.value = value}
/>

{paymentMethod.value === "card" && (
  <RadioGroup
    name="card-type"
    label="Card Type"
    options={cardTypeOptions}
    value={cardType.value}
    onChange$={(value) => cardType.value = value}
  />
)}`,
    },
  ];

  const guidelines = [
    {
      title: "Clear Option Labels",
      description: "Each option should have a clear, concise label that describes what selecting it means",
      type: "do" as const,
      code: `<RadioGroup
  options={[
    { value: "standard", label: "Standard Shipping (5-7 days) - Free" },
    { value: "express", label: "Express Shipping (2-3 days) - $15" },
    { value: "overnight", label: "Overnight Shipping (1 day) - $30" }
  ]}
/>`,
    },
    {
      title: "Unclear Labels",
      description: "Avoid vague or ambiguous labels that don't clearly indicate what each option represents",
      type: "dont" as const,
      code: `<RadioGroup
  options={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" }
  ]}
/>`,
    },
  ];

  return (
    <UsageTemplate
      installation={installation}
      basicUsage={basicUsage}
      advancedUsage={advancedUsage}
      dos={dos}
      donts={donts}
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The Radio component provides an accessible and flexible way to implement
        single-choice selections in your forms and interfaces. This comprehensive guide covers
        installation, basic usage, advanced patterns, keyboard navigation, performance optimization,
        and best practices for creating user-friendly radio button experiences.
      </p>

      {/* Keyboard Shortcuts Section */}
      <div class="mt-8">
        <h3 class="mb-4 text-lg font-semibold">Keyboard Navigation</h3>
        <p class="mb-4 text-gray-600 dark:text-gray-400">
          The Radio component provides full keyboard accessibility following WAI-ARIA guidelines:
        </p>
        <div class="space-y-3">
          {keyboardShortcuts.map((shortcut) => (
            <div key={shortcut.title} class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h4 class="font-medium text-gray-900 dark:text-white">{shortcut.title}</h4>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{shortcut.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Patterns Section */}
      <div class="mt-8">
        <h3 class="mb-4 text-lg font-semibold">Advanced Implementation Patterns</h3>
        <p class="mb-4 text-gray-600 dark:text-gray-400">
          These patterns demonstrate advanced techniques for building complex radio-based interfaces:
        </p>
        <div class="space-y-6">
          {advancedPatterns.map((pattern) => (
            <div key={pattern.title} class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h4 class="font-medium text-gray-900 dark:text-white">{pattern.title}</h4>
              <p class="mt-1 mb-3 text-sm text-gray-600 dark:text-gray-400">{pattern.description}</p>
              <pre class="overflow-x-auto rounded-md bg-gray-100 p-3 text-xs dark:bg-gray-800">
                <code>{pattern.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </UsageTemplate>
  );
});