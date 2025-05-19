import { component$ } from '@builder.io/qwik';
import { UsageTemplate, type UsageGuideline, type BestPractice, type AccessibilityTip } from '~/components/Docs/templates';

/**
 * PasswordField component usage documentation using the standard template
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use with appropriate helper text",
      description: "Include helpful guidance on password requirements to assist users in creating valid passwords.",
      code: `<PasswordField 
  value={password.value}
  onValueChange$={(value) => password.value = value}
  label="Create Password"
  helperText="Password must be at least 8 characters with uppercase, lowercase, and numbers"
/>`,
      type: "do"
    },
    {
      title: "Enable strength indicator for new passwords",
      description: "When users are creating new passwords, use the strength indicator to encourage better password practices.",
      code: `<PasswordField 
  value={password.value}
  onValueChange$={(value) => password.value = value}
  label="Create Password"
  showStrength={true}
  helperText="Mix different character types for a stronger password"
/>`,
      type: "do"
    },
    {
      title: "Provide clear error messages",
      description: "When validation fails, provide specific error messages that help users correct their input.",
      code: `<PasswordField 
  value={password.value}
  onValueChange$={(value) => password.value = value}
  label="Password"
  error={password.value.length < 8 ? "Password must be at least 8 characters" : undefined}
/>`,
      type: "do"
    },
    {
      title: "Avoid exposing password requirements in error messages",
      description: "Detailed password requirements should be in helper text, not exposed only after a failure.",
      code: `// Don't wait until validation fails to show requirements
<PasswordField 
  value={password.value}
  onValueChange$={(value) => password.value = value}
  error={!isValidPassword(password.value) ? "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number" : undefined}
/>

// Instead, provide requirements upfront
<PasswordField 
  value={password.value}
  onValueChange$={(value) => password.value = value}
  helperText="Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
  error={!isValidPassword(password.value) ? "Password doesn't meet requirements" : undefined}
/>`,
      type: "dont"
    },
    {
      title: "Don't use initiallyVisible for sensitive contexts",
      description: "Don't set passwords to be initially visible in high-security contexts or public environments.",
      code: `// Avoid in public or high-security contexts
<PasswordField 
  value={password.value}
  onValueChange$={(value) => password.value = value}
  label="Password"
  initiallyVisible={true}
/>`,
      type: "dont"
    }
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Match password field styles with other form elements",
      description: "Maintain visual consistency by using the same size and styling as other form fields in your application."
    },
    {
      title: "Use with form validation",
      description: "Integrate with form validation systems to provide consistent error handling across your form."
    },
    {
      title: "Include password confirmation fields when appropriate",
      description: "For password creation or changes, include a confirmation field and validate that both match."
    },
    {
      title: "Consider security requirements",
      description: "Adjust features like visibility toggle based on your application's security requirements and context of use."
    },
    {
      title: "Use appropriate size variant",
      description: "Choose a size that matches your overall form design - typically 'md' for most forms, 'sm' for compact forms, and 'lg' for touch interfaces."
    }
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Always include a visible label",
      description: "Password fields should always have a visible label to clearly identify their purpose."
    },
    {
      title: "Use appropriate aria labels for the visibility toggle",
      description: "Provide descriptive aria labels for the visibility toggle button using the toggleLabel prop."
    },
    {
      title: "Ensure error messages are programmatically associated",
      description: "Error messages are automatically associated with the field for screen readers."
    },
    {
      title: "Maintain sufficient color contrast",
      description: "Ensure the field, labels, and password strength indicator maintain sufficient color contrast for readability."
    },
    {
      title: "Support keyboard navigation",
      description: "The component supports keyboard navigation, including tab navigation to the field and toggle button."
    }
  ];

  const performanceTips = [
    "The PasswordField component renders efficiently with minimal overhead",
    "Password strength calculation is only performed when the showStrength prop is true",
    "Use controlled component pattern with useSignal for optimal reactivity",
    "Consider adding debouncing for intensive password validation functions",
    "The visibility toggle doesn't cause unnecessary re-renders of parent components"
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The PasswordField component enhances password input with visibility toggles and strength indicators,
        balancing security with usability. This specialized input component helps users create and enter
        passwords while providing immediate feedback.
      </p>
      <p class="mt-2">
        When implementing password fields, focus on providing clear guidance through helper text,
        appropriate error handling, and visual feedback. The strength indicator can help users create
        stronger passwords by showing real-time feedback on password quality.
      </p>
    </UsageTemplate>
  );
}); 