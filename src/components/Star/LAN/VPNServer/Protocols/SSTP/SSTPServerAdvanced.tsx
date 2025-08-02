import { component$ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useSSTPServer } from "./useSSTPServer";
import {
  Card,
  FormField,
  Input,
  Select,
  CheckboxGroup,
  Switch,
} from "../../../VPNServer/UI";

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
    isEnabled,
    enableSwitchId,
    forceAesSwitchId,
    pfsSwitchId,
    verifyCertSwitchId,
    authMethodOptions,
    tlsVersionOptions,
    cipherOptions,
    applyChanges,
    toggleAuthMethod,
  } = useSSTPServer();

  return (
    <Card
      title={$localize`SSTP Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6">
        {/* Enable/Disable Toggle */}
        <FormField label={$localize`Enable SSTP Server`}>
          <Switch
            id={enableSwitchId}
            label={$localize`Enabled`}
            checked={isEnabled.value}
            onChange$={(checked) => {
              isEnabled.value = checked;
              applyChanges({});
            }}
          />
        </FormField>

        {isEnabled.value && (
          <>
            {/* Basic Configuration */}
            <div class="mb-6">
              <h3 class="text-text-default mb-4 text-lg font-medium dark:text-text-dark-default">
                {$localize`Basic Configuration`}
              </h3>
            </div>

            <FormField
              label={$localize`Certificate`}
              helperText={$localize`SSL certificate name`}
              required
            >
              <Input
                type="text"
                placeholder={$localize`Enter certificate name`}
                value={advancedFormState.certificate}
                onChange$={(_, value) => applyChanges({ certificate: value })}
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

            {/* Security Settings */}
            <div class="mb-6">
              <h3 class="text-text-default mb-4 text-lg font-medium dark:text-text-dark-default">
                {$localize`Security Settings`}
              </h3>
            </div>

            <FormField
              label={$localize`TLS Version`}
              helperText={$localize`Required TLS version`}
            >
              <Select
                value={advancedFormState.tlsVersion}
                options={tlsVersionOptions}
                onChange$={(value) =>
                  applyChanges({ tlsVersion: value as any })
                }
              />
            </FormField>

            <FormField
              label={$localize`Cipher Suite`}
              helperText={$localize`Encryption cipher to use`}
            >
              <Select
                value={advancedFormState.ciphers}
                options={cipherOptions}
                onChange$={(value) => applyChanges({ ciphers: value as any })}
              />
            </FormField>

            <FormField label={$localize`Force AES Encryption`}>
              <Switch
                id={forceAesSwitchId}
                label={$localize`Enabled`}
                checked={advancedFormState.forceAes}
                onChange$={(checked) => applyChanges({ forceAes: checked })}
              />
            </FormField>

            <FormField label={$localize`Perfect Forward Secrecy (PFS)`}>
              <Switch
                id={pfsSwitchId}
                label={$localize`Enabled`}
                checked={advancedFormState.pfs}
                onChange$={(checked) => applyChanges({ pfs: checked })}
              />
            </FormField>

            <FormField label={$localize`Verify Client Certificate`}>
              <Switch
                id={verifyCertSwitchId}
                label={$localize`Enabled`}
                checked={advancedFormState.verifyClientCertificate}
                onChange$={(checked) =>
                  applyChanges({ verifyClientCertificate: checked })
                }
              />
            </FormField>

            {/* Authentication */}
            <div class="mb-6">
              <h3 class="text-text-default mb-4 text-lg font-medium dark:text-text-dark-default">
                {$localize`Authentication`}
              </h3>
            </div>

            <FormField
              label={$localize`Authentication Methods`}
              helperText={$localize`Select allowed authentication methods`}
            >
              <CheckboxGroup
                options={authMethodOptions}
                selected={advancedFormState.authentication}
                onToggle$={toggleAuthMethod}
              />
            </FormField>

            {/* Connection Settings */}
            <div class="mb-6">
              <h3 class="text-text-default mb-4 text-lg font-medium dark:text-text-dark-default">
                {$localize`Connection Settings`}
              </h3>
            </div>

            <FormField
              label={$localize`Default Profile`}
              helperText={$localize`PPP profile name`}
            >
              <Input
                type="text"
                value={advancedFormState.defaultProfile}
                onChange$={(_, value) =>
                  applyChanges({ defaultProfile: value })
                }
              />
            </FormField>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                label={$localize`Maximum MTU`}
                helperText={$localize`Maximum Transmission Unit`}
              >
                <Input
                  type="number"
                  value={String(advancedFormState.maxMtu)}
                  onChange$={(_, value) =>
                    applyChanges({ maxMtu: parseInt(value) || 1450 })
                  }
                />
              </FormField>

              <FormField
                label={$localize`Maximum MRU`}
                helperText={$localize`Maximum Receive Unit`}
              >
                <Input
                  type="number"
                  value={String(advancedFormState.maxMru)}
                  onChange$={(_, value) =>
                    applyChanges({ maxMru: parseInt(value) || 1450 })
                  }
                />
              </FormField>
            </div>

            <FormField
              label={$localize`Keepalive Timeout`}
              helperText={$localize`Connection keepalive timeout in seconds`}
            >
              <Input
                type="number"
                value={String(advancedFormState.keepaliveTimeout)}
                onChange$={(_, value) =>
                  applyChanges({ keepaliveTimeout: parseInt(value) || 30 })
                }
              />
            </FormField>
          </>
        )}
      </div>
    </Card>
  );
});
