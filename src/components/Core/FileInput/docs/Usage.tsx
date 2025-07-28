import { component$ } from "@builder.io/qwik";
import {
  UsageTemplate,
  type BestPractice,
  type AccessibilityTip,
} from "~/components/Docs/templates";

/**
 * Usage documentation for FileInput components
 */
export default component$(() => {
  const basicUsage = `import { component$, useSignal } from "@builder.io/qwik";
import { ConfigFileInput } from "~/components/Core/FileInput";

export const BasicExample = component$(() => {
  const config = useSignal("");

  const handleConfigChange = $((value: string) => {
    config.value = value;
  });

  const handleFileUpload = $(async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      const text = await file.text();
      config.value = text;
    }
  });

  return (
    <ConfigFileInput
      config={config.value}
      onConfigChange$={handleConfigChange}
      onFileUpload$={handleFileUpload}
      vpnType="Wireguard"
    />
  );
});`;

  const advancedUsage = `import { component$, useSignal } from "@builder.io/qwik";
import { VPNConfigFileSection } from "~/components/Core/FileInput";

export const AdvancedExample = component$(() => {
  const config = useSignal("");
  const isUploading = useSignal(false);
  const uploadProgress = useSignal(0);

  const handleConfigChange = $((value: string) => {
    config.value = value;
  });

  const handleFileUpload = $(async (event: Event, element: HTMLInputElement) => {
    const file = element.files?.[0];
    
    if (file) {
      isUploading.value = true;
      uploadProgress.value = 0;

      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          uploadProgress.value += 10;
          if (uploadProgress.value >= 100) {
            clearInterval(progressInterval);
          }
        }, 100);

        const text = await file.text();
        config.value = text;
        
        // Validate configuration format
        if (!text.includes("[Interface]") && !text.includes("[Peer]")) {
          throw new Error("Invalid WireGuard configuration format");
        }
      } catch (error) {
        console.error("Upload failed:", error);
        // Handle error appropriately
      } finally {
        isUploading.value = false;
        uploadProgress.value = 0;
      }
    }
  });

  return (
    <VPNConfigFileSection
      protocolName="WireGuard"
      acceptedExtensions=".conf"
      configValue={config.value}
      onConfigChange$={handleConfigChange}
      onFileUpload$={handleFileUpload}
      isUploading={isUploading.value}
      uploadProgress={uploadProgress.value}
    />
  );
});`;

  const dos = [
    "Validate file content after upload to ensure it matches the expected format",
    "Provide clear feedback when file upload succeeds or fails",
    "Use appropriate file extension filters based on VPN protocol type",
    "Handle large files gracefully with progress indicators",
    "Clear previous errors when a new file is selected",
  ];

  const donts = [
    "Allow unrestricted file types without validation",
    "Process files without checking their size first",
    "Ignore clipboard API errors - provide fallback options",
    "Forget to handle drag-and-drop edge cases",
    "Leave the UI in a loading state after errors",
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "File Validation",
      description:
        "Always validate the uploaded file content matches the expected VPN configuration format. Check for required sections like [Interface] and [Peer] for WireGuard configs.",
    },
    {
      title: "Error Handling",
      description:
        "Implement comprehensive error handling for file read failures, invalid formats, and oversized files. Display user-friendly error messages.",
    },
    {
      title: "Progress Feedback",
      description:
        "For larger configuration files or slow connections, show upload progress to keep users informed. The VPNConfigFileSection component supports this natively.",
    },
    {
      title: "Clipboard Fallback",
      description:
        "Not all browsers support clipboard API. Ensure the paste functionality degrades gracefully and inform users if clipboard access is denied.",
    },
    {
      title: "Drag and Drop UX",
      description:
        "When using VPNConfigFileSection, the drag-and-drop area provides visual feedback. Ensure the drop zone is clearly visible during drag operations.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Keyboard Navigation",
      description:
        "Both upload and paste buttons are fully keyboard accessible. Users can navigate and activate them using Tab and Enter/Space keys.",
    },
    {
      title: "Screen Reader Support",
      description:
        "All interactive elements have proper ARIA labels. The file input is visually hidden but remains accessible to screen readers.",
    },
    {
      title: "Progress Announcements",
      description:
        "Upload progress is announced to screen readers via ARIA live regions, keeping users informed of the upload status.",
    },
    {
      title: "Error Announcements",
      description:
        "Validation errors and upload failures should be announced to screen readers. Consider using ARIA live regions for dynamic error messages.",
    },
  ];

  const performanceTips = [
    "Use the FileReader API efficiently - avoid reading very large files into memory at once",
    "Implement file size limits to prevent performance issues with oversized configurations",
    "Lazy load the file processing logic using Qwik's $ syntax for optimal bundle splitting",
    "Consider chunking large file uploads if backend processing is required",
    "Cache validated configurations to avoid re-parsing on component re-renders",
  ];

  return (
    <UsageTemplate
      basicUsage={basicUsage}
      advancedUsage={advancedUsage}
      dos={dos}
      donts={donts}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The FileInput components provide specialized functionality for handling
        VPN configuration files. Choose the appropriate component based on your
        needs:
      </p>

      <ul class="mt-4 list-disc space-y-2 pl-5">
        <li>
          <strong>ConfigFileInput:</strong> Use for simple file upload scenarios
          where you need basic upload and paste functionality
        </li>
        <li>
          <strong>VPNConfigFileSection:</strong> Use for comprehensive file
          management with drag-and-drop, progress tracking, and form integration
        </li>
      </ul>

      <p class="mt-4">
        Both components handle the complexities of file reading and provide a
        consistent user experience across different VPN protocol types.
      </p>
    </UsageTemplate>
  );
});
