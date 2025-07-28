import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * FormHelperText component API reference documentation using the standard template
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "children",
      type: "string",
      description: "The text content of the helper text",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      description: "Size variant of the helper text",
      defaultValue: "'md'",
    },
    {
      name: "icon",
      type: "any",
      description: "Optional icon element to display before the text",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Indicates if the helper text is for a disabled field",
      defaultValue: "false",
    },
    {
      name: "error",
      type: "boolean",
      description: "Shows the helper text in error state with error styling",
      defaultValue: "false",
    },
    {
      name: "success",
      type: "boolean",
      description:
        "Shows the helper text in success state with success styling",
      defaultValue: "false",
    },
    {
      name: "warning",
      type: "boolean",
      description:
        "Shows the helper text in warning state with warning styling",
      defaultValue: "false",
    },
    {
      name: "id",
      type: "string",
      description:
        "Unique identifier for the helper text element, useful for associating with form controls",
    },
    {
      name: "hasTopMargin",
      type: "boolean",
      description: "Whether to add top margin to the helper text element",
      defaultValue: "true",
    },
    {
      name: "srOnly",
      type: "boolean",
      description:
        "Makes the helper text visually hidden but still accessible to screen readers",
      defaultValue: "false",
    },
    {
      name: "class",
      type: "string",
      description:
        "Additional CSS class names to apply to the helper text element",
    },
  ];

  // FormHelperText doesn't have methods
  const methods: MethodDetail[] = [];

  return (
    <APIReferenceTemplate props={props} methods={methods}>
      <p>
        The FormHelperText component provides contextual information and
        guidance for form fields. It can be used to display explanatory text,
        requirements, or validation information associated with form inputs.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-medium">Accessibility Features</h3>
      <p class="mb-4">
        The FormHelperText component comes with built-in accessibility features:
      </p>
      <ul class="mb-4 list-disc space-y-1 pl-5">
        <li>
          Includes <code>role="status"</code> for proper screen reader
          announcement
        </li>
        <li>
          Can be linked to form fields using <code>id</code> and{" "}
          <code>aria-describedby</code>
        </li>
        <li>
          Supports <code>srOnly</code> for screen reader only content
        </li>
        <li>
          Provides semantic status through different states (error, success,
          warning)
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-medium">Icon Usage</h3>
      <p class="mb-4">When using icons with FormHelperText:</p>
      <ul class="list-disc space-y-1 pl-5">
        <li>Icons should be relevant to the message content</li>
        <li>
          The component automatically handles proper icon layout and spacing
        </li>
        <li>
          Use commonly understood icons to reinforce the helper text's message
        </li>
      </ul>
    </APIReferenceTemplate>
  );
});
