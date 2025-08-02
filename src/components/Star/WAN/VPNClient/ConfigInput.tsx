import { $, component$, type QRL } from "@builder.io/qwik";

interface ConfigInputProps {
  config: string;
  onConfigChange$: QRL<(value: string) => void>;
  onFileUpload$: QRL<(event: Event) => void>;
  placeholder?: string;
  vpnType?: "OpenVPN" | "Wireguard";
}

export const ConfigInput = component$<ConfigInputProps>(
  ({
    config,
    onConfigChange$,
    onFileUpload$,
    placeholder,
    vpnType = "Wireguard",
  }) => {
    const defaultPlaceholder =
      vpnType === "OpenVPN"
        ? $localize`Paste your OpenVPN configuration here. The file should include directives like 'remote', 'proto', 'dev', etc.`
        : $localize`Paste your Wireguard configuration here. The file should include [Interface] and [Peer] sections.`;

    const handlePaste = $(async () => {
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
            value={config}
            onChange$={(e, currentTarget) =>
              onConfigChange$(currentTarget.value)
            }
            placeholder={placeholder || defaultPlaceholder}
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
              {$localize`Upload Config`}
              <input
                type="file"
                accept={vpnType === "OpenVPN" ? ".ovpn,.conf" : ".conf"}
                class="hidden"
                onChange$={onFileUpload$}
              />
            </label>
            <button
              onClick$={handlePaste}
              class="rounded-lg bg-secondary-500 px-4 py-2 text-center text-white
                    transition-colors hover:bg-secondary-600"
            >
              {$localize`Paste Config`}
            </button>
          </div>
        </div>
      </div>
    );
  },
);
