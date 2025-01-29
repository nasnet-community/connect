export interface NetworkConfig {
  ssid: string;
  password: string;
}

export type NetworkKey = "starlink" | "domestic" | "split" | "vpn";

export type Networks = Record<NetworkKey, NetworkConfig>;

export interface LoadingState {
  singleSSID?: boolean;
  singlePassword?: boolean;
  allPasswords?: boolean;
  [key: string]: boolean | undefined;
}
