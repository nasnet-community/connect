import { $, useContext, useSignal } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { StarContext } from "../../../../StarContext/StarContext";
import type { QRL } from "@builder.io/qwik";
import type { WireguardClientConfig } from "../../../../StarContext/Utils/VPNClientType";

export interface UseWireguardConfigResult {
  config: { value: string };
  errorMessage: { value: string };
  configMethod: { value: "file" | "manual" };
  privateKey: { value: string };
  publicKey: { value: string };
  allowedIPs: { value: string };
  serverAddress: { value: string };
  serverPort: { value: string };
  address: { value: string };
  dns: { value: string };
  mtu: { value: string };
  preSharedKey: { value: string };
  persistentKeepalive: { value: string };
  listeningPort: { value: string };
  handleConfigChange$: QRL<(value: string) => Promise<void>>;
  handleManualFormSubmit$: QRL<() => Promise<void>>;
  handleFileUpload$: QRL<(event: Event) => Promise<void>>;
  setConfigMethod$: QRL<(method: "file" | "manual") => Promise<void>>;
  validateWireguardConfig: QRL<
    (config: WireguardClientConfig) => Promise<{
      isValid: boolean;
      emptyFields: string[];
    }>
  >;
  parseWireguardConfig: QRL<
    (configText: string) => Promise<WireguardClientConfig | null>
  >;
  updateContextWithConfig$: QRL<
    (parsedConfig: WireguardClientConfig) => Promise<void>
  >;
}

export const useWireguardConfig = (
  onIsValidChange$?: QRL<(isValid: boolean) => void>,
): UseWireguardConfigResult => {
  const starContext = useContext(StarContext);

  const config = useSignal("");
  const errorMessage = useSignal("");
  const configMethod = useSignal<"file" | "manual">("file");

  const privateKey = useSignal("");
  const publicKey = useSignal("");
  const allowedIPs = useSignal("0.0.0.0/0, ::/0");
  const serverAddress = useSignal("");
  const serverPort = useSignal("51820");
  const address = useSignal("");
  const dns = useSignal("");
  const mtu = useSignal("");
  const preSharedKey = useSignal("");
  const persistentKeepalive = useSignal("25");
  const listeningPort = useSignal("");

  if (starContext.state.WAN.VPNClient?.Wireguard) {
    const existingConfig = starContext.state.WAN.VPNClient.Wireguard;
    privateKey.value = existingConfig.InterfacePrivateKey || "";
    address.value = existingConfig.InterfaceAddress || "";
    listeningPort.value = existingConfig.InterfaceListenPort?.toString() || "";
    mtu.value = existingConfig.InterfaceMTU?.toString() || "1420";
    dns.value = existingConfig.InterfaceDNS || "";
    publicKey.value = existingConfig.PeerPublicKey || "";
    serverAddress.value = existingConfig.PeerEndpointAddress || "";
    serverPort.value = existingConfig.PeerEndpointPort.toString() || "51820";
    allowedIPs.value = existingConfig.PeerAllowedIPs || "0.0.0.0/0, ::/0";
    preSharedKey.value = existingConfig.PeerPresharedKey || "";
    persistentKeepalive.value =
      existingConfig.PeerPersistentKeepalive?.toString() || "25";

    const isConfigValid =
      privateKey.value &&
      address.value &&
      publicKey.value &&
      serverAddress.value &&
      serverPort.value &&
      allowedIPs.value;

    if (isConfigValid && onIsValidChange$) {
      setTimeout(() => onIsValidChange$(true), 0);
    }
  }

  const validateWireguardConfig = $(
    async (
      config: WireguardClientConfig,
    ): Promise<{ isValid: boolean; emptyFields: string[] }> => {
      const emptyFields: string[] = [];
      if (!config.InterfacePrivateKey) emptyFields.push("InterfacePrivateKey");
      if (!config.InterfaceAddress) emptyFields.push("InterfaceAddress");
      if (!config.PeerPublicKey) emptyFields.push("PeerPublicKey");
      if (!config.PeerEndpointAddress) emptyFields.push("PeerEndpointAddress");
      if (!config.PeerEndpointPort) emptyFields.push("PeerEndpointPort");
      if (!config.PeerAllowedIPs) emptyFields.push("PeerAllowedIPs");

      const isValid = emptyFields.length === 0;
      return { isValid, emptyFields };
    },
  );

  const updateContextWithConfig$ = $(
    async (parsedConfig: WireguardClientConfig) => {
      privateKey.value = parsedConfig.InterfacePrivateKey;
      address.value = parsedConfig.InterfaceAddress;
      listeningPort.value = parsedConfig.InterfaceListenPort?.toString() ?? "";
      mtu.value = parsedConfig.InterfaceMTU?.toString() ?? "";
      dns.value = parsedConfig.InterfaceDNS ?? "";
      publicKey.value = parsedConfig.PeerPublicKey;
      preSharedKey.value = parsedConfig.PeerPresharedKey ?? "";
      serverAddress.value = parsedConfig.PeerEndpointAddress;
      serverPort.value = parsedConfig.PeerEndpointPort.toString();
      allowedIPs.value = parsedConfig.PeerAllowedIPs;
      persistentKeepalive.value =
        parsedConfig.PeerPersistentKeepalive?.toString() ?? "";

      await starContext.updateWAN$({
        VPNClient: {
          ...starContext.state.WAN.VPNClient,
          Wireguard: parsedConfig,
        },
      });

      const { isValid } = await validateWireguardConfig(parsedConfig);
      if (onIsValidChange$) {
        onIsValidChange$(isValid);
      }
    },
  );

  const parseWireguardConfig = $(
    async (configText: string): Promise<WireguardClientConfig | null> => {
      try {
        const lines = configText.split("\n");
        let inInterfaceSection = false;
        let inPeerSection = false;

        const config: Partial<WireguardClientConfig> = {};

        // Helper function to check if an IP address is IPv6
        const isIPv6 = (ip: string): boolean => {
          return ip.includes(":") && !ip.includes(".");
        };

        // Helper function to filter out IPv6 addresses from comma-separated list
        const filterIPv4Only = (addresses: string): string => {
          return addresses
            .split(",")
            .map((addr) => addr.trim())
            .filter((addr) => !isIPv6(addr.split("/")[0])) // Remove network suffix for IP check
            .join(", ");
        };

        // Helper function to get first IPv4 address from comma-separated list
        const getFirstIPv4 = (addresses: string): string => {
          const addressList = addresses.split(",").map((addr) => addr.trim());
          for (const addr of addressList) {
            const ipPart = addr.split("/")[0]; // Remove network suffix
            if (!isIPv6(ipPart)) {
              return addr;
            }
          }
          return "";
        };

        for (const line of lines) {
          const trimmedLine = line.trim();

          // Handle section headers
          if (trimmedLine.startsWith("[") && trimmedLine.endsWith("]")) {
            inInterfaceSection = trimmedLine.toLowerCase() === "[interface]";
            inPeerSection = trimmedLine.toLowerCase() === "[peer]";
            continue;
          }

          // Skip empty lines and comments
          if (!trimmedLine || trimmedLine.startsWith("#")) {
            continue;
          }

          const equalIndex = trimmedLine.indexOf("=");
          if (equalIndex === -1) continue;

          const key = trimmedLine.substring(0, equalIndex).trim();
          const value = trimmedLine.substring(equalIndex + 1).trim();

          if (inInterfaceSection) {
            switch (key.toLowerCase()) {
              case "privatekey":
                config.InterfacePrivateKey = value;
                break;
              case "address":
                // Handle multiple addresses, filter out IPv6, take first IPv4
                const ipv4Address = getFirstIPv4(value);
                if (ipv4Address) {
                  config.InterfaceAddress = ipv4Address;
                }
                break;
              case "listenport":
                const listenPort = parseInt(value, 10);
                if (
                  !isNaN(listenPort) &&
                  listenPort > 0 &&
                  listenPort <= 65535
                ) {
                  config.InterfaceListenPort = listenPort;
                }
                break;
              case "mtu":
                const mtu = parseInt(value, 10);
                if (!isNaN(mtu) && mtu > 0) {
                  config.InterfaceMTU = mtu;
                }
                break;
              case "dns":
                // Handle multiple DNS servers, filter out IPv6, take first IPv4
                const dnsServers = value.split(",").map((dns) => dns.trim());
                for (const dns of dnsServers) {
                  if (!isIPv6(dns)) {
                    config.InterfaceDNS = dns;
                    break;
                  }
                }
                break;
            }
          } else if (inPeerSection) {
            switch (key.toLowerCase()) {
              case "publickey":
                config.PeerPublicKey = value;
                break;
              case "presharedkey":
                config.PeerPresharedKey = value;
                break;
              case "allowedips":
                // Filter out IPv6 addresses from AllowedIPs
                const filteredAllowedIPs = filterIPv4Only(value);
                if (filteredAllowedIPs) {
                  config.PeerAllowedIPs = filteredAllowedIPs;
                } else {
                  // If no IPv4 addresses found, default to IPv4 all traffic
                  config.PeerAllowedIPs = "0.0.0.0/0";
                }
                break;
              case "endpoint":
                // Handle endpoint parsing for both IPv4 and domain names
                const lastColonIndex = value.lastIndexOf(":");
                if (lastColonIndex === -1) {
                  // No port specified
                  config.PeerEndpointAddress = value;
                  config.PeerEndpointPort = 51820; // Default WireGuard port
                } else {
                  const potentialPort = value.substring(lastColonIndex + 1);
                  const portNum = parseInt(potentialPort, 10);

                  if (!isNaN(portNum) && portNum > 0 && portNum <= 65535) {
                    // Valid port found
                    let address = value.substring(0, lastColonIndex);

                    // Handle IPv6 addresses in brackets [::1]:port format
                    if (address.startsWith("[") && address.endsWith("]")) {
                      address = address.slice(1, -1);
                      // Skip IPv6 addresses
                      if (isIPv6(address)) {
                        break;
                      }
                    }

                    config.PeerEndpointAddress = address;
                    config.PeerEndpointPort = portNum;
                  } else {
                    // No valid port, treat whole thing as address
                    config.PeerEndpointAddress = value;
                    config.PeerEndpointPort = 51820; // Default WireGuard port
                  }
                }
                break;
              case "persistentkeepalive":
                const keepalive = parseInt(value, 10);
                if (!isNaN(keepalive) && keepalive >= 0) {
                  config.PeerPersistentKeepalive = keepalive;
                }
                break;
            }
          }
        }

        // Set default values if not specified
        if (!config.PeerEndpointPort) {
          config.PeerEndpointPort = 51820;
        }
        if (!config.PeerAllowedIPs) {
          config.PeerAllowedIPs = "0.0.0.0/0";
        }

        const { isValid, emptyFields } = await validateWireguardConfig(
          config as WireguardClientConfig,
        );

        if (!isValid) {
          errorMessage.value = `The configuration file is missing one or more mandatory fields: ${emptyFields.join(
            ", ",
          )}`;
          return null;
        }

        return config as WireguardClientConfig;
      } catch (error) {
        errorMessage.value = "Failed to parse Wireguard configuration file.";
        console.error("Error parsing Wireguard config:", error);
        return null;
      }
    },
  );

  const handleConfigChange$ = $(async (value: string) => {
    config.value = value;
    const parsedConfig = await parseWireguardConfig(value);
    if (parsedConfig) {
      await updateContextWithConfig$(parsedConfig);
    }
  });

  const handleFileUpload$ = $(async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    // Track file upload attempt
    track("vpn_config_file_uploaded", {
      vpn_protocol: "Wireguard",
      file_name: file.name,
      file_size: file.size,
      file_type: file.type || "unknown",
      step: "wan_config",
      component: "vpn_client",
    });

    const readFileAsText = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
      });
    };

    try {
      const fileContent = await readFileAsText(file);
      await handleConfigChange$(fileContent);

      // Track successful file processing
      track("vpn_config_file_processed", {
        vpn_protocol: "Wireguard",
        success: true,
        step: "wan_config",
        component: "vpn_client",
      });
    } catch (error) {
      // Track file processing error
      track("vpn_config_file_processed", {
        vpn_protocol: "Wireguard",
        success: false,
        error: "file_read_error",
        step: "wan_config",
        component: "vpn_client",
      });

      errorMessage.value = `Error reading file: ${error}`;
      console.error("File reading error:", error);
    }
  });

  const handleManualFormSubmit$ = $(async () => {
    const manualConfig: WireguardClientConfig = {
      InterfacePrivateKey: privateKey.value,
      InterfaceAddress: address.value,
      InterfaceListenPort: listeningPort.value
        ? parseInt(listeningPort.value, 10)
        : undefined,
      InterfaceMTU: mtu.value ? parseInt(mtu.value, 10) : undefined,
      InterfaceDNS: dns.value || undefined,
      PeerPublicKey: publicKey.value,
      PeerEndpointAddress: serverAddress.value,
      PeerEndpointPort: parseInt(serverPort.value, 10),
      PeerAllowedIPs: allowedIPs.value,
      PeerPresharedKey: preSharedKey.value || undefined,
      PeerPersistentKeepalive: persistentKeepalive.value
        ? parseInt(persistentKeepalive.value, 10)
        : undefined,
    };

    const { isValid, emptyFields } =
      await validateWireguardConfig(manualConfig);
    if (!isValid) {
      // Track manual configuration validation failure
      track("vpn_manual_config_validated", {
        vpn_protocol: "Wireguard",
        success: false,
        missing_fields: emptyFields.join(","),
        step: "wan_config",
        component: "vpn_client",
      });

      errorMessage.value = `Please fill in all required fields: ${emptyFields.join(
        ", ",
      )}`;
      if (onIsValidChange$) {
        onIsValidChange$(false);
      }
      return;
    }

    // Track successful manual configuration
    track("vpn_manual_config_validated", {
      vpn_protocol: "Wireguard",
      success: true,
      step: "wan_config",
      component: "vpn_client",
    });

    await starContext.updateWAN$({
      VPNClient: {
        ...starContext.state.WAN.VPNClient,
        Wireguard: manualConfig,
      },
    });

    errorMessage.value = "";
    if (onIsValidChange$) {
      onIsValidChange$(true);
    }
  });

  const setConfigMethod$ = $(async (method: "file" | "manual") => {
    // Track configuration method change
    track("vpn_config_method_changed", {
      vpn_protocol: "Wireguard",
      config_method: method,
      previous_method: configMethod.value,
      step: "wan_config",
      component: "vpn_client",
    });

    configMethod.value = method;
  });

  return {
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
    listeningPort,
    handleConfigChange$,
    handleManualFormSubmit$,
    handleFileUpload$,
    setConfigMethod$,
    validateWireguardConfig,
    parseWireguardConfig,
    updateContextWithConfig$,
  };
};
