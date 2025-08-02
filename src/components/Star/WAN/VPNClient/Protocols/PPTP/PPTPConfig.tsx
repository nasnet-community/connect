import { component$, useTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { usePPTPConfig } from "./usePPTPConfig";
import { FormField, FormContainer, ErrorMessage } from "../../components";

interface PPTPConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const PPTPConfig = component$<PPTPConfigProps>(
  ({ onIsValidChange$, isSaving }) => {
    const {
      serverAddress,
      username,
      password,
      keepaliveTimeout,
      errorMessage,
      handleManualFormSubmit$,
    } = usePPTPConfig(onIsValidChange$);

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
          description={$localize`Configure your PPTP VPN connection details`}
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
              label={$localize`Keepalive Timeout (seconds)`}
              value={keepaliveTimeout.value}
              onInput$={(_, el) => {
                keepaliveTimeout.value = el.value;
                handleManualFormSubmit$();
              }}
              placeholder="30"
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
              placeholder={$localize`VPN username`}
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
              placeholder={$localize`VPN password`}
            />
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
