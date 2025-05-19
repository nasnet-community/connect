import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate, type PropDetail, type MethodDetail } from '~/components/Docs/templates';

/**
 * FormLabel component API reference documentation using the standard template
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "children",
      type: "string",
      description: "The text content of the label"
    },
    {
      name: "for",
      type: "string",
      description: "The ID of the form control that this label is associated with (HTML 'for' attribute)"
    },
    {
      name: "required",
      type: "boolean",
      description: "Indicates if the associated field is required. Adds an asterisk and appropriate ARIA attributes",
      defaultValue: "false"
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      description: "Size variant of the label",
      defaultValue: "'md'"
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Indicates if the associated field is disabled. Applies appropriate styling and ARIA attributes",
      defaultValue: "false"
    },
    {
      name: "error",
      type: "boolean",
      description: "Indicates an error state with error styling",
      defaultValue: "false"
    },
    {
      name: "success",
      type: "boolean",
      description: "Indicates a success state with success styling",
      defaultValue: "false"
    },
    {
      name: "warning",
      type: "boolean",
      description: "Indicates a warning state with warning styling",
      defaultValue: "false"
    },
    {
      name: "id",
      type: "string",
      description: "Unique identifier for the label element"
    },
    {
      name: "srOnly",
      type: "boolean",
      description: "Makes the label visually hidden but still accessible to screen readers",
      defaultValue: "false"
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS class names to apply to the label element"
    }
  ];

  // FormLabel doesn't have methods
  const methods: MethodDetail[] = [];

  return (
    <APIReferenceTemplate
      props={props}
      methods={methods}
    >
      <p>
        The FormLabel component provides a standardized way to create and style label elements for form controls.
        It supports various states, sizes, and accessibility features to ensure your forms are both usable and accessible.
      </p>
      
      <h3 class="text-lg font-medium mt-6 mb-2">Accessibility Features</h3>
      <p class="mb-4">
        The FormLabel component includes several built-in accessibility features:
      </p>
      <ul class="list-disc pl-5 space-y-1 mb-4">
        <li>Automatically adds ARIA attributes based on state (aria-required, aria-disabled, aria-invalid)</li>
        <li>Provides the srOnly prop for visually hidden but screen reader accessible labels</li>
        <li>Visually indicates required fields with an asterisk</li>
        <li>Uses proper semantic HTML (label element) with for attribute for input association</li>
      </ul>
      
      <h3 class="text-lg font-medium mt-6 mb-2">Rendering Options</h3>
      <p class="mb-4">
        The FormLabel component provides two ways to specify label text:
      </p>
      <ol class="list-decimal pl-5 space-y-1">
        <li>Using the <code>children</code> prop for simple string labels</li>
        <li>Using Qwik's <code>&lt;Slot/&gt;</code> mechanism for more complex content</li>
      </ol>
    </APIReferenceTemplate>
  );
}); 