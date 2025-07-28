import { component$, useSignal, $ } from "@builder.io/qwik";
import { ConfigFileInput } from "../index";

type VPNProtocol = "OpenVPN" | "Wireguard" | "L2TP" | "PPTP" | "SSTP" | "IKEv2";

export default component$(() => {
  const selectedProtocol = useSignal<VPNProtocol>("Wireguard");
  const configs = useSignal<Record<VPNProtocol, string>>({
    OpenVPN: "",
    Wireguard: "",
    L2TP: "",
    PPTP: "",
    SSTP: "",
    IKEv2: "",
  });
  const uploadStatus = useSignal("");

  const protocolInfo: Record<
    VPNProtocol,
    {
      description: string;
      extensions: string;
      sampleConfig: string;
    }
  > = {
    OpenVPN: {
      description: "OpenVPN is a robust and highly flexible VPN protocol",
      extensions: ".ovpn, .conf",
      sampleConfig: `client
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
comp-lzo
verb 3`,
    },
    Wireguard: {
      description: "WireGuard is a modern, fast, and secure VPN protocol",
      extensions: ".conf",
      sampleConfig: `[Interface]
PrivateKey = your-private-key-here
Address = 10.0.0.2/32
DNS = 1.1.1.1

[Peer]
PublicKey = server-public-key-here
Endpoint = vpn.example.com:51820
AllowedIPs = 0.0.0.0/0`,
    },
    L2TP: {
      description: "L2TP/IPSec provides good security and compatibility",
      extensions: ".conf",
      sampleConfig: `[connection]
server = vpn.example.com
username = your-username
password = your-password
preshared-key = your-psk
auth-method = psk`,
    },
    PPTP: {
      description: "PPTP is legacy but widely supported",
      extensions: ".conf",
      sampleConfig: `[connection]
server = vpn.example.com
username = your-username
password = your-password
domain = optional-domain`,
    },
    SSTP: {
      description: "SSTP works well through firewalls and NAT",
      extensions: ".conf",
      sampleConfig: `[connection]
server = vpn.example.com
username = your-username
password = your-password
certificate = server.crt`,
    },
    IKEv2: {
      description: "IKEv2 is fast and handles network changes well",
      extensions: ".conf",
      sampleConfig: `[connection]
server = vpn.example.com
username = your-username
password = your-password
certificate = ca.crt
identity = client.example.com`,
    },
  };

  const handleConfigChange = $((value: string) => {
    configs.value = {
      ...configs.value,
      [selectedProtocol.value]: value,
    };
    uploadStatus.value = "";
  });

  const handleFileUpload = $((event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      uploadStatus.value = "Uploading...";

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        configs.value = {
          ...configs.value,
          [selectedProtocol.value]: content,
        };
        uploadStatus.value = `Uploaded: ${file.name}`;
        setTimeout(() => {
          uploadStatus.value = "";
        }, 3000);
      };
      reader.onerror = () => {
        uploadStatus.value = "Upload failed. Please try again.";
        setTimeout(() => {
          uploadStatus.value = "";
        }, 3000);
      };
      reader.readAsText(file);
    }
  });

  const loadSampleConfig = $(() => {
    const sample = protocolInfo[selectedProtocol.value].sampleConfig;
    configs.value = {
      ...configs.value,
      [selectedProtocol.value]: sample,
    };
    uploadStatus.value = "Sample configuration loaded";
    setTimeout(() => {
      uploadStatus.value = "";
    }, 2000);
  });

  return (
    <div class="space-y-6">
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Multiple VPN Protocol Types
        </h3>

        {/* Protocol Selector */}
        <div class="mb-6">
          <label class="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select VPN Protocol:
          </label>
          <div class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
            {(Object.keys(protocolInfo) as VPNProtocol[]).map((protocol) => (
              <button
                key={protocol}
                onClick$={() => (selectedProtocol.value = protocol)}
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

        {/* Protocol Info */}
        <div class="mb-4 rounded-md bg-blue-50 p-4 dark:bg-blue-950/20">
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
                {selectedProtocol.value} Protocol
              </h4>
              <p class="mt-1 text-sm text-blue-700 dark:text-blue-400">
                {protocolInfo[selectedProtocol.value].description}
              </p>
              <p class="mt-1 text-xs text-blue-600 dark:text-blue-500">
                Accepted extensions:{" "}
                {protocolInfo[selectedProtocol.value].extensions}
              </p>
            </div>
          </div>
        </div>

        {/* Sample Config Button */}
        <div class="mb-4">
          <button
            onClick$={loadSampleConfig}
            class="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <svg
              class="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Load Sample Config
          </button>
        </div>

        {/* File Input Component */}
        <ConfigFileInput
          config={configs.value[selectedProtocol.value]}
          onConfigChange$={handleConfigChange}
          onFileUpload$={handleFileUpload}
          vpnType={selectedProtocol.value}
        />

        {uploadStatus.value && (
          <div
            class={`mt-4 rounded-md px-4 py-2 text-sm ${
              uploadStatus.value.includes("failed")
                ? "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400"
                : uploadStatus.value.includes("Uploading")
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400"
                  : "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400"
            }`}
          >
            {uploadStatus.value}
          </div>
        )}
      </div>

      {/* Configuration Summary */}
      <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
        <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          Configuration Summary
        </h4>
        <div class="space-y-2">
          {(Object.keys(protocolInfo) as VPNProtocol[]).map((protocol) => {
            const hasConfig = configs.value[protocol].length > 0;
            return (
              <div key={protocol} class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {protocol}:
                </span>
                <span
                  class={`text-xs ${
                    hasConfig
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-400 dark:text-gray-600"
                  }`}
                >
                  {hasConfig
                    ? `${configs.value[protocol].length} chars`
                    : "Empty"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
