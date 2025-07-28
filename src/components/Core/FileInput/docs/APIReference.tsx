import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
  type EventDetail,
} from "~/components/Docs/templates";

/**
 * API Reference documentation for FileInput components
 */
export default component$(() => {
  // ConfigFileInput Props
  const configFileInputProps: PropDetail[] = [
    {
      name: "config",
      type: "string",
      required: true,
      description: "The current configuration text value",
    },
    {
      name: "onConfigChange$",
      type: "QRL<(value: string) => void>",
      required: true,
      description:
        "Callback function triggered when configuration text changes",
    },
    {
      name: "onFileUpload$",
      type: "QRL<(event: Event) => void>",
      required: true,
      description: "Callback function triggered when a file is uploaded",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Custom placeholder text for the textarea",
    },
    {
      name: "vpnType",
      type: '"OpenVPN" | "Wireguard" | "L2TP" | "PPTP" | "SSTP" | "IKEv2"',
      defaultValue: '"Wireguard"',
      description:
        "VPN protocol type - determines default placeholder and accepted file extensions",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the root element",
    },
  ];

  // VPNConfigFileSection Props
  const vpnConfigFileSectionProps: PropDetail[] = [
    {
      name: "protocolName",
      type: "string",
      required: true,
      description:
        "Display name of the VPN protocol (e.g., 'WireGuard', 'OpenVPN')",
    },
    {
      name: "acceptedExtensions",
      type: "string",
      required: true,
      description:
        "Comma-separated list of accepted file extensions (e.g., '.conf,.ovpn')",
    },
    {
      name: "configValue",
      type: "string",
      required: true,
      description: "The current configuration text value",
    },
    {
      name: "onConfigChange$",
      type: "QRL<(value: string) => void>",
      required: true,
      description:
        "Callback function triggered when configuration text changes",
    },
    {
      name: "onFileUpload$",
      type: "QRL<(event: Event, element: HTMLInputElement) => void>",
      required: true,
      description:
        "Callback function triggered when a file is uploaded or dropped",
    },
    {
      name: "placeholder",
      type: "string",
      defaultValue: '"Paste your {protocolName} configuration here."',
      description: "Custom placeholder text for the textarea",
    },
    {
      name: "isUploading",
      type: "boolean",
      defaultValue: "false",
      description: "Shows upload progress overlay when true",
    },
    {
      name: "uploadProgress",
      type: "number",
      defaultValue: "0",
      description:
        "Upload progress percentage (0-100) - shown when isUploading is true",
    },
  ];

  // Events
  const events: EventDetail[] = [
    {
      name: "onConfigChange$",
      args: "value: string",
      description:
        "Fired when the configuration text is modified via textarea input or paste",
    },
    {
      name: "onFileUpload$",
      args: "event: Event, element?: HTMLInputElement",
      description:
        "Fired when a file is selected via file input or dropped into the drop zone",
    },
  ];

  return (
    <APIReferenceTemplate props={[]} events={events}>
      <p class="mb-6">
        The FileInput module provides two components for handling VPN
        configuration files with different levels of complexity and features.
      </p>

      <h3 class="mb-4 text-lg font-semibold">ConfigFileInput</h3>
      <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
        A simple file input component for basic configuration file handling with
        upload and paste functionality.
      </p>

      <div class="mb-8">
        <APIReferenceTemplate props={configFileInputProps} />
      </div>

      <h3 class="mb-4 text-lg font-semibold">VPNConfigFileSection</h3>
      <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
        An advanced file input component with drag-and-drop support, upload
        progress tracking, and FormContainer integration for a complete
        configuration section.
      </p>

      <APIReferenceTemplate props={vpnConfigFileSectionProps} />

      <h3 class="mb-4 mt-8 text-lg font-semibold">Common Features</h3>
      <ul class="list-disc space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-300">
        <li>
          <strong>File Type Support:</strong> Both components automatically
          determine accepted file extensions based on the VPN type (e.g., .ovpn
          for OpenVPN, .conf for WireGuard)
        </li>
        <li>
          <strong>Clipboard Integration:</strong> Users can paste configurations
          directly from the clipboard using the paste button
        </li>
        <li>
          <strong>Accessibility:</strong> Full keyboard navigation support with
          proper ARIA labels and descriptions
        </li>
        <li>
          <strong>Dark Mode:</strong> Automatic theme adaptation with optimized
          colors for both light and dark modes
        </li>
        <li>
          <strong>Responsive Design:</strong> Layout adapts seamlessly from
          mobile to desktop viewports
        </li>
      </ul>

      <h3 class="mb-4 mt-8 text-lg font-semibold">Implementation Notes</h3>
      <ul class="list-disc space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-300">
        <li>
          The{" "}
          <code class="rounded bg-gray-100 px-1 py-0.5 font-mono text-xs dark:bg-gray-800">
            onFileUpload$
          </code>{" "}
          handler receives the raw event and should handle file reading
        </li>
        <li>
          File validation should be implemented in the parent component based on
          specific requirements
        </li>
        <li>
          The VPNConfigFileSection component integrates with FormContainer for
          consistent form layout
        </li>
        <li>
          Both components use Qwik's QRL pattern for optimal lazy loading of
          event handlers
        </li>
      </ul>
    </APIReferenceTemplate>
  );
});
