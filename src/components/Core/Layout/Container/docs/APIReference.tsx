import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * Container component API reference documentation using the standard template
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "maxWidth",
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'fluid'",
      description: "Controls the maximum width of the container",
      defaultValue: "lg",
    },
    {
      name: "centered",
      type: "boolean",
      description: "Centers the container horizontally within its parent",
      defaultValue: "true",
    },
    {
      name: "paddingX",
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      description: "Controls horizontal padding on the left and right",
      defaultValue: "md",
    },
    {
      name: "paddingY",
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      description: "Controls vertical padding on the top and bottom",
      defaultValue: "none",
    },
    {
      name: "fixedWidth",
      type: "boolean",
      description:
        "When true, applies max-width at all breakpoints instead of being responsive",
      defaultValue: "false",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the container",
    },
    {
      name: "role",
      type: "string",
      description: "ARIA role attribute for accessibility",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label when container serves as a landmark",
    },
  ];

  // Container component doesn't have methods, but we need to provide an empty array
  const methods: MethodDetail[] = [];

  return (
    <APIReferenceTemplate props={props} methods={methods}>
      <p>
        The Container component is a layout primitive that provides consistent
        width constraints and padding options. It's designed to work with Qwik's
        component model and integrates with the application's responsive design
        system.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-medium">Size Values</h3>
      <p class="mb-4">
        The Container component supports the following size values for the
        maxWidth prop:
      </p>
      <table class="mb-4 min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th class="border-b px-4 py-2 text-left">Size</th>
            <th class="border-b px-4 py-2 text-left">Width</th>
            <th class="border-b px-4 py-2 text-left">Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b px-4 py-2">'xs'</td>
            <td class="border-b px-4 py-2">320px</td>
            <td class="border-b px-4 py-2">
              Narrow focused content like single-column forms
            </td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">'sm'</td>
            <td class="border-b px-4 py-2">384px</td>
            <td class="border-b px-4 py-2">
              Small dialog content or reading areas
            </td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">'md'</td>
            <td class="border-b px-4 py-2">448px</td>
            <td class="border-b px-4 py-2">
              Medium-sized forms or content sections
            </td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">'lg'</td>
            <td class="border-b px-4 py-2">512px</td>
            <td class="border-b px-4 py-2">Default size for most content</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">'xl'</td>
            <td class="border-b px-4 py-2">576px</td>
            <td class="border-b px-4 py-2">
              Wider content areas like dashboards
            </td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">'2xl'</td>
            <td class="border-b px-4 py-2">672px</td>
            <td class="border-b px-4 py-2">
              Large, expansive content while maintaining readability
            </td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">'full'</td>
            <td class="border-b px-4 py-2">100%</td>
            <td class="border-b px-4 py-2">Full width of parent container</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">'fluid'</td>
            <td class="border-b px-4 py-2">No constraint</td>
            <td class="border-b px-4 py-2">
              No max-width, only controlled by padding
            </td>
          </tr>
        </tbody>
      </table>

      <h3 class="mb-2 mt-6 text-lg font-medium">Padding Values</h3>
      <p class="mb-4">
        The paddingX and paddingY props accept the following values:
      </p>
      <table class="mb-4 min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th class="border-b px-4 py-2 text-left">Value</th>
            <th class="border-b px-4 py-2 text-left">CSS Class</th>
            <th class="border-b px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b px-4 py-2">'none'</td>
            <td class="border-b px-4 py-2">px-0 / py-0</td>
            <td class="border-b px-4 py-2">No padding</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">'xs'</td>
            <td class="border-b px-4 py-2">px-2 / py-2</td>
            <td class="border-b px-4 py-2">Extra small padding (0.5rem)</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">'sm'</td>
            <td class="border-b px-4 py-2">px-4 / py-4</td>
            <td class="border-b px-4 py-2">Small padding (1rem)</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">'md'</td>
            <td class="border-b px-4 py-2">px-6 / py-6</td>
            <td class="border-b px-4 py-2">Medium padding (1.5rem)</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">'lg'</td>
            <td class="border-b px-4 py-2">px-8 / py-8</td>
            <td class="border-b px-4 py-2">Large padding (2rem)</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">'xl'</td>
            <td class="border-b px-4 py-2">px-12 / py-12</td>
            <td class="border-b px-4 py-2">Extra large padding (3rem)</td>
          </tr>
        </tbody>
      </table>

      <h3 class="mb-2 mt-6 text-lg font-medium">Accessibility</h3>
      <p>
        While the Container component is primarily a visual layout element,
        there are cases where it might represent a landmark or section in your
        application. In these cases, use the <code>role</code> and{" "}
        <code>aria-label</code> props to provide proper accessibility
        information:
      </p>
      <ul class="mt-2 list-disc space-y-1 pl-5">
        <li>
          Use <code>role="region"</code> when the container represents a
          significant section
        </li>
        <li>
          Provide an <code>aria-label</code> to describe the container's purpose
          when using a role
        </li>
        <li>
          Ensure sufficient color contrast for content within the container
        </li>
      </ul>
    </APIReferenceTemplate>
  );
});
