import { $, component$, useSignal } from "@builder.io/qwik";
import type { ConfigFileInputProps, FileUploadError } from "../types";
import { FileInputError } from "../FileInputError";
import { FileInputSkeleton } from "../FileInputSkeleton";
import { FileTypeIcon } from "../FileTypeIcon";

/**
 * ConfigFileInput Component
 * 
 * A streamlined file input component for VPN configuration files with enhanced
 * error handling, validation, and accessibility features.
 */
export const ConfigFileInput = component$<ConfigFileInputProps>(
  ({
    config,
    onConfigChange$,
    onFileUpload$,
    placeholder,
    vpnType = "Wireguard",
    class: className,
    disabled = false,
    isLoading = false,
    error = null,
    maxFileSize = 5 * 1024 * 1024, // 5MB default
    validationOptions,
    showCharCount = false,
    autoResize = false,
    testId,
  }) => {
    const localError = useSignal<FileUploadError | null>(error);
    const isValidating = useSignal(false);
    const textareaRef = useSignal<HTMLTextAreaElement>();
    // Auto-resize textarea based on content
    const adjustTextareaHeight = $(() => {
      if (autoResize && textareaRef.value) {
        textareaRef.value.style.height = 'auto';
        textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
      }
    });

    const defaultPlaceholder = (() => {
      switch (vpnType) {
        case "OpenVPN":
          return $localize`Paste your OpenVPN configuration here. The file should include directives like 'remote', 'proto', 'dev', etc.`;
        case "L2TP":
          return $localize`Paste your L2TP configuration here.`;
        case "PPTP":
          return $localize`Paste your PPTP configuration here.`;
        case "SSTP":
          return $localize`Paste your SSTP configuration here.`;
        case "IKEv2":
          return $localize`Paste your IKEv2 configuration here.`;
        case "Wireguard":
        default:
          return $localize`Paste your Wireguard configuration here. The file should include [Interface] and [Peer] sections.`;
      }
    })();

    const validateFileSize = $((file: File): boolean => {
      if (file.size > maxFileSize) {
        localError.value = {
          type: "FILE_TOO_LARGE",
          message: $localize`File size exceeds ${Math.round(maxFileSize / 1024 / 1024)}MB limit`,
          details: $localize`File size: ${Math.round(file.size / 1024)}KB`,
          retryable: false,
        };
        return false;
      }
      return true;
    });

    const validateConfigFormat = $(async (content: string): Promise<boolean> => {
      if (!validationOptions?.validateFormat) return true;
      
      isValidating.value = true;
      try {
        // Basic format validation based on VPN type
        let isValid = true;
        const errors: string[] = [];
        
        switch (vpnType) {
          case "Wireguard":
            if (!content.includes("[Interface]") || !content.includes("[Peer]")) {
              errors.push($localize`Missing required [Interface] or [Peer] sections`);
              isValid = false;
            }
            break;
          case "OpenVPN":
            if (!content.includes("remote") && !content.includes("client")) {
              errors.push($localize`Missing required OpenVPN directives`);
              isValid = false;
            }
            break;
          // Add more validation for other VPN types
        }
        
        if (!isValid) {
          localError.value = {
            type: "VALIDATION_ERROR",
            message: $localize`Invalid ${vpnType} configuration format`,
            details: errors.join(", "),
            retryable: false,
          };
        }
        
        return isValid;
      } finally {
        isValidating.value = false;
      }
    });

    const handleConfigChange = $(async (value: string) => {
      localError.value = null;
      onConfigChange$(value);
      
      if (autoResize) {
        await adjustTextareaHeight();
      }
      
      if (validationOptions?.validateFormat && value) {
        await validateConfigFormat(value);
      }
    });

    const handlePaste = $(async () => {
      if (disabled || isLoading) return;
      
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          await handleConfigChange(text);
        }
      } catch (err) {
        localError.value = {
          type: "READ_ERROR",
          message: $localize`Failed to read clipboard contents`,
          details: $localize`Please check clipboard permissions`,
          retryable: true,
        };
      }
    });

    const handleFileUpload = $(async (event: Event) => {
      if (disabled || isLoading) return;
      
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      
      if (!file) return;
      
      // Validate file size
      if (!validateFileSize(file)) return;
      
      localError.value = null;
      
      try {
        // Read file content
        const reader = new FileReader();
        reader.onload = async (e) => {
          const content = e.target?.result as string;
          await handleConfigChange(content);
        };
        reader.onerror = () => {
          localError.value = {
            type: "READ_ERROR",
            message: $localize`Failed to read file`,
            details: reader.error?.message,
            retryable: true,
          };
        };
        reader.readAsText(file);
        
        // Call the original handler
        onFileUpload$(event);
      } catch (err) {
        localError.value = {
          type: "UNKNOWN_ERROR",
          message: $localize`An unexpected error occurred`,
          details: err instanceof Error ? err.message : String(err),
          retryable: true,
        };
      }
    });

    const acceptFileExtension = vpnType === "OpenVPN" ? ".ovpn,.conf" : ".conf";
    
    // Show loading skeleton if requested
    if (isLoading) {
      return <FileInputSkeleton variant="simple" animate={true} />;
    }

    return (
      <div class={`space-y-4 ${className || ""}`} data-testid={testId}>
        <div class="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:gap-5">
          <div class="relative flex-1">
            <textarea
              ref={textareaRef}
              value={config}
              onChange$={(e, el) => handleConfigChange(el.value)}
              placeholder={placeholder || defaultPlaceholder}
              disabled={disabled || isValidating.value}
              class={`bg-surface-light dark:bg-surface-dark h-32 w-full resize-none rounded-lg 
              border px-3 py-2.5 
              text-sm text-gray-900
              placeholder-gray-400 transition-all
              duration-200 focus:outline-none
              focus:ring-2 sm:h-40 
              sm:px-4 sm:py-3
              sm:text-base
              lg:h-48 dark:text-gray-100 dark:placeholder-gray-500
              ${disabled || isValidating.value 
                ? "cursor-not-allowed opacity-60 border-gray-200 dark:border-gray-700" 
                : "border-gray-200 hover:border-gray-300 focus:border-primary-500 focus:ring-primary-500/20 dark:border-gray-700 dark:hover:border-gray-600 dark:focus:border-primary-400 dark:focus:ring-primary-400/20"}
              ${localError.value ? "border-error-500 dark:border-error-400" : ""}
              ${autoResize ? "overflow-hidden" : ""}
            `}
              aria-label={$localize`${vpnType} configuration input`}
              aria-invalid={!!localError.value}
              aria-describedby={localError.value ? "config-error" : showCharCount ? "char-count" : undefined}
            />
            
            {/* Character count */}
            {showCharCount && (
              <div id="char-count" class="absolute bottom-2 end-2 text-xs text-gray-500 dark:text-gray-400">
                {config.length} {$localize`characters`}
              </div>
            )}
            
            {/* Validation indicator */}
            {isValidating.value && (
              <div class="absolute top-2 end-2">
                <div class="h-4 w-4 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
              </div>
            )}
          </div>
          
          <div class="flex gap-2 sm:gap-3 lg:flex-col lg:justify-center">
            <label
              class={`flex flex-1 items-center justify-center rounded-lg 
                  px-3 py-2 text-sm font-medium text-white
                  shadow-sm transition-all duration-200
                  focus-within:outline-none focus-within:ring-2
                  focus-within:ring-offset-2 
                  sm:px-4 sm:py-2.5
                  sm:text-base lg:flex-initial
                  lg:px-5
                  ${disabled || isLoading
                    ? "cursor-not-allowed opacity-60 bg-gray-400 dark:bg-gray-600"
                    : "cursor-pointer bg-primary-500 hover:bg-primary-600 hover:shadow-md active:scale-[0.98] dark:bg-primary-600 dark:hover:bg-primary-700 focus-within:ring-primary-500 dark:focus-within:ring-primary-400 dark:focus-within:ring-offset-gray-900"
                  }
              `}
              tabIndex={disabled || isLoading ? -1 : 0}
            >
              <FileTypeIcon fileType={vpnType} size="sm" class="mr-1.5 sm:mr-2" />
              {$localize`Upload`}
              <input
                type="file"
                accept={acceptFileExtension}
                class="sr-only"
                disabled={disabled || isLoading}
                onChange$={handleFileUpload}
                aria-label={$localize`Upload ${vpnType} configuration file`}
              />
            </label>
            <button
              onClick$={handlePaste}
              disabled={disabled || isLoading}
              class={`flex flex-1 items-center justify-center rounded-lg 
                  px-3 py-2 text-sm font-medium text-white
                  shadow-sm transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  sm:px-4 sm:py-2.5
                  sm:text-base lg:flex-initial
                  lg:px-5
                  ${disabled || isLoading
                    ? "cursor-not-allowed opacity-60 bg-gray-400 dark:bg-gray-600"
                    : "bg-secondary-500 hover:bg-secondary-600 hover:shadow-md active:scale-[0.98] dark:bg-secondary-600 dark:hover:bg-secondary-700 focus:ring-secondary-500 dark:focus:ring-secondary-400 dark:focus:ring-offset-gray-900"
                  }
              `}
              type="button"
              aria-label={$localize`Paste configuration from clipboard`}
            >
              <svg
                class="mr-1.5 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              {$localize`Paste`}
            </button>
          </div>
        </div>
        
        {/* Error display */}
        {localError.value && (
          <FileInputError
            error={localError.value}
            onRetry$={localError.value.type === "READ_ERROR" ? handlePaste : undefined}
            onDismiss$={() => (localError.value = null)}
            variant="inline"
          />
        )}
      </div>
    );
  },
);
