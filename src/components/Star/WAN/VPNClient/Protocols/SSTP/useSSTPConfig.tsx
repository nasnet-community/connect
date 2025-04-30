import { $, useSignal, useContext } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { AuthMethod, TLSVersion } from "../../../../StarContext/CommonType";

export interface SSTPConfig {
  ConnectTo: string;
  Username: string;
  Password: string;
  Port?: number;
  ClientCertificateName?: string;
  VerifyServerCertificate?: boolean;
  TlsVersion?: TLSVersion;
  Profile?: string;
  AddDefaultRoute?: boolean;
  UsePeerDNS?: boolean;
  AllowedAuthMethods?: AuthMethod[];
}

export interface UseSSTPConfigResult {
  serverAddress: {value: string};
  username: {value: string};
  password: {value: string};
  port: {value: string};
  addDefaultRoute: {value: boolean};
  usePeerDNS: {value: boolean};
  verifyServerCertificate: {value: boolean};
  tlsVersion: {value: TLSVersion};
  errorMessage: {value: string};
  handleManualFormSubmit$: QRL<() => Promise<void>>;
  validateSSTPConfig: QRL<(config: SSTPConfig) => Promise<{
    isValid: boolean;
    emptyFields: string[];
  }>>;
  updateContextWithConfig$: QRL<(parsedConfig: SSTPConfig) => Promise<void>>;
  parseSSTPConfig: QRL<(configText: string) => SSTPConfig | null>;
}

export const useSSTPConfig = (
  onIsValidChange$?: QRL<(isValid: boolean) => void>
): UseSSTPConfigResult => {
  const starContext = useContext(StarContext);
  const errorMessage = useSignal("");
  
  // Manual form fields
  const serverAddress = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const port = useSignal("443");
  const addDefaultRoute = useSignal(true);
  const usePeerDNS = useSignal(true);
  const verifyServerCertificate = useSignal(true);
  const tlsVersion = useSignal<TLSVersion>("any");
  
  // Initialize fields if we have existing configuration
  if (starContext.state.WAN.VPNClient?.SSTP?.[0]) {
    const existingConfig = starContext.state.WAN.VPNClient.SSTP[0];
    serverAddress.value = existingConfig.ConnectTo || "";
    
    if (existingConfig.Credentials) {
      username.value = existingConfig.Credentials.Username || "";
      password.value = existingConfig.Credentials.Password || "";
    }
    
    if (existingConfig.Port !== undefined) {
      port.value = existingConfig.Port.toString();
    }
    
    if (existingConfig.AddDefaultRoute !== undefined) {
      addDefaultRoute.value = existingConfig.AddDefaultRoute;
    }
    
    if (existingConfig.UsePeerDNS !== undefined) {
      usePeerDNS.value = existingConfig.UsePeerDNS;
    }
    
    if (existingConfig.VerifyServerCertificate !== undefined) {
      verifyServerCertificate.value = existingConfig.VerifyServerCertificate;
    }
    
    if (existingConfig.TlsVersion) {
      tlsVersion.value = existingConfig.TlsVersion;
    }
    
    // If we have existing config, mark as valid
    if (serverAddress.value && username.value && password.value) {
      if (onIsValidChange$) {
        setTimeout(() => onIsValidChange$(true), 0);
      }
    }
  }
  
  const validateSSTPConfig = $(async (config: SSTPConfig) => {
    const requiredFields = [
      "ConnectTo",
      "Username", 
      "Password"
    ];
    
    const emptyFields = requiredFields.filter((field) => {
      const value = config[field as keyof SSTPConfig];
      return !value || (typeof value === 'string' && value.trim() === "");
    });

    return {
      isValid: emptyFields.length === 0,
      emptyFields,
    };
  });

  const updateContextWithConfig$ = $(async (parsedConfig: SSTPConfig) => {
    // Convert the parsed config to the format expected by the context
    const sstpClientConfig = {
      ConnectTo: parsedConfig.ConnectTo,
      Credentials: {
        Username: parsedConfig.Username, 
        Password: parsedConfig.Password
      },
      Port: parsedConfig.Port,
      AddDefaultRoute: parsedConfig.AddDefaultRoute,
      UsePeerDNS: parsedConfig.UsePeerDNS,
      VerifyServerCertificate: parsedConfig.VerifyServerCertificate,
      TlsVersion: parsedConfig.TlsVersion,
      AllowAuth: ["mschap2", "mschap"] as AuthMethod[],
    };

    // Make sure we have the VPNClient object
    const currentVPNClient = starContext.state.WAN.VPNClient || {};
    
    // Create an array of SSTP configs if it doesn't exist
    const sstpConfigs = currentVPNClient.SSTP || [];
    
    // Update the existing config or add a new one
    if (sstpConfigs.length > 0) {
      sstpConfigs[0] = sstpClientConfig;
    } else {
      sstpConfigs.push(sstpClientConfig);
    }
    
    // Update the context with the new SSTP config
    await starContext.updateWAN$({
      VPNClient: {
        ...currentVPNClient,
        SSTP: sstpConfigs
      }
    });
    
    console.log("SSTP config updated in context:", sstpClientConfig);
  });

  const handleManualFormSubmit$ = $(async () => {
    errorMessage.value = "";
    
    const manualConfig: SSTPConfig = {
      ConnectTo: serverAddress.value,
      Username: username.value,
      Password: password.value,
      Port: parseInt(port.value) || 443,
      AddDefaultRoute: addDefaultRoute.value,
      UsePeerDNS: usePeerDNS.value,
      VerifyServerCertificate: verifyServerCertificate.value,
      TlsVersion: tlsVersion.value,
    };

    const { isValid, emptyFields } = await validateSSTPConfig(manualConfig);

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

  const parseSSTPConfig = $(
    (configText: string): SSTPConfig | null => {
      try {
        const config: SSTPConfig = {
          ConnectTo: "",
          Username: "",
          Password: "",
          Port: 443,
          VerifyServerCertificate: true,
          TlsVersion: "any",
          AddDefaultRoute: true,
          UsePeerDNS: true,
        };
        
        const lines = configText.split('\n').map(line => line.trim());
        
        for (const line of lines) {
          // Skip comments and empty lines
          if (!line || line.startsWith('#') || line.startsWith(';')) {
            continue;
          }
          
          if (line.startsWith('server ') || line.startsWith('remote ')) {
            const parts = line.split(' ');
            config.ConnectTo = parts[1];
            
            // Check if port is specified
            if (parts.length > 2 && !isNaN(parseInt(parts[2]))) {
              config.Port = parseInt(parts[2]);
            }
          }
          else if (line.startsWith('user ')) {
            config.Username = line.split(' ')[1];
          }
          else if (line.startsWith('password ')) {
            config.Password = line.split(' ')[1];
          }
          else if (line.startsWith('port ')) {
            config.Port = parseInt(line.split(' ')[1]) || 443;
          }
          else if (line.startsWith('cert ') || line.startsWith('certificate ')) {
            config.ClientCertificateName = line.split(' ')[1];
          }
          else if (line.includes('verify-server no') || line.includes('verify-server-cert no')) {
            config.VerifyServerCertificate = false;
          }
          else if (line.startsWith('tls-version ')) {
            const tlsValue = line.split(' ')[1].toLowerCase();
            if (tlsValue === "1.2" || tlsValue === "only-1.2") {
              config.TlsVersion = "only-1.2";
            } else if (tlsValue === "1.3" || tlsValue === "only-1.3") {
              config.TlsVersion = "only-1.3";
            } else {
              config.TlsVersion = "any";
            }
          }
          else if (line.includes('defaultroute no') || line.includes('default-route no')) {
            config.AddDefaultRoute = false;
          }
          else if (line.includes('usepeerdns no') || line.includes('use-peerdns no')) {
            config.UsePeerDNS = false;
          }
          else if (line.startsWith('profile ')) {
            config.Profile = line.split(' ')[1];
          }
          else if (line.startsWith('auth ')) {
            const authMethods = line.substring(5).split(' ') as AuthMethod[];
            config.AllowedAuthMethods = authMethods;
          }
        }
        
        return config;
      } catch (error) {
        console.error("Error parsing SSTP config:", error);
        return null;
      }
    }
  );

  return {
    serverAddress,
    username,
    password,
    port,
    addDefaultRoute,
    usePeerDNS,
    verifyServerCertificate,
    tlsVersion,
    errorMessage,
    handleManualFormSubmit$,
    validateSSTPConfig,
    updateContextWithConfig$,
    parseSSTPConfig
  };
}; 