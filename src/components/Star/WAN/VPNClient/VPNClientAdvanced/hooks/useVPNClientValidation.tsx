import { $, type QRL } from "@builder.io/qwik";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";
import type {
  VPNClientAdvancedState,
  VPNConfig,
} from "../types/VPNClientAdvancedTypes";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

export interface UseVPNClientValidationReturn {
  validateStep$: QRL<
    (
      stepIndex: number,
      state: VPNClientAdvancedState,
    ) => Promise<ValidationResult>
  >;
  validateAdvanced$: QRL<
    (state: VPNClientAdvancedState) => Promise<ValidationResult>
  >;
  validateVPNClient$: QRL<(vpn: VPNConfig) => Promise<ValidationResult>>;
  hasAllMandatoryFields$: QRL<(vpn: VPNConfig) => boolean>;
}

export const useVPNClientValidation = (): UseVPNClientValidationReturn => {
  const locale = useMessageLocale();

  // Helper function to check if VPN has all mandatory fields configured
  const hasAllMandatoryFields$ = $((vpn: VPNConfig): boolean => {
    const vpnConfig = vpn as any;
    console.log(
      `[hasAllMandatoryFields] Checking VPN ${vpnConfig.name} (${vpnConfig.id}):`,
      {
        hasType: !!vpnConfig.type,
        hasConfig: !!vpnConfig.config,
        type: vpnConfig.type,
        configKeys: vpnConfig.config ? Object.keys(vpnConfig.config) : [],
      },
    );

    if (!vpnConfig.type || !vpnConfig.config) {
      console.log(
        `[hasAllMandatoryFields] VPN ${vpnConfig.name} missing type or config`,
      );
      return false;
    }

    const config = vpnConfig.config;

    switch (vpnConfig.type) {
      case "Wireguard":
        const wgValid = Boolean(
          config.InterfacePrivateKey?.trim() &&
            config.InterfaceAddress?.trim() &&
            config.PeerPublicKey?.trim() &&
            config.PeerEndpointAddress?.trim() &&
            config.PeerEndpointPort,
        );
        console.log(
          `[hasAllMandatoryFields] Wireguard validation for ${vpnConfig.name}:`,
          {
            InterfacePrivateKey: !!config.InterfacePrivateKey?.trim(),
            InterfaceAddress: !!config.InterfaceAddress?.trim(),
            PeerPublicKey: !!config.PeerPublicKey?.trim(),
            PeerEndpointAddress: !!config.PeerEndpointAddress?.trim(),
            PeerEndpointPort: !!config.PeerEndpointPort,
            result: wgValid,
          },
        );
        return wgValid;

      case "OpenVPN":
        const ovpnValid = Boolean(
          config.Server?.Address?.trim() &&
            config.Server?.Port &&
            config.Credentials?.Username?.trim() &&
            config.Credentials?.Password?.trim(),
        );
        console.log(
          `[hasAllMandatoryFields] OpenVPN validation for ${vpnConfig.name}:`,
          {
            serverAddress: !!config.Server?.Address?.trim(),
            serverPort: !!config.Server?.Port,
            username: !!config.Credentials?.Username?.trim(),
            password: !!config.Credentials?.Password?.trim(),
            result: ovpnValid,
          },
        );
        return ovpnValid;

      case "L2TP":
        const l2tpValid = Boolean(
          config.Server?.Address?.trim() &&
            config.Credentials?.Username?.trim() &&
            config.Credentials?.Password?.trim(),
        );
        console.log(
          `[hasAllMandatoryFields] L2TP validation for ${vpnConfig.name}:`,
          {
            serverAddress: !!config.Server?.Address?.trim(),
            username: !!config.Credentials?.Username?.trim(),
            password: !!config.Credentials?.Password?.trim(),
            result: l2tpValid,
          },
        );
        return l2tpValid;

      case "IKeV2":
        const ikev2Valid = Boolean(
          config.ServerAddress?.trim() &&
            config.Credentials?.Username?.trim() &&
            config.Credentials?.Password?.trim(),
        );
        console.log(
          `[hasAllMandatoryFields] IKeV2 validation for ${vpnConfig.name}:`,
          {
            serverAddress: !!config.ServerAddress?.trim(),
            username: !!config.Credentials?.Username?.trim(),
            password: !!config.Credentials?.Password?.trim(),
            result: ikev2Valid,
          },
        );
        return ikev2Valid;

      case "PPTP":
        const pptpValid = Boolean(
          config.ConnectTo?.trim() &&
            config.Credentials?.Username?.trim() &&
            config.Credentials?.Password?.trim(),
        );
        console.log(
          `[hasAllMandatoryFields] PPTP validation for ${vpnConfig.name}:`,
          {
            connectTo: !!config.ConnectTo?.trim(),
            username: !!config.Credentials?.Username?.trim(),
            password: !!config.Credentials?.Password?.trim(),
            result: pptpValid,
          },
        );
        return pptpValid;

      case "SSTP":
        const sstpValid = Boolean(
          config.Server?.Address?.trim() &&
            config.Credentials?.Username?.trim() &&
            config.Credentials?.Password?.trim(),
        );
        console.log(
          `[hasAllMandatoryFields] SSTP validation for ${vpnConfig.name}:`,
          {
            serverAddress: !!config.Server?.Address?.trim(),
            username: !!config.Credentials?.Username?.trim(),
            password: !!config.Credentials?.Password?.trim(),
            result: sstpValid,
          },
        );
        return sstpValid;

      default:
        console.log(
          `[hasAllMandatoryFields] Unknown VPN type: ${vpnConfig.type}`,
        );
        return false;
    }
  });

  // Validate individual VPN client configuration
  const validateVPNClient$ = $(
    async (vpn: VPNConfig): Promise<ValidationResult> => {
      console.log(
        `[validateVPNClient] Starting validation for VPN: ${vpn.name} (${vpn.id})`,
      );
      const errors: Record<string, string[]> = {};

      // Type assertion to help TypeScript
      const vpnConfig = vpn as any;
      console.log(`[validateVPNClient] VPN config structure:`, {
        hasName: !!vpnConfig.name,
        hasType: !!vpnConfig.type,
        hasConfig: !!vpnConfig.config,
        configKeys: vpnConfig.config ? Object.keys(vpnConfig.config) : [],
      });

      // Validate basic fields
      if (!vpnConfig.name?.trim()) {
        errors[`vpn-${vpnConfig.id}-name`] = [
          semanticMessages.vpn_client_advanced_validation_client_name_required(
            {},
            { locale },
          ),
        ];
        console.log(
          `[validateVPNClient] Name validation failed for ${vpnConfig.id}`,
        );
      }

      if (!vpnConfig.type) {
        errors[`vpn-${vpnConfig.id}-type`] = [
          semanticMessages.vpn_client_advanced_validation_client_type_required(
            {},
            { locale },
          ),
        ];
        console.log(
          `[validateVPNClient] Type validation failed for ${vpnConfig.id}`,
        );
      }

      // Validate protocol-specific mandatory fields
      if (vpnConfig.type && vpnConfig.config) {
        const config = vpnConfig.config;
        console.log(
          `[validateVPNClient] Validating ${vpnConfig.type} config for ${vpnConfig.name}:`,
          config,
        );

        switch (vpnConfig.type) {
          case "Wireguard":
            if (!config.InterfacePrivateKey?.trim()) {
              errors[`vpn-${vpnConfig.id}-InterfacePrivateKey`] = [
                semanticMessages.vpn_client_advanced_validation_interface_private_key_required(
                  {},
                  { locale },
                ),
              ];
            }
            if (!config.InterfaceAddress?.trim()) {
              errors[`vpn-${vpnConfig.id}-InterfaceAddress`] = [
                semanticMessages.vpn_client_advanced_validation_interface_address_required(
                  {},
                  { locale },
                ),
              ];
            }
            if (!config.PeerPublicKey?.trim()) {
              errors[`vpn-${vpnConfig.id}-PeerPublicKey`] = [
                semanticMessages.vpn_client_advanced_validation_peer_public_key_required(
                  {},
                  { locale },
                ),
              ];
            }
            if (!config.PeerEndpointAddress?.trim()) {
              errors[`vpn-${vpnConfig.id}-PeerEndpointAddress`] = [
                semanticMessages.vpn_client_advanced_validation_peer_endpoint_address_required(
                  {},
                  { locale },
                ),
              ];
            }
            if (!config.PeerEndpointPort) {
              errors[`vpn-${vpnConfig.id}-PeerEndpointPort`] = [
                semanticMessages.vpn_client_advanced_validation_peer_endpoint_port_required(
                  {},
                  { locale },
                ),
              ];
            }
            break;

          case "OpenVPN":
            if (!config.Server?.Address?.trim()) {
              errors[`vpn-${vpnConfig.id}-server`] = [
                semanticMessages.vpn_client_advanced_validation_server_address_required(
                  {},
                  { locale },
                ),
              ];
            }
            if (!config.Server?.Port) {
              errors[`vpn-${vpnConfig.id}-port`] = [
                semanticMessages.vpn_client_advanced_validation_port_required(
                  {},
                  { locale },
                ),
              ];
            }
            if (!config.Credentials?.Username?.trim()) {
              errors[`vpn-${vpnConfig.id}-username`] = [
                semanticMessages.vpn_client_advanced_validation_username_required(
                  {},
                  { locale },
                ),
              ];
            }
            if (!config.Credentials?.Password?.trim()) {
              errors[`vpn-${vpnConfig.id}-password`] = [
                semanticMessages.vpn_client_advanced_validation_password_required(
                  {},
                  { locale },
                ),
              ];
            }
            break;

          case "L2TP":
            if (!config.Server?.Address?.trim()) {
              errors[`vpn-${vpnConfig.id}-server`] = [
                semanticMessages.vpn_client_advanced_validation_server_address_required(
                  {},
                  { locale },
                ),
              ];
            }
            if (!config.Credentials?.Username?.trim()) {
              errors[`vpn-${vpnConfig.id}-username`] = [
                semanticMessages.vpn_client_advanced_validation_username_required(
                  {},
                  { locale },
                ),
              ];
            }
            if (!config.Credentials?.Password?.trim()) {
              errors[`vpn-${vpnConfig.id}-password`] = [
                semanticMessages.vpn_client_advanced_validation_password_required(
                  {},
                  { locale },
                ),
              ];
            }
            break;

          case "IKeV2":
            if (!config.ServerAddress?.trim()) {
              errors[`vpn-${vpnConfig.id}-server`] = [
                semanticMessages.vpn_client_advanced_validation_server_address_required(
                  {},
                  { locale },
                ),
              ];
            }
            if (!config.Credentials?.Username?.trim()) {
              errors[`vpn-${vpnConfig.id}-username`] = [
                semanticMessages.vpn_client_advanced_validation_username_required(
                  {},
                  { locale },
                ),
              ];
            }
            if (!config.Credentials?.Password?.trim()) {
              errors[`vpn-${vpnConfig.id}-password`] = [
                semanticMessages.vpn_client_advanced_validation_password_required(
                  {},
                  { locale },
                ),
              ];
            }
            break;

          case "PPTP":
            if (!config.ConnectTo?.trim()) {
              errors[`vpn-${vpnConfig.id}-server`] = [
                semanticMessages.vpn_client_advanced_validation_server_address_required(
                  {},
                  { locale },
                ),
              ];
            }
            if (!config.Credentials?.Username?.trim()) {
              errors[`vpn-${vpnConfig.id}-username`] = [
                semanticMessages.vpn_client_advanced_validation_username_required(
                  {},
                  { locale },
                ),
              ];
            }
            if (!config.Credentials?.Password?.trim()) {
              errors[`vpn-${vpnConfig.id}-password`] = [
                semanticMessages.vpn_client_advanced_validation_password_required(
                  {},
                  { locale },
                ),
              ];
            }
            break;

          case "SSTP":
            if (!config.Server?.Address?.trim()) {
              errors[`vpn-${vpnConfig.id}-server`] = [
                semanticMessages.vpn_client_advanced_validation_server_address_required(
                  {},
                  { locale },
                ),
              ];
            }
            if (!config.Credentials?.Username?.trim()) {
              errors[`vpn-${vpnConfig.id}-username`] = [
                semanticMessages.vpn_client_advanced_validation_username_required(
                  {},
                  { locale },
                ),
              ];
            }
            if (!config.Credentials?.Password?.trim()) {
              errors[`vpn-${vpnConfig.id}-password`] = [
                semanticMessages.vpn_client_advanced_validation_password_required(
                  {},
                  { locale },
                ),
              ];
            }
            break;
        }
      } else if (vpnConfig.type && !vpnConfig.config) {
        errors[`vpn-${vpnConfig.id}-config`] = [
          semanticMessages.vpn_client_advanced_validation_configuration_required(
            {},
            { locale },
          ),
        ];
        console.log(
          `[validateVPNClient] Config missing for ${vpnConfig.name} (${vpnConfig.type})`,
        );
      }

      const result = {
        isValid: Object.keys(errors).length === 0,
        errors,
      };

      console.log(
        `[validateVPNClient] Validation completed for ${vpnConfig.name}:`,
        result,
      );
      return result;
    },
  );

  // Validate specific wizard step
  const validateStep$ = $(
    async (
      stepIndex: number,
      state: VPNClientAdvancedState,
    ): Promise<ValidationResult> => {
      const errors: Record<string, string[]> = {};

      switch (stepIndex) {
        case 0: // Step 1: Add VPNs
          // Check minimum VPN count
          if (state.vpnConfigs.length < (state.minVPNCount || 1)) {
            errors["step1-mincount"] = [
              semanticMessages.vpn_client_advanced_validation_min_clients(
                { count: state.minVPNCount || 1 },
                { locale },
              ),
            ];
          }

          // Check that all VPNs have names and types
          for (const vpn of state.vpnConfigs) {
            const vpnConfig = vpn as any;
            if (!vpnConfig.name?.trim()) {
              errors[`vpn-${vpnConfig.id}-name`] = [
                semanticMessages.vpn_client_advanced_validation_client_name_required(
                  {},
                  { locale },
                ),
              ];
            }
            if (!vpnConfig.type) {
              errors[`vpn-${vpnConfig.id}-type`] = [
                semanticMessages.vpn_client_advanced_validation_client_type_required(
                  {},
                  { locale },
                ),
              ];
            }
          }

          // Check for duplicate names
          const names = state.vpnConfigs
            .map((vpn) => vpn.name.trim().toLowerCase())
            .filter(Boolean);
          const duplicateNames = names.filter(
            (name, index) => names.indexOf(name) !== index,
          );
          if (duplicateNames.length > 0) {
            errors["step1-duplicates"] = [
              semanticMessages.vpn_client_advanced_validation_names_unique(
                {},
                {
                  locale,
                },
              ),
            ];
          }
          break;

        case 1: // Step 2: Configuration
          // Validate all VPN configurations
          for (const vpn of state.vpnConfigs) {
            const vpnValidation = await validateVPNClient$(vpn);
            Object.assign(errors, vpnValidation.errors);
          }
          break;

        case 2: // Step 3: Priorities (only if multiple VPNs)
          if (state.vpnConfigs.length > 1) {
            // Check multi-VPN strategy
            if (!state.multiVPNStrategy?.strategy) {
              errors["step3-strategy"] = [
                semanticMessages.vpn_client_advanced_validation_strategy_required(
                  {},
                  { locale },
                ),
              ];
            }

            if (state.multiVPNStrategy?.strategy === "Failover") {
              if (
                !state.multiVPNStrategy.failoverCheckInterval ||
                state.multiVPNStrategy.failoverCheckInterval < 5
              ) {
                errors["step3-failover-interval"] = [
                  semanticMessages.vpn_client_advanced_validation_failover_interval(
                    {},
                    { locale },
                  ),
                ];
              }
              if (
                !state.multiVPNStrategy.failoverTimeout ||
                state.multiVPNStrategy.failoverTimeout < 10
              ) {
                errors["step3-failover-timeout"] = [
                  semanticMessages.vpn_client_advanced_validation_failover_timeout(
                    {},
                    { locale },
                  ),
                ];
              }
            }

            // Check priorities are unique and sequential
            const priorities = state.vpnConfigs
              .map((vpn) => vpn.priority)
              .sort((a, b) => a - b);
            const expectedPriorities = Array.from(
              { length: state.vpnConfigs.length },
              (_, i) => i + 1,
            );
            if (
              JSON.stringify(priorities) !== JSON.stringify(expectedPriorities)
            ) {
              errors["step3-priorities"] = [
                semanticMessages.vpn_client_advanced_validation_priorities_unique(
                  {},
                  { locale },
                ),
              ];
            }
          }
          break;

        case 3: // Step 4: Summary
          // Run full validation
          const fullValidation = await validateAdvanced$(state);
          Object.assign(errors, fullValidation.errors);
          break;
      }

      return {
        isValid: Object.keys(errors).length === 0,
        errors,
      };
    },
  );

  // Validate entire advanced configuration
  const validateAdvanced$ = $(
    async (state: VPNClientAdvancedState): Promise<ValidationResult> => {
      console.log("[validateAdvanced] Starting full validation with state:", {
        vpnCount: state.vpnConfigs.length,
        minVPNCount: state.minVPNCount,
        hasMultiVPNStrategy: !!state.multiVPNStrategy,
        multiVPNStrategy: state.multiVPNStrategy,
        vpnNames: state.vpnConfigs.map((v) => v.name),
        vpnTypes: state.vpnConfigs.map((v) => v.type),
        vpnPriorities: state.vpnConfigs.map((v) => v.priority),
        prioritiesArray: state.priorities,
        vpnConfigs: state.vpnConfigs.map((v) => ({
          id: v.id,
          name: v.name,
          type: v.type,
          priority: v.priority,
          hasConfig: !!(v as any).config,
        })),
      });

      const errors: Record<string, string[]> = {};

      // Check minimum VPN count
      if (state.vpnConfigs.length < (state.minVPNCount || 1)) {
        const error =
          semanticMessages.vpn_client_advanced_validation_min_clients(
            { count: state.minVPNCount || 1 },
            { locale },
          );
        errors["global-mincount"] = [error];
        console.log("[validateAdvanced] Min count error:", error);
      }

      // Validate each VPN client
      console.log("[validateAdvanced] Validating each VPN client...");
      for (const vpn of state.vpnConfigs) {
        console.log(
          `[validateAdvanced] Validating VPN: ${vpn.name} (${vpn.id})`,
        );
        const vpnValidation = await validateVPNClient$(vpn);
        console.log(
          `[validateAdvanced] VPN ${vpn.name} validation result:`,
          vpnValidation,
        );
        Object.assign(errors, vpnValidation.errors);
      }

      // Check for duplicate names
      const names = state.vpnConfigs
        .map((vpn) => vpn.name.trim().toLowerCase())
        .filter(Boolean);
      const duplicateNames = names.filter(
        (name, index) => names.indexOf(name) !== index,
      );
      if (duplicateNames.length > 0) {
        const error =
          semanticMessages.vpn_client_advanced_validation_names_unique(
            {},
            { locale },
          );
        errors["global-duplicates"] = [error];
        console.log(
          "[validateAdvanced] Duplicate names error:",
          error,
          "Names:",
          names,
        );
      }

      // Check multi-VPN strategy if multiple VPNs
      if (state.vpnConfigs.length > 1) {
        console.log(
          "[validateAdvanced] Checking multi-VPN strategy for",
          state.vpnConfigs.length,
          "VPNs",
        );
        console.log(
          "[validateAdvanced] Current multiVPNStrategy:",
          state.multiVPNStrategy,
        );

        if (!state.multiVPNStrategy?.strategy) {
          console.log(
            "[validateAdvanced] No multi-VPN strategy found, auto-initializing default Failover strategy",
          );
          // Auto-initialize default strategy to prevent validation error
          state.multiVPNStrategy = {
            strategy: "Failover",
            failoverCheckInterval: 10,
            failoverTimeout: 30,
          };
          console.log(
            "[validateAdvanced] Default strategy initialized:",
            state.multiVPNStrategy,
          );
        }

        // Check priorities
        const priorities = state.vpnConfigs.map((vpn) => vpn.priority);
        const expectedPriorities = Array.from(
          { length: state.vpnConfigs.length },
          (_, i) => i + 1,
        );
        console.log("[validateAdvanced] Priority check:", {
          actualPriorities: priorities,
          expectedPriorities: expectedPriorities,
          prioritiesLength: priorities.length,
          vpnConfigsLength: state.vpnConfigs.length,
        });

        // Fix missing priorities before validation
        if (priorities.length < state.vpnConfigs.length) {
          console.log(
            "[validateAdvanced] Some VPNs missing priorities, auto-fixing...",
          );
          state.vpnConfigs = state.vpnConfigs.map((vpn, index) => ({
            ...vpn,
            priority: vpn.priority || index + 1,
          }));
          console.log(
            "[validateAdvanced] Priorities auto-fixed:",
            state.vpnConfigs.map((v) => ({
              name: v.name,
              priority: v.priority,
            })),
          );
        }

        // Re-check priorities after auto-fix
        const finalPriorities = state.vpnConfigs
          .map((vpn) => vpn.priority)
          .sort((a, b) => a - b);
        if (
          JSON.stringify(finalPriorities) !== JSON.stringify(expectedPriorities)
        ) {
          const error =
            semanticMessages.vpn_client_advanced_validation_priorities_unique(
              {},
              { locale },
            );
          errors["global-priorities"] = [error];
          console.log(
            "[validateAdvanced] Priority validation error after auto-fix:",
            error,
          );
          console.log("[validateAdvanced] Final priorities vs expected:", {
            finalPriorities,
            expectedPriorities,
          });
        }
      } else {
        console.log(
          "[validateAdvanced] Single VPN, skipping multi-VPN strategy checks",
        );
      }

      const result = {
        isValid: Object.keys(errors).length === 0,
        errors,
      };

      console.log("[validateAdvanced] Final validation result:", result);
      return result;
    },
  );

  return {
    validateStep$,
    validateAdvanced$,
    validateVPNClient$,
    hasAllMandatoryFields$,
  };
};
