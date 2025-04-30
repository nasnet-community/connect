import { component$, useTask$ } from "@builder.io/qwik";
import { ErrorMessage } from "../../ErrorMessage";
import { useIKEv2Config } from "./useIKEv2Config";
import type { QRL } from "@builder.io/qwik";

interface IKEv2ConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const IKEv2Config = component$<IKEv2ConfigProps>(({ onIsValidChange$, isSaving }) => {
  const {
    serverAddress,
    username,
    password,
    authMethod,
    presharedKey,
    policySrcAddress,
    policyDstAddress,
    phase1HashAlgorithm,
    phase1EncryptionAlgorithm,
    phase1DHGroup,
    phase2HashAlgorithm,
    phase2EncryptionAlgorithm,
    phase2PFSGroup,
    errorMessage,
    handleManualFormSubmit$
  } = useIKEv2Config(onIsValidChange$);

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
        <div class="mb-4">
          <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
            {$localize`Authentication Method`} *
          </label>
          <select
            value={authMethod.value}
            onChange$={(_, el) => { 
              authMethod.value = el.value as "psk" | "eap" | "certificate";
              handleManualFormSubmit$();
            }}
            class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
          >
            <option value="psk">Pre-Shared Key (PSK)</option>
            <option value="eap">Username/Password (EAP)</option>
            <option value="certificate" disabled>Certificates (Coming Soon)</option>
          </select>
        </div>

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

          {/* Auth-specific fields */}
          {authMethod.value === "psk" && (
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Pre-Shared Key`} *
              </label>
              <input
                type="password"
                value={presharedKey.value}
                onInput$={(_, el) => { 
                  presharedKey.value = el.value;
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
            </div>
          )}

          {authMethod.value === "eap" && (
            <>
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
            </>
          )}
        </div>

        <div class="mt-4">
          <p class="mb-2 text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
            {$localize`Policy Settings`}
          </p>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Source Address`}
              </label>
              <input
                type="text"
                value={policySrcAddress.value}
                onInput$={(_, el) => { 
                  policySrcAddress.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="Optional"
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Destination Address`} *
              </label>
              <input
                type="text"
                value={policyDstAddress.value}
                onInput$={(_, el) => { 
                  policyDstAddress.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="0.0.0.0/0"
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              />
            </div>
          </div>
        </div>

        <div class="mt-4">
          <p class="mb-2 text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
            {$localize`Phase 1 Settings`}
          </p>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Hash Algorithm`}
              </label>
              <select
                value={phase1HashAlgorithm.value}
                onChange$={(_, el) => { 
                  phase1HashAlgorithm.value = el.value;
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              >
                <option value="SHA256">SHA256</option>
                <option value="SHA1">SHA1</option>
                <option value="MD5">MD5</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Encryption Algorithm`}
              </label>
              <select
                value={phase1EncryptionAlgorithm.value}
                onChange$={(_, el) => { 
                  phase1EncryptionAlgorithm.value = el.value;
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              >
                <option value="AES-256-CBC">AES-256-CBC</option>
                <option value="AES-128-CBC">AES-128-CBC</option>
                <option value="3DES">3DES</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`DH Group`}
              </label>
              <select
                value={phase1DHGroup.value}
                onChange$={(_, el) => { 
                  phase1DHGroup.value = el.value;
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              >
                <option value="modp2048">DH Group 14 (modp2048)</option>
                <option value="modp1536">DH Group 5 (modp1536)</option>
                <option value="modp1024">DH Group 2 (modp1024)</option>
                <option value="ecp256">DH Group 19 (ecp256)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <p class="mb-2 text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
            {$localize`Phase 2 Settings`}
          </p>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Hash Algorithm`}
              </label>
              <select
                value={phase2HashAlgorithm.value}
                onChange$={(_, el) => { 
                  phase2HashAlgorithm.value = el.value;
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              >
                <option value="SHA256">SHA256</option>
                <option value="SHA1">SHA1</option>
                <option value="MD5">MD5</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`Encryption Algorithm`}
              </label>
              <select
                value={phase2EncryptionAlgorithm.value}
                onChange$={(_, el) => { 
                  phase2EncryptionAlgorithm.value = el.value;
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              >
                <option value="AES-256-CBC">AES-256-CBC</option>
                <option value="AES-128-CBC">AES-128-CBC</option>
                <option value="3DES">3DES</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                {$localize`PFS Group`}
              </label>
              <select
                value={phase2PFSGroup.value}
                onChange$={(_, el) => { 
                  phase2PFSGroup.value = el.value;
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              >
                <option value="none">None</option>
                <option value="modp2048">DH Group 14 (modp2048)</option>
                <option value="modp1536">DH Group 5 (modp1536)</option>
                <option value="modp1024">DH Group 2 (modp1024)</option>
                <option value="ecp256">DH Group 19 (ecp256)</option>
              </select>
            </div>
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