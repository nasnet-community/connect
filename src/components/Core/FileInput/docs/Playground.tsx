import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates";
import { ConfigFileInput } from "../ConfigFileInput/ConfigFileInput";
import { VPNConfigFileSection } from "../VPNConfigFileSection/VPNConfigFileSection";

/**
 * Interactive playground for FileInput components
 */
export default component$(() => {
  const selectedComponent = useSignal<
    "ConfigFileInput" | "VPNConfigFileSection"
  >("ConfigFileInput");
  const config = useSignal("");
  const isUploading = useSignal(false);
  const uploadProgress = useSignal(0);

  // Common event handlers
  const handleConfigChange = $((value: string) => {
    config.value = value;
  });

  const handleFileUpload = $(
    async (event: Event, element?: HTMLInputElement) => {
      const input = (element || event.target) as HTMLInputElement;
      const file = input.files?.[0];

      if (file) {
        isUploading.value = true;
        uploadProgress.value = 0;

        try {
          // Simulate upload progress for demo
          const progressInterval = setInterval(() => {
            uploadProgress.value += 20;
            if (uploadProgress.value >= 100) {
              clearInterval(progressInterval);
            }
          }, 200);

          const text = await file.text();
          config.value = text;

          // Reset after successful upload
          setTimeout(() => {
            isUploading.value = false;
            uploadProgress.value = 0;
          }, 1000);
        } catch (error) {
          console.error("Upload failed:", error);
          isUploading.value = false;
          uploadProgress.value = 0;
        }
      }
    },
  );

  // Component selection controls

  // ConfigFileInput properties
  const configFileInputProperties: PropertyControl[] = [
    {
      type: "text",
      name: "placeholder",
      label: "Placeholder Text",
      defaultValue: "",
    },
    {
      type: "select",
      name: "vpnType",
      label: "VPN Type",
      defaultValue: "Wireguard",
      options: [
        { label: "WireGuard", value: "Wireguard" },
        { label: "OpenVPN", value: "OpenVPN" },
        { label: "L2TP", value: "L2TP" },
        { label: "PPTP", value: "PPTP" },
        { label: "SSTP", value: "SSTP" },
        { label: "IKEv2", value: "IKEv2" },
      ],
    },
  ];

  // VPNConfigFileSection properties
  const vpnConfigFileSectionProperties: PropertyControl[] = [
    {
      type: "text",
      name: "protocolName",
      label: "Protocol Name",
      defaultValue: "WireGuard",
    },
    {
      type: "text",
      name: "acceptedExtensions",
      label: "Accepted Extensions",
      defaultValue: ".conf",
    },
    {
      type: "text",
      name: "placeholder",
      label: "Placeholder Text",
      defaultValue: "",
    },
    {
      type: "boolean",
      name: "isUploading",
      label: "Show Upload State",
      defaultValue: false,
    },
    {
      type: "number",
      name: "uploadProgress",
      label: "Upload Progress",
      defaultValue: 0,
      min: 0,
      max: 100,
      step: 10,
    },
  ];

  const renderComponent = $((props: any) => {
    const componentType = props.component || selectedComponent.value;

    if (componentType === "VPNConfigFileSection") {
      return (
        <div class="w-full max-w-2xl">
          <VPNConfigFileSection
            protocolName={props.protocolName || "WireGuard"}
            acceptedExtensions={props.acceptedExtensions || ".conf"}
            configValue={config.value}
            onConfigChange$={handleConfigChange}
            onFileUpload$={handleFileUpload}
            placeholder={props.placeholder || undefined}
            isUploading={props.isUploading || isUploading.value}
            uploadProgress={props.uploadProgress || uploadProgress.value}
          />
        </div>
      );
    } else {
      return (
        <div class="w-full max-w-2xl">
          <ConfigFileInput
            config={config.value}
            onConfigChange$={handleConfigChange}
            onFileUpload$={handleFileUpload}
            placeholder={props.placeholder || undefined}
            vpnType={props.vpnType || "Wireguard"}
          />
        </div>
      );
    }
  });

  return (
    <div class="space-y-8">
      {/* Component Selector */}
      <div class="flex justify-center">
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h3 class="mb-3 text-base font-semibold text-gray-900 dark:text-white">
            Select Component
          </h3>
          <div class="flex gap-4">
            <label class="flex items-center">
              <input
                type="radio"
                name="component"
                value="ConfigFileInput"
                checked={selectedComponent.value === "ConfigFileInput"}
                onChange$={() => {
                  selectedComponent.value = "ConfigFileInput";
                  config.value = "";
                }}
                class="mr-2"
              />
              ConfigFileInput
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                name="component"
                value="VPNConfigFileSection"
                checked={selectedComponent.value === "VPNConfigFileSection"}
                onChange$={() => {
                  selectedComponent.value = "VPNConfigFileSection";
                  config.value = "";
                }}
                class="mr-2"
              />
              VPNConfigFileSection
            </label>
          </div>
        </div>
      </div>

      {/* Component-specific playground */}
      {selectedComponent.value === "ConfigFileInput" && (
        <PlaygroundTemplate
          properties={configFileInputProperties}
          renderComponent={renderComponent}
          initialProps={{
            component: "ConfigFileInput",
            placeholder: "",
            vpnType: "Wireguard",
          }}
        >
          <div>
            <h3 class="mb-3 text-lg font-semibold">
              ConfigFileInput Playground
            </h3>
            <p class="mb-4">
              Experiment with the ConfigFileInput component. Try uploading a
              file or pasting configuration text. The component automatically
              adapts its placeholder text and accepted file extensions based on
              the VPN type.
            </p>

            <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
              <h4 class="mb-2 font-medium text-blue-900 dark:text-blue-100">
                Try These Features:
              </h4>
              <ul class="list-disc space-y-1 pl-5 text-sm text-blue-800 dark:text-blue-200">
                <li>Change the VPN type to see different placeholders</li>
                <li>Upload a configuration file using the upload button</li>
                <li>Try pasting text using the paste button</li>
                <li>Type directly in the textarea</li>
              </ul>
            </div>
          </div>
        </PlaygroundTemplate>
      )}

      {selectedComponent.value === "VPNConfigFileSection" && (
        <PlaygroundTemplate
          properties={vpnConfigFileSectionProperties}
          renderComponent={renderComponent}
          initialProps={{
            component: "VPNConfigFileSection",
            protocolName: "WireGuard",
            acceptedExtensions: ".conf",
            placeholder: "",
            isUploading: false,
            uploadProgress: 0,
          }}
        >
          <div>
            <h3 class="mb-3 text-lg font-semibold">
              VPNConfigFileSection Playground
            </h3>
            <p class="mb-4">
              Explore the advanced VPNConfigFileSection component with
              drag-and-drop support and upload progress tracking. This component
              integrates with FormContainer for a complete form section
              experience.
            </p>

            <div class="rounded-lg bg-green-50 p-4 dark:bg-green-950/30">
              <h4 class="mb-2 font-medium text-green-900 dark:text-green-100">
                Advanced Features:
              </h4>
              <ul class="list-disc space-y-1 pl-5 text-sm text-green-800 dark:text-green-200">
                <li>Drag and drop files directly onto the textarea</li>
                <li>Toggle upload state to see progress animation</li>
                <li>Adjust progress percentage to test the progress bar</li>
                <li>Customize protocol name and accepted extensions</li>
                <li>Experience the enhanced visual feedback</li>
              </ul>
            </div>
          </div>
        </PlaygroundTemplate>
      )}

      {/* Current Configuration Display */}
      {config.value && (
        <div class="flex justify-center">
          <div class="w-full max-w-4xl rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h3 class="mb-3 text-base font-semibold text-gray-900 dark:text-white">
              Current Configuration ({config.value.length} characters)
            </h3>
            <pre class="max-h-40 overflow-auto rounded-md bg-gray-100 p-3 text-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              {config.value}
            </pre>
            <button
              onClick$={() => (config.value = "")}
              class="mt-2 rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
            >
              Clear Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  );
});
