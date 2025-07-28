import { component$, useSignal, $ } from "@builder.io/qwik";
import { VPNConfigFileSection } from "../index";

interface VPNScenario {
  name: string;
  description: string;
  protocol: string;
  extensions: string;
  useCase: string;
  sampleConfig: string;
}

export default component$(() => {
  const selectedScenario = useSignal(0);
  const configs = useSignal<string[]>(["", "", "", ""]);
  const isUploading = useSignal<boolean[]>([false, false, false, false]);
  const uploadProgress = useSignal<number[]>([0, 0, 0, 0]);

  const scenarios: VPNScenario[] = [
    {
      name: "Corporate Remote Access",
      description:
        "Secure connection for remote workers to access company resources",
      protocol: "OpenVPN",
      extensions: ".ovpn,.conf",
      useCase:
        "Enterprise employees working from home need secure access to internal servers, databases, and applications while maintaining company security policies.",
      sampleConfig: `# Corporate OpenVPN Configuration
client
dev tun
proto udp
remote vpn.company.com 1194
resolv-retry infinite
nobind
persist-key
persist-tun

# Certificates
ca company-ca.crt
cert employee.crt
key employee.key

# Security settings
auth SHA256
cipher AES-256-CBC
tls-auth ta.key 1

# Company-specific routes
route 10.0.0.0 255.0.0.0
route 172.16.0.0 255.240.0.0

# DNS settings
dhcp-option DNS 10.0.1.10
dhcp-option DNS 10.0.1.11
dhcp-option DOMAIN company.local

comp-lzo
verb 3`,
    },
    {
      name: "Gaming & Low Latency",
      description: "High-performance VPN for gaming with minimal latency",
      protocol: "WireGuard",
      extensions: ".conf",
      useCase:
        "Gamers who need to connect to different regions while maintaining low ping times and stable connections for competitive gaming.",
      sampleConfig: `# Gaming WireGuard Configuration
[Interface]
# Gaming client configuration
PrivateKey = your-gaming-private-key-here
Address = 10.100.0.2/32
DNS = 1.1.1.1, 1.0.0.1

# Optional: MTU optimization for gaming
MTU = 1420

[Peer]
# Gaming server optimized for low latency
PublicKey = server-public-key-for-low-latency
Endpoint = gaming-vpn.example.com:51820
AllowedIPs = 0.0.0.0/0

# Keep connection alive for gaming
PersistentKeepalive = 25`,
    },
    {
      name: "Mobile Device Setup",
      description: "VPN configuration optimized for mobile devices",
      protocol: "IKEv2",
      extensions: ".conf,.mobileconfig",
      useCase:
        "Mobile users who frequently switch between Wi-Fi and cellular networks need a VPN that can handle connection changes seamlessly.",
      sampleConfig: `# Mobile IKEv2 Configuration
[connection]
# Server details
server = mobile-vpn.example.com
username = mobile-user@example.com
password = secure-mobile-password

# IKEv2 specific settings
ikev2 = yes
auto = start

# Mobile optimization
mobike = yes
esp = aes256-sha256-modp2048!
ike = aes256-sha256-modp2048!

# Certificate validation
ca = mobile-ca.crt
cert = mobile-client.crt
key = mobile-client.key

# Split tunneling for mobile data savings
leftsubnet = 10.10.0.0/16
rightsubnet = 0.0.0.0/0

# Mobile-friendly settings
closeaction = restart
dpdaction = restart
dpddelay = 30
dpdtimeout = 120`,
    },
    {
      name: "Privacy & Anonymity",
      description: "Maximum privacy configuration with traffic obfuscation",
      protocol: "OpenVPN",
      extensions: ".ovpn,.conf",
      useCase:
        "Users in restrictive environments who need maximum anonymity and the ability to bypass deep packet inspection and traffic analysis.",
      sampleConfig: `# Privacy-focused OpenVPN Configuration
client
dev tun
proto tcp-client
port 443
remote privacy-vpn.example.com 443

# Stealth and obfuscation
scramble obfuscate yourpassword
remote-random

# Multiple fallback servers
remote privacy-vpn2.example.com 443
remote privacy-vpn3.example.com 80

resolv-retry infinite
nobind
persist-key
persist-tun

# Maximum security
auth SHA512
cipher AES-256-GCM
tls-cipher TLS-ECDHE-ECDSA-WITH-AES-256-GCM-SHA384
tls-version-min 1.2

# Perfect Forward Secrecy
tls-auth ta.key 1
reneg-sec 3600

# Certificates
ca privacy-ca.crt
cert privacy-client.crt
key privacy-client.key

# Anti-tracking
script-security 2
up /etc/openvpn/update-resolv-conf
down /etc/openvpn/update-resolv-conf

# Kill switch equivalent
redirect-gateway def1

# Privacy DNS
dhcp-option DNS 9.9.9.9
dhcp-option DNS 149.112.112.112

comp-lzo
verb 1`,
    },
  ];

  const handleConfigChange = $((index: number, value: string) => {
    configs.value = configs.value.map((config, i) =>
      i === index ? value : config,
    );
  });

  const handleFileUpload = $(
    async (index: number, event: Event, element: HTMLInputElement) => {
      const file = element.files?.[0];

      if (file) {
        // Update uploading state
        isUploading.value = isUploading.value.map((state, i) =>
          i === index ? true : state,
        );

        // Simulate upload progress
        const progressInterval = setInterval(() => {
          uploadProgress.value = uploadProgress.value.map((progress, i) => {
            if (i === index) {
              const newProgress = progress + Math.random() * 15 + 5;
              return Math.min(newProgress, 100);
            }
            return progress;
          });
        }, 150);

        try {
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target?.result as string;

            setTimeout(() => {
              clearInterval(progressInterval);

              // Update config
              configs.value = configs.value.map((config, i) =>
                i === index ? content : config,
              );

              // Reset states
              isUploading.value = isUploading.value.map((state, i) =>
                i === index ? false : state,
              );
              uploadProgress.value = uploadProgress.value.map((progress, i) =>
                i === index ? 0 : progress,
              );
            }, 1000);
          };

          reader.onerror = () => {
            clearInterval(progressInterval);
            isUploading.value = isUploading.value.map((state, i) =>
              i === index ? false : state,
            );
            uploadProgress.value = uploadProgress.value.map((progress, i) =>
              i === index ? 0 : progress,
            );
          };

          reader.readAsText(file);
        } catch (error) {
          clearInterval(progressInterval);
          isUploading.value = isUploading.value.map((state, i) =>
            i === index ? false : state,
          );
          console.error("Upload error:", error);
        }
      }
    },
  );

  const loadSampleConfig = $((index: number) => {
    configs.value = configs.value.map((config, i) =>
      i === index ? scenarios[index].sampleConfig : config,
    );
  });

  const clearAllConfigs = $(() => {
    configs.value = ["", "", "", ""];
  });

  return (
    <div class="space-y-8">
      {/* Header */}
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Real-world VPN Configuration Examples
            </h3>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Common VPN use cases with realistic configuration examples
            </p>
          </div>
          <button
            onClick$={clearAllConfigs}
            class="inline-flex items-center rounded-md bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Scenario Selector */}
      <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {scenarios.map((scenario, index) => (
          <button
            key={index}
            onClick$={() => (selectedScenario.value = index)}
            class={`rounded-lg border p-4 text-left transition-all duration-200 ${
              selectedScenario.value === index
                ? "border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-950/20"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500 dark:hover:bg-gray-700"
            }`}
          >
            <h4 class="font-medium text-gray-900 dark:text-gray-100">
              {scenario.name}
            </h4>
            <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
              {scenario.protocol}
            </p>
          </button>
        ))}
      </div>

      {/* Selected Scenario Details */}
      <div class="rounded-lg border border-gray-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950/20">
        <div class="flex items-start">
          <svg
            class="mt-0.5 h-5 w-5 text-blue-400"
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
            <h4 class="text-sm font-medium text-blue-800 dark:text-blue-300">
              {scenarios[selectedScenario.value].name}
            </h4>
            <p class="mt-1 text-sm text-blue-700 dark:text-blue-400">
              {scenarios[selectedScenario.value].description}
            </p>
            <p class="mt-2 text-sm text-blue-600 dark:text-blue-500">
              <strong>Use Case:</strong>{" "}
              {scenarios[selectedScenario.value].useCase}
            </p>
          </div>
        </div>
      </div>

      {/* Configuration Sections */}
      <div class="grid gap-6 lg:grid-cols-2">
        {scenarios.map((scenario, index) => (
          <div
            key={index}
            class={`rounded-lg border transition-all duration-200 ${
              selectedScenario.value === index
                ? "border-primary-200 bg-primary-50/50 dark:border-primary-800 dark:bg-primary-950/10"
                : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
            }`}
          >
            <div class="p-6">
              <div class="mb-4 flex items-center justify-between">
                <h4 class="font-medium text-gray-900 dark:text-gray-100">
                  {scenario.name}
                </h4>
                <button
                  onClick$={() => loadSampleConfig(index)}
                  class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Load Sample
                </button>
              </div>

              <VPNConfigFileSection
                protocolName={scenario.protocol}
                acceptedExtensions={scenario.extensions}
                configValue={configs.value[index]}
                onConfigChange$={(value) => handleConfigChange(index, value)}
                onFileUpload$={(event, element) =>
                  handleFileUpload(index, event, element)
                }
                isUploading={isUploading.value[index]}
                uploadProgress={uploadProgress.value[index]}
                placeholder={`Paste your ${scenario.protocol} configuration for ${scenario.name.toLowerCase()}...`}
              />

              {/* Configuration Stats */}
              {configs.value[index] && (
                <div class="mt-4 rounded-md bg-gray-50 p-3 dark:bg-gray-900">
                  <div class="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>
                      Lines: {configs.value[index].split("\n").length}
                    </span>
                    <span>Characters: {configs.value[index].length}</span>
                    <span>
                      Size: {new Blob([configs.value[index]]).size} bytes
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Configuration Summary */}
      <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
        <h4 class="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
          Configuration Summary
        </h4>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {scenarios.map((scenario, index) => (
            <div
              key={index}
              class="rounded-md border border-gray-200 bg-white p-3 dark:border-gray-600 dark:bg-gray-800"
            >
              <div class="flex items-center justify-between">
                <h5 class="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {scenario.name}
                </h5>
                <span
                  class={`inline-flex h-2 w-2 rounded-full ${
                    configs.value[index]
                      ? "bg-green-400"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              </div>
              <p class="mt-1 text-xs text-gray-500">
                {configs.value[index]
                  ? `${configs.value[index].length} chars`
                  : "Empty"}
              </p>
              <p class="text-xs text-gray-400">{scenario.protocol}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
