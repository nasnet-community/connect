export interface NetworkConfig {
  ssid: string;
  password: string;
  isHide: boolean;
  isDisabled: boolean;
}

export type NetworkKey = "starlink" | "domestic" | "split" | "vpn";

export type Networks = Record<NetworkKey, NetworkConfig>;

export interface LoadingState {
  singleSSID?: boolean;
  singlePassword?: boolean;
  allPasswords?: boolean;
  [key: string]: boolean | undefined;
}

// This maps to WirelessConfig in LANType.ts, with adjusted field names
// for local use in components
export interface WirelessNetworkConfig {
  SSID: string;
  Password: string;
  isHide: boolean;
  isDisabled: boolean;
}

// Map of each network type to its configuration
export type MultiModeConfig = Partial<Record<'Starlink' | 'Domestic' | 'Split' | 'VPN', WirelessNetworkConfig>>;
