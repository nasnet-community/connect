import { component$, useSignal, $ } from "@builder.io/qwik";
import { ConfigFileInput, VPNConfigFileSection } from "../index";
import type { ConfigValidationOptions, FileValidationResult, VPNProtocolType } from "../types";

/**
 * Custom Validation Example
 * 
 * Demonstrates how to implement custom validation logic for different VPN protocols
 * including format validation, network address validation, and custom rules.
 */
export default component$(() => {
  const wireguardConfig = useSignal("");
  const openVPNConfig = useSignal("");
  const validationResults = useSignal<Record<string, FileValidationResult>>({});

  // IP Address validation regex
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$/;
  const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|::[0-9a-fA-F]{1,4})(\/\d{1,3})?$/;
  
  // Port validation
  const isValidPort = $((port: string): boolean => {
    const portNum = parseInt(port, 10);
    return !isNaN(portNum) && portNum >= 1 && portNum <= 65535;
  });

  // WireGuard specific validation
  const validateWireguardConfig = $((config: string): FileValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Check for required sections
    if (!config.includes("[Interface]")) {
      errors.push("Missing required [Interface] section");
    }
    if (!config.includes("[Peer]")) {
      errors.push("Missing required [Peer] section");
    }
    
    // Validate Interface section
    const interfaceMatch = config.match(/\[Interface\]([\s\S]*?)(?=\[|$)/);
    if (interfaceMatch) {
      const interfaceContent = interfaceMatch[1];
      
      // Check for PrivateKey
      if (!interfaceContent.includes("PrivateKey")) {
        errors.push("Interface section missing PrivateKey");
      }
      
      // Check Address format
      const addressMatch = interfaceContent.match(/Address\s*=\s*(.+)/);
      if (addressMatch) {
        const addresses = addressMatch[1].split(",").map(a => a.trim());
        addresses.forEach(addr => {
          if (!ipv4Regex.test(addr) && !ipv6Regex.test(addr)) {
            errors.push(`Invalid IP address format: ${addr}`);
          }
        });
      } else {
        warnings.push("Interface section missing Address field");
      }
      
      // Check ListenPort if present
      const portMatch = interfaceContent.match(/ListenPort\s*=\s*(\d+)/);
      if (portMatch && !isValidPort(portMatch[1])) {
        errors.push(`Invalid ListenPort: ${portMatch[1]}`);
      }
    }
    
    // Validate Peer section
    const peerMatches = config.matchAll(/\[Peer\]([\s\S]*?)(?=\[|$)/g);
    let peerCount = 0;
    
    for (const peerMatch of peerMatches) {
      peerCount++;
      const peerContent = peerMatch[1];
      
      // Check for PublicKey
      if (!peerContent.includes("PublicKey")) {
        errors.push(`Peer ${peerCount} missing PublicKey`);
      }
      
      // Check Endpoint format
      const endpointMatch = peerContent.match(/Endpoint\s*=\s*(.+):(\d+)/);
      if (endpointMatch) {
        if (!isValidPort(endpointMatch[2])) {
          errors.push(`Peer ${peerCount} has invalid port: ${endpointMatch[2]}`);
        }
      } else if (peerContent.includes("Endpoint")) {
        warnings.push(`Peer ${peerCount} has invalid Endpoint format`);
      }
      
      // Check AllowedIPs
      const allowedIPsMatch = peerContent.match(/AllowedIPs\s*=\s*(.+)/);
      if (allowedIPsMatch) {
        const ips = allowedIPsMatch[1].split(",").map(ip => ip.trim());
        ips.forEach(ip => {
          if (!ipv4Regex.test(ip) && !ipv6Regex.test(ip)) {
            errors.push(`Peer ${peerCount} has invalid AllowedIP: ${ip}`);
          }
        });
      } else {
        warnings.push(`Peer ${peerCount} missing AllowedIPs`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  });

  // OpenVPN specific validation
  const validateOpenVPNConfig = $((config: string): FileValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Check for client directive
    if (!config.includes("client")) {
      warnings.push("Missing 'client' directive - assuming client configuration");
    }
    
    // Check for remote server
    const remoteMatch = config.match(/remote\s+(\S+)\s+(\d+)/);
    if (remoteMatch) {
      if (!isValidPort(remoteMatch[2])) {
        errors.push(`Invalid remote port: ${remoteMatch[2]}`);
      }
    } else {
      errors.push("Missing 'remote' directive with server and port");
    }
    
    // Check protocol
    if (!config.match(/proto\s+(udp|tcp)/)) {
      errors.push("Missing or invalid 'proto' directive (must be udp or tcp)");
    }
    
    // Check device type
    if (!config.match(/dev\s+(tun|tap)/)) {
      errors.push("Missing or invalid 'dev' directive (must be tun or tap)");
    }
    
    // Check for certificates (for non-username/password auth)
    if (!config.includes("auth-user-pass")) {
      if (!config.includes("cert") || !config.includes("key")) {
        errors.push("Missing certificate or key for certificate-based authentication");
      }
      if (!config.includes("ca")) {
        errors.push("Missing CA certificate");
      }
    }
    
    // Check cipher if specified
    const cipherMatch = config.match(/cipher\s+(\S+)/);
    if (cipherMatch) {
      const validCiphers = ["AES-128-CBC", "AES-192-CBC", "AES-256-CBC", "AES-128-GCM", "AES-192-GCM", "AES-256-GCM"];
      if (!validCiphers.includes(cipherMatch[1])) {
        warnings.push(`Uncommon cipher: ${cipherMatch[1]}`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  });

  // Custom validation options for each protocol
  const wireguardValidationOptions: ConfigValidationOptions = {
    validateFormat: true,
    checkRequiredFields: true,
    validateNetworkAddresses: true,
    customValidator: validateWireguardConfig,
  };


  const handleValidation = $(async (protocol: VPNProtocolType, config: string) => {
    if (!config) {
      validationResults.value = {
        ...validationResults.value,
        [protocol]: { isValid: true, errors: [] },
      };
      return;
    }
    
    let result: FileValidationResult;
    
    switch (protocol) {
      case "Wireguard":
        result = await validateWireguardConfig(config);
        break;
      case "OpenVPN":
        result = await validateOpenVPNConfig(config);
        break;
      default:
        result = { isValid: true, errors: [], warnings: ["No custom validation for this protocol"] };
    }
    
    validationResults.value = {
      ...validationResults.value,
      [protocol]: result,
    };
  });

  const sampleConfigs = {
    wireguardValid: `[Interface]
PrivateKey = yAnz5TF+lXXJte14tji3zlMNq+hd2rYUIgJBgB3fBmk=
Address = 10.0.0.2/24, fd42:42:42::2/128
DNS = 1.1.1.1, 8.8.8.8

[Peer]
PublicKey = xTIBA5rboUvnH4htodjb6e697QjLERt1NAB4mZqp8Dg=
Endpoint = engage.cloudflareclient.com:2408
AllowedIPs = 0.0.0.0/0, ::/0`,
    
    wireguardInvalid: `[Interface]
Address = 10.0.0.256/24
ListenPort = 99999

[Peer]
Endpoint = server.com
AllowedIPs = invalid-ip`,
    
    openVPNValid: `client
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
cipher AES-256-GCM
verb 3`,
    
    openVPNInvalid: `client
dev invalid-device
proto invalid-protocol
remote vpn.example.com 99999
cipher INVALID-CIPHER`,
  };

  return (
    <div class="space-y-8">
      {/* Introduction */}
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Custom Validation Examples
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          These examples demonstrate how to implement protocol-specific validation rules
          for VPN configuration files. Try the sample configurations to see validation in action.
        </p>
      </div>

      {/* WireGuard Validation Example */}
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h4 class="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
          WireGuard Configuration Validation
        </h4>
        
        <div class="mb-4 flex gap-2">
          <button
            onClick$={() => {
              wireguardConfig.value = sampleConfigs.wireguardValid;
              handleValidation("Wireguard", sampleConfigs.wireguardValid);
            }}
            class="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
          >
            Load Valid Config
          </button>
          <button
            onClick$={() => {
              wireguardConfig.value = sampleConfigs.wireguardInvalid;
              handleValidation("Wireguard", sampleConfigs.wireguardInvalid);
            }}
            class="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
          >
            Load Invalid Config
          </button>
        </div>
        
        <ConfigFileInput
          config={wireguardConfig.value}
          onConfigChange$={(value) => {
            wireguardConfig.value = value;
            handleValidation("Wireguard", value);
          }}
          onFileUpload$={(event) => {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const content = e.target?.result as string;
                wireguardConfig.value = content;
                handleValidation("Wireguard", content);
              };
              reader.readAsText(file);
            }
          }}
          vpnType="Wireguard"
          validationOptions={wireguardValidationOptions}
          showCharCount={true}
        />
        
        {/* Validation Results */}
        {validationResults.value.Wireguard && (
          <div class="mt-4">
            <ValidationResultDisplay result={validationResults.value.Wireguard} />
          </div>
        )}
      </div>

      {/* OpenVPN Validation Example */}
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h4 class="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
          OpenVPN Configuration Validation
        </h4>
        
        <div class="mb-4 flex gap-2">
          <button
            onClick$={() => {
              openVPNConfig.value = sampleConfigs.openVPNValid;
              handleValidation("OpenVPN", sampleConfigs.openVPNValid);
            }}
            class="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
          >
            Load Valid Config
          </button>
          <button
            onClick$={() => {
              openVPNConfig.value = sampleConfigs.openVPNInvalid;
              handleValidation("OpenVPN", sampleConfigs.openVPNInvalid);
            }}
            class="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
          >
            Load Invalid Config
          </button>
        </div>
        
        <VPNConfigFileSection
          protocolName="OpenVPN"
          acceptedExtensions=".ovpn,.conf"
          configValue={openVPNConfig.value}
          onConfigChange$={(value) => {
            openVPNConfig.value = value;
            handleValidation("OpenVPN", value);
          }}
          onFileUpload$={(event) => {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const content = e.target?.result as string;
                openVPNConfig.value = content;
                handleValidation("OpenVPN", content);
              };
              reader.readAsText(file);
            }
          }}
        />
        
        {/* Validation Results */}
        {validationResults.value.OpenVPN && (
          <div class="mt-4">
            <ValidationResultDisplay result={validationResults.value.OpenVPN} />
          </div>
        )}
      </div>

      {/* Validation Rules Reference */}
      <div class="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950/20">
        <h4 class="mb-4 text-base font-semibold text-blue-800 dark:text-blue-300">
          Validation Rules Reference
        </h4>
        
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h5 class="mb-2 text-sm font-medium text-blue-700 dark:text-blue-400">
              WireGuard Validation Rules
            </h5>
            <ul class="space-y-1 text-xs text-blue-600 dark:text-blue-500">
              <li>• Required sections: [Interface] and [Peer]</li>
              <li>• Interface must have PrivateKey</li>
              <li>• Valid IP addresses with CIDR notation</li>
              <li>• Port numbers between 1-65535</li>
              <li>• Each Peer must have PublicKey</li>
              <li>• Valid Endpoint format (host:port)</li>
              <li>• Valid AllowedIPs ranges</li>
            </ul>
          </div>
          
          <div>
            <h5 class="mb-2 text-sm font-medium text-blue-700 dark:text-blue-400">
              OpenVPN Validation Rules
            </h5>
            <ul class="space-y-1 text-xs text-blue-600 dark:text-blue-500">
              <li>• Must include 'client' directive</li>
              <li>• Required 'remote' with server and port</li>
              <li>• Protocol must be 'udp' or 'tcp'</li>
              <li>• Device must be 'tun' or 'tap'</li>
              <li>• Certificate files or auth-user-pass</li>
              <li>• Valid cipher specifications</li>
              <li>• CA certificate required</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Implementation Guide */}
      <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
        <h4 class="mb-3 text-base font-semibold text-gray-900 dark:text-gray-100">
          Implementing Custom Validation
        </h4>
        
        <pre class="overflow-x-auto rounded-md bg-gray-100 p-3 text-xs dark:bg-gray-800">
          <code>{`const customValidator = $((config: string): FileValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Your validation logic here
  if (!config.includes("required-field")) {
    errors.push("Missing required field");
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
});

const validationOptions: ConfigValidationOptions = {
  validateFormat: true,
  customValidator: customValidator,
};`}</code>
        </pre>
      </div>
    </div>
  );
});

// Helper component to display validation results
const ValidationResultDisplay = component$<{ result: FileValidationResult }>(({ result }) => {
  if (result.isValid && (!result.warnings || result.warnings.length === 0)) {
    return (
      <div class="rounded-lg bg-green-50 p-4 dark:bg-green-950/20">
        <div class="flex items-center">
          <svg class="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="ml-2 text-sm font-medium text-green-800 dark:text-green-200">
            Configuration is valid
          </span>
        </div>
      </div>
    );
  }

  return (
    <div class="space-y-3">
      {result.errors.length > 0 && (
        <div class="rounded-lg bg-red-50 p-4 dark:bg-red-950/20">
          <h5 class="mb-2 flex items-center text-sm font-medium text-red-800 dark:text-red-200">
            <svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Validation Errors ({result.errors.length})
          </h5>
          <ul class="list-disc space-y-1 pl-5 text-xs text-red-700 dark:text-red-300">
            {result.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      {result.warnings && result.warnings.length > 0 && (
        <div class="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950/20">
          <h5 class="mb-2 flex items-center text-sm font-medium text-yellow-800 dark:text-yellow-200">
            <svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Warnings ({result.warnings.length})
          </h5>
          <ul class="list-disc space-y-1 pl-5 text-xs text-yellow-700 dark:text-yellow-300">
            {result.warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});