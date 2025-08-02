import { component$, type QRL } from "@builder.io/qwik";
import {
  HiDocumentTextOutline,
  HiArrowUpTrayOutline,
} from "@qwikest/icons/heroicons";

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
    placeholder = $localize`Paste the configuration here...`,
  }) => {
    return (
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <HiDocumentTextOutline class="h-5 w-5 text-primary-500 dark:text-primary-400" />
          <h3 class="text-md text-text-default font-medium dark:text-text-dark-default">
            {$localize`${protocolName} Configuration`}
          </h3>
        </div>

        <div class="relative">
          <textarea
            value={configValue}
            onInput$={async (event) => {
              const target = event.target as HTMLTextAreaElement;
              await onConfigChange$(target.value);
            }}
            placeholder={placeholder}
            class="text-text-default dark:placeholder-text-dark-muted block w-full rounded-lg border border-border bg-white p-2.5
                 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-border-dark
                 dark:bg-surface-dark dark:text-text-dark-default dark:focus:border-primary-500 dark:focus:ring-primary-500"
            rows={8}
          />
        </div>

        <div class="flex flex-col items-center">
          <div class="mb-2 flex w-full items-center justify-center">
            <div class="h-px flex-1 bg-border dark:bg-border-dark"></div>
            <span class="text-text-muted dark:text-text-dark-muted mx-4 text-sm">{$localize`OR`}</span>
            <div class="h-px flex-1 bg-border dark:bg-border-dark"></div>
          </div>

          <label class="text-text-default hover:bg-surface-lighter dark:hover:bg-surface-dark-lighter flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-medium dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default">
            <HiArrowUpTrayOutline class="h-5 w-5" />
            {$localize`Upload ${protocolName} Config File`}
            <input
              type="file"
              accept={acceptedExtensions}
              class="hidden"
              onChange$={onFileUpload$}
            />
          </label>
        </div>
      </div>
    );
  },
);
