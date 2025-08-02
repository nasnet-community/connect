import { component$, useTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { useSSTPConfig } from "./useSSTPConfig";
import {
  FormField,
  FormContainer,
  Switch,
  ErrorMessage,
} from "../../components";

interface SSTPConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const SSTPConfig = component$<SSTPConfigProps>(
  ({ onIsValidChange$, isSaving }) => {
    const {
      serverAddress,
      username,
      password,
      port,
      verifyServerCertificate,
      tlsVersion,
      errorMessage,
      handleManualFormSubmit$,
    } = useSSTPConfig(onIsValidChange$);

    useTask$(({ track }) => {
      const saving = track(() => isSaving);
      if (saving) {
        handleManualFormSubmit$();
      }
    });

    return (
      <div class="space-y-6">
        {/* Connection Settings */}
        <FormContainer
          title={$localize`Connection Settings`}
          description={$localize`Configure your SSTP VPN connection details`}
          bordered
        >
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

            <FormField
              label={$localize`Port`}
              value={port.value}
              onInput$={(_, el) => {
                port.value = el.value;
                handleManualFormSubmit$();
              }}
              placeholder="4443"
            />
          </div>
        </FormContainer>

        {/* Authentication Settings */}
        <FormContainer title={$localize`Authentication Settings`} bordered>
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
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
        </FormContainer>

        {/* Security Settings */}
        <FormContainer title={$localize`Security Settings`} bordered>
          <div class="flex flex-col gap-5">
            <Switch
              id="verifyServerCertificate"
              label={$localize`Verify Server Certificate`}
              checked={verifyServerCertificate.value}
              onChange$={(checked) => {
                verifyServerCertificate.value = checked;
                handleManualFormSubmit$();
              }}
            />

            <div class="mt-2">
              <label class="text-text-secondary dark:text-text-dark-secondary block text-sm font-medium">
                {$localize`TLS Version`}
              </label>
              <select
                value={tlsVersion.value}
                onChange$={(_, el) => {
                  tlsVersion.value = el.value as
                    | "any"
                    | "only-1.2"
                    | "only-1.3";
                  handleManualFormSubmit$();
                }}
                class="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2
                     focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                     dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
              >
                <option value="any">{$localize`Any`}</option>
                <option value="only-1.2">{$localize`TLS 1.2 Only`}</option>
                <option value="only-1.3">{$localize`TLS 1.3 Only`}</option>
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
