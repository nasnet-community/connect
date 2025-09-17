import type {
  WANLinkConfig,
  WANWizardState,
} from "../types";

// Regular expressions for validation
export const IP_REGEX =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
export const MAC_REGEX = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
export const SUBNET_REGEX =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export interface ValidationError {
  field: string;
  message: string;
}

// Validate IP address
export function validateIPAddress(ip: string): boolean {
  return IP_REGEX.test(ip);
}

// Validate MAC address
export function validateMACAddress(mac: string): boolean {
  return MAC_REGEX.test(mac);
}

// Validate subnet mask
export function validateSubnetMask(subnet: string): boolean {
  if (!SUBNET_REGEX.test(subnet)) return false;

  // Additional validation for valid subnet masks
  const parts = subnet.split(".").map(Number);
  const binary = parts.map((n) => n.toString(2).padStart(8, "0")).join("");

  // Check if it's a valid subnet mask (continuous 1s followed by continuous 0s)
  const firstZero = binary.indexOf("0");
  if (firstZero === -1) return true; // 255.255.255.255

  return !binary.substring(firstZero).includes("1");
}

// Validate VLAN ID
export function validateVLANId(id: number): boolean {
  return id >= 1 && id <= 4094;
}

// Validate a single WAN link
export function validateWANLink(
  link: WANLinkConfig,
  allLinks: WANLinkConfig[],
  mode: "easy" | "advanced",
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Interface validation
  if (!link.interfaceName) {
    errors.push({ field: "interface", message: "Interface must be selected" });
  } else {
    // Check for duplicate interfaces
    const duplicates = allLinks.filter(
      (l) => l.id !== link.id && l.interfaceName === link.interfaceName,
    );
    if (duplicates.length > 0) {
      errors.push({
        field: "interface",
        message: "This interface is already used by another link",
      });
    }
  }

  // Wireless validation
  if (link.interfaceType === "Wireless") {
    if (!link.wirelessCredentials?.SSID) {
      errors.push({
        field: "ssid",
        message: "SSID is required for wireless interfaces",
      });
    }
    if (
      !link.wirelessCredentials?.Password ||
      link.wirelessCredentials.Password.length < 8
    ) {
      errors.push({
        field: "password",
        message: "Password must be at least 8 characters",
      });
    }
  }

  // LTE validation
  if (link.interfaceType === "LTE") {
    if (!link.lteSettings?.apn) {
      errors.push({
        field: "apn",
        message: "APN is required for LTE interfaces",
      });
    }
  }

  // Advanced mode validations
  if (mode === "advanced") {
    // VLAN validation
    if (link.vlanConfig?.enabled) {
      if (!link.vlanConfig.id || !validateVLANId(link.vlanConfig.id)) {
        errors.push({
          field: "vlan",
          message: "VLAN ID must be between 1 and 4094",
        });
      }
    }

    // MAC address validation
    if (link.macAddress?.enabled) {
      if (
        !link.macAddress.address ||
        !validateMACAddress(link.macAddress.address)
      ) {
        errors.push({ field: "mac", message: "Invalid MAC address format" });
      }
    }
  }

  // Connection type validation
  switch (link.connectionType) {
    case "PPPoE":
      if (!link.connectionConfig?.pppoe?.username) {
        errors.push({
          field: "pppoe-username",
          message: "Username is required for PPPoE",
        });
      }
      if (!link.connectionConfig?.pppoe?.password) {
        errors.push({
          field: "pppoe-password",
          message: "Password is required for PPPoE",
        });
      }
      break;

    case "Static":
      const staticConfig = link.connectionConfig?.static;
      if (
        !staticConfig?.ipAddress ||
        !validateIPAddress(staticConfig.ipAddress)
      ) {
        errors.push({
          field: "static-ip",
          message: "Valid IP address is required",
        });
      }
      if (!staticConfig?.subnet || !validateSubnetMask(staticConfig.subnet)) {
        errors.push({
          field: "static-subnet",
          message: "Valid subnet mask is required",
        });
      }
      if (!staticConfig?.gateway || !validateIPAddress(staticConfig.gateway)) {
        errors.push({
          field: "static-gateway",
          message: "Valid gateway is required",
        });
      }
      if (
        !staticConfig?.DNS ||
        !validateIPAddress(staticConfig.DNS)
      ) {
        errors.push({
          field: "static-dns1",
          message: "Valid primary DNS is required",
        });
      }
      break;
  }

  return errors;
}

// Validate the entire advanced state
export function validateAdvancedState(
  state: WANWizardState,
): ValidationError[] {
  const errors: ValidationError[] = [];

  // At least one link required
  if (state.links.length === 0) {
    errors.push({
      field: "links",
      message: "At least one WAN link is required",
    });
    return errors;
  }

  // Validate each link
  state.links.forEach((link, index) => {
    const linkErrors = validateWANLink(link, state.links, state.mode);
    linkErrors.forEach((error) => {
      errors.push({
        field: `link-${link.id}-${error.field}`,
        message: `Link ${index + 1}: ${error.message}`,
      });
    });
  });

  // Multi-link validation
  if (state.links.length > 1) {
    if (!state.multiLinkStrategy) {
      errors.push({
        field: "multi-link",
        message: "Multi-link strategy must be configured",
      });
    } else {
      // Validate weights for load balance
      if (
        state.multiLinkStrategy.strategy === "LoadBalance" ||
        state.multiLinkStrategy.strategy === "Both"
      ) {
        const totalWeight = state.links.reduce(
          (sum, link) => sum + (link.weight || 0),
          0,
        );
        if (totalWeight !== 100) {
          errors.push({
            field: "weights",
            message: `Link weights must sum to 100% (currently ${totalWeight}%)`,
          });
        }
      }

      // Validate priorities for failover
      if (
        state.multiLinkStrategy.strategy === "Failover" ||
        state.multiLinkStrategy.strategy === "Both"
      ) {
        const priorities = state.links.map((l) => l.priority || 0);
        const uniquePriorities = new Set(priorities);
        if (uniquePriorities.size !== priorities.length) {
          errors.push({
            field: "priorities",
            message: "Each link must have a unique priority",
          });
        }
      }
    }
  }

  return errors;
}

// Validate a specific step
export function validateStep(
  step: number,
  state: WANWizardState,
): ValidationError[] {
  switch (step) {
    case 0: // Step 1: Link & Interface Configuration
      return state.links.flatMap((link) => {
        const errors: ValidationError[] = [];

        if (!link.interfaceName) {
          errors.push({
            field: `link-${link.id}-interface`,
            message: "Interface must be selected",
          });
        }

        if (link.interfaceType === "Wireless" && !link.wirelessCredentials) {
          errors.push({
            field: `link-${link.id}-wireless`,
            message: "Wireless credentials required",
          });
        }

        if (link.interfaceType === "LTE" && !link.lteSettings) {
          errors.push({
            field: `link-${link.id}-lte`,
            message: "LTE settings required",
          });
        }

        return errors;
      });

    case 1: // Step 2: Connection Configuration
      return state.links.flatMap((link) => {
        const errors: ValidationError[] = [];

        if (link.connectionType !== "DHCP" && link.connectionType !== "LTE") {
          if (!link.connectionConfig) {
            errors.push({
              field: `link-${link.id}-connection`,
              message: "Connection configuration required",
            });
          }
        }

        return errors;
      });

    case 2: // Step 3: Multi-Link Strategy
      if (state.links.length > 1 && !state.multiLinkStrategy) {
        return [
          {
            field: "multi-link",
            message: "Multi-link strategy must be configured",
          },
        ];
      }
      return [];

    case 3: // Step 4: Summary
      return validateAdvancedState(state);

    default:
      return [];
  }
}
