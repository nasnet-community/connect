import { component$ } from "@builder.io/qwik";
import {
  UsageTemplate,
  type UsageGuideline,
  type BestPractice,
  type AccessibilityTip,
} from "~/components/Docs/templates";

/**
 * Checkbox component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use clear and descriptive labels",
      description:
        "Always provide clear labels that describe the option being presented.",
      code: `<Checkbox 
  label="Subscribe to newsletter"
  checked={subscribed}
  onChange$={(checked) => setSubscribed(checked)}
/>`,
      type: "do",
    },
    {
      title: "Group related checkboxes",
      description:
        "Use CheckboxGroup for a set of related options that can be selected together.",
      code: `<CheckboxGroup 
  label="Notification preferences"
  options={[
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "push", label: "Push notifications" }
  ]}
  selected={notifications}
  onToggle$={(value) => toggleNotification(value)}
/>`,
      type: "do",
    },
    {
      title: "Provide helper text for complex options",
      description:
        "Use helper text to provide additional context when the choice isn't immediately obvious.",
      code: `<Checkbox 
  label="Enable two-factor authentication"
  helperText="This adds an extra layer of security to your account"
  checked={twoFactorEnabled}
  onChange$={(checked) => setTwoFactorEnabled(checked)}
/>`,
      type: "do",
    },
    {
      title: "Use for multi-select options",
      description:
        "Use checkboxes when users can select multiple options from a list.",
      code: `<CheckboxGroup 
  label="Select languages"
  options={languages}
  selected={selectedLanguages}
  onToggle$={(lang) => toggleLanguage(lang)}
/>`,
      type: "do",
    },
    {
      title: "Don't use for exclusive choices",
      description:
        "Avoid using checkboxes when only one option can be selected. Use RadioGroup instead.",
      code: `// Avoid this approach
<CheckboxGroup 
  label="Select your payment method"
  options={[
    { value: "credit", label: "Credit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "bank", label: "Bank Transfer" }
  ]}
  // This should be a RadioGroup instead
/>`,
      type: "dont",
    },
    {
      title: "Don't use vague or ambiguous labels",
      description:
        "Avoid using labels that don't clearly indicate what happens when the checkbox is checked.",
      code: `// Avoid this approach
<Checkbox 
  label="Options"  // Unclear what this means
  checked={options}
  onChange$={(checked) => setOptions(checked)}
/>`,
      type: "dont",
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Use positive framing for labels",
      description:
        "Frame checkbox labels positively rather than negatively to avoid confusion.",
    },
    {
      title: "Preserve state after form submission",
      description:
        "Keep checkbox selections intact after form submission with errors to avoid user frustration.",
    },
    {
      title: "Order options logically",
      description:
        "Arrange checkbox options in a logical order (alphabetical, frequency of use, etc.).",
    },
    {
      title: "Use indeterminate state appropriately",
      description:
        "Use the indeterminate state to indicate when some but not all sub-options are selected.",
    },
    {
      title: "Avoid nested checkboxes when possible",
      description:
        "Deeply nested checkbox hierarchies can be confusing. Keep the structure simple.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Ensure keyboard navigability",
      description:
        "Checkboxes should be accessible via keyboard (Tab to focus, Space to toggle).",
    },
    {
      title: "Provide proper labels",
      description:
        "Every checkbox should have a visible label or appropriate aria-label.",
    },
    {
      title: "Associate helper text with input",
      description:
        "Use aria-describedby to programmatically link helper text to the checkbox.",
    },
    {
      title: "Indicate grouping",
      description:
        "Use fieldset and legend or appropriate ARIA roles for checkbox groups.",
    },
    {
      title: "Communicate validation errors",
      description:
        "Ensure error messages are programmatically linked to the checkbox using aria-describedby.",
    },
  ];

  const performanceTips = [
    "Avoid using a large number of checkbox state signals in a single component",
    "For checkbox groups, use a single state array rather than individual signals",
    "Use debouncing for onChange handlers if they trigger expensive operations",
    "Consider lazy loading checkbox groups with many options",
    "Prefer controlled components with useSignal over direct DOM manipulation",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The Checkbox component allows users to select one or more options from a
        set or toggle a single option on or off. Use this component when
        presenting multiple independent options that a user can select in any
        combination.
      </p>
      <p class="mt-2">
        Checkboxes should be used in forms where multi-selection is appropriate,
        and can be used independently or in groups depending on the context and
        relationship between options.
      </p>
    </UsageTemplate>
  );
});
