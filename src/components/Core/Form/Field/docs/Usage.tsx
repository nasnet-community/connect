import { component$ } from '@builder.io/qwik';
import { UsageTemplate, type UsageGuideline, type BestPractice, type AccessibilityTip } from '~/components/Docs/templates';

/**
 * Field component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use clear and concise labels",
      description: "Labels should be short, descriptive, and indicate exactly what information is needed.",
      code: `<Field 
  label="Email Address"
  type="email"
  required
/>`,
      type: "do"
    },
    {
      title: "Provide helpful error messages",
      description: "Error messages should be specific and explain how to fix the problem.",
      code: `<Field 
  label="Password"
  type="password"
  error="Password must be at least 8 characters and include a number"
/>`,
      type: "do"
    },
    {
      title: "Use appropriate input types",
      description: "Use the correct input type for the data being collected to ensure proper validation and keyboard experience.",
      code: `<Field 
  label="Phone Number"
  type="tel"
  placeholder="(123) 456-7890"
/>`,
      type: "do"
    },
    {
      title: "Include helpful placeholder text",
      description: "Use placeholder text to provide examples or formatting guidance, but don't rely on it for critical information.",
      code: `<Field 
  label="Date of Birth"
  type="date"
  placeholder="YYYY-MM-DD"
/>`,
      type: "do"
    },
    {
      title: "Avoid using placeholder as a label",
      description: "Placeholders disappear when users start typing, making it difficult to remember what information is required.",
      code: `// Avoid this approach
<Field 
  placeholder="Enter your email"
  // Missing label
/>`,
      type: "dont"
    },
    {
      title: "Don't use generic error messages",
      description: "Generic error messages don't help users understand how to fix the issue.",
      code: `// Avoid this approach
<Field 
  label="Email"
  type="email"
  error="Invalid input"  // Too vague
/>`,
      type: "dont"
    }
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Group related fields",
      description: "Group related fields together semantically using fieldset and legend elements or appropriate containers."
    },
    {
      title: "Provide default values when appropriate",
      description: "For editing existing data or forms with common selections, provide default values to reduce user effort."
    },
    {
      title: "Use field validation appropriately",
      description: "Validate fields at the appropriate time (on blur, on submit, etc.) and provide clear error messages."
    },
    {
      title: "Label optional fields",
      description: "Clearly indicate which fields are optional rather than marking all required fields."
    },
    {
      title: "Maintain consistent sizing",
      description: "Use consistent field sizes throughout your forms to create a clean, professional appearance."
    }
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Always use labels",
      description: "Every form field should have a visible label element that is properly associated with its input."
    },
    {
      title: "Use the required attribute",
      description: "In addition to visual indicators, use the HTML required attribute to communicate required fields to assistive technologies."
    },
    {
      title: "Provide clear error identification",
      description: "Use aria-describedby to connect error messages to inputs and aria-invalid to indicate invalid fields."
    },
    {
      title: "Ensure sufficient color contrast",
      description: "Ensure field borders, text, and error messages have sufficient color contrast for users with visual impairments."
    },
    {
      title: "Maintain focus states",
      description: "Ensure fields have visible focus states to help keyboard users navigate the form."
    }
  ];

  const performanceTips = [
    "Avoid unnecessarily complex validation logic that runs on every input change.",
    "Consider debouncing validation for fields that trigger expensive validation operations.",
    "Be mindful of re-renders triggered by form field state changes in large forms.",
    "For large forms with many fields, consider using field-level validation rather than form-level validation.",
    "Optimize field components to prevent unnecessary re-renders when other parts of the form change."
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The Field component is a fundamental building block for forms in your application.
        Follow these guidelines to create effective, accessible, and user-friendly form fields.
      </p>
      <p class="mt-2">
        The examples below demonstrate recommended patterns and approaches for implementing fields in your application.
        These practices help ensure consistency, accessibility, and a positive user experience.
      </p>
    </UsageTemplate>
  );
}); 