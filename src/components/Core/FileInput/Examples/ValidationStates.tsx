import { component$, useSignal, $ } from "@builder.io/qwik";
import { ConfigFileInput, VPNConfigFileSection } from "../index";

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  info: string[];
}

export default component$(() => {
  const config = useSignal("");
  const validation = useSignal<ValidationResult>({
    isValid: true,
    errors: [],
    warnings: [],
    info: [],
  });
  const selectedProtocol = useSignal<"OpenVPN" | "Wireguard" | "L2TP">(
    "OpenVPN",
  );
  const isUploading = useSignal(false);
  const uploadProgress = useSignal(0);
  const showAdvancedValidation = useSignal(false);

  const validateConfig = $(
    (configText: string, protocol: string): ValidationResult => {
      const result: ValidationResult = {
        isValid: true,
        errors: [],
        warnings: [],
        info: [],
      };

      if (!configText.trim()) {
        result.errors.push("Configuration cannot be empty");
        result.isValid = false;
        return result;
      }

      // Protocol-specific validation
      switch (protocol) {
        case "OpenVPN":
          // Required directives
          if (!configText.includes("remote")) {
            result.errors.push("Missing required 'remote' directive");
            result.isValid = false;
          }
          if (!configText.includes("dev")) {
            result.errors.push("Missing required 'dev' directive");
            result.isValid = false;
          }

          // Security warnings
          if (
            configText.includes("auth-nocache") &&
            configText.includes("auth-user-pass")
          ) {
            result.warnings.push(
              "Using auth-nocache with stored credentials may be insecure",
            );
          }
          if (configText.includes("cipher") && !configText.includes("auth")) {
            result.warnings.push(
              "Cipher specified without auth - consider adding authentication",
            );
          }

          // Info
          if (configText.includes("comp-lzo")) {
            result.info.push("LZO compression is enabled");
          }
          if (configText.includes("verb")) {
            const verbMatch = configText.match(/verb\s+(\d+)/);
            if (verbMatch) {
              result.info.push(`Verbosity level set to ${verbMatch[1]}`);
            }
          }
          break;

        case "Wireguard":
          // Required sections
          if (!configText.includes("[Interface]")) {
            result.errors.push("Missing required [Interface] section");
            result.isValid = false;
          }
          if (!configText.includes("[Peer]")) {
            result.errors.push("Missing required [Peer] section");
            result.isValid = false;
          }

          // Required keys
          if (!configText.includes("PrivateKey")) {
            result.errors.push("Missing required PrivateKey in [Interface]");
            result.isValid = false;
          }
          if (!configText.includes("PublicKey")) {
            result.errors.push("Missing required PublicKey in [Peer]");
            result.isValid = false;
          }

          // Warnings
          if (!configText.includes("DNS")) {
            result.warnings.push(
              "No DNS servers specified - may cause resolution issues",
            );
          }
          if (!configText.includes("PersistentKeepalive")) {
            result.warnings.push(
              "No PersistentKeepalive - connection may drop behind NAT",
            );
          }

          // Info
          if (configText.includes("MTU")) {
            const mtuMatch = configText.match(/MTU\s*=\s*(\d+)/);
            if (mtuMatch) {
              result.info.push(`Custom MTU set to ${mtuMatch[1]}`);
            }
          }
          break;

        case "L2TP":
          // Basic validation
          if (!configText.includes("server")) {
            result.errors.push("Missing server configuration");
            result.isValid = false;
          }
          if (
            configText.includes("password") &&
            configText.match(/password\s*=\s*$/m)
          ) {
            result.warnings.push("Empty password specified");
          }
          break;
      }

      // Common validations
      const lines = configText.split("\n");
      if (lines.length > 200) {
        result.warnings.push(
          "Configuration is very long - verify all settings are necessary",
        );
      }

      // Check for common security issues
      if (
        configText.toLowerCase().includes("password") &&
        configText.match(/password.*=.*[^*]/i)
      ) {
        result.warnings.push(
          "Plain text passwords detected - ensure secure storage",
        );
      }

      // Check for comments and documentation
      const commentLines = lines.filter((line) =>
        line.trim().startsWith("#"),
      ).length;
      if (commentLines === 0 && lines.length > 10) {
        result.info.push(
          "Consider adding comments to document your configuration",
        );
      }

      return result;
    },
  );

  const handleConfigChange = $(async (value: string) => {
    config.value = value;
    validation.value = await validateConfig(value, selectedProtocol.value);
  });

  const handleFileUpload = $((event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      // Validate file size
      const maxSize = 1024 * 1024; // 1MB
      if (file.size > maxSize) {
        validation.value = {
          isValid: false,
          errors: [
            `File too large: ${Math.round(file.size / 1024)}KB (max 1MB)`,
          ],
          warnings: [],
          info: [],
        };
        return;
      }

      // Validate file extension
      const validExtensions =
        selectedProtocol.value === "OpenVPN" ? [".ovpn", ".conf"] : [".conf"];

      const hasValidExtension = validExtensions.some((ext) =>
        file.name.toLowerCase().endsWith(ext),
      );

      if (!hasValidExtension) {
        validation.value = {
          isValid: false,
          errors: [
            `Invalid file extension. Expected: ${validExtensions.join(", ")}`,
          ],
          warnings: [],
          info: [],
        };
        return;
      }

      isUploading.value = true;
      uploadProgress.value = 0;

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        uploadProgress.value += Math.random() * 20 + 5;
        if (uploadProgress.value >= 100) {
          uploadProgress.value = 100;
          clearInterval(progressInterval);
        }
      }, 100);

      const reader = new FileReader();
      reader.onload = (e) => {
        setTimeout(async () => {
          const content = e.target?.result as string;
          config.value = content;
          validation.value = await validateConfig(content, selectedProtocol.value);
          isUploading.value = false;
          uploadProgress.value = 0;
          clearInterval(progressInterval);
        }, 1000);
      };

      reader.onerror = () => {
        validation.value = {
          isValid: false,
          errors: ["Failed to read file - file may be corrupted"],
          warnings: [],
          info: [],
        };
        isUploading.value = false;
        uploadProgress.value = 0;
        clearInterval(progressInterval);
      };

      reader.readAsText(file);
    }
  });

  const loadInvalidConfig = $(async () => {
    const invalidConfigs = {
      OpenVPN: `# Invalid OpenVPN config - missing required directives
client
# Missing remote and dev directives
proto udp
ca ca.crt
cert client.crt
key client.key`,
      Wireguard: `# Invalid WireGuard config - missing required sections
[Interface]
Address = 10.0.0.2/32
# Missing PrivateKey

# Missing [Peer] section entirely`,
      L2TP: `# Invalid L2TP config
[connection]
username = user
password = 
# Missing server directive`,
    };

    config.value = invalidConfigs[selectedProtocol.value];
    validation.value = await validateConfig(config.value, selectedProtocol.value);
  });

  const loadValidConfig = $(async () => {
    const validConfigs = {
      OpenVPN: `# Valid OpenVPN configuration
client
dev tun
proto udp
remote vpn.example.com 1194
resolv-retry infinite
nobind
persist-key
persist-tun
ca ca.crt
cert client.crt
key client.key
auth SHA256
cipher AES-256-CBC
comp-lzo
verb 3`,
      Wireguard: `# Valid WireGuard configuration
[Interface]
PrivateKey = your-private-key-here
Address = 10.0.0.2/32
DNS = 1.1.1.1, 1.0.0.1

[Peer]
PublicKey = server-public-key-here
Endpoint = vpn.example.com:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25`,
      L2TP: `# Valid L2TP configuration
[connection]
server = vpn.example.com
username = user@example.com
password = secure-password
preshared-key = shared-secret`,
    };

    config.value = validConfigs[selectedProtocol.value];
    validation.value = await validateConfig(config.value, selectedProtocol.value);
  });

  return (
    <div class="space-y-6">
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Validation & Error Handling Examples
        </h3>

        <div class="mb-6 flex flex-wrap gap-2">
          <button
            onClick$={loadValidConfig}
            class="inline-flex items-center rounded-md bg-green-100 px-3 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
          >
            Load Valid Config
          </button>
          <button
            onClick$={loadInvalidConfig}
            class="inline-flex items-center rounded-md bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
          >
            Load Invalid Config
          </button>
          <button
            onClick$={() =>
              (showAdvancedValidation.value = !showAdvancedValidation.value)
            }
            class="inline-flex items-center rounded-md bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
          >
            {showAdvancedValidation.value ? "Hide" : "Show"} Advanced Validation
          </button>
        </div>

        {/* Protocol Selector */}
        <div class="mb-4">
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Protocol:
          </label>
          <div class="flex gap-2">
            {(["OpenVPN", "Wireguard", "L2TP"] as const).map((protocol) => (
              <button
                key={protocol}
                onClick$={async () => {
                  selectedProtocol.value = protocol;
                  if (config.value) {
                    validation.value = await validateConfig(config.value, protocol);
                  }
                }}
                class={`rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedProtocol.value === protocol
                    ? "border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-950/20 dark:text-primary-300"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-700"
                }`}
              >
                {protocol}
              </button>
            ))}
          </div>
        </div>

        {/* File Input with Basic Validation */}
        <div class="mb-6">
          <h4 class="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Basic File Input (ConfigFileInput)
          </h4>
          <ConfigFileInput
            config={config.value}
            onConfigChange$={handleConfigChange}
            onFileUpload$={handleFileUpload}
            vpnType={selectedProtocol.value}
          />
        </div>

        {/* Advanced File Input with Drag & Drop */}
        {showAdvancedValidation.value && (
          <div class="mb-6">
            <h4 class="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Advanced File Input (VPNConfigFileSection)
            </h4>
            <VPNConfigFileSection
              protocolName={selectedProtocol.value}
              acceptedExtensions={
                selectedProtocol.value === "OpenVPN" ? ".ovpn,.conf" : ".conf"
              }
              configValue={config.value}
              onConfigChange$={handleConfigChange}
              onFileUpload$={(event, _element) => handleFileUpload(event)}
              isUploading={isUploading.value}
              uploadProgress={uploadProgress.value}
            />
          </div>
        )}
      </div>

      {/* Validation Results */}
      {(validation.value.errors.length > 0 ||
        validation.value.warnings.length > 0 ||
        validation.value.info.length > 0) && (
        <div class="space-y-4">
          {/* Errors */}
          {validation.value.errors.length > 0 && (
            <div class="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/20">
              <div class="flex">
                <svg
                  class="h-5 w-5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800 dark:text-red-300">
                    Configuration Errors ({validation.value.errors.length})
                  </h3>
                  <div class="mt-2 text-sm text-red-700 dark:text-red-400">
                    <ul class="list-inside list-disc space-y-1">
                      {validation.value.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Warnings */}
          {validation.value.warnings.length > 0 && (
            <div class="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/20">
              <div class="flex">
                <svg
                  class="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                    Configuration Warnings ({validation.value.warnings.length})
                  </h3>
                  <div class="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
                    <ul class="list-inside list-disc space-y-1">
                      {validation.value.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info */}
          {validation.value.info.length > 0 && (
            <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
              <div class="flex">
                <svg
                  class="h-5 w-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-blue-800 dark:text-blue-300">
                    Configuration Info ({validation.value.info.length})
                  </h3>
                  <div class="mt-2 text-sm text-blue-700 dark:text-blue-400">
                    <ul class="list-inside list-disc space-y-1">
                      {validation.value.info.map((info, index) => (
                        <li key={index}>{info}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Validation Status */}
      <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Validation Status
          </h4>
          <div
            class={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              validation.value.isValid
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
            }`}
          >
            {validation.value.isValid ? "Valid" : "Invalid"}
          </div>
        </div>
        <div class="mt-2 text-xs text-gray-500">
          Protocol: {selectedProtocol.value} | Characters: {config.value.length}{" "}
          | Lines: {config.value.split("\n").length}
        </div>
      </div>
    </div>
  );
});
