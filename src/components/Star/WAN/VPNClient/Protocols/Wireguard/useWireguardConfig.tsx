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
  parseWireguardConfig: QRL<(configText: string) => Promise<WireguardClientConfig | null>>;
  updateContextWithConfig$: QRL<(parsedConfig: WireguardClientConfig) => Promise<void>>;
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
  const mtu = useSignal("1420");
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
  
  const validateWireguardConfig = $(async (config: WireguardClientConfig) => {
    const requiredFields = [
      "InterfacePrivateKey",
      "InterfaceAddress", 
      "PeerPublicKey",
      "PeerEndpointAddress",
      "PeerEndpointPort",
      "PeerAllowedIPs"
    ];
    
    const emptyFields = requiredFields.filter((field) => {
      const value = config[field as keyof WireguardClientConfig];
      return !value || (typeof value === 'string' && value.trim() === "");
    });

    return {
      isValid: emptyFields.length === 0,
      emptyFields,
    };
  });

  const updateContextWithConfig$ = $(async (parsedConfig: WireguardClientConfig) => {
    const currentVPNClient = starContext.state.WAN.VPNClient || {};
    
    await starContext.updateWAN$({
      VPNClient: {
        ...currentVPNClient,
        Wireguard: parsedConfig
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
    
    const manualConfig: WireguardClientConfig = {
      InterfacePrivateKey: privateKey.value,
      InterfaceAddress: address.value,
      InterfaceListenPort: listeningPort.value ? parseInt(listeningPort.value) : undefined,
      InterfaceMTU: mtu.value ? parseInt(mtu.value) : undefined,
      InterfaceDNS: dns.value || undefined,
      PeerPublicKey: publicKey.value,
      PeerEndpointAddress: serverAddress.value,
      PeerEndpointPort: parseInt(serverPort.value),
      PeerAllowedIPs: allowedIPs.value,
      PeerPresharedKey: preSharedKey.value || undefined,
      PeerPersistentKeepalive: persistentKeepalive.value ? parseInt(persistentKeepalive.value) : undefined
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
  });

  const parseWireguardConfig = $(
    async (configText: string): Promise<WireguardClientConfig | null> => {
      try {
        const lines = configText.split('\n').map(line => line.trim());
        
        let inInterface = false;
        let inPeer = false;
        
        const config: Partial<WireguardClientConfig> = {};
        
        for (const line of lines) {
          if (!line || line.startsWith('#')) continue;
          
          if (line === '[Interface]') {
            inInterface = true;
            inPeer = false;
            continue;
          }
          
          if (line === '[Peer]') {
            inInterface = false;
            inPeer = true;
            continue;
          }
          
          if (line.startsWith('[') && line.endsWith(']')) {
            inInterface = false;
            inPeer = false;
            continue;
          }
          
          const [key, value] = line.split('=').map(s => s.trim());
          if (!key || !value) continue;
          
          if (inInterface) {
            switch (key.toLowerCase()) {
              case 'privatekey':
                config.InterfacePrivateKey = value;
                break;
              case 'address':
                config.InterfaceAddress = value;
                break;
              case 'listenport':
                config.InterfaceListenPort = parseInt(value);
                break;
              case 'mtu':
                config.InterfaceMTU = parseInt(value);
                break;
              case 'dns':
                config.InterfaceDNS = value;
                break;
            }
          }
          
          if (inPeer) {
            switch (key.toLowerCase()) {
              case 'publickey':
                config.PeerPublicKey = value;
                break;
              case 'endpoint':
                const [address, port] = value.split(':');
                config.PeerEndpointAddress = address;
                config.PeerEndpointPort = parseInt(port);
                break;
              case 'allowedips':
                config.PeerAllowedIPs = value;
                break;
              case 'presharedkey':
                config.PeerPresharedKey = value;
                break;
              case 'persistentkeepalive':
                config.PeerPersistentKeepalive = parseInt(value);
                break;
            }
          }
        }
        
        if (!config.InterfacePrivateKey || !config.InterfaceAddress || 
            !config.PeerPublicKey || !config.PeerEndpointAddress || 
            !config.PeerEndpointPort || !config.PeerAllowedIPs) {
          return null;
        }
        
        return config as WireguardClientConfig;
      } catch (error) {
        console.error("Error parsing Wireguard config:", error);
        return null;
      }
    }
  );

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