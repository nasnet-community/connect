import { component$, $, type QRL } from "@builder.io/qwik";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export interface VPNConfigFileSectionProps {
  protocolName: string;
  acceptedExtensions: string;
  configValue: string;
  onConfigChange$: QRL<(value: string) => Promise<void>>;
  onFileUpload$: QRL<(event: Event) => Promise<void>>;
  placeholder?: string;
}

export const VPNConfigFileSection = component$<VPNConfigFileSectionProps>(
  ({
    protocolName,
    acceptedExtensions,
    configValue,
    onConfigChange$,
    onFileUpload$,
    placeholder = "",
  }) => {
    const locale = useMessageLocale();

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

    return (
      <div class="space-y-4">
        <div class="flex space-x-4">
          <textarea
            value={configValue}
            onInput$={(_, currentTarget) =>
              onConfigChange$(currentTarget.value)
            }
            placeholder={placeholder}
            class="text-text-default placeholder:text-text-muted h-48 flex-1 rounded-lg border 
          border-border bg-white
          px-4 py-2
          focus:ring-2 focus:ring-primary-500
          dark:border-border-dark dark:bg-surface-dark
          dark:text-text-dark-default"
          />
          <div class="flex flex-col justify-center space-y-2">
            <label
              class="cursor-pointer rounded-lg bg-primary-500 px-4 py-2 text-center text-white
                  transition-colors hover:bg-primary-600"
            >
              {semanticMessages.vpn_config_file_section_upload({}, { locale })}
              <input
                type="file"
                accept={acceptedExtensions}
                class="hidden"
                onChange$={onFileUpload$}
              />
            </label>
            <button
              onClick$={handlePaste$}
              class="rounded-lg bg-secondary-500 px-4 py-2 text-center text-white
                  transition-colors hover:bg-secondary-600"
            >
              {semanticMessages.vpn_config_file_section_paste({}, { locale })}
            </button>
          </div>
        </div>
        <div class="text-text-muted dark:text-text-dark-muted text-sm">
          {semanticMessages.vpn_config_file_section_simple_helper(
            { protocolName },
            { locale },
          )}
        </div>
      </div>
    );
  },
);
