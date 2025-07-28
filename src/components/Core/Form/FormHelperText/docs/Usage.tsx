import { component$ } from "@builder.io/qwik";
import {
  UsageTemplate,
  type UsageGuideline,
  type BestPractice,
  type AccessibilityTip,
} from "~/components/Docs/templates";

/**
 * FormHelperText component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Associate helper text with form controls",
      description:
        "Use id on the helper text and aria-describedby on the input to create an accessible association.",
      code: `<label for="email">Email</label>
<input 
  id="email" 
  type="email" 
  aria-describedby="email-helper" 
/>
<FormHelperText id="email-helper">
  We'll never share your email with anyone else
</FormHelperText>`,
      type: "do",
    },
    {
      title: "Use appropriate visual states",
      description:
        "Match the helper text state with its corresponding input state for consistent visual feedback.",
      code: `// For an input with an error:
<input 
  id="password" 
  type="password"
  class="border-error" 
  aria-invalid="true"
  aria-describedby="password-error"
/>
<FormHelperText 
  id="password-error" 
  error
>
  Password must be at least 8 characters
</FormHelperText>`,
      type: "do",
    },
    {
      title: "Keep helper text concise and helpful",
      description:
        "Write clear, actionable helper text that guides users toward successful form completion.",
      code: `// Good:
<FormHelperText>
  Password must contain at least 8 characters, including uppercase, 
  lowercase, and a number
</FormHelperText>

// Also good:
<FormHelperText>
  Format: (XXX) XXX-XXXX
</FormHelperText>`,
      type: "do",
    },
    {
      title: "Don't duplicate information already in labels",
      description: "Avoid redundancy between label and helper text content.",
      code: `// Don't do this:
<label for="email">Email Address</label>
<input id="email" type="email" />
<FormHelperText>Enter your email address</FormHelperText>

// Better:
<label for="email">Email Address</label>
<input id="email" type="email" />
<FormHelperText>We'll use this to send your receipt</FormHelperText>`,
      type: "dont",
    },
    {
      title: "Don't use for critical error messages",
      description:
        "For important validation errors, use FormErrorMessage component instead of helper text.",
      code: `// Don't do this for errors:
<input id="email" type="email" aria-invalid="true" />
<FormHelperText error>Invalid email format</FormHelperText>

// Better:
<input id="email" type="email" aria-invalid="true" />
<FormErrorMessage>Invalid email format</FormErrorMessage>
<FormHelperText>We'll only use your email for account-related communication</FormHelperText>`,
      type: "dont",
    },
    {
      title: "Don't use inconsistent styling",
      description:
        "Maintain consistency in the appearance of helper text throughout your forms.",
      code: `// Don't mix styles inconsistently:
<FormHelperText size="sm">Enter your first name</FormHelperText>
<FormHelperText size="lg">Enter your last name</FormHelperText>

// Do maintain consistent styling:
<FormHelperText size="sm">Enter your first name</FormHelperText>
<FormHelperText size="sm">Enter your last name</FormHelperText>`,
      type: "dont",
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Position consistently below form fields",
      description:
        "Maintain a consistent layout with helper text positioned directly below its corresponding form field.",
    },
    {
      title: "Use icons to enhance clarity",
      description:
        "Add relevant icons to helper text messages to reinforce their meaning and improve scannability.",
    },
    {
      title: "Keep text concise and actionable",
      description:
        "Prioritize brief, clear guidance that helps users understand what they need to do.",
    },
    {
      title: "Match state colors with semantic meaning",
      description:
        "Use error state for problems, warning for cautions, and success for confirmations consistently.",
    },
    {
      title: "Use appropriate sizing based on form density",
      description:
        "Choose small sizes for dense forms and larger sizes for forms with more white space.",
    },
    {
      title: "Avoid redundancy with placeholders",
      description:
        "Don't duplicate information that's already present in placeholders or labels.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Use ID association",
      description:
        "Always connect helper text to inputs using id and aria-describedby attributes.",
    },
    {
      title: "Use role='status' appropriately",
      description:
        "The component includes the status role to communicate its content to screen readers.",
    },
    {
      title: "Leverage srOnly for screen reader content",
      description:
        "For verbose instructions that would clutter the UI, use srOnly to make them accessible only to screen readers.",
    },
    {
      title: "Ensure color is not the only indicator",
      description:
        "Use icons along with color states to ensure information is accessible to color-blind users.",
    },
    {
      title: "Don't hide critical information",
      description:
        "Don't use srOnly for content that all users need to complete a form successfully.",
    },
    {
      title: "Test with screen readers",
      description:
        "Verify that helper text is properly announced in context with its associated form field.",
    },
  ];

  const performanceTips = [
    "FormHelperText is lightweight and has minimal performance impact",
    "For complex forms with many fields, consider lazy loading sections with their helper text",
    "Avoid using many state-changing helper texts that cause frequent re-renders",
    "Keep icon components small and optimized when using them in helper text",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        FormHelperText provides contextual guidance for form fields, helping
        users understand requirements, format expectations, or providing
        additional information about a field's purpose.
      </p>
      <p class="mt-2">
        When used properly, helper text improves form usability by providing
        just-in-time assistance, reducing errors, and increasing the likelihood
        of successful form completion.
      </p>
    </UsageTemplate>
  );
});
