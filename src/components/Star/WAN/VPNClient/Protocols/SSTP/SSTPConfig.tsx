import { component$, useTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { useSSTPConfig } from "./useSSTPConfig";
import {
  FormField,
  FormContainer,
  Switch,
  ErrorMessage,
} from "../../components";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface SSTPConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const SSTPConfig = component$<SSTPConfigProps>(
  ({ onIsValidChange$, isSaving }) => {
    const locale = useMessageLocale();
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
          title={semanticMessages.vpn_sstp_connection_title({}, { locale })}
          description={semanticMessages.vpn_sstp_connection_description(
            {},
            { locale },
          )}
          bordered
        >
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              label={semanticMessages.vpn_openvpn_server_address(
                {},
                { locale },
              )}
              required
              value={serverAddress.value}
              onInput$={(_, el) => {
                serverAddress.value = el.value;
                handleManualFormSubmit$();
              }}
              placeholder="vpn.example.com or IP address"
            />

            <FormField
              label={semanticMessages.vpn_server_port({}, { locale })}
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
        <FormContainer
          title={semanticMessages.vpn_sstp_auth_title({}, { locale })}
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
              label={semanticMessages.vpn_openvpn_password({}, { locale })}
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
        <FormContainer
          title={semanticMessages.vpn_sstp_security_title({}, { locale })}
          bordered
        >
          <div class="flex flex-col gap-5">
            <Switch
              id="verifyServerCertificate"
              label={semanticMessages.vpn_sstp_verify_server_certificate(
                {},
                { locale },
              )}
              checked={verifyServerCertificate.value}
              onChange$={(checked) => {
                verifyServerCertificate.value = checked;
                handleManualFormSubmit$();
              }}
            />

            <div class="mt-2">
              <label class="text-text-secondary dark:text-text-dark-secondary block text-sm font-medium">
                {semanticMessages.vpn_sstp_tls_version({}, { locale })}
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
                <option value="any">
                  {semanticMessages.vpn_sstp_tls_any({}, { locale })}
                </option>
                <option value="only-1.2">
                  {semanticMessages.vpn_sstp_tls_1_2({}, { locale })}
                </option>
                <option value="only-1.3">
                  {semanticMessages.vpn_sstp_tls_1_3({}, { locale })}
                </option>
              </select>
            </div>
          </div>
        </FormContainer>

        {/* Required Fields Note */}
        <p class="text-text-muted dark:text-text-dark-muted text-xs">
          {semanticMessages.vpn_client_easy_required_fields({}, { locale })}
        </p>

        {/* Error Message Display */}
        <ErrorMessage message={errorMessage.value} />
      </div>
    );
  },
);
