import { component$, useTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { useIKEv2Config } from "./useIKEv2Config";
import { FormField, FormContainer, ErrorMessage } from "../../components";

interface IKEv2ConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const IKEv2Config = component$<IKEv2ConfigProps>(
  ({ onIsValidChange$, isSaving }) => {
    const {
      serverAddress,
      username,
      password,
      authMethod,
      presharedKey,
      policyDstAddress,
      phase1HashAlgorithm,
      phase1EncryptionAlgorithm,
      phase1DHGroup,
      phase2HashAlgorithm,
      phase2EncryptionAlgorithm,
      phase2PFSGroup,
      errorMessage,
      handleManualFormSubmit$,
    } = useIKEv2Config(onIsValidChange$);

    useTask$(({ track }) => {
      const saving = track(() => isSaving);
      if (saving) {
        handleManualFormSubmit$();
      }
    });

    return (
      <div class="space-y-6">
        {/* Authentication Method */}
        <FormContainer
          title={$localize`Authentication Method`}
          description={$localize`Select how you want to authenticate with the VPN server`}
          bordered
        >
          <div class="w-full">
            <select
              value={authMethod.value}
              onChange$={(_, el) => {
                authMethod.value = el.value as
                  | "pre-shared-key"
                  | "eap"
                  | "digital-signature";
                handleManualFormSubmit$();
              }}
              class="block w-full rounded-lg border border-border bg-white px-3 py-2
                   focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                   dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
            >
              <option value="pre-shared-key">Pre-Shared Key (PSK)</option>
              <option value="eap">Username/Password (EAP)</option>
              <option value="digital-signature" disabled>
                Certificates (Coming Soon)
              </option>
            </select>
          </div>
        </FormContainer>

        {/* Connection Settings */}
        <FormContainer title={$localize`Connection Settings`} bordered>
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              label={$localize`Server Address`}
              required
              value={serverAddress.value}
              onInput$={(_, el) => {
                serverAddress.value = el.value;
                handleManualFormSubmit$();
              }}
              placeholder="vpn.example.com or IP address"
            />

            {/* Auth-specific fields based on authentication method */}
            {authMethod.value === "pre-shared-key" && (
              <FormField
                type="text"
                label={$localize`Pre-Shared Key`}
                required
                value={presharedKey.value}
                onInput$={(_, el) => {
                  presharedKey.value = el.value;
                  handleManualFormSubmit$();
                }}
              />
            )}
          </div>

          {/* Username and Password fields for EAP */}
          {authMethod.value === "eap" && (
            <div class="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField
                label={$localize`Username`}
                required
                value={username.value}
                onInput$={(_, el) => {
                  username.value = el.value;
                  handleManualFormSubmit$();
                }}
              />

              <FormField
                type="text"
                label={$localize`Password`}
                required
                value={password.value}
                onInput$={(_, el) => {
                  password.value = el.value;
                  handleManualFormSubmit$();
                }}
              />
            </div>
          )}
        </FormContainer>

        {/* Policy Settings */}
        <FormContainer title={$localize`Policy Settings`} bordered>
          <FormField
            label={$localize`Destination Network`}
            required
            value={policyDstAddress.value}
            onInput$={(_, el) => {
              policyDstAddress.value = el.value;
              handleManualFormSubmit$();
            }}
            placeholder="0.0.0.0/0"
          />
        </FormContainer>

        {/* Phase 1 Settings */}
        <FormContainer
          title={$localize`Phase 1 Settings`}
          description={$localize`Configure security parameters for the initial connection`}
          bordered
        >
          <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div>
              <label class="text-text-secondary dark:text-text-dark-secondary block text-sm font-medium">
                {$localize`Hash Algorithm`}
              </label>
              <select
                value={phase1HashAlgorithm.value}
                onChange$={(_, el) => {
                  phase1HashAlgorithm.value = el.value;
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2
                     focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                     dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              >
                <option value="SHA256">SHA256</option>
                <option value="SHA1">SHA1</option>
                <option value="MD5">MD5</option>
              </select>
            </div>

            <div>
              <label class="text-text-secondary dark:text-text-dark-secondary block text-sm font-medium">
                {$localize`Encryption Algorithm`}
              </label>
              <select
                value={phase1EncryptionAlgorithm.value}
                onChange$={(_, el) => {
                  phase1EncryptionAlgorithm.value = el.value;
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2
                     focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                     dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              >
                <option value="AES-256-CBC">AES-256-CBC</option>
                <option value="AES-128-CBC">AES-128-CBC</option>
                <option value="3DES">3DES</option>
              </select>
            </div>

            <div>
              <label class="text-text-secondary dark:text-text-dark-secondary block text-sm font-medium">
                {$localize`DH Group`}
              </label>
              <select
                value={phase1DHGroup.value}
                onChange$={(_, el) => {
                  phase1DHGroup.value = el.value;
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2
                     focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                     dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              >
                <option value="modp2048">DH Group 14 (modp2048)</option>
                <option value="modp1536">DH Group 5 (modp1536)</option>
                <option value="modp1024">DH Group 2 (modp1024)</option>
                <option value="ecp256">DH Group 19 (ecp256)</option>
              </select>
            </div>
          </div>
        </FormContainer>

        {/* Phase 2 Settings */}
        <FormContainer
          title={$localize`Phase 2 Settings`}
          description={$localize`Configure security parameters for the secure communication tunnel`}
          bordered
        >
          <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div>
              <label class="text-text-secondary dark:text-text-dark-secondary block text-sm font-medium">
                {$localize`Hash Algorithm`}
              </label>
              <select
                value={phase2HashAlgorithm.value}
                onChange$={(_, el) => {
                  phase2HashAlgorithm.value = el.value;
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2
                     focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                     dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              >
                <option value="SHA256">SHA256</option>
                <option value="SHA1">SHA1</option>
                <option value="MD5">MD5</option>
              </select>
            </div>

            <div>
              <label class="text-text-secondary dark:text-text-dark-secondary block text-sm font-medium">
                {$localize`Encryption Algorithm`}
              </label>
              <select
                value={phase2EncryptionAlgorithm.value}
                onChange$={(_, el) => {
                  phase2EncryptionAlgorithm.value = el.value;
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2
                     focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                     dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              >
                <option value="AES-256-CBC">AES-256-CBC</option>
                <option value="AES-128-CBC">AES-128-CBC</option>
                <option value="3DES">3DES</option>
              </select>
            </div>

            <div>
              <label class="text-text-secondary dark:text-text-dark-secondary block text-sm font-medium">
                {$localize`PFS Group`}
              </label>
              <select
                value={phase2PFSGroup.value}
                onChange$={(_, el) => {
                  phase2PFSGroup.value = el.value;
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2
                     focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                     dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              >
                <option value="none">None</option>
                <option value="modp2048">DH Group 14 (modp2048)</option>
                <option value="modp1536">DH Group 5 (modp1536)</option>
                <option value="modp1024">DH Group 2 (modp1024)</option>
                <option value="ecp256">DH Group 19 (ecp256)</option>
              </select>
            </div>
          </div>
        </FormContainer>

        {/* Required Fields Note */}
        <p class="text-text-muted dark:text-text-dark-muted text-xs">
          {$localize`Fields marked with * are required`}
        </p>

        {/* Error Message Display */}
        <ErrorMessage message={errorMessage.value} />
      </div>
    );
  },
);
