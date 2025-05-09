import { $, useSignal, useContext } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { LayerMode, NetworkProtocol } from "../../../../StarContext/CommonType";

export interface OpenVPNConfig {
  ServerAddress: string;
  Port: string;
  Protocol: "tcp" | "udp";
  Credentials?: {
    Username: string;
    Password: string;
  };
  Certificates?: {
    Ca?: string;
    Cert?: string;
    Key?: string;
  };
  AuthType: "credentials" | "certificates" | "both";
  Cipher?: string;
  Auth?: string;
  Redirect?: string;
  TLSAuth?: {
    Key?: string;
    Direction?: number;
  };
  KeyDirection?: number;
  DeviceType?: "tun" | "tap";
  KeepAlive?: {
    Ping: number;
    Restart: number;
  };
  Mtu?: number;
  Fragment?: number;
  Mssfix?: number;
  VerifyServerCert?: boolean;
  NsCertType?: string;
  RemoteControlEndpoint?: string;
  RemoteCertTls?: "server" | "client";
  Resolv?: boolean;
  PullFilter?: string[];
}

export interface UseOpenVPNConfigResult {
  config: {value: string};
  errorMessage: {value: string};
  configMethod: {value: "file" | "manual"};
  serverAddress: {value: string};
  serverPort: {value: string};
  protocol: {value: "tcp" | "udp"};
  authType: {value: "credentials" | "certificates" | "both"};
  username: {value: string};
  password: {value: string};
  cipher: {value: string};
  auth: {value: string};
  handleConfigChange$: QRL<(value: string) => Promise<void>>;
  handleManualFormSubmit$: QRL<() => Promise<void>>;
  handleFileUpload$: QRL<(event: Event) => Promise<void>>;
  validateOpenVPNConfig: QRL<(config: OpenVPNConfig) => Promise<{
    isValid: boolean;
    emptyFields: string[];
  }>>;
  parseOpenVPNConfig: QRL<(configText: string) => OpenVPNConfig | null>;
  updateContextWithConfig$: QRL<(parsedConfig: OpenVPNConfig) => Promise<void>>;
}

export const useOpenVPNConfig = (
  onIsValidChange$?: QRL<(isValid: boolean) => void>
): UseOpenVPNConfigResult => {
  const starContext = useContext(StarContext);
  const config = useSignal("");
  const errorMessage = useSignal("");
  const configMethod = useSignal<"file" | "manual">("file");
  
  const serverAddress = useSignal("");
  const serverPort = useSignal("1194");
  const protocol = useSignal<"tcp" | "udp">("udp");
  const authType = useSignal<"credentials" | "certificates" | "both">("credentials");
  const username = useSignal("");
  const password = useSignal("");
  const cipher = useSignal("");
  const auth = useSignal("");
  
  if (starContext.state.WAN.VPNClient?.OpenVPN?.[0]) {
    const existingConfig = starContext.state.WAN.VPNClient.OpenVPN[0];
    serverAddress.value = existingConfig.ConnectTo || "";
    
    if (existingConfig.Port !== undefined) {
      serverPort.value = existingConfig.Port.toString();
    }
    
    if (existingConfig.Protocol) {
      protocol.value = existingConfig.Protocol as "tcp" | "udp";
    }
    
    if (existingConfig.Credentials) {
      username.value = existingConfig.Credentials.Username || "";
      password.value = existingConfig.Credentials.Password || "";
      authType.value = "credentials";
    } else if (existingConfig.ClientCertificateName) {
      authType.value = "certificates";
    }
    
    if (existingConfig.Auth) {
      auth.value = existingConfig.Auth;
    }
    
    if (existingConfig.Cipher) {
      cipher.value = existingConfig.Cipher;
    }
    
    let isConfigValid = serverAddress.value !== "";
    
    if (authType.value === "credentials") {
      isConfigValid = isConfigValid && username.value !== "" && password.value !== "";
    }
    
    if (isConfigValid) {
      if (onIsValidChange$) {
        setTimeout(() => onIsValidChange$(true), 0);
      }
    }
  }
  
  const validateOpenVPNConfig = $(async (config: OpenVPNConfig) => {
    const commonRequiredFields = [
      "ServerAddress",
      "Port",
      "Protocol",
      "AuthType",
    ];
    
    const emptyFields = commonRequiredFields.filter((field) => {
      const value = config[field as keyof OpenVPNConfig];
      return !value || (typeof value === 'string' && value.trim() === "");
    });
    
    if (config.AuthType === "credentials" || config.AuthType === "both") {
      if (!config.Credentials?.Username || !config.Credentials?.Password) {
        emptyFields.push("Credentials");
      }
    }
    
    if (config.AuthType === "certificates" || config.AuthType === "both") {
      if (!config.Certificates?.Ca || !config.Certificates?.Cert || !config.Certificates?.Key) {
        emptyFields.push("Certificates");
      }
    }
    
    return {
      isValid: emptyFields.length === 0,
      emptyFields,
    };
  });

  const updateContextWithConfig$ = $(async (parsedConfig: OpenVPNConfig) => {
    const openVPNClientConfig = {
      ConnectTo: parsedConfig.ServerAddress,
      Port: parseInt(parsedConfig.Port),
      Protocol: parsedConfig.Protocol as NetworkProtocol,
      Mode: "ip" as LayerMode,
      Credentials: parsedConfig.Credentials,
      CaCertificateName: parsedConfig.Certificates?.Ca ? "openvpn-ca" : undefined,
      ClientCertificateName: parsedConfig.Certificates?.Cert ? "openvpn-cert" : undefined,
      Auth: parsedConfig.Auth,
      Cipher: parsedConfig.Cipher,
      AddDefaultRoute: true,
      UsePeerDNS: true,
      VerifyServerCertificate: true,
    };

    const currentVPNClient = starContext.state.WAN.VPNClient || {};
    
    const openVPNConfigs = currentVPNClient.OpenVPN || [];
    
    if (openVPNConfigs.length > 0) {
      openVPNConfigs[0] = openVPNClientConfig;
    } else {
      openVPNConfigs.push(openVPNClientConfig);
    }
    
    await starContext.updateWAN$({
      VPNClient: {
        ...currentVPNClient,
        OpenVPN: openVPNConfigs
      }
    });
    
    console.log("OpenVPN config updated in context:", openVPNClientConfig);
  });

  const handleConfigChange$ = $(async (value: string) => {
    config.value = value;
    errorMessage.value = "";

    const parsedConfig = await parseOpenVPNConfig(value);
    if (!parsedConfig) {
      if (onIsValidChange$) {
        await onIsValidChange$(false);
      }
      errorMessage.value = $localize`Invalid OpenVPN configuration format`;
      return;
    }

    const { isValid, emptyFields } = await validateOpenVPNConfig(parsedConfig);

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
    
    const manualConfig: OpenVPNConfig = {
      ServerAddress: serverAddress.value,
      Port: serverPort.value,
      Protocol: protocol.value,
      AuthType: authType.value,
      Credentials: authType.value === "credentials" || authType.value === "both" 
        ? { Username: username.value, Password: password.value } 
        : undefined,
      Cipher: cipher.value || undefined,
      Auth: auth.value || undefined,
    };

    const { isValid, emptyFields } = await validateOpenVPNConfig(manualConfig);

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
      if (file.name.endsWith(".ovpn") || file.name.endsWith(".conf")) {
        const text = await file.text();
        config.value = text;
        await handleConfigChange$(text);
      }
    }
  });

  const parseOpenVPNConfig = $(
    (configText: string): OpenVPNConfig | null => {
      try {
        const config: OpenVPNConfig = {
          ServerAddress: "",
          Port: "1194",
          Protocol: "udp",
          AuthType: "credentials",
          VerifyServerCert: true,
        };
        
        const lines = configText.split('\n').map(line => line.trim());
        
        const extractBlockContent = (startTag: string, endTag: string): string | undefined => {
          const startIndex = lines.findIndex(line => line.includes(startTag));
          if (startIndex === -1) return undefined;
          
          const endIndex = lines.findIndex((line, idx) => idx > startIndex && line.includes(endTag));
          if (endIndex === -1) return undefined;
          
          return lines.slice(startIndex + 1, endIndex).join('\n');
        };
        
        for (const line of lines) {
          if (!line || line.startsWith('#') || line.startsWith(';')) {
            continue;
          }
          
          if (line.startsWith('remote ')) {
            const parts = line.split(' ');
            if (parts.length >= 2) {
              config.ServerAddress = parts[1];
              
              if (parts.length >= 3 && !isNaN(parseInt(parts[2]))) {
                config.Port = parts[2];
              }
            }
          }
          else if (line.startsWith('port ')) {
            config.Port = line.split(' ')[1];
          }
          else if (line.startsWith('proto ')) {
            const protoValue = line.split(' ')[1].toLowerCase();
            if (protoValue === 'tcp' || protoValue === 'tcp-client' || protoValue === 'tcp-server') {
              config.Protocol = 'tcp';
            } else if (protoValue === 'udp') {
              config.Protocol = 'udp';
            }
          }
          else if (line === 'auth-user-pass') {
            if (config.AuthType !== 'both') {
              config.AuthType = 'credentials';
            }
          }
          else if (line.includes('<ca>')) {
            if (!config.Certificates) config.Certificates = {};
            config.Certificates.Ca = extractBlockContent('<ca>', '</ca>');
            if (config.AuthType !== 'both') {
              config.AuthType = 'certificates';
            }
          }
          else if (line.includes('<cert>')) {
            if (!config.Certificates) config.Certificates = {};
            config.Certificates.Cert = extractBlockContent('<cert>', '</cert>');
            if (config.AuthType !== 'both') {
              config.AuthType = 'certificates';
            }
          }
          else if (line.includes('<key>')) {
            if (!config.Certificates) config.Certificates = {};
            config.Certificates.Key = extractBlockContent('<key>', '</key>');
            if (config.AuthType !== 'both') {
              config.AuthType = 'certificates';
            }
          }
          else if (line.startsWith('cipher ')) {
            config.Cipher = line.split(' ')[1];
          }
          else if (line.startsWith('auth ')) {
            config.Auth = line.split(' ')[1];
          }
          else if (line.startsWith('redirect-gateway')) {
            config.Redirect = line;
          }
          else if (line.startsWith('tls-auth')) {
            if (!config.TLSAuth) config.TLSAuth = {};
            const parts = line.split(' ');
            if (parts.length >= 2) {
              config.TLSAuth.Key = parts[1];
              if (parts.length >= 3) {
                config.KeyDirection = parseInt(parts[2]);
              }
            }
          }
          else if (line.startsWith('key-direction')) {
            config.KeyDirection = parseInt(line.split(' ')[1]);
          }
          else if (line.startsWith('dev ')) {
            const dev = line.split(' ')[1].toLowerCase();
            if (dev.startsWith('tun')) {
              config.DeviceType = 'tun';
            } else if (dev.startsWith('tap')) {
              config.DeviceType = 'tap';
            }
          }
          else if (line.startsWith('keepalive ')) {
            const parts = line.split(' ');
            if (parts.length >= 3) {
              config.KeepAlive = {
                Ping: parseInt(parts[1]),
                Restart: parseInt(parts[2])
              };
            }
          }
          else if (line.startsWith('tun-mtu ')) {
            config.Mtu = parseInt(line.split(' ')[1]);
          }
          else if (line.startsWith('fragment ')) {
            config.Fragment = parseInt(line.split(' ')[1]);
          }
          else if (line.startsWith('mssfix ')) {
            config.Mssfix = parseInt(line.split(' ')[1]);
          }
          else if (line === 'verify-server-cert' || line === 'verify-server-certificate') {
            config.VerifyServerCert = true;
          }
          else if (line.startsWith('ns-cert-type ')) {
            config.NsCertType = line.split(' ')[1];
          }
          else if (line.startsWith('management ')) {
            const parts = line.split(' ');
            if (parts.length >= 3) {
              config.RemoteControlEndpoint = `${parts[1]}:${parts[2]}`;
            }
          }
          else if (line.startsWith('remote-cert-tls ')) {
            const value = line.split(' ')[1].toLowerCase();
            if (value === 'server' || value === 'client') {
              config.RemoteCertTls = value as 'server' | 'client';
            }
          }
          else if (line.includes('resolv-retry')) {
            config.Resolv = true;
          }
          else if (line.startsWith('pull-filter ')) {
            if (!config.PullFilter) config.PullFilter = [];
            config.PullFilter.push(line.substring('pull-filter '.length));
          }
        }
        
        if (config.Certificates?.Cert && config.AuthType === "credentials") {
          config.AuthType = "both";
        }
        
        return config;
      } catch (error) {
        console.error("Error parsing OpenVPN config:", error);
        return null;
      }
    }
  );

  return {
    config,
    errorMessage,
    configMethod,
    serverAddress,
    serverPort,
    protocol,
    authType,
    username,
    password,
    cipher,
    auth,
    handleConfigChange$,
    handleManualFormSubmit$,
    handleFileUpload$,
    validateOpenVPNConfig,
    parseOpenVPNConfig,
    updateContextWithConfig$
  };
}; 