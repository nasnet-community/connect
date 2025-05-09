import { $, component$, type QRL, useSignal } from "@builder.io/qwik";
import { Container as FormContainer } from "../../Form/Container/Container";

export interface VPNConfigFileSectionProps {
  protocolName: string;
  acceptedExtensions: string;
  configValue: string;
  onConfigChange$: QRL<(value: string) => void>;
  onFileUpload$: QRL<(event: Event, element: HTMLInputElement) => void>;
  placeholder?: string;
}

export const VPNConfigFileSection = component$<VPNConfigFileSectionProps>(({
  protocolName,
  acceptedExtensions,
  configValue,
  onConfigChange$,
  onFileUpload$,
  placeholder = `Paste your ${protocolName} configuration here.`
}) => {
  const handlePaste$ = $(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onConfigChange$(text);
      }
    } catch (error) {
      console.error('Failed to read clipboard contents:', error);
    }
  });

  const isDraggingOver = useSignal(false);

  return (
    <FormContainer
      title={$localize`${protocolName} Configuration File`}
      description={$localize`Upload your ${protocolName} configuration file (${acceptedExtensions}) or paste the configuration below.`}
    >
      {/* Configuration area with flex layout */}
      <div class="flex flex-col md:flex-row gap-4">
        {/* Combined textarea and drop area */}
        <div class="flex-1 relative">
          <label
            class="block text-sm font-medium mb-2 text-text-secondary dark:text-text-dark-secondary"
            for="config"
          >
            {$localize`Configuration`}
          </label>

          {/* Textarea for configuration */}
          <div 
            class="relative w-full"
            onDragOver$={(e) => { 
              e.preventDefault();
              isDraggingOver.value = true;
            }}
            onDragLeave$={() => { isDraggingOver.value = false }}
            onDrop$={(e) => {
              e.preventDefault();
              isDraggingOver.value = false;
              
              if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.files = e.dataTransfer.files;
                onFileUpload$(new Event('change'), fileInput);
              }
            }}
          >
            <textarea
              id="config"
              name="config"
              rows={8}
              value={configValue}
              onChange$={(_, el) => onConfigChange$(el.value)}
              placeholder={placeholder}
              class="w-full rounded-lg border border-border bg-white px-4 py-3
                    text-text-default placeholder:text-text-muted
                    focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500
                    dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
            />

            {/* Drop overlay that appears when dragging */}
            <div 
              class={`absolute inset-0 rounded-lg flex flex-col items-center justify-center 
                     bg-surface/90 dark:bg-surface-dark/90 border-2 border-dashed border-primary-500
                     transition-opacity duration-200
                     ${isDraggingOver.value ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <svg
                class="h-10 w-10 text-primary-500"
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
              <p class="mt-2 text-sm font-medium text-primary-700 dark:text-primary-300">
                {$localize`Drop ${protocolName} file here to upload`}
              </p>
            </div>
          </div>

          {/* Helper text under textarea */}
          <p class="mt-1.5 text-xs text-text-muted dark:text-text-dark-muted">
            {$localize`You can also drag & drop ${protocolName} files (${acceptedExtensions}) directly into the text area`}
          </p>
        </div>
        
        {/* Action buttons */}
        <div class="flex md:flex-col justify-center gap-3 md:w-auto">
          <label
            class="flex-1 md:flex-initial cursor-pointer rounded-lg bg-primary-500 px-4 py-2.5 text-center text-white
                 transition-colors hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800"
          >
            <span class="inline-flex items-center justify-center">
              <svg
                class="mr-1.5 h-4 w-4"
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
            <input
              id="configFile"
              name="configFile"
              type="file"
              accept={acceptedExtensions}
              class="hidden"
              onChange$={onFileUpload$}
            />
          </label>
          
          <button
            onClick$={handlePaste$}
            class="flex-1 md:flex-initial inline-flex items-center justify-center rounded-lg bg-secondary-500 px-4 py-2.5 text-white
                 transition-colors hover:bg-secondary-600 focus:ring-4 focus:ring-secondary-300 dark:focus:ring-secondary-800"
            type="button"
          >
            <svg
              class="mr-1.5 h-4 w-4"
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
          </button>
        </div>
      </div>
    </FormContainer>
  );
}); 