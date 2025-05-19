import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates';

/**
 * Field component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "Label Integration: Built-in label with proper accessibility and styling",
    "Error Handling: Seamless display of validation errors and success states",
    "Helper Text: Support for instructional helper text",
    "Input Types: Supports all standard HTML input types",
    "Size Variants: Multiple size options for different contexts",
    "Form Integration: Seamless integration with the Form component"
  ];

  const whenToUse = [
    "Forms requiring consistent styling and behavior across form fields",
    "When form validation and error display are needed",
    "User input collection with proper labeling",
    "Form fields that need helper text or instructions",
    "When building consistent form interfaces"
  ];

  const whenNotToUse = [
    "For complex custom input needs (use specialized components instead)",
    "When a completely custom field appearance is required",
    "For specialized input types like file uploads, date pickers, etc. (use specialized components)",
    "In places where a native HTML input would be more appropriate"
  ];

  return (
    <OverviewTemplate
      title="Field Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Field component is a foundational form element that provides a standardized way to collect 
        user input with built-in label, validation states, and helper text.
      </p>
      <p class="mt-2">
        It serves as the basic building block for form interfaces, ensuring consistent styling, 
        behavior, and accessibility across your application.
      </p>
      <p class="mt-2">
        The Field component handles common concerns like proper label association, error display, 
        and input styling, allowing you to focus on your application's specific business logic.
      </p>
    </OverviewTemplate>
  );
}); 