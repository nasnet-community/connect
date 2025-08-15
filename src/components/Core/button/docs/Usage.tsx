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
      title: "Leverage modern variants for impact",
      description: "Use CTA and gradient buttons for important conversion actions",
      type: "do",
      code: `<Button variant="cta" size="lg" rightIcon shadow>
  Start Free Trial
  <span q:slot="rightIcon">
    <HiArrowRightOutline />
  </span>
</Button>

<Button variant="motion" radius="full">
  Transform Your Business
</Button>`,
    },
    {
      title: "Use clear, action-oriented labels",
      description:
        "Button labels should clearly describe what happens when clicked",
      type: "do",
      code: `<Button>Save Changes</Button>
<Button>Submit Form</Button>
<Button>Create Account</Button>`,
    },
    {
      title: "Select appropriate variants",
      description: "Choose button variants based on the action's importance and context",
      type: "do",
      code: `<Button variant="primary">Primary Action</Button>
<Button variant="cta" shadow pulse>Get Started Now</Button>
<Button variant="gradient" gradientDirection="to-r">Premium Feature</Button>
<Button variant="glass">Subtle Action</Button>`,
    },
    {
      title: "Use icons to enhance meaning",
      description: "Include icons when they improve button scanability",
      type: "do",
      code: `<Button leftIcon>
  <span q:slot="leftIcon">
    <HiCheckOutline class="h-4 w-4" />
  </span>
  Save
</Button>`,
    },
    {
      title: "Show loading states",
      description: "Provide visual feedback for actions that take time",
      type: "do",
      code: `const isLoading = useSignal(false);

<Button loading={isLoading.value}>
  {isLoading.value ? 'Processing...' : 'Submit'}
</Button>`,
    },
    {
      title: "Avoid overly long labels",
      description: "Keep button labels concise to prevent wrapping",
      type: "dont",
      code: `// Too long
<Button>Click here to submit your form and create a new account</Button>

// Better
<Button>Create Account</Button>`,
    },
    {
      title: "Don't overuse eye-catching variants",
      description: "Too many CTA, gradient, or glow buttons reduce their impact",
      type: "dont",
      code: `// Too many attention-grabbing buttons
<Button variant="cta">Save</Button>
<Button variant="gradient">Cancel</Button>
<Button variant="glow">Reset</Button>

// Better hierarchy
<Button variant="cta">Save</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Reset</Button>`,
    },
    {
      title: "Don't use buttons for navigation",
      description: "Use links for navigation, buttons for actions",
      type: "dont",
      code: `// Wrong - navigation should use links
<Button onClick$={() => navigate('/home')}>Go to Home</Button>

// Correct - use a link
<a href="/home">Go to Home</a>`,
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Consistent button styling",
      description:
        "Maintain consistent button styling and sizing throughout your application to create a cohesive user experience.",
    },
    {
      title: "Strategic use of effects",
      description:
        "Reserve shadow, pulse, and motion effects for truly important actions. Use them sparingly to maintain their impact.",
    },
    {
      title: "Responsive sizing",
      description:
        "Use the extended size options (xs through xl) and responsive prop to ensure buttons work well across all device sizes.",
    },
    {
      title: "Button grouping",
      description:
        "When grouping buttons, place the primary action on the right and secondary actions on the left, following common UI patterns.",
    },
    {
      title: "Radius consistency",
      description:
        "Maintain consistent border radius across similar button groups. Mix radius styles intentionally for visual hierarchy.",
    },
    {
      title: "Disabled state feedback",
      description:
        "When disabling buttons, provide clear feedback about why they're disabled, either through tooltips or helper text.",
    },
    {
      title: "Touch target sizes",
      description:
        "Ensure buttons meet minimum touch target sizes (44x44px) for mobile accessibility. The xl size is perfect for mobile-first designs.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Use proper button elements",
      description:
        "Always use the <button> element (or Button component) for clickable actions, not divs or spans with click handlers.",
    },
    {
      title: "Provide accessible labels",
      description:
        "For icon-only buttons, always include an aria-label to describe the button's action for screen reader users.",
    },
    {
      title: "Maintain color contrast",
      description:
        "Ensure button text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text).",
    },
    {
      title: "Keyboard navigation",
      description:
        "Buttons should be keyboard accessible and show clear focus indicators when navigated to via keyboard.",
    },
  ];

  const performanceTips = [
    "Use the loading prop instead of conditionally rendering different button states to prevent layout shifts",
    "Debounce button clicks for actions that trigger API calls to prevent duplicate requests",
    "Consider using button groups or compound components for related actions to reduce DOM elements",
    "Lazy load icon libraries and only import the icons you need",
    "The ripple effect uses transform-gpu for hardware acceleration - disable it if you notice performance issues on older devices",
    "Glass and glow effects use backdrop-filter and box-shadow which can impact performance - use sparingly in lists or repeated elements",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The Button component serves as a foundational interactive element for
        triggering actions within your application. Its flexible design allows
        it to be customized for various use cases while maintaining consistency
        in behavior and accessibility.
      </p>
      <p class="mt-3">
        This guide covers best practices for implementing buttons in your
        interface, with a focus on clear labeling, appropriate variant usage,
        and accessibility considerations.
      </p>
    </UsageTemplate>
  );
});
