import type { AdvancedVPNState, VPNConfig } from "../types/AdvancedVPNState";
import type {
  WireguardClientConfig,
  OpenVpnClientConfig,
  PptpClientConfig,
  L2tpClientConfig,
  SstpClientConfig,
  Ike2ClientConfig,
} from "../../../../StarContext/Utils/VPNClientType";

// Validation schemas for each VPN type
export const VPNValidationSchemas = {
  Wireguard: {
    InterfacePrivateKey: {
      required: true,
      pattern: /^[A-Za-z0-9+/]{43}=$/,
      message: "Private key must be 44 characters (base64)",
    },
    InterfaceAddress: {
      required: true,
      pattern:
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/([0-9]|[1-2][0-9]|3[0-2])$/,
      message: "Invalid interface address (use CIDR notation)",
    },
    PeerPublicKey: {
      required: true,
      pattern: /^[A-Za-z0-9+/]{43}=$/,
      message: "Peer public key must be 44 characters (base64)",
    },
    PeerEndpointAddress: {
      required: true,
      validator: isValidHostname,
      message: "Invalid peer endpoint address",
    },
    PeerEndpointPort: {
      required: true,
      validator: isValidPort,
      message: "Invalid peer endpoint port",
    },
    PeerAllowedIPs: {
      required: true,
      validator: isValidCIDRList,
      message: "Invalid allowed IPs (use CIDR notation, comma-separated)",
    },
    InterfaceListenPort: {
      required: false,
      validator: isValidPort,
      message: "Invalid interface listen port",
    },
    InterfaceMTU: {
      required: false,
      validator: (value: number) => value >= 1280 && value <= 1500,
      message: "MTU must be between 1280 and 1500",
    },
    PeerPersistentKeepalive: {
      required: false,
      validator: (value: number) => value >= 0 && value <= 3600,
      message: "Persistent keepalive must be between 0 and 3600 seconds",
    },
  },
  OpenVPN: {
    "Server.Address": {
      required: true,
      validator: isValidHostname,
      message: "Invalid server address",
    },
    "Server.Port": {
      required: true,
      validator: isValidPort,
      message: "Invalid server port",
    },
    AuthType: {
      required: true,
      validator: (value: string) =>
        ["Credentials", "Certificate", "CredentialsCertificate"].includes(
          value,
        ),
      message: "Invalid authentication type",
    },
    Auth: {
      required: true,
      validator: (value: string) =>
        ["md5", "sha1", "null", "sha256", "sha512"].includes(value),
      message: "Invalid auth algorithm",
    },
    Mode: {
      required: false,
      validator: (value: string) => ["ip", "ethernet"].includes(value),
      message: "Invalid mode",
    },
    Protocol: {
      required: false,
      validator: (value: string) => ["tcp", "udp"].includes(value),
      message: "Invalid protocol",
    },
    Cipher: {
      required: false,
      validator: (value: string) =>
        [
          "null",
          "aes128-cbc",
          "aes128-gcm",
          "aes192-cbc",
          "aes192-gcm",
          "aes256-cbc",
          "aes256-gcm",
          "blowfish128",
        ].includes(value),
      message: "Invalid cipher",
    },
    TlsVersion: {
      required: false,
      validator: (value: string) => ["any", "only-1.2"].includes(value),
      message: "Invalid TLS version",
    },
    OVPNFileContent: {
      required: false,
      validator: (value: string) => {
        if (!value || value.trim().length === 0) return true; // Optional field
        // Check for basic OpenVPN config structure
        const hasClient = value.includes("client");
        const hasDev = value.includes("dev");
        const hasProto = value.includes("proto");
        return hasClient || hasDev || hasProto; // At least one OpenVPN directive
      },
      message: "Invalid OpenVPN configuration file content",
    },
  },
  PPTP: {
    ConnectTo: {
      required: true,
      validator: isValidHostname,
      message: "Invalid server address",
    },
    "Credentials.Username": {
      required: true,
      validator: (value: string) => value.length > 0,
      message: "Username is required",
    },
    "Credentials.Password": {
      required: true,
      validator: (value: string) => value.length > 0,
      message: "Password is required",
    },
    KeepaliveTimeout: {
      required: false,
      validator: (value: number) => value >= 0 && value <= 600,
      message: "Keepalive timeout must be between 0 and 600 seconds",
    },
  },
  L2TP: {
    "Server.Address": {
      required: true,
      validator: isValidHostname,
      message: "Invalid server address",
    },
    "Credentials.Username": {
      required: true,
      validator: (value: string) => value.length > 0,
      message: "Username is required",
    },
    "Credentials.Password": {
      required: true,
      validator: (value: string) => value.length > 0,
      message: "Password is required",
    },
    ProtoVersion: {
      required: false,
      validator: (value: string) =>
        ["l2tpv2", "l2tpv3-ip", "l2tpv3-udp"].includes(value),
      message: "Invalid protocol version",
    },
    CookieLength: {
      required: false,
      validator: (value: number) => [0, 4, 8].includes(value),
      message: "Cookie length must be 0, 4, or 8",
    },
    DigestHash: {
      required: false,
      validator: (value: string) => ["md5", "none", "sha1"].includes(value),
      message: "Invalid digest hash",
    },
  },
  SSTP: {
    "Server.Address": {
      required: true,
      validator: isValidHostname,
      message: "Invalid server address",
    },
    "Server.Port": {
      required: true,
      validator: isValidPort,
      message: "Invalid server port",
    },
    "Credentials.Username": {
      required: true,
      validator: (value: string) => value.length > 0,
      message: "Username is required",
    },
    "Credentials.Password": {
      required: true,
      validator: (value: string) => value.length > 0,
      message: "Password is required",
    },
    TlsVersion: {
      required: false,
      validator: (value: string) => ["any", "only-1.2"].includes(value),
      message: "Invalid TLS version",
    },
    PFS: {
      required: false,
      validator: (value: string) => ["yes", "no", "required"].includes(value),
      message: "Invalid PFS setting",
    },
    KeepAlive: {
      required: false,
      validator: (value: number) => value >= 0 && value <= 3600,
      message: "Keep alive must be between 0 and 3600 seconds",
    },
  },
  IKeV2: {
    ServerAddress: {
      required: true,
      validator: isValidHostname,
      message: "Invalid server address",
    },
    AuthMethod: {
      required: true,
      validator: (value: string) =>
        ["pre-shared-key", "digital-signature", "eap"].includes(value),
      message: "Invalid authentication method",
    },
    Port: {
      required: false,
      validator: isValidPort,
      message: "Invalid port",
    },
    Lifetime: {
      required: false,
      pattern: /^(\d+[smhd])+$/,
      message: "Invalid lifetime format (use s, m, h, or d)",
    },
    ProposalLifetime: {
      required: false,
      pattern: /^(\d+[smhd])+$/,
      message: "Invalid proposal lifetime format (use s, m, h, or d)",
    },
    DpdInterval: {
      required: false,
      pattern: /^(\d+[smhd])+$/,
      message: "Invalid DPD interval format (use s, m, h, or d)",
    },
  },
};

// Helper validation functions
export function isValidIPv4(ip: string): boolean {
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
}

export function isValidCIDR(cidr: string): boolean {
  const parts = cidr.split("/");
  if (parts.length !== 2) return false;

  const [ip, mask] = parts;
  const maskNum = parseInt(mask);

  return isValidIPv4(ip) && maskNum >= 0 && maskNum <= 32;
}

export function isValidCIDRList(cidrs: string): boolean {
  const cidrList = cidrs.split(",").map((ip) => ip.trim());
  return cidrList.every((cidr) => isValidCIDR(cidr));
}

export function isValidPort(port: string | number): boolean {
  const portNum = typeof port === "string" ? parseInt(port) : port;
  return !isNaN(portNum) && portNum >= 1 && portNum <= 65535;
}

export function isValidHostname(hostname: string): boolean {
  const hostnameRegex =
    /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/;
  return hostnameRegex.test(hostname) || isValidIPv4(hostname);
}

// Type-specific validation functions
export function validateWireguardConfig(
  config: WireguardClientConfig,
): Record<string, string[]> {
  return validateWithSchema(config, VPNValidationSchemas.Wireguard);
}

export function validateOpenVPNConfig(
  config: OpenVpnClientConfig,
): Record<string, string[]> {
  const errors = validateWithSchema(config, VPNValidationSchemas.OpenVPN);

  // Additional validation based on AuthType
  if (
    config.AuthType === "Credentials" ||
    config.AuthType === "CredentialsCertificate"
  ) {
    if (!config.Credentials?.Username || !config.Credentials.Password) {
      errors["Credentials"] = [
        ...(errors["Credentials"] || []),
        "Username and password required",
      ];
    }
  }

  if (
    config.AuthType === "Certificate" ||
    config.AuthType === "CredentialsCertificate"
  ) {
    if (!config.Certificates?.CaCertificateContent) {
      errors["Certificates.CaCertificate"] = ["CA certificate required"];
    }
    if (
      !config.Certificates?.ClientCertificateContent ||
      !config.Certificates.ClientKeyContent
    ) {
      errors["Certificates.ClientCertificate"] = [
        "Client certificate and key required",
      ];
    }
  }

  return errors;
}

export function validatePPTPConfig(
  config: PptpClientConfig,
): Record<string, string[]> {
  return validateWithSchema(config, VPNValidationSchemas.PPTP);
}

export function validateL2TPConfig(
  config: L2tpClientConfig,
): Record<string, string[]> {
  const errors = validateWithSchema(config, VPNValidationSchemas.L2TP);

  // Additional validation for IPsec
  if (config.UseIPsec && !config.IPsecSecret) {
    errors["IPsecSecret"] = ["IPsec secret required when IPsec is enabled"];
  }

  return errors;
}

export function validateSSTPConfig(
  config: SstpClientConfig,
): Record<string, string[]> {
  const errors = validateWithSchema(config, VPNValidationSchemas.SSTP);

  // Additional validation for proxy
  if (
    config.Proxy &&
    (!config.Proxy.Address || !isValidHostname(config.Proxy.Address))
  ) {
    errors["Proxy.Address"] = ["Invalid proxy address"];
  }

  if (config.Proxy?.Port && !isValidPort(config.Proxy.Port)) {
    errors["Proxy.Port"] = ["Invalid proxy port"];
  }

  return errors;
}

export function validateIKeV2Config(
  config: Ike2ClientConfig,
): Record<string, string[]> {
  const errors = validateWithSchema(config, VPNValidationSchemas.IKeV2);

  // Additional validation based on AuthMethod
  if (config.AuthMethod === "pre-shared-key" && !config.PresharedKey) {
    errors["PresharedKey"] = ["Pre-shared key required"];
  }

  if (config.AuthMethod === "eap") {
    if (!config.Credentials?.Username || !config.Credentials.Password) {
      errors["Credentials"] = ["Username and password required for EAP"];
    }
    if (config.EapMethods && config.EapMethods.length === 0) {
      errors["EapMethods"] = ["At least one EAP method must be selected"];
    }
  }

  if (
    config.AuthMethod === "digital-signature" &&
    !config.ClientCertificateName
  ) {
    errors["ClientCertificateName"] = ["Client certificate required"];
  }

  return errors;
}

// Type for validation rules
interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  validator?: (value: any) => boolean;
  message: string;
}

// Generic validation with schema
function validateWithSchema(
  data: any,
  schema: Record<string, ValidationRule>,
): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  for (const [field, rules] of Object.entries(schema)) {
    const value = getNestedValue(data, field);

    if (
      rules.required &&
      (value === undefined || value === null || value === "")
    ) {
      errors[field] = [`${field} is required`];
      continue;
    }

    if (value !== undefined && value !== null && value !== "") {
      if (rules.pattern && !rules.pattern.test(String(value))) {
        errors[field] = [rules.message];
      } else if (rules.validator && !rules.validator(value)) {
        errors[field] = [rules.message];
      }
    }
  }

  return errors;
}

// Helper to get nested object values
function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}

// Global validation functions
export function validateVPNName(name: string): string[] {
  const errors: string[] = [];

  if (!name || name.trim().length === 0) {
    errors.push("VPN name is required");
  } else if (name.length > 50) {
    errors.push("VPN name must be 50 characters or less");
  } else if (!/^[a-zA-Z0-9\-_\s]+$/.test(name)) {
    errors.push(
      "VPN name can only contain letters, numbers, hyphens, underscores, and spaces",
    );
  }

  return errors;
}

export function validateMinimumVPNCount(state: AdvancedVPNState): string[] {
  const errors: string[] = [];

  if (state.minVPNCount && state.vpnConfigs.length < state.minVPNCount) {
    errors.push(`Minimum ${state.minVPNCount} VPN configuration(s) required`);
  }

  return errors;
}

export function validateDuplicateNames(state: AdvancedVPNState): string[] {
  const errors: string[] = [];
  const names = state.vpnConfigs.map((vpn) => vpn.name.toLowerCase());
  const duplicates = names.filter(
    (name, index) => names.indexOf(name) !== index,
  );

  if (duplicates.length > 0) {
    const uniqueDuplicates = [...new Set(duplicates)];
    errors.push(`Duplicate VPN names found: ${uniqueDuplicates.join(", ")}`);
  }

  return errors;
}

export function validatePriorityOrder(state: AdvancedVPNState): string[] {
  const errors: string[] = [];
  const priorityIds = new Set(state.priorities);
  const configIds = new Set(state.vpnConfigs.map((vpn) => vpn.id));

  if (
    priorityIds.size !== configIds.size ||
    ![...priorityIds].every((id) => configIds.has(id))
  ) {
    errors.push("Priority order is inconsistent with VPN configurations");
  }

  return errors;
}

// Main validation function for a single VPN
export function validateVPNConfig(vpn: VPNConfig): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  // Validate name
  const nameErrors = validateVPNName(vpn.name);
  if (nameErrors.length > 0) {
    errors.name = nameErrors;
  }

  // Validate based on VPN type
  let typeErrors: Record<string, string[]> = {};

  switch (vpn.type) {
    case "Wireguard":
      typeErrors = validateWireguardConfig(vpn.config as WireguardClientConfig);
      break;
    case "OpenVPN":
      typeErrors = validateOpenVPNConfig(vpn.config as OpenVpnClientConfig);
      break;
    case "PPTP":
      typeErrors = validatePPTPConfig(vpn.config as PptpClientConfig);
      break;
    case "L2TP":
      typeErrors = validateL2TPConfig(vpn.config as L2tpClientConfig);
      break;
    case "SSTP":
      typeErrors = validateSSTPConfig(vpn.config as SstpClientConfig);
      break;
    case "IKeV2":
      typeErrors = validateIKeV2Config(vpn.config as Ike2ClientConfig);
      break;
  }

  // Merge type-specific errors
  Object.entries(typeErrors).forEach(([key, value]) => {
    errors[`config.${key}`] = value;
  });

  return errors;
}

// Main validation function for entire state
export function validateAdvancedVPNState(
  state: AdvancedVPNState,
): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  // Validate each VPN configuration
  state.vpnConfigs.forEach((vpn) => {
    const vpnErrors = validateVPNConfig(vpn);
    Object.entries(vpnErrors).forEach(([key, value]) => {
      errors[`vpn-${vpn.id}-${key}`] = value;
    });
  });

  // Global validations
  const minCountErrors = validateMinimumVPNCount(state);
  if (minCountErrors.length > 0) {
    errors["global-minCount"] = minCountErrors;
  }

  const duplicateErrors = validateDuplicateNames(state);
  if (duplicateErrors.length > 0) {
    errors["global-duplicate"] = duplicateErrors;
  }

  const priorityErrors = validatePriorityOrder(state);
  if (priorityErrors.length > 0) {
    errors["global-priorities"] = priorityErrors;
  }

  return errors;
}

// Export validation result type
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

export function getValidationResult(state: AdvancedVPNState): ValidationResult {
  const errors = validateAdvancedVPNState(state);
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
