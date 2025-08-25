import type { Ethernet } from "./CommonType";
import type { Networks } from "./CommonType";
import type { Tunnel } from "./Utils/TunnelType";
import type { VPNServer } from "./Utils/VPNServerType";

// Wireless

export type WirelessInterfaceType = "Master" | "Slave";
export interface WirelessConfig {
  SSID: string;
  Password: string;
  isHide: boolean;
  isDisabled: boolean;
  SplitBand: boolean;
}

export interface MultiMode {
  Foreign?: WirelessConfig;
  Domestic?: WirelessConfig;
  Split?: WirelessConfig;
  VPN?: WirelessConfig;
}

export interface Wireless {
  SingleMode?: WirelessConfig;
  MultiMode?: MultiMode;
}

// Ethernet Interface Bridges
export interface EthernetInterfaceConfig {
  name: Ethernet;
  bridge: Networks;
}

export interface LANState {
  Wireless?: Wireless;
  VPNServer?: VPNServer;
  Tunnel?: Tunnel;
  Interface?: EthernetInterfaceConfig[];
  Subnets?: Record<string, string>;
}
