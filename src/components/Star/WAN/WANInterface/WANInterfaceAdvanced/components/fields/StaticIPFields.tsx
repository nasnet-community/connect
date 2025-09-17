import { component$, type QRL, $ } from "@builder.io/qwik";
import type { StaticIPConfig } from "../../types";
import { Input, FormField } from "~/components/Core";

export interface StaticIPFieldsProps {
  config?: StaticIPConfig;
  onUpdate$: QRL<(config: StaticIPConfig) => void>;
  errors?: {
    ipAddress?: string[];
    subnet?: string[];
    gateway?: string[];
    DNS?: string[];
    secondaryDns?: string[];
  };
}

export const StaticIPFields = component$<StaticIPFieldsProps>(
  ({ config, onUpdate$, errors }) => {
    const updateField = $((field: keyof StaticIPConfig, value: string) => {
      onUpdate$({
        ipAddress: config?.ipAddress || "",
        subnet: config?.subnet || "",
        gateway: config?.gateway || "",
        DNS: config?.DNS || "",
        [field]: value,
      });
    });

    return (
      <div class="space-y-4 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {$localize`Static IP Settings`}
        </h4>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label={$localize`IP Address`}
            required
            error={errors?.ipAddress?.[0]}
          >
            <Input
              type="text"
              value={config?.ipAddress || ""}
              onInput$={(event: Event, value: string) =>
                updateField("ipAddress", value)
              }
              placeholder="192.168.1.100"
              
            />
          </FormField>

          <FormField
            label={$localize`Subnet Mask`}
            required
            error={errors?.subnet?.[0]}
          >
            <Input
              type="text"
              value={config?.subnet || ""}
              onInput$={(event: Event, value: string) =>
                updateField("subnet", value)
              }
              placeholder="255.255.255.0"
              
            />
          </FormField>

          <FormField
            label={$localize`Gateway`}
            required
            error={errors?.gateway?.[0]}
          >
            <Input
              type="text"
              value={config?.gateway || ""}
              onInput$={(event: Event, value: string) =>
                updateField("gateway", value)
              }
              placeholder="192.168.1.1"
              
            />
          </FormField>

          <FormField
            label={$localize`Primary DNS`}
            required
            error={errors?.DNS?.[0]}
          >
            <Input
              type="text"
              value={config?.DNS || ""}
              onInput$={(event: Event, value: string) =>
                updateField("DNS", value)
              }
              placeholder="8.8.8.8"
              
            />
          </FormField>

        </div>
      </div>
    );
  },
);
