import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { ConfigFileInput, VPNConfigFileSection } from "../index";
import { Form } from "../../Form";
import { Field } from "../../Form/Field";
import { Button } from "../../button";

interface VPNFormData {
  serverName: string;
  serverPort: string;
  protocol: "OpenVPN" | "Wireguard" | "L2TP" | "PPTP" | "SSTP" | "IKEv2";
  configFile: string;
  username: string;
  password: string;
  enableAutoConnect: boolean;
  description: string;
}

export default component$(() => {
  const formData = useStore<VPNFormData>({
    serverName: "",
    serverPort: "1194",
    protocol: "OpenVPN",
    configFile: "",
    username: "",
    password: "",
    enableAutoConnect: false,
    description: "",
  });

  const isSubmitting = useSignal(false);
  const submitStatus = useSignal<"" | "success" | "error">("");
  const formErrors = useStore<Record<string, string>>({});

  const validateForm = $(() => {
    const errors: Record<string, string> = {};

    if (!formData.serverName.trim()) {
      errors.serverName = "Server name is required";
    }

    if (!formData.serverPort.trim()) {
      errors.serverPort = "Server port is required";
    } else if (
      !/^\d+$/.test(formData.serverPort) ||
      parseInt(formData.serverPort) < 1 ||
      parseInt(formData.serverPort) > 65535
    ) {
      errors.serverPort = "Port must be a number between 1 and 65535";
    }

    if (!formData.configFile.trim()) {
      errors.configFile = "Configuration file is required";
    } else {
      // Basic config validation
      if (formData.protocol === "OpenVPN") {
        if (
          !formData.configFile.includes("remote") ||
          !formData.configFile.includes("dev")
        ) {
          errors.configFile =
            "OpenVPN config must include 'remote' and 'dev' directives";
        }
      } else if (formData.protocol === "Wireguard") {
        if (
          !formData.configFile.includes("[Interface]") ||
          !formData.configFile.includes("[Peer]")
        ) {
          errors.configFile =
            "WireGuard config must include [Interface] and [Peer] sections";
        }
      }
    }

    if (formData.protocol !== "Wireguard" && !formData.username.trim()) {
      errors.username = "Username is required for this protocol";
    }

    if (formData.protocol !== "Wireguard" && !formData.password.trim()) {
      errors.password = "Password is required for this protocol";
    }

    return errors;
  });

  const handleFormSubmit = $(async (_values: Record<string, any>) => {
    // Clear previous errors
    Object.keys(formErrors).forEach((key) => delete formErrors[key]);

    // Validate form
    const errors = await validateForm();

    if (Object.keys(errors).length > 0) {
      Object.assign(formErrors, errors);
      submitStatus.value = "error";
      return;
    }

    isSubmitting.value = true;
    submitStatus.value = "";

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock success/failure (90% success rate)
      if (Math.random() > 0.1) {
        submitStatus.value = "success";

        // Reset form after success
        setTimeout(() => {
          Object.assign(formData, {
            serverName: "",
            serverPort: "1194",
            protocol: "OpenVPN" as const,
            configFile: "",
            username: "",
            password: "",
            enableAutoConnect: false,
            description: "",
          });
          submitStatus.value = "";
        }, 3000);
      } else {
        throw new Error("Server error occurred");
      }
    } catch (error) {
      submitStatus.value = "error";
      formErrors.general =
        "Failed to save VPN configuration. Please try again.";
    } finally {
      isSubmitting.value = false;
    }
  });

  const handleConfigFileChange = $((value: string) => {
    formData.configFile = value;
    // Clear config file error when user starts typing
    if (formErrors.configFile) {
      delete formErrors.configFile;
    }
  });

  const handleFileUpload = $((event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        formData.configFile = content;
        // Clear config file error when file is uploaded
        if (formErrors.configFile) {
          delete formErrors.configFile;
        }
      };
      reader.readAsText(file);
    }
  });

  const loadSampleConfig = $(() => {
    const sampleConfigs = {
      OpenVPN: `client
dev tun
proto udp
remote ${formData.serverName || "vpn.example.com"} ${formData.serverPort || "1194"}
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
      Wireguard: `[Interface]
PrivateKey = your-private-key-here
Address = 10.0.0.2/32
DNS = 1.1.1.1

[Peer]
PublicKey = server-public-key-here
Endpoint = ${formData.serverName || "vpn.example.com"}:${formData.serverPort || "51820"}
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25`,
      L2TP: `[connection]
server = ${formData.serverName || "vpn.example.com"}
username = ${formData.username || "your-username"}
password = ${formData.password || "your-password"}
preshared-key = your-psk`,
      PPTP: `[connection]
server = ${formData.serverName || "vpn.example.com"}
username = ${formData.username || "your-username"}
password = ${formData.password || "your-password"}`,
      SSTP: `[connection]
server = ${formData.serverName || "vpn.example.com"}
username = ${formData.username || "your-username"}
password = ${formData.password || "your-password"}
certificate = server.crt`,
      IKEv2: `[connection]
server = ${formData.serverName || "vpn.example.com"}
username = ${formData.username || "your-username"}
password = ${formData.password || "your-password"}
certificate = ca.crt`,
    };

    formData.configFile = sampleConfigs[formData.protocol];
    if (formErrors.configFile) {
      delete formErrors.configFile;
    }
  });

  return (
    <div class="space-y-8">
      {/* Header */}
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Form Integration Examples
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          This example demonstrates how to integrate FileInput components with
          the Form system, including validation, error handling, and form
          submission.
        </p>
      </div>

      {/* Status Messages */}
      {submitStatus.value && (
        <div
          class={`rounded-lg border p-4 ${
            submitStatus.value === "success"
              ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
              : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"
          }`}
        >
          <div class="flex">
            <svg
              class={`h-5 w-5 ${
                submitStatus.value === "success"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              {submitStatus.value === "success" ? (
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              ) : (
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              )}
            </svg>
            <div class="ml-3">
              <h3
                class={`text-sm font-medium ${
                  submitStatus.value === "success"
                    ? "text-green-800 dark:text-green-300"
                    : "text-red-800 dark:text-red-300"
                }`}
              >
                {submitStatus.value === "success"
                  ? "VPN Configuration Saved Successfully!"
                  : "Error Saving Configuration"}
              </h3>
              <p
                class={`mt-1 text-sm ${
                  submitStatus.value === "success"
                    ? "text-green-700 dark:text-green-400"
                    : "text-red-700 dark:text-red-400"
                }`}
              >
                {submitStatus.value === "success"
                  ? "Your VPN configuration has been saved and is ready to use."
                  : formErrors.general ||
                    "Please check the form for errors and try again."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VPN Configuration Form */}
      <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <Form onSubmit$={handleFormSubmit}>
          <div class="space-y-6">
            {/* Basic Information */}
            <div>
              <h4 class="mb-4 text-base font-medium text-gray-900 dark:text-gray-100">
                Basic Information
              </h4>

              <div class="grid gap-4 md:grid-cols-2">
                <Field
                  label="Server Name"
                  type="text"
                  value={formData.serverName}
                  onValueChange$={(value) => {
                    formData.serverName = value as string;
                    if (formErrors.serverName) delete formErrors.serverName;
                  }}
                  placeholder="vpn.example.com"
                  required
                  error={formErrors.serverName}
                  helperText="Enter the VPN server hostname or IP address"
                />

                <Field
                  label="Port"
                  type="number"
                  value={formData.serverPort}
                  onValueChange$={(value) => {
                    formData.serverPort = value as string;
                    if (formErrors.serverPort) delete formErrors.serverPort;
                  }}
                  placeholder="1194"
                  required
                  error={formErrors.serverPort}
                  helperText="Server port number (1-65535)"
                />
              </div>
            </div>

            {/* Protocol Selection */}
            <div>
              <h4 class="mb-4 text-base font-medium text-gray-900 dark:text-gray-100">
                Protocol Configuration
              </h4>

              <div class="mb-4">
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  VPN Protocol
                </label>
                <div class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
                  {(
                    [
                      "OpenVPN",
                      "Wireguard",
                      "L2TP",
                      "PPTP",
                      "SSTP",
                      "IKEv2",
                    ] as const
                  ).map((protocol) => (
                    <button
                      key={protocol}
                      type="button"
                      onClick$={() => {
                        formData.protocol = protocol;
                        formData.configFile = ""; // Clear config when protocol changes
                      }}
                      class={`rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 ${
                        formData.protocol === protocol
                          ? "border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-950/20 dark:text-primary-300"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-700"
                      }`}
                    >
                      {protocol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Configuration File Upload */}
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Configuration File *
                  </label>
                  <button
                    type="button"
                    onClick$={loadSampleConfig}
                    class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Load Sample
                  </button>
                </div>

                {/* Different input based on screen size preference */}
                <div class="block md:hidden">
                  {/* Mobile: Use basic ConfigFileInput */}
                  <ConfigFileInput
                    config={formData.configFile}
                    onConfigChange$={handleConfigFileChange}
                    onFileUpload$={handleFileUpload}
                    vpnType={formData.protocol}
                  />
                </div>

                <div class="hidden md:block">
                  {/* Desktop: Use advanced VPNConfigFileSection */}
                  <VPNConfigFileSection
                    protocolName={formData.protocol}
                    acceptedExtensions={
                      formData.protocol === "OpenVPN" ? ".ovpn,.conf" : ".conf"
                    }
                    configValue={formData.configFile}
                    onConfigChange$={handleConfigFileChange}
                    onFileUpload$={(event, _element) => handleFileUpload(event)}
                  />
                </div>

                {formErrors.configFile && (
                  <div class="text-sm text-red-600 dark:text-red-400">
                    {formErrors.configFile}
                  </div>
                )}
              </div>
            </div>

            {/* Authentication (not needed for WireGuard) */}
            {formData.protocol !== "Wireguard" && (
              <div>
                <h4 class="mb-4 text-base font-medium text-gray-900 dark:text-gray-100">
                  Authentication
                </h4>

                <div class="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Username"
                    type="text"
                    value={formData.username}
                    onValueChange$={(value) => {
                      formData.username = value as string;
                      if (formErrors.username) delete formErrors.username;
                    }}
                    placeholder="your-username"
                    required
                    error={formErrors.username}
                    helperText="Your VPN account username"
                  />

                  <Field
                    label="Password"
                    type="password"
                    value={formData.password}
                    onValueChange$={(value) => {
                      formData.password = value as string;
                      if (formErrors.password) delete formErrors.password;
                    }}
                    placeholder="your-password"
                    required
                    error={formErrors.password}
                    helperText="Your VPN account password"
                  />
                </div>
              </div>
            )}

            {/* Additional Options */}
            <div>
              <h4 class="mb-4 text-base font-medium text-gray-900 dark:text-gray-100">
                Additional Options
              </h4>

              <div class="space-y-4">
                <Field
                  label="Auto-connect on startup"
                  type="checkbox"
                  value={formData.enableAutoConnect}
                  onValueChange$={(value) => {
                    formData.enableAutoConnect = value as boolean;
                  }}
                  helperText="Automatically connect to this VPN when the system starts"
                />

                <Field
                  label="Description"
                  type="text"
                  value={formData.description}
                  onValueChange$={(value) => {
                    formData.description = value as string;
                  }}
                  placeholder="Optional description for this VPN configuration..."
                  helperText="Add a description to help identify this configuration"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div class="flex justify-end space-x-3 border-t border-gray-200 pt-6 dark:border-gray-700">
              <Button
                type="button"
                variant="secondary"
                disabled={isSubmitting.value}
                onClick$={() => {
                  // Reset form
                  Object.assign(formData, {
                    serverName: "",
                    serverPort: "1194",
                    protocol: "OpenVPN" as const,
                    configFile: "",
                    username: "",
                    password: "",
                    enableAutoConnect: false,
                    description: "",
                  });
                  // Clear errors
                  Object.keys(formErrors).forEach(
                    (key) => delete formErrors[key],
                  );
                  submitStatus.value = "";
                }}
              >
                Reset
              </Button>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting.value}
                loading={isSubmitting.value}
              >
                {isSubmitting.value ? "Saving..." : "Save Configuration"}
              </Button>
            </div>
          </div>
        </Form>
      </div>

      {/* Form Data Preview */}
      <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
        <h4 class="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
          Current Form Data
        </h4>

        <div class="grid gap-4 text-xs">
          <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <span class="font-medium text-gray-700 dark:text-gray-300">
                Server:
              </span>
              <div class="text-gray-600 dark:text-gray-400">
                {formData.serverName || "(empty)"}
              </div>
            </div>
            <div>
              <span class="font-medium text-gray-700 dark:text-gray-300">
                Port:
              </span>
              <div class="text-gray-600 dark:text-gray-400">
                {formData.serverPort}
              </div>
            </div>
            <div>
              <span class="font-medium text-gray-700 dark:text-gray-300">
                Protocol:
              </span>
              <div class="text-gray-600 dark:text-gray-400">
                {formData.protocol}
              </div>
            </div>
            <div>
              <span class="font-medium text-gray-700 dark:text-gray-300">
                Auto-connect:
              </span>
              <div class="text-gray-600 dark:text-gray-400">
                {formData.enableAutoConnect ? "Yes" : "No"}
              </div>
            </div>
          </div>

          <div>
            <span class="font-medium text-gray-700 dark:text-gray-300">
              Config File:
            </span>
            <div class="text-gray-600 dark:text-gray-400">
              {formData.configFile
                ? `${formData.configFile.length} characters, ${formData.configFile.split("\n").length} lines`
                : "(empty)"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
