import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates';

/**
 * PasswordField component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Toggle password visibility with an eye icon button",
    "Password strength indicator with visual feedback",
    "Customizable sizing (small, medium, large)",
    "Support for helper text and validation errors",
    "Accessibility features including ARIA attributes",
    "Optional initial visibility state"
  ];

  const whenToUse = [
    "When collecting passwords during authentication flows",
    "When allowing users to create or update passwords",
    "When you need to provide visual feedback on password strength",
    "When implementing password confirmation fields",
    "When you need to toggle between visible and hidden password content"
  ];

  const whenNotToUse = [
    "For non-sensitive text input (use standard Field component instead)",
    "When security requirements prohibit showing passwords (disable visibility toggle)",
    "When you need a highly customized password field with additional features",
    "When collecting non-password secure information (consider specialized input types)"
  ];

  return (
    <OverviewTemplate
      title="PasswordField Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The PasswordField component is a specialized input field designed for secure password entry.
        It enhances the standard password input with features like visibility toggling and password
        strength indicators, providing both security and usability.
      </p>
      <p class="mt-2">
        This component handles the common pattern of allowing users to see what they're typing
        by toggling between password and text input types, which helps prevent typing errors while
        maintaining security. The optional strength indicator provides immediate visual feedback
        to help users create stronger passwords.
      </p>
      <p class="mt-2">
        PasswordField maintains accessibility through proper labeling, ARIA attributes, and 
        keyboard navigation support, ensuring it works for all users regardless of ability
        or assistive technology use.
      </p>
    </OverviewTemplate>
  );
}); 