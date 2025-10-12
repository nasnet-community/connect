import { component$ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useSSTPServer } from "./useSSTPServer";
import { Card } from "~/components/Core/Card";
import { Field as FormField } from "~/components/Core/Form/Field";
import { Input } from "~/components/Core/Input";
import { NetworkDropdown } from "../../components/NetworkSelection";

/**
 * SSTP Server Configuration Component
 *
 * Allows users to configure SSTP VPN server settings including:
 * - Enable/disable SSTP server
 * - Configure certificate and TLS settings
 * - Set port and encryption options
 * - Configure authentication methods
 */
export const SSTPServerAdvanced = component$(() => {
  const {
    advancedFormState,
    applyChanges,
  } = useSSTPServer();

  return (
    <Card hasHeader>
      <div q:slot="header" class="flex items-center gap-2">
        <HiServerOutline class="h-5 w-5" />
        <span class="font-medium">{$localize`SSTP Server`}</span>
      </div>
      <div class="space-y-6">
        {/* Basic Configuration */}
            <div class="mb-6">
              <h3 class="text-text-default mb-4 text-lg font-medium dark:text-text-dark-default">
                {$localize`Basic Configuration`}
              </h3>
            </div>

            <FormField label={$localize`Network`}>
              <NetworkDropdown
                selectedNetwork={"VPN" as const}
                onNetworkChange$={(network) => {
                  console.log("SSTP network changed to:", network);
                }}
              />
            </FormField>


            <FormField
              label={$localize`Port`}
              helperText={$localize`SSTP server port (default: 4443)`}
            >
              <Input
                type="number"
                value={String(advancedFormState.port)}
                onChange$={(_, value) =>
                  applyChanges({ port: parseInt(value) || 4443 })
                }
              />
            </FormField>

            {/* Certificate Configuration Note */}
            <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <h4 class="mb-2 text-sm font-medium text-blue-800 dark:text-blue-200">
                {$localize`Certificate and Security Configuration`}
              </h4>
              <p class="text-sm text-blue-700 dark:text-blue-300">
                {$localize`SSTP certificates and security settings are configured in the Certificate step. This ensures consistent certificate management and security configuration across all protocols.`}
              </p>
            </div>
      </div>
    </Card>
  );
});
