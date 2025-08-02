import { $, useSignal, useContext } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { L2tpClientConfig } from "../../../../StarContext/Utils/VPNClientType";
import type { AuthMethod } from "../../../../StarContext/CommonType";

export interface UseL2TPConfigResult {
  serverAddress: { value: string };
  username: { value: string };
  password: { value: string };
  useIPsec: { value: boolean };
  ipsecSecret: { value: string };
  errorMessage: { value: string };
  handleManualFormSubmit$: QRL<() => Promise<void>>;
  validateL2TPConfig: QRL<
    (config: L2tpClientConfig) => Promise<{
      isValid: boolean;
      emptyFields: string[];
    }>
  >;
  updateContextWithConfig$: QRL<
    (parsedConfig: L2tpClientConfig) => Promise<void>
  >;
}

export const useL2TPConfig = (
  onIsValidChange$?: QRL<(isValid: boolean) => void>,
): UseL2TPConfigResult => {
  const starContext = useContext(StarContext);
  const errorMessage = useSignal("");

  const serverAddress = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const useIPsec = useSignal(false);
  const ipsecSecret = useSignal("");

  // Initialize with existing config if available
  if (starContext.state.WAN.VPNClient?.L2TP) {
    const existingConfig = starContext.state.WAN.VPNClient.L2TP;
    serverAddress.value = existingConfig.Server.Address || "";

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

    // Check if config is valid
    const isConfigValid =
      serverAddress.value &&
      username.value &&
      password.value &&
      (!useIPsec.value || (useIPsec.value && ipsecSecret.value));

    if (isConfigValid) {
      if (onIsValidChange$) {
        setTimeout(() => onIsValidChange$(true), 0);
      }
    }
  }

  const validateL2TPConfig = $(async (config: L2tpClientConfig) => {
    const emptyFields: string[] = [];

    if (!config.Server.Address || config.Server.Address.trim() === "") {
      emptyFields.push("Server Address");
    }

    if (
      !config.Credentials.Username ||
      config.Credentials.Username.trim() === ""
    ) {
      emptyFields.push("Username");
    }

    if (
      !config.Credentials.Password ||
      config.Credentials.Password.trim() === ""
    ) {
      emptyFields.push("Password");
    }

    if (
      config.UseIPsec &&
      (!config.IPsecSecret || config.IPsecSecret.trim() === "")
    ) {
      emptyFields.push("IPsecSecret");
    }

    return {
      isValid: emptyFields.length === 0,
      emptyFields,
    };
  });

  const updateContextWithConfig$ = $(async (parsedConfig: L2tpClientConfig) => {
    const currentVPNClient = starContext.state.WAN.VPNClient || {};

    await starContext.updateWAN$({
      VPNClient: {
        ...currentVPNClient,
        L2TP: parsedConfig,
      },
    });
  });

  const handleManualFormSubmit$ = $(async () => {
    errorMessage.value = "";

    const manualConfig: L2tpClientConfig = {
      Server: {
        Address: serverAddress.value,
      },
      Credentials: {
        Username: username.value,
        Password: password.value,
      },
      UseIPsec: useIPsec.value,
      IPsecSecret: useIPsec.value ? ipsecSecret.value : undefined,
      AuthMethod: ["mschap2", "mschap1"] as AuthMethod[],
      ProtoVersion: "l2tpv2",
      FastPath: true,
      DialOnDemand: false,
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
    errorMessage,
    handleManualFormSubmit$,
    validateL2TPConfig,
    updateContextWithConfig$,
  };
};
