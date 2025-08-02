import { $, useSignal, useContext } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { SstpClientConfig } from "../../../../StarContext/Utils/VPNClientType";
import type {
  AuthMethod,
  TLSVersion,
} from "../../../../StarContext/CommonType";

export interface UseSSTPConfigResult {
  serverAddress: { value: string };
  username: { value: string };
  password: { value: string };
  port: { value: string };
  verifyServerCertificate: { value: boolean };
  tlsVersion: { value: TLSVersion };
  errorMessage: { value: string };
  handleManualFormSubmit$: QRL<() => Promise<void>>;
  validateSSTPConfig: QRL<
    (config: SstpClientConfig) => Promise<{
      isValid: boolean;
      emptyFields: string[];
    }>
  >;
  updateContextWithConfig$: QRL<
    (parsedConfig: SstpClientConfig) => Promise<void>
  >;
  parseSSTPConfig: QRL<(configText: string) => SstpClientConfig | null>;
}

export const useSSTPConfig = (
  onIsValidChange$?: QRL<(isValid: boolean) => void>,
): UseSSTPConfigResult => {
  const starContext = useContext(StarContext);
  const errorMessage = useSignal("");

  const serverAddress = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const port = useSignal("443");
  const verifyServerCertificate = useSignal(true);
  const tlsVersion = useSignal<TLSVersion>("any");

  // Initialize with existing config if available
  if (starContext.state.WAN.VPNClient?.SSTP) {
    const existingConfig = starContext.state.WAN.VPNClient.SSTP;
    serverAddress.value = existingConfig.Server.Address || "";
    port.value = existingConfig.Server.Port?.toString() || "443";

    if (existingConfig.Credentials) {
      username.value = existingConfig.Credentials.Username || "";
      password.value = existingConfig.Credentials.Password || "";
    }

    if (existingConfig.VerifyServerCertificate !== undefined) {
      verifyServerCertificate.value = existingConfig.VerifyServerCertificate;
    }

    if (existingConfig.TlsVersion) {
      tlsVersion.value = existingConfig.TlsVersion;
    }

    // Check if config is valid
    if (serverAddress.value && username.value && password.value) {
      if (onIsValidChange$) {
        setTimeout(() => onIsValidChange$(true), 0);
      }
    }
  }

  const validateSSTPConfig = $(async (config: SstpClientConfig) => {
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

    return {
      isValid: emptyFields.length === 0,
      emptyFields,
    };
  });

  const updateContextWithConfig$ = $(async (parsedConfig: SstpClientConfig) => {
    const currentVPNClient = starContext.state.WAN.VPNClient || {};

    await starContext.updateWAN$({
      VPNClient: {
        ...currentVPNClient,
        SSTP: parsedConfig,
      },
    });
  });

  const handleManualFormSubmit$ = $(async () => {
    errorMessage.value = "";

    const manualConfig: SstpClientConfig = {
      Server: {
        Address: serverAddress.value,
        Port: parseInt(port.value) || 443,
      },
      Credentials: {
        Username: username.value,
        Password: password.value,
      },
      AuthMethod: ["mschap2", "mschap1"] as AuthMethod[],
      TlsVersion: tlsVersion.value,
      VerifyServerCertificate: verifyServerCertificate.value,
      VerifyServerAddressFromCertificate: false,
      DialOnDemand: false,
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

  const parseSSTPConfig = $((configText: string): SstpClientConfig | null => {
    try {
      const config: Partial<SstpClientConfig> = {
        Server: { Address: "", Port: 443 },
        Credentials: { Username: "", Password: "" },
        AuthMethod: ["mschap2", "mschap1"] as AuthMethod[],
        TlsVersion: "any",
        VerifyServerCertificate: true,
        VerifyServerAddressFromCertificate: false,
        DialOnDemand: false,
      };

      const lines = configText.split("\n").map((line) => line.trim());

      for (const line of lines) {
        if (!line || line.startsWith("#") || line.startsWith(";")) {
          continue;
        }

        if (line.startsWith("server ") || line.startsWith("remote ")) {
          const parts = line.split(" ");
          if (parts.length >= 2) {
            config.Server!.Address = parts[1];
            if (parts.length >= 3 && !isNaN(parseInt(parts[2]))) {
              config.Server!.Port = parseInt(parts[2]);
            }
          }
        } else if (line.startsWith("port ")) {
          config.Server!.Port = parseInt(line.split(" ")[1]) || 443;
        } else if (line.startsWith("user ")) {
          if (!config.Credentials)
            config.Credentials = { Username: "", Password: "" };
          config.Credentials.Username = line.split(" ")[1];
        } else if (line.startsWith("password ")) {
          if (!config.Credentials)
            config.Credentials = { Username: "", Password: "" };
          config.Credentials.Password = line.split(" ")[1];
        } else if (line.startsWith("tls-version ")) {
          const version = line.split(" ")[1];
          if (
            version === "any" ||
            version === "only-1.2" ||
            version === "only-1.3"
          ) {
            config.TlsVersion = version as TLSVersion;
          }
        } else if (line.includes("verify-server-cert")) {
          config.VerifyServerCertificate = !line.includes("no-");
        } else if (line.startsWith("auth ")) {
          const authMethods = line.substring(5).split(" ") as AuthMethod[];
          config.AuthMethod = authMethods;
        }
      }

      // Validate required fields
      if (
        !config.Server?.Address ||
        !config.Credentials?.Username ||
        !config.Credentials.Password
      ) {
        return null;
      }

      return config as SstpClientConfig;
    } catch (error) {
      console.error("Error parsing SSTP config:", error);
      return null;
    }
  });

  return {
    serverAddress,
    username,
    password,
    port,
    verifyServerCertificate,
    tlsVersion,
    errorMessage,
    handleManualFormSubmit$,
    validateSSTPConfig,
    updateContextWithConfig$,
    parseSSTPConfig,
  };
};
