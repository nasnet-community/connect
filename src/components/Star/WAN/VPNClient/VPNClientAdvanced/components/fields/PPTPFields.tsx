import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { PptpClientConfig } from "~/components/Star/StarContext/Utils/VPNClientType";
import { Input, ErrorMessage } from "~/components/Core";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface PPTPFieldsProps {
  config: Partial<PptpClientConfig>;
  onUpdate$: QRL<(updates: Partial<PptpClientConfig>) => Promise<void>>;
  errors?: Record<string, string>;
}

export const PPTPFields = component$<PPTPFieldsProps>((props) => {
  const { config, errors = {}, onUpdate$ } = props;
  const locale = useMessageLocale();

  return (
    <div class="space-y-4">
      {/* Server Configuration */}
      <div>
        <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
          {semanticMessages.vpn_openvpn_server_address({}, { locale })} *
        </label>
        <Input
          type="text"
          value={config.ConnectTo || ""}
          onInput$={(event: Event, value: string) => {
            console.log("[PPTPFields] Connect To updated:", value);
            onUpdate$({ ConnectTo: value });
          }}
          placeholder="vpn.example.com"
          validation={errors.ConnectTo ? "invalid" : "default"}
        />
        {errors.ConnectTo && <ErrorMessage message={errors.ConnectTo} />}
      </div>

      {/* Authentication */}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
            {semanticMessages.shared_username({}, { locale })} *
          </label>
          <Input
            type="text"
            value={config.Credentials?.Username || ""}
            onInput$={(event: Event, value: string) => {
              console.log("[PPTPFields] Username updated:", value);
              onUpdate$({
                Credentials: {
                  ...config.Credentials,
                  Username: value,
                  Password: config.Credentials?.Password || "",
                },
              });
            }}
            placeholder={semanticMessages.vpn_pptp_username_placeholder(
              {},
              {
                locale,
              },
            )}
            validation={errors.User ? "invalid" : "default"}
          />
          {errors.User && <ErrorMessage message={errors.User} />}
        </div>

        <div>
          <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
            {semanticMessages.vpn_openvpn_password({}, { locale })} *
          </label>
          <Input
            type="text"
            value={config.Credentials?.Password || ""}
            onInput$={(event: Event, value: string) => {
              console.log(
                "[PPTPFields] Password updated:",
                value ? "***" : "(empty)",
              );
              onUpdate$({
                Credentials: {
                  ...config.Credentials,
                  Username: config.Credentials?.Username || "",
                  Password: value,
                },
              });
            }}
            placeholder={semanticMessages.vpn_pptp_password_placeholder(
              {},
              {
                locale,
              },
            )}
            validation={errors.Password ? "invalid" : "default"}
          />
          {errors.Password && <ErrorMessage message={errors.Password} />}
        </div>
      </div>
    </div>
  );
});
