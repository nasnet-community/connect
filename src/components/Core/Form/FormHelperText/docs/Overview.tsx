import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates';

/**
 * FormHelperText component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Provides supplementary information for form inputs",
    "Supports different visual states (default, error, success, warning, disabled)",
    "Available in multiple sizes (small, medium, large)",
    "Can include optional icons for better visual communication",
    "Supports screen reader accessibility with ARIA roles",
    "Can be visually hidden but remain accessible to screen readers"
  ];

  const whenToUse = [
    "When providing additional context or instructions for form fields",
    "When explaining requirements or constraints for input values",
    "When displaying validation feedback alongside error messages",
    "When providing additional information about a form field's purpose",
    "When communicating privacy or usage information related to form inputs"
  ];

  const whenNotToUse = [
    "When displaying critical error messages (use FormErrorMessage instead)",
    "When the information is required for all users (don't use srOnly in this case)",
    "When the helper text contains complex content or interactive elements",
    "When displaying lengthy instructions (consider tooltips or separate documentation)",
    "When information applies to multiple fields (use a more general message container)"
  ];

  return (
    <OverviewTemplate
      title="FormHelperText Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The FormHelperText component provides contextual assistance and guidance for form fields. 
        It's designed to display supplementary information that helps users understand how to 
        complete a form field correctly.
      </p>
      <p class="mt-2">
        With support for different visual states, the FormHelperText component can be used to 
        reinforce validation messages, suggest input formats, or provide any additional 
        details that improve the form-filling experience.
      </p>
      <p class="mt-2">
        The component features proper accessibility support and can be customized to match 
        the visual design of your application while ensuring it remains readable and helpful.
      </p>
    </OverviewTemplate>
  );
}); 