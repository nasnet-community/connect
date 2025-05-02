import { component$, useTask$ } from "@builder.io/qwik";
import { ConfigInput } from "../../ConfigInput";
import { ErrorMessage } from "../../ErrorMessage";
import type { QRL } from "@builder.io/qwik";
import { useOpenVPNConfig } from "./useOpenVPNConfig";

interface OpenVPNConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const OpenVPNConfig = component$<OpenVPNConfigProps>(({ onIsValidChange$, isSaving }) => {
  const {
    config,
    configMethod,
    serverAddress,
    serverPort,
    protocol,
    authType,
    username,
    password,
    cipher,
    auth,
    compLZO,
    remoteRandomize,
    floatType,
    errorMessage,
    handleConfigChange$,
    handleManualFormSubmit$,
    handleFileUpload$
  } = useOpenVPNConfig(onIsValidChange$);

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
          onClick$={() => configMethod.value = "file"}
          class={{
            "px-4 py-2 rounded-lg font-medium": true,
            "bg-primary-600 text-white": configMethod.value === "file",
            "bg-surface-dark border border-border text-text-secondary": configMethod.value !== "file"
          }}
        >
          {$localize`Upload/Paste Config`}
        </button>
        <button
          onClick$={() => configMethod.value = "manual"}
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
          <p class="text-sm text-text-muted dark:text-text-dark-muted">
            {$localize`Upload your OpenVPN configuration file (.ovpn or .conf) or paste the configuration below.`}
          </p>
          <ConfigInput
            config={config.value}
            onConfigChange$={handleConfigChange$}
            onFileUpload$={handleFileUpload$}
            vpnType="OpenVPN"
            placeholder={$localize`Paste your OpenVPN configuration here. It should include directives like 'remote', 'proto', 'dev', etc.`}
          />
        </div>
      )}

      {configMethod.value === "manual" && (
        <div class="space-y-4 rounded-lg border border-border p-4 dark:border-border-dark">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                placeholder="1194"
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Protocol`} *
              </label>
              <div class="mt-1 flex space-x-4">
                <label class="flex items-center">
                  <input
                    type="radio"
                    checked={protocol.value === "udp"}
                    onChange$={() => {
                      protocol.value = "udp";
                      handleManualFormSubmit$();
                    }}
                    class="h-4 w-4 border-border text-primary-600 focus:ring-primary-500 dark:border-border-dark"
                  />
                  <span class="ml-2 text-sm text-text-secondary dark:text-text-dark-secondary">UDP</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    checked={protocol.value === "tcp"}
                    onChange$={() => {
                      protocol.value = "tcp";
                      handleManualFormSubmit$();
                    }}
                    class="h-4 w-4 border-border text-primary-600 focus:ring-primary-500 dark:border-border-dark"
                  />
                  <span class="ml-2 text-sm text-text-secondary dark:text-text-dark-secondary">TCP</span>
                </label>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Authentication Type`} *
              </label>
              <select
                value={authType.value}
                onChange$={(_, el) => {
                  authType.value = el.value as "credentials" | "certificates" | "both";
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              >
                <option value="credentials">{$localize`Username/Password`}</option>
                <option value="certificates">{$localize`Certificates`}</option>
                <option value="both">{$localize`Username/Password & Certificates`}</option>
              </select>
            </div>
          </div>
          
          {(authType.value === "credentials" || authType.value === "both") && (
            <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                  {$localize`Username`} *
                </label>
                <input
                  type="text"
                  value={username.value}
                  onInput$={(_, el) => { 
                    username.value = el.value;
                    handleManualFormSubmit$();
                  }}
                  class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                  {$localize`Password`} *
                </label>
                <input
                  type="password"
                  value={password.value}
                  onInput$={(_, el) => { 
                    password.value = el.value;
                    handleManualFormSubmit$();
                  }}
                  class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                />
              </div>
            </div>
          )}
          
          {(authType.value === "certificates" || authType.value === "both") && (
            <div class="mt-4">
              <p class="mb-2 text-sm text-text-muted dark:text-text-dark-muted">
                {$localize`For certificate-based authentication, certificates must be added in the router's certificate store.`}
              </p>
            </div>
          )}
          
          <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Cipher`}
              </label>
              <input
                type="text"
                value={cipher.value}
                onInput$={(_, el) => { 
                  cipher.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="AES-256-CBC"
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Auth`}
              </label>
              <input
                type="text"
                value={auth.value}
                onInput$={(_, el) => { 
                  auth.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="SHA256"
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
            </div>
          </div>
          
          <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="compLZO"
                checked={compLZO.value}
                onChange$={(_, el) => {
                  compLZO.value = el.checked;
                  handleManualFormSubmit$();
                }}
                class="h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-500 dark:border-border-dark"
              />
              <label for="compLZO" class="ml-2 block text-sm text-text-secondary dark:text-text-dark-secondary">
                {$localize`Use Compression (comp-lzo)`}
              </label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="remoteRandomize"
                checked={remoteRandomize.value}
                onChange$={(_, el) => {
                  remoteRandomize.value = el.checked;
                  handleManualFormSubmit$();
                }}
                class="h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-500 dark:border-border-dark"
              />
              <label for="remoteRandomize" class="ml-2 block text-sm text-text-secondary dark:text-text-dark-secondary">
                {$localize`Use Remote Randomize`}
              </label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="floatType"
                checked={floatType.value}
                onChange$={(_, el) => {
                  floatType.value = el.checked;
                  handleManualFormSubmit$();
                }}
                class="h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-500 dark:border-border-dark"
              />
              <label for="floatType" class="ml-2 block text-sm text-text-secondary dark:text-text-dark-secondary">
                {$localize`Float`}
              </label>
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