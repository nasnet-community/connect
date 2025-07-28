import { component$, useSignal, $ } from "@builder.io/qwik";
import { ConfigFileInput, VPNConfigFileSection } from "../index";
import type { FileUploadError, ConfigValidationOptions } from "../types";

/**
 * Error Handling Example
 * 
 * Demonstrates comprehensive error handling scenarios including:
 * - File size validation
 * - Format validation
 * - Network errors
 * - Retry mechanisms
 */
export default component$(() => {
  const config = useSignal("");
  const error = useSignal<FileUploadError | null>(null);
  const isUploading = useSignal(false);
  const uploadProgress = useSignal(0);
  const selectedScenario = useSignal<"size" | "format" | "network" | "none">("none");

  // Validation options with custom rules
  const _validationOptions: ConfigValidationOptions = {
    validateFormat: true,
    checkRequiredFields: true,
    validateNetworkAddresses: true,
  };

  // Simulate different error scenarios
  const simulateError = $((scenario: string) => {
    switch (scenario) {
      case "size":
        error.value = {
          type: "FILE_TOO_LARGE",
          message: $localize`File size exceeds the 1MB limit`,
          details: $localize`The selected file is 5.2MB. Please choose a smaller file.`,
          retryable: false,
        };
        break;
      case "format":
        error.value = {
          type: "VALIDATION_ERROR",
          message: $localize`Invalid WireGuard configuration format`,
          details: $localize`Missing required [Interface] section. The configuration must include both [Interface] and [Peer] sections.`,
          retryable: false,
        };
        break;
      case "network":
        error.value = {
          type: "NETWORK_ERROR",
          message: $localize`Network error during upload`,
          details: $localize`Failed to connect to the server. Please check your internet connection.`,
          retryable: true,
        };
        break;
      default:
        error.value = null;
    }
  });

  const handleConfigChange = $((value: string) => {
    config.value = value;
    error.value = null; // Clear errors on new input
  });

  const handleFileUpload = $(async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (!file) return;

    // Simulate error based on selected scenario
    if (selectedScenario.value !== "none") {
      simulateError(selectedScenario.value);
      return;
    }

    // Simulate successful upload with progress
    isUploading.value = true;
    uploadProgress.value = 0;
    
    const progressInterval = setInterval(() => {
      uploadProgress.value += 20;
      if (uploadProgress.value >= 100) {
        clearInterval(progressInterval);
        isUploading.value = false;
        uploadProgress.value = 0;
      }
    }, 300);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      config.value = content;
    };
    reader.readAsText(file);
  });

  const handleRetry = $(() => {
    error.value = null;
    // In real app, retry the failed operation
    console.log("Retrying operation...");
  });

  return (
    <div class="space-y-8">
      {/* Scenario Selector */}
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Error Handling Scenarios
        </h3>
        
        <div class="mb-4">
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select error scenario to simulate:
          </label>
          <select
            value={selectedScenario.value}
            onChange$={(e, el) => {
              selectedScenario.value = el.value as any;
              simulateError(el.value);
            }}
            class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="none">None (Normal Operation)</option>
            <option value="size">File Too Large</option>
            <option value="format">Invalid Format</option>
            <option value="network">Network Error</option>
          </select>
        </div>
        
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Try uploading a file or pasting configuration with different error scenarios selected.
        </p>
      </div>

      {/* Basic Error Handling Example */}
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h4 class="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
          Basic Error Handling with ConfigFileInput
        </h4>
        
        <ConfigFileInput
          config={config.value}
          onConfigChange$={handleConfigChange}
          onFileUpload$={handleFileUpload}
          vpnType="Wireguard"
          maxFileSize={1024 * 1024} // 1MB limit for demo
          error={error.value}
          showCharCount={true}
        />
      </div>

      {/* Advanced Error Handling Example */}
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h4 class="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
          Advanced Error Handling with VPNConfigFileSection
        </h4>
        
        <VPNConfigFileSection
          protocolName="WireGuard"
          acceptedExtensions=".conf"
          configValue={config.value}
          onConfigChange$={handleConfigChange}
          onFileUpload$={handleFileUpload}
          isUploading={isUploading.value}
          uploadProgress={uploadProgress.value}
        />
        
        {/* Manual error display for VPNConfigFileSection */}
        {error.value && (
          <div class="mt-4">
            <div class="rounded-lg border border-error-200 bg-error-50 p-4 dark:border-error-800 dark:bg-error-950/30">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-error-600 dark:text-error-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-3 flex-1">
                  <h3 class="text-sm font-medium text-error-800 dark:text-error-200">
                    {error.value.message}
                  </h3>
                  {error.value.details !== undefined && error.value.details !== null && (
                    <p class="mt-2 text-sm text-error-700 dark:text-error-300">
                      {typeof error.value.details === 'string' ? error.value.details : JSON.stringify(error.value.details)}
                    </p>
                  )}
                  {error.value.retryable && (
                    <button
                      onClick$={handleRetry}
                      class="mt-3 rounded-md bg-error-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-error-700 focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2 dark:bg-error-500 dark:hover:bg-error-600"
                    >
                      Retry
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error Types Reference */}
      <div class="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950/20">
        <h4 class="mb-3 text-base font-semibold text-blue-800 dark:text-blue-300">
          Error Types Reference
        </h4>
        
        <div class="space-y-4">
          <div>
            <h5 class="text-sm font-medium text-blue-700 dark:text-blue-400">
              FILE_TOO_LARGE
            </h5>
            <p class="text-xs text-blue-600 dark:text-blue-500">
              File exceeds the maximum allowed size. Non-retryable.
            </p>
          </div>
          
          <div>
            <h5 class="text-sm font-medium text-blue-700 dark:text-blue-400">
              INVALID_FORMAT
            </h5>
            <p class="text-xs text-blue-600 dark:text-blue-500">
              Configuration file has invalid format or structure. Non-retryable.
            </p>
          </div>
          
          <div>
            <h5 class="text-sm font-medium text-blue-700 dark:text-blue-400">
              READ_ERROR
            </h5>
            <p class="text-xs text-blue-600 dark:text-blue-500">
              Failed to read file or clipboard contents. Usually retryable.
            </p>
          </div>
          
          <div>
            <h5 class="text-sm font-medium text-blue-700 dark:text-blue-400">
              NETWORK_ERROR
            </h5>
            <p class="text-xs text-blue-600 dark:text-blue-500">
              Network-related errors during upload. Retryable.
            </p>
          </div>
          
          <div>
            <h5 class="text-sm font-medium text-blue-700 dark:text-blue-400">
              VALIDATION_ERROR
            </h5>
            <p class="text-xs text-blue-600 dark:text-blue-500">
              Custom validation failed. Details depend on validation rules.
            </p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
        <h4 class="mb-3 text-base font-semibold text-gray-900 dark:text-gray-100">
          Error Handling Best Practices
        </h4>
        
        <ul class="list-disc space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-300">
          <li>Always provide clear, actionable error messages</li>
          <li>Include retry options for transient errors</li>
          <li>Validate file size before attempting to read</li>
          <li>Show progress indicators during long operations</li>
          <li>Clear errors when user takes corrective action</li>
          <li>Use appropriate error variants (inline, toast, banner)</li>
          <li>Consider auto-dismissing non-critical errors</li>
          <li>Log errors for debugging but show user-friendly messages</li>
        </ul>
      </div>
      
      {/* Configuration Preview */}
      {config.value && (
        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
          <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Current Configuration:
          </h4>
          <pre class="max-h-32 overflow-auto text-xs text-gray-600 dark:text-gray-400">
            {config.value}
          </pre>
        </div>
      )}
    </div>
  );
});