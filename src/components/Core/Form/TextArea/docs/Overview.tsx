import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates';

/**
 * TextArea component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Auto-resizing: Adjusts height based on content",
    "Character Counter: Optional character count display",
    "Multi-line Input: Supports multiple lines of text entry",
    "Customizable Resizing: Control how the textarea can be resized by users",
    "Validation States: Support for error, success, and warning states",
    "Accessibility: Built with proper labeling and ARIA attributes"
  ];

  const whenToUse = [
    "Collecting longer text responses (comments, reviews, descriptions)",
    "When users need to enter multiple lines of text",
    "For text input that might vary greatly in length",
    "When visual formatting of the text input is important",
    "Forms requiring longer explanations or detailed text input"
  ];

  const whenNotToUse = [
    "For single-line text input (use Field component instead)",
    "When character input should be constrained to a single specific format",
    "For sensitive information that should be masked (use PasswordField)",
    "When a structured editor with formatting is needed (use a rich text editor)"
  ];

  return (
    <OverviewTemplate
      title="TextArea Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The TextArea component provides a multi-line text input field for forms. It extends the
        basic HTML textarea with additional features like auto-resizing, character counting, and
        consistent styling with other form components.
      </p>
      <p class="mt-2">
        This component is ideal for collecting longer form responses where users need the freedom
        to write multiple lines of text. It includes accessibility features and integrates seamlessly
        with the Form component for validation and submission handling.
      </p>
      <p class="mt-2">
        TextArea maintains the same styling patterns, states, and behaviors as other form components,
        ensuring a consistent experience across your application's forms.
      </p>
    </OverviewTemplate>
  );
}); 