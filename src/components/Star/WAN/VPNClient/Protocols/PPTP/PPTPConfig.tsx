import { component$, useTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { usePPTPConfig } from "./usePPTPConfig";
import { FormField, FormContainer, ErrorMessage } from "../../components";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface PPTPConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const PPTPConfig = component$<PPTPConfigProps>(
  ({ onIsValidChange$, isSaving }) => {
    const locale = useMessageLocale();
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
          title={semanticMessages.vpn_pptp_connection_title({}, { locale })}
          description={semanticMessages.vpn_pptp_connection_description(
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
              label={semanticMessages.vpn_pptp_keepalive_timeout(
                {},
                { locale },
              )}
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
        <FormContainer
          title={semanticMessages.vpn_pptp_auth_title({}, { locale })}
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
              placeholder={semanticMessages.vpn_pptp_username_placeholder(
                {},
                { locale },
              )}
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
              placeholder={semanticMessages.vpn_pptp_password_placeholder(
                {},
                { locale },
              )}
            />
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
