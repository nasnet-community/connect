import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Ike2ClientConfig } from "~/components/Star/StarContext/Utils/VPNClientType";
import { Input, ErrorMessage } from "~/components/Core";

interface IKEv2FieldsProps {
  config: Partial<Ike2ClientConfig>;
  onUpdate$: QRL<(updates: Partial<Ike2ClientConfig>) => Promise<void>>;
  errors?: Record<string, string>;
}

export const IKEv2Fields = component$<IKEv2FieldsProps>((props) => {
  const { config, errors = {}, onUpdate$ } = props;

  return (
    <div class="space-y-4">
      {/* Server Configuration */}
      <div>
        <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
          {$localize`Server Address`} *
        </label>
        <Input
          type="text"
          value={config.ServerAddress || ""}
          onInput$={(event: Event, value: string) => {
            console.log('[IKEv2Fields] Server Address updated:', value);
            onUpdate$({ ServerAddress: value });
          }}
          placeholder="vpn.example.com"
          validation={errors.ServerAddress ? "invalid" : "default"}
        />
        {errors.ServerAddress && (
          <ErrorMessage message={errors.ServerAddress} />
        )}
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
              console.log('[IKEv2Fields] Username updated:', value);
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
              console.log('[IKEv2Fields] Password updated:', value ? '***' : '(empty)');
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
