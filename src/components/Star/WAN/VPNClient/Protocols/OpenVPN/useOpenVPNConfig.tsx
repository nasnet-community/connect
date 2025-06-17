import { $, useContext, useSignal, type QRL } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type {
  OpenVpnClientConfig,
  OpenVpnClientCertificates
} from "../../../../StarContext/Utils/VPNClientType";

export interface UseOpenVPNConfigResult {
  config: { value: string };
  errorMessage: { value: string };
  configMethod: { value: "file" | "manual" };
  serverAddress: { value: string };
  serverPort: { value: string };
  protocol: { value: "tcp" | "udp" };
  authType: { value: "Credentials" | "Certificate" | "CredentialsCertificate" };
  username: { value: string };
  password: { value: string };
  cipher: { value: string };
  auth: { value: string };
  missingFields: { value: string[] };
  clientCertName: { value: string };
  unsupportedDirectives: { value: string[] };
  caCertificateContent: { value: string };
  clientCertificateContent: { value: string };
  clientKeyContent: { value: string };
  handleConfigChange$: QRL<(value: string) => Promise<void>>;
  handleManualFormSubmit$: QRL<() => Promise<void>>;
  handleFileUpload$: QRL<(event: Event) => Promise<void>>;
  validateOpenVPNConfig: QRL<
    (config: OpenVpnClientConfig) => Promise<{
      isValid: boolean;
      emptyFields: string[];
    }>
  >;
  parseOpenVPNConfig: QRL<
    (configText: string) => Promise<OpenVpnClientConfig | null>
  >;
  updateContextWithConfig$: QRL<
    (parsedConfig: OpenVpnClientConfig) => Promise<void>
  >;
}

export const useOpenVPNConfig = (
  onIsValidChange$?: QRL<(isValid: boolean) => void>,
): UseOpenVPNConfigResult => {
  const starContext = useContext(StarContext);

  const config = useSignal("");
  const errorMessage = useSignal("");
  const configMethod = useSignal<"file" | "manual">("file");
  const missingFields = useSignal<string[]>([]);

  const serverAddress = useSignal("");
  const serverPort = useSignal("1194");
  const protocol = useSignal<"tcp" | "udp">("udp");
  const authType =
    useSignal<"Credentials" | "Certificate" | "CredentialsCertificate">(
      "Credentials",
    );
  const username = useSignal("");
  const password = useSignal("");
  const cipher = useSignal("aes-256-gcm");
  const auth = useSignal("sha256");
  const clientCertName = useSignal("");
  const caCertName = useSignal("");
  const verifyServerCert = useSignal(true);
  const unsupportedDirectives = useSignal<string[]>([]);
  const caCertificateContent = useSignal("");
  const clientCertificateContent = useSignal("");
  const clientKeyContent = useSignal("");

  if (starContext.state.WAN.VPNClient?.OpenVPN) {
    const existingConfig = starContext.state.WAN.VPNClient.OpenVPN;
    serverAddress.value = existingConfig.Server?.Address || "";
    serverPort.value = existingConfig.Server?.Port?.toString() || "1194";
    protocol.value = existingConfig.Protocol || "udp";
    authType.value = existingConfig.AuthType || "Credentials";
    username.value = existingConfig.Credentials?.Username || "";
    password.value = existingConfig.Credentials?.Password || "";
    cipher.value =
      existingConfig.Cipher || "aes-256-gcm";
    auth.value = existingConfig.Auth || "sha256";
    clientCertName.value = existingConfig.Certificates?.ClientCertificateName || "";
    caCertName.value = existingConfig.Certificates?.CaCertificateName || "";
    verifyServerCert.value =
      existingConfig.VerifyServerCertificate !== false;
    caCertificateContent.value = existingConfig.Certificates?.CaCertificateContent || "";
    clientCertificateContent.value = existingConfig.Certificates?.ClientCertificateContent || "";
    clientKeyContent.value = existingConfig.Certificates?.ClientKeyContent || "";

    if (onIsValidChange$) {
      setTimeout(async () => {
        const { isValid } = await validateOpenVPNConfig(existingConfig);
        onIsValidChange$(isValid);
      }, 0);
    }
  }

  const validateOpenVPNConfig = $(
    async (
      config: OpenVpnClientConfig,
    ): Promise<{ isValid: boolean; emptyFields: string[] }> => {
      const emptyFields: string[] = [];
      if (!config.Server?.Address) emptyFields.push("Server Address");
      if (!config.Server?.Port) emptyFields.push("Server Port");

      if (
        config.AuthType === "Credentials" ||
        config.AuthType === "CredentialsCertificate"
      ) {
        if (!config.Credentials?.Username) emptyFields.push("Username");
        if (!config.Credentials?.Password) emptyFields.push("Password");
      }

      if (
        config.AuthType === "Certificate" ||
        config.AuthType === "CredentialsCertificate"
      ) {
        if (!config.Certificates?.ClientCertificateName)
          emptyFields.push("Client Certificate");
      }

      return { isValid: emptyFields.length === 0, emptyFields };
    },
  );

  const updateContextWithConfig$ = $(
    async (parsedConfig: OpenVpnClientConfig) => {
      serverAddress.value = parsedConfig.Server.Address;
      serverPort.value = parsedConfig.Server.Port?.toString() ?? "1194";
      protocol.value = parsedConfig.Protocol ?? "udp";
      authType.value = parsedConfig.AuthType;
      username.value = parsedConfig.Credentials?.Username ?? "";
      password.value = parsedConfig.Credentials?.Password ?? "";
      cipher.value = parsedConfig.Cipher ?? "aes-256-gcm";
      auth.value = parsedConfig.Auth ?? "sha256";
      clientCertName.value = parsedConfig.Certificates?.ClientCertificateName ?? "";
      caCertName.value = parsedConfig.Certificates?.CaCertificateName ?? "";
      verifyServerCert.value = parsedConfig.VerifyServerCertificate !== false;
      caCertificateContent.value = parsedConfig.Certificates?.CaCertificateContent || "";
      clientCertificateContent.value = parsedConfig.Certificates?.ClientCertificateContent || "";
      clientKeyContent.value = parsedConfig.Certificates?.ClientKeyContent || "";

      missingFields.value = [];
      errorMessage.value = "";

      await starContext.updateWAN$({
        VPNClient: {
          ...starContext.state.WAN.VPNClient,
          OpenVPN: parsedConfig,
        },
      });

      const { isValid } = await validateOpenVPNConfig(parsedConfig);
      if (onIsValidChange$) {
        onIsValidChange$(isValid);
      }
    },
  );

  const parseOpenVPNConfig = $(
    async (configText: string): Promise<OpenVpnClientConfig | null> => {
      try {
        const lines = configText.split("\n");
        const config: Partial<OpenVpnClientConfig> & {
          Server: { Address: string; Port?: number };
          Certificates: Partial<OpenVpnClientCertificates>;
        } = {
          Server: { Address: "" },
          Certificates: {},
          Protocol: "udp",
          Auth: "sha256",
          Cipher: "aes256-gcm",
          VerifyServerCertificate: true,
        };

        let authUserPass = false;
        let clientCertFound = false;
        let caFound = false;
        let inBlock: 'ca' | 'cert' | 'key' | null = null;
        const blockContent = { ca: "", cert: "", key: "" };
        const unsupportedDirectivesFound: string[] = [];
        let detectedCipher = '';
        let detectedAuth: string | null = null;

        for (let i = 0; i < lines.length; i++) {
          const trimmedLine = lines[i].trim();

          if (trimmedLine.startsWith("</")) {
            inBlock = null;
            continue;
          }

          if (inBlock) {
            blockContent[inBlock] += trimmedLine + '\\n';
            continue;
          }

          if (
            trimmedLine.startsWith("<ca>") ||
            trimmedLine.startsWith("<cert>") ||
            trimmedLine.startsWith("<key>") ||
            trimmedLine.startsWith("<tls-auth>") ||
            trimmedLine.startsWith("<tls-crypt>")
          ) {
            
            if (trimmedLine.startsWith("<ca>")) {
              inBlock = "ca";
              caFound = true;
            } else if (trimmedLine.startsWith("<cert>")) {
              inBlock = "cert";
              clientCertFound = true;
            } else if (trimmedLine.startsWith("<key>")) {
              inBlock = "key";
            } else if (trimmedLine.startsWith("<tls-auth>")) {
              unsupportedDirectivesFound.push('tls-auth');
            } else if (trimmedLine.startsWith("<tls-crypt>")) {
              unsupportedDirectivesFound.push('tls-crypt');
            }
            if (!trimmedLine.includes("</")) {
              continue;
            }
          }

          if (!trimmedLine || trimmedLine.startsWith("#") || trimmedLine.startsWith(";"))
            continue;

          const parts = trimmedLine.split(/\s+/);
          const directive = parts[0].toLowerCase();
          const value = parts[1];
          const value2 = parts[2];

          switch (directive) {
            case "remote":
              if (!config.Server.Address) {
                config.Server.Address = value;
                config.Server.Port = value2 ? parseInt(value2, 10) : 1194;
              }
              break;
            case "dev":
              if (value === "tun") config.Mode = "ip";
              if (value === "tap") config.Mode = "ethernet";
              break;
            case "proto":
              if (value === "tcp" || value === "udp") {
                config.Protocol = value;
              }
              break;
            case "auth-user-pass":
              authUserPass = true;
              break;
            case "cipher":
              config.Cipher = (value?.toUpperCase() as any);
              detectedCipher = value?.toLowerCase() || '';
              break;
            case "auth":
              config.Auth = (value?.toUpperCase() as any);
              detectedAuth = value?.toLowerCase() || '';
              break;
            case "ca":
              config.Certificates.CaCertificateName = value;
              caFound = true;
              break;
            case "cert":
              config.Certificates.ClientCertificateName = value;
              clientCertFound = true;
              break;
            case "remote-cert-tls":
              config.VerifyServerCertificate = value === "server";
              break;
            case 'verify-x509-name':
                config.VerifyServerCertificate = true;
                break;
            case "comp-lzo":
            case "compress":
            case "crl-verify":
                unsupportedDirectivesFound.push(directive);
                break;
          }
        }
        
        if (detectedCipher.includes('gcm') && detectedAuth && detectedAuth !== 'null') {
          unsupportedDirectivesFound.push(`auth ${detectedAuth} with GCM cipher`);
        }
        
        unsupportedDirectives.value = [...new Set(unsupportedDirectivesFound)];

        if (caFound && !config.Certificates.CaCertificateName) {
            config.Certificates.CaCertificateName = "ovpn-client-ca";
        }

        if (clientCertFound && !config.Certificates.ClientCertificateName) {
            config.Certificates.ClientCertificateName = "ovpn-client-cert";
        }

        config.Certificates.CaCertificateContent = blockContent.ca.trim() || undefined;
        config.Certificates.ClientCertificateContent = blockContent.cert.trim() || undefined;
        config.Certificates.ClientKeyContent = blockContent.key.trim() || undefined;

        if (authUserPass && clientCertFound) {
          config.AuthType = "CredentialsCertificate";
        } else if (clientCertFound) {
          config.AuthType = "Certificate";
        } else if (authUserPass) {
          config.AuthType = "Credentials";
        } else {
            errorMessage.value = "Could not determine authentication type. No 'auth-user-pass' or certificate found.";
            return null;
        }
        
        if(config.Cipher) {
            const cipherLower = config.Cipher.toLowerCase();
            if(cipherLower.includes('aes-256-gcm')) config.Cipher = 'aes256-gcm';
            else if(cipherLower.includes('aes-256-cbc')) config.Cipher = 'aes256-cbc';
            else if(cipherLower.includes('aes-128-gcm')) config.Cipher = 'aes128-gcm';
            else if(cipherLower.includes('aes-128-cbc')) config.Cipher = 'aes128-cbc';
            else if(cipherLower.includes('aes-192-gcm')) config.Cipher = 'aes192-gcm';
            else if(cipherLower.includes('aes-192-cbc')) config.Cipher = 'aes192-cbc';
            else if(cipherLower.includes('blowfish128')) config.Cipher = 'blowfish128';
            else if(cipherLower.includes('null')) config.Cipher = 'null';
        }

        if(config.Auth) {
            const authLower = config.Auth.toLowerCase();
            if(['md5', 'sha1', 'null', 'sha256', 'sha512'].includes(authLower)) {
                config.Auth = authLower as any;
            }
        }

        const finalConfig = config as OpenVpnClientConfig;

        serverAddress.value = finalConfig.Server?.Address || "";
        serverPort.value = finalConfig.Server?.Port?.toString() || "1194";
        protocol.value = finalConfig.Protocol || "udp";
        authType.value = finalConfig.AuthType || "Credentials";
        username.value = finalConfig.Credentials?.Username || "";
        password.value = finalConfig.Credentials?.Password || "";
        cipher.value = finalConfig.Cipher || "aes-256-gcm";
        auth.value = finalConfig.Auth || "sha256";
        clientCertName.value = finalConfig.Certificates?.ClientCertificateName || "";
        caCertName.value = finalConfig.Certificates?.CaCertificateName || "";
        verifyServerCert.value = finalConfig.VerifyServerCertificate !== false;
        caCertificateContent.value = finalConfig.Certificates?.CaCertificateContent || "";
        clientCertificateContent.value = finalConfig.Certificates?.ClientCertificateContent || "";
        clientKeyContent.value = finalConfig.Certificates?.ClientKeyContent || "";

        const { isValid, emptyFields } =
          await validateOpenVPNConfig(finalConfig);

        if (!isValid) {
            const message = `Configuration file is incomplete. Please provide the following: ${emptyFields.join(
                ", ",
              )}`;
            errorMessage.value = message;
            missingFields.value = emptyFields;

            if(onIsValidChange$) onIsValidChange$(false);

          return null;
        }

        return finalConfig;
      } catch (error) {
        errorMessage.value = "Failed to parse OpenVPN configuration file.";
        console.error("Error parsing OpenVPN config:", error);
        return null;
      }
    },
  );

  const handleConfigChange$ = $(async (value: string) => {
    config.value = value;
    missingFields.value = [];
    errorMessage.value = "";
    unsupportedDirectives.value = [];
    const parsedConfig = await parseOpenVPNConfig(value);
    if (parsedConfig) {
      await updateContextWithConfig$(parsedConfig);
    }
  });

  const handleFileUpload$ = $(async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];

    try {
      const text = await file.text();
      await handleConfigChange$(text);
    } catch (error) {
      errorMessage.value = `Error reading file: ${error}`;
    }
  });

  const handleManualFormSubmit$ = $(async () => {
    const manualConfig: OpenVpnClientConfig = {
      Server: {
        Address: serverAddress.value,
        Port: parseInt(serverPort.value, 10),
      },
      Protocol: protocol.value,
      AuthType: authType.value,
      Credentials:
        authType.value === "Credentials" ||
        authType.value === "CredentialsCertificate"
          ? { Username: username.value, Password: password.value }
          : undefined,
      Cipher: cipher.value as any,
      Auth: auth.value as any,
      Certificates: {
        ClientCertificateName:
          authType.value === "Certificate" ||
          authType.value === "CredentialsCertificate"
            ? clientCertName.value
            : undefined,
        CaCertificateName: caCertName.value || undefined,
        CaCertificateContent: caCertificateContent.value || undefined,
        ClientCertificateContent: clientCertificateContent.value || undefined,
        ClientKeyContent: clientKeyContent.value || undefined,
      },
      VerifyServerCertificate: verifyServerCert.value,
    };

    const { isValid, emptyFields } =
      await validateOpenVPNConfig(manualConfig);
    if (!isValid) {
      errorMessage.value = `Please fill all required fields: ${emptyFields.join(
        ", ",
      )}`;
      if (onIsValidChange$) onIsValidChange$(false);
      return;
    }

    await starContext.updateWAN$({
      VPNClient: {
        ...starContext.state.WAN.VPNClient,
        OpenVPN: manualConfig,
      },
    });

    errorMessage.value = "";
    if (onIsValidChange$) onIsValidChange$(true);
  });

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
    missingFields,
    clientCertName,
    unsupportedDirectives,
    caCertificateContent,
    clientCertificateContent,
    clientKeyContent,
    handleConfigChange$,
    handleManualFormSubmit$,
    handleFileUpload$,
    validateOpenVPNConfig,
    parseOpenVPNConfig,
    updateContextWithConfig$,
  };
}; 