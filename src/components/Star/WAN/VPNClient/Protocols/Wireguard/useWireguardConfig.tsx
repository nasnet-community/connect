import { $, useContext, useSignal } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { QRL } from "@builder.io/qwik";
import type { WireguardClientConfig } from "../../../../StarContext/Utils/VPNClientType";

export interface UseWireguardConfigResult {
  config: {value: string};
  errorMessage: {value: string};
  configMethod: {value: "file" | "manual"};
  privateKey: {value: string};
  publicKey: {value: string};
  allowedIPs: {value: string};
  serverAddress: {value: string};
  serverPort: {value: string};
  address: {value: string};
  dns: {value: string};
  mtu: {value: string};
  preSharedKey: {value: string};
  persistentKeepalive: {value: string};
  listeningPort: {value: string};
  handleConfigChange$: QRL<(value: string) => Promise<void>>;
  handleManualFormSubmit$: QRL<() => Promise<void>>;
  handleFileUpload$: QRL<(event: Event) => Promise<void>>;
  setConfigMethod$: QRL<(method: "file" | "manual") => Promise<void>>;
  validateWireguardConfig: QRL<(config: WireguardClientConfig) => Promise<{
    isValid: boolean;
    emptyFields: string[];
  }>>;
  parseWireguardConfig: QRL<
    (configText: string) => Promise<WireguardClientConfig | null>
  >;
  updateContextWithConfig$: QRL<
    (parsedConfig: WireguardClientConfig) => Promise<void>
  >;
}

export const useWireguardConfig = (
  onIsValidChange$?: QRL<(isValid: boolean) => void>
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
    serverPort.value = existingConfig.PeerEndpointPort?.toString() || "51820";
    allowedIPs.value = existingConfig.PeerAllowedIPs || "0.0.0.0/0, ::/0";
    preSharedKey.value = existingConfig.PeerPresharedKey || "";
    persistentKeepalive.value = existingConfig.PeerPersistentKeepalive?.toString() || "25";
    
    const isConfigValid = privateKey.value && address.value && publicKey.value && 
                          serverAddress.value && serverPort.value && allowedIPs.value;
    
    if (isConfigValid && onIsValidChange$) {
      setTimeout(() => onIsValidChange$(true), 0);
    }
  }
  
  const validateWireguardConfig = $(
    async (
      config: WireguardClientConfig
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
    }
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
    }
  );

  const parseWireguardConfig = $(
    async (configText: string): Promise<WireguardClientConfig | null> => {
      try {
        const lines = configText.split("\n");
        let inInterfaceSection = false;
        let inPeerSection = false;

        const config: Partial<WireguardClientConfig> = {};

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith("[") && trimmedLine.endsWith("]")) {
            inInterfaceSection = trimmedLine.toLowerCase() === "[interface]";
            inPeerSection = trimmedLine.toLowerCase() === "[peer]";
            continue;
          }

          if (!trimmedLine || trimmedLine.startsWith("#")) {
            continue;
          }

          const [key, value] = trimmedLine.split("=").map((s) => s.trim());

          if (inInterfaceSection) {
            switch (key.toLowerCase()) {
              case "privatekey":
                config.InterfacePrivateKey = value;
                break;
              case "address":
                config.InterfaceAddress = value;
                break;
              case "listenport":
                config.InterfaceListenPort = parseInt(value, 10);
                break;
              case "mtu":
                config.InterfaceMTU = parseInt(value, 10);
                break;
              case "dns":
                config.InterfaceDNS = value;
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
                config.PeerAllowedIPs = value;
                break;
              case "endpoint":
                // eslint-disable-next-line no-case-declarations
                const lastColonIndex = value.lastIndexOf(":");
                if (lastColonIndex === -1) {
                  config.PeerEndpointAddress = value;
                } else {
                  const potentialPort = value.substring(lastColonIndex + 1);
                  if (!isNaN(parseInt(potentialPort, 10))) {
                    config.PeerEndpointAddress = value.substring(
                      0,
                      lastColonIndex
                    );
                    config.PeerEndpointPort = parseInt(potentialPort, 10);
                    if (
                      config.PeerEndpointAddress.startsWith("[") &&
                      config.PeerEndpointAddress.endsWith("]")
                    ) {
                      config.PeerEndpointAddress =
                        config.PeerEndpointAddress.slice(1, -1);
                    }
                  } else {
                    config.PeerEndpointAddress = value;
                  }
                }
                break;
              case "persistentkeepalive":
                config.PeerPersistentKeepalive = parseInt(value, 10);
                break;
            }
          }
        }

        const { isValid, emptyFields } = await validateWireguardConfig(
          config as WireguardClientConfig
        );

        if (!isValid) {
          errorMessage.value = `The configuration file is missing one or more mandatory fields: ${emptyFields.join(
            ", "
          )}`;
          return null;
        }

        return config as WireguardClientConfig;
      } catch (error) {
        errorMessage.value = "Failed to parse Wireguard configuration file.";
        console.error("Error parsing Wireguard config:", error);
        return null;
      }
    }
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
    } catch (error) {
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
      errorMessage.value = `Please fill in all required fields: ${emptyFields.join(
        ", "
      )}`;
      if (onIsValidChange$) {
        onIsValidChange$(false);
      }
      return;
    }

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
    updateContextWithConfig$
  };
}; 