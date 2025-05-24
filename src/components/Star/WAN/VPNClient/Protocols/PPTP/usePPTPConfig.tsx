import { $, useSignal, useContext } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { AuthMethod } from "../../../../StarContext/CommonType";

export interface PPTPConfig {
  ConnectTo: string;
  Username: string;
  Password: string;
  Profile?: string;
  AllowedAuthMethods?: AuthMethod[];
  KeepaliveTimeout?: number;
}

export interface UsePPTPConfigResult {
  serverAddress: {value: string};
  username: {value: string};
  password: {value: string};
  keepaliveTimeout: {value: string};
  errorMessage: {value: string};
  handleManualFormSubmit$: QRL<() => Promise<void>>;
  validatePPTPConfig: QRL<(config: PPTPConfig) => Promise<{
    isValid: boolean;
    emptyFields: string[];
  }>>;
  updateContextWithConfig$: QRL<(parsedConfig: PPTPConfig) => Promise<void>>;
  parsePPTPConfig: QRL<(configText: string) => PPTPConfig | null>;
}

export const usePPTPConfig = (
  onIsValidChange$?: QRL<(isValid: boolean) => void>
): UsePPTPConfigResult => {
  const starContext = useContext(StarContext);
  const errorMessage = useSignal("");
  
  const serverAddress = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const keepaliveTimeout = useSignal("30");
  
  if (starContext.state.WAN.VPNClient?.PPTP?.[0]) {
    const existingConfig = starContext.state.WAN.VPNClient.PPTP[0];
    serverAddress.value = existingConfig.ConnectTo || "";
    
    if (existingConfig.Credentials) {
      username.value = existingConfig.Credentials.Username || "";
      password.value = existingConfig.Credentials.Password || "";
    }
    
    if (existingConfig.KeepaliveTimeout !== undefined) {
      keepaliveTimeout.value = existingConfig.KeepaliveTimeout.toString();
    }
    
    if (serverAddress.value && username.value && password.value) {
      if (onIsValidChange$) {
        setTimeout(() => onIsValidChange$(true), 0);
      }
    }
  }
  
  const validatePPTPConfig = $(async (config: PPTPConfig) => {
    const requiredFields = [
      "ConnectTo",
      "Username", 
      "Password"
    ];
    
    const emptyFields = requiredFields.filter((field) => {
      const value = config[field as keyof PPTPConfig];
      return !value || (typeof value === 'string' && value.trim() === "");
    });

    return {
      isValid: emptyFields.length === 0,
      emptyFields,
    };
  });

  const updateContextWithConfig$ = $(async (parsedConfig: PPTPConfig) => {
    const pptpClientConfig = {
      ConnectTo: parsedConfig.ConnectTo,
      Credentials: {
        Username: parsedConfig.Username, 
        Password: parsedConfig.Password
      },
      KeepaliveTimeout: parsedConfig.KeepaliveTimeout,
      AddDefaultRoute: true,
      UsePeerDNS: true,
      AllowAuth: ["mschap2", "mschap"] as AuthMethod[],
      AllowMPPE: true,
      MPPERequired: true,
      MPPE128: true,
      MPPEStateful: true
    };

    const currentVPNClient = starContext.state.WAN.VPNClient || {};
    
    const pptpConfigs = currentVPNClient.PPTP || [];
    
    if (pptpConfigs.length > 0) {
      pptpConfigs[0] = pptpClientConfig;
    } else {
      pptpConfigs.push(pptpClientConfig);
    }
    
    await starContext.updateWAN$({
      VPNClient: {
        ...currentVPNClient,
        PPTP: pptpConfigs
      }
    });
    
  });

  const handleManualFormSubmit$ = $(async () => {
    errorMessage.value = "";
    
    const manualConfig: PPTPConfig = {
      ConnectTo: serverAddress.value,
      Username: username.value,
      Password: password.value,
      KeepaliveTimeout: parseInt(keepaliveTimeout.value) || 30,
    };

    const { isValid, emptyFields } = await validatePPTPConfig(manualConfig);

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

  const parsePPTPConfig = $(
    (configText: string): PPTPConfig | null => {
      try {
        const config: PPTPConfig = {
          ConnectTo: "",
          Username: "",
          Password: "",
          KeepaliveTimeout: 30,
        };
        
        const lines = configText.split('\n').map(line => line.trim());
        
        for (const line of lines) {
          if (!line || line.startsWith('#') || line.startsWith(';')) {
            continue;
          }
          
          if (line.startsWith('server ') || line.startsWith('remote ')) {
            config.ConnectTo = line.split(' ')[1];
          }
          else if (line.startsWith('user ')) {
            config.Username = line.split(' ')[1];
          }
          else if (line.startsWith('password ')) {
            config.Password = line.split(' ')[1];
          }
          else if (line.startsWith('profile ')) {
            config.Profile = line.split(' ')[1];
          }
          else if (line.startsWith('auth ')) {
            const authMethods = line.substring(5).split(' ') as AuthMethod[];
            config.AllowedAuthMethods = authMethods;
          }
          else if (line.startsWith('keepalive ') || line.startsWith('lcp-echo-interval ')) {
            const parts = line.split(' ');
            if (parts.length >= 2) {
              config.KeepaliveTimeout = parseInt(parts[1]) || 30;
            }
          }
        }
        
        return config;
      } catch (error) {
        console.error("Error parsing PPTP config:", error);
        return null;
      }
    }
  );

  return {
    serverAddress,
    username,
    password,
    keepaliveTimeout,
    errorMessage,
    handleManualFormSubmit$,
    validatePPTPConfig,
    updateContextWithConfig$,
    parsePPTPConfig
  };
}; 