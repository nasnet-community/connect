import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate, type PropDetail, type MethodDetail } from '~/components/Docs/templates';

/**
 * Alert component API reference documentation using the standard template
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "status",
      type: "'info' | 'success' | 'warning' | 'error'",
      description: "Determines the color scheme and default icon of the alert",
      defaultValue: "info"
    },
    {
      name: "title",
      type: "string",
      description: "Title text displayed at the top of the alert"
    },
    {
      name: "message",
      type: "string",
      description: "Body text displayed below the title"
    },
    {
      name: "dismissible",
      type: "boolean",
      description: "When true, shows a close button that allows users to dismiss the alert",
      defaultValue: "false"
    },
    {
      name: "onDismiss$",
      type: "QRL<() => void>",
      description: "Callback function invoked when the alert is dismissed"
    },
    {
      name: "icon",
      type: "boolean | JSXNode",
      description: "Controls whether an icon is shown (true/false) or allows a custom icon element",
      defaultValue: "true"
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      description: "Determines the padding and text size of the alert",
      defaultValue: "md"
    },
    {
      name: "variant",
      type: "'solid' | 'outline'",
      description: "Controls the visual style of the alert",
      defaultValue: "solid"
    },
    {
      name: "subtle",
      type: "boolean",
      description: "When true, creates a more subdued version of the alert with lighter colors",
      defaultValue: "false"
    },
    {
      name: "autoCloseDuration",
      type: "number",
      description: "Time in milliseconds after which the alert will automatically dismiss"
    },
    {
      name: "loading",
      type: "boolean",
      description: "When true, displays a loading spinner instead of the status icon",
      defaultValue: "false"
    },
    {
      name: "id",
      type: "string",
      description: "HTML id attribute applied to the alert element"
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the alert"
    },
    {
      name: "children",
      type: "JSX.Element",
      description: "Content to display within the alert"
    }
  ];

  // Alert component doesn't have methods, but we need to provide an empty array
  const methods: MethodDetail[] = [];

  return (
    <APIReferenceTemplate
      props={props}
      methods={methods}
    >
      <p>
        The Alert component provides a flexible interface for displaying various types of
        notifications to users. It supports different visual styles, sizes, and behaviors
        to accommodate diverse use cases across your application.
      </p>

      <h3 class="text-lg font-medium mt-6 mb-2">Status Types</h3>
      <p class="mb-4">
        The <code>status</code> prop affects the color scheme and default icon:
      </p>
      <table class="min-w-full border-separate border-spacing-0 mb-4">
        <thead>
          <tr>
            <th class="border-b px-4 py-2 text-left">Status</th>
            <th class="border-b px-4 py-2 text-left">Color</th>
            <th class="border-b px-4 py-2 text-left">Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b px-4 py-2">info</td>
            <td class="border-b px-4 py-2">Blue</td>
            <td class="border-b px-4 py-2">General information, neutral updates, or guidance</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">success</td>
            <td class="border-b px-4 py-2">Green</td>
            <td class="border-b px-4 py-2">Successful operations, completed actions, or positive feedback</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">warning</td>
            <td class="border-b px-4 py-2">Yellow/Orange</td>
            <td class="border-b px-4 py-2">Cautions, important notices, or potential issues</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">error</td>
            <td class="border-b px-4 py-2">Red</td>
            <td class="border-b px-4 py-2">Errors, failures, or critical issues that require attention</td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-lg font-medium mt-6 mb-2">Visual Variants</h3>
      <p class="mb-4">
        The <code>variant</code> and <code>subtle</code> props determine the alert's visual style:
      </p>
      <table class="min-w-full border-separate border-spacing-0 mb-4">
        <thead>
          <tr>
            <th class="border-b px-4 py-2 text-left">Variant</th>
            <th class="border-b px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b px-4 py-2">solid</td>
            <td class="border-b px-4 py-2">Full background color with high contrast</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">outline</td>
            <td class="border-b px-4 py-2">Transparent background with colored border</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">subtle (with any variant)</td>
            <td class="border-b px-4 py-2">Lighter, more subdued version of the chosen variant</td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-lg font-medium mt-6 mb-2">Size Options</h3>
      <p class="mb-4">
        The <code>size</code> prop affects padding, font size, and overall dimensions:
      </p>
      <table class="min-w-full border-separate border-spacing-0 mb-4">
        <thead>
          <tr>
            <th class="border-b px-4 py-2 text-left">Size</th>
            <th class="border-b px-4 py-2 text-left">Description</th>
            <th class="border-b px-4 py-2 text-left">Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b px-4 py-2">sm</td>
            <td class="border-b px-4 py-2">Compact size with minimal padding</td>
            <td class="border-b px-4 py-2">Inline alerts, tight spaces, or non-critical information</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">md</td>
            <td class="border-b px-4 py-2">Standard size with balanced padding</td>
            <td class="border-b px-4 py-2">Default for most alerts and general usage</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">lg</td>
            <td class="border-b px-4 py-2">Larger size with generous padding</td>
            <td class="border-b px-4 py-2">Important messages, featured alerts, or when visibility is crucial</td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-lg font-medium mt-6 mb-2">Accessibility</h3>
      <p class="mb-1">
        The Alert component implements accessibility best practices:
      </p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Uses <code>role="alert"</code> to ensure screen readers announce the content</li>
        <li>Dismissible alerts include proper aria-label for the close button</li>
        <li>Maintains sufficient color contrast for all status types and variants</li>
        <li>Auto-dismissing alerts provide enough time for users to perceive the content</li>
        <li>Status icons help convey meaning through visual cues</li>
      </ul>
    </APIReferenceTemplate>
  );
}); 