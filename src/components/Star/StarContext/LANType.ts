import type { Ethernet } from "./CommonType";
import type { Networks } from "./CommonType";
import type { Tunnel } from "./Utils/TunnelType";
import type { VPNServer } from "./Utils/VPNServerType";


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

export interface EthernetInterfaceConfig {
  name: Ethernet;
  bridge: Networks;
}

export interface LocalNetworks {
  Split?: string;
  Domestic?: string;
  Foreign?: string;
  VPN?: string;
}

export interface VPNNetworks {
  Wireguard?: string[];
  OpenVPN?: string[];
  L2TP?: string;
  PPTP?: string;
  SSTP?: string;
  IKev2?: string;
}

export interface TunnelNetworks {
  IPIP?: string[];
  Eoip?: string[];
  Gre?: string[];
  Vxlan?: string[];
}
export interface Subnets {
  LocalNetworks:LocalNetworks;
  VPNNetworks?:VPNNetworks;
  TunnelNetworks?:TunnelNetworks;
}
export interface LANState {
  Wireless?: Wireless;
  VPNServer?: VPNServer;
  Tunnel?: Tunnel;
  Interface?: EthernetInterfaceConfig[];
  Subnets?: Record<string, string>;
}
