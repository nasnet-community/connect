import { $, type QRL } from "@builder.io/qwik";
import type {
  VPNClientAdvancedState,
  VPNConfig,
} from "../types/VPNClientAdvancedTypes";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

export interface UseVPNClientValidationReturn {
  validateStep$: QRL<(stepIndex: number, state: VPNClientAdvancedState) => Promise<ValidationResult>>;
  validateAdvanced$: QRL<(state: VPNClientAdvancedState) => Promise<ValidationResult>>;
  validateVPNClient$: QRL<(vpn: VPNConfig) => Promise<ValidationResult>>;
}

export const useVPNClientValidation = (): UseVPNClientValidationReturn => {
  
  // Validate individual VPN client configuration
  const validateVPNClient$ = $(async (vpn: VPNConfig): Promise<ValidationResult> => {
    const errors: Record<string, string[]> = {};
    
    // Type assertion to help TypeScript
    const vpnConfig = vpn as any;
    
    // Validate basic fields
    if (!vpnConfig.name?.trim()) {
      errors[`vpn-${vpnConfig.id}-name`] = ["VPN client name is required"];
    }
    
    if (!vpnConfig.type) {
      errors[`vpn-${vpnConfig.id}-type`] = ["VPN client type is required"];
    }
    
    // Validate basic configuration exists
    if (vpnConfig.type && !vpnConfig.config) {
      errors[`vpn-${vpnConfig.id}-config`] = ["VPN configuration is required"];
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  });
  
  // Validate specific wizard step
  const validateStep$ = $(async (
    stepIndex: number,
    state: VPNClientAdvancedState
  ): Promise<ValidationResult> => {
    const errors: Record<string, string[]> = {};
    
    switch (stepIndex) {
      case 0: // Step 1: Add VPNs
        // Check minimum VPN count
        if (state.vpnConfigs.length < (state.minVPNCount || 1)) {
          errors["step1-mincount"] = [
            `At least ${state.minVPNCount || 1} VPN client(s) required (based on Foreign WAN links)`
          ];
        }
        
        // Check that all VPNs have names and types
        for (const vpn of state.vpnConfigs) {
          const vpnConfig = vpn as any;
          if (!vpnConfig.name?.trim()) {
            errors[`vpn-${vpnConfig.id}-name`] = ["VPN client name is required"];
          }
          if (!vpnConfig.type) {
            errors[`vpn-${vpnConfig.id}-type`] = ["VPN client type is required"];
          }
        }
        
        // Check for duplicate names
        const names = state.vpnConfigs.map(vpn => vpn.name.trim().toLowerCase()).filter(Boolean);
        const duplicateNames = names.filter((name, index) => names.indexOf(name) !== index);
        if (duplicateNames.length > 0) {
          errors["step1-duplicates"] = ["VPN client names must be unique"];
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
            errors["step3-strategy"] = ["Multi-VPN strategy is required when using multiple VPN clients"];
          }
          
          if (state.multiVPNStrategy?.strategy === "Failover") {
            if (!state.multiVPNStrategy.failoverCheckInterval || state.multiVPNStrategy.failoverCheckInterval < 5) {
              errors["step3-failover-interval"] = ["Failover check interval must be at least 5 seconds"];
            }
            if (!state.multiVPNStrategy.failoverTimeout || state.multiVPNStrategy.failoverTimeout < 10) {
              errors["step3-failover-timeout"] = ["Failover timeout must be at least 10 seconds"];
            }
          }
          
          // Check priorities are unique and sequential
          const priorities = state.vpnConfigs.map(vpn => vpn.priority).sort((a, b) => a - b);
          const expectedPriorities = Array.from({ length: state.vpnConfigs.length }, (_, i) => i + 1);
          if (JSON.stringify(priorities) !== JSON.stringify(expectedPriorities)) {
            errors["step3-priorities"] = ["VPN client priorities must be unique and sequential"];
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
  });
  
  // Validate entire advanced configuration
  const validateAdvanced$ = $(async (state: VPNClientAdvancedState): Promise<ValidationResult> => {
    const errors: Record<string, string[]> = {};
    
    // Check minimum VPN count
    if (state.vpnConfigs.length < (state.minVPNCount || 1)) {
      errors["global-mincount"] = [
        `At least ${state.minVPNCount || 1} VPN client(s) required (based on Foreign WAN links)`
      ];
    }
    
    // Validate each VPN client
    for (const vpn of state.vpnConfigs) {
      const vpnValidation = await validateVPNClient$(vpn);
      Object.assign(errors, vpnValidation.errors);
    }
    
    // Check for duplicate names
    const names = state.vpnConfigs.map(vpn => vpn.name.trim().toLowerCase()).filter(Boolean);
    const duplicateNames = names.filter((name, index) => names.indexOf(name) !== index);
    if (duplicateNames.length > 0) {
      errors["global-duplicates"] = ["VPN client names must be unique"];
    }
    
    // Check multi-VPN strategy if multiple VPNs
    if (state.vpnConfigs.length > 1) {
      if (!state.multiVPNStrategy?.strategy) {
        errors["global-strategy"] = ["Multi-VPN strategy is required when using multiple VPN clients"];
      }
      
      // Check priorities
      const priorities = state.vpnConfigs.map(vpn => vpn.priority).sort((a, b) => a - b);
      const expectedPriorities = Array.from({ length: state.vpnConfigs.length }, (_, i) => i + 1);
      if (JSON.stringify(priorities) !== JSON.stringify(expectedPriorities)) {
        errors["global-priorities"] = ["VPN client priorities must be unique and sequential"];
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  });
  
  return {
    validateStep$,
    validateAdvanced$,
    validateVPNClient$,
  };
}