import { $, component$, type QRL } from "@builder.io/qwik";

export interface ConfigFileInputProps {

  config: string;

  onConfigChange$: QRL<(value: string) => void>;

  onFileUpload$: QRL<(event: Event) => void>;
  
  placeholder?: string;
  

  vpnType?: "OpenVPN" | "Wireguard" | "L2TP" | "PPTP" | "SSTP" | "IKEv2";

  class?: string;
}

export const ConfigFileInput = component$<ConfigFileInputProps>(({
  config,
  onConfigChange$,
  onFileUpload$,
  placeholder,
  vpnType = "Wireguard",
  class: className,
}) => {
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
  
  const handlePaste = $(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onConfigChange$(text);
      }
    } catch (error) {
      console.error('Failed to read clipboard contents:', error);
    }
  });
  
  const acceptFileExtension = vpnType === "OpenVPN" ? ".ovpn,.conf" : ".conf";
  
  return (
    <div class={`space-y-4 ${className || ""}`}>
      <div class="flex space-x-4">
        <textarea
          value={config}
          onChange$={(e, el) => onConfigChange$(el.value)}
          placeholder={placeholder || defaultPlaceholder}
          class="h-48 flex-1 rounded-lg border 
            border-border bg-white px-4 py-2 
            text-text-default placeholder:text-text-muted 
            focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500
            dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
        />
        <div class="flex flex-col justify-center space-y-2">
          <label
            class="cursor-pointer rounded-lg bg-primary-500 px-4 py-2 text-center text-white
                  transition-colors hover:bg-primary-600"
          >
            {$localize`Upload Config`}
            <input
              type="file"
              accept={acceptFileExtension}
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
}); 