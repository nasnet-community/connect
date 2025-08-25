import { component$, type QRL } from "@builder.io/qwik";
import type { WirelessCredentials } from "../../../../../StarContext/CommonType";
import { Input, FormField, PasswordField } from "~/components/Core";

export interface WirelessFieldsProps {
  credentials?: WirelessCredentials;
  onUpdate$: QRL<(credentials: WirelessCredentials) => void>;
  errors?: {
    ssid?: string[];
    password?: string[];
  };
}

export const WirelessFields = component$<WirelessFieldsProps>(
  ({ credentials, onUpdate$, errors }) => {
    return (
      <div class="space-y-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {$localize`Wireless Settings`}
        </h4>

        <FormField
          label={$localize`SSID (Network Name)`}
          error={errors?.ssid?.[0]}
        >
          <Input
            type="text"
            value={credentials?.SSID || ""}
            onInput$={(event: Event, value: string) => {
              onUpdate$({
                SSID: value,
                Password: credentials?.Password || "",
              });
            }}
            placeholder="Enter network name"
            
          />
        </FormField>

        <FormField
          label={$localize`Password`}
          error={errors?.password?.[0]}
        >
          <PasswordField
            value={credentials?.Password || ""}
            onInput$={(event: Event, element: HTMLInputElement) => {
              onUpdate$({
                SSID: credentials?.SSID || "",
                Password: element.value,
              });
            }}
            placeholder="Min. 8 characters"
            
          />
        </FormField>
      </div>
    );
  },
);
