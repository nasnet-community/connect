import { $, useSignal, useContext } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { StarContext } from "../../../../StarContext/StarContext";
import type { Ike2ClientConfig } from "../../../../StarContext/Utils/VPNClientType";
import type {
  IkeV2AuthMethod,
  IkeV2EncAlgorithm,
  IkeV2HashAlgorithm,
  IkeV2DhGroup,
  IkeV2PfsGroup,
} from "../../../../StarContext/Utils/VPNClientType";
import { useNetworks } from "~/utils/useNetworks";

export interface UseIKEv2ConfigResult {
  serverAddress: { value: string };
  username: { value: string };
  password: { value: string };
  authMethod: { value: IkeV2AuthMethod };
  presharedKey: { value: string };
  policyDstAddress: { value: string };
  phase1HashAlgorithm: { value: string };
  phase1EncryptionAlgorithm: { value: string };
  phase1DHGroup: { value: string };
  phase2HashAlgorithm: { value: string };
  phase2EncryptionAlgorithm: { value: string };
  phase2PFSGroup: { value: string };
  errorMessage: { value: string };
  handleManualFormSubmit$: QRL<() => Promise<void>>;
  validateIKEv2Config: QRL<
    (config: Ike2ClientConfig) => Promise<{
      isValid: boolean;
      emptyFields: string[];
    }>
  >;
  parseIKEv2Config: QRL<(configText: string) => Ike2ClientConfig | null>;
  updateContextWithConfig$: QRL<
    (parsedConfig: Ike2ClientConfig) => Promise<void>
  >;
}

export const useIKEv2Config = (
  onIsValidChange$?: QRL<(isValid: boolean) => void>,
): UseIKEv2ConfigResult => {
  const starContext = useContext(StarContext);
  const networks = useNetworks();
  const errorMessage = useSignal("");

  const serverAddress = useSignal("");
  const authMethod = useSignal<IkeV2AuthMethod>("pre-shared-key");
  const presharedKey = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const policyDstAddress = useSignal("0.0.0.0/0");
  const phase1HashAlgorithm = useSignal("sha256");
  const phase1EncryptionAlgorithm = useSignal("aes-256");
  const phase1DHGroup = useSignal("modp2048");
  const phase2HashAlgorithm = useSignal("sha256");
  const phase2EncryptionAlgorithm = useSignal("aes-256");
  const phase2PFSGroup = useSignal("none");

  // Initialize with existing config if available
  if (starContext.state.WAN.VPNClient?.IKeV2) {
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

    // Map algorithm values if they exist
    if (
      existingConfig.HashAlgorithm &&
      existingConfig.HashAlgorithm.length > 0
    ) {
      phase1HashAlgorithm.value = existingConfig.HashAlgorithm[0];
    }

    if (existingConfig.EncAlgorithm && existingConfig.EncAlgorithm.length > 0) {
      phase1EncryptionAlgorithm.value = existingConfig.EncAlgorithm[0];
    }

    if (existingConfig.DhGroup && existingConfig.DhGroup.length > 0) {
      phase1DHGroup.value = existingConfig.DhGroup[0];
    }

    if (existingConfig.PfsGroup) {
      phase2PFSGroup.value = existingConfig.PfsGroup;
    }

    // Check if config is valid
    let isConfigValid = serverAddress.value !== "";

    if (authMethod.value === "pre-shared-key") {
      isConfigValid = isConfigValid && presharedKey.value !== "";
    } else if (authMethod.value === "eap") {
      isConfigValid =
        isConfigValid && username.value !== "" && password.value !== "";
    }

    if (isConfigValid) {
      if (onIsValidChange$) {
        setTimeout(() => onIsValidChange$(true), 0);
      }
    }
  }

  const validateIKEv2Config = $(async (config: Ike2ClientConfig) => {
    const emptyFields: string[] = [];

    if (!config.ServerAddress || config.ServerAddress.trim() === "") {
      emptyFields.push("ServerAddress");
    }

    if (!config.AuthMethod) {
      emptyFields.push("AuthMethod");
    }

    if (
      config.AuthMethod === "pre-shared-key" &&
      (!config.PresharedKey || config.PresharedKey.trim() === "")
    ) {
      emptyFields.push("PresharedKey");
    }

    if (
      config.AuthMethod === "eap" &&
      (!config.Credentials?.Username || !config.Credentials.Password)
    ) {
      emptyFields.push("Credentials");
    }

    if (
      config.AuthMethod === "digital-signature" &&
      (!config.ClientCertificateName || !config.CaCertificateName)
    ) {
      emptyFields.push("Certificates");
    }

    return {
      isValid: emptyFields.length === 0,
      emptyFields,
    };
  });

  const parseIKEv2Config = $((configText: string): Ike2ClientConfig | null => {
    try {
      const config: Partial<Ike2ClientConfig> = {
        ServerAddress: "",
        AuthMethod: "pre-shared-key",
        PolicySrcAddress: "0.0.0.0/0",
        PolicyDstAddress: "0.0.0.0/0",
        HashAlgorithm: ["sha256"],
        EncAlgorithm: ["aes-256"],
        DhGroup: ["modp2048"],
        PfsGroup: "none",
        NatTraversal: true,
        DpdInterval: "8s",
        Lifetime: "1d",
        ProposalLifetime: "30m",
      };

      const lines = configText.split("\n").map((line) => line.trim());

      for (const line of lines) {
        if (!line || line.startsWith("#") || line.startsWith(";")) {
          continue;
        }

        if (line.startsWith("conn ")) {
          continue;
        } else if (line.startsWith("right=")) {
          config.ServerAddress = line.substring(6).trim();
        } else if (line.startsWith("rightid=")) {
          const rightId = line.substring(8).trim();
          if (rightId.startsWith('"CN=')) {
            const cnValue = rightId.substring(4, rightId.length - 1);
            if (!config.ServerAddress) {
              config.ServerAddress = cnValue;
            }
          }
        } else if (line.includes("keyexchange=ikev2")) {
          continue;
        } else if (line.startsWith("ike=")) {
          const ike = line.substring(4).trim();
          const parts = ike.split("-");
          if (parts.length >= 3) {
            config.EncAlgorithm = [parts[0] as IkeV2EncAlgorithm];
            config.HashAlgorithm = [parts[1] as IkeV2HashAlgorithm];
            config.DhGroup = [parts[2] as IkeV2DhGroup];
          }
        } else if (line.startsWith("esp=")) {
          const esp = line.substring(4).trim();
          const parts = esp.split("-");
          if (parts.length >= 2) {
            // Phase 2 settings would be handled differently in a real implementation
            continue;
          }
        } else if (line.startsWith("leftcert=")) {
          config.AuthMethod = "digital-signature";
          config.ClientCertificateName = line.substring(9).trim();
        } else if (line.includes("eap-radius")) {
          config.AuthMethod = "eap";
        } else if (
          line.includes("authby=secret") ||
          line.includes("authby=psk")
        ) {
          config.AuthMethod = "pre-shared-key";
        } else if (line.startsWith("rightsubnet=")) {
          config.PolicyDstAddress = line.substring(12).trim();
        }
      }

      return config as Ike2ClientConfig;
    } catch (error) {
      console.error("Error parsing IKEv2 config:", error);
      return null;
    }
  });

  const updateContextWithConfig$ = $(async (parsedConfig: Ike2ClientConfig) => {
    const currentVPNClient = starContext.state.WAN.VPNClient || {};

    await starContext.updateWAN$({
      VPNClient: {
        ...currentVPNClient,
        IKeV2: [parsedConfig],
      },
    });

    // Update Networks state to reflect VPN availability
    networks.generateCurrentNetworks$();
  });

  const handleManualFormSubmit$ = $(async () => {
    errorMessage.value = "";

    const manualConfig: Ike2ClientConfig = {
      Name: "IKeV2-Client",
      ServerAddress: serverAddress.value,
      AuthMethod: authMethod.value,
      PresharedKey:
        authMethod.value === "pre-shared-key" ? presharedKey.value : undefined,
      Credentials:
        authMethod.value === "eap"
          ? {
              Username: username.value,
              Password: password.value,
            }
          : undefined,
      PolicySrcAddress: "0.0.0.0/0",
      PolicyDstAddress: policyDstAddress.value,
      HashAlgorithm: [phase1HashAlgorithm.value as IkeV2HashAlgorithm],
      EncAlgorithm: [phase1EncryptionAlgorithm.value as IkeV2EncAlgorithm],
      DhGroup: [phase1DHGroup.value as IkeV2DhGroup],
      PfsGroup: phase2PFSGroup.value as IkeV2PfsGroup,
      NatTraversal: true,
      DpdInterval: "8s",
      Lifetime: "1d",
      ProposalLifetime: "30m",
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
    updateContextWithConfig$,
  };
};
