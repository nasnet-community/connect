import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const guidelines = [
    {
      title: "Basic Usage",
      description: "Import and use the Input component with minimal props",
      example: `import { Input } from "~/components/Core";

<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  required
/>`,
    },
    {
      title: "Validation States",
      description: "Use validation props to provide user feedback",
      example: `// Error state
<Input
  label="Username"
  validation="invalid"
  errorMessage="Username is already taken"
/>

// Success state
<Input
  label="Username"
  validation="valid"
  helperText="Username is available"
/>

// Warning state
<Input
  label="Password"
  type="password"
  validation="warning"
  warningMessage="Password strength: medium"
/>`,
    },
    {
      title: "Prefix and Suffix Slots",
      description: "Add icons or additional content using slots",
      example: `<Input
  label="Search"
  placeholder="Search products..."
  hasPrefixSlot
  hasSuffixSlot
>
  <span q:slot="prefix">🔍</span>
  <button q:slot="suffix" type="button">
    Clear
  </button>
</Input>`,
    },
    {
      title: "Radio Input Usage",
      description: "Use RadioInput for single-choice selections",
      example: `import { RadioInput } from "~/components/Core";

<RadioInput
  name="size"
  label="Select Size"
  value={selectedSize.value}
  options={[
    { value: "sm", label: "Small", description: "Best for compact layouts" },
    { value: "md", label: "Medium", description: "Default option" },
    { value: "lg", label: "Large", description: "Prominent display" },
  ]}
  onChange$={(_, value) => {
    selectedSize.value = value;
  }}
/>`,
    },
    {
      title: "Responsive Sizing",
      description: "Choose appropriate sizes for different screen sizes",
      example: `// Mobile-first approach
<Input size="lg" />  // Large touch targets for mobile
<Input size="md" />  // Standard size for desktop
<Input size="sm" />  // Compact size for dense layouts`,
    },
    {
      title: "Accessibility Best Practices",
      description: "Ensure your inputs are accessible to all users",
      example: `<Input
  label="Password"
  type="password"
  required
  aria-describedby="password-help"
  helperText="Must be at least 8 characters long"
/>`,
    },
    {
      title: "Form Integration",
      description: "Integrate with form validation and state management",
      example: `import { useSignal } from "@builder.io/qwik";

const email = useSignal("");
const isValid = useSignal(false);

<Input
  label="Email"
  type="email"
  value={email.value}
  validation={isValid.value ? "valid" : "default"}
  onInput$={(_, value) => {
    email.value = value;
    isValid.value = value.includes("@");
  }}
/>`,
    },
    {
      title: "Dark Mode Support",
      description: "The components automatically support dark mode",
      example: `// No additional configuration needed
// Dark mode styles are applied automatically based on theme
<Input label="Auto Dark Mode" />`,
    },
    {
      title: "RTL Language Support",
      description: "Components work seamlessly with RTL languages",
      example: `// Logical properties are used automatically
// No additional configuration needed for RTL support
<Input label="الاسم" placeholder="أدخل اسمك" />`,
    },
    {
      title: "Animation Control",
      description: "Control animations based on user preferences",
      example: `// Disable animations for users who prefer reduced motion
<Input
  label="No Animation"
  animate={false}
/>

// Default behavior respects prefers-reduced-motion
<Input label="Respects Motion Preferences" />`,
    },
  ];

  const bestPractices = [
    {
      title: "Accessibility Labels",
      description: "Always provide meaningful labels for accessibility",
    },
    {
      title: "Input Types",
      description: "Use appropriate input types (email, tel, url) for better mobile keyboards",
    },
    {
      title: "Error Messages",
      description: "Provide clear error messages that explain how to fix the issue",
    },
    {
      title: "Helper Text",
      description: "Use helper text to guide users on expected input format",
    },
    {
      title: "Responsive Sizing",
      description: "Choose appropriate sizes based on the device and context",
    },
    {
      title: "Radio Groups",
      description: "Group related radio options with clear labels and descriptions",
    },
    {
      title: "Screen Reader Testing",
      description: "Test with screen readers to ensure accessibility",
    },
    {
      title: "Touch Targets",
      description: "Consider touch target sizes for mobile devices",
    },
    {
      title: "Validation Consistency",
      description: "Use validation states consistently across your application",
    },
    {
      title: "Motion Preferences",
      description: "Respect user motion preferences with animation controls",
    },
  ];

  const commonMistakes = [
    "Not providing labels for form inputs (accessibility issue)",
    "Using placeholder text as the only label",
    "Not handling validation states properly",
    "Forgetting to make form fields accessible with proper ARIA attributes",
    "Using incorrect input types (e.g., text instead of email)",
    "Not providing feedback for successful form completion",
    "Making touch targets too small for mobile devices",
    "Not testing with keyboard navigation",
    "Ignoring RTL language requirements",
    "Not respecting user animation preferences",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      donts={commonMistakes}
    >
      <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Input Usage Guidelines
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        Learn how to effectively use the Input and RadioInput components
      </p>
    </UsageTemplate>
  );
});