import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

/**
 * FileInput component overview documentation using the standard template
 */
export default component$(() => {
  const keyFeatures = [
    "File Upload: Supports drag-and-drop and click-to-upload functionality",
    "Paste Support: Users can paste configuration directly from clipboard",
    "VPN Configuration: Specialized for handling VPN configuration files",
    "Progress Tracking: Shows upload progress with visual feedback",
    "Accessibility: Full keyboard navigation and screen reader support",
    "Responsive Design: Adapts seamlessly to mobile and desktop layouts",
    "Dark Mode: Built-in support for light and dark themes",
    "Error Handling: Graceful handling of upload errors and invalid files",
  ];

  const whenToUse = [
    "VPN configuration management interfaces",
    "When users need to upload or paste configuration files",
    "Forms requiring secure file upload with progress feedback",
    "Network configuration tools that require file input",
    "When drag-and-drop functionality enhances user experience",
    "Applications that need both file upload and text paste options",
  ];

  const whenNotToUse = [
    "For general-purpose file uploads (use FileUpload component instead)",
    "When multiple file selection is required",
    "For image uploads that need preview functionality",
    "When file size validation is critical (add custom validation)",
    "For non-configuration file types",
  ];

  return (
    <OverviewTemplate
      title="FileInput Components"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The FileInput module provides specialized components for handling VPN
        configuration files. It includes two main components designed for
        different use cases and complexity levels.
      </p>

      <h3 class="mt-4 text-lg font-semibold">ConfigFileInput</h3>
      <p class="mt-2">
        A streamlined file input component that provides basic functionality for
        uploading and pasting VPN configuration files. It features a simple
        interface with upload and paste buttons alongside a textarea for manual
        configuration entry.
      </p>

      <h3 class="mt-4 text-lg font-semibold">VPNConfigFileSection</h3>
      <p class="mt-2">
        An advanced file input component that integrates with FormContainer to
        provide a complete configuration file management section. It includes
        drag-and-drop support, upload progress tracking, and enhanced visual
        feedback for a more sophisticated user experience.
      </p>

      <p class="mt-4">
        Both components are optimized for VPN configuration workflows,
        supporting common formats like .conf, .ovpn, and protocol-specific
        configuration files. They handle the complexities of file reading and
        validation while providing a clean, intuitive interface for users.
      </p>
    </OverviewTemplate>
  );
});
