import { $, type QRL } from "@builder.io/qwik";
import type {
  WANLinkConfig,
  WANWizardState,
} from "../types";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

export interface UseWANValidationReturn {
  validateLink$: QRL<
    (
      link: WANLinkConfig,
      allLinks: WANLinkConfig[],
      mode: "easy" | "advanced",
    ) => ValidationResult
  >;
  validateStep$: QRL<
    (step: number, state: WANWizardState) => Promise<ValidationResult>
  >;
  validateAdvanced$: QRL<(state: WANWizardState) => Promise<ValidationResult>>;
  clearErrors$: QRL<(state: WANWizardState, linkId?: string) => void>;
}

export function useWANValidation(): UseWANValidationReturn {
  // IP address validation regex
  const ipRegex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  // MAC address validation regex
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

  // Validate a single link
  const validateLink$ = $(
    (
      link: WANLinkConfig,
      allLinks: WANLinkConfig[],
      mode: "easy" | "advanced",
    ): ValidationResult => {
      const errors: Record<string, string[]> = {};
      const prefix = `link-${link.id}`;

      // Interface validation
      if (!link.interfaceName) {
        errors[`${prefix}-interface`] = ["Interface must be selected"];
      } else {
        // Check for duplicate interfaces
        const duplicates = allLinks.filter(
          (l) => l.id !== link.id && l.interfaceName === link.interfaceName,
        );
        if (duplicates.length > 0) {
          errors[`${prefix}-interface`] = [
            "This interface is already used by another link",
          ];
        }
      }

      // Wireless validation
      if (link.interfaceType === "Wireless" && link.wirelessCredentials) {
        if (!link.wirelessCredentials.SSID) {
          errors[`${prefix}-ssid`] = ["SSID is required"];
        }
        if (
          !link.wirelessCredentials.Password ||
          link.wirelessCredentials.Password.length < 8
        ) {
          errors[`${prefix}-password`] = [
            "Password must be at least 8 characters",
          ];
        }
      }

      // LTE validation
      if (link.interfaceType === "LTE" && link.lteSettings) {
        if (!link.lteSettings.apn) {
          errors[`${prefix}-apn`] = ["APN is required"];
        }
      }

      // Advanced mode validations
      if (mode === "advanced") {
        // VLAN validation
        if (link.vlanConfig?.enabled) {
          if (
            !link.vlanConfig.id ||
            link.vlanConfig.id < 1 ||
            link.vlanConfig.id > 4094
          ) {
            errors[`${prefix}-vlan`] = ["VLAN ID must be between 1 and 4094"];
          }
        }

        // MAC address validation
        if (link.macAddress?.enabled) {
          if (
            !link.macAddress.address ||
            !macRegex.test(link.macAddress.address)
          ) {
            errors[`${prefix}-mac`] = ["Invalid MAC address format"];
          }
        }
      }

      // Connection type validation
      switch (link.connectionType) {
        case "PPPoE":
          if (!link.connectionConfig?.pppoe?.username) {
            errors[`${prefix}-pppoe-username`] = ["Username is required"];
          }
          if (!link.connectionConfig?.pppoe?.password) {
            errors[`${prefix}-pppoe-password`] = ["Password is required"];
          }
          break;

        case "Static":
          const staticConfig = link.connectionConfig?.static;
          if (
            !staticConfig?.ipAddress ||
            !ipRegex.test(staticConfig.ipAddress)
          ) {
            errors[`${prefix}-static-ip`] = ["Valid IP address is required"];
          }
          if (!staticConfig?.subnet || !ipRegex.test(staticConfig.subnet)) {
            errors[`${prefix}-static-subnet`] = [
              "Valid subnet mask is required",
            ];
          }
          if (!staticConfig?.gateway || !ipRegex.test(staticConfig.gateway)) {
            errors[`${prefix}-static-gateway`] = ["Valid gateway is required"];
          }
          if (
        !staticConfig?.DNS ||
        !ipRegex.test(staticConfig.DNS)
          ) {
            errors[`${prefix}-static-dns1`] = ["Valid primary DNS is required"];
          }
          break;
      }

      return {
        isValid: Object.keys(errors).length === 0,
        errors,
      };
    },
  );

  // Validate specific step
  const validateStep$ = $(
    async (step: number, state: WANWizardState): Promise<ValidationResult> => {
      let allErrors: Record<string, string[]> = {};

      switch (step) {
        case 0: // Step 1: Link & Interface Configuration
          for (const link of state.links) {
            const validation = await validateLink$(
              link,
              state.links,
              state.mode,
            );
            if (!validation.isValid) {
              allErrors = { ...allErrors, ...validation.errors };
            }

            // Additional step 1 validations
            if (
              link.interfaceType === "Wireless" &&
              !link.wirelessCredentials
            ) {
              allErrors[`link-${link.id}-wireless`] = [
                "Wireless credentials required",
              ];
            }
            if (link.interfaceType === "LTE" && !link.lteSettings) {
              allErrors[`link-${link.id}-lte`] = ["LTE settings required"];
            }
          }
          break;

        case 1: // Step 2: Connection Configuration
          for (const link of state.links) {
            // Validate connection configuration
            if (
              link.connectionType !== "DHCP" &&
              link.connectionType !== "LTE"
            ) {
              if (!link.connectionConfig) {
                allErrors[`link-${link.id}-connection`] = [
                  "Connection configuration required",
                ];
              }
            }
          }
          break;

        case 2: // Step 3: Multi-Link Strategy
          if (state.links.length > 1 && !state.multiLinkStrategy) {
            allErrors["multi-link"] = [
              "Multi-link strategy must be configured",
            ];
          }

          if (state.multiLinkStrategy) {
            // Validate weights sum to 100
            if (
              state.multiLinkStrategy.strategy === "LoadBalance" ||
              state.multiLinkStrategy.strategy === "Both"
            ) {
              const totalWeight = state.links.reduce(
                (sum, link) => sum + (link.weight || 0),
                0,
              );
              if (totalWeight !== 100) {
                allErrors["weights"] = ["Link weights must sum to 100%"];
              }
            }
          }
          break;

        case 3: // Step 4: Summary
          // Full validation
          const fullValidation = await validateAdvanced$(state);
          if (!fullValidation.isValid) {
            allErrors = fullValidation.errors;
          }
          break;
      }

      return {
        isValid: Object.keys(allErrors).length === 0,
        errors: allErrors,
      };
    },
  );

  // Validate entire advanced configuration
  const validateAdvanced$ = $(
    async (state: WANWizardState): Promise<ValidationResult> => {
      let allErrors: Record<string, string[]> = {};

      // Validate all links
      for (const link of state.links) {
        const validation = await validateLink$(link, state.links, state.mode);
        if (!validation.isValid) {
          allErrors = { ...allErrors, ...validation.errors };
        }
      }

      // Validate multi-link configuration if applicable
      if (state.links.length > 1) {
        if (!state.multiLinkStrategy) {
          allErrors["multi-link-required"] = [
            "Multi-link strategy required for multiple links",
          ];
        } else {
          // Validate weights
          if (
            state.multiLinkStrategy.strategy === "LoadBalance" ||
            state.multiLinkStrategy.strategy === "Both"
          ) {
            const totalWeight = state.links.reduce(
              (sum, link) => sum + (link.weight || 0),
              0,
            );
            if (totalWeight !== 100) {
              allErrors["weight-sum"] = [
                `Total weight is ${totalWeight}%, must be 100%`,
              ];
            }
          }

          // Validate priorities
          if (
            state.multiLinkStrategy.strategy === "Failover" ||
            state.multiLinkStrategy.strategy === "Both"
          ) {
            const priorities = state.links.map((l) => l.priority || 0);
            const uniquePriorities = new Set(priorities);
            if (uniquePriorities.size !== priorities.length) {
              allErrors["priority-unique"] = [
                "Each link must have a unique priority",
              ];
            }
          }
        }
      }

      // At least one link required
      if (state.links.length === 0) {
        allErrors["no-links"] = ["At least one WAN link is required"];
      }

      return {
        isValid: Object.keys(allErrors).length === 0,
        errors: allErrors,
      };
    },
  );

  // Clear errors for a specific link or all
  const clearErrors$ = $((state: WANWizardState, linkId?: string) => {
    if (linkId) {
      const newErrors = { ...state.validationErrors };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`link-${linkId}`)) {
          delete newErrors[key];
        }
      });
      state.validationErrors = newErrors;
    } else {
      state.validationErrors = {};
    }
  });

  return {
    validateLink$,
    validateStep$,
    validateAdvanced$,
    clearErrors$,
  };
}
