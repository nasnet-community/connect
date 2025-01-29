import { component$, type QRL } from "@builder.io/qwik";

interface ConfigInputProps {
  config: string;
  onConfigChange$: QRL<(value: string) => void>;
  onFileUpload$: QRL<(event: Event) => void>;
}

export const ConfigInput = component$<ConfigInputProps>(
  ({ config, onConfigChange$, onFileUpload$ }) => {
    return (
      <div class="space-y-4">
        <div class="flex space-x-4">
          <textarea
            value={config}
            onChange$={(e, currentTarget) =>
              onConfigChange$(currentTarget.value)
            }
            placeholder={$localize`Please enter your Wireguard VPN configuration`}
            class="text-text-default focus:ring-primary-500 h-48 flex-1 rounded-lg border 
            border-border bg-white
            px-4 py-2
            placeholder:text-text-muted focus:ring-2
            dark:border-border-dark dark:bg-surface-dark
            dark:text-text-dark-default"
          />
          <div class="flex flex-col justify-center">
            <label
              class="cursor-pointer rounded-lg bg-primary-500 px-4 py-2 text-white
                    transition-colors hover:bg-primary-600"
            >
              {$localize`Upload Config`}
              <input
                type="file"
                accept=".conf"
                class="hidden"
                onChange$={onFileUpload$}
              />
            </label>
          </div>
        </div>
      </div>
    );
  },
);
