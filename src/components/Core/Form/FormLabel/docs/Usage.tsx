import { component$ } from "@builder.io/qwik";
import {
  UsageTemplate,
  type UsageGuideline,
  type BestPractice,
  type AccessibilityTip,
} from "~/components/Docs/templates";

/**
 * FormLabel component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Always associate labels with form controls",
      description:
        "Use the 'for' attribute to associate labels with their corresponding form controls by ID.",
      code: `<FormLabel for="username">Username</FormLabel>
<input id="username" type="text" />`,
      type: "do",
    },
    {
      title: "Use required prop for required fields",
      description:
        "Use the required prop to visually indicate required fields with an asterisk and proper ARIA attributes.",
      code: `<FormLabel for="email" required>Email Address</FormLabel>
<input id="email" type="email" required />`,
      type: "do",
    },
    {
      title: "Match label state with input state",
      description:
        "Apply the same state to both the label and the input for consistent visual feedback.",
      code: `<FormLabel for="username" error>Username</FormLabel>
<input 
  id="username" 
  type="text" 
  class="border-error" 
  aria-invalid="true" 
/>
<FormErrorMessage>This field is required</FormErrorMessage>`,
      type: "do",
    },
    {
      title: "Don't rely on placeholder text instead of labels",
      description:
        "Never use placeholder text as a substitute for a proper label.",
      code: `// Don't do this:
<input 
  type="email" 
  placeholder="Email Address" 
/>

// Do this instead:
<FormLabel for="email">Email Address</FormLabel>
<input id="email" type="email" placeholder="example@domain.com" />`,
      type: "dont",
    },
    {
      title: "Don't use inconsistent label sizes",
      description:
        "Maintain consistent label sizes throughout your form for a professional appearance.",
      code: `// Don't mix different sizes inconsistently:
<FormLabel for="name" size="lg">Name</FormLabel>
<input id="name" type="text" />

<FormLabel for="email" size="sm">Email</FormLabel>
<input id="email" type="email" />

// Do use consistent sizing:
<FormLabel for="name" size="md">Name</FormLabel>
<input id="name" type="text" />

<FormLabel for="email" size="md">Email</FormLabel>
<input id="email" type="email" />`,
      type: "dont",
    },
    {
      title: "Don't forget to use srOnly when needed",
      description:
        "Use srOnly for visually hidden but screen reader accessible labels in space-constrained UIs.",
      code: `// Don't do this (missing label):
<input 
  type="search" 
  placeholder="Search..." 
/>

// Do this instead:
<FormLabel for="search" srOnly>Search</FormLabel>
<input id="search" type="search" placeholder="Search..." />`,
      type: "dont",
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Use brief, descriptive label text",
      description:
        "Keep label text concise and clear about what information is required. Avoid long sentences.",
    },
    {
      title: "Be consistent with label positions",
      description:
        "Place labels consistently relative to their form controls (above, left-aligned) throughout your application.",
    },
    {
      title: "Use appropriate size based on form density",
      description:
        "Choose smaller sizes for dense forms and larger sizes for forms with fewer fields.",
    },
    {
      title: "Combine with FormHelperText for additional information",
      description:
        "Use FormHelperText component below the input for additional instructions rather than making labels too verbose.",
    },
    {
      title: "Maintain proper color contrast",
      description:
        "Ensure that label text has sufficient contrast against the background (at least 4.5:1 ratio).",
    },
    {
      title: "Use colon-suffix convention consistently",
      description:
        "If you choose to use colons after label text, apply this style consistently across all forms.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Always use the 'for' attribute",
      description:
        "The 'for' attribute is essential for screen readers to associate labels with their form controls.",
    },
    {
      title: "Avoid hiding required field indicators from screen readers",
      description:
        "The required prop properly communicates required state to both visual and screen reader users.",
    },
    {
      title: "Use srOnly for visually hidden labels",
      description:
        "When you can't show a visible label (e.g., in a search box), use srOnly rather than omitting the label.",
    },
    {
      title: "Label all form controls",
      description:
        "Every interactive form control should have an associated label, even if it's visually hidden.",
    },
    {
      title: "Match visual and programmatic states",
      description:
        "When using states like error or disabled, ensure the input has corresponding states (aria-invalid, disabled).",
    },
    {
      title: "Consider the reading order",
      description:
        "Place labels before inputs in the DOM to ensure proper reading order for screen reader users.",
    },
  ];

  const performanceTips = [
    "FormLabel is a lightweight component with minimal impact on performance",
    "Avoid dynamic changes to label properties that would cause unnecessary re-renders",
    "For forms with many fields, consider lazy loading segments of the form when appropriate",
    "When conditionally showing/hiding labels, use CSS rather than conditional rendering to avoid reconciliation",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The FormLabel component is a key element in creating accessible,
        user-friendly forms. It provides proper semantic structure and visual
        styling to help users understand form requirements.
      </p>
      <p class="mt-2">
        By consistently using the FormLabel component throughout your
        application, you ensure that all form controls are properly labeled and
        accessible to all users, including those using assistive technologies
        like screen readers.
      </p>
    </UsageTemplate>
  );
});
