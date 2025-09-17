import { $, useSignal, useContext } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { PptpClientConfig } from "../../../../StarContext/Utils/VPNClientType";
import type { AuthMethod } from "../../../../StarContext/CommonType";

export interface UsePPTPConfigResult {
  serverAddress: { value: string };
  username: { value: string };
  password: { value: string };
  keepaliveTimeout: { value: string };
  errorMessage: { value: string };
  handleManualFormSubmit$: QRL<() => Promise<void>>;
  validatePPTPConfig: QRL<
    (config: PptpClientConfig) => Promise<{
      isValid: boolean;
      emptyFields: string[];
    }>
  >;
  updateContextWithConfig$: QRL<
    (parsedConfig: PptpClientConfig) => Promise<void>
  >;
  parsePPTPConfig: QRL<(configText: string) => PptpClientConfig | null>;
}

export const usePPTPConfig = (
  onIsValidChange$?: QRL<(isValid: boolean) => void>,
): UsePPTPConfigResult => {
  const starContext = useContext(StarContext);
  const errorMessage = useSignal("");

  const serverAddress = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const keepaliveTimeout = useSignal("30");

  // Initialize with existing config if available
  if (starContext.state.WAN.VPNClient?.PPTP) {
    const existingConfig = starContext.state.WAN.VPNClient.PPTP[0];
    serverAddress.value = existingConfig?.ConnectTo || "";

    if (existingConfig?.Credentials) {
      username.value = existingConfig.Credentials.Username || "";
      password.value = existingConfig.Credentials.Password || "";
    }

    if (existingConfig?.KeepaliveTimeout !== undefined) {
      keepaliveTimeout.value = existingConfig.KeepaliveTimeout.toString();
    }

    // Check if config is valid
    if (serverAddress.value && username.value && password.value) {
      if (onIsValidChange$) {
        setTimeout(() => onIsValidChange$(true), 0);
      }
    }
  }

  const validatePPTPConfig = $(async (config: PptpClientConfig) => {
    const emptyFields: string[] = [];

    if (!config.ConnectTo || config.ConnectTo.trim() === "") {
      emptyFields.push("ConnectTo");
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

    return {
      isValid: emptyFields.length === 0,
      emptyFields,
    };
  });

  const updateContextWithConfig$ = $(async (parsedConfig: PptpClientConfig) => {
    const currentVPNClient = starContext.state.WAN.VPNClient || {};

    await starContext.updateWAN$({
      VPNClient: {
        ...currentVPNClient,
        PPTP: [parsedConfig],
      },
    });
  });

  const handleManualFormSubmit$ = $(async () => {
    errorMessage.value = "";

    const manualConfig: PptpClientConfig = {
      ConnectTo: serverAddress.value,
      Credentials: {
        Username: username.value,
        Password: password.value,
      },
      KeepaliveTimeout: parseInt(keepaliveTimeout.value) || 30,
      AuthMethod: ["mschap2", "mschap1"] as AuthMethod[],
      DialOnDemand: false,
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

  const parsePPTPConfig = $((configText: string): PptpClientConfig | null => {
    try {
      const config: Partial<PptpClientConfig> = {
        ConnectTo: "",
        Credentials: { Username: "", Password: "" },
        KeepaliveTimeout: 30,
        AuthMethod: ["mschap2", "mschap1"] as AuthMethod[],
        DialOnDemand: false,
      };

      const lines = configText.split("\n").map((line) => line.trim());

      for (const line of lines) {
        if (!line || line.startsWith("#") || line.startsWith(";")) {
          continue;
        }

        if (line.startsWith("server ") || line.startsWith("remote ")) {
          config.ConnectTo = line.split(" ")[1];
        } else if (line.startsWith("user ")) {
          if (!config.Credentials)
            config.Credentials = { Username: "", Password: "" };
          config.Credentials.Username = line.split(" ")[1];
        } else if (line.startsWith("password ")) {
          if (!config.Credentials)
            config.Credentials = { Username: "", Password: "" };
          config.Credentials.Password = line.split(" ")[1];
        } else if (line.startsWith("auth ")) {
          const authMethods = line.substring(5).split(" ") as AuthMethod[];
          config.AuthMethod = authMethods;
        } else if (
          line.startsWith("keepalive ") ||
          line.startsWith("lcp-echo-interval ")
        ) {
          const parts = line.split(" ");
          if (parts.length >= 2) {
            config.KeepaliveTimeout = parseInt(parts[1]) || 30;
          }
        }
      }

      // Validate required fields
      if (
        !config.ConnectTo ||
        !config.Credentials?.Username ||
        !config.Credentials.Password
      ) {
        return null;
      }

      return config as PptpClientConfig;
    } catch (error) {
      console.error("Error parsing PPTP config:", error);
      return null;
    }
  });

  return {
    serverAddress,
    username,
    password,
    keepaliveTimeout,
    errorMessage,
    handleManualFormSubmit$,
    validatePPTPConfig,
    updateContextWithConfig$,
    parsePPTPConfig,
  };
};
