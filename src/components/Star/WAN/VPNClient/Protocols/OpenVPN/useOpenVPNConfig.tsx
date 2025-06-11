import { $, useSignal, useContext } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { OpenVpnClientConfig } from "../../../../StarContext/Utils/VPNClientType";
import type { LayerMode, NetworkProtocol } from "../../../../StarContext/CommonType";

export interface UseOpenVPNConfigResult {
  config: {value: string};
  errorMessage: {value: string};
  configMethod: {value: "file" | "manual"};
  serverAddress: {value: string};
  serverPort: {value: string};
  protocol: {value: "tcp" | "udp"};
  authType: {value: "Credentials" | "Certificate" | "CredentialsCertificate"};
  username: {value: string};
  password: {value: string};
  cipher: {value: string};
  auth: {value: string};
  handleConfigChange$: QRL<(value: string) => Promise<void>>;
  handleManualFormSubmit$: QRL<() => Promise<void>>;
  handleFileUpload$: QRL<(event: Event) => Promise<void>>;
  validateOpenVPNConfig: QRL<(config: OpenVpnClientConfig) => Promise<{
    isValid: boolean;
    emptyFields: string[];
  }>>;
  parseOpenVPNConfig: QRL<(configText: string) => OpenVpnClientConfig | null>;
  updateContextWithConfig$: QRL<(parsedConfig: OpenVpnClientConfig) => Promise<void>>;
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
  const authType = useSignal<"Credentials" | "Certificate" | "CredentialsCertificate">("Credentials");
  const username = useSignal("");
  const password = useSignal("");
  const cipher = useSignal("");
  const auth = useSignal("");
  
  // Initialize with existing config if available
  if (starContext.state.WAN.VPNClient?.OpenVPN) {
    const existingConfig = starContext.state.WAN.VPNClient.OpenVPN;
    serverAddress.value = existingConfig.Server.Address || "";
    serverPort.value = existingConfig.Server.Port?.toString() || "1194";
    
    if (existingConfig.Protocol) {
      protocol.value = existingConfig.Protocol as "tcp" | "udp";
    }
    
    authType.value = existingConfig.AuthType;
    
    if (existingConfig.Credentials) {
      username.value = existingConfig.Credentials.Username || "";
      password.value = existingConfig.Credentials.Password || "";
    }
    
    if (existingConfig.Auth) {
      auth.value = existingConfig.Auth;
    }
    
    if (existingConfig.Cipher) {
      cipher.value = existingConfig.Cipher;
    }
    
    // Check if config is valid
    let isConfigValid = serverAddress.value !== "" && serverPort.value !== "";
    
    if (authType.value === "Credentials" || authType.value === "CredentialsCertificate") {
      isConfigValid = isConfigValid && username.value !== "" && password.value !== "";
    }
    
    if (isConfigValid && onIsValidChange$) {
      setTimeout(() => onIsValidChange$(true), 0);
    }
  }
  
  const validateOpenVPNConfig = $(async (config: OpenVpnClientConfig) => {
    const emptyFields: string[] = [];
    
    // Check Server object
    if (!config.Server?.Address || config.Server.Address.trim() === "") {
      emptyFields.push("Server Address");
    }
    
    if (!config.AuthType || config.AuthType.trim() === "") {
      emptyFields.push("AuthType");
    }
    
    if ((config.AuthType === "Credentials" || config.AuthType === "CredentialsCertificate") && 
        (!config.Credentials?.Username || !config.Credentials?.Password)) {
      emptyFields.push("Credentials");
    }
    
    if ((config.AuthType === "Certificate" || config.AuthType === "CredentialsCertificate") && 
        (!config.ClientCertificateName || !config.CaCertificateName)) {
      emptyFields.push("Certificates");
    }
    
    return {
      isValid: emptyFields.length === 0,
      emptyFields,
    };
  });

  const updateContextWithConfig$ = $(async (parsedConfig: OpenVpnClientConfig) => {
    const currentVPNClient = starContext.state.WAN.VPNClient || {};
    
    await starContext.updateWAN$({
      VPNClient: {
        ...currentVPNClient,
        OpenVPN: parsedConfig
      }
    });
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
    
    const manualConfig: OpenVpnClientConfig = {
      Server: {
        Address: serverAddress.value,
        Port: parseInt(serverPort.value)
      },
      Protocol: protocol.value as NetworkProtocol,
      Mode: "ip" as LayerMode,
      AuthType: authType.value,
      Auth: auth.value as 'md5' | 'sha1' | 'null' | 'sha256' | 'sha512',
      Credentials: (authType.value === "Credentials" || authType.value === "CredentialsCertificate") 
        ? { Username: username.value, Password: password.value } 
        : undefined,
      Cipher: cipher.value as 'null' | 'aes128-cbc' | 'aes128-gcm' | 'aes192-cbc' | 'aes192-gcm' | 'aes256-cbc' | 'aes256-gcm' | 'blowfish128' || undefined,
      VerifyServerCertificate: true,
      RouteNoPull: false
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
    (configText: string): OpenVpnClientConfig | null => {
      try {
        const config: Partial<OpenVpnClientConfig> = {
          Server: { Address: "", Port: 1194 },
          Protocol: "udp",
          Mode: "ip",
          AuthType: "Credentials",
          Auth: "sha256",
          VerifyServerCertificate: true,
          RouteNoPull: false
        };
        
        const lines = configText.split('\n').map(line => line.trim());
        
        for (const line of lines) {
          if (!line || line.startsWith('#') || line.startsWith(';')) {
            continue;
          }
          
          if (line.startsWith('remote ')) {
            const parts = line.split(' ');
            if (parts.length >= 2) {
              config.Server!.Address = parts[1];
              
              if (parts.length >= 3 && !isNaN(parseInt(parts[2]))) {
                config.Server!.Port = parseInt(parts[2]);
              }
            }
          }
          else if (line.startsWith('port ')) {
            config.Server!.Port = parseInt(line.split(' ')[1]);
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
            if (config.AuthType !== 'CredentialsCertificate') {
              config.AuthType = 'Credentials';
            }
          }
          else if (line.includes('<ca>')) {
            config.CaCertificateName = "openvpn-ca";
            if (config.AuthType !== 'CredentialsCertificate') {
              config.AuthType = 'Certificate';
            }
          }
          else if (line.includes('<cert>')) {
            config.ClientCertificateName = "openvpn-cert";
            if (config.AuthType !== 'CredentialsCertificate') {
              config.AuthType = 'Certificate';
            }
          }
          else if (line.includes('<key>')) {
            if (config.AuthType !== 'CredentialsCertificate') {
              config.AuthType = 'Certificate';
            }
          }
          else if (line.startsWith('cipher ')) {
            config.Cipher = line.split(' ')[1] as 'null' | 'aes128-cbc' | 'aes128-gcm' | 'aes192-cbc' | 'aes192-gcm' | 'aes256-cbc' | 'aes256-gcm' | 'blowfish128';
          }
          else if (line.startsWith('auth ')) {
            config.Auth = line.split(' ')[1] as 'md5' | 'sha1' | 'null' | 'sha256' | 'sha512';
          }
          else if (line.startsWith('dev ')) {
            const dev = line.split(' ')[1].toLowerCase();
            if (dev.startsWith('tun')) {
              config.Mode = 'ip';
            } else if (dev.startsWith('tap')) {
              config.Mode = 'ethernet';
            }
          }
          else if (line === 'verify-server-cert' || line === 'verify-server-certificate') {
            config.VerifyServerCertificate = true;
          }
          else if (line.startsWith('route-nopull')) {
            config.RouteNoPull = true;
          }
        }
        
        // If both certificates and auth-user-pass are present, it's both
        if (config.CaCertificateName && (config.AuthType === "Credentials")) {
          config.AuthType = "CredentialsCertificate";
        }
        
        // Validate required fields
        if (!config.Server?.Address) {
          return null;
        }
        
        return config as OpenVpnClientConfig;
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