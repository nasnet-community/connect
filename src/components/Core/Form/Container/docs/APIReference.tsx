import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type MethodDetail,
} from "../../../../Docs/templates";

/**
 * Container component API reference documentation using the standard template
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "title",
      type: "string",
      description: "Title text to display at the top of the container",
    },
    {
      name: "description",
      type: "string",
      description: "Descriptive text to display below the title",
    },
    {
      name: "bordered",
      type: "boolean",
      description: "Whether to show a border around the container",
      defaultValue: "true",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the container",
    },
  ];

  // Container component doesn't have methods, but we need to provide an empty array
  const methods: MethodDetail[] = [];

  return (
    <APIReferenceTemplate props={props} methods={methods}>
      <p>
        The Container component is a simple wrapper for form sections that
        provides consistent styling and structure. It supports a few props for
        customization and uses slots for content organization.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-medium">Slots</h3>
      <p class="mb-4">The Container component provides the following slots:</p>
      <ul class="mb-4 list-disc space-y-1 pl-5">
        <li>
          <strong>default slot</strong> - The main content area of the container
        </li>
        <li>
          <strong>footer</strong> - Optional footer content, typically used for
          action buttons
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-medium">CSS Variables</h3>
      <p class="mb-2">
        The Container component uses standard Tailwind CSS classes and doesn't
        define custom CSS variables. You can customize its appearance using the{" "}
        <code>class</code> prop.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-medium">Accessibility</h3>
      <p>
        The Container component uses semantic HTML elements for its structure:
      </p>
      <ul class="list-disc space-y-1 pl-5">
        <li>
          The title is rendered as an <code>h3</code> element for proper
          document outline
        </li>
        <li>
          The description uses a <code>p</code> element with appropriate text
          styling
        </li>
        <li>
          The component maintains a logical content structure for screen readers
        </li>
      </ul>
    </APIReferenceTemplate>
  );
});
