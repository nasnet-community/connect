import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { L2tpClientConfig } from "~/components/Star/StarContext/Utils/VPNClientType";
import { Input, ErrorMessage } from "~/components/Core";

interface L2TPFieldsProps {
  config: Partial<L2tpClientConfig>;
  onUpdate$: QRL<(updates: Partial<L2tpClientConfig>) => Promise<void>>;
  errors?: Record<string, string>;
}

export const L2TPFields = component$<L2TPFieldsProps>((props) => {
  const { config, errors = {}, onUpdate$ } = props;

  return (
    <div class="space-y-4">
      {/* Server Configuration */}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
            {$localize`Server Address`} *
          </label>
          <Input
            type="text"
            value={config.Server?.Address || ""}
            onInput$={(event: Event, value: string) => {
              console.log('[L2TPFields] Server Address updated:', value);
              onUpdate$({
                Server: {
                  ...config.Server,
                  Address: value,
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
            {$localize`IPSec Secret`}
          </label>
          <Input
            type="text"
            value={config.IPsecSecret || ""}
            onInput$={(event: Event, value: string) => {
              console.log('[L2TPFields] IPsec Secret updated:', value ? '***' : '(empty)');
              onUpdate$({ 
                IPsecSecret: value,
                UseIPsec: value.trim().length > 0
              });
            }}
            placeholder="Pre-shared key"
          />
        </div>
      </div>

      {/* Authentication */}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
            {$localize`Username`} *
          </label>
          <Input
            type="text"
            value={config.Credentials?.Username || ""}
            onInput$={(event: Event, value: string) => {
              console.log('[L2TPFields] Username updated:', value);
              onUpdate$({ 
                Credentials: { 
                  ...config.Credentials, 
                  Username: value,
                  Password: config.Credentials?.Password || ""
                } 
              });
            }}
            placeholder="Your username"
            validation={errors.Username ? "invalid" : "default"}
          />
          {errors.Username && (
            <ErrorMessage message={errors.Username} />
          )}
        </div>

        <div>
          <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
            {$localize`Password`} *
          </label>
          <Input
            type="text"
            value={config.Credentials?.Password || ""}
            onInput$={(event: Event, value: string) => {
              console.log('[L2TPFields] Password updated:', value ? '***' : '(empty)');
              onUpdate$({
                Credentials: {
                  ...config.Credentials,
                  Username: config.Credentials?.Username || "",
                  Password: value
                }
              });
            }}
            placeholder="Your password"
            validation={errors.Password ? "invalid" : "default"}
          />
          {errors.Password && (
            <ErrorMessage message={errors.Password} />
          )}
        </div>
      </div>
    </div>
  );
});