import { $, useSignal, useContext } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";

export interface IKEv2Config {
  ServerAddress: string;
  AuthMethod: 'psk' | 'eap' | 'certificate';
  PresharedKey?: string;
  Username?: string;
  Password?: string;
  ClientCertificateName?: string;
  CaCertificateName?: string;
  PolicyDstAddress?: string;
  Phase1HashAlgorithm?: string;
  Phase1EncryptionAlgorithm?: string;
  Phase1DHGroup?: string;
  Phase2HashAlgorithm?: string;
  Phase2EncryptionAlgorithm?: string;
  Phase2PFSGroup?: string;
}

export interface UseIKEv2ConfigResult {
  serverAddress: {value: string};
  username: {value: string};
  password: {value: string};
  authMethod: {value: 'psk' | 'eap' | 'certificate'};
  presharedKey: {value: string};
  policyDstAddress: {value: string};
  phase1HashAlgorithm: {value: string};
  phase1EncryptionAlgorithm: {value: string};
  phase1DHGroup: {value: string};
  phase2HashAlgorithm: {value: string};
  phase2EncryptionAlgorithm: {value: string};
  phase2PFSGroup: {value: string};
  errorMessage: {value: string};
  handleManualFormSubmit$: QRL<() => Promise<void>>;
  validateIKEv2Config: QRL<(config: IKEv2Config) => Promise<{
    isValid: boolean;
    emptyFields: string[];
  }>>;
  parseIKEv2Config: QRL<(configText: string) => IKEv2Config | null>;
  updateContextWithConfig$: QRL<(parsedConfig: IKEv2Config) => Promise<void>>;
}

export const useIKEv2Config = (
  onIsValidChange$?: QRL<(isValid: boolean) => void>
): UseIKEv2ConfigResult => {
  const starContext = useContext(StarContext);
  const errorMessage = useSignal("");
  
  const serverAddress = useSignal("");
  const authMethod = useSignal<"psk" | "eap" | "certificate">("psk");
  const presharedKey = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const policyDstAddress = useSignal("0.0.0.0/0");
  const phase1HashAlgorithm = useSignal("SHA256");
  const phase1EncryptionAlgorithm = useSignal("AES-256-CBC");
  const phase1DHGroup = useSignal("modp2048");
  const phase2HashAlgorithm = useSignal("SHA256");
  const phase2EncryptionAlgorithm = useSignal("AES-256-CBC");
  const phase2PFSGroup = useSignal("none");
  
  if (starContext.state.WAN.VPNClient?.IKeV2?.[0]) {
    const existingConfig = starContext.state.WAN.VPNClient.IKeV2[0];
    serverAddress.value = existingConfig.ServerAddress || "";
    
    if (existingConfig.AuthMethod) {
      authMethod.value = existingConfig.AuthMethod;
    }
    
    if (existingConfig.PresharedKey) {
      presharedKey.value = existingConfig.PresharedKey;
    }
    
    if (existingConfig.Credentials) {
      username.value = existingConfig.Credentials.Username || "";
      password.value = existingConfig.Credentials.Password || "";
    }
    
    if (existingConfig.PolicyDstAddress) {
      policyDstAddress.value = existingConfig.PolicyDstAddress;
    }
    
    let isConfigValid = serverAddress.value !== "";
    
    if (authMethod.value === "psk") {
      isConfigValid = isConfigValid && presharedKey.value !== "";
    } else if (authMethod.value === "eap") {
      isConfigValid = isConfigValid && username.value !== "" && password.value !== "";
    }
    
    if (isConfigValid) {
      if (onIsValidChange$) {
        setTimeout(() => onIsValidChange$(true), 0);
      }
    }
  }
  
  const validateIKEv2Config = $(async (config: IKEv2Config) => {
    const commonRequiredFields = [
      "ServerAddress",
      "AuthMethod",
    ];
    
    const emptyFields = commonRequiredFields.filter((field) => {
      const value = config[field as keyof IKEv2Config];
      return !value || (typeof value === 'string' && value.trim() === "");
    });
    
    if (config.AuthMethod === "psk" && (!config.PresharedKey || config.PresharedKey.trim() === "")) {
      emptyFields.push("PresharedKey");
    }
    
    if (config.AuthMethod === "eap" && (!config.Username || !config.Password)) {
      emptyFields.push("Credentials");
    }
    
    if (config.AuthMethod === "certificate" && (!config.ClientCertificateName || !config.CaCertificateName)) {
      emptyFields.push("Certificates");
    }

    return {
      isValid: emptyFields.length === 0,
      emptyFields,
    };
  });

  const parseIKEv2Config = $(
    (configText: string): IKEv2Config | null => {
      try {
        const config: IKEv2Config = {
          ServerAddress: "",
          AuthMethod: "psk",
          PolicyDstAddress: "0.0.0.0/0",
          Phase1HashAlgorithm: "SHA256",
          Phase1EncryptionAlgorithm: "AES-256-CBC",
          Phase1DHGroup: "modp2048",
          Phase2HashAlgorithm: "SHA256",
          Phase2EncryptionAlgorithm: "AES-256-CBC",
          Phase2PFSGroup: "none",
        };
        
        const lines = configText.split('\n').map(line => line.trim());
        
        for (const line of lines) {
          if (!line || line.startsWith('#') || line.startsWith(';')) {
            continue;
          }
          
          if (line.startsWith('conn ')) {
            continue;
          }
          else if (line.startsWith('right=')) {
            config.ServerAddress = line.substring(6).trim();
          }
          else if (line.startsWith('rightid=')) {
            const rightId = line.substring(8).trim();
            if (rightId.startsWith('"CN=')) {
              const cnValue = rightId.substring(4, rightId.length - 1);
              if (!config.ServerAddress) {
                config.ServerAddress = cnValue;
              }
            }
          }
          else if (line.includes('keyexchange=ikev2')) {
            continue;
          }
          else if (line.startsWith('ike=')) {
            const ike = line.substring(4).trim();
            const parts = ike.split('-');
            if (parts.length >= 3) {
              config.Phase1EncryptionAlgorithm = parts[0]; 
              config.Phase1HashAlgorithm = parts[1]; 
              config.Phase1DHGroup = parts[2]; 
            }
          }
          else if (line.startsWith('esp=')) {
            const esp = line.substring(4).trim();
            const parts = esp.split('-');
            if (parts.length >= 2) {
              config.Phase2EncryptionAlgorithm = parts[0]; 
              config.Phase2HashAlgorithm = parts[1];
            }
          }
          else if (line.startsWith('leftcert=')) {
            config.AuthMethod = "certificate";
            config.ClientCertificateName = line.substring(9).trim();
          }
          else if (line.includes('eap-radius')) {
            config.AuthMethod = "eap";
          }
          else if (line.includes('authby=secret') || line.includes('authby=psk')) {
            config.AuthMethod = "psk";
          }
          else if (line.startsWith('rightsubnet=')) {
            config.PolicyDstAddress = line.substring(12).trim();
          }
        }
        
        return config;
      } catch (error) {
        console.error("Error parsing IKEv2 config:", error);
        return null;
      }
    }
  );

  const updateContextWithConfig$ = $(async (parsedConfig: IKEv2Config) => {
    const ikev2ClientConfig = {
      ServerAddress: parsedConfig.ServerAddress,
      AuthMethod: parsedConfig.AuthMethod,
      PresharedKey: parsedConfig.PresharedKey,
      Credentials: parsedConfig.Username && parsedConfig.Password ? {
        Username: parsedConfig.Username,
        Password: parsedConfig.Password
      } : undefined,
      ClientCertificateName: parsedConfig.ClientCertificateName,
      CaCertificateName: parsedConfig.CaCertificateName,
      PolicySrcAddress: "0.0.0.0/0",
      PolicyDstAddress: parsedConfig.PolicyDstAddress,
    };

    const currentVPNClient = starContext.state.WAN.VPNClient || {};
    
    const ikev2Configs = currentVPNClient.IKeV2 || [];
    
    if (ikev2Configs.length > 0) {
      ikev2Configs[0] = ikev2ClientConfig;
    } else {
      ikev2Configs.push(ikev2ClientConfig);
    }
    
    await starContext.updateWAN$({
      VPNClient: {
        ...currentVPNClient,
        IKeV2: ikev2Configs
      }
    });
    
    console.log("IKEv2 config updated in context:", ikev2ClientConfig);
  });
  
  const handleManualFormSubmit$ = $(async () => {
    errorMessage.value = "";
    
    const manualConfig: IKEv2Config = {
      ServerAddress: serverAddress.value,
      AuthMethod: authMethod.value,
      PresharedKey: authMethod.value === "psk" ? presharedKey.value : undefined,
      Username: authMethod.value === "eap" ? username.value : undefined,
      Password: authMethod.value === "eap" ? password.value : undefined,
      PolicyDstAddress: policyDstAddress.value,
      Phase1HashAlgorithm: phase1HashAlgorithm.value,
      Phase1EncryptionAlgorithm: phase1EncryptionAlgorithm.value,
      Phase1DHGroup: phase1DHGroup.value,
      Phase2HashAlgorithm: phase2HashAlgorithm.value,
      Phase2EncryptionAlgorithm: phase2EncryptionAlgorithm.value,
      Phase2PFSGroup: phase2PFSGroup.value,
    };

    const { isValid, emptyFields } = await validateIKEv2Config(manualConfig);

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

  return {
    serverAddress,
    username,
    password,
    authMethod,
    presharedKey,
    policyDstAddress,
    phase1HashAlgorithm,
    phase1EncryptionAlgorithm,
    phase1DHGroup,
    phase2HashAlgorithm,
    phase2EncryptionAlgorithm,
    phase2PFSGroup,
    errorMessage,
    handleManualFormSubmit$,
    validateIKEv2Config,
    parseIKEv2Config,
    updateContextWithConfig$
  };
}; 