import { component$ } from "@builder.io/qwik";
import {
  UsageTemplate,
  type UsageGuideline,
  type BestPractice,
  type AccessibilityTip,
} from "~/components/Docs/templates";

/**
 * FormErrorMessage component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Associate error messages with form fields",
      description:
        "Use id on the error message and aria-describedby on the input for proper accessibility.",
      code: `<input 
  id="password" 
  type="password" 
  aria-invalid="true" 
  aria-describedby="password-error" 
/>
<FormErrorMessage id="password-error">
  Password must contain at least 8 characters
</FormErrorMessage>`,
      type: "do",
    },
    {
      title: "Provide clear, actionable error messages",
      description: "Tell users exactly what's wrong and how to fix it.",
      code: `// Clear and actionable:
<FormErrorMessage>
  Password must be at least 8 characters and include a number
</FormErrorMessage>

// Also good:
<FormErrorMessage>
  Please enter a valid email address (e.g., user@example.com)
</FormErrorMessage>`,
      type: "do",
    },
    {
      title: "Show errors at the right time",
      description:
        "Display validation errors after user interaction with the field or on form submission.",
      code: `// In a form with validation:
<form preventdefault:submit onSubmit$={validateForm}>
  {/* Show errors only when the field has been touched */}
  {touched.email && errors.email && (
    <FormErrorMessage>{errors.email}</FormErrorMessage>
  )}
</form>`,
      type: "do",
    },
    {
      title: "Don't use generic error messages",
      description:
        "Avoid vague messages that don't explain the actual problem.",
      code: `// Don't do this:
<FormErrorMessage>Invalid input</FormErrorMessage>
<FormErrorMessage>Error</FormErrorMessage>

// Better:
<FormErrorMessage>
  Username must only contain letters, numbers, and underscores
</FormErrorMessage>`,
      type: "dont",
    },
    {
      title: "Don't use technical jargon in error messages",
      description:
        "Error messages should be understandable by all users, not just developers.",
      code: `// Don't do this:
<FormErrorMessage>
  RegExp validation failed: pattern /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i not satisfied
</FormErrorMessage>

// Better:
<FormErrorMessage>
  Please enter a valid email address
</FormErrorMessage>`,
      type: "dont",
    },
    {
      title: "Don't display multiple conflicting errors for the same field",
      description: "Show only the most relevant error message at a time.",
      code: `// Don't do this:
<FormErrorMessage>Email is required</FormErrorMessage>
<FormErrorMessage>Email format is invalid</FormErrorMessage>

// Better - handle validation logic to show only one message:
{!email && <FormErrorMessage>Email is required</FormErrorMessage>}
{email && !isValidEmail(email) && 
  <FormErrorMessage>Email format is invalid</FormErrorMessage>
}`,
      type: "dont",
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Position consistently below form fields",
      description:
        "Place error messages directly below the form field they refer to for clear association.",
    },
    {
      title: "Use appropriate icons to enhance visibility",
      description:
        "Add error icons to make error messages more noticeable and communicate their importance.",
    },
    {
      title: "Keep messages concise and specific",
      description:
        "Error messages should be brief while still providing clear guidance on how to resolve the issue.",
    },
    {
      title: "Use appropriate size based on context",
      description:
        "Choose smaller sizes for dense forms and larger sizes when errors need more prominence.",
    },
    {
      title: "Include both validation errors and server errors",
      description:
        "Handle both client-side validation and server-returned error messages consistently.",
    },
    {
      title: "Consider using animation sparingly",
      description:
        "Use animation to draw attention to new errors, but avoid it for persistent error states.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Use role='alert' appropriately",
      description:
        "Keep this default role to ensure error messages are announced to screen readers when they appear.",
    },
    {
      title: "Connect error messages to form controls",
      description:
        "Use aria-describedby to link error messages with their corresponding form controls.",
    },
    {
      title: "Set aria-invalid on invalid form fields",
      description:
        "Add aria-invalid='true' to form fields with validation errors for proper screen reader announcement.",
    },
    {
      title: "Ensure color is not the only indicator",
      description:
        "Use icons and text alongside error colors to ensure users with color vision deficiencies understand the error.",
    },
    {
      title: "Ensure proper error message sequence in the DOM",
      description:
        "Place error messages after the form control in the DOM to ensure logical reading order for screen readers.",
    },
    {
      title: "Test with screen readers",
      description:
        "Verify that error messages are properly announced when they appear and are associated with the correct fields.",
    },
  ];

  const performanceTips = [
    "FormErrorMessage is lightweight with minimal performance impact",
    "Consider conditionally rendering error messages only when needed",
    "For forms with many error messages, handle display logic to show only relevant ones",
    "Avoid excessive animations that might impact performance on lower-end devices",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The FormErrorMessage component is a critical element for communicating
        validation issues in forms. When used effectively, error messages help
        users understand what went wrong and guide them toward successful form
        completion.
      </p>
      <p class="mt-2">
        Error messages should be clear, specific, and actionable. They should
        appear at the appropriate time in the user's form-filling process and be
        properly associated with their corresponding form controls for
        accessibility.
      </p>
    </UsageTemplate>
  );
});
