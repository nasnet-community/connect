import { $, useSignal, useContext } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { AuthMethod } from "../../../../StarContext/CommonType";

export interface L2TPConfig {
  ConnectTo: string;
  Username: string;
  Password: string;
  UseIPsec?: boolean;
  IPsecSecret?: string;
  AddDefaultRoute?: boolean;
  UsePeerDNS?: boolean;
}

export interface UseL2TPConfigResult {
  serverAddress: {value: string};
  username: {value: string};
  password: {value: string};
  useIPsec: {value: boolean};
  ipsecSecret: {value: string};
  addDefaultRoute: {value: boolean};
  usePeerDNS: {value: boolean};
  errorMessage: {value: string};
  handleManualFormSubmit$: QRL<() => Promise<void>>;
  validateL2TPConfig: QRL<(config: L2TPConfig) => Promise<{
    isValid: boolean;
    emptyFields: string[];
  }>>;
  updateContextWithConfig$: QRL<(parsedConfig: L2TPConfig) => Promise<void>>;
}

export const useL2TPConfig = (
  onIsValidChange$?: QRL<(isValid: boolean) => void>
): UseL2TPConfigResult => {
  const starContext = useContext(StarContext);
  const errorMessage = useSignal("");
  
  const serverAddress = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const useIPsec = useSignal(true);
  const ipsecSecret = useSignal("");
  const addDefaultRoute = useSignal(true);
  const usePeerDNS = useSignal(true);
  
  if (starContext.state.WAN.VPNClient?.L2TP?.[0]) {
    const existingConfig = starContext.state.WAN.VPNClient.L2TP[0];
    serverAddress.value = existingConfig.ConnectTo || "";
    
    if (existingConfig.Credentials) {
      username.value = existingConfig.Credentials.Username || "";
      password.value = existingConfig.Credentials.Password || "";
    }
    
    if (existingConfig.UseIPsec !== undefined) {
      useIPsec.value = existingConfig.UseIPsec;
    }
    
    if (existingConfig.IPsecSecret) {
      ipsecSecret.value = existingConfig.IPsecSecret;
    }
    
    if (existingConfig.AddDefaultRoute !== undefined) {
      addDefaultRoute.value = existingConfig.AddDefaultRoute;
    }
    
    if (existingConfig.UsePeerDNS !== undefined) {
      usePeerDNS.value = existingConfig.UsePeerDNS;
    }
    
    const isConfigValid = serverAddress.value && username.value && password.value && 
                          (!useIPsec.value || (useIPsec.value && ipsecSecret.value));
    
    if (isConfigValid) {
      if (onIsValidChange$) {
        setTimeout(() => onIsValidChange$(true), 0);
      }
    }
  }
  
  const validateL2TPConfig = $(async (config: L2TPConfig) => {
    const requiredFields = [
      "ConnectTo",
      "Username", 
      "Password"
    ];
    
    const emptyFields = requiredFields.filter((field) => {
      const value = config[field as keyof L2TPConfig];
      return !value || (typeof value === 'string' && value.trim() === "");
    });

    if (config.UseIPsec && (!config.IPsecSecret || config.IPsecSecret.trim() === "")) {
      emptyFields.push("IPsecSecret");
    }

    return {
      isValid: emptyFields.length === 0,
      emptyFields,
    };
  });

  const updateContextWithConfig$ = $(async (parsedConfig: L2TPConfig) => {
    const l2tpClientConfig = {
      ConnectTo: parsedConfig.ConnectTo,
      Credentials: {
        Username: parsedConfig.Username, 
        Password: parsedConfig.Password
      },
      UseIPsec: parsedConfig.UseIPsec,
      IPsecSecret: parsedConfig.IPsecSecret,
      AddDefaultRoute: parsedConfig.AddDefaultRoute,
      UsePeerDNS: parsedConfig.UsePeerDNS,
      AllowAuth: ["mschap2", "mschap"] as AuthMethod[],
    };

    const currentVPNClient = starContext.state.WAN.VPNClient || {};
    
    const l2tpConfigs = currentVPNClient.L2TP || [];
    
    if (l2tpConfigs.length > 0) {
      l2tpConfigs[0] = l2tpClientConfig;
    } else {
      l2tpConfigs.push(l2tpClientConfig);
    }
    
    await starContext.updateWAN$({
      VPNClient: {
        ...currentVPNClient,
        L2TP: l2tpConfigs
      }
    });
    
    console.log("L2TP config updated in context:", l2tpClientConfig);
  });

  const handleManualFormSubmit$ = $(async () => {
    errorMessage.value = "";
    
    const manualConfig: L2TPConfig = {
      ConnectTo: serverAddress.value,
      Username: username.value,
      Password: password.value,
      UseIPsec: useIPsec.value,
      IPsecSecret: useIPsec.value ? ipsecSecret.value : undefined,
      AddDefaultRoute: addDefaultRoute.value,
      UsePeerDNS: usePeerDNS.value,
    };

    const { isValid, emptyFields } = await validateL2TPConfig(manualConfig);

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
    useIPsec,
    ipsecSecret,
    addDefaultRoute,
    usePeerDNS,
    errorMessage,
    handleManualFormSubmit$,
    validateL2TPConfig,
    updateContextWithConfig$
  };
}; 