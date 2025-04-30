import { component$, useTask$ } from "@builder.io/qwik";
import { ErrorMessage } from "../../ErrorMessage";
import type { QRL } from "@builder.io/qwik";
import { useSSTPConfig } from "./useSSTPConfig";

interface SSTPConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const SSTPConfig = component$<SSTPConfigProps>(({ onIsValidChange$, isSaving }) => {
  const {
    serverAddress,
    username,
    password,
    port,
    addDefaultRoute,
    usePeerDNS,
    verifyServerCertificate,
    tlsVersion,
    errorMessage,
    handleManualFormSubmit$
  } = useSSTPConfig(onIsValidChange$);

  // Watch for isSaving changes and trigger form submission when true
  useTask$(({ track }) => {
    const saving = track(() => isSaving);
    if (saving) {
      handleManualFormSubmit$();
    }
  });

  return (
    <div class="space-y-6">
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
              {$localize`Port`}
            </label>
            <input
              type="text"
              value={port.value}
              onInput$={(_, el) => { 
                port.value = el.value;
                handleManualFormSubmit$();
              }}
              placeholder="443"
              class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
            />
          </div>
          
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

        <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="addDefaultRoute"
              checked={addDefaultRoute.value}
              onChange$={(_, el) => {
                addDefaultRoute.value = el.checked;
                handleManualFormSubmit$();
              }}
              class="h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-500 dark:border-border-dark"
            />
            <label for="addDefaultRoute" class="ml-2 block text-sm text-text-secondary dark:text-text-dark-secondary">
              {$localize`Add Default Route`}
            </label>
          </div>
          
          <div class="flex items-center">
            <input
              type="checkbox"
              id="usePeerDNS"
              checked={usePeerDNS.value}
              onChange$={(_, el) => {
                usePeerDNS.value = el.checked;
                handleManualFormSubmit$();
              }}
              class="h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-500 dark:border-border-dark"
            />
            <label for="usePeerDNS" class="ml-2 block text-sm text-text-secondary dark:text-text-dark-secondary">
              {$localize`Use Peer DNS`}
            </label>
          </div>
          
          <div class="flex items-center">
            <input
              type="checkbox"
              id="verifyServerCertificate"
              checked={verifyServerCertificate.value}
              onChange$={(_, el) => {
                verifyServerCertificate.value = el.checked;
                handleManualFormSubmit$();
              }}
              class="h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-500 dark:border-border-dark"
            />
            <label for="verifyServerCertificate" class="ml-2 block text-sm text-text-secondary dark:text-text-dark-secondary">
              {$localize`Verify Server Certificate`}
            </label>
          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
            {$localize`TLS Version`}
          </label>
          <select
            value={tlsVersion.value}
            onChange$={(_, el) => { 
              tlsVersion.value = el.value as any;
              handleManualFormSubmit$();
            }}
            class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
          >
            <option value="any">{$localize`Any`}</option>
            <option value="only-1.2">{$localize`TLS 1.2 Only`}</option>
            <option value="only-1.3">{$localize`TLS 1.3 Only`}</option>
          </select>
        </div>
        
        <p class="text-xs text-text-muted dark:text-text-dark-muted">
          {$localize`Fields marked with * are required`}
        </p>
      </div>

      <ErrorMessage message={errorMessage.value} />
    </div>
  );
}); 