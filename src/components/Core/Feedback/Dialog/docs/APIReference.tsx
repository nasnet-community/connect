import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type MethodDetail,
} from "~/components/Docs/templates";

/**
 * Dialog component API reference documentation using the standard template
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "isOpen",
      type: "boolean | Signal<boolean>",
      description:
        "Controls the visibility of the dialog. Can be a boolean or a signal.",
      defaultValue: "false",
    },
    {
      name: "openSignal",
      type: "Signal<boolean>",
      description:
        "Alternative to isOpen, provides a signal to control visibility.",
    },
    {
      name: "onClose$",
      type: "QRL<() => void>",
      description: "Callback function invoked when the dialog is closed.",
    },
    {
      name: "onOpen$",
      type: "QRL<() => void>",
      description: "Callback function invoked when the dialog is opened.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
      description: "Controls the width of the dialog.",
      defaultValue: "md",
    },
    {
      name: "closeOnOutsideClick",
      type: "boolean",
      description: "When true, clicking outside the dialog will close it.",
      defaultValue: "true",
    },
    {
      name: "closeOnEsc",
      type: "boolean",
      description: "When true, pressing the Escape key will close the dialog.",
      defaultValue: "true",
    },
    {
      name: "hasCloseButton",
      type: "boolean",
      description:
        "Controls the visibility of the close button in the top-right corner.",
      defaultValue: "true",
    },
    {
      name: "initialFocus",
      type: "boolean",
      description: "When true, focuses the dialog when opened.",
      defaultValue: "true",
    },
    {
      name: "trapFocus",
      type: "boolean",
      description: "When true, traps focus within the dialog when open.",
      defaultValue: "true",
    },
    {
      name: "ariaLabel",
      type: "string",
      description: "ARIA label for the dialog when no title is provided.",
    },
    {
      name: "closeButtonAriaLabel",
      type: "string",
      description: "ARIA label for the close button.",
      defaultValue: "Close dialog",
    },
    {
      name: "isCentered",
      type: "boolean",
      description: "When true, centers the dialog vertically in the viewport.",
      defaultValue: "true",
    },
    {
      name: "disableAnimation",
      type: "boolean",
      description: "When true, disables the entrance and exit animations.",
      defaultValue: "false",
    },
    {
      name: "scrollable",
      type: "boolean",
      description: "When true, makes the dialog body scrollable.",
      defaultValue: "false",
    },
    {
      name: "hasBackdrop",
      type: "boolean",
      description:
        "Controls the visibility of the semi-transparent backdrop behind the dialog.",
      defaultValue: "true",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the dialog element.",
    },
    {
      name: "contentClass",
      type: "string",
      description:
        "Additional CSS classes to apply to the dialog content container.",
    },
    {
      name: "backdropClass",
      type: "string",
      description: "Additional CSS classes to apply to the backdrop element.",
    },
    {
      name: "zIndex",
      type: "number",
      description: "Z-index value for the dialog and backdrop.",
      defaultValue: "1050",
    },
    {
      name: "ariaDescription",
      type: "string",
      description:
        "ARIA description for the dialog to provide additional context for screen readers.",
    },
    {
      name: "id",
      type: "string",
      description:
        "HTML ID attribute for the dialog element. A unique ID will be generated if not provided.",
    },
    {
      name: "title",
      type: "string",
      description: "Optional title text to display in the dialog header.",
    },
    {
      name: "fullscreenOnMobile",
      type: "boolean",
      description: "When true, dialog becomes fullscreen on mobile devices for better usability.",
      defaultValue: "false",
    },
    {
      name: "backdropVariant",
      type: "'light' | 'medium' | 'heavy'",
      description: "Controls the intensity of the backdrop blur effect. Heavy blur provides better focus.",
      defaultValue: "medium",
    },
    {
      name: "elevation",
      type: "'base' | 'elevated' | 'depressed'",
      description: "Surface elevation level for depth perception. Elevated provides more prominent appearance.",
      defaultValue: "elevated",
    },
    {
      name: "mobileBreakpoint",
      type: "'mobile' | 'tablet'",
      description: "Breakpoint at which mobile optimizations are applied.",
      defaultValue: "mobile",
    },
  ];

  // Dialog component additional components
  const dialogHeaderProps: PropDetail[] = [
    {
      name: "hasCloseButton",
      type: "boolean",
      description:
        "Controls the visibility of the close button in the top-right corner.",
      defaultValue: "true",
    },
    {
      name: "closeButtonAriaLabel",
      type: "string",
      description: "ARIA label for the close button.",
      defaultValue: "Close dialog",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the header element.",
    },
    {
      name: "onClose$",
      type: "QRL<() => void>",
      description:
        "Callback function invoked when the close button is clicked.",
    },
  ];

  const dialogBodyProps: PropDetail[] = [
    {
      name: "scrollable",
      type: "boolean",
      description:
        "When true, makes the body content scrollable when it exceeds the dialog height.",
      defaultValue: "false",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the body element.",
    },
  ];

  const dialogFooterProps: PropDetail[] = [
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the footer element.",
    },
  ];

  // Dialog component doesn't have methods, but we need to provide an empty array
  const methods: MethodDetail[] = [];

  return (
    <APIReferenceTemplate props={props} methods={methods}>
      <p>
        The Dialog component provides a flexible and accessible modal interface
        for displaying important content, collecting user input, or confirming
        actions. It manages focus trapping, keyboard interactions, and screen
        reader compatibility automatically.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-medium">Dialog Composition</h3>
      <p class="mb-4">
        The Dialog component works with several sub-components to create a
        structured modal:
      </p>
      <ul class="mb-4 list-disc space-y-1 pl-5">
        <li>
          <code>DialogHeader</code> - Contains the dialog title and optional
          close button
        </li>
        <li>
          <code>DialogBody</code> - Contains the main content with optional
          scrollable behavior
        </li>
        <li>
          <code>DialogFooter</code> - Contains action buttons or other controls
          at the bottom
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-medium">Size Options</h3>
      <p class="mb-4">
        The Dialog component supports several size options through the{" "}
        <code>size</code> prop:
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
            <td class="border-b px-4 py-2">
              <code>sm</code>
            </td>
            <td class="border-b px-4 py-2">max-w-sm</td>
            <td class="border-b px-4 py-2">
              Simple confirmation dialogs or short messages
            </td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">
              <code>md</code>
            </td>
            <td class="border-b px-4 py-2">max-w-md</td>
            <td class="border-b px-4 py-2">
              Default size, suitable for most content
            </td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">
              <code>lg</code>
            </td>
            <td class="border-b px-4 py-2">max-w-lg</td>
            <td class="border-b px-4 py-2">Forms and more complex content</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">
              <code>xl</code>
            </td>
            <td class="border-b px-4 py-2">max-w-xl</td>
            <td class="border-b px-4 py-2">
              Large forms or detailed content displays
            </td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">
              <code>full</code>
            </td>
            <td class="border-b px-4 py-2">max-w-full</td>
            <td class="border-b px-4 py-2">
              Full-width content, galleries, or complex views
            </td>
          </tr>
        </tbody>
      </table>

      <h3 class="mb-2 mt-6 text-lg font-medium">DialogHeader Props</h3>
      <table class="mb-4 min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th class="border-b px-4 py-2 text-left">Property</th>
            <th class="border-b px-4 py-2 text-left">Type</th>
            <th class="border-b px-4 py-2 text-left">Default</th>
            <th class="border-b px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {dialogHeaderProps.map((prop) => (
            <tr key={prop.name}>
              <td class="border-b px-4 py-2">
                <code>{prop.name}</code>
              </td>
              <td class="border-b px-4 py-2">
                <code>{prop.type}</code>
              </td>
              <td class="border-b px-4 py-2">
                {prop.defaultValue ? <code>{prop.defaultValue}</code> : "-"}
              </td>
              <td class="border-b px-4 py-2">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 class="mb-2 mt-6 text-lg font-medium">DialogBody Props</h3>
      <table class="mb-4 min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th class="border-b px-4 py-2 text-left">Property</th>
            <th class="border-b px-4 py-2 text-left">Type</th>
            <th class="border-b px-4 py-2 text-left">Default</th>
            <th class="border-b px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {dialogBodyProps.map((prop) => (
            <tr key={prop.name}>
              <td class="border-b px-4 py-2">
                <code>{prop.name}</code>
              </td>
              <td class="border-b px-4 py-2">
                <code>{prop.type}</code>
              </td>
              <td class="border-b px-4 py-2">
                {prop.defaultValue ? <code>{prop.defaultValue}</code> : "-"}
              </td>
              <td class="border-b px-4 py-2">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 class="mb-2 mt-6 text-lg font-medium">DialogFooter Props</h3>
      <table class="mb-4 min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th class="border-b px-4 py-2 text-left">Property</th>
            <th class="border-b px-4 py-2 text-left">Type</th>
            <th class="border-b px-4 py-2 text-left">Default</th>
            <th class="border-b px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {dialogFooterProps.map((prop) => (
            <tr key={prop.name}>
              <td class="border-b px-4 py-2">
                <code>{prop.name}</code>
              </td>
              <td class="border-b px-4 py-2">
                <code>{prop.type}</code>
              </td>
              <td class="border-b px-4 py-2">
                {prop.defaultValue ? <code>{prop.defaultValue}</code> : "-"}
              </td>
              <td class="border-b px-4 py-2">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 class="mb-2 mt-6 text-lg font-medium">Mobile Optimization Features</h3>
      <p class="mb-4">
        The Dialog component includes several mobile-specific enhancements:
      </p>
      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h5 class="font-medium text-gray-900 dark:text-white mb-2">Mobile Adaptations:</h5>
          <ul class="text-gray-600 dark:text-gray-300 space-y-1">
            <li>• Fullscreen mode for optimal mobile viewing</li>
            <li>• Touch-friendly close buttons (44px minimum)</li>
            <li>• Safe area padding for notched devices</li>
            <li>• Configurable breakpoints for responsive behavior</li>
          </ul>
        </div>
        <div>
          <h5 class="font-medium text-gray-900 dark:text-white mb-2">Visual Enhancements:</h5>
          <ul class="text-gray-600 dark:text-gray-300 space-y-1">
            <li>• Backdrop blur intensity control</li>
            <li>• Surface elevation for depth perception</li>
            <li>• Smooth animations optimized for touch</li>
            <li>• Automatic theme integration</li>
          </ul>
        </div>
      </div>

      <table class="mb-4 min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th class="border-b px-4 py-2 text-left">Feature</th>
            <th class="border-b px-4 py-2 text-left">Mobile Behavior</th>
            <th class="border-b px-4 py-2 text-left">Desktop Behavior</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b px-4 py-2">Fullscreen Mode</td>
            <td class="border-b px-4 py-2">Expands to fill entire viewport</td>
            <td class="border-b px-4 py-2">Maintains specified size constraints</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">Close Button</td>
            <td class="border-b px-4 py-2">44px minimum touch target</td>
            <td class="border-b px-4 py-2">Standard button sizing</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">Backdrop</td>
            <td class="border-b px-4 py-2">Heavy blur for better focus</td>
            <td class="border-b px-4 py-2">Medium blur balances visibility</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2">Animation</td>
            <td class="border-b px-4 py-2">Optimized for touch interactions</td>
            <td class="border-b px-4 py-2">Standard fade and scale effects</td>
          </tr>
        </tbody>
      </table>

      <h3 class="mb-2 mt-6 text-lg font-medium">Accessibility</h3>
      <p class="mb-1">
        The Dialog component implements the following accessibility features:
      </p>
      <ul class="list-disc space-y-1 pl-5">
        <li>
          Uses <code>role="dialog"</code> and <code>aria-modal="true"</code> for
          proper screen reader identification
        </li>
        <li>
          Provides <code>aria-labelledby</code> and{" "}
          <code>aria-describedby</code> attributes for context
        </li>
        <li>
          Traps focus within the dialog to ensure keyboard navigation stays
          within the modal
        </li>
        <li>
          Returns focus to the triggering element when the dialog is closed
        </li>
        <li>Supports dismissal via the Escape key (configurable)</li>
        <li>Ensures proper contrast between dialog content and the backdrop</li>
      </ul>
    </APIReferenceTemplate>
  );
});
