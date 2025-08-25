// Re-export all types from VPNClientAdvancedTypes for backward compatibility
export type {
  VPNType as VPNClientType,
  VPNConfig,
  VPNConfigBase,
  WireguardVPNConfig,
  OpenVPNConfig,
  PPTPVPNConfig,
  L2TPVPNConfig,
  SSTPVPNConfig,
  IKeV2VPNConfig,
  VPNClientAdvancedState as AdvancedVPNState,
  NewVPNConfig,
  VPNValidationKey,
  // New types
  VPNClientConfig,
  VPNClientWizardState,
  MultiVPNStrategy,
  MultiVPNConfig,
} from "./VPNClientAdvancedTypes";
