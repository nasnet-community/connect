import { component$, $, useSignal } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { OpenVpnClientConfig } from "~/components/Star/StarContext/Utils/VPNClientType";
import { ConfigMethodToggle } from "~/components/Star/WAN/VPNClient/components/ConfigMethodToggle";
import { VPNConfigFileSection } from "~/components/Star/WAN/VPNClient/components/VPNConfigFileSection";
import { Input, ErrorMessage, Select, TextArea } from "~/components/Core";

interface OpenVPNFieldsProps {
  config: Partial<OpenVpnClientConfig>;
  onUpdate$: QRL<(updates: Partial<OpenVpnClientConfig>) => Promise<void>>;
  errors?: Record<string, string>;
  mode?: "easy" | "advanced";
}

export const OpenVPNFields = component$<OpenVPNFieldsProps>((props) => {
  const { config, errors = {}, mode = "advanced", onUpdate$ } = props;
  
  // State for config method and file content
  const configMethod = useSignal<"file" | "manual">("file");
  const configContent = useSignal("");
  
  // Parse OpenVPN config file
  const parseOpenVPNConfig = $((content: string) => {
    const lines = content.split('\n');
    const parsedConfig: Partial<OpenVpnClientConfig> = {
      Server: {
        Address: "",
        Port: 1194
      }
    };
    
    let caCertContent = '';
    const extraConfigLines: string[] = [];
    let inCaCert = false;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#') || trimmedLine.startsWith(';')) continue;
      
      // Handle CA certificate block
      if (trimmedLine === '<ca>') {
        inCaCert = true;
        continue;
      } else if (trimmedLine === '</ca>') {
        inCaCert = false;
        parsedConfig.Certificates = {
          CaCertificateContent: caCertContent.trim()
        };
        continue;
      } else if (inCaCert) {
        caCertContent += trimmedLine + '\n';
        continue;
      }
      
      const [directive, ...valueParts] = trimmedLine.split(/\s+/);
      if (!directive) continue;
      
      const value = valueParts.join(' ').trim();
      
      switch (directive.toLowerCase()) {
        case 'remote':
          const [address, port] = value.split(/\s+/);
          if (address) {
            parsedConfig.Server = {
              Address: address || "",
              Port: parsedConfig.Server?.Port || 1194
            };
          }
          if (port) {
            parsedConfig.Server = {
              Address: parsedConfig.Server?.Address || "",
              Port: parseInt(port) || 1194
            };
          }
          break;
        case 'proto':
          parsedConfig.Protocol = value.toLowerCase() === 'tcp' ? 'tcp' : 'udp';
          break;
        case 'cipher':
          const validCiphers = ["null", "aes128-cbc", "aes192-cbc", "aes256-cbc", "aes128-gcm", "aes192-gcm", "aes256-gcm", "blowfish128"];
          if (validCiphers.includes(value as any)) {
            parsedConfig.Cipher = value as typeof parsedConfig.Cipher;
          }
          break;
        case 'auth-user-pass':
          // OpenVPN uses external auth, we'll need username/password to be filled manually
          break;
        default:
          // Store unknown directives in extra config
          extraConfigLines.push(trimmedLine);
          break;
      }
    }
    
    // Note: ExtraConfig not available in current type, storing in a comment instead
    
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
        const parsedConfig = await parseOpenVPNConfig(content);
        await onUpdate$(parsedConfig);
      } catch (error) {
        console.error('Failed to read config file:', error);
      }
    }
  });
  
  // Handle config content change
  const handleConfigChange$ = $(async (content: string) => {
    configContent.value = content;
    const parsedConfig = await parseOpenVPNConfig(content);
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
          protocolName="OpenVPN"
          acceptedExtensions=".ovpn,.conf"
          configValue={configContent.value}
          onConfigChange$={handleConfigChange$}
          onFileUpload$={handleFileUpload$}
          placeholder={$localize`Paste your OpenVPN configuration here. It should include directives like 'remote', 'proto', 'dev', etc.

Example:
client
dev tun
proto udp
remote vpn.example.com 1194
auth-user-pass
cipher AES-256-GCM
auth SHA256`}
        />
      )}

      {/* Manual Configuration Option */}
      {configMethod.value === "manual" && (
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
            onInput$={(event: Event, value: string) =>
              onUpdate$({
                Server: {
                  Address: value,
                  Port: config.Server?.Port || 1194,
                },
              })
            }
            placeholder="vpn.example.com"
            validation={errors.ServerAddress ? "invalid" : "default"}
          />
          {errors.ServerAddress && (
            <ErrorMessage message={errors.ServerAddress} />
          )}
        </div>

        <div>
          <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
            {$localize`Server Port`} *
          </label>
          <Input
            type="number"
            value={config.Server?.Port?.toString() || ""}
            onInput$={(event: Event, value: string) =>
              onUpdate$({
                Server: {
                  Address: config.Server?.Address || "",
                  Port: parseInt(value) || 1194,
                },
              })
            }
            placeholder="1194"
            validation={errors.ServerPort ? "invalid" : "default"}
          />
          {errors.ServerPort && (
            <ErrorMessage message={errors.ServerPort} />
          )}
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
            onInput$={(event: Event, value: string) =>
              onUpdate$({ 
                Credentials: { 
                  ...config.Credentials, 
                  Username: value,
                  Password: config.Credentials?.Password || ""
                } 
              })
            }
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
            type="password"
            value={config.Credentials?.Password || ""}
            onInput$={(event: Event, value: string) =>
              onUpdate$({ 
                Credentials: { 
                  ...config.Credentials, 
                  Username: config.Credentials?.Username || "",
                  Password: value
                } 
              })
            }
            placeholder="Your password"
            validation={errors.Password ? "invalid" : "default"}
          />
          {errors.Password && (
            <ErrorMessage message={errors.Password} />
          )}
        </div>
      </div>

      {/* Protocol and Cipher */}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
            {$localize`Protocol`}
          </label>
          <Select
            value={config.Protocol || "udp"}
            onChange$={(value: any) =>
              onUpdate$({ Protocol: value })
            }
            options={[
              { label: "UDP", value: "udp" },
              { label: "TCP", value: "tcp" }
            ]}
            placeholder="Select protocol"
          />
        </div>

        <div>
          <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
            {$localize`Cipher`}
          </label>
          <Input
            type="text"
            value={config.Cipher || ""}
            onInput$={(event: Event, value: string) =>
              onUpdate$({ Cipher: value as any })
            }
            placeholder="AES-256-CBC"
          />
        </div>
      </div>

      {/* Advanced Settings */}
      {mode === "advanced" && (
        <>
          <div>
            <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
              {$localize`CA Certificate`}
            </label>
            <TextArea
              value={config.Certificates?.CaCertificateContent || ""}
              onInput$={(event: InputEvent, element: HTMLTextAreaElement) =>
                onUpdate$({ 
                  Certificates: {
                    ...config.Certificates,
                    CaCertificateContent: element.value
                  }
                })
              }
              placeholder="-----BEGIN CERTIFICATE-----"
              rows={6}
            />
          </div>

          <div>
            <label class="text-text-default mb-1 block text-sm font-medium dark:text-text-dark-default">
              {$localize`Extra Configuration`}
            </label>
            <TextArea
              value={""}
              onInput$={(event: InputEvent, element: HTMLTextAreaElement) =>
                // Note: ExtraConfig not available in current type
                console.log('Extra config:', element.value)
              }
              placeholder="comp-lzo\npersist-key\npersist-tun"
              rows={6}
            />
          </div>
        </>
      )}
        </div>
      )}
    </div>
  );
});