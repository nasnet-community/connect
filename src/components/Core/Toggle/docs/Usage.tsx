import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates";
import type {
  UsageGuideline,
  BestPractice,
  AccessibilityTip,
} from "~/components/Docs/templates";

export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use clear, concise labels",
      description:
        "Toggle labels should clearly explain what state is being controlled",
      type: "do",
      code: `<Toggle
  checked={enabled.value}
  onChange$={$((checked) => { enabled.value = checked; })}
  label="Enable notifications"
/>`,
    },
    {
      title: "Use appropriate color variants",
      description:
        "Choose color variants that match the semantic meaning of the toggle",
      type: "do",
      code: `// Success for positive actions
<Toggle variant="success" label="Enable backup" ... />

// Error for critical or dangerous toggles
<Toggle variant="error" label="Enable debug mode" ... />

// Warning for potentially risky features
<Toggle variant="warning" label="Allow external connections" ... />

// Info for informational features
<Toggle variant="info" label="Show advanced settings" ... />`,
    },
    {
      title: "Implement loading states properly",
      description:
        "Use loading state during async operations and provide user feedback",
      type: "do",
      code: `const [saving, setSaving] = useSignal(false);

<Toggle
  checked={enabled.value}
  loading={saving.value}
  onChange$={$((checked) => {
    saving.value = true;
    // Async operation
    await updateSetting(checked);
    enabled.value = checked;
    saving.value = false;
  })}
  label="Enable notifications"
/>`,
    },
    {
      title: "Use icons effectively",
      description:
        "Add icons to enhance meaning and provide visual cues",
      type: "do",
      code: `<Toggle
  checked={wifiEnabled.value}
  icon="wifi"
  label="WiFi Connection"
  onChange$={handleWifiToggle}
/>

<Toggle
  checked={darkMode.value}
  icon="moon"
  label="Dark Mode"
  onChange$={handleThemeToggle}
/>`,
    },
    {
      title: "Consider responsive sizing",
      description:
        "Use appropriate sizes for different screen sizes and contexts",
      type: "do",
      code: `// Desktop dashboard
<Toggle size="lg" label="Master switch" ... />

// Mobile settings
<Toggle size="md" label="Push notifications" ... />

// Compact lists
<Toggle size="sm" label="Show timestamps" ... />`,
    },
    {
      title: "Group related toggles",
      description:
        "Group toggles within logical sections for better organization",
      type: "do",
      code: `<div class="space-y-3">
  <h3 class="text-lg font-medium">Notification Settings</h3>
  <Toggle label="Email notifications" ... />
  <Toggle label="Push notifications" ... />
  <Toggle label="SMS notifications" ... />
</div>`,
    },
    {
      title: "Provide immediate feedback",
      description:
        "Update state immediately when toggle changes for responsive UI",
      type: "do",
      code: `const enabled = useSignal(false);

<Toggle
  checked={enabled.value}
  onChange$={$((checked) => {
    enabled.value = checked;
    // Immediate visual feedback
  })}
  label="Enable feature"
/>`,
    },
    {
      title: "Don't use for actions",
      description:
        "Toggles are for state, not actions. Use buttons for actions.",
      type: "dont",
      code: `// Wrong - this is an action, not a state
<Toggle label="Save settings" ... />

// Correct - use a button
<Button>Save settings</Button>`,
    },
    {
      title: "Avoid for multiple options",
      description: "Don't use toggles for mutually exclusive options",
      type: "dont",
      code: `// Wrong - these are mutually exclusive
<Toggle label="Light theme" ... />
<Toggle label="Dark theme" ... />

// Correct - use radio buttons
<RadioGroup>
  <Radio value="light">Light theme</Radio>
  <Radio value="dark">Dark theme</Radio>
</RadioGroup>`,
    },
    {
      title: "Don't overuse color variants",
      description:
        "Avoid using error/warning variants unless truly necessary",
      type: "dont",
      code: `// Wrong - overusing error variant
<Toggle variant="error" label="Show sidebar" ... />

// Correct - use default for neutral features
<Toggle label="Show sidebar" ... />`,
    },
    {
      title: "Don't use vague labels",
      description:
        "Avoid labels that don't clearly indicate what's being toggled",
      type: "dont",
      code: `// Vague - what does this control?
<Toggle label="Enable" ... />

// Clear - specific about what it controls
<Toggle label="Enable auto-save" ... />`,
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Color accessibility and contrast",
      description:
        "Ensure sufficient color contrast (4.5:1 for normal text, 3:1 for large text) and don't rely solely on color to convey state. Test with color blindness simulators.",
    },
    {
      title: "Loading state UX",
      description:
        "During loading states, disable the toggle to prevent multiple submissions, show a spinner, and provide feedback about the operation's progress.",
    },
    {
      title: "Icon selection and sizing",
      description:
        "Choose icons that clearly represent the feature being toggled. Keep icon sizes consistent (16px for small, 20px for medium, 24px for large toggles).",
    },
    {
      title: "Touch target optimization",
      description:
        "Ensure adequate spacing between toggles, especially on touch interfaces (minimum 44x44px touch target). Use larger sizes on mobile devices.",
    },
    {
      title: "Label positioning",
      description:
        "Use left-positioned labels when displaying a list of toggles with equal-length labels for better visual alignment.",
    },
    {
      title: "Form integration",
      description:
        "When using toggles in forms, provide a name attribute and handle the required state appropriately.",
    },
    {
      title: "Visual feedback",
      description:
        "Ensure toggle state changes are visually clear with appropriate color contrast between on/off states.",
    },
    {
      title: "Responsive behavior",
      description:
        "Consider increasing toggle size on smaller screens for better touch interaction. Use responsive sizing to maintain usability across devices.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Always provide labels",
      description:
        "Use visible labels when possible, or aria-label for icon-only toggles to ensure screen reader accessibility.",
    },
    {
      title: "Loading state announcements",
      description:
        "Use aria-live regions to announce loading states and completion status to screen readers. Include descriptive text about what's happening.",
    },
    {
      title: "Icon accessibility considerations",
      description:
        "When using icons, provide aria-hidden='true' on decorative icons and ensure the label or aria-label describes the toggle's purpose, not the icon itself.",
    },
    {
      title: "Focus management improvements",
      description:
        "Maintain focus on the toggle during state changes and loading states. Use visible focus indicators and ensure focus is not lost during async operations.",
    },
    {
      title: "Keyboard navigation",
      description:
        "Toggles should be keyboard accessible using Space or Enter keys, with clear focus indicators.",
    },
    {
      title: "ARIA attributes",
      description:
        "Use aria-describedby to associate additional descriptive text with toggles when needed.",
    },
    {
      title: "State announcements",
      description:
        "Ensure state changes are announced to screen readers with appropriate ARIA properties. Use aria-checked and role='switch' for proper semantics.",
    },
    {
      title: "Color independence",
      description:
        "Don't rely solely on color to indicate state. Use additional visual cues like icons, text, or position changes to ensure accessibility for color-blind users.",
    },
  ];

  const performanceTips = [
    "Icon optimization: Use SVG icons or icon fonts instead of images for better performance and scalability",
    "Loading state handling: Implement proper loading states to prevent multiple simultaneous operations and provide user feedback",
    "Responsive behavior: Use CSS media queries for responsive sizing instead of JavaScript for better performance",
    "Use controlled components with signals for optimal Qwik reactivity",
    "Batch toggle state updates when multiple toggles need to change together",
    "Consider debouncing onChange handlers that trigger expensive operations",
    "Use CSS transitions for smooth visual state changes without JavaScript overhead",
    "Lazy load heavy operations triggered by toggles to maintain UI responsiveness",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The Toggle component provides a simple way to control binary states in
        your application. It follows Qwik's pattern of controlled components,
        where you manage the state and provide an onChange$ handler to update
        it. The component now supports color variants, loading states, icons,
        and responsive sizing for enhanced user experience.
      </p>
      <p class="mt-3">
        This guide covers best practices for implementing toggles in your
        interface, with a focus on clear labeling, appropriate usage, 
        accessibility considerations, and leveraging the new features like
        color variants, loading states, and icon integration for better
        user experience and visual communication.
      </p>
    </UsageTemplate>
  );
});
