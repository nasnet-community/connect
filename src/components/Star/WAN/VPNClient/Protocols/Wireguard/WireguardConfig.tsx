import { component$, useTask$ } from "@builder.io/qwik";
import { ConfigInput } from "../../ConfigInput";
import { ErrorMessage } from "../../ErrorMessage";
import { useWireguardConfig } from "./useWireguardConfig";
import type { QRL } from "@builder.io/qwik";

interface WireguardConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const WireguardConfig = component$<WireguardConfigProps>(({ onIsValidChange$, isSaving }) => {
  const {
    config,
    errorMessage,
    configMethod,
    privateKey,
    publicKey,
    allowedIPs,
    serverAddress,
    serverPort,
    address,
    dns,
    mtu,
    preSharedKey,
    persistentKeepalive,
    handleConfigChange$,
    handleManualFormSubmit$,
    handleFileUpload$,
    setConfigMethod$
  } = useWireguardConfig(onIsValidChange$);

  // Watch for isSaving changes and trigger form submission when true
  useTask$(({ track }) => {
    const saving = track(() => isSaving);
    if (saving) {
      handleManualFormSubmit$();
    }
  });

  return (
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button
          onClick$={() => setConfigMethod$("file")}
          class={{
            "px-4 py-2 rounded-lg font-medium": true,
            "bg-primary-600 text-white": configMethod.value === "file",
            "bg-surface-dark border border-border text-text-secondary": configMethod.value !== "file"
          }}
        >
          {$localize`Upload/Paste Config`}
        </button>
        <button
          onClick$={() => setConfigMethod$("manual")}
          class={{
            "px-4 py-2 rounded-lg font-medium": true,
            "bg-primary-600 text-white": configMethod.value === "manual",
            "bg-surface-dark border border-border text-text-secondary": configMethod.value !== "manual"
          }}
        >
          {$localize`Manual Configuration`}
        </button>
      </div>

      {configMethod.value === "file" && (
        <div class="space-y-4">
          <ConfigInput
            config={config.value}
            onConfigChange$={handleConfigChange$}
            onFileUpload$={handleFileUpload$}
            vpnType="Wireguard"
            placeholder={$localize`Paste your Wireguard configuration here. It should include [Interface] and [Peer] sections.`}
          />
        </div>
      )}

      {configMethod.value === "manual" && (
        <div class="space-y-4 rounded-lg border border-border p-4 dark:border-border-dark">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Private Key`} *
              </label>
              <input
                type="password"
                value={privateKey.value}
                onInput$={(_, el) => { 
                  privateKey.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="Interface private key"
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Public Key`} *
              </label>
              <input
                type="text"
                value={publicKey.value}
                onInput$={(_, el) => { 
                  publicKey.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="Peer public key"
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Server Address`} *
              </label>
              <input
                type="text"
                value={serverAddress.value}
                onInput$={(_, el) => { 
                  serverAddress.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="vpn.example.com or IP address"
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Server Port`} *
              </label>
              <input
                type="text"
                value={serverPort.value}
                onInput$={(_, el) => { 
                  serverPort.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="51820"
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Allowed IPs`} *
              </label>
              <input
                type="text"
                value={allowedIPs.value}
                onInput$={(_, el) => { 
                  allowedIPs.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="0.0.0.0/0"
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Interface Address`} *
              </label>
              <input
                type="text"
                value={address.value}
                onInput$={(_, el) => { 
                  address.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="10.0.0.2/24"
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`DNS`}
              </label>
              <input
                type="text"
                value={dns.value}
                onInput$={(_, el) => { 
                  dns.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="8.8.8.8, 1.1.1.1"
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`MTU`}
              </label>
              <input
                type="text"
                value={mtu.value}
                onInput$={(_, el) => { 
                  mtu.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="1420"
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Pre-shared Key`}
              </label>
              <input
                type="password"
                value={preSharedKey.value}
                onInput$={(_, el) => { 
                  preSharedKey.value = el.value;
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Persistent Keepalive`}
              </label>
              <input
                type="text"
                value={persistentKeepalive.value}
                onInput$={(_, el) => { 
                  persistentKeepalive.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="25"
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
              <p class="mt-1 text-xs text-text-muted dark:text-text-dark-muted">
                {$localize`Seconds between keepalive packets. Usually set to 25 seconds.`}
              </p>
            </div>
          </div>
          
          <p class="text-xs text-text-muted dark:text-text-dark-muted">
            {$localize`Fields marked with * are required`}
          </p>
        </div>
      )}

      <ErrorMessage message={errorMessage.value} />
    </div>
  );
}); 