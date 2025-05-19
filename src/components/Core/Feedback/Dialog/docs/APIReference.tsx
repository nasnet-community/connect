import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate, type PropDetail, type MethodDetail } from '~/components/Docs/templates';

/**
 * Dialog component API reference documentation using the standard template
 */
export default component$(() => {
  const props: PropDetail[] = [
    {
      name: "isOpen",
      type: "boolean | Signal<boolean>",
      description: "Controls the visibility of the dialog. Can be a boolean or a signal.",
      defaultValue: "false"
    },
    {
      name: "openSignal",
      type: "Signal<boolean>",
      description: "Alternative to isOpen, provides a signal to control visibility.",
    },
    {
      name: "onClose$",
      type: "QRL<() => void>",
      description: "Callback function invoked when the dialog is closed."
    },
    {
      name: "onOpen$",
      type: "QRL<() => void>",
      description: "Callback function invoked when the dialog is opened."
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
      description: "Controls the width of the dialog.",
      defaultValue: "md"
    },
    {
      name: "closeOnOutsideClick",
      type: "boolean",
      description: "When true, clicking outside the dialog will close it.",
      defaultValue: "true"
    },
    {
      name: "closeOnEsc",
      type: "boolean",
      description: "When true, pressing the Escape key will close the dialog.",
      defaultValue: "true"
    },
    {
      name: "hasCloseButton",
      type: "boolean",
      description: "Controls the visibility of the close button in the top-right corner.",
      defaultValue: "true"
    },
    {
      name: "initialFocus",
      type: "boolean",
      description: "When true, focuses the dialog when opened.",
      defaultValue: "true"
    },
    {
      name: "trapFocus",
      type: "boolean",
      description: "When true, traps focus within the dialog when open.",
      defaultValue: "true"
    },
    {
      name: "ariaLabel",
      type: "string",
      description: "ARIA label for the dialog when no title is provided."
    },
    {
      name: "closeButtonAriaLabel",
      type: "string",
      description: "ARIA label for the close button.",
      defaultValue: "Close dialog"
    },
    {
      name: "isCentered",
      type: "boolean",
      description: "When true, centers the dialog vertically in the viewport.",
      defaultValue: "true"
    },
    {
      name: "disableAnimation",
      type: "boolean",
      description: "When true, disables the entrance and exit animations.",
      defaultValue: "false"
    },
    {
      name: "scrollable",
      type: "boolean",
      description: "When true, makes the dialog body scrollable.",
      defaultValue: "false"
    },
    {
      name: "hasBackdrop",
      type: "boolean",
      description: "Controls the visibility of the semi-transparent backdrop behind the dialog.",
      defaultValue: "true"
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the dialog element."
    },
    {
      name: "contentClass",
      type: "string",
      description: "Additional CSS classes to apply to the dialog content container."
    },
    {
      name: "backdropClass",
      type: "string",
      description: "Additional CSS classes to apply to the backdrop element."
    },
    {
      name: "zIndex",
      type: "number",
      description: "Z-index value for the dialog and backdrop.",
      defaultValue: "1050"
    },
    {
      name: "ariaDescription",
      type: "string",
      description: "ARIA description for the dialog to provide additional context for screen readers."
    },
    {
      name: "id",
      type: "string",
      description: "HTML ID attribute for the dialog element. A unique ID will be generated if not provided."
    },
    {
      name: "title",
      type: "string",
      description: "Optional title text to display in the dialog header."
    }
  ];

  // Dialog component additional components
  const dialogHeaderProps: PropDetail[] = [
    {
      name: "hasCloseButton",
      type: "boolean",
      description: "Controls the visibility of the close button in the top-right corner.",
      defaultValue: "true"
    },
    {
      name: "closeButtonAriaLabel",
      type: "string",
      description: "ARIA label for the close button.",
      defaultValue: "Close dialog"
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the header element."
    },
    {
      name: "onClose$",
      type: "QRL<() => void>",
      description: "Callback function invoked when the close button is clicked."
    }
  ];

  const dialogBodyProps: PropDetail[] = [
    {
      name: "scrollable",
      type: "boolean",
      description: "When true, makes the body content scrollable when it exceeds the dialog height.",
      defaultValue: "false"
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the body element."
    }
  ];

  const dialogFooterProps: PropDetail[] = [
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the footer element."
    }
  ];

  // Dialog component doesn't have methods, but we need to provide an empty array
  const methods: MethodDetail[] = [];

  return (
    <APIReferenceTemplate
      props={props}
      methods={methods}
    >
      <p>
        The Dialog component provides a flexible and accessible modal interface for displaying
        important content, collecting user input, or confirming actions. It manages focus trapping,
        keyboard interactions, and screen reader compatibility automatically.
      </p>

      <h3 class="text-lg font-medium mt-6 mb-2">Dialog Composition</h3>
      <p class="mb-4">
        The Dialog component works with several sub-components to create a structured modal:
      </p>
      <ul class="list-disc pl-5 space-y-1 mb-4">
        <li><code>DialogHeader</code> - Contains the dialog title and optional close button</li>
        <li><code>DialogBody</code> - Contains the main content with optional scrollable behavior</li>
        <li><code>DialogFooter</code> - Contains action buttons or other controls at the bottom</li>
      </ul>
      
      <h3 class="text-lg font-medium mt-6 mb-2">Size Options</h3>
      <p class="mb-4">
        The Dialog component supports several size options through the <code>size</code> prop:
      </p>
      <table class="min-w-full border-separate border-spacing-0 mb-4">
        <thead>
          <tr>
            <th class="border-b px-4 py-2 text-left">Size</th>
            <th class="border-b px-4 py-2 text-left">Width</th>
            <th class="border-b px-4 py-2 text-left">Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b px-4 py-2"><code>sm</code></td>
            <td class="border-b px-4 py-2">max-w-sm</td>
            <td class="border-b px-4 py-2">Simple confirmation dialogs or short messages</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2"><code>md</code></td>
            <td class="border-b px-4 py-2">max-w-md</td>
            <td class="border-b px-4 py-2">Default size, suitable for most content</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2"><code>lg</code></td>
            <td class="border-b px-4 py-2">max-w-lg</td>
            <td class="border-b px-4 py-2">Forms and more complex content</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2"><code>xl</code></td>
            <td class="border-b px-4 py-2">max-w-xl</td>
            <td class="border-b px-4 py-2">Large forms or detailed content displays</td>
          </tr>
          <tr>
            <td class="border-b px-4 py-2"><code>full</code></td>
            <td class="border-b px-4 py-2">max-w-full</td>
            <td class="border-b px-4 py-2">Full-width content, galleries, or complex views</td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-lg font-medium mt-6 mb-2">DialogHeader Props</h3>
      <table class="min-w-full border-separate border-spacing-0 mb-4">
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
              <td class="border-b px-4 py-2"><code>{prop.name}</code></td>
              <td class="border-b px-4 py-2"><code>{prop.type}</code></td>
              <td class="border-b px-4 py-2">{prop.defaultValue ? <code>{prop.defaultValue}</code> : '-'}</td>
              <td class="border-b px-4 py-2">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 class="text-lg font-medium mt-6 mb-2">DialogBody Props</h3>
      <table class="min-w-full border-separate border-spacing-0 mb-4">
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
              <td class="border-b px-4 py-2"><code>{prop.name}</code></td>
              <td class="border-b px-4 py-2"><code>{prop.type}</code></td>
              <td class="border-b px-4 py-2">{prop.defaultValue ? <code>{prop.defaultValue}</code> : '-'}</td>
              <td class="border-b px-4 py-2">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 class="text-lg font-medium mt-6 mb-2">DialogFooter Props</h3>
      <table class="min-w-full border-separate border-spacing-0 mb-4">
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
              <td class="border-b px-4 py-2"><code>{prop.name}</code></td>
              <td class="border-b px-4 py-2"><code>{prop.type}</code></td>
              <td class="border-b px-4 py-2">{prop.defaultValue ? <code>{prop.defaultValue}</code> : '-'}</td>
              <td class="border-b px-4 py-2">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 class="text-lg font-medium mt-6 mb-2">Accessibility</h3>
      <p class="mb-1">
        The Dialog component implements the following accessibility features:
      </p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Uses <code>role="dialog"</code> and <code>aria-modal="true"</code> for proper screen reader identification</li>
        <li>Provides <code>aria-labelledby</code> and <code>aria-describedby</code> attributes for context</li>
        <li>Traps focus within the dialog to ensure keyboard navigation stays within the modal</li>
        <li>Returns focus to the triggering element when the dialog is closed</li>
        <li>Supports dismissal via the Escape key (configurable)</li>
        <li>Ensures proper contrast between dialog content and the backdrop</li>
      </ul>
    </APIReferenceTemplate>
  );
}); 