import { component$, useSignal, $ } from "@builder.io/qwik";
import { ConfigFileInput } from "../index";

export default component$(() => {
  const config = useSignal("");
  const uploadStatus = useSignal("");

  const handleConfigChange = $((value: string) => {
    config.value = value;
    uploadStatus.value = "";
  });

  const handleFileUpload = $((event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      uploadStatus.value = "Uploading...";

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        config.value = content;
        uploadStatus.value = `Uploaded: ${file.name}`;
        setTimeout(() => {
          uploadStatus.value = "";
        }, 3000);
      };
      reader.onerror = () => {
        uploadStatus.value = "Upload failed. Please try again.";
        setTimeout(() => {
          uploadStatus.value = "";
        }, 3000);
      };
      reader.readAsText(file);
    }
  });

  return (
    <div class="space-y-6">
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Basic ConfigFileInput Example
        </h3>

        <ConfigFileInput
          config={config.value}
          onConfigChange$={handleConfigChange}
          onFileUpload$={handleFileUpload}
          vpnType="Wireguard"
          placeholder="Enter your WireGuard configuration here..."
        />

        {uploadStatus.value && (
          <div
            class={`mt-4 rounded-md px-4 py-2 text-sm ${
              uploadStatus.value.includes("failed")
                ? "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400"
                : uploadStatus.value.includes("Uploading")
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400"
                  : "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400"
            }`}
          >
            {uploadStatus.value}
          </div>
        )}
      </div>

      <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
        <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Configuration Preview:
        </h4>
        <pre class="text-xs text-gray-600 dark:text-gray-400">
          {config.value || "(empty)"}
        </pre>
        <div class="mt-2 text-xs text-gray-500">
          Character count: {config.value.length}
        </div>
      </div>
    </div>
  );
});
