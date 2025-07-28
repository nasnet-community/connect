import { $, component$, type QRL, useSignal } from "@builder.io/qwik";
import { Container as FormContainer } from "../../Form/Container/Container";
import { Spinner } from "../../DataDisplay/Progress/Spinner";

export interface VPNConfigFileSectionProps {
  protocolName: string;
  acceptedExtensions: string;
  configValue: string;
  onConfigChange$: QRL<(value: string) => void>;
  onFileUpload$: QRL<(event: Event, element: HTMLInputElement) => void>;
  placeholder?: string;
  isUploading?: boolean;
  uploadProgress?: number;
}

export const VPNConfigFileSection = component$<VPNConfigFileSectionProps>(
  ({
    protocolName,
    acceptedExtensions,
    configValue,
    onConfigChange$,
    onFileUpload$,
    placeholder = `Paste your ${protocolName} configuration here.`,
    isUploading = false,
    uploadProgress = 0,
  }) => {
    const handlePaste$ = $(async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          onConfigChange$(text);
        }
      } catch (error) {
        console.error("Failed to read clipboard contents:", error);
      }
    });

    const isDraggingOver = useSignal(false);
    const textareaRef = useSignal<HTMLTextAreaElement>();

    return (
      <FormContainer
        title={$localize`${protocolName} Configuration File`}
        description={$localize`Upload your ${protocolName} configuration file (${acceptedExtensions}) or paste the configuration below.`}
      >
        {/* Configuration area with responsive flex layout */}
        <div class="flex flex-col gap-4 tablet:flex-row tablet:gap-6">
          {/* Combined textarea and drop area */}
          <div class="relative flex-1">
            <label
              class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              for="config"
            >
              {$localize`Configuration`}
            </label>

            {/* Textarea for configuration with enhanced drop zone */}
            <div
              class="relative w-full"
              onDragOver$={(e) => {
                e.preventDefault();
                isDraggingOver.value = true;
              }}
              onDragLeave$={(e) => {
                // Only set to false if we're leaving the entire drop zone
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                const x = e.clientX;
                const y = e.clientY;
                if (
                  x < rect.left ||
                  x > rect.right ||
                  y < rect.top ||
                  y > rect.bottom
                ) {
                  isDraggingOver.value = false;
                }
              }}
              onDrop$={(e) => {
                e.preventDefault();
                isDraggingOver.value = false;

                if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
                  const fileInput = document.createElement("input");
                  fileInput.type = "file";
                  fileInput.files = e.dataTransfer.files;
                  onFileUpload$(new Event("change"), fileInput);
                }
              }}
            >
              <textarea
                ref={textareaRef}
                id="config"
                name="config"
                rows={8}
                value={configValue}
                onChange$={(_, el) => onConfigChange$(el.value)}
                placeholder={placeholder}
                disabled={isUploading}
                aria-label={$localize`${protocolName} configuration`}
                aria-describedby="config-helper-text"
                class={`
                  w-full rounded-lg border px-4 py-3 font-mono text-sm
                  transition-all duration-200
                  placeholder:text-gray-400 dark:placeholder:text-gray-500
                  
                  ${
                    isUploading
                      ? "cursor-not-allowed opacity-60"
                      : "hover:border-gray-400 dark:hover:border-gray-500"
                  }
                  
                  ${
                    isDraggingOver.value
                      ? "border-2 border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-950/20"
                      : "bg-surface-light border-gray-300 dark:border-gray-600 dark:bg-surface-dark"
                  }
                  
                  text-gray-900 focus:border-primary-500
                  
                  focus:outline-none focus:ring-2 focus:ring-primary-500 
                  focus:ring-offset-2 mobile:text-base
                  tablet:text-sm dark:text-gray-100
                  dark:focus:border-primary-400
                  
                  dark:focus:ring-primary-400 dark:focus:ring-offset-surface-dark
                `}
              />

              {/* Drop overlay with enhanced animation */}
              <div
                class={`
                  absolute inset-0 flex flex-col items-center justify-center 
                  rounded-lg border-2 border-dashed
                  transition-all duration-300
                  
                  ${
                    isDraggingOver.value
                      ? "pointer-events-auto scale-100 opacity-100"
                      : "pointer-events-none scale-95 opacity-0"
                  }
                  
                  bg-surface-light/95 border-primary-500 backdrop-blur-sm
                  dark:border-primary-400 dark:bg-surface-dark/95
                `}
                role="presentation"
              >
                <div class="animate-bounce">
                  <svg
                    class="h-12 w-12 text-primary-500 dark:text-primary-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <p class="mt-3 text-base font-medium text-primary-700 dark:text-primary-300">
                  {$localize`Drop ${protocolName} file here to upload`}
                </p>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {acceptedExtensions}
                </p>
              </div>

              {/* Upload progress overlay */}
              {isUploading && (
                <div class="bg-surface-light/95 absolute inset-0 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm dark:bg-surface-dark/95">
                  <Spinner
                    size="lg"
                    color="primary"
                    label={$localize`Uploading...`}
                  />
                  {uploadProgress > 0 && (
                    <div class="mt-4 w-48">
                      <div class="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          class="h-full rounded-full bg-primary-500 transition-all duration-300 dark:bg-primary-400"
                          style={{ width: `${uploadProgress}%` }}
                          role="progressbar"
                          aria-valuenow={uploadProgress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        {uploadProgress}%
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Helper text under textarea */}
            <p
              id="config-helper-text"
              class="mt-2 text-xs text-gray-500 dark:text-gray-400"
            >
              {$localize`You can also drag & drop ${protocolName} files (${acceptedExtensions}) directly into the text area`}
            </p>
          </div>

          {/* Action buttons with enhanced mobile layout */}
          <div class="flex gap-2 mobile:w-full tablet:w-auto tablet:flex-col tablet:gap-3">
            <label
              class={`
                group relative flex-1 cursor-pointer overflow-hidden rounded-lg 
                bg-primary-500 px-4 py-2.5 text-center text-white 
                transition-all duration-200
                
                focus-within:ring-4 focus-within:ring-primary-300 hover:bg-primary-600
                hover:shadow-lg
                
                hover:shadow-primary-500/25 active:scale-[0.98] 
                tablet:flex-initial
                
                dark:focus-within:ring-primary-800
                
                ${isUploading ? "cursor-not-allowed opacity-60" : ""}
              `}
              tabIndex={isUploading ? -1 : 0}
              role="button"
              aria-label={$localize`Upload ${protocolName} configuration file`}
              aria-disabled={isUploading}
            >
              <span class="relative z-10 inline-flex items-center justify-center font-medium">
                <svg
                  class="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                {$localize`Upload Config`}
              </span>
              <span class="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-full" />
              <input
                id="configFile"
                name="configFile"
                type="file"
                accept={acceptedExtensions}
                class="sr-only"
                disabled={isUploading}
                onChange$={onFileUpload$}
                aria-label={$localize`Choose ${protocolName} configuration file`}
              />
            </label>

            <button
              onClick$={handlePaste$}
              disabled={isUploading}
              class={`
                group relative inline-flex flex-1 items-center justify-center 
                overflow-hidden rounded-lg bg-secondary-500 px-4 py-2.5 
                font-medium text-white transition-all duration-200
                
                hover:bg-secondary-600 hover:shadow-lg hover:shadow-secondary-500/25
                focus:outline-none
                
                focus:ring-4 focus:ring-secondary-300 active:scale-[0.98] 
                tablet:flex-initial
                
                dark:focus:ring-secondary-800
                
                ${isUploading ? "cursor-not-allowed opacity-60" : ""}
              `}
              type="button"
              aria-label={$localize`Paste ${protocolName} configuration from clipboard`}
            >
              <span class="relative z-10 inline-flex items-center">
                <svg
                  class="mr-2 h-4 w-4 transition-transform group-hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                {$localize`Paste Config`}
              </span>
              <span class="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-full" />
            </button>
          </div>
        </div>
      </FormContainer>
    );
  },
);
