import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * FormLabel component API reference documentation using the standard template
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "children",
      type: "string",
      description: "The text content of the label",
    },
    {
      name: "for",
      type: "string",
      description:
        "The ID of the form control that this label is associated with (HTML 'for' attribute)",
    },
    {
      name: "required",
      type: "boolean",
      description:
        "Indicates if the associated field is required. Adds an asterisk and appropriate ARIA attributes",
      defaultValue: "false",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      description: "Size variant of the label (static sizing)",
      defaultValue: "'md'",
    },
    {
      name: "fluidSize",
      type: "'fluid' | 'auto'",
      description:
        "Responsive sizing mode: 'auto' for breakpoint-based scaling, 'fluid' for smooth viewport-based scaling using CSS clamp()",
    },
    {
      name: "disabled",
      type: "boolean",
      description:
        "Indicates if the associated field is disabled. Applies appropriate styling and ARIA attributes",
      defaultValue: "false",
    },
    {
      name: "error",
      type: "boolean",
      description: "Indicates an error state with semantic error colors",
      defaultValue: "false",
    },
    {
      name: "success",
      type: "boolean",
      description: "Indicates a success state with semantic success colors",
      defaultValue: "false",
    },
    {
      name: "warning",
      type: "boolean",
      description: "Indicates a warning state with semantic warning colors",
      defaultValue: "false",
    },
    {
      name: "id",
      type: "string",
      description: "Unique identifier for the label element",
    },
    {
      name: "srOnly",
      type: "boolean",
      description:
        "Makes the label visually hidden but still accessible to screen readers",
      defaultValue: "false",
    },
    {
      name: "touchOptimized",
      type: "boolean",
      description:
        "Enables touch-friendly optimizations including larger tap targets and enhanced spacing for mobile devices",
      defaultValue: "false",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS class names to apply to the label element",
    },
  ];

  // FormLabel doesn't have methods
  const methods: MethodDetail[] = [];

  return (
    <APIReferenceTemplate props={props} methods={methods}>
      <p>
        The FormLabel component provides a standardized way to create and style
        label elements for form controls. It supports various states, sizes, and
        accessibility features to ensure your forms are both usable and
        accessible.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-medium">Accessibility Features</h3>
      <p class="mb-4">
        The FormLabel component includes several built-in accessibility
        features:
      </p>
      <ul class="mb-4 list-disc space-y-1 pl-5">
        <li>
          Automatically adds ARIA attributes based on state (aria-required,
          aria-disabled, aria-invalid)
        </li>
        <li>
          Provides the srOnly prop for visually hidden but screen reader
          accessible labels
        </li>
        <li>Visually indicates required fields with an asterisk</li>
        <li>
          Uses proper semantic HTML (label element) with for attribute for input
          association
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-medium">Rendering Options</h3>
      <p class="mb-4">
        The FormLabel component provides two ways to specify label text:
      </p>
      <ol class="list-decimal space-y-1 pl-5">
        <li>
          Using the <code>children</code> prop for simple string labels
        </li>
        <li>
          Using Qwik's <code>&lt;Slot/&gt;</code> mechanism for more complex
          content
        </li>
      </ol>
    </APIReferenceTemplate>
  );
});
