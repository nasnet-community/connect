import { component$, useTask$ } from "@builder.io/qwik";
import { ErrorMessage } from "../../ErrorMessage";
import type { QRL } from "@builder.io/qwik";
import { usePPTPConfig } from "./usePPTPConfig";

interface PPTPConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const PPTPConfig = component$<PPTPConfigProps>(({ onIsValidChange$, isSaving }) => {
  const {
    serverAddress,
    username,
    password,
    keepaliveTimeout,
    addDefaultRoute,
    usePeerDNS,
    allowMppe,
    mppeRequired,
    mppe128,
    stateful,
    errorMessage,
    handleManualFormSubmit$
  } = usePPTPConfig(onIsValidChange$);

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
              {$localize`Username`} *
            </label>
            <input
              type="text"
              value={username.value}
              onInput$={(_, el) => { 
                username.value = el.value;
                handleManualFormSubmit$();
              }}
              placeholder={$localize`VPN username`}
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
              placeholder={$localize`VPN password`}
              class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
              {$localize`Keepalive Timeout (seconds)`}
            </label>
            <input
              type="text"
              value={keepaliveTimeout.value}
              onInput$={(_, el) => { 
                keepaliveTimeout.value = el.value;
                handleManualFormSubmit$();
              }}
              placeholder="30"
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
        </div>

        <div class="mt-4">
          <p class="mb-2 text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
            {$localize`MPPE Encryption Settings`}
          </p>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="allowMppe"
                checked={allowMppe.value}
                onChange$={(_, el) => {
                  allowMppe.value = el.checked;
                  handleManualFormSubmit$();
                }}
                class="h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-500 dark:border-border-dark"
              />
              <label for="allowMppe" class="ml-2 block text-sm text-text-secondary dark:text-text-dark-secondary">
                {$localize`Allow MPPE Encryption`}
              </label>
            </div>
            
            {allowMppe.value && (
              <>
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="mppeRequired"
                    checked={mppeRequired.value}
                    disabled={!allowMppe.value}
                    onChange$={(_, el) => {
                      mppeRequired.value = el.checked;
                      handleManualFormSubmit$();
                    }}
                    class="h-4 w-4 rounded border-border text-primary-600 disabled:opacity-50 dark:border-border-dark"
                  />
                  <label for="mppeRequired" class="ml-2 block text-sm text-text-secondary dark:text-text-dark-secondary">
                    {$localize`Require MPPE Encryption`}
                  </label>
                </div>
                
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="mppe128"
                    checked={mppe128.value}
                    disabled={!allowMppe.value}
                    onChange$={(_, el) => {
                      mppe128.value = el.checked;
                      handleManualFormSubmit$();
                    }}
                    class="h-4 w-4 rounded border-border text-primary-600 disabled:opacity-50 dark:border-border-dark"
                  />
                  <label for="mppe128" class="ml-2 block text-sm text-text-secondary dark:text-text-dark-secondary">
                    {$localize`Use 128-bit Encryption`}
                  </label>
                </div>
                
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="stateful"
                    checked={stateful.value}
                    disabled={!allowMppe.value}
                    onChange$={(_, el) => {
                      stateful.value = el.checked;
                      handleManualFormSubmit$();
                    }}
                    class="h-4 w-4 rounded border-border text-primary-600 disabled:opacity-50 dark:border-border-dark"
                  />
                  <label for="stateful" class="ml-2 block text-sm text-text-secondary dark:text-text-dark-secondary">
                    {$localize`Stateful Mode`}
                  </label>
                </div>
              </>
            )}
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