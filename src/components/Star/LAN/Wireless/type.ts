export interface NetworkConfig {
  ssid: string;
  password: string;
  isHide: boolean;
  isDisabled: boolean;
  splitBand: boolean;
}

export type NetworkKey = "foreign" | "domestic" | "split" | "vpn";

export type Networks = Record<NetworkKey, NetworkConfig>;

export interface LoadingState {
  singleSSID?: boolean;
  singlePassword?: boolean;
  allPasswords?: boolean;
  [key: string]: boolean | undefined;
}

export interface WirelessNetworkConfig {
  SSID: string;
  Password: string;
  isHide: boolean;
  isDisabled: boolean;
  SplitBand: boolean;
}

export type MultiModeConfig = Partial<
  Record<"Foreign" | "Domestic" | "Split" | "VPN", WirelessNetworkConfig>
>;

export interface ExtraWirelessInterface {
  id: string;
  targetNetworkName: string;
  ssid: string;
  password: string;
  isHide: boolean;
  isDisabled: boolean;
  splitBand: boolean;
}
