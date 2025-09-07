import { component$, $, useSignal } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { WireguardClientConfig } from "~/components/Star/StarContext/Utils/VPNClientType";
import { ConfigMethodToggle } from "~/components/Star/WAN/VPNClient/components/ConfigMethodToggle";
import { VPNConfigFileSection } from "~/components/Star/WAN/VPNClient/components/VPNConfigFileSection";
import { Input, ErrorMessage } from "~/components/Core";

interface WireguardFieldsProps {
  config: Partial<WireguardClientConfig>;
  onUpdate$: QRL<(updates: Partial<WireguardClientConfig>) => Promise<void>>;
  errors?: Record<string, string>;
  mode?: "easy" | "advanced";
}

export const WireguardFields = component$<WireguardFieldsProps>((props) => {
  const { config, errors = {}, mode = "advanced", onUpdate$ } = props;
  
  // State for config method and file content
  const configMethod = useSignal<"file" | "manual">("file");
  const configContent = useSignal("");
  
  // Parse WireGuard config file
  const parseWireguardConfig = $((content: string) => {
    const lines = content.split('\n');
    const parsedConfig: Partial<WireguardClientConfig> = {};
    
    let currentSection = '';
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) continue;
      
      if (trimmedLine.startsWith('[')) {
        currentSection = trimmedLine.toLowerCase();
        continue;
      }
      
      const [key, ...valueParts] = trimmedLine.split('=');
      if (!key || valueParts.length === 0) continue;
      
      const keyTrimmed = key.trim().toLowerCase();
      const value = valueParts.join('=').trim();
      
      if (currentSection === '[interface]') {
        switch (keyTrimmed) {
          case 'privatekey':
            parsedConfig.InterfacePrivateKey = value;
            break;
          case 'address':
            parsedConfig.InterfaceAddress = value;
            break;
          case 'dns':
            parsedConfig.InterfaceDNS = value;
            break;
          case 'mtu':
            parsedConfig.InterfaceMTU = parseInt(value);
            break;
        }
      } else if (currentSection === '[peer]') {
        switch (keyTrimmed) {
          case 'publickey':
            parsedConfig.PeerPublicKey = value;
            break;
          case 'allowedips':
            parsedConfig.PeerAllowedIPs = value;
            break;
          case 'endpoint':
            const [address, port] = value.split(':');
            if (address) parsedConfig.PeerEndpointAddress = address;
            if (port) parsedConfig.PeerEndpointPort = parseInt(port);
            break;
          case 'persistentkeepalive':
            parsedConfig.PeerPersistentKeepalive = parseInt(value);
            break;
          case 'presharedkey':
            parsedConfig.PeerPresharedKey = value;
            break;
        }
      }
    }
    
    return parsedConfig;
  });
  
  // Handle config file upload
  const handleFileUpload$ = $(async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      try {
        const content = await file.text();
        configContent.value = content;
        const parsedConfig = await parseWireguardConfig(content);
        await onUpdate$(parsedConfig);
      } catch (error) {
        console.error('Failed to read config file:', error);
      }
    }
  });
  
  // Handle config content change
  const handleConfigChange$ = $(async (content: string) => {
    configContent.value = content;
    const parsedConfig = await parseWireguardConfig(content);
    await onUpdate$(parsedConfig);
  });

  return (
    <div class="space-y-6">
      {/* Configuration Method Toggle */}
      <div class="flex justify-center">
        <ConfigMethodToggle
          method={configMethod.value}
          onMethodChange$={(method) => (configMethod.value = method)}
          class="max-w-md"
        />
      </div>

      {/* File Configuration Option */}
      {configMethod.value === "file" && (
        <VPNConfigFileSection
          protocolName="WireGuard"
          acceptedExtensions=".conf"
          configValue={configContent.value}
          onConfigChange$={handleConfigChange$}
          onFileUpload$={handleFileUpload$}
          placeholder={$localize`Paste your WireGuard configuration here. It should include sections like [Interface] and [Peer].`}
        />
      )}

      {/* Manual Configuration Option */}
      {configMethod.value === "manual" && (
        <div class="space-y-4">
          {/* Interface Private Key */}
      <div>
        <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
          {$localize`Interface Private Key`} *
        </label>
        <Input
          type="text"
          value={config.InterfacePrivateKey || ""}
          onInput$={(event: Event, value: string) =>
            onUpdate$({
              InterfacePrivateKey: value,
            })
          }
          placeholder="Your private key"
          validation={errors.InterfacePrivateKey ? "invalid" : "default"}
        />
        {errors.InterfacePrivateKey && (
          <ErrorMessage message={errors.InterfacePrivateKey} />
        )}
      </div>

      {/* Interface Address */}
      <div>
        <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
          {$localize`Interface Address`} *
        </label>
        <Input
          type="text"
          value={config.InterfaceAddress || ""}
          onInput$={(event: Event, value: string) =>
            onUpdate$({
              InterfaceAddress: value,
            })
          }
          placeholder="10.0.0.2/32"
          validation={errors.InterfaceAddress ? "invalid" : "default"}
        />
        {errors.InterfaceAddress && (
          <ErrorMessage message={errors.InterfaceAddress} />
        )}
      </div>

      {/* Peer Public Key */}
      <div>
        <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
          {$localize`Peer Public Key`} *
        </label>
        <Input
          type="text"
          value={config.PeerPublicKey || ""}
          onInput$={(event: Event, value: string) =>
            onUpdate$({ PeerPublicKey: value })
          }
          placeholder="Server public key"
          validation={errors.PeerPublicKey ? "invalid" : "default"}
        />
        {errors.PeerPublicKey && (
          <ErrorMessage message={errors.PeerPublicKey} />
        )}
      </div>

      {/* Peer Endpoint */}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
            {$localize`Peer Endpoint Address`} *
          </label>
          <Input
            type="text"
            value={config.PeerEndpointAddress || ""}
            onInput$={(event: Event, value: string) =>
              onUpdate$({
                PeerEndpointAddress: value,
              })
            }
            placeholder="vpn.example.com"
            validation={errors.PeerEndpointAddress ? "invalid" : "default"}
          />
          {errors.PeerEndpointAddress && (
            <ErrorMessage message={errors.PeerEndpointAddress} />
          )}
        </div>

        <div>
          <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
            {$localize`Peer Endpoint Port`} *
          </label>
          <Input
            type="number"
            value={config.PeerEndpointPort || ""}
            onInput$={(event: Event, value: string) =>
              onUpdate$({
                PeerEndpointPort: parseInt(value) || 0,
              })
            }
            placeholder="51820"
            validation={errors.PeerEndpointPort ? "invalid" : "default"}
          />
          {errors.PeerEndpointPort && (
            <ErrorMessage message={errors.PeerEndpointPort} />
          )}
        </div>
      </div>

      {/* Peer Allowed IPs */}
      <div>
        <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
          {$localize`Peer Allowed IPs`} *
        </label>
        <Input
          type="text"
          value={config.PeerAllowedIPs || ""}
          onInput$={(event: Event, value: string) =>
            onUpdate$({ PeerAllowedIPs: value })
          }
          placeholder="0.0.0.0/0"
          validation={errors.PeerAllowedIPs ? "invalid" : "default"}
        />
        {errors.PeerAllowedIPs && (
          <ErrorMessage message={errors.PeerAllowedIPs} />
        )}
      </div>

      {/* Advanced Settings */}
      {mode === "advanced" && (
        <>
          <div>
            <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
              {$localize`Interface DNS`}
            </label>
            <Input
              type="text"
              value={config.InterfaceDNS || ""}
              onInput$={(event: Event, value: string) =>
                onUpdate$({
                  InterfaceDNS: value,
                })
              }
              placeholder="8.8.8.8"
            />
          </div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
                {$localize`Interface MTU`}
              </label>
              <Input
                type="number"
                value={config.InterfaceMTU || ""}
                onInput$={(event: Event, value: string) =>
                  onUpdate$({
                    InterfaceMTU: parseInt(value) || 0,
                  })
                }
                placeholder="1420"
              />
            </div>

            <div>
              <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
                {$localize`Persistent Keepalive`}
              </label>
              <Input
                type="number"
                value={config.PeerPersistentKeepalive || ""}
                onInput$={(event: Event, value: string) =>
                  onUpdate$({
                    PeerPersistentKeepalive: parseInt(value) || 0,
                  })
                }
                placeholder="25"
              />
            </div>
          </div>

          <div>
            <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
              {$localize`Preshared Key`}
            </label>
            <Input
              type="text"
              value={config.PeerPresharedKey || ""}
              onInput$={(event: Event, value: string) =>
                onUpdate$({
                  PeerPresharedKey: value,
                })
              }
              placeholder="Optional preshared key"
            />
          </div>
        </>
      )}
        </div>
      )}
    </div>
  );
});
