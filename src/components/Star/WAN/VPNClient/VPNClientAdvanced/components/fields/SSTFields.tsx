import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { SstpClientConfig } from "~/components/Star/StarContext/Utils/VPNClientType";
import { Input, ErrorMessage } from "~/components/Core";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface SSTFieldsProps {
  config: Partial<SstpClientConfig>;
  onUpdate$: QRL<(updates: Partial<SstpClientConfig>) => Promise<void>>;
  errors?: Record<string, string>;
}

export const SSTFields = component$<SSTFieldsProps>((props) => {
  const { config, errors = {}, onUpdate$ } = props;
  const locale = useMessageLocale();

  return (
    <div class="space-y-4">
      {/* Server Configuration */}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
            {semanticMessages.vpn_openvpn_server_address({}, { locale })} *
          </label>
          <Input
            type="text"
            value={config.Server?.Address || ""}
            onInput$={(event: Event, value: string) => {
              console.log("[SSTFields] Server Address updated:", value);
              onUpdate$({
                Server: {
                  Address: value,
                  Port: config.Server?.Port || 443,
                },
              });
            }}
            placeholder="vpn.example.com"
            validation={errors.ServerAddress ? "invalid" : "default"}
          />
          {errors.ServerAddress && (
            <ErrorMessage message={errors.ServerAddress} />
          )}
        </div>

        <div>
          <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
            {semanticMessages.vpn_openvpn_server_port({}, { locale })}
          </label>
          <Input
            type="text"
            value={config.Server?.Port || ""}
            onInput$={(event: Event, value: string) => {
              console.log("[SSTFields] Server Port updated:", value);
              onUpdate$({
                Server: {
                  Address: config.Server?.Address || "",
                  Port: parseInt(value) || 443,
                },
              });
            }}
            placeholder="443"
          />
        </div>
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
              console.log("[SSTFields] Username updated:", value);
              onUpdate$({
                Credentials: {
                  ...config.Credentials,
                  Username: value,
                  Password: config.Credentials?.Password || "",
                },
              });
            }}
            placeholder={semanticMessages.vpn_client_advanced_your_username(
              {},
              {
                locale,
              },
            )}
            validation={errors.Username ? "invalid" : "default"}
          />
          {errors.Username && <ErrorMessage message={errors.Username} />}
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
                "[SSTFields] Password updated:",
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
            placeholder={semanticMessages.vpn_client_advanced_your_password(
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
