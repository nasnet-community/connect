import { $, useContext, useSignal } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { QRL } from "@builder.io/qwik";

export interface WireguardConfig {
  PrivateKey: string;
  PublicKey: string;
  AllowedIPs: string;
  ServerAddress: string;
  ServerPort: string;
  Address: string;
  ListeningPort?: string;
  DNS?: string;
  MTU?: string;
  PreSharedKey?: string;
  PersistentKeepalive?: string;
}

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
  handleConfigChange$: QRL<(value: string) => Promise<void>>;
  handleManualFormSubmit$: QRL<() => Promise<void>>;
  handleFileUpload$: QRL<(event: Event) => Promise<void>>;
  setConfigMethod$: QRL<(method: "file" | "manual") => Promise<void>>;
  validateWireguardConfig: QRL<(config: WireguardConfig) => Promise<{
    isValid: boolean;
    emptyFields: string[];
  }>>;
  parseWireguardConfig: QRL<(configText: string) => Promise<WireguardConfig | null>>;
  updateContextWithConfig$: QRL<(parsedConfig: WireguardConfig) => Promise<void>>;
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
  const allowedIPs = useSignal("0.0.0.0/0");
  const serverAddress = useSignal("");
  const serverPort = useSignal("51820");
  const address = useSignal("");
  const dns = useSignal("");
  const mtu = useSignal("1420");
  const preSharedKey = useSignal("");
  const persistentKeepalive = useSignal("25");
  
  if (starContext.state.WAN.VPNClient?.Wireguard?.[0]) {
    const existingConfig = starContext.state.WAN.VPNClient.Wireguard[0];
    privateKey.value = existingConfig.InterfacePrivateKey || "";
    publicKey.value = existingConfig.PeerPublicKey || "";
    allowedIPs.value = existingConfig.PeerAllowedIPs || "0.0.0.0/0";
    serverAddress.value = existingConfig.PeerEndpointAddress || "";
    serverPort.value = existingConfig.PeerEndpointPort?.toString() || "51820";
    address.value = existingConfig.InterfaceAddress || "";
    mtu.value = existingConfig.InterfaceMTU?.toString() || "1420";
    preSharedKey.value = existingConfig.PeerPresharedKey || "";
    persistentKeepalive.value = existingConfig.PeerPersistentKeepalive?.toString() || "25";
    
    if (privateKey.value && publicKey.value && serverAddress.value && address.value) {
      if (onIsValidChange$) {
        setTimeout(() => onIsValidChange$(true), 0);
      }
    }
  }
  
  const validateWireguardConfig = $(async (config: WireguardConfig) => {
    const requiredFields = [
      "PrivateKey",
      "PublicKey",
      "AllowedIPs",
      "ServerAddress",
      "Address",
      "ServerPort",
    ];
    const emptyFields = requiredFields.filter((field) => {
      const value = config[field as keyof WireguardConfig];
      return !value || value.trim() === "";
    });

    return {
      isValid: emptyFields.length === 0,
      emptyFields,
    };
  });

  const parseWireguardConfig = $(
    async (configText: string): Promise<WireguardConfig | null> => {
      try {
        const sections: { [key: string]: { [key: string]: string } } = {};
        let currentSection = "";

        configText.split("\n").forEach((line) => {
          line = line.trim();
          if (!line || line.startsWith("#")) return;

          if (line.startsWith("[") && line.endsWith("]")) {
            currentSection = line.slice(1, -1);
            sections[currentSection] = {};
            return;
          }

          if (currentSection) {
            const [key, value] = line.split(" = ").map((s) => s.trim());
            if (key && value) {
              sections[currentSection][key] = value;
            }
          }
        });

        const endpoint = sections["Peer"]?.Endpoint || "";
        const [serverAddress, serverPort] = endpoint.split(":");

        const addresses = sections["Interface"]?.Address?.split(",") || [];
        const ipv4Address = addresses.find((addr) => !addr.includes(":")) || "";

        const config: WireguardConfig = {
          PrivateKey: sections["Interface"]?.PrivateKey || "",
          PublicKey: sections["Peer"]?.PublicKey || "",
          AllowedIPs: sections["Peer"]?.AllowedIPs || "",
          ServerAddress: serverAddress || "",
          ServerPort: serverPort || "",
          Address: ipv4Address,
          ListeningPort: sections["Interface"]?.ListenPort || "13231",
          DNS: sections["Interface"]?.DNS || "",
          MTU: sections["Interface"]?.MTU || "1420",
          PreSharedKey: sections["Peer"]?.PresharedKey || "",
          PersistentKeepalive: sections["Peer"]?.PersistentKeepalive || "25s",
        };

        const requiredFields = [
          "PrivateKey",
          "PublicKey",
          "AllowedIPs",
          "ServerAddress",
          "Address",
          "ServerPort",
        ];
        const isValid = requiredFields.every((field) => {
          const value = config[field as keyof WireguardConfig];
          return value !== undefined && value !== "";
        });

        return isValid ? config : null;
      } catch (error) {
        console.error("Error parsing WireGuard config:", error);
        return null;
      }
    },
  );

  const updateContextWithConfig$ = $(async (parsedConfig: WireguardConfig) => {
    const wireguardClientConfig = {
      InterfacePrivateKey: parsedConfig.PrivateKey,
      InterfaceAddress: parsedConfig.Address,
      InterfaceListenPort: parseInt(parsedConfig.ListeningPort || "13231"),
      InterfaceMTU: parseInt(parsedConfig.MTU || "1420"),
      PeerPublicKey: parsedConfig.PublicKey,
      PeerEndpointAddress: parsedConfig.ServerAddress,
      PeerEndpointPort: parseInt(parsedConfig.ServerPort),
      PeerAllowedIPs: parsedConfig.AllowedIPs,
      PeerPresharedKey: parsedConfig.PreSharedKey,
      PeerPersistentKeepalive: parsedConfig.PersistentKeepalive 
        ? parseInt(parsedConfig.PersistentKeepalive.replace('s', '')) 
        : 25,
    };

    const currentVPNClient = starContext.state.WAN.VPNClient || {};
    
    const wireguardConfigs = currentVPNClient.Wireguard || [];
    
    if (wireguardConfigs.length > 0) {
      wireguardConfigs[0] = wireguardClientConfig;
    } else {
      wireguardConfigs.push(wireguardClientConfig);
    }
    
    await starContext.updateWAN$({
      VPNClient: {
        ...currentVPNClient,
        Wireguard: wireguardConfigs
      }
    });
    
  });

  const handleConfigChange$ = $(async (value: string) => {
    config.value = value;
    errorMessage.value = "";

    const parsedConfig = await parseWireguardConfig(value);
    if (!parsedConfig) {
      if (onIsValidChange$) {
        await onIsValidChange$(false);
      }
      errorMessage.value = $localize`Invalid Wireguard configuration format`;
      return;
    }

    const { isValid, emptyFields } = await validateWireguardConfig(parsedConfig);

    if (!isValid) {
      if (onIsValidChange$) {
        await onIsValidChange$(false);
      }
      errorMessage.value = $localize`Missing required fields: ${emptyFields.join(", ")}`;
      return;
    }

    if (onIsValidChange$) {
      await onIsValidChange$(true);
    }
    await updateContextWithConfig$(parsedConfig);
  });

  const handleManualFormSubmit$ = $(async () => {
    errorMessage.value = "";
    
    const manualConfig: WireguardConfig = {
      PrivateKey: privateKey.value,
      PublicKey: publicKey.value,
      AllowedIPs: allowedIPs.value,
      ServerAddress: serverAddress.value,
      ServerPort: serverPort.value,
      Address: address.value,
      DNS: dns.value || undefined,
      MTU: mtu.value,
      PreSharedKey: preSharedKey.value || undefined,
      PersistentKeepalive: persistentKeepalive.value ? `${persistentKeepalive.value}s` : undefined,
    };

    const { isValid, emptyFields } = await validateWireguardConfig(manualConfig);

    if (!isValid) {
      if (onIsValidChange$) {
        await onIsValidChange$(false);
      }
      errorMessage.value = $localize`Missing required fields: ${emptyFields.join(", ")}`;
      return;
    }

    if (onIsValidChange$) {
      await onIsValidChange$(true);
    }
    await updateContextWithConfig$(manualConfig);
  });

  const handleFileUpload$ = $(async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.name.endsWith(".conf")) {
        const text = await file.text();
        config.value = text;
        await handleConfigChange$(text);
      }
    }
  });

  const setConfigMethod$ = $(async (method: "file" | "manual") => {
    configMethod.value = method;
    return Promise.resolve();
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
    handleConfigChange$,
    handleManualFormSubmit$,
    handleFileUpload$,
    setConfigMethod$,
    validateWireguardConfig,
    parseWireguardConfig,
    updateContextWithConfig$
  };
}; 