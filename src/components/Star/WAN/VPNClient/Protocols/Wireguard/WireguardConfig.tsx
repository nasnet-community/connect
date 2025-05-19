import { component$, useTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { useWireguardConfig } from "./useWireguardConfig";
import { 
  FormField, 
  FormContainer, 
  ErrorMessage,
  ConfigMethodToggle,
  VPNConfigFileSection
} from "../../components";

interface WireguardConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const WireguardConfig = component$<WireguardConfigProps>(({ onIsValidChange$, isSaving }) => {
  const {
    config,
    errorMessage,
    configMethod,
    privateKey,
    publicKey,
    allowedIPs,
    serverAddress,
    serverPort,
    address,
    dns,
    mtu,
    preSharedKey,
    persistentKeepalive,
    handleConfigChange$,
    handleManualFormSubmit$,
    handleFileUpload$,
    setConfigMethod$
  } = useWireguardConfig(onIsValidChange$);

  useTask$(({ track }) => {
    const saving = track(() => isSaving);
    if (saving) {
      handleManualFormSubmit$();
    }
  });

  return (
    <div class="space-y-6">
      {/* Configuration Method Toggle */}
      <div class="flex justify-center mb-2">
        <ConfigMethodToggle 
          method={configMethod.value}
          onMethodChange$={setConfigMethod$}
          class="max-w-md"
        />
      </div>

      {/* File Configuration Option */}
      {configMethod.value === "file" && (
        <VPNConfigFileSection
          protocolName="WireGuard"
          acceptedExtensions=".conf"
          configValue={config.value}
          onConfigChange$={handleConfigChange$}
          onFileUpload$={handleFileUpload$}
          placeholder={$localize`Paste your WireGuard configuration here. It should include sections like [Interface] and [Peer].`}
        />
      )}

      {/* Manual Configuration Option */}
      {configMethod.value === "manual" && (
        <FormContainer class="space-y-4 rounded-lg border border-border p-4 dark:border-border-dark">
          <h3 class="text-md font-medium mb-4 text-text-secondary dark:text-text-dark-secondary">
            {$localize`Connection Settings`}
          </h3>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Private Key Field */}
            <FormField
              type="password"
              label={$localize`Private Key`}
              required
              value={privateKey.value}
              onInput$={(_, el) => { 
                privateKey.value = el.value;
                handleManualFormSubmit$();
              }}
              placeholder="Interface private key"
            />
            
            {/* Public Key Field */}
            <FormField
              label={$localize`Public Key`}
              required
              value={publicKey.value}
              onInput$={(_, el) => { 
                publicKey.value = el.value;
                handleManualFormSubmit$();
              }}
              placeholder="Peer public key"
            />
            
            {/* Server Address Field */}
            <FormField
              label={$localize`Server Address`}
              required
              value={serverAddress.value}
              onInput$={(_, el) => { 
                serverAddress.value = el.value;
                handleManualFormSubmit$();
              }}
              placeholder="vpn.example.com or IP address"
            />
            
            {/* Server Port Field */}
            <FormField
              label={$localize`Server Port`}
              required
              value={serverPort.value}
              onInput$={(_, el) => { 
                serverPort.value = el.value;
                handleManualFormSubmit$();
              }}
              placeholder="51820"
            />
            
            {/* Allowed IPs Field */}
            <FormField
              label={$localize`Allowed IPs`}
              required
              value={allowedIPs.value}
              onInput$={(_, el) => { 
                allowedIPs.value = el.value;
                handleManualFormSubmit$();
              }}
              placeholder="0.0.0.0/0"
            />
            
            {/* Interface Address Field */}
            <FormField
              label={$localize`Interface Address`}
              required
              value={address.value}
              onInput$={(_, el) => { 
                address.value = el.value;
                handleManualFormSubmit$();
              }}
              placeholder="10.0.0.2/24"
            />
          </div>

          <h3 class="text-md font-medium mt-5 mb-4 text-text-secondary dark:text-text-dark-secondary">
            {$localize`Advanced Settings`}
          </h3>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* DNS Field */}
            <FormField
              label={$localize`DNS`}
              value={dns.value}
              onInput$={(_, el) => { 
                dns.value = el.value;
                handleManualFormSubmit$();
              }}
              placeholder="8.8.8.8, 1.1.1.1"
            />
            
            {/* MTU Field */}
            <FormField
              label={$localize`MTU`}
              value={mtu.value}
              onInput$={(_, el) => { 
                mtu.value = el.value;
                handleManualFormSubmit$();
              }}
              placeholder="1420"
            />
            
            {/* Pre-shared Key Field */}
            <FormField
              type="password"
              label={$localize`Pre-shared Key`}
              value={preSharedKey.value}
              onInput$={(_, el) => { 
                preSharedKey.value = el.value;
                handleManualFormSubmit$();
              }}
              helperText={$localize`Optional: Enhances security`}
            />
            
            {/* Persistent Keepalive Field */}
            <FormField
              label={$localize`Persistent Keepalive`}
              value={persistentKeepalive.value}
              onInput$={(_, el) => { 
                persistentKeepalive.value = el.value;
                handleManualFormSubmit$();
              }}
              placeholder="25"
              helperText={$localize`Seconds between keepalive packets`}
            />
          </div>
          
          {/* Required Fields Note */}
          <p class="text-xs text-text-muted dark:text-text-dark-muted mt-4">
            {$localize`Fields marked with * are required`}
          </p>
        </FormContainer>
      )}

      {/* Error Message Display */}
      <ErrorMessage message={errorMessage.value} />
    </div>
  );
}); 