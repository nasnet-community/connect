import { $, useContext, useSignal, type QRL } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { StarContext } from "../../../../StarContext/StarContext";
import type {
  OpenVpnClientConfig,
  OpenVpnClientCertificates,
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
  authTypeSelectionNeeded: { value: boolean };
  parsedConfigWaitingForAuth: { value: any };
  handleConfigChange$: QRL<(value: string) => Promise<void>>;
  handleManualFormSubmit$: QRL<() => Promise<void>>;
  handleFileUpload$: QRL<(event: Event) => Promise<void>>;
  handleAuthTypeSelection$: QRL<
    (
      selectedAuthType:
        | "Credentials"
        | "Certificate"
        | "CredentialsCertificate",
    ) => Promise<void>
  >;
  setConfigMethod$: QRL<(method: "file" | "manual") => Promise<void>>;
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
  const authType = useSignal<
    "Credentials" | "Certificate" | "CredentialsCertificate"
  >("Credentials");
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
  const authTypeSelectionNeeded = useSignal(false);
  const parsedConfigWaitingForAuth = useSignal<any>(null);

  if (starContext.state.WAN.VPNClient?.OpenVPN) {
    const existingConfig = starContext.state.WAN.VPNClient.OpenVPN;
    serverAddress.value = existingConfig.Server.Address || "";
    serverPort.value = existingConfig.Server.Port?.toString() || "1194";
    protocol.value = existingConfig.Protocol || "udp";
    authType.value = existingConfig.AuthType || "Credentials";
    username.value = existingConfig.Credentials?.Username || "";
    password.value = existingConfig.Credentials?.Password || "";
    cipher.value = existingConfig.Cipher || "aes-256-gcm";
    auth.value = existingConfig.Auth || "sha256";
    clientCertName.value =
      existingConfig.Certificates?.ClientCertificateName || "";
    caCertName.value = existingConfig.Certificates?.CaCertificateName || "";
    verifyServerCert.value = existingConfig.VerifyServerCertificate !== false;
    caCertificateContent.value =
      existingConfig.Certificates?.CaCertificateContent || "";
    clientCertificateContent.value =
      existingConfig.Certificates?.ClientCertificateContent || "";
    clientKeyContent.value =
      existingConfig.Certificates?.ClientKeyContent || "";

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

      // Basic required fields
      if (!config.Server.Address) emptyFields.push("Server Address");
      if (!config.Server.Port) emptyFields.push("Server Port");

      // Credential validation with RouterOS constraints
      if (
        config.AuthType === "Credentials" ||
        config.AuthType === "CredentialsCertificate"
      ) {
        if (!config.Credentials?.Username) {
          emptyFields.push("Username");
        } else if (config.Credentials.Username.length > 27) {
          emptyFields.push("Username (max 27 characters for RouterOS)");
        }

        if (!config.Credentials?.Password) {
          emptyFields.push("Password");
        } else if (config.Credentials.Password.length > 1000) {
          emptyFields.push("Password (max 1000 characters for RouterOS)");
        }
      }

      // Certificate validation
      if (
        config.AuthType === "Certificate" ||
        config.AuthType === "CredentialsCertificate"
      ) {
        if (!config.Certificates?.ClientCertificateName)
          emptyFields.push("Client Certificate");
      }

      // RouterOS specific validation
      const supportedCiphers = [
        "null",
        "aes128-cbc",
        "aes128-gcm",
        "aes192-cbc",
        "aes192-gcm",
        "aes256-cbc",
        "aes256-gcm",
        "blowfish128",
      ];
      const supportedAuth = ["md5", "sha1", "null", "sha256", "sha512"];

      if (config.Cipher && !supportedCiphers.includes(config.Cipher)) {
        emptyFields.push("Supported Cipher (RouterOS limitation)");
      }

      if (config.Auth && !supportedAuth.includes(config.Auth)) {
        emptyFields.push("Supported Auth Algorithm (RouterOS limitation)");
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
      clientCertName.value =
        parsedConfig.Certificates?.ClientCertificateName ?? "";
      caCertName.value = parsedConfig.Certificates?.CaCertificateName ?? "";
      verifyServerCert.value = parsedConfig.VerifyServerCertificate !== false;
      caCertificateContent.value =
        parsedConfig.Certificates?.CaCertificateContent || "";
      clientCertificateContent.value =
        parsedConfig.Certificates?.ClientCertificateContent || "";
      clientKeyContent.value =
        parsedConfig.Certificates?.ClientKeyContent || "";

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
        let inBlock: "ca" | "cert" | "key" | "tls-auth" | "tls-crypt" | null =
          null;
        const blockContent = {
          ca: "",
          cert: "",
          key: "",
          "tls-auth": "",
          "tls-crypt": "",
        };
        const unsupportedDirectivesFound: string[] = [];
        const remoteServers: Array<{ address: string; port: number }> = [];
        let detectedCipher = "";
        let detectedAuth: string | null = null;
        let hasTlsAuth = false;
        let hasTlsCrypt = false;

        // MikroTik RouterOS supported values
        const supportedCiphers = [
          "null",
          "aes128-cbc",
          "aes128-gcm",
          "aes192-cbc",
          "aes192-gcm",
          "aes256-cbc",
          "aes256-gcm",
          "blowfish128",
        ];
        const supportedAuth = ["md5", "sha1", "null", "sha256", "sha512"];

        for (let i = 0; i < lines.length; i++) {
          const trimmedLine = lines[i].trim();

          // Handle end of blocks
          if (trimmedLine.startsWith("</")) {
            inBlock = null;
            continue;
          }

          // Handle content inside blocks
          if (inBlock) {
            if (inBlock === "ca" || inBlock === "cert" || inBlock === "key") {
              blockContent[inBlock] += trimmedLine + "\\n";
            } else if (inBlock === "tls-auth") {
              hasTlsAuth = true;
              blockContent[inBlock] += trimmedLine + "\\n";
            } else if (inBlock === "tls-crypt") {
              hasTlsCrypt = true;
              blockContent[inBlock] += trimmedLine + "\\n";
            }
            continue;
          }

          // Handle start of blocks
          if (trimmedLine.startsWith("<") && !trimmedLine.startsWith("</")) {
            if (trimmedLine.startsWith("<ca>")) {
              inBlock = "ca";
              caFound = true;
            } else if (trimmedLine.startsWith("<cert>")) {
              inBlock = "cert";
              clientCertFound = true;
            } else if (trimmedLine.startsWith("<key>")) {
              inBlock = "key";
            } else if (trimmedLine.startsWith("<tls-auth>")) {
              inBlock = "tls-auth";
              hasTlsAuth = true;
            } else if (trimmedLine.startsWith("<tls-crypt>")) {
              inBlock = "tls-crypt";
              hasTlsCrypt = true;
            }

            // Handle single-line blocks
            if (trimmedLine.includes("</")) {
              inBlock = null;
            }
            continue;
          }

          // Skip empty lines and comments
          if (
            !trimmedLine ||
            trimmedLine.startsWith("#") ||
            trimmedLine.startsWith(";")
          )
            continue;

          const parts = trimmedLine.split(/\s+/);
          const directive = parts[0].toLowerCase();
          const value = parts[1];
          const value2 = parts[2];

          switch (directive) {
            case "client":
              // Standard directive, no action needed
              break;

            case "remote":
              if (value) {
                const port = value2 ? parseInt(value2, 10) : 1194;
                remoteServers.push({ address: value, port });

                // Set the first remote as primary if not already set
                if (!config.Server.Address) {
                  config.Server.Address = value;
                  config.Server.Port = port;
                }
              }
              break;

            case "dev":
              if (value === "tun") config.Mode = "ip";
              else if (value === "tap") config.Mode = "ethernet";
              else unsupportedDirectivesFound.push(`dev ${value}`);
              break;

            case "proto":
              if (value === "tcp" || value === "udp") {
                config.Protocol = value;
              } else {
                unsupportedDirectivesFound.push(`proto ${value}`);
              }
              break;

            case "auth-user-pass":
              authUserPass = true;
              // Note: File references are not supported in RouterOS
              if (value) {
                unsupportedDirectivesFound.push(
                  `auth-user-pass with file reference (${value})`,
                );
              }
              break;

            case "cipher":
              if (value) {
                // Normalize cipher names to RouterOS format
                const cipherLower = value.toLowerCase().replace(/-/g, "");
                const cipherMap: Record<string, string> = {
                  aes256gcm: "aes256-gcm",
                  aes256cbc: "aes256-cbc",
                  aes128gcm: "aes128-gcm",
                  aes128cbc: "aes128-cbc",
                  aes192gcm: "aes192-gcm",
                  aes192cbc: "aes192-cbc",
                  blowfish128: "blowfish128",
                  null: "null",
                };

                const normalizedCipher =
                  cipherMap[cipherLower] || value.toLowerCase();

                if (supportedCiphers.includes(normalizedCipher)) {
                  config.Cipher = normalizedCipher as any;
                } else {
                  unsupportedDirectivesFound.push(
                    `cipher ${value} (unsupported by RouterOS)`,
                  );
                  // Use a default supported cipher
                  config.Cipher = "aes256-gcm" as any;
                }
                detectedCipher = value.toLowerCase();
              }
              break;

            case "auth":
              if (value) {
                const authLower = value.toLowerCase();
                if (supportedAuth.includes(authLower)) {
                  config.Auth = authLower as any;
                } else {
                  unsupportedDirectivesFound.push(
                    `auth ${value} (unsupported by RouterOS)`,
                  );
                  // Use a default supported auth
                  config.Auth = "sha256" as any;
                }
                detectedAuth = authLower;
              }
              break;

            case "ca":
              // Certificate file reference
              if (value) {
                config.Certificates.CaCertificateName = value.replace(
                  /\.(crt|pem)$/,
                  "",
                );
                caFound = true;
              }
              break;

            case "cert":
              // Certificate file reference
              if (value) {
                config.Certificates.ClientCertificateName = value.replace(
                  /\.(crt|pem)$/,
                  "",
                );
                clientCertFound = true;
              }
              break;

            case "key":
              // Key file reference - RouterOS doesn't support separate key files
              if (value) {
                unsupportedDirectivesFound.push(
                  `separate key file reference (${value})`,
                );
              }
              break;

            case "remote-cert-tls":
              config.VerifyServerCertificate = value === "server";
              break;

            case "verify-x509-name":
              config.VerifyServerCertificate = true;
              break;

            case "tls-version-min":
              // RouterOS only supports "any" or "only-1.2"
              if (value && !["1.2", "1.3"].includes(value)) {
                unsupportedDirectivesFound.push(`tls-version-min ${value}`);
              }
              break;

            case "key-direction":
              // Supported in RouterOS OpenVPN - but only with tls-auth/tls-crypt
              break;

            // Compression features - NOT SUPPORTED in RouterOS
            case "comp-lzo":
            case "compress":
            case "comp-noadapt":
              unsupportedDirectivesFound.push(
                `${directive} (LZO compression not supported in RouterOS)`,
              );
              break;

            // NCP features - NOT SUPPORTED in RouterOS
            case "ncp-ciphers":
            case "ncp-disable":
              unsupportedDirectivesFound.push(
                `${directive} (NCP negotiation not supported in RouterOS)`,
              );
              break;

            // Network and performance directives - mostly ignored/supported
            case "tun-mtu":
            case "tun-mtu-extra":
            case "mssfix":
            case "sndbuf":
            case "rcvbuf":
            case "max-mtu":
              // These are supported in RouterOS but may not be configurable via GUI
              break;

            case "ping":
            case "ping-restart":
              // Keepalive settings - supported in RouterOS
              break;

            case "verb":
            case "mute":
            case "mute-replay-warnings":
              // Logging settings - not critical for basic connection
              break;

            // Connection behavior - mostly supported
            case "remote-random":
            case "resolv-retry":
            case "nobind":
            case "persist-key":
            case "persist-tun":
            case "reneg-sec":
            case "server-poll-timeout":
            case "connect-retry":
            case "connect-timeout":
              // These are behavioral settings that RouterOS handles differently
              break;

            case "setenv":
              // Environment variables - limited support
              if (value === "CLIENT_CERT") {
                // CLIENT_CERT is supported
              } else {
                unsupportedDirectivesFound.push(`setenv ${value || ""}`);
              }
              break;

            // Provider-specific directives - NOT SUPPORTED
            case "service":
            case "block-outside-dns":
            case "dhcp-option":
            case "redirect-gateway":
            case "route-nopull":
            case "pull":
            case "pull-filter":
              unsupportedDirectivesFound.push(
                `${directive} (provider-specific feature)`,
              );
              break;

            // Security features with limited support
            case "crl-verify":
            case "ns-cert-type":
              unsupportedDirectivesFound.push(
                `${directive} (not supported in RouterOS)`,
              );
              break;

            // Username/password length validation
            case "username":
              if (value && value.length > 27) {
                unsupportedDirectivesFound.push(
                  `username too long (max 27 characters in RouterOS)`,
                );
              }
              break;

            // Ignore other known safe directives
            case "script-security":
            case "up":
            case "down":
            case "route-up":
            case "route-pre-down":
            case "client-disconnect":
            case "learn-address":
            case "auth-user-pass-verify":
              // Script-related directives not supported
              unsupportedDirectivesFound.push(
                `${directive} (script features not supported)`,
              );
              break;

            // Unknown directive handling
            default:
              if (directive && !directive.startsWith("#")) {
                console.warn(`Unknown OpenVPN directive: ${directive}`);
                // Don't add unknown directives to unsupported list to avoid noise
              }
              break;
          }
        }

        // Special handling for TLS security features
        if (hasTlsAuth) {
          unsupportedDirectivesFound.push(
            "tls-auth (requires RouterOS 7.17+ with specific auth settings)",
          );
        }

        if (hasTlsCrypt) {
          unsupportedDirectivesFound.push(
            "tls-crypt (requires RouterOS 7.17+ with auth SHA256 and key-direction 1)",
          );
        }

        // Handle GCM ciphers with auth directive (should be ignored for GCM)
        if (
          detectedCipher.includes("gcm") &&
          detectedAuth &&
          detectedAuth !== "null"
        ) {
          unsupportedDirectivesFound.push(
            `auth ${detectedAuth} with GCM cipher (GCM provides authentication)`,
          );
          // For GCM ciphers, auth should be null
          config.Auth = "null" as any;
        }

        // Remove duplicates from unsupported directives
        unsupportedDirectives.value = [...new Set(unsupportedDirectivesFound)];

        // Set default certificate names for inline content
        if (caFound && !config.Certificates.CaCertificateName) {
          config.Certificates.CaCertificateName = "ovpn-client-ca";
        }

        if (clientCertFound && !config.Certificates.ClientCertificateName) {
          config.Certificates.ClientCertificateName = "ovpn-client-cert";
        }

        // Store inline certificate content
        config.Certificates.CaCertificateContent =
          blockContent.ca.trim() || undefined;
        config.Certificates.ClientCertificateContent =
          blockContent.cert.trim() || undefined;
        config.Certificates.ClientKeyContent =
          blockContent.key.trim() || undefined;

        // Determine authentication type
        if (authUserPass && clientCertFound) {
          config.AuthType = "CredentialsCertificate";
        } else if (clientCertFound) {
          config.AuthType = "Certificate";
        } else if (authUserPass) {
          config.AuthType = "Credentials";
        } else {
          // Cannot determine authentication type - let user choose
          authTypeSelectionNeeded.value = true;
          parsedConfigWaitingForAuth.value = config;
          errorMessage.value = "";
          missingFields.value = ["Authentication Type"];

          // Set basic parsed values so user can see what was extracted
          serverAddress.value = config.Server.Address || "";
          serverPort.value = config.Server.Port?.toString() || "1194";
          protocol.value = config.Protocol || "udp";
          cipher.value = config.Cipher || "aes-256-gcm";
          auth.value = config.Auth || "sha256";
          caCertName.value = config.Certificates.CaCertificateName || "";
          caCertificateContent.value =
            config.Certificates.CaCertificateContent || "";
          clientCertificateContent.value =
            config.Certificates.ClientCertificateContent || "";
          clientKeyContent.value = config.Certificates.ClientKeyContent || "";

          if (onIsValidChange$) onIsValidChange$(false);
          return null;
        }

        const finalConfig = config as OpenVpnClientConfig;

        // Update form fields with parsed values
        serverAddress.value = finalConfig.Server.Address || "";
        serverPort.value = finalConfig.Server.Port?.toString() || "1194";
        protocol.value = finalConfig.Protocol || "udp";
        authType.value = finalConfig.AuthType || "Credentials";
        username.value = finalConfig.Credentials?.Username || "";
        password.value = finalConfig.Credentials?.Password || "";
        cipher.value = finalConfig.Cipher || "aes-256-gcm";
        auth.value = finalConfig.Auth || "sha256";
        clientCertName.value =
          finalConfig.Certificates?.ClientCertificateName || "";
        caCertName.value = finalConfig.Certificates?.CaCertificateName || "";
        verifyServerCert.value = finalConfig.VerifyServerCertificate !== false;
        caCertificateContent.value =
          finalConfig.Certificates?.CaCertificateContent || "";
        clientCertificateContent.value =
          finalConfig.Certificates?.ClientCertificateContent || "";
        clientKeyContent.value =
          finalConfig.Certificates?.ClientKeyContent || "";

        const { isValid, emptyFields } =
          await validateOpenVPNConfig(finalConfig);

        if (!isValid) {
          const message = `Configuration requires additional information. Please provide: ${emptyFields.join(", ")}`;
          errorMessage.value = message;
          missingFields.value = emptyFields;

          if (onIsValidChange$) onIsValidChange$(false);
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

    // Track file upload attempt
    track("vpn_config_file_uploaded", {
      vpn_protocol: "OpenVPN",
      file_name: file.name,
      file_size: file.size,
      file_type: file.type || "unknown",
      step: "wan_config",
      component: "vpn_client",
    });

    try {
      const text = await file.text();
      await handleConfigChange$(text);

      // Track successful file processing
      track("vpn_config_file_processed", {
        vpn_protocol: "OpenVPN",
        success: true,
        step: "wan_config",
        component: "vpn_client",
      });
    } catch (error) {
      // Track file processing error
      track("vpn_config_file_processed", {
        vpn_protocol: "OpenVPN",
        success: false,
        error: "file_read_error",
        step: "wan_config",
        component: "vpn_client",
      });

      errorMessage.value = `Error reading file: ${error}`;
    }
  });

  const handleAuthTypeSelection$ = $(
    async (
      selectedAuthType:
        | "Credentials"
        | "Certificate"
        | "CredentialsCertificate",
    ) => {
      authType.value = selectedAuthType;
      authTypeSelectionNeeded.value = false;

      if (parsedConfigWaitingForAuth.value) {
        const config = parsedConfigWaitingForAuth.value;
        config.AuthType = selectedAuthType;

        // Update missing fields based on selected auth type
        const newMissingFields: string[] = [];

        if (
          selectedAuthType === "Credentials" ||
          selectedAuthType === "CredentialsCertificate"
        ) {
          if (!username.value) newMissingFields.push("Username");
          if (!password.value) newMissingFields.push("Password");
        }

        if (
          selectedAuthType === "Certificate" ||
          selectedAuthType === "CredentialsCertificate"
        ) {
          if (!clientCertName.value)
            newMissingFields.push("Client Certificate");
        }

        missingFields.value = newMissingFields;
        parsedConfigWaitingForAuth.value = null;

        if (newMissingFields.length === 0) {
          // All required fields are available, complete the configuration
          const finalConfig: OpenVpnClientConfig = {
            ...config,
            AuthType: selectedAuthType,
            Credentials:
              selectedAuthType === "Credentials" ||
              selectedAuthType === "CredentialsCertificate"
                ? {
                    Username: username.value,
                    Password: password.value,
                  }
                : undefined,
            Certificates: {
              ...config.Certificates,
              ClientCertificateName:
                selectedAuthType === "Certificate" ||
                selectedAuthType === "CredentialsCertificate"
                  ? clientCertName.value
                  : undefined,
            },
          };

          await updateContextWithConfig$(finalConfig);
        } else {
          // Still need more fields from user
          if (onIsValidChange$) onIsValidChange$(false);
        }
      }
    },
  );

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

    const { isValid, emptyFields } = await validateOpenVPNConfig(manualConfig);
    if (!isValid) {
      // Track manual configuration validation failure
      track("vpn_manual_config_validated", {
        vpn_protocol: "OpenVPN",
        success: false,
        missing_fields: emptyFields.join(","),
        step: "wan_config",
        component: "vpn_client",
      });

      errorMessage.value = `Please fill all required fields: ${emptyFields.join(
        ", ",
      )}`;
      if (onIsValidChange$) onIsValidChange$(false);
      return;
    }

    // Track successful manual configuration
    track("vpn_manual_config_validated", {
      vpn_protocol: "OpenVPN",
      success: true,
      step: "wan_config",
      component: "vpn_client",
    });

    await starContext.updateWAN$({
      VPNClient: {
        ...starContext.state.WAN.VPNClient,
        OpenVPN: manualConfig,
      },
    });

    errorMessage.value = "";
    if (onIsValidChange$) onIsValidChange$(true);
  });

  const setConfigMethod$ = $(async (method: "file" | "manual") => {
    // Track configuration method change
    track("vpn_config_method_changed", {
      vpn_protocol: "OpenVPN",
      config_method: method,
      previous_method: configMethod.value,
      step: "wan_config",
      component: "vpn_client",
    });

    configMethod.value = method;
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
    authTypeSelectionNeeded,
    parsedConfigWaitingForAuth,
    handleConfigChange$,
    handleManualFormSubmit$,
    handleFileUpload$,
    handleAuthTypeSelection$,
    setConfigMethod$,
    validateOpenVPNConfig,
    parseOpenVPNConfig,
    updateContextWithConfig$,
  };
};
