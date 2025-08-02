import { $, type QRL } from "@builder.io/qwik";
import type { AdvancedVPNState, VPNConfig } from "../types/AdvancedVPNState";
import type {
  WireguardClientConfig,
  OpenVpnClientConfig,
  PptpClientConfig,
  L2tpClientConfig,
  SstpClientConfig,
  Ike2ClientConfig,
} from "~/components/Star/StarContext/Utils/VPNClientType";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

export interface UseVPNValidationReturn {
  validateVPN$: QRL<(vpn: VPNConfig) => Promise<ValidationResult>>;
  validateAllVPNs$: QRL<(state: AdvancedVPNState) => Promise<ValidationResult>>;
  validateGlobal$: QRL<(state: AdvancedVPNState) => ValidationResult>;
  clearValidationErrors$: QRL<
    (state: AdvancedVPNState, vpnId?: string) => void
  >;
}

export function useVPNValidation(): UseVPNValidationReturn {
  // Validate IPv4 address
  const isValidIPv4 = $((ip: string): boolean => {
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
  });

  // Validate CIDR notation
  const isValidCIDR = $(async (cidr: string): Promise<boolean> => {
    const parts = cidr.split("/");
    if (parts.length !== 2) return false;

    const [ip, mask] = parts;
    const maskNum = parseInt(mask);

    return (await isValidIPv4(ip)) && maskNum >= 0 && maskNum <= 32;
  });

  // Validate port number
  const isValidPort = $((port: string | number): boolean => {
    const portNum = typeof port === "string" ? parseInt(port) : port;
    return !isNaN(portNum) && portNum >= 1 && portNum <= 65535;
  });

  // Validate domain/hostname
  const isValidHostname = $(async (hostname: string): Promise<boolean> => {
    const hostnameRegex =
      /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/;
    return hostnameRegex.test(hostname) || (await isValidIPv4(hostname));
  });

  // Validate WireGuard configuration
  const validateWireguard$ = $(
    async (
      config: WireguardClientConfig,
      vpnId: string,
    ): Promise<Record<string, string[]>> => {
      const errors: Record<string, string[]> = {};
      const prefix = `vpn-${vpnId}`;

      // Validate private key (base64, 44 chars)
      if (
        !config.InterfacePrivateKey ||
        config.InterfacePrivateKey.length !== 44
      ) {
        errors[`${prefix}-config`] = [
          ...(errors[`${prefix}-config`] || []),
          "Private key must be 44 characters (base64)",
        ];
      }

      // Validate interface address
      if (
        !config.InterfaceAddress ||
        !(await isValidCIDR(config.InterfaceAddress))
      ) {
        errors[`${prefix}-config`] = [
          ...(errors[`${prefix}-config`] || []),
          "Invalid interface address (use CIDR notation)",
        ];
      }

      // Validate peer public key
      if (!config.PeerPublicKey || config.PeerPublicKey.length !== 44) {
        errors[`${prefix}-config`] = [
          ...(errors[`${prefix}-config`] || []),
          "Peer public key must be 44 characters (base64)",
        ];
      }

      // Validate endpoint
      if (
        !config.PeerEndpointAddress ||
        !(await isValidHostname(config.PeerEndpointAddress))
      ) {
        errors[`${prefix}-server`] = [
          ...(errors[`${prefix}-server`] || []),
          "Invalid peer endpoint address",
        ];
      }

      if (!(await isValidPort(config.PeerEndpointPort))) {
        errors[`${prefix}-server`] = [
          ...(errors[`${prefix}-server`] || []),
          "Invalid peer endpoint port",
        ];
      }

      // Validate allowed IPs
      const allowedIPs = config.PeerAllowedIPs.split(",").map((ip: string) =>
        ip.trim(),
      );
      for (const ip of allowedIPs) {
        if (!(await isValidCIDR(ip))) {
          errors[`${prefix}-config`] = [
            ...(errors[`${prefix}-config`] || []),
            `Invalid allowed IP: ${ip}`,
          ];
          break;
        }
      }

      return errors;
    },
  );

  // Validate OpenVPN configuration
  const validateOpenVPN$ = $(
    async (
      config: OpenVpnClientConfig,
      vpnId: string,
    ): Promise<Record<string, string[]>> => {
      const errors: Record<string, string[]> = {};
      const prefix = `vpn-${vpnId}`;

      // Validate server
      if (
        !config.Server.Address ||
        !(await isValidHostname(config.Server.Address))
      ) {
        errors[`${prefix}-server`] = [
          ...(errors[`${prefix}-server`] || []),
          "Invalid server address",
        ];
      }

      if (!config.Server.Port || !(await isValidPort(config.Server.Port))) {
        errors[`${prefix}-server`] = [
          ...(errors[`${prefix}-server`] || []),
          "Invalid server port",
        ];
      }

      // Validate authentication
      if (
        config.AuthType === "Credentials" ||
        config.AuthType === "CredentialsCertificate"
      ) {
        if (!config.Credentials?.Username || !config.Credentials.Password) {
          errors[`${prefix}-credentials`] = [
            ...(errors[`${prefix}-credentials`] || []),
            "Username and password required",
          ];
        }
      }

      if (
        config.AuthType === "Certificate" ||
        config.AuthType === "CredentialsCertificate"
      ) {
        if (!config.Certificates?.CaCertificateContent) {
          errors[`${prefix}-certificates`] = [
            ...(errors[`${prefix}-certificates`] || []),
            "CA certificate required",
          ];
        }
        if (
          !config.Certificates?.ClientCertificateContent ||
          !config.Certificates.ClientKeyContent
        ) {
          errors[`${prefix}-certificates`] = [
            ...(errors[`${prefix}-certificates`] || []),
            "Client certificate and key required",
          ];
        }
      }

      return errors;
    },
  );

  // Validate PPTP configuration
  const validatePPTP$ = $(
    async (
      config: PptpClientConfig,
      vpnId: string,
    ): Promise<Record<string, string[]>> => {
      const errors: Record<string, string[]> = {};
      const prefix = `vpn-${vpnId}`;

      if (!config.ConnectTo || !(await isValidHostname(config.ConnectTo))) {
        errors[`${prefix}-server`] = [
          ...(errors[`${prefix}-server`] || []),
          "Invalid server address",
        ];
      }

      if (!config.Credentials.Username || !config.Credentials.Password) {
        errors[`${prefix}-credentials`] = [
          ...(errors[`${prefix}-credentials`] || []),
          "Username and password required",
        ];
      }

      return errors;
    },
  );

  // Validate L2TP configuration
  const validateL2TP$ = $(
    async (
      config: L2tpClientConfig,
      vpnId: string,
    ): Promise<Record<string, string[]>> => {
      const errors: Record<string, string[]> = {};
      const prefix = `vpn-${vpnId}`;

      if (
        !config.Server.Address ||
        !(await isValidHostname(config.Server.Address))
      ) {
        errors[`${prefix}-server`] = [
          ...(errors[`${prefix}-server`] || []),
          "Invalid server address",
        ];
      }

      if (!config.Credentials.Username || !config.Credentials.Password) {
        errors[`${prefix}-credentials`] = [
          ...(errors[`${prefix}-credentials`] || []),
          "Username and password required",
        ];
      }

      if (config.UseIPsec && !config.IPsecSecret) {
        errors[`${prefix}-config`] = [
          ...(errors[`${prefix}-config`] || []),
          "IPsec secret required when IPsec is enabled",
        ];
      }

      return errors;
    },
  );

  // Validate SSTP configuration
  const validateSSTP$ = $(
    async (
      config: SstpClientConfig,
      vpnId: string,
    ): Promise<Record<string, string[]>> => {
      const errors: Record<string, string[]> = {};
      const prefix = `vpn-${vpnId}`;

      if (
        !config.Server.Address ||
        !(await isValidHostname(config.Server.Address))
      ) {
        errors[`${prefix}-server`] = [
          ...(errors[`${prefix}-server`] || []),
          "Invalid server address",
        ];
      }

      if (!config.Server.Port || !(await isValidPort(config.Server.Port))) {
        errors[`${prefix}-server`] = [
          ...(errors[`${prefix}-server`] || []),
          "Invalid server port",
        ];
      }

      if (!config.Credentials.Username || !config.Credentials.Password) {
        errors[`${prefix}-credentials`] = [
          ...(errors[`${prefix}-credentials`] || []),
          "Username and password required",
        ];
      }

      return errors;
    },
  );

  // Validate IKEv2 configuration
  const validateIKeV2$ = $(
    async (
      config: Ike2ClientConfig,
      vpnId: string,
    ): Promise<Record<string, string[]>> => {
      const errors: Record<string, string[]> = {};
      const prefix = `vpn-${vpnId}`;

      if (
        !config.ServerAddress ||
        !(await isValidHostname(config.ServerAddress))
      ) {
        errors[`${prefix}-server`] = [
          ...(errors[`${prefix}-server`] || []),
          "Invalid server address",
        ];
      }

      // Validate based on auth method
      if (config.AuthMethod === "pre-shared-key" && !config.PresharedKey) {
        errors[`${prefix}-config`] = [
          ...(errors[`${prefix}-config`] || []),
          "Pre-shared key required",
        ];
      }

      if (
        config.AuthMethod === "eap" ||
        config.AuthMethod === "digital-signature"
      ) {
        if (
          config.AuthMethod === "eap" &&
          (!config.Credentials?.Username || !config.Credentials.Password)
        ) {
          errors[`${prefix}-credentials`] = [
            ...(errors[`${prefix}-credentials`] || []),
            "Username and password required for EAP",
          ];
        }

        if (
          config.AuthMethod === "digital-signature" &&
          !config.ClientCertificateName
        ) {
          errors[`${prefix}-certificates`] = [
            ...(errors[`${prefix}-certificates`] || []),
            "Client certificate required",
          ];
        }
      }

      return errors;
    },
  );

  // Validate individual VPN configuration
  const validateVPN$ = $(async (vpn: VPNConfig): Promise<ValidationResult> => {
    let errors: Record<string, string[]> = {};

    // Validate name
    if (!vpn.name || vpn.name.trim().length === 0) {
      errors[`vpn-${vpn.id}-name`] = ["VPN name is required"];
    } else if (vpn.name.length > 50) {
      errors[`vpn-${vpn.id}-name`] = ["VPN name must be 50 characters or less"];
    }

    // Validate based on VPN type
    switch (vpn.type) {
      case "Wireguard":
        errors = {
          ...errors,
          ...(await validateWireguard$(
            vpn.config as WireguardClientConfig,
            vpn.id,
          )),
        };
        break;

      case "OpenVPN":
        errors = {
          ...errors,
          ...(await validateOpenVPN$(
            vpn.config as OpenVpnClientConfig,
            vpn.id,
          )),
        };
        break;

      case "PPTP":
        errors = {
          ...errors,
          ...(await validatePPTP$(vpn.config as PptpClientConfig, vpn.id)),
        };
        break;

      case "L2TP":
        errors = {
          ...errors,
          ...(await validateL2TP$(vpn.config as L2tpClientConfig, vpn.id)),
        };
        break;

      case "SSTP":
        errors = {
          ...errors,
          ...(await validateSSTP$(vpn.config as SstpClientConfig, vpn.id)),
        };
        break;

      case "IKeV2":
        errors = {
          ...errors,
          ...(await validateIKeV2$(vpn.config as Ike2ClientConfig, vpn.id)),
        };
        break;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  });

  // Validate global state constraints
  const validateGlobal$ = $((state: AdvancedVPNState): ValidationResult => {
    const errors: Record<string, string[]> = {};

    // Check minimum VPN count
    if (state.minVPNCount && state.vpnConfigs.length < state.minVPNCount) {
      errors["global-minCount"] = [
        `Minimum ${state.minVPNCount} VPN configuration(s) required`,
      ];
    }

    // Check for duplicate names
    const names = state.vpnConfigs.map((vpn) => vpn.name.toLowerCase());
    const duplicates = names.filter(
      (name, index) => names.indexOf(name) !== index,
    );
    if (duplicates.length > 0) {
      errors["global-duplicate"] = [
        `Duplicate VPN names found: ${[...new Set(duplicates)].join(", ")}`,
      ];
    }

    // Validate priority order
    const priorityIds = new Set(state.priorities);
    const configIds = new Set(state.vpnConfigs.map((vpn) => vpn.id));

    if (
      priorityIds.size !== configIds.size ||
      ![...priorityIds].every((id) => configIds.has(id))
    ) {
      errors["global-priorities"] = [
        "Priority order is inconsistent with VPN configurations",
      ];
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  });

  // Validate all VPN configurations
  const validateAllVPNs$ = $(
    async (state: AdvancedVPNState): Promise<ValidationResult> => {
      let allErrors: Record<string, string[]> = {};

      // Validate each VPN
      for (const vpn of state.vpnConfigs) {
        const result = await validateVPN$(vpn);
        allErrors = { ...allErrors, ...result.errors };
      }

      // Validate global constraints
      const globalResult = await validateGlobal$(state);
      allErrors = { ...allErrors, ...globalResult.errors };

      return {
        isValid: Object.keys(allErrors).length === 0,
        errors: allErrors,
      };
    },
  );

  // Clear validation errors
  const clearValidationErrors$ = $(
    (state: AdvancedVPNState, vpnId?: string) => {
      if (vpnId) {
        // Clear errors for specific VPN
        const newErrors = { ...state.validationErrors };
        Object.keys(newErrors).forEach((key) => {
          if (key.startsWith(`vpn-${vpnId}`)) {
            delete newErrors[key];
          }
        });
        state.validationErrors = newErrors;
      } else {
        // Clear all errors
        state.validationErrors = {};
      }
    },
  );

  return {
    validateVPN$,
    validateAllVPNs$,
    validateGlobal$,
    clearValidationErrors$,
  };
}
