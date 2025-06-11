import { component$, useStore, $, useId } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { useSSTPServer } from "./useSSTPServer";
import type { AuthMethod, TLSVersion } from "../../../../StarContext/CommonType";
import { 
  Card, 
  FormField, 
  Input,
  Select,
  CheckboxGroup,
  Switch
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
  const { sstpState, updateSSTPServer$ } = useSSTPServer();
  
  // Local form state to track changes before applying
  const formState = useStore({
    certificate: sstpState.Certificate || "",
    port: sstpState.Port || 443,
    forceAes: sstpState.ForceAes || false,
    pfs: sstpState.Pfs || false,
    tlsVersion: sstpState.TlsVersion || "any",
    ciphers: sstpState.Ciphers || "aes256-gcm-sha384",
    verifyClientCertificate: sstpState.VerifyClientCertificate || false,
    defaultProfile: sstpState.DefaultProfile || "default",
    authentication: sstpState.Authentication || ["mschap2"],
    maxMtu: sstpState.PacketSize?.MaxMtu || 1450,
    maxMru: sstpState.PacketSize?.MaxMru || 1450,
    keepaliveTimeout: sstpState.KeepaliveTimeout || 30,
  });

  const isEnabled = useStore({ value: sstpState.enabled });
  
  // Generate unique IDs for form controls
  const enableSwitchId = useId();
  const forceAesSwitchId = useId();
  const pfsSwitchId = useId();
  const verifyCertSwitchId = useId();

  // Auto-apply changes when form state changes
  const applyChanges = $((updatedValues: Partial<typeof formState>) => {
    try {
      // Update local state
      Object.assign(formState, updatedValues);

      // Update server configuration
      updateSSTPServer$({
        enabled: isEnabled.value,
        Certificate: formState.certificate,
        Port: formState.port,
        ForceAes: formState.forceAes,
        Pfs: formState.pfs,
        TlsVersion: formState.tlsVersion as TLSVersion,
        Ciphers: formState.ciphers as "aes256-gcm-sha384" | "aes256-sha",
        VerifyClientCertificate: formState.verifyClientCertificate,
        DefaultProfile: formState.defaultProfile,
        Authentication: formState.authentication as AuthMethod[],
        PacketSize: {
          MaxMtu: formState.maxMtu,
          MaxMru: formState.maxMru,
        },
        KeepaliveTimeout: formState.keepaliveTimeout,
      });
    } catch (error) {
      console.error("Failed to update SSTP server configuration:", error);
    }
  });

  // Authentication method options
  const authMethodOptions = [
    { value: "pap", label: $localize`PAP` },
    { value: "chap", label: $localize`CHAP` },
    { value: "mschap1", label: $localize`MS-CHAPv1` },
    { value: "mschap2", label: $localize`MS-CHAPv2` },
  ];

  // TLS version options
  const tlsVersionOptions = [
    { value: "any", label: $localize`Any` },
    { value: "only-1.2", label: $localize`Only 1.2` },
    { value: "only-1.3", label: $localize`Only 1.3` },
  ];

  // Cipher options
  const cipherOptions = [
    { value: "aes256-gcm-sha384", label: $localize`AES256-GCM-SHA384` },
    { value: "aes256-sha", label: $localize`AES256-SHA` },
  ];

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
              <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
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
                value={formState.certificate}
                onChange$={(_, value) =>
                  applyChanges({ certificate: value })
                }
              />
            </FormField>

            <FormField
              label={$localize`Port`}
              helperText={$localize`SSTP server port (default: 443)`}
            >
              <Input
                type="number"
                value={String(formState.port)}
                onChange$={(_, value) =>
                  applyChanges({ port: parseInt(value) || 443 })
                }
              />
            </FormField>

            {/* Security Settings */}
            <div class="mb-6">
              <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
                {$localize`Security Settings`}
              </h3>
            </div>

            <FormField
              label={$localize`TLS Version`}
              helperText={$localize`Required TLS version`}
            >
              <Select
                value={formState.tlsVersion}
                options={tlsVersionOptions}
                onChange$={(value) =>
                  applyChanges({ tlsVersion: value as TLSVersion })
                }
              />
            </FormField>

            <FormField
              label={$localize`Cipher Suite`}
              helperText={$localize`Encryption cipher to use`}
            >
              <Select
                value={formState.ciphers}
                options={cipherOptions}
                onChange$={(value) =>
                  applyChanges({ ciphers: value as "aes256-gcm-sha384" | "aes256-sha" })
                }
              />
            </FormField>

            <FormField label={$localize`Force AES Encryption`}>
              <Switch
                id={forceAesSwitchId}
                label={$localize`Enabled`}
                checked={formState.forceAes}
                onChange$={(checked) =>
                  applyChanges({ forceAes: checked })
                }
              />
            </FormField>

            <FormField label={$localize`Perfect Forward Secrecy (PFS)`}>
              <Switch
                id={pfsSwitchId}
                label={$localize`Enabled`}
                checked={formState.pfs}
                onChange$={(checked) =>
                  applyChanges({ pfs: checked })
                }
              />
            </FormField>

            <FormField label={$localize`Verify Client Certificate`}>
              <Switch
                id={verifyCertSwitchId}
                label={$localize`Enabled`}
                checked={formState.verifyClientCertificate}
                onChange$={(checked) =>
                  applyChanges({ verifyClientCertificate: checked })
                }
              />
            </FormField>

            {/* Authentication */}
            <div class="mb-6">
              <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
                {$localize`Authentication`}
              </h3>
            </div>

            <FormField
              label={$localize`Authentication Methods`}
              helperText={$localize`Select allowed authentication methods`}
            >
              <CheckboxGroup
                options={authMethodOptions}
                selected={formState.authentication}
                onToggle$={(method: string) => {
                  const authMethod = method as AuthMethod;
                  const currentAuth = [...formState.authentication];
                  const index = currentAuth.indexOf(authMethod);
                  
                  if (index === -1) {
                    currentAuth.push(authMethod);
                  } else {
                    currentAuth.splice(index, 1);
                  }
                  
                  applyChanges({ authentication: currentAuth });
                }}
              />
            </FormField>

            {/* Connection Settings */}
            <div class="mb-6">
              <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
                {$localize`Connection Settings`}
              </h3>
            </div>

            <FormField
              label={$localize`Default Profile`}
              helperText={$localize`PPP profile name`}
            >
              <Input
                type="text"
                value={formState.defaultProfile}
                onChange$={(_, value) =>
                  applyChanges({ defaultProfile: value })
                }
              />
            </FormField>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label={$localize`Maximum MTU`}
                helperText={$localize`Maximum Transmission Unit`}
              >
                <Input
                  type="number"
                  value={String(formState.maxMtu)}
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
                  value={String(formState.maxMru)}
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
                value={String(formState.keepaliveTimeout)}
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