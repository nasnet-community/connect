import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates/APIReferenceTemplate";
import type { PropDetail } from "~/components/Docs/templates/APIReferenceTemplate";

export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "title",
      type: "string",
      required: true,
      description:
        "The server name or protocol title displayed in the card header.",
    },
    {
      name: "enabled",
      type: "boolean",
      description:
        "Controls the state of the toggle switch. When undefined, no toggle is shown.",
    },
    {
      name: "onToggle$",
      type: "QRL<(enabled: boolean) => void>",
      description:
        "Callback function triggered when the toggle switch is clicked. Required when 'enabled' prop is provided.",
    },
    {
      name: "icon",
      type: "any",
      defaultValue: "HiServerOutline (serialized)",
      description:
        "Custom icon component. Can be a serialized QRL icon function or direct icon component reference.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the card container.",
    },
    {
      name: "titleClass",
      type: "string",
      description:
        "Additional CSS classes to apply to the card header section containing the title and icon.",
    },
  ];

  const cssVariables: Array<{
    name: string;
    defaultValue?: string;
    description: string;
  }> = [];

  const dataAttributes = [
    {
      name: "data-enabled",
      description:
        "Present when the server/service is enabled (when enabled prop is true).",
    },
  ];

  return (
    <APIReferenceTemplate
      props={props}
      cssVariables={cssVariables}
      dataAttributes={dataAttributes}
    >
      <div>
        <h3 class="mb-3 text-lg font-semibold">Slots</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th class="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Name
                </th>
                <th class="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td class="px-4 py-2 font-mono text-sm text-gray-700 dark:text-gray-300">
                  default
                </td>
                <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  The main configuration content area of the server card. This
                  is where server-specific configuration options should be
                  placed.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="mb-3 mt-8 text-lg font-semibold">Icon Handling</h3>
        <p class="mb-3 text-sm text-gray-700 dark:text-gray-300">
          The ServerCard component supports two types of icon usage:
        </p>
        <ul class="list-inside list-disc space-y-2 text-sm">
          <li>
            <strong>Serialized QRL Icons</strong>: Use{" "}
            <code class="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-800">
              $(IconComponent)
            </code>{" "}
            for SSR compatibility
          </li>
          <li>
            <strong>Direct Component References</strong>: Pass icon components
            directly for client-side rendering
          </li>
        </ul>

        <h3 class="mb-3 mt-8 text-lg font-semibold">Toggle Behavior</h3>
        <p class="mb-3 text-sm text-gray-700 dark:text-gray-300">
          The toggle switch is only displayed when both{" "}
          <code class="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-800">
            enabled
          </code>{" "}
          and
          <code class="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-800">
            onToggle$
          </code>{" "}
          props are provided:
        </p>
        <ul class="list-inside list-disc space-y-2 text-sm">
          <li>
            When <code>enabled</code> is undefined: No toggle switch is shown
          </li>
          <li>
            When <code>enabled</code> is boolean but <code>onToggle$</code> is
            undefined: No toggle switch is shown
          </li>
          <li>
            When both props are provided: Toggle switch is displayed and
            functional
          </li>
        </ul>

        <h3 class="mb-3 mt-8 text-lg font-semibold">Accessibility</h3>
        <ul class="list-inside list-disc space-y-2">
          <li>
            The toggle switch includes proper checkbox semantics with screen
            reader support.
          </li>
          <li>
            The toggle label clearly indicates the server name for context.
          </li>
          <li>Focus states are properly handled for keyboard navigation.</li>
          <li>Error handling is built-in for toggle state changes.</li>
          <li>
            The card header uses semantic heading structure (h3) that can be
            overridden for proper document hierarchy.
          </li>
          <li>
            Color contrast meets WCAG guidelines for both light and dark themes.
          </li>
        </ul>
      </div>
    </APIReferenceTemplate>
  );
});
