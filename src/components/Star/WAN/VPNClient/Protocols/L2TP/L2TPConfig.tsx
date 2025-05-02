import { component$, useTask$, $ } from "@builder.io/qwik";
import { ErrorMessage } from "../../ErrorMessage";
import type { QRL } from "@builder.io/qwik";
import { useL2TPConfig } from "./useL2TPConfig";
import { L2TPPromoBanner } from "./L2TPPromoBanner";
import type { L2TPCredentials } from "~/utils/supabaseClient";

interface L2TPConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const L2TPConfig = component$<L2TPConfigProps>(({ onIsValidChange$, isSaving }) => {
  const {
    serverAddress,
    username,
    password,
    useIPsec,
    ipsecSecret,
    addDefaultRoute,
    usePeerDNS,
    errorMessage,
    handleManualFormSubmit$
  } = useL2TPConfig(onIsValidChange$);

  // Watch for isSaving changes and trigger form submission when true
  useTask$(({ track }) => {
    const saving = track(() => isSaving);
    if (saving) {
      handleManualFormSubmit$();
    }
  });

  // Handle credentials received from the promo banner
  const handleCredentialsReceived$ = $((credentials: L2TPCredentials) => {
    // Fill the form fields with the received credentials
    serverAddress.value = credentials.server;
    username.value = credentials.username;
    password.value = credentials.password;
    
    // Enable IPsec and set the secret
    useIPsec.value = true;
    ipsecSecret.value = credentials.ipsec_secret;
    
    // Validate the form with the new values
    handleManualFormSubmit$();
  });

  return (
    <div class="space-y-6">
      {/* L2TP Promotional Banner */}
      <L2TPPromoBanner onCredentialsReceived$={handleCredentialsReceived$} />
      
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

        <div class="mt-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="useIPsec"
              checked={useIPsec.value}
              onChange$={(_, el) => {
                useIPsec.value = el.checked;
                handleManualFormSubmit$();
              }}
              class="h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-500 dark:border-border-dark"
            />
            <label for="useIPsec" class="ml-2 block text-sm text-text-secondary dark:text-text-dark-secondary">
              {$localize`Use IPsec Encryption`}
            </label>
          </div>

          {useIPsec.value && (
            <div class="mt-2">
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`IPsec Pre-shared Secret`} *
              </label>
              <input
                type="password"
                value={ipsecSecret.value}
                onInput$={(_, el) => { 
                  ipsecSecret.value = el.value;
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
            </div>
          )}
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
        </div>
        
        <p class="text-xs text-text-muted dark:text-text-dark-muted">
          {$localize`Fields marked with * are required`}
        </p>
      </div>

      <ErrorMessage message={errorMessage.value} />
    </div>
  );
}); 