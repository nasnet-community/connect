import { component$, useSignal, $ } from "@builder.io/qwik";
import { VPNConfigFileSection } from "../index";

export default component$(() => {
  const config = useSignal("");
  const isUploading = useSignal(false);
  const uploadProgress = useSignal(0);
  const uploadLog = useSignal<string[]>([]);

  const addToLog = $((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    uploadLog.value = [...uploadLog.value, `[${timestamp}] ${message}`];
  });

  const handleConfigChange = $((value: string) => {
    config.value = value;
    addToLog(`Configuration updated (${value.length} characters)`);
  });

  const simulateUpload = $((filename: string, content: string) => {
    return new Promise<void>((resolve, reject) => {
      isUploading.value = true;
      uploadProgress.value = 0;

      addToLog(`Starting upload of ${filename}`);

      const interval = setInterval(() => {
        uploadProgress.value += Math.random() * 20 + 5;

        if (uploadProgress.value >= 100) {
          uploadProgress.value = 100;
          clearInterval(interval);

          setTimeout(() => {
            config.value = content;
            isUploading.value = false;
            uploadProgress.value = 0;
            addToLog(`Successfully uploaded ${filename}`);
            resolve();
          }, 500);
        }
      }, 200);

      // Simulate occasional failures (10% chance)
      if (Math.random() < 0.1) {
        setTimeout(() => {
          clearInterval(interval);
          isUploading.value = false;
          uploadProgress.value = 0;
          addToLog(`Failed to upload ${filename}: Network error`);
          reject(new Error("Upload failed"));
        }, 1000);
      }
    });
  });

  const handleFileUpload = $(
    async (event: Event, element: HTMLInputElement) => {
      const file = element.files?.[0];

      if (file) {
        addToLog(`File selected: ${file.name} (${file.size} bytes)`);

        try {
          const reader = new FileReader();
          reader.onload = async (e) => {
            const content = e.target?.result as string;
            await simulateUpload(file.name, content);
          };
          reader.onerror = () => {
            addToLog(`Error reading file: ${file.name}`);
          };
          reader.readAsText(file);
        } catch (error) {
          addToLog(`Upload error: ${error}`);
        }
      }
    },
  );

  const clearLog = $(() => {
    uploadLog.value = [];
  });

  const testDragDrop = $(() => {
    const sampleConfigs = [
      {
        name: "sample-openvpn.ovpn",
        content: `client
dev tun
proto udp
remote example.com 1194
resolv-retry infinite
nobind
persist-key
persist-tun
ca ca.crt
cert client.crt
key client.key
comp-lzo
verb 3`,
      },
      {
        name: "sample-wireguard.conf",
        content: `[Interface]
PrivateKey = your-private-key-here
Address = 10.0.0.2/32
DNS = 1.1.1.1

[Peer]
PublicKey = server-public-key-here
Endpoint = example.com:51820
AllowedIPs = 0.0.0.0/0`,
      },
    ];

    const randomConfig =
      sampleConfigs[Math.floor(Math.random() * sampleConfigs.length)];
    simulateUpload(randomConfig.name, randomConfig.content);
  });

  return (
    <div class="space-y-6">
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Drag & Drop with Progress Tracking
          </h3>
          <button
            onClick$={testDragDrop}
            disabled={isUploading.value}
            class="inline-flex items-center rounded-md bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
          >
            <svg
              class="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Test Upload
          </button>
        </div>

        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          This example demonstrates the enhanced drag & drop functionality with:
          <ul class="ml-4 mt-2 list-disc space-y-1">
            <li>Visual feedback during drag operations</li>
            <li>Upload progress tracking</li>
            <li>Real-time upload simulation</li>
            <li>Comprehensive activity logging</li>
          </ul>
        </div>

        <VPNConfigFileSection
          protocolName="OpenVPN"
          acceptedExtensions=".ovpn,.conf"
          configValue={config.value}
          onConfigChange$={handleConfigChange}
          onFileUpload$={handleFileUpload}
          isUploading={isUploading.value}
          uploadProgress={uploadProgress.value}
        />
      </div>

      {/* Activity Log */}
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div class="mb-4 flex items-center justify-between">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Activity Log
          </h4>
          <button
            onClick$={clearLog}
            class="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Clear Log
          </button>
        </div>

        <div class="max-h-48 overflow-y-auto rounded-md bg-gray-50 p-3 dark:bg-gray-900">
          {uploadLog.value.length === 0 ? (
            <p class="text-xs text-gray-500 dark:text-gray-400">
              No activity yet. Try uploading a file or using the test button.
            </p>
          ) : (
            <div class="space-y-1">
              {uploadLog.value.map((entry, index) => (
                <div
                  key={index}
                  class="font-mono text-xs text-gray-600 dark:text-gray-400"
                >
                  {entry}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Drag & Drop Instructions */}
      <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
        <div class="flex">
          <svg
            class="h-5 w-5 text-blue-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-blue-800 dark:text-blue-300">
              How to test drag & drop
            </h3>
            <div class="mt-2 text-sm text-blue-700 dark:text-blue-400">
              <ol class="list-inside list-decimal space-y-1">
                <li>
                  Create a test file with .ovpn or .conf extension on your
                  computer
                </li>
                <li>
                  Drag the file over the textarea above - notice the blue
                  highlight
                </li>
                <li>Drop the file to upload - watch the progress indicator</li>
                <li>Or use the "Test Upload" button to simulate the process</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Preview */}
      {config.value && (
        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
          <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Configuration Preview
          </h4>
          <pre class="max-h-32 overflow-y-auto text-xs text-gray-600 dark:text-gray-400">
            {config.value}
          </pre>
          <div class="mt-2 text-xs text-gray-500">
            Lines: {config.value.split("\n").length} | Characters:{" "}
            {config.value.length}
          </div>
        </div>
      )}
    </div>
  );
});
