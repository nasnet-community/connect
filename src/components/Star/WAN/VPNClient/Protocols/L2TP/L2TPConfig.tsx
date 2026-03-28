import { component$, useTask$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { useL2TPConfig } from "./useL2TPConfig";
import { L2TPPromoBanner } from "./L2TPPromoBanner";
import type { L2TPCredentials } from "~/utils/supabaseClient";
import {
  FormField,
  FormContainer,
  Switch,
  ErrorMessage,
} from "../../components";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface L2TPConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const L2TPConfig = component$<L2TPConfigProps>(
  ({ onIsValidChange$, isSaving }) => {
    const locale = useMessageLocale();
    const {
      serverAddress,
      username,
      password,
      useIPsec,
      ipsecSecret,
      errorMessage,
      handleManualFormSubmit$,
    } = useL2TPConfig(onIsValidChange$);

    useTask$(({ track }) => {
      const saving = track(() => isSaving);
      if (saving) {
        handleManualFormSubmit$();
      }
    });

    const handleCredentialsReceived$ = $((credentials: L2TPCredentials) => {
      serverAddress.value = credentials.server;
      username.value = credentials.username;
      password.value = credentials.password;

      handleManualFormSubmit$();
    });

    return (
      <div class="space-y-6">
        {/* L2TP Promotional Banner - Provides quick configuration from subscription */}
        <L2TPPromoBanner onCredentialsReceived$={handleCredentialsReceived$} />

        {/* Connection Settings */}
        <FormContainer
          title={semanticMessages.vpn_l2tp_connection_settings({}, { locale })}
          description={semanticMessages.vpn_l2tp_connection_settings_description(
            {},
            { locale },
          )}
          bordered
        >
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              label={semanticMessages.vpn_l2tp_server_address({}, { locale })}
              required
              value={serverAddress.value}
              placeholder="vpn.example.com or IP address"
              onInput$={(_, el) => {
                serverAddress.value = el.value;
                handleManualFormSubmit$();
              }}
            />
          </div>
        </FormContainer>

        {/* Authentication Settings */}
        <FormContainer
          title={semanticMessages.vpn_l2tp_authentication_settings(
            {},
            { locale },
          )}
          bordered
        >
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              label={semanticMessages.shared_username({}, { locale })}
              required
              value={username.value}
              onInput$={(_, el) => {
                username.value = el.value;
                handleManualFormSubmit$();
              }}
            />

            <FormField
              type="text"
              label={semanticMessages.wan_easy_password_label({}, { locale })}
              required
              value={password.value}
              onInput$={(_, el) => {
                password.value = el.value;
                handleManualFormSubmit$();
              }}
            />
          </div>
        </FormContainer>

        {/* IPsec Settings */}
        <FormContainer
          title={semanticMessages.vpn_l2tp_ipsec_security_settings(
            {},
            { locale },
          )}
          bordered
        >
          <div class="space-y-4">
            <Switch
              id="useIPsec"
              label={semanticMessages.vpn_l2tp_use_ipsec_encryption(
                {},
                { locale },
              )}
              checked={useIPsec.value}
              onChange$={(checked) => {
                useIPsec.value = checked;
                handleManualFormSubmit$();
              }}
            />

            {/* Conditional IPsec Secret Field */}
            {useIPsec.value && (
              <div class="ml-7 mt-3">
                <FormField
                  type="text"
                  label={semanticMessages.vpn_l2tp_ipsec_pre_shared_secret(
                    {},
                    { locale },
                  )}
                  required
                  value={ipsecSecret.value}
                  onInput$={(_, el) => {
                    ipsecSecret.value = el.value;
                    handleManualFormSubmit$();
                  }}
                />
              </div>
            )}
          </div>
        </FormContainer>

        {/* Required Fields Note */}
        <p class="text-text-muted dark:text-text-dark-muted text-xs">
          {semanticMessages.vpn_l2tp_fields_required({}, { locale })}
        </p>

        {/* Error Message Display */}
        <ErrorMessage message={errorMessage.value} />
      </div>
    );
  },
);
